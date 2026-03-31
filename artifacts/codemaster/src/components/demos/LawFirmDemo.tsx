import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PreviewShell, DemoNav, DemoSection, DemoBenefits, DemoFooterCTA } from "./PreviewShell";
import { Briefcase, Users, FileText, Clock, BarChart3, Plus, Search, Home, CheckCircle2, AlertTriangle, Phone, Scale, ChevronRight, Shield, Calendar, MessageCircle, Filter } from "lucide-react";

const C = { graphite: "#2D3436", navy: "#1B2838", ivory: "#FBF8F0", gold: "#B8860B", darkGold: "#8B6914", white: "#F9F7F2", gray: "#6B7280", green: "#10B981", blue: "#3B82F6", red: "#EF4444", amber: "#F59E0B", light: "#F3F0E8", bordeaux: "#722F37" };

const practiceAreas = [
  { name: "Prawo rodzinne", icon: "👨‍👩‍👧", cases: 48, desc: "Rozwody, alimenty, opieka nad dziećmi" },
  { name: "Prawo gospodarcze", icon: "🏢", cases: 62, desc: "Umowy, spory, windykacja" },
  { name: "Prawo karne", icon: "⚖️", cases: 24, desc: "Obrona, reprezentacja, odwołania" },
  { name: "Odszkodowania", icon: "🛡️", cases: 36, desc: "Wypadki, błędy medyczne, OC" },
  { name: "Nieruchomości", icon: "🏠", cases: 28, desc: "Umowy, spory, due diligence" },
];

const leads = [
  { id: "SPR-2026-042", client: "Jan Kowalski", type: "Prawo rodzinne", subject: "Sprawa rozwodowa z podziałem majątku", status: "new", priority: "high", date: "31 mar 2026" },
  { id: "SPR-2026-041", client: "ABC Sp. z o.o.", type: "Prawo gospodarcze", subject: "Spór z kontrahentem — faktura 84K", status: "analysis", priority: "high", date: "30 mar 2026" },
  { id: "SPR-2026-038", client: "Maria Nowak", type: "Odszkodowania", subject: "Wypadek komunikacyjny — OC sprawcy", status: "contact", priority: "medium", date: "28 mar 2026" },
  { id: "SPR-2026-035", client: "Tomasz Wiśniewski", type: "Prawo karne", subject: "Obrona — art. 286 KK", status: "scheduled", priority: "high", date: "26 mar 2026" },
  { id: "SPR-2026-030", client: "Kowalski & Syn", type: "Nieruchomości", subject: "Due diligence — działka inwestycyjna", status: "closed", priority: "low", date: "24 mar 2026" },
];

const statusMap: Record<string, { color: string; label: string }> = {
  new: { color: C.blue, label: "Nowa" },
  analysis: { color: C.amber, label: "W analizie" },
  contact: { color: C.gold, label: "Oczekuje na kontakt" },
  scheduled: { color: C.green, label: "Umówiona" },
  closed: { color: C.gray, label: "Zamknięta" },
};

const priorityMap: Record<string, { color: string; label: string }> = {
  high: { color: C.red, label: "Wysoki" },
  medium: { color: C.amber, label: "Średni" },
  low: { color: C.gray, label: "Niski" },
};

export function LawFirmDemo({ name }: { name: string; features: string[] }) {
  const [page, setPage] = useState("home");
  const tabs = [
    { id: "home", label: "Kancelaria", icon: <Home className="w-3 h-3" /> },
    { id: "intake", label: "Zgłoś sprawę", icon: <Plus className="w-3 h-3" /> },
    { id: "leads", label: "Panel spraw", icon: <Briefcase className="w-3 h-3" /> },
    { id: "consult", label: "Konsultacje", icon: <Calendar className="w-3 h-3" /> },
    { id: "case", label: "Karta sprawy", icon: <FileText className="w-3 h-3" /> },
  ];

  return (
    <PreviewShell title={name}>
      <DemoNav tabs={tabs} activeTab={page} onTabChange={setPage} logo="Lex & Partners" />
      <AnimatePresence mode="wait">
        <motion.div key={page} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
          {page === "home" && <HomePage onNav={setPage} />}
          {page === "intake" && <IntakePage />}
          {page === "leads" && <LeadsPage />}
          {page === "consult" && <ConsultPage />}
          {page === "case" && <CasePage />}
        </motion.div>
      </AnimatePresence>
    </PreviewShell>
  );
}

function HomePage({ onNav }: { onNav: (p: string) => void }) {
  return (
    <div>
      <div className="p-8 pb-10" style={{ background: `linear-gradient(160deg, ${C.graphite}, ${C.navy})` }}>
        <p className="text-[10px] tracking-[0.4em] uppercase" style={{ color: C.gold }}>Kancelaria Prawna</p>
        <h1 className="font-display font-bold text-3xl mt-1 text-white">Lex <span style={{ color: C.gold }}>&</span> Partners</h1>
        <p className="text-xs mt-2 text-white/70 max-w-[280px] leading-relaxed">Profesjonalna obsługa prawna dla firm i osób prywatnych. Skuteczność, dyskrecja, doświadczenie.</p>
        <div className="flex gap-3 mt-5">
          <motion.button whileHover={{ scale: 1.03 }} onClick={() => onNav("intake")}
            className="px-6 py-3 rounded-lg font-bold text-sm shadow-lg text-white" style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.darkGold})` }}>Zgłoś sprawę</motion.button>
          <button onClick={() => onNav("consult")} className="px-6 py-3 rounded-lg font-semibold text-sm border border-white/20 text-white">Umów konsultację</button>
        </div>
      </div>

      <DemoSection>
        <h3 className="font-bold text-sm" style={{ color: C.graphite }}>Obszary praktyki</h3>
        <div className="space-y-2">
          {practiceAreas.map((area, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
              className="flex items-center gap-3 p-3 rounded-xl border hover:shadow-sm transition-all cursor-pointer" style={{ borderColor: C.light, background: C.white }}>
              <span className="text-xl shrink-0">{area.icon}</span>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold" style={{ color: C.graphite }}>{area.name}</h4>
                <p className="text-[10px]" style={{ color: C.gray }}>{area.desc}</p>
              </div>
              <span className="text-[10px] font-bold shrink-0" style={{ color: C.gold }}>{area.cases} spraw</span>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2 mt-2">
          {[{ v: "15+", l: "Lat doświadczenia" }, { v: "98%", l: "Skuteczność" }, { v: "1 200+", l: "Wygranych spraw" }].map((s, i) => (
            <div key={i} className="p-3 rounded-xl text-center" style={{ background: C.light }}>
              <span className="font-bold text-sm block" style={{ color: C.gold }}>{s.v}</span>
              <span className="text-[8px]" style={{ color: C.gray }}>{s.l}</span>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-xl" style={{ background: C.light, border: `1px solid ${C.gold}15` }}>
          <p className="text-[10px] tracking-[0.2em] uppercase text-center" style={{ color: C.gold }}>Opinie klientów</p>
          <p className="text-xs mt-2 text-center italic" style={{ color: C.graphite + "90" }}>"Profesjonalizm na najwyższym poziomie. Sprawa rozwodowa zakończona pozytywnie w 4 miesiące. Pełna dyskrecja."</p>
          <p className="text-[10px] text-center mt-1" style={{ color: C.gold }}>— Klient, Prawo rodzinne ★★★★★</p>
        </div>
      </DemoSection>

      <DemoBenefits accentColor={C.gold} bgColor={C.light} textColor={C.graphite} benefits={[
        { icon: "⚖️", title: "Obsługa prawna", desc: "Kompleksowa pomoc we wszystkich sprawach" },
        { icon: "📋", title: "Kwalifikacja online", desc: "Formularz sprawy i szybka analiza" },
        { icon: "📅", title: "Konsultacje", desc: "Rezerwacja terminu spotkania online" },
        { icon: "🔒", title: "Pełna dyskrecja", desc: "Bezpieczeństwo i poufność danych" },
      ]} />
      <DemoFooterCTA accentColor={C.gold} bgColor={C.navy} />
    </div>
  );
}

function IntakePage() {
  const [step, setStep] = useState(0);
  const [caseType, setCaseType] = useState("");
  const steps = ["Typ sprawy", "Szczegóły", "Dane kontaktowe"];

  return (
    <DemoSection>
      <h3 className="font-bold text-sm" style={{ color: C.graphite }}>Zgłoś sprawę</h3>
      <div className="flex items-center gap-2 mb-4">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center gap-2 flex-1">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold"
              style={i <= step ? { background: C.gold, color: "white" } : { background: C.light, color: C.gray }}>{i + 1}</div>
            <span className="text-[10px] font-medium" style={{ color: i <= step ? C.graphite : C.gray }}>{s}</span>
            {i < steps.length - 1 && <div className="flex-1 h-0.5 rounded" style={{ background: i < step ? C.gold : C.light }} />}
          </div>
        ))}
      </div>

      {step === 0 && (
        <div className="space-y-2">
          {practiceAreas.map((area, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              onClick={() => { setCaseType(area.name); setStep(1); }}
              className="flex items-center gap-3 p-4 rounded-xl border cursor-pointer hover:shadow-sm transition-all"
              style={{ borderColor: caseType === area.name ? C.gold + "50" : C.light, background: caseType === area.name ? C.gold + "05" : C.white }}>
              <span className="text-xl">{area.icon}</span>
              <div className="flex-1">
                <h4 className="text-xs font-bold" style={{ color: C.graphite }}>{area.name}</h4>
                <p className="text-[10px]" style={{ color: C.gray }}>{area.desc}</p>
              </div>
              <ChevronRight className="w-4 h-4" style={{ color: C.gray }} />
            </motion.div>
          ))}
        </div>
      )}

      {step === 1 && (
        <div className="space-y-3">
          <div className="p-3 rounded-xl" style={{ background: C.gold + "08" }}>
            <span className="text-[10px] font-bold" style={{ color: C.gold }}>Wybrany typ: {caseType}</span>
          </div>
          <textarea placeholder="Opisz swoją sprawę — co się wydarzyło, czego oczekujesz, jakie masz dokumenty..." rows={5}
            className="w-full px-4 py-3 rounded-xl border text-sm resize-none" style={{ borderColor: C.light, background: C.white, color: C.graphite }} />
          <select className="w-full px-4 py-3 rounded-xl border text-sm" style={{ borderColor: C.light, background: C.white, color: C.graphite }}>
            <option>Pilność sprawy...</option><option>Pilna — potrzebuję pomocy natychmiast</option><option>Standardowa — w ciągu tygodnia</option><option>Planowana — mam czas</option>
          </select>
          <div className="flex gap-2">
            <button onClick={() => setStep(0)} className="px-4 py-2.5 rounded-lg text-xs font-medium" style={{ background: C.light, color: C.graphite }}>Wstecz</button>
            <motion.button whileHover={{ scale: 1.02 }} onClick={() => setStep(2)}
              className="flex-1 py-2.5 rounded-lg text-xs font-bold text-white" style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.darkGold})` }}>Dalej →</motion.button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-3">
          <input placeholder="Imię i nazwisko" className="w-full px-4 py-3 rounded-xl border text-sm" style={{ borderColor: C.light, background: C.white, color: C.graphite }} />
          <input placeholder="E-mail" className="w-full px-4 py-3 rounded-xl border text-sm" style={{ borderColor: C.light, background: C.white, color: C.graphite }} />
          <input placeholder="Telefon" className="w-full px-4 py-3 rounded-xl border text-sm" style={{ borderColor: C.light, background: C.white, color: C.graphite }} />
          <label className="flex items-start gap-2 text-[10px]" style={{ color: C.gray }}>
            <input type="checkbox" className="mt-0.5" />
            <span>Wyrażam zgodę na przetwarzanie danych osobowych w celu analizy sprawy. Tajemnica adwokacka gwarantowana.</span>
          </label>
          <div className="flex gap-2">
            <button onClick={() => setStep(1)} className="px-4 py-2.5 rounded-lg text-xs font-medium" style={{ background: C.light, color: C.graphite }}>Wstecz</button>
            <motion.button whileHover={{ scale: 1.02 }}
              className="flex-1 py-2.5 rounded-lg text-xs font-bold text-white" style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.darkGold})` }}>Wyślij zgłoszenie</motion.button>
          </div>
        </div>
      )}
    </DemoSection>
  );
}

function LeadsPage() {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? leads : leads.filter(l => l.status === filter);
  return (
    <DemoSection>
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-sm" style={{ color: C.graphite }}>Panel spraw</h3>
        <div className="grid grid-cols-4 gap-1">
          {[{ l: "Nowe", v: "2", c: C.blue }, { l: "Analiza", v: "1", c: C.amber }, { l: "Kontakt", v: "1", c: C.gold }, { l: "Umówione", v: "1", c: C.green }].map((s, i) => (
            <div key={i} className="p-1.5 rounded text-center" style={{ background: s.c + "10" }}>
              <span className="font-bold text-xs block" style={{ color: s.c }}>{s.v}</span>
              <span className="text-[7px]" style={{ color: C.gray }}>{s.l}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {[{ id: "all", l: "Wszystkie" }, { id: "new", l: "Nowe" }, { id: "analysis", l: "Analiza" }, { id: "contact", l: "Kontakt" }, { id: "scheduled", l: "Umówione" }].map(f => (
          <button key={f.id} onClick={() => setFilter(f.id)} className="px-3 py-1.5 rounded-lg text-[10px] font-medium whitespace-nowrap transition-all"
            style={filter === f.id ? { background: C.gold, color: "white" } : { background: C.light, color: C.gray }}>{f.l}</button>
        ))}
      </div>
      <div className="space-y-2">
        {filtered.map((l, i) => {
          const st = statusMap[l.status];
          const pr = priorityMap[l.priority];
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="p-4 rounded-xl border hover:shadow-sm transition-all cursor-pointer" style={{ borderColor: C.light, background: C.white }}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-mono text-[10px] font-bold" style={{ color: C.gray }}>{l.id}</span>
                <div className="flex gap-1.5">
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold" style={{ background: pr.color + "15", color: pr.color }}>{pr.label}</span>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold" style={{ background: st.color + "15", color: st.color }}>{st.label}</span>
                </div>
              </div>
              <h4 className="text-xs font-semibold" style={{ color: C.graphite }}>{l.subject}</h4>
              <p className="text-[10px] mt-0.5" style={{ color: C.gray }}>{l.client} · {l.type} · {l.date}</p>
            </motion.div>
          );
        })}
      </div>
    </DemoSection>
  );
}

function ConsultPage() {
  const slots = [
    { time: "09:00", available: true }, { time: "10:00", available: false },
    { time: "11:00", available: true }, { time: "13:00", available: true },
    { time: "14:00", available: false }, { time: "15:00", available: true },
    { time: "16:00", available: true }, { time: "17:00", available: false },
  ];
  return (
    <DemoSection>
      <h3 className="font-bold text-sm" style={{ color: C.graphite }}>Umów konsultację</h3>
      <p className="text-xs" style={{ color: C.gray }}>Wybierz termin spotkania z prawnikiem</p>

      <div className="p-4 rounded-xl" style={{ background: C.light }}>
        <p className="text-[10px] font-bold uppercase mb-3" style={{ color: C.gray }}>Środa, 2 kwietnia 2026</p>
        <div className="grid grid-cols-4 gap-2">
          {slots.map((s, i) => (
            <motion.button key={i} whileHover={s.available ? { scale: 1.05 } : {}}
              className="py-2.5 rounded-lg text-xs font-medium transition-all"
              style={s.available ? { background: C.white, color: C.graphite, border: `1px solid ${C.gold}30`, cursor: "pointer" } : { background: C.gray + "10", color: C.gray + "60", cursor: "not-allowed" }}>
              {s.time}
            </motion.button>
          ))}
        </div>
      </div>

      <select className="w-full px-4 py-3 rounded-xl border text-sm" style={{ borderColor: C.light, background: C.white, color: C.graphite }}>
        <option>Typ konsultacji...</option><option>Osobista w kancelarii</option><option>Wideokonferencja</option><option>Telefoniczna</option>
      </select>

      <select className="w-full px-4 py-3 rounded-xl border text-sm" style={{ borderColor: C.light, background: C.white, color: C.graphite }}>
        <option>Obszar prawny...</option>{practiceAreas.map((a, i) => <option key={i}>{a.name}</option>)}
      </select>

      <motion.button whileHover={{ scale: 1.02 }}
        className="w-full py-3 rounded-xl text-xs font-bold text-white" style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.darkGold})` }}>Zarezerwuj konsultację</motion.button>

      <div className="p-3 rounded-xl" style={{ background: C.gold + "08", border: `1px solid ${C.gold}15` }}>
        <p className="text-[10px]" style={{ color: C.graphite }}>Pierwsza konsultacja — <strong>bezpłatna</strong> (30 min). Kolejne od 250 zł/h.</p>
      </div>
    </DemoSection>
  );
}

function CasePage() {
  const caseData = leads[1];
  return (
    <DemoSection>
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-sm" style={{ color: C.graphite }}>Karta sprawy</h3>
        <span className="font-mono text-[10px]" style={{ color: C.gray }}>{caseData.id}</span>
      </div>

      <div className="p-4 rounded-xl" style={{ background: C.light }}>
        <h4 className="text-sm font-bold" style={{ color: C.graphite }}>{caseData.subject}</h4>
        <div className="grid grid-cols-2 gap-2 mt-3">
          <div><span className="text-[9px] block" style={{ color: C.gray }}>Klient</span><span className="text-xs font-medium" style={{ color: C.graphite }}>{caseData.client}</span></div>
          <div><span className="text-[9px] block" style={{ color: C.gray }}>Typ sprawy</span><span className="text-xs font-medium" style={{ color: C.graphite }}>{caseData.type}</span></div>
          <div><span className="text-[9px] block" style={{ color: C.gray }}>Status</span><span className="text-xs font-medium" style={{ color: statusMap[caseData.status].color }}>{statusMap[caseData.status].label}</span></div>
          <div><span className="text-[9px] block" style={{ color: C.gray }}>Priorytet</span><span className="text-xs font-medium" style={{ color: priorityMap[caseData.priority].color }}>{priorityMap[caseData.priority].label}</span></div>
        </div>
      </div>

      <h4 className="font-bold text-sm" style={{ color: C.graphite }}>Historia aktywności</h4>
      <div className="space-y-0">
        {[
          { action: "Zgłoszenie przyjęte", date: "30 mar, 09:15", by: "System" },
          { action: "Przydzielono do mec. Kowalskiej", date: "30 mar, 10:00", by: "Admin" },
          { action: "Analiza dokumentów rozpoczęta", date: "30 mar, 14:30", by: "mec. Kowalska" },
          { action: "Notatka: brak umowy pisemnej", date: "31 mar, 09:00", by: "mec. Kowalska" },
        ].map((h, i) => (
          <div key={i} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className="w-2 h-2 rounded-full mt-1.5" style={{ background: i === 0 ? C.gold : C.gray + "40" }} />
              {i < 3 && <div className="w-0.5 h-8" style={{ background: C.gray + "20" }} />}
            </div>
            <div className="pb-3">
              <span className="text-xs font-medium" style={{ color: C.graphite }}>{h.action}</span>
              <p className="text-[9px]" style={{ color: C.gray }}>{h.date} · {h.by}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 rounded-xl" style={{ background: C.white, border: `1px solid ${C.light}` }}>
        <span className="text-[10px] font-bold" style={{ color: C.graphite }}>Notatki prawnika</span>
        <p className="text-[10px] mt-1" style={{ color: C.gray }}>Klient nie posiada pisemnej umowy. Faktura wystawiona na podstawie zamówienia e-mail. Rekomendacja: wezwanie do zapłaty + ewentualne postępowanie nakazowe.</p>
      </div>
    </DemoSection>
  );
}
