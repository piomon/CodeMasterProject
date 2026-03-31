import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PreviewShell, DemoFooterCTA, DemoBenefits } from "./PreviewShell";
import { FileText, CreditCard, Users, BarChart3, Download, CheckCircle2, Clock, AlertTriangle, Home, PieChart, Bell, ChevronRight, ArrowUpRight, ArrowDownRight, Plus, Eye, Send, Printer, Search, Settings, HelpCircle } from "lucide-react";

const C = { sidebar: "#2F3136", sidebarHover: "#393C41", dark: "#1A1D21", white: "#FFFFFF", bg: "#F4F5F7", gray: "#6B7280", green: "#22C55E", red: "#EF4444", amber: "#F59E0B", blue: "#3B82F6", violet: "#8B5CF6", light: "#E5E7EB", accent: "#3B82F6" };

type InvoiceStatus = "paid" | "pending" | "overdue" | "draft";

interface Invoice {
  nr: string;
  client: string;
  date: string;
  due: string;
  amount: number;
  status: InvoiceStatus;
}

const invoices: Invoice[] = [
  { nr: "FV/2026/03/001", client: "TechPol Sp. z o.o.", date: "28 mar", due: "11 kwi", amount: 12300, status: "pending" },
  { nr: "FV/2026/03/002", client: "Studio Grafik", date: "25 mar", due: "08 kwi", amount: 4800, status: "pending" },
  { nr: "FV/2026/02/018", client: "Gastro Max", date: "22 lut", due: "08 mar", amount: 8200, status: "overdue" },
  { nr: "FV/2026/02/015", client: "ABC Logistyka", date: "18 lut", due: "04 mar", amount: 15600, status: "paid" },
  { nr: "FV/2026/02/012", client: "InnoSoft", date: "12 lut", due: "26 lut", amount: 22400, status: "paid" },
  { nr: "FV/2026/01/008", client: "TechPol Sp. z o.o.", date: "28 sty", due: "11 lut", amount: 11800, status: "paid" },
  { nr: "FV/2026/03/003", client: "Nowy klient", date: "31 mar", due: "—", amount: 0, status: "draft" },
];

const statusInfo: Record<InvoiceStatus, { bg: string; fg: string; label: string }> = {
  paid: { bg: C.green + "12", fg: C.green, label: "Opłacona" },
  pending: { bg: C.amber + "12", fg: C.amber, label: "Oczekuje" },
  overdue: { bg: C.red + "12", fg: C.red, label: "Zaległa" },
  draft: { bg: C.gray + "12", fg: C.gray, label: "Szkic" },
};

const clients = [
  { name: "TechPol Sp. z o.o.", nip: "123-456-78-90", invoices: 12, total: 148200, balance: 12300 },
  { name: "Studio Grafik", nip: "987-654-32-10", invoices: 6, total: 28800, balance: 4800 },
  { name: "Gastro Max", nip: "555-333-22-11", invoices: 8, total: 65600, balance: 8200 },
  { name: "ABC Logistyka", nip: "111-222-33-44", invoices: 15, total: 234000, balance: 0 },
  { name: "InnoSoft", nip: "777-888-99-00", invoices: 4, total: 89600, balance: 0 },
];

const sidebarItems: { id: AccountingPage; label: string; icon: JSX.Element; badge?: string }[] = [
  { id: "dashboard", label: "Panel", icon: <Home className="w-3.5 h-3.5" /> },
  { id: "invoices", label: "Faktury", icon: <FileText className="w-3.5 h-3.5" />, badge: "3" },
  { id: "preview", label: "Podgląd FV", icon: <Eye className="w-3.5 h-3.5" /> },
  { id: "clients", label: "Kontrahenci", icon: <Users className="w-3.5 h-3.5" /> },
  { id: "payments", label: "Płatności", icon: <CreditCard className="w-3.5 h-3.5" /> },
  { id: "reports", label: "Raporty", icon: <BarChart3 className="w-3.5 h-3.5" /> },
];

type AccountingPage = "dashboard" | "invoices" | "preview" | "clients" | "payments" | "reports";

export function AccountingDemo({ name }: { name: string; features: string[] }) {
  const [page, setPage] = useState<AccountingPage>("dashboard");

  return (
    <PreviewShell title={name}>
      <div className="flex" style={{ minHeight: 540 }}>
        <div className="w-[140px] shrink-0 flex flex-col" style={{ background: C.sidebar }}>
          <div className="px-3 py-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded flex items-center justify-center font-bold text-xs" style={{ background: C.accent, color: C.white }}>FP</div>
              <div>
                <h1 className="font-bold text-[10px] text-white">FinPortal</h1>
                <p className="text-[7px]" style={{ color: C.gray }}>System faktur</p>
              </div>
            </div>
          </div>
          <div className="flex-1 px-2 space-y-0.5">
            {sidebarItems.map(item => (
              <button key={item.id} onClick={() => setPage(item.id)}
                className="w-full flex items-center gap-2 px-2 py-1.5 rounded text-[10px] font-medium transition-colors"
                style={page === item.id ? { background: C.accent, color: C.white } : { color: C.gray }}>
                {item.icon}
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && <span className="px-1.5 py-0.5 rounded-full text-[7px] font-bold" style={{ background: C.red, color: C.white }}>{item.badge}</span>}
              </button>
            ))}
          </div>
          <div className="p-3 border-t" style={{ borderColor: C.sidebarHover }}>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-[8px] font-bold text-white" style={{ background: C.violet }}>PM</div>
              <div>
                <span className="text-[9px] text-white block">Piotr M.</span>
                <span className="text-[7px]" style={{ color: C.gray }}>Administrator</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col" style={{ background: C.bg }}>
          <div className="flex items-center justify-between px-4 py-2 border-b" style={{ background: C.white, borderColor: C.light }}>
            <div className="flex items-center gap-2 flex-1">
              <Search className="w-3.5 h-3.5" style={{ color: C.gray }} />
              <input placeholder="Szukaj faktur, klientów..." className="text-[10px] flex-1 outline-none" style={{ color: C.dark }} />
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Bell className="w-4 h-4" style={{ color: C.gray }} />
                <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full text-[6px] font-bold flex items-center justify-center text-white" style={{ background: C.red }}>2</div>
              </div>
              <button className="flex items-center gap-1 px-2.5 py-1.5 rounded text-[10px] font-bold text-white" style={{ background: C.accent }}>
                <Plus className="w-3 h-3" /> Nowa faktura
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <AnimatePresence mode="wait">
              <motion.div key={page} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                {page === "dashboard" && <DashboardPage onNav={setPage} />}
                {page === "invoices" && <InvoicesPage />}
                {page === "preview" && <PreviewPage />}
                {page === "clients" && <ClientsPage />}
                {page === "payments" && <PaymentsPage />}
                {page === "reports" && <ReportsPage />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      <DemoBenefits accentColor={C.accent} bgColor={C.bg} textColor={C.dark} benefits={[
        { icon: "📄", title: "Faktury online", desc: "Wystawiaj i śledź płatności" },
        { icon: "📅", title: "Automatyzacja", desc: "Cykliczne faktury i powiadomienia" },
        { icon: "📊", title: "Raporty", desc: "Przychody, koszty, zysk netto" },
        { icon: "🔒", title: "Bezpieczeństwo", desc: "Szyfrowanie i zgodność z RODO" },
      ]} />
      <DemoFooterCTA accentColor={C.accent} bgColor={C.dark} />
    </PreviewShell>
  );
}

function DashboardPage({ onNav }: { onNav: (p: string) => void }) {
  const totalPending = invoices.filter(i => i.status === "pending").reduce((a, i) => a + i.amount, 0);
  const totalOverdue = invoices.filter(i => i.status === "overdue").reduce((a, i) => a + i.amount, 0);
  const totalPaid = invoices.filter(i => i.status === "paid").reduce((a, i) => a + i.amount, 0);

  return (
    <div className="p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-sm" style={{ color: C.dark }}>Panel główny</h2>
        <span className="text-[10px]" style={{ color: C.gray }}>Marzec 2026</span>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {[
          { label: "Do zapłaty", value: `${(totalPending / 1000).toFixed(1)}K`, color: C.amber, icon: <Clock className="w-4 h-4" /> },
          { label: "Zaległe", value: `${(totalOverdue / 1000).toFixed(1)}K`, color: C.red, icon: <AlertTriangle className="w-4 h-4" /> },
          { label: "Opłacone", value: `${(totalPaid / 1000).toFixed(1)}K`, color: C.green, icon: <CheckCircle2 className="w-4 h-4" /> },
          { label: "Klienci", value: `${clients.length}`, color: C.accent, icon: <Users className="w-4 h-4" /> },
        ].map((s, i) => (
          <div key={i} className="p-2.5 rounded-xl" style={{ background: C.white }}>
            <div className="mb-1" style={{ color: s.color }}>{s.icon}</div>
            <span className="font-bold text-sm block" style={{ color: C.dark }}>{s.value}</span>
            <span className="text-[8px]" style={{ color: C.gray }}>{s.label}</span>
          </div>
        ))}
      </div>

      <div className="p-3 rounded-xl" style={{ background: C.white }}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold" style={{ color: C.dark }}>Przychód (6 mies.)</span>
        </div>
        <div className="flex items-end gap-2 h-16">
          {[
            { m: "Paź", v: 62 }, { m: "Lis", v: 71 }, { m: "Gru", v: 88 },
            { m: "Sty", v: 72 }, { m: "Lut", v: 79 }, { m: "Mar", v: 84 },
          ].map((d, i) => (
            <div key={i} className="flex-1 text-center">
              <span className="text-[7px] font-bold" style={{ color: C.dark }}>{d.v}k</span>
              <motion.div initial={{ height: 0 }} animate={{ height: `${(d.v / 88) * 100}%` }} transition={{ delay: i * 0.05 }}
                className="rounded-t mx-auto mt-0.5" style={{ width: "75%", background: i === 5 ? C.accent : C.accent + "30" }} />
              <span className="text-[7px] mt-0.5 block" style={{ color: C.gray }}>{d.m}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold" style={{ color: C.dark }}>Ostatnie faktury</span>
        <button onClick={() => onNav("invoices")} className="text-[9px] font-medium flex items-center gap-0.5" style={{ color: C.accent }}>Wszystkie <ChevronRight className="w-3 h-3" /></button>
      </div>
      {invoices.slice(0, 3).map((inv, i) => {
        const st = statusInfo[inv.status];
        return (
          <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl" style={{ background: C.white }}>
            <div className="w-8 h-8 rounded flex items-center justify-center" style={{ background: st.bg }}>
              <FileText className="w-4 h-4" style={{ color: st.fg }} />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-semibold truncate block" style={{ color: C.dark }}>{inv.client}</span>
              <span className="text-[9px]" style={{ color: C.gray }}>{inv.nr} · {inv.date}</span>
            </div>
            <div className="text-right shrink-0">
              <span className="font-bold text-[11px] block" style={{ color: C.dark }}>{inv.amount.toLocaleString()} zł</span>
              <span className="px-1.5 py-0.5 rounded text-[8px] font-bold" style={{ background: st.bg, color: st.fg }}>{st.label}</span>
            </div>
          </div>
        );
      })}

      <div className="p-3 rounded-xl" style={{ background: C.red + "08", border: `1px solid ${C.red}15` }}>
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" style={{ color: C.red }} />
          <div>
            <span className="text-[10px] font-bold" style={{ color: C.red }}>1 faktura zaległa</span>
            <span className="text-[9px] block" style={{ color: C.gray }}>FV/2026/02/018 — Gastro Max — 8 200 zł (termin minął 23 dni temu)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

type InvoiceFilter = "all" | InvoiceStatus;

function InvoicesPage() {
  const [filter, setFilter] = useState<InvoiceFilter>("all");
  const filtered = filter === "all" ? invoices : invoices.filter(i => i.status === filter);

  return (
    <div className="p-4 space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-sm" style={{ color: C.dark }}>Faktury ({invoices.length})</h2>
      </div>
      <div className="flex gap-1">
        {[
          { v: "all", l: "Wszystkie" },
          { v: "pending", l: "Oczekujące" },
          { v: "overdue", l: "Zaległe" },
          { v: "paid", l: "Opłacone" },
          { v: "draft", l: "Szkice" },
        ].map(f => (
          <button key={f.v} onClick={() => setFilter(f.v)} className="px-2 py-1 rounded text-[9px] font-semibold"
            style={filter === f.v ? { background: C.accent, color: C.white } : { background: C.white, color: C.gray }}>{f.l}</button>
        ))}
      </div>

      <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${C.light}` }}>
        <div className="grid grid-cols-6 text-[8px] font-bold uppercase px-3 py-2" style={{ background: C.dark, color: C.white }}>
          <span>Numer</span><span>Kontrahent</span><span>Data</span><span>Termin</span><span>Kwota</span><span>Status</span>
        </div>
        {filtered.map((inv, i) => {
          const st = statusInfo[inv.status];
          return (
            <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
              className="grid grid-cols-6 items-center px-3 py-2 border-t text-[10px] cursor-pointer hover:bg-blue-50/30" style={{ borderColor: C.light, background: C.white }}>
              <span className="font-mono font-bold truncate" style={{ color: C.accent }}>{inv.nr.split("/").slice(-2).join("/")}</span>
              <span className="truncate" style={{ color: C.dark }}>{inv.client}</span>
              <span style={{ color: C.gray }}>{inv.date}</span>
              <span style={{ color: inv.status === "overdue" ? C.red : C.gray }}>{inv.due}</span>
              <span className="font-bold" style={{ color: C.dark }}>{inv.amount > 0 ? `${inv.amount.toLocaleString()} zł` : "—"}</span>
              <span className="px-1.5 py-0.5 rounded text-[8px] font-bold text-center" style={{ background: st.bg, color: st.fg }}>{st.label}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function PreviewPage() {
  const inv = invoices[0];
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold" style={{ color: C.dark }}>Podgląd dokumentu</span>
        <div className="flex gap-1">
          <button className="flex items-center gap-1 px-2 py-1 rounded text-[9px] font-semibold" style={{ background: C.white, color: C.dark, border: `1px solid ${C.light}` }}><Printer className="w-3 h-3" />Drukuj</button>
          <button className="flex items-center gap-1 px-2 py-1 rounded text-[9px] font-semibold" style={{ background: C.white, color: C.dark, border: `1px solid ${C.light}` }}><Download className="w-3 h-3" />PDF</button>
          <button className="flex items-center gap-1 px-2 py-1 rounded text-[9px] font-semibold text-white" style={{ background: C.accent }}><Send className="w-3 h-3" />Wyślij</button>
        </div>
      </div>

      <div className="rounded-xl shadow-sm p-6" style={{ background: C.white, border: `1px solid ${C.light}` }}>
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="font-bold text-base" style={{ color: C.dark }}>FAKTURA VAT</h3>
            <span className="text-[10px] font-mono" style={{ color: C.accent }}>{inv.nr}</span>
          </div>
          <div className="text-right">
            <span className="text-[10px]" style={{ color: C.gray }}>Data wystawienia</span>
            <span className="text-[11px] font-bold block" style={{ color: C.dark }}>{inv.date} 2026</span>
            <span className="text-[10px] mt-1 block" style={{ color: C.gray }}>Termin płatności</span>
            <span className="text-[11px] font-bold block" style={{ color: C.dark }}>{inv.due} 2026</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <span className="text-[8px] uppercase font-bold" style={{ color: C.gray }}>Sprzedawca</span>
            <p className="text-[10px] font-bold mt-1" style={{ color: C.dark }}>CodeMaster Sp. z o.o.</p>
            <p className="text-[9px]" style={{ color: C.gray }}>ul. Marszałkowska 10<br />00-001 Warszawa<br />NIP: 524-000-00-01</p>
          </div>
          <div>
            <span className="text-[8px] uppercase font-bold" style={{ color: C.gray }}>Nabywca</span>
            <p className="text-[10px] font-bold mt-1" style={{ color: C.dark }}>{inv.client}</p>
            <p className="text-[9px]" style={{ color: C.gray }}>ul. Przemysłowa 5<br />02-100 Warszawa<br />NIP: 123-456-78-90</p>
          </div>
        </div>

        <div className="rounded overflow-hidden mb-4" style={{ border: `1px solid ${C.light}` }}>
          <div className="grid grid-cols-5 text-[8px] font-bold uppercase px-2 py-1.5" style={{ background: C.bg, color: C.gray }}>
            <span className="col-span-2">Usługa</span><span>Ilość</span><span>Netto</span><span>Brutto</span>
          </div>
          {[
            { name: "Wdrożenie systemu CRM", qty: 1, net: 8000 },
            { name: "Konfiguracja i szkolenie", qty: 1, net: 2000 },
            { name: "Hosting (3 mies.)", qty: 3, net: 300 },
          ].map((p, i) => (
            <div key={i} className="grid grid-cols-5 text-[10px] px-2 py-1.5 border-t" style={{ borderColor: C.light }}>
              <span className="col-span-2" style={{ color: C.dark }}>{p.name}</span>
              <span style={{ color: C.gray }}>{p.qty}</span>
              <span style={{ color: C.dark }}>{(p.net * p.qty).toLocaleString()} zł</span>
              <span className="font-bold" style={{ color: C.dark }}>{(p.net * p.qty * 1.23).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} zł</span>
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <div className="w-48 space-y-1">
            <div className="flex justify-between text-[10px]">
              <span style={{ color: C.gray }}>Netto</span>
              <span style={{ color: C.dark }}>10 900 zł</span>
            </div>
            <div className="flex justify-between text-[10px]">
              <span style={{ color: C.gray }}>VAT 23%</span>
              <span style={{ color: C.dark }}>2 507 zł</span>
            </div>
            <div className="flex justify-between text-sm font-bold pt-1 border-t" style={{ borderColor: C.light }}>
              <span style={{ color: C.dark }}>Brutto</span>
              <span style={{ color: C.accent }}>13 407 zł</span>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-3 border-t text-[9px]" style={{ borderColor: C.light, color: C.gray }}>
          <p>Przelew na konto: PKO BP 12 1020 1111 0000 1234 5678 9012</p>
          <p>Termin: 14 dni od daty wystawienia</p>
        </div>
      </div>
    </div>
  );
}

function ClientsPage() {
  return (
    <div className="p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-sm" style={{ color: C.dark }}>Kontrahenci ({clients.length})</h2>
        <button className="flex items-center gap-1 px-2.5 py-1.5 rounded text-[10px] font-bold text-white" style={{ background: C.accent }}>
          <Plus className="w-3 h-3" /> Dodaj
        </button>
      </div>

      <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${C.light}` }}>
        <div className="grid grid-cols-5 text-[8px] font-bold uppercase px-3 py-2" style={{ background: C.dark, color: C.white }}>
          <span>Firma</span><span>NIP</span><span>Faktury</span><span>Obrót</span><span>Saldo</span>
        </div>
        {clients.map((c, i) => (
          <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
            className="grid grid-cols-5 items-center px-3 py-2 border-t text-[10px] cursor-pointer hover:bg-blue-50/30" style={{ borderColor: C.light, background: C.white }}>
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded flex items-center justify-center text-[7px] font-bold text-white" style={{ background: C.accent }}>{c.name.split(" ")[0].slice(0, 2).toUpperCase()}</div>
              <span className="font-semibold truncate" style={{ color: C.dark }}>{c.name}</span>
            </div>
            <span className="font-mono text-[9px]" style={{ color: C.gray }}>{c.nip}</span>
            <span style={{ color: C.dark }}>{c.invoices}</span>
            <span className="font-bold" style={{ color: C.dark }}>{(c.total / 1000).toFixed(0)}K zł</span>
            <span className="font-bold" style={{ color: c.balance > 0 ? C.amber : C.green }}>{c.balance > 0 ? `${c.balance.toLocaleString()} zł` : "0 zł"}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function PaymentsPage() {
  const payments = [
    { inv: "FV/2026/02/015", client: "ABC Logistyka", amount: 15600, date: "04 mar", method: "Przelew" },
    { inv: "FV/2026/02/012", client: "InnoSoft", amount: 22400, date: "25 lut", method: "Przelew" },
    { inv: "FV/2026/01/008", client: "TechPol", amount: 11800, date: "10 lut", method: "Przelew" },
  ];

  return (
    <div className="p-4 space-y-3">
      <h2 className="font-bold text-sm" style={{ color: C.dark }}>Historia płatności</h2>
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Otrzymane (marzec)", value: "15 600 zł", color: C.green },
          { label: "Oczekiwane", value: "17 100 zł", color: C.amber },
          { label: "Zaległe", value: "8 200 zł", color: C.red },
        ].map((s, i) => (
          <div key={i} className="p-2.5 rounded-xl text-center" style={{ background: C.white }}>
            <span className="font-bold text-sm block" style={{ color: s.color }}>{s.value}</span>
            <span className="text-[8px]" style={{ color: C.gray }}>{s.label}</span>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        {payments.map((p, i) => (
          <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl" style={{ background: C.white }}>
            <div className="w-8 h-8 rounded flex items-center justify-center" style={{ background: C.green + "12" }}>
              <CheckCircle2 className="w-4 h-4" style={{ color: C.green }} />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-semibold block" style={{ color: C.dark }}>{p.client}</span>
              <span className="text-[9px]" style={{ color: C.gray }}>{p.inv} · {p.date} · {p.method}</span>
            </div>
            <span className="font-bold text-[11px]" style={{ color: C.green }}>+{p.amount.toLocaleString()} zł</span>
          </div>
        ))}
      </div>

      <div className="p-3 rounded-xl" style={{ background: C.white }}>
        <span className="text-[10px] font-bold" style={{ color: C.dark }}>Prognoza wpływów (kwiecień)</span>
        {[
          { client: "TechPol", amount: 12300, due: "11 kwi" },
          { client: "Studio Grafik", amount: 4800, due: "08 kwi" },
        ].map((f, i) => (
          <div key={i} className="flex items-center justify-between mt-1.5 text-[10px]">
            <span style={{ color: C.dark }}>{f.client}</span>
            <span className="font-bold" style={{ color: C.amber }}>{f.amount.toLocaleString()} zł <span style={{ color: C.gray }}>({f.due})</span></span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReportsPage() {
  return (
    <div className="p-4 space-y-3">
      <h2 className="font-bold text-sm" style={{ color: C.dark }}>Raporty — Marzec 2026</h2>
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Przychód", value: "84 200 zł", color: C.green },
          { label: "Koszty", value: "42 800 zł", color: C.red },
          { label: "Zysk netto", value: "41 400 zł", color: C.accent },
        ].map((s, i) => (
          <div key={i} className="p-2.5 rounded-xl text-center" style={{ background: C.white }}>
            <span className="font-bold text-sm block" style={{ color: s.color }}>{s.value}</span>
            <span className="text-[8px]" style={{ color: C.gray }}>{s.label}</span>
          </div>
        ))}
      </div>

      <div className="p-3 rounded-xl" style={{ background: C.white }}>
        <span className="text-[10px] font-bold" style={{ color: C.dark }}>Przychód vs Koszty (6 mies.)</span>
        <div className="flex gap-1 items-end justify-center mt-2" style={{ height: 80 }}>
          {[
            { m: "Paź", p: 62, k: 38 }, { m: "Lis", p: 71, k: 42 }, { m: "Gru", p: 88, k: 48 },
            { m: "Sty", p: 72, k: 40 }, { m: "Lut", p: 79, k: 44 }, { m: "Mar", p: 84, k: 43 },
          ].map((d, i) => (
            <div key={i} className="flex-1 text-center">
              <div className="flex gap-0.5 items-end justify-center" style={{ height: 60 }}>
                <motion.div initial={{ height: 0 }} animate={{ height: `${d.p * 0.65}px` }} transition={{ delay: i * 0.05 }}
                  className="flex-1 rounded-t" style={{ background: C.green }} />
                <motion.div initial={{ height: 0 }} animate={{ height: `${d.k * 0.65}px` }} transition={{ delay: i * 0.05 + 0.08 }}
                  className="flex-1 rounded-t" style={{ background: C.red + "50" }} />
              </div>
              <span className="text-[7px] mt-0.5 block" style={{ color: C.gray }}>{d.m}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-3 mt-1.5">
          <span className="flex items-center gap-1 text-[8px]" style={{ color: C.gray }}><div className="w-2 h-2 rounded" style={{ background: C.green }} /> Przychód</span>
          <span className="flex items-center gap-1 text-[8px]" style={{ color: C.gray }}><div className="w-2 h-2 rounded" style={{ background: C.red + "50" }} /> Koszty</span>
        </div>
      </div>

      <div className="p-3 rounded-xl" style={{ background: C.white }}>
        <span className="text-[10px] font-bold" style={{ color: C.dark }}>Struktura kosztów</span>
        {[
          { l: "Wynagrodzenia", v: 18400, p: 43 },
          { l: "Czynsz i media", v: 8200, p: 19 },
          { l: "Marketing", v: 6800, p: 16 },
          { l: "IT i narzędzia", v: 4200, p: 10 },
          { l: "Pozostałe", v: 5200, p: 12 },
        ].map((c, i) => (
          <div key={i} className="mt-1.5">
            <div className="flex justify-between text-[10px]">
              <span style={{ color: C.dark }}>{c.l}</span>
              <span className="font-bold" style={{ color: C.dark }}>{c.v.toLocaleString()} zł ({c.p}%)</span>
            </div>
            <div className="w-full h-1.5 rounded-full mt-0.5" style={{ background: C.light }}>
              <div className="h-full rounded-full" style={{ width: `${c.p}%`, background: C.accent }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
