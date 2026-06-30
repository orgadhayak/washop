import Link from "next/link";
import { Boxes, GraduationCap, Home, Scissors, Sparkles, Store } from "lucide-react";
import { categories } from "@/data/categories";
import { getShopsByCategory } from "@/data/shops";

const icons = [Store, Scissors, GraduationCap, Sparkles, Boxes, Home];

export function CategoryGrid() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((category, index) => {
        const Icon = icons[index % icons.length];
        const shopCount = getShopsByCategory(category.slug).length;

        return (
          <Link
            key={category.slug}
            href={`/category/${category.slug}`}
            className="group rounded-lg border border-emerald-950/10 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="grid size-11 place-items-center rounded-lg bg-emerald-50 text-emerald-700">
                <Icon className="size-5" aria-hidden="true" />
              </span>
            </div>
            <h3 className="mt-4 text-lg font-black text-zinc-950">{category.name}</h3>
            <p className="mt-2 min-h-14 text-sm leading-6 text-zinc-600">
              {category.description}
            </p>
            <p className="mt-4 text-sm font-bold text-emerald-700">
              {shopCount ? `${shopCount} חנויות פעילות` : "פתוח להצטרפות"}
            </p>
          </Link>
        );
      })}
    </div>
  );
}
