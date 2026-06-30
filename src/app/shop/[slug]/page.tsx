import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BadgeCheck,
  MapPin,
  MessageCircle,
  Star,
  Store,
} from "lucide-react";
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
    title: `${shop.name} | חנות וואטסאפ`,
    description: shop.description,
    alternates: {
      canonical: `/shop/${shop.slug}`,
    },
    openGraph: {
      title: `${shop.name} | washop.co.il`,
      description: shop.description,
      url: `/shop/${shop.slug}`,
      type: "website",
    },
  };
}

export default async function ShopPage({ params }: ShopPageProps) {
  const { slug } = await params;
  const shop = getShopBySlug(slug);

  if (!shop) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: shop.name,
    description: shop.description,
    url: absoluteUrl(`/shop/${shop.slug}`),
    telephone: shop.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: shop.city,
      addressCountry: "IL",
    },
    areaServed: "IL",
    sameAs: [shop.catalogUrl],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="py-12 sm:py-16">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/shops"
            className="inline-flex items-center gap-2 text-sm font-black text-emerald-700 hover:text-emerald-800"
          >
            חזרה לכל החנויות
          </Link>

          <article className="mt-6 overflow-hidden rounded-lg border border-emerald-950/10 bg-white shadow-sm">
            <div className="bg-gradient-to-l from-emerald-600 to-teal-500 p-6 text-white sm:p-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="grid size-16 place-items-center rounded-lg bg-white/18">
                  <Store className="size-9" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-black text-emerald-50">
                    חנות וואטסאפ מאושרת
                  </p>
                  <h1 className="mt-2 text-3xl font-black leading-tight sm:text-5xl">
                    {shop.name}
                  </h1>
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
                  <a
                    href={shop.catalogUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-emerald-600 px-5 text-sm font-black text-white transition hover:bg-emerald-700"
                  >
                    צפייה בקטלוג בוואטסאפ
                  </a>
                  <a
                    href={createChatUrl(shop.phone, siteConfig.shopMessage)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-emerald-200 bg-white px-5 text-sm font-black text-emerald-700 transition hover:bg-emerald-50"
                  >
                    <MessageCircle className="size-4" aria-hidden="true" />
                    שליחת הודעה לחנות
                  </a>
                </div>
              </aside>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
