# Validation results

## Automated checks

| Check | Result |
| --- | --- |
| `npm run lint` | Passed |
| `npm run typecheck` | Passed |
| `npm run test:seo` | Passed, 3 of 3 tests |
| `npm run build` | Passed, 77 generated routes reported by Next.js |
| Production before crawl | Passed, 69 of 69 routes returned 200 |
| Local production-build after crawl | Passed, 69 of 69 routes returned 200 |
| Canonical mismatches | 0 before, 0 after |
| Missing/duplicate H1 failures | 0 before, 0 after |
| Invalid JSON-LD | 0 after |
| Indexable URL missing from sitemap | 0 after |
| Sitemap URL marked noindex | 0 after |
| `/shops` query variant | 200, canonical `/shops`, `noindex, follow` |
| Catalog URL checks | 4 of 4 returned a valid WhatsApp redirect |
| Invalid form API checks | Correct 400 responses, no email attempted |

## Responsive and visual checks

- Browser smoke tests covered `/`, `/global`, `/add-store`, `/seller-rules`, `/blog`, the English Global article, `/shops` and `/shop/liel-gifts-and-blocks`.
- Each route was checked at 320, 390 and 430 px: 24 route/viewport combinations, zero horizontal-overflow or missing-header/footer/H1 failures.
- Desktop visual checks used 1440 x 1000 for `/shops` and `/global`.
- `/global` and the English article expose English/LTR content regions at every tested viewport; Hebrew routes remain RTL.
- Four approved store cards and four crawlable profile links were present in the rendered `/shops` page.
- Search placeholder, filters, mobile shop hero contrast, long Hebrew shop name wrapping and CTA visibility were inspected.
- Browser console warnings/errors: none observed in the final local visual pass.

## Not run or not claimed

- No Lighthouse binary or field Core Web Vitals comparison was available, so no Lighthouse score claim is made.
- Form success email delivery was not triggered during QA to avoid sending test submissions. Existing route behavior, validation and successful-response-only analytics logic were inspected and built.
- Search Console was not queried directly because no connector was available; the supplied evidence remains the baseline.

## Preview verification

The Vercel Preview URL and post-deploy checks are reported in the final handoff because the URL is created only after this branch commit is pushed. Production is not part of this validation target and must remain unchanged.
