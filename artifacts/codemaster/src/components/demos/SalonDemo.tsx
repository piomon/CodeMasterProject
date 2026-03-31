import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PreviewShell, DemoNav, DemoSection, DemoFooterCTA, DemoBenefits } from "./PreviewShell";
import { Calendar, Clock, Star, Heart, Sparkles, User, ChevronRight, CheckCircle2, MapPin, Gift, Image, ArrowLeft, Shield, Crown } from "lucide-react";

const C = { cream: "#FFF8F0", beige: "#F5E6D3", cashmere: "#E6D5C3", rose: "#D4A0A0", gold: "#C9A96E", taupe: "#8B7D6B", dark: "#5C4B3A" };

const categories = [
  { id: "hair", name: "Fryzjerstwo", icon: "✂️" },
  { id: "face", name: "Pielęgnacja twarzy", icon: "🧖‍♀️" },
  { id: "nails", name: "Manicure & Pedicure", icon: "💅" },
  { id: "body", name: "Zabiegi na ciało", icon: "✨" },
  { id: "lashes", name: "Brwi & Rzęsy", icon: "👁️" },
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
  { name: "Peeling & Maska nawilżająca", cat: "face", time: "75 min", price: 200, popular: false },
  { name: "Mezoterapia bezigłowa", cat: "face", time: "45 min", price: 250, popular: true },
];

const specialists = [
  { name: "Anna Kowalska", role: "Hair Stylist Senior", rating: 4.9, reviews: 234, avatar: "AK", specialties: ["Koloryzacja", "Ombre"], nextFree: "Dziś 14:30" },
  { name: "Marta Nowak", role: "Kosmetolog", rating: 4.8, reviews: 189, avatar: "MN", specialties: ["Mezoterapia", "Peelingi"], nextFree: "Jutro 10:00" },
  { name: "Ewa Wiśniewska", role: "Stylistka paznokci", rating: 5.0, reviews: 156, avatar: "EW", specialties: ["Hybrydowy", "Nail art"], nextFree: "Dziś 16:00" },
  { name: "Katarzyna Maj", role: "Lashmaker", rating: 4.9, reviews: 112, avatar: "KM", specialties: ["Lifting", "Przedłużanie"], nextFree: "Śr 11:00" },
];

const packages = [
  { name: "Relaks Premium", items: ["Masaż 60 min", "Peeling ciała", "Maska na twarz"], price: 350, save: 80 },
  { name: "Bridal Glow", items: ["Manicure", "Makijaż ślubny", "Upięcie"], price: 550, save: 120 },
  { name: "Beauty Day", items: ["Strzyżenie", "Manicure", "Peeling twarzy"], price: 280, save: 60 },
];

const days = ["Pon 22", "Wt 23", "Śr 24", "Czw 25", "Pt 26", "Sob 27"];
const slots = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "13:00", "14:00", "14:30", "15:00", "16:00", "17:00"];
const unavail = [2, 5, 8];

function SoftGlow() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    let f = 0;
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      const orbs = [
        { x: 0.2, color: C.rose },
        { x: 0.5, color: C.gold },
        { x: 0.8, color: C.cashmere },
      ];
      orbs.forEach((o, i) => {
        const x = c.width * o.x;
        const y = c.height * 0.5 + Math.sin(f * 0.008 + i * 2) * 30;
        const r = 60 + Math.sin(f * 0.006 + i) * 20;
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, o.color + "25");
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
      });
      f++;
      requestAnimationFrame(draw);
    };
    draw();
  }, []);
  return <canvas ref={ref} width={600} height={300} className="absolute inset-0 w-full h-full opacity-50" />;
}

export function SalonDemo({ name }: { name: string; features: string[] }) {
  const [page, setPage] = useState("home");
  const tabs = [
    { id: "home", label: "Start", icon: <Heart className="w-3 h-3" /> },
    { id: "services", label: "Usługi", icon: <Sparkles className="w-3 h-3" /> },
    { id: "booking", label: "Rezerwacja", icon: <Calendar className="w-3 h-3" /> },
    { id: "packages", label: "Pakiety", icon: <Gift className="w-3 h-3" /> },
    { id: "team", label: "Zespół", icon: <User className="w-3 h-3" /> },
    { id: "account", label: "Konto", icon: <Crown className="w-3 h-3" /> },
  ];

  return (
    <PreviewShell title={name}>
      <DemoNav tabs={tabs} activeTab={page} onTabChange={setPage} logo="Belle Beauty" />
      <AnimatePresence mode="wait">
        <motion.div key={page} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
          {page === "home" && <HomePage onNav={setPage} />}
          {page === "services" && <ServicesPage onNav={setPage} />}
          {page === "booking" && <BookingPage />}
          {page === "packages" && <PackagesPage />}
          {page === "team" && <TeamPage onNav={setPage} />}
          {page === "account" && <AccountPage />}
        </motion.div>
      </AnimatePresence>
    </PreviewShell>
  );
}

function HomePage({ onNav }: { onNav: (p: string) => void }) {
  return (
    <div>
      <div className="relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${C.cream}, ${C.beige}90, ${C.rose}20)` }}>
        <SoftGlow />
        <div className="relative p-10 text-center">
          <p className="text-[10px] font-medium tracking-[0.4em] uppercase mb-2" style={{ color: C.taupe }}>Premium Beauty Studio</p>
          <h1 className="font-display font-bold text-4xl mb-2" style={{ color: C.dark }}>Belle Beauty</h1>
          <p className="text-xs mt-1 max-w-[260px] mx-auto leading-relaxed" style={{ color: C.taupe }}>Twoje miejsce piękna i relaksu. Profesjonalne zabiegi, najlepsi specjaliści, luksusowa atmosfera.</p>
          <div className="flex items-center justify-center gap-1 mt-3">
            {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3" style={{ fill: C.gold, color: C.gold }} />)}
            <span className="text-[10px] ml-1" style={{ color: C.taupe }}>4.9 (567 opinii)</span>
          </div>
          <div className="flex gap-3 justify-center mt-5">
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => onNav("booking")}
              className="px-7 py-3.5 rounded-full text-white font-semibold text-sm inline-flex items-center gap-2 shadow-lg" style={{ background: `linear-gradient(135deg, ${C.rose}, ${C.taupe})` }}>
              <Calendar className="w-4 h-4" /> Umów wizytę
            </motion.button>
            <button onClick={() => onNav("packages")} className="px-7 py-3.5 rounded-full text-sm font-semibold border" style={{ borderColor: C.rose + "40", color: C.rose }}>Pakiety</button>
          </div>
        </div>
      </div>

      <DemoSection>
        <div className="grid grid-cols-4 gap-2">
          {[
            { icon: "✨", label: "Zabiegi", desc: "50+ usług" },
            { icon: "🏆", label: "Nagrody", desc: "Top 10 salon" },
            { icon: "💎", label: "Premium", desc: "Kosmetyki" },
            { icon: "🕐", label: "Otwarte", desc: "7 dni/tydz." },
          ].map((f, i) => (
            <div key={i} className="p-3 rounded-xl text-center" style={{ background: `${C.beige}80` }}>
              <span className="text-lg block">{f.icon}</span>
              <span className="text-[8px] font-bold block mt-1" style={{ color: C.dark }}>{f.label}</span>
              <span className="text-[7px]" style={{ color: C.taupe }}>{f.desc}</span>
            </div>
          ))}
        </div>
        <h3 className="font-display font-bold text-base mt-4 flex items-center gap-2" style={{ color: C.dark }}>
          <Sparkles className="w-4 h-4" style={{ color: C.gold }} /> Popularne zabiegi
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {services.filter(s => s.popular).slice(0, 3).map((s, i) => (
            <motion.div key={i} whileHover={{ y: -4, boxShadow: `0 8px 30px ${C.rose}30` }}
              className="p-4 rounded-2xl border cursor-pointer" style={{ borderColor: C.beige, background: `linear-gradient(135deg, ${C.cream}, white)` }} onClick={() => onNav("services")}>
              <span className="text-xl">{categories.find(c => c.id === s.cat)?.icon}</span>
              <h4 className="font-semibold text-xs mt-2" style={{ color: C.dark }}>{s.name}</h4>
              <div className="flex items-center justify-between mt-2">
                <span className="text-[10px]" style={{ color: C.taupe }}>{s.time}</span>
                <span className="font-bold text-sm" style={{ color: C.rose }}>{s.price} zł</span>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="p-4 rounded-2xl mt-4" style={{ background: `${C.dark}08`, border: `1px solid ${C.rose}20` }}>
          <p className="text-[10px] tracking-[0.2em] uppercase text-center" style={{ color: C.rose }}>Opinie klientek</p>
          <p className="text-xs mt-2 text-center italic" style={{ color: C.dark + "90" }}>"Najlepszy salon w Warszawie! Ewa jest cudowna — mój manicure wygląda idealnie przez 3 tygodnie."</p>
          <p className="text-[10px] text-center mt-1" style={{ color: C.gold }}>— Karolina M. ★★★★★</p>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-3">
          {[{ v: "567", l: "Opinii 5★" },{ v: "8K+", l: "Klientek" },{ v: "6", l: "Lat doświadczenia" }].map((s, i) => (
            <div key={i} className="p-3 rounded-xl text-center" style={{ background: `${C.rose}08` }}>
              <span className="font-bold text-sm block" style={{ color: C.rose }}>{s.v}</span>
              <span className="text-[9px]" style={{ color: C.taupe }}>{s.l}</span>
            </div>
          ))}
        </div>
        <h3 className="font-display font-bold text-base mt-4 flex items-center gap-2" style={{ color: C.dark }}>
          <Gift className="w-4 h-4" style={{ color: C.gold }} /> Pakiet tygodnia
        </h3>
        <div className="p-4 rounded-2xl border relative overflow-hidden" style={{ borderColor: C.gold + "40", background: `linear-gradient(135deg, ${C.cream}, ${C.beige}50)` }}>
          <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold text-white" style={{ background: C.gold }}>-{packages[0].save} zł</span>
          <h4 className="font-bold text-sm" style={{ color: C.dark }}>{packages[0].name}</h4>
          <div className="flex gap-2 mt-2 flex-wrap">
            {packages[0].items.map((item, i) => (
              <span key={i} className="px-2 py-0.5 rounded-full text-[10px]" style={{ background: C.beige, color: C.taupe }}>{item}</span>
            ))}
          </div>
          <div className="flex items-center justify-between mt-3">
            <span className="font-bold text-lg" style={{ color: C.rose }}>{packages[0].price} zł</span>
            <motion.button whileHover={{ scale: 1.05 }} className="px-4 py-2 rounded-full text-white text-xs font-semibold" style={{ background: `linear-gradient(135deg, ${C.rose}, ${C.taupe})` }}>Zarezerwuj</motion.button>
          </div>
        </div>

        <h3 className="font-display font-bold text-lg mt-6" style={{ color: C.dark }}>Nasi specjaliści</h3>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {specialists.slice(0, 3).map((sp, i) => (
            <div key={i} className="min-w-[130px] p-3 rounded-2xl border text-center" style={{ borderColor: C.beige, background: C.cream }}>
              <div className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center font-bold text-sm" style={{ background: `linear-gradient(135deg, ${C.rose}, ${C.cashmere})`, color: "white" }}>{sp.avatar}</div>
              <h4 className="font-semibold text-xs" style={{ color: C.dark }}>{sp.name}</h4>
              <p className="text-[10px]" style={{ color: C.taupe }}>{sp.role}</p>
              <div className="flex items-center justify-center gap-0.5 mt-1">
                <Star className="w-3 h-3" style={{ fill: C.gold, color: C.gold }} />
                <span className="text-xs font-semibold" style={{ color: C.dark }}>{sp.rating}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 mt-2">
          <div className="p-4 rounded-2xl border flex items-center gap-3" style={{ borderColor: C.beige, background: C.cream }}>
            <Image className="w-8 h-8" style={{ color: C.rose }} />
            <div>
              <h4 className="font-semibold text-xs" style={{ color: C.dark }}>Galeria efektów</h4>
              <p className="text-[10px]" style={{ color: C.taupe }}>Przed i po zabiegach</p>
            </div>
          </div>
          <div className="p-4 rounded-2xl border flex items-center gap-3" style={{ borderColor: C.beige, background: C.cream }}>
            <Shield className="w-8 h-8" style={{ color: C.gold }} />
            <div>
              <h4 className="font-semibold text-xs" style={{ color: C.dark }}>Program lojalnościowy</h4>
              <p className="text-[10px]" style={{ color: C.taupe }}>Zbieraj punkty za wizyty</p>
            </div>
          </div>
        </div>
      </DemoSection>
      <DemoBenefits accentColor={C.rose} bgColor={C.cream} textColor={C.dark} benefits={[
        { icon: "📱", title: "Mniej telefonów", desc: "Klientki rezerwują online 24/7" },
        { icon: "📊", title: "Lepsze obłożenie", desc: "Automatyczna optymalizacja grafiku" },
        { icon: "💰", title: "Wyższy ticket", desc: "Pakiety i upsell zabiegów" },
        { icon: "⭐", title: "Lojalność", desc: "Konto klientki i historia wizyt" },
      ]} />
      <DemoFooterCTA accentColor={C.rose} bgColor={C.dark} />
    </div>
  );
}

function ServicesPage({ onNav }: { onNav: (p: string) => void }) {
  const [selCat, setSelCat] = useState("all");
  const filtered = selCat === "all" ? services : services.filter(s => s.cat === selCat);

  return (
    <DemoSection>
      <h3 className="font-display font-bold text-lg" style={{ color: C.dark }}>Nasze usługi</h3>
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button onClick={() => setSelCat("all")} className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all`}
          style={selCat === "all" ? { background: C.rose, color: "white" } : { background: C.beige, color: C.taupe }}>Wszystkie</button>
        {categories.map(c => (
          <button key={c.id} onClick={() => setSelCat(c.id)} className="px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all"
            style={selCat === c.id ? { background: C.rose, color: "white" } : { background: C.beige, color: C.taupe }}>{c.icon} {c.name}</button>
        ))}
      </div>
      <div className="space-y-2">
        {filtered.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
            className="flex items-center gap-4 p-4 rounded-2xl border cursor-pointer group" style={{ borderColor: C.beige, background: C.cream }}
            onClick={() => onNav("booking")}>
            <span className="text-2xl">{categories.find(c => c.id === s.cat)?.icon}</span>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-sm" style={{ color: C.dark }}>{s.name}</h4>
                {s.popular && <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold text-white" style={{ background: C.gold }}>HIT</span>}
              </div>
              <span className="text-xs flex items-center gap-1" style={{ color: C.taupe }}><Clock className="w-3 h-3" />{s.time}</span>
            </div>
            <div className="text-right">
              <span className="font-bold text-lg" style={{ color: C.rose }}>{s.price}</span>
              <span className="text-xs" style={{ color: C.taupe }}> zł</span>
            </div>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" style={{ color: C.taupe }} />
          </motion.div>
        ))}
      </div>
    </DemoSection>
  );
}

function BookingPage() {
  const [step, setStep] = useState(0);
  const [selCat, setSelCat] = useState("");
  const [selService, setSelService] = useState(0);
  const [selSpec, setSelSpec] = useState(-1);
  const [selDay, setSelDay] = useState(0);
  const [selSlot, setSelSlot] = useState(-1);
  const stepLabels = ["Kategoria", "Usługa", "Specjalistka", "Termin", "Dane", "Gotowe"];

  return (
    <DemoSection>
      <div className="flex items-center gap-1 mb-4 overflow-x-auto">
        {stepLabels.map((s, i) => (
          <div key={s} className="flex items-center gap-1 shrink-0">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all`}
              style={step >= i ? { background: `linear-gradient(135deg, ${C.rose}, ${C.taupe})`, color: "white" } : { background: C.beige, color: C.taupe }}>
              {step > i ? <CheckCircle2 className="w-3.5 h-3.5" /> : i + 1}
            </div>
            <span className="text-[9px] font-medium" style={{ color: step >= i ? C.dark : C.taupe }}>{s}</span>
            {i < stepLabels.length - 1 && <div className="w-3 h-px mx-0.5" style={{ background: step > i ? C.rose : C.beige }} />}
          </div>
        ))}
      </div>
      {step > 0 && step < 5 && (
        <button onClick={() => setStep(step - 1)} className="flex items-center gap-1 text-xs font-medium mb-3" style={{ color: C.taupe }}>
          <ArrowLeft className="w-3 h-3" /> Cofnij
        </button>
      )}

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key="cat" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-2 gap-3">
            {categories.map(c => (
              <motion.div key={c.id} whileHover={{ scale: 1.02 }} onClick={() => { setSelCat(c.id); setStep(1); }}
                className="p-5 rounded-2xl border cursor-pointer text-center" style={{ borderColor: C.beige, background: C.cream }}>
                <span className="text-3xl block mb-2">{c.icon}</span>
                <span className="text-sm font-semibold" style={{ color: C.dark }}>{c.name}</span>
                <p className="text-[10px] mt-1" style={{ color: C.taupe }}>{services.filter(s => s.cat === c.id).length} usług</p>
              </motion.div>
            ))}
          </motion.div>
        )}

        {step === 1 && (
          <motion.div key="svc" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-2">
            {services.filter(s => s.cat === selCat).map((s, i) => (
              <div key={i} onClick={() => { setSelService(services.indexOf(s)); setStep(2); }}
                className="flex items-center gap-3 p-4 rounded-2xl border cursor-pointer" style={{ borderColor: C.beige, background: C.cream }}>
                <div className="flex-1">
                  <span className="text-sm font-medium" style={{ color: C.dark }}>{s.name}</span>
                  <span className="text-xs ml-2" style={{ color: C.taupe }}>{s.time}</span>
                </div>
                <span className="font-bold text-sm" style={{ color: C.rose }}>{s.price} zł</span>
              </div>
            ))}
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="spec" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
            <p className="text-xs" style={{ color: C.taupe }}>Wybierz swoją specjalistkę:</p>
            {specialists.map((sp, i) => (
              <motion.div key={i} whileHover={{ scale: 1.01 }} onClick={() => { setSelSpec(i); setStep(3); }}
                className="flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all"
                style={{ borderColor: selSpec === i ? C.rose : C.beige, background: selSpec === i ? `${C.rose}08` : C.cream }}>
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold relative" style={{ background: `linear-gradient(135deg, ${C.rose}, ${C.cashmere})` }}>
                  {sp.avatar}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm" style={{ color: C.dark }}>{sp.name}</h4>
                  <p className="text-[10px]" style={{ color: C.taupe }}>{sp.role}</p>
                  <div className="flex gap-1 mt-1">
                    {sp.specialties.map((s, j) => (
                      <span key={j} className="px-1.5 py-0.5 rounded text-[8px] font-medium" style={{ background: C.beige, color: C.taupe }}>{s}</span>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-0.5"><Star className="w-3 h-3" style={{ fill: C.gold, color: C.gold }} /><span className="text-xs font-bold" style={{ color: C.dark }}>{sp.rating}</span></div>
                  <span className="text-[10px]" style={{ color: C.taupe }}>{sp.reviews} opinii</span>
                  <p className="text-[9px] font-medium mt-1" style={{ color: C.rose }}>{sp.nextFree}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="cal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="flex items-center gap-3 p-3 rounded-xl mb-4" style={{ background: C.beige + "60" }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs" style={{ background: `linear-gradient(135deg, ${C.rose}, ${C.cashmere})` }}>
                {selSpec >= 0 ? specialists[selSpec].avatar : "?"}
              </div>
              <div>
                <span className="text-xs font-semibold" style={{ color: C.dark }}>{selSpec >= 0 ? specialists[selSpec].name : ""}</span>
                <span className="text-[10px] block" style={{ color: C.taupe }}>{services[selService].name} • {services[selService].time}</span>
              </div>
            </div>
            <div className="flex gap-2 mb-4 overflow-x-auto">
              {days.map((d, i) => (
                <button key={d} onClick={() => setSelDay(i)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-medium transition-all min-w-[60px]"
                  style={selDay === i ? { background: `linear-gradient(135deg, ${C.rose}, ${C.taupe})`, color: "white" } : { background: C.beige, color: C.taupe }}>{d}</button>
              ))}
            </div>
            <div className="grid grid-cols-4 gap-2">
              {slots.map((s, i) => {
                const off = unavail.includes(i);
                return (
                  <button key={s} onClick={() => { if (!off) { setSelSlot(i); setStep(4); }}}
                    className={`py-3 rounded-xl text-sm font-medium transition-all ${off ? "line-through cursor-not-allowed" : "cursor-pointer"}`}
                    style={selSlot === i ? { background: `linear-gradient(135deg, ${C.rose}, ${C.taupe})`, color: "white" } : { background: off ? C.beige + "50" : C.beige, color: off ? C.taupe + "40" : C.dark }}>{s}</button>
                );
              })}
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div key="data" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
            <p className="text-xs font-medium" style={{ color: C.dark }}>Twoje dane</p>
            <input placeholder="Imię i nazwisko" className="w-full px-4 py-3 rounded-xl border text-sm" style={{ borderColor: C.beige, background: C.cream, color: C.dark }} />
            <input placeholder="Telefon" className="w-full px-4 py-3 rounded-xl border text-sm" style={{ borderColor: C.beige, background: C.cream, color: C.dark }} />
            <input placeholder="E-mail" className="w-full px-4 py-3 rounded-xl border text-sm" style={{ borderColor: C.beige, background: C.cream, color: C.dark }} />
            <textarea placeholder="Uwagi do wizyty (opcjonalnie)" rows={2} className="w-full px-4 py-3 rounded-xl border text-sm resize-none" style={{ borderColor: C.beige, background: C.cream, color: C.dark }} />

            <div className="p-4 rounded-xl space-y-2" style={{ background: C.beige + "40" }}>
              <div className="flex justify-between text-sm"><span style={{ color: C.taupe }}>Usługa</span><span className="font-medium" style={{ color: C.dark }}>{services[selService].name}</span></div>
              <div className="flex justify-between text-sm"><span style={{ color: C.taupe }}>Specjalista</span><span className="font-medium" style={{ color: C.dark }}>{selSpec >= 0 ? specialists[selSpec].name : "-"}</span></div>
              <div className="flex justify-between text-sm"><span style={{ color: C.taupe }}>Termin</span><span className="font-medium" style={{ color: C.dark }}>{days[selDay]} {selSlot >= 0 ? slots[selSlot] : ""}</span></div>
              <div className="border-t pt-2 mt-2 flex justify-between" style={{ borderColor: C.beige }}>
                <span className="font-semibold text-sm" style={{ color: C.dark }}>Do zapłaty</span>
                <span className="font-bold text-lg" style={{ color: C.rose }}>{services[selService].price} zł</span>
              </div>
            </div>

            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setStep(5)}
              className="w-full py-3.5 rounded-xl text-white font-semibold text-sm" style={{ background: `linear-gradient(135deg, ${C.rose}, ${C.taupe})` }}>
              Potwierdź rezerwację
            </motion.button>
          </motion.div>
        )}

        {step === 5 && (
          <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
            <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: `${C.rose}15` }}>
              <CheckCircle2 className="w-8 h-8" style={{ color: C.rose }} />
            </div>
            <h3 className="font-bold text-lg mb-1" style={{ color: C.dark }}>Rezerwacja potwierdzona!</h3>
            <p className="text-sm mb-4" style={{ color: C.taupe }}>{services[selService].name} • {selSpec >= 0 ? specialists[selSpec].name : ""}</p>
            <p className="text-sm mb-1" style={{ color: C.taupe }}>{days[selDay]} o {selSlot >= 0 ? slots[selSlot] : ""}</p>
            <div className="mt-6 p-4 rounded-xl border text-left max-w-xs mx-auto" style={{ borderColor: C.beige, background: C.cream }}>
              <p className="text-[10px] font-medium mb-1" style={{ color: C.taupe }}>Potwierdzenie wysłane na e-mail</p>
              <p className="text-[10px]" style={{ color: C.taupe }}>Numer rezerwacji: <span className="font-bold" style={{ color: C.dark }}>BEL-2026-{Math.floor(Math.random() * 9000 + 1000)}</span></p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </DemoSection>
  );
}

function PackagesPage() {
  return (
    <DemoSection>
      <h3 className="font-display font-bold text-lg" style={{ color: C.dark }}>Pakiety zabiegów</h3>
      <p className="text-xs" style={{ color: C.taupe }}>Oszczędź wybierając pakiet dopasowany do Twoich potrzeb</p>
      <div className="space-y-3 mt-3">
        {packages.map((p, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="p-5 rounded-2xl border relative" style={{ borderColor: C.beige, background: `linear-gradient(135deg, ${C.cream}, white)` }}>
            <span className="absolute top-4 right-4 px-2 py-0.5 rounded-full text-[10px] font-bold text-white" style={{ background: C.gold }}>Oszczędzasz {p.save} zł</span>
            <h4 className="font-bold text-base mb-2" style={{ color: C.dark }}>{p.name}</h4>
            <div className="space-y-1.5 mb-3">
              {p.items.map((item, j) => (
                <div key={j} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5" style={{ color: C.rose }} />
                  <span className="text-xs" style={{ color: C.taupe }}>{item}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <span className="font-bold text-xl" style={{ color: C.rose }}>{p.price} zł</span>
              <motion.button whileHover={{ scale: 1.05 }} className="px-5 py-2 rounded-full text-white text-xs font-semibold" style={{ background: `linear-gradient(135deg, ${C.rose}, ${C.taupe})` }}>Wybierz</motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </DemoSection>
  );
}

function TeamPage({ onNav }: { onNav: (p: string) => void }) {
  return (
    <DemoSection>
      <h3 className="font-display font-bold text-lg" style={{ color: C.dark }}>Nasz zespół</h3>
      {specialists.map((sp, i) => (
        <motion.div key={i} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
          className="flex gap-4 p-4 rounded-2xl border" style={{ borderColor: C.beige, background: C.cream }}>
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-lg" style={{ background: `linear-gradient(135deg, ${C.rose}, ${C.cashmere})` }}>{sp.avatar}</div>
          <div className="flex-1">
            <h4 className="font-bold text-sm" style={{ color: C.dark }}>{sp.name}</h4>
            <p className="text-[10px] mb-1" style={{ color: C.taupe }}>{sp.role}</p>
            <div className="flex gap-1 flex-wrap mb-2">
              {sp.specialties.map((s, j) => (
                <span key={j} className="px-1.5 py-0.5 rounded text-[8px] font-medium" style={{ background: C.beige, color: C.taupe }}>{s}</span>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[1,2,3,4,5].map(s => <Star key={s} className="w-2.5 h-2.5" style={{ fill: C.gold, color: C.gold }} />)}
              </div>
              <span className="text-[10px]" style={{ color: C.taupe }}>{sp.rating} ({sp.reviews})</span>
            </div>
          </div>
          <motion.button whileHover={{ scale: 1.05 }} onClick={() => onNav("booking")}
            className="px-4 py-2 rounded-xl text-white text-xs font-semibold self-center" style={{ background: `linear-gradient(135deg, ${C.rose}, ${C.taupe})` }}>Umów</motion.button>
        </motion.div>
      ))}
    </DemoSection>
  );
}

function AccountPage() {
  const visits = [
    { date: "15 mar 2026", service: "Koloryzacja Premium", spec: "Anna Kowalska", price: 350, status: "done" },
    { date: "2 mar 2026", service: "Manicure Hybrydowy", spec: "Ewa Wiśniewska", price: 90, status: "done" },
    { date: "18 lut 2026", service: "Masaż relaksacyjny", spec: "Marta Nowak", price: 180, status: "done" },
  ];

  return (
    <DemoSection>
      <div className="flex items-center gap-4 mb-4">
        <div className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold" style={{ background: `linear-gradient(135deg, ${C.rose}, ${C.cashmere})` }}>JK</div>
        <div>
          <h3 className="font-bold text-base" style={{ color: C.dark }}>Julia Kamińska</h3>
          <p className="text-xs" style={{ color: C.taupe }}>Klientka od marca 2024</p>
        </div>
        <span className="ml-auto px-2 py-1 rounded-full text-[10px] font-bold flex items-center gap-1" style={{ background: C.gold + "20", color: C.gold }}>
          <Crown className="w-3 h-3" /> Gold
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="p-3 rounded-xl text-center" style={{ background: C.beige + "60" }}>
          <span className="font-bold text-lg block" style={{ color: C.rose }}>12</span>
          <span className="text-[10px]" style={{ color: C.taupe }}>Wizyt</span>
        </div>
        <div className="p-3 rounded-xl text-center" style={{ background: C.beige + "60" }}>
          <span className="font-bold text-lg block" style={{ color: C.gold }}>340</span>
          <span className="text-[10px]" style={{ color: C.taupe }}>Punkty</span>
        </div>
        <div className="p-3 rounded-xl text-center" style={{ background: C.beige + "60" }}>
          <span className="font-bold text-lg block" style={{ color: C.dark }}>2</span>
          <span className="text-[10px]" style={{ color: C.taupe }}>Ulubione</span>
        </div>
      </div>

      <h4 className="font-semibold text-sm mb-2" style={{ color: C.dark }}>Najbliższa wizyta</h4>
      <div className="p-4 rounded-xl border mb-4" style={{ borderColor: C.rose + "30", background: `${C.rose}08` }}>
        <div className="flex items-center justify-between">
          <div>
            <span className="font-semibold text-sm" style={{ color: C.dark }}>Strzyżenie & Modelowanie</span>
            <p className="text-[10px]" style={{ color: C.taupe }}>Czw 25 mar • 14:30 • Anna Kowalska</p>
          </div>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: `${C.rose}20`, color: C.rose }}>Za 2 dni</span>
        </div>
      </div>

      <h4 className="font-semibold text-sm mb-2" style={{ color: C.dark }}>Historia wizyt</h4>
      <div className="space-y-2">
        {visits.map((v, i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-xl border" style={{ borderColor: C.beige, background: C.cream }}>
            <div className="flex-1">
              <span className="text-xs font-medium" style={{ color: C.dark }}>{v.service}</span>
              <p className="text-[10px]" style={{ color: C.taupe }}>{v.date} • {v.spec}</p>
            </div>
            <span className="font-semibold text-xs" style={{ color: C.rose }}>{v.price} zł</span>
            <CheckCircle2 className="w-3.5 h-3.5" style={{ color: C.gold }} />
          </div>
        ))}
      </div>

      <h4 className="font-semibold text-sm mt-4 mb-2" style={{ color: C.dark }}>Promocje dla Ciebie</h4>
      <div className="p-4 rounded-xl border" style={{ borderColor: C.gold + "30", background: `${C.gold}08` }}>
        <div className="flex items-center gap-2">
          <Gift className="w-5 h-5" style={{ color: C.gold }} />
          <div>
            <span className="text-xs font-semibold" style={{ color: C.dark }}>-15% na masaż relaksacyjny</span>
            <p className="text-[10px]" style={{ color: C.taupe }}>Ważne do 30 kwietnia 2026</p>
          </div>
        </div>
      </div>
    </DemoSection>
  );
}
