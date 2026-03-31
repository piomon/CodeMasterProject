import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PreviewShell, DemoFooterCTA, DemoBenefits } from "./PreviewShell";
import {
  Heart, Calendar, Clock, User, FileText, Activity, Phone,
  CheckCircle2, Pill, Stethoscope, AlertTriangle, Bell, ChevronRight,
  Video, Search, Star, MapPin, Shield
} from "lucide-react";

const C = { teal: "#0D9488", white: "#FFFFFF", mint: "#F0FDFA", navy: "#0F172A", blue: "#0EA5E9", gray: "#64748B", light: "#F8FAFC", green: "#22C55E", red: "#EF4444", amber: "#F59E0B" };

const specialties = [
  { name: "Internista", icon: "🩺", docs: 4, color: "#0D9488" },
  { name: "Kardiolog", icon: "❤️", docs: 3, color: "#EF4444" },
  { name: "Dermatolog", icon: "🧴", docs: 2, color: "#F59E0B" },
  { name: "Ortopeda", icon: "🦴", docs: 3, color: "#3B82F6" },
  { name: "Okulista", icon: "👁️", docs: 2, color: "#8B5CF6" },
  { name: "Laryngolog", icon: "👂", docs: 2, color: "#06B6D4" },
  { name: "Neurolog", icon: "🧠", docs: 1, color: "#EC4899" },
  { name: "Ginekolog", icon: "🏥", docs: 2, color: "#F97316" },
];

const doctors = [
  { name: "dr Katarzyna Nowak", spec: "Internista", rating: 4.9, reviews: 312, nextFree: "Dziś 15:30", avatar: "KN", price: 200, exp: "15 lat", loc: "ul. Medyczna 10" },
  { name: "dr Marek Wiśniewski", spec: "Kardiolog", rating: 4.8, reviews: 245, nextFree: "Jutro 10:00", avatar: "MW", price: 300, exp: "20 lat", loc: "ul. Sercowa 5" },
  { name: "dr Anna Lewandowska", spec: "Dermatolog", rating: 5.0, reviews: 189, nextFree: "Śr 9:00", avatar: "AL", price: 250, exp: "12 lat", loc: "ul. Zdrowa 22" },
  { name: "dr Piotr Zieliński", spec: "Ortopeda", rating: 4.7, reviews: 156, nextFree: "Czw 11:30", avatar: "PZ", price: 280, exp: "18 lat", loc: "ul. Medyczna 10" },
  { name: "dr Ewa Maj", spec: "Neurolog", rating: 4.9, reviews: 203, nextFree: "Pt 14:00", avatar: "EM", price: 350, exp: "22 lata", loc: "ul. Główna 8" },
];

const results = [
  { name: "Morfologia krwi", date: "12 mar 2026", status: "normal", values: [{ n: "WBC", v: "6.8", ref: "4.0-10.0", ok: true }, { n: "RBC", v: "4.9", ref: "4.5-5.5", ok: true }, { n: "HGB", v: "14.2", ref: "13.5-17.5", ok: true }] },
  { name: "Lipidogram", date: "12 mar 2026", status: "attention", values: [{ n: "Cholesterol", v: "215", ref: "<200", ok: false }, { n: "HDL", v: "58", ref: ">40", ok: true }, { n: "LDL", v: "142", ref: "<130", ok: false }] },
  { name: "TSH", date: "5 mar 2026", status: "normal", values: [{ n: "TSH", v: "2.1", ref: "0.4-4.0", ok: true }] },
];

const prescriptions = [
  { name: "Metformina 500mg", dose: "2x dziennie", expires: "15 kwi 2026", refills: 2, code: "PL02847562" },
  { name: "Atorwastatyna 20mg", dose: "1x wieczorem", expires: "10 maj 2026", refills: 3, code: "PL02847563" },
];

const navTabs = [
  { id: "home", label: "Strona główna" },
  { id: "specialties", label: "Specjalizacje" },
  { id: "doctors", label: "Lekarze" },
  { id: "visits", label: "Moje Wizyty" },
  { id: "myhealth", label: "Moje zdrowie" },
  { id: "contact", label: "Kontakt" },
];

export function HealthcareDemo({ name }: { name: string; features: string[] }) {
  const [page, setPage] = useState("home");

  return (
    <PreviewShell title={name}>
      <div style={{ background: C.light, minHeight: 560 }}>
        <div style={{ background: C.white, borderBottom: `1px solid ${C.light}` }}>
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${C.teal}, ${C.blue})` }}>
                <Heart className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-sm" style={{ color: C.navy }}>MediCare</h1>
                <p className="text-[8px]" style={{ color: C.gray }}>Portal Pacjenta</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Bell className="w-4 h-4" style={{ color: C.gray }} />
                <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full flex items-center justify-center text-[7px] font-bold text-white" style={{ background: C.red }}>2</div>
              </div>
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white" style={{ background: `linear-gradient(135deg, ${C.teal}, ${C.blue})` }}>JK</div>
            </div>
          </div>
          <div className="flex gap-0.5 px-4 pb-2 overflow-x-auto">
            {navTabs.map(t => (
              <button key={t.id} onClick={() => setPage(t.id)}
                className="px-3 py-1.5 rounded-lg text-[10px] font-semibold whitespace-nowrap transition-all"
                style={page === t.id ? { background: C.teal, color: C.white } : { color: C.gray }}>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={page} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            {page === "home" && <HomePage onNav={setPage} />}
            {page === "specialties" && <SpecialtiesPage onNav={setPage} />}
            {page === "doctors" && <DoctorsPage />}
            {page === "visits" && <VisitsPage />}
            {page === "myhealth" && <MyHealthPage />}
            {page === "contact" && <ContactPage />}
          </motion.div>
        </AnimatePresence>
      </div>
      <DemoBenefits accentColor={C.teal} bgColor={C.mint} textColor={C.navy} benefits={[
        { icon: "📱", title: "E-rejestracja 24/7", desc: "Pacjent umawia się sam, bez telefonów" },
        { icon: "📋", title: "Cyfrowa karta zdrowia", desc: "Wyniki, recepty i historia w jednym" },
        { icon: "🔒", title: "Bezpieczeństwo RODO", desc: "Szyfrowane dane medyczne pacjentów" },
        { icon: "💬", title: "Teleporady", desc: "Konsultacje video bez wychodzenia z domu" },
      ]} />
      <DemoFooterCTA accentColor={C.teal} bgColor={C.navy} />
    </PreviewShell>
  );
}

function HomePage({ onNav }: { onNav: (p: string) => void }) {
  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ background: C.white, border: `1px solid ${C.mint}` }}>
        <Search className="w-4 h-4" style={{ color: C.gray }} />
        <input placeholder="Szukaj lekarza, specjalizacji..." className="text-xs bg-transparent outline-none flex-1" style={{ color: C.navy }} />
      </div>

      <div className="p-4 rounded-2xl" style={{ background: `linear-gradient(135deg, ${C.teal}, ${C.blue})` }}>
        <div className="flex items-center gap-2 mb-2">
          <Calendar className="w-4 h-4 text-white/80" />
          <span className="text-[10px] text-white/80 font-medium">Najbliższa wizyta</span>
        </div>
        <h3 className="font-bold text-base text-white">Kontrola ogólna</h3>
        <p className="text-xs text-white/80 mt-0.5">25 mar 2026, 10:00 • dr Nowak</p>
        <div className="flex items-center gap-2 mt-3">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold text-white" style={{ background: "rgba(255,255,255,0.2)" }}>🏥 Stacjonarna</span>
          <button className="ml-auto px-3 py-1.5 rounded-full text-[10px] font-bold" style={{ background: C.white, color: C.teal }}>Szczegóły</button>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold" style={{ color: C.navy }}>Specjalizacje</span>
          <button onClick={() => onNav("specialties")} className="text-[10px] font-semibold" style={{ color: C.teal }}>Wszystkie →</button>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {specialties.slice(0, 8).map((s, i) => (
            <motion.button key={i} whileHover={{ scale: 1.03 }} onClick={() => onNav("doctors")}
              className="p-2.5 rounded-xl text-center" style={{ background: C.white, border: `1px solid ${s.color}15` }}>
              <span className="text-xl block">{s.icon}</span>
              <span className="text-[9px] font-semibold block mt-1" style={{ color: C.navy }}>{s.name}</span>
              <span className="text-[8px]" style={{ color: C.gray }}>{s.docs} lekarzy</span>
            </motion.button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold" style={{ color: C.navy }}>Polecani lekarze</span>
          <button onClick={() => onNav("doctors")} className="text-[10px] font-semibold" style={{ color: C.teal }}>Więcej →</button>
        </div>
        <div className="space-y-2">
          {doctors.slice(0, 3).map((d, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: C.white }}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: `linear-gradient(135deg, ${C.teal}, ${C.blue})`, color: C.white }}>{d.avatar}</div>
              <div className="flex-1">
                <span className="text-[11px] font-bold" style={{ color: C.navy }}>{d.name}</span>
                <span className="text-[10px] block" style={{ color: C.gray }}>{d.spec} • {d.exp}</span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <Star className="w-3 h-3" style={{ fill: C.amber, color: C.amber }} />
                  <span className="text-[10px] font-bold" style={{ color: C.navy }}>{d.rating}</span>
                  <span className="text-[9px]" style={{ color: C.gray }}>({d.reviews} opinii)</span>
                </div>
              </div>
              <div className="text-right">
                <span className="font-bold text-sm block" style={{ color: C.teal }}>{d.price} zł</span>
                <span className="text-[9px]" style={{ color: C.green }}>{d.nextFree}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[{ v: "50+", l: "Lekarzy" }, { v: "8", l: "Specjalizacji" }, { v: "4.8", l: "Śr. ocena" }].map((s, i) => (
          <div key={i} className="p-3 rounded-xl text-center" style={{ background: C.white }}>
            <span className="font-bold text-lg block" style={{ color: C.teal }}>{s.v}</span>
            <span className="text-[9px]" style={{ color: C.gray }}>{s.l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SpecialtiesPage({ onNav }: { onNav: (p: string) => void }) {
  return (
    <div className="p-4 space-y-3">
      <span className="text-sm font-bold" style={{ color: C.navy }}>Wszystkie specjalizacje</span>
      <div className="grid grid-cols-2 gap-2">
        {specialties.map((s, i) => (
          <motion.button key={i} whileHover={{ scale: 1.02 }} onClick={() => onNav("doctors")}
            className="p-4 rounded-xl text-left" style={{ background: C.white, borderLeft: `3px solid ${s.color}` }}>
            <span className="text-2xl block mb-1">{s.icon}</span>
            <span className="text-xs font-bold block" style={{ color: C.navy }}>{s.name}</span>
            <span className="text-[10px]" style={{ color: C.gray }}>{s.docs} lekarzy</span>
            <div className="flex items-center gap-1 mt-1.5">
              <span className="text-[9px] font-semibold" style={{ color: s.color }}>Umów wizytę</span>
              <ChevronRight className="w-3 h-3" style={{ color: s.color }} />
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

function DoctorsPage() {
  const [selectedDoc, setSelectedDoc] = useState(-1);
  const [bookingStep, setBookingStep] = useState(0);

  if (selectedDoc >= 0) {
    const d = doctors[selectedDoc];
    const days = ["Pon 22", "Wt 23", "Śr 24", "Czw 25", "Pt 26"];
    const slots = ["08:00", "08:30", "09:00", "10:00", "10:30", "11:00", "14:00", "14:30", "15:00", "15:30"];

    return (
      <div className="p-4 space-y-3">
        <button onClick={() => { setSelectedDoc(-1); setBookingStep(0); }} className="text-[10px] font-semibold" style={{ color: C.teal }}>← Wszyscy lekarze</button>

        <div className="p-4 rounded-2xl" style={{ background: C.white }}>
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold" style={{ background: `linear-gradient(135deg, ${C.teal}, ${C.blue})`, color: C.white }}>{d.avatar}</div>
            <div>
              <h3 className="font-bold text-sm" style={{ color: C.navy }}>{d.name}</h3>
              <span className="text-xs" style={{ color: C.teal }}>{d.spec}</span>
              <div className="flex items-center gap-2 mt-1">
                <Star className="w-3 h-3" style={{ fill: C.amber, color: C.amber }} />
                <span className="text-[10px] font-bold" style={{ color: C.navy }}>{d.rating}</span>
                <span className="text-[9px]" style={{ color: C.gray }}>({d.reviews})</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-3">
            <div className="p-2 rounded-lg text-center" style={{ background: C.mint }}>
              <span className="text-[10px] font-bold block" style={{ color: C.teal }}>{d.exp}</span>
              <span className="text-[8px]" style={{ color: C.gray }}>doświadczenie</span>
            </div>
            <div className="p-2 rounded-lg text-center" style={{ background: C.mint }}>
              <span className="text-[10px] font-bold block" style={{ color: C.teal }}>{d.price} zł</span>
              <span className="text-[8px]" style={{ color: C.gray }}>wizyta</span>
            </div>
            <div className="p-2 rounded-lg text-center" style={{ background: C.mint }}>
              <MapPin className="w-3 h-3 mx-auto" style={{ color: C.teal }} />
              <span className="text-[8px]" style={{ color: C.gray }}>{d.loc.split(",")[0]}</span>
            </div>
          </div>
        </div>

        {bookingStep === 0 && (
          <div>
            <span className="text-xs font-bold" style={{ color: C.navy }}>Wybierz typ wizyty</span>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {[
                { icon: "🏥", label: "Stacjonarna", sub: "W gabinecie" },
                { icon: "📹", label: "Teleporada", sub: "Video online" },
              ].map((t, i) => (
                <button key={i} onClick={() => setBookingStep(1)}
                  className="p-3 rounded-xl text-center" style={{ background: C.white, border: `1px solid ${C.teal}20` }}>
                  <span className="text-xl block">{t.icon}</span>
                  <span className="text-xs font-bold block mt-1" style={{ color: C.navy }}>{t.label}</span>
                  <span className="text-[9px]" style={{ color: C.gray }}>{t.sub}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {bookingStep === 1 && (
          <div>
            <span className="text-xs font-bold" style={{ color: C.navy }}>Wybierz termin</span>
            <div className="flex gap-1.5 mt-2 overflow-x-auto pb-1">
              {days.map((day, i) => (
                <button key={day} className="flex-1 py-2 rounded-lg text-[10px] font-semibold min-w-[50px]"
                  style={i === 0 ? { background: C.teal, color: C.white } : { background: C.white, color: C.navy }}>{day}</button>
              ))}
            </div>
            <div className="grid grid-cols-4 gap-1.5 mt-2">
              {slots.map((s, i) => {
                const off = i === 2 || i === 7;
                return (
                  <button key={s} onClick={() => !off && setBookingStep(2)}
                    className={`py-2.5 rounded-lg text-[11px] font-medium ${off ? "line-through" : ""}`}
                    style={off ? { background: C.light, color: C.gray + "40" } : { background: C.white, color: C.navy, border: `1px solid ${C.teal}30` }}>{s}</button>
                );
              })}
            </div>
            <button onClick={() => setBookingStep(0)} className="text-[10px] font-semibold mt-2" style={{ color: C.teal }}>← Zmień typ wizyty</button>
          </div>
        )}

        {bookingStep === 2 && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
            <div className="w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ background: C.green + "15" }}>
              <CheckCircle2 className="w-7 h-7" style={{ color: C.green }} />
            </div>
            <h3 className="font-bold text-base" style={{ color: C.navy }}>Wizyta umówiona!</h3>
            <p className="text-xs mt-1" style={{ color: C.gray }}>{d.spec} • {d.name}</p>
            <p className="text-xs" style={{ color: C.gray }}>Pon 22 mar, 08:00 • Stacjonarna</p>
            <p className="text-[10px] mt-2 font-mono font-bold" style={{ color: C.teal }}>MC-{Math.floor(Math.random() * 9000 + 1000)}</p>
            <p className="text-[10px] mt-2 max-w-[220px] mx-auto" style={{ color: C.gray }}>Potwierdzenie SMS zostanie wysłane na Twój telefon.</p>
          </motion.div>
        )}
      </div>
    );
  }

  return (
    <div className="p-4 space-y-3">
      <div className="flex items-center gap-2">
        <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: C.white }}>
          <Search className="w-3.5 h-3.5" style={{ color: C.gray }} />
          <input placeholder="Szukaj lekarza..." className="text-xs bg-transparent outline-none flex-1" style={{ color: C.navy }} />
        </div>
      </div>
      <span className="text-xs font-bold" style={{ color: C.navy }}>Wszyscy lekarze ({doctors.length})</span>
      {doctors.map((d, i) => (
        <motion.button key={i} whileHover={{ scale: 1.01 }} onClick={() => setSelectedDoc(i)}
          className="w-full p-4 rounded-xl text-left" style={{ background: C.white }}>
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full flex items-center justify-center text-base font-bold" style={{ background: `linear-gradient(135deg, ${C.teal}, ${C.blue})`, color: C.white }}>{d.avatar}</div>
            <div className="flex-1">
              <span className="text-xs font-bold" style={{ color: C.navy }}>{d.name}</span>
              <span className="text-[10px] block" style={{ color: C.teal }}>{d.spec} • {d.exp}</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="flex">{[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-2.5 h-2.5" style={{ fill: s <= Math.floor(d.rating) ? C.amber : C.gray + "30", color: s <= Math.floor(d.rating) ? C.amber : C.gray + "30" }} />)}</div>
                <span className="text-[10px] font-bold" style={{ color: C.navy }}>{d.rating}</span>
                <span className="text-[9px]" style={{ color: C.gray }}>({d.reviews})</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between mt-2 pt-2 border-t" style={{ borderColor: C.light }}>
            <div className="flex items-center gap-3 text-[10px]" style={{ color: C.gray }}>
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{d.loc.split(",")[0]}</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{d.nextFree}</span>
            </div>
            <span className="font-bold text-sm" style={{ color: C.teal }}>{d.price} zł</span>
          </div>
        </motion.button>
      ))}
    </div>
  );
}

function MyHealthPage() {
  const [tab, setTab] = useState("results");
  return (
    <div className="p-4 space-y-3">
      <div className="p-4 rounded-2xl text-center" style={{ background: `linear-gradient(135deg, ${C.teal}, ${C.blue})` }}>
        <div className="w-14 h-14 rounded-full mx-auto mb-2 flex items-center justify-center text-lg font-bold" style={{ background: "rgba(255,255,255,0.2)", color: C.white }}>JK</div>
        <h3 className="font-bold text-base text-white">Jan Kowalski</h3>
        <p className="text-[10px] text-white/70">Nr pacjenta: MC-00421</p>
        <div className="grid grid-cols-3 gap-2 mt-3">
          {[{ v: "12", l: "Wizyt" }, { v: "3", l: "Badania" }, { v: "2", l: "Recepty" }].map((s, i) => (
            <div key={i} className="p-1.5 rounded-lg" style={{ background: "rgba(255,255,255,0.15)" }}>
              <span className="font-bold text-sm block text-white">{s.v}</span>
              <span className="text-[8px] text-white/70">{s.l}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-1 p-1 rounded-lg" style={{ background: C.white }}>
        {[
          { id: "results", label: "Wyniki", icon: <FileText className="w-3.5 h-3.5" /> },
          { id: "prescriptions", label: "Recepty", icon: <Pill className="w-3.5 h-3.5" /> },
          { id: "health", label: "Parametry", icon: <Activity className="w-3.5 h-3.5" /> },
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className="flex-1 flex items-center justify-center gap-1 py-2 rounded-md text-[10px] font-semibold"
            style={tab === t.id ? { background: C.teal, color: C.white } : { color: C.gray }}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {tab === "results" && (
        <div className="space-y-2">
          {results.map((r, i) => (
            <div key={i} className="p-3 rounded-xl" style={{ background: C.white }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: r.status === "normal" ? C.green + "15" : C.amber + "15" }}>
                  {r.status === "normal" ? <CheckCircle2 className="w-4 h-4" style={{ color: C.green }} /> : <AlertTriangle className="w-4 h-4" style={{ color: C.amber }} />}
                </div>
                <div className="flex-1">
                  <span className="text-[11px] font-bold" style={{ color: C.navy }}>{r.name}</span>
                  <span className="text-[9px] block" style={{ color: C.gray }}>{r.date}</span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[8px] font-bold" style={{ background: r.status === "normal" ? C.green + "15" : C.amber + "15", color: r.status === "normal" ? C.green : C.amber }}>
                  {r.status === "normal" ? "W normie" : "Uwaga"}
                </span>
              </div>
              <div className="space-y-1">
                {r.values.map((v, j) => (
                  <div key={j} className="flex items-center justify-between py-1 border-b last:border-0" style={{ borderColor: C.light }}>
                    <span className="text-[10px]" style={{ color: C.navy }}>{v.n}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold" style={{ color: v.ok ? C.navy : C.red }}>{v.v}</span>
                      <span className="text-[9px] w-16 text-right" style={{ color: C.gray }}>ref: {v.ref}</span>
                      {v.ok ? <CheckCircle2 className="w-3 h-3" style={{ color: C.green }} /> : <AlertTriangle className="w-3 h-3" style={{ color: C.red }} />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "prescriptions" && (
        <div className="space-y-2">
          {prescriptions.map((p, i) => (
            <div key={i} className="p-3 rounded-xl" style={{ background: C.white }}>
              <div className="flex items-center gap-2 mb-2">
                <Pill className="w-4 h-4" style={{ color: C.teal }} />
                <span className="text-[11px] font-bold" style={{ color: C.navy }}>{p.name}</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5 text-center">
                <div className="p-1.5 rounded-lg" style={{ background: C.light }}>
                  <span className="text-[8px]" style={{ color: C.gray }}>Dawkowanie</span>
                  <p className="text-[10px] font-semibold" style={{ color: C.navy }}>{p.dose}</p>
                </div>
                <div className="p-1.5 rounded-lg" style={{ background: C.light }}>
                  <span className="text-[8px]" style={{ color: C.gray }}>Ważna do</span>
                  <p className="text-[10px] font-semibold" style={{ color: C.navy }}>{p.expires}</p>
                </div>
                <div className="p-1.5 rounded-lg" style={{ background: C.light }}>
                  <span className="text-[8px]" style={{ color: C.gray }}>Odnowienia</span>
                  <p className="text-[10px] font-semibold" style={{ color: C.teal }}>{p.refills}</p>
                </div>
              </div>
              <div className="mt-2 p-2 rounded-lg flex items-center justify-between" style={{ background: C.teal + "08", border: `1px dashed ${C.teal}30` }}>
                <div>
                  <span className="text-[8px]" style={{ color: C.gray }}>Kod e-recepty</span>
                  <p className="font-mono font-bold text-[10px]" style={{ color: C.teal }}>{p.code}</p>
                </div>
                <button className="px-2.5 py-1 rounded-lg text-[9px] font-bold text-white" style={{ background: C.teal }}>Pokaż QR</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "health" && (
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "Ciśnienie", value: "125/82", unit: "mmHg", icon: <Heart className="w-4 h-4" />, ok: true },
              { label: "Tętno", value: "72", unit: "bpm", icon: <Activity className="w-4 h-4" />, ok: true },
              { label: "BMI", value: "24.8", unit: "kg/m²", icon: <User className="w-4 h-4" />, ok: true },
              { label: "Cholesterol", value: "215", unit: "mg/dL", icon: <AlertTriangle className="w-4 h-4" />, ok: false },
            ].map((m, i) => (
              <div key={i} className="p-3 rounded-xl" style={{ background: C.white }}>
                <div className="flex items-center gap-1.5 mb-1" style={{ color: m.ok ? C.teal : C.amber }}>{m.icon}<span className="text-[10px]">{m.label}</span></div>
                <span className="font-bold text-lg" style={{ color: C.navy }}>{m.value}</span>
                <span className="text-[10px] ml-1" style={{ color: C.gray }}>{m.unit}</span>
                <span className="block mt-0.5 text-[9px] font-medium" style={{ color: m.ok ? C.green : C.amber }}>{m.ok ? "✓ W normie" : "⚠ Do konsultacji"}</span>
              </div>
            ))}
          </div>
          <div className="p-3 rounded-xl" style={{ background: C.white }}>
            <span className="text-[10px] font-bold" style={{ color: C.navy }}>Szczepienia</span>
            {[{ name: "COVID-19 (3 dawki)", date: "Ważne do XII 2026" }, { name: "Grypa sezonowa", date: "X 2025" }].map((v, i) => (
              <div key={i} className="flex items-center gap-2 mt-1.5">
                <Shield className="w-3.5 h-3.5" style={{ color: C.green }} />
                <span className="text-[10px] flex-1" style={{ color: C.navy }}>{v.name}</span>
                <span className="text-[9px]" style={{ color: C.gray }}>{v.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function VisitsPage() {
  const visits = [
    { date: "25 mar 2026, 10:00", doctor: "dr Nowak", spec: "Internista", type: "Stacjonarna", status: "upcoming", notes: "Kontrola ogólna + wyniki" },
    { date: "12 mar 2026, 14:30", doctor: "dr Wiśniewski", spec: "Kardiolog", type: "Stacjonarna", status: "completed", notes: "EKG, konsultacja lipidogramu" },
    { date: "5 mar 2026, 9:00", doctor: "dr Nowak", spec: "Internista", type: "Teleporada", status: "completed", notes: "Zlecenie badań krwi" },
    { date: "18 lut 2026, 11:00", doctor: "dr Lewandowska", spec: "Dermatolog", type: "Stacjonarna", status: "completed", notes: "Badanie znamion" },
    { date: "2 lut 2026, 16:00", doctor: "dr Zieliński", spec: "Ortopeda", type: "Stacjonarna", status: "completed", notes: "RTG kolana, konsultacja" },
  ];

  return (
    <div className="p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-sm" style={{ color: C.navy }}>Moje Wizyty</h2>
        <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[10px] font-bold text-white" style={{ background: C.teal }}>
          <Calendar className="w-3 h-3" /> Umów wizytę
        </button>
      </div>
      <div className="space-y-2">
        {visits.map((v, i) => {
          const isUpcoming = v.status === "upcoming";
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="p-3 rounded-xl" style={{ background: C.white, borderLeft: `3px solid ${isUpcoming ? C.teal : C.gray + "40"}` }}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-semibold" style={{ color: isUpcoming ? C.teal : C.gray }}>{v.date}</span>
                <span className="px-2 py-0.5 rounded-full text-[8px] font-bold"
                  style={isUpcoming ? { background: C.teal + "15", color: C.teal } : { background: C.gray + "15", color: C.gray }}>
                  {isUpcoming ? "Nadchodząca" : "Odbyta"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold" style={{ color: C.navy }}>{v.doctor}</span>
                <span className="text-[9px]" style={{ color: C.gray }}>• {v.spec}</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="px-1.5 py-0.5 rounded text-[8px] font-semibold" style={{ background: v.type === "Teleporada" ? C.blue + "15" : C.teal + "10", color: v.type === "Teleporada" ? C.blue : C.teal }}>
                  {v.type === "Teleporada" ? "📹 Teleporada" : "🏥 Stacjonarna"}
                </span>
                <span className="text-[9px]" style={{ color: C.gray }}>{v.notes}</span>
              </div>
              {isUpcoming && (
                <div className="flex gap-2 mt-2">
                  <button className="flex-1 py-1.5 rounded-lg text-[10px] font-bold text-white" style={{ background: C.teal }}>Potwierdź</button>
                  <button className="py-1.5 px-3 rounded-lg text-[10px] font-bold" style={{ background: C.red + "10", color: C.red }}>Odwołaj</button>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function ContactPage() {
  return (
    <div className="p-4 space-y-3">
      <h2 className="font-bold text-sm" style={{ color: C.navy }}>Kontakt</h2>
      <div className="p-4 rounded-xl" style={{ background: C.white }}>
        <h3 className="font-bold text-sm mb-2" style={{ color: C.navy }}>MediCare — Centrum Medyczne</h3>
        <div className="space-y-2">
          {[
            { icon: <MapPin className="w-3.5 h-3.5" />, label: "ul. Medyczna 10, 00-001 Warszawa" },
            { icon: <Phone className="w-3.5 h-3.5" />, label: "+48 22 100 20 30" },
            { icon: <Clock className="w-3.5 h-3.5" />, label: "Pn-Pt 7:00-20:00, Sob 8:00-14:00" },
          ].map((c, i) => (
            <div key={i} className="flex items-center gap-2">
              <div style={{ color: C.teal }}>{c.icon}</div>
              <span className="text-[11px]" style={{ color: C.navy }}>{c.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="p-3 rounded-xl" style={{ background: C.teal + "10" }}>
        <div className="flex items-center gap-2 mb-2">
          <Phone className="w-4 h-4" style={{ color: C.teal }} />
          <span className="text-[11px] font-bold" style={{ color: C.navy }}>Linia alarmowa 24/7</span>
        </div>
        <span className="text-lg font-bold" style={{ color: C.teal }}>+48 22 100 00 00</span>
      </div>
      <div className="p-3 rounded-xl space-y-2" style={{ background: C.white }}>
        <span className="text-[10px] font-bold" style={{ color: C.navy }}>Wyślij wiadomość</span>
        <input placeholder="Temat..." className="w-full px-3 py-2 rounded-lg text-[11px] outline-none" style={{ background: C.light, color: C.navy }} />
        <textarea placeholder="Treść wiadomości..." rows={3} className="w-full px-3 py-2 rounded-lg text-[11px] outline-none resize-none" style={{ background: C.light, color: C.navy }} />
        <button className="w-full py-2 rounded-lg text-[10px] font-bold text-white" style={{ background: C.teal }}>Wyślij</button>
      </div>
    </div>
  );
}
