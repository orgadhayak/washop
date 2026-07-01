import Image from "next/image";
import { HomeLogoLink } from "@/components/HomeLogoLink";
import { siteConfig } from "@/lib/site";

export function Logo() {
  return (
    <HomeLogoLink
      dir="ltr"
      className="brand-logo inline-flex items-center gap-2.5 text-lg font-black tracking-normal text-zinc-950 sm:gap-3 sm:text-2xl"
      aria-label="washop.co.il"
    >
      <Image
        src={siteConfig.brandSymbol}
        alt=""
        width={64}
        height={64}
        className="brand-symbol size-12 sm:size-16"
        aria-hidden="true"
        priority
      />
      <span dir="ltr" className="brand-wordmark inline-flex items-baseline">
        <span className="text-[#232326]">wa</span><span className="text-[#00bf36]">shop</span><span className="text-xs font-bold text-[#2f2f32] sm:text-base">.co.il</span>
      </span>
    </HomeLogoLink>
  );
}
