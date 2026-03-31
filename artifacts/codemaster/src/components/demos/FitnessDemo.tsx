import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PreviewShell, DemoFooterCTA, DemoBenefits } from "./PreviewShell";
import { Calendar, Users, Flame, TrendingUp, CheckCircle2, Dumbbell, Bell, BarChart3, UserPlus, CreditCard, Activity } from "lucide-react";

const C = { navy: "#1B2A4A", dark: "#0F1B30", neon: "#39FF14", white: "#FFFFFF", gray: "#94A3B8", light: "#F1F5F9", green: "#22C55E", red: "#EF4444", amber: "#F59E0B", blue: "#3B82F6", violet: "#8B5CF6", card: "#F8FAFC" };

const weekSchedule: Record<string, { time: string; name: string; trainer: string; cap: string; color: string }[]> = {
  Pon: [
    { time: "07:00", name: "CrossFit", trainer: "Marek K.", cap: "16/20", color: C.red },
    { time: "09:00", name: "Yoga", trainer: "Anna W.", cap: "12/15", color: C.green },
    { time: "12:00", name: "Pilates", trainer: "Ewa D.", cap: "8/15", color: C.blue },
    { time: "17:00", name: "Boxing", trainer: "Marek K.", cap: "18/20", color: C.red },
    { time: "18:30", name: "Spinning", trainer: "Kasia L.", cap: "28/30", color: C.violet },
    { time: "20:00", name: "Stretching", trainer: "Anna W.", cap: "6/20", color: C.green },
  ],
  Wt: [
    { time: "07:00", name: "HIIT", trainer: "Tomasz P.", cap: "23/25", color: C.amber },
    { time: "10:00", name: "Yoga", trainer: "Anna W.", cap: "10/15", color: C.green },
    { time: "17:00", name: "CrossFit", trainer: "Marek K.", cap: "14/20", color: C.red },
    { time: "19:00", name: "Tabata", trainer: "Kasia L.", cap: "20/25", color: C.amber },
  ],
  Śr: [
    { time: "07:00", name: "CrossFit", trainer: "Marek K.", cap: "18/20", color: C.red },
    { time: "09:00", name: "Pilates", trainer: "Ewa D.", cap: "10/15", color: C.blue },
    { time: "12:00", name: "Yoga", trainer: "Anna W.", cap: "9/15", color: C.green },
    { time: "17:30", name: "Boxing", trainer: "Marek K.", cap: "17/20", color: C.red },
    { time: "19:00", name: "Spinning", trainer: "Kasia L.", cap: "26/30", color: C.violet },
  ],
  Czw: [
    { time: "07:00", name: "HIIT", trainer: "Tomasz P.", cap: "22/25", color: C.amber },
    { time: "10:00", name: "Stretching", trainer: "Anna W.", cap: "5/20", color: C.green },
    { time: "17:00", name: "CrossFit", trainer: "Marek K.", cap: "19/20", color: C.red },
    { time: "18:30", name: "Tabata", trainer: "Kasia L.", cap: "18/25", color: C.amber },
  ],
  Pt: [
    { time: "07:00", name: "CrossFit", trainer: "Marek K.", cap: "15/20", color: C.red },
    { time: "09:00", name: "Yoga", trainer: "Anna W.", cap: "14/15", color: C.green },
    { time: "12:00", name: "Pilates", trainer: "Ewa D.", cap: "7/15", color: C.blue },
    { time: "17:00", name: "Spinning", trainer: "Kasia L.", cap: "30/30", color: C.violet },
    { time: "19:00", name: "Boxing", trainer: "Marek K.", cap: "16/20", color: C.red },
  ],
  Sob: [
    { time: "09:00", name: "CrossFit", trainer: "Marek K.", cap: "12/20", color: C.red },
    { time: "11:00", name: "Yoga", trainer: "Anna W.", cap: "11/15", color: C.green },
  ],
  Nd: [
    { time: "10:00", name: "Stretching", trainer: "Anna W.", cap: "4/20", color: C.green },
  ],
};

const members = [
  { name: "Anna Kowalska", plan: "Premium", joined: "sty 2024", status: "active", visits: 142 },
  { name: "Marek Wiśniewski", plan: "VIP", joined: "mar 2023", status: "active", visits: 286 },
  { name: "Ewa Dąbrowska", plan: "Basic", joined: "lut 2026", status: "active", visits: 18 },
  { name: "Jan Nowak", plan: "Premium", joined: "lis 2024", status: "active", visits: 94 },
  { name: "Kasia Zielińska", plan: "VIP", joined: "kwi 2023", status: "frozen", visits: 210 },
  { name: "Piotr Maj", plan: "Basic", joined: "mar 2026", status: "active", visits: 6 },
  { name: "Tomasz Lis", plan: "Premium", joined: "wrz 2024", status: "active", visits: 112 },
];

const memberships = [
  { name: "Basic", price: 99, features: ["Siłownia 6:00-22:00", "Szatnia i prysznice", "1 trening intro"], color: C.green },
  { name: "Premium", price: 179, features: ["Dostęp 24/7", "Zajęcia grupowe", "Sauna i jacuzzi", "Plan treningowy", "Analiza składu ciała"], color: C.neon, popular: true },
  { name: "VIP", price: 299, features: ["Wszystko z Premium", "4 sesje trener/mies.", "Dietetyk", "Strefa VIP", "Priorytet rezerwacji"], color: C.violet },
];

const checkins = [
  { name: "Anna K.", time: "10:42", type: "Premium", action: "Wejście" },
  { name: "Marek W.", time: "10:38", type: "VIP", action: "CrossFit" },
  { name: "Ewa D.", time: "10:35", type: "Basic", action: "Wejście" },
  { name: "Jan N.", time: "10:22", type: "Premium", action: "Yoga" },
  { name: "Kasia Z.", time: "10:15", type: "VIP", action: "Wejście" },
  { name: "Piotr M.", time: "10:08", type: "Basic", action: "Wejście" },
];

const topTabs = [
  { id: "dashboard", label: "Panel", icon: <BarChart3 className="w-3.5 h-3.5" /> },
  { id: "members", label: "Członkowie", icon: <Users className="w-3.5 h-3.5" /> },
  { id: "schedule", label: "Grafik", icon: <Calendar className="w-3.5 h-3.5" /> },
  { id: "plans", label: "Karnety", icon: <CreditCard className="w-3.5 h-3.5" /> },
  { id: "report", label: "Raport", icon: <TrendingUp className="w-3.5 h-3.5" /> },
];

type FitnessPage = "dashboard" | "members" | "schedule" | "plans" | "report";

export function FitnessDemo({ name }: { name: string; features: string[] }) {
  const [page, setPage] = useState<FitnessPage>("dashboard");

  return (
    <PreviewShell title={name}>
      <div style={{ background: C.light, minHeight: 560 }}>
        <div className="flex items-center justify-between px-4 py-2.5" style={{ background: C.navy }}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: C.neon }}>
              <Dumbbell className="w-4 h-4" style={{ color: C.navy }} />
            </div>
            <div>
              <h1 className="font-bold text-sm text-white">Iron<span style={{ color: C.neon }}>FIT</span></h1>
              <p className="text-[8px]" style={{ color: C.gray }}>Zarządzanie siłownią</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Bell className="w-4 h-4" style={{ color: C.gray }} />
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full flex items-center justify-center text-[7px] font-bold" style={{ background: C.neon, color: C.navy }}>4</div>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-bold text-white" style={{ background: C.blue }}>AM</div>
              <span className="text-[9px] text-white hidden sm:block">Admin</span>
            </div>
          </div>
        </div>

        <div className="flex gap-0.5 px-3 py-1.5 overflow-x-auto" style={{ background: C.dark }}>
          {topTabs.map(t => (
            <button key={t.id} onClick={() => setPage(t.id)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-[10px] font-semibold whitespace-nowrap"
              style={page === t.id ? { background: C.neon, color: C.navy } : { color: C.gray }}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={page} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            {page === "dashboard" && <DashboardPage />}
            {page === "members" && <MembersPage />}
            {page === "schedule" && <SchedulePage />}
            {page === "plans" && <PlansPage />}
            {page === "report" && <ReportPage />}
          </motion.div>
        </AnimatePresence>
      </div>
      <DemoBenefits accentColor={C.green} bgColor={C.light} textColor={C.navy} benefits={[
        { icon: "💪", title: "Nowoczesny sprzęt", desc: "Technogym, Life Fitness, Rogue" },
        { icon: "📱", title: "Aplikacja mobilna", desc: "Grafik, rezerwacje, postępy" },
        { icon: "🧖", title: "Strefa wellness", desc: "Sauny, jacuzzi, strefa relaksu" },
        { icon: "🥗", title: "Plan żywieniowy", desc: "Dietetyk i analiza składu ciała" },
      ]} />
      <DemoFooterCTA accentColor={C.green} bgColor={C.navy} />
    </PreviewShell>
  );
}

function DashboardPage() {
  return (
    <div className="p-3 space-y-3">
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: "Aktywnych", value: "248", icon: <Users className="w-4 h-4" />, color: C.green, change: "+12" },
          { label: "Nowych (marzec)", value: "18", icon: <UserPlus className="w-4 h-4" />, color: C.blue, change: "+5" },
          { label: "Przychód", value: "44.5K", icon: <CreditCard className="w-4 h-4" />, color: C.neon, change: "+8%" },
          { label: "Check-in dziś", value: "86", icon: <Activity className="w-4 h-4" />, color: C.amber, change: "+14" },
        ].map((s, i) => (
          <div key={i} className="p-2 rounded-xl" style={{ background: C.white }}>
            <div className="mb-1" style={{ color: s.color }}>{s.icon}</div>
            <span className="font-bold text-sm block" style={{ color: C.navy }}>{s.value}</span>
            <span className="text-[8px]" style={{ color: C.gray }}>{s.label}</span>
            <span className="text-[8px] font-bold block" style={{ color: C.green }}>{s.change}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <div className="flex-1 rounded-xl overflow-hidden" style={{ background: C.white }}>
          <div className="px-3 py-2 flex items-center justify-between border-b" style={{ borderColor: C.light }}>
            <span className="text-[10px] font-bold" style={{ color: C.navy }}>Grafik tygodniowy (dziś: Pon)</span>
          </div>
          <div className="p-2 overflow-x-auto">
            <div className="flex gap-1" style={{ minWidth: 500 }}>
              {Object.entries(weekSchedule).slice(0, 5).map(([day, classes]) => (
                <div key={day} className="flex-1 min-w-0">
                  <div className="text-[9px] font-bold text-center py-1 rounded-t" style={{ background: day === "Pon" ? C.navy : C.light, color: day === "Pon" ? C.neon : C.gray }}>{day}</div>
                  <div className="space-y-0.5 mt-0.5">
                    {classes.slice(0, 4).map((c, j) => (
                      <div key={j} className="px-1 py-1 rounded text-center" style={{ background: c.color + "12", borderLeft: `2px solid ${c.color}` }}>
                        <span className="text-[7px] font-bold block" style={{ color: C.navy }}>{c.name}</span>
                        <span className="text-[6px]" style={{ color: C.gray }}>{c.time}</span>
                      </div>
                    ))}
                    {classes.length > 4 && <span className="text-[7px] text-center block" style={{ color: C.gray }}>+{classes.length - 4} więcej</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-[140px] shrink-0 rounded-xl" style={{ background: C.white }}>
          <div className="px-2 py-2 border-b" style={{ borderColor: C.light }}>
            <span className="text-[10px] font-bold" style={{ color: C.navy }}>Check-iny</span>
          </div>
          <div className="p-1.5 space-y-1">
            {checkins.slice(0, 5).map((c, i) => (
              <div key={i} className="flex items-center gap-1.5 px-1.5 py-1 rounded" style={{ background: C.light }}>
                <div className="w-5 h-5 rounded-full flex items-center justify-center text-[7px] font-bold text-white" style={{ background: c.type === "VIP" ? C.violet : c.type === "Premium" ? C.green : C.gray }}>{c.name.split(" ").map(n => n[0]).join("")}</div>
                <div className="flex-1 min-w-0">
                  <span className="text-[8px] font-semibold block truncate" style={{ color: C.navy }}>{c.name}</span>
                  <span className="text-[7px]" style={{ color: C.gray }}>{c.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-3 rounded-xl" style={{ background: C.white }}>
        <span className="text-[10px] font-bold" style={{ color: C.navy }}>Frekwencja — ostatnie 7 dni</span>
        <div className="flex items-end gap-2 mt-2 h-16">
          {[{ d: "Pon", v: 86 }, { d: "Wt", v: 72 }, { d: "Śr", v: 95 }, { d: "Czw", v: 68 }, { d: "Pt", v: 82 }, { d: "Sob", v: 45 }, { d: "Nd", v: 22 }].map((day, i) => (
            <div key={i} className="flex-1 text-center">
              <motion.div initial={{ height: 0 }} animate={{ height: `${(day.v / 95) * 100}%` }} transition={{ delay: i * 0.05 }}
                className="rounded-t mx-auto" style={{ width: "80%", background: i === 0 ? C.neon : C.neon + "40" }} />
              <span className="text-[7px] mt-0.5 block" style={{ color: C.gray }}>{day.d}</span>
              <span className="text-[7px] font-bold" style={{ color: C.navy }}>{day.v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MembersPage() {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? members : members.filter(m => m.plan.toLowerCase() === filter);
  const planColor = (p: string) => p === "VIP" ? C.violet : p === "Premium" ? C.green : C.gray;

  return (
    <div className="p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold" style={{ color: C.navy }}>Członkowie ({members.length})</span>
        <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-bold" style={{ background: C.neon, color: C.navy }}>
          <UserPlus className="w-3 h-3" /> Dodaj
        </button>
      </div>
      <div className="flex gap-1 overflow-x-auto">
        {["all", "Basic", "Premium", "VIP"].map(f => (
          <button key={f} onClick={() => setFilter(f === "all" ? "all" : f.toLowerCase())}
            className="px-2.5 py-1 rounded-full text-[10px] font-semibold whitespace-nowrap"
            style={(filter === "all" && f === "all") || filter === f.toLowerCase() ? { background: C.navy, color: C.white } : { background: C.white, color: C.gray }}>{f === "all" ? "Wszyscy" : f}</button>
        ))}
      </div>
      <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${C.gray}20` }}>
        <table className="w-full text-[10px]">
          <thead>
            <tr style={{ background: C.navy }}>
              <th className="px-2 py-2 text-left text-white font-semibold">Członek</th>
              <th className="px-2 py-2 text-center text-white font-semibold">Karnet</th>
              <th className="px-2 py-2 text-center text-white font-semibold">Wizyty</th>
              <th className="px-2 py-2 text-center text-white font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((m, i) => (
              <tr key={i} className="border-t" style={{ borderColor: C.light, background: C.white }}>
                <td className="px-2 py-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-[8px] font-bold text-white" style={{ background: planColor(m.plan) }}>{m.name.split(" ").map(n => n[0]).join("")}</div>
                    <div>
                      <span className="font-semibold" style={{ color: C.navy }}>{m.name}</span>
                      <span className="block text-[8px]" style={{ color: C.gray }}>od {m.joined}</span>
                    </div>
                  </div>
                </td>
                <td className="px-2 py-2 text-center">
                  <span className="px-1.5 py-0.5 rounded-full text-[8px] font-bold" style={{ background: planColor(m.plan) + "15", color: planColor(m.plan) }}>{m.plan}</span>
                </td>
                <td className="px-2 py-2 text-center font-bold" style={{ color: C.navy }}>{m.visits}</td>
                <td className="px-2 py-2 text-center">
                  <span className="px-1.5 py-0.5 rounded-full text-[8px] font-bold"
                    style={m.status === "active" ? { background: C.green + "15", color: C.green } : { background: C.amber + "15", color: C.amber }}>
                    {m.status === "active" ? "Aktywny" : "Zawieszony"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SchedulePage() {
  const [selDay, setSelDay] = useState("Pon");
  const days = Object.keys(weekSchedule);
  const classes = weekSchedule[selDay] || [];

  return (
    <div className="p-3 space-y-2">
      <span className="text-xs font-bold" style={{ color: C.navy }}>Grafik zajęć — tygodniowy</span>
      <div className="flex gap-1">
        {days.map(d => (
          <button key={d} onClick={() => setSelDay(d)} className="flex-1 py-2 rounded-lg text-[10px] font-semibold"
            style={selDay === d ? { background: C.neon, color: C.navy } : { background: C.white, color: C.gray }}>{d}</button>
        ))}
      </div>

      <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${C.gray}20` }}>
        <div className="grid grid-cols-5 text-[8px] font-bold uppercase px-2.5 py-1.5" style={{ background: C.navy, color: C.white }}>
          <span>Godzina</span><span>Zajęcia</span><span>Trener</span><span>Dostępność</span><span></span>
        </div>
        {classes.map((c, i) => {
          const [taken, total] = c.cap.split("/").map(Number);
          const almostFull = total - taken <= 3;
          return (
            <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
              className="grid grid-cols-5 items-center px-2.5 py-2 border-t" style={{ borderColor: C.light, background: C.white }}>
              <span className="text-[11px] font-bold" style={{ color: C.navy }}>{c.time}</span>
              <span className="flex items-center gap-1">
                <div className="w-1.5 h-5 rounded-full" style={{ background: c.color }} />
                <span className="text-[10px] font-semibold" style={{ color: C.navy }}>{c.name}</span>
              </span>
              <span className="text-[10px]" style={{ color: C.gray }}>{c.trainer}</span>
              <span className="text-[10px] font-bold" style={{ color: almostFull ? C.red : C.green }}>{c.cap}</span>
              <button className="px-2 py-1 rounded text-[9px] font-bold text-white" style={{ background: almostFull && taken === total ? C.gray : C.green }}>
                {taken === total ? "Pełne" : "Zapisz"}
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function PlansPage() {
  return (
    <div className="p-3 space-y-3">
      <span className="text-xs font-bold" style={{ color: C.navy }}>Karnety i cennik</span>
      <div className="grid grid-cols-3 gap-2">
        {memberships.map((m, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="p-3 rounded-xl relative" style={{ background: C.white, border: m.popular ? `2px solid ${C.neon}` : `1px solid ${C.light}` }}>
            {m.popular && <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[7px] font-bold whitespace-nowrap" style={{ background: C.neon, color: C.navy }}>Najczęściej wybierany</div>}
            <h4 className="font-bold text-sm text-center" style={{ color: C.navy }}>{m.name}</h4>
            <div className="text-center mt-1">
              <span className="font-bold text-xl" style={{ color: m.color === C.neon ? C.green : m.color }}>{m.price}</span>
              <span className="text-[9px]" style={{ color: C.gray }}> zł/mies.</span>
            </div>
            <div className="mt-2 space-y-1">
              {m.features.map((f, j) => (
                <div key={j} className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 shrink-0" style={{ color: C.green }} />
                  <span className="text-[9px]" style={{ color: C.navy }}>{f}</span>
                </div>
              ))}
            </div>
            <button className="w-full mt-3 py-2 rounded-lg text-[10px] font-bold"
              style={m.popular ? { background: C.neon, color: C.navy } : { background: C.navy, color: C.white }}>Wybierz</button>
          </motion.div>
        ))}
      </div>
      <div className="p-3 rounded-xl" style={{ background: C.navy }}>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-white">Aktywne karnety</span>
            <div className="flex gap-3 mt-1">
              <span className="text-[9px]" style={{ color: C.gray }}>Basic: <strong className="text-white">42</strong></span>
              <span className="text-[9px]" style={{ color: C.gray }}>Premium: <strong className="text-white">148</strong></span>
              <span className="text-[9px]" style={{ color: C.gray }}>VIP: <strong className="text-white">58</strong></span>
            </div>
          </div>
          <div className="text-right">
            <span className="font-bold text-lg" style={{ color: C.neon }}>44 520 zł</span>
            <span className="text-[8px] block" style={{ color: C.gray }}>MRR</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReportPage() {
  const monthlyRevenue = [
    { m: "Paź", v: 38200 }, { m: "Lis", v: 40100 }, { m: "Gru", v: 42800 },
    { m: "Sty", v: 39500 }, { m: "Lut", v: 41200 }, { m: "Mar", v: 44520 },
  ];
  const maxR = Math.max(...monthlyRevenue.map(r => r.v));

  return (
    <div className="p-3 space-y-3">
      <span className="text-xs font-bold" style={{ color: C.navy }}>Raport — Marzec 2026</span>
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Nowi członkowie", value: "18", color: C.blue },
          { label: "Rezygnacje", value: "3", color: C.red },
          { label: "Retencja", value: "96.8%", color: C.green },
        ].map((s, i) => (
          <div key={i} className="p-2.5 rounded-xl text-center" style={{ background: C.white }}>
            <span className="font-bold text-base block" style={{ color: s.color }}>{s.value}</span>
            <span className="text-[8px]" style={{ color: C.gray }}>{s.label}</span>
          </div>
        ))}
      </div>
      <div className="p-3 rounded-xl" style={{ background: C.white }}>
        <span className="text-[10px] font-bold" style={{ color: C.navy }}>Przychód miesięczny (6 mies.)</span>
        <div className="flex items-end gap-2 mt-3 h-20">
          {monthlyRevenue.map((r, i) => (
            <div key={i} className="flex-1 text-center">
              <span className="text-[7px] font-bold" style={{ color: C.navy }}>{(r.v / 1000).toFixed(1)}k</span>
              <motion.div initial={{ height: 0 }} animate={{ height: `${(r.v / maxR) * 100}%` }} transition={{ delay: i * 0.06 }}
                className="rounded-t mx-auto mt-0.5" style={{ width: "80%", background: i === monthlyRevenue.length - 1 ? C.neon : C.neon + "30" }} />
              <span className="text-[7px] mt-0.5 block" style={{ color: C.gray }}>{r.m}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="p-3 rounded-xl" style={{ background: C.white }}>
        <span className="text-[10px] font-bold" style={{ color: C.navy }}>Popularne zajęcia</span>
        {[
          { name: "CrossFit", count: 245, pct: 100 },
          { name: "Spinning", count: 198, pct: 81 },
          { name: "Yoga", count: 156, pct: 64 },
          { name: "HIIT", count: 134, pct: 55 },
          { name: "Boxing", count: 112, pct: 46 },
        ].map((c, i) => (
          <div key={i} className="flex items-center gap-2 mt-1.5">
            <span className="text-[10px] w-16" style={{ color: C.navy }}>{c.name}</span>
            <div className="flex-1 h-1.5 rounded-full" style={{ background: C.light }}>
              <div className="h-full rounded-full" style={{ width: `${c.pct}%`, background: C.neon }} />
            </div>
            <span className="text-[9px] font-bold w-8 text-right" style={{ color: C.navy }}>{c.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
