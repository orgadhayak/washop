"use client";

import { useMemo, useState } from "react";
import {
  BadgeCheck,
  Globe2,
  Languages,
  MapPin,
  MessageCircle,
  Search,
  ShieldCheck,
  Store,
  Truck,
} from "lucide-react";
import { approvedGlobalShops } from "@/data/shops";
import { createChatUrl } from "@/lib/whatsapp";

const categoryNames: Record<string, string> = {
  "website-building": "Websites",
  "ai-tools": "AI tools",
  "software-digital": "Software and digital",
  "app-development": "Apps and development",
  "technical-services-businesses": "Technical services",
  "local-services": "Local services",
  "hair-barbers": "Hair and grooming",
  "beauty-care": "Beauty and care",
  "courses-training": "Courses and training",
  "hair-care-products": "Hair-care products",
  "barber-equipment-accessories": "Barber equipment",
  "gifts-events": "Gifts and events",
  "personalized-prints-gifts": "Personalized gifts",
  "judaica-shabbat": "Judaica and Shabbat",
  "home-design": "Home and design",
  "fashion-shoes": "Fashion and footwear",
  "health-lifestyle": "Health and lifestyle",
  "sports-fitness": "Sports and fitness",
};

const categoryOptions = Array.from(
  new Map(
    approvedGlobalShops.flatMap((shop) =>
      shop.categories.map((category) => [category, categoryNames[category] ?? category]),
    ),
  ),
).map(([slug, name]) => ({ slug, name }));

const locationOptions = Array.from(
  new Set(
    approvedGlobalShops.map((shop) =>
      [shop.cityEn ?? shop.city, shop.countryNameEn ?? "Israel"].filter(Boolean).join(", "),
    ),
  ),
).sort((a, b) => a.localeCompare(b));

function shippingLabel(shop: (typeof approvedGlobalShops)[number]) {
  if (shop.countryCode === "IL" && shop.shipsNationwide) {
    return "Ships across Israel";
  }

  return "Domestic shipping may be available";
}

export function GlobalStoreDirectory() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  const filteredShops = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return approvedGlobalShops.filter((shop) => {
      const englishCategories = shop.categories
        .map((item) => categoryNames[item] ?? item)
        .join(" ");
      const storeLocation = [shop.cityEn ?? shop.city, shop.countryNameEn ?? "Israel"]
        .filter(Boolean)
        .join(", ");
      const searchable = [
        shop.name,
        shop.nameEn ?? "",
        shop.descriptionEn ?? "",
        shop.description,
        shop.city,
        shop.cityEn ?? "",
        shop.countryNameEn ?? "",
        englishCategories,
        ...(shop.tags ?? []),
        ...(shop.searchAliases ?? []),
      ]
        .join(" ")
        .toLowerCase();

      const matchesQuery = !normalizedQuery || searchable.includes(normalizedQuery);
      const matchesCategory = !category || shop.categories.includes(category);
      const matchesLocation = !location || storeLocation === location;

      return matchesQuery && matchesCategory && matchesLocation;
    });
  }, [category, location, query]);

  return (
    <section id="stores" className="py-12 sm:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-black text-emerald-700">Approved stores</p>
          <h2 className="mt-2 text-3xl font-black leading-tight text-zinc-950 sm:text-4xl">
            Browse reviewed stores and start a direct chat
          </h2>
          <p className="mt-4 text-base leading-8 text-zinc-600">
            Only approved and globally visible stores appear here. Pending stores
            are never shown publicly.
          </p>
        </div>

        <div className="mt-7 rounded-xl border border-emerald-200 bg-white p-4 shadow-sm shadow-emerald-950/5">
          <div className="grid gap-3 lg:grid-cols-[1fr_240px_240px]">
            <label className="relative block">
              <span className="sr-only">Search stores</span>
              <Search
                className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-zinc-400"
                aria-hidden="true"
              />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by store, category, city or product"
                className="h-12 w-full rounded-full border border-emerald-200 bg-emerald-50/50 pl-12 pr-4 text-sm font-bold text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
              />
            </label>

            <label className="block">
              <span className="sr-only">Filter by category</span>
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="h-12 w-full rounded-full border border-zinc-200 bg-zinc-50 px-4 text-sm font-bold text-zinc-800 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
              >
                <option value="">All categories</option>
                {categoryOptions.map((item) => (
                  <option key={item.slug} value={item.slug}>
                    {item.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="sr-only">Filter by location</span>
              <select
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                className="h-12 w-full rounded-full border border-zinc-200 bg-zinc-50 px-4 text-sm font-bold text-zinc-800 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
              >
                <option value="">All locations</option>
                {locationOptions.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {filteredShops.map((shop) => {
            const storeLocation = [shop.cityEn ?? shop.city, shop.countryNameEn ?? "Israel"]
              .filter(Boolean)
              .join(", ");

            return (
              <article
                key={shop.id}
                className="flex h-full flex-col rounded-xl border border-emerald-200 bg-white p-5 shadow-sm shadow-emerald-950/5"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-800 ring-1 ring-emerald-200">
                    <ShieldCheck className="size-3.5" aria-hidden="true" />
                    Manually reviewed
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-black text-emerald-800 ring-1 ring-emerald-200">
                    <Truck className="size-3.5" aria-hidden="true" />
                    {shippingLabel(shop)}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-black text-zinc-700 ring-1 ring-zinc-200">
                    <Globe2 className="size-3.5 text-emerald-600" aria-hidden="true" />
                    Ask the seller about international delivery
                  </span>
                </div>

                <div className="mt-4 flex items-start gap-3">
                  <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-emerald-600 text-white shadow-sm shadow-emerald-800/20">
                    <Store className="size-6" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-2xl font-black leading-tight text-zinc-950">
                      <span dir="auto" style={{ unicodeBidi: "isolate" }}>
                        {shop.nameEn ?? shop.name}
                      </span>
                    </h3>
                    <p className="mt-1 text-sm font-bold text-zinc-500">
                      Original brand:{" "}
                      <span dir="auto" style={{ unicodeBidi: "isolate" }}>
                        {shop.name}
                      </span>
                    </p>
                    <p className="mt-2 inline-flex items-center gap-1 text-sm font-bold text-zinc-600">
                      <MapPin className="size-4 text-emerald-600" aria-hidden="true" />
                      {storeLocation}
                    </p>
                  </div>
                </div>

                <p className="mt-4 flex-1 text-base leading-7 text-zinc-600">
                  {shop.descriptionEn ?? shop.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {shop.categories.slice(0, 4).map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-black text-emerald-800"
                    >
                      {categoryNames[item] ?? item}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold text-zinc-600">
                  <span className="inline-flex items-center gap-1">
                    <Languages className="size-3.5 text-emerald-600" aria-hidden="true" />
                    Languages: {(shop.languages ?? ["Ask seller"]).join(", ")}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <BadgeCheck className="size-3.5 text-emerald-600" aria-hidden="true" />
                    Active WhatsApp catalog
                  </span>
                </div>

                <div className="mt-5 grid gap-2 sm:grid-cols-2">
                  <a
                    href={shop.catalogUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 items-center justify-center rounded-full bg-emerald-600 px-4 text-sm font-black text-white transition hover:bg-emerald-700"
                  >
                    Open catalog
                  </a>
                  <a
                    href={createChatUrl(
                      shop.phone,
                      "Hello, I found your store on WaShop Global and would like more details.",
                    )}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-emerald-200 bg-white px-4 text-sm font-black text-emerald-700 transition hover:bg-emerald-50"
                  >
                    <MessageCircle className="size-4" aria-hidden="true" />
                    Chat with store
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        {!filteredShops.length ? (
          <div className="mt-6 rounded-lg border border-dashed border-emerald-300 bg-emerald-50 p-8 text-center">
            <h3 className="text-2xl font-black text-zinc-950">No stores found</h3>
            <p className="mt-2 text-zinc-600">
              Try another search, category or location.
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
