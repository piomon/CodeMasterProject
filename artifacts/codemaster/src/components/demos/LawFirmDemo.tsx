import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PreviewShell, DemoFooterCTA, DemoBenefits } from "./PreviewShell";
import { Briefcase, Users, FileText, Clock, Plus, CheckCircle2, Scale, ChevronRight, Calendar, Bell, Download } from "lucide-react";

const C = { navy: "#1E3A5F", burgundy: "#722F37", cream: "#FAF8F5", gold: "#B8860B", dark: "#1A1A2E", white: "#FFFFFF", gray: "#6B7280", green: "#10B981", blue: "#3B82F6", red: "#EF4444", amber: "#F59E0B", light: "#F0EDE6" };

type LawPage = "cases" | "calendar" | "clients" | "documents" | "billing" | "detail" | "intake";

type CaseStatus = "active" | "pending" | "hearing" | "closed";
const caseStatusInfo: Record<CaseStatus, { bg: string; fg: string; label: string }> = {
  active: { bg: C.green + "12", fg: C.green, label: "Aktywna" },
  pending: { bg: C.amber + "12", fg: C.amber, label: "Oczekuje" },
  hearing: { bg: C.blue + "12", fg: C.blue, label: "Rozprawa" },
  closed: { bg: C.gray + "12", fg: C.gray, label: "Zamknięta" },
};

const cases = [
  { id: "SPR-2026-042", client: "Jan Kowalski", type: "Prawo rodzinne", subject: "Sprawa rozwodowa z podziałem majątku", status: "active" as CaseStatus, date: "31 mar", hours: 12.5 },
  { id: "SPR-2026-041", client: "ABC Sp. z o.o.", type: "Prawo gospodarcze", subject: "Spór z kontrahentem — faktura 84K", status: "hearing" as CaseStatus, date: "30 mar", hours: 8.0 },
  { id: "SPR-2026-038", client: "Maria Nowak", type: "Odszkodowania", subject: "Wypadek komunikacyjny — OC sprawcy", status: "pending" as CaseStatus, date: "28 mar", hours: 4.5 },
  { id: "SPR-2026-035", client: "Tomasz Wiśniewski", type: "Prawo karne", subject: "Obrona — art. 286 KK", status: "active" as CaseStatus, date: "26 mar", hours: 18.0 },
  { id: "SPR-2026-030", client: "Kowalski & Syn", type: "Nieruchomości", subject: "Due diligence — działka inwestycyjna", status: "closed" as CaseStatus, date: "24 mar", hours: 6.0 },
];

const navItems: { id: LawPage; label: string; icon: ReactNode }[] = [
  { id: "cases", label: "Sprawy", icon: <Briefcase className="w-3.5 h-3.5" /> },
  { id: "calendar", label: "Kalendarz", icon: <Calendar className="w-3.5 h-3.5" /> },
  { id: "clients", label: "Klienci", icon: <Users className="w-3.5 h-3.5" /> },
  { id: "documents", label: "Dokumenty", icon: <FileText className="w-3.5 h-3.5" /> },
  { id: "billing", label: "Rozliczenia", icon: <Clock className="w-3.5 h-3.5" /> },
];

export function LawFirmDemo({ name }: { name: string; features: string[] }) {
  const [page, setPage] = useState<LawPage>("cases");

  return (
    <PreviewShell title={name}>
      <div style={{ background: C.cream, minHeight: 540 }}>
        <div className="flex items-center justify-between px-4 py-2.5" style={{ background: C.navy }}>
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5" style={{ color: C.gold }} />
            <div>
              <h1 className="font-bold text-sm text-white">Lex <span style={{ color: C.gold }}>&</span> Partners</h1>
              <p className="text-[7px] tracking-widest uppercase text-white/40">Kancelaria Prawna</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative p-1.5"><Bell className="w-4 h-4 text-white/60" /><span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full text-[6px] font-bold flex items-center justify-center text-white" style={{ background: C.burgundy }}>3</span></button>
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-bold text-white" style={{ background: C.burgundy }}>MK</div>
          </div>
        </div>

        <div className="flex gap-0 overflow-x-auto" style={{ background: C.navy + "F0", borderBottom: `1px solid ${C.gold}20` }}>
          {navItems.map(n => (
            <button key={n.id} onClick={() => setPage(n.id)} className="flex items-center gap-1.5 px-3.5 py-2 text-[10px] font-semibold border-b-2 whitespace-nowrap"
              style={page === n.id || (page === "detail" && n.id === "cases") || (page === "intake" && n.id === "cases") ? { borderColor: C.gold, color: C.gold } : { borderColor: "transparent", color: "rgba(255,255,255,0.5)" }}>
              {n.icon}<span>{n.label}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={page} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            {page === "cases" && <CasesPage onNav={setPage} />}
            {page === "detail" && <CaseDetailPage onBack={() => setPage("cases")} />}
            {page === "intake" && <IntakePage />}
            {page === "calendar" && <CalendarPage />}
            {page === "clients" && <ClientsPage />}
            {page === "documents" && <DocumentsPage />}
            {page === "billing" && <BillingPage />}
          </motion.div>
        </AnimatePresence>
      </div>

      <DemoBenefits accentColor={C.gold} bgColor={C.light} textColor={C.navy} benefits={[
        { icon: "⚖️", title: "Zarządzanie sprawami", desc: "Pełna historia i dokumentacja" },
        { icon: "📋", title: "Formularz online", desc: "Kwalifikacja spraw przez stronę" },
        { icon: "📅", title: "Kalendarz rozpraw", desc: "Terminy i przypomnienia" },
        { icon: "🔒", title: "Poufność", desc: "Tajemnica adwokacka" },
      ]} />
      <DemoFooterCTA accentColor={C.gold} bgColor={C.navy} />
    </PreviewShell>
  );
}

function CasesPage({ onNav }: { onNav: (p: LawPage) => void }) {
  const active = cases.filter(c => c.status !== "closed").length;
  const hearing = cases.filter(c => c.status === "hearing").length;
  const totalHours = cases.reduce((a, c) => a + c.hours, 0);

  return (
    <div className="p-3 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold" style={{ color: C.navy }}>Panel spraw</span>
        <button onClick={() => onNav("intake")} className="flex items-center gap-1 px-3 py-1.5 rounded text-[10px] font-bold text-white" style={{ background: C.burgundy }}>
          <Plus className="w-3 h-3" /> Nowa sprawa
        </button>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {[
          { label: "Aktywne", value: `${active}`, color: C.green },
          { label: "Rozprawy", value: `${hearing}`, color: C.blue },
          { label: "Godziny", value: `${totalHours}`, color: C.gold },
          { label: "Zamknięte", value: `${cases.length - active}`, color: C.gray },
        ].map((s, i) => (
          <div key={i} className="p-2 rounded-xl text-center" style={{ background: C.white }}>
            <span className="font-bold text-sm block" style={{ color: s.color }}>{s.value}</span>
            <span className="text-[8px]" style={{ color: C.gray }}>{s.label}</span>
          </div>
        ))}
      </div>

      <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${C.light}` }}>
        <div className="grid grid-cols-6 text-[8px] font-bold uppercase px-2.5 py-1.5" style={{ background: C.navy, color: C.gold }}>
          <span>Nr sprawy</span><span>Klient</span><span>Typ</span><span>Status</span><span>Termin</span><span>Godz.</span>
        </div>
        {cases.map((c, i) => {
          const st = caseStatusInfo[c.status];
          return (
            <div key={i} onClick={() => onNav("detail")} className="grid grid-cols-6 items-center px-2.5 py-2 border-t text-[10px] cursor-pointer hover:bg-amber-50/30" style={{ borderColor: C.light, background: C.white }}>
              <span className="font-mono font-bold" style={{ color: C.navy }}>{c.id}</span>
              <span className="truncate" style={{ color: C.dark }}>{c.client}</span>
              <span className="truncate text-[9px]" style={{ color: C.gray }}>{c.type}</span>
              <span className="px-1.5 py-0.5 rounded text-[8px] font-bold text-center" style={{ background: st.bg, color: st.fg }}>{st.label}</span>
              <span style={{ color: C.gray }}>{c.date}</span>
              <span className="font-bold" style={{ color: C.gold }}>{c.hours}h</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CaseDetailPage({ onBack }: { onBack: () => void }) {
  const c = cases[0];
  const st = caseStatusInfo[c.status];
  return (
    <div className="p-3 space-y-3">
      <button onClick={onBack} className="text-[10px] font-semibold flex items-center gap-1" style={{ color: C.gold }}>← Powrót do spraw</button>
      <div className="p-3 rounded-xl" style={{ background: C.white, border: `1px solid ${C.light}` }}>
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-[10px] font-bold" style={{ color: C.navy }}>{c.id}</span>
          <span className="px-2 py-0.5 rounded text-[8px] font-bold" style={{ background: st.bg, color: st.fg }}>{st.label}</span>
        </div>
        <h3 className="font-bold text-sm" style={{ color: C.navy }}>{c.subject}</h3>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <div><span className="text-[8px] block" style={{ color: C.gray }}>Klient</span><span className="text-[10px] font-semibold" style={{ color: C.dark }}>{c.client}</span></div>
          <div><span className="text-[8px] block" style={{ color: C.gray }}>Typ sprawy</span><span className="text-[10px] font-semibold" style={{ color: C.dark }}>{c.type}</span></div>
          <div><span className="text-[8px] block" style={{ color: C.gray }}>Godziny</span><span className="text-[10px] font-bold" style={{ color: C.gold }}>{c.hours}h</span></div>
          <div><span className="text-[8px] block" style={{ color: C.gray }}>Prowadzący</span><span className="text-[10px] font-semibold" style={{ color: C.dark }}>mec. Kowalska</span></div>
        </div>
      </div>

      <span className="text-[10px] font-bold" style={{ color: C.navy }}>Oś czasu</span>
      <div className="space-y-0">
        {[
          { action: "Zgłoszenie przyjęte", date: "30 mar, 09:15", by: "System" },
          { action: "Przydzielono do mec. Kowalskiej", date: "30 mar, 10:00", by: "Admin" },
          { action: "Analiza dokumentów rozpoczęta", date: "30 mar, 14:30", by: "mec. Kowalska" },
          { action: "Notatka: brak umowy pisemnej", date: "31 mar, 09:00", by: "mec. Kowalska" },
        ].map((h, i) => (
          <div key={i} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className="w-2.5 h-2.5 rounded-full mt-1" style={{ background: i === 0 ? C.gold : C.gray + "40" }} />
              {i < 3 && <div className="w-0.5 flex-1" style={{ background: C.gray + "20" }} />}
            </div>
            <div className="pb-3">
              <span className="text-[10px] font-semibold" style={{ color: C.navy }}>{h.action}</span>
              <p className="text-[8px]" style={{ color: C.gray }}>{h.date} · {h.by}</p>
            </div>
          </div>
        ))}
      </div>

      <span className="text-[10px] font-bold" style={{ color: C.navy }}>Dokumenty</span>
      <div className="space-y-1">
        {["Pozew — wersja robocza.docx", "Odpis aktu małżeństwa.pdf", "Wykaz majątku wspólnego.xlsx"].map((d, i) => (
          <div key={i} className="flex items-center gap-2 p-2 rounded-lg" style={{ background: C.white, border: `1px solid ${C.light}` }}>
            <FileText className="w-3.5 h-3.5" style={{ color: C.navy }} />
            <span className="text-[10px] flex-1" style={{ color: C.dark }}>{d}</span>
            <Download className="w-3 h-3" style={{ color: C.gray }} />
          </div>
        ))}
      </div>

      <span className="text-[10px] font-bold" style={{ color: C.navy }}>Rejestr godzin</span>
      <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${C.light}` }}>
        <div className="grid grid-cols-4 text-[8px] font-bold uppercase px-2 py-1.5" style={{ background: C.navy, color: C.gold }}>
          <span>Data</span><span>Czynność</span><span>Prawnik</span><span>Czas</span>
        </div>
        {[
          { date: "30 mar", task: "Analiza dokumentacji", lawyer: "mec. Kowalska", time: "3.5h" },
          { date: "30 mar", task: "Spotkanie z klientem", lawyer: "mec. Kowalska", time: "1.5h" },
          { date: "31 mar", task: "Przygotowanie pozwu", lawyer: "mec. Kowalska", time: "4.0h" },
          { date: "31 mar", task: "Konsultacja telefoniczna", lawyer: "mec. Nowak", time: "0.5h" },
        ].map((r, i) => (
          <div key={i} className="grid grid-cols-4 items-center px-2 py-1.5 border-t text-[9px]" style={{ borderColor: C.light, background: C.white }}>
            <span style={{ color: C.gray }}>{r.date}</span>
            <span style={{ color: C.dark }}>{r.task}</span>
            <span style={{ color: C.gray }}>{r.lawyer}</span>
            <span className="font-bold" style={{ color: C.gold }}>{r.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function IntakePage() {
  type IntakeStep = "type" | "details" | "client" | "assign";
  const [step, setStep] = useState<IntakeStep>("type");
  const [caseType, setCaseType] = useState("");
  const steps: { id: IntakeStep; label: string }[] = [
    { id: "type", label: "Typ" },
    { id: "details", label: "Szczegóły" },
    { id: "client", label: "Klient" },
    { id: "assign", label: "Przydziel" },
  ];

  return (
    <div className="p-3 space-y-3">
      <span className="text-xs font-bold" style={{ color: C.navy }}>Nowa sprawa</span>
      <div className="flex items-center gap-1">
        {steps.map((s, i) => (
          <div key={s.id} className="flex items-center gap-1 flex-1">
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold"
              style={steps.indexOf(steps.find(st => st.id === step)!) >= i ? { background: C.gold, color: C.white } : { background: C.light, color: C.gray }}>{i + 1}</div>
            <span className="text-[9px]" style={{ color: steps.indexOf(steps.find(st => st.id === step)!) >= i ? C.navy : C.gray }}>{s.label}</span>
            {i < 3 && <div className="flex-1 h-0.5 rounded" style={{ background: steps.indexOf(steps.find(st => st.id === step)!) > i ? C.gold : C.light }} />}
          </div>
        ))}
      </div>

      {step === "type" && (
        <div className="space-y-1.5">
          {["Prawo rodzinne", "Prawo gospodarcze", "Prawo karne", "Odszkodowania", "Nieruchomości"].map((t, i) => (
            <button key={i} onClick={() => { setCaseType(t); setStep("details"); }}
              className="w-full flex items-center gap-3 p-3 rounded-xl text-left" style={{ background: caseType === t ? C.gold + "10" : C.white, border: `1px solid ${caseType === t ? C.gold + "40" : C.light}` }}>
              <span className="text-lg">{["👨‍👩‍👧","🏢","⚖️","🛡️","🏠"][i]}</span>
              <span className="text-[11px] font-semibold" style={{ color: C.navy }}>{t}</span>
              <ChevronRight className="w-3.5 h-3.5 ml-auto" style={{ color: C.gray }} />
            </button>
          ))}
        </div>
      )}

      {step === "details" && (
        <div className="space-y-2">
          <div className="p-2 rounded-lg text-[10px] font-semibold" style={{ background: C.gold + "10", color: C.gold }}>Typ: {caseType}</div>
          <textarea placeholder="Opis sprawy..." rows={4} className="w-full px-3 py-2 rounded-xl border text-[11px] resize-none" style={{ borderColor: C.light, background: C.white, color: C.dark }} />
          <select className="w-full px-3 py-2 rounded-xl border text-[11px]" style={{ borderColor: C.light, background: C.white, color: C.dark }}>
            <option>Pilność...</option><option>Pilna</option><option>Standardowa</option><option>Planowana</option>
          </select>
          <div className="flex gap-2">
            <button onClick={() => setStep("type")} className="px-3 py-2 rounded-lg text-[10px] font-medium" style={{ background: C.light, color: C.navy }}>Wstecz</button>
            <button onClick={() => setStep("client")} className="flex-1 py-2 rounded-lg text-[10px] font-bold text-white" style={{ background: C.gold }}>Dalej →</button>
          </div>
        </div>
      )}

      {step === "client" && (
        <div className="space-y-2">
          <input placeholder="Imię i nazwisko" className="w-full px-3 py-2 rounded-xl border text-[11px]" style={{ borderColor: C.light, background: C.white, color: C.dark }} />
          <input placeholder="E-mail" className="w-full px-3 py-2 rounded-xl border text-[11px]" style={{ borderColor: C.light, background: C.white, color: C.dark }} />
          <input placeholder="Telefon" className="w-full px-3 py-2 rounded-xl border text-[11px]" style={{ borderColor: C.light, background: C.white, color: C.dark }} />
          <label className="flex items-start gap-2 text-[9px]" style={{ color: C.gray }}><input type="checkbox" className="mt-0.5" /><span>Wyrażam zgodę na przetwarzanie danych. Tajemnica adwokacka gwarantowana.</span></label>
          <div className="flex gap-2">
            <button onClick={() => setStep("details")} className="px-3 py-2 rounded-lg text-[10px] font-medium" style={{ background: C.light, color: C.navy }}>Wstecz</button>
            <button onClick={() => setStep("assign")} className="flex-1 py-2 rounded-lg text-[10px] font-bold text-white" style={{ background: C.gold }}>Dalej →</button>
          </div>
        </div>
      )}

      {step === "assign" && (
        <div className="space-y-2">
          <span className="text-[10px] font-bold" style={{ color: C.navy }}>Przydziel prawnika</span>
          {["mec. Anna Kowalska — Prawo rodzinne", "mec. Piotr Nowak — Prawo gospodarcze", "mec. Ewa Mazur — Prawo karne"].map((l, i) => (
            <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl cursor-pointer" style={{ background: i === 0 ? C.gold + "10" : C.white, border: `1px solid ${i === 0 ? C.gold + "30" : C.light}` }}>
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-[8px] font-bold text-white" style={{ background: [C.burgundy, C.navy, C.blue][i] }}>{l.split(" ")[1][0]}{l.split(" ")[2][0]}</div>
              <span className="text-[10px] font-semibold" style={{ color: C.navy }}>{l}</span>
              {i === 0 && <CheckCircle2 className="w-3.5 h-3.5 ml-auto" style={{ color: C.gold }} />}
            </div>
          ))}
          <button className="w-full py-2.5 rounded-lg text-[10px] font-bold text-white" style={{ background: C.burgundy }}>Wyślij zgłoszenie</button>
        </div>
      )}
    </div>
  );
}

function CalendarPage() {
  const slots = [
    { time: "09:00", event: "Spotkanie z klientem — Kowalski", type: "meeting" },
    { time: "10:30", event: "Rozprawa — Sąd Rejonowy", type: "hearing" },
    { time: "13:00", event: "Analiza dokumentacji — ABC Sp. z o.o.", type: "work" },
    { time: "15:00", event: "Konsultacja telefoniczna — Nowak", type: "call" },
    { time: "16:30", event: "Wewnętrzna narada zespołu", type: "internal" },
  ];
  const typeColors: Record<string, string> = { meeting: C.gold, hearing: C.burgundy, work: C.blue, call: C.green, internal: C.gray };

  return (
    <div className="p-3 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold" style={{ color: C.navy }}>Kalendarz — Środa, 2 kwi 2026</span>
      </div>
      <div className="space-y-1.5">
        {slots.map((s, i) => (
          <div key={i} className="flex gap-3 items-start p-2.5 rounded-xl" style={{ background: C.white, borderLeft: `3px solid ${typeColors[s.type]}` }}>
            <span className="text-[10px] font-mono font-bold w-10 shrink-0" style={{ color: C.navy }}>{s.time}</span>
            <div className="flex-1">
              <span className="text-[10px] font-semibold" style={{ color: C.dark }}>{s.event}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ClientsPage() {
  const clients = [
    { name: "Jan Kowalski", type: "Osoba fizyczna", cases: 2, since: "2024" },
    { name: "ABC Sp. z o.o.", type: "Firma", cases: 5, since: "2022" },
    { name: "Maria Nowak", type: "Osoba fizyczna", cases: 1, since: "2026" },
    { name: "Tomasz Wiśniewski", type: "Osoba fizyczna", cases: 3, since: "2023" },
  ];
  return (
    <div className="p-3 space-y-3">
      <span className="text-xs font-bold" style={{ color: C.navy }}>Baza klientów</span>
      <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${C.light}` }}>
        <div className="grid grid-cols-4 text-[8px] font-bold uppercase px-2.5 py-1.5" style={{ background: C.navy, color: C.gold }}>
          <span>Klient</span><span>Typ</span><span>Sprawy</span><span>Od roku</span>
        </div>
        {clients.map((cl, i) => (
          <div key={i} className="grid grid-cols-4 items-center px-2.5 py-2 border-t text-[10px]" style={{ borderColor: C.light, background: C.white }}>
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-[8px] font-bold text-white" style={{ background: C.navy }}>{cl.name.split(" ").map(n => n[0]).join("")}</div>
              <span className="font-semibold truncate" style={{ color: C.dark }}>{cl.name}</span>
            </div>
            <span style={{ color: C.gray }}>{cl.type}</span>
            <span className="font-bold" style={{ color: C.gold }}>{cl.cases}</span>
            <span style={{ color: C.gray }}>{cl.since}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DocumentsPage() {
  const docs = [
    { name: "Pozew rozwodowy — Kowalski.docx", case: "SPR-2026-042", date: "31 mar", size: "245 KB" },
    { name: "Umowa — faktura 84K.pdf", case: "SPR-2026-041", date: "30 mar", size: "1.2 MB" },
    { name: "Dokumentacja medyczna — Nowak.pdf", case: "SPR-2026-038", date: "28 mar", size: "3.8 MB" },
    { name: "Akt oskarżenia — art. 286.pdf", case: "SPR-2026-035", date: "26 mar", size: "890 KB" },
    { name: "Raport due diligence — działka.xlsx", case: "SPR-2026-030", date: "24 mar", size: "560 KB" },
  ];
  return (
    <div className="p-3 space-y-3">
      <span className="text-xs font-bold" style={{ color: C.navy }}>Dokumenty</span>
      <div className="space-y-1.5">
        {docs.map((d, i) => (
          <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl" style={{ background: C.white, border: `1px solid ${C.light}` }}>
            <FileText className="w-4 h-4 shrink-0" style={{ color: C.navy }} />
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-semibold block truncate" style={{ color: C.dark }}>{d.name}</span>
              <span className="text-[8px]" style={{ color: C.gray }}>{d.case} · {d.date} · {d.size}</span>
            </div>
            <Download className="w-3.5 h-3.5 shrink-0" style={{ color: C.gold }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function BillingPage() {
  const totalHours = cases.reduce((a, c) => a + c.hours, 0);
  const rate = 350;
  return (
    <div className="p-3 space-y-3">
      <span className="text-xs font-bold" style={{ color: C.navy }}>Rozliczenia — Marzec 2026</span>
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Godziny", value: `${totalHours}h`, color: C.gold },
          { label: "Stawka", value: `${rate} zł/h`, color: C.navy },
          { label: "Wartość", value: `${(totalHours * rate / 1000).toFixed(1)}K zł`, color: C.burgundy },
        ].map((s, i) => (
          <div key={i} className="p-2.5 rounded-xl text-center" style={{ background: C.white }}>
            <span className="font-bold text-sm block" style={{ color: s.color }}>{s.value}</span>
            <span className="text-[8px]" style={{ color: C.gray }}>{s.label}</span>
          </div>
        ))}
      </div>
      <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${C.light}` }}>
        <div className="grid grid-cols-4 text-[8px] font-bold uppercase px-2.5 py-1.5" style={{ background: C.navy, color: C.gold }}>
          <span>Sprawa</span><span>Klient</span><span>Godziny</span><span>Kwota</span>
        </div>
        {cases.map((c, i) => (
          <div key={i} className="grid grid-cols-4 items-center px-2.5 py-2 border-t text-[10px]" style={{ borderColor: C.light, background: C.white }}>
            <span className="font-mono" style={{ color: C.navy }}>{c.id}</span>
            <span className="truncate" style={{ color: C.dark }}>{c.client}</span>
            <span className="font-bold" style={{ color: C.gold }}>{c.hours}h</span>
            <span className="font-bold" style={{ color: C.burgundy }}>{(c.hours * rate).toLocaleString()} zł</span>
          </div>
        ))}
      </div>
    </div>
  );
}
