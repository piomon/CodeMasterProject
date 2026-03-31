import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PreviewShell, DemoFooterCTA, DemoBenefits } from "./PreviewShell";
import { Scissors, Calendar, Clock, Star, User, CheckCircle2, Award, BarChart3, ChevronRight, Instagram } from "lucide-react";

const C = { black: "#0A0A0A", charcoal: "#1A1A1A", graphite: "#2D2D2D", copper: "#B87333", burgundy: "#6B1D2A", ivory: "#F5F0EB", gold: "#C9A96E", steel: "#4A4A4A" };

const barbers = [
  { name: "Jakub Mazur", role: "Master Barber — Fade & Pompadour", rating: 5.0, reviews: 312, avatar: "JM", exp: "8 lat", nextFree: "Dziś 15:00" },
  { name: "Tomek Nowicki", role: "Beard Sculptor", rating: 4.9, reviews: 278, avatar: "TN", exp: "6 lat", nextFree: "Dziś 16:30" },
  { name: "Kris Wójcik", role: "Classic Cuts Specialist", rating: 4.8, reviews: 189, avatar: "KW", exp: "5 lat", nextFree: "Jutro 10:00" },
  { name: "Dawid Król", role: "Skin Fade Expert", rating: 4.9, reviews: 245, avatar: "DK", exp: "7 lat", nextFree: "Śr 11:00" },
];

const svc = [
  { name: "Strzyżenie klasyczne", time: "30 min", price: 80, icon: "✂️" },
  { name: "Fade / Skin Fade", time: "45 min", price: 100, icon: "💈" },
  { name: "Strzyżenie + Broda", time: "60 min", price: 130, icon: "🪒" },
  { name: "Modelowanie brody", time: "20 min", price: 50, icon: "🧔" },
  { name: "Golenie brzytwą", time: "30 min", price: 70, icon: "🗡️" },
  { name: "Rytuał Premium", time: "90 min", price: 200, icon: "👑" },
  { name: "Koloryzacja", time: "60 min", price: 120, icon: "🎨" },
  { name: "Keratynowa pielęgnacja", time: "45 min", price: 90, icon: "💎" },
];

const hours = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"];

function BarberPole() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    let offset = 0;
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      for (let x = -60 + (offset % 60); x < c.width + 60; x += 60) {
        ctx.beginPath();
        ctx.moveTo(x, 0); ctx.lineTo(x + 30, 0); ctx.lineTo(x + 30 - c.height * 0.5, c.height); ctx.lineTo(x - c.height * 0.5, c.height);
        ctx.closePath();
        ctx.fillStyle = C.copper + "10";
        ctx.fill();
      }
      offset += 0.3;
      requestAnimationFrame(draw);
    };
    draw();
  }, []);
  return <canvas ref={ref} width={600} height={300} className="absolute inset-0 w-full h-full" />;
}

export function BarberDemo({ name }: { name: string; features: string[] }) {
  const [page, setPage] = useState("home");

  return (
    <PreviewShell title={name}>
      <div style={{ background: C.black, minHeight: 500 }}>
        <AnimatePresence mode="wait">
          <motion.div key={page} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {page === "home" && <HomePage onNav={setPage} />}
            {page === "team" && <TeamPage onNav={setPage} />}
            {page === "services" && <ServicesPage onNav={setPage} />}
            {page === "calendar" && <CalendarPage onNav={setPage} />}
            {page === "booking" && <BookingPage onNav={setPage} />}
            {page === "panel" && <PanelPage />}
          </motion.div>
        </AnimatePresence>

        {page !== "home" && (
          <div className="flex items-center justify-around py-2.5 border-t" style={{ borderColor: C.graphite, background: C.charcoal }}>
            {[
              { id: "home", icon: "🏠", label: "Start" },
              { id: "team", icon: "💈", label: "Barberzy" },
              { id: "services", icon: "✂️", label: "Cennik" },
              { id: "calendar", icon: "📅", label: "Kalendarz" },
              { id: "panel", icon: "📊", label: "Panel" },
            ].map(n => (
              <button key={n.id} onClick={() => setPage(n.id)} className="flex flex-col items-center gap-0.5">
                <span className="text-sm">{n.icon}</span>
                <span className="text-[8px] font-bold tracking-wider uppercase" style={{ color: page === n.id ? C.copper : C.ivory + "40" }}>{n.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
      <DemoBenefits accentColor={C.copper} bgColor={C.black} textColor={C.ivory} benefits={[
        { icon: "⏰", title: "Zero chaosu", desc: "Uporządkowany grafik barberów" },
        { icon: "📱", title: "Rezerwacje 24/7", desc: "Klient umawia się bez dzwonienia" },
        { icon: "💈", title: "Stali klienci", desc: "Profile i historia wizyt" },
        { icon: "📊", title: "Pełne fotele", desc: "Optymalizacja obłożenia" },
      ]} />
      <DemoFooterCTA accentColor={C.copper} bgColor={C.black} />
    </PreviewShell>
  );
}

function HomePage({ onNav }: { onNav: (p: string) => void }) {
  return (
    <div>
      <div className="relative overflow-hidden" style={{ background: C.black }}>
        <BarberPole />
        <div className="relative px-5 pt-6 pb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex gap-0.5">
              {[C.copper, C.ivory, C.burgundy].map((c, i) => <div key={i} className="w-1 h-8 rounded-full" style={{ background: c }} />)}
            </div>
            <div>
              <h1 className="font-display font-bold text-2xl tracking-[0.1em]" style={{ color: C.ivory }}>GENTLEMAN'S</h1>
              <p className="text-[9px] tracking-[0.3em] uppercase" style={{ color: C.copper }}>BARBER SHOP · EST. 2020</p>
            </div>
          </div>
          <p className="text-xs leading-relaxed max-w-[280px]" style={{ color: C.ivory + "70" }}>Klasyczne rzemiosło barbierskie w nowoczesnym wydaniu. <span style={{ color: C.copper }}>Precyzja i styl</span> w każdym cięciu.</p>
          <div className="flex gap-3 mt-5">
            <motion.button whileHover={{ scale: 1.03 }} onClick={() => onNav("calendar")}
              className="px-6 py-3 rounded-lg font-bold text-sm tracking-wider inline-flex items-center gap-2" style={{ background: C.copper, color: C.black }}>
              <Calendar className="w-4 h-4" /> ZAREZERWUJ
            </motion.button>
            <button onClick={() => onNav("services")} className="px-6 py-3 rounded-lg font-bold text-sm tracking-wider" style={{ border: `1px solid ${C.copper}40`, color: C.copper }}>CENNIK</button>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        <div className="flex gap-2">
          {[
            { icon: "✂️", text: "Master Fade" },
            { icon: "🧴", text: "Premium" },
            { icon: "☕", text: "Whisky Bar" },
            { icon: "📱", text: "Online" },
          ].map((f, i) => (
            <div key={i} className="flex-1 py-2.5 rounded-lg text-center" style={{ background: C.graphite }}>
              <span className="text-base block">{f.icon}</span>
              <span className="text-[8px] font-bold tracking-wider uppercase mt-0.5 block" style={{ color: C.ivory + "70" }}>{f.text}</span>
            </div>
          ))}
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold tracking-[0.15em] uppercase" style={{ color: C.copper }}>Master Barberzy</h3>
            <button onClick={() => onNav("team")} className="text-[10px] font-bold" style={{ color: C.copper }}>Więcej →</button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-1">
            {barbers.slice(0, 3).map((b, i) => (
              <motion.div key={i} whileHover={{ y: -3 }} onClick={() => onNav("calendar")}
                className="shrink-0 w-[130px] p-3 rounded-xl cursor-pointer" style={{ background: C.charcoal, border: `1px solid ${C.graphite}` }}>
                <div className="w-14 h-14 rounded-full mx-auto mb-2 flex items-center justify-center font-bold text-sm" style={{ border: `2px solid ${C.copper}`, color: C.copper, background: C.graphite }}>{b.avatar}</div>
                <h4 className="text-xs font-bold text-center" style={{ color: C.ivory }}>{b.name}</h4>
                <p className="text-[9px] text-center mt-0.5" style={{ color: C.copper }}>{b.role.split("—")[0]}</p>
                <div className="flex items-center justify-center gap-0.5 mt-1">
                  <Star className="w-2.5 h-2.5" style={{ fill: C.gold, color: C.gold }} />
                  <span className="text-[10px] font-bold" style={{ color: C.ivory }}>{b.rating}</span>
                </div>
                <p className="text-[9px] text-center mt-1 font-medium" style={{ color: C.copper }}>Wolny: {b.nextFree}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold tracking-[0.15em] uppercase mb-2" style={{ color: C.copper }}>Popularne usługi</h3>
          {svc.slice(0, 3).map((s, i) => (
            <div key={i} onClick={() => onNav("calendar")}
              className="flex items-center gap-3 p-3 mb-1.5 rounded-lg cursor-pointer" style={{ background: C.charcoal }}>
              <span className="text-base">{s.icon}</span>
              <div className="flex-1">
                <span className="text-xs font-bold" style={{ color: C.ivory }}>{s.name}</span>
                <span className="text-[10px] ml-2" style={{ color: C.ivory + "40" }}>{s.time}</span>
              </div>
              <span className="font-bold text-sm" style={{ color: C.copper }}>{s.price} zł</span>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-xl" style={{ background: C.charcoal, borderLeft: `3px solid ${C.copper}` }}>
          <p className="text-xs italic leading-relaxed" style={{ color: C.ivory + "80" }}>"Najlepszy barber shop w Warszawie. Jakub jest artystą — każdy fade to perfekcja."</p>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold" style={{ background: C.copper, color: C.black }}>MW</div>
            <span className="text-[10px] font-bold" style={{ color: C.ivory }}>Michał W.</span>
            <div className="flex gap-0.5 ml-auto">{[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-2 h-2" style={{ fill: C.gold, color: C.gold }} />)}</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[{ v: "5K+", l: "Klientów" }, { v: "4.9", l: "Google" }, { v: "4", l: "Lata" }].map((s, i) => (
            <div key={i} className="p-3 rounded-lg text-center" style={{ background: C.graphite }}>
              <span className="font-bold text-sm block" style={{ color: C.copper }}>{s.v}</span>
              <span className="text-[9px]" style={{ color: C.ivory + "50" }}>{s.l}</span>
            </div>
          ))}
        </div>

        <div className="p-3 rounded-lg flex items-center gap-3" style={{ background: C.burgundy + "20", border: `1px solid ${C.burgundy}40` }}>
          <Award className="w-6 h-6" style={{ color: C.copper }} />
          <div>
            <span className="text-xs font-bold" style={{ color: C.ivory }}>Karta Stałego Klienta</span>
            <p className="text-[10px]" style={{ color: C.ivory + "50" }}>Co 10. wizyta gratis · Zbieraj punkty</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TeamPage({ onNav }: { onNav: (p: string) => void }) {
  return (
    <div className="px-4 py-3 space-y-3">
      <h2 className="text-xs font-bold tracking-[0.15em] uppercase" style={{ color: C.copper }}>Nasz zespół</h2>
      {barbers.map((b, i) => (
        <motion.div key={i} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
          className="p-4 rounded-xl" style={{ background: C.charcoal }}>
          <div className="flex gap-3">
            <div className="w-14 h-14 rounded-full flex items-center justify-center text-sm font-bold" style={{ border: `2px solid ${C.copper}`, color: C.copper, background: C.graphite }}>{b.avatar}</div>
            <div className="flex-1">
              <h4 className="font-bold text-sm" style={{ color: C.ivory }}>{b.name}</h4>
              <p className="text-[10px]" style={{ color: C.copper }}>{b.role} • {b.exp}</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex">{[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-2.5 h-2.5" style={{ fill: C.gold, color: C.gold }} />)}</div>
                <span className="text-[10px]" style={{ color: C.ivory + "50" }}>{b.rating} ({b.reviews})</span>
              </div>
              <p className="text-[10px] mt-1 font-medium" style={{ color: C.copper }}>Wolny: {b.nextFree}</p>
            </div>
          </div>
          <motion.button whileHover={{ scale: 1.02 }} onClick={() => onNav("calendar")}
            className="w-full mt-3 py-2 rounded-lg font-bold text-xs tracking-[0.1em]" style={{ border: `1px solid ${C.copper}`, color: C.copper }}>ZAREZERWUJ</motion.button>
        </motion.div>
      ))}
    </div>
  );
}

function ServicesPage({ onNav }: { onNav: (p: string) => void }) {
  return (
    <div className="px-4 py-3 space-y-2">
      <h2 className="text-xs font-bold tracking-[0.15em] uppercase" style={{ color: C.copper }}>Cennik usług</h2>
      {svc.map((s, i) => (
        <motion.div key={i} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
          onClick={() => onNav("calendar")}
          className="flex items-center gap-3 p-3.5 rounded-lg cursor-pointer group" style={{ background: C.charcoal }}>
          <span className="text-lg">{s.icon}</span>
          <div className="flex-1">
            <h4 className="text-xs font-bold" style={{ color: C.ivory }}>{s.name}</h4>
            <span className="text-[10px] flex items-center gap-1" style={{ color: C.ivory + "40" }}><Clock className="w-3 h-3" />{s.time}</span>
          </div>
          <span className="font-bold text-base" style={{ color: C.copper }}>{s.price}<span className="text-xs" style={{ color: C.ivory + "40" }}> zł</span></span>
        </motion.div>
      ))}
    </div>
  );
}

function CalendarPage({ onNav }: { onNav: (p: string) => void }) {
  const [selBarber, setSelBarber] = useState(0);
  const [selDay, setSelDay] = useState(0);
  const [selSlot, setSelSlot] = useState(-1);
  const dayNames = ["Pon 22", "Wt 23", "Śr 24", "Czw 25", "Pt 26", "Sob 27"];

  return (
    <div className="px-4 py-3 space-y-3">
      <h2 className="text-xs font-bold tracking-[0.15em] uppercase" style={{ color: C.copper }}>Wybierz termin</h2>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {barbers.map((b, i) => (
          <button key={i} onClick={() => setSelBarber(i)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg whitespace-nowrap"
            style={selBarber === i ? { background: C.copper + "20", border: `1px solid ${C.copper}` } : { background: C.charcoal, border: `1px solid ${C.graphite}` }}>
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold" style={{ border: `1px solid ${C.copper}`, color: C.copper, background: C.graphite }}>{b.avatar}</div>
            <span className="text-[10px] font-medium" style={{ color: selBarber === i ? C.copper : C.ivory + "60" }}>{b.name.split(" ")[0]}</span>
          </button>
        ))}
      </div>
      <div className="flex gap-1.5 overflow-x-auto">
        {dayNames.map((d, i) => (
          <button key={d} onClick={() => setSelDay(i)} className="flex-1 py-2 rounded-lg text-xs font-bold tracking-wide min-w-[48px]"
            style={selDay === i ? { background: C.copper, color: C.black } : { background: C.graphite, color: C.ivory + "60" }}>{d}</button>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-1.5">
        {hours.map((h, i) => {
          const busy = ((i + selBarber * 3 + selDay * 2) % 5) === 0;
          const sel = selSlot === i;
          return (
            <motion.button key={h} whileHover={!busy ? { scale: 1.05 } : {}} onClick={() => { if (!busy) { setSelSlot(i); onNav("booking"); } }}
              className={`py-2.5 rounded-lg text-xs font-bold ${busy ? "line-through" : ""}`}
              style={sel ? { background: C.copper, color: C.black } : busy ? { background: C.graphite + "40", color: C.ivory + "20" } : { background: C.graphite, color: C.ivory }}>
              {h}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

function BookingPage({ onNav }: { onNav: (p: string) => void }) {
  const [confirmed, setConfirmed] = useState(false);
  if (confirmed) {
    return (
      <div className="px-4 py-8 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
          <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: C.copper + "20" }}>
            <CheckCircle2 className="w-8 h-8" style={{ color: C.copper }} />
          </div>
        </motion.div>
        <h3 className="font-bold text-base tracking-[0.1em] uppercase" style={{ color: C.ivory }}>Rezerwacja potwierdzona</h3>
        <p className="text-xs mt-2" style={{ color: C.ivory + "60" }}>Fade / Skin Fade • Jakub Mazur</p>
        <p className="text-xs" style={{ color: C.ivory + "60" }}>Czwartek 25 mar • 15:00</p>
        <p className="font-mono font-bold text-sm mt-2" style={{ color: C.copper }}>GNT-{Math.floor(Math.random() * 9000 + 1000)}</p>
        <button onClick={() => { setConfirmed(false); onNav("home"); }} className="mt-5 px-5 py-2 rounded-lg text-xs font-bold tracking-wider" style={{ border: `1px solid ${C.copper}`, color: C.copper }}>WRÓĆ</button>
      </div>
    );
  }
  return (
    <div className="px-4 py-3 space-y-3">
      <h2 className="text-xs font-bold tracking-[0.15em] uppercase" style={{ color: C.copper }}>Podsumowanie</h2>
      <div className="p-4 rounded-xl space-y-2.5" style={{ background: C.charcoal }}>
        <div className="flex justify-between text-sm"><span style={{ color: C.ivory + "50" }}>Usługa</span><span className="font-bold" style={{ color: C.ivory }}>Fade / Skin Fade</span></div>
        <div className="flex justify-between text-sm"><span style={{ color: C.ivory + "50" }}>Barber</span><span className="font-bold" style={{ color: C.ivory }}>Jakub Mazur</span></div>
        <div className="flex justify-between text-sm"><span style={{ color: C.ivory + "50" }}>Termin</span><span className="font-bold" style={{ color: C.ivory }}>Czw 25, 15:00</span></div>
        <div className="flex justify-between text-sm"><span style={{ color: C.ivory + "50" }}>Czas</span><span style={{ color: C.ivory }}>45 min</span></div>
        <div className="border-t pt-2.5" style={{ borderColor: C.graphite }}>
          <div className="flex justify-between"><span className="font-bold" style={{ color: C.ivory }}>Do zapłaty</span><span className="font-bold text-xl" style={{ color: C.copper }}>100 zł</span></div>
        </div>
      </div>
      <input placeholder="Imię i nazwisko" className="w-full px-4 py-3 rounded-lg text-sm" style={{ background: C.charcoal, border: `1px solid ${C.graphite}`, color: C.ivory }} />
      <input placeholder="Telefon" className="w-full px-4 py-3 rounded-lg text-sm" style={{ background: C.charcoal, border: `1px solid ${C.graphite}`, color: C.ivory }} />
      <motion.button whileHover={{ scale: 1.02 }} onClick={() => setConfirmed(true)}
        className="w-full py-3.5 rounded-lg font-bold text-sm tracking-[0.15em]" style={{ background: C.copper, color: C.black }}>POTWIERDŹ REZERWACJĘ</motion.button>
    </div>
  );
}

function PanelPage() {
  const schedule = [
    { time: "09:00", client: "Marek K.", service: "Fade", barber: "Jakub", status: "done" },
    { time: "10:00", client: "Piotr W.", service: "Broda", barber: "Tomek", status: "done" },
    { time: "11:00", client: "Adam S.", service: "Klasyczne", barber: "Kris", status: "current" },
    { time: "12:00", client: "—", service: "—", barber: "—", status: "free" },
    { time: "13:00", client: "Jan N.", service: "Premium", barber: "Dawid", status: "upcoming" },
    { time: "14:00", client: "Łukasz M.", service: "Fade+Broda", barber: "Jakub", status: "upcoming" },
  ];
  return (
    <div className="px-4 py-3 space-y-3">
      <h2 className="text-xs font-bold tracking-[0.15em] uppercase" style={{ color: C.copper }}>Panel barbera — dziś</h2>
      <div className="grid grid-cols-4 gap-2">
        {[{ l: "Wizyty", v: "8" }, { l: "Gotowe", v: "3" }, { l: "Przychód", v: "640zł" }, { l: "Ocena", v: "4.9" }].map((s, i) => (
          <div key={i} className="p-2.5 rounded-lg text-center" style={{ background: C.charcoal }}>
            <span className="font-bold text-sm block" style={{ color: C.copper }}>{s.v}</span>
            <span className="text-[8px] uppercase tracking-wider" style={{ color: C.ivory + "40" }}>{s.l}</span>
          </div>
        ))}
      </div>
      <div className="space-y-1">
        {schedule.map((s, i) => (
          <div key={i} className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg" style={{
            background: s.status === "current" ? C.copper + "15" : C.charcoal,
            borderLeft: `3px solid ${s.status === "done" ? C.ivory + "20" : s.status === "current" ? C.copper : s.status === "free" ? C.graphite : C.burgundy}`
          }}>
            <span className="text-[11px] font-mono font-bold w-10" style={{ color: s.status === "current" ? C.copper : C.ivory + "50" }}>{s.time}</span>
            <div className="flex-1">
              <span className="text-xs font-medium" style={{ color: s.status === "free" ? C.ivory + "20" : C.ivory }}>{s.client}</span>
              {s.service !== "—" && <span className="text-[10px] ml-2" style={{ color: C.ivory + "40" }}>{s.service}</span>}
            </div>
            <span className="text-[9px] font-bold tracking-wider uppercase" style={{ color: s.status === "done" ? C.ivory + "30" : s.status === "current" ? C.copper : s.status === "free" ? C.ivory + "15" : C.ivory + "40" }}>
              {s.status === "done" ? "OK" : s.status === "current" ? "TERAZ" : s.status === "free" ? "WOLNY" : "NAST."}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
