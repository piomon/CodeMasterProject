import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PreviewShell, DemoBenefits, DemoFooterCTA } from "./PreviewShell";
import { Calendar, Clock, MapPin, Ticket, QrCode, CheckCircle2, Search } from "lucide-react";

const C = { navy: "#0A0A1A", dark: "#121225", purple: "#7C3AED", violet: "#A855F7", white: "#FFFFFF", gray: "#6B7280", green: "#10B981", amber: "#F59E0B", light: "#F4F2FF", cyan: "#06B6D4", bg: "#F8F7FF", card: "#FFFFFF", text: "#1E1B4B", blue: "#3B82F6" };

type EventPage = "home" | "events" | "schedule" | "tickets" | "mytickets";

const events = [
  { id: 1, title: "Warsaw Tech Summit 2026", date: "15-16 kwi 2026", time: "09:00 - 18:00", location: "PGE Narodowy, Warszawa", category: "Konferencja", price: 349, image: "🚀", spots: 2400, sold: 1860, featured: true },
  { id: 2, title: "Noc Muzyki Elektronicznej", date: "12 kwi 2026", time: "21:00 - 05:00", location: "Stodoła, Warszawa", category: "Muzyka", price: 89, image: "🎵", spots: 800, sold: 720, featured: false },
  { id: 3, title: "Startup Pitch Night", date: "8 kwi 2026", time: "18:00 - 22:00", location: "Campus Warsaw", category: "Business", price: 0, image: "💡", spots: 150, sold: 142, featured: false },
  { id: 4, title: "Festiwal Streetfood", date: "20-21 kwi 2026", time: "12:00 - 22:00", location: "Bulwary Wiślane", category: "Gastro", price: 29, image: "🍔", spots: 5000, sold: 3200, featured: false },
  { id: 5, title: "AI & Future Conference", date: "25 kwi 2026", time: "10:00 - 17:00", location: "Centrum Kopernik", category: "Konferencja", price: 199, image: "🤖", spots: 600, sold: 480, featured: true },
];

const schedule = [
  { time: "09:00", title: "Rejestracja i poranna kawa", speaker: "", type: "break" as const },
  { time: "09:30", title: "Otwarcie — Przyszłość technologii w Polsce", speaker: "Piotr Montewka", type: "keynote" as const },
  { time: "10:30", title: "AI w produkcji — case studies", speaker: "dr Anna Kowalska", type: "talk" as const },
  { time: "11:30", title: "Przerwa networkingowa", speaker: "", type: "break" as const },
  { time: "12:00", title: "Cloud-native architecture w 2026", speaker: "Marek Wiśniewski", type: "talk" as const },
  { time: "13:00", title: "Lunch", speaker: "", type: "break" as const },
  { time: "14:00", title: "Panel dyskusyjny: Startupy vs Korporacje", speaker: "Panel 4 ekspertów", type: "panel" as const },
  { time: "15:30", title: "Warsztaty: Budowanie MVP w 3h", speaker: "Tomasz Nowak", type: "workshop" as const },
  { time: "17:30", title: "Zamknięcie i afterparty", speaker: "", type: "break" as const },
];

type EventCategory = "all" | "Konferencja" | "Muzyka" | "Business" | "Gastro";

const navItems: { id: EventPage; label: string; icon: ReactNode }[] = [
  { id: "home", label: "Odkrywaj", icon: <Search className="w-3.5 h-3.5" /> },
  { id: "events", label: "Wydarzenia", icon: <Calendar className="w-3.5 h-3.5" /> },
  { id: "schedule", label: "Program", icon: <Clock className="w-3.5 h-3.5" /> },
  { id: "tickets", label: "Bilety", icon: <Ticket className="w-3.5 h-3.5" /> },
  { id: "mytickets", label: "Moje bilety", icon: <QrCode className="w-3.5 h-3.5" /> },
];

export function EventsDemo({ name }: { name: string; features: string[] }) {
  const [page, setPage] = useState<EventPage>("home");

  return (
    <PreviewShell title={name}>
      <div style={{ background: C.bg, minHeight: 540 }}>
        <div className="px-5 py-3" style={{ background: C.navy }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${C.purple}, ${C.violet})` }}>
                <Ticket className="w-4 h-4 text-white" />
              </div>
              <h1 className="font-bold text-sm text-white">Event<span style={{ color: C.violet }}>Hub</span></h1>
            </div>
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-[8px] font-bold text-white" style={{ background: C.purple }}>JK</div>
          </div>
          <div className="flex gap-1 mt-2 overflow-x-auto pb-1">
            {navItems.map(n => (
              <button key={n.id} onClick={() => setPage(n.id)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-semibold whitespace-nowrap transition-all"
                style={page === n.id ? { background: C.purple, color: C.white } : { color: "rgba(255,255,255,0.5)" }}>
                {n.icon}<span>{n.label}</span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={page} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            {page === "home" && <HomePage onNav={setPage} />}
            {page === "events" && <EventsListPage />}
            {page === "schedule" && <SchedulePage />}
            {page === "tickets" && <TicketsPage />}
            {page === "mytickets" && <MyTicketsPage />}
          </motion.div>
        </AnimatePresence>
      </div>

      <DemoBenefits accentColor={C.purple} bgColor={C.light} textColor={C.text} benefits={[
        { icon: "🎫", title: "Bilety online", desc: "Kup bilet w minutę" },
        { icon: "📱", title: "Bilet mobilny QR", desc: "Wejście bez drukowania" },
        { icon: "📋", title: "Program wydarzenia", desc: "Harmonogram na żywo" },
        { icon: "🔔", title: "Powiadomienia", desc: "Przypomnienia o eventach" },
      ]} />
      <DemoFooterCTA accentColor={C.purple} bgColor={C.navy} />
    </PreviewShell>
  );
}

function HomePage({ onNav }: { onNav: (p: EventPage) => void }) {
  const featured = events.filter(e => e.featured);
  return (
    <div>
      <div className="p-6 pb-8" style={{ background: `linear-gradient(160deg, ${C.purple}, ${C.navy})` }}>
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/50">Portal eventowy</p>
        <h2 className="font-bold text-2xl mt-1 text-white">Odkryj najlepsze <span style={{ color: C.violet }}>wydarzenia</span></h2>
        <p className="text-xs mt-2 text-white/70 max-w-[280px] leading-relaxed">Konferencje, koncerty, warsztaty i więcej. Kupuj bilety online.</p>
        <div className="flex gap-3 mt-4">
          <motion.button whileHover={{ scale: 1.03 }} onClick={() => onNav("events")}
            className="px-5 py-2.5 rounded-lg font-bold text-sm shadow-lg text-white" style={{ background: C.purple }}>Odkryj wydarzenia</motion.button>
          <button onClick={() => onNav("mytickets")} className="px-5 py-2.5 rounded-lg font-semibold text-sm border border-white/20 text-white">Moje bilety</button>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-5">
          {[{ v: "50+", l: "Wydarzeń" }, { v: "12K+", l: "Uczestników" }, { v: "4.9", l: "Ocena" }].map((s, i) => (
            <div key={i} className="p-2 rounded-lg text-center" style={{ background: "rgba(255,255,255,0.08)" }}>
              <span className="font-bold text-sm text-white block">{s.v}</span>
              <span className="text-[8px] text-white/40">{s.l}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-3">
        <span className="text-xs font-bold" style={{ color: C.text }}>Wyróżnione wydarzenia</span>
        {featured.map((e, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
            className="p-4 rounded-xl hover:shadow-md transition-all cursor-pointer" style={{ background: C.card, border: `1px solid ${C.purple}10` }}>
            <div className="flex gap-3">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0" style={{ background: C.light }}>{e.image}</div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold truncate" style={{ color: C.text }}>{e.title}</h4>
                <p className="text-[10px]" style={{ color: C.gray }}>{e.date} · {e.time}</p>
                <p className="text-[10px] flex items-center gap-1" style={{ color: C.gray }}><MapPin className="w-3 h-3" />{e.location}</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[9px] font-medium" style={{ background: C.light, color: C.text }}>{e.category}</span>
                <span className="text-[10px]" style={{ color: C.gray }}>{e.sold}/{e.spots} miejsc</span>
              </div>
              <span className="font-bold text-sm" style={{ color: C.purple }}>{e.price === 0 ? "Bezpłatne" : `${e.price} zł`}</span>
            </div>
            <div className="w-full h-1.5 rounded-full mt-2" style={{ background: C.light }}>
              <div className="h-full rounded-full" style={{ width: `${(e.sold / e.spots) * 100}%`, background: `linear-gradient(to right, ${C.purple}, ${C.cyan})` }} />
            </div>
          </motion.div>
        ))}

        <div className="grid grid-cols-4 gap-2">
          {[{ icon: "🚀", l: "Konferencje", c: "12" }, { icon: "🎵", l: "Muzyka", c: "8" }, { icon: "💡", l: "Business", c: "15" }, { icon: "🍔", l: "Gastro", c: "6" }].map((cat, i) => (
            <div key={i} className="p-2.5 rounded-xl text-center cursor-pointer hover:shadow-sm transition-all" style={{ background: C.card }}>
              <span className="text-lg block">{cat.icon}</span>
              <span className="text-[8px] font-bold block mt-0.5" style={{ color: C.text }}>{cat.l}</span>
              <span className="text-[7px]" style={{ color: C.gray }}>{cat.c} eventów</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function EventsListPage() {
  const [cat, setCat] = useState<EventCategory>("all");
  const filtered = cat === "all" ? events : events.filter(e => e.category === cat);
  return (
    <div className="p-4 space-y-3">
      <span className="text-xs font-bold" style={{ color: C.text }}>Wszystkie wydarzenia</span>
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {(["all", "Konferencja", "Muzyka", "Business", "Gastro"] as EventCategory[]).map(c => (
          <button key={c} onClick={() => setCat(c)} className="px-3 py-1.5 rounded-lg text-[10px] font-medium whitespace-nowrap transition-all"
            style={cat === c ? { background: C.purple, color: "white" } : { background: C.card, color: C.gray }}>{c === "all" ? "Wszystkie" : c}</button>
        ))}
      </div>
      {filtered.map((e, i) => (
        <motion.div key={e.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
          className="flex gap-3 p-3 rounded-xl hover:shadow-sm transition-all cursor-pointer" style={{ background: C.card }}>
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0" style={{ background: C.light }}>{e.image}</div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold truncate" style={{ color: C.text }}>{e.title}</h4>
            <p className="text-[10px]" style={{ color: C.gray }}>{e.date} · {e.location}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="px-2 py-0.5 rounded text-[8px] font-medium" style={{ background: C.light, color: C.text }}>{e.category}</span>
              <span className="ml-auto font-bold text-xs" style={{ color: C.purple }}>{e.price === 0 ? "Bezpłatne" : `${e.price} zł`}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function SchedulePage() {
  type ScheduleType = "keynote" | "talk" | "panel" | "workshop" | "break";
  const typeColors: Record<ScheduleType, { bg: string; fg: string; label: string }> = {
    keynote: { bg: C.purple + "15", fg: C.purple, label: "Keynote" },
    talk: { bg: C.blue + "15", fg: C.blue, label: "Prelekcja" },
    panel: { bg: C.violet + "15", fg: C.violet, label: "Panel" },
    workshop: { bg: C.amber + "15", fg: C.amber, label: "Warsztat" },
    break: { bg: C.gray + "10", fg: C.gray, label: "Przerwa" },
  };
  return (
    <div className="p-4 space-y-3">
      <span className="text-xs font-bold" style={{ color: C.text }}>Program — Warsaw Tech Summit 2026</span>
      <p className="text-[10px]" style={{ color: C.gray }}>15 kwietnia 2026, dzień 1</p>
      <div className="space-y-0 mt-1">
        {schedule.map((s, i) => {
          const tc = typeColors[s.type];
          return (
            <div key={i} className="flex gap-3">
              <span className="text-[10px] font-mono font-bold w-10 text-right shrink-0 pt-2.5" style={{ color: C.text }}>{s.time}</span>
              <div className="flex-1 pb-2">
                <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}
                  className="p-3 rounded-xl" style={{ background: tc.bg, borderLeft: `3px solid ${tc.fg}` }}>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-semibold flex-1" style={{ color: C.text }}>{s.title}</h4>
                    <span className="px-1.5 py-0.5 rounded text-[8px] font-bold" style={{ background: tc.fg + "20", color: tc.fg }}>{tc.label}</span>
                  </div>
                  {s.speaker && <p className="text-[10px] mt-0.5" style={{ color: C.gray }}>{s.speaker}</p>}
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
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
    <div className="p-4 space-y-3">
      <span className="text-xs font-bold" style={{ color: C.text }}>Kup bilet — {event.title}</span>
      <p className="text-[10px]" style={{ color: C.gray }}>{event.date} · {event.location}</p>
      {tickets.map((t, i) => (
        <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
          className="p-4 rounded-xl" style={{ background: C.card, border: i === 1 ? `2px solid ${C.purple}` : `1px solid ${C.purple}10` }}>
          {i === 1 && <span className="px-2 py-0.5 rounded-full text-[8px] font-bold mb-2 inline-block" style={{ background: C.purple + "15", color: C.purple }}>Najpopularniejszy</span>}
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-bold text-sm" style={{ color: C.text }}>{t.name}</h4>
            <span className="font-bold text-lg" style={{ color: C.purple }}>{t.price} zł</span>
          </div>
          <div className="space-y-1">
            {t.features.map((f, j) => (
              <div key={j} className="flex items-center gap-2">
                <CheckCircle2 className="w-3 h-3 shrink-0" style={{ color: C.green }} />
                <span className="text-[10px]" style={{ color: C.text }}>{f}</span>
              </div>
            ))}
          </div>
          <motion.button whileHover={{ scale: 1.02 }}
            className="w-full mt-3 py-2.5 rounded-lg text-xs font-bold text-white" style={{ background: i === 1 ? C.purple : C.navy }}>Kup bilet {t.name}</motion.button>
        </motion.div>
      ))}
    </div>
  );
}

function MyTicketsPage() {
  return (
    <div className="p-4 space-y-3">
      <span className="text-xs font-bold" style={{ color: C.text }}>Moje bilety</span>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="p-4 rounded-xl" style={{ background: `linear-gradient(135deg, ${C.navy}, ${C.dark})` }}>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h4 className="font-bold text-sm text-white">{events[0].title}</h4>
            <p className="text-[10px] text-white/60">{events[0].date} · {events[0].location}</p>
          </div>
          <span className="px-2 py-0.5 rounded text-[9px] font-bold" style={{ background: C.purple + "30", color: C.violet }}>VIP</span>
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
            <span className="text-[10px] font-medium" style={{ color: C.green }}>Aktywny</span>
          </div>
        </div>
      </motion.div>
      <p className="text-center text-[10px]" style={{ color: C.gray }}>Pokaż kod QR przy wejściu na wydarzenie</p>
    </div>
  );
}
