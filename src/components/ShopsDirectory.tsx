"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { categories } from "@/data/categories";
import { approvedShops } from "@/data/shops";
import { ResponsiveSearchInput } from "@/components/ResponsiveSearchInput";
import { ShopCard } from "@/components/ShopCard";
import { ShopsStatusBanner } from "@/components/ShopsStatusBanner";

const categoryBySlug = new Map(categories.map((category) => [category.slug, category]));
const cityOptions = Array.from(new Set(approvedShops.map((shop) => shop.city).filter(Boolean))).sort(
  (a, b) => a.localeCompare(b, "he"),
);

type ShopsDirectoryProps = {
  initialQuery?: string;
  initialCategory?: string;
  initialCity?: string;
};

export function ShopsDirectory({
  initialQuery = "",
  initialCategory = "",
  initialCity = "",
}: ShopsDirectoryProps) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [city, setCity] = useState(initialCity);

  const filteredShops = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return approvedShops.filter((shop) => {
      const categoryNames = shop.categories
        .map((categorySlug) => categoryBySlug.get(categorySlug)?.name ?? categorySlug)
        .join(" ");
      const matchesQuery =
        !normalizedQuery ||
        [shop.name, shop.description, shop.city, categoryNames, ...shop.tags]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);
      const matchesCategory = !category || shop.categories.includes(category);
      const matchesCity = !city || shop.city === city;

      return matchesQuery && matchesCategory && matchesCity;
    });
  }, [category, city, query]);

  return (
    <div className="space-y-5">
      <div className="mx-auto max-w-6xl rounded-xl border border-emerald-200 bg-white p-4 shadow-sm shadow-emerald-950/5 sm:p-5">
        <div className="mb-4">
          <h2 className="text-2xl font-black leading-tight text-zinc-950">
            חפשו חנות וואטסאפ לפי עיר, קטגוריה או מוצר
          </h2>
          <p className="mt-1 text-sm font-bold leading-6 text-zinc-600">
            אפשר לחפש לפי שם חנות, תחום, תגית, מוצר או עיר.
          </p>
        </div>
        <div className="grid gap-3 lg:grid-cols-[1fr_240px_220px]">
          <label className="relative block">
            <span className="sr-only">חיפוש חנות, קטגוריה, עיר או מוצר</span>
            <Search
              className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-zinc-400"
              aria-hidden="true"
            />
            <ResponsiveSearchInput
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              desktopPlaceholder="חפשו עיר, מוצר או חנות"
              mobilePlaceholder="חפשו עיר, מוצר או חנות"
              dir="rtl"
              className="h-12 w-full rounded-full border border-emerald-200 bg-emerald-50/50 pr-12 pl-4 text-sm font-bold text-zinc-950 outline-none transition placeholder:text-sm placeholder:font-bold placeholder:text-zinc-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100 sm:text-base sm:placeholder:text-base"
            />
          </label>

          <label className="relative block">
            <span className="sr-only">סינון לפי קטגוריה</span>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="h-12 w-full rounded-full border border-zinc-200 bg-zinc-50 px-4 text-sm font-bold text-zinc-800 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
            >
              <option value="">כל הקטגוריות</option>
              {categories.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>

          <label className="relative block">
            <span className="sr-only">סינון לפי עיר</span>
            <select
              value={city}
              onChange={(event) => setCity(event.target.value)}
              className="h-12 w-full rounded-full border border-zinc-200 bg-zinc-50 px-4 text-sm font-bold text-zinc-800 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
            >
              <option value="">כל הערים</option>
              {cityOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 text-sm font-bold text-zinc-600">
        <span className="inline-flex items-center gap-2">
          <SlidersHorizontal className="size-4" aria-hidden="true" />
          נמצאו {filteredShops.length} חנויות
        </span>
        <button
          type="button"
          onClick={() => {
            setQuery("");
            setCategory("");
            setCity("");
          }}
          className="rounded-full px-3 py-2 text-emerald-700 transition hover:bg-emerald-50"
        >
          ניקוי סינון
        </button>
      </div>

      <div className="mx-auto max-w-6xl">
        <ShopsStatusBanner />
      </div>

      {filteredShops.length ? (
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
          {filteredShops.map((shop) => (
            <ShopCard key={shop.id} shop={shop} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-emerald-300 bg-emerald-50/60 p-8 text-center">
          <h2 className="text-2xl font-black text-zinc-950">
            עדיין אין חנויות בקטגוריה הזו. יש לכם חנות וואטסאפ מתאימה? שלחו אותה לבדיקה.
          </h2>
          <p className="mt-3 text-zinc-600">
            אפשר לשלוח חנות וואטסאפ לבדיקה, ואנחנו נבחן אם היא מתאימה לפרסום
            בוואשופ.
          </p>
        </div>
      )}
    </div>
  );
}
