import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PreviewShell, DemoNav, DemoSection, DemoBenefits, DemoFooterCTA } from "./PreviewShell";
import { Bot, Send, TrendingUp, Users, BarChart3, Zap, MessageCircle, Home, Target, BrainCircuit, CheckCircle2, ChevronRight, ArrowUpRight, Settings, Star, Shield } from "lucide-react";

const C = { navy: "#0A0E1A", dark: "#0F1425", violet: "#8B5CF6", blue: "#3B82F6", neon: "#00D4AA", white: "#F8FAFC", gray: "#64748B", green: "#10B981", red: "#EF4444", amber: "#F59E0B", light: "#F1F5F9", cyan: "#06B6D4" };

const chatMessages = [
  { role: "bot", text: "Cześć! Jestem AI Business Assistant. Pomogę Ci zoptymalizować procesy, odpowiem na pytania o produkty i zakwalifikuję zapytania. Jak mogę Ci pomóc?" },
  { role: "user", text: "Szukam systemu do zarządzania rezerwacjami dla mojego hotelu. Co możecie zaoferować?" },
  { role: "bot", text: "Świetnie! Dla hoteli oferujemy kompleksowy system rezerwacji z:\n\n• Booking engine z kalkulacją cen sezonowych\n• Panel zarządzania pokojami i dostępnością\n• Integracja z OTA (Booking.com, Airbnb)\n• Portal gościa z self check-in\n\nNa podstawie rozmiaru obiektu i potrzeb, mogę przygotować wstępną wycenę. Ile pokoi ma Twój hotel?" },
  { role: "user", text: "32 pokoje, boutique hotel w Krakowie. Potrzebujemy też integracji z systemem płatności." },
  { role: "bot", text: "Doskonale! Dla boutique hotelu 32 pokoi rekomendowałbym pakiet Premium. Wstępna wycena:\n\n📋 Zakres: Booking + Panel + Płatności + Portal gościa\n💰 Szacunek: 28 000 - 35 000 zł\n⏱ Realizacja: 6-8 tygodni\n\nMogę przekierować Cię do konsultanta, który omówi szczegóły. Chcesz umówić rozmowę?" },
];

const leadScoring = [
  { name: "Hotel Krakow — booking system", score: 92, budget: "28-35K", status: "hot", source: "AI Chat" },
  { name: "Salon Beauty — rezerwacje", score: 78, budget: "12-18K", status: "warm", source: "Formularz" },
  { name: "Restauracja — menu online", score: 65, budget: "8-12K", status: "warm", source: "AI Chat" },
  { name: "Kancelaria — landing page", score: 45, budget: "5-8K", status: "cool", source: "E-mail" },
  { name: "Startup — MVP aplikacji", score: 88, budget: "40-60K", status: "hot", source: "AI Chat" },
];

const scoreColors: Record<string, { bg: string; fg: string; label: string }> = {
  hot: { bg: C.red + "15", fg: C.red, label: "🔥 Gorący" },
  warm: { bg: C.amber + "15", fg: C.amber, label: "☀️ Ciepły" },
  cool: { bg: C.blue + "15", fg: C.blue, label: "❄️ Chłodny" },
};

export function AiDemo({ name }: { name: string; features: string[] }) {
  const [page, setPage] = useState("home");
  const tabs = [
    { id: "home", label: "Start", icon: <Home className="w-3 h-3" /> },
    { id: "chat", label: "AI Chat", icon: <MessageCircle className="w-3 h-3" /> },
    { id: "scoring", label: "Lead Scoring", icon: <Target className="w-3 h-3" /> },
    { id: "analytics", label: "Analityka", icon: <BarChart3 className="w-3 h-3" /> },
    { id: "settings", label: "Konfiguracja", icon: <Settings className="w-3 h-3" /> },
  ];

  return (
    <PreviewShell title={name}>
      <DemoNav tabs={tabs} activeTab={page} onTabChange={setPage} logo="AI Assistant" />
      <AnimatePresence mode="wait">
        <motion.div key={page} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
          {page === "home" && <HomePage onNav={setPage} />}
          {page === "chat" && <ChatPage />}
          {page === "scoring" && <ScoringPage />}
          {page === "analytics" && <AnalyticsPage />}
          {page === "settings" && <SettingsPage />}
        </motion.div>
      </AnimatePresence>
    </PreviewShell>
  );
}

function HomePage({ onNav }: { onNav: (p: string) => void }) {
  return (
    <div>
      <div className="p-8 pb-10" style={{ background: `linear-gradient(160deg, ${C.navy}, ${C.dark})` }}>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${C.violet}, ${C.neon})` }}>
            <BrainCircuit className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase" style={{ color: C.neon }}>AI-Powered</p>
            <h1 className="font-display font-bold text-2xl text-white">Business Assistant</h1>
          </div>
        </div>
        <p className="text-xs text-white/70 max-w-[280px] leading-relaxed">Inteligentny chatbot sprzedażowy z automatycznym scoringiem leadów. Kwalifikuje zapytania 24/7, zbiera konteksty i rekomenduje działania.</p>
        <div className="flex gap-3 mt-5">
          <motion.button whileHover={{ scale: 1.03 }} onClick={() => onNav("chat")}
            className="px-6 py-3 rounded-lg font-bold text-sm shadow-lg text-white" style={{ background: `linear-gradient(135deg, ${C.violet}, ${C.neon})` }}>Uruchom czat AI</motion.button>
          <button onClick={() => onNav("scoring")} className="px-6 py-3 rounded-lg font-semibold text-sm border border-white/20 text-white">Lead scoring</button>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-6">
          {[{ v: "24/7", l: "Dostępność" }, { v: "92%", l: "Trafność AI" }, { v: "3.2x", l: "Więcej leadów" }].map((s, i) => (
            <div key={i} className="p-2.5 rounded-lg text-center" style={{ background: "rgba(255,255,255,0.06)" }}>
              <span className="font-bold text-sm text-white block">{s.v}</span>
              <span className="text-[8px] text-white/40">{s.l}</span>
            </div>
          ))}
        </div>
      </div>

      <DemoSection>
        <div className="p-4 rounded-xl" style={{ background: `linear-gradient(135deg, ${C.navy}, ${C.dark})`, border: `1px solid ${C.violet}20` }}>
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4" style={{ color: C.neon }} />
            <span className="text-xs font-bold text-white">Jak to działa?</span>
          </div>
          <div className="space-y-2">
            {[
              { step: "1", title: "Klient pisze pytanie", desc: "AI rozumie kontekst i intencję" },
              { step: "2", title: "AI odpowiada inteligentnie", desc: "Rekomenduje rozwiązania z Twojej oferty" },
              { step: "3", title: "Automatyczny scoring", desc: "Ocena leada: budżet, pilność, dopasowanie" },
              { step: "4", title: "Powiadomienie do Ciebie", desc: "Gorące leady trafiają natychmiast na e-mail" },
            ].map((s, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0" style={{ background: C.violet + "30", color: C.violet }}>{s.step}</div>
                <div>
                  <span className="text-[10px] font-bold text-white block">{s.title}</span>
                  <span className="text-[9px] text-white/50">{s.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mt-2">
          <h3 className="font-bold text-sm" style={{ color: C.navy }}>Najnowsze leady</h3>
          <button onClick={() => onNav("scoring")} className="text-[10px] font-medium flex items-center gap-1" style={{ color: C.violet }}>Wszystkie <ChevronRight className="w-3 h-3" /></button>
        </div>
        {leadScoring.slice(0, 3).map((l, i) => {
          const sc = scoreColors[l.status];
          return (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl border" style={{ borderColor: C.light, background: C.white }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: `conic-gradient(${l.score > 80 ? C.green : l.score > 60 ? C.amber : C.blue} ${l.score}%, ${C.light} 0)` }}>
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ background: C.white, color: C.navy }}>{l.score}</div>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-semibold truncate" style={{ color: C.navy }}>{l.name}</h4>
                <p className="text-[10px]" style={{ color: C.gray }}>{l.budget} zł · {l.source}</p>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold shrink-0" style={{ background: sc.bg, color: sc.fg }}>{sc.label}</span>
            </div>
          );
        })}
      </DemoSection>

      <DemoBenefits accentColor={C.violet} bgColor={C.light} textColor={C.navy} benefits={[
        { icon: "🤖", title: "AI Chatbot", desc: "Rozmowy 24/7 bez udziału człowieka" },
        { icon: "🎯", title: "Lead scoring", desc: "Automatyczna ocena zapytań" },
        { icon: "📊", title: "Analityka rozmów", desc: "Raporty i wnioski z czatów" },
        { icon: "🔗", title: "Integracje", desc: "CRM, e-mail, Slack, kalendarz" },
      ]} />
      <DemoFooterCTA accentColor={C.violet} bgColor={C.navy} />
    </div>
  );
}

function ChatPage() {
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState(chatMessages);
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  return (
    <DemoSection>
      <div className="rounded-xl overflow-hidden border" style={{ borderColor: C.light }}>
        <div className="p-3 flex items-center gap-2" style={{ background: `linear-gradient(135deg, ${C.navy}, ${C.dark})` }}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${C.violet}, ${C.neon})` }}>
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="text-xs font-bold text-white">AI Business Assistant</span>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: C.neon }} />
              <span className="text-[9px] text-white/50">Online</span>
            </div>
          </div>
        </div>

        <div className="p-3 space-y-3 max-h-[380px] overflow-y-auto" style={{ background: C.white }}>
          {msgs.map((m, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[85%] p-3 rounded-xl text-xs leading-relaxed whitespace-pre-line ${m.role === "user" ? "rounded-br-sm" : "rounded-bl-sm"}`}
                style={m.role === "user" ? { background: C.violet, color: "white" } : { background: C.light, color: C.navy }}>
                {m.text}
              </div>
            </motion.div>
          ))}
          <div ref={bottomRef} />
        </div>

        <div className="p-3 flex gap-2" style={{ background: C.light, borderTop: `1px solid ${C.navy}10` }}>
          <input value={input} onChange={e => setInput(e.target.value)} placeholder="Napisz wiadomość..."
            className="flex-1 px-3 py-2.5 rounded-lg border text-xs" style={{ borderColor: C.navy + "15", background: C.white, color: C.navy }}
            onKeyDown={e => {
              if (e.key === "Enter" && input.trim()) {
                setMsgs(prev => [...prev, { role: "user", text: input }, { role: "bot", text: "Dziękuję za informację! Przeanalizuję Twoje potrzeby i przygotuję rekomendację. Czy mogę poprosić o adres e-mail, żebym mógł przesłać szczegółową ofertę?" }]);
                setInput("");
              }
            }} />
          <motion.button whileHover={{ scale: 1.05 }} className="px-3 py-2.5 rounded-lg text-white"
            style={{ background: `linear-gradient(135deg, ${C.violet}, ${C.neon})` }}
            onClick={() => {
              if (input.trim()) {
                setMsgs(prev => [...prev, { role: "user", text: input }, { role: "bot", text: "Dziękuję! Analizuję Twoje zapytanie i przygotuję odpowiedź. Tymczasem, jeśli chcesz, mogę od razu umówić rozmowę z konsultantem." }]);
                setInput("");
              }
            }}>
            <Send className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </DemoSection>
  );
}

function ScoringPage() {
  return (
    <DemoSection>
      <h3 className="font-bold text-sm" style={{ color: C.navy }}>Lead Scoring — AI</h3>
      <p className="text-xs" style={{ color: C.gray }}>Automatycznie ocenione zapytania z ostatnich 7 dni</p>
      <div className="space-y-3 mt-2">
        {leadScoring.map((l, i) => {
          const sc = scoreColors[l.status];
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              className="p-4 rounded-xl border hover:shadow-sm transition-all cursor-pointer" style={{ borderColor: C.light, background: C.white }}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center relative" style={{ background: C.light }}>
                  <svg className="absolute inset-0" viewBox="0 0 48 48">
                    <circle cx="24" cy="24" r="20" fill="none" stroke={C.light} strokeWidth="3" />
                    <circle cx="24" cy="24" r="20" fill="none" stroke={l.score > 80 ? C.green : l.score > 60 ? C.amber : C.blue} strokeWidth="3"
                      strokeDasharray={`${l.score * 1.256} 999`} strokeLinecap="round" transform="rotate(-90 24 24)" />
                  </svg>
                  <span className="text-xs font-bold relative" style={{ color: C.navy }}>{l.score}</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-xs font-bold" style={{ color: C.navy }}>{l.name}</h4>
                  <p className="text-[10px]" style={{ color: C.gray }}>Budżet: {l.budget} zł · Źródło: {l.source}</p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[9px] font-bold shrink-0" style={{ background: sc.bg, color: sc.fg }}>{sc.label}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </DemoSection>
  );
}

function AnalyticsPage() {
  return (
    <DemoSection>
      <h3 className="font-bold text-sm" style={{ color: C.navy }}>Analityka AI</h3>
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Rozmów/tydzień", val: "142", change: "+28%", color: C.violet },
          { label: "Konwersja do leada", val: "34%", change: "+5%", color: C.green },
          { label: "Avg. scoring", val: "72", change: "+8", color: C.amber },
          { label: "Czas odpowiedzi", val: "1.2s", change: "-0.3s", color: C.cyan },
        ].map((k, i) => (
          <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.08 }}
            className="p-3 rounded-xl border" style={{ borderColor: C.light, background: C.white }}>
            <span className="text-[9px] uppercase font-bold" style={{ color: C.gray }}>{k.label}</span>
            <span className="font-bold text-lg block mt-1" style={{ color: k.color }}>{k.val}</span>
            <span className="text-[10px] font-medium" style={{ color: C.green }}>{k.change}</span>
          </motion.div>
        ))}
      </div>

      <div className="p-4 rounded-xl mt-2" style={{ background: C.light }}>
        <p className="text-[10px] font-bold uppercase mb-2" style={{ color: C.gray }}>Najczęstsze pytania</p>
        {[
          { q: "System rezerwacji", count: 34 },
          { q: "Ceny i wyceny", count: 28 },
          { q: "Integracja z istniejącym systemem", count: 22 },
          { q: "Czas realizacji projektu", count: 18 },
          { q: "Portfolio i referencje", count: 15 },
        ].map((q, i) => (
          <div key={i} className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] flex-1" style={{ color: C.navy }}>{q.q}</span>
            <div className="w-20 h-1.5 rounded-full" style={{ background: C.navy + "10" }}>
              <div className="h-full rounded-full" style={{ width: `${(q.count / 34) * 100}%`, background: C.violet }} />
            </div>
            <span className="text-[10px] font-bold w-6 text-right" style={{ color: C.navy }}>{q.count}</span>
          </div>
        ))}
      </div>
    </DemoSection>
  );
}

function SettingsPage() {
  return (
    <DemoSection>
      <h3 className="font-bold text-sm" style={{ color: C.navy }}>Konfiguracja AI</h3>
      {[
        { label: "Ton odpowiedzi", value: "Profesjonalny, przyjazny" },
        { label: "Baza wiedzy", value: "12 dokumentów · 48 stron" },
        { label: "Auto-scoring", value: "Włączony" },
        { label: "Powiadomienia", value: "E-mail + Slack (score > 70)" },
        { label: "Model AI", value: "GPT-4o · temperatura 0.7" },
        { label: "Język", value: "Polski / English" },
      ].map((s, i) => (
        <div key={i} className="flex items-center justify-between p-3.5 rounded-xl border" style={{ borderColor: C.light, background: C.white }}>
          <span className="text-sm font-medium" style={{ color: C.navy }}>{s.label}</span>
          <span className="text-xs font-medium" style={{ color: C.violet }}>{s.value}</span>
        </div>
      ))}
      <div className="p-4 rounded-xl" style={{ background: `linear-gradient(135deg, ${C.violet}08, ${C.neon.replace("00D4AA", "059669")}08)`, border: `1px solid ${C.violet}15` }}>
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4" style={{ color: C.violet }} />
          <span className="text-xs font-bold" style={{ color: C.navy }}>Bezpieczeństwo</span>
        </div>
        <p className="text-[10px] mt-1" style={{ color: C.gray }}>Wszystkie rozmowy są szyfrowane. Dane osobowe automatycznie anonimizowane. Zgodność z RODO.</p>
      </div>
    </DemoSection>
  );
}
