import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PreviewShell, DemoFooterCTA, DemoBenefits } from "./PreviewShell";
import {
  Heart, Calendar, Clock, User, FileText, Activity, Shield, Phone,
  CheckCircle2, Pill, Stethoscope, AlertTriangle, Bell, ChevronRight,
  Video, MessageSquare, Search, Plus, ArrowRight
} from "lucide-react";

const C = { teal: "#0D9488", white: "#FFFFFF", mint: "#F0FDFA", navy: "#0F172A", blue: "#0EA5E9", gray: "#64748B", light: "#F8FAFC", green: "#22C55E", red: "#EF4444", amber: "#F59E0B" };

const doctors = [
  { name: "dr Katarzyna Nowak", spec: "Internista", rating: 4.9, reviews: 312, nextFree: "Dziś 15:30", avatar: "KN", available: true },
  { name: "dr Marek Wiśniewski", spec: "Kardiolog", rating: 4.8, reviews: 245, nextFree: "Jutro 10:00", avatar: "MW", available: true },
  { name: "dr Anna Lewandowska", spec: "Dermatolog", rating: 5.0, reviews: 189, nextFree: "Śr 9:00", avatar: "AL", available: false },
  { name: "dr Piotr Zieliński", spec: "Ortopeda", rating: 4.7, reviews: 156, nextFree: "Czw 11:30", avatar: "PZ", available: true },
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

const upcomingVisits = [
  { name: "Kontrola ogólna", date: "25 mar 2026, 10:00", doc: "dr Nowak", type: "stacjonarna" },
  { name: "Konsultacja kardiologiczna", date: "28 mar 2026, 14:00", doc: "dr Wiśniewski", type: "teleporada" },
];

export function HealthcareDemo({ name }: { name: string; features: string[] }) {
  const [page, setPage] = useState("home");

  const bottomNav = [
    { id: "home", label: "Główna", icon: <Heart className="w-5 h-5" /> },
    { id: "booking", label: "Wizyta", icon: <Calendar className="w-5 h-5" /> },
    { id: "results", label: "Wyniki", icon: <FileText className="w-5 h-5" /> },
    { id: "prescriptions", label: "Recepty", icon: <Pill className="w-5 h-5" /> },
    { id: "profile", label: "Profil", icon: <User className="w-5 h-5" /> },
  ];

  return (
    <PreviewShell title={name}>
      <div style={{ background: C.light, minHeight: 500 }}>
        <div className="flex items-center justify-between px-4 py-3" style={{ background: C.white }}>
          <div>
            <span className="text-[10px]" style={{ color: C.gray }}>Dzień dobry,</span>
            <h2 className="font-bold text-sm" style={{ color: C.navy }}>Jan Kowalski</h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Bell className="w-5 h-5" style={{ color: C.gray }} />
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2" style={{ background: C.red, borderColor: C.white }} />
            </div>
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: `linear-gradient(135deg, ${C.teal}, ${C.blue})` }}>JK</div>
          </div>
        </div>

        <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div key={page} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              {page === "home" && <HomePage onNav={setPage} />}
              {page === "booking" && <BookingPage />}
              {page === "results" && <ResultsPage />}
              {page === "prescriptions" && <PrescriptionsPage />}
              {page === "profile" && <ProfilePage />}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-around py-2 border-t" style={{ background: C.white, borderColor: C.light }}>
          {bottomNav.map(n => (
            <button key={n.id} onClick={() => setPage(n.id)}
              className="flex flex-col items-center gap-0.5 px-2 py-1"
              style={{ color: page === n.id ? C.teal : C.gray }}>
              {n.icon}
              <span className="text-[9px] font-medium">{n.label}</span>
            </button>
          ))}
        </div>
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
      {upcomingVisits.length > 0 && (
        <div className="p-4 rounded-2xl" style={{ background: `linear-gradient(135deg, ${C.teal}, ${C.blue})` }}>
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-white/80" />
            <span className="text-[10px] text-white/80 font-medium">Najbliższa wizyta</span>
          </div>
          <h3 className="font-bold text-base text-white">{upcomingVisits[0].name}</h3>
          <p className="text-xs text-white/80 mt-0.5">{upcomingVisits[0].date} • {upcomingVisits[0].doc}</p>
          <div className="flex items-center gap-2 mt-3">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold text-white" style={{ background: "rgba(255,255,255,0.2)" }}>
              {upcomingVisits[0].type === "teleporada" ? "📹 Teleporada" : "🏥 Stacjonarna"}
            </span>
            <button className="ml-auto px-3 py-1.5 rounded-full text-[10px] font-bold" style={{ background: C.white, color: C.teal }}>Szczegóły</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <motion.button whileHover={{ scale: 1.02 }} onClick={() => onNav("booking")}
          className="p-4 rounded-2xl text-left" style={{ background: C.white, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-2" style={{ background: C.teal + "15" }}>
            <Stethoscope className="w-5 h-5" style={{ color: C.teal }} />
          </div>
          <span className="text-xs font-bold block" style={{ color: C.navy }}>Umów wizytę</span>
          <span className="text-[10px]" style={{ color: C.gray }}>Stacjonarnie lub online</span>
        </motion.button>
        <motion.button whileHover={{ scale: 1.02 }} onClick={() => onNav("results")}
          className="p-4 rounded-2xl text-left" style={{ background: C.white, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-2 relative" style={{ background: C.amber + "15" }}>
            <FileText className="w-5 h-5" style={{ color: C.amber }} />
            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold text-white" style={{ background: C.red }}>1</div>
          </div>
          <span className="text-xs font-bold block" style={{ color: C.navy }}>Wyniki badań</span>
          <span className="text-[10px]" style={{ color: C.amber }}>1 wymaga konsultacji</span>
        </motion.button>
        <motion.button whileHover={{ scale: 1.02 }} onClick={() => onNav("prescriptions")}
          className="p-4 rounded-2xl text-left" style={{ background: C.white, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-2" style={{ background: C.blue + "15" }}>
            <Pill className="w-5 h-5" style={{ color: C.blue }} />
          </div>
          <span className="text-xs font-bold block" style={{ color: C.navy }}>E-Recepty</span>
          <span className="text-[10px]" style={{ color: C.gray }}>2 aktywne recepty</span>
        </motion.button>
        <motion.button whileHover={{ scale: 1.02 }}
          className="p-4 rounded-2xl text-left" style={{ background: C.white, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-2" style={{ background: C.green + "15" }}>
            <Video className="w-5 h-5" style={{ color: C.green }} />
          </div>
          <span className="text-xs font-bold block" style={{ color: C.navy }}>Teleporada</span>
          <span className="text-[10px]" style={{ color: C.gray }}>Konsultacja video</span>
        </motion.button>
      </div>

      <div style={{ background: C.white, borderRadius: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
        <div className="flex items-center justify-between px-4 pt-3 pb-2">
          <span className="text-xs font-bold" style={{ color: C.navy }}>Parametry zdrowia</span>
          <span className="text-[10px]" style={{ color: C.teal }}>Ostatnia aktualizacja: 12 mar</span>
        </div>
        <div className="grid grid-cols-2 gap-px" style={{ background: C.light }}>
          {[
            { label: "Ciśnienie", value: "125/82", unit: "mmHg", icon: <Heart className="w-3.5 h-3.5" />, ok: true },
            { label: "Tętno", value: "72", unit: "bpm", icon: <Activity className="w-3.5 h-3.5" />, ok: true },
            { label: "BMI", value: "24.8", unit: "kg/m²", icon: <User className="w-3.5 h-3.5" />, ok: true },
            { label: "Cholesterol", value: "215", unit: "mg/dL", icon: <AlertTriangle className="w-3.5 h-3.5" />, ok: false },
          ].map((m, i) => (
            <div key={i} className="p-3" style={{ background: C.white }}>
              <div className="flex items-center gap-1.5 mb-1" style={{ color: m.ok ? C.teal : C.amber }}>{m.icon}<span className="text-[10px]">{m.label}</span></div>
              <span className="font-bold text-lg" style={{ color: C.navy }}>{m.value}</span>
              <span className="text-[10px] ml-1" style={{ color: C.gray }}>{m.unit}</span>
              <span className="block mt-0.5 text-[9px] font-medium" style={{ color: m.ok ? C.green : C.amber }}>{m.ok ? "✓ W normie" : "⚠ Do konsultacji"}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 rounded-2xl" style={{ background: C.white, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
        <span className="text-xs font-bold" style={{ color: C.navy }}>Nadchodzące wizyty</span>
        <div className="space-y-2 mt-2">
          {upcomingVisits.map((v, i) => (
            <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl" style={{ background: C.light }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: v.type === "teleporada" ? C.blue + "15" : C.teal + "15" }}>
                {v.type === "teleporada" ? <Video className="w-4 h-4" style={{ color: C.blue }} /> : <Stethoscope className="w-4 h-4" style={{ color: C.teal }} />}
              </div>
              <div className="flex-1">
                <span className="text-[11px] font-semibold" style={{ color: C.navy }}>{v.name}</span>
                <p className="text-[10px]" style={{ color: C.gray }}>{v.date} • {v.doc}</p>
              </div>
              <ChevronRight className="w-4 h-4" style={{ color: C.gray }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BookingPage() {
  const [step, setStep] = useState(0);
  const [visitType, setVisitType] = useState("");
  const specialties = ["Internista", "Kardiolog", "Dermatolog", "Ortopeda", "Okulista", "Laryngolog"];
  const days = ["Pon 22", "Wt 23", "Śr 24", "Czw 25", "Pt 26"];
  const slots = ["08:00", "08:30", "09:00", "10:00", "10:30", "11:00", "14:00", "14:30", "15:00", "15:30"];

  return (
    <div className="p-4 space-y-3">
      <h2 className="font-bold text-base" style={{ color: C.navy }}>Umów wizytę</h2>
      <div className="flex gap-2 mb-2">
        {["stacjonarna", "teleporada"].map(t => (
          <button key={t} onClick={() => setVisitType(t)}
            className="flex-1 p-3 rounded-xl text-center" style={visitType === t ? { background: C.teal, color: C.white } : { background: C.white, color: C.navy }}>
            <span className="text-lg block mb-1">{t === "stacjonarna" ? "🏥" : "📹"}</span>
            <span className="text-xs font-semibold capitalize">{t}</span>
          </button>
        ))}
      </div>

      {step === 0 && (
        <div>
          <span className="text-xs font-medium" style={{ color: C.gray }}>Wybierz specjalizację</span>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {specialties.map(s => (
              <button key={s} onClick={() => setStep(1)}
                className="p-3 rounded-xl text-left flex items-center gap-2" style={{ background: C.white }}>
                <Stethoscope className="w-4 h-4" style={{ color: C.teal }} />
                <span className="text-xs font-medium" style={{ color: C.navy }}>{s}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-2">
          <span className="text-xs font-medium" style={{ color: C.gray }}>Wybierz lekarza</span>
          {doctors.filter(d => d.available).map((d, i) => (
            <button key={i} onClick={() => setStep(2)} className="w-full flex items-center gap-3 p-3 rounded-xl text-left" style={{ background: C.white }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: `linear-gradient(135deg, ${C.teal}, ${C.blue})` }}>{d.avatar}</div>
              <div className="flex-1">
                <span className="text-xs font-semibold" style={{ color: C.navy }}>{d.name}</span>
                <p className="text-[10px]" style={{ color: C.gray }}>{d.spec} • ⭐ {d.rating}</p>
              </div>
              <span className="text-[10px] font-medium" style={{ color: C.green }}>{d.nextFree}</span>
            </button>
          ))}
          <button onClick={() => setStep(0)} className="text-[10px] font-medium" style={{ color: C.teal }}>← Zmień specjalizację</button>
        </div>
      )}

      {step === 2 && (
        <div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {days.map((d, i) => (
              <button key={d} className="flex-1 py-2 rounded-xl text-xs font-medium min-w-[55px]"
                style={i === 0 ? { background: C.teal, color: C.white } : { background: C.white, color: C.navy }}>{d}</button>
            ))}
          </div>
          <div className="grid grid-cols-4 gap-2 mt-2">
            {slots.map((s, i) => {
              const off = i === 2 || i === 7;
              return (
                <button key={s} onClick={() => !off && setStep(3)}
                  className={`py-2.5 rounded-xl text-xs font-medium ${off ? "line-through" : ""}`}
                  style={off ? { background: C.light, color: C.gray + "40" } : { background: C.white, color: C.navy }}>{s}</button>
              );
            })}
          </div>
          <button onClick={() => setStep(1)} className="text-[10px] font-medium mt-2" style={{ color: C.teal }}>← Zmień lekarza</button>
        </div>
      )}

      {step === 3 && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
          <div className="w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ background: C.green + "15" }}>
            <CheckCircle2 className="w-7 h-7" style={{ color: C.green }} />
          </div>
          <h3 className="font-bold text-base" style={{ color: C.navy }}>Wizyta umówiona!</h3>
          <p className="text-xs mt-1" style={{ color: C.gray }}>Internista • Pon 22 mar, 08:00</p>
          <p className="text-[10px] mt-1 font-mono font-bold" style={{ color: C.teal }}>MC-{Math.floor(Math.random() * 9000 + 1000)}</p>
          <p className="text-[10px] mt-2 max-w-[220px] mx-auto" style={{ color: C.gray }}>Potwierdzenie SMS zostanie wysłane na Twój numer telefonu.</p>
        </motion.div>
      )}
    </div>
  );
}

function ResultsPage() {
  const [expanded, setExpanded] = useState(-1);
  return (
    <div className="p-4 space-y-3">
      <h2 className="font-bold text-base" style={{ color: C.navy }}>Wyniki badań</h2>
      {results.map((r, i) => (
        <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
          <button onClick={() => setExpanded(expanded === i ? -1 : i)}
            className="w-full p-3.5 rounded-xl text-left flex items-center gap-3" style={{ background: C.white }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: r.status === "normal" ? C.green + "15" : C.amber + "15" }}>
              {r.status === "normal" ? <CheckCircle2 className="w-5 h-5" style={{ color: C.green }} /> : <AlertTriangle className="w-5 h-5" style={{ color: C.amber }} />}
            </div>
            <div className="flex-1">
              <span className="text-xs font-semibold" style={{ color: C.navy }}>{r.name}</span>
              <p className="text-[10px]" style={{ color: C.gray }}>{r.date}</p>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold" style={{ background: r.status === "normal" ? C.green + "15" : C.amber + "15", color: r.status === "normal" ? C.green : C.amber }}>
              {r.status === "normal" ? "W normie" : "Uwaga"}
            </span>
            <ChevronRight className={`w-4 h-4 transition-transform ${expanded === i ? "rotate-90" : ""}`} style={{ color: C.gray }} />
          </button>
          {expanded === i && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
              className="mt-1 p-3 rounded-xl space-y-1.5" style={{ background: C.white }}>
              {r.values.map((v, j) => (
                <div key={j} className="flex items-center justify-between py-1 border-b last:border-0" style={{ borderColor: C.light }}>
                  <span className="text-[11px] font-medium" style={{ color: C.navy }}>{v.n}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-bold" style={{ color: v.ok ? C.navy : C.red }}>{v.v}</span>
                    <span className="text-[9px] w-20 text-right" style={{ color: C.gray }}>ref: {v.ref}</span>
                    {v.ok ? <CheckCircle2 className="w-3.5 h-3.5" style={{ color: C.green }} /> : <AlertTriangle className="w-3.5 h-3.5" style={{ color: C.red }} />}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  );
}

function PrescriptionsPage() {
  return (
    <div className="p-4 space-y-3">
      <h2 className="font-bold text-base" style={{ color: C.navy }}>E-Recepty</h2>
      {prescriptions.map((p, i) => (
        <div key={i} className="p-4 rounded-2xl" style={{ background: C.white }}>
          <div className="flex items-center gap-2 mb-2">
            <Pill className="w-4 h-4" style={{ color: C.teal }} />
            <span className="text-sm font-bold" style={{ color: C.navy }}>{p.name}</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2 rounded-xl" style={{ background: C.light }}>
              <span className="text-[9px]" style={{ color: C.gray }}>Dawkowanie</span>
              <p className="text-[11px] font-semibold" style={{ color: C.navy }}>{p.dose}</p>
            </div>
            <div className="p-2 rounded-xl" style={{ background: C.light }}>
              <span className="text-[9px]" style={{ color: C.gray }}>Ważna do</span>
              <p className="text-[11px] font-semibold" style={{ color: C.navy }}>{p.expires}</p>
            </div>
            <div className="p-2 rounded-xl" style={{ background: C.light }}>
              <span className="text-[9px]" style={{ color: C.gray }}>Odnowienia</span>
              <p className="text-[11px] font-semibold" style={{ color: C.teal }}>{p.refills} pozostało</p>
            </div>
          </div>
          <div className="mt-3 p-2.5 rounded-xl flex items-center justify-between" style={{ background: C.teal + "08", border: `1px dashed ${C.teal}30` }}>
            <div>
              <span className="text-[9px]" style={{ color: C.gray }}>Kod e-recepty</span>
              <p className="font-mono font-bold text-xs" style={{ color: C.teal }}>{p.code}</p>
            </div>
            <button className="px-3 py-1.5 rounded-lg text-[10px] font-bold text-white" style={{ background: C.teal }}>Pokaż kod QR</button>
          </div>
        </div>
      ))}
    </div>
  );
}

function ProfilePage() {
  return (
    <div className="p-4 space-y-3">
      <div className="p-5 rounded-2xl text-center" style={{ background: `linear-gradient(135deg, ${C.teal}, ${C.blue})` }}>
        <div className="w-16 h-16 rounded-full mx-auto mb-2 flex items-center justify-center text-xl font-bold border-3" style={{ background: "rgba(255,255,255,0.2)", color: C.white, borderColor: "rgba(255,255,255,0.3)" }}>JK</div>
        <h3 className="font-bold text-base text-white">Jan Kowalski</h3>
        <p className="text-xs text-white/70">PESEL: ****5678 • Nr pacjenta: MC-00421</p>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[{ v: "12", l: "Wizyt" }, { v: "3", l: "Wyniki" }, { v: "2", l: "Recepty" }].map((s, i) => (
          <div key={i} className="p-3 rounded-xl text-center" style={{ background: C.white }}>
            <span className="font-bold text-lg block" style={{ color: C.teal }}>{s.v}</span>
            <span className="text-[10px]" style={{ color: C.gray }}>{s.l}</span>
          </div>
        ))}
      </div>
      <div className="p-3 rounded-xl" style={{ background: C.white }}>
        <span className="text-xs font-bold" style={{ color: C.navy }}>Szczepienia</span>
        {[{ name: "COVID-19 (3 dawki)", date: "Ważne do XII 2026" }, { name: "Grypa sezonowa", date: "X 2025" }].map((v, i) => (
          <div key={i} className="flex items-center gap-2 mt-2">
            <CheckCircle2 className="w-4 h-4" style={{ color: C.green }} />
            <span className="text-xs" style={{ color: C.navy }}>{v.name}</span>
            <span className="text-[10px] ml-auto" style={{ color: C.gray }}>{v.date}</span>
          </div>
        ))}
      </div>
      <div className="p-3 rounded-xl" style={{ background: C.white }}>
        <span className="text-xs font-bold" style={{ color: C.navy }}>Alergie</span>
        <div className="flex gap-1.5 mt-2 flex-wrap">
          {["Penicylina", "Pyłki trawy"].map((a, i) => (
            <span key={i} className="px-2.5 py-1 rounded-full text-[10px] font-medium" style={{ background: C.red + "10", color: C.red }}>{a}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
