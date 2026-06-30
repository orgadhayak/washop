"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { categories } from "@/data/categories";
import { approvedShops } from "@/data/shops";
import { ShopCard } from "@/components/ShopCard";

type ShopsDirectoryProps = {
  initialQuery?: string;
  initialCategory?: string;
  initialNationwide?: boolean;
};

export function ShopsDirectory({
  initialQuery = "",
  initialCategory = "",
  initialNationwide = false,
}: ShopsDirectoryProps) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [nationwide, setNationwide] = useState(initialNationwide);

  const filteredShops = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return approvedShops.filter((shop) => {
      const matchesQuery =
        !normalizedQuery ||
        [shop.name, shop.description, ...shop.tags]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);
      const matchesCategory = !category || shop.categories.includes(category);
      const matchesNationwide = !nationwide || shop.shipsNationwide;

      return matchesQuery && matchesCategory && matchesNationwide;
    });
  }, [category, nationwide, query]);

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-emerald-950/10 bg-white p-4 shadow-sm">
        <div className="grid gap-3 lg:grid-cols-[1fr_260px_auto]">
          <label className="relative block">
            <span className="sr-only">חיפוש חנות, קטגוריה או מוצר</span>
            <Search
              className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-zinc-400"
              aria-hidden="true"
            />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="חפשו חנות, קטגוריה או מוצר"
              className="h-12 w-full rounded-full border border-zinc-200 bg-zinc-50 pr-12 pl-4 text-base text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
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

          <label className="flex h-12 items-center justify-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-4 text-sm font-bold text-zinc-800">
            <input
              type="checkbox"
              checked={nationwide}
              onChange={(event) => setNationwide(event.target.checked)}
              className="size-4 accent-emerald-600"
            />
            משלוחים לכל הארץ
          </label>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 text-sm font-bold text-zinc-600">
        <span className="inline-flex items-center gap-2">
          <SlidersHorizontal className="size-4" aria-hidden="true" />
          נמצאו {filteredShops.length} חנויות
        </span>
        <button
          type="button"
          onClick={() => {
            setQuery("");
            setCategory("");
            setNationwide(false);
          }}
          className="rounded-full px-3 py-2 text-emerald-700 transition hover:bg-emerald-50"
        >
          ניקוי סינון
        </button>
      </div>

      {filteredShops.length ? (
        <div className="grid gap-4 lg:grid-cols-2">
          {filteredShops.map((shop) => (
            <ShopCard key={shop.id} shop={shop} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-emerald-300 bg-emerald-50/60 p-8 text-center">
          <h2 className="text-2xl font-black text-zinc-950">
            אין עדיין חנויות בקטגוריה הזו — רוצים להוסיף חנות?
          </h2>
          <p className="mt-3 text-zinc-600">
            אפשר לשלוח חנות וואטסאפ לבדיקה, ואנחנו נבחן אם היא מתאימה לפרסום
            ב-WaShop.
          </p>
        </div>
      )}
    </div>
  );
}
