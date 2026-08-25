import { createHash } from "node:crypto";
import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sanitizeHtml from "sanitize-html";

const projectRoot = new URL("../", import.meta.url);
const snapshotPath = new URL("../src/data/mplaw-wordpress.json", import.meta.url);
const libraryPath = new URL("../src/data/article-library.json", import.meta.url);
const imageDirectory = new URL("../public/assets/articles/", import.meta.url);
const snapshot = JSON.parse(await readFile(snapshotPath, "utf8"));

const articleCategoryId = snapshot.collections.categories.find(
  (category) => category.slug === "articles-advice",
)?.id;

if (!articleCategoryId) {
  throw new Error("The Articles & Advice WordPress category was not found.");
}

const articlePosts = snapshot.collections.posts.filter((post) =>
  post.categories.includes(articleCategoryId),
);
const articleSlugs = new Set(articlePosts.map((post) => post.slug));
const mediaById = new Map(snapshot.collections.media.map((media) => [media.id, media]));
const localizedImages = new Map();

function textOnly(value = "") {
  return sanitizeHtml(value, { allowedTags: [], allowedAttributes: {} })
    .replace(/\s+/g, " ")
    .trim();
}

function normaliseUrl(value) {
  return value.replace(/&amp;/g, "&").replace(/^http:\/\//i, "https://");
}

function imageFilename(url, label) {
  const parsed = new URL(url);
  const extension = path.extname(parsed.pathname).toLowerCase() || ".jpg";
  const safeLabel = label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 64);
  const hash = createHash("sha256").update(url).digest("hex").slice(0, 8);
  return `${safeLabel}-${hash}${extension}`;
}

async function localiseImage(url, label) {
  const source = normaliseUrl(url);
  if (localizedImages.has(source)) return localizedImages.get(source);

  const candidates = [source];
  const parsed = new URL(source);
  const fullSizePath = parsed.pathname.replace(/-\d+x\d+(?=\.[a-z0-9]+$)/i, "");
  if (fullSizePath !== parsed.pathname) {
    parsed.pathname = fullSizePath;
    candidates.push(parsed.toString());
  }

  for (const candidate of candidates) {
    const filename = imageFilename(candidate, label);
    const destination = new URL(filename, imageDirectory);
    try {
      await access(destination);
      const localPath = `assets/articles/${filename}`;
      localizedImages.set(source, localPath);
      return localPath;
    } catch {
      // The image is not in the local archive yet; fetch it below.
    }

    try {
      const response = await fetch(candidate, {
        headers: { "User-Agent": "Meridian-Partners-article-migration/1.0" },
        signal: AbortSignal.timeout(30_000),
      });
      if (!response.ok) continue;

      await writeFile(destination, Buffer.from(await response.arrayBuffer()));
      const localPath = `assets/articles/${filename}`;
      localizedImages.set(source, localPath);
      return localPath;
    } catch (error) {
      console.warn(`Could not download image candidate ${candidate}: ${error.message}`);
    }
  }

  console.warn(`Skipping unavailable legacy image: ${source}`);
  localizedImages.set(source, null);
  return null;
}

function preferredMediaUrl(media) {
  const sizes = media?.media_details?.sizes ?? {};
  return (
    sizes.large?.source_url ??
    sizes.medium_large?.source_url ??
    sizes.medium?.source_url ??
    media?.source_url ??
    null
  );
}

function formatFor(post, searchableText) {
  const title = textOnly(post.title.rendered).toLowerCase();
  const mediaSignals = [
    "interview",
    "commentary",
    "rnz",
    "newstalk",
    "doctor arrested",
    "meet the man",
    "fails to communicate",
    "dave ananth says",
    "dave ananth wants",
    "video",
  ];

  if (mediaSignals.some((signal) => title.includes(signal))) return "Media";
  if (/timor-leste|overseas investment act/i.test(`${title} ${searchableText}`)) return "Updates";
  return "Analysis";
}

function topicFor(title, searchableText) {
  const text = `${title} ${searchableText}`.toLowerCase();
  if (/student loan|borrower|ptptn/.test(text)) return "Student loans";
  if (/timor-leste|overseas investment/.test(text)) return "Investment";
  if (/property|subdivision|estate/.test(text)) return "Property";
  return "Tax & IRD";
}

function sourceFor(format, searchableText, author) {
  if (/rnz|radio new zealand/i.test(searchableText)) return "RNZ";
  if (/newstalk zb/i.test(searchableText)) return "Newstalk ZB";
  if (/youtube/i.test(searchableText)) return "Video interview";
  return format === "Media" ? "External media" : author;
}

function rewriteInternalLinks(html) {
  return html.replace(
    /https?:\/\/(?:www\.)?mplaw\.nz\/([^"'#?\s]+)\/?/gi,
    (match, pathValue) => {
      const slug = pathValue.split("/").filter(Boolean).at(-1);
      return articleSlugs.has(slug) ? `./?article=${encodeURIComponent(slug)}` : match;
    },
  );
}

async function localiseInlineImages(html, slug) {
  const urls = [...html.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)].map((match) =>
    normaliseUrl(match[1]),
  );
  let output = html;

  for (const [index, url] of [...new Set(urls)].entries()) {
    const localPath = await localiseImage(url, `${slug}-inline-${index + 1}`);
    if (localPath) {
      output = output.split(url).join(`./${localPath}`);
      output = output.split(url.replace(/&/g, "&amp;")).join(`./${localPath}`);
    } else {
      output = output.replace(
        new RegExp(`<img[^>]+src=["']${url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["'][^>]*>`, "gi"),
        "",
      );
    }
  }

  return output;
}

function sanitiseArticle(html) {
  return sanitizeHtml(html, {
    allowedTags: [
      "p", "br", "hr", "h2", "h3", "h4", "strong", "b", "em", "i", "u",
      "ul", "ol", "li", "blockquote", "a", "figure", "figcaption", "img",
      "video", "audio", "source", "iframe", "table", "thead", "tbody", "tr",
      "th", "td", "sup", "sub", "small", "div", "span",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel", "aria-label"],
      img: ["src", "alt", "width", "height", "loading"],
      video: ["src", "controls", "poster"],
      audio: ["src", "controls"],
      source: ["src", "type"],
      iframe: ["src", "title", "width", "height", "allow", "allowfullscreen", "loading"],
      th: ["scope", "colspan", "rowspan"],
      td: ["colspan", "rowspan"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    allowedIframeHostnames: ["www.youtube.com", "youtube.com", "www.youtube-nocookie.com"],
    transformTags: {
      a: (tagName, attributes) => ({
        tagName,
        attribs: {
          ...attributes,
          ...(attributes.href?.startsWith("http")
            ? { target: "_blank", rel: "noreferrer noopener" }
            : {}),
        },
      }),
      img: (tagName, attributes) => ({
        tagName,
        attribs: { ...attributes, loading: "lazy", alt: attributes.alt ?? "" },
      }),
      iframe: (tagName, attributes) => ({
        tagName,
        attribs: {
          ...attributes,
          loading: "lazy",
          title: attributes.title ?? "Embedded article media",
        },
      }),
    },
    exclusiveFilter(frame) {
      return frame.tag === "iframe" && /mplaw\.nz\//i.test(frame.attribs.src ?? "");
    },
  });
}

await mkdir(imageDirectory, { recursive: true });

const library = [];
for (const post of articlePosts) {
  const title = textOnly(post.title.rendered);
  const rawText = textOnly(post.content.rendered);
  const author = post.categories.some((id) =>
    snapshot.collections.categories.find((category) => category.id === id)?.slug === "adelina-ong",
  )
    ? "Adelina Ong"
    : "Dave Ananth";
  const format = formatFor(post, rawText);
  const media = mediaById.get(post.featured_media);
  const featuredUrl = preferredMediaUrl(media);
  let featuredImage = featuredUrl
    ? await localiseImage(featuredUrl, `${post.slug}-featured`)
    : null;
  const linkedHtml = rewriteInternalLinks(post.content.rendered);
  const localisedHtml = await localiseInlineImages(linkedHtml, post.slug);
  if (!featuredImage) {
    featuredImage = localisedHtml.match(/src=["']\.\/(assets\/articles\/[^"']+)["']/i)?.[1] ?? null;
  }
  const content = sanitiseArticle(localisedHtml);
  const excerptSource = textOnly(post.excerpt.rendered) || rawText;
  const excerpt = excerptSource.length > 230
    ? `${excerptSource.slice(0, 227).replace(/\s+\S*$/, "")}…`
    : excerptSource;
  const wordCount = rawText.split(/\s+/).filter(Boolean).length;

  library.push({
    id: post.id,
    slug: post.slug,
    title,
    excerpt,
    content,
    date: post.date.slice(0, 10),
    modified: post.modified,
    format,
    topic: topicFor(title, rawText),
    author,
    source: sourceFor(format, `${title} ${rawText}`, author),
    readingMinutes: Math.max(1, Math.ceil(wordCount / 220)),
    featuredImage,
    featuredImageAlt: textOnly(media?.alt_text) || title,
    originalUrl: post.link,
  });
}

library.sort((a, b) => b.date.localeCompare(a.date));
await writeFile(libraryPath, `${JSON.stringify(library, null, 2)}\n`, "utf8");

console.log(
  `Built ${library.length} articles with ${localizedImages.size} local images at ${libraryPath.pathname.replace(projectRoot.pathname, "")}`,
);
