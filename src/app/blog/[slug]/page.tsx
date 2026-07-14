import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPostBySlug } from "@/data/blog";
import { siteConfig } from "@/lib/site";
import { absoluteUrl } from "@/lib/utils";

type BlogArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.metaTitle ?? post.title,
    description: post.metaDescription ?? post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.metaTitle ?? post.title,
      description: post.metaDescription ?? post.excerpt,
      url: `/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle ?? post.title,
      description: post.metaDescription ?? post.excerpt,
    },
  };
}

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const direction = post.direction ?? "rtl";
  const locale = post.locale ?? "he";
  const isEnglish = locale === "en";
  const dateParts = [post.hebrewDate, post.gregorianDate].filter(Boolean);
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.metaDescription ?? post.excerpt,
      datePublished: post.publishedAt,
      dateModified: post.publishedAt,
      inLanguage: isEnglish ? "en" : "he-IL",
      mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
      author: {
        "@type": "Organization",
        name: siteConfig.shortName,
        url: siteConfig.domain,
      },
      publisher: {
        "@type": "Organization",
        name: siteConfig.shortName,
        url: siteConfig.domain,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: isEnglish ? "WaShop" : "וואשופ",
          item: siteConfig.domain,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: isEnglish ? "Blog" : "בלוג",
          item: absoluteUrl("/blog"),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: post.title,
          item: absoluteUrl(`/blog/${post.slug}`),
        },
      ],
    },
    ...(post.faqs?.length
      ? [
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: post.faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          },
        ]
      : []),
  ];

  return (
    <article className="py-12 sm:py-16" dir={direction} lang={locale}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-black text-emerald-700 hover:text-emerald-800"
        >
          {isEnglish ? "Back to blog" : "חזרה לבלוג"}
        </Link>
        <div className="mt-8 inline-flex flex-wrap items-center gap-x-3 gap-y-1 rounded-full bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-800">
          {dateParts.map((part, index) => (
            <span key={part} className="inline-flex items-center gap-3">
              {index > 0 ? <span aria-hidden="true">•</span> : null}
              <span>{part}</span>
            </span>
          ))}
        </div>
        <h1 className="mt-5 text-4xl font-black leading-tight text-zinc-950 sm:text-5xl">
          {post.title}
        </h1>
        <p className="mt-5 text-xl leading-9 text-zinc-600">{post.excerpt}</p>
        {post.showTableOfContents && post.sections?.length ? (
          <nav
            aria-label={isEnglish ? "Table of contents" : "תוכן עניינים"}
            className="mt-8 rounded-lg border border-emerald-200 bg-emerald-50 p-5"
          >
            <h2 className="text-xl font-black text-zinc-950">
              {isEnglish ? "In this guide" : "במדריך הזה"}
            </h2>
            <ol className="mt-3 grid gap-2 text-sm font-bold text-emerald-800">
              {post.sections.map((section, index) => (
                <li key={section.title}>
                  <Link
                    href={`#section-${index + 1}`}
                    className="transition hover:text-emerald-950"
                  >
                    {section.title}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        ) : null}
        <div className="mt-10 space-y-6 text-lg leading-9 text-zinc-700">
          {post.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        {post.sections?.map((section, index) => (
          <section
            key={section.title}
            id={`section-${index + 1}`}
            className="mt-10 rounded-lg border border-emerald-200 bg-white p-6 shadow-sm"
          >
            <h2 className="text-3xl font-black leading-tight text-zinc-950">
              {section.title}
            </h2>
            <div className="mt-5 space-y-5 text-lg leading-9 text-zinc-700">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            {section.ctaLabel && section.ctaHref ? (
              <Link
                href={section.ctaHref}
                className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-emerald-600 px-6 text-sm font-black text-white transition hover:bg-emerald-700"
              >
                {section.ctaLabel}
              </Link>
            ) : null}
          </section>
        ))}
        {post.faqs?.length ? (
          <section className="mt-10 rounded-lg border border-emerald-200 bg-white p-6 shadow-sm">
            <h2 className="text-3xl font-black leading-tight text-zinc-950">
              שאלות נפוצות
            </h2>
            <div className="mt-5 grid gap-4">
              {post.faqs.map((faq) => (
                <div key={faq.question} className="rounded-lg bg-emerald-50 p-5">
                  <h3 className="text-xl font-black text-zinc-950">
                    {faq.question}
                  </h3>
                  <p className="mt-3 leading-8 text-zinc-700">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}
        {post.relatedLinks?.length ? (
          <section className="mt-10 rounded-lg border border-emerald-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black text-zinc-950">
              {isEnglish ? "Related links" : "קישורים נוספים"}
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {post.relatedLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-black text-emerald-800 transition hover:bg-emerald-100"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </section>
        ) : null}
        <div className="mt-10 rounded-lg bg-emerald-50 p-6">
          <h2 className="text-2xl font-black text-zinc-950">
            {post.articleCtaTitle ?? "רוצים להוסיף חנות וואטסאפ?"}
          </h2>
          <p className="mt-3 text-zinc-700">
            {post.articleCtaDescription ??
              "שלחו פרטים לבדיקה ידנית, ונחזור אליכם אם החנות מתאימה לפרסום בוואשופ."}
          </p>
          <Link
            href={post.articleCtaHref ?? "/add-store"}
            className="mt-5 inline-flex min-h-12 items-center justify-center rounded-full bg-emerald-600 px-6 text-sm font-black text-white transition hover:bg-emerald-700"
          >
            {post.articleCtaLabel ?? "שליחת חנות לבדיקה"}
          </Link>
        </div>
      </div>
    </article>
  );
}
