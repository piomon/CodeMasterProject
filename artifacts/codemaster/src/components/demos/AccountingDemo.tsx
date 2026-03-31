import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PreviewShell, DemoNav, DemoSection, DemoBenefits, DemoFooterCTA } from "./PreviewShell";
import { FileText, CreditCard, Users, BarChart3, Download, CheckCircle2, Clock, AlertTriangle, Upload, Home, PieChart, Bell, Calendar, ChevronRight, Shield, ArrowUpRight, ArrowDownRight, MessageCircle, Filter } from "lucide-react";

const C = { navy: "#0F2A4A", steel: "#3B5998", white: "#F8FAFC", gray: "#6B7280", green: "#10B981", blue: "#2563EB", red: "#EF4444", amber: "#F59E0B", light: "#EFF3F8", dark: "#1A3A5C" };

const documents = [
  { name: "Faktura_032026_001.pdf", type: "Faktura", date: "28 mar 2026", status: "processed", size: "240 KB" },
  { name: "Wyciag_bankowy_03.pdf", type: "Wyciąg", date: "26 mar 2026", status: "processed", size: "180 KB" },
  { name: "Umowa_zlecenie_KN.pdf", type: "Umowa", date: "24 mar 2026", status: "pending", size: "420 KB" },
  { name: "PIT-36_2025.pdf", type: "Deklaracja", date: "20 mar 2026", status: "review", size: "85 KB" },
  { name: "Faktura_022026_018.pdf", type: "Faktura", date: "15 mar 2026", status: "processed", size: "210 KB" },
];

const statusMap: Record<string, { color: string; label: string }> = {
  processed: { color: C.green, label: "Zaksięgowane" },
  pending: { color: C.amber, label: "Oczekuje" },
  review: { color: C.blue, label: "Do weryfikacji" },
};

const deadlines = [
  { name: "VAT-7 za marzec", date: "25 kwi 2026", days: 25, type: "vat", urgent: false },
  { name: "ZUS DRA za marzec", date: "15 kwi 2026", days: 15, type: "zus", urgent: false },
  { name: "PIT-5L zaliczka", date: "20 kwi 2026", days: 20, type: "pit", urgent: false },
  { name: "JPK_V7 za marzec", date: "25 kwi 2026", days: 25, type: "jpk", urgent: false },
];

export function AccountingDemo({ name }: { name: string; features: string[] }) {
  const [page, setPage] = useState("dashboard");
  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: <Home className="w-3 h-3" /> },
    { id: "documents", label: "Dokumenty", icon: <FileText className="w-3 h-3" /> },
    { id: "reports", label: "Raporty", icon: <BarChart3 className="w-3 h-3" /> },
    { id: "calendar", label: "Kalendarz", icon: <Calendar className="w-3 h-3" /> },
    { id: "messages", label: "Wiadomości", icon: <MessageCircle className="w-3 h-3" /> },
  ];

  return (
    <PreviewShell title={name}>
      <DemoNav tabs={tabs} activeTab={page} onTabChange={setPage} logo="FinPortal" />
      <AnimatePresence mode="wait">
        <motion.div key={page} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
          {page === "dashboard" && <DashboardPage onNav={setPage} />}
          {page === "documents" && <DocumentsPage />}
          {page === "reports" && <ReportsPage />}
          {page === "calendar" && <CalendarPage />}
          {page === "messages" && <MessagesPage />}
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
            <p className="text-[10px] tracking-[0.4em] uppercase" style={{ color: C.steel }}>Panel Klienta</p>
            <h1 className="font-display font-bold text-3xl mt-1 text-white">Fin<span style={{ color: "#60A5FA" }}>Portal</span></h1>
          </div>
          <div className="relative">
            <Bell className="w-5 h-5 text-white/60" />
            <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full text-[7px] font-bold flex items-center justify-center text-white" style={{ background: C.red }}>2</div>
          </div>
        </div>
        <p className="text-xs text-white/60 mb-5">Biuro rachunkowe Kowalski & Partnerzy</p>

        <div className="p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <p className="text-[9px] font-bold uppercase text-white/40 mb-2">Co wymaga Twojej uwagi</p>
          <div className="space-y-2">
            {[
              { text: "Wyślij fakturę za marzec — brak 3 dokumentów", icon: AlertTriangle, color: C.amber },
              { text: "PIT-36 do weryfikacji — oczekuje na Twój podpis", icon: FileText, color: C.blue },
            ].map((a, i) => (
              <div key={i} className="flex items-center gap-2 p-2.5 rounded-lg" style={{ background: "rgba(255,255,255,0.05)" }}>
                <a.icon className="w-4 h-4 shrink-0" style={{ color: a.color }} />
                <span className="text-[10px] text-white/80 flex-1">{a.text}</span>
                <ChevronRight className="w-3 h-3 text-white/30" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <DemoSection>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Przychód (marzec)", val: "84 200 zł", change: "+12%", up: true, color: C.green },
            { label: "Koszty (marzec)", val: "42 800 zł", change: "+5%", up: true, color: C.red },
            { label: "Saldo", val: "41 400 zł", change: "+22%", up: true, color: C.blue },
            { label: "Dokumenty", val: "48", change: "5 nowych", up: true, color: C.steel },
          ].map((k, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className="p-3 rounded-xl border" style={{ borderColor: C.light, background: C.white }}>
              <span className="text-[9px] uppercase font-bold" style={{ color: C.gray }}>{k.label}</span>
              <span className="font-bold text-base block mt-1" style={{ color: C.navy }}>{k.val}</span>
              <span className="text-[10px] font-medium flex items-center gap-0.5" style={{ color: k.color }}>
                {k.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}{k.change}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center justify-between mt-2">
          <h3 className="font-bold text-sm" style={{ color: C.navy }}>Nadchodzące terminy</h3>
          <button onClick={() => onNav("calendar")} className="text-[10px] font-medium flex items-center gap-1" style={{ color: C.blue }}>Kalendarz <ChevronRight className="w-3 h-3" /></button>
        </div>
        {deadlines.slice(0, 3).map((d, i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-xl border" style={{ borderColor: C.light, background: C.white }}>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: d.days <= 7 ? C.red + "10" : C.blue + "10" }}>
              <Calendar className="w-5 h-5" style={{ color: d.days <= 7 ? C.red : C.blue }} />
            </div>
            <div className="flex-1">
              <span className="text-xs font-semibold" style={{ color: C.navy }}>{d.name}</span>
              <p className="text-[10px]" style={{ color: C.gray }}>{d.date}</p>
            </div>
            <span className="text-[10px] font-bold" style={{ color: d.days <= 7 ? C.red : C.green }}>za {d.days} dni</span>
          </div>
        ))}

        <div className="flex items-center justify-between mt-2">
          <h3 className="font-bold text-sm" style={{ color: C.navy }}>Ostatnie dokumenty</h3>
          <button onClick={() => onNav("documents")} className="text-[10px] font-medium flex items-center gap-1" style={{ color: C.blue }}>Wszystkie <ChevronRight className="w-3 h-3" /></button>
        </div>
        {documents.slice(0, 3).map((d, i) => {
          const st = statusMap[d.status];
          return (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl border" style={{ borderColor: C.light, background: C.white }}>
              <FileText className="w-5 h-5 shrink-0" style={{ color: C.blue }} />
              <div className="flex-1 min-w-0">
                <span className="text-xs font-medium truncate block" style={{ color: C.navy }}>{d.name}</span>
                <p className="text-[10px]" style={{ color: C.gray }}>{d.type} · {d.date}</p>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold shrink-0" style={{ background: st.color + "15", color: st.color }}>{st.label}</span>
            </div>
          );
        })}
      </DemoSection>

      <DemoBenefits accentColor={C.blue} bgColor={C.light} textColor={C.navy} benefits={[
        { icon: "📄", title: "Dokumenty online", desc: "Upload i śledzenie statusu" },
        { icon: "📅", title: "Kalendarz podatkowy", desc: "Terminy i przypomnienia" },
        { icon: "📊", title: "Raporty finansowe", desc: "Przychody, koszty, saldo" },
        { icon: "🔒", title: "Bezpieczeństwo", desc: "Szyfrowanie i RODO" },
      ]} />
      <DemoFooterCTA accentColor={C.blue} bgColor={C.navy} />
    </div>
  );
}

function DocumentsPage() {
  return (
    <DemoSection>
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-sm" style={{ color: C.navy }}>Dokumenty</h3>
        <motion.button whileHover={{ scale: 1.02 }} className="px-3 py-1.5 rounded-lg text-[10px] font-bold text-white flex items-center gap-1" style={{ background: C.blue }}>
          <Upload className="w-3 h-3" /> Wyślij dokument
        </motion.button>
      </div>
      <div className="space-y-2">
        {documents.map((d, i) => {
          const st = statusMap[d.status];
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
              className="flex items-center gap-3 p-3 rounded-xl border hover:shadow-sm transition-all cursor-pointer" style={{ borderColor: C.light, background: C.white }}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: C.blue + "10" }}>
                <FileText className="w-5 h-5" style={{ color: C.blue }} />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-xs font-semibold truncate block" style={{ color: C.navy }}>{d.name}</span>
                <p className="text-[10px]" style={{ color: C.gray }}>{d.type} · {d.date} · {d.size}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold" style={{ background: st.color + "15", color: st.color }}>{st.label}</span>
                <button className="p-1.5 rounded-lg" style={{ background: C.light }}><Download className="w-3.5 h-3.5" style={{ color: C.navy }} /></button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </DemoSection>
  );
}

function ReportsPage() {
  return (
    <DemoSection>
      <h3 className="font-bold text-sm" style={{ color: C.navy }}>Raporty finansowe — Marzec 2026</h3>
      <div className="grid grid-cols-3 gap-2">
        {[{ l: "Przychód", v: "84 200 zł", c: C.green }, { l: "Koszty", v: "42 800 zł", c: C.red }, { l: "Zysk netto", v: "41 400 zł", c: C.blue }].map((s, i) => (
          <div key={i} className="p-3 rounded-xl text-center" style={{ background: C.light }}>
            <span className="font-bold text-sm block" style={{ color: s.c }}>{s.v}</span>
            <span className="text-[9px]" style={{ color: C.gray }}>{s.l}</span>
          </div>
        ))}
      </div>

      <div className="p-4 rounded-xl" style={{ background: C.light }}>
        <p className="text-[10px] font-bold uppercase mb-3" style={{ color: C.gray }}>Przychód vs Koszty (6 mies.)</p>
        <div className="flex gap-1 items-end justify-center" style={{ height: 100 }}>
          {[{ m: "Paź", p: 62, k: 38 }, { m: "Lis", p: 71, k: 42 }, { m: "Gru", p: 88, k: 48 }, { m: "Sty", p: 72, k: 40 }, { m: "Lut", p: 79, k: 44 }, { m: "Mar", p: 84, k: 43 }].map((d, i) => (
            <div key={i} className="flex-1 text-center">
              <div className="flex gap-0.5 items-end justify-center" style={{ height: 80 }}>
                <motion.div initial={{ height: 0 }} animate={{ height: `${d.p * 0.85}px` }} transition={{ delay: i * 0.05 }}
                  className="flex-1 rounded-t" style={{ background: C.green }} />
                <motion.div initial={{ height: 0 }} animate={{ height: `${d.k * 0.85}px` }} transition={{ delay: i * 0.05 + 0.1 }}
                  className="flex-1 rounded-t" style={{ background: C.red + "60" }} />
              </div>
              <span className="text-[8px] mt-1 block" style={{ color: C.gray }}>{d.m}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-4 mt-2">
          <span className="flex items-center gap-1 text-[9px]" style={{ color: C.gray }}><div className="w-2 h-2 rounded" style={{ background: C.green }} /> Przychód</span>
          <span className="flex items-center gap-1 text-[9px]" style={{ color: C.gray }}><div className="w-2 h-2 rounded" style={{ background: C.red + "60" }} /> Koszty</span>
        </div>
      </div>

      <div className="p-4 rounded-xl" style={{ background: C.light }}>
        <p className="text-[10px] font-bold uppercase mb-2" style={{ color: C.gray }}>Struktura kosztów</p>
        {[{ l: "Wynagrodzenia", v: 18400, p: 43 }, { l: "Czynsz i media", v: 8200, p: 19 }, { l: "Marketing", v: 6800, p: 16 }, { l: "IT i narzędzia", v: 4200, p: 10 }, { l: "Pozostałe", v: 5200, p: 12 }].map((c, i) => (
          <div key={i} className="mb-2">
            <div className="flex justify-between text-[10px]">
              <span style={{ color: C.navy }}>{c.l}</span>
              <span className="font-bold" style={{ color: C.navy }}>{c.v.toLocaleString()} zł ({c.p}%)</span>
            </div>
            <div className="w-full h-1.5 rounded-full mt-0.5" style={{ background: C.navy + "10" }}>
              <div className="h-full rounded-full" style={{ width: `${c.p}%`, background: C.blue }} />
            </div>
          </div>
        ))}
      </div>
    </DemoSection>
  );
}

function CalendarPage() {
  return (
    <DemoSection>
      <h3 className="font-bold text-sm" style={{ color: C.navy }}>Kalendarz podatkowy</h3>
      <p className="text-xs" style={{ color: C.gray }}>Kwiecień 2026 — nadchodzące terminy</p>
      <div className="space-y-2">
        {deadlines.map((d, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
            className="flex items-center gap-3 p-4 rounded-xl border" style={{ borderColor: C.light, background: C.white }}>
            <div className="w-12 h-12 rounded-xl flex flex-col items-center justify-center shrink-0" style={{ background: d.days <= 7 ? C.red + "10" : C.blue + "10" }}>
              <span className="text-xs font-bold" style={{ color: d.days <= 7 ? C.red : C.blue }}>{d.date.split(" ")[0]}</span>
              <span className="text-[8px]" style={{ color: C.gray }}>{d.date.split(" ")[1]}</span>
            </div>
            <div className="flex-1">
              <h4 className="text-xs font-semibold" style={{ color: C.navy }}>{d.name}</h4>
              <p className="text-[10px]" style={{ color: C.gray }}>{d.date}</p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-[10px] font-bold block" style={{ color: d.days <= 7 ? C.red : C.green }}>za {d.days} dni</span>
              <span className="px-2 py-0.5 rounded text-[8px] font-bold" style={{ background: C.light, color: C.navy }}>{d.type.toUpperCase()}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </DemoSection>
  );
}

function MessagesPage() {
  const messages = [
    { from: "Ewa Kowalska (księgowa)", text: "Proszę o dosłanie brakujących faktur za marzec. Potrzebuję: FV od Media Expert i FV za hosting.", time: "2h temu", unread: true },
    { from: "System", text: "Przypomnienie: termin VAT-7 za luty upłynął. Deklaracja została złożona terminowo.", time: "3 dni temu", unread: false },
    { from: "Ewa Kowalska (księgowa)", text: "PIT-36 za 2025 rok jest gotowy do weryfikacji. Proszę sprawdzić i zaakceptować.", time: "5 dni temu", unread: false },
  ];
  return (
    <DemoSection>
      <h3 className="font-bold text-sm" style={{ color: C.navy }}>Wiadomości</h3>
      <div className="space-y-2">
        {messages.map((m, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
            className="p-4 rounded-xl border cursor-pointer hover:shadow-sm transition-all" style={{ borderColor: m.unread ? C.blue + "30" : C.light, background: m.unread ? C.blue + "03" : C.white }}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold" style={{ color: C.navy }}>{m.from}</span>
              <span className="text-[9px]" style={{ color: C.gray }}>{m.time}</span>
            </div>
            <p className="text-[10px] leading-relaxed" style={{ color: C.gray }}>{m.text}</p>
            {m.unread && <div className="w-2 h-2 rounded-full mt-2" style={{ background: C.blue }} />}
          </motion.div>
        ))}
      </div>
      <div className="p-3 rounded-xl" style={{ background: C.light }}>
        <div className="flex gap-2">
          <input placeholder="Napisz wiadomość..." className="flex-1 px-3 py-2 rounded-lg border text-xs" style={{ borderColor: C.navy + "15", background: C.white, color: C.navy }} />
          <motion.button whileHover={{ scale: 1.02 }} className="px-4 py-2 rounded-lg text-xs font-bold text-white" style={{ background: C.blue }}>Wyślij</motion.button>
        </div>
      </div>
    </DemoSection>
  );
}
