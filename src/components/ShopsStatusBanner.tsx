import { Clock3, ShieldCheck, Store } from "lucide-react";
import {
  liveStoresCount,
  manualReviewCount,
  pendingApprovalCount,
} from "@/data/shopStats";

const stats = [
  {
    label: "חנויות פעילות",
    value: liveStoresCount,
    icon: Store,
  },
  {
    label: "ממתינות לאישור",
    value: pendingApprovalCount,
    icon: Clock3,
  },
  {
    label: "בדיקה ידנית",
    value: manualReviewCount,
    icon: ShieldCheck,
  },
];

export function ShopsStatusBanner() {
  return (
    <section
      className="rounded-xl border border-emerald-200 bg-gradient-to-br from-white via-emerald-50/70 to-white p-4 shadow-sm shadow-emerald-950/5"
      aria-labelledby="shops-status-title"
    >
      <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="min-w-0">
          <h2
            id="shops-status-title"
            className="text-xl font-black leading-tight text-zinc-950 sm:text-2xl"
          >
            עוד חנויות בדרך
          </h2>
          <p className="mt-1 text-sm font-bold leading-7 text-zinc-600">
            עוד {pendingApprovalCount} חנויות ממתינות לאישור ונבדקות ידנית לפני
            עלייה לאתר.
          </p>
        </div>

        <div className="grid gap-2 sm:grid-cols-3 lg:min-w-[520px]">
          {stats.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-lg border border-emerald-100 bg-white px-3 py-2 shadow-sm"
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-emerald-50 text-emerald-700">
                <Icon className="size-4" aria-hidden="true" />
              </span>
              <div>
                <p className="text-2xl font-black leading-none text-zinc-950">
                  {value}
                </p>
                <p className="mt-1 text-xs font-black text-zinc-600">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
