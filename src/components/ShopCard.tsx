import Link from "next/link";
import { BadgeCheck, ExternalLink, MapPin, MessageCircle, Store, Truck } from "lucide-react";
import { categories } from "@/data/categories";
import type { Shop } from "@/data/shops";
import { siteConfig } from "@/lib/site";
import { createChatUrl } from "@/lib/whatsapp";

const categoryBySlug = new Map(categories.map((category) => [category.slug, category]));

type ShopCardProps = {
  shop: Shop;
};

export function ShopCard({ shop }: ShopCardProps) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-emerald-950/10 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md">
      <div className="flex items-start gap-3">
        <div className="grid size-12 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 text-white">
          <Store className="size-6" aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <Link href={`/shop/${shop.slug}`} className="group">
            <h3 className="text-xl font-black leading-tight text-zinc-950 group-hover:text-emerald-700">
              {shop.name}
            </h3>
          </Link>
          <div className="mt-2 flex flex-wrap gap-2 text-xs font-bold text-zinc-600">
            <span className="inline-flex items-center gap-1">
              <MapPin className="size-3.5" aria-hidden="true" />
              {shop.city}
            </span>
            {shop.shipsNationwide ? (
              <span className="inline-flex items-center gap-1">
                <Truck className="size-3.5" aria-hidden="true" />
                משלוחים לכל הארץ
              </span>
            ) : null}
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {shop.categories.map((categorySlug) => {
          const category = categoryBySlug.get(categorySlug);

          return category ? (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800 transition hover:bg-emerald-100"
            >
              {category.name}
            </Link>
          ) : null;
        })}
      </div>

      <p className="mt-4 flex-1 text-sm leading-7 text-zinc-600">{shop.description}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {shop.badges.map((badge) => (
          <span
            key={badge}
            className="inline-flex items-center gap-1 rounded-full bg-zinc-100 px-3 py-1 text-xs font-bold text-zinc-700"
          >
            <BadgeCheck className="size-3.5 text-emerald-600" aria-hidden="true" />
            {badge}
          </span>
        ))}
      </div>

      {shop.status === "approved" ? (
        <p className="mt-4 text-xs font-bold text-emerald-700">
          נבדק ידנית על ידי WaShop
        </p>
      ) : null}

      <div className="mt-5 grid gap-2 sm:grid-cols-2">
        <a
          href={shop.catalogUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-emerald-600 px-4 text-sm font-black text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
        >
          <ExternalLink className="size-4" aria-hidden="true" />
          צפייה בקטלוג
        </a>
        <a
          href={createChatUrl(shop.phone, siteConfig.shopMessage)}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-emerald-200 bg-white px-4 text-sm font-black text-emerald-700 transition hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
        >
          <MessageCircle className="size-4" aria-hidden="true" />
          שליחת הודעה
        </a>
      </div>
    </article>
  );
}
