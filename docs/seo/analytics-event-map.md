# Privacy-safe analytics event map

Vercel Analytics was already installed. Custom events now pass through `trackSafeEvent`, which accepts only an explicit property allowlist. Search text, form content, phone numbers, email addresses, contact names and WhatsApp message contents are never included.

| Event | Trigger | Safe properties |
| --- | --- | --- |
| `shop_directory_view` | `/shops` or `/global` directory mounts once | route, locale, approved store count |
| `category_view` | Category page mounts once | route, category slug, approved store count, locale |
| `shop_profile_view` | Approved shop profile mounts once | route, shop slug, locale |
| `whatsapp_seller_click` | Catalog or chat CTA | action, shop slug, surface |
| `add_store_start` | First focus or submission attempt in Hebrew/Global form | source, locale |
| `add_store_complete` | API confirms successful email delivery | source, locale |
| `seller_cta_click` | Header/home/Global seller CTA | destination, source, locale |
| `directory_search` | Debounced non-empty directory search | has-query boolean, result count, locale |
| `directory_filter` | Debounced category/location filter | filter booleans, category slug, result count, locale |
| `contact_submit` | WaShop email/WhatsApp contact action | method, source, route |
| `language_or_global_switch` | Hebrew/Global navigation | destination, source, locale |

## Duplication controls

- Page-view events use a client ref and fire once per component mount.
- Search/filter events are emitted only client-side after a 600 ms debounce.
- Form completion fires only after a successful API response, never when delivery fails.
- No server-side event duplicates a client event.
