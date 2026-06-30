import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "מי יכול לפרסם חנות בוואשופ?",
  description:
    "תנאי פרסום וסטנדרטים לחנויות וואטסאפ שרוצות להופיע בוואשופ.",
  alternates: {
    canonical: "/seller-rules",
  },
};

const suitableItems = [
  "חנות או עסק ישראלי אמיתי",
  "קטלוג וואטסאפ פעיל וברור",
  "פרטי קשר פעילים",
  "שירות לקוחות מכבד",
  "מוצרים או שירותים חוקיים בלבד",
  "מחירים ותנאים ברורים ככל האפשר",
  "נכונות לתת יחס טוב ללקוחות שמגיעים דרך וואשופ",
];

const reviewItems = [
  "שהקישור לקטלוג עובד",
  "שהעסק נראה אמיתי ורציני",
  "שהקטגוריה מתאימה",
  "שאין פעילות אסורה או מטעה",
  "שהשפה, התמונות והמוצרים מתאימים לאתר ציבורי",
  "שהעסק מתאים לקהל בישראל",
];

const forbiddenItems = [
  "סמים, קנאביס לא חוקי, חומרים ממכרים או מסוכנים",
  "שירותי מין, זנות, ליווי, תוכן מיני או פעילות מינית מסחרית",
  "נשק, תחמושת, סכינים מסוכנות, אמצעי לחימה או ציוד אלים",
  "מוצרים מזויפים או הפרת סימני מסחר",
  "תרופות מרשם, חומרים רפואיים מפוקפקים או הבטחות רפואיות לא מאושרות",
  "הימורים, הלוואות לא חוקיות או פעילות פיננסית חשודה",
  "זיופים, מסמכים מזויפים, רמאות, עקיצות או פעילות לא חוקית",
  "כל מוצר או שירות שאינו חוקי במדינת ישראל",
  "כל פעילות שפוגעת באמון הלקוחות או בשם של וואשופ",
];

const importantItems = [
  "שליחת בקשה לא מבטיחה פרסום.",
  "וואשופ רשאית לאשר, לדחות, לערוך או להסיר חנות בכל שלב.",
  "אם תתגלה פעילות אסורה, החנות תוסר מיד.",
  "וואשופ רשאית לחסום פניות חוזרות מעסקים לא מתאימים.",
];

function RuleSection({
  title,
  items,
  strong = false,
}: {
  title: string;
  items: string[];
  strong?: boolean;
}) {
  return (
    <section className="rounded-lg border border-emerald-950/10 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-black text-zinc-950">{title}</h2>
      <ul className="mt-4 space-y-3 text-base leading-8 text-zinc-700">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-3 size-2 shrink-0 rounded-full bg-emerald-500" />
            <span className={strong ? "font-black text-zinc-950" : undefined}>
              {item}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function SellerRulesPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-emerald-950 p-6 text-white sm:p-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-black text-emerald-100">
            <ShieldCheck className="size-4" aria-hidden="true" />
            בדיקה ידנית וסטנדרט פרסום
          </div>
          <h1 className="mt-5 text-4xl font-black leading-tight sm:text-5xl">
            מי יכול לפרסם חנות בוואשופ?
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-9 text-emerald-50">
            וואשופ אינו ספריית ספאם פתוחה. כל חנות נבדקת ידנית, והמטרה היא
            להציג חנויות וואטסאפ איכותיות, חוקיות, לגיטימיות, שימושיות ומתאימות
            ללקוחות בישראל.
          </p>
        </div>

        <div className="mt-8 grid gap-5">
          <RuleSection title="מי מתאים להופיע בוואשופ" items={suitableItems} />
          <RuleSection title="מה אנחנו בודקים" items={reviewItems} />
          <RuleSection title="מה אסור לפרסם בוואשופ" items={forbiddenItems} strong />
          <RuleSection title="חשוב לדעת" items={importantItems} />

          <section className="rounded-lg border border-emerald-200 bg-emerald-50 p-6">
            <h2 className="text-2xl font-black text-zinc-950">התחייבות החנות</h2>
            <p className="mt-4 text-lg leading-9 text-zinc-700">
              חנות שמופיעה בוואשופ נדרשת לפעול ביושר, לענות בצורה מכבדת, להציג
              מידע אמיתי, לעמוד בהתחייבויות שלה ולתת יחס רציני ללקוחות שפונים
              דרך האתר.
            </p>
            <Link
              href="/add-store"
              className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-emerald-600 px-6 text-sm font-black text-white transition hover:bg-emerald-700"
            >
              הגשת חנות לבדיקה
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}
