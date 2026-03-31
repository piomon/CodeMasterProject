import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PreviewShell, DemoNav, DemoSection, DemoBenefits, DemoFooterCTA } from "./PreviewShell";
import { Calculator, Home, Ruler, ChevronRight, CheckCircle2, Download, Building2, Layers, BarChart3, HardHat, Settings, FileText, ArrowRight } from "lucide-react";

const C = { navy: "#1A1A2E", dark: "#16213E", graphite: "#2D3436", white: "#F8FAFC", gray: "#6B7280", green: "#10B981", blue: "#3B82F6", amber: "#F59E0B", red: "#EF4444", light: "#F1F5F9", teal: "#0D9488", violet: "#6366F1" };

const buildTypes = [
  { name: "Dom jednorodzinny", icon: "🏠", pricePerSqm: { low: 4200, mid: 5800, high: 7500 }, desc: "Parterowy lub piętrowy" },
  { name: "Bliźniak", icon: "🏘️", pricePerSqm: { low: 3800, mid: 5200, high: 6800 }, desc: "Segment bliźniaka" },
  { name: "Rozbudowa / nadbudowa", icon: "🔨", pricePerSqm: { low: 3500, mid: 4800, high: 6200 }, desc: "Istniejąca bryła" },
  { name: "Hala / budynek usługowy", icon: "🏢", pricePerSqm: { low: 2800, mid: 4200, high: 5800 }, desc: "Komercyjne" },
];

const standards = [
  { name: "Ekonomiczny", key: "low" as const, desc: "Solidne materiały, prosty design", color: C.teal },
  { name: "Standard", key: "mid" as const, desc: "Dobre materiały, wyższy komfort", color: C.blue },
  { name: "Premium", key: "high" as const, desc: "Najwyższa jakość, design i komfort", color: C.violet },
];

const costBreakdown = [
  { category: "Fundamenty i stan zero", percent: 15 },
  { category: "Ściany i konstrukcja", percent: 22 },
  { category: "Dach i pokrycie", percent: 12 },
  { category: "Instalacje (el., wod., kan.)", percent: 18 },
  { category: "Wykończenie wewnętrzne", percent: 25 },
  { category: "Stolarka okienna i drzwiowa", percent: 8 },
];

export function CalculatorDemo({ name }: { name: string; features: string[] }) {
  const [page, setPage] = useState("home");
  const tabs = [
    { id: "home", label: "Start", icon: <Home className="w-3 h-3" /> },
    { id: "calculator", label: "Kalkulator", icon: <Calculator className="w-3 h-3" /> },
    { id: "breakdown", label: "Kosztorys", icon: <BarChart3 className="w-3 h-3" /> },
    { id: "compare", label: "Porównanie", icon: <Layers className="w-3 h-3" /> },
    { id: "contact", label: "Wycena", icon: <FileText className="w-3 h-3" /> },
  ];

  return (
    <PreviewShell title={name}>
      <DemoNav tabs={tabs} activeTab={page} onTabChange={setPage} logo="BudżetBud" />
      <AnimatePresence mode="wait">
        <motion.div key={page} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
          {page === "home" && <HomePage onNav={setPage} />}
          {page === "calculator" && <CalculatorPage />}
          {page === "breakdown" && <BreakdownPage />}
          {page === "compare" && <ComparePage />}
          {page === "contact" && <ContactPage />}
        </motion.div>
      </AnimatePresence>
    </PreviewShell>
  );
}

function HomePage({ onNav }: { onNav: (p: string) => void }) {
  return (
    <div>
      <div className="p-8 pb-10" style={{ background: `linear-gradient(160deg, ${C.navy}, ${C.dark})` }}>
        <p className="text-[10px] tracking-[0.4em] uppercase" style={{ color: C.teal }}>Kalkulator budowlany</p>
        <h1 className="font-display font-bold text-3xl mt-1 text-white">Budżet<span style={{ color: C.teal }}>Bud</span></h1>
        <p className="text-xs mt-2 text-white/70 max-w-[280px] leading-relaxed">Oblicz koszt budowy domu, rozbudowy lub hali. Szybki kosztorys z podziałem na etapy i standardy wykończenia.</p>
        <div className="flex gap-3 mt-5">
          <motion.button whileHover={{ scale: 1.03 }} onClick={() => onNav("calculator")}
            className="px-6 py-3 rounded-lg font-bold text-sm shadow-lg text-white" style={{ background: C.teal }}>Oblicz koszt budowy</motion.button>
          <button onClick={() => onNav("compare")} className="px-6 py-3 rounded-lg font-semibold text-sm border border-white/20 text-white">Porównaj standardy</button>
        </div>
      </div>

      <DemoSection>
        <h3 className="font-bold text-sm" style={{ color: C.graphite }}>Wybierz typ budowy</h3>
        <div className="space-y-2">
          {buildTypes.map((bt, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
              onClick={() => onNav("calculator")}
              className="flex items-center gap-3 p-3 rounded-xl border hover:shadow-sm transition-all cursor-pointer" style={{ borderColor: C.light, background: C.white }}>
              <span className="text-2xl shrink-0">{bt.icon}</span>
              <div className="flex-1">
                <h4 className="text-xs font-bold" style={{ color: C.graphite }}>{bt.name}</h4>
                <p className="text-[10px]" style={{ color: C.gray }}>{bt.desc}</p>
              </div>
              <div className="text-right shrink-0">
                <span className="text-[9px]" style={{ color: C.gray }}>od</span>
                <span className="text-xs font-bold block" style={{ color: C.teal }}>{bt.pricePerSqm.low.toLocaleString()} zł/m²</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2 mt-2">
          {[{ v: "2 500+", l: "Wycen wykonanych" }, { v: "±8%", l: "Dokładność" }, { v: "30s", l: "Czas kalkulacji" }].map((s, i) => (
            <div key={i} className="p-3 rounded-xl text-center" style={{ background: C.light }}>
              <span className="font-bold text-sm block" style={{ color: C.teal }}>{s.v}</span>
              <span className="text-[8px]" style={{ color: C.gray }}>{s.l}</span>
            </div>
          ))}
        </div>
      </DemoSection>

      <DemoBenefits accentColor={C.teal} bgColor={C.light} textColor={C.graphite} benefits={[
        { icon: "🧮", title: "Szybka kalkulacja", desc: "Koszt budowy w 30 sekund" },
        { icon: "📊", title: "Kosztorys szczegółowy", desc: "Podział na etapy budowy" },
        { icon: "📋", title: "PDF do pobrania", desc: "Kosztorys w formacie PDF" },
        { icon: "📞", title: "Wycena eksperta", desc: "Dokładna wycena od wykonawcy" },
      ]} />
      <DemoFooterCTA accentColor={C.teal} bgColor={C.navy} />
    </div>
  );
}

function CalculatorPage() {
  const [buildType, setBuildType] = useState(0);
  const [standard, setStandard] = useState(1);
  const [area, setArea] = useState(140);
  const [floors, setFloors] = useState(1);

  const bt = buildTypes[buildType];
  const std = standards[standard];
  const totalCost = bt.pricePerSqm[std.key] * area * (floors > 1 ? 1.15 : 1);
  const costPerSqm = bt.pricePerSqm[std.key] * (floors > 1 ? 1.15 : 1);

  return (
    <DemoSection>
      <h3 className="font-bold text-sm" style={{ color: C.graphite }}>Kalkulator kosztów budowy</h3>

      <div>
        <span className="text-[10px] font-bold uppercase" style={{ color: C.gray }}>Typ budowy</span>
        <div className="grid grid-cols-2 gap-2 mt-1">
          {buildTypes.map((bt, i) => (
            <button key={i} onClick={() => setBuildType(i)}
              className="p-3 rounded-xl text-left transition-all" style={buildType === i ? { background: C.teal + "10", border: `2px solid ${C.teal}`, color: C.graphite } : { background: C.white, border: `1px solid ${C.light}`, color: C.graphite }}>
              <span className="text-xl block">{bt.icon}</span>
              <span className="text-[10px] font-bold block mt-1">{bt.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <span className="text-[10px] font-bold uppercase" style={{ color: C.gray }}>Powierzchnia użytkowa: {area} m²</span>
        <input type="range" min={60} max={400} value={area} onChange={e => setArea(Number(e.target.value))}
          className="w-full mt-1 accent-teal-600" />
        <div className="flex justify-between text-[9px]" style={{ color: C.gray }}><span>60 m²</span><span>400 m²</span></div>
      </div>

      <div>
        <span className="text-[10px] font-bold uppercase" style={{ color: C.gray }}>Liczba kondygnacji</span>
        <div className="flex gap-2 mt-1">
          {[1, 2].map(f => (
            <button key={f} onClick={() => setFloors(f)}
              className="flex-1 py-2.5 rounded-xl text-xs font-medium transition-all"
              style={floors === f ? { background: C.teal, color: "white" } : { background: C.light, color: C.graphite }}>{f === 1 ? "Parterowy" : "Piętrowy"}</button>
          ))}
        </div>
      </div>

      <div>
        <span className="text-[10px] font-bold uppercase" style={{ color: C.gray }}>Standard wykończenia</span>
        <div className="flex gap-2 mt-1">
          {standards.map((s, i) => (
            <button key={i} onClick={() => setStandard(i)}
              className="flex-1 py-2.5 rounded-xl text-xs font-medium transition-all"
              style={standard === i ? { background: s.color, color: "white" } : { background: C.light, color: C.graphite }}>{s.name}</button>
          ))}
        </div>
        <p className="text-[10px] mt-1" style={{ color: C.gray }}>{std.desc}</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="p-5 rounded-xl text-center" style={{ background: `linear-gradient(135deg, ${C.navy}, ${C.dark})` }}>
        <p className="text-[9px] uppercase tracking-wider text-white/40">Szacowany koszt budowy</p>
        <motion.span key={totalCost} initial={{ scale: 0.9 }} animate={{ scale: 1 }}
          className="font-bold text-3xl text-white block mt-1">{Math.round(totalCost).toLocaleString()} zł</motion.span>
        <p className="text-[10px] mt-1" style={{ color: C.teal }}>{Math.round(costPerSqm).toLocaleString()} zł/m² · {area} m² · {floors === 1 ? "parter" : "piętrowy"} · {std.name}</p>
        <div className="flex gap-2 justify-center mt-4">
          <motion.button whileHover={{ scale: 1.02 }} className="px-4 py-2 rounded-lg text-[10px] font-bold text-white flex items-center gap-1" style={{ background: C.teal }}>
            <Download className="w-3 h-3" /> Pobierz PDF
          </motion.button>
          <button className="px-4 py-2 rounded-lg text-[10px] font-bold border border-white/20 text-white">Zapytaj o wycenę</button>
        </div>
      </motion.div>
    </DemoSection>
  );
}

function BreakdownPage() {
  const totalCost = 812000;
  return (
    <DemoSection>
      <h3 className="font-bold text-sm" style={{ color: C.graphite }}>Kosztorys szczegółowy</h3>
      <p className="text-xs" style={{ color: C.gray }}>Dom 140m², standard, parterowy</p>
      <div className="space-y-2 mt-2">
        {costBreakdown.map((c, i) => {
          const cost = Math.round(totalCost * c.percent / 100);
          return (
            <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
              className="p-3 rounded-xl" style={{ background: C.white, border: `1px solid ${C.light}` }}>
              <div className="flex justify-between mb-1">
                <span className="text-xs font-medium" style={{ color: C.graphite }}>{c.category}</span>
                <span className="text-xs font-bold" style={{ color: C.teal }}>{cost.toLocaleString()} zł</span>
              </div>
              <div className="w-full h-2 rounded-full" style={{ background: C.light }}>
                <motion.div initial={{ width: 0 }} animate={{ width: `${c.percent}%` }} transition={{ delay: i * 0.06, duration: 0.5 }}
                  className="h-full rounded-full" style={{ background: `linear-gradient(to right, ${C.teal}, ${C.blue})` }} />
              </div>
              <span className="text-[9px]" style={{ color: C.gray }}>{c.percent}% całkowitego kosztu</span>
            </motion.div>
          );
        })}
      </div>
      <div className="p-4 rounded-xl mt-2" style={{ background: C.light }}>
        <div className="flex justify-between">
          <span className="font-bold text-sm" style={{ color: C.graphite }}>Łączny koszt</span>
          <span className="font-bold text-lg" style={{ color: C.teal }}>{totalCost.toLocaleString()} zł</span>
        </div>
        <p className="text-[10px] mt-1" style={{ color: C.gray }}>Cena obejmuje materiały i robociznę. Nie obejmuje: projekt architektoniczny, przyłącza, ogrodzenie.</p>
      </div>
    </DemoSection>
  );
}

function ComparePage() {
  const area = 140;
  return (
    <DemoSection>
      <h3 className="font-bold text-sm" style={{ color: C.graphite }}>Porównanie standardów — {area} m²</h3>
      <div className="space-y-3">
        {standards.map((std, i) => {
          const cost = buildTypes[0].pricePerSqm[std.key] * area;
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className="p-4 rounded-xl border" style={{ borderColor: C.light, background: C.white }}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: std.color }} />
                  <h4 className="font-bold text-sm" style={{ color: C.graphite }}>{std.name}</h4>
                </div>
                <span className="font-bold text-lg" style={{ color: std.color }}>{cost.toLocaleString()} zł</span>
              </div>
              <p className="text-[10px] mb-2" style={{ color: C.gray }}>{std.desc}</p>
              <p className="text-[10px] font-medium" style={{ color: std.color }}>{buildTypes[0].pricePerSqm[std.key].toLocaleString()} zł/m²</p>
            </motion.div>
          );
        })}
      </div>
    </DemoSection>
  );
}

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  if (submitted) return (
    <DemoSection>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
        <CheckCircle2 className="w-12 h-12 mx-auto mb-3" style={{ color: C.green }} />
        <h3 className="font-bold text-lg" style={{ color: C.graphite }}>Zapytanie wysłane!</h3>
        <p className="text-xs mt-1" style={{ color: C.gray }}>Odpowiemy w ciągu 24h z dokładną wyceną.</p>
      </motion.div>
    </DemoSection>
  );
  return (
    <DemoSection>
      <h3 className="font-bold text-sm" style={{ color: C.graphite }}>Zamów dokładną wycenę</h3>
      <p className="text-xs" style={{ color: C.gray }}>Nasz ekspert przygotuje szczegółowy kosztorys</p>
      <input placeholder="Imię i nazwisko" className="w-full px-4 py-3 rounded-xl border text-sm" style={{ borderColor: C.light, background: C.white, color: C.graphite }} />
      <input placeholder="Telefon" className="w-full px-4 py-3 rounded-xl border text-sm" style={{ borderColor: C.light, background: C.white, color: C.graphite }} />
      <input placeholder="E-mail" className="w-full px-4 py-3 rounded-xl border text-sm" style={{ borderColor: C.light, background: C.white, color: C.graphite }} />
      <textarea placeholder="Opisz swój projekt budowlany..." rows={4} className="w-full px-4 py-3 rounded-xl border text-sm resize-none" style={{ borderColor: C.light, background: C.white, color: C.graphite }} />
      <motion.button whileHover={{ scale: 1.02 }} onClick={() => setSubmitted(true)}
        className="w-full py-3 rounded-xl text-xs font-bold text-white" style={{ background: C.teal }}>Wyślij zapytanie</motion.button>
    </DemoSection>
  );
}
