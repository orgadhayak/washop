# Redirect and canonical report

## Production verification

- Canonical origin: `https://washop.co.il`.
- `http://washop.co.il/shops?q=test` returns permanent `308` directly to `https://washop.co.il/shops?q=test`.
- `https://www.washop.co.il/shops?q=test` returns permanent `301` directly to `https://washop.co.il/shops?q=test`.
- All 69 audited route variants preserve their path and reach the intended non-www HTTPS page without an intermediate application redirect.
- Trailing slash variants use the existing Next.js policy, for example `/shops/` returns `308` to `/shops`.
- No redirect loops or path-to-home redirects were found.

## Canonical and discovery signals

- 69 of 69 public routes return 200 at their intended URL.
- 69 of 69 have the expected self-referencing production canonical.
- 47 indexable URLs exactly match the 47 sitemap entries.
- Every sitemap URL uses `https://washop.co.il`.
- `/shops?q=...`, `/shops?category=...` and `/shops?city=...` resolve with canonical `/shops` and `noindex, follow`.
- Empty category pages are `noindex, follow` and excluded from the sitemap.

## Configuration decision

The existing repository redirect in `next.config.ts` already matches the verified Vercel behavior and preserves paths. No Cloudflare, DNS or Vercel setting was changed. No repository redirect change was needed.
