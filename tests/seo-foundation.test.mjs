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

test("hidden shops are excluded from public routes and sitemap entries", async () => {
  const shops = await readFile("src/data/shops.ts", "utf8");
  const shopPage = await readFile("src/app/shop/[slug]/page.tsx", "utf8");
  const sitemap = await readFile("src/app/sitemap.ts", "utf8");

  assert.match(shops, /export type ShopStatus = "approved" \| "pending" \| "hidden"/);
  assert.match(shops, /export function getShopBySlug\(slug: string\) \{\s*return approvedShops\.find/s);
  assert.match(shopPage, /return approvedShops\.map\(\(shop\) => \(\{ slug: shop\.slug \}\)\)/);
  assert.match(sitemap, /\.filter\(\(shop\) => shop\.status === "approved"\)/);
});
