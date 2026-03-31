import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PreviewShell, DemoFooterCTA, DemoBenefits } from "./PreviewShell";
import { Calendar, Clock, ChevronLeft, ChevronRight, User, Scissors, Star, CheckCircle2, Bell } from "lucide-react";

const C = { bg: "#28262E", card: "#312E38", input: "#232129", orange: "#FF9000", white: "#F4EDE8", gray: "#999591", text: "#666360", light: "#3E3B47" };

const barbers = [
  { name: "Tomasz Wiśniewski", avatar: "TW", specialty: "Classic & Fade", rating: 4.9, cuts: 1847 },
  { name: "Krzysztof Nowak", avatar: "KN", specialty: "Beard Master", rating: 4.8, cuts: 1523 },
  { name: "Dawid Kowalski", avatar: "DK", specialty: "Modern & Color", rating: 4.7, cuts: 987 },
];

const servicesList = [
  { name: "Strzyżenie klasyczne", price: 60, time: "30 min", icon: "✂️" },
  { name: "Strzyżenie + broda", price: 90, time: "45 min", icon: "🧔" },
  { name: "Fade / Skin fade", price: 70, time: "40 min", icon: "💈" },
  { name: "Modelowanie brody", price: 40, time: "20 min", icon: "🪒" },
  { name: "Golenie brzytwą", price: 50, time: "30 min", icon: "🔪" },
  { name: "Strzyżenie dziecięce", price: 40, time: "20 min", icon: "👦" },
];

const monthDays = Array.from({ length: 31 }, (_, i) => i + 1);
const dayNames = ["Pn", "Wt", "Śr", "Cz", "Pt", "So", "Nd"];
const busyDays = [2, 5, 6, 8, 10, 12, 13, 15, 16, 19, 20, 22, 25, 26, 27, 29];

const appointments = [
  { client: "Marcin Z.", service: "Fade", time: "09:00", barber: "TW", status: "done" },
  { client: "Paweł K.", service: "Strzyżenie + broda", time: "10:00", barber: "TW", status: "done" },
  { client: "Jakub M.", service: "Modelowanie brody", time: "11:00", barber: "KN", status: "current" },
  { client: "Adam S.", service: "Strzyżenie klasyczne", time: "13:00", barber: "DK", status: "upcoming" },
  { client: "Robert W.", service: "Golenie brzytwą", time: "14:00", barber: "KN", status: "upcoming" },
];

const timeSlots = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"];

export function BarberDemo({ name }: { name: string; features: string[] }) {
  const [page, setPage] = useState("dashboard");

  return (
    <PreviewShell title={name}>
      <div style={{ background: C.bg, minHeight: 560 }}>
        <div className="flex items-center justify-between px-5 py-3" style={{ background: C.card, borderBottom: `1px solid ${C.light}` }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: C.orange, color: C.bg }}>GB</div>
            <div>
              <h1 className="font-bold text-sm" style={{ color: C.orange }}>GoBarber</h1>
              <p className="text-[9px]" style={{ color: C.gray }}>Barbershop Premium</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Bell className="w-4 h-4" style={{ color: C.gray }} />
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full" style={{ background: C.orange }} />
            </div>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold border-2" style={{ borderColor: C.orange, color: C.orange }}>TW</div>
          </div>
        </div>

        <div className="flex gap-1 px-4 py-2 overflow-x-auto" style={{ background: C.bg }}>
          {[
            { id: "dashboard", label: "Panel", icon: <Calendar className="w-3.5 h-3.5" /> },
            { id: "schedule", label: "Grafik", icon: <Clock className="w-3.5 h-3.5" /> },
            { id: "booking", label: "Rezerwacja", icon: <Scissors className="w-3.5 h-3.5" /> },
            { id: "team", label: "Barberzy", icon: <User className="w-3.5 h-3.5" /> },
          ].map(t => (
            <button key={t.id} onClick={() => setPage(t.id)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-all"
              style={page === t.id ? { background: C.orange, color: C.bg } : { background: C.card, color: C.gray }}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={page} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            {page === "dashboard" && <DashboardPage />}
            {page === "schedule" && <SchedulePage />}
            {page === "booking" && <BookingPage />}
            {page === "team" && <TeamPage />}
          </motion.div>
        </AnimatePresence>
      </div>
      <DemoBenefits accentColor={C.orange} bgColor={C.card} textColor={C.white} benefits={[
        { icon: "📱", title: "Rezerwacja online", desc: "Klient umawia się bez dzwonienia" },
        { icon: "📊", title: "Panel barbera", desc: "Pełna kontrola grafiku i klientów" },
        { icon: "🔄", title: "Automatyzacja", desc: "Przypomnienia SMS, marketing" },
        { icon: "💰", title: "Więcej klientów", desc: "Profil online + Google Maps" },
      ]} />
      <DemoFooterCTA accentColor={C.orange} bgColor={C.input} />
    </PreviewShell>
  );
}

function DashboardPage() {
  return (
    <div className="px-4 py-3 space-y-3">
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Dziś wizyt", value: "8", sub: "+2 vs wczoraj" },
          { label: "Przychód", value: "1 280 zł", sub: "+15% tyg." },
          { label: "Ocena", value: "4.8", sub: "126 opinii" },
        ].map((s, i) => (
          <div key={i} className="p-2.5 rounded-xl text-center" style={{ background: C.card }}>
            <span className="font-bold text-sm block" style={{ color: C.orange }}>{s.value}</span>
            <span className="text-[9px] block" style={{ color: C.white }}>{s.label}</span>
            <span className="text-[8px]" style={{ color: C.gray }}>{s.sub}</span>
          </div>
        ))}
      </div>

      <div className="rounded-xl overflow-hidden" style={{ background: C.card }}>
        <div className="px-3 py-2 flex items-center justify-between" style={{ borderBottom: `1px solid ${C.light}` }}>
          <span className="text-xs font-bold" style={{ color: C.white }}>Marzec 2026</span>
          <div className="flex gap-1">
            <button className="w-6 h-6 rounded flex items-center justify-center" style={{ background: C.light }}><ChevronLeft className="w-3 h-3" style={{ color: C.gray }} /></button>
            <button className="w-6 h-6 rounded flex items-center justify-center" style={{ background: C.light }}><ChevronRight className="w-3 h-3" style={{ color: C.gray }} /></button>
          </div>
        </div>
        <div className="p-2">
          <div className="grid grid-cols-7 gap-1 mb-1">
            {dayNames.map(d => <span key={d} className="text-[8px] text-center font-bold" style={{ color: C.gray }}>{d}</span>)}
          </div>
          <div className="grid grid-cols-7 gap-1">
            <div /><div />
            {monthDays.map(d => {
              const isBusy = busyDays.includes(d);
              const isToday = d === 22;
              return (
                <div key={d} className="aspect-square rounded-md flex items-center justify-center text-[10px] font-semibold relative"
                  style={{
                    background: isToday ? C.orange : isBusy ? C.orange + "30" : C.light,
                    color: isToday ? C.bg : isBusy ? C.orange : C.gray
                  }}>
                  {d}
                  {isBusy && !isToday && <div className="absolute bottom-0.5 w-1 h-1 rounded-full" style={{ background: C.orange }} />}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="rounded-xl" style={{ background: C.card }}>
        <div className="px-3 py-2" style={{ borderBottom: `1px solid ${C.light}` }}>
          <span className="text-xs font-bold" style={{ color: C.white }}>Dzisiejsze wizyty</span>
        </div>
        {appointments.map((a, i) => (
          <div key={i} className="flex items-center gap-3 px-3 py-2.5" style={{ borderBottom: i < appointments.length - 1 ? `1px solid ${C.light}` : "none" }}>
            <span className="text-[10px] font-mono w-10" style={{ color: a.status === "current" ? C.orange : C.gray }}>{a.time}</span>
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: a.status === "done" ? "#22C55E" : a.status === "current" ? C.orange : C.gray + "50" }} />
            <div className="flex-1">
              <span className="text-[11px] font-semibold" style={{ color: C.white }}>{a.client}</span>
              <span className="text-[9px] block" style={{ color: C.gray }}>{a.service} • {a.barber}</span>
            </div>
            <span className="text-[9px] px-2 py-0.5 rounded-full font-semibold" style={
              a.status === "done" ? { background: "#22C55E20", color: "#22C55E" }
              : a.status === "current" ? { background: C.orange + "20", color: C.orange }
              : { background: C.light, color: C.gray }
            }>{a.status === "done" ? "Zakończona" : a.status === "current" ? "W trakcie" : "Oczekuje"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SchedulePage() {
  return (
    <div className="px-4 py-3 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold" style={{ color: C.white }}>Grafik — Pon, 22 mar 2026</span>
      </div>
      <div className="grid gap-1" style={{ gridTemplateColumns: "40px repeat(3, 1fr)" }}>
        <div className="text-[8px] font-bold p-1" style={{ color: C.gray }} />
        {barbers.map(b => (
          <div key={b.avatar} className="text-[9px] font-bold text-center p-1.5 rounded-t-lg" style={{ color: C.orange, background: C.card }}>{b.name.split(" ")[0]}</div>
        ))}
        {timeSlots.map(t => (
          <div key={t} className="contents">
            <div className="text-[9px] font-mono p-1 flex items-center" style={{ color: C.gray }}>{t}</div>
            {barbers.map(b => {
              const appt = appointments.find(a => a.time === t && a.barber === b.avatar);
              return (
                <div key={b.avatar} className="p-1 min-h-[24px] rounded-sm mx-0.5" style={{ background: appt ? C.orange + "20" : C.card, border: `1px solid ${appt ? C.orange + "40" : C.light}` }}>
                  {appt && (
                    <div className="text-[8px]">
                      <span className="font-bold block" style={{ color: C.orange }}>{appt.client}</span>
                      <span style={{ color: C.gray }}>{appt.service}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function BookingPage() {
  const [step, setStep] = useState(0);
  const [selBarber, setSelBarber] = useState(-1);
  const [selService, setSelService] = useState(-1);

  return (
    <div className="px-4 py-3 space-y-3">
      <div className="flex items-center gap-2">
        {[0, 1, 2, 3].map(s => (
          <div key={s} className="flex items-center gap-1">
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold"
              style={s <= step ? { background: C.orange, color: C.bg } : { background: C.light, color: C.gray }}>{s + 1}</div>
            {s < 3 && <div className="w-6 h-0.5" style={{ background: s < step ? C.orange : C.light }} />}
          </div>
        ))}
      </div>

      {step === 0 && (
        <div className="space-y-2">
          <span className="text-xs font-bold" style={{ color: C.white }}>Wybierz barbera</span>
          {barbers.map((b, i) => (
            <motion.button key={i} whileHover={{ scale: 1.01 }} onClick={() => { setSelBarber(i); setStep(1); }}
              className="w-full flex items-center gap-3 p-3 rounded-xl text-left" style={{ background: C.card, border: `1px solid ${C.light}` }}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: C.orange + "20", color: C.orange }}>{b.avatar}</div>
              <div className="flex-1">
                <span className="text-xs font-bold block" style={{ color: C.white }}>{b.name}</span>
                <span className="text-[10px]" style={{ color: C.gray }}>{b.specialty}</span>
                <div className="flex items-center gap-2 mt-0.5">
                  <Star className="w-3 h-3" style={{ fill: C.orange, color: C.orange }} />
                  <span className="text-[10px]" style={{ color: C.orange }}>{b.rating}</span>
                  <span className="text-[9px]" style={{ color: C.gray }}>({b.cuts} strzyżeń)</span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      )}

      {step === 1 && (
        <div className="space-y-2">
          <span className="text-xs font-bold" style={{ color: C.white }}>Wybierz usługę</span>
          {servicesList.map((s, i) => (
            <button key={i} onClick={() => { setSelService(i); setStep(2); }}
              className="w-full flex items-center gap-3 p-3 rounded-xl text-left" style={{ background: C.card, border: `1px solid ${C.light}` }}>
              <span className="text-xl">{s.icon}</span>
              <div className="flex-1">
                <span className="text-xs font-semibold" style={{ color: C.white }}>{s.name}</span>
                <span className="text-[10px] block" style={{ color: C.gray }}>{s.time}</span>
              </div>
              <span className="font-bold text-sm" style={{ color: C.orange }}>{s.price} zł</span>
            </button>
          ))}
          <button onClick={() => setStep(0)} className="text-[10px] font-semibold" style={{ color: C.orange }}>← Zmień barbera</button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-2">
          <span className="text-xs font-bold" style={{ color: C.white }}>Wybierz termin — 22 mar</span>
          <div className="grid grid-cols-4 gap-1.5">
            {["09:00", "10:30", "11:00", "13:00", "14:30", "15:00", "16:00", "17:00"].map((s, i) => {
              const taken = i === 0 || i === 3;
              return (
                <button key={s} onClick={() => !taken && setStep(3)} disabled={taken}
                  className={`py-2.5 rounded-lg text-[11px] font-semibold ${taken ? "line-through" : ""}`}
                  style={taken ? { background: C.light, color: C.text } : { background: C.card, color: C.white, border: `1px solid ${C.orange}40` }}>{s}</button>
              );
            })}
          </div>
          <button onClick={() => setStep(1)} className="text-[10px] font-semibold" style={{ color: C.orange }}>← Zmień usługę</button>
        </div>
      )}

      {step === 3 && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6 space-y-3">
          <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center" style={{ background: C.orange + "20" }}>
            <CheckCircle2 className="w-8 h-8" style={{ color: C.orange }} />
          </div>
          <h3 className="font-bold text-base" style={{ color: C.white }}>Zarezerwowano!</h3>
          <div className="text-xs space-y-1" style={{ color: C.gray }}>
            <p>{barbers[selBarber]?.name}</p>
            <p>{servicesList[selService]?.name} • {servicesList[selService]?.price} zł</p>
            <p>22 mar 2026, 10:30</p>
          </div>
          <p className="text-[10px] font-mono font-bold" style={{ color: C.orange }}>GB-{Math.floor(Math.random() * 9000 + 1000)}</p>
        </motion.div>
      )}
    </div>
  );
}

function TeamPage() {
  return (
    <div className="px-4 py-3 space-y-3">
      <span className="text-xs font-bold" style={{ color: C.white }}>Nasz zespół</span>
      {barbers.map((b, i) => (
        <div key={i} className="p-4 rounded-xl" style={{ background: C.card }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold" style={{ background: `linear-gradient(135deg, ${C.orange}, ${C.orange}80)`, color: C.bg }}>{b.avatar}</div>
            <div>
              <span className="text-sm font-bold block" style={{ color: C.white }}>{b.name}</span>
              <span className="text-[10px]" style={{ color: C.orange }}>{b.specialty}</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="p-2 rounded-lg text-center" style={{ background: C.light }}>
              <Star className="w-4 h-4 mx-auto mb-0.5" style={{ color: C.orange }} />
              <span className="font-bold text-sm block" style={{ color: C.white }}>{b.rating}</span>
              <span className="text-[8px]" style={{ color: C.gray }}>ocena</span>
            </div>
            <div className="p-2 rounded-lg text-center" style={{ background: C.light }}>
              <Scissors className="w-4 h-4 mx-auto mb-0.5" style={{ color: C.orange }} />
              <span className="font-bold text-sm block" style={{ color: C.white }}>{b.cuts}</span>
              <span className="text-[8px]" style={{ color: C.gray }}>strzyżeń</span>
            </div>
            <div className="p-2 rounded-lg text-center" style={{ background: C.light }}>
              <Calendar className="w-4 h-4 mx-auto mb-0.5" style={{ color: C.orange }} />
              <span className="font-bold text-sm block" style={{ color: C.white }}>5</span>
              <span className="text-[8px]" style={{ color: C.gray }}>dziś</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
