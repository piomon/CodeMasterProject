import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PreviewShell, DemoNav, DemoSection } from "./PreviewShell";
import { Calculator, Home, Ruler, ChevronRight, CheckCircle2, Download, Building2, Layers, BarChart3, HardHat } from "lucide-react";

const C = { anthracite: "#2D2D2D", concrete: "#8C8C8C", sand: "#D4C5A9", orange: "#E87D2F", white: "#F8FAFC", dark: "#1A1A1A", light: "#F5F3EF" };

const projectTypes = [
  { name: "Dom jednorodzinny", icon: "🏠", desc: "Budowa od fundamentów" },
  { name: "Mieszkanie – remont", icon: "🔧", desc: "Remont generalny" },
  { name: "Biuro – fit-out", icon: "🏢", desc: "Aranżacja biura" },
  { name: "Lokal usługowy", icon: "🏪", desc: "Wykończenie lokalu" },
];

const costItems = [
  { category: "Materiały", items: [{ name: "Płytki ceramiczne", unit: "m²", price: 120 }, { name: "Farba lateksowa", unit: "l", price: 45 }, { name: "Panele podłogowe", unit: "m²", price: 85 }] },
  { category: "Robocizna", items: [{ name: "Układanie płytek", unit: "m²", price: 80 }, { name: "Malowanie", unit: "m²", price: 25 }, { name: "Montaż podłóg", unit: "m²", price: 40 }] },
  { category: "Instalacje", items: [{ name: "Elektryka", unit: "punkt", price: 180 }, { name: "Hydraulika", unit: "punkt", price: 250 }] },
];

export function CalculatorDemo({ name }: { name: string; features: string[]; industry?: string }) {
  const [page, setPage] = useState("home");
  const tabs = [
    { id: "home", label: "Start", icon: <Home className="w-3 h-3" /> },
    { id: "wizard", label: "Kalkulator", icon: <Calculator className="w-3 h-3" /> },
    { id: "catalog", label: "Cennik", icon: <BarChart3 className="w-3 h-3" /> },
    { id: "estimate", label: "Kosztorys", icon: <Layers className="w-3 h-3" /> },
    { id: "projects", label: "Projekty", icon: <Building2 className="w-3 h-3" /> },
  ];

  return (
    <PreviewShell title={name}>
      <DemoNav tabs={tabs} activeTab={page} onTabChange={setPage} logo="BuildCalc" />
      <AnimatePresence mode="wait">
        <motion.div key={page} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
          {page === "home" && <HomePage onNav={setPage} />}
          {page === "wizard" && <WizardPage />}
          {page === "catalog" && <CatalogPage />}
          {page === "estimate" && <EstimatePage />}
          {page === "projects" && <ProjectsPage />}
        </motion.div>
      </AnimatePresence>
    </PreviewShell>
  );
}

function HomePage({ onNav }: { onNav: (p: string) => void }) {
  return (
    <div>
      <div className="p-10 text-center" style={{ background: `linear-gradient(160deg, ${C.anthracite}, ${C.dark})` }}>
        <p className="text-[10px] tracking-[0.4em] uppercase" style={{ color: C.orange }}>Kalkulator Budowlany</p>
        <h1 className="font-display font-bold text-4xl mt-2 text-white">Build<span style={{ color: C.orange }}>Calc</span></h1>
        <p className="text-xs mt-2 max-w-[260px] mx-auto leading-relaxed" style={{ color: C.concrete }}>Precyzyjne kosztorysy budowy i remontu. 340+ pozycji cennikowych, aktualne ceny materiałów i robocizny.</p>
        <div className="flex gap-3 justify-center mt-6">
          <motion.button whileHover={{ scale: 1.03 }} onClick={() => onNav("wizard")}
            className="px-7 py-3.5 rounded-lg font-bold text-sm text-white shadow-lg" style={{ background: C.orange }}>Rozpocznij kalkulację</motion.button>
          <button onClick={() => onNav("catalog")} className="px-7 py-3.5 rounded-lg font-semibold text-sm border" style={{ borderColor: C.orange + "40", color: C.orange }}>Cennik</button>
        </div>
      </div>
      <DemoSection>
        <div className="grid grid-cols-4 gap-2">
          {[
            { icon: "🏠", label: "Domy", desc: "Od fundamentów" },
            { icon: "🔧", label: "Remonty", desc: "Generalny" },
            { icon: "🏢", label: "Biura", desc: "Fit-out" },
            { icon: "📐", label: "Na wymiar", desc: "Precyzyjnie" },
          ].map((f, i) => (
            <div key={i} className="p-3 rounded-xl text-center" style={{ background: C.light }}>
              <span className="text-lg block">{f.icon}</span>
              <span className="text-[8px] font-bold block mt-1" style={{ color: C.anthracite }}>{f.label}</span>
              <span className="text-[7px]" style={{ color: C.concrete }}>{f.desc}</span>
            </div>
          ))}
        </div>
        <h3 className="font-bold text-sm mt-4" style={{ color: C.anthracite }}>Rodzaj projektu</h3>
        <div className="grid grid-cols-2 gap-3">
          {projectTypes.map((t, i) => (
            <motion.div key={i} whileHover={{ y: -2 }} onClick={() => onNav("wizard")}
              className="p-3 rounded-xl border cursor-pointer text-center" style={{ borderColor: C.sand + "60", background: C.light }}>
              <span className="text-2xl block mb-1">{t.icon}</span>
              <h4 className="font-bold text-xs" style={{ color: C.anthracite }}>{t.name}</h4>
              <p className="text-[10px]" style={{ color: C.concrete }}>{t.desc}</p>
            </motion.div>
          ))}
        </div>
        <div className="p-4 rounded-2xl mt-3" style={{ background: C.light, border: `1px solid ${C.orange}15` }}>
          <p className="text-[10px] tracking-[0.2em] uppercase text-center" style={{ color: C.orange }}>Opinie użytkowników</p>
          <p className="text-xs mt-2 text-center italic" style={{ color: C.anthracite + "90" }}>"BuildCalc zaoszczędził mi 15 000 zł — wiedziałem dokładnie ile kosztuje remont, zanim podpisałem umowę."</p>
          <p className="text-[10px] text-center mt-1" style={{ color: C.orange }}>— Marek T. ★★★★★</p>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-3">
          {[{ l: "Kalkulacji", v: "5,200+" },{ l: "Pozycji cennika", v: "340" },{ l: "Średni koszt/m²", v: "4 500 zł" }].map((s, i) => (
            <div key={i} className="p-3 rounded-xl text-center" style={{ background: C.sand + "30" }}>
              <span className="font-bold text-sm block" style={{ color: C.orange }}>{s.v}</span>
              <span className="text-[9px]" style={{ color: C.concrete }}>{s.l}</span>
            </div>
          ))}
        </div>
      </DemoSection>
      <DemoBenefits accentColor={C.orange} bgColor={C.light} textColor={C.dark} benefits={[
        { icon: "🧮", title: "Szybka wycena", desc: "Klient dostaje kosztorys online" },
        { icon: "📋", title: "Lepsze leady", desc: "Przygotowany brief od klienta" },
        { icon: "⚡", title: "Automatyzacja", desc: "Kalkulator liczy za Ciebie" },
        { icon: "📊", title: "Panel ofert", desc: "CRM zapytań handlowych" },
      ]} />
      <DemoFooterCTA accentColor={C.orange} bgColor={C.dark} />
    </div>
  );
}

function WizardPage() {
  const [step, setStep] = useState(0);
  const [area, setArea] = useState(65);
  const [selType, setSelType] = useState(1);
  const [quality, setQuality] = useState(1);
  const qualityLabels = ["Ekonomiczny", "Standard", "Premium"];
  const priceMultiplier = [3200, 4500, 7000];
  const estimated = area * priceMultiplier[quality];

  return (
    <DemoSection>
      <div className="flex gap-1 mb-4">
        {["Typ", "Parametry", "Jakość", "Wynik"].map((s, i) => (
          <div key={s} className="flex items-center gap-1 flex-1">
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold"
              style={step >= i ? { background: C.orange, color: "white" } : { background: C.sand + "40", color: C.concrete }}>{step > i ? "✓" : i+1}</div>
            <span className="text-[9px]" style={{ color: step >= i ? C.anthracite : C.concrete }}>{s}</span>
          </div>
        ))}
      </div>

      {step === 0 && (
        <div className="grid grid-cols-2 gap-3">
          {projectTypes.map((t, i) => (
            <button key={i} onClick={() => { setSelType(i); setStep(1); }}
              className="p-4 rounded-xl border text-center" style={selType === i ? { borderColor: C.orange, background: C.orange + "08" } : { borderColor: C.sand + "60", background: C.light }}>
              <span className="text-2xl block mb-1">{t.icon}</span>
              <span className="text-xs font-medium" style={{ color: C.anthracite }}>{t.name}</span>
            </button>
          ))}
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4">
          <div>
            <div className="flex justify-between"><span className="text-xs font-medium" style={{ color: C.anthracite }}>Powierzchnia (m²)</span><span className="text-xs font-bold" style={{ color: C.orange }}>{area} m²</span></div>
            <input type="range" min={20} max={300} value={area} onChange={e => setArea(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer" style={{ background: `linear-gradient(to right, ${C.orange} ${((area-20)/280)*100}%, ${C.sand}40 0%)` }} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><span className="text-[10px]" style={{ color: C.concrete }}>Liczba pomieszczeń</span><input type="number" defaultValue={3} className="w-full px-3 py-2 rounded-lg border text-sm" style={{ borderColor: C.sand + "60", background: C.light, color: C.anthracite }} /></div>
            <div><span className="text-[10px]" style={{ color: C.concrete }}>Piętro</span><input type="number" defaultValue={2} className="w-full px-3 py-2 rounded-lg border text-sm" style={{ borderColor: C.sand + "60", background: C.light, color: C.anthracite }} /></div>
          </div>
          <motion.button whileHover={{ scale: 1.02 }} onClick={() => setStep(2)}
            className="w-full py-3 rounded-xl font-semibold text-sm text-white" style={{ background: C.orange }}>Dalej →</motion.button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-3">
          <p className="text-xs" style={{ color: C.concrete }}>Wybierz standard wykończenia:</p>
          {qualityLabels.map((q, i) => (
            <button key={q} onClick={() => setQuality(i)}
              className="w-full p-4 rounded-xl border text-left" style={quality === i ? { borderColor: C.orange, background: C.orange + "08" } : { borderColor: C.sand + "60", background: C.light }}>
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-sm" style={{ color: C.anthracite }}>{q}</span>
                  <p className="text-[10px]" style={{ color: C.concrete }}>~{priceMultiplier[i].toLocaleString()} zł/m²</p>
                </div>
                <span className="font-bold text-sm" style={{ color: C.orange }}>{(area * priceMultiplier[i]).toLocaleString()} zł</span>
              </div>
            </button>
          ))}
          <motion.button whileHover={{ scale: 1.02 }} onClick={() => setStep(3)}
            className="w-full py-3 rounded-xl font-semibold text-sm text-white" style={{ background: C.orange }}>Zobacz wynik</motion.button>
        </div>
      )}

      {step === 3 && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <div className="p-5 rounded-xl text-center" style={{ background: C.orange + "10" }}>
            <p className="text-xs" style={{ color: C.concrete }}>Szacowany koszt</p>
            <h2 className="font-bold text-3xl mt-1" style={{ color: C.orange }}>{estimated.toLocaleString()} zł</h2>
            <p className="text-xs mt-1" style={{ color: C.concrete }}>{projectTypes[selType].name} • {area} m² • {qualityLabels[quality]}</p>
            <p className="text-[10px] mt-1" style={{ color: C.concrete }}>{Math.round(estimated/area).toLocaleString()} zł/m²</p>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-3">
            <div className="p-2 rounded-lg text-center" style={{ background: C.sand + "30" }}>
              <span className="text-[10px]" style={{ color: C.concrete }}>Materiały</span>
              <p className="font-bold text-xs" style={{ color: C.anthracite }}>{Math.round(estimated*0.45).toLocaleString()} zł</p>
            </div>
            <div className="p-2 rounded-lg text-center" style={{ background: C.sand + "30" }}>
              <span className="text-[10px]" style={{ color: C.concrete }}>Robocizna</span>
              <p className="font-bold text-xs" style={{ color: C.anthracite }}>{Math.round(estimated*0.40).toLocaleString()} zł</p>
            </div>
            <div className="p-2 rounded-lg text-center" style={{ background: C.sand + "30" }}>
              <span className="text-[10px]" style={{ color: C.concrete }}>Inne</span>
              <p className="font-bold text-xs" style={{ color: C.anthracite }}>{Math.round(estimated*0.15).toLocaleString()} zł</p>
            </div>
          </div>
          <motion.button whileHover={{ scale: 1.02 }}
            className="w-full mt-3 py-3 rounded-xl font-semibold text-sm text-white" style={{ background: C.orange }}>Pobierz szczegółowy kosztorys (PDF)</motion.button>
          <button onClick={() => setStep(0)} className="w-full mt-2 py-2 rounded-xl text-xs font-medium" style={{ color: C.orange }}>Nowa kalkulacja</button>
        </motion.div>
      )}
    </DemoSection>
  );
}

function CatalogPage() {
  return (
    <DemoSection>
      <h3 className="font-bold text-sm" style={{ color: C.anthracite }}>Cennik usług i materiałów</h3>
      {costItems.map((cat, i) => (
        <div key={i}>
          <h4 className="text-xs font-bold mt-3 mb-1" style={{ color: C.orange }}>{cat.category}</h4>
          {cat.items.map((item, j) => (
            <div key={j} className="flex items-center justify-between py-2 border-b" style={{ borderColor: C.sand + "30" }}>
              <span className="text-xs" style={{ color: C.anthracite }}>{item.name}</span>
              <span className="text-xs font-bold" style={{ color: C.anthracite }}>{item.price} zł/{item.unit}</span>
            </div>
          ))}
        </div>
      ))}
    </DemoSection>
  );
}

function EstimatePage() {
  const items = [
    { name: "Płytki łazienka (12 m²)", qty: 12, price: 120, total: 1440 },
    { name: "Układanie płytek", qty: 12, price: 80, total: 960 },
    { name: "Farba salon (45 m²)", qty: 15, price: 45, total: 675 },
    { name: "Malowanie ścian", qty: 45, price: 25, total: 1125 },
    { name: "Panele (35 m²)", qty: 35, price: 85, total: 2975 },
    { name: "Montaż paneli", qty: 35, price: 40, total: 1400 },
    { name: "Instalacja elektryczna", qty: 12, price: 180, total: 2160 },
  ];
  const total = items.reduce((a, i) => a + i.total, 0);

  return (
    <DemoSection>
      <h3 className="font-bold text-sm" style={{ color: C.anthracite }}>Kosztorys szczegółowy</h3>
      <p className="text-[10px]" style={{ color: C.concrete }}>Mieszkanie 65 m² — remont standard</p>
      <div className="space-y-1 mt-2">
        {items.map((it, i) => (
          <div key={i} className="flex justify-between py-1.5 border-b" style={{ borderColor: C.sand + "20" }}>
            <span className="text-xs" style={{ color: C.anthracite }}>{it.name}</span>
            <span className="text-xs font-bold" style={{ color: C.anthracite }}>{it.total.toLocaleString()} zł</span>
          </div>
        ))}
      </div>
      <div className="p-3 rounded-xl mt-3" style={{ background: C.orange + "10" }}>
        <div className="flex justify-between">
          <span className="font-bold" style={{ color: C.anthracite }}>Razem</span>
          <span className="font-bold text-xl" style={{ color: C.orange }}>{total.toLocaleString()} zł</span>
        </div>
      </div>
    </DemoSection>
  );
}

function ProjectsPage() {
  return (
    <DemoSection>
      <h3 className="font-bold text-sm" style={{ color: C.anthracite }}>Twoje projekty</h3>
      {[
        { name: "Remont mieszkania 65m²", date: "15 mar 2026", status: "W trakcie", cost: "292K zł" },
        { name: "Łazienka — kalkulacja", date: "10 mar 2026", status: "Zapisana", cost: "18K zł" },
        { name: "Biuro 120m²", date: "28 lut 2026", status: "Zakończony", cost: "540K zł" },
      ].map((p, i) => (
        <div key={i} className="p-4 rounded-xl border" style={{ borderColor: C.sand + "40", background: C.light }}>
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-bold text-sm" style={{ color: C.anthracite }}>{p.name}</h4>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold" style={{
              background: p.status === "W trakcie" ? C.orange + "15" : p.status === "Zapisana" ? "#2563EB15" : "#10B98115",
              color: p.status === "W trakcie" ? C.orange : p.status === "Zapisana" ? "#2563EB" : "#10B981"
            }}>{p.status}</span>
          </div>
          <p className="text-[10px]" style={{ color: C.concrete }}>{p.date}</p>
          <p className="font-bold text-sm mt-1" style={{ color: C.orange }}>{p.cost}</p>
        </div>
      ))}
    </DemoSection>
  );
}
