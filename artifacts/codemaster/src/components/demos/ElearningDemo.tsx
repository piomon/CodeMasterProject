import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PreviewShell, DemoNav, DemoSection, DemoBenefits, DemoFooterCTA } from "./PreviewShell";
import { BookOpen, Play, Award, Users, Home, Clock, Star, CheckCircle2, Lock, BarChart3, ChevronRight, Zap, Target, TrendingUp, FileText } from "lucide-react";

const C = { navy: "#1E293B", blue: "#2563EB", green: "#10B981", gray: "#64748B", white: "#F8FAFC", light: "#F1F5F9", violet: "#7C3AED", amber: "#F59E0B", red: "#EF4444", teal: "#0D9488", indigo: "#4F46E5", sky: "#0EA5E9" };

const courses = [
  { id: 1, title: "Python od podstaw do zaawansowanego", instructor: "dr Michał Kowalski", level: "Początkujący → Zaawansowany", duration: "42h", lessons: 128, students: 2840, rating: 4.9, price: 299, image: "🐍", progress: 68, category: "Programowanie" },
  { id: 2, title: "React & TypeScript — Fullstack 2026", instructor: "Anna Wiśniewska", level: "Średniozaawansowany", duration: "36h", lessons: 96, students: 1920, rating: 4.8, price: 349, image: "⚛️", progress: 42, category: "Frontend" },
  { id: 3, title: "UI/UX Design — od wireframe do Figma", instructor: "Katarzyna Dąbrowska", level: "Początkujący", duration: "28h", lessons: 72, students: 3180, rating: 4.7, price: 249, image: "🎨", progress: 0, category: "Design" },
  { id: 4, title: "Data Science i Machine Learning", instructor: "prof. Jan Nowak", level: "Zaawansowany", duration: "56h", lessons: 164, students: 1240, rating: 4.9, price: 449, image: "📊", progress: 15, category: "Data Science" },
  { id: 5, title: "Marketing Cyfrowy — strategia i narzędzia", instructor: "Ewa Lewandowska", level: "Początkujący", duration: "18h", lessons: 48, students: 4520, rating: 4.6, price: 199, image: "📈", progress: 0, category: "Marketing" },
];

const currentLessons = [
  { title: "Dekoratory i metaklasy", module: "Moduł 8: Zaawansowany Python", duration: "24 min", type: "video", completed: false },
  { title: "Context managers i generators", module: "Moduł 8: Zaawansowany Python", duration: "18 min", type: "video", completed: false },
  { title: "Quiz: Wzorce zaawansowane", module: "Moduł 8: Zaawansowany Python", duration: "10 min", type: "quiz", completed: false },
  { title: "Projekt: System zarządzania danymi", module: "Moduł 8: Zaawansowany Python", duration: "45 min", type: "project", completed: false },
];

const achievements = [
  { icon: "🏆", title: "Pierwsze kroki", desc: "Ukończ pierwszą lekcję", unlocked: true },
  { icon: "🔥", title: "Seria 7 dni", desc: "Ucz się 7 dni z rzędu", unlocked: true },
  { icon: "⚡", title: "Speed learner", desc: "Ukończ 10 lekcji w jeden dzień", unlocked: true },
  { icon: "🎯", title: "Quiz master", desc: "100% w 5 quizach z rzędu", unlocked: false },
  { icon: "💎", title: "Absolwent", desc: "Ukończ cały kurs", unlocked: false },
];

export function ElearningDemo({ name }: { name: string; features: string[] }) {
  const [page, setPage] = useState("home");
  const tabs = [
    { id: "home", label: "Start", icon: <Home className="w-3 h-3" /> },
    { id: "courses", label: "Kursy", icon: <BookOpen className="w-3 h-3" /> },
    { id: "learning", label: "Nauka", icon: <Play className="w-3 h-3" /> },
    { id: "progress", label: "Postępy", icon: <BarChart3 className="w-3 h-3" /> },
    { id: "certificates", label: "Certyfikaty", icon: <Award className="w-3 h-3" /> },
  ];

  return (
    <PreviewShell title={name}>
      <DemoNav tabs={tabs} activeTab={page} onTabChange={setPage} logo="EduPro" />
      <AnimatePresence mode="wait">
        <motion.div key={page} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
          {page === "home" && <HomePage onNav={setPage} />}
          {page === "courses" && <CoursesPage />}
          {page === "learning" && <LearningPage />}
          {page === "progress" && <ProgressPage />}
          {page === "certificates" && <CertificatesPage />}
        </motion.div>
      </AnimatePresence>
    </PreviewShell>
  );
}

function HomePage({ onNav }: { onNav: (p: string) => void }) {
  const activeCourse = courses[0];
  return (
    <div>
      <div className="p-8 pb-10" style={{ background: `linear-gradient(160deg, ${C.indigo}, ${C.violet})` }}>
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/60">Platforma edukacyjna</p>
        <h1 className="font-display font-bold text-3xl mt-1 text-white">Edu<span style={{ color: C.amber }}>Pro</span></h1>
        <p className="text-xs mt-2 text-white/70 max-w-[280px] leading-relaxed">Kursy online od najlepszych ekspertów. Ucz się w swoim tempie, zdobywaj certyfikaty, rozwijaj karierę.</p>
        <div className="flex gap-3 mt-5">
          <motion.button whileHover={{ scale: 1.03 }} onClick={() => onNav("courses")}
            className="px-6 py-3 rounded-lg font-bold text-sm shadow-lg text-white" style={{ background: C.amber }}>Przeglądaj kursy</motion.button>
          <button onClick={() => onNav("learning")} className="px-6 py-3 rounded-lg font-semibold text-sm border border-white/20 text-white">Kontynuuj naukę</button>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-6">
          {[{ v: "200+", l: "Kursów" }, { v: "50K+", l: "Studentów" }, { v: "4.8", l: "Avg. ocena" }].map((s, i) => (
            <div key={i} className="p-2.5 rounded-lg text-center" style={{ background: "rgba(255,255,255,0.1)" }}>
              <span className="font-bold text-sm text-white block">{s.v}</span>
              <span className="text-[8px] text-white/50">{s.l}</span>
            </div>
          ))}
        </div>
      </div>

      <DemoSection>
        <div className="p-4 rounded-xl" style={{ background: `linear-gradient(135deg, ${C.indigo}08, ${C.violet}08)`, border: `1px solid ${C.indigo}15` }}>
          <div className="flex items-center gap-2 mb-2">
            <Play className="w-4 h-4" style={{ color: C.indigo }} />
            <span className="text-xs font-bold" style={{ color: C.navy }}>Kontynuuj naukę</span>
          </div>
          <div className="flex gap-3 items-center">
            <span className="text-3xl">{activeCourse.image}</span>
            <div className="flex-1">
              <h4 className="text-xs font-semibold" style={{ color: C.navy }}>{activeCourse.title}</h4>
              <p className="text-[10px]" style={{ color: C.gray }}>{activeCourse.instructor}</p>
              <div className="flex items-center gap-2 mt-1.5">
                <div className="flex-1 h-2 rounded-full" style={{ background: C.light }}>
                  <div className="h-full rounded-full" style={{ width: `${activeCourse.progress}%`, background: `linear-gradient(to right, ${C.indigo}, ${C.violet})` }} />
                </div>
                <span className="text-[10px] font-bold" style={{ color: C.indigo }}>{activeCourse.progress}%</span>
              </div>
            </div>
          </div>
          <motion.button whileHover={{ scale: 1.02 }} onClick={() => onNav("learning")}
            className="w-full mt-3 py-2.5 rounded-lg text-xs font-bold text-white" style={{ background: `linear-gradient(135deg, ${C.indigo}, ${C.violet})` }}>Następna lekcja →</motion.button>
        </div>

        <div className="flex items-center justify-between mt-2">
          <h3 className="font-bold text-sm" style={{ color: C.navy }}>Popularne kursy</h3>
          <button onClick={() => onNav("courses")} className="text-[10px] font-medium flex items-center gap-1" style={{ color: C.indigo }}>Wszystkie <ChevronRight className="w-3 h-3" /></button>
        </div>
        {courses.slice(1, 4).map((c, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
            className="flex gap-3 p-3 rounded-xl border hover:shadow-sm transition-all cursor-pointer" style={{ borderColor: C.light, background: C.white }}>
            <span className="text-2xl shrink-0">{c.image}</span>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-semibold truncate" style={{ color: C.navy }}>{c.title}</h4>
              <p className="text-[10px]" style={{ color: C.gray }}>{c.instructor} · {c.duration} · {c.lessons} lekcji</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="flex items-center gap-0.5 text-[10px] font-medium" style={{ color: C.amber }}>
                  <Star className="w-3 h-3 fill-current" />{c.rating}
                </span>
                <span className="text-[10px]" style={{ color: C.gray }}>({c.students.toLocaleString()} studentów)</span>
                <span className="ml-auto font-bold text-xs" style={{ color: C.indigo }}>{c.price} zł</span>
              </div>
            </div>
          </motion.div>
        ))}

        <div className="grid grid-cols-4 gap-2 mt-2">
          {[
            { icon: "💻", label: "Programowanie", count: "48" },
            { icon: "🎨", label: "Design", count: "32" },
            { icon: "📊", label: "Data Science", count: "24" },
            { icon: "📈", label: "Marketing", count: "18" },
          ].map((cat, i) => (
            <div key={i} className="p-2.5 rounded-xl text-center cursor-pointer hover:shadow-sm transition-all" style={{ background: C.light }}>
              <span className="text-lg block">{cat.icon}</span>
              <span className="text-[8px] font-bold block mt-0.5" style={{ color: C.navy }}>{cat.label}</span>
              <span className="text-[7px]" style={{ color: C.gray }}>{cat.count} kursów</span>
            </div>
          ))}
        </div>
      </DemoSection>

      <DemoBenefits accentColor={C.indigo} bgColor={C.light} textColor={C.navy} benefits={[
        { icon: "🎥", title: "Kursy video HD", desc: "Profesjonalnie nagrane lekcje" },
        { icon: "📱", title: "Ucz się wszędzie", desc: "Desktop, tablet, mobile" },
        { icon: "🏅", title: "Certyfikaty", desc: "Potwierdzenie umiejętności" },
        { icon: "💬", title: "Społeczność", desc: "Forum, Q&A, networking" },
      ]} />
      <DemoFooterCTA accentColor={C.indigo} bgColor={C.navy} />
    </div>
  );
}

function CoursesPage() {
  const [category, setCategory] = useState("all");
  const cats = ["all", "Programowanie", "Frontend", "Design", "Data Science", "Marketing"];
  const filtered = category === "all" ? courses : courses.filter(c => c.category === category);

  return (
    <DemoSection>
      <h3 className="font-bold text-sm" style={{ color: C.navy }}>Katalog kursów</h3>
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {cats.map(c => (
          <button key={c} onClick={() => setCategory(c)} className="px-3 py-1.5 rounded-lg text-[10px] font-medium whitespace-nowrap transition-all"
            style={category === c ? { background: C.indigo, color: "white" } : { background: C.light, color: C.gray }}>{c === "all" ? "Wszystkie" : c}</button>
        ))}
      </div>
      <div className="space-y-3">
        {filtered.map((c, i) => (
          <motion.div key={c.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
            className="p-4 rounded-xl border hover:shadow-md transition-all cursor-pointer" style={{ borderColor: C.light, background: C.white }}>
            <div className="flex gap-3">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0" style={{ background: C.indigo + "10" }}>{c.image}</div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold truncate" style={{ color: C.navy }}>{c.title}</h4>
                <p className="text-[10px]" style={{ color: C.gray }}>{c.instructor}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-[10px]" style={{ color: C.gray }}>{c.duration}</span>
                  <span className="text-[10px]" style={{ color: C.gray }}>{c.lessons} lekcji</span>
                  <span className="flex items-center gap-0.5 text-[10px] font-medium" style={{ color: C.amber }}>
                    <Star className="w-3 h-3 fill-current" />{c.rating}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[9px] font-medium" style={{ background: C.light, color: C.navy }}>{c.level}</span>
                <span className="text-[10px]" style={{ color: C.gray }}>{c.students.toLocaleString()} studentów</span>
              </div>
              <div className="flex items-center gap-2">
                {c.progress > 0 && <span className="text-[10px] font-bold" style={{ color: C.green }}>{c.progress}% ukończono</span>}
                <span className="font-bold text-sm" style={{ color: C.indigo }}>{c.price} zł</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </DemoSection>
  );
}

function LearningPage() {
  const [activeLesson, setActiveLesson] = useState(0);
  return (
    <DemoSection>
      <div className="p-4 rounded-xl" style={{ background: C.navy }}>
        <div className="aspect-video rounded-lg flex items-center justify-center relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${C.indigo}, ${C.violet})` }}>
          <motion.div whileHover={{ scale: 1.1 }} className="w-14 h-14 rounded-full flex items-center justify-center cursor-pointer" style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)" }}>
            <Play className="w-6 h-6 text-white ml-1" />
          </motion.div>
          <div className="absolute bottom-3 left-3 right-3">
            <div className="w-full h-1 rounded-full" style={{ background: "rgba(255,255,255,0.2)" }}>
              <div className="h-full rounded-full" style={{ width: "35%", background: C.amber }} />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[9px] text-white/60">08:24</span>
              <span className="text-[9px] text-white/60">24:00</span>
            </div>
          </div>
        </div>
        <h3 className="font-bold text-sm text-white mt-3">{currentLessons[activeLesson].title}</h3>
        <p className="text-[10px] text-white/50 mt-0.5">{currentLessons[activeLesson].module}</p>
      </div>

      <div className="flex items-center justify-between">
        <h4 className="font-bold text-sm" style={{ color: C.navy }}>Lekcje w module</h4>
        <span className="text-[10px]" style={{ color: C.gray }}>4 lekcje · 97 min</span>
      </div>
      {currentLessons.map((l, i) => (
        <motion.div key={i} onClick={() => setActiveLesson(i)}
          className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${i === activeLesson ? "shadow-sm" : "hover:shadow-sm"}`}
          style={{ borderColor: i === activeLesson ? C.indigo + "40" : C.light, background: i === activeLesson ? C.indigo + "05" : C.white }}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
            style={{ background: l.completed ? C.green : i === activeLesson ? C.indigo : C.light }}>
            {l.completed ? <CheckCircle2 className="w-4 h-4 text-white" /> :
              l.type === "video" ? <Play className="w-3.5 h-3.5" style={{ color: i === activeLesson ? "white" : C.gray }} /> :
              l.type === "quiz" ? <Target className="w-3.5 h-3.5" style={{ color: i === activeLesson ? "white" : C.gray }} /> :
              <FileText className="w-3.5 h-3.5" style={{ color: i === activeLesson ? "white" : C.gray }} />}
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-xs font-medium truncate block" style={{ color: C.navy }}>{l.title}</span>
            <span className="text-[10px]" style={{ color: C.gray }}>{l.type === "video" ? "Video" : l.type === "quiz" ? "Quiz" : "Projekt"} · {l.duration}</span>
          </div>
        </motion.div>
      ))}

      <div className="p-4 rounded-xl" style={{ background: C.light }}>
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="w-4 h-4" style={{ color: C.indigo }} />
          <span className="text-xs font-bold" style={{ color: C.navy }}>Materiały do pobrania</span>
        </div>
        <div className="flex gap-2">
          {["Notatki PDF", "Kod źródłowy", "Ćwiczenia"].map((m, i) => (
            <button key={i} className="px-3 py-1.5 rounded-lg text-[10px] font-medium" style={{ background: C.white, color: C.navy, border: `1px solid ${C.light}` }}>{m}</button>
          ))}
        </div>
      </div>
    </DemoSection>
  );
}

function ProgressPage() {
  return (
    <DemoSection>
      <h3 className="font-bold text-sm" style={{ color: C.navy }}>Twoje postępy</h3>
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Ukończone lekcje", val: "87", total: "/128", color: C.green },
          { label: "Czas nauki", val: "42h", total: "18min", color: C.indigo },
          { label: "Seria dni", val: "12", total: "dni", color: C.amber },
          { label: "Quizy zdane", val: "14", total: "/18", color: C.violet },
        ].map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.08 }}
            className="p-3 rounded-xl border" style={{ borderColor: C.light, background: C.white }}>
            <span className="text-[9px] uppercase font-bold" style={{ color: C.gray }}>{s.label}</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="font-bold text-xl" style={{ color: s.color }}>{s.val}</span>
              <span className="text-[10px]" style={{ color: C.gray }}>{s.total}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <h4 className="font-bold text-sm mt-2" style={{ color: C.navy }}>Aktywność tygodniowa</h4>
      <div className="p-4 rounded-xl" style={{ background: C.light }}>
        <div className="flex gap-2 items-end justify-center" style={{ height: 80 }}>
          {[{ d: "Pon", h: 2.5 }, { d: "Wt", h: 1.8 }, { d: "Śr", h: 3.2 }, { d: "Czw", h: 0.5 }, { d: "Pt", h: 2.1 }, { d: "Sob", h: 4.0 }, { d: "Nd", h: 1.0 }].map((day, i) => (
            <div key={i} className="text-center flex-1">
              <motion.div initial={{ height: 0 }} animate={{ height: `${day.h * 18}px` }} transition={{ delay: i * 0.05 }}
                className="rounded-t-lg mx-auto" style={{ width: "100%", background: i === 5 ? `linear-gradient(to top, ${C.indigo}, ${C.violet})` : C.indigo + "40" }} />
              <span className="text-[8px] mt-1 block" style={{ color: C.gray }}>{day.d}</span>
            </div>
          ))}
        </div>
        <p className="text-center text-[10px] mt-2" style={{ color: C.gray }}>Łącznie: 15.1h w tym tygodniu</p>
      </div>

      <h4 className="font-bold text-sm mt-2" style={{ color: C.navy }}>Osiągnięcia</h4>
      <div className="grid grid-cols-5 gap-2">
        {achievements.map((a, i) => (
          <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: a.unlocked ? 1 : 0.4, scale: 1 }} transition={{ delay: i * 0.05 }}
            className="p-2 rounded-xl text-center" style={{ background: a.unlocked ? C.amber + "15" : C.light }}>
            <span className="text-lg block">{a.icon}</span>
            <span className="text-[7px] font-bold block mt-0.5" style={{ color: a.unlocked ? C.navy : C.gray }}>{a.title}</span>
          </motion.div>
        ))}
      </div>
    </DemoSection>
  );
}

function CertificatesPage() {
  return (
    <DemoSection>
      <h3 className="font-bold text-sm" style={{ color: C.navy }}>Certyfikaty</h3>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="p-5 rounded-xl text-center" style={{ background: `linear-gradient(135deg, ${C.indigo}10, ${C.violet}10)`, border: `2px solid ${C.indigo}30` }}>
        <Award className="w-10 h-10 mx-auto mb-2" style={{ color: C.amber }} />
        <h4 className="font-bold text-sm" style={{ color: C.navy }}>Python od podstaw do zaawansowanego</h4>
        <p className="text-[10px] mt-1" style={{ color: C.gray }}>Ukończono 68% — ukończ kurs, aby otrzymać certyfikat</p>
        <div className="w-full h-2 rounded-full mt-3" style={{ background: C.light }}>
          <div className="h-full rounded-full" style={{ width: "68%", background: `linear-gradient(to right, ${C.indigo}, ${C.violet})` }} />
        </div>
        <p className="text-[10px] mt-2 font-medium" style={{ color: C.indigo }}>Jeszcze 41 lekcji do ukończenia</p>
      </motion.div>
      <div className="p-4 rounded-xl" style={{ background: C.light }}>
        <p className="text-[10px] font-bold uppercase mb-2" style={{ color: C.gray }}>Dlaczego certyfikat EduPro?</p>
        {["Weryfikowalny online — unikalny kod i link do sprawdzenia", "Uznawany przez pracodawców — partnerstwa z firmami IT", "Dodaj do LinkedIn — automatyczna integracja z profilem"].map((p, i) => (
          <div key={i} className="flex items-start gap-2 mb-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: C.green }} />
            <span className="text-[10px]" style={{ color: C.navy }}>{p}</span>
          </div>
        ))}
      </div>
      <div className="p-4 rounded-xl text-center" style={{ background: C.white, border: `1px solid ${C.light}` }}>
        <Lock className="w-6 h-6 mx-auto mb-1" style={{ color: C.gray }} />
        <p className="text-xs font-bold" style={{ color: C.navy }}>Brak ukończonych kursów</p>
        <p className="text-[10px]" style={{ color: C.gray }}>Ukończ pierwszy kurs, aby zdobyć certyfikat</p>
      </div>
    </DemoSection>
  );
}
