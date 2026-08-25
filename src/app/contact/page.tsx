import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MessageCircle, PlusCircle } from "lucide-react";
import { TrackedActionLink } from "@/components/TrackedActionLink";
import { siteConfig } from "@/lib/site";
import { createChatUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: { absolute: "יצירת קשר עם וואשופ" },
  description:
    "צרו קשר עם צוות וואשופ לגבי האינדקס, חנות קיימת, הצטרפות או תיקון פרטים. וואשופ אינה התמיכה הרשמית של WhatsApp.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="bg-[#00a884] py-12 sm:py-16">
      <div className="mx-auto w-[calc(100%-2rem)] max-w-4xl rounded-2xl bg-white px-5 py-8 shadow-lg shadow-emerald-950/10 sm:px-8 lg:px-10">
        <p className="text-sm font-black text-emerald-700">צור קשר</p>
        <h1 className="mt-2 text-4xl font-black leading-tight text-zinc-950 sm:text-5xl">
          אנחנו כאן לשאלות, חנויות והצעות
        </h1>
        <p className="mt-5 text-lg leading-9 text-zinc-600">
          אפשר לפנות אלינו לגבי חנות קיימת, הצטרפות לוואשופ, תיקון פרטים או
          שאלה כללית.
        </p>
        <p className="mt-3 text-sm font-bold leading-7 text-zinc-600">
          לשאלות על שירות לקוחות בוואטסאפ לעסקים אפשר לקרוא את <Link href="/blog/sherut-lakohot-bewhatsapp-laasakim" className="text-emerald-700 underline underline-offset-4">המדריך המעשי</Link>. וואשופ אינה התמיכה הרשמית של WhatsApp ואינה מנהלת את שירות העסק.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <TrackedActionLink
            href={createChatUrl(
              siteConfig.whatsappIntlPhone,
              siteConfig.whatsappIntroMessage,
            )}
            target="_blank"
            rel="noreferrer"
            external
            eventName="contact_submit"
            eventProperties={{ method: "whatsapp", source: "contact_card", route: "/contact" }}
            className="rounded-lg border border-emerald-950/10 bg-white p-6 shadow-sm transition hover:border-emerald-300 hover:shadow-md"
          >
            <MessageCircle className="size-8 text-emerald-600" aria-hidden="true" />
            <h2 className="mt-4 text-xl font-black text-zinc-950">
              וואטסאפ / שירות לקוחות
            </h2>
            <p className="mt-2 text-lg font-bold text-emerald-700">
              שליחת הודעה בוואטסאפ
            </p>
          </TrackedActionLink>
          <TrackedActionLink
            href={`mailto:${siteConfig.supportEmail}`}
            external
            eventName="contact_submit"
            eventProperties={{ method: "email", source: "contact_card", route: "/contact" }}
            className="rounded-lg border border-emerald-950/10 bg-white p-6 shadow-sm transition hover:border-emerald-300 hover:shadow-md"
          >
            <Mail className="size-8 text-emerald-600" aria-hidden="true" />
            <h2 className="mt-4 text-xl font-black text-zinc-950">מייל</h2>
            <p className="mt-2 text-lg font-bold text-emerald-700">
              שליחת מייל לוואשופ
            </p>
          </TrackedActionLink>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <TrackedActionLink
            href={createChatUrl(
              siteConfig.whatsappIntlPhone,
              siteConfig.whatsappIntroMessage,
            )}
            target="_blank"
            rel="noreferrer"
            external
            eventName="contact_submit"
            eventProperties={{ method: "whatsapp", source: "contact_primary", route: "/contact" }}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 text-base font-black text-white transition hover:bg-emerald-700"
          >
            <MessageCircle className="size-5" aria-hidden="true" />
            שליחת הודעה בוואטסאפ
          </TrackedActionLink>
          <Link
            href="/add-store"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-emerald-200 bg-white px-6 text-base font-black text-emerald-700 transition hover:bg-emerald-50"
          >
            <PlusCircle className="size-5" aria-hidden="true" />
            הוספת חנות
          </Link>
        </div>
      </div>
    </div>
  );
}
