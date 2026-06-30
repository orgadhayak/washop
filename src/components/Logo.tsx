import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      dir="ltr"
      className="brand-logo inline-flex items-baseline text-2xl font-black tracking-normal text-zinc-950"
      aria-label="WaShop.co.il"
    >
      <span>Wa</span><span className="text-emerald-600">Shop</span><span className="text-base font-bold text-zinc-500">.co.il</span>
    </Link>
  );
}
