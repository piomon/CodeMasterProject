import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PreviewShell, DemoNav, DemoSection } from "./PreviewShell";
import { FileText, CreditCard, Users, BarChart3, Download, CheckCircle2, Clock, AlertTriangle, Upload, Home, PieChart, Bell } from "lucide-react";

const C = { navy: "#1B3A5C", steel: "#4682B4", white: "#FFFFFF", gray: "#94A3B8", light: "#F1F5F9", green: "#10B981", orange: "#F59E0B", red: "#EF4444" };

const documents = [
  { name: "Faktura FV/2026/03/042", type: "Faktura", date: "22 mar 2026", status: "pending", amount: "12 450 zł" },
  { name: "PIT-36 (2025)", type: "Deklaracja", date: "20 mar 2026", status: "ready", amount: "—" },
  { name: "ZUS DRA – marzec", type: "ZUS", date: "15 mar 2026", status: "sent", amount: "1 431 zł" },
  { name: "Faktura FV/2026/03/041", type: "Faktura", date: "12 mar 2026", status: "done", amount: "8 200 zł" },
  { name: "VAT-7 – luty", type: "Deklaracja", date: "25 lut 2026", status: "done", amount: "3 280 zł" },
];

const alerts = [
  { text: "Termin PIT-36: 30 kwietnia 2026", type: "warning", days: 31 },
  { text: "Brak 2 faktur kosztowych za marzec", type: "error", days: 0 },
  { text: "ZUS DRA wysłany pomyślnie", type: "success", days: 0 },
  { text: "Zaliczka PIT: do 20 kwietnia", type: "info", days: 21 },
];

export function AccountingDemo({ name }: { name: string; features: string[] }) {
  const [page, setPage] = useState("dashboard");
  const tabs = [
    { id: "dashboard", label: "Pulpit", icon: <Home className="w-3 h-3" /> },
    { id: "documents", label: "Dokumenty", icon: <FileText className="w-3 h-3" /> },
    { id: "upload", label: "Dodaj", icon: <Upload className="w-3 h-3" /> },
    { id: "finance", label: "Finanse", icon: <PieChart className="w-3 h-3" /> },
    { id: "alerts", label: "Alerty", icon: <Bell className="w-3 h-3" /> },
    { id: "panel", label: "Panel biura", icon: <BarChart3 className="w-3 h-3" /> },
  ];

  return (
    <PreviewShell title={name}>
      <DemoNav tabs={tabs} activeTab={page} onTabChange={setPage} logo="FinBooks" />
      <AnimatePresence mode="wait">
        <motion.div key={page} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
          {page === "dashboard" && <DashboardPage onNav={setPage} />}
          {page === "documents" && <DocumentsPage />}
          {page === "upload" && <UploadPage />}
          {page === "finance" && <FinancePage />}
          {page === "alerts" && <AlertsPage />}
          {page === "panel" && <PanelPage />}
        </motion.div>
      </AnimatePresence>
    </PreviewShell>
  );
}

function DashboardPage({ onNav }: { onNav: (p: string) => void }) {
  return (
    <div>
      <div className="p-10 text-center" style={{ background: `linear-gradient(160deg, ${C.navy}, ${C.steel})` }}>
        <p className="text-[10px] tracking-[0.4em] uppercase" style={{ color: C.white + "80" }}>Biuro Rachunkowe Online</p>
        <h1 className="font-display font-bold text-4xl mt-2 text-white">FinBooks</h1>
        <p className="text-xs mt-2 max-w-[260px] mx-auto leading-relaxed text-white/70">Pełna księgowość, faktury, ZUS, PIT — wszystko w jednym miejscu. Automatyzacja, która oszczędza Twój czas.</p>
        <div className="flex gap-3 justify-center mt-6">
          <motion.button whileHover={{ scale: 1.03 }} onClick={() => onNav("upload")}
            className="px-7 py-3.5 rounded-lg font-bold text-sm shadow-lg text-white" style={{ background: C.steel }}>Dodaj dokument</motion.button>
          <button onClick={() => onNav("documents")} className="px-7 py-3.5 rounded-lg font-semibold text-sm border border-white/30 text-white">Dokumenty</button>
        </div>
      </div>
      <DemoSection>
        <div className="grid grid-cols-4 gap-2">
          {[
            { icon: "📄", label: "Faktury", desc: "Auto-import" },
            { icon: "🏦", label: "ZUS / PIT", desc: "Terminowo" },
            { icon: "📊", label: "Raporty", desc: "Real-time" },
            { icon: "🔒", label: "Bezpieczeństwo", desc: "Szyfrowanie" },
          ].map((f, i) => (
            <div key={i} className="p-2.5 rounded-xl text-center" style={{ background: C.light }}>
              <span className="text-lg block">{f.icon}</span>
              <span className="text-[8px] font-bold block mt-0.5" style={{ color: C.navy }}>{f.label}</span>
              <span className="text-[7px]" style={{ color: C.gray }}>{f.desc}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3 mt-3">
          {[
            { label: "Przychody", val: "48 200 zł", change: "+12%", color: C.green },
            { label: "Koszty", val: "31 800 zł", change: "+5%", color: C.red },
            { label: "Podatek VAT", val: "3 280 zł", change: "", color: C.steel },
            { label: "Dochód", val: "16 400 zł", change: "+18%", color: C.navy },
          ].map((s, i) => (
            <div key={i} className="p-3 rounded-xl border" style={{ borderColor: C.light, background: C.white }}>
              <span className="text-[10px]" style={{ color: C.gray }}>{s.label}</span>
              <span className="font-bold text-base block" style={{ color: s.color }}>{s.val}</span>
              {s.change && <span className="text-[10px]" style={{ color: s.change.startsWith("+") ? C.green : C.red }}>{s.change}</span>}
            </div>
          ))}
        </div>
        <div className="p-4 rounded-2xl mt-3" style={{ background: C.light, border: `1px solid ${C.steel}15` }}>
          <p className="text-[10px] tracking-[0.2em] uppercase text-center" style={{ color: C.steel }}>Opinie klientów</p>
          <p className="text-xs mt-2 text-center italic" style={{ color: C.navy + "90" }}>"FinBooks zrewolucjonizował moją księgowość. Auto-import faktur i automatyczne deklaracje ZUS to game changer."</p>
          <p className="text-[10px] text-center mt-1" style={{ color: C.steel }}>— Tomasz N. ★★★★★</p>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-3">
          {[{ v: "1,200+", l: "Firm" },{ v: "99.9%", l: "Uptime" },{ v: "4.8", l: "Ocena" }].map((s, i) => (
            <div key={i} className="p-3 rounded-xl text-center" style={{ background: `${C.steel}08` }}>
              <span className="font-bold text-sm block" style={{ color: C.steel }}>{s.v}</span>
              <span className="text-[9px]" style={{ color: C.gray }}>{s.l}</span>
            </div>
          ))}
        </div>
      </DemoSection>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { bg: string; color: string; label: string }> = {
    pending: { bg: C.orange + "15", color: C.orange, label: "Do weryfikacji" },
    ready: { bg: C.steel + "15", color: C.steel, label: "Gotowy" },
    sent: { bg: C.green + "15", color: C.green, label: "Wysłany" },
    done: { bg: C.green + "15", color: C.green, label: "Zakończony" },
  };
  const s = map[status] || map.pending;
  return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: s.bg, color: s.color }}>{s.label}</span>;
}

function DocumentsPage() {
  const [filter, setFilter] = useState("all");
  return (
    <DemoSection>
      <div className="flex gap-2 mb-3">
        {[["all", "Wszystkie"], ["Faktura", "Faktury"], ["Deklaracja", "Deklaracje"], ["ZUS", "ZUS"]].map(([id, label]) => (
          <button key={id} onClick={() => setFilter(id)} className="px-3 py-1.5 rounded-full text-xs font-medium"
            style={filter === id ? { background: C.navy, color: C.white } : { background: C.light, color: C.gray }}>{label}</button>
        ))}
      </div>
      {documents.filter(d => filter === "all" || d.type === filter).map((d, i) => (
        <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
          className="flex items-center gap-3 p-3 rounded-xl border" style={{ borderColor: C.light, background: C.white }}>
          <FileText className="w-4 h-4" style={{ color: C.steel }} />
          <div className="flex-1">
            <span className="text-xs font-medium" style={{ color: C.navy }}>{d.name}</span>
            <p className="text-[10px]" style={{ color: C.gray }}>{d.type} • {d.date}</p>
          </div>
          <span className="text-xs font-bold" style={{ color: C.navy }}>{d.amount}</span>
          <StatusBadge status={d.status} />
          <Download className="w-3.5 h-3.5 cursor-pointer" style={{ color: C.steel }} />
        </motion.div>
      ))}
    </DemoSection>
  );
}

function UploadPage() {
  const [uploaded, setUploaded] = useState(false);
  return (
    <DemoSection>
      <h3 className="font-semibold text-sm" style={{ color: C.navy }}>Dodaj dokument</h3>
      {!uploaded ? (
        <>
          <motion.div whileHover={{ borderColor: C.steel }} onClick={() => setUploaded(true)}
            className="p-8 rounded-xl border-2 border-dashed text-center cursor-pointer" style={{ borderColor: C.gray + "40" }}>
            <Upload className="w-8 h-8 mx-auto mb-2" style={{ color: C.steel }} />
            <p className="text-sm font-medium" style={{ color: C.navy }}>Przeciągnij plik lub kliknij</p>
            <p className="text-[10px]" style={{ color: C.gray }}>PDF, JPG, PNG — max 10MB</p>
          </motion.div>
          <select className="w-full px-4 py-3 rounded-xl border text-sm" style={{ borderColor: C.light, background: C.white, color: C.navy }}>
            <option>Typ dokumentu...</option><option>Faktura zakupowa</option><option>Faktura sprzedażowa</option><option>Wyciąg bankowy</option><option>Umowa</option>
          </select>
        </>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-6">
          <CheckCircle2 className="w-10 h-10 mx-auto mb-2" style={{ color: C.green }} />
          <p className="font-bold text-sm" style={{ color: C.navy }}>Dokument przesłany!</p>
          <p className="text-xs" style={{ color: C.gray }}>Twój księgowy otrzymał powiadomienie</p>
        </motion.div>
      )}
    </DemoSection>
  );
}

function FinancePage() {
  const months = [
    { m: "Sty", income: 42, costs: 28 },{ m: "Lut", income: 38, costs: 25 },{ m: "Mar", income: 48, costs: 32 },
  ];
  return (
    <DemoSection>
      <h3 className="font-semibold text-sm" style={{ color: C.navy }}>Przegląd finansowy</h3>
      <div className="p-4 rounded-xl" style={{ background: C.light }}>
        <div className="flex gap-4 items-end justify-center h-32">
          {months.map((m, i) => (
            <div key={i} className="text-center">
              <div className="flex gap-1 items-end">
                <div className="w-6 rounded-t" style={{ height: `${m.income * 2}px`, background: C.green }} />
                <div className="w-6 rounded-t" style={{ height: `${m.costs * 2}px`, background: C.red + "60" }} />
              </div>
              <span className="text-[10px] mt-1 block" style={{ color: C.gray }}>{m.m}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-4 justify-center mt-2">
          <span className="text-[10px] flex items-center gap-1"><span className="w-3 h-3 rounded" style={{ background: C.green }} /> Przychody</span>
          <span className="text-[10px] flex items-center gap-1"><span className="w-3 h-3 rounded" style={{ background: C.red + "60" }} /> Koszty</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mt-3">
        {[{ l: "VAT do zapłaty", v: "3 280 zł", d: "do 25 kwi" },{ l: "ZUS łączny", v: "1 431 zł", d: "do 15 kwi" },{ l: "Zaliczka PIT", v: "2 890 zł", d: "do 20 kwi" },{ l: "Saldo konta", v: "67 420 zł", d: "na 22 mar" }].map((s, i) => (
          <div key={i} className="p-3 rounded-xl border" style={{ borderColor: C.light, background: C.white }}>
            <span className="text-[10px]" style={{ color: C.gray }}>{s.l}</span>
            <span className="font-bold text-sm block" style={{ color: C.navy }}>{s.v}</span>
            <span className="text-[9px]" style={{ color: C.gray }}>{s.d}</span>
          </div>
        ))}
      </div>
    </DemoSection>
  );
}

function AlertsPage() {
  const iconMap: Record<string, typeof AlertTriangle> = { warning: AlertTriangle, error: AlertTriangle, success: CheckCircle2, info: Bell };
  const colorMap: Record<string, string> = { warning: C.orange, error: C.red, success: C.green, info: C.steel };
  return (
    <DemoSection>
      <h3 className="font-semibold text-sm" style={{ color: C.navy }}>Powiadomienia</h3>
      <div className="space-y-2">
        {alerts.map((a, i) => {
          const Icon = iconMap[a.type];
          return (
            <div key={i} className="flex items-center gap-3 p-4 rounded-xl border" style={{ borderColor: colorMap[a.type] + "30", background: colorMap[a.type] + "05" }}>
              <Icon className="w-5 h-5 shrink-0" style={{ color: colorMap[a.type] }} />
              <span className="text-xs flex-1" style={{ color: C.navy }}>{a.text}</span>
              {a.days > 0 && <span className="text-xs font-bold" style={{ color: colorMap[a.type] }}>{a.days}d</span>}
            </div>
          );
        })}
      </div>
    </DemoSection>
  );
}

function PanelPage() {
  return (
    <DemoSection>
      <h3 className="font-semibold text-sm" style={{ color: C.navy }}>Panel biura rachunkowego</h3>
      <div className="grid grid-cols-4 gap-2">
        {[{ l: "Klienci", v: "42" },{ l: "Dokumenty", v: "186" },{ l: "Oczekujące", v: "12" },{ l: "Termin", v: "8 dni" }].map((s, i) => (
          <div key={i} className="p-3 rounded-xl text-center" style={{ background: C.light }}>
            <span className="font-bold text-base block" style={{ color: C.steel }}>{s.v}</span>
            <span className="text-[9px]" style={{ color: C.gray }}>{s.l}</span>
          </div>
        ))}
      </div>
      <h4 className="text-xs font-bold mt-3" style={{ color: C.navy }}>Klienci do obsługi</h4>
      {["ABC Transport Sp. z o.o.", "Jan Kowalski – JDG", "MedTech Solutions S.A."].map((c, i) => (
        <div key={i} className="flex items-center gap-3 p-3 rounded-xl border" style={{ borderColor: C.light, background: C.white }}>
          <Users className="w-4 h-4" style={{ color: C.steel }} />
          <span className="text-xs flex-1" style={{ color: C.navy }}>{c}</span>
          <span className="px-2 py-0.5 rounded text-[10px] font-medium" style={{ background: i === 0 ? C.orange + "15" : C.green + "15", color: i === 0 ? C.orange : C.green }}>
            {i === 0 ? "3 oczekujące" : "OK"}
          </span>
        </div>
      ))}
    </DemoSection>
  );
}
