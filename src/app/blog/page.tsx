import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/data/blog";

export const metadata: Metadata = {
  title: "בלוג",
  description: "מאמרים ועדכונים על חנויות וואטסאפ, קנייה ישירה ועסקים ישראליים.",
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
          עדכונים ומחשבות על חנויות וואטסאפ
        </h1>
        <div className="mt-10 grid gap-4">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-lg border border-emerald-950/10 bg-white p-6 shadow-sm transition hover:border-emerald-300 hover:shadow-md"
            >
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-bold text-emerald-700">
                <span>{post.hebrewDate}</span>
                <span aria-hidden="true">•</span>
                <span>{post.gregorianDate}</span>
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
          ))}
        </div>
      </div>
    </div>
  );
}
