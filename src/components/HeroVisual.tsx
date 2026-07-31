import Image from "next/image";
import { BadgeCheck, MessageCircle } from "lucide-react";

export function HeroVisual() {
  return (
    <div
      className="home-mascot-stage relative mx-auto flex w-full max-w-xl items-center justify-center px-4 py-6 sm:px-8 sm:py-8"
      aria-hidden="true"
    >
      <div className="absolute right-1 top-5 z-20 inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-white/95 px-3 py-2 text-xs font-black text-emerald-800 shadow-lg shadow-emerald-950/10 backdrop-blur sm:right-4 sm:top-10 sm:text-sm">
        <BadgeCheck className="size-4 text-emerald-600" />
        חנויות שנבדקו
      </div>
      <Image
        src="/brand/washop-home-mascot-v2.webp"
        alt=""
        width={1448}
        height={1086}
        sizes="(max-width: 1024px) 92vw, 560px"
        className="home-mascot-image relative z-10 h-auto w-full max-w-[560px] select-none object-contain"
        preload
      />
      <div className="absolute bottom-5 left-1 z-20 inline-flex items-center gap-2 rounded-full border border-emerald-700/15 bg-emerald-900 px-3 py-2 text-xs font-black text-white shadow-lg shadow-emerald-950/20 sm:bottom-10 sm:left-3 sm:text-sm">
        <MessageCircle className="size-4 text-emerald-300" />
        פנייה ישירה לעסק
      </div>
    </div>
  );
}
