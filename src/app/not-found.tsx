import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-20 text-center">
      <div className="mx-auto max-w-xl px-4">
        <p className="text-sm font-black text-emerald-700">404</p>
        <h1 className="mt-2 text-4xl font-black text-zinc-950">העמוד לא נמצא</h1>
        <p className="mt-4 text-lg leading-8 text-zinc-600">
          יכול להיות שהקישור השתנה או שהחנות עדיין לא פורסמה באתר.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-emerald-600 px-6 text-sm font-black text-white transition hover:bg-emerald-700"
        >
          חזרה לעמוד הבית
        </Link>
      </div>
    </div>
  );
}
