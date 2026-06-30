import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      dir="ltr"
      className="brand-logo inline-flex items-center gap-1.5 text-lg font-black tracking-normal text-zinc-950 sm:gap-2 sm:text-2xl"
      aria-label="washop.co.il"
    >
      <Image
        src="/brand/washop-symbol.png"
        alt=""
        width={40}
        height={40}
        className="brand-symbol size-8 sm:size-10"
        aria-hidden="true"
        priority
      />
      <span dir="ltr" className="brand-wordmark inline-flex items-baseline">
        <span className="text-[#232326]">wa</span><span className="text-[#00bf36]">shop</span><span className="text-xs font-bold text-[#2f2f32] sm:text-base">.co.il</span>
      </span>
    </Link>
  );
}
