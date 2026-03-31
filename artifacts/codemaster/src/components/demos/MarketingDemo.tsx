import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PreviewShell, DemoNav, DemoSection, DemoBenefits, DemoFooterCTA } from "./PreviewShell";
import { BarChart3, TrendingUp, Users, Target, Home, Megaphone, Eye, MousePointer, DollarSign, Zap, Globe, Lightbulb, ArrowUpRight, ArrowDownRight, PieChart, Calendar, Filter, Send, CheckCircle2, Clock, AlertTriangle, ChevronRight } from "lucide-react";

const C = { navy: "#0F172A", blue: "#3B82F6", violet: "#8B5CF6", white: "#F8FAFC", gray: "#64748B", neon: "#22D3EE", dark: "#1E293B", green: "#10B981", red: "#EF4444", amber: "#F59E0B", light: "#F1F5F9" };

const kpis = [
  { label: "Ruch na stronie", val: "24 580", change: "+18%", up: true, icon: Eye, color: C.neon },
  { label: "Konwersje", val: "342", change: "+24%", up: true, icon: Target, color: C.green },
  { label: "CTR reklam", val: "4.8%", change: "+0.6%", up: true, icon: MousePointer, color: C.violet },
  { label: "Budżet wydany", val: "12 400 zł", change: "62%", up: true, icon: DollarSign, color: C.blue },
];

const campaigns = [
  { name: "Wiosenna kampania FB", platform: "Facebook", budget: 5000, spent: 3200, leads: 124, cpl: 25.80, status: "active" },
  { name: "Google Ads – Brand", platform: "Google", budget: 3000, spent: 2800, leads: 89, cpl: 31.46, status: "active" },
  { name: "LinkedIn B2B – IT", platform: "LinkedIn", budget: 4000, spent: 1200, leads: 34, cpl: 35.29, status: "active" },
  { name: "Kampania zimowa 2025", platform: "Facebook", budget: 6000, spent: 6000, leads: 256, cpl: 23.44, status: "ended" },
  { name: "TikTok Awareness", platform: "TikTok", budget: 2000, spent: 1800, leads: 45, cpl: 40.00, status: "paused" },
];

const aiInsights = [
  { title: "Zwiększ budżet na Google Ads o 20%", desc: "CTR powyżej średniej branżowej o 1.2pp. Szacowany wzrost ROI: ~15% przy zwiększeniu budżetu.", priority: "high", impact: "+15% ROI" },
  { title: "Nowy Lookalike Audience na FB", desc: "Lookalike z konwerterów ostatnich 30 dni może obniżyć CPA o 22%. Rekomendowany próg: 1-3%.", priority: "high", impact: "-22% CPA" },
  { title: "A/B test landing page /promo", desc: "Bounce rate 68% — sugerujemy test nagłówka i CTA. Przewidywany wzrost konwersji: +8-12%.", priority: "medium", impact: "+10% CR" },
  { title: "Optymalizacja godzin wyświetlania", desc: "Najwyższy CTR między 10:00-14:00 i 19:00-22:00. Przesuń budżet na te okna czasowe.", priority: "medium", impact: "+0.4% CTR" },
];

const weeklyData = [
  { w: "T1", organic: 4200, paid: 1800, social: 1200 },
  { w: "T2", organic: 4500, paid: 2100, social: 1400 },
  { w: "T3", organic: 4100, paid: 2400, social: 1100 },
  { w: "T4", organic: 5200, paid: 2800, social: 1600 },
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
      <div className="p-8 pb-10" style={{ background: `linear-gradient(160deg, ${C.navy}, ${C.dark})` }}>
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-[10px] tracking-[0.4em] uppercase" style={{ color: C.neon }}>AI-Powered Marketing</p>
            <h1 className="font-display font-bold text-3xl mt-1 text-white">Spark <span style={{ color: C.violet }}>Agency</span></h1>
          </div>
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: `linear-gradient(135deg, ${C.violet}, ${C.blue})` }}>SA</div>
        </div>
        <p className="text-xs text-white/60 mb-6">Panel raportów kampanii • Marzec 2026</p>

        <div className="grid grid-cols-2 gap-3">
          {kpis.map((k, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className="p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="flex items-center gap-1.5 mb-1">
                <k.icon className="w-3.5 h-3.5" style={{ color: k.color }} />
                <span className="text-[9px] text-white/50">{k.label}</span>
              </div>
              <span className="font-bold text-base text-white block">{k.val}</span>
              <span className="text-[10px] font-medium flex items-center gap-0.5" style={{ color: k.up ? C.green : C.red }}>
                {k.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}{k.change}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <DemoSection>
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm" style={{ color: C.navy }}>Aktywne kampanie</h3>
          <button onClick={() => onNav("campaigns")} className="text-[10px] font-medium flex items-center gap-1" style={{ color: C.violet }}>Wszystkie <ChevronRight className="w-3 h-3" /></button>
        </div>
        {campaigns.filter(c => c.status === "active").slice(0, 3).map((c, i) => (
          <div key={i} className="p-3 rounded-xl border" style={{ borderColor: C.light, background: C.white }}>
            <div className="flex items-center justify-between mb-1.5">
              <h4 className="text-xs font-semibold" style={{ color: C.navy }}>{c.name}</h4>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold" style={{ background: C.green + "15", color: C.green }}>Aktywna</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
              <div><span className="block" style={{ color: C.gray }}>Leady</span><span className="font-bold" style={{ color: C.navy }}>{c.leads}</span></div>
              <div><span className="block" style={{ color: C.gray }}>CPL</span><span className="font-bold" style={{ color: C.blue }}>{c.cpl.toFixed(0)} zł</span></div>
              <div><span className="block" style={{ color: C.gray }}>Budżet</span><span className="font-bold" style={{ color: C.navy }}>{Math.round(c.spent/c.budget*100)}%</span></div>
            </div>
            <div className="w-full h-1.5 rounded-full mt-2" style={{ background: C.dark + "08" }}>
              <div className="h-full rounded-full" style={{ width: `${(c.spent/c.budget)*100}%`, background: `linear-gradient(to right, ${C.blue}, ${C.violet})` }} />
            </div>
          </div>
        ))}

        <div className="flex items-center justify-between mt-2">
          <h3 className="font-bold text-sm" style={{ color: C.navy }}>AI Rekomendacje</h3>
          <button onClick={() => onNav("ai")} className="text-[10px] font-medium flex items-center gap-1" style={{ color: C.violet }}>Wszystkie <ChevronRight className="w-3 h-3" /></button>
        </div>
        {aiInsights.slice(0, 2).map((ins, i) => (
          <div key={i} className="p-3 rounded-xl border flex gap-3 items-start" style={{ borderColor: ins.priority === "high" ? C.violet + "30" : C.blue + "20", background: C.white }}>
            <Lightbulb className="w-4 h-4 shrink-0 mt-0.5" style={{ color: ins.priority === "high" ? C.violet : C.blue }} />
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold" style={{ color: C.navy }}>{ins.title}</h4>
              <p className="text-[10px] mt-0.5" style={{ color: C.gray }}>{ins.desc.slice(0, 80)}...</p>
            </div>
            <span className="px-2 py-0.5 rounded text-[8px] font-bold shrink-0" style={{ background: C.green + "15", color: C.green }}>{ins.impact}</span>
          </div>
        ))}

        <div className="grid grid-cols-3 gap-2 mt-2">
          {[{ v: "3.8x", l: "Avg. ROAS" },{ v: "36 zł", l: "Avg. CPA" },{ v: "2 400 zł", l: "Avg. LTV" }].map((s, i) => (
            <div key={i} className="p-3 rounded-xl text-center" style={{ background: `${C.violet}08` }}>
              <span className="font-bold text-sm block" style={{ color: C.violet }}>{s.v}</span>
              <span className="text-[9px]" style={{ color: C.gray }}>{s.l}</span>
            </div>
          ))}
        </div>
      </DemoSection>

      <DemoBenefits accentColor={C.violet} bgColor={C.light} textColor={C.navy} benefits={[
        { icon: "🤖", title: "AI Engine", desc: "Automatyczna optymalizacja kampanii" },
        { icon: "📊", title: "Real-time analityka", desc: "Dane aktualizowane na żywo" },
        { icon: "🎯", title: "Precyzyjny targeting", desc: "Lookalike, retargeting, Custom" },
        { icon: "📋", title: "Raporty PDF", desc: "Automatyczne raporty dla klientów" },
      ]} />
      <DemoFooterCTA accentColor={C.violet} bgColor={C.navy} />
    </div>
  );
}

function CampaignsPage() {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? campaigns : campaigns.filter(c => c.status === filter);
  const statusColors: Record<string, { bg: string; fg: string; label: string }> = {
    active: { bg: C.green + "15", fg: C.green, label: "Aktywna" },
    paused: { bg: C.amber + "15", fg: C.amber, label: "Wstrzymana" },
    ended: { bg: C.gray + "15", fg: C.gray, label: "Zakończona" },
  };
  return (
    <DemoSection>
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-sm" style={{ color: C.navy }}>Kampanie reklamowe</h3>
        <motion.button whileHover={{ scale: 1.02 }} className="px-3 py-1.5 rounded-lg text-[10px] font-bold text-white" style={{ background: `linear-gradient(135deg, ${C.blue}, ${C.violet})` }}>+ Nowa kampania</motion.button>
      </div>
      <div className="flex gap-1.5">
        {[{ id: "all", l: "Wszystkie" }, { id: "active", l: "Aktywne" }, { id: "paused", l: "Wstrzymane" }, { id: "ended", l: "Zakończone" }].map(f => (
          <button key={f.id} onClick={() => setFilter(f.id)} className="px-3 py-1.5 rounded-lg text-[10px] font-medium transition-all"
            style={filter === f.id ? { background: C.violet, color: "white" } : { background: C.light, color: C.gray }}>{f.l}</button>
        ))}
      </div>
      <div className="space-y-3">
        {filtered.map((c, i) => {
          const st = statusColors[c.status];
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="p-4 rounded-xl border hover:shadow-md transition-all cursor-pointer" style={{ borderColor: C.light, background: C.white }}>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-sm" style={{ color: C.navy }}>{c.name}</h4>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold" style={{ background: st.bg, color: st.fg }}>{st.label}</span>
              </div>
              <div className="grid grid-cols-4 gap-2 text-center mb-3">
                <div><span className="text-[9px] block" style={{ color: C.gray }}>Platforma</span><span className="text-xs font-bold" style={{ color: C.navy }}>{c.platform}</span></div>
                <div><span className="text-[9px] block" style={{ color: C.gray }}>Budżet</span><span className="text-xs font-bold" style={{ color: C.navy }}>{c.budget.toLocaleString()} zł</span></div>
                <div><span className="text-[9px] block" style={{ color: C.gray }}>Leady</span><span className="text-xs font-bold" style={{ color: C.blue }}>{c.leads}</span></div>
                <div><span className="text-[9px] block" style={{ color: C.gray }}>CPL</span><span className="text-xs font-bold" style={{ color: C.green }}>{c.cpl.toFixed(0)} zł</span></div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 rounded-full" style={{ background: C.dark + "08" }}>
                  <div className="h-full rounded-full transition-all" style={{ width: `${(c.spent/c.budget)*100}%`, background: `linear-gradient(to right, ${C.blue}, ${C.violet})` }} />
                </div>
                <span className="text-[9px] font-bold shrink-0" style={{ color: C.gray }}>{c.spent.toLocaleString()} / {c.budget.toLocaleString()} zł</span>
              </div>
            </motion.div>
          );
        })}
      </div>
      <div className="p-4 rounded-xl" style={{ background: C.light }}>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div><span className="font-bold text-lg block" style={{ color: C.navy }}>{campaigns.reduce((s, c) => s + c.leads, 0)}</span><span className="text-[9px]" style={{ color: C.gray }}>Łącznie leadów</span></div>
          <div><span className="font-bold text-lg block" style={{ color: C.blue }}>{(campaigns.reduce((s, c) => s + c.budget, 0) / 1000).toFixed(0)}K zł</span><span className="text-[9px]" style={{ color: C.gray }}>Łączny budżet</span></div>
          <div><span className="font-bold text-lg block" style={{ color: C.green }}>{(campaigns.reduce((s, c) => s + c.spent, 0) / campaigns.reduce((s, c) => s + c.leads, 0)).toFixed(0)} zł</span><span className="text-[9px]" style={{ color: C.gray }}>Avg. CPL</span></div>
        </div>
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
    const maxV = 500, barW = 22, gap = 8, startX = 15, h = 150;
    data.forEach((v, i) => {
      const x = startX + i * (barW + gap);
      const bh = (v / maxV) * 130;
      const grad = ctx.createLinearGradient(0, h - bh, 0, h);
      grad.addColorStop(0, C.violet); grad.addColorStop(1, C.blue);
      ctx.fillStyle = grad;
      ctx.beginPath(); ctx.roundRect(x, h - bh, barW, bh, 4); ctx.fill();
      ctx.fillStyle = C.gray;
      ctx.font = "8px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(`T${i + 1}`, x + barW / 2, h + 12);
    });
  }, []);
  return (
    <DemoSection>
      <h3 className="font-bold text-sm" style={{ color: C.navy }}>Analityka — ostatnie 12 tygodni</h3>
      <div className="p-4 rounded-xl" style={{ background: C.white, border: `1px solid ${C.light}` }}>
        <canvas ref={ref} width={380} height={170} className="w-full h-auto" />
        <p className="text-center text-[10px] mt-1" style={{ color: C.gray }}>Konwersje tygodniowe</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-3">
        <div className="p-4 rounded-xl" style={{ background: C.light }}>
          <p className="text-[9px] font-bold uppercase mb-2" style={{ color: C.gray }}>Źródła konwersji</p>
          {[{ l: "Google Ads", v: 38, c: C.blue }, { l: "Facebook", v: 32, c: "#1877F2" }, { l: "Organic", v: 18, c: C.green }, { l: "LinkedIn", v: 12, c: "#0A66C2" }].map((s, i) => (
            <div key={i} className="flex items-center gap-2 mb-1.5">
              <div className="w-2 h-2 rounded-full shrink-0" style={{ background: s.c }} />
              <span className="text-[10px] flex-1" style={{ color: C.navy }}>{s.l}</span>
              <span className="text-[10px] font-bold" style={{ color: C.navy }}>{s.v}%</span>
            </div>
          ))}
        </div>
        <div className="p-4 rounded-xl" style={{ background: C.light }}>
          <p className="text-[9px] font-bold uppercase mb-2" style={{ color: C.gray }}>Funnel</p>
          {[{ l: "Wyświetlenia", v: 24580, p: 100 }, { l: "Kliknięcia", v: 1180, p: 48 }, { l: "Leady", v: 342, p: 29 }, { l: "Sprzedaż", v: 48, p: 14 }].map((s, i) => (
            <div key={i} className="mb-2">
              <div className="flex justify-between text-[10px]">
                <span style={{ color: C.navy }}>{s.l}</span>
                <span className="font-bold" style={{ color: C.violet }}>{s.v.toLocaleString()}</span>
              </div>
              <div className="w-full h-1.5 rounded-full" style={{ background: C.navy + "10" }}>
                <div className="h-full rounded-full" style={{ width: `${s.p}%`, background: `linear-gradient(to right, ${C.blue}, ${C.violet})` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-2">
        {[{ l: "CPA", v: "36 zł", c: C.blue }, { l: "ROAS", v: "3.8x", c: C.green }, { l: "LTV", v: "2 400 zł", c: C.violet }].map((s, i) => (
          <div key={i} className="p-3 rounded-xl text-center" style={{ background: `${s.c}08` }}>
            <span className="font-bold text-sm block" style={{ color: s.c }}>{s.v}</span>
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
      <div className="p-4 rounded-xl mb-2" style={{ background: `linear-gradient(135deg, ${C.navy}, ${C.dark})` }}>
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-5 h-5" style={{ color: C.neon }} />
          <h3 className="font-bold text-sm text-white">AI Marketing Engine</h3>
        </div>
        <p className="text-[10px] text-white/60">Analiza danych z {campaigns.length} kampanii na {new Set(campaigns.map(c => c.platform)).size} platformach. Ostatnia aktualizacja: 5 min temu.</p>
        <div className="grid grid-cols-3 gap-2 mt-3">
          {[{ v: aiInsights.length.toString(), l: "Rekomendacji" }, { v: aiInsights.filter(i => i.priority === "high").length.toString(), l: "Priorytetów" }, { v: "92%", l: "Trafność AI" }].map((s, i) => (
            <div key={i} className="p-2 rounded-lg text-center" style={{ background: "rgba(255,255,255,0.08)" }}>
              <span className="font-bold text-xs text-white block">{s.v}</span>
              <span className="text-[8px] text-white/50">{s.l}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {aiInsights.map((ins, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="p-4 rounded-xl border hover:shadow-md transition-all" style={{ borderColor: ins.priority === "high" ? C.violet + "30" : C.blue + "15", background: C.white }}>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: ins.priority === "high" ? C.violet + "15" : C.blue + "10" }}>
                <Lightbulb className="w-4 h-4" style={{ color: ins.priority === "high" ? C.violet : C.blue }} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-bold text-xs" style={{ color: C.navy }}>{ins.title}</h4>
                  <span className="px-2 py-0.5 rounded text-[8px] font-bold ml-auto" style={{
                    background: ins.priority === "high" ? C.violet + "15" : C.blue + "15",
                    color: ins.priority === "high" ? C.violet : C.blue
                  }}>{ins.priority === "high" ? "Wysoki" : "Średni"}</span>
                </div>
                <p className="text-[10px] leading-relaxed" style={{ color: C.gray }}>{ins.desc}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="px-2 py-0.5 rounded text-[9px] font-bold" style={{ background: C.green + "15", color: C.green }}>Wpływ: {ins.impact}</span>
                  <motion.button whileHover={{ scale: 1.02 }}
                    className="px-3 py-1.5 rounded-lg text-[10px] font-bold text-white" style={{ background: `linear-gradient(135deg, ${C.blue}, ${C.violet})` }}>Zastosuj</motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </DemoSection>
  );
}

function ReportsPage() {
  const reports = [
    { name: "Marzec 2026 — Performance Report", date: "31 mar 2026", campaigns: 5, pages: 12, status: "ready" },
    { name: "Luty 2026 — Analiza kanałów", date: "28 lut 2026", campaigns: 4, pages: 8, status: "ready" },
    { name: "Styczeń 2026 — ROI & Budżet", date: "31 sty 2026", campaigns: 3, pages: 10, status: "ready" },
    { name: "Q1 2026 — Raport kwartalny", date: "W przygotowaniu", campaigns: 5, pages: 0, status: "pending" },
  ];
  return (
    <DemoSection>
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-sm" style={{ color: C.navy }}>Raporty dla klientów</h3>
        <motion.button whileHover={{ scale: 1.02 }} className="px-3 py-1.5 rounded-lg text-[10px] font-bold text-white" style={{ background: C.violet }}>+ Generuj raport</motion.button>
      </div>
      <div className="space-y-2">
        {reports.map((r, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="flex items-center gap-3 p-4 rounded-xl border hover:shadow-sm transition-all cursor-pointer" style={{ borderColor: C.light, background: C.white }}>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: r.status === "ready" ? C.violet + "10" : C.amber + "10" }}>
              <BarChart3 className="w-5 h-5" style={{ color: r.status === "ready" ? C.violet : C.amber }} />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-xs font-semibold block truncate" style={{ color: C.navy }}>{r.name}</span>
              <p className="text-[10px]" style={{ color: C.gray }}>{r.date} · {r.campaigns} kampanii · {r.pages > 0 ? `${r.pages} stron` : "—"}</p>
            </div>
            {r.status === "ready" ? (
              <div className="flex gap-1.5 shrink-0">
                <button className="px-2.5 py-1.5 rounded-lg text-[10px] font-bold" style={{ background: C.light, color: C.navy }}>PDF</button>
                <button className="px-2.5 py-1.5 rounded-lg text-[10px] font-bold" style={{ background: C.violet + "15", color: C.violet }}>Wyślij</button>
              </div>
            ) : (
              <span className="px-2.5 py-1 rounded-lg text-[9px] font-medium shrink-0" style={{ background: C.amber + "15", color: C.amber }}>Generowanie...</span>
            )}
          </motion.div>
        ))}
      </div>
      <div className="p-4 rounded-xl mt-2" style={{ background: `linear-gradient(135deg, ${C.violet}08, ${C.blue}08)`, border: `1px solid ${C.violet}15` }}>
        <div className="flex items-center gap-2">
          <Send className="w-4 h-4" style={{ color: C.violet }} />
          <span className="text-xs font-bold" style={{ color: C.navy }}>Auto-wysyłka raportów</span>
        </div>
        <p className="text-[10px] mt-1" style={{ color: C.gray }}>Raporty wysyłane automatycznie do klientów 1. dnia miesiąca o 09:00. Ostatnia wysyłka: 1 mar 2026.</p>
      </div>
    </DemoSection>
  );
}
