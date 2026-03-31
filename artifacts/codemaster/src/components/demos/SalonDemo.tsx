import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PreviewShell, DemoFooterCTA, DemoBenefits } from "./PreviewShell";
import { Calendar, Clock, Star, Heart, Sparkles, User, ChevronRight, CheckCircle2, Gift, ArrowLeft, Crown, Search, Bell } from "lucide-react";

const C = { cream: "#FFF8F0", blush: "#F5E1DA", rose: "#C77D8A", gold: "#B8860B", taupe: "#8B7D6B", dark: "#3D2B1F", light: "#FBF7F4", mauve: "#E8D5D0" };

const categories = [
  { id: "hair", name: "Fryzjerstwo", icon: "✂️", count: 3 },
  { id: "face", name: "Twarz", icon: "🧖‍♀️", count: 2 },
  { id: "nails", name: "Paznokcie", icon: "💅", count: 2 },
  { id: "body", name: "Ciało", icon: "✨", count: 1 },
  { id: "lashes", name: "Brwi & Rzęsy", icon: "👁️", count: 2 },
];

const services = [
  { name: "Strzyżenie & Modelowanie", cat: "hair", time: "45 min", price: 120, popular: true },
  { name: "Koloryzacja Premium", cat: "hair", time: "120 min", price: 350, popular: true },
  { name: "Ombre / Sombre", cat: "hair", time: "180 min", price: 450, popular: false },
  { name: "Manicure Hybrydowy", cat: "nails", time: "60 min", price: 90, popular: true },
  { name: "Pedicure SPA", cat: "nails", time: "75 min", price: 130, popular: false },
  { name: "Lifting rzęs", cat: "lashes", time: "60 min", price: 150, popular: true },
  { name: "Henna brwi", cat: "lashes", time: "30 min", price: 60, popular: false },
  { name: "Masaż relaksacyjny", cat: "body", time: "60 min", price: 180, popular: true },
  { name: "Peeling & Maska", cat: "face", time: "75 min", price: 200, popular: false },
  { name: "Mezoterapia bezigłowa", cat: "face", time: "45 min", price: 250, popular: true },
];

const specialists = [
  { name: "Anna Kowalska", role: "Hair Stylist Senior", rating: 4.9, reviews: 234, avatar: "AK" },
  { name: "Marta Nowak", role: "Kosmetolog", rating: 4.8, reviews: 189, avatar: "MN" },
  { name: "Ewa Wiśniewska", role: "Stylistka paznokci", rating: 5.0, reviews: 156, avatar: "EW" },
  { name: "Katarzyna Maj", role: "Lashmaker", rating: 4.9, reviews: 112, avatar: "KM" },
];

const packages = [
  { name: "Relaks Premium", items: ["Masaż 60 min", "Peeling ciała", "Maska na twarz"], price: 350, save: 80 },
  { name: "Bridal Glow", items: ["Manicure", "Makijaż ślubny", "Upięcie"], price: 550, save: 120 },
  { name: "Beauty Day", items: ["Strzyżenie", "Manicure", "Peeling twarzy"], price: 280, save: 60 },
];

const days = ["Pon 22", "Wt 23", "Śr 24", "Czw 25", "Pt 26", "Sob 27"];
const slots = ["09:00", "09:30", "10:00", "10:30", "11:00", "13:00", "14:00", "14:30", "15:00", "16:00"];

export function SalonDemo({ name }: { name: string; features: string[] }) {
  const [page, setPage] = useState("home");
  const [bookingData, setBookingData] = useState({ service: -1, specialist: -1, day: 0, slot: -1 });

  return (
    <PreviewShell title={name}>
      <div style={{ background: C.light, minHeight: 500 }}>
        <div className="flex items-center justify-between px-4 py-3" style={{ background: C.cream }}>
          {page !== "home" ? (
            <button onClick={() => setPage("home")} className="flex items-center gap-1 text-xs font-medium" style={{ color: C.taupe }}>
              <ArrowLeft className="w-4 h-4" /> Wróć
            </button>
          ) : (
            <div>
              <h2 className="font-display font-bold text-base" style={{ color: C.dark }}>Belle Beauty</h2>
              <p className="text-[9px] tracking-[0.2em] uppercase" style={{ color: C.rose }}>Studio Urody</p>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4" style={{ color: C.taupe }} />
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ background: `linear-gradient(135deg, ${C.rose}, ${C.mauve})`, color: "white" }}>AK</div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={page} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            {page === "home" && <HomePage onNav={setPage} />}
            {page === "services" && <ServicesPage onNav={setPage} onSelect={(i: number) => { setBookingData({ ...bookingData, service: i }); setPage("specialist"); }} />}
            {page === "specialist" && <SpecialistPage onNav={setPage} onSelect={(i: number) => { setBookingData({ ...bookingData, specialist: i }); setPage("calendar"); }} />}
            {page === "calendar" && <CalendarPage data={bookingData} setData={setBookingData} onNav={setPage} />}
            {page === "confirm" && <ConfirmPage data={bookingData} onNav={setPage} />}
            {page === "packages" && <PackagesPage />}
            {page === "account" && <AccountPage />}
          </motion.div>
        </AnimatePresence>
      </div>
      <DemoBenefits accentColor={C.rose} bgColor={C.cream} textColor={C.dark} benefits={[
        { icon: "📱", title: "Mniej telefonów", desc: "Klientki rezerwują online 24/7" },
        { icon: "📊", title: "Lepsze obłożenie", desc: "Automatyczna optymalizacja grafiku" },
        { icon: "💰", title: "Wyższy ticket", desc: "Upsell pakietów zabiegowych" },
        { icon: "⭐", title: "Lojalność", desc: "Konta klientek, punkty i historia" },
      ]} />
      <DemoFooterCTA accentColor={C.rose} bgColor={C.dark} />
    </PreviewShell>
  );
}

function HomePage({ onNav }: { onNav: (p: string) => void }) {
  return (
    <div className="space-y-4 pb-4">
      <div className="px-4 pt-3">
        <div className="p-5 rounded-3xl relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${C.cream}, ${C.blush}80, ${C.mauve}40)` }}>
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-30" style={{ background: C.rose, filter: "blur(40px)", transform: "translate(20%, -30%)" }} />
          <p className="text-[10px] font-medium tracking-[0.3em] uppercase" style={{ color: C.rose }}>Twoje Piękno</p>
          <h2 className="font-display font-bold text-xl mt-1" style={{ color: C.dark }}>Umów zabieg</h2>
          <p className="text-xs mt-1 max-w-[220px]" style={{ color: C.taupe }}>Profesjonalne zabiegi i relaks w ekskluzywnym studio.</p>
          <motion.button whileHover={{ scale: 1.03 }} onClick={() => onNav("services")}
            className="mt-4 px-5 py-2.5 rounded-full text-xs font-bold text-white inline-flex items-center gap-1.5 shadow-lg" style={{ background: `linear-gradient(135deg, ${C.rose}, ${C.dark}90)` }}>
            <Calendar className="w-3.5 h-3.5" /> Zarezerwuj wizytę
          </motion.button>
        </div>
      </div>

      <div className="px-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold" style={{ color: C.dark }}>Kategorie</span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {categories.map(c => (
            <motion.button key={c.id} whileHover={{ y: -2 }} onClick={() => onNav("services")}
              className="shrink-0 w-[72px] py-3 rounded-2xl text-center" style={{ background: C.cream, border: `1px solid ${C.mauve}` }}>
              <span className="text-xl block">{c.icon}</span>
              <span className="text-[9px] font-semibold block mt-1" style={{ color: C.dark }}>{c.name}</span>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="px-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold flex items-center gap-1" style={{ color: C.dark }}><Sparkles className="w-3.5 h-3.5" style={{ color: C.gold }} />Popularne zabiegi</span>
          <button onClick={() => onNav("services")} className="text-[10px] font-semibold" style={{ color: C.rose }}>Wszystkie →</button>
        </div>
        {services.filter(s => s.popular).slice(0, 3).map((s, i) => (
          <motion.div key={i} whileHover={{ x: 2 }} onClick={() => onNav("services")}
            className="flex items-center gap-3 p-3 mb-2 rounded-2xl cursor-pointer" style={{ background: C.cream, border: `1px solid ${C.mauve}60` }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg" style={{ background: `${C.blush}80` }}>
              {categories.find(c => c.id === s.cat)?.icon}
            </div>
            <div className="flex-1">
              <h4 className="text-xs font-bold" style={{ color: C.dark }}>{s.name}</h4>
              <span className="text-[10px] flex items-center gap-1" style={{ color: C.taupe }}><Clock className="w-2.5 h-2.5" /> {s.time}</span>
            </div>
            <span className="font-bold text-sm" style={{ color: C.rose }}>{s.price} zł</span>
            <ChevronRight className="w-4 h-4" style={{ color: C.taupe }} />
          </motion.div>
        ))}
      </div>

      <div className="px-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold flex items-center gap-1" style={{ color: C.dark }}><Gift className="w-3.5 h-3.5" style={{ color: C.gold }} />Pakiet tygodnia</span>
          <button onClick={() => onNav("packages")} className="text-[10px] font-semibold" style={{ color: C.rose }}>Więcej →</button>
        </div>
        <div className="p-4 rounded-2xl relative overflow-hidden" style={{ background: C.cream, border: `1px solid ${C.gold}30` }}>
          <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[9px] font-bold text-white" style={{ background: C.gold }}>-{packages[0].save} zł</span>
          <h4 className="font-bold text-sm" style={{ color: C.dark }}>{packages[0].name}</h4>
          <div className="flex gap-1.5 mt-1.5 flex-wrap">
            {packages[0].items.map((item, i) => (
              <span key={i} className="px-2 py-0.5 rounded-full text-[9px]" style={{ background: C.blush, color: C.dark }}>{item}</span>
            ))}
          </div>
          <div className="flex items-center justify-between mt-3">
            <span className="font-bold text-lg" style={{ color: C.rose }}>{packages[0].price} zł</span>
            <motion.button whileHover={{ scale: 1.05 }} onClick={() => onNav("services")}
              className="px-4 py-2 rounded-full text-white text-[10px] font-bold" style={{ background: `linear-gradient(135deg, ${C.rose}, ${C.dark}80)` }}>Zarezerwuj</motion.button>
          </div>
        </div>
      </div>

      <div className="px-4">
        <span className="text-xs font-bold" style={{ color: C.dark }}>Nasz zespół</span>
        <div className="flex gap-3 mt-2 overflow-x-auto pb-1">
          {specialists.map((sp, i) => (
            <div key={i} className="shrink-0 w-[100px] text-center">
              <div className="w-14 h-14 rounded-full mx-auto mb-1.5 flex items-center justify-center font-bold text-sm" style={{ background: `linear-gradient(135deg, ${C.rose}, ${C.mauve})`, color: "white" }}>{sp.avatar}</div>
              <span className="text-[10px] font-semibold block" style={{ color: C.dark }}>{sp.name}</span>
              <div className="flex items-center justify-center gap-0.5 mt-0.5">
                <Star className="w-2.5 h-2.5" style={{ fill: C.gold, color: C.gold }} />
                <span className="text-[10px] font-bold" style={{ color: C.dark }}>{sp.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4">
        <div className="p-3 rounded-2xl flex items-center gap-3" style={{ background: C.cream, border: `1px solid ${C.mauve}60` }}>
          <Crown className="w-8 h-8" style={{ color: C.gold }} />
          <div className="flex-1">
            <span className="text-xs font-bold" style={{ color: C.dark }}>Program lojalnościowy</span>
            <p className="text-[10px]" style={{ color: C.taupe }}>Zbieraj punkty za wizyty, wymieniaj na zabiegi</p>
          </div>
          <button onClick={() => onNav("account")} className="text-[10px] font-bold" style={{ color: C.rose }}>Sprawdź →</button>
        </div>
      </div>
    </div>
  );
}

function ServicesPage({ onNav, onSelect }: { onNav: (p: string) => void; onSelect: (i: number) => void }) {
  const [selCat, setSelCat] = useState("all");
  const filtered = selCat === "all" ? services : services.filter(s => s.cat === selCat);

  return (
    <div className="px-4 py-3 space-y-3">
      <h2 className="font-display font-bold text-lg" style={{ color: C.dark }}>Wybierz zabieg</h2>
      <div className="flex gap-2 overflow-x-auto pb-1">
        <button onClick={() => setSelCat("all")} className="px-3 py-1.5 rounded-full text-[10px] font-semibold whitespace-nowrap"
          style={selCat === "all" ? { background: C.rose, color: "white" } : { background: C.cream, color: C.taupe }}>Wszystkie</button>
        {categories.map(c => (
          <button key={c.id} onClick={() => setSelCat(c.id)} className="px-3 py-1.5 rounded-full text-[10px] font-semibold whitespace-nowrap"
            style={selCat === c.id ? { background: C.rose, color: "white" } : { background: C.cream, color: C.taupe }}>{c.icon} {c.name}</button>
        ))}
      </div>
      {filtered.map((s, i) => {
        const idx = services.indexOf(s);
        return (
          <motion.div key={idx} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
            onClick={() => onSelect(idx)}
            className="flex items-center gap-3 p-3.5 rounded-2xl cursor-pointer" style={{ background: C.cream, border: `1px solid ${C.mauve}60` }}>
            <span className="text-xl">{categories.find(c => c.id === s.cat)?.icon}</span>
            <div className="flex-1">
              <div className="flex items-center gap-1.5">
                <h4 className="text-xs font-bold" style={{ color: C.dark }}>{s.name}</h4>
                {s.popular && <span className="px-1.5 py-0.5 rounded-full text-[8px] font-bold text-white" style={{ background: C.gold }}>HIT</span>}
              </div>
              <span className="text-[10px]" style={{ color: C.taupe }}>{s.time}</span>
            </div>
            <span className="font-bold text-sm" style={{ color: C.rose }}>{s.price} zł</span>
          </motion.div>
        );
      })}
    </div>
  );
}

function SpecialistPage({ onNav, onSelect }: { onNav: (p: string) => void; onSelect: (i: number) => void }) {
  return (
    <div className="px-4 py-3 space-y-3">
      <h2 className="font-display font-bold text-lg" style={{ color: C.dark }}>Wybierz specjalistkę</h2>
      {specialists.map((sp, i) => (
        <motion.div key={i} whileHover={{ scale: 1.01 }} onClick={() => onSelect(i)}
          className="flex items-center gap-3 p-4 rounded-2xl cursor-pointer" style={{ background: C.cream, border: `1px solid ${C.mauve}60` }}>
          <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm" style={{ background: `linear-gradient(135deg, ${C.rose}, ${C.mauve})`, color: "white" }}>{sp.avatar}</div>
          <div className="flex-1">
            <h4 className="text-sm font-bold" style={{ color: C.dark }}>{sp.name}</h4>
            <p className="text-[10px]" style={{ color: C.taupe }}>{sp.role}</p>
            <div className="flex items-center gap-1 mt-0.5">
              <Star className="w-3 h-3" style={{ fill: C.gold, color: C.gold }} />
              <span className="text-[10px] font-bold" style={{ color: C.dark }}>{sp.rating}</span>
              <span className="text-[10px]" style={{ color: C.taupe }}>({sp.reviews})</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4" style={{ color: C.taupe }} />
        </motion.div>
      ))}
    </div>
  );
}

function CalendarPage({ data, setData, onNav }: { data: any; setData: (d: any) => void; onNav: (p: string) => void }) {
  const unavail = [2, 5, 8];
  return (
    <div className="px-4 py-3 space-y-3">
      <h2 className="font-display font-bold text-lg" style={{ color: C.dark }}>Wybierz termin</h2>
      {data.specialist >= 0 && (
        <div className="flex items-center gap-2 p-2.5 rounded-xl" style={{ background: C.cream }}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ background: `linear-gradient(135deg, ${C.rose}, ${C.mauve})`, color: "white" }}>{specialists[data.specialist].avatar}</div>
          <div>
            <span className="text-xs font-bold" style={{ color: C.dark }}>{specialists[data.specialist].name}</span>
            <span className="text-[10px] block" style={{ color: C.taupe }}>{data.service >= 0 ? services[data.service].name : ""}</span>
          </div>
        </div>
      )}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {days.map((d, i) => (
          <button key={d} onClick={() => setData({ ...data, day: i })}
            className="flex-1 py-2 rounded-xl text-xs font-semibold min-w-[55px]"
            style={data.day === i ? { background: `linear-gradient(135deg, ${C.rose}, ${C.dark}80)`, color: "white" } : { background: C.cream, color: C.taupe }}>{d}</button>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-2">
        {slots.map((s, i) => {
          const off = unavail.includes(i);
          return (
            <button key={s} onClick={() => { if (!off) { setData({ ...data, slot: i }); onNav("confirm"); } }}
              className={`py-3 rounded-xl text-[11px] font-semibold ${off ? "line-through" : ""}`}
              style={off ? { background: C.cream + "80", color: C.taupe + "40" } : { background: C.cream, color: C.dark, border: `1px solid ${C.mauve}60` }}>{s}</button>
          );
        })}
      </div>
    </div>
  );
}

function ConfirmPage({ data, onNav }: { data: any; onNav: (p: string) => void }) {
  const [confirmed, setConfirmed] = useState(false);
  if (confirmed) {
    return (
      <div className="px-4 py-8 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
          <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: `${C.rose}15` }}>
            <CheckCircle2 className="w-8 h-8" style={{ color: C.rose }} />
          </div>
        </motion.div>
        <h3 className="font-bold text-lg" style={{ color: C.dark }}>Zarezerwowano!</h3>
        <p className="text-xs mt-1" style={{ color: C.taupe }}>{data.service >= 0 ? services[data.service].name : ""}</p>
        <p className="text-xs" style={{ color: C.taupe }}>{data.specialist >= 0 ? specialists[data.specialist].name : ""} • {days[data.day]}</p>
        <p className="font-mono font-bold text-sm mt-2" style={{ color: C.rose }}>BB-{Math.floor(Math.random() * 9000 + 1000)}</p>
        <p className="text-[10px] mt-3 max-w-[220px] mx-auto" style={{ color: C.taupe }}>Potwierdzenie SMS wysłane. Pamiętaj, aby przyjść 5 min wcześniej.</p>
        <button onClick={() => onNav("home")} className="mt-4 px-5 py-2 rounded-full text-xs font-bold" style={{ background: C.cream, color: C.rose, border: `1px solid ${C.rose}` }}>Wróć na stronę</button>
      </div>
    );
  }

  return (
    <div className="px-4 py-3 space-y-3">
      <h2 className="font-display font-bold text-lg" style={{ color: C.dark }}>Potwierdzenie</h2>
      <div className="p-4 rounded-2xl space-y-2" style={{ background: C.cream }}>
        <div className="flex justify-between text-xs"><span style={{ color: C.taupe }}>Zabieg</span><span className="font-bold" style={{ color: C.dark }}>{data.service >= 0 ? services[data.service].name : ""}</span></div>
        <div className="flex justify-between text-xs"><span style={{ color: C.taupe }}>Specjalistka</span><span className="font-bold" style={{ color: C.dark }}>{data.specialist >= 0 ? specialists[data.specialist].name : ""}</span></div>
        <div className="flex justify-between text-xs"><span style={{ color: C.taupe }}>Termin</span><span className="font-bold" style={{ color: C.dark }}>{days[data.day]}, {data.slot >= 0 ? slots[data.slot] : ""}</span></div>
        <div className="flex justify-between text-xs"><span style={{ color: C.taupe }}>Czas trwania</span><span style={{ color: C.dark }}>{data.service >= 0 ? services[data.service].time : ""}</span></div>
        <div className="border-t pt-2 mt-2 flex justify-between" style={{ borderColor: C.mauve }}>
          <span className="font-bold" style={{ color: C.dark }}>Cena</span>
          <span className="font-bold text-xl" style={{ color: C.rose }}>{data.service >= 0 ? services[data.service].price : 0} zł</span>
        </div>
      </div>
      <input placeholder="Imię i nazwisko" className="w-full px-4 py-3 rounded-xl text-sm" style={{ background: C.cream, border: `1px solid ${C.mauve}60`, color: C.dark }} />
      <input placeholder="Telefon" className="w-full px-4 py-3 rounded-xl text-sm" style={{ background: C.cream, border: `1px solid ${C.mauve}60`, color: C.dark }} />
      <motion.button whileHover={{ scale: 1.02 }} onClick={() => setConfirmed(true)}
        className="w-full py-3.5 rounded-xl font-bold text-sm text-white" style={{ background: `linear-gradient(135deg, ${C.rose}, ${C.dark}80)` }}>Potwierdź rezerwację</motion.button>
    </div>
  );
}

function PackagesPage() {
  return (
    <div className="px-4 py-3 space-y-3">
      <h2 className="font-display font-bold text-lg" style={{ color: C.dark }}>Pakiety zabiegowe</h2>
      {packages.map((p, i) => (
        <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
          className="p-4 rounded-2xl relative" style={{ background: C.cream, border: `1px solid ${C.gold}30` }}>
          <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[9px] font-bold text-white" style={{ background: C.gold }}>Oszczędzasz {p.save} zł</span>
          <h4 className="font-bold text-sm" style={{ color: C.dark }}>{p.name}</h4>
          <div className="flex gap-1.5 mt-2 flex-wrap">
            {p.items.map((item, j) => (
              <span key={j} className="px-2 py-0.5 rounded-full text-[9px]" style={{ background: C.blush, color: C.dark }}>{item}</span>
            ))}
          </div>
          <div className="flex items-center justify-between mt-3">
            <span className="font-bold text-lg" style={{ color: C.rose }}>{p.price} zł</span>
            <button className="px-4 py-2 rounded-full text-[10px] font-bold text-white" style={{ background: `linear-gradient(135deg, ${C.rose}, ${C.dark}80)` }}>Zarezerwuj</button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function AccountPage() {
  return (
    <div className="px-4 py-3 space-y-3">
      <div className="p-5 rounded-2xl text-center" style={{ background: `linear-gradient(135deg, ${C.blush}, ${C.mauve}80)` }}>
        <div className="w-14 h-14 rounded-full mx-auto mb-2 flex items-center justify-center text-lg font-bold" style={{ background: `linear-gradient(135deg, ${C.rose}, ${C.dark}60)`, color: "white" }}>AK</div>
        <h3 className="font-bold text-base" style={{ color: C.dark }}>Anna Kowalska</h3>
        <p className="text-[10px]" style={{ color: C.taupe }}>Klientka premium od 2024</p>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[{ v: "12", l: "Wizyt" }, { v: "240", l: "Punkty" }, { v: "VIP", l: "Status" }].map((s, i) => (
          <div key={i} className="p-3 rounded-xl text-center" style={{ background: C.cream }}>
            <span className="font-bold text-base block" style={{ color: i === 2 ? C.gold : C.rose }}>{s.v}</span>
            <span className="text-[9px]" style={{ color: C.taupe }}>{s.l}</span>
          </div>
        ))}
      </div>
      <div className="p-3 rounded-xl" style={{ background: C.cream }}>
        <span className="text-xs font-bold" style={{ color: C.dark }}>Poziom lojalności</span>
        <div className="flex items-center justify-between mt-1.5">
          <span className="text-[10px]" style={{ color: C.taupe }}>240 / 500 pkt do Platinum</span>
          <span className="text-[10px] font-bold" style={{ color: C.gold }}>GOLD</span>
        </div>
        <div className="h-2 rounded-full mt-1.5" style={{ background: C.blush }}>
          <div className="h-full rounded-full" style={{ width: "48%", background: `linear-gradient(90deg, ${C.gold}, ${C.rose})` }} />
        </div>
      </div>
    </div>
  );
}
