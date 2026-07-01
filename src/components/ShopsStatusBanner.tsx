import { Clock3, ShieldCheck, Store } from "lucide-react";
import {
  liveStoresCount,
  manualReviewCount,
  pendingApprovalCount,
} from "@/data/shopStats";

const stats = [
  {
    label: "חנויות פעילות באתר",
    value: liveStoresCount,
    suffix: "חנויות פעילות",
    icon: Store,
  },
  {
    label: "ממתינות לאישור",
    value: pendingApprovalCount,
    suffix: "ממתינות לאישור",
    icon: Clock3,
  },
  {
    label: "בבדיקה ידנית של וואשופ",
    value: manualReviewCount,
    suffix: "בבדיקה ידנית",
    icon: ShieldCheck,
  },
];

export function ShopsStatusBanner() {
  return (
    <section
      className="rounded-xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-white p-5 shadow-sm shadow-emerald-950/5 sm:p-7"
      aria-labelledby="shops-status-title"
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr] lg:items-center">
        <div>
          <p className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-sm font-black text-emerald-800">
            מתעדכן בהדרגה
          </p>
          <h2
            id="shops-status-title"
            className="mt-4 text-3xl font-black leading-tight text-zinc-950 sm:text-4xl"
          >
            עוד חנויות בדרך לוואשופ
          </h2>
          <p className="mt-4 text-lg leading-9 text-zinc-700">
            כרגע יש באתר {liveStoresCount} חנויות פעילות, ועוד{" "}
            {pendingApprovalCount} חנויות ממתינות לאישור והשלמת בדיקה.
          </p>
          <p className="mt-3 leading-8 text-zinc-600">
            צוות וואשופ בודק כל חנות ידנית ובוחן פרטים, התאמה, אמינות ורמת
            רצינות לפני פרסום באתר. חנויות חדשות יעלו בהדרגה לאחר בדיקה
            ואישור.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {stats.map(({ label, value, suffix, icon: Icon }) => (
            <div
              key={label}
              className="rounded-lg border border-emerald-950/10 bg-white p-4 shadow-sm"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="grid size-10 place-items-center rounded-lg bg-emerald-50 text-emerald-700">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span className="text-4xl font-black text-zinc-950">{value}</span>
              </div>
              <p className="mt-4 text-sm font-black text-zinc-950">{label}</p>
              <p className="mt-1 text-sm font-bold text-zinc-500">{suffix}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-2 border-t border-emerald-950/10 pt-4 text-sm font-bold leading-7 text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
        <span>אנחנו מקפידים על סטנדרט גבוה. לא כל חנות נכנסת לוואשופ.</span>
        <span className="text-emerald-700">
          המספרים מתעדכנים בהתאם למצב הבדיקות באתר.
        </span>
      </div>
    </section>
  );
}
