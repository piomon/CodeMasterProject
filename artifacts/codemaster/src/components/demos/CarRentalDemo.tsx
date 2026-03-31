import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PreviewShell, DemoBenefits, DemoFooterCTA } from "./PreviewShell";
import { Car, Calendar, MapPin, Fuel, Star, CheckCircle2, ChevronRight, Search, Users, Clock, Shield, Settings } from "lucide-react";

const C = { blue: "#1E40AF", orange: "#F97316", white: "#FFFFFF", light: "#F1F5F9", gray: "#6B7280", green: "#10B981", navy: "#0F172A", amber: "#F59E0B", text: "#1E293B", red: "#EF4444" };

type RentalPage = "home" | "fleet" | "detail" | "booking" | "reservations";

const cars = [
  { id: 1, name: "BMW Seria 3", category: "Sedan", year: 2025, fuel: "Benzyna", transmission: "Automat", seats: 5, price: 320, image: "🚗", rating: 4.9, available: true, features: ["GPS", "Klimatyzacja", "Kamera cofania", "Apple CarPlay"] },
  { id: 2, name: "Mercedes-Benz GLC", category: "SUV", year: 2025, fuel: "Diesel", transmission: "Automat", seats: 5, price: 420, image: "🚙", rating: 4.8, available: true, features: ["GPS", "Skóra", "Panorama", "LED Matrix"] },
  { id: 3, name: "Audi A4 Avant", category: "Kombi", year: 2024, fuel: "Benzyna", transmission: "Automat", seats: 5, price: 350, image: "🚘", rating: 4.7, available: true, features: ["GPS", "Klimatyzacja 3-stref.", "Virtual Cockpit"] },
  { id: 4, name: "VW T-Roc", category: "SUV", year: 2024, fuel: "Benzyna", transmission: "Manualna", seats: 5, price: 220, image: "🚐", rating: 4.6, available: false, features: ["GPS", "Klimatyzacja", "Tempomat"] },
  { id: 5, name: "Tesla Model 3", category: "Elektryczny", year: 2025, fuel: "Elektryk", transmission: "Automat", seats: 5, price: 380, image: "⚡", rating: 4.9, available: true, features: ["Autopilot", "Supercharger", "OTA Updates"] },
  { id: 6, name: "Volvo XC60", category: "SUV", year: 2025, fuel: "Hybryda", transmission: "Automat", seats: 5, price: 390, image: "🚙", rating: 4.8, available: true, features: ["Pilot Assist", "Harman Kardon", "Panorama"] },
];

type CarCategory = "all" | "Sedan" | "SUV" | "Kombi" | "Elektryczny";

const extras = [
  { name: "Nawigacja GPS", price: 15, checked: false },
  { name: "Fotelik dziecięcy", price: 25, checked: false },
  { name: "Dodatkowy kierowca", price: 30, checked: false },
  { name: "Pełne ubezpieczenie AC", price: 45, checked: false },
];

const reservations = [
  { car: "BMW Seria 3", from: "2 kwi", to: "5 kwi", status: "confirmed" as const, code: "AR-2026-4821" },
  { car: "Tesla Model 3", from: "15 kwi", to: "18 kwi", status: "pending" as const, code: "AR-2026-4835" },
  { car: "Mercedes GLC", from: "10 mar", to: "14 mar", status: "returned" as const, code: "AR-2026-4790" },
];

const navItems: { id: RentalPage; label: string; icon: ReactNode }[] = [
  { id: "home", label: "Start", icon: <Car className="w-3.5 h-3.5" /> },
  { id: "fleet", label: "Flota", icon: <Search className="w-3.5 h-3.5" /> },
  { id: "booking", label: "Cennik", icon: <Calendar className="w-3.5 h-3.5" /> },
  { id: "reservations", label: "Rezerwacje", icon: <Clock className="w-3.5 h-3.5" /> },
];

export function CarRentalDemo({ name }: { name: string; features: string[] }) {
  const [page, setPage] = useState<RentalPage>("home");
  const [detailCar, setDetailCar] = useState(0);

  const goDetail = (idx: number) => { setDetailCar(idx); setPage("detail"); };

  return (
    <PreviewShell title={name}>
      <div style={{ background: C.light, minHeight: 540 }}>
        <div className="flex items-center justify-between px-5 py-3" style={{ background: C.white, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
          <div className="flex items-center gap-2">
            <Car className="w-5 h-5" style={{ color: C.blue }} />
            <h1 className="font-bold text-sm" style={{ color: C.navy }}>Auto<span style={{ color: C.orange }}>Rent</span></h1>
          </div>
          <div className="flex items-center gap-2">
            {navItems.map(n => (
              <button key={n.id} onClick={() => setPage(n.id)} className="px-2.5 py-1 rounded-lg text-[9px] font-semibold whitespace-nowrap transition-all"
                style={(page === n.id || (page === "detail" && n.id === "fleet")) ? { background: C.blue, color: C.white } : { color: C.gray }}>
                {n.label}
              </button>
            ))}
            <button className="px-3 py-1.5 rounded-lg text-[9px] font-bold text-white" style={{ background: C.orange }}>Szybka Rezerwacja</button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={page} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            {page === "home" && <HomePage onNav={setPage} onDetail={goDetail} />}
            {page === "fleet" && <FleetPage onDetail={goDetail} />}
            {page === "detail" && <DetailPage car={cars[detailCar]} onBack={() => setPage("fleet")} onBook={() => setPage("booking")} />}
            {page === "booking" && <BookingPage />}
            {page === "reservations" && <ReservationsPage />}
          </motion.div>
        </AnimatePresence>
      </div>

      <DemoBenefits accentColor={C.orange} bgColor={C.light} textColor={C.navy} benefits={[
        { icon: "🚗", title: "Flota premium", desc: "BMW, Mercedes, Audi, Tesla" },
        { icon: "📱", title: "Rezerwacja online", desc: "Szybka rezerwacja w 2 minuty" },
        { icon: "🛡️", title: "Pełne ubezpieczenie", desc: "OC, AC, NNW w cenie" },
        { icon: "📍", title: "Dostawa auta", desc: "Pod wskazany adres lub lotnisko" },
      ]} />
      <DemoFooterCTA accentColor={C.orange} bgColor={C.navy} />
    </PreviewShell>
  );
}

function HomePage({ onNav, onDetail }: { onNav: (p: RentalPage) => void; onDetail: (i: number) => void }) {
  return (
    <div>
      <div className="p-6 pb-8" style={{ background: `linear-gradient(160deg, ${C.blue}, ${C.navy})` }}>
        <p className="text-[10px] tracking-widest uppercase text-white/50">Wypożyczalnia samochodów premium</p>
        <h2 className="font-bold text-2xl mt-1 text-white">Znajdź idealne <span style={{ color: C.orange }}>auto</span></h2>

        <div className="p-4 mt-4 rounded-xl" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)" }}>
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2.5 rounded-lg" style={{ background: "rgba(255,255,255,0.06)" }}>
              <span className="text-[8px] text-white/40 block"><MapPin className="w-2.5 h-2.5 inline mr-0.5" />Odbiór</span>
              <select className="bg-transparent text-xs text-white w-full outline-none mt-0.5">
                <option>Warszawa Centrum</option><option>Warszawa Lotnisko</option><option>Kraków Centrum</option>
              </select>
            </div>
            <div className="p-2.5 rounded-lg" style={{ background: "rgba(255,255,255,0.06)" }}>
              <span className="text-[8px] text-white/40 block"><MapPin className="w-2.5 h-2.5 inline mr-0.5" />Zwrot</span>
              <select className="bg-transparent text-xs text-white w-full outline-none mt-0.5">
                <option>Warszawa Lotnisko</option><option>Warszawa Centrum</option><option>Kraków Centrum</option>
              </select>
            </div>
            <div className="p-2.5 rounded-lg" style={{ background: "rgba(255,255,255,0.06)" }}>
              <span className="text-[8px] text-white/40 block"><Calendar className="w-2.5 h-2.5 inline mr-0.5" />Od</span>
              <span className="text-xs text-white block mt-0.5">2 kwi 2026, 10:00</span>
            </div>
            <div className="p-2.5 rounded-lg" style={{ background: "rgba(255,255,255,0.06)" }}>
              <span className="text-[8px] text-white/40 block"><Calendar className="w-2.5 h-2.5 inline mr-0.5" />Do</span>
              <span className="text-xs text-white block mt-0.5">5 kwi 2026, 10:00</span>
            </div>
          </div>
          <div className="mt-2">
            <select className="w-full px-3 py-2 rounded-lg text-xs text-white/80" style={{ background: "rgba(255,255,255,0.06)" }}>
              <option>Typ pojazdu: Wszystkie</option><option>Sedan</option><option>SUV</option><option>Kombi</option><option>Elektryczny</option>
            </select>
          </div>
          <motion.button whileHover={{ scale: 1.02 }} onClick={() => onNav("fleet")}
            className="w-full mt-3 py-2.5 rounded-lg text-xs font-bold text-white flex items-center justify-center gap-1" style={{ background: C.orange }}>
            <Search className="w-3.5 h-3.5" /> Szukaj dostępnych aut
          </motion.button>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold" style={{ color: C.navy }}>Popularne modele</span>
          <button onClick={() => onNav("fleet")} className="text-[10px] font-medium flex items-center gap-1" style={{ color: C.blue }}>Cała flota <ChevronRight className="w-3 h-3" /></button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {cars.filter(c => c.available).slice(0, 3).map((car, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              onClick={() => onDetail(cars.indexOf(car))} className="p-3 rounded-xl hover:shadow-md transition-all cursor-pointer" style={{ background: C.white }}>
              <div className="w-full h-12 rounded-lg flex items-center justify-center text-2xl" style={{ background: C.light }}>{car.image}</div>
              <h4 className="font-bold text-[10px] mt-2" style={{ color: C.navy }}>{car.name}</h4>
              <p className="text-[8px]" style={{ color: C.gray }}>{car.category} · {car.fuel}</p>
              <div className="flex items-center gap-1 mt-1">
                <Star className="w-2.5 h-2.5 fill-current" style={{ color: C.amber }} />
                <span className="text-[9px]" style={{ color: C.amber }}>{car.rating}</span>
              </div>
              <span className="font-bold text-xs block mt-1" style={{ color: C.orange }}>{car.price} zł/dzień</span>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-4 gap-2">
          {[{ icon: "🚗", l: "Sedany", c: "5" }, { icon: "🚙", l: "SUV", c: "4" }, { icon: "⚡", l: "Elektryk", c: "3" }, { icon: "🚐", l: "Kombi", c: "2" }].map((cat, i) => (
            <div key={i} className="p-2.5 rounded-xl text-center cursor-pointer hover:shadow-sm transition-all" style={{ background: C.white }}>
              <span className="text-lg block">{cat.icon}</span>
              <span className="text-[8px] font-bold block mt-0.5" style={{ color: C.navy }}>{cat.l}</span>
              <span className="text-[7px]" style={{ color: C.gray }}>{cat.c} aut</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[{ v: "30+", l: "Aut w flocie" }, { v: "24/7", l: "Wsparcie" }, { v: "4.8★", l: "Ocena klientów" }].map((s, i) => (
            <div key={i} className="p-3 rounded-xl text-center" style={{ background: C.blue + "08" }}>
              <span className="font-bold text-sm block" style={{ color: C.blue }}>{s.v}</span>
              <span className="text-[9px]" style={{ color: C.gray }}>{s.l}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FleetPage({ onDetail }: { onDetail: (i: number) => void }) {
  const [cat, setCat] = useState<CarCategory>("all");
  const filtered = cat === "all" ? cars : cars.filter(c => c.category === cat);
  return (
    <div className="p-4 space-y-3">
      <h3 className="font-bold text-sm" style={{ color: C.navy }}>Nasza flota</h3>
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {(["all", "Sedan", "SUV", "Kombi", "Elektryczny"] as CarCategory[]).map(c => (
          <button key={c} onClick={() => setCat(c)} className="px-3 py-1.5 rounded-lg text-[10px] font-medium whitespace-nowrap"
            style={cat === c ? { background: C.blue, color: C.white } : { background: C.white, color: C.gray }}>{c === "all" ? "Wszystkie" : c}</button>
        ))}
      </div>
      {filtered.map((car, i) => (
        <motion.div key={car.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
          onClick={() => onDetail(cars.indexOf(car))} className="p-4 rounded-xl hover:shadow-md transition-all cursor-pointer" style={{ background: C.white }}>
          <div className="flex gap-3 items-start">
            <div className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl shrink-0" style={{ background: C.light }}>{car.image}</div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm" style={{ color: C.navy }}>{car.name}</h4>
                {car.available ? <span className="px-2 py-0.5 rounded-full text-[9px] font-bold" style={{ background: C.green + "15", color: C.green }}>Dostępny</span> :
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold" style={{ background: C.red + "15", color: C.red }}>Wypożyczony</span>}
              </div>
              <p className="text-[10px]" style={{ color: C.gray }}>{car.category} · {car.year}</p>
              <div className="flex gap-3 mt-1 text-[10px]" style={{ color: C.gray }}>
                <span className="flex items-center gap-1"><Fuel className="w-3 h-3" />{car.fuel}</span>
                <span><Settings className="w-3 h-3 inline" /> {car.transmission}</span>
                <span><Users className="w-3 h-3 inline" /> {car.seats} os.</span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {car.features.map((f, j) => (
              <span key={j} className="px-2 py-0.5 rounded text-[8px] font-medium" style={{ background: C.light, color: C.navy }}>{f}</span>
            ))}
          </div>
          <div className="flex items-center justify-between mt-3 pt-3" style={{ borderTop: `1px solid ${C.light}` }}>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-current" style={{ color: C.amber }} />
              <span className="text-[10px] font-medium" style={{ color: C.navy }}>{car.rating}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm" style={{ color: C.orange }}>{car.price} zł/dzień</span>
              {car.available && <button className="px-3 py-1.5 rounded-lg text-[10px] font-bold text-white" style={{ background: C.orange }}>Rezerwuj</button>}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function DetailPage({ car, onBack, onBook }: { car: typeof cars[0]; onBack: () => void; onBook: () => void }) {
  const [selectedExtras, setSelectedExtras] = useState<boolean[]>(extras.map(() => false));
  const days = 3;
  const extrasTotal = extras.reduce((s, e, i) => s + (selectedExtras[i] ? e.price * days : 0), 0);
  const total = car.price * days + extrasTotal;

  return (
    <div className="p-4 space-y-3">
      <button onClick={onBack} className="flex items-center gap-1 text-[10px] font-semibold" style={{ color: C.blue }}>← Powrót do floty</button>
      <div className="w-full h-32 rounded-xl flex items-center justify-center text-5xl" style={{ background: C.light }}>{car.image}</div>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-lg" style={{ color: C.navy }}>{car.name}</h3>
          <p className="text-xs" style={{ color: C.gray }}>{car.category} · {car.year} · {car.fuel} · {car.transmission}</p>
        </div>
        <span className="font-bold text-xl" style={{ color: C.orange }}>{car.price} zł<span className="text-xs font-normal">/dzień</span></span>
      </div>

      <div className="p-3 rounded-xl" style={{ background: C.white }}>
        <span className="text-[10px] font-bold uppercase" style={{ color: C.gray }}>Specyfikacja</span>
        <div className="grid grid-cols-4 gap-2 mt-2 text-center">
          {[{ l: "Silnik", v: car.fuel }, { l: "Skrzynia", v: car.transmission }, { l: "Miejsca", v: `${car.seats}` }, { l: "Ocena", v: `${car.rating}★` }].map((s, i) => (
            <div key={i} className="p-2 rounded-lg" style={{ background: C.light }}>
              <span className="text-[8px] block" style={{ color: C.gray }}>{s.l}</span>
              <span className="text-[10px] font-bold block" style={{ color: C.navy }}>{s.v}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          {car.features.map((f, j) => (
            <span key={j} className="px-2 py-0.5 rounded text-[8px] font-medium" style={{ background: C.blue + "10", color: C.blue }}>{f}</span>
          ))}
        </div>
      </div>

      <div className="p-3 rounded-xl" style={{ background: C.white }}>
        <span className="text-[10px] font-bold uppercase" style={{ color: C.gray }}>Dodatki ({days} dni)</span>
        <div className="space-y-1.5 mt-2">
          {extras.map((e, i) => (
            <label key={i} className="flex items-center gap-2 p-2 rounded-lg cursor-pointer" style={{ background: selectedExtras[i] ? C.blue + "08" : C.light }}>
              <input type="checkbox" checked={selectedExtras[i]} onChange={() => setSelectedExtras(prev => prev.map((v, j) => j === i ? !v : v))} className="accent-blue-700 w-3.5 h-3.5" />
              <span className="text-[10px] flex-1" style={{ color: C.text }}>{e.name}</span>
              <span className="text-[10px] font-bold" style={{ color: C.orange }}>+{e.price} zł/dzień</span>
            </label>
          ))}
        </div>
      </div>

      <div className="p-4 rounded-xl" style={{ background: C.navy }}>
        <div className="space-y-1 text-[10px]">
          <div className="flex justify-between text-white/60"><span>Wynajem ({days} dni × {car.price} zł)</span><span className="text-white">{car.price * days} zł</span></div>
          {extras.map((e, i) => selectedExtras[i] && (
            <div key={i} className="flex justify-between text-white/60"><span>{e.name} ({days} dni)</span><span className="text-white">{e.price * days} zł</span></div>
          ))}
          <div className="flex justify-between pt-2 mt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            <span className="font-bold text-white">Łącznie</span><span className="font-bold text-lg" style={{ color: C.orange }}>{total} zł</span>
          </div>
        </div>
        <motion.button whileHover={{ scale: 1.02 }} onClick={onBook}
          className="w-full mt-3 py-2.5 rounded-lg text-xs font-bold text-white" style={{ background: C.orange }}>Zarezerwuj teraz</motion.button>
      </div>
    </div>
  );
}

function BookingPage() {
  type BookStep = "car" | "dates" | "extras" | "summary";
  const [step, setStep] = useState<BookStep>("car");
  const steps: { id: BookStep; label: string }[] = [
    { id: "car", label: "Auto" }, { id: "dates", label: "Termin" }, { id: "extras", label: "Dodatki" }, { id: "summary", label: "Podsumowanie" },
  ];
  const currentIdx = steps.findIndex(s => s.id === step);

  return (
    <div className="p-4 space-y-3">
      <h3 className="font-bold text-sm" style={{ color: C.navy }}>Rezerwacja</h3>
      <div className="flex items-center gap-1">
        {steps.map((s, i) => (
          <div key={s.id} className="flex items-center gap-1 flex-1">
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold"
              style={currentIdx >= i ? { background: C.blue, color: C.white } : { background: C.light, color: C.gray }}>{i + 1}</div>
            <span className="text-[9px]" style={{ color: currentIdx >= i ? C.navy : C.gray }}>{s.label}</span>
            {i < 3 && <div className="flex-1 h-0.5 rounded" style={{ background: currentIdx > i ? C.blue : C.light }} />}
          </div>
        ))}
      </div>

      {step === "car" && (
        <div className="space-y-2">
          {cars.filter(c => c.available).slice(0, 3).map((car, i) => (
            <div key={i} onClick={() => setStep("dates")} className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:shadow-sm" style={{ background: C.white }}>
              <span className="text-2xl">{car.image}</span>
              <div className="flex-1">
                <h4 className="text-xs font-bold" style={{ color: C.navy }}>{car.name}</h4>
                <p className="text-[10px]" style={{ color: C.gray }}>{car.category} · {car.fuel}</p>
              </div>
              <span className="font-bold text-sm" style={{ color: C.orange }}>{car.price} zł/d</span>
            </div>
          ))}
        </div>
      )}

      {step === "dates" && (
        <div className="space-y-2">
          <div className="p-3 rounded-xl" style={{ background: C.orange + "10" }}>
            <span className="text-[10px] font-bold" style={{ color: C.orange }}>Wybrano: BMW Seria 3 · 320 zł/dzień</span>
          </div>
          <select className="w-full px-3 py-2.5 rounded-xl border text-sm" style={{ borderColor: C.light, background: C.white, color: C.navy }}>
            <option>Miejsce odbioru...</option><option>Warszawa Centrum</option><option>Warszawa Lotnisko</option><option>Kraków Centrum</option>
          </select>
          <input type="date" className="w-full px-3 py-2.5 rounded-xl border text-sm" style={{ borderColor: C.light, background: C.white, color: C.navy }} />
          <input type="date" className="w-full px-3 py-2.5 rounded-xl border text-sm" style={{ borderColor: C.light, background: C.white, color: C.navy }} />
          <div className="flex gap-2">
            <button onClick={() => setStep("car")} className="px-4 py-2 rounded-lg text-xs" style={{ background: C.light, color: C.navy }}>Wstecz</button>
            <button onClick={() => setStep("extras")} className="flex-1 py-2 rounded-lg text-xs font-bold text-white" style={{ background: C.blue }}>Dalej</button>
          </div>
        </div>
      )}

      {step === "extras" && (
        <div className="space-y-2">
          {extras.map((e, i) => (
            <label key={i} className="flex items-center gap-2 p-3 rounded-xl cursor-pointer" style={{ background: C.white }}>
              <input type="checkbox" className="accent-blue-700 w-3.5 h-3.5" />
              <span className="text-[10px] flex-1" style={{ color: C.text }}>{e.name}</span>
              <span className="text-[10px] font-bold" style={{ color: C.orange }}>+{e.price} zł/dzień</span>
            </label>
          ))}
          <div className="flex gap-2">
            <button onClick={() => setStep("dates")} className="px-4 py-2 rounded-lg text-xs" style={{ background: C.light, color: C.navy }}>Wstecz</button>
            <button onClick={() => setStep("summary")} className="flex-1 py-2 rounded-lg text-xs font-bold text-white" style={{ background: C.blue }}>Dalej</button>
          </div>
        </div>
      )}

      {step === "summary" && (
        <div className="space-y-2">
          <div className="p-4 rounded-xl" style={{ background: C.white }}>
            <span className="text-[10px] font-bold uppercase" style={{ color: C.gray }}>Podsumowanie</span>
            <div className="space-y-1.5 mt-2 text-[10px]">
              <div className="flex justify-between"><span style={{ color: C.gray }}>Auto</span><span className="font-semibold" style={{ color: C.navy }}>BMW Seria 3</span></div>
              <div className="flex justify-between"><span style={{ color: C.gray }}>Termin</span><span style={{ color: C.navy }}>2-5 kwi 2026 (3 dni)</span></div>
              <div className="flex justify-between"><span style={{ color: C.gray }}>Odbiór</span><span style={{ color: C.navy }}>Warszawa Centrum</span></div>
              <div className="flex justify-between"><span style={{ color: C.gray }}>Stawka</span><span style={{ color: C.navy }}>320 zł × 3 dni = 960 zł</span></div>
              <div className="flex justify-between pt-2" style={{ borderTop: `1px solid ${C.light}` }}>
                <span className="font-bold" style={{ color: C.navy }}>Łącznie</span><span className="font-bold text-sm" style={{ color: C.orange }}>960 zł</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setStep("extras")} className="px-4 py-2 rounded-lg text-xs" style={{ background: C.light, color: C.navy }}>Wstecz</button>
            <motion.button whileHover={{ scale: 1.02 }} className="flex-1 py-2.5 rounded-lg text-xs font-bold text-white" style={{ background: C.orange }}>Zarezerwuj i zapłać</motion.button>
          </div>
        </div>
      )}
    </div>
  );
}

function ReservationsPage() {
  const statusStyles: Record<string, { bg: string; fg: string; label: string }> = {
    pending: { bg: C.amber + "15", fg: C.amber, label: "Oczekuje" },
    confirmed: { bg: C.green + "15", fg: C.green, label: "Potwierdzona" },
    active: { bg: C.blue + "15", fg: C.blue, label: "Aktywna" },
    returned: { bg: C.gray + "15", fg: C.gray, label: "Zakończona" },
  };
  const timelineStages = ["Oczekuje", "Potwierdzona", "Aktywna", "Zwrócona"];

  return (
    <div className="p-4 space-y-3">
      <span className="text-xs font-bold" style={{ color: C.navy }}>Moje rezerwacje</span>
      {reservations.map((r, i) => {
        const st = statusStyles[r.status];
        const stageIdx = r.status === "pending" ? 0 : r.status === "confirmed" ? 1 : r.status === "returned" ? 3 : 2;
        return (
          <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
            className="p-4 rounded-xl" style={{ background: C.white }}>
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[10px] font-bold" style={{ color: C.blue }}>{r.code}</span>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold" style={{ background: st.bg, color: st.fg }}>{st.label}</span>
            </div>
            <h4 className="font-bold text-xs" style={{ color: C.navy }}>{r.car}</h4>
            <p className="text-[10px]" style={{ color: C.gray }}>{r.from} — {r.to}</p>
            <div className="flex items-center gap-1 mt-3">
              {timelineStages.map((s, j) => (
                <div key={j} className="flex items-center gap-1 flex-1">
                  <div className="w-4 h-4 rounded-full flex items-center justify-center"
                    style={j <= stageIdx ? { background: C.blue } : { background: C.light }}>
                    {j <= stageIdx && <CheckCircle2 className="w-2.5 h-2.5 text-white" />}
                  </div>
                  {j < 3 && <div className="flex-1 h-0.5 rounded" style={{ background: j < stageIdx ? C.blue : C.light }} />}
                </div>
              ))}
            </div>
            <div className="flex gap-1 mt-1">
              {timelineStages.map((s, j) => (
                <span key={j} className="flex-1 text-[7px] text-center" style={{ color: j <= stageIdx ? C.navy : C.gray }}>{s}</span>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
