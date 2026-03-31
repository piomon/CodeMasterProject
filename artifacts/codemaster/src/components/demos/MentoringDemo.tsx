import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PreviewShell, DemoNav, DemoSection, DemoBenefits, DemoFooterCTA } from "./PreviewShell";
import { Users, Calendar, Star, Clock, Video, CheckCircle2, Crown, MessageCircle, Target, Home, Award, CreditCard, ChevronRight, Lock, Zap, Shield } from "lucide-react";

const C = { navy: "#0F172A", dark: "#1A1A2E", gold: "#D4A853", amber: "#F59E0B", white: "#F8FAFC", gray: "#64748B", green: "#10B981", violet: "#8B5CF6", blue: "#3B82F6", light: "#F1F5F9", red: "#EF4444" };

const mentors = [
  { name: "Piotr Montewka", title: "CEO & Tech Lead", specialty: "Architektura systemów, AI, Fullstack", rating: 5.0, sessions: 240, price: 450, avatar: "PM", available: true },
  { name: "Anna Wiśniewska", title: "Senior UX Designer", specialty: "UI/UX Design, Design Systems, Figma", rating: 4.9, sessions: 180, price: 350, avatar: "AW", available: true },
  { name: "Marek Kowalski", title: "Data Science Lead", specialty: "Machine Learning, Python, Analytics", rating: 4.8, sessions: 120, price: 400, avatar: "MK", available: false },
];

const plans = [
  { name: "Starter", price: 199, period: "/mies.", features: ["2 sesje 1:1 miesięcznie", "Dostęp do materiałów", "Czat z mentorem", "Nagrania sesji"], color: C.blue, popular: false },
  { name: "Premium", price: 499, period: "/mies.", features: ["6 sesji 1:1 miesięcznie", "Priorytetowy dostęp", "Code review", "Ścieżka kariery", "Certyfikat ukończenia"], color: C.gold, popular: true },
  { name: "Enterprise", price: 1299, period: "/mies.", features: ["Nielimitowane sesje", "Dedykowany mentor", "Zespołowe warsztaty", "Audyt projektu", "Wsparcie 24/7"], color: C.violet, popular: false },
];

const upcomingSessions = [
  { mentor: "Piotr Montewka", topic: "Architektura mikrousług w Node.js", date: "2 kwi 2026", time: "14:00", duration: "60 min", type: "1:1" },
  { mentor: "Anna Wiśniewska", topic: "Design System — budowa od zera", date: "4 kwi 2026", time: "10:00", duration: "45 min", type: "1:1" },
  { mentor: "Piotr Montewka", topic: "Warsztat: CI/CD Pipeline", date: "8 kwi 2026", time: "16:00", duration: "90 min", type: "workshop" },
];

export function MentoringDemo({ name }: { name: string; features: string[] }) {
  const [page, setPage] = useState("home");
  const tabs = [
    { id: "home", label: "Start", icon: <Home className="w-3 h-3" /> },
    { id: "mentors", label: "Mentorzy", icon: <Users className="w-3 h-3" /> },
    { id: "plans", label: "Plany", icon: <Crown className="w-3 h-3" /> },
    { id: "sessions", label: "Sesje", icon: <Video className="w-3 h-3" /> },
    { id: "dashboard", label: "Dashboard", icon: <Target className="w-3 h-3" /> },
  ];

  return (
    <PreviewShell title={name}>
      <DemoNav tabs={tabs} activeTab={page} onTabChange={setPage} logo="MentorHub" />
      <AnimatePresence mode="wait">
        <motion.div key={page} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
          {page === "home" && <HomePage onNav={setPage} />}
          {page === "mentors" && <MentorsPage />}
          {page === "plans" && <PlansPage />}
          {page === "sessions" && <SessionsPage />}
          {page === "dashboard" && <DashboardPage />}
        </motion.div>
      </AnimatePresence>
    </PreviewShell>
  );
}

function HomePage({ onNav }: { onNav: (p: string) => void }) {
  return (
    <div>
      <div className="p-8 pb-10" style={{ background: `linear-gradient(160deg, ${C.navy}, ${C.dark})` }}>
        <p className="text-[10px] tracking-[0.4em] uppercase" style={{ color: C.gold }}>Premium Mentoring</p>
        <h1 className="font-display font-bold text-3xl mt-1 text-white">Mentor<span style={{ color: C.gold }}>Hub</span></h1>
        <p className="text-xs mt-2 text-white/70 max-w-[280px] leading-relaxed">Indywidualne sesje z ekspertami. Rozwijaj umiejętności, buduj karierę, osiągaj cele szybciej.</p>
        <div className="flex gap-3 mt-5">
          <motion.button whileHover={{ scale: 1.03 }} onClick={() => onNav("mentors")}
            className="px-6 py-3 rounded-lg font-bold text-sm shadow-lg text-white" style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.amber})` }}>Znajdź mentora</motion.button>
          <button onClick={() => onNav("plans")} className="px-6 py-3 rounded-lg font-semibold text-sm border border-white/20 text-white">Porównaj plany</button>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-6">
          {[{ v: "50+", l: "Ekspertów" }, { v: "2 400+", l: "Sesji" }, { v: "4.9", l: "Avg. ocena" }].map((s, i) => (
            <div key={i} className="p-2.5 rounded-lg text-center" style={{ background: "rgba(255,255,255,0.06)" }}>
              <span className="font-bold text-sm text-white block">{s.v}</span>
              <span className="text-[8px] text-white/40">{s.l}</span>
            </div>
          ))}
        </div>
      </div>

      <DemoSection>
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm" style={{ color: C.navy }}>Najlepsi mentorzy</h3>
          <button onClick={() => onNav("mentors")} className="text-[10px] font-medium flex items-center gap-1" style={{ color: C.gold }}>Wszyscy <ChevronRight className="w-3 h-3" /></button>
        </div>
        {mentors.slice(0, 2).map((m, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="flex gap-3 p-3 rounded-xl border hover:shadow-sm transition-all cursor-pointer" style={{ borderColor: C.light, background: C.white }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
              style={{ background: `linear-gradient(135deg, ${i === 0 ? C.gold : C.violet}, ${C.navy})` }}>{m.avatar}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="text-xs font-bold" style={{ color: C.navy }}>{m.name}</h4>
                {m.available && <div className="w-2 h-2 rounded-full" style={{ background: C.green }} />}
              </div>
              <p className="text-[10px]" style={{ color: C.gray }}>{m.title}</p>
              <p className="text-[9px] mt-0.5" style={{ color: C.gray }}>{m.specialty}</p>
              <div className="flex items-center gap-3 mt-1">
                <span className="flex items-center gap-0.5 text-[10px] font-medium" style={{ color: C.amber }}>
                  <Star className="w-3 h-3 fill-current" />{m.rating}
                </span>
                <span className="text-[10px]" style={{ color: C.gray }}>{m.sessions} sesji</span>
                <span className="ml-auto font-bold text-xs" style={{ color: C.gold }}>{m.price} zł/h</span>
              </div>
            </div>
          </motion.div>
        ))}

        <div className="p-4 rounded-xl" style={{ background: `linear-gradient(135deg, ${C.navy}, ${C.dark})` }}>
          <div className="flex items-center gap-2 mb-2">
            <Crown className="w-4 h-4" style={{ color: C.gold }} />
            <span className="text-xs font-bold text-white">Plan Premium</span>
            <span className="ml-auto px-2 py-0.5 rounded-full text-[8px] font-bold" style={{ background: C.gold + "20", color: C.gold }}>Najpopularniejszy</span>
          </div>
          <p className="text-[10px] text-white/60">6 sesji 1:1 miesięcznie, priorytetowy dostęp, code review i certyfikat ukończenia.</p>
          <div className="flex items-center gap-2 mt-3">
            <span className="font-bold text-lg text-white">499 zł</span>
            <span className="text-[10px] text-white/40">/miesiąc</span>
          </div>
          <motion.button whileHover={{ scale: 1.02 }} onClick={() => onNav("plans")}
            className="w-full mt-3 py-2.5 rounded-lg text-xs font-bold text-white" style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.amber})` }}>Wybierz plan →</motion.button>
        </div>

        <div className="p-4 rounded-xl" style={{ background: C.light, border: `1px solid ${C.gold}15` }}>
          <p className="text-[10px] tracking-[0.2em] uppercase text-center" style={{ color: C.gold }}>Opinie uczestników</p>
          <p className="text-xs mt-2 text-center italic" style={{ color: C.navy + "90" }}>"Sesje z Piotrem zmieniły moje podejście do architektury. W 3 miesiące awansowałem na Tech Leada."</p>
          <p className="text-[10px] text-center mt-1" style={{ color: C.gold }}>— Tomasz W. ★★★★★</p>
        </div>
      </DemoSection>

      <DemoBenefits accentColor={C.gold} bgColor={C.light} textColor={C.navy} benefits={[
        { icon: "🎯", title: "Indywidualny plan", desc: "Ścieżka dopasowana do celów" },
        { icon: "🎥", title: "Sesje video 1:1", desc: "Nagrywane na żywo do rewizji" },
        { icon: "💬", title: "Czat z mentorem", desc: "Wsparcie między sesjami" },
        { icon: "🏅", title: "Certyfikat", desc: "Potwierdzenie ukończenia ścieżki" },
      ]} />
      <DemoFooterCTA accentColor={C.gold} bgColor={C.navy} />
    </div>
  );
}

function MentorsPage() {
  return (
    <DemoSection>
      <h3 className="font-bold text-sm" style={{ color: C.navy }}>Nasi mentorzy</h3>
      <div className="space-y-3">
        {mentors.map((m, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="p-4 rounded-xl border hover:shadow-md transition-all cursor-pointer" style={{ borderColor: C.light, background: C.white }}>
            <div className="flex gap-3">
              <div className="w-16 h-16 rounded-xl flex items-center justify-center text-lg font-bold text-white shrink-0"
                style={{ background: `linear-gradient(135deg, ${[C.gold, C.violet, C.blue][i]}, ${C.navy})` }}>{m.avatar}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm" style={{ color: C.navy }}>{m.name}</h4>
                  <div className="w-2 h-2 rounded-full" style={{ background: m.available ? C.green : C.gray }} />
                  <span className="text-[9px]" style={{ color: m.available ? C.green : C.gray }}>{m.available ? "Dostępny" : "Zajęty"}</span>
                </div>
                <p className="text-[10px] font-medium" style={{ color: C.gray }}>{m.title}</p>
                <p className="text-[10px] mt-1" style={{ color: C.gray }}>{m.specialty}</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3 pt-3" style={{ borderTop: `1px solid ${C.light}` }}>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-0.5 text-[10px] font-medium" style={{ color: C.amber }}><Star className="w-3 h-3 fill-current" />{m.rating}</span>
                <span className="text-[10px]" style={{ color: C.gray }}>{m.sessions} sesji</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm" style={{ color: C.gold }}>{m.price} zł/h</span>
                <motion.button whileHover={{ scale: 1.02 }} className="px-3 py-1.5 rounded-lg text-[10px] font-bold text-white" style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.amber})` }}>Umów sesję</motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </DemoSection>
  );
}

function PlansPage() {
  return (
    <DemoSection>
      <h3 className="font-bold text-sm text-center" style={{ color: C.navy }}>Wybierz swój plan</h3>
      <p className="text-[10px] text-center" style={{ color: C.gray }}>Elastyczne plany dopasowane do Twoich potrzeb</p>
      <div className="space-y-3 mt-2">
        {plans.map((p, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="p-4 rounded-xl border relative" style={{ borderColor: p.popular ? C.gold + "40" : C.light, background: C.white }}>
            {p.popular && <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[8px] font-bold text-white" style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.amber})` }}>Najpopularniejszy</div>}
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-bold text-sm" style={{ color: C.navy }}>{p.name}</h4>
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
                  <span className="text-[10px]" style={{ color: C.navy }}>{f}</span>
                </div>
              ))}
            </div>
            <motion.button whileHover={{ scale: 1.02 }}
              className="w-full mt-4 py-2.5 rounded-lg text-xs font-bold text-white" style={{ background: p.popular ? `linear-gradient(135deg, ${C.gold}, ${C.amber})` : p.color }}>Wybierz {p.name}</motion.button>
          </motion.div>
        ))}
      </div>
    </DemoSection>
  );
}

function SessionsPage() {
  return (
    <DemoSection>
      <h3 className="font-bold text-sm" style={{ color: C.navy }}>Nadchodzące sesje</h3>
      <div className="space-y-3">
        {upcomingSessions.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="p-4 rounded-xl border hover:shadow-sm transition-all" style={{ borderColor: C.light, background: C.white }}>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-xs" style={{ color: C.navy }}>{s.topic}</h4>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold" style={{ background: s.type === "1:1" ? C.gold + "15" : C.violet + "15", color: s.type === "1:1" ? C.gold : C.violet }}>{s.type === "1:1" ? "1:1" : "Warsztat"}</span>
            </div>
            <p className="text-[10px]" style={{ color: C.gray }}>Mentor: {s.mentor}</p>
            <div className="flex items-center gap-3 mt-2">
              <span className="flex items-center gap-1 text-[10px]" style={{ color: C.navy }}><Calendar className="w-3 h-3" />{s.date}</span>
              <span className="flex items-center gap-1 text-[10px]" style={{ color: C.navy }}><Clock className="w-3 h-3" />{s.time}</span>
              <span className="text-[10px]" style={{ color: C.gray }}>{s.duration}</span>
            </div>
            <div className="flex gap-2 mt-3">
              <motion.button whileHover={{ scale: 1.02 }} className="px-4 py-2 rounded-lg text-[10px] font-bold text-white flex items-center gap-1" style={{ background: C.green }}>
                <Video className="w-3 h-3" /> Dołącz do sesji
              </motion.button>
              <button className="px-4 py-2 rounded-lg text-[10px] font-medium" style={{ background: C.light, color: C.navy }}>Przełóż</button>
            </div>
          </motion.div>
        ))}
      </div>
    </DemoSection>
  );
}

function DashboardPage() {
  return (
    <DemoSection>
      <h3 className="font-bold text-sm" style={{ color: C.navy }}>Twój dashboard</h3>
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Odbyte sesje", val: "24", color: C.green },
          { label: "Godziny nauki", val: "36h", color: C.blue },
          { label: "Aktywny plan", val: "Premium", color: C.gold },
          { label: "Następna sesja", val: "2 kwi", color: C.violet },
        ].map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.08 }}
            className="p-3 rounded-xl border" style={{ borderColor: C.light, background: C.white }}>
            <span className="text-[9px] uppercase font-bold" style={{ color: C.gray }}>{s.label}</span>
            <span className="font-bold text-lg block mt-1" style={{ color: s.color }}>{s.val}</span>
          </motion.div>
        ))}
      </div>

      <h4 className="font-bold text-sm mt-2" style={{ color: C.navy }}>Ścieżka rozwoju</h4>
      <div className="space-y-0">
        {[
          { title: "Podstawy architektury", status: "done", progress: 100 },
          { title: "Design Patterns w praktyce", status: "done", progress: 100 },
          { title: "Mikrousługi i API Gateway", status: "current", progress: 60 },
          { title: "DevOps i CI/CD", status: "locked", progress: 0 },
          { title: "Projekt końcowy", status: "locked", progress: 0 },
        ].map((step, i) => (
          <div key={i} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full flex items-center justify-center border-2"
                style={step.status === "done" ? { background: C.green, borderColor: C.green } : step.status === "current" ? { borderColor: C.gold, background: C.gold + "15" } : { borderColor: C.gray + "30" }}>
                {step.status === "done" ? <CheckCircle2 className="w-4 h-4 text-white" /> : step.status === "locked" ? <Lock className="w-3 h-3" style={{ color: C.gray }} /> :
                  <span className="text-xs font-bold" style={{ color: C.gold }}>{i + 1}</span>}
              </div>
              {i < 4 && <div className="w-0.5 h-6" style={{ background: step.status === "done" ? C.green : C.gray + "20" }} />}
            </div>
            <div className="pb-3 flex-1">
              <span className="text-xs font-semibold" style={{ color: step.status === "locked" ? C.gray : C.navy }}>{step.title}</span>
              {step.status === "current" && (
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-1.5 rounded-full" style={{ background: C.light }}>
                    <div className="h-full rounded-full" style={{ width: `${step.progress}%`, background: `linear-gradient(to right, ${C.gold}, ${C.amber})` }} />
                  </div>
                  <span className="text-[9px] font-bold" style={{ color: C.gold }}>{step.progress}%</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </DemoSection>
  );
}
