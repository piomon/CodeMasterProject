import { useState, useRef, useEffect, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PreviewShell, DemoBenefits, DemoFooterCTA } from "./PreviewShell";
import { BarChart3, TrendingUp, Users, Target, Megaphone, Eye, MousePointer, DollarSign, Zap, Globe, Lightbulb, ArrowUpRight, ArrowDownRight, Send, ChevronRight, ChevronLeft, PanelLeftClose, PanelLeft } from "lucide-react";

const C = { bg: "#0F0F23", sidebar: "#161630", card: "#1C1C3A", blue: "#4F7CFF", violet: "#8B5CF6", white: "#F0F0FF", gray: "#7C7C9A", neon: "#22D3EE", green: "#10B981", red: "#EF4444", amber: "#F59E0B", light: "#E8E8F8", text: "#C8C8E0" };

type MktPage = "dashboard" | "campaigns" | "analytics" | "ai" | "reports";

const kpis = [
  { label: "Ruch na stronie", val: "24 580", change: "+18%", up: true, icon: Eye, color: C.neon },
  { label: "Konwersje", val: "342", change: "+24%", up: true, icon: Target, color: C.green },
  { label: "CTR reklam", val: "4.8%", change: "+0.6%", up: true, icon: MousePointer, color: C.violet },
  { label: "Budżet wydany", val: "12 400 zł", change: "62%", up: true, icon: DollarSign, color: C.blue },
];

const campaigns = [
  { name: "Wiosenna kampania FB", platform: "Facebook", budget: 5000, spent: 3200, leads: 124, cpl: 25.80, status: "active" as const },
  { name: "Google Ads – Brand", platform: "Google", budget: 3000, spent: 2800, leads: 89, cpl: 31.46, status: "active" as const },
  { name: "LinkedIn B2B – IT", platform: "LinkedIn", budget: 4000, spent: 1200, leads: 34, cpl: 35.29, status: "active" as const },
  { name: "Kampania zimowa 2025", platform: "Facebook", budget: 6000, spent: 6000, leads: 256, cpl: 23.44, status: "ended" as const },
  { name: "TikTok Awareness", platform: "TikTok", budget: 2000, spent: 1800, leads: 45, cpl: 40.00, status: "paused" as const },
];

const aiInsights = [
  { title: "Zwiększ budżet na Google Ads o 20%", desc: "CTR powyżej średniej branżowej o 1.2pp. Szacowany wzrost ROI: ~15% przy zwiększeniu budżetu.", priority: "high", impact: "+15% ROI" },
  { title: "Nowy Lookalike Audience na FB", desc: "Lookalike z konwerterów ostatnich 30 dni może obniżyć CPA o 22%. Rekomendowany próg: 1-3%.", priority: "high", impact: "-22% CPA" },
  { title: "A/B test landing page /promo", desc: "Bounce rate 68% — sugerujemy test nagłówka i CTA. Przewidywany wzrost konwersji: +8-12%.", priority: "medium", impact: "+10% CR" },
  { title: "Optymalizacja godzin wyświetlania", desc: "Najwyższy CTR między 10:00-14:00 i 19:00-22:00. Przesuń budżet na te okna czasowe.", priority: "medium", impact: "+0.4% CTR" },
];

type CampaignFilter = "all" | "active" | "paused" | "ended";
const statusColors: Record<string, { bg: string; fg: string; label: string }> = {
  active: { bg: C.green + "20", fg: C.green, label: "Aktywna" },
  paused: { bg: C.amber + "20", fg: C.amber, label: "Wstrzymana" },
  ended: { bg: C.gray + "20", fg: C.gray, label: "Zakończona" },
};

const sidebarItems: { id: MktPage; label: string; icon: ReactNode }[] = [
  { id: "dashboard", label: "Dashboard", icon: <BarChart3 className="w-4 h-4" /> },
  { id: "campaigns", label: "Kampanie", icon: <Megaphone className="w-4 h-4" /> },
  { id: "analytics", label: "Analityka", icon: <TrendingUp className="w-4 h-4" /> },
  { id: "ai", label: "AI Insights", icon: <Lightbulb className="w-4 h-4" /> },
  { id: "reports", label: "Raporty", icon: <Globe className="w-4 h-4" /> },
];

export function MarketingDemo({ name }: { name: string; features: string[] }) {
  const [page, setPage] = useState<MktPage>("dashboard");
  const [collapsed, setCollapsed] = useState(false);

  return (
    <PreviewShell title={name}>
      <div className="flex" style={{ background: C.bg, minHeight: 540 }}>
        <div className="shrink-0 flex flex-col py-3 border-r transition-all" style={{ width: collapsed ? 46 : 150, background: C.sidebar, borderColor: C.blue + "15" }}>
          <div className="px-3 mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 shrink-0" style={{ color: C.blue }} />
            {!collapsed && <span className="font-bold text-xs text-white truncate">Spark Agency</span>}
          </div>
          <div className="flex-1 space-y-0.5 px-1.5">
            {sidebarItems.map(n => (
              <button key={n.id} onClick={() => setPage(n.id)} className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[10px] font-medium transition-all"
                style={page === n.id ? { background: C.blue + "20", color: C.blue } : { color: C.gray }}>
                {n.icon}
                {!collapsed && <span>{n.label}</span>}
              </button>
            ))}
          </div>
          <button onClick={() => setCollapsed(!collapsed)} className="mx-auto mt-2 p-1.5 rounded" style={{ color: C.gray }}>
            {collapsed ? <PanelLeft className="w-3.5 h-3.5" /> : <PanelLeftClose className="w-3.5 h-3.5" />}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div key={page} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              {page === "dashboard" && <DashboardPage onNav={setPage} />}
              {page === "campaigns" && <CampaignsPage />}
              {page === "analytics" && <AnalyticsPage />}
              {page === "ai" && <AiInsightsPage />}
              {page === "reports" && <ReportsPage />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <DemoBenefits accentColor={C.violet} bgColor="#1A1A30" textColor={C.white} benefits={[
        { icon: "🤖", title: "AI Engine", desc: "Automatyczna optymalizacja kampanii" },
        { icon: "📊", title: "Real-time analityka", desc: "Dane aktualizowane na żywo" },
        { icon: "🎯", title: "Precyzyjny targeting", desc: "Lookalike, retargeting, Custom" },
        { icon: "📋", title: "Raporty PDF", desc: "Automatyczne raporty dla klientów" },
      ]} />
      <DemoFooterCTA accentColor={C.violet} bgColor={C.bg} />
    </PreviewShell>
  );
}

function DashboardPage({ onNav }: { onNav: (p: MktPage) => void }) {
  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[9px] tracking-widest uppercase" style={{ color: C.blue }}>AI-Powered Marketing</p>
          <h2 className="font-bold text-lg text-white mt-0.5">Dashboard</h2>
        </div>
        <span className="text-[10px]" style={{ color: C.gray }}>Marzec 2026</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {kpis.map((k, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
            className="p-3 rounded-xl" style={{ background: C.card, border: `1px solid ${k.color}15` }}>
            <div className="flex items-center gap-1.5 mb-1">
              <k.icon className="w-3.5 h-3.5" style={{ color: k.color }} />
              <span className="text-[9px]" style={{ color: C.gray }}>{k.label}</span>
            </div>
            <span className="font-bold text-base text-white block">{k.val}</span>
            <span className="text-[10px] font-medium flex items-center gap-0.5" style={{ color: k.up ? C.green : C.red }}>
              {k.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}{k.change}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-white">Aktywne kampanie</span>
        <button onClick={() => onNav("campaigns")} className="text-[10px] font-medium flex items-center gap-1" style={{ color: C.blue }}>Wszystkie <ChevronRight className="w-3 h-3" /></button>
      </div>
      {campaigns.filter(c => c.status === "active").slice(0, 3).map((c, i) => (
        <div key={i} className="p-3 rounded-xl" style={{ background: C.card }}>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-semibold text-white">{c.name}</span>
            <span className="px-2 py-0.5 rounded-full text-[8px] font-bold" style={{ background: C.green + "20", color: C.green }}>Aktywna</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
            <div><span className="block" style={{ color: C.gray }}>Leady</span><span className="font-bold text-white">{c.leads}</span></div>
            <div><span className="block" style={{ color: C.gray }}>CPL</span><span className="font-bold" style={{ color: C.blue }}>{c.cpl.toFixed(0)} zł</span></div>
            <div><span className="block" style={{ color: C.gray }}>Budżet</span><span className="font-bold text-white">{Math.round(c.spent / c.budget * 100)}%</span></div>
          </div>
          <div className="w-full h-1.5 rounded-full mt-2" style={{ background: C.bg }}>
            <div className="h-full rounded-full" style={{ width: `${(c.spent / c.budget) * 100}%`, background: `linear-gradient(to right, ${C.blue}, ${C.violet})` }} />
          </div>
        </div>
      ))}

      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-white">AI Rekomendacje</span>
        <button onClick={() => onNav("ai")} className="text-[10px] font-medium flex items-center gap-1" style={{ color: C.blue }}>Wszystkie <ChevronRight className="w-3 h-3" /></button>
      </div>
      {aiInsights.slice(0, 2).map((ins, i) => (
        <div key={i} className="p-3 rounded-xl flex gap-3 items-start" style={{ background: C.card, borderLeft: `3px solid ${ins.priority === "high" ? C.violet : C.blue}` }}>
          <Lightbulb className="w-4 h-4 shrink-0 mt-0.5" style={{ color: ins.priority === "high" ? C.violet : C.blue }} />
          <div className="flex-1 min-w-0">
            <span className="text-[11px] font-bold text-white">{ins.title}</span>
            <p className="text-[10px] mt-0.5" style={{ color: C.gray }}>{ins.desc.slice(0, 80)}...</p>
          </div>
          <span className="px-2 py-0.5 rounded text-[8px] font-bold shrink-0" style={{ background: C.green + "20", color: C.green }}>{ins.impact}</span>
        </div>
      ))}
    </div>
  );
}

function CampaignsPage() {
  const [filter, setFilter] = useState<CampaignFilter>("all");
  const filtered = filter === "all" ? campaigns : campaigns.filter(c => c.status === filter);

  return (
    <div className="p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-sm text-white">Kampanie reklamowe</h2>
        <button className="px-3 py-1.5 rounded-lg text-[10px] font-bold text-white" style={{ background: `linear-gradient(135deg, ${C.blue}, ${C.violet})` }}>+ Nowa kampania</button>
      </div>
      <div className="flex gap-1.5">
        {([["all", "Wszystkie"], ["active", "Aktywne"], ["paused", "Wstrzymane"], ["ended", "Zakończone"]] as [CampaignFilter, string][]).map(([id, l]) => (
          <button key={id} onClick={() => setFilter(id)} className="px-3 py-1.5 rounded-lg text-[10px] font-medium transition-all"
            style={filter === id ? { background: C.blue, color: "white" } : { background: C.card, color: C.gray }}>{l}</button>
        ))}
      </div>
      {filtered.map((c, i) => {
        const st = statusColors[c.status];
        return (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            className="p-3 rounded-xl" style={{ background: C.card }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-white">{c.name}</span>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold" style={{ background: st.bg, color: st.fg }}>{st.label}</span>
            </div>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div><span className="text-[8px] block" style={{ color: C.gray }}>Platforma</span><span className="text-[10px] font-bold text-white">{c.platform}</span></div>
              <div><span className="text-[8px] block" style={{ color: C.gray }}>Budżet</span><span className="text-[10px] font-bold text-white">{c.budget.toLocaleString()} zł</span></div>
              <div><span className="text-[8px] block" style={{ color: C.gray }}>Leady</span><span className="text-[10px] font-bold" style={{ color: C.blue }}>{c.leads}</span></div>
              <div><span className="text-[8px] block" style={{ color: C.gray }}>CPL</span><span className="text-[10px] font-bold" style={{ color: C.green }}>{c.cpl.toFixed(0)} zł</span></div>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex-1 h-1.5 rounded-full" style={{ background: C.bg }}>
                <div className="h-full rounded-full" style={{ width: `${(c.spent / c.budget) * 100}%`, background: `linear-gradient(to right, ${C.blue}, ${C.violet})` }} />
              </div>
              <span className="text-[8px] font-bold shrink-0" style={{ color: C.gray }}>{c.spent.toLocaleString()} / {c.budget.toLocaleString()} zł</span>
            </div>
          </motion.div>
        );
      })}
    </div>
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
    <div className="p-4 space-y-4">
      <h2 className="font-bold text-sm text-white">Analityka — ostatnie 12 tygodni</h2>
      <div className="p-3 rounded-xl" style={{ background: C.card }}>
        <canvas ref={ref} width={380} height={170} className="w-full h-auto" />
        <p className="text-center text-[10px] mt-1" style={{ color: C.gray }}>Konwersje tygodniowe</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 rounded-xl" style={{ background: C.card }}>
          <p className="text-[9px] font-bold uppercase mb-2" style={{ color: C.gray }}>Źródła konwersji</p>
          {[{ l: "Google Ads", v: 38, c: C.blue }, { l: "Facebook", v: 32, c: "#1877F2" }, { l: "Organic", v: 18, c: C.green }, { l: "LinkedIn", v: 12, c: "#0A66C2" }].map((s, i) => (
            <div key={i} className="flex items-center gap-2 mb-1.5">
              <div className="w-2 h-2 rounded-full shrink-0" style={{ background: s.c }} />
              <span className="text-[10px] flex-1 text-white">{s.l}</span>
              <span className="text-[10px] font-bold text-white">{s.v}%</span>
            </div>
          ))}
        </div>
        <div className="p-3 rounded-xl" style={{ background: C.card }}>
          <p className="text-[9px] font-bold uppercase mb-2" style={{ color: C.gray }}>Funnel</p>
          {[{ l: "Wyświetlenia", v: 24580, p: 100 }, { l: "Kliknięcia", v: 1180, p: 48 }, { l: "Leady", v: 342, p: 29 }, { l: "Sprzedaż", v: 48, p: 14 }].map((s, i) => (
            <div key={i} className="mb-2">
              <div className="flex justify-between text-[10px]">
                <span className="text-white">{s.l}</span>
                <span className="font-bold" style={{ color: C.violet }}>{s.v.toLocaleString()}</span>
              </div>
              <div className="w-full h-1.5 rounded-full" style={{ background: C.bg }}>
                <div className="h-full rounded-full" style={{ width: `${s.p}%`, background: `linear-gradient(to right, ${C.blue}, ${C.violet})` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[{ l: "CPA", v: "36 zł", c: C.blue }, { l: "ROAS", v: "3.8x", c: C.green }, { l: "LTV", v: "2 400 zł", c: C.violet }].map((s, i) => (
          <div key={i} className="p-2.5 rounded-xl text-center" style={{ background: C.card }}>
            <span className="font-bold text-sm block" style={{ color: s.c }}>{s.v}</span>
            <span className="text-[9px]" style={{ color: C.gray }}>{s.l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AiInsightsPage() {
  return (
    <div className="p-4 space-y-4">
      <div className="p-4 rounded-xl" style={{ background: `linear-gradient(135deg, ${C.blue}20, ${C.violet}20)`, border: `1px solid ${C.blue}30` }}>
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-5 h-5" style={{ color: C.neon }} />
          <h2 className="font-bold text-sm text-white">AI Marketing Engine</h2>
        </div>
        <p className="text-[10px]" style={{ color: C.text }}>Analiza danych z {campaigns.length} kampanii na {new Set(campaigns.map(c => c.platform)).size} platformach. Ostatnia aktualizacja: 5 min temu.</p>
        <div className="grid grid-cols-3 gap-2 mt-3">
          {[{ v: aiInsights.length.toString(), l: "Rekomendacji" }, { v: aiInsights.filter(i => i.priority === "high").length.toString(), l: "Priorytetów" }, { v: "92%", l: "Trafność AI" }].map((s, i) => (
            <div key={i} className="p-2 rounded-lg text-center" style={{ background: C.card }}>
              <span className="font-bold text-xs text-white block">{s.v}</span>
              <span className="text-[8px]" style={{ color: C.gray }}>{s.l}</span>
            </div>
          ))}
        </div>
      </div>

      {aiInsights.map((ins, i) => (
        <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
          className="p-3 rounded-xl" style={{ background: C.card, borderLeft: `3px solid ${ins.priority === "high" ? C.violet : C.blue}` }}>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: ins.priority === "high" ? C.violet + "20" : C.blue + "15" }}>
              <Lightbulb className="w-4 h-4" style={{ color: ins.priority === "high" ? C.violet : C.blue }} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-bold text-white">{ins.title}</span>
                <span className="px-2 py-0.5 rounded text-[8px] font-bold ml-auto" style={{
                  background: ins.priority === "high" ? C.violet + "20" : C.blue + "20",
                  color: ins.priority === "high" ? C.violet : C.blue
                }}>{ins.priority === "high" ? "Wysoki" : "Średni"}</span>
              </div>
              <p className="text-[10px] leading-relaxed" style={{ color: C.gray }}>{ins.desc}</p>
              <div className="flex items-center gap-3 mt-2">
                <span className="px-2 py-0.5 rounded text-[9px] font-bold" style={{ background: C.green + "20", color: C.green }}>Wpływ: {ins.impact}</span>
                <button className="px-3 py-1 rounded-lg text-[10px] font-bold text-white" style={{ background: `linear-gradient(135deg, ${C.blue}, ${C.violet})` }}>Zastosuj</button>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
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
    <div className="p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-sm text-white">Raporty dla klientów</h2>
        <button className="px-3 py-1.5 rounded-lg text-[10px] font-bold text-white" style={{ background: C.violet }}>+ Generuj raport</button>
      </div>
      {reports.map((r, i) => (
        <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
          className="flex items-center gap-3 p-3 rounded-xl" style={{ background: C.card }}>
          <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: r.status === "ready" ? C.violet + "20" : C.amber + "20" }}>
            <BarChart3 className="w-4 h-4" style={{ color: r.status === "ready" ? C.violet : C.amber }} />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[11px] font-semibold block truncate text-white">{r.name}</span>
            <span className="text-[9px]" style={{ color: C.gray }}>{r.date} · {r.campaigns} kampanii · {r.pages > 0 ? `${r.pages} stron` : "—"}</span>
          </div>
          {r.status === "ready" ? (
            <div className="flex gap-1 shrink-0">
              <button className="px-2 py-1 rounded text-[9px] font-bold" style={{ background: C.sidebar, color: C.text }}>PDF</button>
              <button className="px-2 py-1 rounded text-[9px] font-bold" style={{ background: C.violet + "20", color: C.violet }}>Wyślij</button>
            </div>
          ) : (
            <span className="px-2 py-1 rounded text-[8px] font-medium shrink-0" style={{ background: C.amber + "20", color: C.amber }}>Generowanie...</span>
          )}
        </motion.div>
      ))}
      <div className="p-3 rounded-xl" style={{ background: C.card, borderLeft: `3px solid ${C.violet}` }}>
        <div className="flex items-center gap-2">
          <Send className="w-4 h-4" style={{ color: C.violet }} />
          <span className="text-[11px] font-bold text-white">Auto-wysyłka raportów</span>
        </div>
        <p className="text-[10px] mt-1" style={{ color: C.gray }}>Raporty wysyłane automatycznie do klientów 1. dnia miesiąca o 09:00. Ostatnia wysyłka: 1 mar 2026.</p>
      </div>
    </div>
  );
}
