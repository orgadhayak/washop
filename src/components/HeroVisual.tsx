import Image from "next/image";

export function HeroVisual() {
  return (
    <div
      className="relative mx-auto flex w-full max-w-xl items-center justify-center py-3 sm:py-5"
      aria-hidden="true"
    >
      <Image
        src="/brand/washop-home-hero.png"
        alt=""
        width={1263}
        height={968}
        className="h-auto w-full max-w-[560px] select-none object-contain"
        priority
      />
    </div>
  );
}
