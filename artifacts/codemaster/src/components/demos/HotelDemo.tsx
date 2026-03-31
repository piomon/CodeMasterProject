import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PreviewShell, DemoNav, DemoSection, DemoFooterCTA, DemoBenefits } from "./PreviewShell";
import { Calendar, Star, Users, Wifi, Coffee, Car, Waves, MapPin, CheckCircle2, ChevronRight, Sun, Moon, Building2, CreditCard, Phone } from "lucide-react";

const C = { navy: "#1B2838", beige: "#F5E6D3", gold: "#C9B037", white: "#FFFFFF", stone: "#8C8C8C", dark: "#0D1B2A", cream: "#FFF8F0" };

const rooms = [
  { name: "Standard Plus", type: "Pokój", size: "28 m²", guests: 2, price: 380, amenities: ["WiFi", "TV", "Klimatyzacja"], icon: "🏨" },
  { name: "Suite Deluxe", type: "Apartament", size: "55 m²", guests: 3, price: 680, amenities: ["WiFi", "Jacuzzi", "Balkon", "Minibar"], icon: "🌊" },
  { name: "Penthouse Premium", type: "Penthouse", size: "90 m²", guests: 4, price: 1200, amenities: ["WiFi", "Taras", "Kuchnia", "Sauna"], icon: "👑" },
  { name: "Family Suite", type: "Rodzinny", size: "65 m²", guests: 5, price: 850, amenities: ["WiFi", "2 sypialnie", "Kącik dziecięcy"], icon: "👨‍👩‍👧‍👦" },
];

const packages = [
  { name: "Romantic Escape", desc: "2 noce + SPA + kolacja", price: 1490, features: ["Suite Deluxe", "Masaż dla dwojga", "Kolacja degustacyjna", "Late checkout"] },
  { name: "Wellness Weekend", desc: "3 noce + pełne SPA", price: 2190, features: ["Standard Plus", "Dostęp do strefy SPA", "3 zabiegi", "Śniadania"] },
];

const amenityIcons: Record<string, typeof Wifi> = { WiFi: Wifi, Śniadanie: Coffee, Parking: Car, SPA: Waves, Basen: Waves };

function WaterCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    let f = 0;
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(0, c.height);
        for (let x = 0; x <= c.width; x += 5) {
          const y = c.height * 0.6 + Math.sin(x * 0.01 + f * 0.02 + i * 1.5) * (15 - i * 3) + i * 20;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(c.width, c.height); ctx.closePath();
        ctx.fillStyle = `rgba(27,40,56,${0.04 + i * 0.02})`;
        ctx.fill();
      }
      f++;
      requestAnimationFrame(draw);
    };
    draw();
  }, []);
  return <canvas ref={ref} width={600} height={300} className="absolute inset-0 w-full h-full opacity-50" />;
}

export function HotelDemo({ name }: { name: string; features: string[] }) {
  const [page, setPage] = useState("home");
  const tabs = [
    { id: "home", label: "Hotel", icon: <Building2 className="w-3 h-3" /> },
    { id: "rooms", label: "Pokoje", icon: <Sun className="w-3 h-3" /> },
    { id: "booking", label: "Rezerwacja", icon: <Calendar className="w-3 h-3" /> },
    { id: "packages", label: "Pakiety", icon: <Star className="w-3 h-3" /> },
    { id: "spa", label: "SPA & Atrakcje", icon: <Waves className="w-3 h-3" /> },
    { id: "panel", label: "Panel", icon: <CreditCard className="w-3 h-3" /> },
  ];

  return (
    <PreviewShell title={name}>
      <DemoNav tabs={tabs} activeTab={page} onTabChange={setPage} logo="ResortHub" />
      <AnimatePresence mode="wait">
        <motion.div key={page} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
          {page === "home" && <HomePage onNav={setPage} />}
          {page === "rooms" && <RoomsPage onNav={setPage} />}
          {page === "booking" && <BookingPage />}
          {page === "packages" && <PackagesPage />}
          {page === "spa" && <SpaPage />}
          {page === "panel" && <PanelPage />}
        </motion.div>
      </AnimatePresence>
    </PreviewShell>
  );
}

function HomePage({ onNav }: { onNav: (p: string) => void }) {
  return (
    <div>
      <div className="relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${C.dark}, ${C.navy})` }}>
        <WaterCanvas />
        <div className="relative p-10 text-center">
          <p className="text-[10px] tracking-[0.4em] uppercase" style={{ color: C.gold }}>★★★★★ Hotel & SPA</p>
          <h1 className="font-display font-bold text-4xl mt-2" style={{ color: C.white }}>Resort<span style={{ color: C.gold }}>Hub</span></h1>
          <p className="text-xs mt-2 max-w-[260px] mx-auto leading-relaxed" style={{ color: C.white + "80" }}>Luksusowy wypoczynek nad morzem. Strefa SPA, prywatna plaża, wykwintna kuchnia — wszystko w jednym miejscu.</p>
          <div className="flex gap-3 justify-center mt-6">
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => onNav("rooms")}
              className="px-7 py-3.5 rounded-lg font-semibold text-sm inline-flex items-center gap-2 shadow-lg" style={{ background: `linear-gradient(135deg, ${C.gold}, #D4A017)`, color: C.dark }}>
              Rezerwuj pobyt <ChevronRight className="w-4 h-4" />
            </motion.button>
            <button onClick={() => onNav("packages")} className="px-7 py-3.5 rounded-lg font-semibold text-sm border" style={{ borderColor: C.gold + "40", color: C.gold }}>Pakiety</button>
          </div>
        </div>
      </div>
      <DemoSection>
        <div className="grid grid-cols-3 gap-2">
          {[
            { icon: "🌊", label: "Prywatna plaża", desc: "50m od hotelu" },
            { icon: "🧖", label: "Strefa SPA", desc: "Sauna & masaże" },
            { icon: "🍽️", label: "Restauracja", desc: "Fine dining" },
            { icon: "🏊", label: "Basen infinity", desc: "Podgrzewany" },
            { icon: "🅿️", label: "Parking", desc: "Gratis" },
            { icon: "📶", label: "WiFi", desc: "Premium" },
          ].map((f, i) => (
            <div key={i} className="p-2.5 rounded-xl text-center" style={{ background: C.beige }}>
              <span className="text-lg block">{f.icon}</span>
              <span className="text-[8px] font-bold block mt-0.5" style={{ color: C.navy }}>{f.label}</span>
              <span className="text-[7px]" style={{ color: C.stone }}>{f.desc}</span>
            </div>
          ))}
        </div>
        <h3 className="font-display font-bold text-base mt-4" style={{ color: C.navy }}>Polecane pokoje</h3>
        <div className="grid grid-cols-2 gap-3">
          {rooms.slice(0, 2).map((r, i) => (
            <motion.div key={i} whileHover={{ y: -3 }} onClick={() => onNav("rooms")}
              className="p-4 rounded-2xl border cursor-pointer" style={{ borderColor: C.beige, background: C.cream }}>
              <div className="w-full h-14 rounded-xl mb-2 flex items-center justify-center text-2xl" style={{ background: `linear-gradient(135deg, ${C.navy}10, ${C.gold}10)` }}>{r.icon}</div>
              <h4 className="font-bold text-sm" style={{ color: C.navy }}>{r.name}</h4>
              <p className="text-[10px]" style={{ color: C.stone }}>{r.size} • do {r.guests} os.</p>
              <p className="font-bold text-sm mt-1" style={{ color: C.gold }}>od {r.price} zł<span className="text-[10px] font-normal" style={{ color: C.stone }}>/noc</span></p>
            </motion.div>
          ))}
        </div>
        <div className="p-4 rounded-2xl mt-3" style={{ background: `${C.navy}08`, border: `1px solid ${C.gold}20` }}>
          <p className="text-[10px] tracking-[0.2em] uppercase text-center" style={{ color: C.gold }}>Opinie gości</p>
          <p className="text-xs mt-2 text-center italic" style={{ color: C.navy + "90" }}>"Magiczne miejsce! Suite Deluxe z widokiem na morze i niesamowite SPA. Na pewno wrócimy."</p>
          <p className="text-[10px] text-center mt-1" style={{ color: C.gold }}>— Anna i Piotr K. ★★★★★</p>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-3">
          {[{ v: "4.9", l: "Booking.com" },{ v: "15K+", l: "Gości/rok" },{ v: "2018", l: "Od roku" }].map((s, i) => (
            <div key={i} className="p-3 rounded-xl text-center" style={{ background: `${C.gold}08` }}>
              <span className="font-bold text-sm block" style={{ color: C.gold }}>{s.v}</span>
              <span className="text-[9px]" style={{ color: C.stone }}>{s.l}</span>
            </div>
          ))}
        </div>
        <h3 className="font-display font-bold text-base mt-4" style={{ color: C.navy }}>Pakiet specjalny</h3>
        {packages.slice(0, 1).map((p, i) => (
          <div key={i} className="p-4 rounded-2xl border" style={{ borderColor: C.gold + "30", background: `${C.gold}08` }}>
            <h4 className="font-bold text-sm" style={{ color: C.navy }}>{p.name}</h4>
            <p className="text-[10px]" style={{ color: C.stone }}>{p.desc}</p>
            <div className="flex items-center gap-2 mt-2 flex-wrap">{p.features.map((f, j) => <span key={j} className="px-2 py-0.5 rounded-full text-[9px]" style={{ background: C.beige, color: C.navy }}>{f}</span>)}</div>
            <p className="font-bold text-lg mt-2" style={{ color: C.gold }}>{p.price} zł</p>
          </div>
        ))}
      </DemoSection>
      <DemoBenefits accentColor={C.gold} bgColor={C.cream} textColor={C.navy} benefits={[
        { icon: "💰", title: "Bezpośrednia sprzedaż", desc: "Bez prowizji pośredników online" },
        { icon: "📊", title: "Kontrola obłożenia", desc: "Dashboard rezerwacji real-time" },
        { icon: "🏨", title: "Premium prezentacja", desc: "Galerie, pakiety, udogodnienia" },
        { icon: "⚡", title: "Wyższa konwersja", desc: "Sprawny booking flow z podsumowaniem" },
      ]} />
      <DemoFooterCTA accentColor={C.gold} bgColor={C.navy} />
    </div>
  );
}

function RoomsPage({ onNav }: { onNav: (p: string) => void }) {
  return (
    <DemoSection>
      <h3 className="font-display font-bold text-lg" style={{ color: C.navy }}>Dostępne pokoje</h3>
      <p className="text-xs" style={{ color: C.stone }}>15-22 lip 2026 • 7 nocy • 2 osoby</p>
      <div className="space-y-3 mt-3">
        {rooms.map((r, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="p-5 rounded-2xl border" style={{ borderColor: C.beige, background: C.cream }}>
            <div className="flex gap-4">
              <div className="w-20 h-20 rounded-xl flex items-center justify-center text-4xl shrink-0" style={{ background: `linear-gradient(135deg, ${C.navy}10, ${C.gold}10)` }}>{r.icon}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-base" style={{ color: C.navy }}>{r.name}</h4>
                  <span className="px-2 py-0.5 rounded text-[9px] font-medium" style={{ background: C.beige, color: C.stone }}>{r.type}</span>
                </div>
                <p className="text-xs mt-0.5" style={{ color: C.stone }}>{r.size} • do {r.guests} gości</p>
                <div className="flex gap-1.5 mt-2 flex-wrap">
                  {r.amenities.map((a, j) => (
                    <span key={j} className="px-2 py-0.5 rounded text-[9px]" style={{ background: C.navy + "10", color: C.navy }}>{a}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t" style={{ borderColor: C.beige }}>
              <div>
                <span className="font-bold text-xl" style={{ color: C.gold }}>{r.price} zł</span>
                <span className="text-xs" style={{ color: C.stone }}>/noc</span>
                <p className="text-[10px]" style={{ color: C.stone }}>Razem: {r.price * 7} zł za 7 nocy</p>
              </div>
              <motion.button whileHover={{ scale: 1.03 }} onClick={() => onNav("booking")}
                className="px-5 py-2.5 rounded-lg font-semibold text-sm" style={{ background: `linear-gradient(135deg, ${C.gold}, #D4A017)`, color: C.dark }}>Rezerwuj</motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </DemoSection>
  );
}

function BookingPage() {
  const [step, setStep] = useState(0);
  return (
    <DemoSection>
      {step === 0 && (
        <div className="space-y-3">
          <h3 className="font-display font-bold text-lg" style={{ color: C.navy }}>Rezerwacja: Suite Deluxe</h3>
          <div className="p-4 rounded-xl" style={{ background: C.beige + "60" }}>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><span className="text-[10px]" style={{ color: C.stone }}>Check-in</span><p className="font-semibold" style={{ color: C.navy }}>15 lip 2026, 15:00</p></div>
              <div><span className="text-[10px]" style={{ color: C.stone }}>Check-out</span><p className="font-semibold" style={{ color: C.navy }}>22 lip 2026, 11:00</p></div>
              <div><span className="text-[10px]" style={{ color: C.stone }}>Pokój</span><p className="font-semibold" style={{ color: C.navy }}>Suite Deluxe (55m²)</p></div>
              <div><span className="text-[10px]" style={{ color: C.stone }}>Goście</span><p className="font-semibold" style={{ color: C.navy }}>2 osoby</p></div>
            </div>
          </div>
          <h4 className="font-semibold text-sm" style={{ color: C.navy }}>Dodaj do pobytu:</h4>
          {["Śniadanie bufet (+120 zł/noc)", "Parking podziemny (+50 zł/noc)", "Late checkout 14:00 (+150 zł)", "Pakiet SPA dla dwojga (+400 zł)"].map((a, i) => (
            <label key={i} className="flex items-center gap-3 p-3 rounded-xl border cursor-pointer" style={{ borderColor: C.beige, background: C.cream }}>
              <input type="checkbox" className="w-4 h-4 accent-amber-600" defaultChecked={i === 0} />
              <span className="text-xs" style={{ color: C.navy }}>{a}</span>
            </label>
          ))}
          <div className="p-4 rounded-xl" style={{ background: C.beige + "60" }}>
            <div className="flex justify-between"><span style={{ color: C.stone }}>7 nocy × 680 zł</span><span className="font-semibold" style={{ color: C.navy }}>4 760 zł</span></div>
            <div className="flex justify-between mt-1"><span style={{ color: C.stone }}>Śniadanie × 7</span><span style={{ color: C.navy }}>840 zł</span></div>
            <div className="border-t mt-2 pt-2 flex justify-between" style={{ borderColor: C.beige }}>
              <span className="font-bold" style={{ color: C.navy }}>Razem</span><span className="font-bold text-xl" style={{ color: C.gold }}>5 600 zł</span>
            </div>
          </div>
          <motion.button whileHover={{ scale: 1.02 }} onClick={() => setStep(1)}
            className="w-full py-3.5 rounded-lg font-semibold text-sm" style={{ background: `linear-gradient(135deg, ${C.gold}, #D4A017)`, color: C.dark }}>Potwierdź rezerwację</motion.button>
        </div>
      )}
      {step === 1 && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
          <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: C.gold + "20" }}>
            <CheckCircle2 className="w-8 h-8" style={{ color: C.gold }} />
          </div>
          <h3 className="font-bold text-lg" style={{ color: C.navy }}>Rezerwacja potwierdzona!</h3>
          <p className="text-sm mt-1" style={{ color: C.stone }}>Suite Deluxe • 15-22 lip 2026</p>
          <p className="text-xs mt-2 font-medium" style={{ color: C.gold }}>Nr: RH-{Math.floor(Math.random()*9000+1000)}</p>
        </motion.div>
      )}
    </DemoSection>
  );
}

function PackagesPage() {
  return (
    <DemoSection>
      <h3 className="font-display font-bold text-lg" style={{ color: C.navy }}>Pakiety premium</h3>
      {packages.map((p, i) => (
        <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
          className="p-5 rounded-2xl border" style={{ borderColor: C.gold + "30", background: C.cream }}>
          <h4 className="font-bold text-base" style={{ color: C.navy }}>{p.name}</h4>
          <p className="text-xs" style={{ color: C.stone }}>{p.desc}</p>
          <div className="space-y-1.5 mt-3">
            {p.features.map((f, j) => (
              <div key={j} className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5" style={{ color: C.gold }} /><span className="text-xs" style={{ color: C.navy }}>{f}</span></div>
            ))}
          </div>
          <div className="flex items-center justify-between mt-4 pt-3 border-t" style={{ borderColor: C.beige }}>
            <span className="font-bold text-xl" style={{ color: C.gold }}>{p.price} zł</span>
            <motion.button whileHover={{ scale: 1.03 }} className="px-5 py-2 rounded-lg font-semibold text-sm" style={{ background: `linear-gradient(135deg, ${C.gold}, #D4A017)`, color: C.dark }}>Rezerwuj pakiet</motion.button>
          </div>
        </motion.div>
      ))}
    </DemoSection>
  );
}

function SpaPage() {
  const spa = [
    { name: "Masaż relaksacyjny", time: "60 min", price: 250, icon: "🧖" },
    { name: "Masaż gorącymi kamieniami", time: "75 min", price: 320, icon: "🪨" },
    { name: "Rytuał nawilżający", time: "90 min", price: 380, icon: "💧" },
    { name: "Sauna fińska", time: "wstęp", price: 80, icon: "🔥" },
    { name: "Basen + Jacuzzi", time: "wstęp", price: 60, icon: "🏊" },
  ];
  return (
    <DemoSection>
      <h3 className="font-display font-bold text-lg" style={{ color: C.navy }}>SPA & Wellness</h3>
      <p className="text-xs" style={{ color: C.stone }}>Strefa premium dostępna codziennie 8:00-21:00</p>
      <div className="space-y-2 mt-3">
        {spa.map((s, i) => (
          <div key={i} className="flex items-center gap-4 p-4 rounded-2xl border" style={{ borderColor: C.beige, background: C.cream }}>
            <span className="text-2xl">{s.icon}</span>
            <div className="flex-1">
              <h4 className="font-semibold text-sm" style={{ color: C.navy }}>{s.name}</h4>
              <span className="text-xs" style={{ color: C.stone }}>{s.time}</span>
            </div>
            <span className="font-bold text-sm" style={{ color: C.gold }}>{s.price} zł</span>
          </div>
        ))}
      </div>
    </DemoSection>
  );
}

function PanelPage() {
  const avail = [
    { room: "Standard Plus", total: 12, booked: 9, free: 3 },
    { room: "Suite Deluxe", total: 6, booked: 5, free: 1 },
    { room: "Penthouse Premium", total: 2, booked: 2, free: 0 },
    { room: "Family Suite", total: 4, booked: 2, free: 2 },
  ];
  return (
    <DemoSection>
      <h3 className="font-display font-bold text-lg" style={{ color: C.navy }}>Panel dostępności</h3>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[{ l: "Obłożenie", v: "85%" },{ l: "Rez. dziś", v: "6" },{ l: "Przychód/tydz", v: "48K zł" }].map((s, i) => (
          <div key={i} className="p-3 rounded-xl text-center" style={{ background: C.beige + "60" }}>
            <span className="font-bold text-base block" style={{ color: C.gold }}>{s.v}</span>
            <span className="text-[9px]" style={{ color: C.stone }}>{s.l}</span>
          </div>
        ))}
      </div>
      <div className="space-y-2">
        {avail.map((a, i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-xl border" style={{ borderColor: C.beige, background: C.cream }}>
            <div className="flex-1">
              <span className="text-sm font-medium" style={{ color: C.navy }}>{a.room}</span>
              <div className="w-full h-2 rounded-full mt-1.5" style={{ background: C.beige }}>
                <div className="h-full rounded-full" style={{ width: `${(a.booked / a.total) * 100}%`, background: a.free === 0 ? "#EF4444" : C.gold }} />
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold" style={{ color: a.free > 0 ? C.gold : "#EF4444" }}>{a.free} wolne</span>
              <p className="text-[10px]" style={{ color: C.stone }}>z {a.total}</p>
            </div>
          </div>
        ))}
      </div>
    </DemoSection>
  );
}
