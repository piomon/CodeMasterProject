import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PreviewShell, DemoNav, DemoSection, DemoBenefits, DemoFooterCTA } from "./PreviewShell";
import { Car, Calendar, MapPin, Fuel, Settings, Star, CheckCircle2, ChevronRight, Home, Search, CreditCard, Users, Clock, Shield, Gauge, Filter } from "lucide-react";

const C = { navy: "#0C1222", dark: "#151D2E", steel: "#2A3A4E", white: "#F8FAFC", gray: "#6B7280", green: "#10B981", blue: "#3B82F6", red: "#EF4444", amber: "#F59E0B", light: "#F1F5F9", accent: "#E63946", silver: "#C0C0C0" };

const cars = [
  { id: 1, name: "BMW Seria 3", category: "Sedan Premium", year: 2025, fuel: "Benzyna", transmission: "Automat", seats: 5, price: 320, image: "🚗", rating: 4.9, available: true, features: ["GPS", "Klimatyzacja", "Kamera cofania", "Apple CarPlay"] },
  { id: 2, name: "Mercedes-Benz GLC", category: "SUV Premium", year: 2025, fuel: "Diesel", transmission: "Automat", seats: 5, price: 420, image: "🚙", rating: 4.8, available: true, features: ["GPS", "Skóra", "Panorama", "LED Matrix"] },
  { id: 3, name: "Audi A4 Avant", category: "Kombi Premium", year: 2024, fuel: "Benzyna", transmission: "Automat", seats: 5, price: 350, image: "🚘", rating: 4.7, available: true, features: ["GPS", "Klimatyzacja 3-stref.", "Virtual Cockpit"] },
  { id: 4, name: "Volkswagen T-Roc", category: "SUV Kompakt", year: 2024, fuel: "Benzyna", transmission: "Manual", seats: 5, price: 220, image: "🚐", rating: 4.6, available: false, features: ["GPS", "Klimatyzacja", "Tempomat"] },
  { id: 5, name: "Tesla Model 3", category: "Elektryczny", year: 2025, fuel: "Elektryk", transmission: "Automat", seats: 5, price: 380, image: "⚡", rating: 4.9, available: true, features: ["Autopilot", "Supercharger", "OTA Updates"] },
];

const categories = ["Wszystkie", "Sedan", "SUV", "Kombi", "Elektryczny", "Van"];

export function CarRentalDemo({ name }: { name: string; features: string[] }) {
  const [page, setPage] = useState("home");
  const tabs = [
    { id: "home", label: "Start", icon: <Home className="w-3 h-3" /> },
    { id: "fleet", label: "Flota", icon: <Car className="w-3 h-3" /> },
    { id: "booking", label: "Rezerwacja", icon: <Calendar className="w-3 h-3" /> },
    { id: "compare", label: "Porównaj", icon: <Gauge className="w-3 h-3" /> },
    { id: "panel", label: "Panel", icon: <Settings className="w-3 h-3" /> },
  ];

  return (
    <PreviewShell title={name}>
      <DemoNav tabs={tabs} activeTab={page} onTabChange={setPage} logo="AutoPremium" />
      <AnimatePresence mode="wait">
        <motion.div key={page} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
          {page === "home" && <HomePage onNav={setPage} />}
          {page === "fleet" && <FleetPage />}
          {page === "booking" && <BookingPage />}
          {page === "compare" && <ComparePage />}
          {page === "panel" && <PanelPage />}
        </motion.div>
      </AnimatePresence>
    </PreviewShell>
  );
}

function HomePage({ onNav }: { onNav: (p: string) => void }) {
  return (
    <div>
      <div className="p-8 pb-10" style={{ background: `linear-gradient(160deg, ${C.navy}, ${C.dark})` }}>
        <p className="text-[10px] tracking-[0.4em] uppercase" style={{ color: C.accent }}>Premium Car Rental</p>
        <h1 className="font-display font-bold text-3xl mt-1 text-white">Auto<span style={{ color: C.accent }}>Premium</span></h1>
        <p className="text-xs mt-2 text-white/70 max-w-[280px] leading-relaxed">Wypożyczalnia samochodów premium. BMW, Mercedes, Audi, Tesla — znajdź auto na każdą okazję.</p>
        <div className="flex gap-3 mt-5">
          <motion.button whileHover={{ scale: 1.03 }} onClick={() => onNav("fleet")}
            className="px-6 py-3 rounded-lg font-bold text-sm shadow-lg text-white" style={{ background: C.accent }}>Przeglądaj flotę</motion.button>
          <button onClick={() => onNav("booking")} className="px-6 py-3 rounded-lg font-semibold text-sm border border-white/20 text-white">Zarezerwuj auto</button>
        </div>

        <div className="p-4 rounded-xl mt-6" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <p className="text-[9px] font-bold uppercase text-white/40 mb-2">Szybka rezerwacja</p>
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2.5 rounded-lg" style={{ background: "rgba(255,255,255,0.06)" }}>
              <span className="text-[8px] text-white/40 block">Odbiór</span>
              <span className="text-xs text-white font-medium">Warszawa Centrum</span>
            </div>
            <div className="p-2.5 rounded-lg" style={{ background: "rgba(255,255,255,0.06)" }}>
              <span className="text-[8px] text-white/40 block">Zwrot</span>
              <span className="text-xs text-white font-medium">Warszawa Lotnisko</span>
            </div>
            <div className="p-2.5 rounded-lg" style={{ background: "rgba(255,255,255,0.06)" }}>
              <span className="text-[8px] text-white/40 block">Od</span>
              <span className="text-xs text-white font-medium">2 kwi 2026, 10:00</span>
            </div>
            <div className="p-2.5 rounded-lg" style={{ background: "rgba(255,255,255,0.06)" }}>
              <span className="text-[8px] text-white/40 block">Do</span>
              <span className="text-xs text-white font-medium">5 kwi 2026, 10:00</span>
            </div>
          </div>
          <motion.button whileHover={{ scale: 1.02 }} onClick={() => onNav("fleet")}
            className="w-full mt-3 py-2.5 rounded-lg text-xs font-bold text-white flex items-center justify-center gap-1" style={{ background: C.accent }}>
            <Search className="w-3.5 h-3.5" /> Szukaj dostępnych aut
          </motion.button>
        </div>
      </div>

      <DemoSection>
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm" style={{ color: C.navy }}>Popularne modele</h3>
          <button onClick={() => onNav("fleet")} className="text-[10px] font-medium flex items-center gap-1" style={{ color: C.accent }}>Cała flota <ChevronRight className="w-3 h-3" /></button>
        </div>
        {cars.slice(0, 3).map((car, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
            className="flex gap-3 p-3 rounded-xl border hover:shadow-sm transition-all cursor-pointer" style={{ borderColor: C.light, background: C.white }}>
            <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0" style={{ background: C.navy + "08" }}>{car.image}</div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold" style={{ color: C.navy }}>{car.name}</h4>
              <p className="text-[10px]" style={{ color: C.gray }}>{car.category} · {car.year} · {car.fuel}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="flex items-center gap-0.5 text-[10px]" style={{ color: C.amber }}><Star className="w-3 h-3 fill-current" />{car.rating}</span>
                <span className="text-[10px]" style={{ color: C.gray }}>{car.transmission} · {car.seats} os.</span>
                <span className="ml-auto font-bold text-xs" style={{ color: C.accent }}>{car.price} zł/dzień</span>
              </div>
            </div>
          </motion.div>
        ))}

        <div className="grid grid-cols-4 gap-2 mt-2">
          {[{ icon: "🚗", label: "Sedany", count: "12" }, { icon: "🚙", label: "SUV", count: "8" }, { icon: "⚡", label: "Elektryk", count: "5" }, { icon: "🚐", label: "Vany", count: "4" }].map((cat, i) => (
            <div key={i} className="p-2.5 rounded-xl text-center cursor-pointer hover:shadow-sm transition-all" style={{ background: C.light }}>
              <span className="text-lg block">{cat.icon}</span>
              <span className="text-[8px] font-bold block mt-0.5" style={{ color: C.navy }}>{cat.label}</span>
              <span className="text-[7px]" style={{ color: C.gray }}>{cat.count} aut</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2 mt-2">
          {[{ v: "30+", l: "Aut w flocie" }, { v: "24/7", l: "Wsparcie" }, { v: "4.8", l: "Ocena klientów" }].map((s, i) => (
            <div key={i} className="p-3 rounded-xl text-center" style={{ background: `${C.accent}08` }}>
              <span className="font-bold text-sm block" style={{ color: C.accent }}>{s.v}</span>
              <span className="text-[9px]" style={{ color: C.gray }}>{s.l}</span>
            </div>
          ))}
        </div>
      </DemoSection>

      <DemoBenefits accentColor={C.accent} bgColor={C.light} textColor={C.navy} benefits={[
        { icon: "🚗", title: "Flota premium", desc: "BMW, Mercedes, Audi, Tesla" },
        { icon: "📱", title: "Rezerwacja online", desc: "Szybka rezerwacja w 2 minuty" },
        { icon: "🛡️", title: "Pełne ubezpieczenie", desc: "OC, AC, NNW w cenie" },
        { icon: "📍", title: "Dostawa auta", desc: "Pod wskazany adres lub lotnisko" },
      ]} />
      <DemoFooterCTA accentColor={C.accent} bgColor={C.navy} />
    </div>
  );
}

function FleetPage() {
  const [cat, setCat] = useState("Wszystkie");
  const filtered = cat === "Wszystkie" ? cars : cars.filter(c => c.category.includes(cat));
  return (
    <DemoSection>
      <h3 className="font-bold text-sm" style={{ color: C.navy }}>Nasza flota</h3>
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {categories.map(c => (
          <button key={c} onClick={() => setCat(c)} className="px-3 py-1.5 rounded-lg text-[10px] font-medium whitespace-nowrap transition-all"
            style={cat === c ? { background: C.accent, color: "white" } : { background: C.light, color: C.gray }}>{c}</button>
        ))}
      </div>
      <div className="space-y-3">
        {filtered.map((car, i) => (
          <motion.div key={car.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
            className="p-4 rounded-xl border hover:shadow-md transition-all cursor-pointer" style={{ borderColor: C.light, background: C.white }}>
            <div className="flex gap-3 items-start">
              <div className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl shrink-0" style={{ background: C.navy + "08" }}>{car.image}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm" style={{ color: C.navy }}>{car.name}</h4>
                  {car.available ? <span className="px-2 py-0.5 rounded-full text-[9px] font-bold" style={{ background: C.green + "15", color: C.green }}>Dostępny</span> :
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold" style={{ background: C.red + "15", color: C.red }}>Wypożyczony</span>}
                </div>
                <p className="text-[10px]" style={{ color: C.gray }}>{car.category} · {car.year}</p>
                <div className="flex gap-3 mt-1 text-[10px]" style={{ color: C.gray }}>
                  <span className="flex items-center gap-1"><Fuel className="w-3 h-3" />{car.fuel}</span>
                  <span>{car.transmission}</span>
                  <span>{car.seats} os.</span>
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
                <span className="font-bold text-sm" style={{ color: C.accent }}>{car.price} zł/dzień</span>
                {car.available && <motion.button whileHover={{ scale: 1.02 }} className="px-3 py-1.5 rounded-lg text-[10px] font-bold text-white" style={{ background: C.accent }}>Zarezerwuj</motion.button>}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </DemoSection>
  );
}

function BookingPage() {
  const [step, setStep] = useState(0);
  return (
    <DemoSection>
      <h3 className="font-bold text-sm" style={{ color: C.navy }}>Rezerwacja</h3>
      <div className="flex gap-2 mb-2">
        {["Auto", "Termin", "Dodatki", "Podsumowanie"].map((s, i) => (
          <div key={i} className="flex items-center gap-1 flex-1">
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold"
              style={i <= step ? { background: C.accent, color: "white" } : { background: C.light, color: C.gray }}>{i + 1}</div>
            <span className="text-[9px]" style={{ color: i <= step ? C.navy : C.gray }}>{s}</span>
          </div>
        ))}
      </div>

      {step === 0 && (
        <div className="space-y-2">
          {cars.filter(c => c.available).slice(0, 3).map((car, i) => (
            <motion.div key={i} onClick={() => setStep(1)}
              className="flex items-center gap-3 p-3 rounded-xl border cursor-pointer hover:shadow-sm transition-all" style={{ borderColor: C.light, background: C.white }}>
              <span className="text-2xl">{car.image}</span>
              <div className="flex-1">
                <h4 className="text-xs font-bold" style={{ color: C.navy }}>{car.name}</h4>
                <p className="text-[10px]" style={{ color: C.gray }}>{car.category} · {car.fuel}</p>
              </div>
              <span className="font-bold text-sm" style={{ color: C.accent }}>{car.price} zł/d</span>
            </motion.div>
          ))}
        </div>
      )}

      {step === 1 && (
        <div className="space-y-3">
          <div className="p-3 rounded-xl" style={{ background: C.accent + "08" }}>
            <span className="text-[10px] font-bold" style={{ color: C.accent }}>Wybrano: BMW Seria 3 · 320 zł/dzień</span>
          </div>
          <input type="date" className="w-full px-4 py-3 rounded-xl border text-sm" style={{ borderColor: C.light, background: C.white, color: C.navy }} />
          <input type="date" className="w-full px-4 py-3 rounded-xl border text-sm" style={{ borderColor: C.light, background: C.white, color: C.navy }} />
          <select className="w-full px-4 py-3 rounded-xl border text-sm" style={{ borderColor: C.light, background: C.white, color: C.navy }}>
            <option>Miejsce odbioru...</option><option>Warszawa Centrum</option><option>Warszawa Lotnisko Okęcie</option><option>Kraków Centrum</option>
          </select>
          <div className="flex gap-2">
            <button onClick={() => setStep(0)} className="px-4 py-2.5 rounded-lg text-xs font-medium" style={{ background: C.light, color: C.navy }}>Wstecz</button>
            <motion.button whileHover={{ scale: 1.02 }} onClick={() => setStep(2)}
              className="flex-1 py-2.5 rounded-lg text-xs font-bold text-white" style={{ background: C.accent }}>Dalej →</motion.button>
          </div>
        </div>
      )}

      {step >= 2 && (
        <div className="space-y-3">
          <div className="p-4 rounded-xl" style={{ background: C.light }}>
            <h4 className="font-bold text-sm mb-3" style={{ color: C.navy }}>Podsumowanie</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between"><span style={{ color: C.gray }}>Auto</span><span className="font-medium" style={{ color: C.navy }}>BMW Seria 3</span></div>
              <div className="flex justify-between"><span style={{ color: C.gray }}>Termin</span><span className="font-medium" style={{ color: C.navy }}>2-5 kwi 2026 (3 dni)</span></div>
              <div className="flex justify-between"><span style={{ color: C.gray }}>Stawka</span><span className="font-medium" style={{ color: C.navy }}>320 zł × 3 dni</span></div>
              <div className="flex justify-between pt-2" style={{ borderTop: `1px solid ${C.navy}10` }}><span className="font-bold" style={{ color: C.navy }}>Łącznie</span><span className="font-bold text-sm" style={{ color: C.accent }}>960 zł</span></div>
            </div>
          </div>
          <motion.button whileHover={{ scale: 1.02 }}
            className="w-full py-3 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-1" style={{ background: C.accent }}>
            <CreditCard className="w-3.5 h-3.5" /> Zarezerwuj i zapłać
          </motion.button>
        </div>
      )}
    </DemoSection>
  );
}

function ComparePage() {
  const compareCars = cars.slice(0, 3);
  return (
    <DemoSection>
      <h3 className="font-bold text-sm" style={{ color: C.navy }}>Porównywarka pojazdów</h3>
      <div className="overflow-x-auto">
        <div className="min-w-[400px]">
          <div className="grid gap-2" style={{ gridTemplateColumns: `80px repeat(${compareCars.length}, 1fr)` }}>
            <div />
            {compareCars.map((c, i) => (
              <div key={i} className="text-center p-3 rounded-xl" style={{ background: C.light }}>
                <span className="text-2xl block">{c.image}</span>
                <span className="text-[10px] font-bold block mt-1" style={{ color: C.navy }}>{c.name}</span>
                <span className="text-[9px]" style={{ color: C.gray }}>{c.category}</span>
              </div>
            ))}
            {[{ l: "Cena/dzień", k: "price", fmt: (v: any) => `${v} zł` }, { l: "Rok", k: "year" }, { l: "Paliwo", k: "fuel" }, { l: "Skrzynia", k: "transmission" }, { l: "Ocena", k: "rating" }].map((row, ri) => (
              <React.Fragment key={ri}>
                <div className="flex items-center text-[10px] font-medium" style={{ color: C.gray }}>{row.l}</div>
                {compareCars.map((c, ci) => (
                  <div key={ci} className="text-center p-2 text-xs font-medium" style={{ color: C.navy }}>
                    {row.fmt ? row.fmt((c as any)[row.k]) : (c as any)[row.k]}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </DemoSection>
  );
}

function PanelPage() {
  return (
    <DemoSection>
      <h3 className="font-bold text-sm" style={{ color: C.navy }}>Panel floty</h3>
      <div className="grid grid-cols-4 gap-2">
        {[{ l: "Łącznie", v: "30", c: C.blue }, { l: "Dostępne", v: "18", c: C.green }, { l: "Wypożyczone", v: "10", c: C.accent }, { l: "Serwis", v: "2", c: C.amber }].map((s, i) => (
          <div key={i} className="p-3 rounded-xl text-center" style={{ background: C.light }}>
            <span className="font-bold text-sm block" style={{ color: s.c }}>{s.v}</span>
            <span className="text-[8px]" style={{ color: C.gray }}>{s.l}</span>
          </div>
        ))}
      </div>
      <h4 className="font-bold text-sm mt-2" style={{ color: C.navy }}>Aktywne wypożyczenia</h4>
      {[
        { car: "BMW Seria 3", client: "Jan Kowalski", from: "28 mar", to: "2 kwi", status: "active" },
        { car: "Mercedes GLC", client: "ABC Sp. z o.o.", from: "30 mar", to: "5 kwi", status: "active" },
        { car: "VW T-Roc", client: "Anna Nowak", from: "25 mar", to: "31 mar", status: "returning" },
      ].map((r, i) => (
        <div key={i} className="flex items-center gap-3 p-3 rounded-xl border" style={{ borderColor: C.light, background: C.white }}>
          <Car className="w-5 h-5 shrink-0" style={{ color: C.accent }} />
          <div className="flex-1">
            <span className="text-xs font-semibold" style={{ color: C.navy }}>{r.car}</span>
            <p className="text-[10px]" style={{ color: C.gray }}>{r.client} · {r.from} — {r.to}</p>
          </div>
          <span className="px-2 py-0.5 rounded-full text-[9px] font-bold" style={{ background: r.status === "active" ? C.green + "15" : C.amber + "15", color: r.status === "active" ? C.green : C.amber }}>
            {r.status === "active" ? "Aktywne" : "Zwrot dziś"}
          </span>
        </div>
      ))}
    </DemoSection>
  );
}

import React from "react";
