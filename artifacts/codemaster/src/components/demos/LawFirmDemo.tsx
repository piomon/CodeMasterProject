import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PreviewShell, DemoNav, DemoSection } from "./PreviewShell";
import { Briefcase, Users, FileText, Clock, BarChart3, Plus, Search, Home, CheckCircle2, AlertTriangle, Phone, Scale, ChevronRight, Shield } from "lucide-react";

const C = { graphite: "#2C2C2C", navy: "#1B2838", ivory: "#FAF8F5", gold: "#B8860B", burgundy: "#800020", gray: "#6B7280", light: "#F5F3EF" };

const caseTypes = [
  { id: "civil", name: "Sprawy cywilne", icon: "⚖️", desc: "Umowy, odszkodowania, spadki" },
  { id: "business", name: "Prawo gospodarcze", icon: "🏢", desc: "Spółki, fuzje, due diligence" },
  { id: "family", name: "Prawo rodzinne", icon: "👨‍👩‍👧", desc: "Rozwody, alimenty, opieka" },
  { id: "criminal", name: "Prawo karne", icon: "🔒", desc: "Obrona, reprezentacja" },
  { id: "labor", name: "Prawo pracy", icon: "💼", desc: "Umowy, zwolnienia, spory" },
  { id: "ip", name: "Własność intelektualna", icon: "💡", desc: "Patenty, znaki towarowe" },
];

const lawyers = [
  { name: "mec. Jan Wiśniewski", spec: "Prawo gospodarcze", exp: "18 lat", cases: 450, rating: 4.9 },
  { name: "mec. Anna Dąbrowska", spec: "Prawo rodzinne", exp: "12 lat", cases: 320, rating: 5.0 },
  { name: "mec. Piotr Kowalczyk", spec: "Prawo karne", exp: "15 lat", cases: 280, rating: 4.8 },
];

export function LawFirmDemo({ name }: { name: string; features: string[] }) {
  const [page, setPage] = useState("home");
  const tabs = [
    { id: "home", label: "Kancelaria", icon: <Scale className="w-3 h-3" /> },
    { id: "practice", label: "Specjalizacje", icon: <Briefcase className="w-3 h-3" /> },
    { id: "consult", label: "Konsultacja", icon: <FileText className="w-3 h-3" /> },
    { id: "team", label: "Zespół", icon: <Users className="w-3 h-3" /> },
    { id: "portal", label: "Portal klienta", icon: <Shield className="w-3 h-3" /> },
    { id: "panel", label: "Panel", icon: <BarChart3 className="w-3 h-3" /> },
  ];

  return (
    <PreviewShell title={name}>
      <DemoNav tabs={tabs} activeTab={page} onTabChange={setPage} logo="Lex & Partners" />
      <AnimatePresence mode="wait">
        <motion.div key={page} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
          {page === "home" && <HomePage onNav={setPage} />}
          {page === "practice" && <PracticePage />}
          {page === "consult" && <ConsultPage />}
          {page === "team" && <TeamPage />}
          {page === "portal" && <PortalPage />}
          {page === "panel" && <PanelPage />}
        </motion.div>
      </AnimatePresence>
    </PreviewShell>
  );
}

function HomePage({ onNav }: { onNav: (p: string) => void }) {
  return (
    <div>
      <div className="p-10 text-center" style={{ background: `linear-gradient(160deg, ${C.graphite}, ${C.navy})` }}>
        <p className="text-[10px] tracking-[0.4em] uppercase" style={{ color: C.gold }}>Kancelaria Adwokacka</p>
        <h1 className="font-display font-bold text-4xl mt-2" style={{ color: C.ivory }}>Lex & Partners</h1>
        <p className="text-xs mt-2 max-w-[260px] mx-auto leading-relaxed" style={{ color: C.ivory + "80" }}>Prawo gospodarcze, cywilne i rodzinne. Ponad 1000 wygranych spraw i 20 lat doświadczenia na Twojej stronie.</p>
        <div className="flex gap-3 justify-center mt-6">
          <motion.button whileHover={{ scale: 1.03 }} onClick={() => onNav("consult")}
            className="px-7 py-3.5 rounded-lg font-bold text-sm shadow-lg" style={{ background: C.gold, color: C.graphite }}>Umów konsultację</motion.button>
          <button onClick={() => onNav("practice")} className="px-7 py-3.5 rounded-lg font-semibold text-sm border" style={{ borderColor: C.ivory + "30", color: C.ivory }}>Specjalizacje</button>
        </div>
      </div>
      <DemoSection>
        <div className="grid grid-cols-3 gap-2">
          {caseTypes.slice(0, 6).map((ct, i) => (
            <div key={i} className="p-3 rounded-xl text-center cursor-pointer" style={{ background: C.light }} onClick={() => onNav("practice")}>
              <span className="text-xl block mb-0.5">{ct.icon}</span>
              <span className="text-[9px] font-semibold" style={{ color: C.graphite }}>{ct.name}</span>
            </div>
          ))}
        </div>
        <div className="p-4 rounded-2xl mt-3" style={{ background: C.navy + "08", border: `1px solid ${C.gold}15` }}>
          <p className="text-[10px] tracking-[0.2em] uppercase text-center" style={{ color: C.gold }}>Opinie klientów</p>
          <p className="text-xs mt-2 text-center italic" style={{ color: C.graphite + "90" }}>"Mec. Wiśniewski wygrał dla nas sprawę, której inne kancelarie nie chciały przyjąć. Profesjonalizm na najwyższym poziomie."</p>
          <p className="text-[10px] text-center mt-1" style={{ color: C.gold }}>— Adam S. ★★★★★</p>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-3">
          {[{ l: "Wygranych spraw", v: "1000+" },{ l: "Lat doświadczenia", v: "20" },{ l: "Adwokatów", v: "8" }].map((s, i) => (
            <div key={i} className="p-3 rounded-xl text-center" style={{ background: C.navy + "08" }}>
              <span className="font-bold text-lg block" style={{ color: C.gold }}>{s.v}</span>
              <span className="text-[9px]" style={{ color: C.gray }}>{s.l}</span>
            </div>
          ))}
        </div>
      </DemoSection>
      <DemoBenefits accentColor={C.gold} bgColor={C.ivory} textColor={C.graphite} benefits={[
        { icon: "⚖️", title: "Profesjonalny intake", desc: "Kwalifikacja spraw online" },
        { icon: "📋", title: "Lepszy proces", desc: "Statusy i priorytety spraw" },
        { icon: "📅", title: "Kalendarz", desc: "Konsultacje i spotkania online" },
        { icon: "🔒", title: "Zaufanie klientów", desc: "Bezpieczny portal sprawy" },
      ]} />
      <DemoFooterCTA accentColor={C.gold} bgColor={C.graphite} />
    </div>
  );
}

function PracticePage() {
  return (
    <DemoSection>
      <h3 className="font-bold text-sm" style={{ color: C.graphite }}>Obszary praktyki</h3>
      <div className="space-y-3">
        {caseTypes.map((ct, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
            className="p-4 rounded-xl border cursor-pointer" style={{ borderColor: C.light, background: C.ivory }}>
            <div className="flex items-center gap-3">
              <span className="text-2xl">{ct.icon}</span>
              <div className="flex-1">
                <h4 className="font-bold text-sm" style={{ color: C.graphite }}>{ct.name}</h4>
                <p className="text-[10px]" style={{ color: C.gray }}>{ct.desc}</p>
              </div>
              <ChevronRight className="w-4 h-4" style={{ color: C.gray }} />
            </div>
          </motion.div>
        ))}
      </div>
    </DemoSection>
  );
}

function ConsultPage() {
  const [selType, setSelType] = useState("");
  const [step, setStep] = useState(0);

  return (
    <DemoSection>
      <h3 className="font-bold text-sm" style={{ color: C.graphite }}>Formularz konsultacji</h3>
      {step === 0 && (
        <div className="space-y-3">
          <p className="text-xs" style={{ color: C.gray }}>Wybierz rodzaj sprawy:</p>
          <div className="grid grid-cols-2 gap-2">
            {caseTypes.map(ct => (
              <button key={ct.id} onClick={() => setSelType(ct.id)}
                className="p-3 rounded-xl border text-left" style={selType === ct.id ? { borderColor: C.gold, background: C.gold + "08" } : { borderColor: C.light, background: C.ivory }}>
                <span className="text-lg">{ct.icon}</span>
                <span className="text-xs font-medium block mt-1" style={{ color: C.graphite }}>{ct.name}</span>
              </button>
            ))}
          </div>
          {selType && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
              <textarea placeholder="Opisz swoją sprawę..." rows={4} className="w-full px-4 py-3 rounded-xl border text-sm resize-none" style={{ borderColor: C.light, background: C.ivory, color: C.graphite }} />
              <select className="w-full px-4 py-3 rounded-xl border text-sm" style={{ borderColor: C.light, background: C.ivory, color: C.graphite }}>
                <option>Preferowana forma kontaktu</option><option>Telefon</option><option>E-mail</option><option>Spotkanie w biurze</option><option>Wideokonferencja</option>
              </select>
              <input placeholder="Imię i nazwisko" className="w-full px-4 py-3 rounded-xl border text-sm" style={{ borderColor: C.light, background: C.ivory, color: C.graphite }} />
              <input placeholder="Telefon" className="w-full px-4 py-3 rounded-xl border text-sm" style={{ borderColor: C.light, background: C.ivory, color: C.graphite }} />
              <input placeholder="E-mail" className="w-full px-4 py-3 rounded-xl border text-sm" style={{ borderColor: C.light, background: C.ivory, color: C.graphite }} />
              <div className="p-3 rounded-xl" style={{ background: C.gold + "08" }}>
                <p className="text-[10px]" style={{ color: C.gray }}>Pierwsza konsultacja: <span className="font-bold" style={{ color: C.gold }}>bezpłatna (30 min)</span></p>
              </div>
              <motion.button whileHover={{ scale: 1.02 }} onClick={() => setStep(1)}
                className="w-full py-3.5 rounded-xl font-semibold text-sm text-white" style={{ background: C.graphite }}>Wyślij zapytanie</motion.button>
            </motion.div>
          )}
        </div>
      )}
      {step === 1 && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
          <CheckCircle2 className="w-12 h-12 mx-auto mb-3" style={{ color: C.gold }} />
          <h3 className="font-bold text-lg" style={{ color: C.graphite }}>Zapytanie wysłane</h3>
          <p className="text-sm mt-1" style={{ color: C.gray }}>Skontaktujemy się w ciągu 24 godzin</p>
          <p className="text-xs mt-2 font-medium" style={{ color: C.gold }}>Nr sprawy: LEX-{Math.floor(Math.random()*9000+1000)}</p>
        </motion.div>
      )}
    </DemoSection>
  );
}

function TeamPage() {
  return (
    <DemoSection>
      <h3 className="font-bold text-sm" style={{ color: C.graphite }}>Nasz zespół</h3>
      {lawyers.map((l, i) => (
        <div key={i} className="p-4 rounded-xl border" style={{ borderColor: C.light, background: C.ivory }}>
          <div className="flex gap-4">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center font-bold text-sm" style={{ background: C.navy, color: C.gold }}>{l.name.split(" ").slice(1).map(n => n[0]).join("")}</div>
            <div className="flex-1">
              <h4 className="font-bold text-sm" style={{ color: C.graphite }}>{l.name}</h4>
              <p className="text-[10px]" style={{ color: C.gold }}>{l.spec}</p>
              <p className="text-[10px]" style={{ color: C.gray }}>{l.exp} doświadczenia • {l.cases} spraw</p>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-[10px] font-bold" style={{ color: C.graphite }}>⭐ {l.rating}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </DemoSection>
  );
}

function PortalPage() {
  const cases = [
    { id: "LEX-2026-042", name: "Spór z kontrahentem", type: "Gospodarcze", status: "active", progress: 65 },
    { id: "LEX-2026-038", name: "Umowa spółki", type: "Gospodarcze", status: "review", progress: 90 },
    { id: "LEX-2025-198", name: "Windykacja należności", type: "Cywilne", status: "closed", progress: 100 },
  ];
  return (
    <DemoSection>
      <h3 className="font-bold text-sm" style={{ color: C.graphite }}>Portal klienta</h3>
      <div className="p-4 rounded-xl" style={{ background: C.navy + "08" }}>
        <p className="text-xs" style={{ color: C.gray }}>Witaj, <span className="font-bold" style={{ color: C.graphite }}>XYZ Sp. z o.o.</span></p>
        <p className="text-[10px]" style={{ color: C.gray }}>Aktywne sprawy: {cases.filter(c => c.status !== "closed").length}</p>
      </div>
      <div className="space-y-3 mt-3">
        {cases.map((c, i) => (
          <div key={i} className="p-4 rounded-xl border" style={{ borderColor: C.light, background: C.ivory }}>
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs font-bold" style={{ color: C.graphite }}>{c.id}</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{
                background: c.status === "active" ? "#10B981" + "15" : c.status === "review" ? C.gold + "15" : C.gray + "15",
                color: c.status === "active" ? "#10B981" : c.status === "review" ? C.gold : C.gray
              }}>{c.status === "active" ? "W toku" : c.status === "review" ? "Do weryfikacji" : "Zamknięta"}</span>
            </div>
            <h4 className="font-semibold text-sm" style={{ color: C.graphite }}>{c.name}</h4>
            <p className="text-[10px]" style={{ color: C.gray }}>{c.type}</p>
            <div className="mt-2">
              <div className="flex justify-between text-[10px] mb-1">
                <span style={{ color: C.gray }}>Postęp</span><span style={{ color: C.gold }}>{c.progress}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full" style={{ background: C.light }}>
                <div className="h-full rounded-full" style={{ width: `${c.progress}%`, background: C.gold }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </DemoSection>
  );
}

function PanelPage() {
  return (
    <DemoSection>
      <h3 className="font-bold text-sm" style={{ color: C.graphite }}>Panel kancelarii</h3>
      <div className="grid grid-cols-4 gap-2">
        {[{ l: "Aktywne", v: "24" },{ l: "Ten miesiąc", v: "8 nowych" },{ l: "Przychód", v: "82K" },{ l: "Wygrane %", v: "89%" }].map((s, i) => (
          <div key={i} className="p-3 rounded-xl text-center" style={{ background: C.light }}>
            <span className="font-bold text-sm block" style={{ color: C.gold }}>{s.v}</span>
            <span className="text-[9px]" style={{ color: C.gray }}>{s.l}</span>
          </div>
        ))}
      </div>
    </DemoSection>
  );
}
