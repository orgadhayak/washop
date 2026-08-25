import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "מדיניות פרטיות",
  description: "מדיניות הפרטיות של וואשופ.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="מדיניות פרטיות">
      <p>
        וואשופ הוא אתר גילוי וספרייה לחנויות וואטסאפ בישראל. אנחנו אוספים רק את
        המידע שנמסר לנו ישירות דרך טופס יצירת קשר או טופס הוספת חנות.
      </p>
      <p>
        פרטי שליחת חנות משמשים רק כדי לבדוק את הבקשה, ליצור קשר עם בעל החנות
        ולנהל את תהליך האישור. המידע אינו מיועד למכירה לצדדים שלישיים.
      </p>
      <p>
        האתר אינו שומר פרטי תשלום, אינו מפעיל חשבונות משתמשים ואינו מבצע רכישות
        בשם הגולשים. רכישות ושיחות מתבצעות ישירות מול החנות הרלוונטית.
      </p>
      <p>
        לבקשות בנושא פרטיות, תיקון או הסרת מידע ניתן לפנות אלינו דרך{" "}
        <a href={`mailto:${siteConfig.supportEmail}`}>שליחת מייל לוואשופ</a>.
      </p>
    </LegalPage>
  );
}

function LegalPage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#00a884] py-12 sm:py-16">
      <div className="mx-auto w-[calc(100%-2rem)] max-w-3xl rounded-2xl bg-white px-5 py-8 shadow-lg shadow-emerald-950/10 sm:px-8 lg:px-10">
        <h1 className="text-4xl font-black leading-tight text-zinc-950">{title}</h1>
        <div className="mt-8 space-y-5 text-lg leading-9 text-zinc-700 [&_a]:font-bold [&_a]:text-emerald-700">
          {children}
        </div>
      </div>
    </div>
  );
}
