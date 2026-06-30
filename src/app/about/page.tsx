import type { Metadata } from "next";
import Link from "next/link";
import {
  BadgeCheck,
  MessageCircle,
  Store,
  type LucideIcon,
} from "lucide-react";

export const metadata: Metadata = {
  title: "אודות וואשופ",
  description:
    "וואשופ הוא אתר ישראלי לגילוי חנויות שמוכרות דרך קטלוג וואטסאפ והודעות ישירות.",
  alternates: {
    canonical: "/about",
  },
};

const aboutHighlights: Array<{ label: string; icon: LucideIcon }> = [
  { label: "חנויות אמיתיות", icon: Store },
  { label: "קשר ישיר", icon: MessageCircle },
  { label: "בדיקה ידנית", icon: BadgeCheck },
];

export default function AboutPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-black text-emerald-700">אודות</p>
        <h1 className="mt-2 text-4xl font-black leading-tight text-zinc-950 sm:text-5xl">
          וואשופ מרכז את חנויות הוואטסאפ הטובות בישראל
        </h1>
        <div className="mt-6 space-y-5 text-lg leading-9 text-zinc-600">
          <p>
            הרבה עסקים ישראליים עובדים היום קודם כל דרך וואטסאפ: קטלוג, שיחה
            קצרה, תמונות, מחיר וסגירת הזמנה ישירה. וואשופ נועד להפוך את החנויות
            האלה לקלות יותר לגילוי.
          </p>
          <p>
            האתר מתמקד רק בחנויות שמוכרות דרך קטלוג וואטסאפ או הודעות, בלי
            להפוך למרקטפלייס ובלי להתערב ברכישה. הקשר, השאלות והתשלום נשארים
            ישירות מול החנות.
          </p>
          <p>
            כל חנות נבדקת ידנית לפני פרסום. המטרה היא איכות, אמינות, שירות
            ונוחות, לא רשימה אינסופית של קישורים לא בדוקים.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {aboutHighlights.map(({ label, icon: Icon }) => (
            <div
              key={label}
              className="rounded-lg border border-emerald-950/10 bg-white p-5 shadow-sm"
            >
              <Icon className="size-7 text-emerald-600" aria-hidden="true" />
              <h2 className="mt-4 text-lg font-black text-zinc-950">{label}</h2>
            </div>
          ))}
        </div>

        <Link
          href="/shops"
          className="mt-10 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 text-base font-black text-white transition hover:bg-emerald-700"
        >
          מעבר לחנויות
        </Link>
      </div>
    </div>
  );
}
