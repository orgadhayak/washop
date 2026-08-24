# WaShop SEO baseline, 2026-08-20

## Scope and evidence

This baseline records the supplied Google Search Console evidence through August 20, 2026 and a production crawl captured on August 24, 2026 before application changes on branch `codex/washop-gsc-seo-2026-08-20`.

No Search Console connector is available in this environment. Query and page performance below therefore uses the authoritative figures supplied in the implementation brief; the technical crawl was collected directly from `https://washop.co.il`.

## Search Console baseline

| Metric | Latest 28 days | Previous 28 days | Direction |
| --- | ---: | ---: | --- |
| Clicks | 8 | 13 | Down |
| Impressions | 565 | 527 | Up |
| CTR | 1.42% | 2.47% | Down |
| Average position | 38.01 | 48.85 | Improved |

Interpretation: discovery expanded and average position improved, while clicks and CTR declined. The evidence points to diluted intent ownership rather than a broad crawl or indexation failure.

## Page and query evidence

- `/shops` is the clearest directory winner: 3 clicks, 31 impressions, 9.68% CTR and average position 11.45.
- `/global` recorded 61 impressions at average position 20.77 and no clicks. It must stay differentiated from the Israeli brand homepage.
- `/` recorded 4 clicks and 257 impressions at average position 35.84, with clicks down from 12 in the comparison period.
- The brand query `washop` shifted from the Israeli homepage toward `/global`, indicating brand-intent competition.
- `/blog/hanut-virtualit-bewhatsapp` reached average position 9.55 and is a focused quick win. Its existing URL and topic ownership must be preserved.
- `/blog/sherut-lakohot-bewhatsapp-laasakim` owns the customer-service intent and should be strengthened instead of duplicated.
- `app-development`, `website-building` and `technical-services-businesses` are known weak category samples and require stronger context and internal links, not new competing URLs.
- `www` URLs appeared in Search Console; the canonical host is the non-`www` HTTPS origin.

## Production crawl baseline

Machine-readable inventories:

- `docs/seo/inventories/before-2026-08-20.json`
- `docs/seo/inventories/before-2026-08-20.csv`

| Check | Result |
| --- | ---: |
| Public routes audited | 69 |
| Routes returning 200 | 69 |
| Indexable routes | 47 |
| Routes in sitemap | 47 |
| Missing canonical | 0 |
| Canonical mismatch | 0 |
| Routes without exactly one H1 | 0 |
| Orphaned routes | 18 |

Technical conclusions:

- `http://washop.co.il/*` permanently redirects to `https://washop.co.il/*` with path preservation in one hop.
- `https://www.washop.co.il/*` permanently redirects to the non-`www` HTTPS URL with path preservation in one hop.
- `/shops` filter/query variants are `noindex, follow` and canonicalize to `/shops`.
- All four approved shop profiles return 200, are indexable, use self-referencing canonicals, appear in the sitemap, have one H1 and expose `LocalBusiness` structured data.
- Twenty-one empty category routes return 200 with `noindex, follow` and are excluded from the sitemap. Eighteen are already orphaned as intended; three early category records are still linked from the global footer and need removal from navigational surfaces.
- The site currently loads Vercel Analytics but does not emit the required privacy-safe journey events.

## Search-intent ownership baseline

| Intent | Owner | Supporting routes | Guardrail |
| --- | --- | --- | --- |
| Israeli WaShop brand | `/` | `/about`, `/contact` | Keep `/global` explicitly international |
| Browse approved stores | `/shops` | Active `/category/[slug]`, `/shop/[slug]` | Filter variants stay noindex |
| Individual business discovery | `/shop/[slug]` | Relevant active categories | Approved records only |
| Category discovery | Populated `/category/[slug]` | `/shops`, shop profiles | Empty categories stay noindex and out of navigation/sitemap |
| International discovery | `/global` | English Global article | No worldwide-shipping promise |
| Seller submission | `/add-store` | `/seller-rules`, relevant articles | Submission and approval are not guaranteed |
| Customer service guidance | `/blog/sherut-lakohot-bewhatsapp-laasakim` | `/contact`, `/shops` | Do not create a competing guide |
| WhatsApp virtual store guide | `/blog/hanut-virtualit-bewhatsapp` | `/add-store`, `/shops` | Preserve URL and focused topic |
| Contact WaShop | `/contact` | Footer and contextual links | Do not imply official WhatsApp support |

## Protected quick-win snapshot

The pre-change production snapshot for `/blog/hanut-virtualit-bewhatsapp` was recorded before its focused metadata update:

- Title: `איך פותחים חנות וירטואלית בוואטסאפ? | Washop`
- H1: `איך פותחים חנות וירטואלית בוואטסאפ?`
- Meta description: `מדריך מעשי לפתיחת חנות וירטואלית בוואטסאפ: הכנת קטלוג, קבלת פניות, תשלום, משלוח ושירות, עם הסבר על פרסום העסק בוואשופ.`
- Rendered word count: 822
- Rendered text length: 4,848 characters
- Opening copy: the page defines a Hebrew virtual store, positions a WhatsApp catalog as a simple starting point and explicitly states that WaShop is a discovery directory rather than a store builder.
- Editorial internal links: `/shops`, `/add-store`, `/seller-rules`, `/blog/sherut-lakohot-bewhatsapp-laasakim` and `/blog/taknon-hanut-virtualit`.

The complete pre-change rendered copy and link set remain in `docs/seo/url-inventory-before.json`.

## Implementation priorities

1. Preserve the healthy canonical, robots, sitemap and approved-shop foundations.
2. Remove empty categories from sitewide navigation while retaining their `noindex, follow` empty states.
3. Strengthen ownership and internal links around `/shops`, the two evidence-backed guides, weak populated categories and seller conversion.
4. Add privacy-safe analytics events without names, phone numbers, email addresses, free text or search queries.
5. Validate the same inventory against the Vercel Preview and compare before/after totals before any production decision.
