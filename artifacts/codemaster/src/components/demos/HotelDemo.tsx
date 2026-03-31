import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PreviewShell, DemoFooterCTA, DemoBenefits } from "./PreviewShell";
import { Calendar, Star, Users, CheckCircle2, ChevronRight, Building2, CreditCard, Waves, Bell, Bed, BarChart3, Settings, Home, Key, Search } from "lucide-react";

const C = { blue: "#003580", dark: "#00224F", white: "#FFFFFF", sky: "#E8F4FD", gray: "#64748B", light: "#F1F5F9", gold: "#F5A623", navy: "#0F172A", card: "#FAFBFC" };

const sideNav = [
  { id: "dashboard", icon: <Home className="w-4 h-4" />, label: "Panel" },
  { id: "booking-engine", icon: <Search className="w-4 h-4" />, label: "Booking" },
  { id: "rooms", icon: <Bed className="w-4 h-4" />, label: "Pokoje" },
  { id: "bookings", icon: <Calendar className="w-4 h-4" />, label: "Rezerwacje" },
  { id: "guests", icon: <Users className="w-4 h-4" />, label: "Goście" },
  { id: "rates", icon: <CreditCard className="w-4 h-4" />, label: "Cennik" },
  { id: "settings", icon: <Settings className="w-4 h-4" />, label: "Ustawienia" },
];

const roomsData = [
  { id: 101, type: "Standard", floor: 1, status: "occupied", guest: "Kowalski J.", checkout: "22 mar", price: 380 },
  { id: 102, type: "Standard", floor: 1, status: "occupied", guest: "Nowak A.", checkout: "24 mar", price: 380 },
  { id: 103, type: "Standard", floor: 1, status: "free", guest: "", checkout: "", price: 380 },
  { id: 104, type: "Standard", floor: 1, status: "cleaning", guest: "", checkout: "", price: 380 },
  { id: 201, type: "Deluxe", floor: 2, status: "occupied", guest: "Wiśniewski P.", checkout: "25 mar", price: 580 },
  { id: 202, type: "Deluxe", floor: 2, status: "free", guest: "", checkout: "", price: 580 },
  { id: 203, type: "Deluxe", floor: 2, status: "reserved", guest: "Lewandowska M.", checkout: "23 mar", price: 580 },
  { id: 204, type: "Deluxe", floor: 2, status: "maintenance", guest: "", checkout: "", price: 580 },
  { id: 301, type: "Suite", floor: 3, status: "occupied", guest: "Zieliński K.", checkout: "26 mar", price: 950 },
  { id: 302, type: "Suite", floor: 3, status: "free", guest: "", checkout: "", price: 950 },
  { id: 401, type: "Penthouse", floor: 4, status: "occupied", guest: "Duda E.", checkout: "28 mar", price: 1400 },
  { id: 402, type: "Penthouse", floor: 4, status: "free", guest: "", checkout: "", price: 1400 },
];

const bookings = [
  { id: "BK-2841", guest: "Jan Kowalski", room: "101 Standard", checkin: "18 mar", checkout: "22 mar", nights: 4, total: 1520, status: "active" },
  { id: "BK-2842", guest: "Anna Nowak", room: "102 Standard", checkin: "20 mar", checkout: "24 mar", nights: 4, total: 1520, status: "active" },
  { id: "BK-2843", guest: "Marta Lewandowska", room: "203 Deluxe", checkin: "23 mar", checkout: "27 mar", nights: 4, total: 2320, status: "confirmed" },
  { id: "BK-2844", guest: "Piotr Wiśniewski", room: "201 Deluxe", checkin: "19 mar", checkout: "25 mar", nights: 6, total: 3480, status: "active" },
  { id: "BK-2845", guest: "Katarzyna Zielińska", room: "301 Suite", checkin: "21 mar", checkout: "26 mar", nights: 5, total: 4750, status: "active" },
];

export function HotelDemo({ name }: { name: string; features: string[] }) {
  const [page, setPage] = useState("dashboard");

  return (
    <PreviewShell title={name}>
      <div className="flex" style={{ minHeight: 560, background: C.light }}>
        <div className="w-[52px] shrink-0 flex flex-col items-center py-3 gap-1" style={{ background: C.dark }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold mb-3" style={{ background: C.blue, color: C.white }}>QH</div>
          {sideNav.map(n => (
            <button key={n.id} onClick={() => setPage(n.id)} title={n.label}
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-all"
              style={page === n.id ? { background: C.blue, color: C.white } : { color: C.gray }}>
              {n.icon}
            </button>
          ))}
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 border-b" style={{ background: C.white, borderColor: C.sky }}>
            <div>
              <h1 className="font-bold text-sm" style={{ color: C.navy }}>QloHotel PMS</h1>
              <p className="text-[9px]" style={{ color: C.gray }}>{sideNav.find(n => n.id === page)?.label}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Bell className="w-4 h-4" style={{ color: C.gray }} />
                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full" style={{ background: C.gold }} />
              </div>
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-bold text-white" style={{ background: C.blue }}>MG</div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <AnimatePresence mode="wait">
              <motion.div key={page} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
                {page === "dashboard" && <DashboardView />}
                {page === "booking-engine" && <BookingEngineView />}
                {page === "rooms" && <RoomsView />}
                {page === "bookings" && <BookingsView />}
                {page === "guests" && <GuestsView />}
                {page === "rates" && <RatesView />}
                {page === "settings" && <SettingsView />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      <DemoBenefits accentColor={C.blue} bgColor={C.sky} textColor={C.navy} benefits={[
        { icon: "💰", title: "Bezpośrednia sprzedaż", desc: "Bez prowizji booking.com i pośredników" },
        { icon: "📊", title: "Kontrola obłożenia", desc: "Dashboard rezerwacji w czasie rzeczywistym" },
        { icon: "🏨", title: "Premium prezentacja", desc: "Galerie pokojów, pakiety, atrakcje" },
        { icon: "⚡", title: "Wyższa konwersja", desc: "Sprawny booking flow z podsumowaniem" },
      ]} />
      <DemoFooterCTA accentColor={C.blue} bgColor={C.navy} />
    </PreviewShell>
  );
}

function OccupancyGauge({ pct }: { pct: number }) {
  const r = 32;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="76" height="76" className="-rotate-90">
        <circle cx="38" cy="38" r={r} fill="none" stroke={C.sky} strokeWidth="6" />
        <circle cx="38" cy="38" r={r} fill="none" stroke={pct > 85 ? "#22C55E" : pct > 60 ? C.gold : C.blue} strokeWidth="6"
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" />
      </svg>
      <div className="absolute text-center">
        <span className="font-bold text-lg block" style={{ color: C.navy }}>{pct}%</span>
        <span className="text-[8px]" style={{ color: C.gray }}>obłożenie</span>
      </div>
    </div>
  );
}

function DashboardView() {
  const occupied = roomsData.filter(r => r.status === "occupied").length;
  const total = roomsData.length;
  const pct = Math.round((occupied / total) * 100);

  return (
    <div className="p-3 space-y-3">
      <div className="flex gap-3">
        <div className="flex-1 grid grid-cols-2 gap-2">
          {[
            { label: "Zajęte", value: `${occupied}/${total}`, color: C.blue },
            { label: "Check-in dziś", value: "2", color: "#22C55E" },
            { label: "Check-out dziś", value: "1", color: C.gold },
            { label: "Przychód/dziś", value: "6 420 zł", color: C.blue },
          ].map((s, i) => (
            <div key={i} className="p-2 rounded-lg" style={{ background: C.white, border: `1px solid ${C.sky}` }}>
              <span className="font-bold text-sm block" style={{ color: s.color }}>{s.value}</span>
              <span className="text-[9px]" style={{ color: C.gray }}>{s.label}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center p-2 rounded-xl" style={{ background: C.white, border: `1px solid ${C.sky}` }}>
          <OccupancyGauge pct={pct} />
        </div>
      </div>

      <div className="rounded-xl overflow-hidden" style={{ background: C.white, border: `1px solid ${C.sky}` }}>
        <div className="px-3 py-2 flex items-center justify-between border-b" style={{ borderColor: C.sky }}>
          <span className="text-[10px] font-bold" style={{ color: C.navy }}>Mapa pokojów</span>
          <div className="flex gap-2">
            {[
              { color: "#22C55E", label: "Wolny" },
              { color: C.blue, label: "Zajęty" },
              { color: C.gold, label: "Rez." },
              { color: "#94A3B8", label: "Serwis" },
            ].map(s => <span key={s.label} className="flex items-center gap-1 text-[8px]"><div className="w-2 h-2 rounded-sm" style={{ background: s.color }} />{s.label}</span>)}
          </div>
        </div>
        <div className="p-2">
          {[1, 2, 3, 4].map(floor => {
            const floorRooms = roomsData.filter(r => r.floor === floor);
            return (
              <div key={floor} className="flex items-center gap-1.5 mb-1.5">
                <span className="text-[9px] font-bold w-5 shrink-0" style={{ color: C.gray }}>P{floor}</span>
                {floorRooms.map(r => {
                  const col = r.status === "free" ? "#22C55E" : r.status === "occupied" ? C.blue : r.status === "reserved" ? C.gold : "#94A3B8";
                  return (
                    <div key={r.id} className="flex-1 py-2 rounded text-center text-[9px] font-bold relative" style={{ background: col + "15", border: `1px solid ${col}40`, color: col }}>
                      {r.id}
                      {r.status === "occupied" && <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full text-[7px] flex items-center justify-center text-white" style={{ background: C.blue }}>●</span>}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-xl" style={{ background: C.white, border: `1px solid ${C.sky}` }}>
        <div className="px-3 py-2 border-b" style={{ borderColor: C.sky }}>
          <span className="text-[10px] font-bold" style={{ color: C.navy }}>Nadchodzące check-in/out</span>
        </div>
        {[
          { type: "in", guest: "M. Lewandowska", room: "203", date: "23 mar", time: "14:00" },
          { type: "out", guest: "J. Kowalski", room: "101", date: "22 mar", time: "11:00" },
          { type: "in", guest: "T. Malinowski", room: "103", date: "23 mar", time: "15:00" },
        ].map((e, i) => (
          <div key={i} className="flex items-center gap-2 px-3 py-2 border-b last:border-0" style={{ borderColor: C.sky }}>
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded" style={e.type === "in" ? { background: "#22C55E15", color: "#22C55E" } : { background: C.gold + "15", color: C.gold }}>
              {e.type === "in" ? "→ IN" : "← OUT"}
            </span>
            <div className="flex-1">
              <span className="text-[10px] font-semibold" style={{ color: C.navy }}>{e.guest}</span>
              <span className="text-[9px] block" style={{ color: C.gray }}>Pok. {e.room} • {e.date}, {e.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RoomsView() {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? roomsData : roomsData.filter(r => r.status === filter);
  const statusLabel = (s: string) => s === "free" ? "Wolny" : s === "occupied" ? "Zajęty" : s === "reserved" ? "Rezerwacja" : s === "cleaning" ? "Sprzątanie" : "Serwis";
  const statusColor = (s: string) => s === "free" ? "#22C55E" : s === "occupied" ? C.blue : s === "reserved" ? C.gold : "#94A3B8";

  return (
    <div className="p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold" style={{ color: C.navy }}>Pokoje ({roomsData.length})</span>
      </div>
      <div className="flex gap-1 overflow-x-auto pb-1">
        {["all", "free", "occupied", "reserved"].map(f => (
          <button key={f} onClick={() => setFilter(f)} className="px-2.5 py-1 rounded-full text-[10px] font-semibold whitespace-nowrap"
            style={filter === f ? { background: C.blue, color: C.white } : { background: C.white, color: C.gray }}>
            {f === "all" ? "Wszystkie" : statusLabel(f)}
          </button>
        ))}
      </div>
      <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${C.sky}` }}>
        <table className="w-full text-[10px]">
          <thead>
            <tr style={{ background: C.blue }}>
              <th className="px-2 py-2 text-left text-white font-semibold">Nr</th>
              <th className="px-2 py-2 text-left text-white font-semibold">Typ</th>
              <th className="px-2 py-2 text-center text-white font-semibold">Status</th>
              <th className="px-2 py-2 text-right text-white font-semibold">Cena</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r, i) => (
              <tr key={i} className="border-t" style={{ borderColor: C.sky, background: C.white }}>
                <td className="px-2 py-2 font-bold" style={{ color: C.navy }}>{r.id}</td>
                <td className="px-2 py-2">
                  <span style={{ color: C.navy }}>{r.type}</span>
                  {r.guest && <span className="block text-[9px]" style={{ color: C.gray }}>{r.guest}</span>}
                </td>
                <td className="px-2 py-2 text-center">
                  <span className="px-2 py-0.5 rounded-full text-[8px] font-bold" style={{ background: statusColor(r.status) + "15", color: statusColor(r.status) }}>{statusLabel(r.status)}</span>
                </td>
                <td className="px-2 py-2 text-right font-bold" style={{ color: C.blue }}>{r.price} zł</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function BookingsView() {
  return (
    <div className="p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold" style={{ color: C.navy }}>Rezerwacje</span>
        <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-bold text-white" style={{ background: C.blue }}>
          <Key className="w-3 h-3" /> Nowa
        </button>
      </div>
      <div className="space-y-1.5">
        {bookings.map((b, i) => (
          <div key={i} className="p-3 rounded-xl" style={{ background: C.white, border: `1px solid ${C.sky}` }}>
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono font-bold text-[10px]" style={{ color: C.blue }}>{b.id}</span>
              <span className="px-2 py-0.5 rounded-full text-[8px] font-bold"
                style={b.status === "active" ? { background: "#22C55E15", color: "#22C55E" } : { background: C.blue + "15", color: C.blue }}>
                {b.status === "active" ? "Aktywna" : "Potwierdzona"}
              </span>
            </div>
            <span className="text-[11px] font-semibold" style={{ color: C.navy }}>{b.guest}</span>
            <div className="flex items-center gap-3 mt-1 text-[9px]" style={{ color: C.gray }}>
              <span>🛏️ {b.room}</span>
              <span>📅 {b.checkin} → {b.checkout}</span>
              <span>{b.nights} nocy</span>
            </div>
            <div className="flex items-center justify-between mt-1.5 pt-1.5 border-t" style={{ borderColor: C.sky }}>
              <span className="font-bold text-sm" style={{ color: C.blue }}>{b.total.toLocaleString()} zł</span>
              <button className="text-[9px] font-semibold" style={{ color: C.blue }}>Szczegóły →</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GuestsView() {
  const guests = [
    { name: "Jan Kowalski", email: "jan.k@email.pl", stays: 3, total: "4 560 zł", loyalty: "Gold" },
    { name: "Anna Nowak", email: "anna.n@email.pl", stays: 1, total: "1 520 zł", loyalty: "Standard" },
    { name: "Piotr Wiśniewski", email: "piotr.w@email.pl", stays: 5, total: "12 400 zł", loyalty: "Platinum" },
    { name: "Katarzyna Zielińska", email: "kasia.z@email.pl", stays: 2, total: "9 500 zł", loyalty: "Gold" },
    { name: "Ewa Duda", email: "ewa.d@email.pl", stays: 7, total: "24 800 zł", loyalty: "Platinum" },
  ];
  return (
    <div className="p-3 space-y-2">
      <div className="flex items-center gap-2">
        <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: C.white, border: `1px solid ${C.sky}` }}>
          <Search className="w-3.5 h-3.5" style={{ color: C.gray }} />
          <input placeholder="Szukaj gościa..." className="text-xs bg-transparent outline-none flex-1" style={{ color: C.navy }} />
        </div>
      </div>
      <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${C.sky}` }}>
        <table className="w-full text-[10px]">
          <thead>
            <tr style={{ background: C.blue }}>
              <th className="px-2 py-2 text-left text-white font-semibold">Gość</th>
              <th className="px-2 py-2 text-center text-white font-semibold">Pobyty</th>
              <th className="px-2 py-2 text-center text-white font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {guests.map((g, i) => {
              const lc = g.loyalty === "Platinum" ? "#8B5CF6" : g.loyalty === "Gold" ? C.gold : C.gray;
              return (
                <tr key={i} className="border-t" style={{ borderColor: C.sky, background: C.white }}>
                  <td className="px-2 py-2">
                    <span className="font-semibold" style={{ color: C.navy }}>{g.name}</span>
                    <span className="block text-[9px]" style={{ color: C.gray }}>{g.email}</span>
                  </td>
                  <td className="px-2 py-2 text-center">
                    <span className="font-bold" style={{ color: C.navy }}>{g.stays}</span>
                    <span className="block text-[9px]" style={{ color: C.gray }}>{g.total}</span>
                  </td>
                  <td className="px-2 py-2 text-center">
                    <span className="px-2 py-0.5 rounded-full text-[8px] font-bold" style={{ background: lc + "15", color: lc }}>{g.loyalty}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RatesView() {
  const types = [
    { type: "Standard", weekday: 380, weekend: 450, peak: 520 },
    { type: "Deluxe", weekday: 580, weekend: 680, peak: 780 },
    { type: "Suite", weekday: 950, weekend: 1100, peak: 1300 },
    { type: "Penthouse", weekday: 1400, weekend: 1650, peak: 1900 },
  ];
  return (
    <div className="p-3 space-y-2">
      <span className="text-xs font-bold" style={{ color: C.navy }}>Cennik pokojów (za noc)</span>
      <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${C.sky}` }}>
        <table className="w-full text-[10px]">
          <thead>
            <tr style={{ background: C.blue }}>
              <th className="px-2 py-2 text-left text-white font-semibold">Typ</th>
              <th className="px-2 py-2 text-center text-white font-semibold">Pn-Czw</th>
              <th className="px-2 py-2 text-center text-white font-semibold">Pt-Nd</th>
              <th className="px-2 py-2 text-center text-white font-semibold">Sezon</th>
            </tr>
          </thead>
          <tbody>
            {types.map((t, i) => (
              <tr key={i} className="border-t" style={{ borderColor: C.sky, background: C.white }}>
                <td className="px-2 py-2 font-semibold" style={{ color: C.navy }}>{t.type}</td>
                <td className="px-2 py-2 text-center font-bold" style={{ color: C.blue }}>{t.weekday} zł</td>
                <td className="px-2 py-2 text-center font-bold" style={{ color: C.gold }}>{t.weekend} zł</td>
                <td className="px-2 py-2 text-center font-bold" style={{ color: "#EF4444" }}>{t.peak} zł</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function BookingEngineView() {
  const [step, setStep] = useState<"search" | "results" | "confirm">("search");
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  const availableRooms = [
    { type: "Standard", desc: "25 m² • łóżko podwójne • widok na miasto", price: 380, amenities: ["WiFi", "TV", "Klimatyzacja", "Sejf"], rating: 4.3, left: 2, img: "🏨" },
    { type: "Deluxe", desc: "35 m² • łóżko king • balkon • widok na morze", price: 580, amenities: ["WiFi", "TV", "Minibar", "Balkon", "Szlafrok"], rating: 4.7, left: 1, img: "🌊" },
    { type: "Suite", desc: "55 m² • salon + sypialnia • jacuzzi • panorama", price: 950, amenities: ["WiFi", "TV", "Minibar", "Jacuzzi", "Taras", "Espresso"], rating: 4.9, left: 1, img: "✨" },
    { type: "Penthouse", desc: "85 m² • 2 sypialnie • prywatny taras • SPA", price: 1400, amenities: ["WiFi", "TV", "Butler", "SPA", "Taras", "Kuchnia"], rating: 5.0, left: 1, img: "👑" },
  ];

  if (step === "confirm") {
    const room = availableRooms.find(r => r.type === selectedRoom);
    return (
      <div className="p-4 text-center space-y-3">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
          <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center" style={{ background: "#22C55E20" }}>
            <CheckCircle2 className="w-8 h-8" style={{ color: "#22C55E" }} />
          </div>
        </motion.div>
        <h3 className="font-bold text-sm" style={{ color: C.navy }}>Rezerwacja potwierdzona!</h3>
        <p className="text-[10px]" style={{ color: C.gray }}>{room?.type} • 23-27 mar 2026 • 4 noce</p>
        <p className="font-bold text-xl" style={{ color: C.blue }}>{room ? room.price * 4 : 0} zł</p>
        <p className="text-[9px] font-mono" style={{ color: C.gray }}>BK-{Math.floor(Math.random() * 9000 + 1000)}</p>
        <button onClick={() => { setStep("search"); setSelectedRoom(null); }} className="text-[10px] font-semibold" style={{ color: C.blue }}>← Wróć do wyszukiwania</button>
      </div>
    );
  }

  if (step === "results") {
    return (
      <div className="p-3 space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold" style={{ color: C.navy }}>Dostępne pokoje</span>
            <p className="text-[9px]" style={{ color: C.gray }}>23-27 mar 2026 • 2 os. • 4 noce</p>
          </div>
          <button onClick={() => setStep("search")} className="text-[10px] font-semibold" style={{ color: C.blue }}>← Zmień</button>
        </div>
        <div className="space-y-2">
          {availableRooms.map((r, i) => (
            <motion.div key={r.type} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className="p-3 rounded-xl" style={{ background: C.white, border: selectedRoom === r.type ? `2px solid ${C.blue}` : `1px solid ${C.sky}` }}>
              <div className="flex items-start gap-3">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0" style={{ background: C.sky }}>
                  {r.img}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-[12px]" style={{ color: C.navy }}>{r.type}</h4>
                    <div className="flex items-center gap-0.5">
                      <Star className="w-3 h-3" style={{ color: C.gold }} />
                      <span className="text-[10px] font-bold" style={{ color: C.navy }}>{r.rating}</span>
                    </div>
                  </div>
                  <p className="text-[9px] mt-0.5" style={{ color: C.gray }}>{r.desc}</p>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {r.amenities.map(a => (
                      <span key={a} className="px-1.5 py-0.5 rounded text-[8px] font-semibold" style={{ background: C.sky, color: C.blue }}>{a}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div>
                      <span className="font-bold text-base" style={{ color: C.blue }}>{r.price} zł</span>
                      <span className="text-[9px] ml-1" style={{ color: C.gray }}>/noc</span>
                      <span className="text-[9px] block" style={{ color: C.gold }}>Ostatnie {r.left} {r.left === 1 ? "pokój" : "pokoje"}!</span>
                    </div>
                    <motion.button whileTap={{ scale: 0.95 }} onClick={() => { setSelectedRoom(r.type); setStep("confirm"); }}
                      className="px-3 py-2 rounded-lg text-[10px] font-bold text-white" style={{ background: C.blue }}>Rezerwuj</motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 space-y-3">
      <div className="p-4 rounded-xl text-center" style={{ background: `linear-gradient(135deg, ${C.blue}, ${C.dark})` }}>
        <Building2 className="w-8 h-8 mx-auto mb-2 text-white opacity-80" />
        <h3 className="font-bold text-sm text-white">Wyszukaj pokój</h3>
        <p className="text-[10px] mt-0.5 text-white opacity-70">Sprawdź dostępność i zarezerwuj online</p>
      </div>

      <div className="p-3 rounded-xl space-y-2" style={{ background: C.white, border: `1px solid ${C.sky}` }}>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[9px] font-bold block mb-1" style={{ color: C.gray }}>Zameldowanie</label>
            <div className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg" style={{ background: C.sky }}>
              <Calendar className="w-3.5 h-3.5" style={{ color: C.blue }} />
              <span className="text-[11px] font-semibold" style={{ color: C.navy }}>23 mar 2026</span>
            </div>
          </div>
          <div>
            <label className="text-[9px] font-bold block mb-1" style={{ color: C.gray }}>Wymeldowanie</label>
            <div className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg" style={{ background: C.sky }}>
              <Calendar className="w-3.5 h-3.5" style={{ color: C.blue }} />
              <span className="text-[11px] font-semibold" style={{ color: C.navy }}>27 mar 2026</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[9px] font-bold block mb-1" style={{ color: C.gray }}>Goście</label>
            <div className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg" style={{ background: C.sky }}>
              <Users className="w-3.5 h-3.5" style={{ color: C.blue }} />
              <span className="text-[11px] font-semibold" style={{ color: C.navy }}>2 osoby</span>
            </div>
          </div>
          <div>
            <label className="text-[9px] font-bold block mb-1" style={{ color: C.gray }}>Typ pokoju</label>
            <div className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg" style={{ background: C.sky }}>
              <Bed className="w-3.5 h-3.5" style={{ color: C.blue }} />
              <span className="text-[11px] font-semibold" style={{ color: C.navy }}>Dowolny</span>
            </div>
          </div>
        </div>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setStep("results")}
          className="w-full py-2.5 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2" style={{ background: C.blue }}>
          <Search className="w-4 h-4" /> Szukaj pokoju
        </motion.button>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[
          { icon: <Waves className="w-4 h-4" />, label: "SPA & Wellness", sub: "Basen, sauna, masaże" },
          { icon: <Star className="w-4 h-4" />, label: "Restauracja", sub: "Kuchnia śródziemnomorska" },
          { icon: <Key className="w-4 h-4" />, label: "Concierge 24/7", sub: "Wycieczki, transfery" },
        ].map((f, i) => (
          <div key={i} className="p-2.5 rounded-xl text-center" style={{ background: C.white, border: `1px solid ${C.sky}` }}>
            <div className="mx-auto w-8 h-8 rounded-lg flex items-center justify-center mb-1" style={{ background: C.sky, color: C.blue }}>{f.icon}</div>
            <span className="text-[10px] font-bold block" style={{ color: C.navy }}>{f.label}</span>
            <span className="text-[8px]" style={{ color: C.gray }}>{f.sub}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsView() {
  return (
    <div className="p-3 space-y-2">
      <span className="text-xs font-bold" style={{ color: C.navy }}>Ustawienia hotelu</span>
      {[
        { label: "Nazwa", value: "QloHotel & SPA" },
        { label: "Adres", value: "ul. Nadmorska 15, Sopot" },
        { label: "Telefon", value: "+48 58 100 20 30" },
        { label: "Check-in", value: "14:00" },
        { label: "Check-out", value: "11:00" },
        { label: "Pokoje", value: "12 pokojów, 4 typy" },
      ].map((s, i) => (
        <div key={i} className="flex items-center justify-between p-2.5 rounded-xl" style={{ background: C.white, border: `1px solid ${C.sky}` }}>
          <span className="text-[10px]" style={{ color: C.gray }}>{s.label}</span>
          <span className="text-[11px] font-semibold" style={{ color: C.navy }}>{s.value}</span>
        </div>
      ))}
    </div>
  );
}
