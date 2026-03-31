import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PreviewShell, DemoNav, DemoSection, DemoBenefits, DemoFooterCTA } from "./PreviewShell";
import { Calendar, Clock, MapPin, Users, Ticket, QrCode, Star, ChevronRight, CheckCircle2, Home, Music, Mic2, Zap, CreditCard, Search, Filter } from "lucide-react";

const C = { navy: "#0A0A1A", dark: "#121225", neon: "#00FF88", pink: "#FF006E", violet: "#8B5CF6", blue: "#3B82F6", white: "#F8FAFC", gray: "#6B7280", green: "#10B981", amber: "#F59E0B", light: "#F1F5F9", cyan: "#06B6D4" };

const events = [
  { id: 1, title: "Warsaw Tech Summit 2026", date: "15-16 kwi 2026", time: "09:00 - 18:00", location: "PGE Narodowy, Warszawa", category: "Konferencja", price: 349, image: "🚀", spots: 2400, sold: 1860, featured: true },
  { id: 2, title: "Noc Muzyki Elektronicznej", date: "12 kwi 2026", time: "21:00 - 05:00", location: "Stodoła, Warszawa", category: "Muzyka", price: 89, image: "🎵", spots: 800, sold: 720, featured: false },
  { id: 3, title: "Startup Pitch Night", date: "8 kwi 2026", time: "18:00 - 22:00", location: "Campus Warsaw", category: "Business", price: 0, image: "💡", spots: 150, sold: 142, featured: false },
  { id: 4, title: "Festiwal Streetfood", date: "20-21 kwi 2026", time: "12:00 - 22:00", location: "Bulwary Wiślane", category: "Gastro", price: 29, image: "🍔", spots: 5000, sold: 3200, featured: false },
  { id: 5, title: "AI & Future Conference", date: "25 kwi 2026", time: "10:00 - 17:00", location: "Centrum Kopernik", category: "Konferencja", price: 199, image: "🤖", spots: 600, sold: 480, featured: true },
];

const schedule = [
  { time: "09:00", title: "Rejestracja i poranna kawa", speaker: "", type: "break" },
  { time: "09:30", title: "Otwarcie — Przyszłość technologii w Polsce", speaker: "Piotr Montewka", type: "keynote" },
  { time: "10:30", title: "AI w produkcji — case studies", speaker: "dr Anna Kowalska", type: "talk" },
  { time: "11:30", title: "Przerwa networkingowa", speaker: "", type: "break" },
  { time: "12:00", title: "Cloud-native architecture w 2026", speaker: "Marek Wiśniewski", type: "talk" },
  { time: "13:00", title: "Lunch", speaker: "", type: "break" },
  { time: "14:00", title: "Panel dyskusyjny: Startupy vs Korporacje", speaker: "Panel 4 ekspertów", type: "panel" },
  { time: "15:30", title: "Warsztaty: Budowanie MVP w 3h", speaker: "Tomasz Nowak", type: "workshop" },
  { time: "17:30", title: "Zamknięcie i afterparty", speaker: "", type: "break" },
];

export function EventsDemo({ name }: { name: string; features: string[] }) {
  const [page, setPage] = useState("home");
  const tabs = [
    { id: "home", label: "Start", icon: <Home className="w-3 h-3" /> },
    { id: "events", label: "Wydarzenia", icon: <Calendar className="w-3 h-3" /> },
    { id: "schedule", label: "Program", icon: <Clock className="w-3 h-3" /> },
    { id: "tickets", label: "Bilety", icon: <Ticket className="w-3 h-3" /> },
    { id: "mytickets", label: "Moje bilety", icon: <QrCode className="w-3 h-3" /> },
  ];

  return (
    <PreviewShell title={name}>
      <DemoNav tabs={tabs} activeTab={page} onTabChange={setPage} logo="EventHub" />
      <AnimatePresence mode="wait">
        <motion.div key={page} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
          {page === "home" && <HomePage onNav={setPage} />}
          {page === "events" && <EventsListPage />}
          {page === "schedule" && <SchedulePage />}
          {page === "tickets" && <TicketsPage />}
          {page === "mytickets" && <MyTicketsPage />}
        </motion.div>
      </AnimatePresence>
    </PreviewShell>
  );
}

function HomePage({ onNav }: { onNav: (p: string) => void }) {
  const featured = events.filter(e => e.featured);
  return (
    <div>
      <div className="p-8 pb-10" style={{ background: `linear-gradient(160deg, ${C.navy}, ${C.dark})` }}>
        <p className="text-[10px] tracking-[0.4em] uppercase" style={{ color: C.neon }}>Portal eventowy</p>
        <h1 className="font-display font-bold text-3xl mt-1 text-white">Event<span style={{ color: C.neon }}>Hub</span></h1>
        <p className="text-xs mt-2 text-white/70 max-w-[280px] leading-relaxed">Odkrywaj wydarzenia, kupuj bilety online, śledź harmonogram. Konferencje, koncerty, warsztaty i więcej.</p>
        <div className="flex gap-3 mt-5">
          <motion.button whileHover={{ scale: 1.03 }} onClick={() => onNav("events")}
            className="px-6 py-3 rounded-lg font-bold text-sm shadow-lg text-black" style={{ background: C.neon }}>Odkryj wydarzenia</motion.button>
          <button onClick={() => onNav("mytickets")} className="px-6 py-3 rounded-lg font-semibold text-sm border border-white/20 text-white">Moje bilety</button>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-6">
          {[{ v: "50+", l: "Wydarzeń" }, { v: "12K+", l: "Uczestników" }, { v: "4.9", l: "Ocena" }].map((s, i) => (
            <div key={i} className="p-2.5 rounded-lg text-center" style={{ background: "rgba(255,255,255,0.06)" }}>
              <span className="font-bold text-sm text-white block">{s.v}</span>
              <span className="text-[8px] text-white/40">{s.l}</span>
            </div>
          ))}
        </div>
      </div>

      <DemoSection>
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm" style={{ color: C.navy }}>Wyróżnione wydarzenia</h3>
          <button onClick={() => onNav("events")} className="text-[10px] font-medium flex items-center gap-1" style={{ color: C.neon }}>Wszystkie <ChevronRight className="w-3 h-3" /></button>
        </div>
        {featured.map((e, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="p-4 rounded-xl border hover:shadow-md transition-all cursor-pointer" style={{ borderColor: C.light, background: C.white }}>
            <div className="flex gap-3">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0" style={{ background: `linear-gradient(135deg, ${C.navy}10, ${C.violet}10)` }}>{e.image}</div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold truncate" style={{ color: C.navy }}>{e.title}</h4>
                <p className="text-[10px]" style={{ color: C.gray }}>{e.date} · {e.time}</p>
                <p className="text-[10px] flex items-center gap-1" style={{ color: C.gray }}><MapPin className="w-3 h-3" />{e.location}</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[9px] font-medium" style={{ background: C.light, color: C.navy }}>{e.category}</span>
                <span className="text-[10px]" style={{ color: C.gray }}>{e.sold}/{e.spots} miejsc</span>
              </div>
              <span className="font-bold text-sm" style={{ color: C.neon.replace("00FF88", "059669") }}>{e.price === 0 ? "Bezpłatne" : `${e.price} zł`}</span>
            </div>
            <div className="w-full h-1.5 rounded-full mt-2" style={{ background: C.light }}>
              <div className="h-full rounded-full" style={{ width: `${(e.sold / e.spots) * 100}%`, background: `linear-gradient(to right, ${C.neon.replace("00FF88", "059669")}, ${C.cyan})` }} />
            </div>
          </motion.div>
        ))}

        <div className="grid grid-cols-4 gap-2 mt-2">
          {[{ icon: "🚀", l: "Konferencje", c: "12" }, { icon: "🎵", l: "Muzyka", c: "8" }, { icon: "💡", l: "Business", c: "15" }, { icon: "🍔", l: "Gastro", c: "6" }].map((cat, i) => (
            <div key={i} className="p-2.5 rounded-xl text-center cursor-pointer hover:shadow-sm transition-all" style={{ background: C.light }}>
              <span className="text-lg block">{cat.icon}</span>
              <span className="text-[8px] font-bold block mt-0.5" style={{ color: C.navy }}>{cat.l}</span>
              <span className="text-[7px]" style={{ color: C.gray }}>{cat.c} eventów</span>
            </div>
          ))}
        </div>
      </DemoSection>

      <DemoBenefits accentColor={C.cyan} bgColor={C.light} textColor={C.navy} benefits={[
        { icon: "🎫", title: "Bilety online", desc: "Kup bilet w minutę" },
        { icon: "📱", title: "Bilet mobilny QR", desc: "Wejście bez drukowania" },
        { icon: "📋", title: "Program wydarzenia", desc: "Harmonogram na żywo" },
        { icon: "🔔", title: "Powiadomienia", desc: "Przypomnienia o eventach" },
      ]} />
      <DemoFooterCTA accentColor={C.cyan} bgColor={C.navy} />
    </div>
  );
}

function EventsListPage() {
  const [cat, setCat] = useState("all");
  const filtered = cat === "all" ? events : events.filter(e => e.category === cat);
  return (
    <DemoSection>
      <h3 className="font-bold text-sm" style={{ color: C.navy }}>Wszystkie wydarzenia</h3>
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {["all", "Konferencja", "Muzyka", "Business", "Gastro"].map(c => (
          <button key={c} onClick={() => setCat(c)} className="px-3 py-1.5 rounded-lg text-[10px] font-medium whitespace-nowrap transition-all"
            style={cat === c ? { background: C.cyan, color: "white" } : { background: C.light, color: C.gray }}>{c === "all" ? "Wszystkie" : c}</button>
        ))}
      </div>
      <div className="space-y-3">
        {filtered.map((e, i) => (
          <motion.div key={e.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="flex gap-3 p-3 rounded-xl border hover:shadow-sm transition-all cursor-pointer" style={{ borderColor: C.light, background: C.white }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0" style={{ background: C.navy + "08" }}>{e.image}</div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold truncate" style={{ color: C.navy }}>{e.title}</h4>
              <p className="text-[10px]" style={{ color: C.gray }}>{e.date} · {e.location}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="px-2 py-0.5 rounded text-[8px] font-medium" style={{ background: C.light, color: C.navy }}>{e.category}</span>
                <span className="ml-auto font-bold text-xs" style={{ color: C.cyan }}>{e.price === 0 ? "Free" : `${e.price} zł`}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </DemoSection>
  );
}

function SchedulePage() {
  const typeColors: Record<string, { bg: string; fg: string; label: string }> = {
    keynote: { bg: C.neon.replace("00FF88", "059669") + "15", fg: C.neon.replace("00FF88", "059669"), label: "Keynote" },
    talk: { bg: C.blue + "15", fg: C.blue, label: "Prelekcja" },
    panel: { bg: C.violet + "15", fg: C.violet, label: "Panel" },
    workshop: { bg: C.amber + "15", fg: C.amber, label: "Warsztat" },
    break: { bg: C.gray + "10", fg: C.gray, label: "Przerwa" },
  };
  return (
    <DemoSection>
      <h3 className="font-bold text-sm" style={{ color: C.navy }}>Program — Warsaw Tech Summit 2026</h3>
      <p className="text-xs" style={{ color: C.gray }}>15 kwietnia 2026, dzień 1</p>
      <div className="space-y-0 mt-2">
        {schedule.map((s, i) => {
          const tc = typeColors[s.type];
          return (
            <div key={i} className="flex gap-3">
              <div className="flex flex-col items-center">
                <span className="text-[10px] font-mono font-bold w-10 text-right shrink-0" style={{ color: C.navy }}>{s.time}</span>
              </div>
              <div className="flex-1 pb-3">
                <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                  className="p-3 rounded-xl" style={{ background: tc.bg, borderLeft: `3px solid ${tc.fg}` }}>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-semibold flex-1" style={{ color: C.navy }}>{s.title}</h4>
                    <span className="px-1.5 py-0.5 rounded text-[8px] font-bold" style={{ background: tc.fg + "20", color: tc.fg }}>{tc.label}</span>
                  </div>
                  {s.speaker && <p className="text-[10px] mt-0.5" style={{ color: C.gray }}>{s.speaker}</p>}
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>
    </DemoSection>
  );
}

function TicketsPage() {
  const event = events[0];
  const tickets = [
    { name: "Standard", price: 349, features: ["Wstęp na obie sceny", "Lunch", "Materiały", "Certyfikat"] },
    { name: "VIP", price: 699, features: ["Wszystko ze Standard", "Strefa VIP", "After party", "Networking 1:1", "Nagrania video"] },
    { name: "Online", price: 149, features: ["Stream na żywo", "Nagrania 30 dni", "Materiały PDF"] },
  ];
  return (
    <DemoSection>
      <h3 className="font-bold text-sm" style={{ color: C.navy }}>Kup bilet — {event.title}</h3>
      <p className="text-xs" style={{ color: C.gray }}>{event.date} · {event.location}</p>
      <div className="space-y-3 mt-2">
        {tickets.map((t, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="p-4 rounded-xl border" style={{ borderColor: i === 1 ? C.cyan + "40" : C.light, background: C.white }}>
            {i === 1 && <span className="px-2 py-0.5 rounded-full text-[8px] font-bold mb-2 inline-block" style={{ background: C.cyan + "15", color: C.cyan }}>Najpopularniejszy</span>}
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-sm" style={{ color: C.navy }}>{t.name}</h4>
              <span className="font-bold text-lg" style={{ color: C.cyan }}>{t.price} zł</span>
            </div>
            <div className="space-y-1">
              {t.features.map((f, j) => (
                <div key={j} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 shrink-0" style={{ color: C.green }} />
                  <span className="text-[10px]" style={{ color: C.navy }}>{f}</span>
                </div>
              ))}
            </div>
            <motion.button whileHover={{ scale: 1.02 }}
              className="w-full mt-3 py-2.5 rounded-lg text-xs font-bold text-white" style={{ background: i === 1 ? C.cyan : C.navy }}>Kup bilet {t.name}</motion.button>
          </motion.div>
        ))}
      </div>
    </DemoSection>
  );
}

function MyTicketsPage() {
  return (
    <DemoSection>
      <h3 className="font-bold text-sm" style={{ color: C.navy }}>Moje bilety</h3>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="p-4 rounded-xl" style={{ background: `linear-gradient(135deg, ${C.navy}, ${C.dark})` }}>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h4 className="font-bold text-sm text-white">{events[0].title}</h4>
            <p className="text-[10px] text-white/60">{events[0].date} · {events[0].location}</p>
          </div>
          <span className="px-2 py-0.5 rounded text-[9px] font-bold" style={{ background: C.neon + "20", color: C.neon }}>VIP</span>
        </div>
        <div className="flex items-center justify-center py-4">
          <div className="w-32 h-32 rounded-xl flex items-center justify-center" style={{ background: "white" }}>
            <QrCode className="w-20 h-20" style={{ color: C.navy }} />
          </div>
        </div>
        <div className="text-center mt-2">
          <p className="text-[10px] text-white/60">Kod biletu</p>
          <p className="font-mono text-sm text-white font-bold">EVT-2026-VIP-4821</p>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="p-2 rounded-lg text-center" style={{ background: "rgba(255,255,255,0.08)" }}>
            <span className="text-[8px] text-white/40 block">Typ</span>
            <span className="text-[10px] text-white font-medium">VIP</span>
          </div>
          <div className="p-2 rounded-lg text-center" style={{ background: "rgba(255,255,255,0.08)" }}>
            <span className="text-[8px] text-white/40 block">Miejsce</span>
            <span className="text-[10px] text-white font-medium">Wolne</span>
          </div>
          <div className="p-2 rounded-lg text-center" style={{ background: "rgba(255,255,255,0.08)" }}>
            <span className="text-[8px] text-white/40 block">Status</span>
            <span className="text-[10px] font-medium" style={{ color: C.neon }}>Aktywny</span>
          </div>
        </div>
      </motion.div>
      <p className="text-center text-[10px]" style={{ color: C.gray }}>Pokaż kod QR przy wejściu na wydarzenie</p>
    </DemoSection>
  );
}
