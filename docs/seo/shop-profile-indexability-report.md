# Approved shop profile indexability report

| Shop | Route | Status | Canonical | Sitemap | H1 | Schema | Crawlable inlinks |
| --- | --- | ---: | --- | --- | --- | --- | ---: |
| נביא נס ישראל | `/shop/navines` | 200 | Self | Yes | One, exact public name | LocalBusiness + BreadcrumbList | 8 |
| רוולושיין סטודיו | `/shop/revolution-studio` | 200 | Self | Yes | One, exact public name | LocalBusiness + BreadcrumbList | 7 |
| ליאל מארזים מתנות והדפסות | `/shop/liel-gifts-and-blocks` | 200 | Self | Yes | One, exact public name | LocalBusiness + BreadcrumbList | 6 |
| באמפרס | `/shop/bumpers` | 200 | Self | Yes | One, exact public name | LocalBusiness + BreadcrumbList | 5 |

## Findings

- The GSC observation that only one shop URL appeared did not indicate a confirmed implementation-level exclusion. All four approved profiles were already indexable and crawlable in production.
- The implementation retained every slug and approved record.
- Cards link to profiles with normal HTML anchors from `/shops`, the homepage where featured and every matching populated category.
- All four catalog URLs responded with a valid WhatsApp redirect (`302`) during validation.
- Metadata is unique. Shop title handling now uses an absolute natural title, avoiding duplicated template suffixes. Liel's title was cleaned without changing its URL.
- Breadcrumb structured data was added alongside the existing verified business data. No review, price, opening-hours or international-shipping schema was added.
- Raw phone numbers remain absent from visible copy. Existing approved catalog/chat links and public business structured data were preserved.
