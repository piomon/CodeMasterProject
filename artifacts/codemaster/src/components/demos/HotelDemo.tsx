import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PreviewShell, DemoFooterCTA, DemoBenefits } from "./PreviewShell";
import { Calendar, Star, Users, Wifi, CheckCircle2, ChevronRight, Sun, Building2, CreditCard, Waves, MapPin, Phone } from "lucide-react";

const C = { navy: "#0F1D32", champagne: "#D4B896", gold: "#C9B037", white: "#FFFFFF", stone: "#8C8C8C", dark: "#0A1628", cream: "#FFF8F0", sky: "#1B2838" };

const rooms = [
  { name: "Standard Plus", type: "Pokój", size: "28 m²", guests: 2, price: 380, features: ["WiFi", "TV", "Klimatyzacja"], icon: "🏨", img: "linear-gradient(135deg, #2C3E50, #4CA1AF)" },
  { name: "Suite Deluxe", type: "Apartament", size: "55 m²", guests: 3, price: 680, features: ["WiFi", "Jacuzzi", "Balkon", "Minibar"], icon: "🌊", img: "linear-gradient(135deg, #1B2838, #D4B896)" },
  { name: "Penthouse Premium", type: "Penthouse", size: "90 m²", guests: 4, price: 1200, features: ["WiFi", "Taras", "Kuchnia", "Sauna"], icon: "👑", img: "linear-gradient(135deg, #0F1D32, #C9B037)" },
  { name: "Family Suite", type: "Rodzinny", size: "65 m²", guests: 5, price: 850, features: ["WiFi", "2 sypialnie", "Kącik dziecięcy"], icon: "👨‍👩‍👧‍👦", img: "linear-gradient(135deg, #1a3a4a, #48929B)" },
];

const spaItems = [
  { name: "Masaż relaksacyjny", time: "60 min", price: 250, icon: "🧖" },
  { name: "Masaż gorącymi kamieniami", time: "75 min", price: 320, icon: "🪨" },
  { name: "Rytuał nawilżający", time: "90 min", price: 380, icon: "💧" },
  { name: "Sauna fińska", time: "wstęp", price: 80, icon: "🔥" },
  { name: "Basen + Jacuzzi", time: "wstęp", price: 60, icon: "🏊" },
];

const packages = [
  { name: "Romantic Escape", desc: "2 noce + SPA + kolacja degustacyjna", price: 1490, features: ["Suite Deluxe", "Masaż dla dwojga", "Kolacja degustacyjna", "Late checkout"] },
  { name: "Wellness Weekend", desc: "3 noce + pełne SPA & wellness", price: 2190, features: ["Standard Plus", "Dostęp SPA", "3 zabiegi", "Śniadania bufet"] },
];

function WaterCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    let f = 0;
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      for (let i = 0; i < 3; i++) {
        ctx.beginPath(); ctx.moveTo(0, c.height);
        for (let x = 0; x <= c.width; x += 5) {
          const y = c.height * 0.6 + Math.sin(x * 0.01 + f * 0.02 + i * 1.5) * (15 - i * 3) + i * 20;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(c.width, c.height); ctx.closePath();
        ctx.fillStyle = `rgba(212,184,150,${0.03 + i * 0.015})`;
        ctx.fill();
      }
      f++; requestAnimationFrame(draw);
    };
    draw();
  }, []);
  return <canvas ref={ref} width={600} height={350} className="absolute inset-0 w-full h-full opacity-60" />;
}

export function HotelDemo({ name }: { name: string; features: string[] }) {
  const [page, setPage] = useState("home");
  const [selRoom, setSelRoom] = useState(-1);

  return (
    <PreviewShell title={name}>
      <div style={{ background: C.cream, minHeight: 500 }}>
        <AnimatePresence mode="wait">
          <motion.div key={page} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {page === "home" && <HomePage onNav={setPage} />}
            {page === "rooms" && <RoomsPage onNav={setPage} onSelect={setSelRoom} />}
            {page === "booking" && <BookingPage room={selRoom >= 0 ? rooms[selRoom] : rooms[1]} />}
            {page === "packages" && <PackagesPage />}
            {page === "spa" && <SpaPage />}
            {page === "availability" && <AvailabilityPage />}
          </motion.div>
        </AnimatePresence>

        {page !== "home" && (
          <div className="flex items-center justify-around py-2 border-t" style={{ borderColor: C.champagne + "40", background: C.white }}>
            {[
              { id: "home", icon: <Building2 className="w-4 h-4" />, label: "Hotel" },
              { id: "rooms", icon: <Sun className="w-4 h-4" />, label: "Pokoje" },
              { id: "packages", icon: <Star className="w-4 h-4" />, label: "Pakiety" },
              { id: "spa", icon: <Waves className="w-4 h-4" />, label: "SPA" },
              { id: "availability", icon: <Calendar className="w-4 h-4" />, label: "Panel" },
            ].map(n => (
              <button key={n.id} onClick={() => setPage(n.id)} className="flex flex-col items-center gap-0.5"
                style={{ color: page === n.id ? C.gold : C.stone }}>
                {n.icon}
                <span className="text-[8px] font-semibold">{n.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
      <DemoBenefits accentColor={C.gold} bgColor={C.cream} textColor={C.navy} benefits={[
        { icon: "💰", title: "Bezpośrednia sprzedaż", desc: "Bez prowizji booking.com i pośredników" },
        { icon: "📊", title: "Kontrola obłożenia", desc: "Dashboard rezerwacji w czasie rzeczywistym" },
        { icon: "🏨", title: "Premium prezentacja", desc: "Galerie pokojów, pakiety, atrakcje" },
        { icon: "⚡", title: "Wyższa konwersja", desc: "Sprawny booking flow z podsumowaniem" },
      ]} />
      <DemoFooterCTA accentColor={C.gold} bgColor={C.navy} />
    </PreviewShell>
  );
}

function HomePage({ onNav }: { onNav: (p: string) => void }) {
  return (
    <div>
      <div className="relative overflow-hidden" style={{ background: `linear-gradient(180deg, ${C.dark}, ${C.navy})` }}>
        <WaterCanvas />
        <div className="relative px-5 pt-8 pb-10">
          <p className="text-[10px] tracking-[0.4em] uppercase" style={{ color: C.gold }}>★★★★★ Hotel & SPA</p>
          <h1 className="font-display font-bold text-3xl mt-1" style={{ color: C.white }}>Resort<span style={{ color: C.champagne }}>Hub</span></h1>
          <p className="text-xs mt-2 max-w-[260px] leading-relaxed" style={{ color: C.white + "80" }}>Luksusowy wypoczynek nad morzem. Strefa SPA, prywatna plaża, wykwintna kuchnia.</p>
          <div className="flex gap-3 mt-5">
            <motion.button whileHover={{ scale: 1.03 }} onClick={() => onNav("rooms")}
              className="px-6 py-3 rounded-lg font-semibold text-sm inline-flex items-center gap-2 shadow-lg" style={{ background: `linear-gradient(135deg, ${C.gold}, #D4A017)`, color: C.dark }}>
              Rezerwuj pobyt <ChevronRight className="w-4 h-4" />
            </motion.button>
            <button onClick={() => onNav("packages")} className="px-6 py-3 rounded-lg font-semibold text-sm" style={{ border: `1px solid ${C.gold}40`, color: C.gold }}>Pakiety</button>
          </div>
        </div>

        <div className="relative -mb-8 mx-4">
          <div className="p-4 rounded-2xl" style={{ background: C.white, boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <span className="text-[9px] uppercase tracking-wider" style={{ color: C.stone }}>Check-in</span>
                <p className="font-bold text-xs mt-0.5" style={{ color: C.navy }}>15 lip 2026</p>
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-wider" style={{ color: C.stone }}>Check-out</span>
                <p className="font-bold text-xs mt-0.5" style={{ color: C.navy }}>22 lip 2026</p>
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-wider" style={{ color: C.stone }}>Goście</span>
                <p className="font-bold text-xs mt-0.5" style={{ color: C.navy }}>2 osoby</p>
              </div>
            </div>
            <motion.button whileHover={{ scale: 1.02 }} onClick={() => onNav("rooms")}
              className="w-full mt-3 py-2.5 rounded-lg font-semibold text-xs text-white" style={{ background: C.navy }}>Szukaj dostępnych pokoi</motion.button>
          </div>
        </div>
      </div>

      <div className="px-4 pt-12 pb-4 space-y-4">
        <div className="grid grid-cols-3 gap-2">
          {[
            { icon: "🌊", label: "Prywatna plaża" },
            { icon: "🧖", label: "Strefa SPA" },
            { icon: "🍽️", label: "Restauracja" },
            { icon: "🏊", label: "Basen infinity" },
            { icon: "🅿️", label: "Parking gratis" },
            { icon: "📶", label: "WiFi premium" },
          ].map((f, i) => (
            <div key={i} className="p-2.5 rounded-xl text-center" style={{ background: C.white, boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
              <span className="text-lg block">{f.icon}</span>
              <span className="text-[9px] font-semibold block mt-0.5" style={{ color: C.navy }}>{f.label}</span>
            </div>
          ))}
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-display font-bold text-sm" style={{ color: C.navy }}>Polecane pokoje</h3>
            <button onClick={() => onNav("rooms")} className="text-[10px] font-semibold" style={{ color: C.gold }}>Wszystkie →</button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {rooms.slice(0, 3).map((r, i) => (
              <motion.div key={i} whileHover={{ y: -3 }} onClick={() => onNav("rooms")}
                className="shrink-0 w-[160px] rounded-2xl overflow-hidden cursor-pointer" style={{ background: C.white, boxShadow: "0 2px 10px rgba(0,0,0,0.08)" }}>
                <div className="h-20 flex items-center justify-center text-3xl" style={{ background: r.img }}>{r.icon}</div>
                <div className="p-3">
                  <h4 className="font-bold text-xs" style={{ color: C.navy }}>{r.name}</h4>
                  <p className="text-[10px]" style={{ color: C.stone }}>{r.size} • do {r.guests} os.</p>
                  <p className="font-bold text-sm mt-1" style={{ color: C.gold }}>od {r.price} zł<span className="text-[10px] font-normal" style={{ color: C.stone }}>/noc</span></p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="p-4 rounded-2xl" style={{ background: C.navy }}>
          <p className="text-[10px] tracking-[0.2em] uppercase" style={{ color: C.champagne }}>Opinia gościa</p>
          <p className="text-xs mt-2 italic leading-relaxed" style={{ color: C.white + "90" }}>"Magiczne miejsce! Suite Deluxe z widokiem na morze i niesamowite SPA. Na pewno wrócimy."</p>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex">{[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-2.5 h-2.5" style={{ fill: C.gold, color: C.gold }} />)}</div>
            <span className="text-[10px]" style={{ color: C.champagne }}>— Anna i Piotr K.</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[{ v: "4.9", l: "Booking.com" }, { v: "15K+", l: "Gości/rok" }, { v: "2018", l: "Od roku" }].map((s, i) => (
            <div key={i} className="p-3 rounded-xl text-center" style={{ background: C.white, boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
              <span className="font-bold text-sm block" style={{ color: C.gold }}>{s.v}</span>
              <span className="text-[9px]" style={{ color: C.stone }}>{s.l}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RoomsPage({ onNav, onSelect }: { onNav: (p: string) => void; onSelect: (i: number) => void }) {
  return (
    <div className="px-4 py-3 space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="font-display font-bold text-lg" style={{ color: C.navy }}>Dostępne pokoje</h2>
        <span className="text-[10px]" style={{ color: C.stone }}>15-22 lip • 7 nocy</span>
      </div>
      {rooms.map((r, i) => (
        <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
          className="rounded-2xl overflow-hidden" style={{ background: C.white, boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}>
          <div className="h-20 flex items-center justify-center text-4xl relative" style={{ background: r.img }}>
            {r.icon}
            <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[9px] font-bold" style={{ background: "rgba(255,255,255,0.9)", color: C.navy }}>{r.type}</span>
          </div>
          <div className="p-4">
            <h4 className="font-bold text-base" style={{ color: C.navy }}>{r.name}</h4>
            <p className="text-xs" style={{ color: C.stone }}>{r.size} • do {r.guests} gości</p>
            <div className="flex gap-1.5 mt-2 flex-wrap">
              {r.features.map((f, j) => (
                <span key={j} className="px-2 py-0.5 rounded-full text-[9px] font-medium" style={{ background: C.cream, color: C.navy }}>{f}</span>
              ))}
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t" style={{ borderColor: C.cream }}>
              <div>
                <span className="font-bold text-xl" style={{ color: C.gold }}>{r.price} zł</span>
                <span className="text-xs" style={{ color: C.stone }}>/noc</span>
              </div>
              <motion.button whileHover={{ scale: 1.03 }} onClick={() => { onSelect(i); onNav("booking"); }}
                className="px-5 py-2 rounded-lg font-semibold text-sm text-white" style={{ background: `linear-gradient(135deg, ${C.gold}, #D4A017)` }}>Rezerwuj</motion.button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function BookingPage({ room }: { room: typeof rooms[0] }) {
  const [confirmed, setConfirmed] = useState(false);
  if (confirmed) {
    return (
      <div className="px-4 py-10 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
          <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: C.gold + "20" }}>
            <CheckCircle2 className="w-8 h-8" style={{ color: C.gold }} />
          </div>
        </motion.div>
        <h3 className="font-bold text-lg" style={{ color: C.navy }}>Rezerwacja potwierdzona!</h3>
        <p className="text-sm mt-1" style={{ color: C.stone }}>{room.name} • 15-22 lip 2026</p>
        <p className="font-mono font-bold text-sm mt-2" style={{ color: C.gold }}>RH-{Math.floor(Math.random() * 9000 + 1000)}</p>
      </div>
    );
  }
  return (
    <div className="px-4 py-3 space-y-3">
      <h2 className="font-display font-bold text-lg" style={{ color: C.navy }}>Rezerwacja: {room.name}</h2>
      <div className="p-4 rounded-xl" style={{ background: C.white, boxShadow: "0 1px 5px rgba(0,0,0,0.05)" }}>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div><span className="text-[10px]" style={{ color: C.stone }}>Check-in</span><p className="font-semibold" style={{ color: C.navy }}>15 lip 2026</p></div>
          <div><span className="text-[10px]" style={{ color: C.stone }}>Check-out</span><p className="font-semibold" style={{ color: C.navy }}>22 lip 2026</p></div>
        </div>
      </div>
      <div className="space-y-1.5">
        {["Śniadanie bufet (+120 zł/noc)", "Parking podziemny (+50 zł/noc)", "Late checkout 14:00 (+150 zł)", "Pakiet SPA (+400 zł)"].map((a, i) => (
          <label key={i} className="flex items-center gap-3 p-3 rounded-xl cursor-pointer" style={{ background: C.white }}>
            <input type="checkbox" className="w-4 h-4 accent-amber-600" defaultChecked={i === 0} />
            <span className="text-xs" style={{ color: C.navy }}>{a}</span>
          </label>
        ))}
      </div>
      <div className="p-4 rounded-xl" style={{ background: C.white }}>
        <div className="flex justify-between text-sm"><span style={{ color: C.stone }}>7 nocy × {room.price} zł</span><span className="font-semibold" style={{ color: C.navy }}>{room.price * 7} zł</span></div>
        <div className="flex justify-between text-sm mt-1"><span style={{ color: C.stone }}>Śniadanie × 7</span><span style={{ color: C.navy }}>840 zł</span></div>
        <div className="border-t mt-2 pt-2 flex justify-between" style={{ borderColor: C.cream }}>
          <span className="font-bold" style={{ color: C.navy }}>Razem</span><span className="font-bold text-xl" style={{ color: C.gold }}>{room.price * 7 + 840} zł</span>
        </div>
      </div>
      <motion.button whileHover={{ scale: 1.02 }} onClick={() => setConfirmed(true)}
        className="w-full py-3.5 rounded-lg font-semibold text-sm text-white" style={{ background: `linear-gradient(135deg, ${C.gold}, #D4A017)` }}>Potwierdź rezerwację</motion.button>
    </div>
  );
}

function PackagesPage() {
  return (
    <div className="px-4 py-3 space-y-3">
      <h2 className="font-display font-bold text-lg" style={{ color: C.navy }}>Pakiety premium</h2>
      {packages.map((p, i) => (
        <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
          className="p-5 rounded-2xl" style={{ background: C.white, boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}>
          <h4 className="font-bold text-base" style={{ color: C.navy }}>{p.name}</h4>
          <p className="text-xs" style={{ color: C.stone }}>{p.desc}</p>
          <div className="space-y-1.5 mt-3">
            {p.features.map((f, j) => (
              <div key={j} className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5" style={{ color: C.gold }} /><span className="text-xs" style={{ color: C.navy }}>{f}</span></div>
            ))}
          </div>
          <div className="flex items-center justify-between mt-4 pt-3 border-t" style={{ borderColor: C.cream }}>
            <span className="font-bold text-xl" style={{ color: C.gold }}>{p.price} zł</span>
            <button className="px-5 py-2 rounded-lg font-semibold text-sm text-white" style={{ background: `linear-gradient(135deg, ${C.gold}, #D4A017)` }}>Rezerwuj</button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function SpaPage() {
  return (
    <div className="px-4 py-3 space-y-2">
      <h2 className="font-display font-bold text-lg" style={{ color: C.navy }}>SPA & Wellness</h2>
      <p className="text-xs" style={{ color: C.stone }}>Codziennie 8:00-21:00</p>
      {spaItems.map((s, i) => (
        <div key={i} className="flex items-center gap-3 p-3.5 rounded-xl" style={{ background: C.white, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <span className="text-xl">{s.icon}</span>
          <div className="flex-1">
            <h4 className="text-xs font-semibold" style={{ color: C.navy }}>{s.name}</h4>
            <span className="text-[10px]" style={{ color: C.stone }}>{s.time}</span>
          </div>
          <span className="font-bold text-sm" style={{ color: C.gold }}>{s.price} zł</span>
        </div>
      ))}
    </div>
  );
}

function AvailabilityPage() {
  const avail = [
    { room: "Standard Plus", total: 12, booked: 9 },
    { room: "Suite Deluxe", total: 6, booked: 5 },
    { room: "Penthouse Premium", total: 2, booked: 2 },
    { room: "Family Suite", total: 4, booked: 2 },
  ];
  return (
    <div className="px-4 py-3 space-y-3">
      <h2 className="font-display font-bold text-lg" style={{ color: C.navy }}>Panel dostępności</h2>
      <div className="grid grid-cols-3 gap-2">
        {[{ l: "Obłożenie", v: "85%" }, { l: "Rez. dziś", v: "6" }, { l: "Przychód/tydz", v: "48K zł" }].map((s, i) => (
          <div key={i} className="p-3 rounded-xl text-center" style={{ background: C.white }}>
            <span className="font-bold text-base block" style={{ color: C.gold }}>{s.v}</span>
            <span className="text-[9px]" style={{ color: C.stone }}>{s.l}</span>
          </div>
        ))}
      </div>
      {avail.map((a, i) => {
        const free = a.total - a.booked;
        return (
          <div key={i} className="p-3 rounded-xl" style={{ background: C.white }}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold" style={{ color: C.navy }}>{a.room}</span>
              <span className="text-xs font-bold" style={{ color: free > 0 ? C.gold : "#EF4444" }}>{free} wolne z {a.total}</span>
            </div>
            <div className="w-full h-2 rounded-full" style={{ background: C.cream }}>
              <div className="h-full rounded-full" style={{ width: `${(a.booked / a.total) * 100}%`, background: free === 0 ? "#EF4444" : C.gold }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
