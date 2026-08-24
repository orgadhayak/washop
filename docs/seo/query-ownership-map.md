# Query-to-page ownership map

| Search intent | Primary owner | Supporting routes | Implementation decision |
| --- | --- | --- | --- |
| Israeli WaShop brand and overview | `/` | `/about`, `/contact` | Hebrew/Israel positioning, buyer and seller CTAs, Global treated as a separate destination |
| Find Israeli WhatsApp stores | `/shops` | Active categories and shop profiles | Preserve URL and SSR cards; filters canonicalize to `/shops` and are noindex |
| Individual approved merchant | `/shop/[slug]` | Matching categories, `/shops` | Unique metadata, self-canonical, breadcrumbs and approved public data only |
| Specific directory category | Populated `/category/[slug]` | `/shops`, matching shops | Index only when at least one approved store exists |
| International English directory | `/global` | English Global article | Explicit WaShop Global title/H1 and content-level `lang="en" dir="ltr"` |
| Submit a store | `/add-store` | `/seller-rules`, seller articles | Manual review, no approval/traffic/sales promise |
| WhatsApp customer service for businesses | `/blog/sherut-lakohot-bewhatsapp-laasakim` | `/contact`, `/shops`, `/add-store` | Existing article strengthened; no competing article created |
| Virtual store and WhatsApp catalog guidance | `/blog/hanut-virtualit-bewhatsapp` | `/shops`, `/add-store` | URL, H1 and topic preserved; only CTR-focused description changed |
| Contact WaShop | `/contact` | Header/footer | Explicitly WaShop contact, not official WhatsApp support |

## Guardrails

- Do not target store-builder, automation, payments or synchronization as WaShop product capabilities.
- Do not let `/global` act as the generic Israeli brand homepage.
- Do not index search/filter combinations or empty categories.
- Do not create a second article for customer-service or virtual-store intent.
