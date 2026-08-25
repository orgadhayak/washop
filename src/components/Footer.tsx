"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { HomeLogoLink } from "@/components/HomeLogoLink";
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

const englishArticleRoutes = [
  "/blog/washop-global-whatsapp-store-directory",
  "/blog/whatsapp-store-discovery-index-for-quality-sellers",
];

type FooterProps = {
  activeCategories: Array<{ slug: string; name: string }>;
};

export function Footer({ activeCategories }: FooterProps) {
  const pathname = usePathname();
  const isGlobal = pathname === "/global" || englishArticleRoutes.includes(pathname);

  if (isGlobal) {
    return (
      <footer className="border-t-4 border-[#00c853] bg-[#007f62] text-white" dir="ltr" lang="en">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
          <div className="space-y-4">
            <HomeLogoLink
              aria-label="washop.co.il"
                className="inline-flex w-fit items-center gap-3 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#007f62] sm:gap-4"
            >
              <Image
                src="/brand/washop-footer-mascot.png"
                alt="WaShop"
                width={224}
                height={224}
                className="size-36 shrink-0 object-contain sm:size-44 lg:size-48"
              />
              <span
                dir="ltr"
                className="inline-flex items-baseline text-2xl font-black leading-none tracking-normal sm:text-4xl"
                style={{ unicodeBidi: "isolate" }}
              >
                <span className="text-white">wa</span>
                <span className="text-[#a8ffbf]">shop</span>
                <span className="text-sm font-bold text-white sm:text-lg">
                  .co.il
                </span>
              </span>
            </HomeLogoLink>
            <p className="max-w-md text-sm leading-7 text-white/85">
              WaShop helps customers discover carefully reviewed stores, open
              catalogs and connect directly with sellers by chat.
            </p>
            <p className="text-xs leading-6 text-white/70">
              WaShop is an independent service and is not affiliated with
              WhatsApp or Meta.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-black text-white">Global links</h2>
            <div className="mt-3 grid gap-2 text-sm text-white/80">
              <Link href="/global#stores" className="transition hover:text-white">
                Stores
              </Link>
              <Link href="/global#apply" className="transition hover:text-white">
                Apply as a seller
              </Link>
              <Link
                href="/blog/washop-global-whatsapp-store-directory"
                className="transition hover:text-white"
              >
                WaShop Global article
              </Link>
              <Link href="/" className="transition hover:text-white">
                Israel · עברית
              </Link>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-black text-white">Contact</h2>
            <div className="mt-3 space-y-3 text-sm text-white/80">
              <a
                href={createChatUrl(
                  siteConfig.whatsappIntlPhone,
                  "Hello, I reached WaShop Global and would like more details.",
                )}
                className="flex items-center gap-2 transition hover:text-white"
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                Message WaShop
              </a>
              <a
                href={`mailto:${siteConfig.supportEmail}`}
                className="flex items-center gap-2 transition hover:text-white"
              >
                <Mail className="size-4" aria-hidden="true" />
                Email WaShop
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="border-t-4 border-[#00c853] bg-[#007f62] text-white">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
        <div className="space-y-4">
          <HomeLogoLink
            aria-label="וואשופ"
            className="inline-flex w-fit items-center gap-3 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#007f62] sm:gap-4"
          >
            <Image
              src="/brand/washop-footer-mascot.png"
              alt="וואשופ"
              width={224}
              height={224}
              className="size-36 shrink-0 object-contain sm:size-44 lg:size-48"
            />
            <span
              dir="ltr"
              className="inline-flex items-baseline text-2xl font-black leading-none tracking-normal sm:text-4xl"
              style={{ unicodeBidi: "isolate" }}
            >
              <span className="text-white">wa</span>
              <span className="text-[#a8ffbf]">shop</span>
              <span className="text-sm font-bold text-white sm:text-lg">
                .co.il
              </span>
            </span>
          </HomeLogoLink>
          <p className="max-w-md text-sm leading-7 text-white/85">
            וואשופ מרכז חנויות וואטסאפ ישראליות במקום אחד, עם דגש על קטלוגים
            פעילים, פנייה ישירה למוכר וחוויית קנייה פשוטה.
          </p>
          <p className="text-xs leading-6 text-white/70">{siteConfig.disclaimer}</p>
        </div>

        <div>
          <h2 className="text-sm font-black text-white">קטגוריות</h2>
          <div className="mt-3 grid grid-cols-1 gap-2 text-sm text-white/80 sm:grid-cols-2 lg:grid-cols-1">
            {activeCategories.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="transition hover:text-white"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-black text-white">קשר מהיר</h2>
          <div className="mt-3 space-y-3 text-sm text-white/80">
            <a
              href={createChatUrl(
                siteConfig.whatsappIntlPhone,
                siteConfig.whatsappIntroMessage,
              )}
              className="flex items-center gap-2 transition hover:text-white"
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              שליחת הודעה בוואטסאפ
            </a>
            <a
              href={`mailto:${siteConfig.supportEmail}`}
              className="flex items-center gap-2 transition hover:text-white"
            >
              <Mail className="size-4" aria-hidden="true" />
              שליחת מייל לוואשופ
            </a>
            <div className="flex flex-wrap gap-3 pt-2">
              {footerLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="transition hover:text-white"
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
