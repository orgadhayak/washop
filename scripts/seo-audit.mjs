import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const args = Object.fromEntries(
  process.argv.slice(2).map((item) => {
    const [key, ...value] = item.replace(/^--/, "").split("=");
    return [key, value.join("=") || "true"];
  }),
);

const baseUrl = new URL(args.base ?? "https://washop.co.il");
const outputPrefix = args.output ?? "docs/seo/inventories/current";
const concurrency = Number(args.concurrency ?? 6);
const canonicalOrigin = "https://washop.co.il";
const headers = { "user-agent": "WaShopSEOAudit/1.0 (+https://washop.co.il)" };

const staticRoutes = [
  "/",
  "/global",
  "/shops",
  "/add-store",
  "/about",
  "/contact",
  "/blog",
  "/partners",
  "/privacy",
  "/terms",
  "/accessibility",
  "/seller-rules",
];

function extractSlugs(source) {
  return [...source.matchAll(/^\s{4}slug:\s*"([^"]+)"/gm)].map((match) => match[1]);
}

function decodeHtml(value = "") {
  const named = {
    amp: "&",
    apos: "'",
    gt: ">",
    lt: "<",
    nbsp: " ",
    quot: '"',
  };

  return value
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&([a-z]+);/gi, (entity, name) => named[name.toLowerCase()] ?? entity)
    .replace(/\s+/g, " ")
    .trim();
}

function stripHtml(value = "") {
  return decodeHtml(
    value
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " "),
  );
}

function attributes(tag = "") {
  const result = {};
  for (const match of tag.matchAll(/([:\w-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)) {
    result[match[1].toLowerCase()] = decodeHtml(match[2] ?? match[3] ?? match[4] ?? "");
  }
  return result;
}

function findTag(html, tagName, predicate) {
  for (const match of html.matchAll(new RegExp(`<${tagName}\\b[^>]*>`, "gi"))) {
    const attrs = attributes(match[0]);
    if (predicate(attrs)) return attrs;
  }
  return {};
}

function normalizeInternalHref(href, pageUrl) {
  if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return null;
  }

  try {
    const url = new URL(href, pageUrl);
    if (url.hostname !== "washop.co.il" && url.origin !== baseUrl.origin) return null;
    return url.pathname === "/" ? "/" : url.pathname.replace(/\/$/, "");
  } catch {
    return null;
  }
}

function routeIdentity(route) {
  const [type, entity] = route.split("/").filter(Boolean);
  if (["category", "shop", "blog"].includes(type)) {
    return { routeType: type, entity: entity ?? "" };
  }

  return { routeType: "static", entity: route === "/" ? "home" : type ?? "home" };
}

async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20_000);
  try {
    return await fetch(url, { ...options, headers, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

async function redirectChain(url) {
  const chain = [];
  let current = url;

  for (let step = 0; step < 5; step += 1) {
    try {
      const response = await fetchWithTimeout(current, { method: "HEAD", redirect: "manual" });
      const location = response.headers.get("location");
      chain.push({ status: response.status, url: current, location });
      if (!location || ![301, 302, 303, 307, 308].includes(response.status)) break;
      current = new URL(location, current).toString();
    } catch (error) {
      chain.push({ status: 0, url: current, location: null, error: error.message });
      break;
    }
  }

  return chain;
}

function parsePage(html, pageUrl) {
  const htmlTag = findTag(html, "html", () => true);
  const canonical = findTag(html, "link", (attrs) =>
    (attrs.rel ?? "").toLowerCase().split(/\s+/).includes("canonical"),
  ).href;
  const description = findTag(html, "meta", (attrs) =>
    (attrs.name ?? "").toLowerCase() === "description",
  ).content;
  const robots = findTag(html, "meta", (attrs) =>
    (attrs.name ?? "").toLowerCase() === "robots",
  ).content;
  const title = decodeHtml(html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "");
  const h1 = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((match) =>
    stripHtml(match[1]),
  );
  const jsonLd = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
    .flatMap((match) => {
      try {
        const value = JSON.parse(match[1]);
        return Array.isArray(value) ? value : [value];
      } catch {
        return [{ "@type": "INVALID_JSON_LD" }];
      }
    });
  const schemaTypes = [...new Set(jsonLd.map((item) => item?.["@type"]).flat().filter(Boolean))];
  const links = [...html.matchAll(/<a\b[^>]*>/gi)]
    .map((match) => attributes(match[0]).href)
    .map((href) => normalizeInternalHref(href, pageUrl))
    .filter(Boolean);
  const body = html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? html;
  const scopedLanguageTag = [...body.matchAll(/<[a-z][^>]*>/gi)]
    .map((match) => attributes(match[0]))
    .find((attrs) => attrs.lang || attrs.dir);
  const visibleText = stripHtml(body);

  return {
    canonical: canonical ? new URL(canonical, pageUrl).toString() : "",
    description,
    contentDir: scopedLanguageTag?.dir ?? htmlTag.dir ?? "",
    contentLang: scopedLanguageTag?.lang ?? htmlTag.lang ?? "",
    dir: htmlTag.dir ?? "",
    h1,
    lang: htmlTag.lang ?? "",
    links: [...new Set(links)],
    robots,
    schemaTypes,
    title,
    visibleText,
    contentLength: visibleText.length,
    wordCount: visibleText ? visibleText.split(/\s+/).length : 0,
  };
}

async function pooledMap(items, worker) {
  const results = new Array(items.length);
  let nextIndex = 0;

  async function run() {
    while (nextIndex < items.length) {
      const index = nextIndex;
      nextIndex += 1;
      results[index] = await worker(items[index], index);
    }
  }

  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, run));
  return results;
}

function csvEscape(value) {
  const text = Array.isArray(value) ? value.join("|") : String(value ?? "");
  return `"${text.replaceAll('"', '""')}"`;
}

const [categorySource, shopSource, blogSource] = await Promise.all([
  readFile("src/data/categories.ts", "utf8"),
  readFile("src/data/shops.ts", "utf8"),
  readFile("src/data/blog.ts", "utf8"),
]);

const routes = [
  ...staticRoutes,
  ...extractSlugs(categorySource).map((slug) => `/category/${slug}`),
  ...extractSlugs(shopSource).map((slug) => `/shop/${slug}`),
  ...extractSlugs(blogSource).map((slug) => `/blog/${slug}`),
].filter((value, index, all) => all.indexOf(value) === index);

const sitemapResponse = await fetchWithTimeout(new URL("/sitemap.xml", baseUrl));
const sitemapXml = await sitemapResponse.text();
const sitemapPaths = new Set(
  [...sitemapXml.matchAll(/<loc>([\s\S]*?)<\/loc>/gi)].map((match) => {
    const url = new URL(decodeHtml(match[1]));
    return url.pathname === "/" ? "/" : url.pathname.replace(/\/$/, "");
  }),
);

const robotsResponse = await fetchWithTimeout(new URL("/robots.txt", baseUrl));
const robotsTxt = await robotsResponse.text();

const pages = await pooledMap(routes, async (route) => {
  const url = new URL(route, baseUrl).toString();
  try {
    const response = await fetchWithTimeout(url, { redirect: "follow" });
    const html = await response.text();
    const parsed = parsePage(html, response.url);
    const expectedCanonical = new URL(route, canonicalOrigin).toString();
    const queryVariant = route === "/shops" ? `${url}?q=test` : null;
    const [httpChain, wwwChain, trailingChain, queryData] = await Promise.all([
      redirectChain(new URL(route, "http://washop.co.il").toString()),
      redirectChain(new URL(route, "https://www.washop.co.il").toString()),
      route === "/"
        ? Promise.resolve([])
        : redirectChain(`${url.endsWith("/") ? url.slice(0, -1) : url}/`),
      queryVariant
        ? fetchWithTimeout(queryVariant).then(async (result) => ({
            status: result.status,
            ...parsePage(await result.text(), result.url),
          }))
        : Promise.resolve(null),
    ]);

    return {
      route,
      ...routeIdentity(route),
      status: response.status,
      finalUrl: response.url,
      contentType: response.headers.get("content-type") ?? "",
      sitemap: sitemapPaths.has(route),
      expectedCanonical,
      canonicalMatches: parsed.canonical === expectedCanonical,
      indexable: response.status === 200 && !/(?:^|,)\s*noindex\b/i.test(parsed.robots ?? ""),
      renderedHtmlAvailable: parsed.h1.length > 0 && parsed.visibleText.length > 100,
      httpChain,
      wwwChain,
      trailingChain,
      queryVariant: queryData
        ? {
            status: queryData.status,
            canonical: queryData.canonical,
            robots: queryData.robots,
          }
        : null,
      ...parsed,
    };
  } catch (error) {
    return { route, status: 0, error: error.message, sitemap: sitemapPaths.has(route) };
  }
});

const routeSet = new Set(routes);
const inlinkCounts = Object.fromEntries(routes.map((route) => [route, 0]));
for (const page of pages) {
  for (const link of page.links ?? []) {
    if (routeSet.has(link)) inlinkCounts[link] += 1;
  }
}

const depth = { "/": 0 };
const queue = ["/"];
while (queue.length) {
  const current = queue.shift();
  const page = pages.find((item) => item.route === current);
  for (const link of page?.links ?? []) {
    if (!routeSet.has(link) || depth[link] !== undefined) continue;
    depth[link] = depth[current] + 1;
    queue.push(link);
  }
}

const titleCounts = {};
const descriptionCounts = {};
for (const page of pages) {
  if (page.title) titleCounts[page.title] = (titleCounts[page.title] ?? 0) + 1;
  if (page.description) {
    descriptionCounts[page.description] = (descriptionCounts[page.description] ?? 0) + 1;
  }
}

for (const page of pages) {
  page.inlinks = inlinkCounts[page.route] ?? 0;
  page.outlinks = (page.links ?? []).filter((link) => routeSet.has(link)).length;
  page.crawlDepth = depth[page.route] ?? null;
  page.titleDuplicateCount = page.title ? titleCounts[page.title] : 0;
  page.descriptionDuplicateCount = page.description
    ? descriptionCounts[page.description]
    : 0;
}

const inventory = {
  auditedAt: new Date().toISOString(),
  baseUrl: baseUrl.toString(),
  canonicalOrigin,
  robots: { status: robotsResponse.status, body: robotsTxt },
  sitemap: { status: sitemapResponse.status, paths: [...sitemapPaths] },
  totals: {
    routes: pages.length,
    ok: pages.filter((page) => page.status === 200).length,
    indexable: pages.filter((page) => page.indexable).length,
    inSitemap: pages.filter((page) => page.sitemap).length,
    missingCanonical: pages.filter((page) => page.status === 200 && !page.canonical).length,
    canonicalMismatch: pages.filter((page) => page.status === 200 && !page.canonicalMatches).length,
    missingH1: pages.filter((page) => page.status === 200 && page.h1?.length !== 1).length,
    orphaned: pages.filter((page) => page.route !== "/" && !page.inlinks).length,
  },
  pages,
};

const columns = [
  "route",
  "routeType",
  "entity",
  "status",
  "finalUrl",
  "indexable",
  "sitemap",
  "canonical",
  "canonicalMatches",
  "robots",
  "lang",
  "dir",
  "contentLang",
  "contentDir",
  "title",
  "description",
  "h1",
  "wordCount",
  "contentLength",
  "schemaTypes",
  "inlinks",
  "outlinks",
  "crawlDepth",
  "titleDuplicateCount",
  "descriptionDuplicateCount",
  "renderedHtmlAvailable",
  "httpChain",
  "wwwChain",
  "trailingChain",
];

const rows = pages.map((page) => ({
  ...page,
  h1: page.h1 ?? [],
  httpChain: (page.httpChain ?? []).map((item) => `${item.status}:${item.url}->${item.location ?? ""}`),
  wwwChain: (page.wwwChain ?? []).map((item) => `${item.status}:${item.url}->${item.location ?? ""}`),
  trailingChain: (page.trailingChain ?? []).map(
    (item) => `${item.status}:${item.url}->${item.location ?? ""}`,
  ),
}));
const csv = [
  columns.map(csvEscape).join(","),
  ...rows.map((row) => columns.map((column) => csvEscape(row[column])).join(",")),
].join("\n");

await mkdir(path.dirname(outputPrefix), { recursive: true });
await Promise.all([
  writeFile(`${outputPrefix}.json`, `${JSON.stringify(inventory, null, 2)}\n`, "utf8"),
  writeFile(`${outputPrefix}.csv`, `${csv}\n`, "utf8"),
]);

console.log(JSON.stringify(inventory.totals, null, 2));
