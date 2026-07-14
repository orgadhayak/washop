import type { Metadata } from "next";
import Link from "next/link";
import {
  BadgeCheck,
  Globe2,
  Handshake,
  MessageCircle,
  SearchCheck,
  ShieldCheck,
  Store,
} from "lucide-react";
import { GlobalStoreDirectory } from "@/components/GlobalStoreDirectory";
import { GlobalStoreForm } from "@/components/GlobalStoreForm";
import { approvedGlobalShops } from "@/data/shops";
import { siteConfig } from "@/lib/site";
import { absoluteUrl } from "@/lib/utils";

const globalTitle = "WaShop Global | Discover stores and shop by chat";
const globalDescription =
  "Discover carefully reviewed stores, open their WhatsApp catalogs and connect directly with sellers. WaShop Global is an English gateway for chat-based store discovery.";

export const metadata: Metadata = {
  title: globalTitle,
  description: globalDescription,
  alternates: {
    canonical: "/global",
    languages: {
      en: "/global",
      he: "/",
      "x-default": "/global",
    },
  },
  openGraph: {
    title: globalTitle,
    description: globalDescription,
    url: "/global",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "WaShop Global",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: globalTitle,
    description: globalDescription,
    images: [siteConfig.ogImage],
  },
};

const howItWorks = [
  {
    title: "Discover reviewed stores",
    text: "Use the directory to find stores by name, category, city or product. Pending stores are not shown.",
    icon: SearchCheck,
  },
  {
    title: "Open the catalog",
    text: "Each store card links to the seller catalog or chat channel so you can see what is available.",
    icon: Store,
  },
  {
    title: "Talk directly with the seller",
    text: "Ask about products, availability, delivery, payment, returns and service before paying.",
    icon: MessageCircle,
  },
];

const sellerBenefits = [
  "A clean English gateway for discovery beyond the Hebrew site.",
  "Visibility for real stores that are reviewed manually before publication.",
  "Direct customer conversations without WaShop becoming a checkout middleman.",
  "A practical application flow for Israeli and international sellers.",
];

const faqItems = [
  {
    question: "Is WaShop a marketplace?",
    answer:
      "No. WaShop is a directory and discovery platform. We help customers discover stores and contact sellers directly.",
  },
  {
    question: "Does every store ship worldwide?",
    answer:
      "No. Global visibility does not mean worldwide shipping. Buyers must confirm delivery destinations directly with the seller.",
  },
  {
    question: "Does WaShop process payments?",
    answer:
      "No. Product availability, payment, delivery, returns and customer service are agreed directly between the buyer and seller.",
  },
  {
    question: "Can any store join?",
    answer:
      "No. Submission does not guarantee approval. WaShop reviews stores manually and may decline or remove stores that do not fit the standard.",
  },
];

export default function GlobalPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "WaShop Global",
      url: absoluteUrl("/global"),
      inLanguage: "en",
      description: globalDescription,
      isPartOf: {
        "@type": "WebSite",
        name: siteConfig.name,
        url: siteConfig.domain,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "WaShop Global approved stores",
      itemListElement: approvedGlobalShops.map((shop, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(`/shop/${shop.slug}`),
        name: shop.nameEn ?? shop.name,
      })),
    },
  ];

  return (
    <div dir="ltr" lang="en" className="bg-[#f7fbf8] text-zinc-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="border-b border-emerald-950/10 bg-white">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-black text-emerald-800 transition hover:bg-emerald-100"
            >
              <Globe2 className="size-4" aria-hidden="true" />
              Israel · עברית
            </Link>
            <p className="mt-6 text-sm font-black text-emerald-700">
              WaShop Global
            </p>
            <h1 className="mt-2 max-w-3xl text-4xl font-black leading-tight text-zinc-950 sm:text-6xl">
              Discover carefully reviewed stores and shop by chat
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-9 text-zinc-600 sm:text-xl">
              Browse independent stores, open their catalogs and connect directly
              with the seller. WaShop helps customers discover stores from Israel
              and around the world without adding a marketplace middleman.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#stores"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 text-base font-black text-white shadow-lg shadow-emerald-700/20 transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
              >
                Browse stores
              </a>
              <a
                href="#apply"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-emerald-200 bg-white px-6 text-base font-black text-emerald-700 transition hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
              >
                Apply as a seller
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-white via-emerald-50 to-white p-5 shadow-sm shadow-emerald-950/5">
            <div className="rounded-xl bg-emerald-700 p-5 text-white">
              <ShieldCheck className="size-8 text-emerald-100" aria-hidden="true" />
              <h2 className="mt-4 text-2xl font-black">We’re here to stay</h2>
              <p className="mt-4 text-base leading-8 text-emerald-50">
                We are building WaShop for the long term. We do not rush to fill
                the directory. Every seller is reviewed carefully so customers can
                discover better stores with greater confidence.
              </p>
            </div>
            <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm font-bold leading-7 text-amber-950">
              Global visibility does not mean that every store offers worldwide
              shipping. Product availability, delivery destinations, payment,
              returns and customer service are agreed directly between the buyer
              and the seller.
            </div>
          </div>
        </div>
      </section>

      <GlobalStoreDirectory />

      <section id="how-it-works" className="bg-white py-12 sm:py-16">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-black text-emerald-700">How it works</p>
            <h2 className="mt-2 text-3xl font-black leading-tight text-zinc-950 sm:text-4xl">
              Discovery first, transaction directly with the seller
            </h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {howItWorks.map(({ title, text, icon: Icon }) => (
              <div
                key={title}
                className="rounded-xl border border-emerald-950/10 bg-white p-5 shadow-sm"
              >
                <span className="grid size-11 place-items-center rounded-lg bg-emerald-50 text-emerald-700">
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-xl font-black text-zinc-950">{title}</h3>
                <p className="mt-3 leading-7 text-zinc-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div className="rounded-xl border border-emerald-200 bg-white p-6 shadow-sm">
            <BadgeCheck className="size-8 text-emerald-600" aria-hidden="true" />
            <h2 className="mt-4 text-2xl font-black text-zinc-950">
              Manual review and trust
            </h2>
            <p className="mt-4 text-base leading-8 text-zinc-600">
              WaShop is independent and is not officially affiliated with
              WhatsApp or Meta. We review stores before publication, but we do
              not guarantee a transaction outcome, product quality, delivery or
              service. Buyers must confirm details directly with sellers.
            </p>
          </div>

          <div className="rounded-xl border border-emerald-200 bg-white p-6 shadow-sm">
            <Handshake className="size-8 text-emerald-600" aria-hidden="true" />
            <h2 className="mt-4 text-2xl font-black text-zinc-950">
              Seller benefits
            </h2>
            <ul className="mt-4 space-y-3 text-base leading-8 text-zinc-700">
              {sellerBenefits.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-3 size-2 shrink-0 rounded-full bg-emerald-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <p className="text-sm font-black text-emerald-700">Seller rules</p>
            <h2 className="mt-2 text-3xl font-black leading-tight text-zinc-950">
              Apply only if the store is real, legal and clear
            </h2>
            <p className="mt-4 text-base leading-8 text-zinc-600">
              Submission does not guarantee approval or placement. WaShop may
              approve, decline, edit or remove a listing at any time. Sellers
              must provide accurate information and make shipping, payment,
              returns and service terms clear to customers.
            </p>
            <Link
              href="/seller-rules"
              className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full border border-emerald-200 bg-white px-5 text-sm font-black text-emerald-700 transition hover:bg-emerald-50"
            >
              Read the Hebrew seller standards
            </Link>
          </div>
          <GlobalStoreForm />
        </div>
      </section>

      <section id="faq" className="py-12 sm:py-16">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-black text-emerald-700">FAQ</p>
          <h2 className="mt-2 text-3xl font-black leading-tight text-zinc-950">
            Clear boundaries before shopping or applying
          </h2>
          <div className="mt-8 grid gap-4">
            {faqItems.map((item) => (
              <div
                key={item.question}
                className="rounded-xl border border-emerald-950/10 bg-white p-5 shadow-sm"
              >
                <h3 className="text-xl font-black text-zinc-950">{item.question}</h3>
                <p className="mt-3 leading-7 text-zinc-600">{item.answer}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-xl border border-emerald-200 bg-emerald-50 p-6">
            <h3 className="text-2xl font-black text-zinc-950">
              Learn more about WaShop Global
            </h3>
            <p className="mt-3 max-w-3xl leading-8 text-zinc-700">
              Read the English article about how WaShop Global works, what buyers
              should confirm and how sellers can apply.
            </p>
            <Link
              href="/blog/washop-global-whatsapp-store-directory"
              className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full bg-emerald-600 px-5 text-sm font-black text-white transition hover:bg-emerald-700"
            >
              Read the article
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
