import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PreviewShell, DemoNav, DemoSection, DemoBenefits, DemoFooterCTA } from "./PreviewShell";
import { Home, MapPin, Search, Filter, Heart, ChevronRight, Maximize, Bed, Bath, Car as CarIcon, Building2, BarChart3, Phone, Calendar, CheckCircle2, ArrowUpRight } from "lucide-react";

const C = { navy: "#0B1D3A", dark: "#0F2647", champagne: "#D4AF37", white: "#F8FAFC", gray: "#6B7280", green: "#10B981", blue: "#2563EB", red: "#EF4444", amber: "#F59E0B", light: "#EFF3F8", silver: "#9CA3AF" };

const apartments = [
  { id: "A-01", floor: 1, rooms: 2, area: 48.5, price: 485000, status: "available", exposure: "S-W", balcony: true, garden: true },
  { id: "A-02", floor: 1, rooms: 3, area: 65.2, price: 652000, status: "available", exposure: "S", balcony: true, garden: true },
  { id: "B-01", floor: 2, rooms: 2, area: 52.1, price: 536000, status: "reserved", exposure: "N-E", balcony: true, garden: false },
  { id: "B-02", floor: 2, rooms: 3, area: 72.8, price: 750000, status: "available", exposure: "S-W", balcony: true, garden: false },
  { id: "C-01", floor: 3, rooms: 4, area: 89.4, price: 982000, status: "available", exposure: "S", balcony: true, garden: false },
  { id: "C-02", floor: 3, rooms: 2, area: 45.8, price: 480000, status: "sold", exposure: "W", balcony: true, garden: false },
  { id: "D-01", floor: 4, rooms: 3, area: 78.2, price: 820000, status: "available", exposure: "S-W", balcony: true, garden: false },
  { id: "D-02", floor: 4, rooms: 5, area: 105.0, price: 1155000, status: "reserved", exposure: "S", balcony: true, garden: false },
];

const statusColors: Record<string, { bg: string; fg: string; label: string }> = {
  available: { bg: C.green + "15", fg: C.green, label: "Dostępne" },
  reserved: { bg: C.amber + "15", fg: C.amber, label: "Zarezerwowane" },
  sold: { bg: C.red + "15", fg: C.red, label: "Sprzedane" },
};

export function RealEstateDemo({ name }: { name: string; features: string[] }) {
  const [page, setPage] = useState("home");
  const tabs = [
    { id: "home", label: "Inwestycja", icon: <Home className="w-3 h-3" /> },
    { id: "catalog", label: "Katalog lokali", icon: <Building2 className="w-3 h-3" /> },
    { id: "apartment", label: "Karta lokalu", icon: <Maximize className="w-3 h-3" /> },
    { id: "contact", label: "Umów prezentację", icon: <Calendar className="w-3 h-3" /> },
    { id: "advisor", label: "Panel doradcy", icon: <BarChart3 className="w-3 h-3" /> },
  ];

  return (
    <PreviewShell title={name}>
      <DemoNav tabs={tabs} activeTab={page} onTabChange={setPage} logo="Nova Residence" />
      <AnimatePresence mode="wait">
        <motion.div key={page} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
          {page === "home" && <HomePage onNav={setPage} />}
          {page === "catalog" && <CatalogPage />}
          {page === "apartment" && <ApartmentPage />}
          {page === "contact" && <ContactPage />}
          {page === "advisor" && <AdvisorPage />}
        </motion.div>
      </AnimatePresence>
    </PreviewShell>
  );
}

function HomePage({ onNav }: { onNav: (p: string) => void }) {
  const available = apartments.filter(a => a.status === "available").length;
  return (
    <div>
      <div className="p-8 pb-10" style={{ background: `linear-gradient(160deg, ${C.navy}, ${C.dark})` }}>
        <p className="text-[10px] tracking-[0.4em] uppercase" style={{ color: C.champagne }}>Deweloper nieruchomości</p>
        <h1 className="font-display font-bold text-3xl mt-1 text-white">Nova <span style={{ color: C.champagne }}>Residence</span></h1>
        <p className="text-xs mt-2 text-white/70 max-w-[280px] leading-relaxed">Nowoczesne apartamenty w sercu Krakowa. Wysoki standard, zielone otoczenie, doskonała lokalizacja.</p>
        <div className="flex gap-3 mt-5">
          <motion.button whileHover={{ scale: 1.03 }} onClick={() => onNav("catalog")}
            className="px-6 py-3 rounded-lg font-bold text-sm shadow-lg text-white" style={{ background: `linear-gradient(135deg, ${C.champagne}, ${C.amber})` }}>Przeglądaj lokale</motion.button>
          <button onClick={() => onNav("contact")} className="px-6 py-3 rounded-lg font-semibold text-sm border border-white/20 text-white">Umów prezentację</button>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-6">
          {[{ v: `${apartments.length}`, l: "Lokali" }, { v: `${available}`, l: "Dostępnych" }, { v: "Q2 2027", l: "Oddanie" }].map((s, i) => (
            <div key={i} className="p-2.5 rounded-lg text-center" style={{ background: "rgba(255,255,255,0.06)" }}>
              <span className="font-bold text-sm text-white block">{s.v}</span>
              <span className="text-[8px] text-white/40">{s.l}</span>
            </div>
          ))}
        </div>
      </div>

      <DemoSection>
        <h3 className="font-bold text-sm" style={{ color: C.navy }}>Przewagi inwestycji</h3>
        <div className="grid grid-cols-2 gap-2">
          {[
            { icon: "📍", title: "Lokalizacja", desc: "5 min do centrum, tramwaj, park" },
            { icon: "🏗️", title: "Wysoki standard", desc: "Cegła, trójszybowe okna, windy" },
            { icon: "🌿", title: "Zieleń", desc: "Dziedziniec, park, ogródki" },
            { icon: "🚗", title: "Parking", desc: "Podziemny garaż, ładowarki EV" },
          ].map((f, i) => (
            <div key={i} className="p-3 rounded-xl" style={{ background: C.light }}>
              <span className="text-lg block">{f.icon}</span>
              <span className="text-[9px] font-bold block mt-1" style={{ color: C.navy }}>{f.title}</span>
              <span className="text-[8px]" style={{ color: C.gray }}>{f.desc}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mt-2">
          <h3 className="font-bold text-sm" style={{ color: C.navy }}>Dostępne lokale</h3>
          <button onClick={() => onNav("catalog")} className="text-[10px] font-medium flex items-center gap-1" style={{ color: C.champagne }}>Pełny katalog <ChevronRight className="w-3 h-3" /></button>
        </div>
        {apartments.filter(a => a.status === "available").slice(0, 3).map((a, i) => {
          const st = statusColors[a.status];
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              onClick={() => onNav("apartment")}
              className="flex items-center gap-3 p-3 rounded-xl border hover:shadow-sm transition-all cursor-pointer" style={{ borderColor: C.light, background: C.white }}>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0" style={{ background: C.navy + "08" }}>
                <span className="font-mono text-xs font-bold" style={{ color: C.navy }}>{a.id}</span>
              </div>
              <div className="flex-1">
                <h4 className="text-xs font-bold" style={{ color: C.navy }}>{a.rooms} pokoje · {a.area} m²</h4>
                <p className="text-[10px]" style={{ color: C.gray }}>Piętro {a.floor} · Ekspozycja {a.exposure}</p>
              </div>
              <div className="text-right shrink-0">
                <span className="font-bold text-xs block" style={{ color: C.champagne }}>{(a.price / 1000).toFixed(0)}K zł</span>
                <span className="text-[9px]" style={{ color: C.gray }}>{(a.price / a.area).toFixed(0)} zł/m²</span>
              </div>
            </motion.div>
          );
        })}

        <div className="p-4 rounded-xl" style={{ background: C.light, border: `1px solid ${C.champagne}15` }}>
          <p className="text-[10px] tracking-[0.2em] uppercase text-center" style={{ color: C.champagne }}>Opinie kupujących</p>
          <p className="text-xs mt-2 text-center italic" style={{ color: C.navy + "90" }}>"Profesjonalna obsługa, czytelna dokumentacja, wysokie standard wykończenia. Polecam Nova Residence."</p>
          <p className="text-[10px] text-center mt-1" style={{ color: C.champagne }}>— Tomasz i Anna K. ★★★★★</p>
        </div>
      </DemoSection>

      <DemoBenefits accentColor={C.champagne} bgColor={C.light} textColor={C.navy} benefits={[
        { icon: "🏠", title: "Katalog lokali", desc: "Filtry, rzuty, ceny na żywo" },
        { icon: "📐", title: "Rzuty mieszkań", desc: "Interaktywne plany kondygnacji" },
        { icon: "📅", title: "Rezerwacja online", desc: "Umów prezentację jednym klikiem" },
        { icon: "👨‍💼", title: "Panel doradcy", desc: "Zarządzanie leadami i ofertami" },
      ]} />
      <DemoFooterCTA accentColor={C.champagne} bgColor={C.navy} />
    </div>
  );
}

function CatalogPage() {
  const [roomFilter, setRoomFilter] = useState(0);
  const [statusFilter, setStatusFilter] = useState("all");
  const filtered = apartments.filter(a => (roomFilter === 0 || a.rooms === roomFilter) && (statusFilter === "all" || a.status === statusFilter));
  return (
    <DemoSection>
      <h3 className="font-bold text-sm" style={{ color: C.navy }}>Katalog lokali — Nova Residence</h3>
      <div className="flex gap-1.5">
        {[{ v: 0, l: "Wszystkie" }, { v: 2, l: "2-pok." }, { v: 3, l: "3-pok." }, { v: 4, l: "4-pok." }, { v: 5, l: "5-pok." }].map(f => (
          <button key={f.v} onClick={() => setRoomFilter(f.v)} className="px-2.5 py-1.5 rounded-lg text-[10px] font-medium transition-all"
            style={roomFilter === f.v ? { background: C.navy, color: "white" } : { background: C.light, color: C.gray }}>{f.l}</button>
        ))}
      </div>

      <div className="rounded-xl overflow-hidden border" style={{ borderColor: C.light }}>
        <div className="grid grid-cols-7 gap-0 p-2.5 text-[8px] font-bold uppercase" style={{ background: C.navy, color: "white" }}>
          <span>Nr</span><span>Piętro</span><span>Pokoje</span><span>Pow.</span><span>Cena</span><span>Eksp.</span><span>Status</span>
        </div>
        {filtered.map((a, i) => {
          const st = statusColors[a.status];
          return (
            <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
              className="grid grid-cols-7 gap-0 p-2.5 text-[10px] border-t cursor-pointer hover:bg-blue-50/30 transition-colors" style={{ borderColor: C.light }}>
              <span className="font-mono font-bold" style={{ color: C.navy }}>{a.id}</span>
              <span style={{ color: C.gray }}>{a.floor}</span>
              <span style={{ color: C.navy }}>{a.rooms}</span>
              <span style={{ color: C.navy }}>{a.area} m²</span>
              <span className="font-bold" style={{ color: C.champagne }}>{(a.price / 1000).toFixed(0)}K</span>
              <span style={{ color: C.gray }}>{a.exposure}</span>
              <span className="px-1 py-0.5 rounded text-[8px] font-bold text-center" style={{ background: st.bg, color: st.fg }}>{st.label}</span>
            </motion.div>
          );
        })}
      </div>
      <div className="flex justify-between text-[10px] p-2" style={{ color: C.gray }}>
        <span>{filtered.length} lokali znalezionych</span>
        <span>Ceny od {Math.min(...filtered.map(a => a.price)).toLocaleString()} zł</span>
      </div>
    </DemoSection>
  );
}

function ApartmentPage() {
  const apt = apartments[4];
  return (
    <DemoSection>
      <div className="p-4 rounded-xl" style={{ background: C.navy }}>
        <div className="aspect-video rounded-lg flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${C.navy}80, ${C.dark})`, border: `1px solid ${C.champagne}20` }}>
          <div className="text-center">
            <Building2 className="w-10 h-10 mx-auto mb-2 text-white/30" />
            <p className="text-[10px] text-white/40">Rzut mieszkania {apt.id}</p>
            <p className="text-xs text-white/60 font-medium mt-0.5">{apt.rooms} pokoje · {apt.area} m²</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-lg" style={{ color: C.navy }}>Lokal {apt.id}</h3>
          <span className="px-2 py-0.5 rounded-full text-[9px] font-bold" style={{ background: statusColors[apt.status].bg, color: statusColors[apt.status].fg }}>{statusColors[apt.status].label}</span>
        </div>
        <span className="font-bold text-xl" style={{ color: C.champagne }}>{apt.price.toLocaleString()} zł</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[
          { icon: Bed, label: "Pokoje", value: apt.rooms.toString() },
          { icon: Maximize, label: "Powierzchnia", value: `${apt.area} m²` },
          { icon: Building2, label: "Piętro", value: apt.floor.toString() },
          { icon: ArrowUpRight, label: "Ekspozycja", value: apt.exposure },
        ].map((d, i) => (
          <div key={i} className="p-3 rounded-xl flex items-center gap-2" style={{ background: C.light }}>
            <d.icon className="w-4 h-4 shrink-0" style={{ color: C.navy }} />
            <div>
              <span className="text-[9px]" style={{ color: C.gray }}>{d.label}</span>
              <span className="text-xs font-bold block" style={{ color: C.navy }}>{d.value}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 rounded-xl" style={{ background: C.light }}>
        <span className="text-[10px] font-bold" style={{ color: C.navy }}>Cena za m²: {(apt.price / apt.area).toFixed(0)} zł</span>
        <p className="text-[10px] mt-1" style={{ color: C.gray }}>Balkon: {apt.balcony ? "Tak" : "Nie"} · Ogródek: {apt.garden ? "Tak" : "Nie"}</p>
      </div>

      <motion.button whileHover={{ scale: 1.02 }}
        className="w-full py-3 rounded-xl text-xs font-bold text-white" style={{ background: `linear-gradient(135deg, ${C.champagne}, ${C.amber})` }}>Zapytaj o ten lokal</motion.button>
    </DemoSection>
  );
}

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  if (submitted) return (
    <DemoSection>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
        <CheckCircle2 className="w-12 h-12 mx-auto mb-3" style={{ color: C.green }} />
        <h3 className="font-bold text-lg" style={{ color: C.navy }}>Dziękujemy!</h3>
        <p className="text-xs mt-1" style={{ color: C.gray }}>Doradca skontaktuje się w ciągu 24h.</p>
      </motion.div>
    </DemoSection>
  );
  return (
    <DemoSection>
      <h3 className="font-bold text-sm" style={{ color: C.navy }}>Umów prezentację inwestycji</h3>
      <input placeholder="Imię i nazwisko" className="w-full px-4 py-3 rounded-xl border text-sm" style={{ borderColor: C.light, background: C.white, color: C.navy }} />
      <input placeholder="Telefon" className="w-full px-4 py-3 rounded-xl border text-sm" style={{ borderColor: C.light, background: C.white, color: C.navy }} />
      <input placeholder="E-mail" className="w-full px-4 py-3 rounded-xl border text-sm" style={{ borderColor: C.light, background: C.white, color: C.navy }} />
      <select className="w-full px-4 py-3 rounded-xl border text-sm" style={{ borderColor: C.light, background: C.white, color: C.navy }}>
        <option>Interesujący lokal...</option>{apartments.filter(a => a.status === "available").map(a => <option key={a.id}>{a.id} — {a.rooms} pok., {a.area} m²</option>)}
      </select>
      <select className="w-full px-4 py-3 rounded-xl border text-sm" style={{ borderColor: C.light, background: C.white, color: C.navy }}>
        <option>Preferowany termin prezentacji...</option><option>Poniedziałek-Piątek, 10:00-14:00</option><option>Poniedziałek-Piątek, 14:00-18:00</option><option>Sobota, 10:00-14:00</option>
      </select>
      <motion.button whileHover={{ scale: 1.02 }} onClick={() => setSubmitted(true)}
        className="w-full py-3 rounded-xl text-xs font-bold text-white" style={{ background: `linear-gradient(135deg, ${C.champagne}, ${C.amber})` }}>Umów prezentację</motion.button>
    </DemoSection>
  );
}

function AdvisorPage() {
  return (
    <DemoSection>
      <h3 className="font-bold text-sm" style={{ color: C.navy }}>Panel doradcy</h3>
      <div className="grid grid-cols-4 gap-2">
        {[{ l: "Zapytania", v: "24", c: C.blue }, { l: "Prezentacje", v: "8", c: C.green }, { l: "Rezerwacje", v: "3", c: C.amber }, { l: "Sprzedaże", v: "1", c: C.champagne }].map((s, i) => (
          <div key={i} className="p-2.5 rounded-xl text-center" style={{ background: C.light }}>
            <span className="font-bold text-sm block" style={{ color: s.c }}>{s.v}</span>
            <span className="text-[8px]" style={{ color: C.gray }}>{s.l}</span>
          </div>
        ))}
      </div>
      <h4 className="font-bold text-sm mt-2" style={{ color: C.navy }}>Ostatnie zapytania</h4>
      {[
        { name: "Jan Kowalski", apt: "C-01 (4 pok.)", date: "31 mar", status: "new" },
        { name: "Marta Nowak", apt: "B-02 (3 pok.)", date: "30 mar", status: "contacted" },
        { name: "Piotr W.", apt: "A-02 (3 pok.)", date: "28 mar", status: "presentation" },
      ].map((l, i) => (
        <div key={i} className="flex items-center gap-3 p-3 rounded-xl border" style={{ borderColor: C.light, background: C.white }}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white" style={{ background: C.navy }}>{l.name.split(" ").map(n => n[0]).join("")}</div>
          <div className="flex-1">
            <span className="text-xs font-semibold" style={{ color: C.navy }}>{l.name}</span>
            <p className="text-[10px]" style={{ color: C.gray }}>Zainteresowany: {l.apt} · {l.date}</p>
          </div>
          <span className="px-2 py-0.5 rounded-full text-[9px] font-bold" style={{
            background: l.status === "new" ? C.blue + "15" : l.status === "contacted" ? C.amber + "15" : C.green + "15",
            color: l.status === "new" ? C.blue : l.status === "contacted" ? C.amber : C.green
          }}>{l.status === "new" ? "Nowe" : l.status === "contacted" ? "Skontaktowano" : "Prezentacja"}</span>
        </div>
      ))}
    </DemoSection>
  );
}
