import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PreviewShell, DemoNav, DemoSection } from "./PreviewShell";
import { Bot, Send, TrendingUp, Users, BarChart3, Zap, MessageCircle, Home, Target, BrainCircuit, CheckCircle2 } from "lucide-react";

const C = { navy: "#0F172A", violet: "#8B5CF6", blue: "#3B82F6", graphite: "#1E293B", white: "#F8FAFC", gray: "#64748B", green: "#10B981", electric: "#06B6D4" };

const chatMessages: { role: string; text: string; scoring?: boolean }[] = [
  { role: "user", text: "Dzień dobry, szukam rozwiązania do automatyzacji sprzedaży B2B." },
  { role: "ai", text: "Witam! Na podstawie Twojego profilu widzę, że prowadzisz firmę SaaS z 50 pracownikami. Polecam nasz pakiet Enterprise z AI lead scoring. Czy mogę zadać kilka pytań, żeby dopasować ofertę?" },
  { role: "user", text: "Tak, jasne. Obecnie mamy 200 leadów miesięcznie." },
  { role: "ai", text: "Świetnie! Przy 200 leadach/mies. nasz AI może zwiększyć konwersję o 35%. Scoring w czasie rzeczywistym priorytetyzuje gorące leady. Szacowany ROI: 4.2x w 6 miesięcy.", scoring: true },
];

const leads = [
  { name: "TechCorp Sp. z o.o.", score: 92, value: "180K zł", status: "hot", stage: "Propozycja" },
  { name: "MedSolutions S.A.", score: 78, value: "120K zł", status: "warm", stage: "Demo" },
  { name: "LogiTrans", score: 65, value: "85K zł", status: "warm", stage: "Kontakt" },
  { name: "EcoGreen Startup", score: 45, value: "40K zł", status: "cold", stage: "Kwalifikacja" },
  { name: "FinData Partners", score: 88, value: "250K zł", status: "hot", stage: "Negocjacje" },
];

const aiFeatures = [
  { name: "Lead Scoring AI", desc: "Automatyczna ocena i priorytetyzacja leadów w czasie rzeczywistym", icon: Target },
  { name: "Chatbot konwersacyjny", desc: "AI-powered chatbot kwalifikujący leady 24/7", icon: MessageCircle },
  { name: "Predykcja konwersji", desc: "Prognozowanie prawdopodobieństwa zamknięcia dealu", icon: TrendingUp },
  { name: "Automatyzacja follow-up", desc: "Inteligentne sekwencje e-mail dopasowane do zachowania leada", icon: Zap },
];

export function AiDemo({ name }: { name: string; features: string[]; industry?: string }) {
  const [page, setPage] = useState("home");
  const tabs = [
    { id: "home", label: "Dashboard", icon: <Home className="w-3 h-3" /> },
    { id: "chat", label: "AI Chat", icon: <MessageCircle className="w-3 h-3" /> },
    { id: "leads", label: "Leady", icon: <Target className="w-3 h-3" /> },
    { id: "features", label: "Funkcje AI", icon: <BrainCircuit className="w-3 h-3" /> },
    { id: "analytics", label: "Analityka", icon: <BarChart3 className="w-3 h-3" /> },
  ];

  return (
    <PreviewShell title={name}>
      <DemoNav tabs={tabs} activeTab={page} onTabChange={setPage} logo="NexusAI" />
      <AnimatePresence mode="wait">
        <motion.div key={page} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
          {page === "home" && <HomePage onNav={setPage} />}
          {page === "chat" && <ChatPage />}
          {page === "leads" && <LeadsPage />}
          {page === "features" && <FeaturesPage />}
          {page === "analytics" && <AnalyticsPage />}
        </motion.div>
      </AnimatePresence>
    </PreviewShell>
  );
}

function HomePage({ onNav }: { onNav: (p: string) => void }) {
  return (
    <div>
      <div className="p-10 text-center" style={{ background: `linear-gradient(160deg, ${C.navy}, ${C.violet}40)` }}>
        <p className="text-[10px] tracking-[0.4em] uppercase" style={{ color: C.electric }}>AI-Powered Sales Platform</p>
        <h1 className="font-display font-bold text-4xl mt-2 text-white">Nexus<span style={{ color: C.electric }}>AI</span></h1>
        <p className="text-xs mt-2 max-w-[260px] mx-auto leading-relaxed text-white/80">Inteligentna platforma sprzedaży B2B. Lead scoring, chatbot AI, predykcja konwersji — wszystko zautomatyzowane.</p>
        <div className="flex gap-3 justify-center mt-6">
          <motion.button whileHover={{ scale: 1.03 }} onClick={() => onNav("leads")}
            className="px-7 py-3.5 rounded-lg font-bold text-sm shadow-lg" style={{ background: `linear-gradient(135deg, ${C.violet}, ${C.electric})`, color: "white" }}>Leady AI</motion.button>
          <button onClick={() => onNav("chat")} className="px-7 py-3.5 rounded-lg font-semibold text-sm border border-white/20 text-white">AI Chat</button>
        </div>
      </div>
      <DemoSection>
        <div className="grid grid-cols-4 gap-2">
          {[
            { icon: "🤖", label: "Lead Scoring", desc: "AI real-time" },
            { icon: "💬", label: "Chatbot", desc: "24/7" },
            { icon: "📊", label: "Predykcja", desc: "Konwersji" },
            { icon: "⚡", label: "Follow-up", desc: "Auto mail" },
          ].map((f, i) => (
            <div key={i} className="p-2.5 rounded-xl text-center" style={{ background: C.graphite }}>
              <span className="text-lg block">{f.icon}</span>
              <span className="text-[8px] font-bold block mt-0.5 text-white">{f.label}</span>
              <span className="text-[7px]" style={{ color: C.gray }}>{f.desc}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3 mt-3">
          {[
            { label: "Leady dziś", val: "24", change: "+8", color: C.blue, icon: Users },
            { label: "Lead Score avg", val: "72", change: "+5", color: C.violet, icon: Target },
            { label: "Konwersja", val: "18%", change: "+3%", color: C.green, icon: TrendingUp },
            { label: "Pipeline", val: "675K zł", change: "+12%", color: C.electric, icon: BarChart3 },
          ].map((k, i) => (
            <div key={i} className="p-3 rounded-xl border" style={{ borderColor: C.graphite, background: C.navy }}>
              <div className="flex items-center gap-1 mb-1"><k.icon className="w-3.5 h-3.5" style={{ color: k.color }} /><span className="text-[10px]" style={{ color: C.gray }}>{k.label}</span></div>
              <span className="font-bold text-base block text-white">{k.val}</span>
              <span className="text-[10px] font-medium" style={{ color: C.green }}>{k.change}</span>
            </div>
          ))}
        </div>
        <div className="p-4 rounded-2xl mt-3" style={{ background: C.graphite, border: `1px solid ${C.violet}20` }}>
          <p className="text-[10px] tracking-[0.2em] uppercase text-center" style={{ color: C.electric }}>Opinie klientów</p>
          <p className="text-xs mt-2 text-center italic text-white/90">"NexusAI zwiększył nasz pipeline o 180% w kwartał. Lead scoring oszczędza 20h tygodniowo."</p>
          <p className="text-[10px] text-center mt-1" style={{ color: C.electric }}>— Kacper M. ★★★★★</p>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-3">
          {[{ v: "200+", l: "Firm B2B" },{ v: "35%", l: "Wzrost konwersji" },{ v: "4.2x", l: "ROI" }].map((s, i) => (
            <div key={i} className="p-3 rounded-xl text-center" style={{ background: C.graphite }}>
              <span className="font-bold text-sm block" style={{ color: C.electric }}>{s.v}</span>
              <span className="text-[9px]" style={{ color: C.gray }}>{s.l}</span>
            </div>
          ))}
        </div>
      </DemoSection>
      <DemoBenefits accentColor={C.electric} bgColor={C.navy} textColor={"#FFFFFF"} benefits={[
        { icon: "🤖", title: "Chatbot 24/7", desc: "Odpowiedzi bez przerwy i czekania" },
        { icon: "🎯", title: "Lead scoring", desc: "Automatyczna kwalifikacja kontaktów" },
        { icon: "📊", title: "Analityka AI", desc: "Wnioski z rozmów i zachowań" },
        { icon: "⚡", title: "Szybsza sprzedaż", desc: "Mniej czasu na kwalifikację leadów" },
      ]} />
      <DemoFooterCTA accentColor={C.electric} bgColor={C.navy} />
    </div>
  );
}

function ChatPage() {
  const [msgs, setMsgs] = useState(chatMessages);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const send = () => {
    if (!input.trim()) return;
    setMsgs(prev => [...prev, { role: "user", text: input }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMsgs(prev => [...prev, {
        role: "ai",
        text: "Dziękuję za informację! Na podstawie analizy, rekomendujemy pakiet Pro z AI lead scoring i automatyzacją follow-up. Chcesz umówić demo?",
        scoring: true
      }]);
      setTyping(false);
    }, 1500);
  };

  return (
    <DemoSection>
      <div className="space-y-3 max-h-[400px] overflow-y-auto">
        {msgs.map((m, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className="max-w-[80%] p-3 rounded-xl" style={m.role === "user"
              ? { background: C.violet, color: "white" }
              : { background: C.graphite, color: C.white }}>
              {m.role === "ai" && <Bot className="w-3.5 h-3.5 mb-1" style={{ color: C.electric }} />}
              <p className="text-xs">{m.text}</p>
              {m.scoring && (
                <div className="mt-2 p-2 rounded-lg" style={{ background: C.navy }}>
                  <div className="flex items-center gap-1"><Target className="w-3 h-3" style={{ color: C.green }} /><span className="text-[9px] font-bold" style={{ color: C.green }}>Lead Score: 85 — Hot lead</span></div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
        {typing && (
          <div className="flex gap-1 pl-2">
            {[0, 1, 2].map(i => (
              <motion.div key={i} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                className="w-2 h-2 rounded-full" style={{ background: C.violet }} />
            ))}
          </div>
        )}
      </div>
      <div className="flex gap-2 mt-3">
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()}
          placeholder="Napisz wiadomość..." className="flex-1 px-4 py-3 rounded-xl border text-sm" style={{ borderColor: C.graphite, background: C.navy, color: C.white }} />
        <motion.button whileHover={{ scale: 1.05 }} onClick={send}
          className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: C.violet }}>
          <Send className="w-4 h-4 text-white" />
        </motion.button>
      </div>
    </DemoSection>
  );
}

function LeadsPage() {
  const statusColors: Record<string, { bg: string; color: string }> = {
    hot: { bg: C.green + "20", color: C.green },
    warm: { bg: "#F59E0B20", color: "#F59E0B" },
    cold: { bg: C.gray + "20", color: C.gray },
  };
  return (
    <DemoSection>
      <h3 className="font-bold text-sm text-white">Lead Pipeline</h3>
      <div className="space-y-2">
        {leads.map((l, i) => {
          const sc = statusColors[l.status];
          return (
            <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
              className="p-4 rounded-xl border" style={{ borderColor: C.graphite, background: C.navy }}>
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-semibold text-sm text-white">{l.name}</h4>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ background: sc.bg, color: sc.color }}>{l.score}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-[10px]" style={{ color: C.gray }}>Etap: {l.stage}</span>
                <span className="font-bold text-xs" style={{ color: C.electric }}>{l.value}</span>
                <span className="px-1.5 py-0.5 rounded text-[8px] font-bold" style={{ background: sc.bg, color: sc.color }}>{l.status.toUpperCase()}</span>
              </div>
              <div className="w-full h-1 rounded-full mt-2" style={{ background: C.graphite }}>
                <div className="h-full rounded-full" style={{ width: `${l.score}%`, background: `linear-gradient(to right, ${C.blue}, ${C.violet})` }} />
              </div>
            </motion.div>
          );
        })}
      </div>
    </DemoSection>
  );
}

function FeaturesPage() {
  return (
    <DemoSection>
      <h3 className="font-bold text-sm text-white">Funkcje AI</h3>
      <div className="space-y-3">
        {aiFeatures.map((f, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="p-4 rounded-xl border" style={{ borderColor: C.graphite, background: C.navy }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${C.violet}30, ${C.blue}30)` }}>
                <f.icon className="w-5 h-5" style={{ color: C.electric }} />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-sm text-white">{f.name}</h4>
                <p className="text-[10px]" style={{ color: C.gray }}>{f.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </DemoSection>
  );
}

function AnalyticsPage() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    ctx.clearRect(0, 0, c.width, c.height);
    const data = [35, 42, 38, 55, 48, 62, 58, 72, 68, 85, 78, 92];
    const maxV = 100;
    ctx.strokeStyle = C.violet; ctx.lineWidth = 2;
    ctx.beginPath();
    data.forEach((v, i) => {
      const x = 20 + i * 28; const y = 140 - (v / maxV) * 130;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.stroke();
    data.forEach((v, i) => {
      const x = 20 + i * 28; const y = 140 - (v / maxV) * 130;
      ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fillStyle = C.violet; ctx.fill();
    });
  }, []);
  return (
    <DemoSection>
      <h3 className="font-bold text-sm text-white">Analityka AI</h3>
      <div className="p-4 rounded-xl" style={{ background: C.graphite }}>
        <p className="text-xs mb-2" style={{ color: C.gray }}>Lead Score trend (12 tygodni)</p>
        <canvas ref={ref} width={360} height={160} className="w-full h-auto" />
      </div>
      <div className="grid grid-cols-3 gap-2 mt-3">
        {[{ l: "Avg Score", v: "72" },{ l: "Hot Leads", v: "34%" },{ l: "Konwersja AI", v: "23%" }].map((s, i) => (
          <div key={i} className="p-3 rounded-xl text-center" style={{ background: C.graphite }}>
            <span className="font-bold text-sm block" style={{ color: C.electric }}>{s.v}</span>
            <span className="text-[9px]" style={{ color: C.gray }}>{s.l}</span>
          </div>
        ))}
      </div>
    </DemoSection>
  );
}
