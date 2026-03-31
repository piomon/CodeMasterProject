import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PreviewShell, DemoFooterCTA, DemoBenefits } from "./PreviewShell";
import { RotateCw, ChevronRight, Layers, Palette, Ruler, ShoppingCart, CheckCircle2, Eye, Package, Download, Plus, Minus, Star } from "lucide-react";

const C = { oak: "#C4A882", anthracite: "#2C2C2C", greige: "#A8A08C", stone: "#E8E2D8", white: "#FFFFFF", dark: "#1A1A1A", warm: "#F5F0EB", forest: "#3D5A3C", cream: "#FAF7F2" };

const materialGroups = [
  { name: "Korpus", options: [
    { name: "Dąb naturalny", color: "#C4A882", price: 0 },
    { name: "Orzech włoski", color: "#5C4033", price: 400 },
    { name: "Biały mat", color: "#F0F0F0", price: 200 },
    { name: "Antracyt", color: "#3A3A3A", price: 300 },
  ]},
  { name: "Blat", options: [
    { name: "Kamień naturalny", color: "#B8B0A4", price: 0 },
    { name: "Konglomerat biały", color: "#EEEEE8", price: 800 },
    { name: "Drewno dębowe", color: "#D4B68C", price: 600 },
    { name: "HPL czarny mat", color: "#2A2A2A", price: 500 },
  ]},
  { name: "Uchwyty", options: [
    { name: "Złoty mat", color: "#C9A96E", price: 0 },
    { name: "Czarny mat", color: "#1A1A1A", price: 150 },
    { name: "Stal szczotkowana", color: "#A0A0A0", price: 200 },
    { name: "Bezuchwytowe", color: "transparent", price: 350 },
  ]},
];

const modules = [
  { name: "Szafka dolna 60cm", code: "SD-60", basePrice: 890, icon: "📦" },
  { name: "Szafka z szufladami 80cm", code: "SZ-80", basePrice: 1290, icon: "🗄️" },
  { name: "Szafka narożna 90cm", code: "SN-90", basePrice: 1490, icon: "📐" },
  { name: "Szafka górna 60cm", code: "SG-60", basePrice: 690, icon: "🔲" },
  { name: "Słupek wysoki 60cm", code: "SW-60", basePrice: 2190, icon: "📏" },
  { name: "Cargo 30cm", code: "CA-30", basePrice: 1890, icon: "🧺" },
];

const agd = [
  { name: "Płyta indukcyjna 60cm", brand: "Bosch", price: 2490, icon: "🔥" },
  { name: "Piekarnik parowy", brand: "Siemens", price: 4890, icon: "🍞" },
  { name: "Zmywarka zintegrowana", brand: "Bosch", price: 3290, icon: "🫧" },
  { name: "Lodówka side-by-side", brand: "Samsung", price: 5490, icon: "❄️" },
  { name: "Okap teleskopowy", brand: "Faber", price: 1890, icon: "💨" },
];

const realizations = [
  { name: "Apartament Mokotów", style: "Minimalistyczny dąb + biały", area: "14 m²", rating: 5.0, value: "38K zł" },
  { name: "Dom Wilanów", style: "Orzech + kamień naturalny", area: "22 m²", rating: 4.9, value: "62K zł" },
  { name: "Loft Praga", style: "Antracyt + drewno", area: "12 m²", rating: 5.0, value: "42K zł" },
];

export function ConfiguratorDemo({ name }: { name: string; features: string[]; industry?: string }) {
  const [page, setPage] = useState("home");
  const [selections, setSelections] = useState([0, 0, 0]);
  const [selectedModules, setSelectedModules] = useState([0, 0, 0, 0, 0, 0]);
  const [selectedAgd, setSelectedAgd] = useState<boolean[]>(new Array(agd.length).fill(false));

  const materialCost = materialGroups.reduce((a, g, i) => a + g.options[selections[i]].price, 0);
  const moduleCost = modules.reduce((a, m, i) => a + m.basePrice * selectedModules[i], 0);
  const agdCost = agd.reduce((a, item, i) => a + (selectedAgd[i] ? item.price : 0), 0);
  const totalPrice = materialCost + moduleCost + agdCost;

  const topNav = [
    { id: "home", label: "Start" },
    { id: "configurator", label: "Konfigurator" },
    { id: "modules", label: "Moduły" },
    { id: "agd", label: "AGD" },
    { id: "summary", label: "Podsumowanie" },
  ];

  return (
    <PreviewShell title={name}>
      <div style={{ background: C.cream, minHeight: 500 }}>
        <div className="px-4 py-2.5 flex items-center justify-between" style={{ background: C.white, borderBottom: `1px solid ${C.stone}` }}>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold" style={{ background: C.dark, color: C.oak }}>F</div>
            <div>
              <span className="font-bold text-xs" style={{ color: C.dark }}>FORM</span><span className="text-xs" style={{ color: C.greige }}> Studio</span>
              <p className="text-[8px]" style={{ color: C.greige }}>Kuchnie na wymiar</p>
            </div>
          </div>
          {totalPrice > 0 && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ background: C.stone }}>
              <ShoppingCart className="w-3 h-3" style={{ color: C.dark }} />
              <span className="text-[10px] font-bold" style={{ color: C.dark }}>{totalPrice.toLocaleString()} zł</span>
            </div>
          )}
        </div>

        <div className="flex gap-0 overflow-x-auto" style={{ background: C.white, borderBottom: `1px solid ${C.stone}` }}>
          {topNav.map((n, i) => (
            <button key={n.id} onClick={() => setPage(n.id)}
              className="flex items-center gap-1 px-3 py-2 text-[10px] font-semibold whitespace-nowrap border-b-2 transition-all"
              style={page === n.id ? { borderColor: C.dark, color: C.dark } : { borderColor: "transparent", color: C.greige }}>
              <span className="text-[10px]">{i + 1}.</span> {n.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={page} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            {page === "home" && <HomePage onNav={setPage} />}
            {page === "configurator" && <ConfiguratorPage selections={selections} setSelections={setSelections} />}
            {page === "modules" && <ModulesPage mods={selectedModules} setMods={setSelectedModules} />}
            {page === "agd" && <AgdPage selected={selectedAgd} setSelected={setSelectedAgd} />}
            {page === "summary" && <SummaryPage selections={selections} mods={selectedModules} agdSel={selectedAgd} total={totalPrice} />}
          </motion.div>
        </AnimatePresence>
      </div>
      <DemoBenefits accentColor={C.oak} bgColor={C.warm} textColor={C.dark} benefits={[
        { icon: "🎨", title: "Wizualny konfigurator", desc: "Klient widzi efekt zanim zamówi" },
        { icon: "💰", title: "Automatyczna wycena", desc: "Natychmiastowa kalkulacja ceny" },
        { icon: "📦", title: "Modułowa budowa", desc: "Dopasowanie do każdego metrażu" },
        { icon: "📊", title: "Analiza konwersji", desc: "Statystyki popularnych konfiguracji" },
      ]} />
      <DemoFooterCTA accentColor={C.oak} bgColor={C.dark} />
    </PreviewShell>
  );
}

function HomePage({ onNav }: { onNav: (p: string) => void }) {
  return (
    <div>
      <div className="relative overflow-hidden py-10 px-5" style={{ background: `linear-gradient(135deg, ${C.dark}, ${C.anthracite})` }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `repeating-linear-gradient(45deg, ${C.oak} 0, ${C.oak} 1px, transparent 1px, transparent 30px)` }} />
        <div className="relative">
          <p className="text-[9px] tracking-[0.4em] uppercase" style={{ color: C.oak }}>Projektuj swoją wymarzoną kuchnię</p>
          <h1 className="font-display font-bold text-2xl mt-2" style={{ color: C.white }}>Konfigurator<br /><span style={{ color: C.oak }}>mebli kuchennych</span></h1>
          <p className="text-xs mt-2 leading-relaxed max-w-[250px]" style={{ color: C.white + "70" }}>Dobierz materiały, moduły i sprzęt AGD. Otrzymaj natychmiastową wycenę.</p>
          <motion.button whileHover={{ scale: 1.03 }} onClick={() => onNav("configurator")}
            className="mt-5 px-6 py-3 rounded-lg font-bold text-sm inline-flex items-center gap-2" style={{ background: C.oak, color: C.dark }}>
            <Layers className="w-4 h-4" /> Rozpocznij konfigurację
          </motion.button>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        <div className="grid grid-cols-3 gap-2">
          {[
            { icon: <Palette className="w-4 h-4" />, label: "50+ wykończeń" },
            { icon: <Package className="w-4 h-4" />, label: "Moduły 30-90cm" },
            { icon: <Ruler className="w-4 h-4" />, label: "Na wymiar" },
          ].map((f, i) => (
            <div key={i} className="p-3 rounded-xl text-center" style={{ background: C.white, boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
              <span style={{ color: C.oak }}>{f.icon}</span>
              <span className="text-[10px] font-semibold block mt-1" style={{ color: C.dark }}>{f.label}</span>
            </div>
          ))}
        </div>

        <div>
          <h3 className="font-bold text-sm mb-2" style={{ color: C.dark }}>Nasze realizacje</h3>
          <div className="space-y-2">
            {realizations.map((r, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: C.white }}>
                <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl" style={{ background: C.stone }}>🏠</div>
                <div className="flex-1">
                  <h4 className="text-xs font-bold" style={{ color: C.dark }}>{r.name}</h4>
                  <p className="text-[10px]" style={{ color: C.greige }}>{r.style} • {r.area}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Star className="w-2.5 h-2.5" style={{ fill: C.oak, color: C.oak }} />
                    <span className="text-[10px] font-bold" style={{ color: C.dark }}>{r.rating}</span>
                    <span className="text-[10px] ml-auto font-bold" style={{ color: C.oak }}>{r.value}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 rounded-xl" style={{ background: C.white }}>
          <span className="text-xs font-bold" style={{ color: C.dark }}>Jak to działa?</span>
          {["Dobierz materiały i kolory", "Wybierz moduły szafek", "Dodaj sprzęt AGD", "Otrzymaj wycenę i zamów pomiar"].map((s, i) => (
            <div key={i} className="flex items-center gap-2 mt-2">
              <div className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold" style={{ background: C.oak, color: C.white }}>{i + 1}</div>
              <span className="text-[11px]" style={{ color: C.dark }}>{s}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ConfiguratorPage({ selections, setSelections }: { selections: number[]; setSelections: (s: number[]) => void }) {
  const corpusColor = materialGroups[0].options[selections[0]].color;
  const topColor = materialGroups[1].options[selections[1]].color;
  const handleColor = materialGroups[2].options[selections[2]].color;

  return (
    <div className="px-4 py-3 space-y-3">
      <h2 className="font-bold text-sm" style={{ color: C.dark }}>Dobierz materiały</h2>

      <div className="p-4 rounded-xl flex items-center justify-center" style={{ background: C.stone, minHeight: 100 }}>
        <div className="flex gap-1">
          {[0, 1, 2].map(i => (
            <div key={i} className="relative" style={{ width: 60, height: 70 }}>
              <div className="absolute inset-0 rounded-lg" style={{ background: corpusColor, border: `1px solid ${C.greige}40` }} />
              <div className="absolute top-0 left-0 right-0 h-2.5 rounded-t-lg" style={{ background: topColor }} />
              {handleColor !== "transparent" && (
                <div className="absolute right-1.5 top-[50%] w-0.5 h-3 rounded-full" style={{ background: handleColor }} />
              )}
            </div>
          ))}
          <div className="relative" style={{ width: 30, height: 70 }}>
            <div className="absolute inset-0 rounded-lg" style={{ background: corpusColor, border: `1px solid ${C.greige}40` }} />
            <div className="absolute top-0 left-0 right-0 h-2.5 rounded-t-lg" style={{ background: topColor }} />
          </div>
        </div>
      </div>

      {materialGroups.map((g, gi) => (
        <div key={gi}>
          <span className="text-xs font-bold" style={{ color: C.dark }}>{g.name}</span>
          <div className="grid grid-cols-4 gap-2 mt-1.5">
            {g.options.map((o, oi) => (
              <button key={oi} onClick={() => { const s = [...selections]; s[gi] = oi; setSelections(s); }}
                className="p-2 rounded-xl text-center" style={selections[gi] === oi ? { border: `2px solid ${C.dark}`, background: C.white } : { border: `1px solid ${C.stone}`, background: C.white }}>
                <div className="w-6 h-6 rounded-full mx-auto mb-1" style={o.color === "transparent" ? { border: "2px dashed " + C.greige } : { background: o.color }} />
                <span className="text-[9px] font-medium block" style={{ color: C.dark }}>{o.name}</span>
                {o.price > 0 && <span className="text-[8px]" style={{ color: C.oak }}>+{o.price} zł</span>}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ModulesPage({ mods, setMods }: { mods: number[]; setMods: (m: number[]) => void }) {
  return (
    <div className="px-4 py-3 space-y-2">
      <h2 className="font-bold text-sm" style={{ color: C.dark }}>Wybierz moduły</h2>
      {modules.map((m, i) => (
        <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: C.white }}>
          <span className="text-xl">{m.icon}</span>
          <div className="flex-1">
            <h4 className="text-xs font-bold" style={{ color: C.dark }}>{m.name}</h4>
            <span className="text-[10px]" style={{ color: C.greige }}>Kod: {m.code} • {m.basePrice} zł/szt</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button onClick={() => { const n = [...mods]; n[i] = Math.max(0, n[i] - 1); setMods(n); }}
              className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: C.stone }}><Minus className="w-3 h-3" /></button>
            <span className="font-bold text-sm w-5 text-center" style={{ color: C.dark }}>{mods[i]}</span>
            <button onClick={() => { const n = [...mods]; n[i]++; setMods(n); }}
              className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: C.oak, color: C.white }}><Plus className="w-3 h-3" /></button>
          </div>
        </div>
      ))}
    </div>
  );
}

function AgdPage({ selected, setSelected }: { selected: boolean[]; setSelected: (s: boolean[]) => void }) {
  return (
    <div className="px-4 py-3 space-y-2">
      <h2 className="font-bold text-sm" style={{ color: C.dark }}>Sprzęt AGD</h2>
      {agd.map((a, i) => (
        <label key={i} className="flex items-center gap-3 p-3.5 rounded-xl cursor-pointer" style={{ background: selected[i] ? C.oak + "10" : C.white, border: `1px solid ${selected[i] ? C.oak : C.stone}` }}>
          <input type="checkbox" checked={selected[i]} onChange={() => { const n = [...selected]; n[i] = !n[i]; setSelected(n); }} className="w-4 h-4 accent-amber-700" />
          <span className="text-xl">{a.icon}</span>
          <div className="flex-1">
            <h4 className="text-xs font-bold" style={{ color: C.dark }}>{a.name}</h4>
            <span className="text-[10px]" style={{ color: C.greige }}>{a.brand}</span>
          </div>
          <span className="font-bold text-sm" style={{ color: C.oak }}>{a.price.toLocaleString()} zł</span>
        </label>
      ))}
    </div>
  );
}

function SummaryPage({ selections, mods, agdSel, total }: { selections: number[]; mods: number[]; agdSel: boolean[]; total: number }) {
  const [sent, setSent] = useState(false);
  if (sent) {
    return (
      <div className="px-4 py-10 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
          <div className="w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ background: C.forest + "20" }}>
            <CheckCircle2 className="w-7 h-7" style={{ color: C.forest }} />
          </div>
        </motion.div>
        <h3 className="font-bold text-lg" style={{ color: C.dark }}>Konfiguracja wysłana!</h3>
        <p className="text-xs mt-1" style={{ color: C.greige }}>Nr konfiguracji:</p>
        <p className="font-mono font-bold text-sm" style={{ color: C.oak }}>FORM-{Math.floor(Math.random() * 9000 + 1000)}</p>
        <p className="text-[10px] mt-2 max-w-[220px] mx-auto" style={{ color: C.greige }}>Skontaktujemy się w ciągu 24h z dokładną wyceną i terminem pomiaru.</p>
      </div>
    );
  }

  return (
    <div className="px-4 py-3 space-y-3">
      <h2 className="font-bold text-sm" style={{ color: C.dark }}>Podsumowanie konfiguracji</h2>
      <div className="p-4 rounded-xl space-y-2" style={{ background: C.white }}>
        <span className="text-[10px] uppercase tracking-wider" style={{ color: C.greige }}>Materiały</span>
        {materialGroups.map((g, i) => (
          <div key={i} className="flex items-center justify-between text-xs">
            <span style={{ color: C.dark }}>{g.name}: <strong>{g.options[selections[i]].name}</strong></span>
            {g.options[selections[i]].price > 0 && <span style={{ color: C.oak }}>+{g.options[selections[i]].price} zł</span>}
          </div>
        ))}
      </div>
      <div className="p-4 rounded-xl space-y-2" style={{ background: C.white }}>
        <span className="text-[10px] uppercase tracking-wider" style={{ color: C.greige }}>Moduły</span>
        {modules.map((m, i) => mods[i] > 0 && (
          <div key={i} className="flex items-center justify-between text-xs">
            <span style={{ color: C.dark }}>{m.name} ×{mods[i]}</span>
            <span style={{ color: C.oak }}>{(m.basePrice * mods[i]).toLocaleString()} zł</span>
          </div>
        ))}
        {mods.every(m => m === 0) && <span className="text-[10px]" style={{ color: C.greige }}>Nie wybrano modułów</span>}
      </div>
      <div className="p-4 rounded-xl space-y-2" style={{ background: C.white }}>
        <span className="text-[10px] uppercase tracking-wider" style={{ color: C.greige }}>Sprzęt AGD</span>
        {agd.map((a, i) => agdSel[i] && (
          <div key={i} className="flex items-center justify-between text-xs">
            <span style={{ color: C.dark }}>{a.name}</span>
            <span style={{ color: C.oak }}>{a.price.toLocaleString()} zł</span>
          </div>
        ))}
        {agdSel.every(s => !s) && <span className="text-[10px]" style={{ color: C.greige }}>Nie wybrano AGD</span>}
      </div>
      <div className="p-4 rounded-xl" style={{ background: C.dark }}>
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold" style={{ color: C.white }}>Szacowana cena</span>
          <span className="font-bold text-xl" style={{ color: C.oak }}>{total.toLocaleString()} zł</span>
        </div>
        <p className="text-[9px] mt-1" style={{ color: C.greige }}>Cena orientacyjna. Ostateczna wycena po pomiarze.</p>
      </div>
      <input placeholder="Imię i nazwisko" className="w-full px-4 py-3 rounded-xl text-sm" style={{ background: C.white, border: `1px solid ${C.stone}`, color: C.dark }} />
      <input placeholder="Telefon lub email" className="w-full px-4 py-3 rounded-xl text-sm" style={{ background: C.white, border: `1px solid ${C.stone}`, color: C.dark }} />
      <motion.button whileHover={{ scale: 1.02 }} onClick={() => setSent(true)}
        className="w-full py-3.5 rounded-xl font-bold text-sm text-white" style={{ background: C.oak }}>Wyślij konfigurację i zamów pomiar</motion.button>
    </div>
  );
}
