import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PreviewShell, DemoNav, DemoSection, DemoBenefits, DemoFooterCTA } from "./PreviewShell";
import { Calendar, Clock, Users, Heart, Flame, Award, TrendingUp, CheckCircle2, Zap, Timer, Dumbbell, Trophy, ChevronRight, Home, Star, BarChart3 } from "lucide-react";

const C = { navy: "#0A0A1A", dark: "#121218", neon: "#39FF14", green: "#22C55E", white: "#F8FAFC", gray: "#6B7280", blue: "#3B82F6", red: "#EF4444", amber: "#F59E0B", light: "#F1F5F9", lime: "#84CC16", violet: "#8B5CF6" };

const memberships = [
  { name: "Basic", price: 99, period: "/mies.", features: ["Dostęp do siłowni 6:00-22:00", "Szatnia i prysznice", "1 trening wprowadzający"], color: C.green, popular: false },
  { name: "Premium", price: 179, period: "/mies.", features: ["Dostęp 24/7", "Wszystkie zajęcia grupowe", "Strefa saun i jacuzzi", "Plan treningowy", "Analiza składu ciała"], color: C.neon, popular: true },
  { name: "VIP", price: 299, period: "/mies.", features: ["Wszystko z Premium", "4 sesje z trenerem/mies.", "Dietetyk", "Priorytetowa rezerwacja", "Strefa VIP"], color: C.violet, popular: false },
];

const schedule = [
  { time: "07:00", name: "CrossFit", trainer: "Marek K.", duration: "60 min", level: "Średni", spots: { total: 20, taken: 16 }, color: C.red },
  { time: "08:30", name: "Yoga Flow", trainer: "Anna W.", duration: "75 min", level: "Łatwy", spots: { total: 15, taken: 12 }, color: C.green },
  { time: "10:00", name: "HIIT Cardio", trainer: "Tomasz P.", duration: "45 min", level: "Trudny", spots: { total: 25, taken: 23 }, color: C.amber },
  { time: "12:00", name: "Pilates", trainer: "Ewa D.", duration: "60 min", level: "Łatwy", spots: { total: 15, taken: 8 }, color: C.blue },
  { time: "17:00", name: "Boxing", trainer: "Marek K.", duration: "60 min", level: "Trudny", spots: { total: 20, taken: 18 }, color: C.red },
  { time: "18:30", name: "Spinning", trainer: "Kasia L.", duration: "45 min", level: "Średni", spots: { total: 30, taken: 28 }, color: C.violet },
  { time: "20:00", name: "Stretching", trainer: "Anna W.", duration: "45 min", level: "Łatwy", spots: { total: 20, taken: 6 }, color: C.green },
];

const achievements = [
  { icon: "🔥", title: "Seria 30 dni", unlocked: true },
  { icon: "💪", title: "100 treningów", unlocked: true },
  { icon: "⚡", title: "Mistrz cardio", unlocked: true },
  { icon: "🏆", title: "Cel miesiąca", unlocked: false },
  { icon: "👑", title: "Top 10%", unlocked: false },
];

export function FitnessDemo({ name }: { name: string; features: string[] }) {
  const [page, setPage] = useState("home");
  const tabs = [
    { id: "home", label: "Klub", icon: <Home className="w-3 h-3" /> },
    { id: "plans", label: "Karnety", icon: <Zap className="w-3 h-3" /> },
    { id: "schedule", label: "Grafik", icon: <Calendar className="w-3 h-3" /> },
    { id: "progress", label: "Postępy", icon: <TrendingUp className="w-3 h-3" /> },
    { id: "reception", label: "Recepcja", icon: <Users className="w-3 h-3" /> },
  ];

  return (
    <PreviewShell title={name}>
      <DemoNav tabs={tabs} activeTab={page} onTabChange={setPage} logo="IronFit" />
      <AnimatePresence mode="wait">
        <motion.div key={page} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
          {page === "home" && <HomePage onNav={setPage} />}
          {page === "plans" && <PlansPage />}
          {page === "schedule" && <SchedulePage />}
          {page === "progress" && <ProgressPage />}
          {page === "reception" && <ReceptionPage />}
        </motion.div>
      </AnimatePresence>
    </PreviewShell>
  );
}

function HomePage({ onNav }: { onNav: (p: string) => void }) {
  return (
    <div>
      <div className="p-8 pb-10" style={{ background: `linear-gradient(160deg, ${C.navy}, ${C.dark})` }}>
        <p className="text-[10px] tracking-[0.4em] uppercase" style={{ color: C.neon }}>Fitness & Gym</p>
        <h1 className="font-display font-bold text-3xl mt-1 text-white">Iron<span style={{ color: C.neon }}>Fit</span></h1>
        <p className="text-xs mt-2 text-white/70 max-w-[280px] leading-relaxed">Nowoczesny klub fitness. Siłownia, zajęcia grupowe, sauny, trenerzy — Twoja droga do formy zaczyna się tu.</p>
        <div className="flex gap-3 mt-5">
          <motion.button whileHover={{ scale: 1.03 }} onClick={() => onNav("plans")}
            className="px-6 py-3 rounded-lg font-bold text-sm shadow-lg text-black" style={{ background: C.neon }}>Kup karnet</motion.button>
          <button onClick={() => onNav("schedule")} className="px-6 py-3 rounded-lg font-semibold text-sm border border-white/20 text-white">Grafik zajęć</button>
        </div>
        <div className="grid grid-cols-4 gap-2 mt-6">
          {[{ v: "24/7", l: "Dostęp" }, { v: "30+", l: "Zajęć/tyg." }, { v: "8", l: "Trenerów" }, { v: "4.9", l: "Ocena" }].map((s, i) => (
            <div key={i} className="p-2 rounded-lg text-center" style={{ background: "rgba(255,255,255,0.06)" }}>
              <span className="font-bold text-sm text-white block">{s.v}</span>
              <span className="text-[7px] text-white/40">{s.l}</span>
            </div>
          ))}
        </div>
      </div>

      <DemoSection>
        <div className="p-4 rounded-xl" style={{ background: `${C.neon}08`, border: `1px solid ${C.neon}15` }}>
          <div className="flex items-center gap-2 mb-2">
            <Flame className="w-4 h-4" style={{ color: C.neon.replace("39FF14", "22C55E") }} />
            <span className="text-xs font-bold" style={{ color: C.navy }}>Twój dashboard</span>
            <span className="ml-auto px-2 py-0.5 rounded-full text-[8px] font-bold" style={{ background: C.neon + "20", color: C.neon.replace("39FF14", "15803D") }}>Premium</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[{ v: "142", l: "Treningi" }, { v: "32", l: "Seria dni" }, { v: "68%", l: "Cel mies." }].map((s, i) => (
              <div key={i} className="p-2.5 rounded-lg text-center" style={{ background: C.white }}>
                <span className="font-bold text-sm block" style={{ color: C.navy }}>{s.v}</span>
                <span className="text-[8px]" style={{ color: C.gray }}>{s.l}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mt-2">
          <h3 className="font-bold text-sm" style={{ color: C.navy }}>Najbliższe zajęcia</h3>
          <button onClick={() => onNav("schedule")} className="text-[10px] font-medium flex items-center gap-1" style={{ color: C.neon.replace("39FF14", "15803D") }}>Pełny grafik <ChevronRight className="w-3 h-3" /></button>
        </div>
        {schedule.slice(0, 3).map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
            className="flex items-center gap-3 p-3 rounded-xl border hover:shadow-sm transition-all cursor-pointer" style={{ borderColor: C.light, background: C.white }}>
            <div className="w-1 h-10 rounded-full shrink-0" style={{ background: s.color }} />
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold" style={{ color: C.navy }}>{s.time} — {s.name}</h4>
              <p className="text-[10px]" style={{ color: C.gray }}>{s.trainer} · {s.duration} · {s.level}</p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-[10px] font-bold" style={{ color: s.spots.total - s.spots.taken <= 3 ? C.red : C.green }}>{s.spots.total - s.spots.taken} miejsc</span>
              <motion.button whileHover={{ scale: 1.05 }} className="block mt-1 px-2.5 py-1 rounded text-[9px] font-bold text-white" style={{ background: C.neon.replace("39FF14", "22C55E") }}>Zapisz</motion.button>
            </div>
          </motion.div>
        ))}
      </DemoSection>

      <DemoBenefits accentColor={C.neon.replace("39FF14", "22C55E")} bgColor={C.light} textColor={C.navy} benefits={[
        { icon: "💪", title: "Nowoczesny sprzęt", desc: "Technogym, Life Fitness, Rogue" },
        { icon: "📱", title: "Aplikacja mobilna", desc: "Grafik, rezerwacje, postępy" },
        { icon: "🧖", title: "Strefa wellness", desc: "Sauny, jacuzzi, strefa relaksu" },
        { icon: "🥗", title: "Plan żywieniowy", desc: "Dietetyk i analiza składu ciała" },
      ]} />
      <DemoFooterCTA accentColor={C.neon.replace("39FF14", "22C55E")} bgColor={C.navy} />
    </div>
  );
}

function PlansPage() {
  return (
    <DemoSection>
      <h3 className="font-bold text-sm text-center" style={{ color: C.navy }}>Wybierz karnet</h3>
      <div className="space-y-3">
        {memberships.map((m, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="p-4 rounded-xl border relative" style={{ borderColor: m.popular ? C.neon + "40" : C.light, background: C.white }}>
            {m.popular && <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[8px] font-bold text-black" style={{ background: C.neon }}>Najpopularniejszy</div>}
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-lg" style={{ color: C.navy }}>{m.name}</h4>
              <div><span className="font-bold text-2xl" style={{ color: m.color === C.neon ? C.green : m.color }}>{m.price} zł</span><span className="text-[10px]" style={{ color: C.gray }}>{m.period}</span></div>
            </div>
            <div className="space-y-1.5">
              {m.features.map((f, j) => (
                <div key={j} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: C.green }} />
                  <span className="text-[10px]" style={{ color: C.navy }}>{f}</span>
                </div>
              ))}
            </div>
            <motion.button whileHover={{ scale: 1.02 }}
              className="w-full mt-4 py-2.5 rounded-lg text-xs font-bold" style={m.popular ? { background: C.neon, color: "black" } : { background: C.navy, color: "white" }}>Wybierz {m.name}</motion.button>
          </motion.div>
        ))}
      </div>
    </DemoSection>
  );
}

function SchedulePage() {
  const [day, setDay] = useState(0);
  const days = ["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Nd"];
  return (
    <DemoSection>
      <h3 className="font-bold text-sm" style={{ color: C.navy }}>Grafik zajęć</h3>
      <div className="flex gap-1">
        {days.map((d, i) => (
          <button key={i} onClick={() => setDay(i)} className="flex-1 py-2 rounded-lg text-[10px] font-medium transition-all"
            style={day === i ? { background: C.neon, color: "black" } : { background: C.light, color: C.gray }}>{d}</button>
        ))}
      </div>
      <div className="space-y-2">
        {schedule.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
            className="flex items-center gap-3 p-3 rounded-xl border" style={{ borderColor: C.light, background: C.white }}>
            <div className="w-1.5 h-12 rounded-full shrink-0" style={{ background: s.color }} />
            <div className="w-12 shrink-0 text-center">
              <span className="text-xs font-bold block" style={{ color: C.navy }}>{s.time}</span>
              <span className="text-[9px]" style={{ color: C.gray }}>{s.duration}</span>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold" style={{ color: C.navy }}>{s.name}</h4>
              <p className="text-[10px]" style={{ color: C.gray }}>{s.trainer}</p>
            </div>
            <div className="text-right shrink-0">
              <span className="px-1.5 py-0.5 rounded text-[8px] font-medium" style={{ background: s.level === "Trudny" ? C.red + "15" : s.level === "Średni" ? C.amber + "15" : C.green + "15", color: s.level === "Trudny" ? C.red : s.level === "Średni" ? C.amber : C.green }}>{s.level}</span>
              <p className="text-[9px] mt-0.5" style={{ color: s.spots.total - s.spots.taken <= 3 ? C.red : C.gray }}>{s.spots.total - s.spots.taken}/{s.spots.total}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </DemoSection>
  );
}

function ProgressPage() {
  return (
    <DemoSection>
      <h3 className="font-bold text-sm" style={{ color: C.navy }}>Twoje postępy</h3>
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Treningi (marzec)", val: "18", icon: Dumbbell, color: C.green },
          { label: "Spalone kalorie", val: "12 400", icon: Flame, color: C.red },
          { label: "Seria dni", val: "32", icon: Zap, color: C.amber },
          { label: "Cel miesięczny", val: "68%", icon: TrendingUp, color: C.blue },
        ].map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.08 }}
            className="p-3 rounded-xl border" style={{ borderColor: C.light, background: C.white }}>
            <s.icon className="w-4 h-4 mb-1" style={{ color: s.color }} />
            <span className="font-bold text-lg block" style={{ color: C.navy }}>{s.val}</span>
            <span className="text-[9px]" style={{ color: C.gray }}>{s.label}</span>
          </motion.div>
        ))}
      </div>

      <h4 className="font-bold text-sm mt-2" style={{ color: C.navy }}>Aktywność tygodniowa</h4>
      <div className="p-4 rounded-xl" style={{ background: C.light }}>
        <div className="flex gap-2 items-end justify-center" style={{ height: 80 }}>
          {[{ d: "Pon", v: 450 }, { d: "Wt", v: 0 }, { d: "Śr", v: 620 }, { d: "Czw", v: 380 }, { d: "Pt", v: 550 }, { d: "Sob", v: 0 }, { d: "Nd", v: 0 }].map((day, i) => (
            <div key={i} className="text-center flex-1">
              <motion.div initial={{ height: 0 }} animate={{ height: `${day.v > 0 ? Math.max(day.v / 8, 10) : 4}px` }} transition={{ delay: i * 0.05 }}
                className="rounded-t-lg mx-auto" style={{ width: "100%", background: day.v > 0 ? C.neon : C.gray + "20" }} />
              <span className="text-[8px] mt-1 block" style={{ color: C.gray }}>{day.d}</span>
            </div>
          ))}
        </div>
      </div>

      <h4 className="font-bold text-sm mt-2" style={{ color: C.navy }}>Osiągnięcia</h4>
      <div className="grid grid-cols-5 gap-2">
        {achievements.map((a, i) => (
          <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: a.unlocked ? 1 : 0.35, scale: 1 }} transition={{ delay: i * 0.05 }}
            className="p-2 rounded-xl text-center" style={{ background: a.unlocked ? C.neon + "15" : C.light }}>
            <span className="text-lg block">{a.icon}</span>
            <span className="text-[7px] font-bold block mt-0.5" style={{ color: a.unlocked ? C.navy : C.gray }}>{a.title}</span>
          </motion.div>
        ))}
      </div>
    </DemoSection>
  );
}

function ReceptionPage() {
  return (
    <DemoSection>
      <h3 className="font-bold text-sm" style={{ color: C.navy }}>Panel recepcji</h3>
      <div className="grid grid-cols-4 gap-2">
        {[{ l: "Aktywnych", v: "248", c: C.green }, { l: "Na siłowni", v: "42", c: C.blue }, { l: "Na zajęciach", v: "28", c: C.violet }, { l: "Check-in dziś", v: "86", c: C.amber }].map((s, i) => (
          <div key={i} className="p-2.5 rounded-xl text-center" style={{ background: C.light }}>
            <span className="font-bold text-sm block" style={{ color: s.c }}>{s.v}</span>
            <span className="text-[8px]" style={{ color: C.gray }}>{s.l}</span>
          </div>
        ))}
      </div>
      <h4 className="font-bold text-sm mt-2" style={{ color: C.navy }}>Ostatnie check-iny</h4>
      {[
        { name: "Anna Kowalska", time: "10:42", type: "Premium", action: "Wejście" },
        { name: "Marek Wiśniewski", time: "10:38", type: "VIP", action: "CrossFit 07:00" },
        { name: "Ewa Dąbrowska", time: "10:35", type: "Basic", action: "Wejście" },
        { name: "Jan Nowak", time: "10:22", type: "Premium", action: "Yoga 08:30" },
      ].map((c, i) => (
        <div key={i} className="flex items-center gap-3 p-3 rounded-xl border" style={{ borderColor: C.light, background: C.white }}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white" style={{ background: C.navy }}>{c.name.split(" ").map(n => n[0]).join("")}</div>
          <div className="flex-1">
            <span className="text-xs font-semibold" style={{ color: C.navy }}>{c.name}</span>
            <p className="text-[10px]" style={{ color: C.gray }}>{c.action}</p>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-medium" style={{ color: C.navy }}>{c.time}</span>
            <span className="block px-1.5 py-0.5 rounded text-[8px] font-bold" style={{ background: c.type === "VIP" ? C.violet + "15" : c.type === "Premium" ? C.neon + "15" : C.light, color: c.type === "VIP" ? C.violet : c.type === "Premium" ? C.green : C.gray }}>{c.type}</span>
          </div>
        </div>
      ))}
    </DemoSection>
  );
}
