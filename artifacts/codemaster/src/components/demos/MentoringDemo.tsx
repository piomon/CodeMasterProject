import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PreviewShell, DemoNav, DemoSection } from "./PreviewShell";
import { Users, Calendar, Star, Clock, Video, CheckCircle2, Crown, MessageCircle, Target, Home, Award, CreditCard } from "lucide-react";

const C = { black: "#0A0A0A", violet: "#7C3AED", gold: "#C9A96E", beige: "#F5E6D3", graphite: "#2D2D2D", gray: "#9CA3AF", cream: "#FFF8F0" };

const mentors = [
  { name: "Marta Zielińska", title: "CTO @ ScaleUp", exp: "15 lat w IT", rating: 5.0, sessions: 320, price: 450, areas: ["Leadership", "Architektura", "Skalowanie"] },
  { name: "Kamil Borowski", title: "VP Product @ FinTech", exp: "12 lat product", rating: 4.9, sessions: 180, price: 380, areas: ["Product Strategy", "OKR", "Roadmapping"] },
  { name: "Ewa Jankowska", title: "Head of Marketing", exp: "10 lat growth", rating: 4.9, sessions: 240, price: 320, areas: ["Growth Hacking", "Content", "Brand"] },
];

const memberships: { name: string; price: string; features: string[]; color: string; popular?: boolean }[] = [
  { name: "Starter", price: "99 zł/mies.", features: ["1 sesja / miesiąc", "Materiały podstawowe", "Grupa na Slack"], color: C.gray },
  { name: "Premium", price: "299 zł/mies.", features: ["4 sesje / miesiąc", "Pełne materiały", "Priorytetowy dostęp", "Nagrania sesji"], color: C.violet, popular: true },
  { name: "VIP", price: "599 zł/mies.", features: ["Nielimitowane sesje", "Dedykowany mentor", "Warsztaty 1:1", "Certyfikat"], color: C.gold },
];

export function MentoringDemo({ name }: { name: string; features: string[]; industry?: string }) {
  const [page, setPage] = useState("home");
  const tabs = [
    { id: "home", label: "Start", icon: <Home className="w-3 h-3" /> },
    { id: "mentors", label: "Mentorzy", icon: <Users className="w-3 h-3" /> },
    { id: "session", label: "Sesja 1:1", icon: <Video className="w-3 h-3" /> },
    { id: "membership", label: "Karnet", icon: <Crown className="w-3 h-3" /> },
    { id: "progress", label: "Postępy", icon: <Target className="w-3 h-3" /> },
  ];

  return (
    <PreviewShell title={name}>
      <DemoNav tabs={tabs} activeTab={page} onTabChange={setPage} logo="MentorPro" />
      <AnimatePresence mode="wait">
        <motion.div key={page} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
          {page === "home" && <HomePage onNav={setPage} />}
          {page === "mentors" && <MentorsPage onNav={setPage} />}
          {page === "session" && <SessionPage />}
          {page === "membership" && <MembershipPage />}
          {page === "progress" && <ProgressPage />}
        </motion.div>
      </AnimatePresence>
    </PreviewShell>
  );
}

function HomePage({ onNav }: { onNav: (p: string) => void }) {
  return (
    <div>
      <div className="p-10 text-center" style={{ background: `linear-gradient(160deg, ${C.black}, ${C.violet}40)` }}>
        <p className="text-[10px] tracking-[0.4em] uppercase" style={{ color: C.gold }}>Platforma Mentoringowa</p>
        <h1 className="font-display font-bold text-4xl mt-2" style={{ color: C.cream }}>Mentor<span style={{ color: C.gold }}>Pro</span></h1>
        <p className="text-xs mt-2 max-w-[260px] mx-auto leading-relaxed" style={{ color: C.cream + "80" }}>Sesje 1:1 z najlepszymi ekspertami. Leadership, product, marketing — rozwijaj się z topowymi mentorami.</p>
        <div className="flex gap-3 justify-center mt-6">
          <motion.button whileHover={{ scale: 1.03 }} onClick={() => onNav("mentors")}
            className="px-7 py-3.5 rounded-lg font-bold text-sm shadow-lg" style={{ background: `linear-gradient(135deg, ${C.violet}, ${C.gold})`, color: C.cream }}>Znajdź mentora</motion.button>
          <button onClick={() => onNav("membership")} className="px-7 py-3.5 rounded-lg font-semibold text-sm border" style={{ borderColor: C.gold + "40", color: C.gold }}>Karnety</button>
        </div>
      </div>
      <DemoSection>
        <div className="grid grid-cols-4 gap-2">
          {[
            { icon: "👨‍🏫", label: "50+ mentorów", desc: "Eksperci" },
            { icon: "🎥", label: "Online", desc: "Video 1:1" },
            { icon: "📋", label: "Plan", desc: "Rozwoju" },
            { icon: "🏆", label: "Certyfikat", desc: "Po kursie" },
          ].map((f, i) => (
            <div key={i} className="p-3 rounded-xl text-center" style={{ background: C.graphite }}>
              <span className="text-lg block">{f.icon}</span>
              <span className="text-[8px] font-bold block mt-1" style={{ color: C.cream }}>{f.label}</span>
              <span className="text-[7px]" style={{ color: C.gray }}>{f.desc}</span>
            </div>
          ))}
        </div>
        <h4 className="font-bold text-sm mt-4" style={{ color: C.cream }}>Top mentorzy</h4>
        {mentors.slice(0, 2).map((m, i) => (
          <div key={i} className="p-4 rounded-xl border cursor-pointer" style={{ borderColor: C.graphite, background: C.black }} onClick={() => onNav("mentors")}>
            <div className="flex gap-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm" style={{ background: `linear-gradient(135deg, ${C.violet}, ${C.gold})`, color: C.cream }}>
                {m.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-sm" style={{ color: C.cream }}>{m.name}</h4>
                <p className="text-[10px]" style={{ color: C.gold }}>{m.title}</p>
                <div className="flex items-center gap-1 mt-0.5"><Star className="w-3 h-3" style={{ fill: C.gold, color: C.gold }} /><span className="text-[10px]" style={{ color: C.gray }}>{m.rating} ({m.sessions})</span></div>
              </div>
              <span className="font-bold text-sm" style={{ color: C.gold }}>{m.price} zł</span>
            </div>
          </div>
        ))}
        <div className="p-4 rounded-2xl mt-3" style={{ background: C.graphite, border: `1px solid ${C.violet}20` }}>
          <p className="text-[10px] tracking-[0.2em] uppercase text-center" style={{ color: C.violet }}>Opinie uczestników</p>
          <p className="text-xs mt-2 text-center italic" style={{ color: C.cream + "90" }}>"Sesje z Martą kompletnie zmieniły moje podejście do leadership. Najlepsza inwestycja w rozwój."</p>
          <p className="text-[10px] text-center mt-1" style={{ color: C.gold }}>— Paweł K. ★★★★★</p>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-3">
          {[{ v: "50+", l: "Mentorów" },{ v: "2,400+", l: "Sesji" },{ v: "4.9", l: "Ocena" }].map((s, i) => (
            <div key={i} className="p-3 rounded-xl text-center" style={{ background: C.graphite }}>
              <span className="font-bold text-sm block" style={{ color: C.gold }}>{s.v}</span>
              <span className="text-[9px]" style={{ color: C.gray }}>{s.l}</span>
            </div>
          ))}
        </div>
      </DemoSection>
      <DemoBenefits accentColor={C.violet} bgColor={C.black} textColor={C.cream} benefits={[
        { icon: "👨‍🏫", title: "Sesje 1:1", desc: "Kalendarz i booking mentora" },
        { icon: "🏆", title: "Ekskluzywność", desc: "Prywatny klub premium" },
        { icon: "📚", title: "Biblioteka wiedzy", desc: "Materiały, nagrania, case studies" },
        { icon: "📊", title: "Plan rozwoju", desc: "Śledzenie postępów i celów" },
      ]} />
      <DemoFooterCTA accentColor={C.violet} bgColor={C.black} />
    </div>
  );
}

function MentorsPage({ onNav }: { onNav: (p: string) => void }) {
  return (
    <DemoSection>
      <h3 className="font-bold text-sm" style={{ color: C.cream }}>Nasi mentorzy</h3>
      {mentors.map((m, i) => (
        <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
          className="p-5 rounded-xl border" style={{ borderColor: C.graphite, background: C.black }}>
          <div className="flex gap-4">
            <div className="w-16 h-16 rounded-xl flex items-center justify-center font-bold" style={{ background: `linear-gradient(135deg, ${C.violet}, ${C.gold})`, color: C.cream }}>
              {m.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-base" style={{ color: C.cream }}>{m.name}</h4>
              <p className="text-xs" style={{ color: C.gold }}>{m.title}</p>
              <p className="text-[10px]" style={{ color: C.gray }}>{m.exp}</p>
              <div className="flex gap-1.5 mt-2 flex-wrap">
                {m.areas.map((a, j) => <span key={j} className="px-2 py-0.5 rounded text-[9px]" style={{ background: C.violet + "20", color: C.violet }}>{a}</span>)}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4 pt-3 border-t" style={{ borderColor: C.graphite }}>
            <div><span className="font-bold text-lg" style={{ color: C.gold }}>{m.price} zł</span><span className="text-[10px]" style={{ color: C.gray }}>/sesja</span></div>
            <motion.button whileHover={{ scale: 1.03 }} onClick={() => onNav("session")}
              className="px-5 py-2 rounded-lg font-semibold text-sm" style={{ background: `linear-gradient(135deg, ${C.violet}, ${C.gold})`, color: C.cream }}>Umów sesję</motion.button>
          </div>
        </motion.div>
      ))}
    </DemoSection>
  );
}

function SessionPage() {
  const [booked, setBooked] = useState(false);
  const slots = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];
  if (booked) return (
    <DemoSection>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
        <Video className="w-12 h-12 mx-auto mb-3" style={{ color: C.violet }} />
        <h3 className="font-bold text-lg" style={{ color: C.cream }}>Sesja zarezerwowana!</h3>
        <p className="text-sm mt-1" style={{ color: C.gray }}>Marta Zielińska • Śr 26 mar, 14:00</p>
        <p className="text-xs mt-2 font-medium" style={{ color: C.gold }}>Link do spotkania zostanie wysłany mailem</p>
      </motion.div>
    </DemoSection>
  );
  return (
    <DemoSection>
      <h3 className="font-bold text-sm" style={{ color: C.cream }}>Zarezerwuj sesję 1:1</h3>
      <div className="p-3 rounded-xl border flex items-center gap-3" style={{ borderColor: C.graphite, background: C.black }}>
        <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm" style={{ background: `linear-gradient(135deg, ${C.violet}, ${C.gold})`, color: C.cream }}>MZ</div>
        <div><span className="text-sm font-bold" style={{ color: C.cream }}>Marta Zielińska</span><p className="text-[10px]" style={{ color: C.gold }}>CTO @ ScaleUp</p></div>
      </div>
      <h4 className="text-xs font-bold" style={{ color: C.cream }}>Wybierz termin:</h4>
      <div className="grid grid-cols-3 gap-2">
        {slots.map(s => (
          <button key={s} onClick={() => setBooked(true)} className="py-3 rounded-lg text-sm font-medium" style={{ background: C.graphite, color: C.cream }}>{s}</button>
        ))}
      </div>
      <div className="p-3 rounded-xl" style={{ background: C.violet + "10" }}>
        <div className="flex items-center gap-2"><Video className="w-4 h-4" style={{ color: C.violet }} /><span className="text-xs" style={{ color: C.cream }}>Sesja online (45 min) • <span className="font-bold" style={{ color: C.gold }}>450 zł</span></span></div>
      </div>
    </DemoSection>
  );
}

function MembershipPage() {
  return (
    <DemoSection>
      <h3 className="font-bold text-sm" style={{ color: C.cream }}>Plany członkostwa</h3>
      <div className="space-y-3">
        {memberships.map((m, i) => (
          <div key={i} className="p-5 rounded-xl border relative" style={{ borderColor: m.popular ? C.violet : C.graphite, background: C.black }}>
            {m.popular && <span className="absolute -top-2 right-4 px-2 py-0.5 rounded text-[9px] font-bold text-white" style={{ background: C.violet }}>Najpopularniejszy</span>}
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-lg" style={{ color: C.cream }}>{m.name}</h4>
              <span className="font-bold text-lg" style={{ color: m.color }}>{m.price}</span>
            </div>
            <div className="space-y-1.5">
              {m.features.map((f, j) => (
                <div key={j} className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5" style={{ color: m.color }} /><span className="text-xs" style={{ color: C.cream }}>{f}</span></div>
              ))}
            </div>
            <motion.button whileHover={{ scale: 1.02 }} className="w-full mt-4 py-3 rounded-lg font-semibold text-sm"
              style={m.popular ? { background: `linear-gradient(135deg, ${C.violet}, ${C.gold})`, color: C.cream } : { border: `1px solid ${m.color}`, color: m.color }}>Wybierz plan</motion.button>
          </div>
        ))}
      </div>
    </DemoSection>
  );
}

function ProgressPage() {
  const goals = [
    { name: "Ukończyć 10 sesji", progress: 70, current: 7, target: 10 },
    { name: "Wdrożyć plan rozwoju", progress: 40, current: 2, target: 5 },
    { name: "Certyfikat Leadership", progress: 20, current: 1, target: 5 },
  ];
  return (
    <DemoSection>
      <h3 className="font-bold text-sm" style={{ color: C.cream }}>Twoje postępy</h3>
      <div className="grid grid-cols-3 gap-3 mb-3">
        {[{ l: "Sesje", v: "7" },{ l: "Godziny", v: "5.2h" },{ l: "Cele", v: "1/3" }].map((s, i) => (
          <div key={i} className="p-3 rounded-xl text-center" style={{ background: C.graphite }}>
            <span className="font-bold text-sm block" style={{ color: C.gold }}>{s.v}</span>
            <span className="text-[9px]" style={{ color: C.gray }}>{s.l}</span>
          </div>
        ))}
      </div>
      {goals.map((g, i) => (
        <div key={i} className="p-4 rounded-xl border" style={{ borderColor: C.graphite, background: C.black }}>
          <div className="flex justify-between mb-1">
            <span className="text-xs font-medium" style={{ color: C.cream }}>{g.name}</span>
            <span className="text-[10px] font-bold" style={{ color: C.violet }}>{g.current}/{g.target}</span>
          </div>
          <div className="w-full h-2 rounded-full" style={{ background: C.graphite }}>
            <div className="h-full rounded-full" style={{ width: `${g.progress}%`, background: `linear-gradient(to right, ${C.violet}, ${C.gold})` }} />
          </div>
        </div>
      ))}
    </DemoSection>
  );
}
