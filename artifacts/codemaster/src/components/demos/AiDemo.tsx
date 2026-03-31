import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PreviewShell, DemoBenefits, DemoFooterCTA } from "./PreviewShell";
import { Bot, Send, TrendingUp, Users, BarChart3, Zap, MessageCircle, Target, BrainCircuit, CheckCircle2, ChevronRight, Settings, Shield } from "lucide-react";

const C = { navy: "#0A0E1A", dark: "#0F1425", violet: "#8B5CF6", blue: "#3B82F6", neon: "#00D4AA", white: "#F8FAFC", gray: "#64748B", green: "#10B981", red: "#EF4444", amber: "#F59E0B", light: "#F1F5F9", cyan: "#06B6D4" };

type AiPage = "home" | "workspace" | "analytics" | "settings";

const chatMessages = [
  { role: "bot" as const, text: "Cześć! Jestem Asystentem AI dla biznesu. Pomogę Ci zoptymalizować procesy, odpowiem na pytania o produkty i zakwalifikuję zapytania. Jak mogę Ci pomóc?" },
  { role: "user" as const, text: "Szukam systemu do zarządzania rezerwacjami dla mojego hotelu. Co możecie zaoferować?" },
  { role: "bot" as const, text: "Świetnie! Dla hoteli oferujemy kompleksowy system rezerwacji z:\n\n• Booking engine z kalkulacją cen sezonowych\n• Panel zarządzania pokojami i dostępnością\n• Integracja z OTA (Booking.com, Airbnb)\n• Portal gościa z self check-in\n\nNa podstawie rozmiaru obiektu i potrzeb, mogę przygotować wstępną wycenę. Ile pokoi ma Twój hotel?" },
  { role: "user" as const, text: "32 pokoje, boutique hotel w Krakowie. Potrzebujemy też integracji z systemem płatności." },
  { role: "bot" as const, text: "Doskonale! Dla boutique hotelu 32 pokoi rekomendowałbym pakiet Premium. Wstępna wycena:\n\n📋 Zakres: Booking + Panel + Płatności + Portal gościa\n💰 Szacunek: 28 000 - 35 000 zł\n⏱ Realizacja: 6-8 tygodni\n\nMogę przekierować Cię do konsultanta, który omówi szczegóły. Chcesz umówić rozmowę?" },
];

const leadScoring = [
  { name: "Hotel Kraków — system rezerwacji", score: 92, budget: "28-35K", status: "hot" as const, source: "AI Chat", tags: ["rezerwacje", "płatności", "hotel"] },
  { name: "Salon Beauty — rezerwacje", score: 78, budget: "12-18K", status: "warm" as const, source: "Formularz", tags: ["rezerwacje", "uroda"] },
  { name: "Restauracja — menu online", score: 65, budget: "8-12K", status: "warm" as const, source: "AI Chat", tags: ["gastro", "menu", "QR"] },
  { name: "Kancelaria — strona www", score: 45, budget: "5-8K", status: "cool" as const, source: "E-mail", tags: ["strona", "prawnik"] },
  { name: "Startup — MVP aplikacji", score: 88, budget: "40-60K", status: "hot" as const, source: "AI Chat", tags: ["MVP", "startup", "mobilna"] },
];

const scoreColors: Record<string, { bg: string; fg: string; label: string }> = {
  hot: { bg: C.red + "15", fg: C.red, label: "🔥 Gorący" },
  warm: { bg: C.amber + "15", fg: C.amber, label: "☀️ Ciepły" },
  cool: { bg: C.blue + "15", fg: C.blue, label: "❄️ Chłodny" },
};

export function AiDemo({ name }: { name: string; features: string[] }) {
  const [page, setPage] = useState<AiPage>("home");

  return (
    <PreviewShell title={name}>
      <div style={{ background: C.navy, minHeight: 540 }}>
        <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: `1px solid ${C.dark}` }}>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${C.violet}, ${C.neon})` }}>
              <BrainCircuit className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-sm text-white">AI <span style={{ color: C.neon }}>Assistant</span></span>
          </div>
          <div className="flex gap-1">
            {([
              { id: "home" as AiPage, label: "Start" },
              { id: "workspace" as AiPage, label: "Panel roboczy" },
              { id: "analytics" as AiPage, label: "Analityka" },
              { id: "settings" as AiPage, label: "Konfiguracja" },
            ]).map(t => (
              <button key={t.id} onClick={() => setPage(t.id)}
                className="px-3 py-1.5 rounded-lg text-[10px] font-medium transition-all"
                style={page === t.id ? { background: C.violet + "30", color: C.violet } : { color: C.gray }}>{t.label}</button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={page} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            {page === "home" && <HomePage onNav={setPage} />}
            {page === "workspace" && <WorkspacePage />}
            {page === "analytics" && <AnalyticsPage />}
            {page === "settings" && <SettingsPage />}
          </motion.div>
        </AnimatePresence>
      </div>

      <DemoBenefits accentColor={C.violet} bgColor={C.dark} textColor={C.white} benefits={[
        { icon: "🤖", title: "Chatbot AI", desc: "Rozmowy 24/7 bez udziału człowieka" },
        { icon: "🎯", title: "Scoring leadów", desc: "Automatyczna ocena zapytań" },
        { icon: "📊", title: "Analityka rozmów", desc: "Raporty i wnioski z czatów" },
        { icon: "🔗", title: "Integracje", desc: "CRM, e-mail, Slack, kalendarz" },
      ]} />
      <DemoFooterCTA accentColor={C.violet} bgColor={C.navy} />
    </PreviewShell>
  );
}

function HomePage({ onNav }: { onNav: (p: AiPage) => void }) {
  return (
    <div>
      <div className="p-6 pb-8" style={{ background: `linear-gradient(160deg, ${C.navy}, ${C.dark})` }}>
        <p className="text-[10px] tracking-[0.3em] uppercase" style={{ color: C.neon }}>Platforma napędzana AI</p>
        <h1 className="font-bold text-2xl text-white mt-1">Inteligentny <span style={{ color: C.violet }}>asystent</span> sprzedaży</h1>
        <p className="text-xs text-white/50 mt-2 max-w-[300px] leading-relaxed">Chatbot AI z automatycznym scoringiem leadów. Kwalifikuje zapytania 24/7, zbiera konteksty i rekomenduje działania.</p>
        <div className="flex gap-3 mt-5">
          <motion.button whileHover={{ scale: 1.03 }} onClick={() => onNav("workspace")}
            className="px-6 py-3 rounded-lg font-bold text-sm text-white" style={{ background: `linear-gradient(135deg, ${C.violet}, ${C.neon})` }}>Otwórz panel</motion.button>
          <button onClick={() => onNav("analytics")} className="px-6 py-3 rounded-lg text-sm border border-white/20 text-white">Analityka</button>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-5">
          {[{ v: "24/7", l: "Dostępność" }, { v: "92%", l: "Trafność AI" }, { v: "3.2x", l: "Więcej leadów" }].map((s, i) => (
            <div key={i} className="p-2.5 rounded-lg text-center" style={{ background: "rgba(255,255,255,0.05)" }}>
              <span className="font-bold text-sm text-white block">{s.v}</span>
              <span className="text-[8px] text-white/40">{s.l}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="p-4 rounded-xl" style={{ background: C.dark, border: `1px solid ${C.violet}15` }}>
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

        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-white">Najnowsze leady</h3>
          <button onClick={() => onNav("workspace")} className="text-[10px] font-medium flex items-center gap-1" style={{ color: C.violet }}>Panel roboczy <ChevronRight className="w-3 h-3" /></button>
        </div>
        {leadScoring.slice(0, 3).map((l, i) => {
          const sc = scoreColors[l.status];
          return (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: C.dark, border: `1px solid ${C.navy}` }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold relative" style={{ background: C.navy }}>
                <svg className="absolute inset-0" viewBox="0 0 40 40">
                  <circle cx="20" cy="20" r="17" fill="none" stroke={C.dark} strokeWidth="2.5" />
                  <circle cx="20" cy="20" r="17" fill="none" stroke={l.score > 80 ? C.green : l.score > 60 ? C.amber : C.blue} strokeWidth="2.5"
                    strokeDasharray={`${l.score * 1.07} 999`} strokeLinecap="round" transform="rotate(-90 20 20)" />
                </svg>
                <span className="relative text-[10px] font-bold text-white">{l.score}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-semibold truncate text-white">{l.name}</h4>
                <p className="text-[10px]" style={{ color: C.gray }}>{l.budget} zł · {l.source}</p>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold shrink-0" style={{ background: sc.bg, color: sc.fg }}>{sc.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function WorkspacePage() {
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState(chatMessages);
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, typing]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    setMsgs(prev => [...prev, { role: "user", text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs(prev => [...prev, { role: "bot", text: "Dziękuję za informację! Przeanalizuję Twoje potrzeby i przygotuję rekomendację. Czy mogę poprosić o adres e-mail, żebym mógł przesłać szczegółową ofertę?" }]);
    }, 1500);
  };

  return (
    <div className="flex" style={{ height: 460 }}>
      <div className="flex-[6] flex flex-col" style={{ borderRight: `1px solid ${C.dark}` }}>
        <div className="p-3 flex items-center gap-2" style={{ borderBottom: `1px solid ${C.dark}` }}>
          <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${C.violet}, ${C.neon})` }}>
            <Bot className="w-3.5 h-3.5 text-white" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-white">Asystent biznesowy AI</span>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: C.neon }} />
              <span className="text-[8px]" style={{ color: C.gray }}>Aktywny · GPT-4o</span>
            </div>
          </div>
        </div>

        <div className="flex-1 p-3 space-y-2.5 overflow-y-auto" style={{ background: C.navy }}>
          {msgs.map((m, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[85%] p-2.5 rounded-xl text-[10px] leading-relaxed whitespace-pre-line ${m.role === "user" ? "rounded-br-sm" : "rounded-bl-sm"}`}
                style={m.role === "user" ? { background: C.violet, color: "white" } : { background: C.dark, color: C.white }}>
                {m.text}
              </div>
            </motion.div>
          ))}
          {typing && (
            <div className="flex justify-start">
              <div className="px-4 py-2.5 rounded-xl rounded-bl-sm" style={{ background: C.dark }}>
                <div className="flex gap-1">
                  {[0, 1, 2].map(i => (
                    <motion.div key={i} animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }}
                      className="w-1.5 h-1.5 rounded-full" style={{ background: C.violet }} />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="p-3 flex gap-2" style={{ background: C.dark, borderTop: `1px solid ${C.navy}` }}>
          <input value={input} onChange={e => setInput(e.target.value)} placeholder="Napisz wiadomość..."
            className="flex-1 px-3 py-2 rounded-lg text-[10px] outline-none" style={{ background: C.navy, color: C.white, border: `1px solid ${C.navy}` }}
            onKeyDown={e => { if (e.key === "Enter") sendMessage(input); }} />
          <motion.button whileHover={{ scale: 1.05 }} className="px-3 py-2 rounded-lg text-white"
            style={{ background: `linear-gradient(135deg, ${C.violet}, ${C.neon})` }}
            onClick={() => sendMessage(input)}>
            <Send className="w-3.5 h-3.5" />
          </motion.button>
        </div>
      </div>

      <div className="flex-[4] flex flex-col overflow-y-auto p-3 space-y-3" style={{ background: C.dark }}>
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4" style={{ color: C.violet }} />
          <span className="text-[10px] font-bold uppercase text-white">Scoring leadów</span>
        </div>

        {leadScoring.map((l, i) => {
          const sc = scoreColors[l.status];
          return (
            <motion.div key={i} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
              className="p-3 rounded-xl" style={{ background: C.navy }}>
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-8 h-8 rounded-full flex items-center justify-center relative" style={{ background: C.dark }}>
                  <svg className="absolute inset-0" viewBox="0 0 32 32">
                    <circle cx="16" cy="16" r="13" fill="none" stroke={C.dark} strokeWidth="2" />
                    <circle cx="16" cy="16" r="13" fill="none" stroke={l.score > 80 ? C.green : l.score > 60 ? C.amber : C.blue} strokeWidth="2"
                      strokeDasharray={`${l.score * 0.82} 999`} strokeLinecap="round" transform="rotate(-90 16 16)" />
                  </svg>
                  <span className="relative text-[8px] font-bold text-white">{l.score}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-[9px] font-bold truncate text-white">{l.name}</h4>
                  <p className="text-[8px]" style={{ color: C.gray }}>{l.budget} zł</p>
                </div>
                <span className="px-1.5 py-0.5 rounded-full text-[7px] font-bold" style={{ background: sc.bg, color: sc.fg }}>{sc.label}</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {l.tags.map((tag, j) => (
                  <span key={j} className="px-1.5 py-0.5 rounded text-[7px]" style={{ background: C.violet + "15", color: C.violet }}>{tag}</span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function AnalyticsPage() {
  return (
    <div className="p-4 space-y-3">
      <h3 className="font-bold text-sm text-white">Analityka AI</h3>
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Rozmów/tydzień", val: "142", change: "+28%", color: C.violet },
          { label: "Konwersja do leada", val: "34%", change: "+5%", color: C.green },
          { label: "Śr. scoring", val: "72", change: "+8", color: C.amber },
          { label: "Czas odpowiedzi", val: "1.2s", change: "-0.3s", color: C.cyan },
        ].map((k, i) => (
          <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.08 }}
            className="p-3 rounded-xl" style={{ background: C.dark }}>
            <span className="text-[9px] uppercase font-bold" style={{ color: C.gray }}>{k.label}</span>
            <span className="font-bold text-lg block mt-1" style={{ color: k.color }}>{k.val}</span>
            <span className="text-[10px] font-medium" style={{ color: C.green }}>{k.change}</span>
          </motion.div>
        ))}
      </div>

      <div className="p-4 rounded-xl" style={{ background: C.dark }}>
        <p className="text-[10px] font-bold uppercase mb-2" style={{ color: C.gray }}>Najczęstsze pytania</p>
        {[
          { q: "System rezerwacji", count: 34 },
          { q: "Ceny i wyceny", count: 28 },
          { q: "Integracja z istniejącym systemem", count: 22 },
          { q: "Czas realizacji projektu", count: 18 },
          { q: "Portfolio i referencje", count: 15 },
        ].map((q, i) => (
          <div key={i} className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] flex-1 text-white">{q.q}</span>
            <div className="w-20 h-1.5 rounded-full" style={{ background: C.navy }}>
              <div className="h-full rounded-full" style={{ width: `${(q.count / 34) * 100}%`, background: C.violet }} />
            </div>
            <span className="text-[10px] font-bold w-6 text-right text-white">{q.count}</span>
          </div>
        ))}
      </div>

      <div className="p-4 rounded-xl" style={{ background: C.dark }}>
        <p className="text-[10px] font-bold uppercase mb-2" style={{ color: C.gray }}>Analiza konwersacji</p>
        <div className="flex flex-wrap gap-1.5">
          {[
            { tag: "Rezerwacje", count: 34, c: C.violet },
            { tag: "Płatności", count: 22, c: C.blue },
            { tag: "Integracja API", count: 18, c: C.neon },
            { tag: "Aplikacja mobilna", count: 15, c: C.cyan },
            { tag: "Sklep online", count: 12, c: C.amber },
            { tag: "Panel zarządzania", count: 10, c: C.green },
            { tag: "Sztuczna inteligencja", count: 8, c: C.red },
          ].map((t, i) => (
            <span key={i} className="px-2 py-1 rounded-lg text-[9px] font-medium" style={{ background: t.c + "15", color: t.c }}>{t.tag} ({t.count})</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function SettingsPage() {
  return (
    <div className="p-4 space-y-3">
      <h3 className="font-bold text-sm text-white">Konfiguracja AI</h3>
      {[
        { label: "Ton odpowiedzi", value: "Profesjonalny, przyjazny" },
        { label: "Baza wiedzy", value: "12 dokumentów · 48 stron" },
        { label: "Auto-scoring", value: "Włączony" },
        { label: "Powiadomienia", value: "E-mail + Slack (score > 70)" },
        { label: "Model AI", value: "GPT-4o · temperatura 0.7" },
        { label: "Język", value: "Polski / English" },
      ].map((s, i) => (
        <div key={i} className="flex items-center justify-between p-3.5 rounded-xl" style={{ background: C.dark }}>
          <span className="text-xs font-medium text-white">{s.label}</span>
          <span className="text-[10px] font-medium" style={{ color: C.violet }}>{s.value}</span>
        </div>
      ))}
      <div className="p-4 rounded-xl" style={{ background: C.violet + "08", border: `1px solid ${C.violet}15` }}>
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4" style={{ color: C.violet }} />
          <span className="text-xs font-bold text-white">Bezpieczeństwo</span>
        </div>
        <p className="text-[10px] mt-1" style={{ color: C.gray }}>Wszystkie rozmowy są szyfrowane. Dane osobowe automatycznie anonimizowane. Zgodność z RODO.</p>
      </div>
    </div>
  );
}
