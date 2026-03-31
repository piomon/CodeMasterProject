import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PreviewShell, DemoNav, DemoSection } from "./PreviewShell";
import { Wrench, Clock, CheckCircle2, AlertTriangle, Phone, Home, FileText, Users, Truck, Settings, BarChart3 } from "lucide-react";

const C = { navy: "#1B3A5C", blue: "#2563EB", graphite: "#374151", white: "#F8FAFC", gray: "#6B7280", green: "#10B981", orange: "#F59E0B", light: "#F1F5F9" };

const repairs = [
  { id: "SRV-2026-042", device: "MacBook Pro 16\"", issue: "Wymiana baterii", status: "in_progress", stage: 3, total: 5, eta: "25 mar", cost: 890 },
  { id: "SRV-2026-038", device: "iPhone 15 Pro", issue: "Wymiana ekranu", status: "ready", stage: 5, total: 5, eta: "Gotowe", cost: 650 },
  { id: "SRV-2026-035", device: "Dell XPS 15", issue: "Diagnoza usterki", status: "diagnosis", stage: 2, total: 5, eta: "24 mar", cost: 0 },
  { id: "SRV-2026-030", device: "iPad Air", issue: "Wymiana złącza", status: "done", stage: 5, total: 5, eta: "Zakończone", cost: 420 },
];

const stages = ["Przyjęcie", "Diagnoza", "Wycena", "Naprawa", "Gotowe"];

const statusMap: Record<string, { color: string; label: string }> = {
  diagnosis: { color: C.orange, label: "Diagnoza" },
  in_progress: { color: C.blue, label: "W naprawie" },
  ready: { color: C.green, label: "Gotowe do odbioru" },
  done: { color: C.gray, label: "Zakończone" },
};

export function ServiceDemo({ name }: { name: string; features: string[]; industry?: string }) {
  const [page, setPage] = useState("home");
  const tabs = [
    { id: "home", label: "Start", icon: <Home className="w-3 h-3" /> },
    { id: "new", label: "Nowe zlecenie", icon: <Wrench className="w-3 h-3" /> },
    { id: "status", label: "Status", icon: <Clock className="w-3 h-3" /> },
    { id: "timeline", label: "Timeline", icon: <BarChart3 className="w-3 h-3" /> },
    { id: "panel", label: "Panel", icon: <Settings className="w-3 h-3" /> },
  ];

  return (
    <PreviewShell title={name}>
      <DemoNav tabs={tabs} activeTab={page} onTabChange={setPage} logo="FixIt Pro" />
      <AnimatePresence mode="wait">
        <motion.div key={page} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
          {page === "home" && <HomePage onNav={setPage} />}
          {page === "new" && <NewRepairPage />}
          {page === "status" && <StatusPage onNav={setPage} />}
          {page === "timeline" && <TimelinePage />}
          {page === "panel" && <PanelPage />}
        </motion.div>
      </AnimatePresence>
    </PreviewShell>
  );
}

function HomePage({ onNav }: { onNav: (p: string) => void }) {
  return (
    <div>
      <div className="p-10 text-center" style={{ background: `linear-gradient(160deg, ${C.navy}, ${C.blue})` }}>
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/60">Profesjonalny Serwis</p>
        <h1 className="font-display font-bold text-4xl mt-2 text-white">FixIt <span style={{ color: "#60A5FA" }}>Pro</span></h1>
        <p className="text-xs mt-2 max-w-[260px] mx-auto leading-relaxed text-white/70">Naprawa telefonów, laptopów i tabletów. Śledzenie statusu online, gwarancja na każdą naprawę.</p>
        <div className="flex gap-3 justify-center mt-6">
          <motion.button whileHover={{ scale: 1.03 }} onClick={() => onNav("new")}
            className="px-7 py-3.5 rounded-lg font-bold text-sm shadow-lg text-white" style={{ background: C.blue }}>Zgłoś naprawę</motion.button>
          <button onClick={() => onNav("status")} className="px-7 py-3.5 rounded-lg font-semibold text-sm border border-white/30 text-white">Sprawdź status</button>
        </div>
      </div>
      <DemoSection>
        <div className="grid grid-cols-4 gap-2">
          {[
            { icon: "📱", label: "Telefony", desc: "Wszystkie marki" },
            { icon: "💻", label: "Laptopy", desc: "Mac & PC" },
            { icon: "⏱️", label: "Ekspres", desc: "Naprawa 1h" },
            { icon: "🛡️", label: "Gwarancja", desc: "12 miesięcy" },
          ].map((f, i) => (
            <div key={i} className="p-2.5 rounded-xl text-center" style={{ background: C.light }}>
              <span className="text-lg block">{f.icon}</span>
              <span className="text-[8px] font-bold block mt-0.5" style={{ color: C.navy }}>{f.label}</span>
              <span className="text-[7px]" style={{ color: C.gray }}>{f.desc}</span>
            </div>
          ))}
        </div>
        <h4 className="font-bold text-sm mt-4" style={{ color: C.navy }}>Aktywne zlecenia</h4>
        {repairs.filter(r => r.status !== "done").slice(0, 2).map((r, i) => {
          const st = statusMap[r.status];
          return (
            <div key={i} className="p-3 rounded-xl border cursor-pointer" style={{ borderColor: C.light, background: C.white }} onClick={() => onNav("timeline")}>
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-xs font-bold" style={{ color: C.navy }}>{r.id}</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: st.color + "15", color: st.color }}>{st.label}</span>
              </div>
              <p className="text-xs" style={{ color: C.graphite }}>{r.device} — {r.issue}</p>
              <div className="w-full h-1.5 rounded-full mt-2" style={{ background: C.light }}>
                <div className="h-full rounded-full" style={{ width: `${(r.stage/r.total)*100}%`, background: st.color }} />
              </div>
            </div>
          );
        })}
        <div className="p-4 rounded-2xl mt-3" style={{ background: C.light, border: `1px solid ${C.blue}15` }}>
          <p className="text-[10px] tracking-[0.2em] uppercase text-center" style={{ color: C.blue }}>Opinie klientów</p>
          <p className="text-xs mt-2 text-center italic" style={{ color: C.navy + "90" }}>"MacBook naprawiony w 2 godziny. Profesjonalny serwis, transparentne ceny, rewelacyjna obsługa."</p>
          <p className="text-[10px] text-center mt-1" style={{ color: C.blue }}>— Katarzyna L. ★★★★★</p>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-3">
          {[{ v: "5,000+", l: "Napraw" },{ v: "98%", l: "Zadowolonych" },{ v: "1h", l: "Avg. czas" }].map((s, i) => (
            <div key={i} className="p-3 rounded-xl text-center" style={{ background: `${C.blue}08` }}>
              <span className="font-bold text-sm block" style={{ color: C.blue }}>{s.v}</span>
              <span className="text-[9px]" style={{ color: C.gray }}>{s.l}</span>
            </div>
          ))}
        </div>
      </DemoSection>
      <DemoBenefits accentColor={C.blue} bgColor={C.light} textColor={C.navy} benefits={[
        { icon: "📱", title: "Zgłoszenia online", desc: "Formularz przyjęcia sprzętu 24/7" },
        { icon: "📋", title: "Status naprawy", desc: "Timeline etapów na żywo" },
        { icon: "💰", title: "Kosztorys online", desc: "Akceptacja wyceny jednym klikiem" },
        { icon: "📊", title: "Panel technika", desc: "Kolejka zadań i priorytety" },
      ]} />
      <DemoFooterCTA accentColor={C.blue} bgColor={C.navy} />
    </div>
  );
}

function NewRepairPage() {
  const [submitted, setSubmitted] = useState(false);
  if (submitted) return (
    <DemoSection>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
        <CheckCircle2 className="w-12 h-12 mx-auto mb-3" style={{ color: C.green }} />
        <h3 className="font-bold text-lg" style={{ color: C.navy }}>Zlecenie przyjęte!</h3>
        <p className="text-sm" style={{ color: C.gray }}>Nr: SRV-{Math.floor(Math.random()*9000+1000)}</p>
        <p className="text-xs mt-1" style={{ color: C.gray }}>Otrzymasz SMS z aktualizacjami statusu</p>
      </motion.div>
    </DemoSection>
  );
  return (
    <DemoSection>
      <h3 className="font-bold text-sm" style={{ color: C.navy }}>Nowe zlecenie serwisowe</h3>
      <select className="w-full px-4 py-3 rounded-xl border text-sm" style={{ borderColor: C.light, background: C.white, color: C.navy }}>
        <option>Typ urządzenia...</option><option>Laptop</option><option>Smartfon</option><option>Tablet</option><option>Konsola</option><option>Inne</option>
      </select>
      <input placeholder="Marka i model" className="w-full px-4 py-3 rounded-xl border text-sm" style={{ borderColor: C.light, background: C.white, color: C.navy }} />
      <textarea placeholder="Opis problemu..." rows={4} className="w-full px-4 py-3 rounded-xl border text-sm resize-none" style={{ borderColor: C.light, background: C.white, color: C.navy }} />
      <select className="w-full px-4 py-3 rounded-xl border text-sm" style={{ borderColor: C.light, background: C.white, color: C.navy }}>
        <option>Priorytet...</option><option>Standardowy (5-7 dni)</option><option>Ekspresowy (2-3 dni) +50%</option><option>Na już (24h) +100%</option>
      </select>
      <input placeholder="Imię, nazwisko, telefon" className="w-full px-4 py-3 rounded-xl border text-sm" style={{ borderColor: C.light, background: C.white, color: C.navy }} />
      <motion.button whileHover={{ scale: 1.02 }} onClick={() => setSubmitted(true)}
        className="w-full py-3.5 rounded-xl font-bold text-sm text-white" style={{ background: C.blue }}>Złóż zlecenie</motion.button>
    </DemoSection>
  );
}

function StatusPage({ onNav }: { onNav: (p: string) => void }) {
  return (
    <DemoSection>
      <h3 className="font-bold text-sm" style={{ color: C.navy }}>Twoje zlecenia</h3>
      {repairs.map((r, i) => {
        const st = statusMap[r.status];
        return (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            className="p-4 rounded-xl border cursor-pointer" style={{ borderColor: C.light, background: C.white }} onClick={() => onNav("timeline")}>
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-xs font-bold" style={{ color: C.navy }}>{r.id}</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: st.color + "15", color: st.color }}>{st.label}</span>
            </div>
            <h4 className="text-sm font-medium" style={{ color: C.navy }}>{r.device}</h4>
            <p className="text-[10px]" style={{ color: C.gray }}>{r.issue} • ETA: {r.eta}</p>
            {r.cost > 0 && <p className="text-xs font-bold mt-1" style={{ color: C.blue }}>{r.cost} zł</p>}
            <div className="w-full h-1.5 rounded-full mt-2" style={{ background: C.light }}>
              <div className="h-full rounded-full" style={{ width: `${(r.stage/r.total)*100}%`, background: st.color }} />
            </div>
            <p className="text-[10px] mt-0.5" style={{ color: C.gray }}>Etap {r.stage}/{r.total}</p>
          </motion.div>
        );
      })}
    </DemoSection>
  );
}

function TimelinePage() {
  const r = repairs[0];
  return (
    <DemoSection>
      <h3 className="font-bold text-sm" style={{ color: C.navy }}>Timeline naprawy</h3>
      <div className="p-3 rounded-xl mb-3" style={{ background: C.light }}>
        <span className="font-mono text-xs" style={{ color: C.navy }}>{r.id}</span>
        <p className="text-sm font-medium mt-0.5" style={{ color: C.navy }}>{r.device} — {r.issue}</p>
      </div>
      <div className="space-y-0">
        {stages.map((stage, i) => {
          const isDone = i < r.stage;
          const isCurrent = i === r.stage - 1;
          return (
            <div key={i} className="flex gap-3">
              <div className="flex flex-col items-center">
                <motion.div initial={isCurrent ? { scale: 0.8 } : {}} animate={isCurrent ? { scale: [0.8, 1.1, 1] } : {}}
                  className="w-8 h-8 rounded-full flex items-center justify-center border-2"
                  style={isDone ? { background: C.green, borderColor: C.green } : isCurrent ? { borderColor: C.blue, background: C.blue + "15" } : { borderColor: C.gray + "30" }}>
                  {isDone ? <CheckCircle2 className="w-4 h-4 text-white" /> : <span className="text-xs font-bold" style={{ color: isCurrent ? C.blue : C.gray }}>{i+1}</span>}
                </motion.div>
                {i < stages.length - 1 && <div className="w-0.5 h-8" style={{ background: isDone ? C.green : C.gray + "20" }} />}
              </div>
              <div className="pb-4 flex-1">
                <span className="text-sm font-semibold" style={{ color: isDone || isCurrent ? C.navy : C.gray }}>{stage}</span>
                {isDone && <p className="text-[10px]" style={{ color: C.green }}>Zakończone</p>}
                {isCurrent && <p className="text-[10px]" style={{ color: C.blue }}>W trakcie...</p>}
              </div>
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
      <h3 className="font-bold text-sm" style={{ color: C.navy }}>Panel serwisu</h3>
      <div className="grid grid-cols-4 gap-2">
        {[{ l: "Aktywne", v: "18", c: C.blue },{ l: "Gotowe", v: "5", c: C.green },{ l: "Diagnoza", v: "4", c: C.orange },{ l: "Dziś", v: "8 nowych", c: C.navy }].map((s, i) => (
          <div key={i} className="p-3 rounded-xl text-center" style={{ background: C.light }}>
            <span className="font-bold text-sm block" style={{ color: s.c }}>{s.v}</span>
            <span className="text-[9px]" style={{ color: C.gray }}>{s.l}</span>
          </div>
        ))}
      </div>
    </DemoSection>
  );
}
