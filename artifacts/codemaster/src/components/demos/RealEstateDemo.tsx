import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PreviewShell, DemoNav, DemoSection } from "./PreviewShell";
import { Home, MapPin, Search, Filter, Heart, ChevronRight, Maximize, Bed, Bath, Car as CarIcon, Building2, BarChart3, Phone } from "lucide-react";

const C = { navy: "#1B2838", white: "#FFFFFF", gray: "#6B7280", copper: "#B87333", green: "#2D5A27", light: "#F8FAFC", cream: "#FFF8F0" };

const units = [
  { id: "A12", type: "2-pokojowe", size: 48, floor: 3, price: 485000, status: "available", rooms: 2, bath: 1, parking: true, balcony: true },
  { id: "B05", type: "3-pokojowe", size: 72, floor: 5, price: 720000, status: "available", rooms: 3, bath: 2, parking: true, balcony: true },
  { id: "C01", type: "4-pokojowe", size: 95, floor: 1, price: 950000, status: "reserved", rooms: 4, bath: 2, parking: true, balcony: false },
  { id: "A08", type: "Kawalerka", size: 32, floor: 2, price: 320000, status: "available", rooms: 1, bath: 1, parking: false, balcony: true },
  { id: "D10", type: "Penthouse", size: 140, floor: 8, price: 1800000, status: "available", rooms: 4, bath: 3, parking: true, balcony: true },
  { id: "B03", type: "2-pokojowe", size: 52, floor: 3, price: 520000, status: "sold", rooms: 2, bath: 1, parking: true, balcony: false },
];

function FloorPlan() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.fillStyle = C.light; ctx.fillRect(0, 0, c.width, c.height);
    const rooms = [
      { x: 30, y: 20, w: 100, h: 80, label: "Salon", color: C.copper + "20" },
      { x: 140, y: 20, w: 80, h: 80, label: "Sypialnia", color: C.navy + "10" },
      { x: 30, y: 110, w: 70, h: 50, label: "Kuchnia", color: C.green + "15" },
      { x: 110, y: 110, w: 50, h: 50, label: "Łazienka", color: "#2563EB15" },
      { x: 170, y: 110, w: 50, h: 50, label: "Balkon", color: C.copper + "10" },
    ];
    rooms.forEach(r => {
      ctx.fillStyle = r.color; ctx.fillRect(r.x, r.y, r.w, r.h);
      ctx.strokeStyle = C.gray + "40"; ctx.lineWidth = 1; ctx.strokeRect(r.x, r.y, r.w, r.h);
      ctx.fillStyle = C.navy; ctx.font = "bold 9px sans-serif"; ctx.textAlign = "center";
      ctx.fillText(r.label, r.x + r.w / 2, r.y + r.h / 2 + 3);
    });
  }, []);
  return <canvas ref={ref} width={260} height={180} className="w-full h-auto rounded-xl border" style={{ borderColor: C.gray + "20" }} />;
}

export function RealEstateDemo({ name }: { name: string; features: string[] }) {
  const [page, setPage] = useState("home");
  const tabs = [
    { id: "home", label: "Inwestycja", icon: <Building2 className="w-3 h-3" /> },
    { id: "units", label: "Mieszkania", icon: <Home className="w-3 h-3" /> },
    { id: "floorplan", label: "Rzut", icon: <Maximize className="w-3 h-3" /> },
    { id: "gallery", label: "Galeria", icon: <Heart className="w-3 h-3" /> },
    { id: "contact", label: "Kontakt", icon: <Phone className="w-3 h-3" /> },
    { id: "panel", label: "Panel", icon: <BarChart3 className="w-3 h-3" /> },
  ];

  return (
    <PreviewShell title={name}>
      <DemoNav tabs={tabs} activeTab={page} onTabChange={setPage} logo="NovaResidence" />
      <AnimatePresence mode="wait">
        <motion.div key={page} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
          {page === "home" && <HomePage onNav={setPage} />}
          {page === "units" && <UnitsPage />}
          {page === "floorplan" && <FloorPlanPage />}
          {page === "gallery" && <GalleryPage />}
          {page === "contact" && <ContactPage />}
          {page === "panel" && <PanelPage />}
        </motion.div>
      </AnimatePresence>
    </PreviewShell>
  );
}

function HomePage({ onNav }: { onNav: (p: string) => void }) {
  return (
    <div>
      <div className="p-10 text-center" style={{ background: `linear-gradient(160deg, ${C.navy}, #0D1B2A)` }}>
        <p className="text-[10px] tracking-[0.4em] uppercase" style={{ color: C.copper }}>Nowa Inwestycja 2026</p>
        <h1 className="font-display font-bold text-4xl mt-2 text-white">Nova Residence</h1>
        <p className="text-xs mt-2 max-w-[260px] mx-auto leading-relaxed" style={{ color: C.white + "80" }}>Nowoczesne apartamenty na Mokotowie. Basen, siłownia, park, prywatny parking — prestiżowy adres w Warszawie.</p>
        <div className="flex gap-3 justify-center mt-6">
          <motion.button whileHover={{ scale: 1.03 }} onClick={() => onNav("units")}
            className="px-7 py-3.5 rounded-lg font-semibold text-sm shadow-lg" style={{ background: C.copper, color: C.white }}>Sprawdź dostępność</motion.button>
          <button onClick={() => onNav("contact")} className="px-7 py-3.5 rounded-lg font-semibold text-sm border" style={{ borderColor: C.copper + "40", color: C.copper }}>Kontakt</button>
        </div>
      </div>
      <DemoSection>
        <div className="grid grid-cols-3 gap-3">
          {[{ l: "Mieszkań", v: "48" },{ l: "Pięter", v: "8" },{ l: "Od", v: "320K zł" }].map((s, i) => (
            <div key={i} className="p-3 rounded-xl text-center" style={{ background: C.light }}>
              <span className="font-bold text-lg block" style={{ color: C.copper }}>{s.v}</span>
              <span className="text-[9px]" style={{ color: C.gray }}>{s.l}</span>
            </div>
          ))}
        </div>
        <h3 className="font-bold text-sm mt-4" style={{ color: C.navy }}>Udogodnienia</h3>
        <div className="grid grid-cols-3 gap-2">
          {["🏊 Basen", "🏋️ Siłownia", "🌳 Park", "🚗 Parking", "🛗 Winda", "🔒 Ochrona"].map((a, i) => (
            <div key={i} className="p-3 rounded-xl text-center text-xs font-medium" style={{ background: C.light, color: C.navy }}>{a}</div>
          ))}
        </div>
        <div className="p-4 rounded-2xl mt-3" style={{ background: C.light, border: `1px solid ${C.copper}15` }}>
          <p className="text-[10px] tracking-[0.2em] uppercase text-center" style={{ color: C.copper }}>Opinie kupujących</p>
          <p className="text-xs mt-2 text-center italic" style={{ color: C.navy + "90" }}>"Świetna lokalizacja i wykończenie. Metro w 5 minut, park za rogiem. Idealne mieszkanie."</p>
          <p className="text-[10px] text-center mt-1" style={{ color: C.copper }}>— Marta D. ★★★★★</p>
        </div>
        <h3 className="font-bold text-sm mt-4" style={{ color: C.navy }}>Lokalizacja</h3>
        <div className="p-4 rounded-xl" style={{ background: C.light }}>
          <div className="space-y-1 text-xs" style={{ color: C.gray }}>
            <p>🚇 Metro Wilanowska — 5 min</p><p>🏫 Szkoła podstawowa — 300m</p><p>🛒 Galeria Mokotów — 8 min</p><p>🌳 Park Morskie Oko — 10 min</p>
          </div>
        </div>
      </DemoSection>
      <DemoBenefits accentColor={C.copper} bgColor={C.cream} textColor={C.navy} benefits={[
        { icon: "🏗️", title: "Premium katalog", desc: "Elegancka prezentacja inwestycji" },
        { icon: "🔍", title: "Szybkie filtrowanie", desc: "Metraż, piętro, status, cena" },
        { icon: "📋", title: "Kwalifikacja leadów", desc: "Formularz z pełnym kontekstem" },
        { icon: "📊", title: "Panel doradcy", desc: "Zarządzanie zapytaniami klientów" },
      ]} />
      <DemoFooterCTA accentColor={C.copper} bgColor={C.navy} />
    </div>
  );
}

function UnitsPage() {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? units : units.filter(u => u.status === filter);
  const statusC: Record<string, { bg: string; color: string; label: string }> = {
    available: { bg: "#10B98115", color: "#10B981", label: "Dostępne" },
    reserved: { bg: "#F59E0B15", color: "#F59E0B", label: "Zarezerwowane" },
    sold: { bg: "#EF444415", color: "#EF4444", label: "Sprzedane" },
  };

  return (
    <DemoSection>
      <div className="flex gap-2 mb-3">
        {[["all", "Wszystkie"], ["available", "Dostępne"], ["reserved", "Zarezerwowane"]].map(([id, label]) => (
          <button key={id} onClick={() => setFilter(id)} className="px-3 py-1.5 rounded-full text-xs font-medium"
            style={filter === id ? { background: C.navy, color: C.white } : { background: C.light, color: C.gray }}>{label}</button>
        ))}
      </div>
      <div className="space-y-2">
        {filtered.map((u, i) => {
          const st = statusC[u.status];
          return (
            <motion.div key={u.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
              className="p-4 rounded-xl border" style={{ borderColor: C.light, background: C.white }}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-sm" style={{ color: C.navy }}>{u.id}</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: st.bg, color: st.color }}>{st.label}</span>
                </div>
                <span className="text-xs" style={{ color: C.gray }}>Piętro {u.floor}</span>
              </div>
              <h4 className="font-bold text-sm" style={{ color: C.navy }}>{u.type} — {u.size} m²</h4>
              <div className="flex gap-3 mt-1.5">
                <span className="text-[10px] flex items-center gap-0.5" style={{ color: C.gray }}><Bed className="w-3 h-3" />{u.rooms}</span>
                <span className="text-[10px] flex items-center gap-0.5" style={{ color: C.gray }}><Bath className="w-3 h-3" />{u.bath}</span>
                {u.parking && <span className="text-[10px] flex items-center gap-0.5" style={{ color: C.gray }}><CarIcon className="w-3 h-3" />Parking</span>}
                {u.balcony && <span className="text-[10px]" style={{ color: C.gray }}>🌿 Balkon</span>}
              </div>
              <div className="flex items-center justify-between mt-3">
                <span className="font-bold text-lg" style={{ color: C.copper }}>{(u.price / 1000).toFixed(0)}K zł</span>
                <span className="text-[10px]" style={{ color: C.gray }}>{Math.round(u.price / u.size).toLocaleString()} zł/m²</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </DemoSection>
  );
}

function FloorPlanPage() {
  return (
    <DemoSection>
      <h3 className="font-bold text-sm" style={{ color: C.navy }}>Rzut mieszkania A12</h3>
      <p className="text-[10px]" style={{ color: C.gray }}>2-pokojowe • 48 m² • Piętro 3</p>
      <FloorPlan />
      <div className="grid grid-cols-2 gap-2 mt-3">
        {[{ room: "Salon z aneksem", size: "24.5 m²" },{ room: "Sypialnia", size: "14.2 m²" },{ room: "Łazienka", size: "5.8 m²" },{ room: "Balkon", size: "3.5 m²" }].map((r, i) => (
          <div key={i} className="p-2 rounded-lg flex justify-between" style={{ background: C.light }}>
            <span className="text-xs" style={{ color: C.navy }}>{r.room}</span>
            <span className="text-xs font-bold" style={{ color: C.copper }}>{r.size}</span>
          </div>
        ))}
      </div>
    </DemoSection>
  );
}

function GalleryPage() {
  return (
    <DemoSection>
      <h3 className="font-bold text-sm" style={{ color: C.navy }}>Wizualizacje</h3>
      <div className="grid grid-cols-2 gap-3">
        {["🏢 Fasada", "🛋️ Salon", "🍳 Kuchnia", "🛏️ Sypialnia", "🛁 Łazienka", "🌳 Ogród"].map((g, i) => (
          <div key={i} className="h-24 rounded-xl flex items-center justify-center text-2xl" style={{ background: `linear-gradient(135deg, ${C.navy}10, ${C.copper}10)` }}>
            {g}
          </div>
        ))}
      </div>
    </DemoSection>
  );
}

function ContactPage() {
  const [sent, setSent] = useState(false);
  if (sent) return (
    <DemoSection>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8">
        <div className="w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ background: C.copper + "15" }}>
          <ChevronRight className="w-6 h-6" style={{ color: C.copper }} />
        </div>
        <h3 className="font-bold text-lg" style={{ color: C.navy }}>Dziękujemy!</h3>
        <p className="text-sm" style={{ color: C.gray }}>Skontaktujemy się w ciągu 24h</p>
      </motion.div>
    </DemoSection>
  );
  return (
    <DemoSection>
      <h3 className="font-bold text-sm" style={{ color: C.navy }}>Zapytaj o mieszkanie</h3>
      <input placeholder="Imię i nazwisko" className="w-full px-4 py-3 rounded-xl border text-sm" style={{ borderColor: C.light, background: C.white, color: C.navy }} />
      <input placeholder="E-mail" className="w-full px-4 py-3 rounded-xl border text-sm" style={{ borderColor: C.light, background: C.white, color: C.navy }} />
      <input placeholder="Telefon" className="w-full px-4 py-3 rounded-xl border text-sm" style={{ borderColor: C.light, background: C.white, color: C.navy }} />
      <select className="w-full px-4 py-3 rounded-xl border text-sm" style={{ borderColor: C.light, background: C.white, color: C.navy }}>
        <option>Interesuje mnie...</option><option>Kawalerka</option><option>2-pokojowe</option><option>3-pokojowe</option><option>4-pokojowe</option><option>Penthouse</option>
      </select>
      <textarea placeholder="Wiadomość..." rows={3} className="w-full px-4 py-3 rounded-xl border text-sm resize-none" style={{ borderColor: C.light, background: C.white, color: C.navy }} />
      <motion.button whileHover={{ scale: 1.02 }} onClick={() => setSent(true)}
        className="w-full py-3.5 rounded-xl text-white font-semibold text-sm" style={{ background: C.copper }}>Wyślij zapytanie</motion.button>
    </DemoSection>
  );
}

function PanelPage() {
  const stats = { total: 48, available: 28, reserved: 8, sold: 12 };
  return (
    <DemoSection>
      <h3 className="font-bold text-sm" style={{ color: C.navy }}>Panel sprzedaży</h3>
      <div className="grid grid-cols-4 gap-2">
        {[{ l: "Łącznie", v: stats.total, c: C.navy },{ l: "Dostępne", v: stats.available, c: "#10B981" },{ l: "Zarezerwow.", v: stats.reserved, c: "#F59E0B" },{ l: "Sprzedane", v: stats.sold, c: "#EF4444" }].map((s, i) => (
          <div key={i} className="p-3 rounded-xl text-center" style={{ background: C.light }}>
            <span className="font-bold text-lg block" style={{ color: s.c }}>{s.v}</span>
            <span className="text-[9px]" style={{ color: C.gray }}>{s.l}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 p-4 rounded-xl" style={{ background: C.light }}>
        <h4 className="text-xs font-bold mb-2" style={{ color: C.navy }}>Postęp sprzedaży</h4>
        <div className="w-full h-4 rounded-full flex overflow-hidden" style={{ background: C.gray + "20" }}>
          <div className="h-full" style={{ width: `${(stats.sold/stats.total)*100}%`, background: "#EF4444" }} />
          <div className="h-full" style={{ width: `${(stats.reserved/stats.total)*100}%`, background: "#F59E0B" }} />
          <div className="h-full" style={{ width: `${(stats.available/stats.total)*100}%`, background: "#10B981" }} />
        </div>
        <p className="text-[10px] mt-1" style={{ color: C.gray }}>{Math.round(((stats.sold + stats.reserved) / stats.total) * 100)}% sprzedane lub zarezerwowane</p>
      </div>
    </DemoSection>
  );
}
