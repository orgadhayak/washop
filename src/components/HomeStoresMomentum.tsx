import Link from "next/link";
import { BadgeCheck, Clock3, ShieldCheck, TrendingUp } from "lucide-react";
import {
  liveStoresCount,
  manualReviewCount,
  pendingApprovalCount,
} from "@/data/shopStats";

const stats = [
  {
    label: "חנויות פעילות",
    value: liveStoresCount,
    icon: BadgeCheck,
  },
  {
    label: "ממתינות לאישור",
    value: pendingApprovalCount,
    icon: Clock3,
  },
  {
    label: "בדיקה ידנית ויסודית",
    value: manualReviewCount,
    icon: ShieldCheck,
  },
];

export function HomeStoresMomentum() {
  return (
    <section className="bg-white py-8 sm:py-10">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl border border-emerald-200 bg-zinc-950 text-white shadow-xl shadow-emerald-950/10">
          <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-400/12 px-4 py-2 text-sm font-black text-emerald-200 ring-1 ring-emerald-300/25">
                <TrendingUp className="size-4" aria-hidden="true" />
                וואשופ מתרחב בזהירות
              </div>
              <h2 className="mt-5 max-w-2xl text-3xl font-black leading-tight sm:text-4xl">
                וואשופ כבר באוויר ועוד חנויות בדרך
              </h2>
              <p className="mt-4 max-w-3xl text-lg leading-9 text-zinc-200">
                כרגע יש באתר {liveStoresCount} חנויות פעילות, ועוד{" "}
                {pendingApprovalCount} חנויות ממתינות לאישור והשלמת בדיקה לפני
                עלייה לאתר.
              </p>
              <p className="mt-3 max-w-3xl leading-8 text-zinc-300">
                צוות וואשופ בודק כל חנות ידנית ובוחן התאמה, אמינות, רצינות
                ואיכות לפני פרסום. חנויות חדשות עולות בהדרגה לאחר בדיקה
                ואישור.
              </p>
              <div className="mt-6 flex flex-col gap-3 text-sm font-bold text-zinc-300 sm:flex-row sm:items-center sm:justify-between">
                <span>אנחנו מקפידים על סטנדרט גבוה. לא כל חנות נכנסת לוואשופ.</span>
                <span className="text-emerald-200">
                  המספרים מתעדכנים בהתאם למצב הבדיקות באתר.
                </span>
              </div>
            </div>

            <div className="grid gap-3 bg-white/5 p-4 sm:grid-cols-3 lg:grid-cols-1 lg:p-6">
              {stats.map(({ label, value, icon: Icon }) => (
                <div
                  key={label}
                  className="rounded-xl border border-white/10 bg-white px-5 py-4 text-zinc-950 shadow-sm"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="grid size-11 place-items-center rounded-lg bg-emerald-50 text-emerald-700">
                      <Icon className="size-6" aria-hidden="true" />
                    </span>
                    <span className="text-4xl font-black">{value}</span>
                  </div>
                  <p className="mt-4 text-sm font-black text-zinc-950">{label}</p>
                </div>
              ))}
              <Link
                href="/shops"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-emerald-500 px-6 text-sm font-black text-zinc-950 transition hover:bg-emerald-400 sm:col-span-3 lg:col-span-1"
              >
                צפייה בחנויות הפעילות
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
