import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PreviewShell, DemoNav, DemoSection, DemoFooterCTA, DemoBenefits } from "./PreviewShell";
import { Heart, Calendar, Clock, User, FileText, Activity, Shield, Phone, ChevronRight, CheckCircle2, Pill, Stethoscope, AlertTriangle } from "lucide-react";

const C = { white: "#FFFFFF", blue: "#2563EB", lightBlue: "#EFF6FF", navy: "#1E3A5F", gray: "#6B7280", light: "#F8FAFC", green: "#10B981", red: "#EF4444" };

const doctors = [
  { name: "dr Katarzyna Nowak", spec: "Internista", rating: 4.9, reviews: 312, nextFree: "Dziś 15:30", avatar: "KN" },
  { name: "dr Marek Wiśniewski", spec: "Kardiolog", rating: 4.8, reviews: 245, nextFree: "Jutro 10:00", avatar: "MW" },
  { name: "dr Anna Lewandowska", spec: "Dermatolog", rating: 5.0, reviews: 189, nextFree: "Śr 9:00", avatar: "AL" },
  { name: "dr Piotr Zieliński", spec: "Ortopeda", rating: 4.7, reviews: 156, nextFree: "Czw 11:30", avatar: "PZ" },
];

const specialties = ["Internista", "Kardiolog", "Dermatolog", "Ortopeda", "Okulista", "Laryngolog"];

const results = [
  { name: "Morfologia krwi", date: "12 mar 2026", status: "normal", doctor: "dr Nowak" },
  { name: "Lipidogram", date: "12 mar 2026", status: "attention", doctor: "dr Nowak" },
  { name: "TSH", date: "5 mar 2026", status: "normal", doctor: "dr Wiśniewski" },
  { name: "RTG klatki piersiowej", date: "28 lut 2026", status: "normal", doctor: "dr Wiśniewski" },
];

const prescriptions = [
  { name: "Metformina 500mg", dose: "2x dziennie", expires: "15 kwi 2026", refills: 2 },
  { name: "Atorwastatyna 20mg", dose: "1x wieczorem", expires: "10 maj 2026", refills: 3 },
];

export function HealthcareDemo({ name }: { name: string; features: string[] }) {
  const [page, setPage] = useState("home");
  const tabs = [
    { id: "home", label: "Start", icon: <Heart className="w-3 h-3" /> },
    { id: "booking", label: "Wizyta", icon: <Calendar className="w-3 h-3" /> },
    { id: "health", label: "Moje Zdrowie", icon: <Activity className="w-3 h-3" /> },
    { id: "results", label: "Wyniki", icon: <FileText className="w-3 h-3" /> },
    { id: "prescriptions", label: "Recepty", icon: <Pill className="w-3 h-3" /> },
    { id: "doctors", label: "Lekarze", icon: <Stethoscope className="w-3 h-3" /> },
  ];

  return (
    <PreviewShell title={name}>
      <DemoNav tabs={tabs} activeTab={page} onTabChange={setPage} logo="MedCare+" />
      <AnimatePresence mode="wait">
        <motion.div key={page} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
          {page === "home" && <HomePage onNav={setPage} />}
          {page === "booking" && <BookingPage />}
          {page === "health" && <HealthCardPage />}
          {page === "results" && <ResultsPage />}
          {page === "prescriptions" && <PrescriptionsPage />}
          {page === "doctors" && <DoctorsPage onNav={setPage} />}
        </motion.div>
      </AnimatePresence>
    </PreviewShell>
  );
}

function HomePage({ onNav }: { onNav: (p: string) => void }) {
  return (
    <div>
      <div className="p-10 text-center" style={{ background: `linear-gradient(160deg, ${C.blue}, ${C.navy})` }}>
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/60">Platforma Medyczna</p>
        <h1 className="font-display font-bold text-4xl mt-2 text-white">MedCare<span style={{ color: "#60A5FA" }}>+</span></h1>
        <p className="text-xs mt-2 max-w-[260px] mx-auto leading-relaxed text-white/80">Wizyty online i stacjonarnie. E-recepty, wyniki badań, karta zdrowia — Twoje zdrowie w jednej aplikacji.</p>
        <div className="flex gap-3 justify-center mt-6">
          <motion.button whileHover={{ scale: 1.03 }} onClick={() => onNav("booking")}
            className="px-7 py-3.5 rounded-lg font-bold text-sm shadow-lg text-white" style={{ background: C.green }}>Umów wizytę</motion.button>
          <button onClick={() => onNav("doctors")} className="px-7 py-3.5 rounded-lg font-semibold text-sm border border-white/30 text-white">Lekarze</button>
        </div>
      </div>
      <DemoSection>
        <div className="grid grid-cols-4 gap-2">
          {[
            { icon: "🩺", label: "20+ lekarzy", desc: "Specjaliści" },
            { icon: "📱", label: "Teleporady", desc: "Online" },
            { icon: "💊", label: "E-Recepty", desc: "Natychmiast" },
            { icon: "📋", label: "Wyniki", desc: "W chmurze" },
          ].map((f, i) => (
            <div key={i} className="p-2.5 rounded-xl text-center" style={{ background: C.lightBlue }}>
              <span className="text-lg block">{f.icon}</span>
              <span className="text-[8px] font-bold block mt-0.5" style={{ color: C.navy }}>{f.label}</span>
              <span className="text-[7px]" style={{ color: C.gray }}>{f.desc}</span>
            </div>
          ))}
        </div>
        <h3 className="font-semibold text-sm mt-4" style={{ color: C.navy }}>Polecani lekarze</h3>
        {doctors.slice(0, 2).map((d, i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-xl border" style={{ borderColor: C.lightBlue, background: C.white }}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs" style={{ background: C.blue }}>{d.avatar}</div>
            <div className="flex-1">
              <span className="text-xs font-semibold" style={{ color: C.navy }}>{d.name}</span>
              <p className="text-[10px]" style={{ color: C.gray }}>{d.spec}</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-medium" style={{ color: C.green }}>{d.nextFree}</span>
              <div className="flex items-center gap-0.5 justify-end"><Star className="w-3 h-3" style={{ fill: "#FBBF24", color: "#FBBF24" }} /><span className="text-[10px]">{d.rating}</span></div>
            </div>
          </div>
        ))}
        <div className="p-4 rounded-2xl mt-3" style={{ background: C.lightBlue, border: `1px solid ${C.blue}15` }}>
          <p className="text-[10px] tracking-[0.2em] uppercase text-center" style={{ color: C.blue }}>Opinie pacjentów</p>
          <p className="text-xs mt-2 text-center italic" style={{ color: C.navy + "90" }}>"Umówiłam wizytę w 2 minuty. Wyniki od razu w aplikacji. Polecam każdemu!"</p>
          <p className="text-[10px] text-center mt-1" style={{ color: C.blue }}>— Joanna W. ★★★★★</p>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-3">
          {[{ v: "15K+", l: "Pacjentów" },{ v: "20+", l: "Lekarzy" },{ v: "4.9", l: "Ocena" }].map((s, i) => (
            <div key={i} className="p-3 rounded-xl text-center" style={{ background: `${C.blue}08` }}>
              <span className="font-bold text-sm block" style={{ color: C.blue }}>{s.v}</span>
              <span className="text-[9px]" style={{ color: C.gray }}>{s.l}</span>
            </div>
          ))}
        </div>
      </DemoSection>
      <DemoBenefits accentColor={C.blue} bgColor={C.lightBlue} textColor={C.navy} benefits={[
        { icon: "📱", title: "E-rejestracja", desc: "Pacjent umawia się online 24/7" },
        { icon: "📋", title: "Porządek danych", desc: "Wyniki i historia w jednym miejscu" },
        { icon: "🔒", title: "Bezpieczeństwo", desc: "Bezpieczny portal pacjenta" },
        { icon: "⏰", title: "Automatyzacja", desc: "Przypomnienia SMS i powiadomienia" },
      ]} />
      <DemoFooterCTA accentColor={C.blue} bgColor={C.navy} />
    </div>
  );
}

function Star(props: any) { return <svg {...props} viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>; }

function BookingPage() {
  const [step, setStep] = useState(0);
  const [selSpec, setSelSpec] = useState("");
  const [selDoc, setSelDoc] = useState(-1);
  const [selDay, setSelDay] = useState(0);
  const days = ["Pon 22", "Wt 23", "Śr 24", "Czw 25", "Pt 26"];
  const slots = ["08:00", "08:30", "09:00", "10:00", "10:30", "11:00", "14:00", "14:30", "15:00", "15:30"];

  return (
    <DemoSection>
      <div className="flex gap-1 mb-4">
        {["Specjalizacja", "Lekarz", "Termin", "Gotowe"].map((s, i) => (
          <div key={s} className="flex items-center gap-1 flex-1">
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold"
              style={step >= i ? { background: C.blue, color: "white" } : { background: C.lightBlue, color: C.gray }}>{step > i ? "✓" : i + 1}</div>
            <span className="text-[9px]" style={{ color: step >= i ? C.navy : C.gray }}>{s}</span>
          </div>
        ))}
      </div>
      {step === 0 && (
        <div className="grid grid-cols-2 gap-2">
          {specialties.map(s => (
            <button key={s} onClick={() => { setSelSpec(s); setStep(1); }}
              className="p-4 rounded-xl border text-left" style={{ borderColor: C.lightBlue, background: C.white }}>
              <Stethoscope className="w-5 h-5 mb-1" style={{ color: C.blue }} />
              <span className="text-sm font-medium block" style={{ color: C.navy }}>{s}</span>
            </button>
          ))}
        </div>
      )}
      {step === 1 && (
        <div className="space-y-2">
          <p className="text-xs" style={{ color: C.gray }}>Dostępni lekarze: {selSpec}</p>
          {doctors.filter(d => d.spec === selSpec || selSpec === "").slice(0, 3).concat(doctors.slice(0, 2)).slice(0, 3).map((d, i) => (
            <div key={i} onClick={() => { setSelDoc(i); setStep(2); }}
              className="flex items-center gap-3 p-4 rounded-xl border cursor-pointer" style={{ borderColor: C.lightBlue, background: C.white }}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xs" style={{ background: C.blue }}>{d.avatar}</div>
              <div className="flex-1">
                <h4 className="font-semibold text-sm" style={{ color: C.navy }}>{d.name}</h4>
                <p className="text-[10px]" style={{ color: C.gray }}>{d.spec}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <Star className="w-3 h-3" style={{ fill: "#FBBF24", color: "#FBBF24" }} />
                  <span className="text-[10px]" style={{ color: C.navy }}>{d.rating} ({d.reviews})</span>
                </div>
              </div>
              <span className="text-[10px] font-medium" style={{ color: C.green }}>{d.nextFree}</span>
            </div>
          ))}
        </div>
      )}
      {step === 2 && (
        <div>
          <div className="flex gap-2 mb-3 overflow-x-auto">
            {days.map((d, i) => (
              <button key={d} onClick={() => setSelDay(i)} className="flex-1 py-2 rounded-lg text-xs font-medium min-w-[55px]"
                style={selDay === i ? { background: C.blue, color: "white" } : { background: C.lightBlue, color: C.gray }}>{d}</button>
            ))}
          </div>
          <div className="grid grid-cols-4 gap-2">
            {slots.map((s, i) => {
              const off = i === 2 || i === 7;
              return (
                <button key={s} onClick={() => !off && setStep(3)}
                  className={`py-3 rounded-lg text-sm font-medium ${off ? "line-through cursor-not-allowed" : "cursor-pointer"}`}
                  style={off ? { background: C.lightBlue, color: C.gray + "40" } : { background: C.lightBlue, color: C.navy }}>{s}</button>
              );
            })}
          </div>
        </div>
      )}
      {step === 3 && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
          <div className="w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ background: C.green + "15" }}>
            <CheckCircle2 className="w-7 h-7" style={{ color: C.green }} />
          </div>
          <h3 className="font-bold text-lg" style={{ color: C.navy }}>Wizyta umówiona!</h3>
          <p className="text-sm mt-1" style={{ color: C.gray }}>{selSpec} • {days[selDay]}</p>
          <p className="text-xs mt-1" style={{ color: C.blue }}>Nr: MC-{Math.floor(Math.random()*9000+1000)}</p>
        </motion.div>
      )}
    </DemoSection>
  );
}

function HealthCardPage() {
  const metrics = [
    { label: "Ciśnienie", value: "125/82", unit: "mmHg", status: "normal", icon: Heart },
    { label: "Tętno", value: "72", unit: "bpm", status: "normal", icon: Activity },
    { label: "BMI", value: "24.8", unit: "", status: "normal", icon: User },
    { label: "Cholesterol", value: "215", unit: "mg/dL", status: "attention", icon: AlertTriangle },
  ];
  const upcoming = [
    { name: "Kontrola ogólna", date: "25 mar 2026", doc: "dr Nowak" },
    { name: "Badanie krwi", date: "10 kwi 2026", doc: "Laboratorium" },
    { name: "Kardiolog", date: "28 kwi 2026", doc: "dr Wiśniewski" },
  ];

  return (
    <DemoSection>
      <div className="p-5 rounded-2xl" style={{ background: `linear-gradient(135deg, ${C.blue}, ${C.navy})` }}>
        <div className="flex items-center gap-3 mb-3">
          <Shield className="w-6 h-6 text-white" />
          <div>
            <h3 className="font-bold text-base text-white">Moje Zdrowie</h3>
            <p className="text-xs text-white/70">Jan Kowalski • PESEL: ****5678</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {metrics.map((m, i) => (
            <div key={i} className="p-3 rounded-xl" style={{ background: C.white + "15" }}>
              <div className="flex items-center gap-1">
                <m.icon className="w-3 h-3 text-white/60" />
                <span className="text-[10px] text-white/60">{m.label}</span>
              </div>
              <span className="font-bold text-lg text-white">{m.value}</span>
              <span className="text-[10px] text-white/50 ml-1">{m.unit}</span>
              <div className="mt-0.5">
                <span className="px-1.5 py-0.5 rounded text-[8px] font-bold" style={{
                  background: m.status === "normal" ? C.green + "30" : "#FBBF24" + "30",
                  color: m.status === "normal" ? "#6EE7B7" : "#FBBF24"
                }}>{m.status === "normal" ? "W normie" : "Uwaga"}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <h4 className="font-semibold text-sm mt-4" style={{ color: C.navy }}>Nadchodzące wizyty</h4>
      {upcoming.map((u, i) => (
        <div key={i} className="flex items-center gap-3 p-3 rounded-xl border" style={{ borderColor: C.lightBlue, background: C.white }}>
          <Calendar className="w-4 h-4" style={{ color: C.blue }} />
          <div className="flex-1">
            <span className="text-xs font-medium" style={{ color: C.navy }}>{u.name}</span>
            <p className="text-[10px]" style={{ color: C.gray }}>{u.date} • {u.doc}</p>
          </div>
          <ChevronRight className="w-4 h-4" style={{ color: C.gray }} />
        </div>
      ))}

      <h4 className="font-semibold text-sm mt-4" style={{ color: C.navy }}>Szczepienia</h4>
      <div className="p-3 rounded-xl border" style={{ borderColor: C.green + "30", background: C.green + "05" }}>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" style={{ color: C.green }} />
          <span className="text-xs" style={{ color: C.navy }}>COVID-19 (3 dawki) — ważne do XII 2026</span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <CheckCircle2 className="w-4 h-4" style={{ color: C.green }} />
          <span className="text-xs" style={{ color: C.navy }}>Grypa sezonowa — X 2025</span>
        </div>
      </div>
    </DemoSection>
  );
}

function ResultsPage() {
  return (
    <DemoSection>
      <h3 className="font-semibold text-sm" style={{ color: C.navy }}>Wyniki badań</h3>
      <div className="space-y-2">
        {results.map((r, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
            className="flex items-center gap-3 p-4 rounded-xl border cursor-pointer" style={{ borderColor: C.lightBlue, background: C.white }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: r.status === "normal" ? C.green + "15" : "#FBBF24" + "15" }}>
              {r.status === "normal" ? <CheckCircle2 className="w-5 h-5" style={{ color: C.green }} /> : <AlertTriangle className="w-5 h-5" style={{ color: "#FBBF24" }} />}
            </div>
            <div className="flex-1">
              <span className="text-sm font-medium" style={{ color: C.navy }}>{r.name}</span>
              <p className="text-[10px]" style={{ color: C.gray }}>{r.date} • {r.doctor}</p>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-medium" style={{
              background: r.status === "normal" ? C.green + "15" : "#FBBF24" + "15",
              color: r.status === "normal" ? C.green : "#D97706"
            }}>{r.status === "normal" ? "W normie" : "Do konsultacji"}</span>
          </motion.div>
        ))}
      </div>
    </DemoSection>
  );
}

function PrescriptionsPage() {
  return (
    <DemoSection>
      <h3 className="font-semibold text-sm" style={{ color: C.navy }}>Aktywne recepty</h3>
      <div className="space-y-3">
        {prescriptions.map((p, i) => (
          <div key={i} className="p-4 rounded-xl border" style={{ borderColor: C.lightBlue, background: C.white }}>
            <div className="flex items-center gap-2 mb-2">
              <Pill className="w-4 h-4" style={{ color: C.blue }} />
              <h4 className="font-semibold text-sm" style={{ color: C.navy }}>{p.name}</h4>
            </div>
            <div className="grid grid-cols-3 gap-2 text-[10px]">
              <div><span style={{ color: C.gray }}>Dawkowanie</span><p className="font-medium" style={{ color: C.navy }}>{p.dose}</p></div>
              <div><span style={{ color: C.gray }}>Ważna do</span><p className="font-medium" style={{ color: C.navy }}>{p.expires}</p></div>
              <div><span style={{ color: C.gray }}>Odnowienia</span><p className="font-medium" style={{ color: C.blue }}>{p.refills} pozostało</p></div>
            </div>
            <motion.button whileHover={{ scale: 1.02 }} className="w-full mt-3 py-2 rounded-lg text-xs font-semibold border" style={{ borderColor: C.blue, color: C.blue }}>Pokaż kod e-recepty</motion.button>
          </div>
        ))}
      </div>
    </DemoSection>
  );
}

function DoctorsPage({ onNav }: { onNav: (p: string) => void }) {
  return (
    <DemoSection>
      <h3 className="font-semibold text-sm" style={{ color: C.navy }}>Nasi lekarze</h3>
      {doctors.map((d, i) => (
        <div key={i} className="p-4 rounded-xl border" style={{ borderColor: C.lightBlue, background: C.white }}>
          <div className="flex gap-3">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold" style={{ background: C.blue }}>{d.avatar}</div>
            <div className="flex-1">
              <h4 className="font-bold text-sm" style={{ color: C.navy }}>{d.name}</h4>
              <p className="text-[10px]" style={{ color: C.gray }}>{d.spec}</p>
              <div className="flex items-center gap-2 mt-1">
                <Star className="w-3 h-3" style={{ fill: "#FBBF24", color: "#FBBF24" }} />
                <span className="text-[10px]">{d.rating} ({d.reviews})</span>
              </div>
              <p className="text-[10px] mt-0.5 font-medium" style={{ color: C.green }}>Najbliższy: {d.nextFree}</p>
            </div>
          </div>
          <motion.button whileHover={{ scale: 1.02 }} onClick={() => onNav("booking")}
            className="w-full mt-3 py-2.5 rounded-lg text-white text-xs font-semibold" style={{ background: C.blue }}>Umów wizytę</motion.button>
        </div>
      ))}
    </DemoSection>
  );
}
