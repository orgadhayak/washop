import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { createChatUrl } from "@/lib/whatsapp";

export function FloatingWhatsAppButton() {
  return (
    <a
      href={createChatUrl(
        siteConfig.whatsappIntlPhone,
        siteConfig.whatsappIntroMessage,
      )}
      target="_blank"
      rel="noreferrer"
      aria-label="פתיחת שיחה עם וואשופ בוואטסאפ"
      className="fixed bottom-5 left-5 z-50 inline-flex size-14 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg shadow-emerald-900/25 transition hover:-translate-y-0.5 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
    >
      <MessageCircle className="size-7" aria-hidden="true" />
    </a>
  );
}
