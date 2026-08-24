# Internal-link report

## Crawl paths

- Buyer path: `/` -> `/shops` -> populated `/category/[slug]` -> `/shop/[slug]`.
- Direct directory path: `/shops` -> every approved `/shop/[slug]` through server-rendered HTML anchors.
- Seller path: `/` and the header -> `/add-store` -> `/seller-rules` and the submission form.
- Editorial path: homepage and `/shops` -> the existing virtual-store and customer-service guides -> `/shops` or `/add-store`.
- Language path: Hebrew header/homepage -> `/global`; Global header/page -> `/`.

## Before and after

| Measure | Before | After |
| --- | ---: | ---: |
| Public routes | 69 | 69 |
| Indexable routes | 47 | 47 |
| Sitemap routes | 47 | 47 |
| Orphaned routes | 18 | 21 |

The three additional orphans are intentional: `technology-gadgets`, `phones-accessories` and `computers-office` were empty, noindex category pages that were accidentally linked sitewide from the footer. The footer now uses only populated categories, so all 21 empty categories have zero navigational inlinks, remain `noindex, follow` and remain outside the sitemap.

No indexable route is orphaned. All approved shops remain at crawl depth 1 from the homepage because they are featured, and are also linked from the directory and matching categories.

## Anchor decisions

- Kept descriptive, natural Hebrew anchors such as `חנויות וואטסאפ בישראל`, category names and exact public store names.
- Added visible breadcrumbs to shop profiles while retaining the directory link.
- Did not add sitewide links to every article or every category.
- Did not replace crawlable links with JavaScript-only navigation.
