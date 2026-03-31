import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PreviewShell, DemoBenefits, DemoFooterCTA } from "./PreviewShell";
import { Users, Calendar, Star, Clock, Video, CheckCircle2, Crown, Target, Award, Lock, Search, ArrowLeft, MessageCircle } from "lucide-react";

const C = { coral: "#FF6B6B", cream: "#FFF9F0", peach: "#FFE8D6", dark: "#2D2B3D", navy: "#1A1A2E", white: "#FFFFFF", gray: "#8B8B9E", green: "#10B981", violet: "#8B5CF6", blue: "#3B82F6", amber: "#F59E0B", text: "#3D3B50", warm: "#FFF5EE" };

type MentorPage = "home" | "mentors" | "plans" | "sessions" | "dashboard" | "profile";
type MentorSpecialty = "all" | "tech" | "design" | "data" | "business";

const mentors = [
  { name: "Piotr Montewka", title: "CEO & Tech Lead", specialty: "Architektura systemów, AI, Fullstack", rating: 5.0, sessions: 240, price: 450, avatar: "PM", available: true, category: "tech" as const, reviews: [{ author: "Tomasz W.", text: "Sesje zmieniły moje podejście do architektury.", rating: 5 }, { author: "Anna K.", text: "Fantastyczny mentor, konkretna wiedza.", rating: 5 }] },
  { name: "Anna Wiśniewska", title: "Senior UX Designer", specialty: "UI/UX Design, Design Systems, Figma", rating: 4.9, sessions: 180, price: 350, avatar: "AW", available: true, category: "design" as const, reviews: [{ author: "Marek L.", text: "Pomogła mi zbudować portfolio UX.", rating: 5 }, { author: "Ewa S.", text: "Świetne sesje o design systems.", rating: 4 }] },
  { name: "Marek Kowalski", title: "Data Science Lead", specialty: "Machine Learning, Python, Analytics", rating: 4.8, sessions: 120, price: 400, avatar: "MK", available: false, category: "data" as const, reviews: [{ author: "Kasia P.", text: "Profesjonalne podejście do ML.", rating: 5 }] },
  { name: "Ewa Lewandowska", title: "Product Manager", specialty: "Strategia produktu, Agile, Roadmapping", rating: 4.7, sessions: 90, price: 300, avatar: "EL", available: true, category: "business" as const, reviews: [{ author: "Jan N.", text: "Pomogła mi przejść z dev do PM.", rating: 5 }] },
];

const plans = [
  { name: "Starter", price: 199, period: "/mies.", features: ["2 sesje 1:1 miesięcznie", "Dostęp do materiałów", "Czat z mentorem", "Nagrania sesji"], color: C.blue, popular: false },
  { name: "Premium", price: 499, period: "/mies.", features: ["6 sesji 1:1 miesięcznie", "Priorytetowy dostęp", "Code review", "Ścieżka kariery", "Certyfikat ukończenia"], color: C.coral, popular: true },
  { name: "Enterprise", price: 1299, period: "/mies.", features: ["Nielimitowane sesje", "Dedykowany mentor", "Zespołowe warsztaty", "Audyt projektu", "Wsparcie 24/7"], color: C.violet, popular: false },
];

const upcomingSessions = [
  { mentor: "Piotr Montewka", topic: "Architektura mikrousług w Node.js", date: "2 kwi 2026", time: "14:00", duration: "60 min", type: "1:1" as const },
  { mentor: "Anna Wiśniewska", topic: "Design System — budowa od zera", date: "4 kwi 2026", time: "10:00", duration: "45 min", type: "1:1" as const },
  { mentor: "Piotr Montewka", topic: "Warsztat: CI/CD Pipeline", date: "8 kwi 2026", time: "16:00", duration: "90 min", type: "workshop" as const },
];

const resources = [
  { title: "Wzorce architektoniczne — e-book", icon: "📖", type: "PDF" },
  { title: "Sesja #22 — Nagranie video", icon: "🎥", type: "Video" },
  { title: "Roadmapa kariery — szablon", icon: "📋", type: "Template" },
  { title: "Code review checklist", icon: "✅", type: "Checklist" },
];

const navItems: { id: MentorPage; label: string; icon: ReactNode }[] = [
  { id: "home", label: "Start", icon: <Crown className="w-3.5 h-3.5" /> },
  { id: "mentors", label: "Mentorzy", icon: <Users className="w-3.5 h-3.5" /> },
  { id: "plans", label: "Plany", icon: <Award className="w-3.5 h-3.5" /> },
  { id: "sessions", label: "Sesje", icon: <Video className="w-3.5 h-3.5" /> },
  { id: "dashboard", label: "Postępy", icon: <Target className="w-3.5 h-3.5" /> },
];

export function MentoringDemo({ name }: { name: string; features: string[] }) {
  const [page, setPage] = useState<MentorPage>("home");
  const [profileIdx, setProfileIdx] = useState(0);

  const goToProfile = (idx: number) => { setProfileIdx(idx); setPage("profile"); };

  return (
    <PreviewShell title={name}>
      <div style={{ background: C.cream, minHeight: 540 }}>
        <div className="flex items-center justify-between px-5 py-3" style={{ background: C.white, borderBottom: `2px solid ${C.coral}` }}>
          <div className="flex items-center gap-2">
            <Crown className="w-5 h-5" style={{ color: C.coral }} />
            <h1 className="font-bold text-sm" style={{ color: C.dark }}>Mentor<span style={{ color: C.coral }}>Hub</span></h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 rounded-full text-[9px] font-bold text-white" style={{ background: `linear-gradient(135deg, ${C.coral}, ${C.violet})` }}>Zostań Mentorem</button>
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-[8px] font-bold text-white" style={{ background: `linear-gradient(135deg, ${C.coral}, ${C.violet})` }}>TW</div>
          </div>
        </div>

        <div className="flex gap-0 overflow-x-auto px-2 py-1.5" style={{ background: C.white }}>
          {navItems.map(n => (
            <button key={n.id} onClick={() => setPage(n.id)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-semibold whitespace-nowrap transition-all"
              style={(page === n.id || (page === "profile" && n.id === "mentors")) ? { background: C.coral, color: C.white } : { color: C.gray }}>
              {n.icon}<span>{n.label}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={page} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            {page === "home" && <HomePage onNav={setPage} onProfile={goToProfile} />}
            {page === "mentors" && <MentorsPage onProfile={goToProfile} />}
            {page === "profile" && <ProfilePage mentor={mentors[profileIdx]} onBack={() => setPage("mentors")} />}
            {page === "plans" && <PlansPage />}
            {page === "sessions" && <SessionsPage />}
            {page === "dashboard" && <DashboardPage />}
          </motion.div>
        </AnimatePresence>
      </div>

      <DemoBenefits accentColor={C.coral} bgColor={C.peach} textColor={C.dark} benefits={[
        { icon: "🎯", title: "Indywidualny plan", desc: "Ścieżka dopasowana do celów" },
        { icon: "🎥", title: "Sesje video 1:1", desc: "Nagrywane na żywo do rewizji" },
        { icon: "💬", title: "Czat z mentorem", desc: "Wsparcie między sesjami" },
        { icon: "🏅", title: "Certyfikat", desc: "Potwierdzenie ukończenia ścieżki" },
      ]} />
      <DemoFooterCTA accentColor={C.coral} bgColor={C.dark} />
    </PreviewShell>
  );
}

function HomePage({ onNav, onProfile }: { onNav: (p: MentorPage) => void; onProfile: (i: number) => void }) {
  return (
    <div>
      <div className="p-6 pb-8" style={{ background: `linear-gradient(160deg, ${C.coral}, ${C.violet})` }}>
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/60">Premium Mentoring</p>
        <h2 className="font-bold text-2xl mt-1 text-white">Rozwijaj się z <span style={{ color: C.cream }}>ekspertami</span></h2>
        <p className="text-xs mt-2 text-white/80 max-w-[280px] leading-relaxed">Indywidualne sesje z najlepszymi. Rozwijaj umiejętności, buduj karierę, osiągaj cele szybciej.</p>
        <div className="flex gap-3 mt-4">
          <motion.button whileHover={{ scale: 1.03 }} onClick={() => onNav("mentors")}
            className="px-5 py-2.5 rounded-full font-bold text-sm shadow-lg" style={{ background: C.white, color: C.coral }}>Znajdź mentora</motion.button>
          <button onClick={() => onNav("plans")} className="px-5 py-2.5 rounded-full font-semibold text-sm border border-white/30 text-white">Plany</button>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-5">
          {[{ v: "50+", l: "Ekspertów" }, { v: "2 400+", l: "Sesji" }, { v: "4.9", l: "Avg. ocena" }].map((s, i) => (
            <div key={i} className="p-2 rounded-xl text-center" style={{ background: "rgba(255,255,255,0.15)" }}>
              <span className="font-bold text-sm text-white block">{s.v}</span>
              <span className="text-[8px] text-white/50">{s.l}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-3">
        <span className="text-xs font-bold" style={{ color: C.dark }}>Najlepsi mentorzy</span>
        {mentors.slice(0, 2).map((m, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
            onClick={() => onProfile(i)} className="flex gap-3 p-3 rounded-2xl hover:shadow-sm transition-all cursor-pointer" style={{ background: C.white }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
              style={{ background: `linear-gradient(135deg, ${i === 0 ? C.coral : C.violet}, ${C.dark})` }}>{m.avatar}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="text-xs font-bold" style={{ color: C.dark }}>{m.name}</h4>
                {m.available && <div className="w-2 h-2 rounded-full" style={{ background: C.green }} />}
              </div>
              <p className="text-[10px]" style={{ color: C.gray }}>{m.title}</p>
              <div className="flex items-center gap-3 mt-1">
                <span className="flex items-center gap-0.5 text-[10px] font-medium" style={{ color: C.amber }}><Star className="w-3 h-3 fill-current" />{m.rating}</span>
                <span className="text-[10px]" style={{ color: C.gray }}>{m.sessions} sesji</span>
                <span className="ml-auto font-bold text-xs" style={{ color: C.coral }}>{m.price} zł/h</span>
              </div>
            </div>
          </motion.div>
        ))}

        <div className="p-4 rounded-2xl" style={{ background: `linear-gradient(135deg, ${C.coral}10, ${C.violet}08)`, border: `1px solid ${C.coral}20` }}>
          <p className="text-[10px] tracking-widest uppercase text-center" style={{ color: C.coral }}>Opinie uczestników</p>
          <p className="text-xs mt-2 text-center italic" style={{ color: C.text }}>"Sesje z Piotrem zmieniły moje podejście do architektury. W 3 miesiące awansowałem na Tech Leada."</p>
          <p className="text-[10px] text-center mt-1" style={{ color: C.coral }}>— Tomasz W. ★★★★★</p>
        </div>
      </div>
    </div>
  );
}

function MentorsPage({ onProfile }: { onProfile: (i: number) => void }) {
  const [filter, setFilter] = useState<MentorSpecialty>("all");
  const [query, setQuery] = useState("");
  const filtered = mentors.filter(m => {
    if (filter !== "all" && m.category !== filter) return false;
    if (query && !m.name.toLowerCase().includes(query.toLowerCase()) && !m.specialty.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="p-4 space-y-3">
      <span className="text-xs font-bold" style={{ color: C.dark }}>Znajdź mentora</span>
      <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: C.white, border: `1px solid ${C.coral}20` }}>
        <Search className="w-4 h-4" style={{ color: C.gray }} />
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Szukaj po nazwisku lub specjalizacji..." className="flex-1 text-[11px] bg-transparent outline-none" style={{ color: C.text }} />
      </div>
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {([["all", "Wszyscy"], ["tech", "Technologia"], ["design", "Design"], ["data", "Data/AI"], ["business", "Biznes"]] as [MentorSpecialty, string][]).map(([id, l]) => (
          <button key={id} onClick={() => setFilter(id)} className="px-3 py-1.5 rounded-full text-[10px] font-medium whitespace-nowrap transition-all"
            style={filter === id ? { background: C.coral, color: C.white } : { background: C.white, color: C.gray }}>{l}</button>
        ))}
      </div>

      {filtered.map((m, i) => {
        const realIdx = mentors.indexOf(m);
        return (
          <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
            onClick={() => onProfile(realIdx)} className="p-4 rounded-2xl hover:shadow-md transition-all cursor-pointer" style={{ background: C.white }}>
            <div className="flex gap-3">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-bold text-white shrink-0"
                style={{ background: `linear-gradient(135deg, ${[C.coral, C.violet, C.blue, C.green][i % 4]}, ${C.dark})` }}>{m.avatar}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm" style={{ color: C.dark }}>{m.name}</h4>
                  <div className="w-2 h-2 rounded-full" style={{ background: m.available ? C.green : C.gray }} />
                </div>
                <p className="text-[10px] font-medium" style={{ color: C.gray }}>{m.title}</p>
                <p className="text-[10px] mt-0.5" style={{ color: C.gray }}>{m.specialty}</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3 pt-3" style={{ borderTop: `1px solid ${C.peach}` }}>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-0.5 text-[10px] font-medium" style={{ color: C.amber }}><Star className="w-3 h-3 fill-current" />{m.rating}</span>
                <span className="text-[10px]" style={{ color: C.gray }}>{m.sessions} sesji</span>
              </div>
              <span className="font-bold text-sm" style={{ color: C.coral }}>{m.price} zł/h</span>
            </div>
          </motion.div>
        );
      })}
      {filtered.length === 0 && <p className="text-center text-[10px] py-4" style={{ color: C.gray }}>Brak mentorów pasujących do kryteriów</p>}
    </div>
  );
}

function ProfilePage({ mentor, onBack }: { mentor: typeof mentors[0]; onBack: () => void }) {
  const [selectedDay, setSelectedDay] = useState(2);
  const days = ["Pon 31", "Wt 1", "Śr 2", "Czw 3", "Pt 4"];
  const slots = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];

  return (
    <div className="p-4 space-y-3">
      <button onClick={onBack} className="flex items-center gap-1 text-[10px] font-semibold" style={{ color: C.coral }}><ArrowLeft className="w-3 h-3" /> Wszyscy mentorzy</button>

      <div className="p-4 rounded-2xl" style={{ background: C.white }}>
        <div className="flex gap-3 items-center">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold text-white" style={{ background: `linear-gradient(135deg, ${C.coral}, ${C.dark})` }}>{mentor.avatar}</div>
          <div>
            <h3 className="font-bold text-sm" style={{ color: C.dark }}>{mentor.name}</h3>
            <p className="text-[10px]" style={{ color: C.gray }}>{mentor.title}</p>
            <p className="text-[10px]" style={{ color: C.gray }}>{mentor.specialty}</p>
            <div className="flex items-center gap-3 mt-1">
              <span className="flex items-center gap-0.5 text-[10px] font-medium" style={{ color: C.amber }}><Star className="w-3 h-3 fill-current" />{mentor.rating}</span>
              <span className="text-[10px]" style={{ color: C.gray }}>{mentor.sessions} sesji</span>
              <span className="font-bold text-xs" style={{ color: C.coral }}>{mentor.price} zł/h</span>
            </div>
          </div>
        </div>
      </div>

      <span className="text-[10px] font-bold" style={{ color: C.dark }}>Dostępne terminy</span>
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {days.map((d, i) => (
          <button key={i} onClick={() => setSelectedDay(i)} className="px-3 py-1.5 rounded-lg text-[10px] font-medium whitespace-nowrap"
            style={selectedDay === i ? { background: C.coral, color: C.white } : { background: C.white, color: C.gray }}>{d}</button>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {slots.map((s, i) => (
          <button key={i} className="p-2 rounded-lg text-[10px] font-medium text-center" style={{ background: i === 1 ? C.coral + "15" : C.white, color: i === 1 ? C.coral : C.text, border: `1px solid ${i === 1 ? C.coral + "40" : C.peach}` }}>{s}</button>
        ))}
      </div>
      <button className="w-full py-2.5 rounded-full text-xs font-bold text-white" style={{ background: C.coral }}>Umów sesję — {mentor.price} zł/h</button>

      <span className="text-[10px] font-bold" style={{ color: C.dark }}>Opinie ({mentor.reviews.length})</span>
      {mentor.reviews.map((r, i) => (
        <div key={i} className="p-3 rounded-xl" style={{ background: C.white }}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-semibold" style={{ color: C.dark }}>{r.author}</span>
            <span className="text-[10px]" style={{ color: C.amber }}>{"★".repeat(r.rating)}</span>
          </div>
          <p className="text-[10px] italic" style={{ color: C.gray }}>"{r.text}"</p>
        </div>
      ))}
    </div>
  );
}

function PlansPage() {
  return (
    <div className="p-4 space-y-3">
      <h3 className="font-bold text-sm text-center" style={{ color: C.dark }}>Wybierz swój plan</h3>
      <p className="text-[10px] text-center" style={{ color: C.gray }}>Elastyczne plany dopasowane do Twoich potrzeb</p>
      {plans.map((p, i) => (
        <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
          className="p-4 rounded-2xl relative" style={{ background: C.white, border: p.popular ? `2px solid ${C.coral}` : `1px solid ${C.peach}` }}>
          {p.popular && <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[8px] font-bold text-white" style={{ background: C.coral }}>Najpopularniejszy</div>}
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="font-bold text-sm" style={{ color: C.dark }}>{p.name}</h4>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="font-bold text-2xl" style={{ color: p.color }}>{p.price} zł</span>
                <span className="text-[10px]" style={{ color: C.gray }}>{p.period}</span>
              </div>
            </div>
            <Crown className="w-6 h-6" style={{ color: p.color }} />
          </div>
          <div className="space-y-1.5">
            {p.features.map((f, j) => (
              <div key={j} className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: C.green }} />
                <span className="text-[10px]" style={{ color: C.text }}>{f}</span>
              </div>
            ))}
          </div>
          <motion.button whileHover={{ scale: 1.02 }}
            className="w-full mt-4 py-2.5 rounded-full text-xs font-bold text-white" style={{ background: p.popular ? C.coral : p.color }}>Wybierz {p.name}</motion.button>
        </motion.div>
      ))}
    </div>
  );
}

function SessionsPage() {
  return (
    <div className="p-4 space-y-3">
      <span className="text-xs font-bold" style={{ color: C.dark }}>Nadchodzące sesje</span>
      {upcomingSessions.map((s, i) => (
        <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
          className="p-4 rounded-2xl" style={{ background: C.white }}>
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-bold text-xs" style={{ color: C.dark }}>{s.topic}</h4>
            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold" style={{ background: s.type === "1:1" ? C.coral + "15" : C.violet + "15", color: s.type === "1:1" ? C.coral : C.violet }}>{s.type === "1:1" ? "1:1" : "Warsztat"}</span>
          </div>
          <p className="text-[10px]" style={{ color: C.gray }}>Mentor: {s.mentor}</p>
          <div className="flex items-center gap-3 mt-2">
            <span className="flex items-center gap-1 text-[10px]" style={{ color: C.text }}><Calendar className="w-3 h-3" />{s.date}</span>
            <span className="flex items-center gap-1 text-[10px]" style={{ color: C.text }}><Clock className="w-3 h-3" />{s.time}</span>
            <span className="text-[10px]" style={{ color: C.gray }}>{s.duration}</span>
          </div>
          <div className="flex gap-2 mt-3">
            <button className="px-4 py-2 rounded-full text-[10px] font-bold text-white flex items-center gap-1" style={{ background: C.green }}>
              <Video className="w-3 h-3" /> Dołącz do sesji
            </button>
            <button className="px-4 py-2 rounded-full text-[10px] font-medium" style={{ background: C.peach, color: C.dark }}>Przełóż</button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function DashboardPage() {
  return (
    <div className="p-4 space-y-3">
      <span className="text-xs font-bold" style={{ color: C.dark }}>Twój dashboard</span>
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Odbyte sesje", val: "24", color: C.green },
          { label: "Godziny nauki", val: "36h", color: C.blue },
          { label: "Aktywny plan", val: "Premium", color: C.coral },
          { label: "Następna sesja", val: "2 kwi", color: C.violet },
        ].map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.06 }}
            className="p-3 rounded-2xl" style={{ background: C.white }}>
            <span className="text-[9px] uppercase font-bold" style={{ color: C.gray }}>{s.label}</span>
            <span className="font-bold text-lg block mt-1" style={{ color: s.color }}>{s.val}</span>
          </motion.div>
        ))}
      </div>

      <span className="text-xs font-bold" style={{ color: C.dark }}>Aktywne mentorships</span>
      {mentors.slice(0, 2).map((m, i) => (
        <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: C.white }}>
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-[9px] font-bold text-white" style={{ background: `linear-gradient(135deg, ${[C.coral, C.violet][i]}, ${C.dark})` }}>{m.avatar}</div>
          <div className="flex-1">
            <span className="text-[10px] font-bold" style={{ color: C.dark }}>{m.name}</span>
            <p className="text-[9px]" style={{ color: C.gray }}>{m.specialty.split(",")[0]}</p>
          </div>
          <MessageCircle className="w-4 h-4" style={{ color: C.coral }} />
        </div>
      ))}

      <span className="text-xs font-bold" style={{ color: C.dark }}>Biblioteka materiałów</span>
      <div className="grid grid-cols-2 gap-2">
        {resources.map((r, i) => (
          <div key={i} className="p-2.5 rounded-xl cursor-pointer hover:shadow-sm" style={{ background: C.white }}>
            <span className="text-lg block">{r.icon}</span>
            <span className="text-[9px] font-semibold block mt-1" style={{ color: C.dark }}>{r.title}</span>
            <span className="text-[8px]" style={{ color: C.gray }}>{r.type}</span>
          </div>
        ))}
      </div>

      <span className="text-xs font-bold" style={{ color: C.dark }}>Ścieżka rozwoju</span>
      <div className="space-y-0">
        {[
          { title: "Podstawy architektury", status: "done" as const, progress: 100 },
          { title: "Design Patterns w praktyce", status: "done" as const, progress: 100 },
          { title: "Mikrousługi i API Gateway", status: "current" as const, progress: 60 },
          { title: "DevOps i CI/CD", status: "locked" as const, progress: 0 },
          { title: "Projekt końcowy", status: "locked" as const, progress: 0 },
        ].map((step, i) => (
          <div key={i} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full flex items-center justify-center border-2"
                style={step.status === "done" ? { background: C.green, borderColor: C.green } : step.status === "current" ? { borderColor: C.coral, background: C.coral + "15" } : { borderColor: C.gray + "30" }}>
                {step.status === "done" ? <CheckCircle2 className="w-4 h-4 text-white" /> : step.status === "locked" ? <Lock className="w-3 h-3" style={{ color: C.gray }} /> :
                  <span className="text-xs font-bold" style={{ color: C.coral }}>{i + 1}</span>}
              </div>
              {i < 4 && <div className="w-0.5 h-6" style={{ background: step.status === "done" ? C.green : C.gray + "20" }} />}
            </div>
            <div className="pb-3 flex-1">
              <span className="text-xs font-semibold" style={{ color: step.status === "locked" ? C.gray : C.dark }}>{step.title}</span>
              {step.status === "current" && (
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-1.5 rounded-full" style={{ background: C.peach }}>
                    <div className="h-full rounded-full" style={{ width: `${step.progress}%`, background: `linear-gradient(to right, ${C.coral}, ${C.violet})` }} />
                  </div>
                  <span className="text-[9px] font-bold" style={{ color: C.coral }}>{step.progress}%</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
