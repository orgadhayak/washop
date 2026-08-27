import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/data/blog";

export const metadata: Metadata = {
  title: { absolute: "מדריכים לחנויות וואטסאפ ולעסקים בוואשופ" },
  description: "מדריכים מעשיים על חנויות וואטסאפ, שירות לקוחות, קטלוגים וקשר ישיר בין עסקים ללקוחות.",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-black text-emerald-700">בלוג</p>
        <h1 className="mt-2 text-4xl font-black leading-tight text-zinc-950 sm:text-5xl">
          המדריכים של וואשופ
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-zinc-600">
          התחילו מהמדריכים על חנות וירטואלית בוואטסאפ או על שירות לקוחות, ואחר כך גלו חנויות ועסקים או שלחו עסק לבדיקה.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Link href="/blog/hanut-virtualit-bewhatsapp" className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-black text-emerald-800">איך פותחים חנות וירטואלית בוואטסאפ?</Link>
          <Link href="/blog/sherut-lakohot-bewhatsapp-laasakim" className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-black text-emerald-800">שירות לקוחות בוואטסאפ לעסקים</Link>
          <Link href="/shops" className="rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-black text-emerald-700">חנויות ועסקים בוואטסאפ</Link>
        </div>
        <section className="mt-8 grid gap-4 md:grid-cols-3" aria-label="מדריכים לפי נושא">
          <div className="rounded-xl border border-emerald-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-black text-zinc-950">פתיחת וניהול חנות</h2>
            <div className="mt-3 grid gap-2 text-sm font-bold text-emerald-700">
              <Link href="/blog/hanut-virtualit-bewhatsapp" className="hover:text-emerald-800">חנות וירטואלית בוואטסאפ</Link>
              <Link href="/blog/synchron-katalog-melay-ben-hanuyot" className="hover:text-emerald-800">סנכרון קטלוג ומלאי</Link>
              <Link href="/blog/taknon-hanut-virtualit" className="hover:text-emerald-800">תקנון ומדיניות לחנות</Link>
            </div>
          </div>
          <div className="rounded-xl border border-emerald-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-black text-zinc-950">שירות וקשר ישיר</h2>
            <div className="mt-3 grid gap-2 text-sm font-bold text-emerald-700">
              <Link href="/blog/sherut-lakohot-bewhatsapp-laasakim" className="hover:text-emerald-800">שירות לקוחות בוואטסאפ</Link>
              <Link href="/blog/washop-hibur-yashir-ben-kone-lemocher" className="hover:text-emerald-800">חיבור ישיר בין קונה למוכר</Link>
              <Link href="/blog/mehirim-sherut-vayachas-enoshi" className="hover:text-emerald-800">מחיר, שירות ויחס אישי</Link>
            </div>
          </div>
          <div className="rounded-xl border border-emerald-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-black text-zinc-950">חשיפה וצמיחה</h2>
            <div className="mt-3 grid gap-2 text-sm font-bold text-emerald-700">
              <Link href="/blog/mochrei-whatsapp-indeks-bereshet" className="hover:text-emerald-800">מאינדקס ברשת לפניות ישירות</Link>
              <Link href="/blog/mochrei-whatsapp-zechu-lehashafah" className="hover:text-emerald-800">חשיפה למוכרים בוואטסאפ</Link>
              <Link href="/blog/tochnit-hashutafim-shel-washop" className="hover:text-emerald-800">תוכנית השותפים של וואשופ</Link>
            </div>
          </div>
        </section>
        <div className="mt-10 grid gap-4">
          {blogPosts.map((post) => {
            const dateParts = [post.hebrewDate, post.gregorianDate].filter(Boolean);

            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                dir={post.direction ?? "rtl"}
                lang={post.locale ?? "he"}
                className="group rounded-lg border border-emerald-950/10 bg-white p-6 shadow-sm transition hover:border-emerald-300 hover:shadow-md"
              >
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-bold text-emerald-700">
                  {dateParts.map((part, index) => (
                    <span key={part} className="inline-flex items-center gap-3">
                      {index > 0 ? <span aria-hidden="true">•</span> : null}
                      <span>{part}</span>
                    </span>
                  ))}
                </div>
                <h2 className="mt-2 text-2xl font-black text-zinc-950 group-hover:text-emerald-700">
                  {post.title}
                </h2>
                <p className="mt-3 max-w-3xl text-base leading-7 text-zinc-600">
                  {post.excerpt}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-emerald-700">
                  {post.ctaLabel}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
