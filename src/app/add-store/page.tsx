import type { Metadata } from "next";
import { AlertCircle, BadgeCheck, Mail } from "lucide-react";
import { SubmitStoreForm } from "@/components/SubmitStoreForm";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "הוספת חנות וואטסאפ",
  description:
    "שלחו חנות וואטסאפ לבדיקה ידנית והצטרפות אפשרית לספריית WaShop.",
  alternates: {
    canonical: "/add-store",
  },
};

export default function AddStorePage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
        <div>
          <p className="text-sm font-black text-emerald-700">הצטרפות ל-WaShop</p>
          <h1 className="mt-2 text-4xl font-black leading-tight text-zinc-950 sm:text-5xl">
            הוספת חנות וואטסאפ ל-WaShop
          </h1>
          <p className="mt-5 text-lg leading-9 text-zinc-600">
            יש לכם קטלוג וואטסאפ פעיל? מלאו את הפרטים ונבדוק אם החנות מתאימה
            להופיע ב-WaShop.
          </p>

          <div className="mt-6 space-y-3">
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-7 text-amber-900">
              <div className="mb-2 flex items-center gap-2 font-black">
                <AlertCircle className="size-4" aria-hidden="true" />
                הערת אישור
              </div>
              שליחת הטופס אינה מבטיחה פרסום באתר. כל חנות נבדקת ידנית לפי איכות
              הקטלוג, אמינות, נראות, שירות והתאמה לקהל הישראלי.
            </div>
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm leading-7 text-emerald-900">
              <div className="mb-2 flex items-center gap-2 font-black">
                <BadgeCheck className="size-4" aria-hidden="true" />
                מה אנחנו בודקים
              </div>
              קטלוג ברור, פרטי קשר פעילים, שירות רציני, התאמה לישראל וחוויית
              קנייה מכובדת.
            </div>
            <div className="rounded-lg border border-zinc-200 bg-white p-4 text-sm leading-7 text-zinc-700">
              <div className="mb-2 flex items-center gap-2 font-black text-zinc-950">
                <Mail className="size-4" aria-hidden="true" />
                יעד השליחה
              </div>
              הטופס נשלח לכתובת {siteConfig.supportEmail}.
            </div>
          </div>
        </div>

        <SubmitStoreForm />
      </div>
    </div>
  );
}
