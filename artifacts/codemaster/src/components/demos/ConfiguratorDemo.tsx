import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PreviewShell, DemoFooterCTA, DemoBenefits } from "./PreviewShell";
import { Layers, Palette, Ruler, Plus, Minus, CheckCircle2, Download, ChevronRight, Save, Eye } from "lucide-react";

const C = { oak: "#DEB887", walnut: "#5C4033", anthracite: "#333333", white: "#FFFFFF", dark: "#1A1A1A", warm: "#F5F0EB", stone: "#E8E2D8", cream: "#FAF7F2", greige: "#A8A08C", forest: "#3D5A3C" };

type SectionType = "hanging" | "shelves" | "drawers" | "mixed";

const closetMaterials = [
  { group: "Korpus", options: [
    { name: "Dąb naturalny", color: "#DEB887", price: 0 },
    { name: "Orzech włoski", color: "#5C4033", price: 400 },
    { name: "Biały mat", color: "#F0F0F0", price: 200 },
    { name: "Antracyt", color: "#3A3A3A", price: 300 },
  ]},
  { group: "Uchwyty", options: [
    { name: "Złoty mat", color: "#C9A96E", price: 0 },
    { name: "Czarny mat", color: "#1A1A1A", price: 150 },
    { name: "Stal szczotkowana", color: "#A0A0A0", price: 200 },
    { name: "Bezuchwytowe", color: "transparent", price: 350 },
  ]},
];

const closetSections: { id: SectionType; name: string; icon: string; desc: string }[] = [
  { id: "hanging", name: "Drążek", icon: "👔", desc: "Wieszak na ubrania" },
  { id: "shelves", name: "Półki", icon: "📚", desc: "3 regulowane półki" },
  { id: "drawers", name: "Szuflady", icon: "🗄️", desc: "4 szuflady cargo" },
  { id: "mixed", name: "Mix", icon: "📦", desc: "Półki + drążek" },
];

const kitchenModules = [
  { name: "Szafka dolna 60cm", code: "SD-60", basePrice: 890, icon: "📦" },
  { name: "Szuflady cargo 80cm", code: "SZ-80", basePrice: 1290, icon: "🗄️" },
  { name: "Szafka narożna 90cm", code: "SN-90", basePrice: 1490, icon: "📐" },
  { name: "Szafka górna 60cm", code: "SG-60", basePrice: 690, icon: "🔲" },
  { name: "Słupek wysoki", code: "SW-60", basePrice: 2190, icon: "📏" },
  { name: "Cargo 30cm", code: "CA-30", basePrice: 1890, icon: "🧺" },
];

const kitchenMaterials = [
  { group: "Fronty", options: [
    { name: "Dąb naturalny", color: "#DEB887", price: 0 },
    { name: "Biały mat", color: "#F0F0F0", price: 200 },
    { name: "Szary mat", color: "#808080", price: 300 },
    { name: "Orzech", color: "#5C4033", price: 400 },
  ]},
  { group: "Blat", options: [
    { name: "Kamień naturalny", color: "#B8B0A4", price: 0 },
    { name: "Konglomerat biały", color: "#EEEEE8", price: 800 },
    { name: "Drewno dębowe", color: "#D4B68C", price: 600 },
    { name: "HPL czarny mat", color: "#2A2A2A", price: 500 },
  ]},
  { group: "Uchwyty", options: [
    { name: "Złoty mat", color: "#C9A96E", price: 0 },
    { name: "Czarny mat", color: "#1A1A1A", price: 150 },
    { name: "Stal szczotkowana", color: "#A0A0A0", price: 200 },
    { name: "Bezuchwytowe", color: "transparent", price: 350 },
  ]},
];

const agd = [
  { name: "Płyta indukcyjna 60cm", brand: "Bosch", price: 2490, icon: "🔥" },
  { name: "Piekarnik parowy", brand: "Siemens", price: 4890, icon: "🍞" },
  { name: "Zmywarka zintegr.", brand: "Bosch", price: 3290, icon: "🫧" },
  { name: "Lodówka side-by-side", brand: "Samsung", price: 5490, icon: "❄️" },
  { name: "Okap teleskopowy", brand: "Faber", price: 1890, icon: "💨" },
];

export function ConfiguratorDemo({ name, industry }: { name: string; features: string[]; industry?: string }) {
  const isKitchen = industry?.toLowerCase() === "kitchen" || name.toLowerCase().includes("kuchni");
  if (isKitchen) return <KitchenConfigurator name={name} />;
  return <ClosetConfigurator name={name} />;
}

type ClosetStep = "config" | "sections" | "materials" | "summary";

function ClosetConfigurator({ name }: { name: string }) {
  const [step, setStep] = useState<ClosetStep>("config");
  const [width, setWidth] = useState(240);
  const [height, setHeight] = useState(250);
  const [sections, setSections] = useState<SectionType[]>(["hanging", "shelves", "drawers"]);
  const [matSel, setMatSel] = useState([0, 0]);
  const [sent, setSent] = useState(false);

  const basePrice = Math.round(width * height * 0.032);
  const matCost = closetMaterials.reduce((a, g, i) => a + g.options[matSel[i]].price, 0);
  const sectionCost = sections.length * 350;
  const total = basePrice + matCost + sectionCost;
  const corpusColor = closetMaterials[0].options[matSel[0]].color;
  const handleColor = closetMaterials[1].options[matSel[1]].color;

  const steps = [
    { id: "config", label: "1. Wymiary" },
    { id: "sections", label: "2. Sekcje" },
    { id: "materials", label: "3. Materiały" },
    { id: "summary", label: "4. Podsumowanie" },
  ];

  return (
    <PreviewShell title={name}>
      <div style={{ background: C.cream, minHeight: 520 }}>
        <div className="px-4 py-2 flex items-center justify-between" style={{ background: C.white, borderBottom: `1px solid ${C.stone}` }}>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded flex items-center justify-center text-sm font-bold" style={{ background: C.dark, color: C.oak }}>F</div>
            <span className="font-bold text-xs" style={{ color: C.dark }}>FORM</span>
            <span className="text-xs" style={{ color: C.greige }}>Studio</span>
          </div>
          <div className="flex items-center gap-1 text-[9px]" style={{ color: C.greige }}>
            <span>Projekt</span> <ChevronRight className="w-3 h-3" /> <span>Szafa</span> <ChevronRight className="w-3 h-3" /> <span style={{ color: C.dark }}>Konfiguracja</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button className="flex items-center gap-1 px-2 py-1 rounded text-[9px] font-semibold" style={{ background: C.stone, color: C.dark }}><Save className="w-3 h-3" />Zapisz</button>
            <button className="flex items-center gap-1 px-2 py-1 rounded text-[9px] font-semibold" style={{ background: C.oak, color: C.white }}><Download className="w-3 h-3" />PDF</button>
          </div>
        </div>

        <div className="flex gap-0 border-b" style={{ borderColor: C.stone, background: C.white }}>
          {steps.map(s => (
            <button key={s.id} onClick={() => setStep(s.id)} className="flex-1 py-2 text-[10px] font-semibold border-b-2"
              style={step === s.id ? { borderColor: C.dark, color: C.dark } : { borderColor: "transparent", color: C.greige }}>{s.label}</button>
          ))}
        </div>

        <div className="flex">
          <div className="flex-[7] p-4 flex items-center justify-center" style={{ background: C.stone + "60", minHeight: 280 }}>
            <div className="relative" style={{ width: Math.min(width * 0.7, 220), height: Math.min(height * 0.7, 200) }}>
              <div className="absolute inset-0 rounded-lg shadow-lg" style={{ background: corpusColor, border: `2px solid ${C.greige}40` }}>
                <div className="absolute top-0 left-0 right-0 h-2 rounded-t-lg" style={{ background: corpusColor }} />
                <div className="flex h-full pt-3 gap-0.5 px-1 pb-1">
                  {sections.map((s, i) => (
                    <div key={i} className="flex-1 rounded-sm flex flex-col justify-between p-1" style={{ background: `${corpusColor}cc`, border: `1px solid ${C.greige}30` }}>
                      {s === "hanging" && (
                        <>
                          <div className="h-0.5 rounded mx-1 mt-2" style={{ background: handleColor === "transparent" ? C.greige : handleColor }} />
                          <div className="flex-1" />
                        </>
                      )}
                      {s === "shelves" && (
                        <>
                          {[0, 1, 2].map(j => <div key={j} className="h-px mx-0.5" style={{ background: C.greige + "60" }} />)}
                        </>
                      )}
                      {s === "drawers" && (
                        <>
                          {[0, 1, 2, 3].map(j => (
                            <div key={j} className="rounded-sm flex items-center justify-end pr-1" style={{ background: `${corpusColor}90`, border: `0.5px solid ${C.greige}30`, height: "20%" }}>
                              {handleColor !== "transparent" && <div className="w-2 h-0.5 rounded-full" style={{ background: handleColor }} />}
                            </div>
                          ))}
                        </>
                      )}
                      {s === "mixed" && (
                        <>
                          <div className="h-0.5 rounded mx-1 mt-1" style={{ background: handleColor === "transparent" ? C.greige : handleColor }} />
                          <div className="flex-1" />
                          <div className="h-px mx-0.5" style={{ background: C.greige + "60" }} />
                          <div className="h-px mx-0.5" style={{ background: C.greige + "60" }} />
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-5 left-0 right-0 text-center text-[9px] font-semibold" style={{ color: C.dark }}>{width} × {height} cm</div>
            </div>
          </div>

          <div className="flex-[3] p-3 space-y-3 border-l" style={{ borderColor: C.stone, background: C.white }}>
            <AnimatePresence mode="wait">
              <motion.div key={step} initial={{ opacity: 0, x: 5 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
                {step === "config" && (
                  <div className="space-y-3">
                    <span className="text-[10px] font-bold" style={{ color: C.dark }}>Wymiary szafy</span>
                    <div>
                      <div className="flex justify-between text-[9px]">
                        <span style={{ color: C.greige }}>Szerokość</span>
                        <span className="font-bold" style={{ color: C.dark }}>{width} cm</span>
                      </div>
                      <input type="range" min={120} max={360} value={width} onChange={e => setWidth(Number(e.target.value))} className="w-full accent-amber-700 h-1" />
                    </div>
                    <div>
                      <div className="flex justify-between text-[9px]">
                        <span style={{ color: C.greige }}>Wysokość</span>
                        <span className="font-bold" style={{ color: C.dark }}>{height} cm</span>
                      </div>
                      <input type="range" min={200} max={280} value={height} onChange={e => setHeight(Number(e.target.value))} className="w-full accent-amber-700 h-1" />
                    </div>
                    <div className="pt-2 border-t" style={{ borderColor: C.stone }}>
                      <div className="flex justify-between text-[10px]">
                        <span style={{ color: C.greige }}>Cena bazowa</span>
                        <span className="font-bold" style={{ color: C.oak }}>{basePrice.toLocaleString()} zł</span>
                      </div>
                    </div>
                  </div>
                )}
                {step === "sections" && (
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold" style={{ color: C.dark }}>Sekcje ({sections.length})</span>
                    {sections.map((s, i) => {
                      const sec = closetSections.find(cs => cs.id === s);
                      return (
                        <div key={i} className="flex items-center gap-2 p-2 rounded-lg" style={{ background: C.cream }}>
                          <span className="text-sm">{sec?.icon}</span>
                          <div className="flex-1">
                            <span className="text-[10px] font-bold" style={{ color: C.dark }}>{sec?.name}</span>
                            <span className="text-[8px] block" style={{ color: C.greige }}>{sec?.desc}</span>
                          </div>
                          <select value={s} onChange={e => { const n = [...sections]; n[i] = e.target.value as SectionType; setSections(n); }} className="text-[9px] rounded px-1.5 py-1 bg-white border" style={{ borderColor: C.stone, color: C.dark }}>
                            {closetSections.map(cs => <option key={cs.id} value={cs.id}>{cs.name}</option>)}
                          </select>
                        </div>
                      );
                    })}
                    <div className="flex gap-1">
                      <button onClick={() => sections.length < 5 && setSections([...sections, "shelves" as SectionType])} className="flex-1 py-1.5 rounded text-[9px] font-bold" style={{ background: C.oak, color: C.white }}>
                        <Plus className="w-3 h-3 inline" /> Dodaj
                      </button>
                      <button onClick={() => sections.length > 1 && setSections(sections.slice(0, -1))} className="flex-1 py-1.5 rounded text-[9px] font-bold" style={{ background: C.stone, color: C.dark }}>
                        <Minus className="w-3 h-3 inline" /> Usuń
                      </button>
                    </div>
                  </div>
                )}
                {step === "materials" && (
                  <div className="space-y-3">
                    {closetMaterials.map((g, gi) => (
                      <div key={gi}>
                        <span className="text-[10px] font-bold" style={{ color: C.dark }}>{g.group}</span>
                        <div className="grid grid-cols-2 gap-1.5 mt-1">
                          {g.options.map((o, oi) => (
                            <button key={oi} onClick={() => { const n = [...matSel]; n[gi] = oi; setMatSel(n); }}
                              className="p-1.5 rounded-lg text-center" style={matSel[gi] === oi ? { border: `2px solid ${C.dark}`, background: C.cream } : { border: `1px solid ${C.stone}`, background: C.cream }}>
                              <div className="w-5 h-5 rounded-full mx-auto mb-0.5" style={o.color === "transparent" ? { border: `2px dashed ${C.greige}` } : { background: o.color }} />
                              <span className="text-[8px] font-medium block" style={{ color: C.dark }}>{o.name}</span>
                              {o.price > 0 && <span className="text-[7px]" style={{ color: C.oak }}>+{o.price} zł</span>}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {step === "summary" && (
                  <div className="space-y-2">
                    {sent ? (
                      <div className="text-center py-4">
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                          <CheckCircle2 className="w-10 h-10 mx-auto mb-2" style={{ color: C.forest }} />
                        </motion.div>
                        <h3 className="font-bold text-sm" style={{ color: C.dark }}>Wysłano!</h3>
                        <p className="text-[9px]" style={{ color: C.greige }}>Skontaktujemy się w 24h</p>
                        <p className="font-mono text-[10px] font-bold mt-1" style={{ color: C.oak }}>FORM-{Math.floor(Math.random() * 9000 + 1000)}</p>
                      </div>
                    ) : (
                      <>
                        <span className="text-[10px] font-bold" style={{ color: C.dark }}>Kalkulacja</span>
                        <div className="space-y-1 text-[10px]">
                          <div className="flex justify-between"><span style={{ color: C.greige }}>Korpus {width}×{height}cm</span><span style={{ color: C.dark }}>{basePrice.toLocaleString()} zł</span></div>
                          <div className="flex justify-between"><span style={{ color: C.greige }}>Materiały</span><span style={{ color: C.dark }}>{matCost.toLocaleString()} zł</span></div>
                          <div className="flex justify-between"><span style={{ color: C.greige }}>Sekcje ×{sections.length}</span><span style={{ color: C.dark }}>{sectionCost.toLocaleString()} zł</span></div>
                          <div className="border-t pt-1 flex justify-between font-bold text-sm" style={{ borderColor: C.stone }}>
                            <span style={{ color: C.dark }}>Razem</span>
                            <span style={{ color: C.oak }}>{total.toLocaleString()} zł</span>
                          </div>
                        </div>
                        <input placeholder="Imię i nazwisko" className="w-full px-2.5 py-2 rounded-lg text-[10px]" style={{ background: C.cream, border: `1px solid ${C.stone}`, color: C.dark }} />
                        <input placeholder="Telefon lub email" className="w-full px-2.5 py-2 rounded-lg text-[10px]" style={{ background: C.cream, border: `1px solid ${C.stone}`, color: C.dark }} />
                        <button onClick={() => setSent(true)} className="w-full py-2 rounded-lg text-[10px] font-bold text-white" style={{ background: C.oak }}>Wyślij i zamów pomiar</button>
                      </>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      <DemoBenefits accentColor={C.oak} bgColor={C.warm} textColor={C.dark} benefits={[
        { icon: "🎨", title: "Wizualny konfigurator", desc: "Klient widzi efekt zanim zamówi" },
        { icon: "💰", title: "Automatyczna wycena", desc: "Natychmiastowa kalkulacja ceny" },
        { icon: "📦", title: "Modułowa budowa", desc: "Dopasowanie do każdego wnętrza" },
        { icon: "📊", title: "Analiza konwersji", desc: "Statystyki popularnych konfiguracji" },
      ]} />
      <DemoFooterCTA accentColor={C.oak} bgColor={C.dark} />
    </PreviewShell>
  );
}

type KitchenStep = "layout" | "materials" | "modules" | "agd" | "summary";
type KitchenLayout = "L" | "U" | "I";

function KitchenConfigurator({ name }: { name: string }) {
  const [step, setStep] = useState<KitchenStep>("layout");
  const [matSel, setMatSel] = useState([0, 0, 0]);
  const [mods, setMods] = useState([0, 0, 0, 0, 0, 0]);
  const [agdSel, setAgdSel] = useState<boolean[]>(new Array(agd.length).fill(false));
  const [sent, setSent] = useState(false);
  const [layout, setLayout] = useState<KitchenLayout>("L");

  const matCost = kitchenMaterials.reduce((a, g, i) => a + g.options[matSel[i]].price, 0);
  const modCost = kitchenModules.reduce((a, m, i) => a + m.basePrice * mods[i], 0);
  const agdCost = agd.reduce((a, item, i) => a + (agdSel[i] ? item.price : 0), 0);
  const total = matCost + modCost + agdCost;
  const frontColor = kitchenMaterials[0].options[matSel[0]].color;
  const topColor = kitchenMaterials[1].options[matSel[1]].color;

  const navSteps = [
    { id: "layout", label: "1. Układ" },
    { id: "materials", label: "2. Materiały" },
    { id: "modules", label: "3. Moduły" },
    { id: "agd", label: "4. AGD" },
    { id: "summary", label: "5. Wycena" },
  ];

  return (
    <PreviewShell title={name}>
      <div style={{ background: C.cream, minHeight: 520 }}>
        <div className="px-4 py-2 flex items-center justify-between" style={{ background: C.white, borderBottom: `1px solid ${C.stone}` }}>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded flex items-center justify-center text-sm font-bold" style={{ background: C.dark, color: C.oak }}>F</div>
            <span className="font-bold text-xs" style={{ color: C.dark }}>FORM</span>
            <span className="text-xs" style={{ color: C.greige }}>Studio</span>
          </div>
          <div className="flex items-center gap-1 text-[9px]" style={{ color: C.greige }}>
            <span>Projekt</span> <ChevronRight className="w-3 h-3" /> <span>Kuchnia</span> <ChevronRight className="w-3 h-3" /> <span style={{ color: C.dark }}>Konfiguracja</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button className="flex items-center gap-1 px-2 py-1 rounded text-[9px] font-semibold" style={{ background: C.stone, color: C.dark }}><Save className="w-3 h-3" />Zapisz</button>
          </div>
        </div>

        <div className="flex gap-0 border-b overflow-x-auto" style={{ borderColor: C.stone, background: C.white }}>
          {navSteps.map(s => (
            <button key={s.id} onClick={() => setStep(s.id)} className="flex-1 py-2 text-[10px] font-semibold border-b-2 whitespace-nowrap"
              style={step === s.id ? { borderColor: C.dark, color: C.dark } : { borderColor: "transparent", color: C.greige }}>{s.label}</button>
          ))}
        </div>

        <div className="flex">
          <div className="flex-[7] p-4 flex items-center justify-center" style={{ background: C.stone + "60", minHeight: 240 }}>
            <svg viewBox="0 0 200 160" width="220" height="180">
              <rect x="10" y="10" width="180" height="140" fill="none" stroke={C.greige + "40"} strokeDasharray="4" rx="2" />
              <text x="100" y="155" textAnchor="middle" fontSize="6" fill={C.greige}>Plan kuchni — widok z góry</text>
              {layout === "L" && (
                <>
                  <rect x="15" y="15" width="170" height="20" rx="2" fill={frontColor} stroke={C.greige} strokeWidth="0.5" />
                  <rect x="15" y="15" width="170" height="3" rx="1" fill={topColor} />
                  <rect x="15" y="40" width="30" height="80" rx="2" fill={frontColor} stroke={C.greige} strokeWidth="0.5" />
                  <rect x="15" y="40" width="3" height="80" rx="1" fill={topColor} />
                  <rect x="70" y="60" width="40" height="30" rx="4" fill={C.greige + "30"} stroke={C.greige} strokeWidth="0.5" />
                  <text x="90" y="78" textAnchor="middle" fontSize="5" fill={C.greige}>🍽️ Stół</text>
                </>
              )}
              {layout === "U" && (
                <>
                  <rect x="15" y="15" width="170" height="20" rx="2" fill={frontColor} stroke={C.greige} strokeWidth="0.5" />
                  <rect x="15" y="15" width="170" height="3" rx="1" fill={topColor} />
                  <rect x="15" y="40" width="30" height="80" rx="2" fill={frontColor} stroke={C.greige} strokeWidth="0.5" />
                  <rect x="15" y="40" width="3" height="80" rx="1" fill={topColor} />
                  <rect x="155" y="40" width="30" height="80" rx="2" fill={frontColor} stroke={C.greige} strokeWidth="0.5" />
                  <rect x="182" y="40" width="3" height="80" rx="1" fill={topColor} />
                </>
              )}
              {layout === "I" && (
                <>
                  <rect x="15" y="15" width="170" height="25" rx="2" fill={frontColor} stroke={C.greige} strokeWidth="0.5" />
                  <rect x="15" y="15" width="170" height="3" rx="1" fill={topColor} />
                  <rect x="60" y="80" width="80" height="30" rx="4" fill={C.greige + "30"} stroke={C.greige} strokeWidth="0.5" />
                  <text x="100" y="98" textAnchor="middle" fontSize="5" fill={C.greige}>Wyspa</text>
                </>
              )}
            </svg>
          </div>

          <div className="flex-[3] p-3 space-y-3 border-l overflow-y-auto" style={{ borderColor: C.stone, background: C.white, maxHeight: 300 }}>
            <AnimatePresence mode="wait">
              <motion.div key={step} initial={{ opacity: 0, x: 5 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
                {step === "layout" && (
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold" style={{ color: C.dark }}>Układ kuchni</span>
                    {(["L", "U", "I"] as const).map(l => (
                      <button key={l} onClick={() => setLayout(l)} className="w-full p-2 rounded-lg text-left flex items-center gap-2"
                        style={layout === l ? { background: C.oak + "15", border: `2px solid ${C.oak}` } : { background: C.cream, border: `1px solid ${C.stone}` }}>
                        <span className="font-bold text-sm" style={{ color: C.dark }}>{l === "L" ? "L-shape" : l === "U" ? "U-shape" : "Z wyspą"}</span>
                        <span className="text-[8px]" style={{ color: C.greige }}>{l === "L" ? "Klasyczny kształt L" : l === "U" ? "Zabudowa 3-stronna" : "Linia + wyspa"}</span>
                      </button>
                    ))}
                  </div>
                )}
                {step === "materials" && (
                  <div className="space-y-3">
                    {kitchenMaterials.map((g, gi) => (
                      <div key={gi}>
                        <span className="text-[10px] font-bold" style={{ color: C.dark }}>{g.group}</span>
                        <div className="grid grid-cols-2 gap-1.5 mt-1">
                          {g.options.map((o, oi) => (
                            <button key={oi} onClick={() => { const n = [...matSel]; n[gi] = oi; setMatSel(n); }}
                              className="p-1.5 rounded-lg text-center" style={matSel[gi] === oi ? { border: `2px solid ${C.dark}`, background: C.cream } : { border: `1px solid ${C.stone}`, background: C.cream }}>
                              <div className="w-5 h-5 rounded-full mx-auto mb-0.5" style={o.color === "transparent" ? { border: `2px dashed ${C.greige}` } : { background: o.color }} />
                              <span className="text-[8px] font-medium block" style={{ color: C.dark }}>{o.name}</span>
                              {o.price > 0 && <span className="text-[7px]" style={{ color: C.oak }}>+{o.price}</span>}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {step === "modules" && (
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold" style={{ color: C.dark }}>Moduły</span>
                    {kitchenModules.map((m, i) => (
                      <div key={i} className="flex items-center gap-2 p-1.5 rounded" style={{ background: C.cream }}>
                        <span className="text-sm">{m.icon}</span>
                        <div className="flex-1 min-w-0">
                          <span className="text-[9px] font-bold block truncate" style={{ color: C.dark }}>{m.name}</span>
                          <span className="text-[8px]" style={{ color: C.greige }}>{m.basePrice} zł</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <button onClick={() => { const n = [...mods]; n[i] = Math.max(0, n[i] - 1); setMods(n); }}
                            className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: C.stone }}><Minus className="w-2.5 h-2.5" /></button>
                          <span className="font-bold text-[10px] w-4 text-center">{mods[i]}</span>
                          <button onClick={() => { const n = [...mods]; n[i]++; setMods(n); }}
                            className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: C.oak, color: C.white }}><Plus className="w-2.5 h-2.5" /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {step === "agd" && (
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold" style={{ color: C.dark }}>Sprzęt AGD</span>
                    {agd.map((a, i) => (
                      <label key={i} className="flex items-center gap-2 p-1.5 rounded cursor-pointer" style={{ background: agdSel[i] ? C.oak + "10" : C.cream }}>
                        <input type="checkbox" checked={agdSel[i]} onChange={() => { const n = [...agdSel]; n[i] = !n[i]; setAgdSel(n); }} className="w-3.5 h-3.5 accent-amber-700" />
                        <span className="text-sm">{a.icon}</span>
                        <div className="flex-1">
                          <span className="text-[9px] font-bold" style={{ color: C.dark }}>{a.name}</span>
                          <span className="text-[8px] block" style={{ color: C.greige }}>{a.brand}</span>
                        </div>
                        <span className="text-[9px] font-bold" style={{ color: C.oak }}>{a.price.toLocaleString()}</span>
                      </label>
                    ))}
                  </div>
                )}
                {step === "summary" && (
                  <div className="space-y-2">
                    {sent ? (
                      <div className="text-center py-4">
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                          <CheckCircle2 className="w-10 h-10 mx-auto mb-2" style={{ color: C.forest }} />
                        </motion.div>
                        <h3 className="font-bold text-sm" style={{ color: C.dark }}>Konfiguracja wysłana!</h3>
                        <p className="font-mono text-[10px] font-bold" style={{ color: C.oak }}>FORM-{Math.floor(Math.random() * 9000 + 1000)}</p>
                      </div>
                    ) : (
                      <>
                        <span className="text-[10px] font-bold" style={{ color: C.dark }}>Podsumowanie</span>
                        <div className="space-y-1 text-[10px]">
                          <div className="flex justify-between"><span style={{ color: C.greige }}>Materiały</span><span style={{ color: C.dark }}>{matCost.toLocaleString()} zł</span></div>
                          <div className="flex justify-between"><span style={{ color: C.greige }}>Moduły</span><span style={{ color: C.dark }}>{modCost.toLocaleString()} zł</span></div>
                          <div className="flex justify-between"><span style={{ color: C.greige }}>AGD</span><span style={{ color: C.dark }}>{agdCost.toLocaleString()} zł</span></div>
                          <div className="border-t pt-1 flex justify-between font-bold" style={{ borderColor: C.stone }}>
                            <span style={{ color: C.dark }}>Razem</span>
                            <span className="text-sm" style={{ color: C.oak }}>{total.toLocaleString()} zł</span>
                          </div>
                        </div>
                        <input placeholder="Imię i nazwisko" className="w-full px-2.5 py-1.5 rounded text-[10px]" style={{ background: C.cream, border: `1px solid ${C.stone}`, color: C.dark }} />
                        <input placeholder="Telefon / email" className="w-full px-2.5 py-1.5 rounded text-[10px]" style={{ background: C.cream, border: `1px solid ${C.stone}`, color: C.dark }} />
                        <button onClick={() => setSent(true)} className="w-full py-2 rounded text-[10px] font-bold text-white" style={{ background: C.oak }}>Wyślij konfigurację</button>
                      </>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
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
