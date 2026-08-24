# GSC monitoring plan

## Day 7

- Confirm the Preview-approved changes have reached production only after an explicit production decision.
- Inspect Search Console indexing for `/shops`, all four shop profiles and the three strengthened categories.
- Check that `www` examples decline and no new host/path variants appear.
- Verify custom analytics events are arriving and contain only the documented safe dimensions.
- Compare crawl errors, sitemap processing and canonical selections; avoid judging ranking impact this early.

## Day 14

- Compare page/query ownership for `washop`, Israeli directory queries, Global queries, customer-service queries and virtual-store queries.
- Watch `/shops` clicks, impressions, CTR and average position against the supplied 28-day baseline.
- Check whether `/global` gains clicks without taking Israeli brand impressions from `/`.
- Review the three strengthened category URLs for query relevance, not only average position.
- Inspect directory-to-shop and seller CTA event funnels for obvious breakage; do not infer user identity.

## Day 28

- Compare full 28-day windows: clicks, impressions, CTR and average position by owner page.
- Evaluate the protected virtual-store article against its 22-impression, position-9.55 baseline.
- Evaluate the customer-service article against its query-specific baseline and confirm no competing URL emerged.
- Review index coverage for all approved shop profiles; investigate only evidence-backed exclusions.
- Decide whether any adjacent populated categories should merge only if query overlap, low differentiation and URL-level evidence support a permanent mapping.
- Keep empty categories noindex until approved inventory exists, then re-evaluate content, links and sitemap inclusion automatically through the existing count logic.
