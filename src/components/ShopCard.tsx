import Link from "next/link";
import {
  BadgeCheck,
  CheckCircle2,
  Gift,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Star,
  Store,
  Tags,
} from "lucide-react";
import { categories } from "@/data/categories";
import type { Shop } from "@/data/shops";
import { siteConfig } from "@/lib/site";
import { createChatUrl } from "@/lib/whatsapp";

const categoryBySlug = new Map(categories.map((category) => [category.slug, category]));
const verificationBadges = [
  { label: "מאומת על ידי וואשופ", icon: BadgeCheck },
  { label: "נבדק ידנית", icon: ShieldCheck },
];

type ShopCardProps = {
  shop: Shop;
};

export function ShopCard({ shop }: ShopCardProps) {
  const chatMessage = shop.hasWashopBenefit
    ? "שלום, הגעתי דרך וואשופ ורציתי לשאול על ההטבה ללקוחות וואשופ."
    : siteConfig.shopMessage;
  const categoryItems = shop.categories
    .map((categorySlug) => {
      const category = categoryBySlug.get(categorySlug);

      return category ? { slug: category.slug, name: category.name } : null;
    })
    .filter((category): category is { slug: string; name: string } =>
      Boolean(category),
    );
  const visibleCategories = categoryItems.slice(0, 3);
  const remainingCategories = categoryItems.length - visibleCategories.length;
  const visibleTags = shop.tags.slice(0, 3);
  const remainingTags = shop.tags.length - visibleTags.length;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-emerald-200 bg-white shadow-sm shadow-emerald-950/5 transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md">
      <Link
        href={`/shop/${shop.slug}`}
        className="group block cursor-pointer border-b border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-emerald-50/80 p-4 transition hover:from-emerald-100/80 hover:to-white focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-inset sm:p-5"
      >
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-xs font-black text-emerald-800 shadow-sm">
            <CheckCircle2 className="size-3.5" aria-hidden="true" />
            קטלוג וואטסאפ פעיל
          </span>
          {shop.hasWashopBenefit ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-black text-white shadow-sm shadow-emerald-800/15">
              <Gift className="size-3.5" aria-hidden="true" />
              {shop.benefitLabel ?? "הטבת וואשופ פעילה"}
            </span>
          ) : null}
        </div>

        <div className="flex items-start gap-3">
          <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-emerald-600 text-white shadow-sm shadow-emerald-800/20">
            <Store className="size-5" aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-2xl font-black leading-tight text-zinc-950 transition group-hover:text-emerald-700 sm:text-3xl">
              {shop.name}
            </h3>
            <div className="mt-2 flex flex-wrap gap-x-2 gap-y-1 text-xs font-bold text-zinc-600">
              <span className="inline-flex items-center gap-1">
                <MapPin className="size-3.5 text-emerald-600" aria-hidden="true" />
                {shop.city}
              </span>
              <span className="inline-flex items-center gap-1">
                <Store className="size-3.5 text-emerald-600" aria-hidden="true" />
                עסק נפרד עם קטלוג וואטסאפ משלו
              </span>
            </div>
          </div>
        </div>

        {shop.hasWashopBenefit ? (
          <p className="mt-2 text-xs font-bold leading-6 text-emerald-800">
            {shop.benefitText ?? "בקשו את ההטבה כשאתם פונים דרך וואשופ"}
          </p>
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="overflow-hidden text-sm leading-6 text-zinc-600 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
          {shop.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {visibleCategories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-black text-emerald-800 transition hover:bg-emerald-100"
            >
              {category.name}
            </Link>
          ))}
          {remainingCategories > 0 ? (
            <span className="rounded-full border border-emerald-200 bg-white px-2.5 py-1 text-xs font-black text-emerald-700">
              +{remainingCategories} קטגוריות
            </span>
          ) : null}
        </div>

        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {visibleTags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs font-bold text-zinc-700"
            >
              <Tags className="size-3.5 text-emerald-600" aria-hidden="true" />
              {tag}
            </span>
          ))}
          {remainingTags > 0 ? (
            <span className="rounded-full border border-zinc-200 bg-white px-2.5 py-1 text-xs font-bold text-zinc-600">
              +{remainingTags} תגיות
            </span>
          ) : null}
        </div>

        <div className="mt-4 grid gap-2 sm:grid-cols-[1fr_auto] sm:items-center">
          <div className="flex flex-wrap items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-emerald-950">
            <div
              className="flex items-center gap-1 text-emerald-600"
              aria-label="דירוג וואשופ חמישה כוכבים"
            >
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className="size-3.5 fill-current"
                  aria-hidden="true"
                />
              ))}
            </div>
            <p className="text-sm font-black">
              דירוג וואשופ: {shop.washopRating.toFixed(1)}
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {verificationBadges.map(({ label, icon: Icon }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-2 text-xs font-black text-emerald-700 ring-1 ring-emerald-200"
              >
                <Icon className="size-3.5" aria-hidden="true" />
                {label}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <a
            href={shop.catalogUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-emerald-600 px-4 text-sm font-black text-white shadow-sm shadow-emerald-800/15 transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
          >
            צפייה בקטלוג
          </a>
          <a
            href={createChatUrl(shop.phone, chatMessage)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-emerald-200 bg-white px-4 text-sm font-black text-emerald-700 transition hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
          >
            <MessageCircle className="size-4" aria-hidden="true" />
            שליחת הודעה
          </a>
        </div>
      </div>
    </article>
  );
}
