import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PreviewShell, DemoNav, DemoSection } from "./PreviewShell";
import { BarChart3, TrendingUp, Users, DollarSign, Home, PieChart, Activity, Settings, CheckCircle2, Bell, FileText } from "lucide-react";

const C = { navy: "#0F172A", blue: "#3B82F6", green: "#10B981", gray: "#64748B", white: "#F8FAFC", light: "#F1F5F9", dark: "#1E293B", violet: "#8B5CF6" };

export function DashboardDemo({ name }: { name: string; features: string[]; industry: string }) {
  const [page, setPage] = useState("overview");
  const tabs = [
    { id: "overview", label: "Przegląd", icon: <Home className="w-3 h-3" /> },
    { id: "analytics", label: "Analityka", icon: <BarChart3 className="w-3 h-3" /> },
    { id: "users", label: "Użytkownicy", icon: <Users className="w-3 h-3" /> },
    { id: "reports", label: "Raporty", icon: <FileText className="w-3 h-3" /> },
    { id: "settings", label: "Ustawienia", icon: <Settings className="w-3 h-3" /> },
  ];

  return (
    <PreviewShell title={name}>
      <DemoNav tabs={tabs} activeTab={page} onTabChange={setPage} logo="Dashboard" />
      <AnimatePresence mode="wait">
        <motion.div key={page} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
          {page === "overview" && <OverviewPage />}
          {page === "analytics" && <AnalyticsPage />}
          {page === "users" && <UsersPage />}
          {page === "reports" && <ReportsPage />}
          {page === "settings" && <SettingsPage />}
        </motion.div>
      </AnimatePresence>
    </PreviewShell>
  );
}

function OverviewPage() {
  return (
    <div>
      <div className="p-8 text-center" style={{ background: `linear-gradient(160deg, ${C.navy}, ${C.dark})` }}>
        <p className="text-[10px] tracking-[0.4em] uppercase" style={{ color: C.blue }}>Business Intelligence</p>
        <h1 className="font-display font-bold text-3xl mt-2 text-white">Dashboard</h1>
        <p className="text-xs mt-2 max-w-[260px] mx-auto leading-relaxed text-white/70">Panel analityczny Twojego biznesu. KPI, raporty, zarządzanie zespołem — wszystko w jednym miejscu.</p>
        <div className="flex gap-2 justify-center mt-3">
          <button className="px-4 py-1.5 rounded-full text-[10px] font-bold text-white" style={{ background: C.blue }}>Rozpocznij analizę</button>
          <button className="px-4 py-1.5 rounded-full text-[10px] font-bold border text-white" style={{ borderColor: C.blue }}>Zobacz raporty</button>
        </div>
      </div>
      <DemoSection>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Przychód", val: "128K zł", change: "+14%", icon: DollarSign, color: C.green },
            { label: "Użytkownicy", val: "2,480", change: "+8%", icon: Users, color: C.blue },
            { label: "Konwersja", val: "3.2%", change: "+0.4%", icon: TrendingUp, color: C.violet },
            { label: "Aktywność", val: "89%", change: "+2%", icon: Activity, color: "#F59E0B" },
          ].map((k, i) => (
            <div key={i} className="p-3 rounded-xl border" style={{ borderColor: C.light, background: C.white }}>
              <div className="flex items-center gap-2 mb-1"><k.icon className="w-4 h-4" style={{ color: k.color }} /><span className="text-[10px]" style={{ color: C.gray }}>{k.label}</span></div>
              <span className="font-bold text-lg block" style={{ color: C.navy }}>{k.val}</span>
              <span className="text-[10px] font-medium" style={{ color: C.green }}>{k.change}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-2 mt-3">
          {[
            { icon: "📊", label: "Raporty", desc: "Automatyczne" },
            { icon: "👥", label: "Zespół", desc: "Role & dostęp" },
            { icon: "🔔", label: "Alerty", desc: "Real-time" },
            { icon: "📱", label: "Mobile", desc: "Responsive" },
          ].map((f, i) => (
            <div key={i} className="p-2.5 rounded-xl text-center" style={{ background: C.light }}>
              <span className="text-lg block">{f.icon}</span>
              <span className="text-[8px] font-bold block mt-0.5" style={{ color: C.navy }}>{f.label}</span>
              <span className="text-[7px]" style={{ color: C.gray }}>{f.desc}</span>
            </div>
          ))}
        </div>
        <h4 className="font-bold text-sm mt-4" style={{ color: C.navy }}>Ostatnia aktywność</h4>
        {[
          { text: "Nowy użytkownik: Anna K.", time: "2 min temu", icon: Users },
          { text: "Zamówienie #4821 opłacone", time: "15 min temu", icon: DollarSign },
          { text: "Raport miesięczny wygenerowany", time: "1h temu", icon: FileText },
        ].map((a, i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: C.light }}>
            <a.icon className="w-4 h-4" style={{ color: C.blue }} />
            <div className="flex-1"><span className="text-xs" style={{ color: C.navy }}>{a.text}</span></div>
            <span className="text-[10px]" style={{ color: C.gray }}>{a.time}</span>
          </div>
        ))}
        <div className="p-4 rounded-2xl mt-3" style={{ background: C.light, border: `1px solid ${C.blue}15` }}>
          <p className="text-[10px] tracking-[0.2em] uppercase text-center" style={{ color: C.blue }}>Opinie użytkowników</p>
          <p className="text-xs mt-2 text-center italic" style={{ color: C.navy + "90" }}>"Najlepszy dashboard jaki widziałem. Intuicyjny, szybki, z prawdziwą analityką."</p>
          <p className="text-[10px] text-center mt-1" style={{ color: C.blue }}>— Piotr M. ★★★★★</p>
        </div>
      </DemoSection>
    </div>
  );
}

function AnalyticsPage() {
  const months = [
    { m: "Sty", v: 42 },{ m: "Lut", v: 38 },{ m: "Mar", v: 55 },{ m: "Kwi", v: 48 },{ m: "Maj", v: 62 },{ m: "Cze", v: 58 },
  ];
  return (
    <DemoSection>
      <h3 className="font-bold text-sm" style={{ color: C.navy }}>Analityka — 6 miesięcy</h3>
      <div className="p-4 rounded-xl" style={{ background: C.light }}>
        <div className="flex gap-2 items-end justify-center h-32">
          {months.map((m, i) => (
            <div key={i} className="text-center flex-1">
              <motion.div initial={{ height: 0 }} animate={{ height: `${m.v * 1.8}px` }} transition={{ delay: i * 0.05 }}
                className="rounded-t mx-auto" style={{ width: "100%", background: `linear-gradient(to top, ${C.blue}, ${C.violet})` }} />
              <span className="text-[10px] mt-1 block" style={{ color: C.gray }}>{m.m}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 mt-3">
        {[{ l: "Avg/mies.", v: "50.5K" },{ l: "Najlepszy", v: "Maj 62K" },{ l: "Trend", v: "↑ Rosnący" }].map((s, i) => (
          <div key={i} className="p-3 rounded-xl text-center" style={{ background: C.light }}>
            <span className="font-bold text-xs block" style={{ color: C.navy }}>{s.v}</span>
            <span className="text-[9px]" style={{ color: C.gray }}>{s.l}</span>
          </div>
        ))}
      </div>
    </DemoSection>
  );
}

function UsersPage() {
  const users = [
    { name: "Jan Kowalski", email: "jan@example.com", role: "Admin", active: true },
    { name: "Anna Nowak", email: "anna@example.com", role: "Editor", active: true },
    { name: "Piotr Wiśniewski", email: "piotr@example.com", role: "Viewer", active: false },
    { name: "Ewa Dąbrowska", email: "ewa@example.com", role: "Editor", active: true },
  ];
  return (
    <DemoSection>
      <h3 className="font-bold text-sm" style={{ color: C.navy }}>Użytkownicy</h3>
      {users.map((u, i) => (
        <div key={i} className="flex items-center gap-3 p-3 rounded-xl border" style={{ borderColor: C.light, background: C.white }}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: C.blue, color: "white" }}>
            {u.name.split(" ").map(n => n[0]).join("")}
          </div>
          <div className="flex-1">
            <span className="text-xs font-medium" style={{ color: C.navy }}>{u.name}</span>
            <p className="text-[10px]" style={{ color: C.gray }}>{u.email}</p>
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] font-medium" style={{ background: C.light, color: C.navy }}>{u.role}</span>
          <div className="w-2 h-2 rounded-full" style={{ background: u.active ? C.green : C.gray }} />
        </div>
      ))}
    </DemoSection>
  );
}

function ReportsPage() {
  return (
    <DemoSection>
      <h3 className="font-bold text-sm" style={{ color: C.navy }}>Raporty</h3>
      {["Marzec 2026 — Przychody", "Luty 2026 — Użytkownicy", "Styczeń 2026 — Konwersje"].map((r, i) => (
        <div key={i} className="flex items-center gap-3 p-4 rounded-xl border" style={{ borderColor: C.light, background: C.white }}>
          <FileText className="w-5 h-5" style={{ color: C.blue }} />
          <div className="flex-1"><span className="text-sm font-medium" style={{ color: C.navy }}>{r}</span></div>
          <button className="px-3 py-1.5 rounded-lg text-[10px] font-bold" style={{ background: C.light, color: C.navy }}>PDF</button>
        </div>
      ))}
    </DemoSection>
  );
}

function SettingsPage() {
  return (
    <DemoSection>
      <h3 className="font-bold text-sm" style={{ color: C.navy }}>Ustawienia</h3>
      {[
        { label: "Powiadomienia e-mail", checked: true },
        { label: "Powiadomienia push", checked: false },
        { label: "Raporty automatyczne", checked: true },
        { label: "Tryb ciemny", checked: false },
      ].map((s, i) => (
        <label key={i} className="flex items-center justify-between p-3 rounded-xl border cursor-pointer" style={{ borderColor: C.light, background: C.white }}>
          <span className="text-sm" style={{ color: C.navy }}>{s.label}</span>
          <input type="checkbox" defaultChecked={s.checked} className="w-4 h-4 accent-blue-600" />
        </label>
      ))}
    </DemoSection>
  );
}
