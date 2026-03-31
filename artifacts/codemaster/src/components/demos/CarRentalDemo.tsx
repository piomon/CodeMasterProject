import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PreviewShell, DemoNav, DemoSection } from "./PreviewShell";
import { Car, Calendar, MapPin, Fuel, Settings, Star, CheckCircle2, ChevronRight, Home, Search, CreditCard, Users } from "lucide-react";

const C = { black: "#0A0A0A", red: "#DC2626", silver: "#C0C0C0", graphite: "#1E1E1E", gray: "#6B7280", white: "#F8FAFC", dark: "#111" };

const cars = [
  { name: "BMW 320i", cat: "Sedan", price: 280, fuel: "Benzyna", trans: "Automat", seats: 5, year: 2025, rating: 4.9, icon: "🚗" },
  { name: "Mercedes GLC 300", cat: "SUV", price: 420, fuel: "Diesel", trans: "Automat", seats: 5, year: 2025, rating: 5.0, icon: "🚙" },
  { name: "Audi A5 Sportback", cat: "Sedan", price: 350, fuel: "Benzyna", trans: "Automat", seats: 5, year: 2024, rating: 4.8, icon: "🏎️" },
  { name: "Porsche Cayenne", cat: "SUV", price: 680, fuel: "Benzyna", trans: "Automat", seats: 5, year: 2025, rating: 5.0, icon: "🏆" },
  { name: "Tesla Model 3", cat: "Elektryczny", price: 320, fuel: "Elektryczny", trans: "Automat", seats: 5, year: 2025, rating: 4.9, icon: "⚡" },
  { name: "VW Transporter", cat: "Van", price: 250, fuel: "Diesel", trans: "Manual", seats: 9, year: 2024, rating: 4.7, icon: "🚐" },
];

const categories = ["Wszystkie", "Sedan", "SUV", "Elektryczny", "Van"];

export function CarRentalDemo({ name }: { name: string; features: string[]; industry?: string }) {
  const [page, setPage] = useState("home");
  const tabs = [
    { id: "home", label: "Start", icon: <Home className="w-3 h-3" /> },
    { id: "fleet", label: "Flota", icon: <Car className="w-3 h-3" /> },
    { id: "compare", label: "Porównaj", icon: <Search className="w-3 h-3" /> },
    { id: "booking", label: "Rezerwacja", icon: <Calendar className="w-3 h-3" /> },
    { id: "account", label: "Konto", icon: <CreditCard className="w-3 h-3" /> },
  ];

  return (
    <PreviewShell title={name}>
      <DemoNav tabs={tabs} activeTab={page} onTabChange={setPage} logo="DriveX" />
      <AnimatePresence mode="wait">
        <motion.div key={page} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
          {page === "home" && <HomePage onNav={setPage} />}
          {page === "fleet" && <FleetPage onNav={setPage} />}
          {page === "compare" && <ComparePage />}
          {page === "booking" && <BookingPage />}
          {page === "account" && <AccountPage />}
        </motion.div>
      </AnimatePresence>
    </PreviewShell>
  );
}

function HomePage({ onNav }: { onNav: (p: string) => void }) {
  return (
    <div>
      <div className="p-10 text-center" style={{ background: `linear-gradient(160deg, ${C.black}, ${C.red}25)` }}>
        <p className="text-[10px] tracking-[0.4em] uppercase" style={{ color: C.red }}>Premium Car Rental</p>
        <h1 className="font-display font-bold text-4xl mt-2 text-white">Drive<span style={{ color: C.red }}>X</span></h1>
        <p className="text-xs mt-2 max-w-[260px] mx-auto leading-relaxed" style={{ color: C.silver }}>Wypożyczalnia samochodów premium. BMW, Mercedes, Porsche, Tesla — odbiór w 8 miastach Polski.</p>
        <div className="flex gap-3 justify-center mt-6">
          <motion.button whileHover={{ scale: 1.03 }} onClick={() => onNav("fleet")}
            className="px-7 py-3.5 rounded-lg font-bold text-sm text-white shadow-lg" style={{ background: C.red }}>Przeglądaj flotę</motion.button>
          <button onClick={() => onNav("booking")} className="px-7 py-3.5 rounded-lg font-semibold text-sm border" style={{ borderColor: C.red + "40", color: C.red }}>Rezerwuj</button>
        </div>
      </div>
      <DemoSection>
        <div className="grid grid-cols-4 gap-2">
          {[
            { icon: "🚗", label: "50+ aut", desc: "Premium flota" },
            { icon: "📍", label: "8 miast", desc: "Cała Polska" },
            { icon: "🔑", label: "24h", desc: "Odbiór/zwrot" },
            { icon: "🛡️", label: "OC/AC", desc: "W cenie" },
          ].map((f, i) => (
            <div key={i} className="p-3 rounded-xl text-center" style={{ background: C.graphite }}>
              <span className="text-lg block">{f.icon}</span>
              <span className="text-[8px] font-bold block mt-1 text-white">{f.label}</span>
              <span className="text-[7px]" style={{ color: C.gray }}>{f.desc}</span>
            </div>
          ))}
        </div>
        <h3 className="font-bold text-sm text-white mt-4">Popularne modele</h3>
        <div className="grid grid-cols-2 gap-3">
          {cars.slice(0, 4).map((c, i) => (
            <motion.div key={i} whileHover={{ y: -3 }} onClick={() => onNav("fleet")}
              className="p-4 rounded-xl border cursor-pointer" style={{ borderColor: C.graphite, background: C.dark }}>
              <span className="text-2xl block text-center mb-1">{c.icon}</span>
              <h4 className="font-bold text-xs text-white text-center">{c.name}</h4>
              <p className="text-center text-[10px]" style={{ color: C.gray }}>{c.cat}</p>
              <p className="text-center font-bold text-sm mt-1" style={{ color: C.red }}>od {c.price} zł<span className="text-[10px] font-normal" style={{ color: C.gray }}>/dzień</span></p>
            </motion.div>
          ))}
        </div>
        <div className="p-4 rounded-2xl mt-3" style={{ background: C.graphite, border: `1px solid ${C.red}20` }}>
          <p className="text-[10px] tracking-[0.2em] uppercase text-center" style={{ color: C.red }}>Opinie klientów</p>
          <p className="text-xs mt-2 text-center italic text-white/80">"Mercedes GLC był w idealnym stanie. Szybka rezerwacja i odbiór. Polecam DriveX!"</p>
          <p className="text-[10px] text-center mt-1" style={{ color: C.red }}>— Jan K. ★★★★★</p>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-3">
          {[{ l: "Klientów", v: "2,000+" },{ l: "Ocena Google", v: "4.9" },{ l: "Lat na rynku", v: "5" }].map((s, i) => (
            <div key={i} className="p-3 rounded-xl text-center" style={{ background: C.graphite }}>
              <span className="font-bold text-sm block" style={{ color: C.red }}>{s.v}</span>
              <span className="text-[9px]" style={{ color: C.gray }}>{s.l}</span>
            </div>
          ))}
        </div>
      </DemoSection>
      <DemoBenefits accentColor={C.red} bgColor={C.dark} textColor={"#FFFFFF"} benefits={[
        { icon: "🚗", title: "Nowoczesny listing", desc: "Premium prezentacja floty" },
        { icon: "📅", title: "Online booking", desc: "Kalendarz dostępności pojazdów" },
        { icon: "⚙️", title: "Panel floty", desc: "Statusy, serwis i przeglądy" },
        { icon: "📊", title: "Porównywarka", desc: "Zestawienie parametrów aut" },
      ]} />
      <DemoFooterCTA accentColor={C.red} bgColor={C.dark} />
    </div>
  );
}

function FleetPage({ onNav }: { onNav: (p: string) => void }) {
  const [selCat, setSelCat] = useState("Wszystkie");
  const filtered = selCat === "Wszystkie" ? cars : cars.filter(c => c.cat === selCat);
  return (
    <DemoSection>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map(c => (
          <button key={c} onClick={() => setSelCat(c)} className="px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap"
            style={selCat === c ? { background: C.red, color: "white" } : { background: C.graphite, color: C.gray }}>{c}</button>
        ))}
      </div>
      {filtered.map((c, i) => (
        <motion.div key={c.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
          className="p-4 rounded-xl border" style={{ borderColor: C.graphite, background: C.dark }}>
          <div className="flex gap-4">
            <span className="text-4xl">{c.icon}</span>
            <div className="flex-1">
              <h4 className="font-bold text-sm text-white">{c.name}</h4>
              <div className="flex items-center gap-2 mt-0.5"><Star className="w-3 h-3" style={{ fill: "#FBBF24", color: "#FBBF24" }} /><span className="text-[10px]" style={{ color: C.gray }}>{c.rating} • {c.year}</span></div>
              <div className="flex gap-2 mt-1.5 flex-wrap">
                <span className="px-1.5 py-0.5 rounded text-[9px]" style={{ background: C.graphite, color: C.gray }}><Fuel className="w-3 h-3 inline mr-0.5" />{c.fuel}</span>
                <span className="px-1.5 py-0.5 rounded text-[9px]" style={{ background: C.graphite, color: C.gray }}><Settings className="w-3 h-3 inline mr-0.5" />{c.trans}</span>
                <span className="px-1.5 py-0.5 rounded text-[9px]" style={{ background: C.graphite, color: C.gray }}><Users className="w-3 h-3 inline mr-0.5" />{c.seats}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between mt-3 pt-3 border-t" style={{ borderColor: C.graphite }}>
            <span className="font-bold text-lg" style={{ color: C.red }}>{c.price} zł<span className="text-[10px] font-normal" style={{ color: C.gray }}>/dzień</span></span>
            <motion.button whileHover={{ scale: 1.03 }} onClick={() => onNav("booking")}
              className="px-5 py-2 rounded-lg font-semibold text-sm text-white" style={{ background: C.red }}>Rezerwuj</motion.button>
          </div>
        </motion.div>
      ))}
    </DemoSection>
  );
}

function ComparePage() {
  const [sel, setSel] = useState<number[]>([0, 1]);
  const c1 = cars[sel[0]], c2 = cars[sel[1]];
  const rows = [
    { label: "Kategoria", v1: c1.cat, v2: c2.cat },
    { label: "Paliwo", v1: c1.fuel, v2: c2.fuel },
    { label: "Skrzynia", v1: c1.trans, v2: c2.trans },
    { label: "Miejsca", v1: String(c1.seats), v2: String(c2.seats) },
    { label: "Rocznik", v1: String(c1.year), v2: String(c2.year) },
    { label: "Ocena", v1: String(c1.rating), v2: String(c2.rating) },
    { label: "Cena/dzień", v1: `${c1.price} zł`, v2: `${c2.price} zł` },
  ];

  return (
    <DemoSection>
      <h3 className="font-bold text-sm text-white">Porównaj modele</h3>
      <div className="grid grid-cols-2 gap-3 mb-3">
        {[c1, c2].map((c, i) => (
          <div key={i} className="p-3 rounded-xl text-center" style={{ background: C.graphite }}>
            <span className="text-3xl block mb-1">{c.icon}</span>
            <span className="text-xs font-bold text-white">{c.name}</span>
          </div>
        ))}
      </div>
      <div className="space-y-1">
        {rows.map((r, i) => (
          <div key={i} className="grid grid-cols-3 gap-2 py-2 border-b" style={{ borderColor: C.graphite }}>
            <span className="text-[10px] font-medium" style={{ color: C.gray }}>{r.label}</span>
            <span className="text-[10px] text-center text-white">{r.v1}</span>
            <span className="text-[10px] text-center text-white">{r.v2}</span>
          </div>
        ))}
      </div>
    </DemoSection>
  );
}

function BookingPage() {
  const [confirmed, setConfirmed] = useState(false);
  if (confirmed) return (
    <DemoSection>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
        <CheckCircle2 className="w-12 h-12 mx-auto mb-3" style={{ color: "#10B981" }} />
        <h3 className="font-bold text-lg text-white">Rezerwacja potwierdzona!</h3>
        <p className="text-sm" style={{ color: C.gray }}>BMW 320i • 15-20 kwi 2026</p>
        <p className="text-xs font-bold mt-2" style={{ color: C.red }}>Nr: DRX-{Math.floor(Math.random()*9000+1000)}</p>
      </motion.div>
    </DemoSection>
  );
  return (
    <DemoSection>
      <h3 className="font-bold text-sm text-white">Rezerwacja: BMW 320i</h3>
      <div className="p-3 rounded-xl" style={{ background: C.graphite }}>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div><span className="text-[10px]" style={{ color: C.gray }}>Odbiór</span><p className="font-medium text-white">15 kwi, 10:00</p></div>
          <div><span className="text-[10px]" style={{ color: C.gray }}>Zwrot</span><p className="font-medium text-white">20 kwi, 10:00</p></div>
          <div><span className="text-[10px]" style={{ color: C.gray }}>Lokalizacja</span><p className="font-medium text-white">Warszawa, Okęcie</p></div>
          <div><span className="text-[10px]" style={{ color: C.gray }}>Dni</span><p className="font-medium text-white">5 dni</p></div>
        </div>
      </div>
      <h4 className="text-xs font-bold text-white">Dodatki:</h4>
      {["GPS nawigacja (+30 zł/dzień)", "Fotelik dziecięcy (+25 zł/dzień)", "Ubezpieczenie Premium (+60 zł/dzień)", "Dodatkowy kierowca (+40 zł/dzień)"].map((a, i) => (
        <label key={i} className="flex items-center gap-3 p-3 rounded-xl border cursor-pointer" style={{ borderColor: C.graphite, background: C.dark }}>
          <input type="checkbox" className="accent-red-600 w-4 h-4" defaultChecked={i === 2} />
          <span className="text-xs text-white">{a}</span>
        </label>
      ))}
      <div className="p-3 rounded-xl" style={{ background: C.graphite }}>
        <div className="flex justify-between"><span style={{ color: C.gray }}>5 × 280 zł</span><span className="font-semibold text-white">1 400 zł</span></div>
        <div className="flex justify-between mt-1"><span style={{ color: C.gray }}>Ubezpieczenie Premium</span><span className="text-white">300 zł</span></div>
        <div className="border-t mt-2 pt-2 flex justify-between" style={{ borderColor: C.gray + "20" }}>
          <span className="font-bold text-white">Razem</span><span className="font-bold text-xl" style={{ color: C.red }}>1 700 zł</span>
        </div>
      </div>
      <motion.button whileHover={{ scale: 1.02 }} onClick={() => setConfirmed(true)}
        className="w-full py-3.5 rounded-xl font-bold text-sm text-white" style={{ background: C.red }}>Potwierdź rezerwację</motion.button>
    </DemoSection>
  );
}

function AccountPage() {
  return (
    <DemoSection>
      <div className="flex items-center gap-4 mb-4">
        <div className="w-14 h-14 rounded-full flex items-center justify-center font-bold" style={{ background: C.red, color: "white" }}>JK</div>
        <div><h3 className="font-bold text-base text-white">Jan Kowalski</h3><p className="text-xs" style={{ color: C.gray }}>Klient od 2024</p></div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {[{ l: "Wypożyczeń", v: "12" },{ l: "Punkty", v: "840" },{ l: "Status", v: "Gold" }].map((s, i) => (
          <div key={i} className="p-3 rounded-xl text-center" style={{ background: C.graphite }}>
            <span className="font-bold text-sm block" style={{ color: i === 2 ? C.red : "white" }}>{s.v}</span>
            <span className="text-[9px]" style={{ color: C.gray }}>{s.l}</span>
          </div>
        ))}
      </div>
      <h4 className="text-xs font-bold mt-3 text-white">Historia</h4>
      {[{ car: "Mercedes GLC", date: "1-5 mar 2026", total: "2 100 zł" },{ car: "BMW 320i", date: "10-14 lut 2026", total: "1 400 zł" }].map((h, i) => (
        <div key={i} className="flex items-center gap-3 p-3 rounded-xl border" style={{ borderColor: C.graphite, background: C.dark }}>
          <Car className="w-4 h-4" style={{ color: C.red }} />
          <div className="flex-1"><span className="text-xs font-medium text-white">{h.car}</span><p className="text-[10px]" style={{ color: C.gray }}>{h.date}</p></div>
          <span className="font-bold text-xs text-white">{h.total}</span>
        </div>
      ))}
    </DemoSection>
  );
}
