import { access, readFile } from "node:fs/promises";

const snapshot = JSON.parse(await readFile(new URL("../src/data/mplaw-wordpress.json", import.meta.url), "utf8"));
const library = JSON.parse(await readFile(new URL("../src/data/article-library.json", import.meta.url), "utf8"));
const categoryId = snapshot.collections.categories.find((category) => category.slug === "articles-advice")?.id;
const expected = snapshot.collections.posts.filter((post) => post.categories.includes(categoryId));
const expectedSlugs = new Set(expected.map((post) => post.slug));
const actualSlugs = new Set(library.map((article) => article.slug));

if (library.length !== expected.length) throw new Error(`Expected ${expected.length} articles, found ${library.length}.`);
for (const slug of expectedSlugs) if (!actualSlugs.has(slug)) throw new Error(`Missing migrated article: ${slug}`);
for (const article of library) {
  if (!article.title || !article.excerpt || !article.content || !article.date) throw new Error(`Incomplete article: ${article.slug}`);
  if (/<(script|style|form)\b/i.test(article.content)) throw new Error(`Unsafe markup in: ${article.slug}`);
  if (/(?:mplaw\.nz|davetaxnz\.nz)\/wp-content/i.test(article.content)) throw new Error(`Legacy media dependency in: ${article.slug}`);
  if (article.featuredImage) await access(new URL(`../public/${article.featuredImage}`, import.meta.url));
}

console.log(`Verified ${library.length} migrated articles against the WordPress snapshot.`);
