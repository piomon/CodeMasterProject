import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PreviewShell, DemoNav, DemoSection } from "./PreviewShell";
import { Calendar, Clock, Users, Heart, Flame, Award, TrendingUp, CheckCircle2, Zap, Timer, Dumbbell, Trophy } from "lucide-react";

const C = { black: "#0A0A0A", graphite: "#1A1A1A", neon: "#ADFF2F", blue: "#00BFFF", red: "#FF3B30", white: "#F5F5F5", gray: "#666" };

const classes = [
  { name: "CrossFit WOD", time: "06:30", dur: "60 min", trainer: "Mateusz K.", spots: 3, max: 16, level: "Zaawansowany", icon: "🏋️" },
  { name: "Yoga Flow", time: "08:00", dur: "75 min", trainer: "Anna W.", spots: 8, max: 12, level: "Wszystkie", icon: "🧘" },
  { name: "HIIT Cardio", time: "09:30", dur: "45 min", trainer: "Kris P.", spots: 0, max: 20, level: "Średni", icon: "🔥" },
  { name: "Spinning", time: "12:00", dur: "50 min", trainer: "Tomek R.", spots: 5, max: 15, level: "Wszystkie", icon: "🚴" },
  { name: "Boxing", time: "17:00", dur: "60 min", trainer: "Dawid M.", spots: 2, max: 14, level: "Zaawansowany", icon: "🥊" },
  { name: "Stretching", time: "18:30", dur: "45 min", trainer: "Ola S.", spots: 10, max: 12, level: "Początkujący", icon: "🤸" },
  { name: "Functional Training", time: "20:00", dur: "60 min", trainer: "Mateusz K.", spots: 6, max: 16, level: "Średni", icon: "💪" },
];

const badges = [
  { name: "Pierwszy trening", icon: "🏅", unlocked: true },
  { name: "Tydzień w ogniu", icon: "🔥", unlocked: true },
  { name: "50 treningów", icon: "💪", unlocked: true },
  { name: "Maratończyk", icon: "🏃", unlocked: true },
  { name: "Iron Will", icon: "🏆", unlocked: false },
  { name: "Elite Member", icon: "👑", unlocked: false },
];

const weekStats = [
  { day: "Pon", val: 420, done: true },
  { day: "Wt", val: 380, done: true },
  { day: "Śr", val: 0, done: false },
  { day: "Czw", val: 510, done: true },
  { day: "Pt", val: 0, done: false },
  { day: "Sob", val: 620, done: true },
  { day: "Nd", val: 0, done: false },
];

function ProgressChart() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    const maxVal = 650;
    ctx.clearRect(0, 0, c.width, c.height);
    const barW = 28, gap = 18, startX = 20;
    weekStats.forEach((s, i) => {
      const x = startX + i * (barW + gap);
      const h = (s.val / maxVal) * 120;
      const y = 140 - h;
      ctx.fillStyle = s.done ? C.neon : C.gray + "30";
      ctx.beginPath();
      ctx.roundRect(x, y, barW, h, 6);
      ctx.fill();
      ctx.fillStyle = s.done ? C.white : C.gray;
      ctx.font = "bold 10px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(s.day, x + barW / 2, 158);
      if (s.val > 0) {
        ctx.fillStyle = C.white;
        ctx.font = "9px sans-serif";
        ctx.fillText(`${s.val}`, x + barW / 2, y - 5);
      }
    });
  }, []);
  return <canvas ref={ref} width={340} height={170} className="w-full h-auto" />;
}

export function FitnessDemo({ name }: { name: string; features: string[] }) {
  const [page, setPage] = useState("home");
  const tabs = [
    { id: "home", label: "Dashboard", icon: <Flame className="w-3 h-3" /> },
    { id: "schedule", label: "Grafik", icon: <Calendar className="w-3 h-3" /> },
    { id: "progress", label: "Postępy", icon: <TrendingUp className="w-3 h-3" /> },
    { id: "achievements", label: "Osiągnięcia", icon: <Trophy className="w-3 h-3" /> },
    { id: "membership", label: "Karnet", icon: <Award className="w-3 h-3" /> },
  ];

  return (
    <PreviewShell title={name}>
      <DemoNav tabs={tabs} activeTab={page} onTabChange={setPage} logo="IRONFIT" />
      <AnimatePresence mode="wait">
        <motion.div key={page} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
          {page === "home" && <HomePage onNav={setPage} />}
          {page === "schedule" && <SchedulePage />}
          {page === "progress" && <ProgressPage />}
          {page === "achievements" && <AchievementsPage />}
          {page === "membership" && <MembershipPage />}
        </motion.div>
      </AnimatePresence>
    </PreviewShell>
  );
}

function HomePage({ onNav }: { onNav: (p: string) => void }) {
  return (
    <div>
      <div className="p-10 text-center" style={{ background: `linear-gradient(160deg, ${C.black}, ${C.graphite})` }}>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `radial-gradient(circle at 30% 40%, ${C.neon} 0%, transparent 50%), radial-gradient(circle at 70% 80%, ${C.blue} 0%, transparent 50%)` }} />
        <p className="text-[10px] tracking-[0.4em] uppercase" style={{ color: C.neon }}>Premium Fitness Club</p>
        <h1 className="font-display font-bold text-4xl mt-2 tracking-wide" style={{ color: C.white }}>IRON<span style={{ color: C.neon }}>FIT</span></h1>
        <p className="text-xs mt-2 max-w-[260px] mx-auto leading-relaxed" style={{ color: C.white + "80" }}>Więcej niż siłownia. CrossFit, HIIT, Yoga, Boxing — profesjonalni trenerzy i nowoczesny sprzęt.</p>
        <div className="flex gap-3 justify-center mt-6">
          <motion.button whileHover={{ scale: 1.03 }} onClick={() => onNav("membership")}
            className="px-7 py-3.5 rounded-lg font-bold text-sm shadow-lg" style={{ background: C.neon, color: C.black }}>
            Kup karnet
          </motion.button>
          <button onClick={() => onNav("schedule")} className="px-7 py-3.5 rounded-lg font-semibold text-sm border" style={{ borderColor: C.neon + "40", color: C.neon }}>Grafik zajęć</button>
        </div>
      </div>
      <DemoSection>
        <div className="grid grid-cols-4 gap-2">
          {[
            { icon: "🏋️", label: "CrossFit", desc: "WOD codziennie" },
            { icon: "🥊", label: "Boxing", desc: "Ring & worki" },
            { icon: "🧘", label: "Yoga", desc: "Vinyasa flow" },
            { icon: "🔥", label: "HIIT", desc: "45 min spalania" },
          ].map((f, i) => (
            <div key={i} className="p-3 rounded-xl text-center" style={{ background: C.graphite }}>
              <span className="text-lg block">{f.icon}</span>
              <span className="text-[8px] font-bold block mt-1" style={{ color: C.white }}>{f.label}</span>
              <span className="text-[7px]" style={{ color: C.gray }}>{f.desc}</span>
            </div>
          ))}
        </div>
        <h3 className="font-bold text-sm uppercase tracking-wider mt-4" style={{ color: C.neon }}>Dzisiejsze zajęcia</h3>
        {classes.slice(0, 3).map((c, i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-xl border" style={{ borderColor: C.graphite, background: C.black }}>
            <span className="text-xl">{c.icon}</span>
            <div className="flex-1">
              <span className="text-sm font-bold" style={{ color: C.white }}>{c.name}</span>
              <p className="text-[10px]" style={{ color: C.gray }}>{c.time} • {c.dur} • {c.trainer}</p>
            </div>
            {c.spots === 0 ? (
              <span className="px-2 py-0.5 rounded text-[10px] font-bold" style={{ background: C.red + "20", color: C.red }}>Pełne</span>
            ) : (
              <motion.button whileHover={{ scale: 1.05 }} className="px-3 py-1 rounded text-[10px] font-bold" style={{ background: C.neon, color: C.black }}>Zapisz</motion.button>
            )}
          </div>
        ))}
        <div className="p-4 rounded-2xl mt-3" style={{ background: C.graphite, border: `1px solid ${C.neon}20` }}>
          <p className="text-[10px] tracking-[0.2em] uppercase text-center" style={{ color: C.neon }}>Opinie członków</p>
          <p className="text-xs mt-2 text-center italic" style={{ color: C.white + "90" }}>"Najlepszy klub w mieście! Trenerzy znają się na rzeczy, a atmosfera motywuje do działania."</p>
          <p className="text-[10px] text-center mt-1" style={{ color: C.neon }}>— Tomek R. ★★★★★</p>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-3">
          {[{ v: "2,000+", l: "Członków" },{ v: "30+", l: "Zajęć/tydz." },{ v: "16", l: "Trenerów" }].map((s, i) => (
            <div key={i} className="p-3 rounded-xl text-center" style={{ background: C.graphite }}>
              <span className="font-bold text-sm block" style={{ color: C.neon }}>{s.v}</span>
              <span className="text-[9px]" style={{ color: C.gray }}>{s.l}</span>
            </div>
          ))}
        </div>
        <h3 className="font-bold text-sm uppercase tracking-wider mt-4" style={{ color: C.neon }}>Karnety</h3>
        <div className="grid grid-cols-3 gap-2">
          {[
            { name: "BASIC", price: "119", features: "Siłownia" },
            { name: "PRO", price: "199", features: "Siłownia + Zajęcia" },
            { name: "PREMIUM", price: "299", features: "All inclusive" },
          ].map((k, i) => (
            <div key={i} className="p-3 rounded-xl text-center" style={{ background: C.black, border: `1px solid ${i === 2 ? C.neon : C.graphite}` }}>
              <span className="text-[9px] font-bold block" style={{ color: i === 2 ? C.neon : C.white }}>{k.name}</span>
              <span className="font-bold text-base block mt-1" style={{ color: C.white }}>{k.price}<span className="text-[9px] font-normal" style={{ color: C.gray }}> zł/mies.</span></span>
              <span className="text-[8px]" style={{ color: C.gray }}>{k.features}</span>
            </div>
          ))}
        </div>
      </DemoSection>
      <DemoBenefits accentColor={C.lime} bgColor={C.dark} textColor={"#FFFFFF"} benefits={[
        { icon: "📅", title: "Lepsza frekwencja", desc: "Online zapisy na zajęcia i treningi" },
        { icon: "💪", title: "Retencja członków", desc: "Postępy motywują do regularności" },
        { icon: "📊", title: "Analityka klubu", desc: "Obłożenie, statystyki, raporty" },
        { icon: "💳", title: "Karnety online", desc: "Sprzedaż i automatyczne odnowienia" },
      ]} />
      <DemoFooterCTA accentColor={C.lime} bgColor={C.dark} />
    </div>
  );
}

function SchedulePage() {
  const [selDay, setSelDay] = useState(0);
  const dayNames = ["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Nd"];
  return (
    <DemoSection>
      <div className="flex gap-2 mb-3">
        {dayNames.map((d, i) => (
          <button key={d} onClick={() => setSelDay(i)} className="flex-1 py-2 rounded-lg text-xs font-bold"
            style={selDay === i ? { background: C.neon, color: C.black } : { background: C.graphite, color: C.gray }}>{d}</button>
        ))}
      </div>
      <div className="space-y-2">
        {classes.map((c, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
            className="flex items-center gap-3 p-3 rounded-xl border" style={{ borderColor: C.graphite, background: C.black }}>
            <span className="text-xl">{c.icon}</span>
            <div className="flex-1">
              <span className="text-sm font-bold" style={{ color: C.white }}>{c.name}</span>
              <p className="text-[10px]" style={{ color: C.gray }}>{c.time} • {c.dur} • {c.trainer}</p>
              <span className="text-[9px] px-1.5 py-0.5 rounded mt-0.5 inline-block" style={{ background: C.graphite, color: C.gray }}>{c.level}</span>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1"><Users className="w-3 h-3" style={{ color: C.gray }} /><span className="text-[10px]" style={{ color: c.spots > 0 ? C.neon : C.red }}>{c.spots}/{c.max}</span></div>
              {c.spots > 0 && <motion.button whileHover={{ scale: 1.05 }} className="mt-1 px-3 py-1 rounded text-[10px] font-bold" style={{ background: C.neon, color: C.black }}>Zapisz</motion.button>}
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
      <h3 className="font-bold text-sm uppercase tracking-wider" style={{ color: C.neon }}>Twoje postępy</h3>
      <div className="p-4 rounded-xl" style={{ background: C.graphite }}>
        <p className="text-xs mb-2" style={{ color: C.gray }}>Kalorie spalone w tym tygodniu</p>
        <ProgressChart />
        <p className="text-center text-xs mt-1" style={{ color: C.neon }}>1,930 / 3,000 kcal cel tygodniowy</p>
      </div>
      <div className="grid grid-cols-2 gap-3 mt-3">
        {[
          { label: "Najdłuższy streak", val: "12 dni", icon: "🔥" },
          { label: "Ulubione zajęcia", val: "CrossFit", icon: "🏋️" },
          { label: "Łączne treningi", val: "127", icon: "💪" },
          { label: "Łączny czas", val: "142h", icon: "⏱️" },
        ].map((s, i) => (
          <div key={i} className="p-3 rounded-xl" style={{ background: C.graphite }}>
            <span className="text-xl">{s.icon}</span>
            <span className="font-bold text-sm block mt-1" style={{ color: C.white }}>{s.val}</span>
            <span className="text-[9px]" style={{ color: C.gray }}>{s.label}</span>
          </div>
        ))}
      </div>
    </DemoSection>
  );
}

function AchievementsPage() {
  return (
    <DemoSection>
      <h3 className="font-bold text-sm uppercase tracking-wider" style={{ color: C.neon }}>Odznaki</h3>
      <div className="grid grid-cols-3 gap-3">
        {badges.map((b, i) => (
          <motion.div key={i} whileHover={b.unlocked ? { scale: 1.05 } : {}}
            className={`p-4 rounded-xl text-center ${b.unlocked ? "" : "opacity-30"}`} style={{ background: C.graphite }}>
            <span className="text-3xl block mb-1">{b.icon}</span>
            <span className="text-[10px] font-bold" style={{ color: b.unlocked ? C.white : C.gray }}>{b.name}</span>
            {b.unlocked && <CheckCircle2 className="w-3 h-3 mx-auto mt-1" style={{ color: C.neon }} />}
          </motion.div>
        ))}
      </div>
      <div className="p-4 rounded-xl mt-3" style={{ background: C.graphite }}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold" style={{ color: C.white }}>Następna odznaka: Iron Will</span>
          <span className="text-[10px]" style={{ color: C.neon }}>78%</span>
        </div>
        <div className="w-full h-2 rounded-full" style={{ background: C.black }}>
          <div className="h-full rounded-full" style={{ width: "78%", background: C.neon }} />
        </div>
        <p className="text-[10px] mt-1" style={{ color: C.gray }}>Jeszcze 22 treningi do odblokowania</p>
      </div>
    </DemoSection>
  );
}

function MembershipPage() {
  return (
    <DemoSection>
      <div className="p-5 rounded-2xl" style={{ background: `linear-gradient(135deg, ${C.graphite}, ${C.black})`, border: `2px solid ${C.neon}` }}>
        <div className="flex items-center gap-3 mb-3">
          <Zap className="w-6 h-6" style={{ color: C.neon }} />
          <div>
            <p className="font-bold text-sm" style={{ color: C.white }}>Karnet PREMIUM</p>
            <p className="text-[10px]" style={{ color: C.gray }}>Ważny do: 30 cze 2026</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 text-[10px]">
          <div className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3" style={{ color: C.neon }} /><span style={{ color: C.white }}>Nielimitowane zajęcia</span></div>
          <div className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3" style={{ color: C.neon }} /><span style={{ color: C.white }}>Strefa saun</span></div>
          <div className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3" style={{ color: C.neon }} /><span style={{ color: C.white }}>Trening personalny 2x</span></div>
          <div className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3" style={{ color: C.neon }} /><span style={{ color: C.white }}>Szafka premium</span></div>
        </div>
      </div>
      <h4 className="font-bold text-xs uppercase tracking-wider mt-4" style={{ color: C.neon }}>Inne karnety</h4>
      {[
        { name: "BASIC", price: "119 zł/mies.", features: ["Siłownia", "Zajęcia grupowe", "Szatnia"] },
        { name: "PRO", price: "199 zł/mies.", features: ["Wszystko z Basic", "Sauna", "1x trening pers."] },
      ].map((k, i) => (
        <div key={i} className="p-4 rounded-xl border" style={{ borderColor: C.graphite, background: C.black }}>
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-sm" style={{ color: C.white }}>{k.name}</h4>
            <span className="font-bold text-sm" style={{ color: C.neon }}>{k.price}</span>
          </div>
          <div className="flex gap-2 mt-2 flex-wrap">
            {k.features.map((f, j) => <span key={j} className="px-2 py-0.5 rounded text-[9px]" style={{ background: C.graphite, color: C.gray }}>{f}</span>)}
          </div>
        </div>
      ))}
    </DemoSection>
  );
}
