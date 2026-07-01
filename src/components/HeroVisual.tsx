import Image from "next/image";

export function HeroVisual() {
  return (
    <div
      className="relative mx-auto flex w-full max-w-xl items-center justify-center py-3 sm:py-5"
      aria-hidden="true"
    >
      <div className="absolute inset-x-6 top-12 h-64 rounded-full bg-emerald-200/55 blur-3xl" />
      <div className="absolute bottom-6 left-8 h-32 w-32 rounded-full bg-emerald-100/80 blur-2xl" />
      <Image
        src="/brand/washop-home-hero.png"
        alt=""
        width={900}
        height={900}
        className="relative z-10 h-auto w-full max-w-[560px] select-none object-contain drop-shadow-[0_28px_45px_rgba(4,120,87,0.18)]"
        priority
      />
    </div>
  );
}
