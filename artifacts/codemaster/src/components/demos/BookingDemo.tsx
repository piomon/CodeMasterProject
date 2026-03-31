import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PreviewShell, DemoBenefits, DemoFooterCTA } from "./PreviewShell";
import { Wrench, Clock, CheckCircle2, AlertTriangle, Monitor, Cpu, HardDrive, Smartphone, ChevronRight, Plus, Search, Package, BarChart3 } from "lucide-react";

const C = { charcoal: "#1C1C1E", dark: "#2C2C2E", accent: "#0A84FF", green: "#30D158", orange: "#FF9F0A", red: "#FF453A", white: "#F2F2F7", gray: "#8E8E93", surface: "#3A3A3C", text: "#E5E5EA", muted: "#636366" };

type BookingPage = "dashboard" | "tickets" | "new" | "timeline" | "parts";

const tickets = [
  { id: "TK-2026-0421", client: "Jan Kowalski", device: "MacBook Pro 16\" M3", issue: "Nie uruchamia się po aktualizacji", status: "repair" as const, priority: "high" as const, stage: 3, assigned: "Mateusz K.", created: "28 mar", cost: 890 },
  { id: "TK-2026-0418", client: "Anna Nowak", device: "iPhone 15 Pro Max", issue: "Pęknięty ekran OLED", status: "parts" as const, priority: "medium" as const, stage: 2, assigned: "Paweł B.", created: "27 mar", cost: 1250 },
  { id: "TK-2026-0415", client: "Firma ABC Sp. z o.o.", device: "Dell PowerEdge R740", issue: "Awaria kontrolera RAID", status: "diagnosis" as const, priority: "critical" as const, stage: 1, assigned: "Mateusz K.", created: "26 mar", cost: 0 },
  { id: "TK-2026-0412", client: "Piotr Wiśniewski", device: "Samsung Galaxy S24", issue: "Wymiana baterii", status: "ready" as const, priority: "low" as const, stage: 5, assigned: "Ewa S.", created: "25 mar", cost: 320 },
  { id: "TK-2026-0408", client: "Kancelaria Lex", device: "HP ProBook 450", issue: "Przegrzewanie się, throttling CPU", status: "repair" as const, priority: "medium" as const, stage: 4, assigned: "Ewa S.", created: "24 mar", cost: 450 },
  { id: "TK-2026-0405", client: "Maria Zielińska", device: "iPad Pro 12.9\"", issue: "Nie ładuje się przez USB-C", status: "done" as const, priority: "low" as const, stage: 5, assigned: "Paweł B.", created: "22 mar", cost: 280 },
];

const statusConfig: Record<string, { bg: string; fg: string; label: string }> = {
  diagnosis: { bg: C.orange + "25", fg: C.orange, label: "Diagnoza" },
  parts: { bg: C.accent + "25", fg: C.accent, label: "Czeka na części" },
  repair: { bg: "#BF5AF2" + "25", fg: "#BF5AF2", label: "W naprawie" },
  ready: { bg: C.green + "25", fg: C.green, label: "Gotowe" },
  done: { bg: C.gray + "25", fg: C.gray, label: "Zakończone" },
};

const priorityConfig: Record<string, { fg: string; label: string }> = {
  critical: { fg: C.red, label: "Krytyczny" },
  high: { fg: C.orange, label: "Wysoki" },
  medium: { fg: C.accent, label: "Średni" },
  low: { fg: C.green, label: "Niski" },
};

const repairStages = ["Przyjęcie", "Diagnoza", "Wycena", "Naprawa", "Gotowe"];

const partsInventory = [
  { name: "Ekran OLED iPhone 15 Pro Max", stock: 3, min: 2, price: 890, cat: "Ekrany" },
  { name: "Bateria MacBook Pro 16\" M3", stock: 5, min: 3, price: 450, cat: "Baterie" },
  { name: "Kontroler RAID Dell PERC H740P", stock: 1, min: 2, price: 1800, cat: "Serwery" },
  { name: "Klawiatura MacBook Air M2", stock: 0, min: 2, price: 320, cat: "Klawiatury" },
  { name: "Złącze USB-C iPad Pro", stock: 8, min: 3, price: 120, cat: "Złącza" },
  { name: "Pasta termoprzewodząca Thermal Grizzly", stock: 12, min: 5, price: 45, cat: "Materiały" },
  { name: "SSD Samsung 980 Pro 1TB", stock: 4, min: 3, price: 380, cat: "Dyski" },
];

const sidebarItems: { id: BookingPage; label: string; icon: ReactNode; badge?: number }[] = [
  { id: "dashboard", label: "Przegląd", icon: <BarChart3 className="w-4 h-4" /> },
  { id: "tickets", label: "Zlecenia", icon: <Wrench className="w-4 h-4" />, badge: tickets.filter(t => t.status !== "done").length },
  { id: "new", label: "Nowe zlecenie", icon: <Plus className="w-4 h-4" /> },
  { id: "timeline", label: "Postęp naprawy", icon: <Clock className="w-4 h-4" /> },
  { id: "parts", label: "Magazyn części", icon: <Package className="w-4 h-4" /> },
];

export function BookingDemo({ name }: { name: string; features: string[] }) {
  const [page, setPage] = useState<BookingPage>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <PreviewShell title={name}>
      <div className="flex" style={{ minHeight: 560, background: C.charcoal }}>
        <motion.aside animate={{ width: sidebarOpen ? 180 : 48 }} transition={{ duration: 0.2 }}
          className="shrink-0 flex flex-col py-3 overflow-hidden" style={{ background: C.dark, borderRight: `1px solid ${C.surface}` }}>
          <div className="px-3 mb-4 flex items-center gap-2">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="shrink-0">
              <Monitor className="w-5 h-5" style={{ color: C.accent }} />
            </button>
            {sidebarOpen && <span className="font-bold text-sm whitespace-nowrap" style={{ color: C.text }}>FixIt<span style={{ color: C.accent }}>Pro</span></span>}
          </div>
          <nav className="flex-1 space-y-0.5 px-1.5">
            {sidebarItems.map(item => (
              <button key={item.id} onClick={() => setPage(item.id)}
                className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg transition-all text-left"
                style={page === item.id ? { background: C.accent + "20", color: C.accent } : { color: C.muted }}>
                <span className="shrink-0">{item.icon}</span>
                {sidebarOpen && <span className="text-[11px] font-medium flex-1 truncate">{item.label}</span>}
                {sidebarOpen && item.badge !== undefined && <span className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold" style={{ background: C.accent, color: C.white }}>{item.badge}</span>}
              </button>
            ))}
          </nav>
          {sidebarOpen && (
            <div className="mx-3 mt-3 p-2.5 rounded-lg" style={{ background: C.surface }}>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ background: C.accent, color: C.white }}>MK</div>
                <div>
                  <span className="text-[10px] font-medium block" style={{ color: C.text }}>Mateusz K.</span>
                  <span className="text-[8px]" style={{ color: C.muted }}>Technik serwisu</span>
                </div>
              </div>
            </div>
          )}
        </motion.aside>

        <main className="flex-1 overflow-y-auto p-4">
          <AnimatePresence mode="wait">
            <motion.div key={page} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
              {page === "dashboard" && <DashboardView onNav={setPage} />}
              {page === "tickets" && <TicketsView onNav={setPage} />}
              {page === "new" && <NewTicketView />}
              {page === "timeline" && <TimelineView />}
              {page === "parts" && <PartsView />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <DemoBenefits accentColor={C.accent} bgColor={C.dark} textColor={C.text} benefits={[
        { icon: "🔧", title: "System zleceń", desc: "Pełny workflow od przyjęcia do wydania" },
        { icon: "📋", title: "Timeline napraw", desc: "5-etapowy proces z powiadomieniami" },
        { icon: "📦", title: "Magazyn części", desc: "Stan magazynowy z alertami" },
        { icon: "📊", title: "Panel technika", desc: "Kolejka, priorytety, statystyki" },
      ]} />
      <DemoFooterCTA accentColor={C.accent} bgColor={C.charcoal} />
    </PreviewShell>
  );
}

function DashboardView({ onNav }: { onNav: (p: BookingPage) => void }) {
  const active = tickets.filter(t => t.status !== "done");
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-bold text-base" style={{ color: C.text }}>Przegląd serwisu</h2>
          <p className="text-[10px]" style={{ color: C.muted }}>Panel zarządzania · 31 mar 2026</p>
        </div>
        <button onClick={() => onNav("new")} className="px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1" style={{ background: C.accent, color: C.white }}>
          <Plus className="w-3 h-3" /> Nowe zlecenie
        </button>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {[
          { v: `${active.length}`, l: "Aktywne", c: C.accent },
          { v: `${tickets.filter(t => t.status === "ready").length}`, l: "Gotowe", c: C.green },
          { v: `${tickets.filter(t => t.priority === "critical").length}`, l: "Krytyczne", c: C.red },
          { v: `${tickets.filter(t => t.status === "parts").length}`, l: "Czeka na części", c: C.orange },
        ].map((s, i) => (
          <div key={i} className="p-3 rounded-xl text-center" style={{ background: C.dark }}>
            <span className="font-bold text-lg block" style={{ color: s.c }}>{s.v}</span>
            <span className="text-[8px]" style={{ color: C.muted }}>{s.l}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase" style={{ color: C.muted }}>Ostatnie zlecenia</span>
        <button onClick={() => onNav("tickets")} className="text-[9px] font-medium flex items-center gap-0.5" style={{ color: C.accent }}>Wszystkie <ChevronRight className="w-3 h-3" /></button>
      </div>

      <div className="rounded-xl overflow-hidden" style={{ background: C.dark }}>
        <table className="w-full text-[10px]">
          <thead>
            <tr style={{ background: C.surface }}>
              {["Nr", "Klient", "Urządzenie", "Status", "Priorytet", "Etap"].map(h => (
                <th key={h} className="px-2 py-2 text-left font-medium" style={{ color: C.muted }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {active.slice(0, 4).map((t, i) => {
              const st = statusConfig[t.status];
              const pr = priorityConfig[t.priority];
              return (
                <tr key={i} className="cursor-pointer" style={{ borderBottom: `1px solid ${C.surface}` }}
                  onClick={() => onNav("timeline")}>
                  <td className="px-2 py-2 font-mono font-bold" style={{ color: C.accent }}>{t.id}</td>
                  <td className="px-2 py-2" style={{ color: C.text }}>{t.client}</td>
                  <td className="px-2 py-2" style={{ color: C.text }}>{t.device}</td>
                  <td className="px-2 py-2"><span className="px-1.5 py-0.5 rounded-full text-[8px] font-bold" style={{ background: st.bg, color: st.fg }}>{st.label}</span></td>
                  <td className="px-2 py-2"><span className="text-[8px] font-bold" style={{ color: pr.fg }}>● {pr.label}</span></td>
                  <td className="px-2 py-2">
                    <div className="w-16 h-1.5 rounded-full" style={{ background: C.surface }}>
                      <div className="h-full rounded-full" style={{ width: `${(t.stage / 5) * 100}%`, background: st.fg }} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="p-3 rounded-xl flex items-center gap-3" style={{ background: C.red + "15", border: `1px solid ${C.red}30` }}>
        <AlertTriangle className="w-5 h-5 shrink-0" style={{ color: C.red }} />
        <div>
          <span className="text-[10px] font-bold block" style={{ color: C.red }}>Alert magazynowy</span>
          <span className="text-[9px]" style={{ color: C.text }}>Klawiatura MacBook Air M2 — stan: 0 szt. (min. 2)</span>
        </div>
        <button onClick={() => onNav("parts")} className="ml-auto px-2 py-1 rounded text-[8px] font-bold" style={{ background: C.red, color: C.white }}>Zamów</button>
      </div>
    </div>
  );
}

function TicketsView({ onNav }: { onNav: (p: BookingPage) => void }) {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? tickets : tickets.filter(t => t.status === filter);
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-base" style={{ color: C.text }}>Zlecenia serwisowe</h2>
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg" style={{ background: C.dark }}>
          <Search className="w-3 h-3" style={{ color: C.muted }} />
          <input placeholder="Szukaj..." className="bg-transparent text-[10px] outline-none w-24" style={{ color: C.text }} />
        </div>
      </div>
      <div className="flex gap-1.5">
        {[{ id: "all", l: "Wszystkie" }, { id: "diagnosis", l: "Diagnoza" }, { id: "parts", l: "Części" }, { id: "repair", l: "Naprawa" }, { id: "ready", l: "Gotowe" }].map(f => (
          <button key={f.id} onClick={() => setFilter(f.id)} className="px-2.5 py-1 rounded-lg text-[9px] font-medium"
            style={filter === f.id ? { background: C.accent, color: C.white } : { background: C.dark, color: C.muted }}>{f.l}</button>
        ))}
      </div>
      <div className="rounded-xl overflow-hidden" style={{ background: C.dark }}>
        <table className="w-full text-[10px]">
          <thead>
            <tr style={{ background: C.surface }}>
              {["Nr zlecenia", "Klient", "Urządzenie", "Problem", "Status", "Koszt"].map(h => (
                <th key={h} className="px-2.5 py-2 text-left font-medium" style={{ color: C.muted }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((t, i) => {
              const st = statusConfig[t.status];
              return (
                <motion.tr key={t.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                  className="cursor-pointer hover:bg-white/[0.02]" style={{ borderBottom: `1px solid ${C.surface}` }}
                  onClick={() => onNav("timeline")}>
                  <td className="px-2.5 py-2.5 font-mono font-bold" style={{ color: C.accent }}>{t.id}</td>
                  <td className="px-2.5 py-2.5" style={{ color: C.text }}>{t.client}</td>
                  <td className="px-2.5 py-2.5" style={{ color: C.text }}>{t.device}</td>
                  <td className="px-2.5 py-2.5 max-w-[140px] truncate" style={{ color: C.muted }}>{t.issue}</td>
                  <td className="px-2.5 py-2.5"><span className="px-2 py-0.5 rounded-full text-[8px] font-bold" style={{ background: st.bg, color: st.fg }}>{st.label}</span></td>
                  <td className="px-2.5 py-2.5 font-bold" style={{ color: t.cost > 0 ? C.green : C.muted }}>{t.cost > 0 ? `${t.cost} zł` : "—"}</td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function NewTicketView() {
  type WizardStep = "device" | "issue" | "client" | "confirm";
  const [step, setStep] = useState<WizardStep>("device");
  const [done, setDone] = useState(false);
  const steps: { id: WizardStep; label: string }[] = [
    { id: "device", label: "Urządzenie" }, { id: "issue", label: "Problem" }, { id: "client", label: "Klient" }, { id: "confirm", label: "Potwierdź" },
  ];
  const currentIdx = steps.findIndex(s => s.id === step);

  if (done) return (
    <div className="text-center py-12">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
        <CheckCircle2 className="w-14 h-14 mx-auto" style={{ color: C.green }} />
      </motion.div>
      <h3 className="font-bold text-lg mt-3" style={{ color: C.text }}>Zlecenie utworzone!</h3>
      <p className="font-mono text-sm mt-1" style={{ color: C.accent }}>TK-2026-{Math.floor(Math.random() * 9000 + 1000)}</p>
      <p className="text-[10px] mt-2" style={{ color: C.muted }}>Klient otrzyma SMS z potwierdzeniem przyjęcia sprzętu.</p>
    </div>
  );

  return (
    <div className="space-y-3">
      <h2 className="font-bold text-base" style={{ color: C.text }}>Nowe zlecenie serwisowe</h2>
      <div className="flex items-center gap-1">
        {steps.map((s, i) => (
          <div key={s.id} className="flex items-center gap-1 flex-1">
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold"
              style={currentIdx >= i ? { background: C.accent, color: C.white } : { background: C.surface, color: C.muted }}>{i + 1}</div>
            <span className="text-[9px]" style={{ color: currentIdx >= i ? C.text : C.muted }}>{s.label}</span>
            {i < 3 && <div className="flex-1 h-0.5 rounded" style={{ background: currentIdx > i ? C.accent : C.surface }} />}
          </div>
        ))}
      </div>

      <div className="p-4 rounded-xl space-y-2" style={{ background: C.dark }}>
        {step === "device" && (
          <>
            <span className="text-[10px] font-bold" style={{ color: C.muted }}>Typ urządzenia</span>
            <div className="grid grid-cols-4 gap-2">
              {[{ icon: <Monitor className="w-5 h-5" />, l: "Laptop" }, { icon: <Smartphone className="w-5 h-5" />, l: "Telefon" }, { icon: <Cpu className="w-5 h-5" />, l: "Serwer" }, { icon: <HardDrive className="w-5 h-5" />, l: "Inne" }].map((d, i) => (
                <button key={i} className="p-3 rounded-xl text-center" style={{ background: i === 0 ? C.accent + "20" : C.surface, color: i === 0 ? C.accent : C.muted }}>
                  {d.icon}
                  <span className="text-[9px] block mt-1">{d.l}</span>
                </button>
              ))}
            </div>
            <input placeholder="Marka i model urządzenia" className="w-full px-3 py-2.5 rounded-lg text-xs outline-none" style={{ background: C.surface, color: C.text, border: `1px solid ${C.surface}` }} />
            <input placeholder="Numer seryjny (opcjonalnie)" className="w-full px-3 py-2.5 rounded-lg text-xs outline-none" style={{ background: C.surface, color: C.text, border: `1px solid ${C.surface}` }} />
            <button onClick={() => setStep("issue")} className="w-full py-2.5 rounded-lg text-[10px] font-bold" style={{ background: C.accent, color: C.white }}>Dalej</button>
          </>
        )}
        {step === "issue" && (
          <>
            <span className="text-[10px] font-bold" style={{ color: C.muted }}>Opis problemu</span>
            <textarea placeholder="Opisz usterkę…" rows={4} className="w-full px-3 py-2.5 rounded-lg text-xs outline-none resize-none" style={{ background: C.surface, color: C.text }} />
            <select className="w-full px-3 py-2.5 rounded-lg text-xs" style={{ background: C.surface, color: C.text }}>
              <option>Priorytet...</option><option>Krytyczny (+100%)</option><option>Wysoki (+50%)</option><option>Średni</option><option>Niski</option>
            </select>
            <div className="flex gap-2">
              <button onClick={() => setStep("device")} className="px-4 py-2 rounded-lg text-[10px]" style={{ background: C.surface, color: C.text }}>Wstecz</button>
              <button onClick={() => setStep("client")} className="flex-1 py-2 rounded-lg text-[10px] font-bold" style={{ background: C.accent, color: C.white }}>Dalej</button>
            </div>
          </>
        )}
        {step === "client" && (
          <>
            <span className="text-[10px] font-bold" style={{ color: C.muted }}>Dane klienta</span>
            <input placeholder="Imię i nazwisko / Firma" className="w-full px-3 py-2.5 rounded-lg text-xs outline-none" style={{ background: C.surface, color: C.text }} />
            <input placeholder="Telefon" className="w-full px-3 py-2.5 rounded-lg text-xs outline-none" style={{ background: C.surface, color: C.text }} />
            <input placeholder="Email" className="w-full px-3 py-2.5 rounded-lg text-xs outline-none" style={{ background: C.surface, color: C.text }} />
            <div className="flex gap-2">
              <button onClick={() => setStep("issue")} className="px-4 py-2 rounded-lg text-[10px]" style={{ background: C.surface, color: C.text }}>Wstecz</button>
              <button onClick={() => setStep("confirm")} className="flex-1 py-2 rounded-lg text-[10px] font-bold" style={{ background: C.accent, color: C.white }}>Dalej</button>
            </div>
          </>
        )}
        {step === "confirm" && (
          <>
            <span className="text-[10px] font-bold" style={{ color: C.muted }}>Potwierdzenie zlecenia</span>
            <div className="space-y-1.5 text-[10px]">
              {[{ l: "Urządzenie", v: "MacBook Pro 16\"" }, { l: "Problem", v: "Nie uruchamia się po aktualizacji" }, { l: "Priorytet", v: "Wysoki" }, { l: "Klient", v: "Jan Kowalski" }].map((r, i) => (
                <div key={i} className="flex justify-between p-2 rounded-lg" style={{ background: C.surface }}>
                  <span style={{ color: C.muted }}>{r.l}</span><span className="font-medium" style={{ color: C.text }}>{r.v}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={() => setStep("client")} className="px-4 py-2 rounded-lg text-[10px]" style={{ background: C.surface, color: C.text }}>Wstecz</button>
              <motion.button whileHover={{ scale: 1.02 }} onClick={() => setDone(true)}
                className="flex-1 py-2.5 rounded-lg text-[10px] font-bold" style={{ background: C.green, color: C.charcoal }}>Utwórz zlecenie</motion.button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function TimelineView() {
  const ticket = tickets[0];
  const st = statusConfig[ticket.status];
  return (
    <div className="space-y-3">
      <h2 className="font-bold text-base" style={{ color: C.text }}>Postęp naprawy</h2>
      <div className="p-3 rounded-xl" style={{ background: C.dark }}>
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-[10px] font-bold" style={{ color: C.accent }}>{ticket.id}</span>
          <span className="px-2 py-0.5 rounded-full text-[8px] font-bold" style={{ background: st.bg, color: st.fg }}>{st.label}</span>
        </div>
        <h4 className="text-xs font-bold" style={{ color: C.text }}>{ticket.device}</h4>
        <p className="text-[10px]" style={{ color: C.muted }}>{ticket.issue}</p>
        <p className="text-[10px] mt-1" style={{ color: C.muted }}>Technik: <span style={{ color: C.accent }}>{ticket.assigned}</span></p>
      </div>

      <div className="space-y-0 pl-2">
        {repairStages.map((stage, i) => {
          const isDone = i < ticket.stage;
          const isCurrent = i === ticket.stage - 1;
          return (
            <div key={i} className="flex gap-3">
              <div className="flex flex-col items-center">
                <motion.div initial={isCurrent ? { scale: 0.8 } : {}} animate={isCurrent ? { scale: [0.8, 1.15, 1] } : {}}
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={isDone ? { background: C.green } : isCurrent ? { background: C.accent + "30", border: `2px solid ${C.accent}` } : { background: C.surface }}>
                  {isDone ? <CheckCircle2 className="w-4 h-4 text-white" /> : <span className="text-[10px] font-bold" style={{ color: isCurrent ? C.accent : C.muted }}>{i + 1}</span>}
                </motion.div>
                {i < repairStages.length - 1 && <div className="w-0.5 h-10" style={{ background: isDone ? C.green : C.surface }} />}
              </div>
              <div className="pb-4 flex-1">
                <span className="text-xs font-bold" style={{ color: isDone || isCurrent ? C.text : C.muted }}>{stage}</span>
                {isDone && <p className="text-[9px] mt-0.5" style={{ color: C.green }}>✓ Zakończone</p>}
                {isCurrent && (
                  <div className="mt-1 p-2 rounded-lg" style={{ background: C.accent + "10" }}>
                    <p className="text-[9px]" style={{ color: C.accent }}>W trakcie — szacowany czas: 2-3h</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PartsView() {
  const [searchTerm, setSearchTerm] = useState("");
  const filtered = searchTerm ? partsInventory.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())) : partsInventory;
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-base" style={{ color: C.text }}>Magazyn części</h2>
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg" style={{ background: C.dark }}>
          <Search className="w-3 h-3" style={{ color: C.muted }} />
          <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Szukaj części..." className="bg-transparent text-[10px] outline-none w-28" style={{ color: C.text }} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className="p-3 rounded-xl text-center" style={{ background: C.dark }}>
          <span className="font-bold text-sm block" style={{ color: C.accent }}>{partsInventory.length}</span>
          <span className="text-[8px]" style={{ color: C.muted }}>Pozycji</span>
        </div>
        <div className="p-3 rounded-xl text-center" style={{ background: C.dark }}>
          <span className="font-bold text-sm block" style={{ color: C.green }}>{partsInventory.filter(p => p.stock >= p.min).length}</span>
          <span className="text-[8px]" style={{ color: C.muted }}>OK</span>
        </div>
        <div className="p-3 rounded-xl text-center" style={{ background: C.dark }}>
          <span className="font-bold text-sm block" style={{ color: C.red }}>{partsInventory.filter(p => p.stock < p.min).length}</span>
          <span className="text-[8px]" style={{ color: C.muted }}>Niski stan</span>
        </div>
      </div>

      <div className="rounded-xl overflow-hidden" style={{ background: C.dark }}>
        <table className="w-full text-[10px]">
          <thead>
            <tr style={{ background: C.surface }}>
              {["Część", "Kategoria", "Stan", "Min.", "Cena", "Status"].map(h => (
                <th key={h} className="px-2 py-2 text-left font-medium" style={{ color: C.muted }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, i) => {
              const low = p.stock < p.min;
              const out = p.stock === 0;
              return (
                <motion.tr key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                  style={{ borderBottom: `1px solid ${C.surface}` }}>
                  <td className="px-2 py-2 font-medium max-w-[140px] truncate" style={{ color: C.text }}>{p.name}</td>
                  <td className="px-2 py-2" style={{ color: C.muted }}>{p.cat}</td>
                  <td className="px-2 py-2 font-bold" style={{ color: out ? C.red : low ? C.orange : C.green }}>{p.stock} szt.</td>
                  <td className="px-2 py-2" style={{ color: C.muted }}>{p.min}</td>
                  <td className="px-2 py-2" style={{ color: C.text }}>{p.price} zł</td>
                  <td className="px-2 py-2">
                    {out ? <span className="px-1.5 py-0.5 rounded text-[8px] font-bold" style={{ background: C.red + "20", color: C.red }}>Brak!</span> :
                     low ? <span className="px-1.5 py-0.5 rounded text-[8px] font-bold" style={{ background: C.orange + "20", color: C.orange }}>Zamów</span> :
                     <span className="px-1.5 py-0.5 rounded text-[8px] font-bold" style={{ background: C.green + "20", color: C.green }}>OK</span>}
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
