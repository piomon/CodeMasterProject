import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PreviewShell, DemoNav, DemoSection, DemoFooterCTA, DemoBenefits } from "./PreviewShell";
import { Scissors, Calendar, Clock, Star, User, MapPin, CheckCircle2, Award, BarChart3, ChevronRight } from "lucide-react";

const C = { black: "#1A1A1A", graphite: "#2D2D2D", brown: "#5C4033", copper: "#B87333", burgundy: "#800020", ivory: "#F5F0EB", gold: "#C9A96E" };

const barbers = [
  { name: "Jakub Mazur", role: "Fade & Pompadour", rating: 5.0, reviews: 312, avatar: "JM", nextFree: "Dziś 15:00", exp: "8 lat" },
  { name: "Tomek Nowicki", role: "Beard Sculpting", rating: 4.9, reviews: 278, avatar: "TN", nextFree: "Dziś 16:30", exp: "6 lat" },
  { name: "Kris Wójcik", role: "Classic Cuts", rating: 4.8, reviews: 189, avatar: "KW", nextFree: "Jutro 10:00", exp: "5 lat" },
  { name: "Dawid Król", role: "Skin Fade Expert", rating: 4.9, reviews: 245, avatar: "DK", nextFree: "Śr 11:00", exp: "7 lat" },
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

const hours = ["09:00","09:30","10:00","10:30","11:00","11:30","12:00","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00"];

function BarberPole() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    let offset = 0;
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      for (let x = -60 + (offset % 60); x < c.width + 60; x += 60) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x, 0); ctx.lineTo(x + 30, 0); ctx.lineTo(x + 30 - c.height * 0.5, c.height); ctx.lineTo(x - c.height * 0.5, c.height);
        ctx.closePath();
        ctx.fillStyle = C.copper + "12";
        ctx.fill();
        ctx.restore();
      }
      offset += 0.3;
      requestAnimationFrame(draw);
    };
    draw();
  }, []);
  return <canvas ref={ref} width={600} height={250} className="absolute inset-0 w-full h-full" />;
}

export function BarberDemo({ name }: { name: string; features: string[] }) {
  const [page, setPage] = useState("home");
  const tabs = [
    { id: "home", label: "Start", icon: <Scissors className="w-3 h-3" /> },
    { id: "team", label: "Barberzy", icon: <User className="w-3 h-3" /> },
    { id: "services", label: "Usługi", icon: <Award className="w-3 h-3" /> },
    { id: "calendar", label: "Kalendarz", icon: <Calendar className="w-3 h-3" /> },
    { id: "booking", label: "Rezerwacja", icon: <CheckCircle2 className="w-3 h-3" /> },
    { id: "panel", label: "Panel", icon: <BarChart3 className="w-3 h-3" /> },
  ];

  return (
    <PreviewShell title={name}>
      <DemoNav tabs={tabs} activeTab={page} onTabChange={setPage} logo="GENTLEMAN'S" />
      <AnimatePresence mode="wait">
        <motion.div key={page} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
          {page === "home" && <HomePage onNav={setPage} />}
          {page === "team" && <TeamPage onNav={setPage} />}
          {page === "services" && <ServicesPage onNav={setPage} />}
          {page === "calendar" && <CalendarPage />}
          {page === "booking" && <BookingPage />}
          {page === "panel" && <PanelPage />}
        </motion.div>
      </AnimatePresence>
    </PreviewShell>
  );
}

function HomePage({ onNav }: { onNav: (p: string) => void }) {
  return (
    <div>
      <div className="relative overflow-hidden" style={{ background: `linear-gradient(180deg, ${C.black}, ${C.graphite})` }}>
        <BarberPole />
        <div className="relative p-10 text-center">
          <div className="flex justify-center gap-1 mb-3">
            {[C.copper, C.ivory, C.burgundy].map((c, i) => <div key={i} className="w-1.5 h-10 rounded-full" style={{ background: c }} />)}
          </div>
          <h1 className="font-display font-bold text-4xl tracking-wider" style={{ color: C.ivory }}>GENTLEMAN'S</h1>
          <p className="text-[10px] tracking-[0.3em] uppercase mt-1" style={{ color: C.copper }}>BARBER SHOP · EST. 2020</p>
          <p className="text-xs mt-3 max-w-[260px] mx-auto leading-relaxed" style={{ color: C.ivory + "80" }}>Klasyczne rzemiosło barbierskie w nowoczesnym wydaniu. Precyzja, styl i perfekcja w każdym cięciu.</p>
          <div className="flex gap-3 justify-center mt-6">
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => onNav("calendar")}
              className="px-7 py-3.5 rounded-lg font-bold text-sm inline-flex items-center gap-2 shadow-lg" style={{ background: C.copper, color: C.black }}>
              <Calendar className="w-4 h-4" /> Zarezerwuj
            </motion.button>
            <button onClick={() => onNav("services")} className="px-7 py-3.5 rounded-lg font-semibold text-sm border" style={{ borderColor: C.copper + "40", color: C.copper }}>Cennik</button>
          </div>
        </div>
      </div>
      <DemoSection>
        <div className="grid grid-cols-4 gap-2">
          {[
            { icon: "✂️", label: "Precyzja", desc: "Master fade" },
            { icon: "🧴", label: "Premium", desc: "Kosmetyki" },
            { icon: "☕", label: "Whisky Bar", desc: "Gratis" },
            { icon: "📱", label: "Online", desc: "Rezerwacja" },
          ].map((f, i) => (
            <div key={i} className="p-3 rounded-xl text-center" style={{ background: C.graphite }}>
              <span className="text-lg block">{f.icon}</span>
              <span className="text-[8px] font-bold block mt-1" style={{ color: C.ivory }}>{f.label}</span>
              <span className="text-[7px]" style={{ color: C.ivory + "50" }}>{f.desc}</span>
            </div>
          ))}
        </div>
        <h3 className="font-bold text-sm tracking-wider uppercase mt-4" style={{ color: C.copper }}>Nasi Master Barberzy</h3>
        <div className="grid grid-cols-2 gap-3">
          {barbers.slice(0, 2).map((b, i) => (
            <motion.div key={i} whileHover={{ y: -3 }} onClick={() => onNav("team")}
              className="p-4 rounded-xl border text-center cursor-pointer" style={{ borderColor: C.graphite, background: C.black }}>
              <div className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center font-bold text-sm border-2" style={{ borderColor: C.copper, color: C.copper, background: C.graphite }}>{b.avatar}</div>
              <h4 className="font-bold text-xs" style={{ color: C.ivory }}>{b.name}</h4>
              <p className="text-[10px]" style={{ color: C.copper }}>{b.role}</p>
              <div className="flex items-center justify-center gap-0.5 mt-1">
                <Star className="w-3 h-3" style={{ fill: C.gold, color: C.gold }} />
                <span className="text-[10px]" style={{ color: C.ivory }}>{b.rating}</span>
              </div>
            </motion.div>
          ))}
        </div>
        <h3 className="font-bold text-sm tracking-wider uppercase mt-4" style={{ color: C.copper }}>Popularne usługi</h3>
        {svc.slice(0, 3).map((s, i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-xl border cursor-pointer" style={{ borderColor: C.graphite, background: C.black }} onClick={() => onNav("services")}>
            <span className="text-lg">{s.icon}</span>
            <div className="flex-1">
              <span className="text-sm font-semibold" style={{ color: C.ivory }}>{s.name}</span>
              <span className="text-[10px] ml-2" style={{ color: C.ivory + "50" }}>{s.time}</span>
            </div>
            <span className="font-bold text-sm" style={{ color: C.copper }}>{s.price} zł</span>
          </div>
        ))}
        <div className="p-4 rounded-2xl mt-3" style={{ background: C.black, border: `1px solid ${C.copper}25` }}>
          <p className="text-[10px] tracking-[0.2em] uppercase text-center" style={{ color: C.copper }}>Opinie klientów</p>
          <p className="text-xs mt-2 text-center italic" style={{ color: C.ivory + "90" }}>"Najlepszy barber shop w Warszawie. Jakub jest artystą — każdy fade to perfekcja."</p>
          <p className="text-[10px] text-center mt-1" style={{ color: C.gold }}>— Michał W. ★★★★★</p>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-3">
          {[{ v: "5,000+", l: "Klientów" },{ v: "4.9", l: "Ocena Google" },{ v: "4", l: "Lata na rynku" }].map((s, i) => (
            <div key={i} className="p-3 rounded-xl text-center" style={{ background: C.graphite }}>
              <span className="font-bold text-sm block" style={{ color: C.copper }}>{s.v}</span>
              <span className="text-[9px]" style={{ color: C.ivory + "60" }}>{s.l}</span>
            </div>
          ))}
        </div>
        <div className="p-3 rounded-xl mt-2 flex items-center gap-2" style={{ background: C.burgundy + "15", border: `1px solid ${C.burgundy}30` }}>
          <Award className="w-5 h-5" style={{ color: C.copper }} />
          <div><span className="text-xs font-bold" style={{ color: C.ivory }}>Karta Stałego Klienta</span><p className="text-[10px]" style={{ color: C.ivory + "60" }}>Co 10. wizyta gratis</p></div>
        </div>
      </DemoSection>
      <DemoBenefits accentColor={C.copper} bgColor={C.black} textColor={C.ivory} benefits={[
        { icon: "⏰", title: "Zero chaosu", desc: "Uporządkowany grafik barberów" },
        { icon: "📱", title: "Rezerwacje 24/7", desc: "Klient umawia się bez dzwonienia" },
        { icon: "💈", title: "Stali klienci", desc: "Profile i historia wizyt" },
        { icon: "📊", title: "Pełne fotele", desc: "Optymalizacja obłożenia" },
      ]} />
      <DemoFooterCTA accentColor={C.copper} bgColor={C.black} />
    </div>
  );
}

function TeamPage({ onNav }: { onNav: (p: string) => void }) {
  return (
    <DemoSection>
      <h3 className="font-bold text-sm tracking-wider uppercase" style={{ color: C.copper }}>Nasz zespół</h3>
      {barbers.map((b, i) => (
        <motion.div key={i} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
          className="p-4 rounded-xl border" style={{ borderColor: C.graphite, background: C.black }}>
          <div className="flex gap-4">
            <div className="w-16 h-16 rounded-xl flex items-center justify-center text-lg font-bold border-2" style={{ borderColor: C.copper, color: C.copper, background: C.graphite }}>{b.avatar}</div>
            <div className="flex-1">
              <h4 className="font-bold text-sm" style={{ color: C.ivory }}>{b.name}</h4>
              <p className="text-[10px]" style={{ color: C.copper }}>{b.role} • {b.exp}</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex">{[1,2,3,4,5].map(s => <Star key={s} className="w-2.5 h-2.5" style={{ fill: C.gold, color: C.gold }} />)}</div>
                <span className="text-[10px]" style={{ color: C.ivory + "60" }}>{b.rating} ({b.reviews})</span>
              </div>
              <p className="text-[10px] mt-1 font-medium" style={{ color: C.copper }}>Najbliższy wolny: {b.nextFree}</p>
            </div>
          </div>
          <motion.button whileHover={{ scale: 1.02 }} onClick={() => onNav("calendar")}
            className="w-full mt-3 py-2.5 rounded-lg font-bold text-xs tracking-wide border" style={{ borderColor: C.copper, color: C.copper }}>ZAREZERWUJ</motion.button>
        </motion.div>
      ))}
    </DemoSection>
  );
}

function ServicesPage({ onNav }: { onNav: (p: string) => void }) {
  return (
    <DemoSection>
      <h3 className="font-bold text-sm tracking-wider uppercase" style={{ color: C.copper }}>Cennik usług</h3>
      <div className="space-y-2">
        {svc.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
            onClick={() => onNav("calendar")}
            className="flex items-center gap-4 p-4 rounded-xl border cursor-pointer group" style={{ borderColor: C.graphite, background: C.black }}>
            <span className="text-xl">{s.icon}</span>
            <div className="flex-1">
              <h4 className="font-semibold text-sm" style={{ color: C.ivory }}>{s.name}</h4>
              <span className="text-xs flex items-center gap-1" style={{ color: C.ivory + "50" }}><Clock className="w-3 h-3" />{s.time}</span>
            </div>
            <span className="font-bold text-lg" style={{ color: C.copper }}>{s.price}<span className="text-xs" style={{ color: C.ivory + "50" }}> zł</span></span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" style={{ color: C.copper }} />
          </motion.div>
        ))}
      </div>
    </DemoSection>
  );
}

function CalendarPage() {
  const [selBarber, setSelBarber] = useState(0);
  const [selDay, setSelDay] = useState(0);
  const [selSlot, setSelSlot] = useState(-1);
  const dayNames = ["Pon 22", "Wt 23", "Śr 24", "Czw 25", "Pt 26", "Sob 27"];

  return (
    <DemoSection>
      <h3 className="font-bold text-sm tracking-wider uppercase mb-1" style={{ color: C.copper }}>Wybierz barbera</h3>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {barbers.map((b, i) => (
          <button key={i} onClick={() => setSelBarber(i)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl border whitespace-nowrap"
            style={selBarber === i ? { borderColor: C.copper, background: C.copper + "15" } : { borderColor: C.graphite, background: C.black }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border" style={{ borderColor: C.copper, color: C.copper, background: C.graphite }}>{b.avatar}</div>
            <span className="text-xs font-medium" style={{ color: selBarber === i ? C.copper : C.ivory + "70" }}>{b.name.split(" ")[0]}</span>
          </button>
        ))}
      </div>
      <div className="flex gap-2 mt-3 overflow-x-auto">
        {dayNames.map((d, i) => (
          <button key={d} onClick={() => setSelDay(i)} className="flex-1 py-2.5 rounded-lg text-xs font-bold tracking-wide min-w-[55px]"
            style={selDay === i ? { background: C.copper, color: C.black } : { background: C.graphite, color: C.ivory + "70" }}>{d}</button>
        ))}
      </div>
      <h4 className="font-bold text-xs tracking-wider uppercase mt-4 mb-2" style={{ color: C.ivory }}>Dostępne terminy — {barbers[selBarber].name}</h4>
      <div className="space-y-1">
        {hours.map((h, i) => {
          const busy = ((i + selBarber * 3 + selDay * 2) % 5) === 0;
          const sel = selSlot === i;
          return (
            <motion.div key={h} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }}
              onClick={() => !busy && setSelSlot(i)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg ${busy ? "cursor-not-allowed" : "cursor-pointer"}`}
              style={sel ? { background: C.copper, color: C.black } : busy ? { background: C.graphite + "40" } : { background: C.graphite }}>
              <Clock className="w-3.5 h-3.5" style={{ color: sel ? C.black : busy ? C.ivory + "20" : C.copper }} />
              <span className={`text-sm font-bold ${busy ? "line-through" : ""}`} style={{ color: sel ? C.black : busy ? C.ivory + "20" : C.ivory }}>{h}</span>
              <div className="flex-1" />
              {busy && <span className="text-[10px]" style={{ color: C.ivory + "30" }}>Zajęty</span>}
              {!busy && !sel && <span className="text-[10px]" style={{ color: C.copper }}>Wolny</span>}
              {sel && <CheckCircle2 className="w-4 h-4" style={{ color: C.black }} />}
            </motion.div>
          );
        })}
      </div>
    </DemoSection>
  );
}

function BookingPage() {
  const [confirmed, setConfirmed] = useState(false);
  if (confirmed) {
    return (
      <DemoSection>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
          <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: C.copper + "20" }}>
            <CheckCircle2 className="w-8 h-8" style={{ color: C.copper }} />
          </div>
          <h3 className="font-bold text-lg tracking-wide" style={{ color: C.ivory }}>REZERWACJA POTWIERDZONA</h3>
          <p className="text-sm mt-2" style={{ color: C.ivory + "70" }}>Fade / Skin Fade • Jakub Mazur</p>
          <p className="text-sm" style={{ color: C.ivory + "70" }}>Czwartek 25 mar • 15:00</p>
          <div className="mt-6 p-4 rounded-xl border text-left max-w-xs mx-auto" style={{ borderColor: C.graphite, background: C.black }}>
            <p className="text-[10px]" style={{ color: C.ivory + "50" }}>Nr rezerwacji: <span className="font-bold" style={{ color: C.copper }}>GNT-{Math.floor(Math.random()*9000+1000)}</span></p>
          </div>
        </motion.div>
      </DemoSection>
    );
  }
  return (
    <DemoSection>
      <h3 className="font-bold text-sm tracking-wider uppercase" style={{ color: C.copper }}>Podsumowanie</h3>
      <div className="p-4 rounded-xl border space-y-3" style={{ borderColor: C.graphite, background: C.black }}>
        <div className="flex justify-between text-sm"><span style={{ color: C.ivory+"60" }}>Usługa</span><span className="font-bold" style={{ color: C.ivory }}>Fade / Skin Fade</span></div>
        <div className="flex justify-between text-sm"><span style={{ color: C.ivory+"60" }}>Barber</span><span className="font-bold" style={{ color: C.ivory }}>Jakub Mazur</span></div>
        <div className="flex justify-between text-sm"><span style={{ color: C.ivory+"60" }}>Termin</span><span className="font-bold" style={{ color: C.ivory }}>Czw 25, 15:00</span></div>
        <div className="flex justify-between text-sm"><span style={{ color: C.ivory+"60" }}>Czas</span><span style={{ color: C.ivory }}>45 min</span></div>
        <div className="border-t pt-3" style={{ borderColor: C.graphite }}>
          <div className="flex justify-between"><span className="font-bold" style={{ color: C.ivory }}>Do zapłaty</span><span className="font-bold text-xl" style={{ color: C.copper }}>100 zł</span></div>
        </div>
      </div>
      <input placeholder="Imię i nazwisko" className="w-full px-4 py-3 rounded-lg border text-sm mt-3" style={{ borderColor: C.graphite, background: C.black, color: C.ivory }} />
      <input placeholder="Telefon" className="w-full px-4 py-3 rounded-lg border text-sm" style={{ borderColor: C.graphite, background: C.black, color: C.ivory }} />
      <div className="p-3 rounded-lg border flex items-center gap-2" style={{ borderColor: C.copper+"30", background: C.burgundy+"10" }}>
        <Award className="w-4 h-4" style={{ color: C.copper }} />
        <span className="text-[10px]" style={{ color: C.ivory+"80" }}>+10 punktów lojalnościowych za tę wizytę</span>
      </div>
      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setConfirmed(true)}
        className="w-full py-3.5 rounded-lg font-bold text-sm tracking-wider" style={{ background: C.copper, color: C.black }}>POTWIERDŹ REZERWACJĘ</motion.button>
    </DemoSection>
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
    <DemoSection>
      <h3 className="font-bold text-sm tracking-wider uppercase" style={{ color: C.copper }}>Panel barbera — dziś</h3>
      <div className="grid grid-cols-4 gap-2 mt-2">
        {[{ l: "Wizyty", v: "8" },{ l: "Zakończ.", v: "3" },{ l: "Przychód", v: "640zł" },{ l: "Ocena", v: "4.9" }].map((s, i) => (
          <div key={i} className="p-3 rounded-lg text-center" style={{ background: C.graphite }}>
            <span className="font-bold text-base block" style={{ color: C.copper }}>{s.v}</span>
            <span className="text-[9px]" style={{ color: C.ivory+"60" }}>{s.l}</span>
          </div>
        ))}
      </div>
      <h4 className="font-bold text-xs tracking-wider uppercase mt-4 mb-2" style={{ color: C.ivory }}>Harmonogram</h4>
      <div className="space-y-1">
        {schedule.map((s, i) => (
          <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-lg" style={{
            background: s.status === "current" ? C.copper+"20" : C.graphite,
            borderLeft: `3px solid ${s.status === "done" ? C.ivory+"30" : s.status === "current" ? C.copper : s.status === "free" ? C.graphite : C.burgundy}`
          }}>
            <span className="text-xs font-mono font-bold w-10" style={{ color: s.status === "current" ? C.copper : C.ivory+"60" }}>{s.time}</span>
            <div className="flex-1">
              <span className="text-xs font-medium" style={{ color: s.status === "free" ? C.ivory+"30" : C.ivory }}>{s.client}</span>
              {s.service !== "—" && <span className="text-[10px] ml-2" style={{ color: C.ivory+"50" }}>{s.service}</span>}
            </div>
            <span className="text-[10px] font-medium" style={{ color: s.status === "done" ? C.ivory+"40" : s.status === "current" ? C.copper : C.ivory+"50" }}>
              {s.status === "done" ? "Zakończona" : s.status === "current" ? "W trakcie" : s.status === "free" ? "Wolny" : "Nadchodząca"}
            </span>
          </div>
        ))}
      </div>
    </DemoSection>
  );
}
