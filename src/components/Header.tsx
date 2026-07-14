"use client";

import Link from "next/link";
import { Globe2, PlusCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Logo";
import { mainNavigation } from "@/lib/site";

const globalNavigation = [
  { label: "Stores", href: "/global#stores" },
  { label: "How it works", href: "/global#how-it-works" },
  { label: "Apply", href: "/global#apply" },
  { label: "FAQ", href: "/global#faq" },
  { label: "Israel · עברית", href: "/" },
];

export function Header() {
  const pathname = usePathname();
  const isGlobal = pathname === "/global";
  const navigation = isGlobal ? globalNavigation : mainNavigation;
  const actionHref = isGlobal ? "/global#apply" : "/add-store";
  const actionLabel = isGlobal ? "Apply" : "הוספת חנות";

  return (
    <header
      className="sticky top-0 z-40 border-b border-emerald-950/10 bg-white/92 backdrop-blur"
      dir={isGlobal ? "ltr" : "rtl"}
      lang={isGlobal ? "en" : "he"}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Logo />
        <nav
          className="hidden items-center gap-1 text-sm font-semibold text-zinc-700 lg:flex"
          aria-label={isGlobal ? "Primary navigation" : "ניווט ראשי"}
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 transition hover:bg-emerald-50 hover:text-emerald-700"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href={actionHref}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-emerald-600 px-4 text-sm font-bold text-white shadow-sm shadow-emerald-700/20 transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
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
        className="green-scrollbar flex gap-1 overflow-x-auto border-t border-emerald-950/5 px-4 py-2 text-sm font-semibold text-zinc-700 lg:hidden"
        aria-label={isGlobal ? "Secondary navigation" : "ניווט משני"}
      >
        {navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="shrink-0 rounded-full px-3 py-2 transition hover:bg-emerald-50 hover:text-emerald-700"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
