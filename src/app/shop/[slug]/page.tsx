import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BadgeCheck,
  MapPin,
  MessageCircle,
  Star,
  Store,
  Truck,
} from "lucide-react";
import { AnalyticsPageView } from "@/components/AnalyticsPageView";
import { TrackedActionLink } from "@/components/TrackedActionLink";
import { categories } from "@/data/categories";
import { getShopBySlug, shops } from "@/data/shops";
import { siteConfig } from "@/lib/site";
import { absoluteUrl } from "@/lib/utils";
import { createChatUrl } from "@/lib/whatsapp";

type ShopPageProps = {
  params: Promise<{ slug: string }>;
};

const categoryBySlug = new Map(categories.map((category) => [category.slug, category]));

export function generateStaticParams() {
  return shops.map((shop) => ({ slug: shop.slug }));
}

export async function generateMetadata({ params }: ShopPageProps): Promise<Metadata> {
  const { slug } = await params;
  const shop = getShopBySlug(slug);

  if (!shop) {
    return {};
  }

  return {
    title: {
      absolute: shop.metaTitle ?? `${shop.name} חנות וואטסאפ ב${shop.city}`,
    },
    description: shop.metaDescription ?? shop.description,
    alternates: {
      canonical: `/shop/${shop.slug}`,
    },
    openGraph: {
      title: shop.metaTitle ?? `${shop.name} חנות וואטסאפ ב${shop.city}`,
      description: shop.metaDescription ?? shop.description,
      url: `/shop/${shop.slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: shop.metaTitle ?? `${shop.name} חנות וואטסאפ ב${shop.city}`,
      description: shop.metaDescription ?? shop.description,
    },
  };
}

export default async function ShopPage({ params }: ShopPageProps) {
  const { slug } = await params;
  const shop = getShopBySlug(slug);

  if (!shop) {
    notFound();
  }

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: shop.name,
      description: shop.description,
      url: absoluteUrl(`/shop/${shop.slug}`),
      telephone: shop.phone,
      address: {
        "@type": "PostalAddress",
        addressLocality: shop.city,
        addressCountry: shop.countryCode ?? "IL",
      },
      areaServed: shop.countryCode ?? "IL",
      sameAs: [shop.catalogUrl],
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "וואשופ",
          item: siteConfig.domain,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "חנויות וואטסאפ",
          item: absoluteUrl("/shops"),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: shop.name,
          item: absoluteUrl(`/shop/${shop.slug}`),
        },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AnalyticsPageView
        eventName="shop_profile_view"
        properties={{
          route: `/shop/${shop.slug}`,
          shop_slug: shop.slug,
          locale: "he",
        }}
      />
      <div className="bg-[#00a884] py-12 sm:py-16">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="פירורי לחם" className="flex flex-wrap items-center gap-2 text-sm font-black text-white/80">
            <Link href="/" className="hover:text-white">
              וואשופ
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/shops" className="hover:text-white">
              חנויות וואטסאפ
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-white">{shop.name}</span>
          </nav>

          <article className="mt-6 overflow-hidden rounded-lg border border-emerald-950/10 bg-white shadow-sm">
            <div className="shop-hero-safe p-4 sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="shop-hero-icon-safe grid size-12 shrink-0 place-items-center rounded-xl sm:size-16">
                  <Store className="size-7 sm:size-9" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <span className="shop-hero-pill-safe inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-black">
                    <BadgeCheck className="size-3.5" aria-hidden="true" />
                    חנות וואטסאפ מאושרת
                  </span>
                  <h1 className="shop-hero-title-safe mt-3 max-w-full break-words text-3xl font-black leading-tight sm:text-5xl">
                    {shop.name}
                  </h1>
                  {shop.shortDescription ? (
                    <p className="shop-hero-muted-safe mt-2 text-sm font-bold leading-6 sm:text-base">
                      {shop.shortDescription}
                    </p>
                  ) : null}
                  <div className="shop-hero-muted-safe mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs font-bold sm:text-sm">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="size-3.5" aria-hidden="true" />
                      {shop.city}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <BadgeCheck className="size-3.5" aria-hidden="true" />
                      קטלוג וואטסאפ פעיל
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Truck className="size-3.5" aria-hidden="true" />
                      משלוחים לכל הארץ
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_320px]">
              <div>
                <p className="text-lg leading-9 text-zinc-700">{shop.description}</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {shop.categories.map((categorySlug) => {
                    const category = categoryBySlug.get(categorySlug);

                    return category ? (
                      <Link
                        key={category.slug}
                        href={`/category/${category.slug}`}
                        className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-800 transition hover:bg-emerald-100"
                      >
                        {category.name}
                      </Link>
                    ) : null;
                  })}
                </div>

                <div className="mt-8">
                  <h2 className="text-xl font-black text-zinc-950">תגי אמון</h2>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {shop.badges.map((badge) => (
                      <span
                        key={badge}
                        className="inline-flex items-center gap-1 rounded-full bg-zinc-100 px-3 py-1 text-sm font-bold text-zinc-700"
                      >
                        <BadgeCheck
                          className="size-4 text-emerald-600"
                          aria-hidden="true"
                        />
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8">
                  <h2 className="text-xl font-black text-zinc-950">תגיות</h2>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {shop.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-zinc-200 px-3 py-1 text-sm font-bold text-zinc-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <aside className="rounded-lg bg-zinc-50 p-5">
                <h2 className="text-lg font-black text-zinc-950">פרטי חנות</h2>
                <div className="mt-4 space-y-3 text-sm font-bold text-zinc-700">
                  <p className="flex items-center gap-2">
                    <MapPin className="size-4 text-emerald-600" aria-hidden="true" />
                    {shop.city}
                  </p>
                  <p className="flex items-center gap-2">
                    <BadgeCheck
                      className="size-4 text-emerald-600"
                      aria-hidden="true"
                    />
                    נבדק ידנית על ידי וואשופ
                  </p>
                  <p className="flex items-center gap-2">
                    <Truck className="size-4 text-emerald-600" aria-hidden="true" />
                    משלוחים לכל הארץ
                  </p>
                </div>

                <div className="mt-5 rounded-lg bg-emerald-50 px-4 py-3">
                  <div className="flex items-center gap-1 text-emerald-600" aria-label="דירוג וואשופ חמישה כוכבים">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} className="size-4 fill-current" aria-hidden="true" />
                    ))}
                  </div>
                  <p className="mt-1 text-sm font-black text-emerald-900">
                    דירוג וואשופ: {shop.washopRating.toFixed(1)}
                  </p>
                </div>

                <p className="mt-4 rounded-lg bg-white p-3 text-xs font-bold leading-6 text-zinc-600">
                  חנויות שמופיעות בוואשופ נדרשות לתת יחס רציני והוגן ללקוחות
                  שפונים דרך האתר.
                </p>

                <div className="mt-6 grid gap-3">
                  <TrackedActionLink
                    href={shop.catalogUrl}
                    target="_blank"
                    rel="noreferrer"
                    external
                    eventName="whatsapp_seller_click"
                    eventProperties={{
                      action: "catalog",
                      shop_slug: shop.slug,
                      surface: "shop_profile",
                    }}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-emerald-600 px-5 text-sm font-black text-white transition hover:bg-emerald-700"
                  >
                    צפייה בקטלוג בוואטסאפ
                  </TrackedActionLink>
                  <TrackedActionLink
                    href={createChatUrl(shop.phone, siteConfig.shopMessage)}
                    target="_blank"
                    rel="noreferrer"
                    external
                    eventName="whatsapp_seller_click"
                    eventProperties={{
                      action: "message",
                      shop_slug: shop.slug,
                      surface: "shop_profile",
                    }}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-emerald-200 bg-white px-5 text-sm font-black text-emerald-700 transition hover:bg-emerald-50"
                  >
                    <MessageCircle className="size-4" aria-hidden="true" />
                    שליחת הודעה לחנות
                  </TrackedActionLink>
                </div>
              </aside>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
