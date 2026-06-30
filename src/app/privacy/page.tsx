import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "מדיניות פרטיות",
  description: "מדיניות הפרטיות של WaShop.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="מדיניות פרטיות">
      <p>
        WaShop הוא אתר גילוי וספרייה לחנויות וואטסאפ בישראל. אנחנו אוספים רק את
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
        לבקשות בנושא פרטיות, תיקון או הסרת מידע ניתן לפנות אלינו בכתובת{" "}
        <a href={`mailto:${siteConfig.supportEmail}`}>{siteConfig.supportEmail}</a>.
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
    <div className="py-12 sm:py-16">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black leading-tight text-zinc-950">{title}</h1>
        <div className="mt-8 space-y-5 text-lg leading-9 text-zinc-700 [&_a]:font-bold [&_a]:text-emerald-700">
          {children}
        </div>
      </div>
    </div>
  );
}
