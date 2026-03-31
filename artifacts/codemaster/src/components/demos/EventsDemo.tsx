import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PreviewShell, DemoNav, DemoSection } from "./PreviewShell";
import { Calendar, Clock, MapPin, Users, Ticket, QrCode, Star, ChevronRight, CheckCircle2, Home, Music, Mic2 } from "lucide-react";

const C = { black: "#0A0A0A", violet: "#8B5CF6", neonBlue: "#06B6D4", pink: "#EC4899", white: "#F8FAFC", graphite: "#1E1E1E", gray: "#6B7280" };

const events = [
  { name: "Tech Summit 2026", type: "Konferencja", date: "15-16 kwi 2026", location: "Warszawa, ICE", price: 890, speakers: 24, icon: "🎤" },
  { name: "Startup Weekend", type: "Hackathon", date: "22-24 kwi 2026", location: "Kraków, Hub:raum", price: 199, speakers: 8, icon: "🚀" },
  { name: "Design Meetup", type: "Meetup", date: "5 maj 2026", location: "Wrocław, Concordia", price: 0, speakers: 4, icon: "🎨" },
];

const schedule = [
  { time: "09:00", title: "Rejestracja i networking", speaker: "", dur: "30 min", track: "Main" },
  { time: "09:30", title: "Keynote: Przyszłość AI", speaker: "dr Jan Nowak", dur: "45 min", track: "Main" },
  { time: "10:30", title: "Panel: Product-Market Fit", speaker: "3 ekspertów", dur: "60 min", track: "Business" },
  { time: "11:45", title: "Workshop: React 2026", speaker: "Kris Kowalski", dur: "90 min", track: "Tech" },
  { time: "13:00", title: "Lunch break", speaker: "", dur: "60 min", track: "Main" },
  { time: "14:00", title: "Skalowanie SaaS", speaker: "Anna Lewandowska", dur: "45 min", track: "Business" },
  { time: "15:00", title: "Lightning talks", speaker: "5 prelegentów", dur: "60 min", track: "Tech" },
  { time: "16:30", title: "Networking & after-party", speaker: "", dur: "120 min", track: "Main" },
];

function QRTicket() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.fillStyle = C.white; ctx.fillRect(0, 0, c.width, c.height);
    const s = 6, off = 10;
    for (let row = 0; row < 15; row++) {
      for (let col = 0; col < 15; col++) {
        if (Math.random() > 0.45 || (row < 5 && col < 5) || (row < 5 && col > 9) || (row > 9 && col < 5)) {
          ctx.fillStyle = C.black;
          ctx.fillRect(off + col * s, off + row * s, s, s);
        }
      }
    }
  }, []);
  return <canvas ref={ref} width={110} height={110} className="rounded-lg" />;
}

export function EventsDemo({ name }: { name: string; features: string[]; industry?: string }) {
  const [page, setPage] = useState("home");
  const tabs = [
    { id: "home", label: "Wydarzenia", icon: <Home className="w-3 h-3" /> },
    { id: "schedule", label: "Harmonogram", icon: <Calendar className="w-3 h-3" /> },
    { id: "ticket", label: "Bilet", icon: <Ticket className="w-3 h-3" /> },
    { id: "speakers", label: "Prelegenci", icon: <Mic2 className="w-3 h-3" /> },
    { id: "networking", label: "Networking", icon: <Users className="w-3 h-3" /> },
  ];

  return (
    <PreviewShell title={name}>
      <DemoNav tabs={tabs} activeTab={page} onTabChange={setPage} logo="EventHub" />
      <AnimatePresence mode="wait">
        <motion.div key={page} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
          {page === "home" && <HomePage onNav={setPage} />}
          {page === "schedule" && <SchedulePage />}
          {page === "ticket" && <TicketPage />}
          {page === "speakers" && <SpeakersPage />}
          {page === "networking" && <NetworkingPage />}
        </motion.div>
      </AnimatePresence>
    </PreviewShell>
  );
}

function HomePage({ onNav }: { onNav: (p: string) => void }) {
  return (
    <div>
      <div className="p-10 text-center" style={{ background: `linear-gradient(160deg, ${C.black}, ${C.violet}60)` }}>
        <p className="text-[10px] tracking-[0.4em] uppercase" style={{ color: C.neonBlue }}>Platforma Eventowa</p>
        <h1 className="font-display font-bold text-4xl mt-2 text-white">Event<span style={{ color: C.pink }}>Hub</span></h1>
        <p className="text-xs mt-2 max-w-[260px] mx-auto leading-relaxed text-white/70">Konferencje, meetupy, warsztaty technologiczne. Odkryj wydarzenia, kup bilety, networkuj z branżą.</p>
        <div className="flex gap-3 justify-center mt-6">
          <motion.button whileHover={{ scale: 1.03 }} onClick={() => onNav("schedule")}
            className="px-7 py-3.5 rounded-lg font-bold text-sm shadow-lg" style={{ background: `linear-gradient(135deg, ${C.violet}, ${C.pink})`, color: "white" }}>Przeglądaj wydarzenia</motion.button>
          <button onClick={() => onNav("ticket")} className="px-7 py-3.5 rounded-lg font-semibold text-sm border border-white/20 text-white">Mój bilet</button>
        </div>
      </div>
      <DemoSection>
        <div className="grid grid-cols-4 gap-2">
          {[
            { icon: "🎤", label: "Konferencje", desc: "Tech & Biz" },
            { icon: "🚀", label: "Hackatony", desc: "48h coding" },
            { icon: "🎨", label: "Meetupy", desc: "Networking" },
            { icon: "📱", label: "QR bilety", desc: "Mobilne" },
          ].map((f, i) => (
            <div key={i} className="p-3 rounded-xl text-center" style={{ background: C.graphite }}>
              <span className="text-lg block">{f.icon}</span>
              <span className="text-[8px] font-bold block mt-1 text-white">{f.label}</span>
              <span className="text-[7px]" style={{ color: C.gray }}>{f.desc}</span>
            </div>
          ))}
        </div>
        <h3 className="font-bold text-sm text-white mt-4">Nadchodzące wydarzenia</h3>
        {events.map((e, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="p-5 rounded-xl border cursor-pointer" style={{ borderColor: C.graphite, background: C.black }} onClick={() => onNav("schedule")}>
            <div className="flex gap-4">
              <span className="text-3xl">{e.icon}</span>
              <div className="flex-1">
                <h4 className="font-bold text-base text-white">{e.name}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 rounded text-[9px] font-bold" style={{ background: C.violet + "20", color: C.violet }}>{e.type}</span>
                  <span className="text-[10px]" style={{ color: C.gray }}>{e.speakers} prelegentów</span>
                </div>
                <div className="flex items-center gap-3 mt-2 text-[10px]" style={{ color: C.gray }}>
                  <span className="flex items-center gap-0.5"><Calendar className="w-3 h-3" />{e.date}</span>
                  <span className="flex items-center gap-0.5"><MapPin className="w-3 h-3" />{e.location}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t" style={{ borderColor: C.graphite }}>
              <span className="font-bold text-lg" style={{ color: e.price > 0 ? C.pink : "#10B981" }}>{e.price > 0 ? `${e.price} zł` : "Bezpłatne"}</span>
              <motion.button whileHover={{ scale: 1.03 }}
                className="px-5 py-2 rounded-lg font-semibold text-sm" style={{ background: `linear-gradient(135deg, ${C.violet}, ${C.pink})`, color: "white" }}>Kup bilet</motion.button>
            </div>
          </motion.div>
        ))}
      </DemoSection>
      <DemoBenefits accentColor={C.cyan} bgColor={C.dark} textColor={"#FFFFFF"} benefits={[
        { icon: "🎫", title: "Sprzedaż biletów", desc: "Online checkout z wariantami" },
        { icon: "📅", title: "Harmonogram", desc: "Sceny, sesje i prelegenci" },
        { icon: "📱", title: "Bilet mobilny", desc: "QR code i szybki check-in" },
        { icon: "📊", title: "Panel organizatora", desc: "Frekwencja i statystyki" },
      ]} />
      <DemoFooterCTA accentColor={C.cyan} bgColor={C.dark} />
    </div>
  );
}

function SchedulePage() {
  const [selTrack, setSelTrack] = useState("all");
  const tracks = ["all", "Main", "Business", "Tech"];
  const filtered = selTrack === "all" ? schedule : schedule.filter(s => s.track === selTrack);
  const trackColors: Record<string, string> = { Main: C.neonBlue, Business: C.violet, Tech: C.pink };

  return (
    <DemoSection>
      <h3 className="font-bold text-sm text-white">Tech Summit 2026 — Dzień 1</h3>
      <div className="flex gap-2 mb-3">
        {tracks.map(t => (
          <button key={t} onClick={() => setSelTrack(t)} className="px-3 py-1.5 rounded-full text-xs font-medium"
            style={selTrack === t ? { background: C.violet, color: "white" } : { background: C.graphite, color: C.gray }}>{t === "all" ? "Wszystkie" : t}</button>
        ))}
      </div>
      <div className="space-y-1">
        {filtered.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
            className="flex gap-3 p-3 rounded-xl" style={{ background: C.graphite }}>
            <div className="text-center min-w-[50px]">
              <span className="font-bold text-sm text-white">{s.time}</span>
              <p className="text-[9px]" style={{ color: C.gray }}>{s.dur}</p>
            </div>
            <div className="w-0.5 rounded" style={{ background: trackColors[s.track] || C.gray }} />
            <div className="flex-1">
              <span className="text-xs font-semibold text-white">{s.title}</span>
              {s.speaker && <p className="text-[10px]" style={{ color: trackColors[s.track] || C.gray }}>{s.speaker}</p>}
              <span className="px-1.5 py-0.5 rounded text-[8px] font-bold mt-0.5 inline-block" style={{ background: (trackColors[s.track] || C.gray) + "20", color: trackColors[s.track] || C.gray }}>{s.track}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </DemoSection>
  );
}

function TicketPage() {
  return (
    <DemoSection>
      <div className="p-5 rounded-2xl text-center" style={{ background: `linear-gradient(135deg, ${C.graphite}, ${C.black})`, border: `2px solid ${C.violet}` }}>
        <p className="text-[10px] tracking-[0.2em] uppercase" style={{ color: C.neonBlue }}>E-Bilet</p>
        <h3 className="font-bold text-xl text-white mt-1">Tech Summit 2026</h3>
        <p className="text-xs text-white/60 mt-0.5">15-16 kwi 2026 • ICE Warszawa</p>
        <div className="flex justify-center my-4"><QRTicket /></div>
        <div className="grid grid-cols-2 gap-3 text-left">
          <div><span className="text-[9px]" style={{ color: C.gray }}>Uczestnik</span><p className="text-xs font-bold text-white">Jan Kowalski</p></div>
          <div><span className="text-[9px]" style={{ color: C.gray }}>Typ biletu</span><p className="text-xs font-bold" style={{ color: C.pink }}>VIP Pass</p></div>
          <div><span className="text-[9px]" style={{ color: C.gray }}>Nr biletu</span><p className="text-xs font-mono text-white">EH-2026-4821</p></div>
          <div><span className="text-[9px]" style={{ color: C.gray }}>Status</span><p className="text-xs font-bold" style={{ color: "#10B981" }}>Aktywny</p></div>
        </div>
      </div>
      <h4 className="font-bold text-xs mt-3 text-white">Rodzaje biletów</h4>
      {[
        { name: "Early Bird", price: 590, features: ["Wstęp 2 dni", "Materiały", "Lunch"] },
        { name: "Standard", price: 890, features: ["Wstęp 2 dni", "Materiały", "Lunch", "Networking"] },
        { name: "VIP Pass", price: 1490, features: ["Wstęp 2 dni", "Front seats", "VIP Lounge", "After-party", "Nagrania"] },
      ].map((t, i) => (
        <div key={i} className="p-3 rounded-xl border flex items-center justify-between" style={{ borderColor: C.graphite, background: C.black }}>
          <div>
            <span className="text-sm font-bold text-white">{t.name}</span>
            <p className="text-[10px]" style={{ color: C.gray }}>{t.features.join(" • ")}</p>
          </div>
          <span className="font-bold text-sm" style={{ color: C.pink }}>{t.price} zł</span>
        </div>
      ))}
    </DemoSection>
  );
}

function SpeakersPage() {
  const speakers = [
    { name: "dr Jan Nowak", topic: "Przyszłość AI", company: "AI Labs", icon: "🧑‍🔬" },
    { name: "Anna Lewandowska", topic: "Skalowanie SaaS", company: "ScaleUp.io", icon: "👩‍💼" },
    { name: "Kris Kowalski", topic: "React 2026", company: "DevHouse", icon: "👨‍💻" },
    { name: "Ola Wiśniewska", topic: "UX w B2B", company: "DesignCo", icon: "👩‍🎨" },
  ];
  return (
    <DemoSection>
      <h3 className="font-bold text-sm text-white">Prelegenci</h3>
      <div className="space-y-3">
        {speakers.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
            className="flex items-center gap-4 p-4 rounded-xl border" style={{ borderColor: C.graphite, background: C.black }}>
            <span className="text-3xl">{s.icon}</span>
            <div className="flex-1">
              <h4 className="font-bold text-sm text-white">{s.name}</h4>
              <p className="text-xs" style={{ color: C.violet }}>{s.topic}</p>
              <p className="text-[10px]" style={{ color: C.gray }}>{s.company}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </DemoSection>
  );
}

function NetworkingPage() {
  const attendees = [
    { name: "Michał K.", role: "CTO", company: "TechCorp", interests: ["AI", "Backend"] },
    { name: "Karolina W.", role: "PM", company: "StartupXYZ", interests: ["Product", "Growth"] },
    { name: "Tomek R.", role: "Designer", company: "DesignLab", interests: ["UX", "Brand"] },
  ];
  return (
    <DemoSection>
      <h3 className="font-bold text-sm text-white">Networking</h3>
      <p className="text-xs" style={{ color: C.gray }}>Uczestnicy szukający kontaktów</p>
      {attendees.map((a, i) => (
        <div key={i} className="p-4 rounded-xl border" style={{ borderColor: C.graphite, background: C.black }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs" style={{ background: `linear-gradient(135deg, ${C.violet}, ${C.pink})`, color: "white" }}>
              {a.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div className="flex-1">
              <span className="text-sm font-bold text-white">{a.name}</span>
              <p className="text-[10px]" style={{ color: C.gray }}>{a.role} @ {a.company}</p>
            </div>
            <motion.button whileHover={{ scale: 1.05 }} className="px-3 py-1.5 rounded-lg text-[10px] font-bold" style={{ background: C.violet, color: "white" }}>Połącz</motion.button>
          </div>
          <div className="flex gap-1.5 mt-2">
            {a.interests.map((int, j) => <span key={j} className="px-2 py-0.5 rounded text-[9px]" style={{ background: C.neonBlue + "15", color: C.neonBlue }}>{int}</span>)}
          </div>
        </div>
      ))}
    </DemoSection>
  );
}
