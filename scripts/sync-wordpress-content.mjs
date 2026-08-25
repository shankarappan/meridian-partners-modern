import { mkdir, writeFile } from "node:fs/promises";

const siteUrl = "https://mplaw.nz";
const apiBase = `${siteUrl}/wp-json/wp/v2`;
const outputPath = new URL("../src/data/mplaw-wordpress.json", import.meta.url);

const collections = {
  posts: {
    endpoint: "posts",
    fields: "id,date,modified,slug,status,link,title,excerpt,content,featured_media,categories,tags",
  },
  pages: {
    endpoint: "pages",
    fields: "id,date,modified,slug,status,link,title,excerpt,content,featured_media,parent,menu_order",
  },
  media: {
    endpoint: "media",
    fields: "id,date,modified,slug,link,title,caption,alt_text,media_type,mime_type,source_url,media_details",
  },
  categories: {
    endpoint: "categories",
    fields: "id,count,description,link,name,slug,parent",
    orderby: "name",
  },
  tags: {
    endpoint: "tags",
    fields: "id,count,description,link,name,slug",
    orderby: "name",
  },
};

async function fetchCollection({ endpoint, fields, orderby = "modified" }) {
  const items = [];
  let page = 1;

  while (true) {
    const url = new URL(`${apiBase}/${endpoint}`);
    url.searchParams.set("per_page", "100");
    url.searchParams.set("page", String(page));
    url.searchParams.set("orderby", orderby);
    url.searchParams.set("order", "desc");
    url.searchParams.set("_fields", fields);

    const response = await fetch(url, {
      headers: { "User-Agent": "Meridian-Partners-content-sync/1.0" },
    });

    if (!response.ok) {
      throw new Error(`${endpoint} request failed (${response.status} ${response.statusText})`);
    }

    items.push(...(await response.json()));
    const totalPages = Number(response.headers.get("x-wp-totalpages") ?? "1");
    if (page >= totalPages) break;
    page += 1;
  }

  return items;
}

const data = {
  source: siteUrl,
  api: apiBase,
  access: "Public, read-only WordPress REST API",
  syncedAt: new Date().toISOString(),
  collections: {},
};

for (const [name, config] of Object.entries(collections)) {
  data.collections[name] = await fetchCollection(config);
}

await mkdir(new URL("../src/data/", import.meta.url), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(data, null, 2)}\n`, "utf8");

const counts = Object.fromEntries(
  Object.entries(data.collections).map(([name, items]) => [name, items.length]),
);

console.log(`Synced ${siteUrl}:`, counts);
