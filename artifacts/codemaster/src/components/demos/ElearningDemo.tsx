import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PreviewShell, DemoNav, DemoSection } from "./PreviewShell";
import { BookOpen, Play, Award, Clock, Users, Star, CheckCircle2, Lock, ChevronRight, Home, Trophy, BarChart3 } from "lucide-react";

const C = { navy: "#1B2838", blue: "#2563EB", green: "#10B981", cream: "#FFF8F0", orange: "#F59E0B", gray: "#6B7280", light: "#F1F5F9", white: "#FFFFFF" };

const courses = [
  { name: "React od podstaw", lessons: 24, duration: "12h", progress: 75, level: "Początkujący", icon: "⚛️", enrolled: 1240 },
  { name: "Node.js & Express", lessons: 18, duration: "9h", progress: 30, level: "Średni", icon: "🟢", enrolled: 890 },
  { name: "TypeScript Pro", lessons: 20, duration: "10h", progress: 0, level: "Zaawansowany", icon: "🔷", enrolled: 650 },
  { name: "UI/UX Design", lessons: 16, duration: "8h", progress: 100, level: "Średni", icon: "🎨", enrolled: 1100 },
];

const lessons = [
  { title: "Wprowadzenie do JSX", dur: "12 min", completed: true },
  { title: "Komponenty i Props", dur: "18 min", completed: true },
  { title: "State i useState", dur: "22 min", completed: true },
  { title: "Zdarzenia i formularze", dur: "15 min", completed: false, current: true },
  { title: "useEffect i cykl życia", dur: "20 min", completed: false },
  { title: "Context API", dur: "25 min", completed: false, locked: true },
  { title: "React Router", dur: "18 min", completed: false, locked: true },
  { title: "Projekt końcowy", dur: "45 min", completed: false, locked: true },
];

const achievements = [
  { name: "Pierwszy kurs", icon: "🎓", unlocked: true },
  { name: "7-dniowy streak", icon: "🔥", unlocked: true },
  { name: "Mistrz React", icon: "⚛️", unlocked: false },
  { name: "100 lekcji", icon: "📚", unlocked: false },
  { name: "Mentor", icon: "🧑‍🏫", unlocked: false },
  { name: "Certyfikat", icon: "🏆", unlocked: false },
];

export function ElearningDemo({ name }: { name: string; features: string[]; industry: string }) {
  const [page, setPage] = useState("home");
  const tabs = [
    { id: "home", label: "Dashboard", icon: <Home className="w-3 h-3" /> },
    { id: "courses", label: "Kursy", icon: <BookOpen className="w-3 h-3" /> },
    { id: "lesson", label: "Lekcja", icon: <Play className="w-3 h-3" /> },
    { id: "path", label: "Ścieżka", icon: <Trophy className="w-3 h-3" /> },
    { id: "achievements", label: "Odznaki", icon: <Award className="w-3 h-3" /> },
  ];

  return (
    <PreviewShell title={name}>
      <DemoNav tabs={tabs} activeTab={page} onTabChange={setPage} logo="EduPro" />
      <AnimatePresence mode="wait">
        <motion.div key={page} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
          {page === "home" && <HomePage onNav={setPage} />}
          {page === "courses" && <CoursesPage onNav={setPage} />}
          {page === "lesson" && <LessonPage />}
          {page === "path" && <PathPage />}
          {page === "achievements" && <AchievementsPage />}
        </motion.div>
      </AnimatePresence>
    </PreviewShell>
  );
}

function HomePage({ onNav }: { onNav: (p: string) => void }) {
  return (
    <div>
      <div className="p-10 text-center" style={{ background: `linear-gradient(160deg, ${C.navy}, ${C.blue})` }}>
        <p className="text-[10px] tracking-[0.4em] uppercase" style={{ color: C.orange }}>Platforma Edukacyjna</p>
        <h1 className="font-display font-bold text-4xl mt-2 text-white">Edu<span style={{ color: C.orange }}>Pro</span></h1>
        <p className="text-xs mt-2 max-w-[260px] mx-auto leading-relaxed text-white/80">Kursy programowania od podstaw do zaawansowanych. React, Node.js, TypeScript — ucz się w swoim tempie.</p>
        <div className="flex gap-3 justify-center mt-6">
          <motion.button whileHover={{ scale: 1.03 }} onClick={() => onNav("courses")}
            className="px-7 py-3.5 rounded-lg font-bold text-sm shadow-lg" style={{ background: C.orange, color: C.navy }}>Przeglądaj kursy</motion.button>
          <button onClick={() => onNav("lesson")} className="px-7 py-3.5 rounded-lg font-semibold text-sm border border-white/30 text-white">Kontynuuj</button>
        </div>
      </div>
      <DemoSection>
        <div className="grid grid-cols-4 gap-2">
          {[
            { icon: "📚", label: "80+ kursów", desc: "IT & Design" },
            { icon: "🎥", label: "Video HD", desc: "Na żądanie" },
            { icon: "🏆", label: "Certyfikaty", desc: "Uznawane" },
            { icon: "👨‍🏫", label: "Mentoring", desc: "1:1 pomoc" },
          ].map((f, i) => (
            <div key={i} className="p-2.5 rounded-xl text-center" style={{ background: C.light }}>
              <span className="text-lg block">{f.icon}</span>
              <span className="text-[8px] font-bold block mt-0.5" style={{ color: C.navy }}>{f.label}</span>
              <span className="text-[7px]" style={{ color: C.gray }}>{f.desc}</span>
            </div>
          ))}
        </div>
        <h4 className="font-bold text-sm mt-4" style={{ color: C.navy }}>Popularne kursy</h4>
        {courses.slice(0, 3).map((c, i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-xl border cursor-pointer" style={{ borderColor: C.light, background: C.white }} onClick={() => onNav("courses")}>
            <span className="text-xl">{c.icon}</span>
            <div className="flex-1">
              <span className="text-xs font-semibold" style={{ color: C.navy }}>{c.name}</span>
              <p className="text-[10px]" style={{ color: C.gray }}>{c.lessons} lekcji • {c.duration}</p>
            </div>
            <span className="px-2 py-0.5 rounded text-[9px] font-medium" style={{ background: C.blue + "15", color: C.blue }}>{c.level}</span>
          </div>
        ))}
      </DemoSection>
      <DemoBenefits accentColor={C.blue} bgColor={C.light} textColor={C.navy} benefits={[
        { icon: "📚", title: "Platforma kursowa", desc: "Lekcje, quizy i certyfikaty" },
        { icon: "📊", title: "Śledzenie postępów", desc: "Progress i odznaki motywacyjne" },
        { icon: "🎥", title: "Video content", desc: "Player z modułami i notatkami" },
        { icon: "👨‍🏫", title: "Panel admina", desc: "Zarządzanie treścią i uczniami" },
      ]} />
      <DemoFooterCTA accentColor={C.blue} bgColor={C.navy} />
    </div>
  );
}

function CoursesPage({ onNav }: { onNav: (p: string) => void }) {
  return (
    <DemoSection>
      <h3 className="font-bold text-sm" style={{ color: C.navy }}>Twoje kursy</h3>
      <div className="space-y-3">
        {courses.map((c, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="p-4 rounded-xl border" style={{ borderColor: C.light, background: C.white }}>
            <div className="flex gap-3">
              <span className="text-3xl">{c.icon}</span>
              <div className="flex-1">
                <h4 className="font-bold text-sm" style={{ color: C.navy }}>{c.name}</h4>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-[10px]" style={{ color: C.gray }}>{c.lessons} lekcji</span>
                  <span className="text-[10px]" style={{ color: C.gray }}>{c.duration}</span>
                  <span className="text-[10px] flex items-center gap-0.5" style={{ color: C.gray }}><Users className="w-3 h-3" />{c.enrolled}</span>
                </div>
                {c.progress > 0 && (
                  <div className="mt-2">
                    <div className="w-full h-1.5 rounded-full" style={{ background: C.light }}>
                      <div className="h-full rounded-full" style={{ width: `${c.progress}%`, background: c.progress === 100 ? C.green : C.blue }} />
                    </div>
                    <span className="text-[10px]" style={{ color: c.progress === 100 ? C.green : C.blue }}>{c.progress}%</span>
                  </div>
                )}
              </div>
            </div>
            <motion.button whileHover={{ scale: 1.02 }} onClick={() => onNav("lesson")}
              className="w-full mt-3 py-2 rounded-lg text-xs font-bold" style={c.progress > 0 && c.progress < 100 ? { background: C.orange, color: C.navy } : c.progress === 100 ? { background: C.green + "15", color: C.green } : { background: C.blue, color: C.white }}>
              {c.progress === 100 ? "✓ Ukończony" : c.progress > 0 ? "Kontynuuj" : "Rozpocznij"}
            </motion.button>
          </motion.div>
        ))}
      </div>
    </DemoSection>
  );
}

function LessonPage() {
  return (
    <DemoSection>
      <div className="w-full h-40 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${C.navy}, ${C.blue})` }}>
        <motion.div whileHover={{ scale: 1.1 }} className="w-16 h-16 rounded-full flex items-center justify-center cursor-pointer" style={{ background: C.white + "20" }}>
          <Play className="w-8 h-8 text-white ml-1" />
        </motion.div>
      </div>
      <h3 className="font-bold text-sm mt-3" style={{ color: C.navy }}>Zdarzenia i formularze</h3>
      <p className="text-xs" style={{ color: C.gray }}>Lekcja 4/24 • 15 min • React od podstaw</p>
      <div className="space-y-1 mt-3">
        {lessons.map((l, i) => (
          <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg"
            style={{ background: l.current ? C.blue + "08" : "transparent" }}>
            {l.completed ? <CheckCircle2 className="w-4 h-4" style={{ color: C.green }} /> :
             l.locked ? <Lock className="w-4 h-4" style={{ color: C.gray + "40" }} /> :
             l.current ? <Play className="w-4 h-4" style={{ color: C.blue }} /> :
             <div className="w-4 h-4 rounded-full border" style={{ borderColor: C.gray + "40" }} />}
            <span className={`text-xs flex-1 ${l.locked ? "opacity-40" : ""}`} style={{ color: l.current ? C.blue : C.navy }}>{l.title}</span>
            <span className="text-[10px]" style={{ color: C.gray }}>{l.dur}</span>
          </div>
        ))}
      </div>
    </DemoSection>
  );
}

function PathPage() {
  const path: { name: string; done: boolean; current?: boolean; progress?: number; locked?: boolean }[] = [
    { name: "HTML & CSS Basics", done: true },
    { name: "JavaScript Fundamentals", done: true },
    { name: "React od podstaw", done: false, current: true, progress: 75 },
    { name: "Node.js & Express", done: false, progress: 30 },
    { name: "TypeScript Pro", done: false, locked: true },
    { name: "Projekt Full-Stack", done: false, locked: true },
  ];
  return (
    <DemoSection>
      <h3 className="font-bold text-sm" style={{ color: C.navy }}>Ścieżka: Full-Stack Developer</h3>
      <div className="space-y-0">
        {path.map((p, i) => (
          <div key={i} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full flex items-center justify-center border-2"
                style={p.done ? { background: C.green, borderColor: C.green } : p.current ? { borderColor: C.blue, background: C.blue + "15" } : { borderColor: C.gray + "30" }}>
                {p.done ? <CheckCircle2 className="w-4 h-4 text-white" /> :
                 p.locked ? <Lock className="w-3 h-3" style={{ color: C.gray + "40" }} /> :
                 <span className="text-xs font-bold" style={{ color: p.current ? C.blue : C.gray }}>{i + 1}</span>}
              </div>
              {i < path.length - 1 && <div className="w-0.5 h-6" style={{ background: p.done ? C.green : C.gray + "20" }} />}
            </div>
            <div className="pb-4 flex-1">
              <span className={`text-sm font-medium ${p.locked ? "opacity-40" : ""}`} style={{ color: p.current ? C.blue : C.navy }}>{p.name}</span>
              {p.progress !== undefined && !p.done && (
                <div className="w-full h-1 rounded-full mt-1" style={{ background: C.light }}>
                  <div className="h-full rounded-full" style={{ width: `${p.progress}%`, background: C.blue }} />
                </div>
              )}
              {p.done && <span className="text-[10px]" style={{ color: C.green }}>Ukończone ✓</span>}
            </div>
          </div>
        ))}
      </div>
    </DemoSection>
  );
}

function AchievementsPage() {
  return (
    <DemoSection>
      <h3 className="font-bold text-sm" style={{ color: C.navy }}>Odznaki i certyfikaty</h3>
      <div className="grid grid-cols-3 gap-3">
        {achievements.map((a, i) => (
          <div key={i} className={`p-4 rounded-xl text-center ${a.unlocked ? "" : "opacity-30"}`} style={{ background: C.light }}>
            <span className="text-3xl block mb-1">{a.icon}</span>
            <span className="text-[10px] font-bold" style={{ color: C.navy }}>{a.name}</span>
            {a.unlocked && <CheckCircle2 className="w-3 h-3 mx-auto mt-1" style={{ color: C.green }} />}
          </div>
        ))}
      </div>
    </DemoSection>
  );
}
