import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionHeader } from "@/components/SectionHeader";
import { ShopCard } from "@/components/ShopCard";
import { categories, getCategoryBySlug } from "@/data/categories";
import { getShopsByCategory } from "@/data/shops";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return {};
  }

  return {
    title: `${category.name} | חנויות וואטסאפ`,
    description: category.description,
    alternates: {
      canonical: `/category/${category.slug}`,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const shops = getShopsByCategory(category.slug);

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="קטגוריה"
          title={category.name}
          description={category.description}
        />
        <div className="mt-10">
          {shops.length ? (
            <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
              {shops.map((shop) => (
                <ShopCard key={shop.id} shop={shop} />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-emerald-300 bg-white p-8 text-center shadow-sm">
              <h2 className="text-2xl font-black text-zinc-950">
                עדיין אין חנויות בקטגוריה הזו. יש לכם חנות וואטסאפ מתאימה? שלחו אותה לבדיקה.
              </h2>
              <p className="mt-3 text-zinc-600">
                וואשופ בודקת חנויות ידנית כדי לשמור על קטלוגים איכותיים וברורים.
              </p>
              <Link
                href="/add-store"
                className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-emerald-600 px-5 text-sm font-black text-white transition hover:bg-emerald-700"
              >
                הוספת חנות
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
