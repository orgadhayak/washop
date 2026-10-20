const siteUrl = "https://washop.co.il";
const sitemapUrl = `${siteUrl}/sitemap.xml`;
const key = "ebfaa9c2c0d446219dce757c67b56df9";
const keyLocation = `${siteUrl}/${key}.txt`;

const sitemapResponse = await fetch(sitemapUrl, {
  headers: { "user-agent": "WaShop-IndexNow/1.0" },
});

if (!sitemapResponse.ok) {
  throw new Error(`Could not fetch sitemap: ${sitemapResponse.status}`);
}

const sitemapXml = await sitemapResponse.text();
const urlList = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((match) => match[1].trim())
  .filter((url) => url.startsWith(`${siteUrl}/`) || url === siteUrl);

if (!urlList.length) {
  throw new Error("No WaShop URLs were found in the production sitemap");
}

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: "washop.co.il",
    key,
    keyLocation,
    urlList,
  }),
});

if (![200, 202].includes(response.status)) {
  const body = await response.text();
  throw new Error(`IndexNow submission failed (${response.status}): ${body}`);
}

console.log(`IndexNow accepted ${urlList.length} WaShop URLs (${response.status}).`);
