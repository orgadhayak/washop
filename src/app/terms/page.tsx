import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "תנאי שימוש",
  description: "תנאי השימוש של WaShop.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black leading-tight text-zinc-950">
          תנאי שימוש
        </h1>
        <div className="mt-8 space-y-5 text-lg leading-9 text-zinc-700">
          <p>
            WaShop הוא אתר גילוי וספרייה לחנויות וואטסאפ. האתר אינו המוכר, אינו
            צד לעסקה ואינו מנהל תשלום, מלאי, משלוח או שירות לקוחות עבור החנויות.
          </p>
          <p>
            כל רכישה, תקשורת, הצעת מחיר, אספקה או שירות מתבצעים ישירות מול
            החנות שבה בחרתם לפנות. על הגולשים לבדוק בעצמם את פרטי העסקה לפני
            רכישה.
          </p>
          <p>
            WaShop רשאי לאשר, לדחות, לערוך או להסיר פרסומים לפי שיקול דעתו,
            כולל במקרים של מידע חסר, שירות לא מתאים, תלונות או חוסר התאמה לאופי
            האתר.
          </p>
          <p>
            WaShop אינו אחראי למלאי, מחיר, זמני אספקה, איכות מוצר, מדיניות
            החזרה או שירות של חנות כלשהי. האתר עצמאי ואינו קשור או מזוהה עם
            WhatsApp או Meta.
          </p>
        </div>
      </div>
    </div>
  );
}
