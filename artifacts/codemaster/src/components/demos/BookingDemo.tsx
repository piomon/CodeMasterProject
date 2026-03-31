import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PreviewShell, DemoFooterCTA, DemoBenefits } from "./PreviewShell";
import {
  Monitor, Cpu, HardDrive, Wrench, Clock, CheckCircle2, AlertTriangle,
  Package, Truck, MessageSquare, Phone, Search, Plus, ChevronDown,
  BarChart3, Users, Settings, FileText, Shield, Zap
} from "lucide-react";

const C = { blue: "#0EA5E9", dark: "#0C1222", navy: "#162032", slate: "#1E293B", gray: "#94A3B8", light: "#F1F5F9", white: "#FFFFFF", green: "#22C55E", orange: "#F59E0B", red: "#EF4444" };

const tickets = [
  { id: "RQ-2847", device: "MacBook Pro 16\"", client: "Firma TechStar Sp. z o.o.", issue: "Wymiana matrycy + baterii", status: "in-progress", priority: "high", tech: "Michał K.", created: "2 godz. temu", eta: "Dziś 17:00" },
  { id: "RQ-2846", device: "Dell Latitude 5540", client: "Kancelaria Prawo i Finanse", issue: "Reinstalacja systemu, odzysk danych", status: "diagnostics", priority: "medium", tech: "Paweł W.", created: "4 godz. temu", eta: "Jutro 12:00" },
  { id: "RQ-2845", device: "HP ProDesk 600 G6", client: "Biuro Rachunkowe Sigma", issue: "Awaria zasilacza, upgrade RAM 32GB", status: "waiting-parts", priority: "low", tech: "Anna M.", created: "Wczoraj", eta: "Śr 28 mar" },
  { id: "RQ-2844", device: "iPhone 15 Pro", client: "Jan Kowalski", issue: "Wymiana wyświetlacza OLED", status: "ready", priority: "medium", tech: "Michał K.", created: "Wczoraj", eta: "Gotowe" },
  { id: "RQ-2843", device: "Serwer Rack 2U", client: "Logistex Sp. z o.o.", issue: "Wymiana dysków RAID, konfiguracja backup", status: "completed", priority: "high", tech: "Paweł W.", created: "2 dni temu", eta: "Zakończone" },
];

const statusMap: Record<string, { label: string; color: string; bg: string }> = {
  "diagnostics": { label: "Diagnostyka", color: C.orange, bg: C.orange + "20" },
  "in-progress": { label: "W naprawie", color: C.blue, bg: C.blue + "20" },
  "waiting-parts": { label: "Czeka na części", color: C.gray, bg: C.gray + "20" },
  "ready": { label: "Gotowe do odbioru", color: C.green, bg: C.green + "20" },
  "completed": { label: "Zakończone", color: C.gray, bg: C.slate },
};

const priorityMap: Record<string, { label: string; color: string }> = {
  high: { label: "Pilne", color: C.red },
  medium: { label: "Normalny", color: C.orange },
  low: { label: "Niski", color: C.gray },
};

const pricing = [
  { name: "Diagnostyka komputera", price: "99 zł", time: "do 24h", icon: "🔍" },
  { name: "Reinstalacja systemu", price: "149 zł", time: "1-2 dni", icon: "💻" },
  { name: "Wymiana dysku SSD", price: "od 199 zł", time: "1 dzień", icon: "💾" },
  { name: "Odzysk danych", price: "od 299 zł", time: "2-5 dni", icon: "🔐" },
  { name: "Naprawa płyty głównej", price: "od 349 zł", time: "3-7 dni", icon: "🔧" },
  { name: "Serwis sieci / serwera", price: "od 199 zł/h", time: "umownie", icon: "🌐" },
];

export function BookingDemo({ name }: { name: string; features: string[] }) {
  const [page, setPage] = useState("dashboard");

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: <BarChart3 className="w-4 h-4" /> },
    { id: "tickets", label: "Zgłoszenia", icon: <FileText className="w-4 h-4" /> },
    { id: "new-ticket", label: "Nowe", icon: <Plus className="w-4 h-4" /> },
    { id: "pricing", label: "Cennik", icon: <Package className="w-4 h-4" /> },
    { id: "tracking", label: "Śledź naprawę", icon: <Search className="w-4 h-4" /> },
  ];

  return (
    <PreviewShell title={name}>
      <div style={{ background: C.dark, minHeight: 500 }}>
        <div className="flex items-center justify-between px-4 py-2.5 border-b" style={{ borderColor: C.navy, background: C.slate }}>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: C.blue }}>
              <Wrench className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-sm" style={{ color: C.white }}>Repair<span style={{ color: C.blue }}>Q</span></span>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <MessageSquare className="w-4 h-4" style={{ color: C.gray }} />
              <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full" style={{ background: C.red }} />
            </div>
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold" style={{ background: C.blue, color: C.white }}>MK</div>
          </div>
        </div>

        <div className="flex">
          <div className="w-[52px] shrink-0 border-r py-2 flex flex-col items-center gap-1" style={{ borderColor: C.navy, background: C.slate + "80" }}>
            {navItems.map(n => (
              <button key={n.id} onClick={() => setPage(n.id)}
                className="w-10 h-10 rounded-lg flex flex-col items-center justify-center gap-0.5 transition-all"
                style={page === n.id ? { background: C.blue + "20", color: C.blue } : { color: C.gray }}>
                {n.icon}
                <span className="text-[7px] font-medium leading-none">{n.label}</span>
              </button>
            ))}
          </div>

          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div key={page} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.15 }}>
                {page === "dashboard" && <DashboardPage onNav={setPage} />}
                {page === "tickets" && <TicketsPage />}
                {page === "new-ticket" && <NewTicketPage onNav={setPage} />}
                {page === "pricing" && <PricingPage />}
                {page === "tracking" && <TrackingPage />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      <DemoBenefits accentColor={C.blue} bgColor={C.slate} textColor={C.white} benefits={[
        { icon: "📋", title: "Porządek w zleceniach", desc: "Koniec z kartkami i Excelem" },
        { icon: "📱", title: "Klient śledzi online", desc: "Status naprawy w czasie rzeczywistym" },
        { icon: "💰", title: "Szybsze rozliczenia", desc: "Automatyczne wyceny i faktury" },
        { icon: "📊", title: "Analityka serwisu", desc: "Raporty wydajności i przychodów" },
      ]} />
      <DemoFooterCTA accentColor={C.blue} bgColor={C.dark} />
    </PreviewShell>
  );
}

function DashboardPage({ onNav }: { onNav: (p: string) => void }) {
  const stats = [
    { label: "Aktywne", value: "12", icon: <Wrench className="w-3.5 h-3.5" />, color: C.blue },
    { label: "Oczekujące", value: "4", icon: <Clock className="w-3.5 h-3.5" />, color: C.orange },
    { label: "Gotowe", value: "3", icon: <CheckCircle2 className="w-3.5 h-3.5" />, color: C.green },
    { label: "Przychód/tydz", value: "8.4K", icon: <BarChart3 className="w-3.5 h-3.5" />, color: "#A78BFA" },
  ];

  return (
    <div className="p-3 space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-sm" style={{ color: C.white }}>Dashboard serwisu</h2>
        <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: C.green + "20", color: C.green }}>● Online</span>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {stats.map((s, i) => (
          <div key={i} className="p-2.5 rounded-xl" style={{ background: C.navy }}>
            <div className="flex items-center gap-1 mb-1" style={{ color: s.color }}>{s.icon}</div>
            <span className="font-bold text-lg block" style={{ color: C.white }}>{s.value}</span>
            <span className="text-[9px]" style={{ color: C.gray }}>{s.label}</span>
          </div>
        ))}
      </div>

      <div className="rounded-xl overflow-hidden" style={{ background: C.navy }}>
        <div className="flex items-center justify-between px-3 py-2 border-b" style={{ borderColor: C.slate }}>
          <span className="text-xs font-bold" style={{ color: C.white }}>Ostatnie zgłoszenia</span>
          <button onClick={() => onNav("tickets")} className="text-[10px] font-medium" style={{ color: C.blue }}>Zobacz wszystkie →</button>
        </div>
        {tickets.slice(0, 4).map((t, i) => {
          const st = statusMap[t.status];
          const pr = priorityMap[t.priority];
          return (
            <div key={i} className="flex items-center gap-2.5 px-3 py-2.5 border-b" style={{ borderColor: C.slate + "60" }}>
              <div className="w-1 h-8 rounded-full" style={{ background: pr.color }} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold" style={{ color: C.blue }}>{t.id}</span>
                  <span className="text-[10px] truncate" style={{ color: C.white }}>{t.device}</span>
                </div>
                <span className="text-[9px] truncate block" style={{ color: C.gray }}>{t.issue}</span>
              </div>
              <span className="px-1.5 py-0.5 rounded text-[8px] font-bold shrink-0" style={{ background: st.bg, color: st.color }}>{st.label}</span>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="p-3 rounded-xl" style={{ background: C.navy }}>
          <span className="text-[10px] font-medium" style={{ color: C.gray }}>Technicy na zmianie</span>
          <div className="flex items-center gap-1 mt-2">
            {["MK", "PW", "AM"].map((a, i) => (
              <div key={i} className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-bold border-2" style={{ background: C.slate, color: C.white, borderColor: C.navy, marginLeft: i > 0 ? -6 : 0 }}>{a}</div>
            ))}
            <span className="text-[10px] ml-2" style={{ color: C.green }}>3 online</span>
          </div>
        </div>
        <div className="p-3 rounded-xl" style={{ background: C.navy }}>
          <span className="text-[10px] font-medium" style={{ color: C.gray }}>Części zamówione</span>
          <div className="flex items-center gap-2 mt-2">
            <Truck className="w-4 h-4" style={{ color: C.orange }} />
            <span className="font-bold text-sm" style={{ color: C.white }}>5 paczek</span>
          </div>
          <span className="text-[9px]" style={{ color: C.orange }}>2 dziś dotrą</span>
        </div>
      </div>

      <div className="p-3 rounded-xl" style={{ background: C.navy }}>
        <span className="text-[10px] font-medium" style={{ color: C.gray }}>Wydajność tygodnia</span>
        <div className="flex items-end gap-1 mt-2 h-12">
          {[65, 80, 45, 90, 70, 85, 55].map((v, i) => (
            <div key={i} className="flex-1 rounded-t" style={{ height: `${v}%`, background: i === 3 ? C.blue : C.slate }} />
          ))}
        </div>
        <div className="flex justify-between mt-1">
          {["Pn", "Wt", "Śr", "Cz", "Pt", "Sb", "Nd"].map((d, i) => (
            <span key={i} className="text-[7px] flex-1 text-center" style={{ color: C.gray }}>{d}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function TicketsPage() {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? tickets : tickets.filter(t => t.status === filter);

  return (
    <div className="p-3 space-y-3">
      <h2 className="font-bold text-sm" style={{ color: C.white }}>Zgłoszenia serwisowe</h2>
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {[{ id: "all", label: "Wszystkie" }, { id: "in-progress", label: "W naprawie" }, { id: "diagnostics", label: "Diagnostyka" }, { id: "waiting-parts", label: "Oczekuje" }, { id: "ready", label: "Gotowe" }].map(f => (
          <button key={f.id} onClick={() => setFilter(f.id)} className="px-2.5 py-1 rounded-lg text-[10px] font-medium whitespace-nowrap"
            style={filter === f.id ? { background: C.blue, color: C.white } : { background: C.navy, color: C.gray }}>{f.label}</button>
        ))}
      </div>
      <div className="space-y-2">
        {filtered.map((t, i) => {
          const st = statusMap[t.status];
          const pr = priorityMap[t.priority];
          return (
            <motion.div key={t.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="p-3 rounded-xl" style={{ background: C.navy }}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-xs" style={{ color: C.blue }}>{t.id}</span>
                  <span className="px-1.5 py-0.5 rounded text-[8px] font-bold" style={{ color: pr.color, background: pr.color + "15" }}>● {pr.label}</span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold" style={{ background: st.bg, color: st.color }}>{st.label}</span>
              </div>
              <h4 className="text-xs font-semibold" style={{ color: C.white }}>{t.device}</h4>
              <p className="text-[10px] mt-0.5" style={{ color: C.gray }}>{t.issue}</p>
              <div className="flex items-center justify-between mt-2 pt-2 border-t" style={{ borderColor: C.slate }}>
                <div className="flex items-center gap-3">
                  <span className="text-[9px]" style={{ color: C.gray }}>👤 {t.client}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px]" style={{ color: C.gray }}>🔧 {t.tech}</span>
                  <span className="text-[9px] font-medium" style={{ color: C.blue }}>ETA: {t.eta}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function NewTicketPage({ onNav }: { onNav: (p: string) => void }) {
  const [step, setStep] = useState(0);
  const [deviceType, setDeviceType] = useState("");
  const deviceTypes = [
    { id: "laptop", label: "Laptop", icon: "💻" },
    { id: "desktop", label: "Komputer stacjonarny", icon: "🖥️" },
    { id: "phone", label: "Telefon / Tablet", icon: "📱" },
    { id: "server", label: "Serwer / Sieć", icon: "🌐" },
    { id: "printer", label: "Drukarka", icon: "🖨️" },
    { id: "other", label: "Inne urządzenie", icon: "⚡" },
  ];

  return (
    <div className="p-3 space-y-3">
      <h2 className="font-bold text-sm" style={{ color: C.white }}>Nowe zgłoszenie</h2>
      <div className="flex items-center gap-2 mb-2">
        {["Urządzenie", "Problem", "Dane", "Gotowe"].map((s, i) => (
          <div key={s} className="flex items-center gap-1.5 flex-1">
            <div className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold"
              style={step >= i ? { background: C.blue, color: C.white } : { background: C.navy, color: C.gray }}>{step > i ? "✓" : i + 1}</div>
            <span className="text-[9px] hidden sm:block" style={{ color: step >= i ? C.white : C.gray }}>{s}</span>
            {i < 3 && <div className="flex-1 h-px" style={{ background: step > i ? C.blue : C.navy }} />}
          </div>
        ))}
      </div>

      {step === 0 && (
        <div className="grid grid-cols-3 gap-2">
          {deviceTypes.map(d => (
            <motion.button key={d.id} whileHover={{ scale: 1.03 }} onClick={() => { setDeviceType(d.id); setStep(1); }}
              className="p-3 rounded-xl text-center" style={{ background: deviceType === d.id ? C.blue + "20" : C.navy, border: `1px solid ${deviceType === d.id ? C.blue : C.slate}` }}>
              <span className="text-2xl block mb-1">{d.icon}</span>
              <span className="text-[10px] font-medium" style={{ color: C.white }}>{d.label}</span>
            </motion.button>
          ))}
        </div>
      )}

      {step === 1 && (
        <div className="space-y-2">
          <input placeholder="Marka i model urządzenia" className="w-full px-3 py-2.5 rounded-lg text-sm" style={{ background: C.navy, border: `1px solid ${C.slate}`, color: C.white }} />
          <textarea placeholder="Opisz problem szczegółowo..." rows={3} className="w-full px-3 py-2.5 rounded-lg text-sm resize-none" style={{ background: C.navy, border: `1px solid ${C.slate}`, color: C.white }} />
          <div className="flex gap-2">
            {["Nie włącza się", "Wolno działa", "Uszkodzony ekran", "Problem z siecią", "Wirusy/malware"].map(q => (
              <button key={q} className="px-2 py-1 rounded-lg text-[9px] font-medium whitespace-nowrap" style={{ background: C.slate, color: C.gray }}>{q}</button>
            ))}
          </div>
          <div className="flex gap-2 mt-2">
            <button onClick={() => setStep(0)} className="px-4 py-2 rounded-lg text-xs" style={{ background: C.navy, color: C.gray }}>Wstecz</button>
            <button onClick={() => setStep(2)} className="flex-1 py-2 rounded-lg text-xs font-bold text-white" style={{ background: C.blue }}>Dalej</button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-2">
          <input placeholder="Imię i nazwisko / Firma" className="w-full px-3 py-2.5 rounded-lg text-sm" style={{ background: C.navy, border: `1px solid ${C.slate}`, color: C.white }} />
          <input placeholder="Telefon kontaktowy" className="w-full px-3 py-2.5 rounded-lg text-sm" style={{ background: C.navy, border: `1px solid ${C.slate}`, color: C.white }} />
          <input placeholder="E-mail" className="w-full px-3 py-2.5 rounded-lg text-sm" style={{ background: C.navy, border: `1px solid ${C.slate}`, color: C.white }} />
          <label className="flex items-center gap-2 p-2.5 rounded-lg cursor-pointer" style={{ background: C.navy }}>
            <input type="checkbox" className="accent-sky-500 w-3.5 h-3.5" />
            <span className="text-[10px]" style={{ color: C.gray }}>Zgadzam się na przetwarzanie danych</span>
          </label>
          <div className="flex gap-2">
            <button onClick={() => setStep(1)} className="px-4 py-2 rounded-lg text-xs" style={{ background: C.navy, color: C.gray }}>Wstecz</button>
            <button onClick={() => setStep(3)} className="flex-1 py-2 rounded-lg text-xs font-bold text-white" style={{ background: C.blue }}>Wyślij zgłoszenie</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
          <div className="w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ background: C.green + "20" }}>
            <CheckCircle2 className="w-7 h-7" style={{ color: C.green }} />
          </div>
          <h3 className="font-bold text-base" style={{ color: C.white }}>Zgłoszenie przyjęte!</h3>
          <p className="text-xs mt-1" style={{ color: C.gray }}>Nr zgłoszenia:</p>
          <p className="font-mono font-bold text-lg mt-0.5" style={{ color: C.blue }}>RQ-{Math.floor(Math.random() * 9000 + 1000)}</p>
          <p className="text-[10px] mt-2 max-w-[200px] mx-auto" style={{ color: C.gray }}>Skontaktujemy się w ciągu 1h. Możesz śledzić status naprawy online.</p>
          <button onClick={() => onNav("tracking")} className="mt-4 px-5 py-2 rounded-lg text-xs font-bold text-white" style={{ background: C.blue }}>Śledź naprawę</button>
        </motion.div>
      )}
    </div>
  );
}

function PricingPage() {
  return (
    <div className="p-3 space-y-3">
      <h2 className="font-bold text-sm" style={{ color: C.white }}>Cennik usług</h2>
      <div className="space-y-2">
        {pricing.map((p, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
            className="flex items-center gap-3 p-3 rounded-xl" style={{ background: C.navy }}>
            <span className="text-xl">{p.icon}</span>
            <div className="flex-1">
              <h4 className="text-xs font-semibold" style={{ color: C.white }}>{p.name}</h4>
              <span className="text-[10px]" style={{ color: C.gray }}>{p.time}</span>
            </div>
            <span className="font-bold text-sm" style={{ color: C.blue }}>{p.price}</span>
          </motion.div>
        ))}
      </div>
      <div className="p-3 rounded-xl" style={{ background: C.blue + "10", border: `1px solid ${C.blue}30` }}>
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4" style={{ color: C.blue }} />
          <span className="text-xs font-bold" style={{ color: C.white }}>Gwarancja na naprawę</span>
        </div>
        <p className="text-[10px] mt-1" style={{ color: C.gray }}>Wszystkie naprawy objęte 6-miesięczną gwarancją. Darmowa rediagnostyka w razie powrotu usterki.</p>
      </div>
      <div className="p-3 rounded-xl" style={{ background: C.navy }}>
        <span className="text-[10px] font-bold" style={{ color: C.white }}>Obsługujemy firmy B2B</span>
        <p className="text-[9px] mt-1" style={{ color: C.gray }}>Stałe umowy serwisowe, SLA, faktura z odroczonym terminem. Zadzwoń: +48 793 020 820</p>
      </div>
    </div>
  );
}

function TrackingPage() {
  const [code, setCode] = useState("RQ-2847");
  const [tracked, setTracked] = useState(true);

  const timeline = [
    { label: "Przyjęcie urządzenia", time: "22 mar, 09:15", done: true, desc: "MacBook Pro 16\" — diagnostyka" },
    { label: "Diagnostyka zakończona", time: "22 mar, 11:30", done: true, desc: "Ustalono: wymiana matrycy + baterii" },
    { label: "Wycena zaakceptowana", time: "22 mar, 12:00", done: true, desc: "Klient zatwierdził: 1 890 zł" },
    { label: "Naprawa w toku", time: "22 mar, 14:00", done: true, desc: "Technik: Michał K." },
    { label: "Testowanie", time: "~22 mar, 16:00", done: false, desc: "Sprawdzanie komponentów" },
    { label: "Gotowe do odbioru", time: "~22 mar, 17:00", done: false, desc: "Powiadomienie SMS" },
  ];

  return (
    <div className="p-3 space-y-3">
      <h2 className="font-bold text-sm" style={{ color: C.white }}>Śledź naprawę</h2>
      <div className="flex gap-2">
        <input value={code} onChange={e => setCode(e.target.value)} placeholder="Nr zgłoszenia (np. RQ-2847)"
          className="flex-1 px-3 py-2 rounded-lg text-sm" style={{ background: C.navy, border: `1px solid ${C.slate}`, color: C.white }} />
        <button onClick={() => setTracked(true)} className="px-4 py-2 rounded-lg text-xs font-bold text-white" style={{ background: C.blue }}>
          <Search className="w-4 h-4" />
        </button>
      </div>

      {tracked && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="p-3 rounded-xl mb-3" style={{ background: C.blue + "10", border: `1px solid ${C.blue}30` }}>
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-sm" style={{ color: C.blue }}>{code}</span>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold" style={{ background: C.blue + "20", color: C.blue }}>W naprawie</span>
            </div>
            <p className="text-xs mt-1" style={{ color: C.white }}>MacBook Pro 16\" — Wymiana matrycy + baterii</p>
            <p className="text-[10px]" style={{ color: C.gray }}>Szacowane zakończenie: dziś ~17:00</p>
          </div>

          <div className="space-y-0 pl-2">
            {timeline.map((t, i) => (
              <div key={i} className="flex gap-3 relative">
                <div className="flex flex-col items-center">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center border-2 z-10"
                    style={t.done ? { background: C.blue, borderColor: C.blue } : { background: C.dark, borderColor: C.slate }}>
                    {t.done && <CheckCircle2 className="w-3 h-3 text-white" />}
                  </div>
                  {i < timeline.length - 1 && <div className="w-0.5 flex-1 min-h-[20px]" style={{ background: t.done ? C.blue + "40" : C.slate }} />}
                </div>
                <div className="pb-4 flex-1">
                  <span className="text-xs font-semibold" style={{ color: t.done ? C.white : C.gray }}>{t.label}</span>
                  <span className="text-[10px] ml-2" style={{ color: C.gray }}>{t.time}</span>
                  <p className="text-[10px]" style={{ color: C.gray }}>{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
