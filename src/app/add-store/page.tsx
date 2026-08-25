import type { Metadata } from "next";
import Link from "next/link";
import { AlertCircle, BadgeCheck, Mail } from "lucide-react";
import { SubmitStoreForm } from "@/components/SubmitStoreForm";

export const metadata: Metadata = {
  title: {
    absolute: "פרסום חנות וואטסאפ – שליחת עסק לבדיקה | WaShop",
  },
  description:
    "שלחו את חנות הוואטסאפ שלכם לבדיקה ידנית בוואשופ. עסקים מתאימים יכולים להצטרף לאינדקס עם פרטי העסק וקישור ישיר לקטלוג או לשיחה.",
  alternates: {
    canonical: "/add-store",
  },
};

const faqItems = [
  {
    question: "האם כל חנות שמגישה פרטים מתפרסמת?",
    answer:
      "לא. ההגשה היא בקשה לבדיקה ידנית. וואשופ בוחנת התאמה, פעילות חוקית, פרטים ברורים ורמת רצינות לפני החלטה על פרסום.",
  },
  {
    question: "האם חייבים קטלוג וואטסאפ פעיל?",
    answer:
      "לא. אפשר להשאיר מייל וכמה מילים על העסק גם אם הקטלוג עדיין לא מוכן. פרטי העסק הנוספים יכולים לעזור לצוות להבין את הבקשה.",
  },
  {
    question: "האם פרסום בוואשופ מבטיח פניות או מכירות?",
    answer:
      "לא. אישור או פרסום אינם מבטיחים חשיפה, פניות, מכירות או תוצאה עסקית. וואשופ היא ספריית גילוי שמחברת לקוחות לעסקים עצמאיים.",
  },
  {
    question: "מי אחראי לתשלום, למשלוח ולהחזרות?",
    answer:
      "העסק אחראי למחירים, לזמינות, לתשלום, למשלוח, להחזרות ולשירות. הפרטים מסוכמים ישירות בין העסק ללקוח.",
  },
  {
    question: "האם חנות מאושרת יכולה להופיע גם בוואשופ גלובל?",
    answer:
      "ייתכן. חנות שאושרה יכולה להיבחן גם לעמוד WaShop Global, אך הדבר אינו מובטח ואינו מבטיח פניות, מכירות או משלוח בינלאומי.",
  },
];

export default function AddStorePage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <div className="py-12 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
        <div>
          <p className="text-sm font-black text-emerald-700">הצטרפות לוואשופ</p>
          <h1 className="mt-2 text-4xl font-black leading-tight text-zinc-950 sm:text-5xl">
            פרסום והוספת חנות וואטסאפ לוואשופ
          </h1>
          <p className="mt-5 text-lg leading-9 text-zinc-600">
            יש לכם חנות וואטסאפ איכותית או רעיון לחנות כזו? מייל חובה בלבד.
            כל שאר הפרטים יעזרו לנו להבין את העסק, אבל אינם חובה.
          </p>

          <div className="mt-6 space-y-3">
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm leading-7 text-emerald-900">
              <div className="mb-2 font-black">
                אין לכם עדיין קטלוג וואטסאפ? אין בעיה.
              </div>
              <p>
                אפשר להשאיר מייל וכמה מילים על העסק, וצוות וואשופ יחזור אליכם.
                אם צריך, נעזור להבין איך להתחיל נכון עם חנות וואטסאפ ואיך
                להתאים את העסק לפרסום באתר.
              </p>
            </div>
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-7 text-amber-900">
              <div className="mb-2 flex items-center gap-2 font-black">
                <AlertCircle className="size-4" aria-hidden="true" />
                הערת אישור
              </div>
              שליחת הטופס אינה מבטיחה פרסום באתר. רק עסקים מתאימים, חוקיים
              ורציניים יאושרו לאחר בדיקה ידנית.
            </div>
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm leading-7 text-emerald-900">
              <div className="mb-2 flex items-center gap-2 font-black">
                <BadgeCheck className="size-4" aria-hidden="true" />
                מה אנחנו בודקים
              </div>
              התהליך פשוט: משאירים מייל, ואם יש עוד פרטים אפשר להוסיף אותם.
              את הקטגוריות צוות וואשופ יקבע לאחר הבדיקה.
            </div>
            <div className="rounded-lg border border-emerald-200 bg-white p-4 text-sm leading-7 text-zinc-700">
              <div className="mb-2 font-black text-zinc-950">
                חשיפה גם ב־WaShop Global
              </div>
              חנות שאושרה ל־WaShop יכולה להופיע גם בעמוד הגלובלי באנגלית. אין
              בכך הבטחה לפניות, מכירות או משלוח בינלאומי. זמינות, יעדי משלוח,
              תשלום והחזרות מסוכמים ישירות בין המוכר ללקוח.
            </div>
            <div className="rounded-lg border border-zinc-200 bg-white p-4 text-sm leading-7 text-zinc-700">
              <div className="mb-2 flex items-center gap-2 font-black text-zinc-950">
                <Mail className="size-4" aria-hidden="true" />
                יעד השליחה
              </div>
              הטופס נשלח לצוות וואשופ.
            </div>
          </div>
        </div>

        <SubmitStoreForm />
      </div>

      <div className="mx-auto mt-12 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-2">
          <section className="rounded-xl border border-emerald-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black text-zinc-950">
              למי מתאים להגיש חנות לוואשופ?
            </h2>
            <p className="mt-3 leading-8 text-zinc-700">
              לעסקים ישראליים אמיתיים שמציעים מוצרים או שירותים חוקיים, עם פרטי
              קשר ברורים ונכונות לתת מענה מכבד. הגשה מתאימה גם למי שרק מתחיל
              לבנות נוכחות בוואטסאפ ורוצה להסביר מהו העסק.
            </p>
            <Link href="/seller-rules" className="mt-4 inline-flex text-sm font-black text-emerald-700 hover:text-emerald-800">
              תנאי הפרסום בוואשופ
            </Link>
          </section>
          <section className="rounded-xl border border-emerald-200 bg-emerald-50 p-6">
            <h2 className="text-2xl font-black text-zinc-950">
              מה כדאי להכין לפני השליחה?
            </h2>
            <p className="mt-3 leading-8 text-zinc-700">
              מייל הוא חובה. שם העסק, עיר, מספר וואטסאפ, קישור לקטלוג אם יש
              ופירוט קצר על המוצרים או השירות עוזרים לבדיקה, אך אינם תנאי
              לשליחת הטופס.
            </p>
          </section>
          <section className="rounded-xl border border-emerald-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black text-zinc-950">איך מתבצעת הבדיקה?</h2>
            <p className="mt-3 leading-8 text-zinc-700">
              צוות וואשופ בוחן את הפרטים, את מהות העסק ואת התאמתו לקהל ולכללי
              הפרסום. הקטגוריות נקבעות לאחר הבדיקה, ולכן אין צורך לבחור אותן
              בטופס.
            </p>
          </section>
          <section className="rounded-xl border border-emerald-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black text-zinc-950">
              מה עשוי להופיע בעמוד של חנות שאושרה?
            </h2>
            <p className="mt-3 leading-8 text-zinc-700">
              חנות שאושרה עשויה להופיע בספרייה עם שם העסק, תיאור, קטגוריות
              וקישור ישיר לקטלוג או לשיחה. זהו עמוד גילוי בלבד ואינו מבטיח
              פרסום, תנועה, פניות או מכירות.
            </p>
          </section>
        </div>

        <section className="mt-6 rounded-xl border border-emerald-200 bg-white p-6 shadow-sm">
          <h2 className="text-3xl font-black leading-tight text-zinc-950">
            שאלות נפוצות על פרסום חנות וואטסאפ
          </h2>
          <div className="mt-5 grid gap-4">
            {faqItems.map((item) => (
              <div key={item.question} className="rounded-lg bg-emerald-50 p-5">
                <h3 className="text-xl font-black text-zinc-950">{item.question}</h3>
                <p className="mt-3 leading-8 text-zinc-700">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
