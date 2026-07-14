import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, HelpCircle, ShoppingBag } from "lucide-react";
import { ShopsDirectory } from "@/components/ShopsDirectory";
import { approvedShops } from "@/data/shops";
import { getActiveCategoriesWithCounts } from "@/lib/category-stats";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "חנויות וואטסאפ בישראל – קטלוגים וקנייה ישירה | WaShop",
  description:
    "גלו חנויות וואטסאפ בישראל לפי קטגוריה, עיר ומוצרים. פתחו את הקטלוג, בדקו משלוחים ופנו ישירות למוכר דרך וואטסאפ.",
  alternates: {
    canonical: "/shops",
  },
  openGraph: {
    title: "חנויות וואטסאפ בישראל – קטלוגים וקנייה ישירה | WaShop",
    description:
      "גלו חנויות וואטסאפ בישראל לפי קטגוריה, עיר ומוצרים. פתחו את הקטלוג, בדקו משלוחים ופנו ישירות למוכר דרך וואטסאפ.",
    url: "/shops",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "חנויות וואטסאפ בישראל – קטלוגים וקנייה ישירה | WaShop",
    description:
      "גלו חנויות וואטסאפ בישראל לפי קטגוריה, עיר ומוצרים. פתחו את הקטלוג, בדקו משלוחים ופנו ישירות למוכר דרך וואטסאפ.",
  },
};

type ShopsPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function readParam(
  params: Record<string, string | string[] | undefined> | undefined,
  key: string,
) {
  const value = params?.[key];
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

export default async function ShopsPage({ searchParams }: ShopsPageProps) {
  const params = await searchParams;
  const initialQuery = readParam(params, "q");
  const initialCategory = readParam(params, "category");
  const initialCity = readParam(params, "city");
  const activeCategories = getActiveCategoriesWithCounts();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "חנויות וואטסאפ מאושרות בישראל",
    itemListElement: approvedShops.map((shop, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(`/shop/${shop.slug}`),
      name: shop.name,
    })),
  };

  return (
    <div className="py-8 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-black tracking-normal text-emerald-700">
            ספריית חנויות
          </p>
          <h1 className="mt-2 text-3xl font-black leading-tight text-zinc-950 sm:text-5xl">
            חנויות וואטסאפ בישראל
          </h1>
          <div className="mx-auto mt-5 max-w-3xl space-y-4 text-lg leading-8 text-zinc-600">
            <p>
              וואשופ מרכזת חנויות וואטסאפ ונותני שירות ישראליים שעברו בדיקה
              ידנית לפני פרסום. אפשר לחפש לפי עיר, קטגוריה, מוצר או שם חנות,
              לפתוח קטלוג וואטסאפ פעיל ולפנות ישירות למוכר בלי שוואשופ הופכת
              לצד בעסקה. לפני רכישה חשוב לבדוק מול בעל העסק מחיר, זמינות,
              תשלום, משלוח, החזרות ואחריות. המטרה היא לעזור לכם לגלות עסקים
              אמיתיים וברורים, ולתת למוכרים רציניים מקום מסודר להופיע בו.
            </p>
          </div>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/add-store"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-emerald-600 px-5 text-sm font-black text-white transition hover:bg-emerald-700"
            >
              יש לכם חנות? שלחו לבדיקה
            </Link>
            <Link
              href="/blog/hanut-virtualit-bewhatsapp"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-emerald-200 bg-white px-5 text-sm font-black text-emerald-700 transition hover:bg-emerald-50"
            >
              מדריך לפתיחת קטלוג וואטסאפ
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-7 max-w-6xl rounded-xl border border-emerald-200 bg-white p-4 shadow-sm shadow-emerald-950/5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-black text-zinc-950">
              קטגוריות פעילות:
            </span>
            {activeCategories.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-black text-emerald-800 ring-1 ring-emerald-200 transition hover:bg-emerald-100"
              >
                {category.name} · {category.approvedStoreCount}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <ShopsDirectory
            initialQuery={initialQuery}
            initialCategory={initialCategory}
            initialCity={initialCity}
          />
        </div>

        <div className="mx-auto mt-10 grid max-w-6xl gap-5 lg:grid-cols-2">
          <section className="rounded-xl border border-emerald-200 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-emerald-50 text-emerald-700">
                <HelpCircle className="size-5" aria-hidden="true" />
              </span>
              <div>
                <h2 className="text-2xl font-black text-zinc-950">
                  איך משתמשים ב־WaShop?
                </h2>
                <p className="mt-3 leading-8 text-zinc-700">
                  בוחרים חנות, פותחים את קטלוג הוואטסאפ או שולחים הודעה,
                  ומבררים את כל הפרטים ישירות עם בעל העסק. וואשופ עוזרת בגילוי
                  ובסינון ידני, אבל ההזמנה, התשלום והשירות מתנהלים בין הלקוח
                  למוכר.
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm">
            <div className="flex items-start gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-white text-emerald-700">
                <CheckCircle2 className="size-5" aria-hidden="true" />
              </span>
              <div>
                <h2 className="text-2xl font-black text-zinc-950">
                  מה לבדוק לפני שקונים?
                </h2>
                <p className="mt-3 leading-8 text-zinc-700">
                  בדקו מחיר סופי, זמינות, משלוחים, דרך תשלום, מדיניות ביטול,
                  החזרות ואחריות. אם מדובר בשירות, בדקו מה כלול, לוחות זמנים
                  והמשך תמיכה.
                </p>
              </div>
            </div>
          </section>
        </div>

        <section className="mx-auto mt-6 max-w-6xl rounded-xl border border-emerald-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="inline-flex items-center gap-2 text-sm font-black text-emerald-700">
                <ShoppingBag className="size-4" aria-hidden="true" />
                מדריכים שימושיים
              </p>
              <h2 className="mt-2 text-2xl font-black text-zinc-950">
                רוצים להבין טוב יותר חנויות וואטסאפ?
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/blog/hanut-virtualit-bewhatsapp"
                className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-black text-emerald-800 transition hover:bg-emerald-100"
              >
                חנות וירטואלית בוואטסאפ
              </Link>
              <Link
                href="/blog/sherut-lakohot-bewhatsapp-laasakim"
                className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-black text-emerald-800 transition hover:bg-emerald-100"
              >
                שירות לקוחות בוואטסאפ
              </Link>
              <Link
                href="/blog/taknon-hanut-virtualit"
                className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-black text-emerald-800 transition hover:bg-emerald-100"
              >
                תקנון ומדיניות לחנות
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
