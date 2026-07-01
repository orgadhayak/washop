import type { Metadata } from "next";
import { ShopsDirectory } from "@/components/ShopsDirectory";
import { ShopsStatusBanner } from "@/components/ShopsStatusBanner";
import { SectionHeader } from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "כל חנויות הוואטסאפ",
  description:
    "גלו חנויות וואטסאפ בישראל לפי שם, עיר, קטגוריה ומוצרים.",
  alternates: {
    canonical: "/shops",
  },
};

type ShopsPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function readParam(
  params: Record<string, string | string[] | undefined> | undefined,
  key: string,
) {
  const value = params?.[key];
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

export default async function ShopsPage({ searchParams }: ShopsPageProps) {
  const params = await searchParams;
  const initialQuery = readParam(params, "q");
  const initialCategory = readParam(params, "category");
  const initialCity = readParam(params, "city");

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="ספריית חנויות"
          title="כל חנויות הוואטסאפ בישראל"
          description="חפשו חנות, עיר או קטגוריה ומצאו עסקים ישראליים שמוכרים ישירות דרך קטלוג וואטסאפ או הודעות."
        />
        <div className="mt-8">
          <ShopsStatusBanner />
        </div>
        <div className="mt-10">
          <ShopsDirectory
            initialQuery={initialQuery}
            initialCategory={initialCategory}
            initialCity={initialCity}
          />
        </div>
      </div>
    </div>
  );
}
