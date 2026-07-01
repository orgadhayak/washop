import Image from "next/image";
import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";
import { categories } from "@/data/categories";
import { createChatUrl } from "@/lib/whatsapp";
import { siteConfig } from "@/lib/site";

const footerLinks = [
  { label: "אודות", href: "/about" },
  { label: "צור קשר", href: "/contact" },
  { label: "פרטיות", href: "/privacy" },
  { label: "תנאי שימוש", href: "/terms" },
  { label: "מי יכול לפרסם?", href: "/seller-rules" },
  { label: "תוכנית שותפים", href: "/partners" },
  { label: "נגישות", href: "/accessibility" },
  { label: "בלוג", href: "/blog" },
];

export function Footer() {
  return (
    <footer className="border-t border-emerald-950/10 bg-white">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
        <div className="space-y-4">
          <Link
            href="/"
            aria-label="וואשופ"
            className="inline-flex w-fit items-center gap-3 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
          >
            <Image
              src="/brand/washop-footer-mascot.png"
              alt="וואשופ"
              width={112}
              height={112}
              className="size-20 shrink-0 object-contain sm:size-24"
            />
            <span
              dir="ltr"
              className="inline-flex items-baseline text-2xl font-black tracking-normal sm:text-3xl"
              style={{ unicodeBidi: "isolate" }}
            >
              <span className="text-[#232326]">wa</span>
              <span className="text-[#00bf36]">shop</span>
              <span className="text-base font-bold text-[#2f2f32] sm:text-lg">
                .co.il
              </span>
            </span>
          </Link>
          <p className="max-w-md text-sm leading-7 text-zinc-600">
            וואשופ מרכז חנויות וואטסאפ ישראליות במקום אחד, עם דגש על קטלוגים
            פעילים, פנייה ישירה למוכר וחוויית קנייה פשוטה.
          </p>
          <p className="text-xs leading-6 text-zinc-500">{siteConfig.disclaimer}</p>
        </div>

        <div>
          <h2 className="text-sm font-black text-zinc-950">קטגוריות</h2>
          <div className="mt-3 grid grid-cols-1 gap-2 text-sm text-zinc-600 sm:grid-cols-2 lg:grid-cols-1">
            {categories.slice(0, 8).map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="transition hover:text-emerald-700"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-black text-zinc-950">קשר מהיר</h2>
          <div className="mt-3 space-y-3 text-sm text-zinc-600">
            <a
              href={createChatUrl(
                siteConfig.whatsappIntlPhone,
                siteConfig.whatsappIntroMessage,
              )}
              className="flex items-center gap-2 transition hover:text-emerald-700"
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              שליחת הודעה בוואטסאפ
            </a>
            <a
              href={`mailto:${siteConfig.supportEmail}`}
              className="flex items-center gap-2 transition hover:text-emerald-700"
            >
              <Mail className="size-4" aria-hidden="true" />
              שליחת מייל לוואשופ
            </a>
            <div className="flex flex-wrap gap-3 pt-2">
              {footerLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="transition hover:text-emerald-700"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
