import { MessageCircle } from "lucide-react";
import { TrackedActionLink } from "@/components/TrackedActionLink";
import { siteConfig } from "@/lib/site";
import { createChatUrl } from "@/lib/whatsapp";

export function FloatingWhatsAppButton() {
  return (
    <TrackedActionLink
      href={createChatUrl(
        siteConfig.whatsappIntlPhone,
        siteConfig.whatsappIntroMessage,
      )}
      target="_blank"
      rel="noreferrer"
      external
      eventName="contact_submit"
      eventProperties={{ method: "whatsapp", source: "floating_button" }}
      aria-label="פתיחת שיחה עם וואשופ בוואטסאפ"
      className="fixed bottom-3 left-3 z-50 inline-flex size-12 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg shadow-emerald-900/25 transition hover:-translate-y-0.5 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 sm:bottom-5 sm:left-5 sm:size-14"
    >
      <MessageCircle className="size-7" aria-hidden="true" />
    </TrackedActionLink>
  );
}
