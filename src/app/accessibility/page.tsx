import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "הצהרת נגישות",
  description: "הצהרת הנגישות של WaShop.",
  alternates: {
    canonical: "/accessibility",
  },
};

export default function AccessibilityPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black leading-tight text-zinc-950">
          הצהרת נגישות
        </h1>
        <div className="mt-8 space-y-5 text-lg leading-9 text-zinc-700 [&_a]:font-bold [&_a]:text-emerald-700">
          <p>
            WaShop פועל כדי להנגיש את האתר לגולשים רבים ככל האפשר, כולל שימוש
            במבנה סמנטי, טקסטים קריאים, ניווט מקלדת, כפתורים עם תוויות ברורות
            וניגודיות צבעים טובה.
          </p>
          <p>
            האתר נבנה בגישה רספונסיבית, בעברית מלאה ובכיוון RTL, כדי לאפשר
            שימוש נוח במובייל ובדסקטופ.
          </p>
          <p>
            אם נתקלתם בקושי נגישות או בתוכן שאינו ברור, נשמח לקבל דיווח ולתקן
            במהירות האפשרית.
          </p>
          <p>
            לפניות בנושא נגישות:{" "}
            <a href={`mailto:${siteConfig.supportEmail}`}>{siteConfig.supportEmail}</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
