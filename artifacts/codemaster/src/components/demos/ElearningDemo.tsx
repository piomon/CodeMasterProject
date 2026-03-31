import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PreviewShell, DemoBenefits, DemoFooterCTA } from "./PreviewShell";
import { BookOpen, Play, Award, BarChart3, Star, CheckCircle2, Lock, ChevronRight, Target, FileText, Search } from "lucide-react";

const C = { indigo: "#4338CA", violet: "#6D28D9", white: "#FFFFFF", cream: "#FAFAFA", navy: "#1E1B4B", gray: "#6B7280", amber: "#F59E0B", green: "#10B981", light: "#F3F0FF", text: "#312E81", bg: "#F8F7FF", blue: "#3B82F6" };

type EduPage = "home" | "courses" | "learning" | "progress" | "certificates";
type CourseCategory = "all" | "Programowanie" | "Frontend" | "Design" | "Data Science" | "Marketing";

const courses = [
  { id: 1, title: "Python od podstaw do zaawansowanego", instructor: "dr Michał Kowalski", level: "Początkujący → Zaawansowany", duration: "42h", lessons: 128, students: 2840, rating: 4.9, price: 299, image: "🐍", progress: 68, category: "Programowanie" as const },
  { id: 2, title: "React & TypeScript — Fullstack 2026", instructor: "Anna Wiśniewska", level: "Średniozaawansowany", duration: "36h", lessons: 96, students: 1920, rating: 4.8, price: 349, image: "⚛️", progress: 42, category: "Frontend" as const },
  { id: 3, title: "UI/UX Design — od wireframe do Figma", instructor: "Katarzyna Dąbrowska", level: "Początkujący", duration: "28h", lessons: 72, students: 3180, rating: 4.7, price: 249, image: "🎨", progress: 0, category: "Design" as const },
  { id: 4, title: "Data Science i Machine Learning", instructor: "prof. Jan Nowak", level: "Zaawansowany", duration: "56h", lessons: 164, students: 1240, rating: 4.9, price: 449, image: "📊", progress: 15, category: "Data Science" as const },
  { id: 5, title: "Marketing Cyfrowy — strategia i narzędzia", instructor: "Ewa Lewandowska", level: "Początkujący", duration: "18h", lessons: 48, students: 4520, rating: 4.6, price: 199, image: "📈", progress: 0, category: "Marketing" as const },
  { id: 6, title: "Node.js & Express — backend w praktyce", instructor: "Tomasz Kowalczyk", level: "Średniozaawansowany", duration: "30h", lessons: 84, students: 1680, rating: 4.7, price: 279, image: "🟢", progress: 0, category: "Programowanie" as const },
];

const currentLessons = [
  { title: "Dekoratory i metaklasy", module: "Moduł 8: Zaawansowany Python", duration: "24 min", type: "video" as const, completed: true },
  { title: "Context managers i generators", module: "Moduł 8: Zaawansowany Python", duration: "18 min", type: "video" as const, completed: false },
  { title: "Quiz: Wzorce zaawansowane", module: "Moduł 8: Zaawansowany Python", duration: "10 min", type: "quiz" as const, completed: false },
  { title: "Projekt: System zarządzania danymi", module: "Moduł 8: Zaawansowany Python", duration: "45 min", type: "project" as const, completed: false },
];

const sidebarModules = [
  { title: "Moduł 1: Wprowadzenie", lessons: 8, done: true },
  { title: "Moduł 2: Typy danych", lessons: 12, done: true },
  { title: "Moduł 3: Struktury", lessons: 10, done: true },
  { title: "Moduł 4: Funkcje", lessons: 14, done: true },
  { title: "Moduł 5: OOP", lessons: 16, done: true },
  { title: "Moduł 6: Pliki i wyjątki", lessons: 10, done: true },
  { title: "Moduł 7: Biblioteki", lessons: 12, done: true },
  { title: "Moduł 8: Zaawansowany", lessons: 14, done: false },
  { title: "Moduł 9: Projekt końcowy", lessons: 8, done: false },
];

const achievements = [
  { icon: "🏆", title: "Pierwsze kroki", desc: "Ukończ pierwszą lekcję", unlocked: true },
  { icon: "🔥", title: "Seria 7 dni", desc: "Ucz się 7 dni z rzędu", unlocked: true },
  { icon: "⚡", title: "Speed learner", desc: "Ukończ 10 lekcji w jeden dzień", unlocked: true },
  { icon: "🎯", title: "Quiz master", desc: "100% w 5 quizach z rzędu", unlocked: false },
  { icon: "💎", title: "Absolwent", desc: "Ukończ cały kurs", unlocked: false },
];

const certificates = [
  { title: "HTML & CSS — Fundamenty", date: "15 sty 2026", issuer: "EduMaster", id: "CERT-2026-001" },
  { title: "JavaScript ES6+", date: "28 lut 2026", issuer: "EduMaster", id: "CERT-2026-002" },
  { title: "Git & GitHub", date: "10 mar 2026", issuer: "EduMaster", id: "CERT-2026-003" },
];

const leaderboard = [
  { name: "Tomasz W.", points: 4820, avatar: "TW" },
  { name: "Anna K.", points: 4510, avatar: "AK" },
  { name: "Marek L.", points: 4200, avatar: "ML" },
  { name: "Ty", points: 3980, avatar: "JK", isYou: true },
  { name: "Ewa S.", points: 3720, avatar: "ES" },
];

const navItems: { id: EduPage; label: string; icon: ReactNode }[] = [
  { id: "home", label: "Start", icon: <BookOpen className="w-3.5 h-3.5" /> },
  { id: "courses", label: "Katalog", icon: <Search className="w-3.5 h-3.5" /> },
  { id: "learning", label: "Nauka", icon: <Play className="w-3.5 h-3.5" /> },
  { id: "progress", label: "Postępy", icon: <BarChart3 className="w-3.5 h-3.5" /> },
  { id: "certificates", label: "Certyfikaty", icon: <Award className="w-3.5 h-3.5" /> },
];

export function ElearningDemo({ name }: { name: string; features: string[] }) {
  const [page, setPage] = useState<EduPage>("home");

  return (
    <PreviewShell title={name}>
      <div style={{ background: C.bg, minHeight: 540 }}>
        <div className="px-4 py-3 flex items-center justify-between" style={{ background: C.white, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" style={{ color: C.indigo }} />
            <h1 className="font-bold text-sm" style={{ color: C.navy }}>Edu<span style={{ color: C.indigo }}>Master</span></h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg" style={{ background: C.light }}>
              <Search className="w-3 h-3" style={{ color: C.gray }} />
              <span className="text-[9px]" style={{ color: C.gray }}>Szukaj kursów...</span>
            </div>
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-[8px] font-bold text-white" style={{ background: C.indigo }}>JK</div>
          </div>
        </div>

        <div className="flex gap-0 overflow-x-auto px-2 py-1.5" style={{ background: C.white, borderBottom: `2px solid ${C.light}` }}>
          {navItems.map(n => (
            <button key={n.id} onClick={() => setPage(n.id)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-semibold whitespace-nowrap transition-all"
              style={page === n.id ? { background: C.indigo, color: C.white } : { color: C.gray }}>
              {n.icon}<span>{n.label}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={page} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            {page === "home" && <HomePage onNav={setPage} />}
            {page === "courses" && <CoursesPage />}
            {page === "learning" && <LearningPage />}
            {page === "progress" && <ProgressPage />}
            {page === "certificates" && <CertificatesPage />}
          </motion.div>
        </AnimatePresence>
      </div>

      <DemoBenefits accentColor={C.indigo} bgColor={C.light} textColor={C.navy} benefits={[
        { icon: "🎓", title: "Eksperckie kursy", desc: "Tworzone przez praktyków" },
        { icon: "📱", title: "Ucz się wszędzie", desc: "Aplikacja mobilna + web" },
        { icon: "🏅", title: "Certyfikaty", desc: "Potwierdź swoje umiejętności" },
        { icon: "🤝", title: "Społeczność", desc: "Forum i grupy dyskusyjne" },
      ]} />
      <DemoFooterCTA accentColor={C.indigo} bgColor={C.navy} />
    </PreviewShell>
  );
}

function HomePage({ onNav }: { onNav: (p: EduPage) => void }) {
  return (
    <div>
      <div className="p-6 pb-8" style={{ background: `linear-gradient(160deg, ${C.indigo}, ${C.violet})` }}>
        <p className="text-[10px] tracking-widest uppercase text-white/60">Witaj z powrotem!</p>
        <h2 className="font-bold text-xl text-white mt-1">Kontynuuj naukę</h2>
        <div className="p-4 mt-3 rounded-xl" style={{ background: "rgba(255,255,255,0.12)" }}>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{courses[0].image}</span>
            <div className="flex-1">
              <h4 className="font-bold text-sm text-white">{courses[0].title}</h4>
              <p className="text-[10px] text-white/60 mt-0.5">Lekcja 87/{courses[0].lessons} · {courses[0].instructor}</p>
            </div>
          </div>
          <div className="w-full h-2 rounded-full mt-3" style={{ background: "rgba(255,255,255,0.15)" }}>
            <div className="h-full rounded-full" style={{ width: `${courses[0].progress}%`, background: `linear-gradient(to right, ${C.green}, ${C.amber})` }} />
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-[10px] text-white/50">{courses[0].progress}% ukończono</span>
            <motion.button whileHover={{ scale: 1.05 }} onClick={() => onNav("learning")}
              className="px-4 py-1.5 rounded-lg text-[10px] font-bold" style={{ background: C.white, color: C.indigo }}>Kontynuuj ▶</motion.button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-4">
          {[{ v: "87", l: "Lekcji" }, { v: "36h", l: "Czasu nauki" }, { v: "7 🔥", l: "Seria dni" }].map((s, i) => (
            <div key={i} className="p-2 rounded-xl text-center" style={{ background: "rgba(255,255,255,0.08)" }}>
              <span className="font-bold text-sm text-white block">{s.v}</span>
              <span className="text-[8px] text-white/40">{s.l}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold" style={{ color: C.navy }}>Popularne kursy</span>
          <button onClick={() => onNav("courses")} className="text-[10px] font-medium flex items-center gap-1" style={{ color: C.indigo }}>Katalog <ChevronRight className="w-3 h-3" /></button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {courses.slice(0, 3).map((c, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              className="p-3 rounded-xl hover:shadow-md transition-all cursor-pointer" style={{ background: C.white }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mx-auto" style={{ background: C.light }}>{c.image}</div>
              <h4 className="font-bold text-[10px] mt-2 text-center leading-tight" style={{ color: C.navy }}>{c.title.split("—")[0].trim()}</h4>
              <p className="text-[8px] text-center mt-0.5" style={{ color: C.gray }}>{c.instructor}</p>
              <div className="flex items-center justify-center gap-1 mt-1">
                <Star className="w-2.5 h-2.5 fill-current" style={{ color: C.amber }} />
                <span className="text-[9px] font-medium" style={{ color: C.amber }}>{c.rating}</span>
              </div>
              <span className="block text-center font-bold text-[10px] mt-1" style={{ color: C.indigo }}>{c.price} zł</span>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center justify-between mt-2">
          <span className="text-xs font-bold" style={{ color: C.navy }}>Twoje osiągnięcia</span>
          <button onClick={() => onNav("progress")} className="text-[10px] font-medium flex items-center gap-1" style={{ color: C.indigo }}>Wszystkie <ChevronRight className="w-3 h-3" /></button>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {achievements.filter(a => a.unlocked).map((a, i) => (
            <div key={i} className="p-2 rounded-xl text-center shrink-0" style={{ background: C.white, minWidth: 72 }}>
              <span className="text-xl block">{a.icon}</span>
              <span className="text-[8px] font-bold block mt-0.5" style={{ color: C.navy }}>{a.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CoursesPage() {
  const [cat, setCat] = useState<CourseCategory>("all");
  const [query, setQuery] = useState("");
  const filtered = courses.filter(c => {
    if (cat !== "all" && c.category !== cat) return false;
    if (query && !c.title.toLowerCase().includes(query.toLowerCase()) && !c.instructor.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="p-4 space-y-3">
      <span className="text-xs font-bold" style={{ color: C.navy }}>Katalog kursów</span>
      <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: C.white, border: `1px solid ${C.indigo}15` }}>
        <Search className="w-4 h-4" style={{ color: C.gray }} />
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Szukaj kursów, instruktorów..." className="flex-1 text-[11px] bg-transparent outline-none" style={{ color: C.text }} />
      </div>
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {(["all", "Programowanie", "Frontend", "Design", "Data Science", "Marketing"] as CourseCategory[]).map(c => (
          <button key={c} onClick={() => setCat(c)} className="px-3 py-1.5 rounded-lg text-[10px] font-medium whitespace-nowrap"
            style={cat === c ? { background: C.indigo, color: C.white } : { background: C.white, color: C.gray }}>{c === "all" ? "Wszystkie" : c}</button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2">
        {filtered.map((c, i) => (
          <motion.div key={c.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            className="p-3 rounded-xl hover:shadow-md transition-all cursor-pointer" style={{ background: C.white }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mx-auto" style={{ background: C.light }}>{c.image}</div>
            <h4 className="font-bold text-[10px] mt-2 text-center leading-tight" style={{ color: C.navy }}>{c.title.length > 30 ? c.title.slice(0, 30) + "..." : c.title}</h4>
            <p className="text-[8px] text-center mt-0.5" style={{ color: C.gray }}>{c.instructor}</p>
            <div className="flex items-center justify-center gap-2 mt-1 text-[8px]" style={{ color: C.gray }}>
              <span className="flex items-center gap-0.5"><Star className="w-2.5 h-2.5 fill-current" style={{ color: C.amber }} />{c.rating}</span>
              <span>{c.lessons} lekcji</span>
            </div>
            <div className="flex items-center justify-between mt-1.5">
              <span className="text-[9px]" style={{ color: C.gray }}>{c.duration}</span>
              <span className="font-bold text-[10px]" style={{ color: C.indigo }}>{c.price} zł</span>
            </div>
            {c.progress > 0 && (
              <div className="w-full h-1 rounded-full mt-1.5" style={{ background: C.light }}>
                <div className="h-full rounded-full" style={{ width: `${c.progress}%`, background: C.green }} />
              </div>
            )}
          </motion.div>
        ))}
      </div>
      {filtered.length === 0 && <p className="text-center text-[10px] py-4" style={{ color: C.gray }}>Brak kursów pasujących do kryteriów</p>}
    </div>
  );
}

function LearningPage() {
  const course = courses[0];
  const [activeLesson, setActiveLesson] = useState(1);
  const [showNotes, setShowNotes] = useState(false);

  return (
    <div className="flex" style={{ minHeight: 440 }}>
      <div className="w-[120px] shrink-0 overflow-y-auto border-r py-2" style={{ background: C.white, borderColor: C.light }}>
        <p className="px-2 text-[8px] font-bold uppercase mb-1" style={{ color: C.indigo }}>Moduły kursu</p>
        {sidebarModules.map((m, i) => (
          <div key={i} className="px-2 py-1.5 text-[9px] cursor-pointer transition-all" style={{ background: i === 7 ? C.light : "transparent", color: m.done ? C.green : C.text }}>
            <div className="flex items-center gap-1">
              {m.done ? <CheckCircle2 className="w-2.5 h-2.5 shrink-0" style={{ color: C.green }} /> : <div className="w-2.5 h-2.5 rounded-full border shrink-0" style={{ borderColor: C.gray }} />}
              <span className="truncate font-medium">{m.title}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="w-full aspect-video flex items-center justify-center" style={{ background: C.navy }}>
          <div className="text-center">
            <motion.button whileHover={{ scale: 1.1 }} className="w-14 h-14 rounded-full flex items-center justify-center mx-auto" style={{ background: C.indigo }}>
              <Play className="w-7 h-7 text-white ml-1" />
            </motion.button>
            <p className="text-xs text-white/80 mt-2 font-medium">Dekoratory i metaklasy</p>
            <p className="text-[10px] text-white/40">Moduł 8 · 24 min</p>
          </div>
        </div>

        <div className="p-3 flex items-center justify-between" style={{ background: C.white, borderBottom: `1px solid ${C.light}` }}>
          <div>
            <h4 className="font-bold text-xs" style={{ color: C.navy }}>{course.title}</h4>
            <p className="text-[9px]" style={{ color: C.gray }}>{course.instructor} · Lekcja 87/{course.lessons}</p>
          </div>
          <button onClick={() => setShowNotes(!showNotes)} className="px-2 py-1 rounded text-[9px] font-medium"
            style={{ background: showNotes ? C.indigo + "15" : C.light, color: showNotes ? C.indigo : C.gray }}>Notatki</button>
        </div>

        {showNotes && (
          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} className="p-3" style={{ background: C.light }}>
            <textarea placeholder="Twoje notatki do tej lekcji..." className="w-full h-16 p-2 rounded-lg text-[10px] resize-none" style={{ background: C.white, color: C.text, border: `1px solid ${C.indigo}15` }} />
          </motion.div>
        )}

        <div className="p-3 space-y-1">
          {currentLessons.map((l, i) => (
            <button key={i} onClick={() => setActiveLesson(i)}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[10px] transition-all"
              style={{ background: activeLesson === i ? C.indigo + "10" : "transparent", color: C.text }}>
              {l.completed ? <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: C.green }} /> :
                l.type === "video" ? <Play className="w-3.5 h-3.5 shrink-0" style={{ color: C.indigo }} /> :
                l.type === "quiz" ? <Target className="w-3.5 h-3.5 shrink-0" style={{ color: C.amber }} /> :
                <FileText className="w-3.5 h-3.5 shrink-0" style={{ color: C.violet }} />}
              <span className="flex-1 text-left font-medium">{l.title}</span>
              <span className="text-[9px]" style={{ color: C.gray }}>{l.duration}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProgressPage() {
  const weeklyData = [2.5, 3, 1.5, 4, 3.5, 5, 2];

  return (
    <div className="p-4 space-y-4">
      <span className="text-xs font-bold" style={{ color: C.navy }}>Twoje postępy</span>
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Ukończone lekcje", val: "87", color: C.green },
          { label: "Godziny nauki", val: "36h", color: C.blue },
          { label: "Seria dni", val: "7 🔥", color: C.amber },
          { label: "Quizy zdane", val: "12/15", color: C.violet },
        ].map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.06 }}
            className="p-3 rounded-xl" style={{ background: C.white }}>
            <span className="text-[9px] uppercase font-bold" style={{ color: C.gray }}>{s.label}</span>
            <span className="font-bold text-lg block mt-1" style={{ color: s.color }}>{s.val}</span>
          </motion.div>
        ))}
      </div>

      <span className="text-[10px] font-bold" style={{ color: C.navy }}>Aktywność tygodniowa (godziny)</span>
      <div className="p-3 rounded-xl" style={{ background: C.white }}>
        <div className="flex gap-1 items-end" style={{ height: 60 }}>
          {weeklyData.map((v, i) => (
            <div key={i} className="flex-1 text-center">
              <motion.div initial={{ height: 0 }} animate={{ height: `${(v / 5) * 50}px` }} transition={{ delay: i * 0.04 }}
                className="rounded-t mx-auto" style={{ width: "70%", background: `linear-gradient(to top, ${C.indigo}, ${C.violet})` }} />
              <span className="text-[7px] mt-0.5 block" style={{ color: C.gray }}>{["Pon","Wt","Śr","Czw","Pt","Sob","Nd"][i]}</span>
            </div>
          ))}
        </div>
      </div>

      <span className="text-[10px] font-bold" style={{ color: C.navy }}>Osiągnięcia</span>
      <div className="grid grid-cols-5 gap-2">
        {achievements.map((a, i) => (
          <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
            className="p-2 rounded-xl text-center" style={{ background: C.white, opacity: a.unlocked ? 1 : 0.4 }}>
            <span className="text-xl block">{a.icon}</span>
            <span className="text-[7px] font-bold block mt-0.5" style={{ color: C.navy }}>{a.title}</span>
          </motion.div>
        ))}
      </div>

      <span className="text-[10px] font-bold" style={{ color: C.navy }}>Ranking społeczności</span>
      <div className="p-3 rounded-xl" style={{ background: C.white }}>
        {leaderboard.map((l, i) => (
          <div key={i} className="flex items-center gap-2 py-1.5" style={l.isYou ? { background: C.light, borderRadius: 8, padding: "6px 8px", margin: "-2px -8px" } : {}}>
            <span className="text-[10px] font-bold w-5 text-center" style={{ color: i < 3 ? C.amber : C.gray }}>{i < 3 ? ["🥇","🥈","🥉"][i] : `${i + 1}.`}</span>
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-[7px] font-bold text-white" style={{ background: l.isYou ? C.indigo : C.gray + "60" }}>{l.avatar}</div>
            <span className="text-[10px] flex-1 font-medium" style={{ color: l.isYou ? C.indigo : C.text }}>{l.name}</span>
            <span className="text-[10px] font-bold" style={{ color: C.indigo }}>{l.points.toLocaleString()} pkt</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CertificatesPage() {
  return (
    <div className="p-4 space-y-3">
      <span className="text-xs font-bold" style={{ color: C.navy }}>Twoje certyfikaty</span>
      <div className="grid grid-cols-1 gap-3">
        {certificates.map((c, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
            className="p-4 rounded-xl" style={{ background: C.white, border: `1px solid ${C.indigo}15` }}>
            <div className="flex gap-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: `linear-gradient(135deg, ${C.indigo}15, ${C.violet}15)` }}>
                <Award className="w-6 h-6" style={{ color: C.indigo }} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold" style={{ color: C.navy }}>{c.title}</h4>
                <p className="text-[9px]" style={{ color: C.gray }}>Wystawiony: {c.date} · {c.issuer}</p>
                <p className="text-[8px] font-mono mt-0.5" style={{ color: C.indigo }}>{c.id}</p>
              </div>
              <div className="flex flex-col gap-1 shrink-0">
                <button className="px-2 py-1 rounded text-[9px] font-bold" style={{ background: C.indigo + "15", color: C.indigo }}>PDF</button>
                <button className="px-2 py-1 rounded text-[9px] font-bold" style={{ background: C.light, color: C.text }}>Udostępnij</button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <span className="text-[10px] font-bold" style={{ color: C.navy }}>W trakcie realizacji</span>
      {courses.filter(c => c.progress > 0 && c.progress < 100).map((c, i) => (
        <div key={i} className="p-3 rounded-xl flex items-center gap-3" style={{ background: C.white }}>
          <span className="text-xl shrink-0">{c.image}</span>
          <div className="flex-1">
            <h4 className="text-[10px] font-bold" style={{ color: C.navy }}>{c.title}</h4>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex-1 h-1.5 rounded-full" style={{ background: C.light }}>
                <div className="h-full rounded-full" style={{ width: `${c.progress}%`, background: `linear-gradient(to right, ${C.green}, ${C.amber})` }} />
              </div>
              <span className="text-[9px] font-bold" style={{ color: C.indigo }}>{c.progress}%</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
