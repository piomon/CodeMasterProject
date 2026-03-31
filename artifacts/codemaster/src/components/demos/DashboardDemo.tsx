import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PreviewShell, DemoNav, DemoSection, DemoBenefits, DemoFooterCTA } from "./PreviewShell";
import { BarChart3, TrendingUp, Users, DollarSign, Home, PieChart, Activity, Settings, Bell, FileText, ArrowUpRight, ArrowDownRight, Eye, ShieldCheck, Zap, Globe, Calendar, Filter, Download, ChevronRight, Clock, Target, Layers } from "lucide-react";

const C = { navy: "#0F172A", blue: "#3B82F6", green: "#10B981", gray: "#64748B", white: "#F8FAFC", light: "#F1F5F9", dark: "#1E293B", violet: "#8B5CF6", red: "#EF4444", amber: "#F59E0B", cyan: "#06B6D4" };

const kpiData = [
  { label: "Przychód miesięczny", val: "128 450 zł", change: "+14.2%", up: true, icon: DollarSign, color: C.green, sparkline: [40, 55, 48, 62, 58, 72, 68, 85] },
  { label: "Aktywni użytkownicy", val: "2 480", change: "+8.1%", up: true, icon: Users, color: C.blue, sparkline: [30, 35, 42, 38, 50, 55, 48, 60] },
  { label: "Współczynnik konwersji", val: "3.24%", change: "+0.4%", up: true, icon: Target, color: C.violet, sparkline: [20, 28, 25, 35, 30, 40, 38, 45] },
  { label: "Średni czas sesji", val: "4m 32s", change: "-0.8%", up: false, icon: Clock, color: C.amber, sparkline: [50, 48, 45, 42, 40, 38, 42, 40] },
];

const revenueMonths = [
  { m: "Paź", v: 72000 }, { m: "Lis", v: 85000 }, { m: "Gru", v: 98000 },
  { m: "Sty", v: 88000 }, { m: "Lut", v: 105000 }, { m: "Mar", v: 128450 },
];

const activityFeed = [
  { text: "Nowy klient: Salon Elegance Sp. z o.o.", time: "2 min temu", type: "user", color: C.blue },
  { text: "Zamówienie #4821 — 12 400 zł opłacone", time: "15 min temu", type: "payment", color: C.green },
  { text: "Raport Q1 wygenerowany automatycznie", time: "1h temu", type: "report", color: C.violet },
  { text: "Alert: wzrost bounce rate na /cennik o 12%", time: "2h temu", type: "alert", color: C.amber },
  { text: "Nowa rejestracja: Tomasz Wiśniewski", time: "3h temu", type: "user", color: C.blue },
];

const teamMembers = [
  { name: "Anna Kowalska", email: "anna@firma.pl", role: "Administrator", department: "Zarząd", active: true, avatar: "AK" },
  { name: "Piotr Nowak", email: "piotr@firma.pl", role: "Menedżer", department: "Sprzedaż", active: true, avatar: "PN" },
  { name: "Katarzyna Dąbrowska", email: "kasia@firma.pl", role: "Analityk", department: "Marketing", active: true, avatar: "KD" },
  { name: "Marek Zieliński", email: "marek@firma.pl", role: "Deweloper", department: "IT", active: false, avatar: "MZ" },
  { name: "Ewa Lewandowska", email: "ewa@firma.pl", role: "Księgowa", department: "Finanse", active: true, avatar: "EL" },
  { name: "Jan Wójcik", email: "jan@firma.pl", role: "Support", department: "Obsługa", active: true, avatar: "JW" },
];

const topPages = [
  { page: "/produkty", views: "12 480", bounce: "32%", conv: "4.8%" },
  { page: "/cennik", views: "8 920", bounce: "28%", conv: "6.2%" },
  { page: "/demo", views: "6 340", bounce: "41%", conv: "3.1%" },
  { page: "/kontakt", views: "4 180", bounce: "18%", conv: "12.4%" },
  { page: "/blog/ai-w-biznesie", views: "3 750", bounce: "45%", conv: "2.8%" },
];

export function DashboardDemo({ name }: { name: string; features: string[]; industry: string }) {
  const [page, setPage] = useState("overview");
  const tabs = [
    { id: "overview", label: "Przegląd", icon: <Home className="w-3 h-3" /> },
    { id: "analytics", label: "Analityka", icon: <BarChart3 className="w-3 h-3" /> },
    { id: "users", label: "Zespół", icon: <Users className="w-3 h-3" /> },
    { id: "reports", label: "Raporty", icon: <FileText className="w-3 h-3" /> },
    { id: "settings", label: "Ustawienia", icon: <Settings className="w-3 h-3" /> },
  ];

  return (
    <PreviewShell title={name}>
      <DemoNav tabs={tabs} activeTab={page} onTabChange={setPage} logo="BizPanel" />
      <AnimatePresence mode="wait">
        <motion.div key={page} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
          {page === "overview" && <OverviewPage onNav={setPage} />}
          {page === "analytics" && <AnalyticsPage />}
          {page === "users" && <UsersPage />}
          {page === "reports" && <ReportsPage />}
          {page === "settings" && <SettingsPage />}
        </motion.div>
      </AnimatePresence>
    </PreviewShell>
  );
}

function MiniSparkline({ data, color, width = 60, height = 20 }: { data: number[]; color: string; width?: number; height?: number }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * width},${height - ((v - min) / range) * height}`).join(" ");
  return (
    <svg width={width} height={height} className="inline-block">
      <polyline fill="none" stroke={color} strokeWidth="1.5" points={points} />
    </svg>
  );
}

function OverviewPage({ onNav }: { onNav: (p: string) => void }) {
  return (
    <div>
      <div className="p-8 pb-10" style={{ background: `linear-gradient(160deg, ${C.navy}, ${C.dark})` }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[10px] tracking-[0.4em] uppercase" style={{ color: C.cyan }}>Business Intelligence</p>
            <h1 className="font-display font-bold text-3xl mt-1 text-white">BizPanel <span className="text-lg font-normal text-white/40">Pro</span></h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Bell className="w-5 h-5 text-white/60" />
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full text-[7px] font-bold flex items-center justify-center text-white" style={{ background: C.red }}>3</div>
            </div>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: `linear-gradient(135deg, ${C.blue}, ${C.violet})` }}>PM</div>
          </div>
        </div>
        <p className="text-xs text-white/60 mb-6">Witaj, Piotrze. Oto Twój przegląd na dziś, 31 marca 2026.</p>
        <div className="grid grid-cols-2 gap-3">
          {kpiData.map((k, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className="p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="flex items-center gap-1.5 mb-1">
                <k.icon className="w-3.5 h-3.5" style={{ color: k.color }} />
                <span className="text-[9px] text-white/50">{k.label}</span>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <span className="font-bold text-base text-white block">{k.val}</span>
                  <span className="text-[10px] font-medium flex items-center gap-0.5" style={{ color: k.up ? C.green : C.red }}>
                    {k.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}{k.change}
                  </span>
                </div>
                <MiniSparkline data={k.sparkline} color={k.color} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <DemoSection>
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm" style={{ color: C.navy }}>Przychód — ostatnie 6 miesięcy</h3>
          <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ background: C.green + "15", color: C.green }}>↑ Trend rosnący</span>
        </div>
        <div className="p-4 rounded-xl" style={{ background: C.light }}>
          <div className="flex gap-2 items-end justify-center" style={{ height: 120 }}>
            {revenueMonths.map((m, i) => {
              const maxV = 140000;
              const h = (m.v / maxV) * 100;
              return (
                <div key={i} className="text-center flex-1 group relative">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity px-2 py-0.5 rounded text-[8px] font-bold text-white whitespace-nowrap" style={{ background: C.navy }}>
                    {(m.v / 1000).toFixed(0)}K zł
                  </div>
                  <motion.div initial={{ height: 0 }} animate={{ height: `${h}px` }} transition={{ delay: i * 0.08, duration: 0.5 }}
                    className="rounded-t-lg mx-auto cursor-pointer" style={{ width: "100%", background: i === revenueMonths.length - 1 ? `linear-gradient(to top, ${C.blue}, ${C.violet})` : `linear-gradient(to top, ${C.blue}40, ${C.blue}80)` }} />
                  <span className="text-[9px] mt-1 block" style={{ color: C.gray }}>{m.m}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between mt-2">
          <h3 className="font-bold text-sm" style={{ color: C.navy }}>Aktywność</h3>
          <button className="text-[10px] font-medium flex items-center gap-1" style={{ color: C.blue }}>Zobacz wszystko <ChevronRight className="w-3 h-3" /></button>
        </div>
        {activityFeed.map((a, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
            className="flex items-center gap-3 p-3 rounded-xl hover:shadow-sm transition-all cursor-pointer" style={{ background: C.white, border: `1px solid ${C.light}` }}>
            <div className="w-2 h-2 rounded-full shrink-0" style={{ background: a.color }} />
            <span className="text-xs flex-1" style={{ color: C.navy }}>{a.text}</span>
            <span className="text-[9px] shrink-0" style={{ color: C.gray }}>{a.time}</span>
          </motion.div>
        ))}

        <div className="grid grid-cols-3 gap-2 mt-2">
          {[{ v: "96.8%", l: "Uptime", c: C.green },{ v: "142ms", l: "Avg. response", c: C.blue },{ v: "0", l: "Błędy krytyczne", c: C.green }].map((s, i) => (
            <div key={i} className="p-3 rounded-xl text-center" style={{ background: C.light }}>
              <span className="font-bold text-sm block" style={{ color: s.c }}>{s.v}</span>
              <span className="text-[8px]" style={{ color: C.gray }}>{s.l}</span>
            </div>
          ))}
        </div>
      </DemoSection>

      <DemoBenefits accentColor={C.blue} bgColor={C.light} textColor={C.navy} benefits={[
        { icon: "📊", title: "Analityka real-time", desc: "KPI, wykresy i alerty na żywo" },
        { icon: "👥", title: "Zarządzanie zespołem", desc: "Role, uprawnienia, aktywność" },
        { icon: "📱", title: "W pełni responsywny", desc: "Desktop, tablet i mobile" },
        { icon: "🔒", title: "Bezpieczeństwo", desc: "2FA, logi, audyt, RODO" },
      ]} />
      <DemoFooterCTA accentColor={C.blue} bgColor={C.navy} />
    </div>
  );
}

function AnalyticsPage() {
  const [period, setPeriod] = useState("30d");
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = chartRef.current; if (!c) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    ctx.clearRect(0, 0, c.width, c.height);
    const data = [3200, 4100, 3800, 5200, 4800, 6100, 5500, 7200, 6800, 8100, 7400, 8900];
    const maxV = 10000;
    const w = c.width, h = c.height;
    const padding = 30;
    const plotW = w - padding * 2;
    const plotH = h - padding * 2;
    ctx.strokeStyle = C.light;
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= 4; i++) {
      const y = padding + (plotH / 4) * i;
      ctx.beginPath(); ctx.moveTo(padding, y); ctx.lineTo(w - padding, y); ctx.stroke();
      ctx.fillStyle = C.gray;
      ctx.font = "9px sans-serif";
      ctx.textAlign = "right";
      ctx.fillText(((maxV - (maxV / 4) * i) / 1000).toFixed(0) + "K", padding - 5, y + 3);
    }
    const grad = ctx.createLinearGradient(0, padding, 0, h - padding);
    grad.addColorStop(0, C.violet + "40"); grad.addColorStop(1, C.violet + "05");
    ctx.beginPath();
    data.forEach((v, i) => {
      const x = padding + (plotW / (data.length - 1)) * i;
      const y = padding + plotH - (v / maxV) * plotH;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    const lastX = padding + plotW;
    const lastY = padding + plotH - (data[data.length - 1] / maxV) * plotH;
    ctx.strokeStyle = C.violet;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.lineTo(lastX, h - padding);
    ctx.lineTo(padding, h - padding);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();
    data.forEach((v, i) => {
      const x = padding + (plotW / (data.length - 1)) * i;
      const y = padding + plotH - (v / maxV) * plotH;
      ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fillStyle = C.violet; ctx.fill();
      ctx.strokeStyle = "white"; ctx.lineWidth = 1.5; ctx.stroke();
    });
  }, [period]);

  return (
    <DemoSection>
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-sm" style={{ color: C.navy }}>Analityka szczegółowa</h3>
        <div className="flex gap-1">
          {["7d", "30d", "90d"].map(p => (
            <button key={p} onClick={() => setPeriod(p)} className="px-2.5 py-1 rounded-lg text-[10px] font-medium transition-all"
              style={period === p ? { background: C.blue, color: "white" } : { background: C.light, color: C.gray }}>{p}</button>
          ))}
        </div>
      </div>
      <div className="p-3 rounded-xl" style={{ background: C.white, border: `1px solid ${C.light}` }}>
        <canvas ref={chartRef} width={380} height={200} className="w-full h-auto" />
      </div>

      <h4 className="font-bold text-sm mt-2" style={{ color: C.navy }}>Najpopularniejsze strony</h4>
      <div className="rounded-xl overflow-hidden border" style={{ borderColor: C.light }}>
        <div className="grid grid-cols-4 gap-0 p-2.5 text-[9px] font-bold" style={{ background: C.light, color: C.gray }}>
          <span>Strona</span><span className="text-center">Odsłony</span><span className="text-center">Bounce</span><span className="text-center">Konwersja</span>
        </div>
        {topPages.map((p, i) => (
          <div key={i} className="grid grid-cols-4 gap-0 p-2.5 text-xs border-t" style={{ borderColor: C.light, background: C.white }}>
            <span className="font-mono text-[10px] font-medium" style={{ color: C.blue }}>{p.page}</span>
            <span className="text-center" style={{ color: C.navy }}>{p.views}</span>
            <span className="text-center" style={{ color: C.gray }}>{p.bounce}</span>
            <span className="text-center font-medium" style={{ color: C.green }}>{p.conv}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 mt-2">
        <div className="p-4 rounded-xl" style={{ background: C.light }}>
          <p className="text-[9px] font-bold uppercase mb-2" style={{ color: C.gray }}>Źródła ruchu</p>
          {[{ l: "Organic", v: 42, c: C.green }, { l: "Direct", v: 28, c: C.blue }, { l: "Social", v: 18, c: C.violet }, { l: "Paid", v: 12, c: C.amber }].map((s, i) => (
            <div key={i} className="flex items-center gap-2 mb-1.5">
              <div className="w-2 h-2 rounded-full" style={{ background: s.c }} />
              <span className="text-[10px] flex-1" style={{ color: C.navy }}>{s.l}</span>
              <span className="text-[10px] font-bold" style={{ color: C.navy }}>{s.v}%</span>
            </div>
          ))}
        </div>
        <div className="p-4 rounded-xl" style={{ background: C.light }}>
          <p className="text-[9px] font-bold uppercase mb-2" style={{ color: C.gray }}>Urządzenia</p>
          {[{ l: "Desktop", v: 54, c: C.blue }, { l: "Mobile", v: 38, c: C.violet }, { l: "Tablet", v: 8, c: C.cyan }].map((s, i) => (
            <div key={i} className="mb-2">
              <div className="flex justify-between text-[10px] mb-0.5">
                <span style={{ color: C.navy }}>{s.l}</span>
                <span className="font-bold" style={{ color: s.c }}>{s.v}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full" style={{ background: C.navy + "10" }}>
                <div className="h-full rounded-full" style={{ width: `${s.v}%`, background: s.c }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </DemoSection>
  );
}

function UsersPage() {
  const [search, setSearch] = useState("");
  const filtered = teamMembers.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.department.toLowerCase().includes(search.toLowerCase()));
  return (
    <DemoSection>
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-sm" style={{ color: C.navy }}>Zespół ({teamMembers.length})</h3>
        <motion.button whileHover={{ scale: 1.02 }} className="px-3 py-1.5 rounded-lg text-[10px] font-bold text-white" style={{ background: C.blue }}>+ Dodaj osobę</motion.button>
      </div>
      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Szukaj po imieniu lub dziale..."
        className="w-full px-4 py-2.5 rounded-xl border text-xs" style={{ borderColor: C.light, background: C.white, color: C.navy }} />
      <div className="space-y-2">
        {filtered.map((u, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            className="flex items-center gap-3 p-3 rounded-xl border hover:shadow-sm transition-all cursor-pointer" style={{ borderColor: C.light, background: C.white }}>
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
              style={{ background: `linear-gradient(135deg, ${[C.blue, C.violet, C.green, C.amber, C.cyan, C.red][i % 6]}, ${C.navy})` }}>{u.avatar}</div>
            <div className="flex-1 min-w-0">
              <span className="text-xs font-semibold block truncate" style={{ color: C.navy }}>{u.name}</span>
              <p className="text-[10px] truncate" style={{ color: C.gray }}>{u.email}</p>
            </div>
            <div className="text-right shrink-0">
              <span className="px-2 py-0.5 rounded text-[9px] font-medium block mb-0.5" style={{ background: C.light, color: C.navy }}>{u.role}</span>
              <span className="text-[8px]" style={{ color: C.gray }}>{u.department}</span>
            </div>
            <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: u.active ? C.green : C.gray }} title={u.active ? "Online" : "Offline"} />
          </motion.div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2 mt-2">
        {[{ v: "6", l: "Członków", c: C.blue },{ v: "5", l: "Online", c: C.green },{ v: "3", l: "Działy", c: C.violet }].map((s, i) => (
          <div key={i} className="p-3 rounded-xl text-center" style={{ background: C.light }}>
            <span className="font-bold text-sm block" style={{ color: s.c }}>{s.v}</span>
            <span className="text-[9px]" style={{ color: C.gray }}>{s.l}</span>
          </div>
        ))}
      </div>
    </DemoSection>
  );
}

function ReportsPage() {
  const reports = [
    { name: "Raport Q1 2026 — Przychody i zyski", date: "31 mar 2026", type: "Finansowy", size: "2.4 MB", status: "ready" },
    { name: "Analiza konwersji — Luty 2026", date: "28 lut 2026", type: "Marketing", size: "1.8 MB", status: "ready" },
    { name: "Raport użytkowników — Styczeń", date: "31 sty 2026", type: "Użytkownicy", size: "1.2 MB", status: "ready" },
    { name: "Prognoza Q2 2026", date: "W przygotowaniu", type: "Strategiczny", size: "—", status: "pending" },
  ];

  return (
    <DemoSection>
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-sm" style={{ color: C.navy }}>Raporty</h3>
        <div className="flex gap-1.5">
          <button className="px-3 py-1.5 rounded-lg text-[10px] font-medium flex items-center gap-1" style={{ background: C.light, color: C.gray }}>
            <Filter className="w-3 h-3" /> Filtruj
          </button>
          <motion.button whileHover={{ scale: 1.02 }} className="px-3 py-1.5 rounded-lg text-[10px] font-bold text-white" style={{ background: C.blue }}>+ Generuj raport</motion.button>
        </div>
      </div>
      <div className="space-y-2">
        {reports.map((r, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="flex items-center gap-3 p-4 rounded-xl border hover:shadow-sm transition-all" style={{ borderColor: C.light, background: C.white }}>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: r.status === "ready" ? C.blue + "10" : C.amber + "10" }}>
              <FileText className="w-5 h-5" style={{ color: r.status === "ready" ? C.blue : C.amber }} />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-xs font-semibold block truncate" style={{ color: C.navy }}>{r.name}</span>
              <p className="text-[10px]" style={{ color: C.gray }}>{r.date} · {r.type} · {r.size}</p>
            </div>
            {r.status === "ready" ? (
              <button className="px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 shrink-0" style={{ background: C.light, color: C.navy }}>
                <Download className="w-3 h-3" /> PDF
              </button>
            ) : (
              <span className="px-2.5 py-1 rounded-lg text-[9px] font-medium shrink-0" style={{ background: C.amber + "15", color: C.amber }}>W przygotowaniu</span>
            )}
          </motion.div>
        ))}
      </div>
      <div className="p-4 rounded-xl mt-2" style={{ background: `linear-gradient(135deg, ${C.blue}08, ${C.violet}08)`, border: `1px solid ${C.blue}15` }}>
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-4 h-4" style={{ color: C.violet }} />
          <span className="text-xs font-bold" style={{ color: C.navy }}>Automatyczne raporty</span>
        </div>
        <p className="text-[10px]" style={{ color: C.gray }}>Skonfiguruj harmonogram wysyłki raportów na e-mail. Dostępne formaty: PDF, CSV, Excel.</p>
        <button className="mt-2 px-3 py-1.5 rounded-lg text-[10px] font-bold text-white" style={{ background: C.violet }}>Skonfiguruj</button>
      </div>
    </DemoSection>
  );
}

function SettingsPage() {
  const [settings, setSettings] = useState({
    emailNotif: true, pushNotif: false, autoReports: true, darkMode: false, twoFactor: true, apiAccess: false,
  });
  return (
    <DemoSection>
      <h3 className="font-bold text-sm" style={{ color: C.navy }}>Ustawienia</h3>
      <div className="space-y-1">
        {[
          { key: "emailNotif" as const, label: "Powiadomienia e-mail", desc: "Otrzymuj alerty na swoją skrzynkę" },
          { key: "pushNotif" as const, label: "Powiadomienia push", desc: "Natychmiastowe alerty w przeglądarce" },
          { key: "autoReports" as const, label: "Raporty automatyczne", desc: "Tygodniowy raport co poniedziałek" },
          { key: "darkMode" as const, label: "Tryb ciemny", desc: "Zmniejsz obciążenie oczu" },
          { key: "twoFactor" as const, label: "Weryfikacja dwuetapowa", desc: "Dodatkowa warstwa bezpieczeństwa" },
          { key: "apiAccess" as const, label: "Dostęp API", desc: "Integracja z zewnętrznymi narzędziami" },
        ].map((s, i) => (
          <label key={i} className="flex items-center justify-between p-3.5 rounded-xl border cursor-pointer hover:shadow-sm transition-all"
            style={{ borderColor: C.light, background: C.white }}>
            <div>
              <span className="text-sm font-medium block" style={{ color: C.navy }}>{s.label}</span>
              <span className="text-[10px]" style={{ color: C.gray }}>{s.desc}</span>
            </div>
            <div className="relative w-10 h-5 rounded-full transition-colors cursor-pointer"
              style={{ background: settings[s.key] ? C.blue : C.gray + "40" }}
              onClick={(e) => { e.preventDefault(); setSettings(prev => ({ ...prev, [s.key]: !prev[s.key] })); }}>
              <div className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform"
                style={{ transform: settings[s.key] ? "translateX(22px)" : "translateX(2px)" }} />
            </div>
          </label>
        ))}
      </div>
      <div className="p-4 rounded-xl mt-2" style={{ background: C.light }}>
        <div className="flex items-center gap-2 mb-2">
          <ShieldCheck className="w-4 h-4" style={{ color: C.green }} />
          <span className="text-xs font-bold" style={{ color: C.navy }}>Bezpieczeństwo konta</span>
        </div>
        <p className="text-[10px]" style={{ color: C.gray }}>Ostatnie logowanie: dziś, 09:42 · Warszawa, PL</p>
        <p className="text-[10px] mt-0.5" style={{ color: C.gray }}>Aktywne sesje: 2 (desktop, mobile)</p>
      </div>
    </DemoSection>
  );
}
