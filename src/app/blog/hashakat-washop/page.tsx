import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpLeft } from "lucide-react";
import { getBlogPostBySlug } from "@/data/blog";
import { formatHebrewDate } from "@/lib/utils";

const post = getBlogPostBySlug("hashakat-washop");

export const metadata: Metadata = {
  title: post?.title,
  description: post?.excerpt,
  alternates: {
    canonical: "/blog/hashakat-washop",
  },
};

export default function LaunchArticlePage() {
  if (!post) {
    notFound();
  }

  return (
    <article className="py-12 sm:py-16">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-black text-emerald-700 hover:text-emerald-800"
        >
          <ArrowUpLeft className="size-4" aria-hidden="true" />
          חזרה לבלוג
        </Link>
        <p className="mt-8 text-sm font-bold text-emerald-700">
          {formatHebrewDate(post.publishedAt)} · {post.readTime}
        </p>
        <h1 className="mt-3 text-4xl font-black leading-tight text-zinc-950 sm:text-5xl">
          {post.title}
        </h1>
        <p className="mt-5 text-xl leading-9 text-zinc-600">{post.excerpt}</p>
        <div className="mt-10 space-y-6 text-lg leading-9 text-zinc-700">
          {post.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-10 rounded-lg bg-emerald-50 p-6">
          <h2 className="text-2xl font-black text-zinc-950">
            רוצים להוסיף חנות וואטסאפ?
          </h2>
          <p className="mt-3 text-zinc-700">
            שלחו פרטים לבדיקה ידנית, ואנחנו נחזור אליכם אם החנות מתאימה לפרסום.
          </p>
          <Link
            href="/add-store"
            className="mt-5 inline-flex min-h-12 items-center justify-center rounded-full bg-emerald-600 px-6 text-sm font-black text-white transition hover:bg-emerald-700"
          >
            שליחת חנות לבדיקה
          </Link>
        </div>
      </div>
    </article>
  );
}
