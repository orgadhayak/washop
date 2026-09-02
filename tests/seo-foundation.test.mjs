import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const requiredEvents = [
  "shop_directory_view",
  "category_view",
  "shop_profile_view",
  "whatsapp_seller_click",
  "add_store_start",
  "add_store_complete",
  "seller_cta_click",
  "directory_search",
  "directory_filter",
  "contact_submit",
  "language_or_global_switch",
];

test("analytics exposes the required privacy-safe events", async () => {
  const analytics = await readFile("src/lib/analytics.ts", "utf8");

  for (const eventName of requiredEvents) {
    assert.match(analytics, new RegExp(`"${eventName}"`));
  }

  const safeKeys = analytics.match(/const safePropertyKeys[\s\S]*?\);/)?.[0] ?? "";
  for (const forbiddenKey of ["email", "phone", "message", "contact_name", "search_query"]) {
    assert.doesNotMatch(safeKeys, new RegExp(`"${forbiddenKey}"`));
  }
});

test("empty categories are excluded from footer navigation", async () => {
  const footer = await readFile("src/components/Footer.tsx", "utf8");
  const layout = await readFile("src/app/layout.tsx", "utf8");
  assert.match(layout, /getActiveCategoriesWithCounts/);
  assert.match(layout, /<Footer activeCategories=/);
  assert.match(footer, /activeCategories\.map/);
  assert.doesNotMatch(footer, /categories\.slice\(/);
  assert.doesNotMatch(footer, /category-stats/);
});

test("canonical host stays HTTPS and non-www", async () => {
  const site = await readFile("src/lib/site.ts", "utf8");
  const sitemap = await readFile("src/app/sitemap.ts", "utf8");
  assert.match(site, /domain:\s*"https:\/\/washop\.co\.il"/);
  assert.match(sitemap, /siteConfig\.domain/);
});

test("production observability is wired into the root layout", async () => {
  const layout = await readFile("src/app/layout.tsx", "utf8");
  const llms = await readFile("public/llms.txt", "utf8");
  const llmsFull = await readFile("public/llms-full.txt", "utf8");

  assert.match(layout, /@vercel\/analytics\/next/);
  assert.match(layout, /@vercel\/speed-insights\/next/);
  assert.match(layout, /<Analytics \/>/);
  assert.match(layout, /<SpeedInsights \/>/);
  assert.match(layout, /rel="alternate" type="text\/markdown" href="\/llms\.txt"/);
  assert.match(layout, /rel="describedby" type="text\/markdown" href="\/llms\.txt"/);
  assert.match(llms, /https:\/\/washop\.co\.il\/shops/);
  assert.match(llms, /https:\/\/washop\.co\.il\/llms-full\.txt/);
  assert.match(llmsFull, /https:\/\/washop\.co\.il\/global/);
  assert.match(llmsFull, /https:\/\/washop\.co\.il\/shop\/navines/);
  assert.match(llmsFull, /https:\/\/washop\.co\.il\/shop\/revolution-studio/);
  assert.match(llmsFull, /https:\/\/washop\.co\.il\/shop\/liel-gifts-and-blocks/);
  assert.match(llmsFull, /https:\/\/washop\.co\.il\/blog\/hanut-virtualit-bewhatsapp/);
});

test("global discovery exposes visible FAQ content as structured data", async () => {
  const globalPage = await readFile("src/app/global/page.tsx", "utf8");

  assert.match(globalPage, /Discover reviewed WhatsApp stores and shop by chat/);
  assert.match(globalPage, /"@type": "CollectionPage"/);
  assert.match(globalPage, /"@type": "BreadcrumbList"/);
  assert.match(globalPage, /globalStoreListId/);
  assert.match(globalPage, /"@type": "FAQPage"/);
  assert.match(globalPage, /faqItems\.map/);
});

test("active service categories expose useful FAQ content", async () => {
  const categoryPage = await readFile("src/app/category/[slug]/page.tsx", "utf8");

  assert.match(categoryPage, /faqs: Array/);
  assert.match(categoryPage, /פיתוח ווב או אפליקציה/);
  assert.match(categoryPage, /שאלות נפוצות בקטגוריה/);
  assert.match(categoryPage, /"@type": "FAQPage"/);
});

test("the blog index exposes crawlable collection metadata", async () => {
  const blog = await readFile("src/app/blog/page.tsx", "utf8");

  assert.match(blog, /CollectionPage/);
  assert.match(blog, /ItemList/);
  assert.match(blog, /BreadcrumbList/);
});

test("the homepage structured data exposes the real directory search action", async () => {
  const home = await readFile("src/app/page.tsx", "utf8");

  assert.match(home, /"@type": "SearchAction"/);
  assert.match(home, /urlTemplate: `\$\{siteConfig\.domain\}\/shops\?q=\{search_term_string\}`/);
  assert.match(home, /query-input/);
});

test("hidden shops are excluded from public routes and sitemap entries", async () => {
  const shops = await readFile("src/data/shops.ts", "utf8");
  const shopPage = await readFile("src/app/shop/[slug]/page.tsx", "utf8");
  const sitemap = await readFile("src/app/sitemap.ts", "utf8");

  assert.match(shops, /export type ShopStatus = "approved" \| "pending" \| "hidden"/);
  assert.match(shops, /export function getShopBySlug\(slug: string\) \{\s*return approvedShops\.find/s);
  assert.match(shopPage, /return approvedShops\.map\(\(shop\) => \(\{ slug: shop\.slug \}\)\)/);
  assert.match(sitemap, /\.filter\(\(shop\) => shop\.status === "approved"\)/);
});
