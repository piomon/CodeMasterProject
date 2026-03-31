import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PreviewShell, DemoNav, DemoSection } from "./PreviewShell";
import { BarChart3, TrendingUp, Users, Target, Home, Megaphone, Eye, MousePointer, DollarSign, Zap, Globe, Lightbulb } from "lucide-react";

const C = { navy: "#0F172A", blue: "#3B82F6", violet: "#8B5CF6", white: "#F8FAFC", gray: "#64748B", neon: "#22D3EE", dark: "#1E293B", green: "#10B981" };

const kpis = [
  { label: "Ruch na stronie", val: "24,580", change: "+18%", icon: Eye, color: C.blue },
  { label: "Konwersje", val: "342", change: "+24%", icon: Target, color: C.green },
  { label: "CTR reklam", val: "4.8%", change: "+0.6%", icon: MousePointer, color: C.violet },
  { label: "Budżet wydany", val: "12,400 zł", change: "62%", icon: DollarSign, color: C.neon },
];

const campaigns = [
  { name: "Wiosenna kampania FB", platform: "Facebook", budget: 5000, spent: 3200, leads: 124, status: "active" },
  { name: "Google Ads – Brand", platform: "Google", budget: 3000, spent: 2800, leads: 89, status: "active" },
  { name: "LinkedIn B2B", platform: "LinkedIn", budget: 4000, spent: 1200, leads: 34, status: "active" },
  { name: "Kampania zimowa", platform: "Facebook", budget: 6000, spent: 6000, leads: 256, status: "ended" },
];

const aiInsights = [
  { title: "Zwiększ budżet na Google Ads", desc: "CTR powyżej średniej branżowej. ROI wzrośnie o ~15% przy 20% wzroście budżetu.", priority: "high" },
  { title: "Nowy audience na FB", desc: "Lookalike z konwerterów ostatnich 30 dni może obniżyć CPA o 22%.", priority: "medium" },
  { title: "Optymalizacja landing page", desc: "Bounce rate 68% na /promo – sugerujemy A/B test nagłówka i CTA.", priority: "high" },
];

export function MarketingDemo({ name }: { name: string; features: string[] }) {
  const [page, setPage] = useState("dashboard");
  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: <Home className="w-3 h-3" /> },
    { id: "campaigns", label: "Kampanie", icon: <Megaphone className="w-3 h-3" /> },
    { id: "analytics", label: "Analityka", icon: <BarChart3 className="w-3 h-3" /> },
    { id: "ai", label: "AI Insights", icon: <Lightbulb className="w-3 h-3" /> },
    { id: "reports", label: "Raporty", icon: <Globe className="w-3 h-3" /> },
  ];

  return (
    <PreviewShell title={name}>
      <DemoNav tabs={tabs} activeTab={page} onTabChange={setPage} logo="Spark Agency" />
      <AnimatePresence mode="wait">
        <motion.div key={page} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
          {page === "dashboard" && <DashboardPage onNav={setPage} />}
          {page === "campaigns" && <CampaignsPage />}
          {page === "analytics" && <AnalyticsPage />}
          {page === "ai" && <AiInsightsPage />}
          {page === "reports" && <ReportsPage />}
        </motion.div>
      </AnimatePresence>
    </PreviewShell>
  );
}

function DashboardPage({ onNav }: { onNav: (p: string) => void }) {
  return (
    <div>
      <div className="p-10 text-center" style={{ background: `linear-gradient(160deg, ${C.navy}, ${C.dark})` }}>
        <p className="text-[10px] tracking-[0.4em] uppercase" style={{ color: C.neon }}>AI-Powered Marketing</p>
        <h1 className="font-display font-bold text-4xl mt-2 text-white">Spark <span style={{ color: C.violet }}>Agency</span></h1>
        <p className="text-xs mt-2 max-w-[260px] mx-auto leading-relaxed text-white/70">Kampanie reklamowe napędzane sztuczną inteligencją. Facebook, Google, LinkedIn — jeden panel, pełna kontrola.</p>
        <div className="flex gap-3 justify-center mt-6">
          <motion.button whileHover={{ scale: 1.03 }} onClick={() => onNav("campaigns")}
            className="px-7 py-3.5 rounded-lg font-bold text-sm shadow-lg" style={{ background: `linear-gradient(135deg, ${C.blue}, ${C.violet})`, color: "white" }}>Kampanie</motion.button>
          <button onClick={() => onNav("ai")} className="px-7 py-3.5 rounded-lg font-semibold text-sm border border-white/20 text-white">AI Insights</button>
        </div>
      </div>
      <DemoSection>
        <div className="grid grid-cols-4 gap-2">
          {[
            { icon: "📈", label: "Analityka", desc: "Real-time" },
            { icon: "🤖", label: "AI Engine", desc: "Optymalizacja" },
            { icon: "📊", label: "Raporty", desc: "Automatyczne" },
            { icon: "🎯", label: "Targeting", desc: "Precyzyjny" },
          ].map((f, i) => (
            <div key={i} className="p-2.5 rounded-xl text-center" style={{ background: C.white }}>
              <span className="text-lg block">{f.icon}</span>
              <span className="text-[8px] font-bold block mt-0.5" style={{ color: C.navy }}>{f.label}</span>
              <span className="text-[7px]" style={{ color: C.gray }}>{f.desc}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3 mt-3">
          {kpis.map((k, i) => (
            <div key={i} className="p-3 rounded-xl border" style={{ borderColor: C.dark + "20", background: C.white }}>
              <div className="flex items-center gap-2 mb-1">
                <k.icon className="w-4 h-4" style={{ color: k.color }} />
                <span className="text-[10px]" style={{ color: C.gray }}>{k.label}</span>
              </div>
              <span className="font-bold text-base block" style={{ color: C.navy }}>{k.val}</span>
              <span className="text-[10px] font-medium" style={{ color: C.green }}>{k.change}</span>
            </div>
          ))}
        </div>
        <div className="p-4 rounded-2xl mt-3" style={{ background: C.white, border: `1px solid ${C.violet}15` }}>
          <p className="text-[10px] tracking-[0.2em] uppercase text-center" style={{ color: C.violet }}>Opinie klientów</p>
          <p className="text-xs mt-2 text-center italic" style={{ color: C.navy + "90" }}>"Spark Agency zwiększyło nasze konwersje o 240% w 3 miesiące. AI insights to prawdziwy game changer."</p>
          <p className="text-[10px] text-center mt-1" style={{ color: C.violet }}>— Marta K. ★★★★★</p>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-3">
          {[{ v: "150+", l: "Klientów" },{ v: "24%", l: "Avg. wzrost CTR" },{ v: "4.2x", l: "Avg. ROI" }].map((s, i) => (
            <div key={i} className="p-3 rounded-xl text-center" style={{ background: `${C.blue}08` }}>
              <span className="font-bold text-sm block" style={{ color: C.blue }}>{s.v}</span>
              <span className="text-[9px]" style={{ color: C.gray }}>{s.l}</span>
            </div>
          ))}
        </div>
      </DemoSection>
    </div>
  );
}

function CampaignsPage() {
  return (
    <DemoSection>
      <h3 className="font-bold text-sm" style={{ color: C.navy }}>Kampanie reklamowe</h3>
      <div className="space-y-3">
        {campaigns.map((c, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="p-4 rounded-xl border" style={{ borderColor: C.dark + "10", background: C.white }}>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-sm" style={{ color: C.navy }}>{c.name}</h4>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold" style={{
                background: c.status === "active" ? C.green + "15" : C.gray + "15",
                color: c.status === "active" ? C.green : C.gray
              }}>{c.status === "active" ? "Aktywna" : "Zakończona"}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div><span className="text-[9px] block" style={{ color: C.gray }}>Platforma</span><span className="text-xs font-bold" style={{ color: C.navy }}>{c.platform}</span></div>
              <div><span className="text-[9px] block" style={{ color: C.gray }}>Budżet</span><span className="text-xs font-bold" style={{ color: C.navy }}>{c.budget.toLocaleString()} zł</span></div>
              <div><span className="text-[9px] block" style={{ color: C.gray }}>Leady</span><span className="text-xs font-bold" style={{ color: C.blue }}>{c.leads}</span></div>
            </div>
            <div className="w-full h-2 rounded-full mt-2" style={{ background: C.dark + "10" }}>
              <div className="h-full rounded-full" style={{ width: `${(c.spent/c.budget)*100}%`, background: `linear-gradient(to right, ${C.blue}, ${C.violet})` }} />
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
    const data = [120, 180, 150, 220, 280, 240, 310, 290, 350, 320, 380, 420];
    const maxV = 450, barW = 22, gap = 8, startX = 15;
    data.forEach((v, i) => {
      const x = startX + i * (barW + gap);
      const h = (v / maxV) * 130;
      const grad = ctx.createLinearGradient(0, 150 - h, 0, 150);
      grad.addColorStop(0, C.violet); grad.addColorStop(1, C.blue);
      ctx.fillStyle = grad;
      ctx.beginPath(); ctx.roundRect(x, 150 - h, barW, h, 4); ctx.fill();
    });
  }, []);
  return (
    <DemoSection>
      <h3 className="font-bold text-sm" style={{ color: C.navy }}>Analityka — ostatnie 12 tygodni</h3>
      <div className="p-4 rounded-xl" style={{ background: C.white }}>
        <canvas ref={ref} width={380} height={170} className="w-full h-auto" />
        <p className="text-center text-[10px] mt-1" style={{ color: C.gray }}>Konwersje tygodniowe</p>
      </div>
      <div className="grid grid-cols-3 gap-2 mt-3">
        {[{ l: "CPA", v: "36 zł" },{ l: "ROAS", v: "3.8x" },{ l: "LTV", v: "2 400 zł" }].map((s, i) => (
          <div key={i} className="p-3 rounded-xl text-center" style={{ background: C.dark + "08" }}>
            <span className="font-bold text-sm block" style={{ color: C.violet }}>{s.v}</span>
            <span className="text-[9px]" style={{ color: C.gray }}>{s.l}</span>
          </div>
        ))}
      </div>
    </DemoSection>
  );
}

function AiInsightsPage() {
  return (
    <DemoSection>
      <h3 className="font-bold text-sm flex items-center gap-2" style={{ color: C.navy }}>
        <Zap className="w-4 h-4" style={{ color: C.violet }} /> AI Insights
      </h3>
      <p className="text-xs" style={{ color: C.gray }}>Rekomendacje oparte na analizie danych kampanii</p>
      <div className="space-y-3 mt-3">
        {aiInsights.map((ins, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="p-4 rounded-xl border" style={{ borderColor: ins.priority === "high" ? C.violet + "30" : C.blue + "20", background: C.white }}>
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="w-4 h-4" style={{ color: ins.priority === "high" ? C.violet : C.blue }} />
              <h4 className="font-bold text-sm" style={{ color: C.navy }}>{ins.title}</h4>
              <span className="ml-auto px-2 py-0.5 rounded text-[9px] font-bold" style={{
                background: ins.priority === "high" ? C.violet + "15" : C.blue + "15",
                color: ins.priority === "high" ? C.violet : C.blue
              }}>{ins.priority === "high" ? "Wysoki" : "Średni"}</span>
            </div>
            <p className="text-xs" style={{ color: C.gray }}>{ins.desc}</p>
            <motion.button whileHover={{ scale: 1.02 }}
              className="mt-3 px-4 py-2 rounded-lg text-xs font-semibold" style={{ background: `linear-gradient(135deg, ${C.blue}, ${C.violet})`, color: "white" }}>Zastosuj sugestię</motion.button>
          </motion.div>
        ))}
      </div>
    </DemoSection>
  );
}

function ReportsPage() {
  return (
    <DemoSection>
      <h3 className="font-bold text-sm" style={{ color: C.navy }}>Raporty miesięczne</h3>
      {["Marzec 2026", "Luty 2026", "Styczeń 2026"].map((m, i) => (
        <div key={i} className="flex items-center gap-3 p-4 rounded-xl border cursor-pointer" style={{ borderColor: C.dark + "10", background: C.white }}>
          <BarChart3 className="w-5 h-5" style={{ color: C.violet }} />
          <div className="flex-1">
            <span className="text-sm font-medium" style={{ color: C.navy }}>Raport: {m}</span>
            <p className="text-[10px]" style={{ color: C.gray }}>Kampanie, konwersje, ROI</p>
          </div>
          <button className="px-3 py-1.5 rounded-lg text-[10px] font-bold" style={{ background: C.dark + "08", color: C.navy }}>PDF</button>
        </div>
      ))}
    </DemoSection>
  );
}
