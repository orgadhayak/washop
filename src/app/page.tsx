import type { Metadata } from "next";
import Link from "next/link";
import {
  BadgeCheck,
  Handshake,
  MessageCircle,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Store,
  Tags,
  Zap,
} from "lucide-react";
import { CategoryGrid } from "@/components/CategoryGrid";
import { HeroVisual } from "@/components/HeroVisual";
import { HomeStoresMomentum } from "@/components/HomeStoresMomentum";
import { ResponsiveSearchInput } from "@/components/ResponsiveSearchInput";
import { SectionHeader } from "@/components/SectionHeader";
import { ShopCard } from "@/components/ShopCard";
import { blogPosts } from "@/data/blog";
import { approvedShops, featuredShops } from "@/data/shops";
import { siteConfig } from "@/lib/site";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "washop.co.il | חנויות וואטסאפ בישראל",
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
};

const benefits = [
  { title: "קשר ישיר עם המוכר", icon: MessageCircle },
  { title: "אפשרות למחיר הוגן", icon: Tags },
  { title: "בלי אתר מסובך", icon: Zap },
  { title: "שאלות ותשובות בזמן אמת", icon: Sparkles },
  { title: "קנייה דרך קטלוג מוכר ונוח", icon: ShoppingBag },
];

export default function Home() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.domain,
      inLanguage: "he-IL",
      description: siteConfig.description,
      potentialAction: {
        "@type": "SearchAction",
        target: `${siteConfig.domain}/shops?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: siteConfig.shortName,
      url: siteConfig.domain,
      email: siteConfig.supportEmail,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        areaServed: "IL",
        availableLanguage: ["he"],
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "חנויות וואטסאפ מומלצות בישראל",
      itemListElement: approvedShops.map((shop, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(`/shop/${shop.slug}`),
        name: shop.name,
      })),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="overflow-hidden border-b border-emerald-950/10 bg-white">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-black text-emerald-800">
              <ShieldCheck className="size-4" aria-hidden="true" />
              {siteConfig.trustLine}
            </div>
            <h1 className="mt-6 max-w-3xl text-4xl font-black leading-tight text-zinc-950 sm:text-6xl">
              כל חנויות הוואטסאפ הכי טובות בישראל
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-9 text-zinc-600 sm:text-xl">
              גלו חנויות ישראליות שמוכרות ישירות דרך קטלוג וואטסאפ, בלי אתר
              מסובך, בלי עמלות מיותרות ועם קשר ישיר למוכר.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/shops"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 text-base font-black text-white shadow-lg shadow-emerald-700/20 transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
              >
                <Store className="size-5" aria-hidden="true" />
                גלה חנויות עכשיו
              </Link>
              <Link
                href="/add-store"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-emerald-200 bg-white px-6 text-base font-black text-emerald-700 transition hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
              >
                הוספת חנות וואטסאפ
              </Link>
            </div>
            <p className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-zinc-600">
              <BadgeCheck className="size-4 text-emerald-600" aria-hidden="true" />
              כל חנות נבדקת ידנית לפני שהיא מופיעה באתר.
            </p>
          </div>
          <HeroVisual />
        </div>
      </section>

      <HomeStoresMomentum />

      <section className="bg-white py-6">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
          <form action="/shops" className="relative">
            <label className="sr-only" htmlFor="home-search">
              חיפוש חנות, קטגוריה, עיר או מוצר
            </label>
            <Search
              className="pointer-events-none absolute right-5 top-1/2 size-6 -translate-y-1/2 text-zinc-400"
              aria-hidden="true"
            />
            <ResponsiveSearchInput
              id="home-search"
              name="q"
              desktopPlaceholder="חפשו חנות, קטגוריה, עיר או מוצר"
              mobilePlaceholder="חפשו עיר, מוצר או חנות"
              dir="rtl"
              className="h-16 w-full rounded-full border border-emerald-200 bg-white pr-14 pl-24 text-sm font-bold text-zinc-950 shadow-lg shadow-emerald-950/5 outline-none transition placeholder:text-sm placeholder:text-zinc-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 sm:pl-32 sm:text-lg sm:placeholder:text-lg"
            />
            <button
              type="submit"
              className="absolute left-2 top-1/2 inline-flex h-12 -translate-y-1/2 items-center justify-center rounded-full bg-zinc-950 px-5 text-sm font-black text-white transition hover:bg-emerald-700"
            >
              חיפוש
            </button>
          </form>
        </div>
      </section>

      <section className="py-14 sm:py-18">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="חנויות מומלצות"
            title="חנויות וואטסאפ שכבר אפשר לגלות"
            description="התחלה נקייה עם חנויות מאושרות, קטגוריות פעילות ומקום להוסיף עוד עסקים איכותיים."
          />
          <div className="mx-auto mt-10 grid max-w-6xl gap-6 lg:grid-cols-2">
            {featuredShops.map((shop) => (
              <ShopCard key={shop.id} shop={shop} />
            ))}
          </div>
        </div>
      </section>

      <section id="categories" className="bg-white py-14 sm:py-18">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="קטגוריות"
            title="גלו חנויות לפי תחום"
            description="גם קטגוריות שעדיין ריקות מוכנות לקליטת חנויות חדשות, כדי שהאתר ירגיש חי ומתפתח מהיום הראשון."
          />
          <div className="mt-10">
            <CategoryGrid />
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-18">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="למה וואטסאפ"
            title="קנייה ישירה, מהירה ופשוטה יותר"
            description="חנויות וואטסאפ בישראל מאפשרות חוויית קנייה קרובה יותר למוכר ופחות תלויה במערכות מסובכות."
          />
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <div
                  key={benefit.title}
                  className="rounded-lg border border-emerald-950/10 bg-white p-5 text-center shadow-sm"
                >
                  <span className="mx-auto grid size-12 place-items-center rounded-lg bg-emerald-50 text-emerald-700">
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-base font-black text-zinc-950">
                    {benefit.title}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-zinc-950 py-14 text-white sm:py-18">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-sm font-black text-emerald-300">סטנדרט פרסום</p>
            <h2 className="mt-2 text-3xl font-black leading-tight sm:text-4xl">
              וואשופ לא מיועד לכל אחד
            </h2>
          </div>
          <div>
            <p className="text-lg leading-9 text-zinc-200">
              אנחנו רוצים לרכז חנויות וואטסאפ איכותיות, חוקיות ורציניות בלבד.
              כל חנות נבדקת ידנית לפני שהיא מופיעה באתר, כדי שהלקוחות יוכלו
              למצוא עסקים אמיתיים, שירות טוב וקטלוגים שימושיים.
            </p>
            <Link
              href="/seller-rules"
              className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-emerald-500 px-6 text-sm font-black text-zinc-950 transition hover:bg-emerald-400"
            >
              מי יכול לפרסם בוואשופ?
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-18">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_auto] lg:px-8">
          <div>
            <h2 className="text-3xl font-black leading-tight text-zinc-950 sm:text-4xl">
              יש לכם חנות וואטסאפ?
            </h2>
            <p className="mt-4 max-w-3xl text-lg leading-9 text-zinc-600">
              שלחו פרטים, ואנחנו נבדוק אם היא מתאימה.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/add-store"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 text-base font-black text-white transition hover:bg-emerald-700"
            >
              שליחת חנות לבדיקה
            </Link>
            <Link
              href="/partners"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-emerald-200 bg-white px-6 text-base font-black text-emerald-700 transition hover:bg-emerald-50"
            >
              <Handshake className="size-5" aria-hidden="true" />
              תוכנית שותפים
            </Link>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-18">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="מהבלוג" title="מחשבות על קנייה ישירה בוואטסאפ" />
          <div className="mt-10 grid gap-4">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-lg border border-emerald-950/10 bg-white p-6 shadow-sm transition hover:border-emerald-300 hover:shadow-md"
              >
                <p className="text-sm font-bold text-emerald-700">
                  {post.hebrewDate} • {post.gregorianDate}
                </p>
                <h3 className="mt-2 text-2xl font-black text-zinc-950 group-hover:text-emerald-700">
                  {post.title}
                </h3>
                <p className="mt-3 max-w-3xl text-base leading-7 text-zinc-600">
                  {post.excerpt}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-emerald-700">
                  {post.ctaLabel}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
