import Link from "next/link";
import {
  BadgeCheck,
  Gift,
  MapPin,
  MessageCircle,
  Star,
  Store,
  Tags,
} from "lucide-react";
import { categories } from "@/data/categories";
import type { Shop } from "@/data/shops";
import { siteConfig } from "@/lib/site";
import { createChatUrl } from "@/lib/whatsapp";

const categoryBySlug = new Map(categories.map((category) => [category.slug, category]));

type ShopCardProps = {
  shop: Shop;
};

export function ShopCard({ shop }: ShopCardProps) {
  const chatMessage = shop.hasWashopBenefit
    ? "שלום, הגעתי דרך וואשופ ורציתי לשאול על ההטבה ללקוחות וואשופ."
    : siteConfig.shopMessage;

  return (
    <article className="relative flex h-full flex-col overflow-hidden rounded-xl border border-emerald-300/50 bg-gradient-to-br from-emerald-700 via-emerald-600 to-green-500 p-4 text-white shadow-sm shadow-emerald-950/10 transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-900/15 sm:p-5">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-white/10" />

      {shop.hasWashopBenefit ? (
        <div className="relative mb-4 flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-black text-emerald-800 shadow-sm">
            <Gift className="size-3.5" aria-hidden="true" />
            {shop.benefitLabel ?? "הטבת וואשופ פעילה"}
          </span>
          <span className="text-xs font-bold text-emerald-50">
            {shop.benefitText ?? "בקשו את ההטבה כשאתם פונים דרך וואשופ"}
          </span>
        </div>
      ) : null}

      <div className="flex items-start gap-3">
        <div className="relative grid size-11 shrink-0 place-items-center rounded-xl bg-white/15 text-white ring-1 ring-white/25">
          <Store className="size-5" aria-hidden="true" />
        </div>
        <div className="relative min-w-0 flex-1">
          <Link href={`/shop/${shop.slug}`} className="group">
            <h3 className="text-2xl font-black leading-tight text-white transition group-hover:text-emerald-100 sm:text-3xl">
              {shop.name}
            </h3>
          </Link>
          <div className="mt-2 flex flex-wrap gap-x-2 gap-y-1 text-xs font-bold text-emerald-50">
            <span className="inline-flex items-center gap-1">
              <MapPin className="size-3.5" aria-hidden="true" />
              {shop.city}
            </span>
            <span className="inline-flex items-center gap-1">
              <Store className="size-3.5" aria-hidden="true" />
              עסק נפרד עם קטלוג וואטסאפ משלו
            </span>
          </div>
        </div>
      </div>

      <p className="relative mt-4 inline-flex w-fit rounded-full bg-white/15 px-3 py-1.5 text-sm font-black text-white ring-1 ring-white/15">
        קטלוג וואטסאפ פעיל לעסק הזה
      </p>

      <p className="relative mt-3 flex-1 text-sm leading-6 text-emerald-50">
        {shop.description}
      </p>

      <div className="relative mt-4 flex flex-wrap gap-1.5">
        {shop.categories.map((categorySlug) => {
          const category = categoryBySlug.get(categorySlug);

          return category ? (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="rounded-full bg-white px-2.5 py-1 text-xs font-black text-emerald-800 transition hover:bg-emerald-50"
            >
              {category.name}
            </Link>
          ) : null;
        })}
      </div>

      <div className="relative mt-2.5 flex flex-wrap gap-1.5">
        {shop.tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-xs font-bold text-white"
          >
            <Tags className="size-3.5 text-emerald-100" aria-hidden="true" />
            {tag}
          </span>
        ))}
      </div>

      <div className="relative mt-3 flex flex-wrap items-center justify-between gap-3 rounded-lg bg-white px-3 py-2.5 text-emerald-950 shadow-sm">
        <div className="flex items-center gap-1 text-emerald-600" aria-label="דירוג וואשופ חמישה כוכבים">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star key={index} className="size-3.5 fill-current" aria-hidden="true" />
          ))}
        </div>
        <p className="text-sm font-black">
          דירוג וואשופ: {shop.washopRating.toFixed(1)}
        </p>
      </div>

      <div className="relative mt-3 flex flex-wrap gap-1.5">
        {shop.badges.map((badge) => (
          <span
            key={badge}
            className="inline-flex items-center gap-1 rounded-full bg-emerald-950/20 px-2.5 py-1 text-xs font-bold text-emerald-50 ring-1 ring-white/10"
          >
            <BadgeCheck className="size-3.5 text-emerald-100" aria-hidden="true" />
            {badge}
          </span>
        ))}
      </div>

      {shop.status === "approved" ? (
        <p className="relative mt-3 text-xs font-black text-emerald-50">
          נבדק ידנית על ידי וואשופ
        </p>
      ) : null}

      <p className="relative mt-2.5 rounded-lg bg-emerald-950/20 p-2.5 text-xs font-bold leading-5 text-emerald-50 ring-1 ring-white/10">
        פנייה דרך וואשופ מסמנת לבעל העסק שהגעתם מאתר איכותי.{" "}
        {shop.hasWashopBenefit
          ? "בקשו את הטבת וואשופ, והמטרה היא שתקבלו יחס רציני, שירות טוב ומחיר הוגן ככל האפשר."
          : "המטרה היא שתקבלו יחס רציני, שירות טוב ומחיר הוגן ככל האפשר."}
      </p>

      <div className="relative mt-4 grid gap-2 sm:grid-cols-2">
        <a
          href={shop.catalogUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-white px-4 text-sm font-black text-emerald-800 shadow-sm transition hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-emerald-600"
        >
          צפייה בקטלוג
        </a>
        <a
          href={createChatUrl(shop.phone, chatMessage)}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-white/50 bg-white/10 px-4 text-sm font-black text-white transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-emerald-600"
        >
          <MessageCircle className="size-4" aria-hidden="true" />
          שליחת הודעה
        </a>
      </div>
    </article>
  );
}
