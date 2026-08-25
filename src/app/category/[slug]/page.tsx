import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnalyticsPageView } from "@/components/AnalyticsPageView";
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

type CategoryEditorialContent = {
  heading: string;
  description: string;
  sectionHeading: string;
  sections: Array<{ title: string; text: string }>;
};

const categoryEditorialContent: Record<string, CategoryEditorialContent> = {
  "app-development": {
    heading: "עסקים לפיתוח אפליקציות",
    description:
      "גלו נותני שירות מאושרים לפיתוח אפליקציות וכלים דיגיטליים לעסקים. אפשר לקרוא על השירות, לפתוח את קטלוג הוואטסאפ ולברר ישירות התאמה, היקף עבודה ולוחות זמנים.",
    sectionHeading: "איך בוחנים נותן שירות לפיתוח אפליקציות?",
    sections: [
      {
        title: "מה אפשר למצוא בקטגוריה?",
        text:
          "הקטגוריה מרכזת עסקים שמציעים פיתוח אפליקציות, פיתוח ווב, פורטלים וכלים דיגיטליים. וואשופ עוזרת לגלות את נותן השירות ולפתוח שיחה ישירה, אך אינה מבצעת את הפרויקט ואינה צד בהתקשרות.",
      },
      {
        title: "מה להכין לפני הפנייה?",
        text:
          "כדאי להכין מטרה עסקית, קהל יעד, תהליכים מרכזיים, פלטפורמה רצויה, תקציב משוער ולוח זמנים. מסמך קצר וברור עוזר לספק להבין אם הפרויקט מתאים לו.",
      },
      {
        title: "מה חשוב לברר?",
        text:
          "בררו מה כלול באפיון, בעיצוב, בפיתוח, בבדיקות ובתחזוקה, למי שייכים הקוד והתוכן, איך מתומחרים שינויים ומה כולל השירות לאחר העלייה לאוויר.",
      },
    ],
  },
  "website-building": {
    heading: "עסקים לבניית אתרים",
    description:
      "גלו נותני שירות מאושרים לבניית אתרים, דפי נחיתה ונוכחות דיגיטלית לעסקים. אפשר לבדוק את תחומי העבודה ולפנות ישירות בוואטסאפ כדי לברר התאמה לפרויקט.",
    sectionHeading: "מה חשוב לבדוק לפני שבונים אתר לעסק?",
    sections: [
      {
        title: "סוג האתר והמטרה",
        text:
          "הגדירו אם נדרש אתר תדמית, דף נחיתה, קטלוג, חנות או מערכת מותאמת. מטרה ברורה עוזרת לקבל הצעה שמתאימה לצורך ולא רק רשימת תכונות כללית.",
      },
      {
        title: "תוכן, עיצוב ותחזוקה",
        text:
          "בררו מי אחראי על כתיבה, תמונות, עיצוב, אחסון, דומיין, נגישות ועדכונים. חשוב להבין מראש אילו משימות כלולות ואילו שירותים יתומחרו בנפרד.",
      },
      {
        title: "בעלות ותמיכה אחרי ההשקה",
        text:
          "שאלו למי שייכים הקוד, החשבונות והתוכן, איך מקבלים גישה למערכות ומה כוללת התמיכה לאחר העלייה לאוויר. הסיכומים נעשים ישירות מול נותן השירות.",
      },
    ],
  },
  "technical-services-businesses": {
    heading: "שירותים טכניים לעסקים",
    description:
      "גלו נותני שירות מאושרים לתמיכה טכנית, פתרון תקלות וכלים דיגיטליים לעסקים. אפשר להסביר את התקלה או הצורך ולברר ישירות זמינות, היקף טיפול ועלות.",
    sectionHeading: "איך פונים נכון לקבלת שירות טכני לעסק?",
    sections: [
      {
        title: "מתארים את הבעיה במדויק",
        text:
          "כתבו מה לא עובד, מתי התקלה התחילה, באיזו מערכת מדובר ומה כבר נוסה. אין לשלוח סיסמאות או מידע רגיש בצ׳אט לפני שמוודאים מול מי עובדים ואיך יישמר המידע.",
      },
      {
        title: "מבררים היקף וזמינות",
        text:
          "בדקו אם השירות ניתן מרחוק או בבית העסק, מה זמן התגובה המשוער, מה כלול באבחון ומה דורש אישור נוסף לפני ביצוע או חיוב.",
      },
      {
        title: "מסכמים אחריות והמשך טיפול",
        text:
          "לפני שמתחילים כדאי לסכם עלות, לוח זמנים, גיבוי, אחריות על השינוי ומה קורה אם נדרש טיפול נוסף. וואשופ אינה ספקית התמיכה ואינה צד בשירות.",
      },
    ],
  },
};

function getCategoryHeading(category: Category) {
  return categoryEditorialContent[category.slug]?.heading ?? category.name;
}

function getCategoryDescription(category: Category, approvedStoreCount: number) {
  if (categoryEditorialContent[category.slug]) {
    return categoryEditorialContent[category.slug].description;
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
  const titleBySlug: Record<string, string> = {
    "app-development": "פיתוח אפליקציות לעסקים דרך וואטסאפ בוואשופ",
    "website-building": "בניית אתרים לעסקים דרך וואטסאפ בוואשופ",
    "technical-services-businesses": "שירותים טכניים לעסקים דרך וואטסאפ בוואשופ",
  };
  const title =
    titleBySlug[category.slug] ?? `${category.name} חנויות וואטסאפ מאושרות בוואשופ`;
  const description = getCategoryDescription(category, approvedStoreCount);

  return {
    title: { absolute: title },
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
  const editorialContent = categoryEditorialContent[category.slug];

  return (
    <div className="bg-[#00a884] py-10 text-white sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AnalyticsPageView
        eventName="category_view"
        properties={{
          route: `/category/${category.slug}`,
          category_slug: category.slug,
          approved_store_count: approvedStoreCount,
          locale: "he",
        }}
      />
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav
          aria-label="פירורי לחם"
          className="mb-6 flex flex-wrap items-center gap-2 text-sm font-bold text-white/80"
        >
          <Link href="/" className="hover:text-white">
            וואשופ
          </Link>
          <span aria-hidden="true">/</span>
          <Link href="/shops" className="hover:text-white">
            חנויות וואטסאפ
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-white">{category.name}</span>
        </nav>

        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-black tracking-normal text-white/85">
            קטגוריה
          </p>
          <h1 className="mt-2 text-3xl font-black leading-tight text-white sm:text-5xl">
            {heading}
          </h1>
          <p className="mt-4 text-lg leading-8 text-white/90">{description}</p>
          {approvedStoreCount > 0 ? (
            <p className="mx-auto mt-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-black text-[#007f62] ring-1 ring-white">
              {approvedStoreCount} חנויות ונותני שירות מאושרים בקטגוריה
            </p>
          ) : null}
        </div>

        <div className="mt-8">
          {shops.length ? (
            <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
              {shops.map((shop) => (
                <ShopCard key={shop.id} shop={shop} surface="category" />
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

            <section className="rounded-xl border border-emerald-200 bg-white p-6 shadow-sm">
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

        {editorialContent && shops.length ? (
          <section className="mx-auto mt-8 max-w-6xl rounded-xl border border-emerald-200 bg-white p-6 shadow-sm">
            <h2 className="text-3xl font-black text-zinc-950">
              {editorialContent.sectionHeading}
            </h2>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {editorialContent.sections.map((section) => (
                <div key={section.title} className="rounded-lg border border-emerald-200 bg-white p-5">
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
