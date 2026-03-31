import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PreviewShell, DemoBenefits, DemoFooterCTA } from "./PreviewShell";
import { Calculator, Ruler, CheckCircle2, Download, Building2, Layers, BarChart3, HardHat, ArrowRight } from "lucide-react";

const C = { navy: "#1A1A2E", dark: "#16213E", graphite: "#2D3436", white: "#F8FAFC", gray: "#6B7280", green: "#10B981", blue: "#3B82F6", amber: "#F59E0B", red: "#EF4444", light: "#F1F5F9", teal: "#0D9488", violet: "#6366F1" };

type CalcPage = "kalkulator" | "porownanie" | "raport" | "kontakt";

const buildTypes = [
  { name: "Dom jednorodzinny", icon: "🏠", pricePerSqm: { low: 4200, mid: 5800, high: 7500 }, desc: "Parterowy lub piętrowy" },
  { name: "Bliźniak", icon: "🏘️", pricePerSqm: { low: 3800, mid: 5200, high: 6800 }, desc: "Segment bliźniaka" },
  { name: "Remont generalny", icon: "🔨", pricePerSqm: { low: 1800, mid: 2800, high: 4200 }, desc: "Kompleksowy remont" },
  { name: "Wykończenie deweloperskie", icon: "🪟", pricePerSqm: { low: 1200, mid: 1800, high: 2800 }, desc: "Pod klucz" },
];

type QualityLevel = "low" | "mid" | "high";

const qualityLabels: Record<QualityLevel, { label: string; color: string; desc: string }> = {
  low: { label: "Ekonomiczny", color: C.teal, desc: "Materiały budżetowe, podstawowe wykończenie" },
  mid: { label: "Standard", color: C.blue, desc: "Dobre materiały, solidne wykończenie" },
  high: { label: "Premium", color: C.violet, desc: "Materiały najwyższej jakości, luksus" },
};

const costBreakdown = [
  { name: "Fundamenty i konstrukcja", pct: 28, color: C.navy },
  { name: "Instalacje (wod-kan, elektr.)", pct: 18, color: C.blue },
  { name: "Dach i elewacja", pct: 15, color: C.teal },
  { name: "Okna i drzwi", pct: 12, color: C.green },
  { name: "Wykończenie wnętrz", pct: 17, color: C.violet },
  { name: "Zagospodarowanie terenu", pct: 10, color: C.amber },
];

export function CalculatorDemo({ name }: { name: string; features: string[] }) {
  const [page, setPage] = useState<CalcPage>("kalkulator");
  const tabs: { id: CalcPage; label: string }[] = [
    { id: "kalkulator", label: "Kalkulator" },
    { id: "porownanie", label: "Porównanie" },
    { id: "raport", label: "Raport" },
    { id: "kontakt", label: "Kontakt" },
  ];

  return (
    <PreviewShell title={name}>
      <div style={{ background: C.white, minHeight: 540 }}>
        <div className="px-5 py-3 flex items-center justify-between" style={{ background: C.navy }}>
          <div className="flex items-center gap-2">
            <HardHat className="w-5 h-5" style={{ color: C.amber }} />
            <h1 className="font-bold text-sm text-white">Budżet<span style={{ color: C.amber }}>Bud</span></h1>
          </div>
          <div className="flex gap-1">
            {tabs.map(t => (
              <button key={t.id} onClick={() => setPage(t.id)}
                className="px-3 py-1.5 rounded-lg text-[10px] font-medium transition-all"
                style={page === t.id ? { background: C.amber, color: C.navy } : { color: "rgba(255,255,255,0.5)" }}>{t.label}</button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={page} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            {page === "kalkulator" && <CalculatorPage />}
            {page === "porownanie" && <ComparisonPage />}
            {page === "raport" && <ReportPage />}
            {page === "kontakt" && <ContactPage />}
          </motion.div>
        </AnimatePresence>
      </div>

      <DemoBenefits accentColor={C.amber} bgColor={C.light} textColor={C.navy} benefits={[
        { icon: "🧮", title: "Kalkulator kosztów", desc: "Szacunek w czasie rzeczywistym" },
        { icon: "📊", title: "Porównanie standardów", desc: "Ekonomiczny vs Standard vs Premium" },
        { icon: "📄", title: "Raport PDF", desc: "Profesjonalny kosztorys do pobrania" },
        { icon: "🏗️", title: "Baza cen", desc: "Aktualne ceny materiałów i robocizny" },
      ]} />
      <DemoFooterCTA accentColor={C.amber} bgColor={C.navy} />
    </PreviewShell>
  );
}

function CalculatorPage() {
  const [buildType, setBuildType] = useState(0);
  const [area, setArea] = useState(120);
  const [quality, setQuality] = useState<QualityLevel>("mid");
  const [floors, setFloors] = useState(1);
  const [garage, setGarage] = useState(false);

  const bt = buildTypes[buildType];
  const basePrice = bt.pricePerSqm[quality] * area;
  const floorMultiplier = floors === 2 ? 1.15 : floors === 3 ? 1.25 : 1;
  const garageAdd = garage ? 45000 : 0;
  const total = Math.round(basePrice * floorMultiplier + garageAdd);

  const pieSegments = costBreakdown.reduce<{ startAngle: number; endAngle: number; color: string; name: string; pct: number }[]>((acc, item) => {
    const lastEnd = acc.length > 0 ? acc[acc.length - 1].endAngle : 0;
    acc.push({ startAngle: lastEnd, endAngle: lastEnd + (item.pct / 100) * 360, color: item.color, name: item.name, pct: item.pct });
    return acc;
  }, []);

  return (
    <div className="p-4 space-y-3">
      <div className="p-4 rounded-xl" style={{ background: `linear-gradient(135deg, ${C.navy}, ${C.dark})` }}>
        <p className="text-[10px] tracking-widest uppercase" style={{ color: C.amber }}>Kalkulator kosztów budowy</p>
        <h2 className="font-bold text-xl text-white mt-1">Ile kosztuje Twój dom?</h2>
        <p className="text-[10px] text-white/50 mt-1">Szacunek w czasie rzeczywistym na podstawie aktualnych cen 2026</p>
      </div>

      <div className="p-4 rounded-xl" style={{ background: C.white, border: `1px solid ${C.light}` }}>
        <span className="text-[10px] font-bold uppercase" style={{ color: C.gray }}>Typ budowy</span>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {buildTypes.map((bt, i) => (
            <button key={i} onClick={() => setBuildType(i)}
              className="p-3 rounded-xl text-left transition-all" style={buildType === i ? { background: C.amber + "15", border: `2px solid ${C.amber}` } : { background: C.light, border: "2px solid transparent" }}>
              <span className="text-lg">{bt.icon}</span>
              <span className="text-[10px] font-bold block mt-1" style={{ color: C.navy }}>{bt.name}</span>
              <span className="text-[8px]" style={{ color: C.gray }}>{bt.desc}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 rounded-xl" style={{ background: C.white, border: `1px solid ${C.light}` }}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold uppercase" style={{ color: C.gray }}>Powierzchnia</span>
          <span className="font-bold text-sm" style={{ color: C.navy }}>{area} m²</span>
        </div>
        <input type="range" min={50} max={400} value={area} onChange={e => setArea(Number(e.target.value))}
          className="w-full h-2 rounded-full appearance-none cursor-pointer" style={{ background: `linear-gradient(to right, ${C.amber} ${((area - 50) / 350) * 100}%, ${C.light} 0)` }} />
        <div className="flex justify-between text-[8px] mt-1" style={{ color: C.gray }}>
          <span>50 m²</span><span>400 m²</span>
        </div>
      </div>

      <div className="p-4 rounded-xl" style={{ background: C.white, border: `1px solid ${C.light}` }}>
        <span className="text-[10px] font-bold uppercase" style={{ color: C.gray }}>Standard wykończenia</span>
        <div className="flex gap-2 mt-2">
          {(["low", "mid", "high"] as QualityLevel[]).map(q => {
            const ql = qualityLabels[q];
            return (
              <button key={q} onClick={() => setQuality(q)} className="flex-1 p-2.5 rounded-xl text-center transition-all"
                style={quality === q ? { background: ql.color + "15", border: `2px solid ${ql.color}` } : { background: C.light, border: "2px solid transparent" }}>
                <span className="text-[10px] font-bold block" style={{ color: ql.color }}>{ql.label}</span>
                <span className="text-[8px] block mt-0.5" style={{ color: C.gray }}>{bt.pricePerSqm[q]} zł/m²</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="p-3 rounded-xl" style={{ background: C.white, border: `1px solid ${C.light}` }}>
          <span className="text-[10px] font-bold block" style={{ color: C.gray }}>Kondygnacje</span>
          <div className="flex gap-1 mt-1.5">
            {[1, 2, 3].map(f => (
              <button key={f} onClick={() => setFloors(f)} className="w-8 h-8 rounded-lg text-[10px] font-bold"
                style={floors === f ? { background: C.blue, color: C.white } : { background: C.light, color: C.gray }}>{f}</button>
            ))}
          </div>
        </div>
        <div className="p-3 rounded-xl" style={{ background: C.white, border: `1px solid ${C.light}` }}>
          <span className="text-[10px] font-bold block" style={{ color: C.gray }}>Garaż</span>
          <label className="flex items-center gap-2 mt-2 cursor-pointer">
            <input type="checkbox" checked={garage} onChange={() => setGarage(!garage)} className="accent-blue-600 w-3.5 h-3.5" />
            <span className="text-[10px]" style={{ color: C.navy }}>Dwustanowiskowy (+45 000 zł)</span>
          </label>
        </div>
      </div>

      <div className="p-5 rounded-xl text-center" style={{ background: `linear-gradient(135deg, ${C.navy}, ${C.dark})` }}>
        <p className="text-[9px] tracking-widest uppercase text-white/40">Szacunkowy koszt budowy</p>
        <motion.p key={total} initial={{ scale: 0.9 }} animate={{ scale: 1 }}
          className="font-bold text-3xl mt-1" style={{ color: C.amber }}>{total.toLocaleString("pl-PL")} zł</motion.p>
        <p className="text-[9px] text-white/40 mt-1">{Math.round(total / area).toLocaleString("pl-PL")} zł/m² · {buildTypes[buildType].name} · {qualityLabels[quality].label}</p>
      </div>

      <div className="p-4 rounded-xl" style={{ background: C.white, border: `1px solid ${C.light}` }}>
        <span className="text-[10px] font-bold uppercase" style={{ color: C.gray }}>Rozkład kosztów</span>
        <div className="flex items-center gap-4 mt-3">
          <svg viewBox="0 0 120 120" className="w-24 h-24 shrink-0">
            {pieSegments.map((seg, i) => {
              const r = 50;
              const startRad = (seg.startAngle - 90) * (Math.PI / 180);
              const endRad = (seg.endAngle - 90) * (Math.PI / 180);
              const largeArc = seg.endAngle - seg.startAngle > 180 ? 1 : 0;
              const x1 = 60 + r * Math.cos(startRad);
              const y1 = 60 + r * Math.sin(startRad);
              const x2 = 60 + r * Math.cos(endRad);
              const y2 = 60 + r * Math.sin(endRad);
              return <path key={i} d={`M60,60 L${x1},${y1} A${r},${r} 0 ${largeArc},1 ${x2},${y2} Z`} fill={seg.color} opacity={0.85} />;
            })}
            <circle cx="60" cy="60" r="25" fill={C.white} />
            <text x="60" y="58" textAnchor="middle" fontSize="8" fontWeight="bold" fill={C.navy}>RAZEM</text>
            <text x="60" y="68" textAnchor="middle" fontSize="6" fill={C.gray}>100%</text>
          </svg>
          <div className="flex-1 space-y-1">
            {costBreakdown.map((c, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: c.color }} />
                <span className="text-[9px] flex-1" style={{ color: C.navy }}>{c.name}</span>
                <span className="text-[9px] font-bold" style={{ color: C.navy }}>{c.pct}%</span>
                <span className="text-[8px]" style={{ color: C.gray }}>{Math.round(total * c.pct / 100).toLocaleString("pl-PL")} zł</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ComparisonPage() {
  const area = 120;
  return (
    <div className="p-4 space-y-3">
      <h3 className="font-bold text-sm" style={{ color: C.navy }}>Porównanie standardów wykończenia</h3>
      <p className="text-[10px]" style={{ color: C.gray }}>Dla domu jednorodzinnego {area} m²</p>

      <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${C.light}` }}>
        <table className="w-full text-[10px]">
          <thead>
            <tr style={{ background: C.navy }}>
              <th className="px-3 py-2.5 text-left font-bold text-white">Element</th>
              <th className="px-3 py-2.5 text-center font-bold" style={{ color: C.teal }}>Ekonomiczny</th>
              <th className="px-3 py-2.5 text-center font-bold" style={{ color: C.blue }}>Standard</th>
              <th className="px-3 py-2.5 text-center font-bold" style={{ color: C.violet }}>Premium</th>
            </tr>
          </thead>
          <tbody>
            {[
              { el: "Okna", low: "PCV standard", mid: "PCV 3-szybowe", high: "Aluminium Schüco" },
              { el: "Podłogi", low: "Panele laminowane", mid: "Deska barlinecka", high: "Deska dębowa lita" },
              { el: "Łazienka", low: "Cersanit / Koło", mid: "Roca / Grohe", high: "Villeroy & Boch / Hansgrohe" },
              { el: "Kuchnia", low: "IKEA modułowa", mid: "Na wymiar MDF", high: "Na wymiar lakier premium" },
              { el: "Ogrzewanie", low: "Gaz kondensacyjny", mid: "Pompa ciepła", high: "Pompa ciepła + rekuperacja" },
              { el: "Elewacja", low: "Tynk silikonowy", mid: "Tynk + klinkier", high: "Kamień naturalny" },
              { el: "Cena / m²", low: "4 200 zł", mid: "5 800 zł", high: "7 500 zł" },
              { el: "Łącznie", low: `${(4200 * area).toLocaleString("pl-PL")} zł`, mid: `${(5800 * area).toLocaleString("pl-PL")} zł`, high: `${(7500 * area).toLocaleString("pl-PL")} zł` },
            ].map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? C.white : C.light, borderBottom: `1px solid ${C.light}` }}>
                <td className="px-3 py-2 font-semibold" style={{ color: C.navy }}>{row.el}</td>
                <td className="px-3 py-2 text-center" style={{ color: row.el === "Łącznie" ? C.teal : C.graphite }}>{row.low}</td>
                <td className="px-3 py-2 text-center" style={{ color: row.el === "Łącznie" ? C.blue : C.graphite }}>{row.mid}</td>
                <td className="px-3 py-2 text-center" style={{ color: row.el === "Łącznie" ? C.violet : C.graphite }}>{row.high}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {(["low", "mid", "high"] as QualityLevel[]).map(q => {
          const ql = qualityLabels[q];
          const bt = buildTypes[0];
          return (
            <div key={q} className="p-3 rounded-xl text-center" style={{ background: ql.color + "08", border: `1px solid ${ql.color}20` }}>
              <span className="text-[10px] font-bold block" style={{ color: ql.color }}>{ql.label}</span>
              <span className="font-bold text-sm block mt-1" style={{ color: C.navy }}>{(bt.pricePerSqm[q] * area).toLocaleString("pl-PL")} zł</span>
              <span className="text-[8px]" style={{ color: C.gray }}>{bt.pricePerSqm[q]} zł/m²</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ReportPage() {
  const [generated, setGenerated] = useState(false);
  if (generated) return (
    <div className="p-4 text-center py-12">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
        <CheckCircle2 className="w-14 h-14 mx-auto" style={{ color: C.green }} />
      </motion.div>
      <h3 className="font-bold text-lg mt-3" style={{ color: C.navy }}>Raport wygenerowany!</h3>
      <p className="text-xs mt-1" style={{ color: C.gray }}>Kosztorys_BudzetBud_2026.pdf</p>
      <motion.button whileHover={{ scale: 1.03 }} className="mt-4 px-6 py-2.5 rounded-xl text-xs font-bold text-white inline-flex items-center gap-2" style={{ background: C.blue }}>
        <Download className="w-3.5 h-3.5" /> Pobierz PDF
      </motion.button>
    </div>
  );
  return (
    <div className="p-4 space-y-3">
      <h3 className="font-bold text-sm" style={{ color: C.navy }}>Generuj raport kosztorysu</h3>
      <div className="p-4 rounded-xl" style={{ background: C.light }}>
        <div className="space-y-2 text-[10px]">
          {[{ l: "Typ budowy", v: "Dom jednorodzinny" }, { l: "Powierzchnia", v: "120 m²" }, { l: "Standard", v: "Standard (5 800 zł/m²)" }, { l: "Szacunkowy koszt", v: "696 000 zł" }].map((r, i) => (
            <div key={i} className="flex justify-between">
              <span style={{ color: C.gray }}>{r.l}</span>
              <span className="font-semibold" style={{ color: C.navy }}>{r.v}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="p-4 rounded-xl" style={{ background: C.white, border: `1px solid ${C.light}` }}>
        <span className="text-[10px] font-bold block" style={{ color: C.gray }}>Raport zawiera:</span>
        <div className="space-y-1.5 mt-2">
          {["Szczegółowy kosztorys ze wszystkimi pozycjami", "Rozkład kosztów w formie wykresów", "Porównanie standardów wykończenia", "Harmonogram prac budowlanych", "Lista rekomendowanych materiałów"].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <CheckCircle2 className="w-3 h-3 shrink-0" style={{ color: C.green }} />
              <span className="text-[10px]" style={{ color: C.navy }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
      <input placeholder="Twój email (opcjonalnie)" className="w-full px-4 py-3 rounded-xl border text-sm" style={{ borderColor: C.light, background: C.white, color: C.navy }} />
      <motion.button whileHover={{ scale: 1.02 }} onClick={() => setGenerated(true)}
        className="w-full py-3 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2" style={{ background: C.amber }}>
        <Download className="w-4 h-4" /> Generuj raport PDF
      </motion.button>
    </div>
  );
}

function ContactPage() {
  const [sent, setSent] = useState(false);
  if (sent) return (
    <div className="p-4 text-center py-12">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
        <CheckCircle2 className="w-14 h-14 mx-auto" style={{ color: C.green }} />
      </motion.div>
      <h3 className="font-bold text-lg mt-3" style={{ color: C.navy }}>Wiadomość wysłana!</h3>
      <p className="text-xs mt-1" style={{ color: C.gray }}>Odpowiemy w ciągu 24 godzin.</p>
    </div>
  );
  return (
    <div className="p-4 space-y-3">
      <h3 className="font-bold text-sm" style={{ color: C.navy }}>Skontaktuj się z ekspertem</h3>
      <p className="text-[10px]" style={{ color: C.gray }}>Nasi specjaliści pomogą doprecyzować kosztorys i doradzą najlepsze rozwiązania.</p>
      <input placeholder="Imię i nazwisko" className="w-full px-4 py-3 rounded-xl border text-sm" style={{ borderColor: C.light, background: C.white, color: C.navy }} />
      <input placeholder="Email" className="w-full px-4 py-3 rounded-xl border text-sm" style={{ borderColor: C.light, background: C.white, color: C.navy }} />
      <input placeholder="Telefon" className="w-full px-4 py-3 rounded-xl border text-sm" style={{ borderColor: C.light, background: C.white, color: C.navy }} />
      <textarea placeholder="Opisz swój projekt..." rows={4} className="w-full px-4 py-3 rounded-xl border text-sm resize-none" style={{ borderColor: C.light, background: C.white, color: C.navy }} />
      <motion.button whileHover={{ scale: 1.02 }} onClick={() => setSent(true)}
        className="w-full py-3 rounded-xl font-bold text-sm text-white" style={{ background: C.navy }}>Wyślij zapytanie</motion.button>
    </div>
  );
}
