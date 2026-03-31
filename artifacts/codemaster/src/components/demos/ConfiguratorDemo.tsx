import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PreviewShell, DemoNav, DemoSection } from "./PreviewShell";
import { Home, Palette, Ruler, Box, CreditCard, ChevronRight, CheckCircle2, RotateCcw, ShoppingCart, Eye, Layers, Settings } from "lucide-react";

const furnitureC = { oak: "#C4A35A", beige: "#F5E6D3", white: "#FAFAF5", anthracite: "#3C3C3C", walnut: "#5C4033", cream: "#FFF8F0", taupe: "#8B7D6B" };
const kitchenC = { warmWhite: "#FAF8F5", greige: "#B8AFA6", olive: "#708238", stone: "#8C8C8C", graphite: "#3C3C3C", cream: "#FFF8F0" };

function isFurniture(industry: string) { return !industry?.toLowerCase().includes("kitchen"); }

export function ConfiguratorDemo({ name, industry }: { name: string; features: string[]; industry: string }) {
  const isFurn = isFurniture(industry || "");
  const C = isFurn ? furnitureC : kitchenC;
  const [page, setPage] = useState("home");
  const tabs = isFurn ? [
    { id: "home", label: "Start", icon: <Home className="w-3 h-3" /> },
    { id: "config", label: "Konfigurator", icon: <Box className="w-3 h-3" /> },
    { id: "materials", label: "Materiały", icon: <Palette className="w-3 h-3" /> },
    { id: "dimensions", label: "Wymiary", icon: <Ruler className="w-3 h-3" /> },
    { id: "preview", label: "Podgląd", icon: <Eye className="w-3 h-3" /> },
    { id: "summary", label: "Podsumowanie", icon: <CreditCard className="w-3 h-3" /> },
  ] : [
    { id: "home", label: "Start", icon: <Home className="w-3 h-3" /> },
    { id: "config", label: "Konfigurator", icon: <Settings className="w-3 h-3" /> },
    { id: "materials", label: "Fronty", icon: <Palette className="w-3 h-3" /> },
    { id: "dimensions", label: "Układ", icon: <Layers className="w-3 h-3" /> },
    { id: "preview", label: "Moodboard", icon: <Eye className="w-3 h-3" /> },
    { id: "summary", label: "Wycena", icon: <CreditCard className="w-3 h-3" /> },
  ];

  return (
    <PreviewShell title={name}>
      <DemoNav tabs={tabs} activeTab={page} onTabChange={setPage} logo={isFurn ? "FORM Studio" : "KitchenLab"} />
      <AnimatePresence mode="wait">
        <motion.div key={page} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
          {page === "home" && <HomePage isFurn={isFurn} onNav={setPage} />}
          {page === "config" && <ConfigPage isFurn={isFurn} />}
          {page === "materials" && <MaterialsPage isFurn={isFurn} />}
          {page === "dimensions" && <DimensionsPage isFurn={isFurn} />}
          {page === "preview" && <PreviewPage isFurn={isFurn} />}
          {page === "summary" && <SummaryPage isFurn={isFurn} />}
        </motion.div>
      </AnimatePresence>
    </PreviewShell>
  );
}

function HomePage({ isFurn, onNav }: { isFurn: boolean; onNav: (p: string) => void }) {
  const accent = isFurn ? furnitureC.oak : kitchenC.olive;
  const dark = isFurn ? furnitureC.anthracite : kitchenC.graphite;
  const bg = isFurn ? furnitureC.cream : kitchenC.warmWhite;
  const mid = isFurn ? furnitureC.taupe : kitchenC.stone;
  const logoName = isFurn ? "FORM Studio" : "KitchenLab";
  const tagline = isFurn ? "Meble na wymiar" : "Kuchnie na wymiar";
  const subtitle = isFurn
    ? "Projektuj szafy, garderoby i zabudowy dopasowane idealnie do Twojej przestrzeni. Naturalne materiały, rzemiosło na najwyższym poziomie."
    : "Zaprojektuj kuchnię marzeń. Funkcjonalność, elegancja i trwałość — wszystko szyte na miarę.";

  return (
    <div>
      <div className="p-10 text-center" style={{ background: `linear-gradient(160deg, ${dark}, ${accent}30)` }}>
        <p className="text-[10px] tracking-[0.4em] uppercase" style={{ color: accent }}>{tagline}</p>
        <h1 className="font-display font-bold text-4xl mt-2" style={{ color: bg }}>{logoName}</h1>
        <p className="text-xs mt-2 max-w-[260px] mx-auto leading-relaxed" style={{ color: bg + "80" }}>{subtitle}</p>
        <div className="flex gap-3 justify-center mt-6">
          <motion.button whileHover={{ scale: 1.03 }} onClick={() => onNav("config")}
            className="px-7 py-3.5 rounded-lg font-bold text-sm shadow-lg" style={{ background: accent, color: "white" }}>Rozpocznij projekt</motion.button>
          <button onClick={() => onNav("materials")} className="px-7 py-3.5 rounded-lg font-semibold text-sm border" style={{ borderColor: accent + "40", color: accent }}>Materiały</button>
        </div>
      </div>
      <DemoSection>
        <div className="grid grid-cols-4 gap-2">
          {(isFurn ? [
            { icon: "🪵", label: "Drewno", desc: "Dąb & orzech" },
            { icon: "📏", label: "Na wymiar", desc: "Co do mm" },
            { icon: "🎨", label: "Kolory", desc: "80+ odcieni" },
            { icon: "🚚", label: "Montaż", desc: "W cenie" },
          ] : [
            { icon: "🍳", label: "AGD", desc: "Premium" },
            { icon: "📐", label: "Projekt 3D", desc: "Wizualizacja" },
            { icon: "🪨", label: "Blaty", desc: "Granit & kwarc" },
            { icon: "🔧", label: "Montaż", desc: "Profesjonalny" },
          ]).map((f, i) => (
            <div key={i} className="p-3 rounded-xl text-center" style={{ background: bg }}>
              <span className="text-lg block">{f.icon}</span>
              <span className="text-[8px] font-bold block mt-1" style={{ color: dark }}>{f.label}</span>
              <span className="text-[7px]" style={{ color: mid }}>{f.desc}</span>
            </div>
          ))}
        </div>
        <h3 className="font-display font-bold text-base mt-4" style={{ color: dark }}>
          {isFurn ? "Nasze realizacje" : "Popularne układy"}
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {(isFurn ? [
            { icon: "🚪", name: "Szafa przesuwna", desc: "od 3 200 zł/mb" },
            { icon: "👗", name: "Garderoba walk-in", desc: "od 4 500 zł/mb" },
          ] : [
            { icon: "⌐", name: "Kuchnia L", desc: "od 18 000 zł" },
            { icon: "⬜", name: "Kuchnia z wyspą", desc: "od 25 000 zł" },
          ]).map((p, i) => (
            <div key={i} className="p-4 rounded-xl text-center cursor-pointer" style={{ background: bg, border: `1px solid ${accent}20` }} onClick={() => onNav("config")}>
              <span className="text-2xl block">{p.icon}</span>
              <span className="text-xs font-bold block mt-1" style={{ color: dark }}>{p.name}</span>
              <span className="text-[10px]" style={{ color: accent }}>{p.desc}</span>
            </div>
          ))}
        </div>
        <div className="p-4 rounded-2xl mt-3" style={{ background: dark, border: `1px solid ${accent}25` }}>
          <p className="text-[10px] tracking-[0.2em] uppercase text-center" style={{ color: accent }}>Opinie klientów</p>
          <p className="text-xs mt-2 text-center italic" style={{ color: bg + "90" }}>
            {isFurn ? "\"Szafa idealnie dopasowana do naszej sypialni. Jakość drewna i wykończenia na najwyższym poziomie.\"" : "\"Kuchnia jest przepiękna! Blat kwarcowy i fronty w kolorze oliwki wyglądają fantastycznie.\""}
          </p>
          <p className="text-[10px] text-center mt-1" style={{ color: accent }}>— {isFurn ? "Katarzyna M." : "Paweł R."} ★★★★★</p>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-3">
          {[{ v: "500+", l: "Realizacji" },{ v: "4.9", l: "Ocena" },{ v: "10", l: "Lat doświadczenia" }].map((s, i) => (
            <div key={i} className="p-3 rounded-xl text-center" style={{ background: `${accent}10` }}>
              <span className="font-bold text-sm block" style={{ color: accent }}>{s.v}</span>
              <span className="text-[9px]" style={{ color: mid }}>{s.l}</span>
            </div>
          ))}
        </div>
      </DemoSection>
      <DemoBenefits accentColor={isFurn ? furnitureC.walnut : kitchenC.blue} bgColor={isFurn ? furnitureC.cream : kitchenC.light} textColor={isFurn ? furnitureC.dark : kitchenC.dark} benefits={[
        { icon: "🎨", title: "Personalizacja", desc: "Klient projektuje wymiary i kolory" },
        { icon: "💰", title: "Live pricing", desc: "Cena aktualizuje się na bieżąco" },
        { icon: "📋", title: "Lepsze leady", desc: "Gotowy brief z konfiguratora" },
        { icon: "📊", title: "Panel handlowca", desc: "Zapisane konfiguracje klientów" },
      ]} />
      <DemoFooterCTA accentColor={isFurn ? furnitureC.walnut : kitchenC.blue} bgColor={isFurn ? furnitureC.dark : kitchenC.dark} />
    </div>
  );
}

function ConfigPage({ isFurn }: { isFurn: boolean }) {
  const [selType, setSelType] = useState(0);
  const types = isFurn
    ? [{ name: "Szafa przesuwna", icon: "🚪", desc: "2-3 drzwi, lustro opcjonalnie" }, { name: "Szafa narożna", icon: "📐", desc: "Optymalne wykorzystanie narożnika" }, { name: "Garderoba walk-in", icon: "👗", desc: "Otwarta przestrzeń garderobiana" }, { name: "Szafa na wymiar", icon: "📏", desc: "Dowolna konfiguracja" }]
    : [{ name: "Kuchnia w linii", icon: "▬", desc: "Klasyczny układ liniowy" }, { name: "Kuchnia L", icon: "⌐", desc: "Narożna z wyspą" }, { name: "Kuchnia U", icon: "⊔", desc: "Trzy ściany robocze" }, { name: "Kuchnia z wyspą", icon: "⬜", desc: "Wyspa jako centrum" }];
  const bg = isFurn ? furnitureC.cream : kitchenC.warmWhite;
  const accent = isFurn ? furnitureC.oak : kitchenC.olive;
  const dark = isFurn ? furnitureC.anthracite : kitchenC.graphite;
  const mid = isFurn ? furnitureC.taupe : kitchenC.stone;

  return (
    <DemoSection>
      <h3 className="font-display font-bold text-lg" style={{ color: dark }}>Wybierz typ {isFurn ? "szafy" : "kuchni"}</h3>
      <div className="grid grid-cols-2 gap-3">
        {types.map((t, i) => (
          <motion.div key={i} whileHover={{ scale: 1.02 }} onClick={() => setSelType(i)}
            className="p-5 rounded-2xl border cursor-pointer text-center"
            style={{ borderColor: selType === i ? accent : isFurn ? furnitureC.beige : kitchenC.greige + "40", background: bg }}>
            <span className="text-3xl block mb-2">{t.icon}</span>
            <h4 className="font-bold text-sm" style={{ color: dark }}>{t.name}</h4>
            <p className="text-[10px] mt-1" style={{ color: mid }}>{t.desc}</p>
          </motion.div>
        ))}
      </div>
      <div className="p-4 rounded-xl mt-3" style={{ background: accent + "10" }}>
        <p className="text-xs" style={{ color: dark }}>
          <span className="font-bold">Wybrany typ:</span> {types[selType].name}
        </p>
        <p className="text-[10px] mt-1" style={{ color: mid }}>Przejdź do zakładki Materiały, aby wybrać wykończenie</p>
      </div>
    </DemoSection>
  );
}

function MaterialsPage({ isFurn }: { isFurn: boolean }) {
  const [selMat, setSelMat] = useState(0);
  const [selColor, setSelColor] = useState(0);
  const mats = isFurn
    ? [{ name: "Dąb naturalny", color: "#C4A35A" }, { name: "Orzech włoski", color: "#5C4033" }, { name: "Biel matowa", color: "#F5F5F0" }, { name: "Antracyt", color: "#3C3C3C" }, { name: "Dąb bielony", color: "#E8DCC8" }]
    : [{ name: "Biel lakier", color: "#FAFAF5" }, { name: "Greige mat", color: "#B8AFA6" }, { name: "Oliwkowy", color: "#708238" }, { name: "Grafitowy", color: "#3C3C3C" }, { name: "Dąb naturalny", color: "#C4A35A" }];
  const counters = isFurn ? [] : [{ name: "Kwarcyt biały", color: "#F0EDE8" }, { name: "Granit czarny", color: "#2C2C2C" }, { name: "Marmur Calacatta", color: "#F5F0E8" }, { name: "Drewno dębowe", color: "#C4A35A" }];
  const dark = isFurn ? furnitureC.anthracite : kitchenC.graphite;
  const mid = isFurn ? furnitureC.taupe : kitchenC.stone;

  return (
    <DemoSection>
      <h3 className="font-display font-bold text-lg" style={{ color: dark }}>{isFurn ? "Materiał korpusu" : "Fronty"}</h3>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {mats.map((m, i) => (
          <motion.div key={i} whileHover={{ scale: 1.05 }} onClick={() => setSelMat(i)}
            className="text-center cursor-pointer shrink-0">
            <div className="w-14 h-14 rounded-xl border-2 mb-1" style={{ background: m.color, borderColor: selMat === i ? dark : "transparent" }} />
            <span className="text-[10px] font-medium" style={{ color: selMat === i ? dark : mid }}>{m.name}</span>
          </motion.div>
        ))}
      </div>
      {!isFurn && (
        <>
          <h3 className="font-display font-bold text-lg mt-4" style={{ color: dark }}>Blat</h3>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {counters.map((c, i) => (
              <motion.div key={i} whileHover={{ scale: 1.05 }} onClick={() => setSelColor(i)}
                className="text-center cursor-pointer shrink-0">
                <div className="w-14 h-14 rounded-xl border-2 mb-1" style={{ background: c.color, borderColor: selColor === i ? dark : "transparent" }} />
                <span className="text-[10px] font-medium" style={{ color: selColor === i ? dark : mid }}>{c.name}</span>
              </motion.div>
            ))}
          </div>
        </>
      )}
      <div className="p-4 rounded-xl mt-3" style={{ background: isFurn ? furnitureC.beige : kitchenC.greige + "20" }}>
        <h4 className="font-bold text-xs" style={{ color: dark }}>Aktualna konfiguracja</h4>
        <p className="text-[10px] mt-1" style={{ color: mid }}>{isFurn ? "Korpus" : "Front"}: {mats[selMat].name}</p>
        {!isFurn && <p className="text-[10px]" style={{ color: mid }}>Blat: {counters[selColor].name}</p>}
      </div>
    </DemoSection>
  );
}

function DimensionsPage({ isFurn }: { isFurn: boolean }) {
  const [w, setW] = useState(isFurn ? 250 : 320);
  const [h, setH] = useState(isFurn ? 260 : 220);
  const [d, setD] = useState(isFurn ? 60 : 60);
  const dark = isFurn ? furnitureC.anthracite : kitchenC.graphite;
  const accent = isFurn ? furnitureC.oak : kitchenC.olive;
  const mid = isFurn ? furnitureC.taupe : kitchenC.stone;

  return (
    <DemoSection>
      <h3 className="font-display font-bold text-lg" style={{ color: dark }}>{isFurn ? "Wymiary szafy" : "Wymiary kuchni"}</h3>
      {[
        { label: "Szerokość (cm)", val: w, set: setW, min: 100, max: 500 },
        { label: "Wysokość (cm)", val: h, set: setH, min: 200, max: 300 },
        { label: "Głębokość (cm)", val: d, set: setD, min: 40, max: 80 },
      ].map((dim, i) => (
        <div key={i} className="space-y-1">
          <div className="flex justify-between">
            <span className="text-xs font-medium" style={{ color: dark }}>{dim.label}</span>
            <span className="text-xs font-bold" style={{ color: accent }}>{dim.val} cm</span>
          </div>
          <input type="range" min={dim.min} max={dim.max} value={dim.val} onChange={e => dim.set(Number(e.target.value))}
            className="w-full h-2 rounded-full appearance-none cursor-pointer" style={{ background: `linear-gradient(to right, ${accent} ${((dim.val - dim.min) / (dim.max - dim.min)) * 100}%, ${isFurn ? furnitureC.beige : kitchenC.greige + "40"} 0%)` }} />
        </div>
      ))}
      {isFurn && (
        <div className="mt-3">
          <h4 className="text-xs font-bold" style={{ color: dark }}>Wnętrze szafy</h4>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {["Półki", "Drążek", "Szuflady", "Lustro", "Oświetlenie", "Organizer"].map((opt, i) => (
              <label key={i} className="flex items-center gap-2 p-2 rounded-lg border cursor-pointer"
                style={{ borderColor: isFurn ? furnitureC.beige : kitchenC.greige + "40", background: isFurn ? furnitureC.cream : kitchenC.warmWhite }}>
                <input type="checkbox" defaultChecked={i < 3} className="accent-amber-700 w-3.5 h-3.5" />
                <span className="text-[10px]" style={{ color: dark }}>{opt}</span>
              </label>
            ))}
          </div>
        </div>
      )}
      {!isFurn && (
        <div className="mt-3">
          <h4 className="text-xs font-bold" style={{ color: dark }}>Wyposażenie AGD</h4>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {["Piekarnik", "Płyta indukcyjna", "Zmywarka", "Lodówka", "Okap", "Mikrofala"].map((opt, i) => (
              <label key={i} className="flex items-center gap-2 p-2 rounded-lg border cursor-pointer"
                style={{ borderColor: kitchenC.greige + "40", background: kitchenC.warmWhite }}>
                <input type="checkbox" defaultChecked={i < 4} className="accent-green-700 w-3.5 h-3.5" />
                <span className="text-[10px]" style={{ color: dark }}>{opt}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </DemoSection>
  );
}

function PreviewPage({ isFurn }: { isFurn: boolean }) {
  const dark = isFurn ? furnitureC.anthracite : kitchenC.graphite;
  const accent = isFurn ? furnitureC.oak : kitchenC.olive;
  const mid = isFurn ? furnitureC.taupe : kitchenC.stone;

  return (
    <DemoSection>
      <h3 className="font-display font-bold text-lg" style={{ color: dark }}>{isFurn ? "Podgląd 3D" : "Moodboard"}</h3>
      <div className="w-full h-48 rounded-2xl flex items-center justify-center relative" style={{ background: `linear-gradient(135deg, ${isFurn ? furnitureC.beige : kitchenC.greige}30, ${isFurn ? furnitureC.cream : kitchenC.warmWhite})` }}>
        <div className="text-center">
          <span className="text-5xl block mb-2">{isFurn ? "🚪" : "🍳"}</span>
          <p className="text-xs font-medium" style={{ color: mid }}>{isFurn ? "Podgląd szafy przesuwnej" : "Wizualizacja kuchni L"}</p>
          <p className="text-[10px]" style={{ color: mid }}>250 × 260 × 60 cm</p>
        </div>
        <button className="absolute bottom-3 right-3 p-2 rounded-xl" style={{ background: accent, color: "white" }}>
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
      {!isFurn && (
        <>
          <h4 className="font-bold text-xs mt-3" style={{ color: dark }}>Paleta kolorów</h4>
          <div className="flex gap-3">
            {[kitchenC.warmWhite, kitchenC.greige, kitchenC.olive, kitchenC.stone, kitchenC.graphite].map((c, i) => (
              <div key={i} className="w-10 h-10 rounded-xl border" style={{ background: c, borderColor: mid + "30" }} />
            ))}
          </div>
          <h4 className="font-bold text-xs mt-3" style={{ color: dark }}>Inspiracje</h4>
          <div className="grid grid-cols-3 gap-2">
            {["Skandynawska", "Industrialna", "Minimalistyczna"].map((s, i) => (
              <div key={i} className="p-3 rounded-xl text-center" style={{ background: kitchenC.greige + "20" }}>
                <span className="text-xl block mb-1">{["🌿", "⚙️", "◻️"][i]}</span>
                <span className="text-[10px] font-medium" style={{ color: dark }}>{s}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </DemoSection>
  );
}

function SummaryPage({ isFurn }: { isFurn: boolean }) {
  const dark = isFurn ? furnitureC.anthracite : kitchenC.graphite;
  const accent = isFurn ? furnitureC.oak : kitchenC.olive;
  const mid = isFurn ? furnitureC.taupe : kitchenC.stone;
  const items = isFurn
    ? [{ name: "Korpus dąb naturalny", price: 3200 }, { name: "Drzwi przesuwne x2", price: 1800 }, { name: "Lustro na drzwiach", price: 600 }, { name: "Oświetlenie LED", price: 450 }, { name: "Montaż", price: 800 }]
    : [{ name: "Fronty oliwkowe mat", price: 4200 }, { name: "Blat kwarcytowy", price: 3800 }, { name: "Zlewozmywak podwieszany", price: 1200 }, { name: "Oświetlenie LED", price: 650 }, { name: "Montaż i transport", price: 1500 }];
  const total = items.reduce((a, i) => a + i.price, 0);

  return (
    <DemoSection>
      <h3 className="font-display font-bold text-lg" style={{ color: dark }}>Wycena {isFurn ? "szafy" : "kuchni"}</h3>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex justify-between py-2 border-b" style={{ borderColor: isFurn ? furnitureC.beige : kitchenC.greige + "30" }}>
            <span className="text-xs" style={{ color: dark }}>{item.name}</span>
            <span className="text-xs font-bold" style={{ color: dark }}>{item.price.toLocaleString()} zł</span>
          </div>
        ))}
      </div>
      <div className="p-4 rounded-xl mt-3" style={{ background: accent + "10" }}>
        <div className="flex justify-between">
          <span className="font-bold text-sm" style={{ color: dark }}>Razem</span>
          <span className="font-bold text-xl" style={{ color: accent }}>{total.toLocaleString()} zł</span>
        </div>
        <p className="text-[10px] mt-1" style={{ color: mid }}>Możliwość rozłożenia na 12 rat: {Math.round(total / 12)} zł/mies.</p>
      </div>
      <motion.button whileHover={{ scale: 1.02 }}
        className="w-full py-3.5 rounded-xl font-semibold text-sm text-white" style={{ background: accent }}>Zamów wycenę szczegółową</motion.button>
      <motion.button whileHover={{ scale: 1.02 }}
        className="w-full py-3 rounded-xl font-semibold text-sm border" style={{ borderColor: accent, color: accent }}>Pobierz PDF</motion.button>
    </DemoSection>
  );
}
