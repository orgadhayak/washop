# GSC monitoring plan

## Baseline: 2026-08-28

Noise data uses two finalized 28-day windows: 2026-07-01 to 2026-07-28 and
2026-07-29 to 2026-08-25. This is directional data, not proof of causation.

- `/shops` improved from average position 21.12 to 9.70 and gained three clicks.
- The homepage improved from average position 40.76 to 33.30, while impressions
  declined from 324 to 294. Brand ownership and clearer directory language are
  the priority, not new thin pages.
- `/global` grew from 30 to 69 impressions and improved from position 52.13 to
  15.12. Keep its English intent distinct from the Hebrew homepage.
- The customer-service article grew from 12 to 66 impressions. Protect its
  practical business-service intent and do not target official WhatsApp support
  queries.
- The virtual-store article improved from position 10.45 to 8.32. Continue to
  support it with internal links rather than publish a competing near-duplicate.
- The submitted sitemap had zero errors and zero warnings when checked on
  2026-08-28. Google had not recently crawled `/shops`, so sitemap freshness and
  internal links should be monitored before making title changes again.

## Operating rules

- Make changes only when Search Console, crawl data or visible user needs support
  them.
- Do not create thin location pages, duplicate articles, fake store records,
  unverified shipping claims or unsupported review markup.
- Keep only approved stores in public directories, structured data and sitemap
  entries. Hidden or pending records must not render publicly.

## Day 7

- Confirm the Preview-approved changes have reached production only after an explicit production decision.
- Inspect Search Console indexing for `/shops`, all approved shop profiles and the three strengthened categories.
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
