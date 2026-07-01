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
    <section className="bg-white py-6 sm:py-8">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-white via-emerald-50/70 to-white p-4 shadow-sm shadow-emerald-950/5 sm:p-5">
          <div className="grid gap-5 lg:grid-cols-[1.05fr_1fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-sm font-black text-emerald-800 shadow-sm">
                <TrendingUp className="size-4" aria-hidden="true" />
                וואשופ מתרחב בזהירות
              </div>
              <h2 className="mt-3 max-w-2xl text-2xl font-black leading-tight text-zinc-950 sm:text-3xl">
                וואשופ כבר באוויר ועוד חנויות בדרך
              </h2>
              <p className="mt-3 max-w-3xl text-base font-bold leading-8 text-zinc-700">
                כרגע יש באתר {liveStoresCount} חנויות פעילות, ועוד{" "}
                {pendingApprovalCount} חנויות ממתינות לאישור והשלמת בדיקה לפני
                עלייה לאתר.
              </p>
              <p className="mt-2 max-w-3xl text-sm leading-7 text-zinc-600">
                צוות וואשופ בודק כל חנות ידנית ובוחן התאמה, אמינות, רצינות
                ואיכות לפני פרסום. חנויות חדשות עולות בהדרגה לאחר בדיקה
                ואישור.
              </p>
              <div className="mt-4 flex flex-col gap-1 text-xs font-bold leading-6 text-zinc-600 sm:flex-row sm:items-center sm:gap-4">
                <span>אנחנו מקפידים על סטנדרט גבוה. לא כל חנות נכנסת לוואשופ.</span>
                <span className="text-emerald-700">
                  המספרים מתעדכנים בהתאם למצב הבדיקות באתר.
                </span>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {stats.map(({ label, value, icon: Icon }) => (
                <div
                  key={label}
                  className="rounded-xl border border-emerald-100 bg-white px-4 py-3 text-zinc-950 shadow-sm"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="grid size-9 place-items-center rounded-lg bg-emerald-50 text-emerald-700">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="text-3xl font-black">{value}</span>
                  </div>
                  <p className="mt-3 text-xs font-black text-zinc-700">{label}</p>
                </div>
              ))}
              <Link
                href="/shops"
                className="inline-flex min-h-10 items-center justify-center rounded-full bg-emerald-600 px-5 text-sm font-black text-white transition hover:bg-emerald-700 sm:col-span-3"
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
