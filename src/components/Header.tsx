"use client";

import Link from "next/link";
import { Globe2, PlusCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Logo";
import { trackSafeEvent } from "@/lib/analytics";
import { mainNavigation } from "@/lib/site";

const globalNavigation = [
  { label: "Stores", href: "/global#stores" },
  { label: "How it works", href: "/global#how-it-works" },
  { label: "Apply", href: "/global#apply" },
  { label: "FAQ", href: "/global#faq" },
  { label: "Israel · עברית", href: "/" },
];

const englishArticleRoutes = [
  "/blog/washop-global-whatsapp-store-directory",
  "/blog/whatsapp-store-discovery-index-for-quality-sellers",
];

export function Header() {
  const pathname = usePathname();
  const isGlobal = pathname === "/global" || englishArticleRoutes.includes(pathname);
  const navigation = isGlobal ? globalNavigation : mainNavigation;
  const actionHref = isGlobal ? "/global#apply" : "/add-store";
  const actionLabel = isGlobal ? "Apply" : "הוספת חנות";

  return (
    <header
      className="sticky top-0 z-40 border-b border-white/20 bg-[#008f72] shadow-sm shadow-emerald-950/15"
      dir={isGlobal ? "ltr" : "rtl"}
      lang={isGlobal ? "en" : "he"}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Logo />
        <nav
          className="hidden items-center gap-1 text-sm font-semibold text-white lg:flex"
          aria-label={isGlobal ? "Primary navigation" : "ניווט ראשי"}
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => {
                if (item.href === "/global" || (isGlobal && item.href === "/")) {
                  trackSafeEvent("language_or_global_switch", {
                    destination: item.href === "/" ? "israel" : "global",
                    source: "header_desktop",
                  });
                }
              }}
              className="rounded-full px-3 py-2 transition hover:bg-white/15 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href={actionHref}
          onClick={() =>
            trackSafeEvent("seller_cta_click", {
              destination: actionHref,
              source: "header",
              locale: isGlobal ? "en" : "he",
            })
          }
          className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white px-4 text-sm font-bold text-[#007f62] shadow-sm shadow-emerald-950/15 transition hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#008f72]"
        >
          {isGlobal ? (
            <Globe2 className="size-4" aria-hidden="true" />
          ) : (
            <PlusCircle className="size-4" aria-hidden="true" />
          )}
          {actionLabel}
        </Link>
      </div>
      <nav
        className="green-scrollbar flex gap-1 overflow-x-auto border-t border-white/20 px-4 py-2 text-sm font-semibold text-white lg:hidden"
        aria-label={isGlobal ? "Secondary navigation" : "ניווט משני"}
      >
        {navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => {
              if (item.href === "/global" || (isGlobal && item.href === "/")) {
                trackSafeEvent("language_or_global_switch", {
                  destination: item.href === "/" ? "israel" : "global",
                  source: "header_mobile",
                });
              }
            }}
            className="shrink-0 rounded-full px-3 py-2 transition hover:bg-white/15 hover:text-white"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
