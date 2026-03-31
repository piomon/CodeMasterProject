import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PreviewShell, DemoFooterCTA, DemoBenefits } from "./PreviewShell";
import { Search, Heart, ChevronRight, Maximize, Bed, Building2, Phone, Calendar, CheckCircle2, MapPin, Star } from "lucide-react";

const C = { emerald: "#1B4332", emeraldLight: "#2D6A4F", gold: "#C9A84C", white: "#FFFFFF", bg: "#F5F7F5", gray: "#6B7280", dark: "#111827", green: "#22C55E", red: "#EF4444", amber: "#F59E0B", blue: "#3B82F6", light: "#E8EDE9" };

type PropertyStatus = "sale" | "rent" | "reserved" | "sold";

interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  area: number;
  rooms: number;
  floor: number;
  type: string;
  status: PropertyStatus;
  year: number;
  features: string[];
}

const properties: Property[] = [
  { id: "N-001", title: "Apartament z tarasem", location: "Kraków, Kazimierz", price: 890000, area: 72, rooms: 3, floor: 4, type: "Apartament", status: "sale", year: 2024, features: ["Taras 15m²", "Widok na Wawel", "Garaż"] },
  { id: "N-002", title: "Penthouse panoramiczny", location: "Kraków, Stare Miasto", price: 1650000, area: 120, rooms: 4, floor: 8, type: "Penthouse", status: "sale", year: 2025, features: ["Panorama 360°", "Jacuzzi", "2× garaż"] },
  { id: "N-003", title: "Studio inwestycyjne", location: "Kraków, Podgórze", price: 420000, area: 32, rooms: 1, floor: 2, type: "Studio", status: "sale", year: 2023, features: ["Pod wynajem", "Umeblowane"] },
  { id: "N-004", title: "Mieszkanie z ogrodem", location: "Kraków, Bronowice", price: 3800, area: 58, rooms: 3, floor: 0, type: "Mieszkanie", status: "rent", year: 2022, features: ["Ogródek 40m²", "Parter", "Zwierzęta OK"] },
  { id: "N-005", title: "Loft industrialny", location: "Kraków, Zabłocie", price: 750000, area: 85, rooms: 3, floor: 3, type: "Loft", status: "reserved", year: 2024, features: ["Wysoki sufit 4m", "Cegła", "Open space"] },
  { id: "N-006", title: "Dwupokojowe z balkonem", location: "Kraków, Ruczaj", price: 485000, area: 48, rooms: 2, floor: 5, type: "Mieszkanie", status: "sold", year: 2024, features: ["Balkon 8m²", "Winda", "Komórka"] },
  { id: "N-007", title: "Kawalerka centrum", location: "Kraków, Stare Miasto", price: 2400, area: 28, rooms: 1, floor: 3, type: "Kawalerka", status: "rent", year: 2021, features: ["Umeblowane", "Internet", "Deptak 100m"] },
  { id: "N-008", title: "Dom szeregowy", location: "Wieliczka", price: 720000, area: 130, rooms: 5, floor: 0, type: "Dom", status: "sale", year: 2025, features: ["Działka 300m²", "Garaż 2-st.", "Panele solar."] },
];

const statusInfo: Record<PropertyStatus, { bg: string; fg: string; label: string }> = {
  sale: { bg: C.green + "12", fg: C.green, label: "Sprzedaż" },
  rent: { bg: C.blue + "12", fg: C.blue, label: "Wynajem" },
  reserved: { bg: C.amber + "12", fg: C.amber, label: "Rezerwacja" },
  sold: { bg: C.red + "12", fg: C.red, label: "Sprzedane" },
};

const topTabs: { id: RealEstatePage; label: string }[] = [
  { id: "home", label: "Oferty" },
  { id: "search", label: "Inwestycje" },
  { id: "detail", label: "O nas" },
  { id: "contact", label: "Kontakt" },
  { id: "admin", label: "Panel CRM" },
];

type RealEstatePage = "home" | "search" | "detail" | "contact" | "admin";

export function RealEstateDemo({ name }: { name: string; features: string[] }) {
  const [page, setPage] = useState<RealEstatePage>("home");
  const [fav, setFav] = useState<string[]>([]);

  return (
    <PreviewShell title={name}>
      <div style={{ background: C.bg, minHeight: 540 }}>
        <div className="flex items-center justify-between px-4 py-2.5" style={{ background: C.white, borderBottom: `1px solid ${C.light}` }}>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: C.emerald }}>
              <Building2 className="w-4 h-4" style={{ color: C.gold }} />
            </div>
            <div>
              <h1 className="font-bold text-sm" style={{ color: C.emerald }}>Nova <span style={{ color: C.gold }}>Nieruchomości</span></h1>
              <p className="text-[7px] tracking-widest uppercase" style={{ color: C.gray }}>Nieruchomości premium</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative p-1.5">
              <Heart className="w-4 h-4" style={{ color: fav.length > 0 ? C.red : C.gray }} />
              {fav.length > 0 && <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full text-[7px] font-bold flex items-center justify-center text-white" style={{ background: C.red }}>{fav.length}</span>}
            </button>
            <button className="px-3 py-1.5 rounded-lg text-[10px] font-bold text-white" style={{ background: C.gold }}>Dodaj ogłoszenie</button>
          </div>
        </div>

        <div className="flex gap-0 overflow-x-auto" style={{ background: C.white, borderBottom: `1px solid ${C.light}` }}>
          {topTabs.map(t => (
            <button key={t.id} onClick={() => setPage(t.id)} className="px-3.5 py-2 text-[10px] font-semibold border-b-2 whitespace-nowrap"
              style={page === t.id ? { borderColor: C.gold, color: C.emerald } : { borderColor: "transparent", color: C.gray }}>{t.label}</button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={page} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            {page === "home" && <HomePage onNav={setPage} />}
            {page === "search" && <SearchPage fav={fav} setFav={setFav} onDetail={() => setPage("detail")} />}
            {page === "detail" && <DetailPage />}
            {page === "contact" && <ContactPage />}
            {page === "admin" && <AdminPage />}
          </motion.div>
        </AnimatePresence>
      </div>
      <DemoBenefits accentColor={C.gold} bgColor={C.light} textColor={C.emerald} benefits={[
        { icon: "🏠", title: "Katalog nieruchomości", desc: "Filtry, zdjęcia, ceny na żywo" },
        { icon: "📐", title: "Rzuty i plany", desc: "Interaktywne widoki 2D/3D" },
        { icon: "📅", title: "Rezerwacja online", desc: "Umów prezentację jednym klikiem" },
        { icon: "👨‍💼", title: "Panel CRM", desc: "Zarządzanie klientami i ofertami" },
      ]} />
      <DemoFooterCTA accentColor={C.gold} bgColor={C.emerald} />
    </PreviewShell>
  );
}

function HomePage({ onNav }: { onNav: (p: RealEstatePage) => void }) {
  const saleCount = properties.filter(p => p.status === "sale").length;
  return (
    <div>
      <div className="p-6 pb-8 relative overflow-hidden" style={{ background: `linear-gradient(160deg, ${C.emerald}, ${C.emeraldLight})` }}>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `radial-gradient(circle at 20% 50%, ${C.gold} 0%, transparent 50%), radial-gradient(circle at 80% 20%, ${C.gold} 0%, transparent 40%)` }} />
        <div className="relative">
          <p className="text-[9px] tracking-[0.4em] uppercase" style={{ color: C.gold }}>Kraków & okolice</p>
          <h2 className="font-bold text-2xl text-white mt-1">Znajdź swoje<br />wymarzone <span style={{ color: C.gold }}>miejsce</span></h2>
          <p className="text-[11px] text-white/60 mt-2 max-w-[260px]">Apartamenty, domy, lofty — premium nieruchomości w najlepszych lokalizacjach.</p>
          <div className="flex gap-1.5 mt-4 p-1.5 rounded-xl" style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)" }}>
            <div className="flex-1 px-2 py-1.5 rounded-lg text-[9px]" style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }}>
              <MapPin className="w-3 h-3 inline mr-0.5" /> Lokalizacja
            </div>
            <div className="flex-1 px-2 py-1.5 rounded-lg text-[9px]" style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }}>
              Typ
            </div>
            <div className="flex-1 px-2 py-1.5 rounded-lg text-[9px]" style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }}>
              Cena
            </div>
            <button onClick={() => onNav("search")} className="px-3 py-1.5 rounded-lg text-[10px] font-bold text-white" style={{ background: C.gold }}>
              <Search className="w-3 h-3 inline" />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-5">
            {[{ v: `${properties.length}`, l: "Ofert" }, { v: `${saleCount}`, l: "Na sprzedaż" }, { v: "12+", l: "Lat doświadczenia" }].map((s, i) => (
              <div key={i} className="p-2 rounded-lg text-center" style={{ background: "rgba(255,255,255,0.08)" }}>
                <span className="font-bold text-sm text-white">{s.v}</span>
                <span className="text-[8px] text-white/40 block">{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm" style={{ color: C.emerald }}>Wyróżnione oferty</h3>
          <button onClick={() => onNav("search")} className="text-[10px] font-semibold flex items-center gap-0.5" style={{ color: C.gold }}>Wszystkie <ChevronRight className="w-3 h-3" /></button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {properties.filter(p => p.status === "sale").slice(0, 4).map((p, i) => {
            const st = statusInfo[p.status];
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className="rounded-xl overflow-hidden cursor-pointer" style={{ background: C.white }} onClick={() => onNav("detail")}>
                <div className="h-20 flex items-center justify-center relative" style={{ background: `linear-gradient(135deg, ${C.emerald}15, ${C.emeraldLight}10)` }}>
                  <Building2 className="w-8 h-8" style={{ color: C.emerald + "30" }} />
                  <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded text-[7px] font-bold" style={{ background: st.bg, color: st.fg }}>{st.label}</span>
                </div>
                <div className="p-2">
                  <h4 className="text-[10px] font-bold truncate" style={{ color: C.dark }}>{p.title}</h4>
                  <p className="text-[8px] flex items-center gap-0.5" style={{ color: C.gray }}><MapPin className="w-2.5 h-2.5" /> {p.location}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-bold text-xs" style={{ color: C.gold }}>{p.price >= 10000 ? `${(p.price / 1000).toFixed(0)}K` : p.price.toLocaleString()} zł{p.status === "rent" ? "/mies." : ""}</span>
                    <span className="text-[8px]" style={{ color: C.gray }}>{p.area}m² · {p.rooms}pok.</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="p-3 rounded-xl" style={{ background: C.emerald }}>
          <p className="text-[9px] tracking-widest uppercase text-center" style={{ color: C.gold }}>Opinia klienta</p>
          <p className="text-[10px] text-white/80 text-center mt-1 italic">"Profesjonalizm na najwyższym poziomie. Nova Nieruchomości pomogli mi znaleźć idealny apartament."</p>
          <p className="text-[9px] text-center mt-1" style={{ color: C.gold }}>— Katarzyna M. ★★★★★</p>
        </div>
      </div>
    </div>
  );
}

function SearchPage({ fav, setFav, onDetail }: { fav: string[]; setFav: (f: string[]) => void; onDetail: () => void }) {
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [minArea, setMinArea] = useState(0);

  const filtered = properties.filter(p =>
    (typeFilter === "all" || p.type === typeFilter) &&
    (statusFilter === "all" || p.status === statusFilter) &&
    p.area >= minArea
  );

  return (
    <div className="p-3 space-y-2">
      <div className="p-3 rounded-xl space-y-2" style={{ background: C.white }}>
        <span className="text-[10px] font-bold" style={{ color: C.emerald }}>Filtry wyszukiwania</span>
        <div className="flex gap-1.5">
          {["all", "Apartament", "Mieszkanie", "Dom", "Loft"].map(t => (
            <button key={t} onClick={() => setTypeFilter(t)} className="px-2 py-1 rounded text-[9px] font-semibold"
              style={typeFilter === t ? { background: C.emerald, color: C.white } : { background: C.light, color: C.gray }}>{t === "all" ? "Wszystkie" : t}</button>
          ))}
        </div>
        <div className="flex gap-1.5">
          {(["all", "sale", "rent"] as const).map(s => (
            <button key={s} onClick={() => setStatusFilter(s)} className="px-2 py-1 rounded text-[9px] font-semibold"
              style={statusFilter === s ? { background: C.gold, color: C.white } : { background: C.light, color: C.gray }}>{s === "all" ? "Wszystkie" : statusInfo[s].label}</button>
          ))}
        </div>
        <div>
          <span className="text-[9px]" style={{ color: C.gray }}>Min. pow.: {minArea}m²</span>
          <input type="range" min={0} max={150} value={minArea} onChange={e => setMinArea(Number(e.target.value))} className="w-full h-1 accent-emerald-800" />
        </div>
      </div>

      <span className="text-[10px]" style={{ color: C.gray }}>Znaleziono: {filtered.length} ofert</span>
      <div className="space-y-2">
        {filtered.map((p, i) => {
          const st = statusInfo[p.status];
          const isFav = fav.includes(p.id);
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
              className="flex gap-3 p-2.5 rounded-xl cursor-pointer" style={{ background: C.white }} onClick={onDetail}>
              <div className="w-20 h-16 rounded-lg flex items-center justify-center shrink-0 relative" style={{ background: C.light }}>
                <Building2 className="w-6 h-6" style={{ color: C.emerald + "40" }} />
                <button onClick={e => { e.stopPropagation(); setFav(isFav ? fav.filter(f => f !== p.id) : [...fav, p.id]); }}
                  className="absolute top-1 right-1"><Heart className="w-3.5 h-3.5" style={{ color: isFav ? C.red : C.gray, fill: isFav ? C.red : "none" }} /></button>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-[11px] font-bold truncate" style={{ color: C.dark }}>{p.title}</h4>
                  <span className="px-1 py-0.5 rounded text-[7px] font-bold shrink-0" style={{ background: st.bg, color: st.fg }}>{st.label}</span>
                </div>
                <p className="text-[9px] flex items-center gap-0.5" style={{ color: C.gray }}><MapPin className="w-2.5 h-2.5" /> {p.location}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[9px]" style={{ color: C.gray }}>{p.area}m²</span>
                  <span className="text-[9px]" style={{ color: C.gray }}>{p.rooms} pok.</span>
                  <span className="text-[9px]" style={{ color: C.gray }}>P. {p.floor}</span>
                </div>
                <span className="font-bold text-xs block mt-0.5" style={{ color: C.gold }}>{p.price.toLocaleString()} zł{p.status === "rent" ? "/mies." : ""}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function DetailPage() {
  const p = properties[0];
  const st = statusInfo[p.status];
  return (
    <div className="space-y-0">
      <div className="h-36 flex items-center justify-center relative" style={{ background: `linear-gradient(135deg, ${C.emerald}20, ${C.emeraldLight}15)` }}>
        <Building2 className="w-16 h-16" style={{ color: C.emerald + "25" }} />
        <div className="absolute bottom-2 left-3 flex gap-1">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="w-12 h-8 rounded flex items-center justify-center text-[7px]" style={{ background: C.light, border: `1px solid ${C.emerald}20`, color: C.gray }}>Foto {i}</div>
          ))}
        </div>
        <span className="absolute top-2 right-2 px-2 py-0.5 rounded text-[8px] font-bold" style={{ background: st.bg, color: st.fg }}>{st.label}</span>
      </div>

      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-bold text-lg" style={{ color: C.dark }}>{p.title}</h3>
          <p className="text-[10px] flex items-center gap-1" style={{ color: C.gray }}><MapPin className="w-3 h-3" /> {p.location}</p>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-bold text-xl" style={{ color: C.gold }}>{p.price.toLocaleString()} zł</span>
          <span className="text-[10px]" style={{ color: C.gray }}>{(p.price / p.area).toFixed(0)} zł/m²</span>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {[
            { icon: <Maximize className="w-4 h-4" />, label: "Pow.", value: `${p.area}m²` },
            { icon: <Bed className="w-4 h-4" />, label: "Pokoje", value: `${p.rooms}` },
            { icon: <Building2 className="w-4 h-4" />, label: "Piętro", value: `${p.floor}` },
            { icon: <Calendar className="w-4 h-4" />, label: "Rok", value: `${p.year}` },
          ].map((d, i) => (
            <div key={i} className="p-2 rounded-lg text-center" style={{ background: C.light }}>
              <span className="mx-auto block w-fit" style={{ color: C.emerald }}>{d.icon}</span>
              <span className="text-[8px] block" style={{ color: C.gray }}>{d.label}</span>
              <span className="text-[10px] font-bold block" style={{ color: C.dark }}>{d.value}</span>
            </div>
          ))}
        </div>

        <div>
          <span className="text-[10px] font-bold" style={{ color: C.emerald }}>Cechy</span>
          <div className="flex flex-wrap gap-1 mt-1">
            {p.features.map((f, i) => (
              <span key={i} className="px-2 py-0.5 rounded-full text-[9px] font-medium" style={{ background: C.emerald + "10", color: C.emerald }}>{f}</span>
            ))}
          </div>
        </div>

        <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${C.light}` }}>
          <div className="h-24 flex items-center justify-center" style={{ background: C.light }}>
            <div className="text-center">
              <MapPin className="w-5 h-5 mx-auto" style={{ color: C.emerald }} />
              <span className="text-[9px] block mt-1" style={{ color: C.gray }}>Mapa — {p.location}</span>
            </div>
          </div>
        </div>

        <div className="p-3 rounded-xl" style={{ background: C.emerald }}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ background: C.gold, color: C.emerald }}>KW</div>
            <div>
              <span className="text-[10px] font-bold text-white">Katarzyna Wiśniewska</span>
              <span className="text-[8px] block text-white/60">Doradca ds. nieruchomości</span>
            </div>
          </div>
          <div className="flex gap-2 mt-2">
            <button className="flex-1 py-2 rounded-lg text-[10px] font-bold text-white" style={{ background: C.gold }}>
              <Phone className="w-3 h-3 inline mr-1" /> Zadzwoń
            </button>
            <button className="flex-1 py-2 rounded-lg text-[10px] font-bold border text-white/80" style={{ borderColor: C.gold + "60" }}>
              <Calendar className="w-3 h-3 inline mr-1" /> Umów wizytę
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactPage() {
  const [sent, setSent] = useState(false);
  if (sent) return (
    <div className="p-8 text-center">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
        <CheckCircle2 className="w-12 h-12 mx-auto mb-3" style={{ color: C.green }} />
      </motion.div>
      <h3 className="font-bold text-lg" style={{ color: C.dark }}>Dziękujemy!</h3>
      <p className="text-xs mt-1" style={{ color: C.gray }}>Nasz doradca odezwie się w ciągu 24h.</p>
    </div>
  );

  return (
    <div className="p-4 space-y-3">
      <h3 className="font-bold text-sm" style={{ color: C.emerald }}>Skontaktuj się z nami</h3>
      <div className="grid grid-cols-2 gap-2">
        {[
          { icon: <Phone className="w-4 h-4" />, label: "Telefon", value: "+48 12 345 67 89" },
          { icon: <MapPin className="w-4 h-4" />, label: "Biuro", value: "ul. Floriańska 15, Kraków" },
        ].map((c, i) => (
          <div key={i} className="p-3 rounded-xl" style={{ background: C.white }}>
            <span style={{ color: C.gold }}>{c.icon}</span>
            <span className="text-[9px] block mt-1" style={{ color: C.gray }}>{c.label}</span>
            <span className="text-[10px] font-bold block" style={{ color: C.dark }}>{c.value}</span>
          </div>
        ))}
      </div>
      <div className="space-y-2">
        <input placeholder="Imię i nazwisko" className="w-full px-3 py-2.5 rounded-lg text-xs" style={{ background: C.white, border: `1px solid ${C.light}`, color: C.dark }} />
        <input placeholder="Telefon" className="w-full px-3 py-2.5 rounded-lg text-xs" style={{ background: C.white, border: `1px solid ${C.light}`, color: C.dark }} />
        <input placeholder="E-mail" className="w-full px-3 py-2.5 rounded-lg text-xs" style={{ background: C.white, border: `1px solid ${C.light}`, color: C.dark }} />
        <select className="w-full px-3 py-2.5 rounded-lg text-xs" style={{ background: C.white, border: `1px solid ${C.light}`, color: C.dark }}>
          <option>Interesuje mnie...</option>
          <option>Zakup mieszkania</option>
          <option>Wynajem</option>
          <option>Sprzedaż nieruchomości</option>
          <option>Wycena</option>
        </select>
        <textarea placeholder="Wiadomość..." rows={3} className="w-full px-3 py-2.5 rounded-lg text-xs resize-none" style={{ background: C.white, border: `1px solid ${C.light}`, color: C.dark }} />
        <button onClick={() => setSent(true)} className="w-full py-3 rounded-lg text-xs font-bold text-white" style={{ background: C.gold }}>Wyślij wiadomość</button>
      </div>
    </div>
  );
}

function AdminPage() {
  const [adminTab, setAdminTab] = useState<"properties" | "leads">("properties");

  const leads = [
    { name: "Jan Kowalski", interest: "N-001 Apartament", date: "31 mar", status: "new" as const },
    { name: "Anna Nowak", interest: "N-002 Penthouse", date: "30 mar", status: "contacted" as const },
    { name: "Piotr W.", interest: "N-008 Dom", date: "28 mar", status: "viewing" as const },
    { name: "Ewa D.", interest: "N-004 Wynajem", date: "27 mar", status: "offer" as const },
  ];
  const leadStatusColor = (s: string) => s === "new" ? C.blue : s === "contacted" ? C.amber : s === "viewing" ? C.green : C.gold;
  const leadStatusLabel = (s: string) => s === "new" ? "Nowy" : s === "contacted" ? "Kontakt" : s === "viewing" ? "Wizyta" : "Oferta";

  return (
    <div className="p-3 space-y-3">
      <span className="text-xs font-bold" style={{ color: C.emerald }}>Panel CRM</span>
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: "Oferty", value: `${properties.length}`, color: C.emerald },
          { label: "Leady", value: "24", color: C.blue },
          { label: "Wizyty", value: "8", color: C.green },
          { label: "Sprzedaże", value: "3", color: C.gold },
        ].map((s, i) => (
          <div key={i} className="p-2 rounded-xl text-center" style={{ background: C.white }}>
            <span className="font-bold text-sm block" style={{ color: s.color }}>{s.value}</span>
            <span className="text-[8px]" style={{ color: C.gray }}>{s.label}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-1">
        <button onClick={() => setAdminTab("properties")} className="px-3 py-1.5 rounded text-[10px] font-semibold"
          style={adminTab === "properties" ? { background: C.emerald, color: C.white } : { background: C.white, color: C.gray }}>Nieruchomości</button>
        <button onClick={() => setAdminTab("leads")} className="px-3 py-1.5 rounded text-[10px] font-semibold"
          style={adminTab === "leads" ? { background: C.emerald, color: C.white } : { background: C.white, color: C.gray }}>Zapytania</button>
      </div>

      {adminTab === "properties" && (
        <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${C.light}` }}>
          <div className="grid grid-cols-6 text-[8px] font-bold uppercase px-2.5 py-1.5" style={{ background: C.emerald, color: C.white }}>
            <span>ID</span><span>Oferta</span><span>Lokalizacja</span><span>Cena</span><span>Pow.</span><span>Status</span>
          </div>
          {properties.map((p, i) => {
            const st = statusInfo[p.status];
            return (
              <div key={i} className="grid grid-cols-6 items-center px-2.5 py-2 border-t text-[10px]" style={{ borderColor: C.light, background: C.white }}>
                <span className="font-mono font-bold" style={{ color: C.emerald }}>{p.id}</span>
                <span className="truncate" style={{ color: C.dark }}>{p.title}</span>
                <span className="truncate text-[9px]" style={{ color: C.gray }}>{p.location}</span>
                <span className="font-bold" style={{ color: C.gold }}>{p.price >= 10000 ? `${(p.price / 1000).toFixed(0)}K` : p.price.toLocaleString()}</span>
                <span style={{ color: C.gray }}>{p.area}m²</span>
                <span className="px-1.5 py-0.5 rounded text-[8px] font-bold text-center" style={{ background: st.bg, color: st.fg }}>{st.label}</span>
              </div>
            );
          })}
        </div>
      )}

      {adminTab === "leads" && (
        <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${C.light}` }}>
          <div className="grid grid-cols-4 text-[8px] font-bold uppercase px-2.5 py-1.5" style={{ background: C.emerald, color: C.white }}>
            <span>Klient</span><span>Oferta</span><span>Data</span><span>Status</span>
          </div>
          {leads.map((l, i) => (
            <div key={i} className="grid grid-cols-4 items-center px-2.5 py-2 border-t text-[10px]" style={{ borderColor: C.light, background: C.white }}>
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-[8px] font-bold text-white" style={{ background: C.emerald }}>{l.name.split(" ").map(n => n[0]).join("")}</div>
                <span className="font-semibold truncate" style={{ color: C.dark }}>{l.name}</span>
              </div>
              <span className="truncate" style={{ color: C.gray }}>{l.interest}</span>
              <span style={{ color: C.gray }}>{l.date}</span>
              <span className="px-1.5 py-0.5 rounded text-[8px] font-bold text-center" style={{ background: leadStatusColor(l.status) + "15", color: leadStatusColor(l.status) }}>{leadStatusLabel(l.status)}</span>
            </div>
          ))}
        </div>
      )}

      <div className="p-3 rounded-xl" style={{ background: C.white }}>
        <span className="text-[10px] font-bold" style={{ color: C.emerald }}>Konwersja lejka</span>
        {[
          { stage: "Zapytania", count: 24, pct: 100 },
          { stage: "Kontakt", count: 16, pct: 67 },
          { stage: "Wizyta", count: 8, pct: 33 },
          { stage: "Oferta", count: 5, pct: 21 },
          { stage: "Transakcja", count: 3, pct: 13 },
        ].map((f, i) => (
          <div key={i} className="flex items-center gap-2 mt-1.5">
            <span className="text-[9px] w-16" style={{ color: C.dark }}>{f.stage}</span>
            <div className="flex-1 h-2 rounded-full" style={{ background: C.light }}>
              <div className="h-full rounded-full" style={{ width: `${f.pct}%`, background: C.gold }} />
            </div>
            <span className="text-[9px] font-bold w-6 text-right" style={{ color: C.emerald }}>{f.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
