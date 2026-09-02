import { readFile } from "node:fs/promises";

const shopsSource = await readFile("src/data/shops.ts", "utf8");
const aiMap = await readFile("public/llms-full.txt", "utf8");
const shopPattern = /\{\r?\n\s+id: "([^"]+)",[\s\S]*?\r?\n\s+status: "(approved|pending|hidden)",\r?\n\s+featured:/g;
const approvedShopSlugs = [];
const activeCategorySlugs = new Set();

for (const match of shopsSource.matchAll(shopPattern)) {
  const [block, slug, status] = match;
  if (status !== "approved") {
    continue;
  }

  approvedShopSlugs.push(slug);
  const categoriesMatch = block.match(/categories:\s*\[([\s\S]*?)\]/);
  for (const category of categoriesMatch?.[1]?.matchAll(/"([^"]+)"/g) ?? []) {
    activeCategorySlugs.add(category[1]);
  }
}

if (!approvedShopSlugs.length) {
  throw new Error("AI map audit could not find any approved shops in src/data/shops.ts");
}

const missingCategories = [...activeCategorySlugs]
  .filter((slug) => !aiMap.includes(`https://washop.co.il/category/${slug}`))
  .sort();
const missingShops = approvedShopSlugs
  .filter((slug) => !aiMap.includes(`https://washop.co.il/shop/${slug}`))
  .sort();

if (missingCategories.length || missingShops.length) {
  if (missingCategories.length) {
    console.error(`AI map is missing active categories: ${missingCategories.join(", ")}`);
  }
  if (missingShops.length) {
    console.error(`AI map is missing approved shops: ${missingShops.join(", ")}`);
  }
  process.exitCode = 1;
}

console.log(
  `AI map audit passed: ${activeCategorySlugs.size} active categories and ${approvedShopSlugs.length} approved shops are represented.`,
);
