import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheck,
  Handshake,
  MapPin,
  Megaphone,
  SearchCheck,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import { PartnersForm } from "@/components/PartnersForm";

export const metadata: Metadata = {
  title: "תוכנית שותפים של וואשופ",
  description:
    "רוצים לעזור לוואשופ לגדול? הצטרפו כשותפים לדרך וסייעו לנו לאתר חנויות וואטסאפ איכותיות בישראל, להכיר בעלי עסקים ולבנות יחד אינדקס אמין ושימושי יותר.",
  alternates: {
    canonical: "/partners",
  },
};

const partnerOptions = [
  {
    title: "איתור חנויות איכותיות",
    text: "עזרה במציאת עסקים ישראליים אמיתיים שמוכרים דרך וואטסאפ ויכולים להתאים לבדיקה.",
    icon: SearchCheck,
  },
  {
    title: "חיבור לבעלי עסקים",
    text: "היכרות עם מוכרים, קהילות או תחומים מקומיים שיכולים להרוויח מנוכחות מסודרת יותר.",
    icon: UsersRound,
  },
  {
    title: "היכרות עם אזור או תחום",
    text: "ידע מקומי, קהילתי או מקצועי שיכול לעזור לנו להבין איפה נמצאות חנויות טובות.",
    icon: MapPin,
  },
  {
    title: "שיווק וחשיפה",
    text: "רעיונות להפצת וואשופ בצורה נקייה ומכבדת, בלי ספאם ובלי הבטחות לא מבוססות.",
    icon: Megaphone,
  },
];

const standards = [
  "כל חנות שמגיעה דרך שותפים עדיין עוברת בדיקה ידנית של וואשופ.",
  "אנחנו מחפשים עסקים חוקיים, לגיטימיים, שימושיים ומתאימים לקהל בישראל.",
  "אין התחייבות לשכר, עמלה או שיתוף פעולה מסחרי בשלב הזה.",
  "וואשופ רשאית לאשר, לדחות או להפסיק כל שיתוף פעולה לפי שיקול דעתה.",
];

export default function PartnersPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="max-w-3xl">
          <p className="text-sm font-black text-emerald-700">תוכנית שותפים</p>
          <h1 className="mt-2 text-4xl font-black leading-tight text-zinc-950 sm:text-5xl">
            תוכנית שותפים של וואשופ
          </h1>
          <p className="mt-5 text-lg leading-9 text-zinc-600">
            וואשופ נבנה כדי לעזור לאנשים בישראל לגלות חנויות וואטסאפ איכותיות,
            חוקיות ורציניות. אם אתם מכירים עסקים טובים, קהילות פעילות או תחום
            מסוים מקרוב, יכול להיות שתוכלו לעזור לנו לבנות אינדקס שימושי ואמין
            יותר.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href="#partners-form"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 text-base font-black text-white transition hover:bg-emerald-700"
            >
              <Handshake className="size-5" aria-hidden="true" />
              השארת פרטים
            </a>
            <Link
              href="/seller-rules"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-emerald-200 bg-white px-6 text-base font-black text-emerald-700 transition hover:bg-emerald-50"
            >
              תנאי פרסום בוואשופ
            </Link>
          </div>
          </div>
          <div className="flex justify-center lg:justify-start">
            <Image
              src="/brand/washop-partners-mascot.png"
              alt="וואשופ"
              width={560}
              height={560}
              className="h-auto w-full max-w-sm object-contain drop-shadow-[0_24px_40px_rgba(5,150,105,0.16)] sm:max-w-md lg:max-w-lg"
              priority
            />
          </div>
        </div>

        <section className="mt-12 grid gap-4 md:grid-cols-2">
          {partnerOptions.map(({ title, text, icon: Icon }) => (
            <div
              key={title}
              className="rounded-lg border border-emerald-950/10 bg-white p-5 shadow-sm"
            >
              <span className="grid size-11 place-items-center rounded-lg bg-emerald-50 text-emerald-700">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <h2 className="mt-4 text-xl font-black text-zinc-950">{title}</h2>
              <p className="mt-3 leading-7 text-zinc-600">{text}</p>
            </div>
          ))}
        </section>

        <section className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-lg bg-zinc-950 p-6 text-white sm:p-8">
            <ShieldCheck className="size-8 text-emerald-300" aria-hidden="true" />
            <h2 className="mt-4 text-2xl font-black">איך זה עובד</h2>
            <div className="mt-5 space-y-4 text-base leading-8 text-zinc-200">
              <p>
                משאירים מייל וכמה מילים עליכם, על האזור או התחום שאתם מכירים,
                ועל הדרך שבה תרצו לעזור. צוות וואשופ יעבור על הפנייה ויבדוק אם
                יש התאמה לשלב הנוכחי של הפרויקט.
              </p>
              <p>
                אם זה יתאים, נחזור אליכם בהמשך לשיחה מסודרת. המטרה היא לבנות
                שיתופי פעולה נקיים, מקצועיים וזהירים, שמחזקים את האמון של
                לקוחות ובעלי עסקים.
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-emerald-950/10 bg-white p-6 shadow-sm sm:p-8">
            <BadgeCheck className="size-8 text-emerald-600" aria-hidden="true" />
            <h2 className="mt-4 text-2xl font-black text-zinc-950">חשוב לדעת</h2>
            <ul className="mt-5 space-y-3 text-base leading-8 text-zinc-700">
              {standards.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-3 size-2 rounded-full bg-emerald-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="partners-form" className="mt-12 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-black text-emerald-700">השארת פרטים</p>
            <h2 className="mt-2 text-3xl font-black leading-tight text-zinc-950">
              רוצים לעזור לוואשופ לגדול?
            </h2>
            <p className="mt-4 text-lg leading-9 text-zinc-600">
              ספרו לנו בקצרה מי אתם, איזה אזור או תחום אתם מכירים, ואיך לדעתכם
              תוכלו לעזור. אין צורך להשאיר מספר טלפון בשלב הזה.
            </p>
          </div>
          <PartnersForm />
        </section>
      </div>
    </div>
  );
}
