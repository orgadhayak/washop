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
  title: {
    absolute: "Washop – אינדקס חנויות ועסקים בוואטסאפ",
  },
  description:
    "גלו חנויות ועסקים בישראל שמציגים מוצרים ושירותים ומאפשרים קשר ישיר בוואטסאפ. חפשו לפי קטגוריה והגיעו לעסק המתאים.",
  alternates: {
    canonical: "/",
    languages: {
      he: "/",
      en: "/global",
      "x-default": "/",
    },
  },
  openGraph: {
    title: "Washop – אינדקס חנויות ועסקים בוואטסאפ",
    description:
      "גלו חנויות ועסקים בישראל שמציגים מוצרים ושירותים ומאפשרים קשר ישיר בוואטסאפ. חפשו לפי קטגוריה והגיעו לעסק המתאים.",
    url: "/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Washop – אינדקס חנויות ועסקים בוואטסאפ",
    description:
      "גלו חנויות ועסקים בישראל שמציגים מוצרים ושירותים ומאפשרים קשר ישיר בוואטסאפ. חפשו לפי קטגוריה והגיעו לעסק המתאים.",
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
  const faqItems = [
    ["מהו Washop?", "וואשופ היא ספריית גילוי ואינדקס של חנויות ועסקים שמציגים מוצרים או שירותים ומאפשרים קשר ישיר בוואטסאפ. וואשופ אינה צד בעסקה ואינה מבצעת תשלומים."],
    ["איך מוצאים חנות ב-Washop?", "מחפשים לפי קטגוריה, עיר, מוצר או שם עסק, פותחים את הכרטיס ובודקים את הקטלוג או פונים ישירות לבית העסק."],
    ["איך מוסיפים עסק או חנות?", "שולחים פרטים דרך עמוד הוספת החנות. צוות וואשופ בודק את העסק ידנית, והגשה אינה מבטיחה אישור או פרסום."],
    ["האם אפשר ליצור קשר עם העסק דרך WhatsApp?", "כן. בכרטיסים המאושרים אפשר לפתוח קטלוג או לשלוח הודעה ישירה, ולאשר מול העסק את כל פרטי ההתקשרות."],
    ["האם Washop מבצע את התשלום?", "לא. התשלום, המשלוח, ההחזרות והשירות מסוכמים ישירות בין הלקוח לבין העסק."],
    ["האם Washop אחראי לשירות שהעסק מספק?", "לא. וואשופ בודקת חנויות לפני פרסום, אך העסק אחראי למוצרים, למחירים, לתנאים ולשירות שהוא מספק."],
  ];
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.domain,
      inLanguage: "he-IL",
      description: siteConfig.description,
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
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map(([question, answer]) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="home-hero-shell overflow-hidden border-b border-emerald-950/10">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-black text-emerald-800">
              <ShieldCheck className="size-4" aria-hidden="true" />
              {siteConfig.trustLine}
            </div>
            <h1 className="mt-6 max-w-3xl text-4xl font-black leading-tight text-zinc-950 sm:text-6xl">
              חנויות ועסקים שאפשר למצוא וליצור איתם קשר בוואטסאפ
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-9 text-zinc-600 sm:text-xl">
              וואשופ היא ספרייה של חנויות ונותני שירות ישראליים שנבדקים ידנית.
              מחפשים לפי תחום, עיר או מוצר, פותחים קטלוג וואטסאפ ופונים ישירות
              לעסק. וואשופ אינה חנות, מערכת סליקה או צד בעסקה.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/shops"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 text-base font-black text-white shadow-lg shadow-emerald-700/20 transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
              >
                <Store className="size-5" aria-hidden="true" />
                חנויות וואטסאפ בישראל
              </Link>
              <Link
                href="/add-store"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-emerald-200 bg-white px-6 text-base font-black text-emerald-700 transition hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
              >
                שליחת חנות וואטסאפ לבדיקה
              </Link>
              <Link
                href="/global"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white px-6 text-base font-black text-zinc-800 transition hover:bg-emerald-50 hover:text-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
              >
                Global · English
              </Link>
            </div>
            <p className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-zinc-600">
              <BadgeCheck className="size-4 text-emerald-600" aria-hidden="true" />
              כל חנות נבדקת ידנית לפני שהיא מופיעה באתר.
            </p>
            <p className="mt-3 text-sm font-bold text-zinc-600">
              מוכרים דרך וואטסאפ?{" "}
              <Link
                href="/blog/hanut-virtualit-bewhatsapp"
                className="text-emerald-700 underline decoration-emerald-200 underline-offset-4 transition hover:text-emerald-800"
              >
                קראו איך פותחים קטלוג ומקבלים הזמנות
              </Link>
              .
            </p>
          </div>
          <HeroVisual />
        </div>
      </section>

      <section className="home-search-band py-7 sm:py-8">
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
              className="h-16 w-full rounded-full border border-white/80 bg-white pr-14 pl-24 text-sm font-bold text-zinc-950 shadow-2xl shadow-emerald-950/20 outline-none transition placeholder:text-sm placeholder:text-zinc-400 focus:border-emerald-300 focus:ring-4 focus:ring-white/35 sm:pl-32 sm:text-lg sm:placeholder:text-lg"
            />
            <button
              type="submit"
              className="absolute left-2 top-1/2 inline-flex h-12 -translate-y-1/2 items-center justify-center rounded-full bg-[#008f72] px-5 text-sm font-black text-white transition hover:bg-[#007f62]"
            >
              חיפוש
            </button>
          </form>
        </div>
      </section>

      <section className="home-mint-band py-14 sm:py-18">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="חנויות מומלצות"
            title="חנויות וואטסאפ שכבר אפשר לגלות"
            description="התחלה נקייה עם חנויות מאושרות, קטגוריות פעילות ומקום להוסיף עוד עסקים איכותיים."
          />
          <div className="mx-auto mt-8 grid max-w-6xl gap-4 rounded-2xl border border-emerald-200 bg-gradient-to-br from-white via-emerald-50/80 to-white p-5 shadow-sm shadow-emerald-950/5 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-black text-emerald-800 ring-1 ring-emerald-200">
                <Sparkles className="size-3.5" aria-hidden="true" />
                הטבת וואשופ
              </p>
              <h3 className="mt-3 text-2xl font-black text-zinc-950">
                הטבות מיוחדות ללקוחות וואשופ
              </h3>
              <p className="mt-2 max-w-3xl text-sm font-bold leading-7 text-zinc-600">
                בחלק מהחנויות תוכלו לבקש הטבה מיוחדת כשאתם פונים דרך וואשופ.
                המטרה שלנו היא לעודד קשר ישיר, שירות טוב ומחיר הוגן יותר בין
                הלקוח לבית העסק.
              </p>
            </div>
            <Link
              href="/shops"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-emerald-600 px-5 text-sm font-black text-white transition hover:bg-emerald-700"
            >
              גלו חנויות עם הטבת וואשופ
            </Link>
          </div>
          <div className="mx-auto mt-6 grid max-w-6xl gap-6 lg:grid-cols-2">
            {featuredShops.map((shop) => (
              <ShopCard
                key={shop.id}
                shop={shop}
                description={shop.featuredDescription}
              />
            ))}
          </div>
        </div>
      </section>

      <HomeStoresMomentum />

      <section className="bg-[#c9f3d9] py-8 sm:py-10">
        <div className="mx-auto grid w-full max-w-7xl gap-5 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm shadow-emerald-950/5">
            <h2 className="text-2xl font-black text-zinc-950">
              אנחנו כאן כדי להישאר
            </h2>
            <p className="mt-3 text-base font-bold leading-8 text-zinc-700">
              וואשופ נבנית לטווח ארוך. במהלך השנים נמשיך לצרף לכאן חנויות
              ומוכרים שנבדקים בקפידה. אנחנו לא ממהרים למלא את האינדקס: כל עסק
              נבדק ידנית, כדי שללקוחות תהיה אפשרות לגלות חנויות טובות יותר
              ולפנות אליהן בביטחון.
            </p>
          </div>
          <div className="rounded-2xl border border-emerald-200 bg-white p-6 shadow-sm shadow-emerald-950/5">
            <h2 className="text-2xl font-black text-zinc-950">
              נרשמים בישראל. נחשפים גם לעולם.
            </h2>
            <p className="mt-3 text-base font-bold leading-8 text-zinc-700">
              חנות שאושרה לוואשופ יכולה להופיע גם ב־WaShop Global ולהיחשף
              ללקוחות מחוץ לישראל. אין בכך הבטחה לפניות, למכירות או למשלוח
              בינלאומי. זמינות, יעדי משלוח, תשלום והחזרות מסוכמים ישירות בין
              המוכר ללקוח.
            </p>
          </div>
        </div>
      </section>

      <section id="categories" className="bg-[#f7fff9] py-14 sm:py-18">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="קטגוריות"
            title="גלו חנויות לפי תחום"
            description="עברו בין תחומים שבהם כבר יש חנויות ועסקים שאושרו ידנית, או שלחו חנות מתאימה לבדיקה כדי שנבחן אם היא יכולה להצטרף."
          />
          <div className="mt-10">
            <CategoryGrid />
          </div>
        </div>
      </section>

      <section className="home-fresh-band py-14 sm:py-18">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="מדריך קצר"
            title="איך מגלים חנויות וואטסאפ בוואשופ?"
            description="הספרייה נועדה לעזור ללקוחות למצוא עסקים פעילים ולפנות אליהם ישירות, בלי להפוך את וואשופ לצד בעסקה."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-emerald-200 bg-white p-5 shadow-sm">
              <h3 className="text-xl font-black text-zinc-950">מהי חנות וואטסאפ?</h3>
              <p className="mt-3 leading-8 text-zinc-700">
                עסק שמציג מוצרים או שירותים בקטלוג וואטסאפ ומאפשר ללקוחות לשאול,
                לברר ולהתקדם ישירות מול המוכר.
              </p>
              <Link href="/blog/hanut-virtualit-bewhatsapp" className="mt-4 inline-flex text-sm font-black text-emerald-700 hover:text-emerald-800">
                מדריך לחנות וירטואלית בעברית
              </Link>
            </div>
            <div className="rounded-xl border border-emerald-200 bg-white p-5 shadow-sm">
              <h3 className="text-xl font-black text-zinc-950">אינדקס חנויות וואטסאפ בישראל</h3>
              <p className="mt-3 leading-8 text-zinc-700">
                מחפשים לפי תחום, עיר או מוצר, קוראים על העסק ופותחים את הקטלוג
                או השיחה הישירה כשמוצאים חנות מתאימה.
              </p>
              <Link href="/shops" className="mt-4 inline-flex text-sm font-black text-emerald-700 hover:text-emerald-800">
                חנויות וואטסאפ בישראל
              </Link>
            </div>
            <div className="rounded-xl border border-emerald-200 bg-white p-5 shadow-sm">
              <h3 className="text-xl font-black text-zinc-950">מוכרים דרך קטלוג וואטסאפ?</h3>
              <p className="mt-3 leading-8 text-zinc-700">
                אפשר להשאיר פרטים לבדיקה ידנית. הקטגוריות נקבעות לאחר בחינת
                העסק, ופרסום אינו אוטומטי.
              </p>
              <Link href="/add-store" className="mt-4 inline-flex text-sm font-black text-emerald-700 hover:text-emerald-800">
                שליחת חנות וואטסאפ לבדיקה
              </Link>
            </div>
            <div className="rounded-xl border border-emerald-200 bg-white p-5 shadow-sm">
              <h3 className="text-xl font-black text-zinc-950">שירות ישיר וברור</h3>
              <p className="mt-3 leading-8 text-zinc-700">
                החנות אחראית למחיר, לזמינות, לתשלום, למשלוח ולשירות. מדריך
                השירות מסביר איך עסקים יכולים לשמור על תקשורת מסודרת בוואטסאפ.
              </p>
              <Link href="/blog/sherut-lakohot-bewhatsapp-laasakim" className="mt-4 inline-flex text-sm font-black text-emerald-700 hover:text-emerald-800">
                שירות לקוחות בוואטסאפ
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-18">
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

      <section className="home-whatsapp-band py-14 text-white sm:py-18">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-sm font-black text-emerald-100">סטנדרט פרסום</p>
            <h2 className="mt-2 text-3xl font-black leading-tight sm:text-4xl">
              וואשופ לא מיועד לכל אחד
            </h2>
          </div>
          <div>
            <p className="text-lg leading-9 text-white/90">
              אנחנו רוצים לרכז חנויות וואטסאפ איכותיות, חוקיות ורציניות בלבד.
              כל חנות נבדקת ידנית לפני שהיא מופיעה באתר, כדי שהלקוחות יוכלו
              למצוא עסקים אמיתיים, שירות טוב וקטלוגים שימושיים.
            </p>
            <Link
              href="/seller-rules"
              className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-black text-[#007f62] transition hover:bg-emerald-50"
            >
              מי יכול לפרסם בוואשופ?
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#d8f8e4] py-14 sm:py-18">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 overflow-hidden rounded-3xl border border-[#00a884]/25 bg-gradient-to-br from-[#00a884] via-[#009b72] to-[#008f72] p-6 text-white shadow-2xl shadow-emerald-950/15 sm:p-9 lg:grid-cols-[1fr_auto] lg:p-12">
            <div>
              <h2 className="text-3xl font-black leading-tight text-white sm:text-4xl">
                יש לכם חנות וואטסאפ?
              </h2>
              <p className="mt-4 max-w-3xl text-lg leading-9 text-emerald-50">
                שלחו פרטים, ואנחנו נבדוק אם היא מתאימה. חנות שאושרה יכולה לקבל
                חשיפה גם ב־WaShop Global, בלי הבטחה לפניות, מכירות או משלוח
                בינלאומי.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/add-store"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-base font-black text-emerald-800 shadow-lg shadow-emerald-950/20 transition hover:bg-emerald-50"
              >
                שליחת חנות לבדיקה
              </Link>
              <Link
                href="/partners"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/35 bg-white/10 px-6 text-base font-black text-white transition hover:bg-white/20"
              >
                <Handshake className="size-5" aria-hidden="true" />
                תוכנית שותפים
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="home-mint-band py-14 sm:py-18">
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

      <section className="bg-white py-14 sm:py-18">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="שאלות נפוצות"
            title="חנות וירטואלית בעברית עם קשר ישיר בוואטסאפ"
            description="וואשופ עוזרת לגלות עסקים וחנויות. הפנייה, התשלום והשירות נשארים ישירות מול העסק."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {faqItems.map(([question, answer]) => (
              <details key={question} className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-5">
                <summary className="cursor-pointer text-lg font-black text-zinc-950">{question}</summary>
                <p className="mt-3 leading-7 text-zinc-700">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
