import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ShopCard } from "@/components/ShopCard";
import { categories, getCategoryBySlug, type Category } from "@/data/categories";
import {
  getApprovedShopsForCategory,
  getApprovedStoreCountForCategory,
} from "@/lib/category-stats";
import { siteConfig } from "@/lib/site";
import { absoluteUrl } from "@/lib/utils";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

const appDevelopmentContent = {
  h1: "נותני שירות לפיתוח אפליקציות בוואטסאפ",
  description:
    "מצאו עסקים ונותני שירות מאושרים שעוסקים בפיתוח אפליקציות, פיתוח ווב, שירותי פיתוח ווב, פיתוח אפליקציות ווב ויצירת פורטל ווב, ופנו אליהם ישירות דרך וואטסאפ כדי לברר התאמה, זמינות ותהליך עבודה.",
  sections: [
    {
      title: "מה אפשר למצוא בקטגוריה הזו?",
      text:
        "קטגוריית פיתוח אפליקציות מיועדת לעסקים ונותני שירות שיכולים להציג דרך קטלוג או שיחה ישירה שירותים כמו אפיון מוצר, פיתוח אפליקציות, פיתוח ווב, יצירת פורטל ווב, כלים לעסקים ותמיכה טכנית סביב פרויקט דיגיטלי. וואשופ אינה מבצעת את העבודה ואינה מבטיחה תוצאה, אלא מאפשרת לגלות ספקים רלוונטיים וליצור איתם קשר ישיר.",
    },
    {
      title: "מה כדאי להכין לפני שפונים?",
      text:
        "לפני שפונים לספק פיתוח כדאי להכין תיאור קצר של המטרה העסקית, קהל היעד, מסכים או תהליכים מרכזיים, פלטפורמות רצויות, תקציב משוער ולוח זמנים רצוי. ככל שהפנייה ברורה יותר, כך קל יותר לנותן השירות להבין אם הפרויקט מתאים לו.",
    },
    {
      title: "שאלות שכדאי לשאול בשיחה",
      text:
        "בשיחה עם ספק פיתוח מומלץ לברר מה כלול בהצעה, מי אחראי על אפיון ועיצוב, האם מדובר באפליקציה, אתר או פיתוח אפליקציות ווב, איך מטפלים בתחזוקה, למי שייך הקוד או התוכן, איך מתומחרים שינויים ומה קורה אחרי העלייה לאוויר.",
    },
  ],
};

function getCategoryHeading(category: Category) {
  return category.slug === "app-development" ? appDevelopmentContent.h1 : category.name;
}

function getCategoryDescription(category: Category, approvedStoreCount: number) {
  if (category.slug === "app-development") {
    return appDevelopmentContent.description;
  }

  if (approvedStoreCount > 0) {
    return `${category.description} בקטגוריה הזו מופיעות רק חנויות ועסקים שאושרו ידנית בוואשופ, כדי שתוכלו לפתוח קטלוג, לבדוק פרטים ולפנות ישירות למוכר.`;
  }

  return category.description;
}

function createCategoryJsonLd(category: Category, shops: ReturnType<typeof getApprovedShopsForCategory>) {
  const breadcrumbList = {
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
        name: category.name,
        item: absoluteUrl(`/category/${category.slug}`),
      },
    ],
  };

  if (!shops.length) {
    return [breadcrumbList];
  }

  return [
    breadcrumbList,
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `חנויות וואטסאפ בקטגוריית ${category.name}`,
      itemListElement: shops.map((shop, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(`/shop/${shop.slug}`),
        name: shop.name,
      })),
    },
  ];
}

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return {};
  }

  const approvedStoreCount = getApprovedStoreCountForCategory(category.slug);
  const title =
    category.slug === "app-development"
      ? "נותני שירות לפיתוח אפליקציות בוואטסאפ | WaShop"
      : `${category.name} | חנויות וואטסאפ מאושרות`;
  const description = getCategoryDescription(category, approvedStoreCount);

  return {
    title,
    description,
    alternates: {
      canonical: `/category/${category.slug}`,
    },
    robots:
      approvedStoreCount > 0
        ? { index: true, follow: true }
        : { index: false, follow: true },
    openGraph: {
      title,
      description,
      url: `/category/${category.slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const shops = getApprovedShopsForCategory(category.slug);
  const approvedStoreCount = shops.length;
  const heading = getCategoryHeading(category);
  const description = getCategoryDescription(category, approvedStoreCount);
  const jsonLd = createCategoryJsonLd(category, shops);

  return (
    <div className="py-10 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav
          aria-label="פירורי לחם"
          className="mb-6 flex flex-wrap items-center gap-2 text-sm font-bold text-zinc-500"
        >
          <Link href="/" className="hover:text-emerald-700">
            וואשופ
          </Link>
          <span aria-hidden="true">/</span>
          <Link href="/shops" className="hover:text-emerald-700">
            חנויות וואטסאפ
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-zinc-800">{category.name}</span>
        </nav>

        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-black tracking-normal text-emerald-700">
            קטגוריה
          </p>
          <h1 className="mt-2 text-3xl font-black leading-tight text-zinc-950 sm:text-5xl">
            {heading}
          </h1>
          <p className="mt-4 text-lg leading-8 text-zinc-600">{description}</p>
          {approvedStoreCount > 0 ? (
            <p className="mx-auto mt-4 inline-flex rounded-full bg-emerald-50 px-4 py-2 text-sm font-black text-emerald-800 ring-1 ring-emerald-200">
              {approvedStoreCount} חנויות ונותני שירות מאושרים בקטגוריה
            </p>
          ) : null}
        </div>

        <div className="mt-8">
          {shops.length ? (
            <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
              {shops.map((shop) => (
                <ShopCard key={shop.id} shop={shop} />
              ))}
            </div>
          ) : (
            <div className="mx-auto max-w-3xl rounded-lg border border-dashed border-emerald-300 bg-white p-8 text-center shadow-sm">
              <h2 className="text-2xl font-black text-zinc-950">
                עדיין אין חנויות בקטגוריה הזו
              </h2>
              <p className="mt-3 leading-7 text-zinc-600">
                יש לכם חנות וואטסאפ מתאימה? שלחו אותה לבדיקה. וואשופ בודקת
                חנויות ידנית כדי לשמור על קטלוגים איכותיים, ברורים וחוקיים.
              </p>
              <Link
                href="/add-store"
                className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-emerald-600 px-5 text-sm font-black text-white transition hover:bg-emerald-700"
              >
                שליחת חנות לבדיקה
              </Link>
            </div>
          )}
        </div>

        {shops.length ? (
          <div className="mx-auto mt-10 grid max-w-6xl gap-5 lg:grid-cols-[1.1fr_0.9fr]">
            <section className="rounded-xl border border-emerald-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-black text-zinc-950">
                איך להשתמש בקטגוריה הזו?
              </h2>
              <p className="mt-4 leading-8 text-zinc-700">
                פתחו את כרטיס העסק, עברו לקטלוג הוואטסאפ או שלחו הודעה ישירה,
                ובדקו מול המוכר מחיר, זמינות, תשלום, משלוח, החזרות ואחריות לפני
                רכישה או הזמנה. וואשופ היא ספריית גילוי ובדיקה ידנית, לא צד
                בעסקה ולא ספק השירות עצמו.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Link
                  href="/shops"
                  className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-black text-emerald-800 transition hover:bg-emerald-100"
                >
                  חזרה לכל החנויות
                </Link>
                <Link
                  href="/add-store"
                  className="rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-black text-emerald-700 transition hover:bg-emerald-50"
                >
                  הגשת חנות מתאימה
                </Link>
              </div>
            </section>

            <section className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm">
              <h2 className="text-2xl font-black text-zinc-950">
                מה חשוב לבדוק מול העסק?
              </h2>
              <ul className="mt-4 space-y-2 text-sm font-bold leading-7 text-zinc-700">
                <li>מה בדיוק כלול במוצר או בשירות.</li>
                <li>מה המחיר הסופי ותנאי התשלום.</li>
                <li>מה זמינות המלאי או זמני העבודה.</li>
                <li>איך מתבצעים משלוח, ביטול, החזרה או המשך שירות.</li>
              </ul>
            </section>
          </div>
        ) : null}

        {category.slug === "app-development" && shops.length ? (
          <section className="mx-auto mt-8 max-w-6xl rounded-xl border border-emerald-200 bg-white p-6 shadow-sm">
            <h2 className="text-3xl font-black text-zinc-950">
              פיתוח אפליקציות, פיתוח ווב ויצירת פורטל ווב דרך קשר ישיר
            </h2>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {appDevelopmentContent.sections.map((section) => (
                <div key={section.title} className="rounded-lg bg-emerald-50 p-5">
                  <h3 className="text-xl font-black text-zinc-950">
                    {section.title}
                  </h3>
                  <p className="mt-3 text-sm font-bold leading-7 text-zinc-700">
                    {section.text}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
