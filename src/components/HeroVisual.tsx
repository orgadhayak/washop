import { BadgeCheck, MessageCircle, Search, ShoppingBag, Store } from "lucide-react";

export function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-md py-6" aria-hidden="true">
      <div className="absolute inset-x-8 top-14 h-56 rounded-full bg-emerald-200/55 blur-3xl" />
      <div className="relative mx-auto w-64 rotate-[-3deg] rounded-[2rem] border-[10px] border-zinc-950 bg-zinc-950 p-2 shadow-2xl shadow-emerald-950/20 sm:w-72">
        <div className="overflow-hidden rounded-[1.35rem] bg-white">
          <div className="bg-gradient-to-l from-emerald-600 to-emerald-500 px-4 py-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="grid size-9 place-items-center rounded-full bg-white/18">
                  <Store className="size-5" />
                </span>
                <div>
                  <p className="text-sm font-black">וואשופ</p>
                  <p className="text-xs text-emerald-50">קטלוגים פעילים</p>
                </div>
              </div>
              <Search className="size-5" />
            </div>
          </div>

          <div className="space-y-3 p-4">
            {[
              ["חנות טכנולוגיה", "קטלוג וואטסאפ", "bg-emerald-50"],
              ["מספרה וקורסים", "פנייה ישירה", "bg-cyan-50"],
              ["מתנות ואירועים", "נבדק ידנית", "bg-amber-50"],
            ].map(([title, subtitle, color]) => (
              <div
                key={title}
                className={`flex items-center gap-3 rounded-lg ${color} p-3`}
              >
                <span className="grid size-10 place-items-center rounded-lg bg-white text-emerald-700 shadow-sm">
                  <ShoppingBag className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-black text-zinc-950">{title}</p>
                  <p className="truncate text-xs text-zinc-600">{subtitle}</p>
                </div>
                <BadgeCheck className="size-5 text-emerald-600" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute right-0 top-4 hidden max-w-44 rotate-3 rounded-lg bg-white p-3 text-sm font-bold text-zinc-800 shadow-xl shadow-emerald-950/10 sm:block">
        <div className="mb-2 flex items-center gap-2 text-emerald-700">
          <MessageCircle className="size-4" />
          הודעה מהירה
        </div>
        יש משלוחים לכל הארץ?
      </div>

      <div className="absolute bottom-8 left-0 hidden max-w-40 rotate-[-4deg] rounded-lg bg-zinc-950 p-3 text-sm font-bold text-white shadow-xl sm:block">
        נבדק ידנית על ידי וואשופ
      </div>
    </div>
  );
}
