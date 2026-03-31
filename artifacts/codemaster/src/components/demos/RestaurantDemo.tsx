import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PreviewShell, DemoNav, DemoSection, DemoFooterCTA, DemoBenefits } from "./PreviewShell";
import { UtensilsCrossed, Star, Clock, ShoppingBag, ChevronRight, Plus, Minus, CheckCircle2, MapPin, Truck, Store, Timer, X, ChefHat } from "lucide-react";

const C = { green: "#2D5A27", cream: "#FFF8F0", olive: "#708238", brick: "#CB4335", gold: "#C9A96E", dark: "#1A1A1A", warm: "#F5E6D3" };

const cats = ["🔥 Popularne", "🥗 Przystawki", "🍝 Makarony", "🥩 Dania główne", "🍰 Desery", "🍷 Napoje"];
const menu = [
  { name: "Bruschetta z pomidorami", cat: 1, price: 28, time: "10 min", desc: "Pieczony chleb, pomidory, bazylia, oliwa", allergens: "gluten", popular: true },
  { name: "Carpaccio z polędwicy", cat: 1, price: 42, time: "10 min", desc: "Cienkie plastry wołowiny, rukola, parmezan", allergens: "laktoza", popular: true },
  { name: "Tagliatelle z truflą", cat: 2, price: 58, time: "20 min", desc: "Domowy makaron, masło truflowe, parmezan", allergens: "gluten, laktoza", popular: true },
  { name: "Spaghetti Carbonara", cat: 2, price: 44, time: "18 min", desc: "Klasyczna carbonara z guanciale i pecorino", allergens: "gluten, jaja", popular: false },
  { name: "Stek z polędwicy 300g", cat: 3, price: 98, time: "25 min", desc: "Polędwica wołowa, masło czosnkowe, warzywa", allergens: "", popular: true },
  { name: "Łosoś na grillu", cat: 3, price: 72, time: "20 min", desc: "Norweski łosoś, sos cytrynowy, szparagi", allergens: "ryby", popular: false },
  { name: "Risotto z grzybami", cat: 3, price: 52, time: "22 min", desc: "Ryż arborio, porcini, parmezan, masło", allergens: "laktoza", popular: false },
  { name: "Tiramisu", cat: 4, price: 32, time: "5 min", desc: "Klasyczne włoskie tiramisu z mascarpone", allergens: "gluten, jaja, laktoza", popular: true },
  { name: "Panna Cotta", cat: 4, price: 28, time: "5 min", desc: "Z sosem malinowym i miętą", allergens: "laktoza", popular: false },
  { name: "Espresso", cat: 5, price: 12, time: "3 min", desc: "Świeżo mielona kawa 100% arabica", allergens: "", popular: false },
];
const addons = [
  { name: "Extra ser", price: 5 }, { name: "Sos czosnkowy", price: 4 }, { name: "Ostra papryka", price: 3 },
];

export function RestaurantDemo({ name }: { name: string; features: string[] }) {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState<{ item: typeof menu[0]; qty: number; extras: string[] }[]>([]);
  const cartCount = cart.reduce((a, c) => a + c.qty, 0);
  const cartTotal = cart.reduce((a, c) => a + c.item.price * c.qty + c.extras.length * 4, 0);
  const tabs = [
    { id: "home", label: "Start", icon: <UtensilsCrossed className="w-3 h-3" /> },
    { id: "menu", label: "Menu", icon: <ChefHat className="w-3 h-3" /> },
    { id: "cart", label: `Koszyk (${cartCount})`, icon: <ShoppingBag className="w-3 h-3" /> },
    { id: "checkout", label: "Zamów", icon: <CheckCircle2 className="w-3 h-3" /> },
    { id: "tracking", label: "Status", icon: <Timer className="w-3 h-3" /> },
    { id: "panel", label: "Panel", icon: <Store className="w-3 h-3" /> },
  ];

  const addToCart = (item: typeof menu[0]) => {
    setCart(prev => {
      const ex = prev.find(c => c.item.name === item.name);
      if (ex) return prev.map(c => c.item.name === item.name ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { item, qty: 1, extras: [] }];
    });
  };

  return (
    <PreviewShell title={name}>
      <DemoNav tabs={tabs} activeTab={page} onTabChange={setPage} logo="Trattoria" />
      <AnimatePresence mode="wait">
        <motion.div key={page} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
          {page === "home" && <HomePage onNav={setPage} addToCart={addToCart} />}
          {page === "menu" && <MenuPage addToCart={addToCart} />}
          {page === "cart" && <CartPage cart={cart} setCart={setCart} total={cartTotal} onNav={setPage} />}
          {page === "checkout" && <CheckoutPage total={cartTotal} onNav={setPage} />}
          {page === "tracking" && <TrackingPage />}
          {page === "panel" && <PanelPage />}
        </motion.div>
      </AnimatePresence>
    </PreviewShell>
  );
}

function HomePage({ onNav, addToCart }: { onNav: (p: string) => void; addToCart: (i: typeof menu[0]) => void }) {
  return (
    <div>
      <div className="relative overflow-hidden p-10 text-center" style={{ background: `linear-gradient(160deg, ${C.dark}, ${C.green}90)` }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #C9A96E 0%, transparent 50%), radial-gradient(circle at 80% 20%, #708238 0%, transparent 50%)" }} />
        <div className="relative">
          <p className="text-[10px] tracking-[0.4em] uppercase" style={{ color: C.gold }}>Ristorante & Bar</p>
          <h1 className="font-display font-bold text-4xl mt-2" style={{ color: C.cream }}>Trattoria</h1>
          <p className="text-xs mt-2 leading-relaxed max-w-[260px] mx-auto" style={{ color: C.cream + "90" }}>Autentyczna kuchnia włoska w sercu Warszawy. Świeże składniki, domowy makaron, najlepsze wina.</p>
          <div className="flex items-center justify-center gap-1 mt-3">
            {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3" style={{ fill: C.gold, color: C.gold }} />)}
            <span className="text-[10px] ml-1" style={{ color: C.cream + "70" }}>4.8 (423 opinie)</span>
          </div>
          <div className="flex gap-3 justify-center mt-5">
            <motion.button whileHover={{ scale: 1.03 }} onClick={() => onNav("menu")}
              className="px-7 py-3 rounded-lg font-bold text-sm inline-flex items-center gap-2 shadow-lg" style={{ background: C.brick, color: "white" }}>
              <UtensilsCrossed className="w-4 h-4" /> Zamów online
            </motion.button>
            <button className="px-7 py-3 rounded-lg font-semibold text-sm border" style={{ borderColor: C.cream + "30", color: C.cream }}>Rezerwuj stolik</button>
          </div>
        </div>
      </div>
      <DemoSection>
        <div className="grid grid-cols-4 gap-2">
          {[
            { icon: "🍝", label: "Domowy makaron", desc: "Codziennie świeży" },
            { icon: "🍷", label: "100+ win", desc: "Włoska selekcja" },
            { icon: "🚗", label: "Dostawa", desc: "30 min max" },
            { icon: "👨‍🍳", label: "Szef kuchni", desc: "Z Neapolu" },
          ].map((f, i) => (
            <div key={i} className="p-3 rounded-xl text-center" style={{ background: C.warm }}>
              <span className="text-xl block">{f.icon}</span>
              <span className="text-[9px] font-bold block mt-1" style={{ color: C.dark }}>{f.label}</span>
              <span className="text-[8px]" style={{ color: C.dark + "70" }}>{f.desc}</span>
            </div>
          ))}
        </div>
        <h3 className="font-display font-bold text-base mt-4" style={{ color: C.dark }}>Nasze specjalności</h3>
        <div className="space-y-2">
          {menu.filter(m => m.popular).slice(0, 3).map((m, i) => (
            <motion.div key={i} whileHover={{ x: 2 }}
              className="flex items-center gap-3 p-3 rounded-xl border cursor-pointer" style={{ borderColor: C.warm, background: C.cream }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl" style={{ background: C.warm }}>{cats[m.cat][0]}</div>
              <div className="flex-1">
                <h4 className="font-semibold text-sm" style={{ color: C.dark }}>{m.name}</h4>
                <p className="text-[10px]" style={{ color: C.dark + "60" }}>{m.desc}</p>
              </div>
              <div className="text-right">
                <span className="font-bold text-sm" style={{ color: C.brick }}>{m.price} zł</span>
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => addToCart(m)}
                  className="block mt-1 w-7 h-7 rounded-full flex items-center justify-center" style={{ background: C.green, color: "white" }}>
                  <Plus className="w-3.5 h-3.5" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="p-4 rounded-2xl mt-3" style={{ background: C.dark, border: `1px solid ${C.gold}30` }}>
          <p className="text-[10px] tracking-[0.2em] uppercase text-center" style={{ color: C.gold }}>Opinie gości</p>
          <p className="text-xs mt-2 text-center italic" style={{ color: C.cream + "90" }}>"Najlepsza carbonara w Warszawie. Czujesz się jak we Włoszech!"</p>
          <p className="text-[10px] text-center mt-1" style={{ color: C.gold }}>— Maria K. ★★★★★</p>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-3">
          {[{ v: "4.8", l: "Google" },{ v: "12K+", l: "Gości/rok" },{ v: "15", l: "Lat tradycji" }].map((s, i) => (
            <div key={i} className="p-3 rounded-xl text-center" style={{ background: `${C.green}10` }}>
              <span className="font-bold text-base block" style={{ color: C.green }}>{s.v}</span>
              <span className="text-[9px]" style={{ color: C.dark + "70" }}>{s.l}</span>
            </div>
          ))}
        </div>
        <div className="p-4 rounded-xl mt-2" style={{ background: `linear-gradient(135deg, ${C.green}15, ${C.olive}10)` }}>
          <div className="flex items-center gap-2"><MapPin className="w-4 h-4" style={{ color: C.green }} /><span className="text-xs font-bold" style={{ color: C.dark }}>ul. Nowy Świat 42, Warszawa</span></div>
          <div className="grid grid-cols-2 gap-1 mt-2 text-[10px]" style={{ color: C.dark + "70" }}>
            <span>Pon-Czw: 12:00 – 22:00</span><span>Pt-Sob: 12:00 – 23:00</span>
            <span>Niedziela: 13:00 – 21:00</span><span>📞 +48 22 123 45 67</span>
          </div>
        </div>
      </DemoSection>
      <DemoBenefits accentColor={C.brick} bgColor={C.cream} textColor={C.dark} benefits={[
        { icon: "🚀", title: "Własny kanał sprzedaży", desc: "Bez prowizji marketplace i pośredników" },
        { icon: "📋", title: "Mniej błędów", desc: "Precyzyjne zamówienia online z dodatkami" },
        { icon: "⏰", title: "Szybsza obsługa", desc: "Automatyzacja od zamówienia do kuchni" },
        { icon: "📊", title: "Pełna analityka", desc: "Dane o sprzedaży, trendach i godzinach szczytu" },
      ]} />
      <DemoFooterCTA accentColor={C.brick} bgColor={C.dark} />
    </div>
  );
}

function MenuPage({ addToCart }: { addToCart: (i: typeof menu[0]) => void }) {
  const [selCat, setSelCat] = useState(0);
  const filtered = selCat === 0 ? menu.filter(m => m.popular) : menu.filter(m => m.cat === selCat);

  return (
    <DemoSection>
      <div className="sticky top-0 z-10 -mx-4 px-4 py-2" style={{ background: "var(--card)" }}>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {cats.map((c, i) => (
            <button key={i} onClick={() => setSelCat(i)} className="px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap"
              style={selCat === i ? { background: C.green, color: "white" } : { background: C.warm, color: C.dark }}>{c}</button>
          ))}
        </div>
      </div>
      <div className="space-y-2 mt-2">
        {filtered.map((m, i) => (
          <motion.div key={m.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            className="p-4 rounded-xl border" style={{ borderColor: C.warm, background: C.cream }}>
            <div className="flex gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-sm" style={{ color: C.dark }}>{m.name}</h4>
                  {m.popular && <span className="px-1.5 py-0.5 rounded text-[9px] font-bold text-white" style={{ background: C.brick }}>HIT</span>}
                </div>
                <p className="text-[10px] mt-0.5" style={{ color: C.dark + "70" }}>{m.desc}</p>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="text-[10px] flex items-center gap-0.5" style={{ color: C.dark + "50" }}><Clock className="w-3 h-3" />{m.time}</span>
                  {m.allergens && <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: C.warm, color: C.dark + "60" }}>⚠️ {m.allergens}</span>}
                </div>
              </div>
              <div className="text-right flex flex-col items-end">
                <span className="font-bold text-lg" style={{ color: C.brick }}>{m.price} zł</span>
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => addToCart(m)}
                  className="mt-1 w-8 h-8 rounded-full flex items-center justify-center" style={{ background: C.green, color: "white" }}>
                  <Plus className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </DemoSection>
  );
}

function CartPage({ cart, setCart, total, onNav }: { cart: { item: typeof menu[0]; qty: number; extras: string[] }[]; setCart: (c: typeof cart) => void; total: number; onNav: (p: string) => void }) {
  if (cart.length === 0) {
    return (
      <DemoSection>
        <div className="text-center py-12">
          <ShoppingBag className="w-12 h-12 mx-auto mb-3" style={{ color: C.dark + "30" }} />
          <p className="text-sm font-medium" style={{ color: C.dark + "60" }}>Koszyk jest pusty</p>
          <motion.button whileHover={{ scale: 1.02 }} onClick={() => onNav("menu")}
            className="mt-4 px-6 py-2.5 rounded-lg text-white text-sm font-semibold" style={{ background: C.green }}>Przejdź do menu</motion.button>
        </div>
      </DemoSection>
    );
  }

  return (
    <DemoSection>
      <h3 className="font-display font-bold text-lg" style={{ color: C.dark }}>Twój koszyk</h3>
      <div className="space-y-3">
        {cart.map((c, i) => (
          <div key={i} className="p-4 rounded-xl border" style={{ borderColor: C.warm, background: C.cream }}>
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <h4 className="font-semibold text-sm" style={{ color: C.dark }}>{c.item.name}</h4>
                <p className="text-[10px]" style={{ color: C.dark + "60" }}>{c.item.price} zł / szt.</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setCart(cart.map((cc, j) => j === i ? { ...cc, qty: Math.max(1, cc.qty - 1) } : cc))}
                  className="w-7 h-7 rounded-full border flex items-center justify-center" style={{ borderColor: C.dark + "20" }}><Minus className="w-3 h-3" /></button>
                <span className="font-bold text-sm w-6 text-center" style={{ color: C.dark }}>{c.qty}</span>
                <button onClick={() => setCart(cart.map((cc, j) => j === i ? { ...cc, qty: cc.qty + 1 } : cc))}
                  className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: C.green, color: "white" }}><Plus className="w-3 h-3" /></button>
              </div>
              <span className="font-bold text-sm w-16 text-right" style={{ color: C.brick }}>{c.item.price * c.qty} zł</span>
              <button onClick={() => setCart(cart.filter((_, j) => j !== i))}><X className="w-4 h-4" style={{ color: C.dark + "40" }} /></button>
            </div>
            <div className="flex gap-1 mt-2">
              {addons.map((a, j) => (
                <button key={j} onClick={() => {
                  setCart(cart.map((cc, k) => k === i ? { ...cc, extras: cc.extras.includes(a.name) ? cc.extras.filter(e => e !== a.name) : [...cc.extras, a.name] } : cc));
                }}
                  className="px-2 py-0.5 rounded text-[9px] font-medium border"
                  style={c.extras.includes(a.name) ? { background: C.green, color: "white", borderColor: C.green } : { borderColor: C.dark + "20", color: C.dark + "60" }}>
                  +{a.name} ({a.price} zł)
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <textarea placeholder="Uwagi do zamówienia..." rows={2} className="w-full px-4 py-3 rounded-xl border text-sm resize-none" style={{ borderColor: C.warm, background: C.cream, color: C.dark }} />
      <div className="p-4 rounded-xl space-y-2" style={{ background: C.warm }}>
        <div className="flex justify-between text-sm"><span style={{ color: C.dark + "70" }}>Pozycje</span><span style={{ color: C.dark }}>{total} zł</span></div>
        <div className="flex justify-between text-sm"><span style={{ color: C.dark + "70" }}>Dostawa</span><span style={{ color: C.dark }}>8 zł</span></div>
        <div className="border-t pt-2" style={{ borderColor: C.dark + "15" }}>
          <div className="flex justify-between"><span className="font-bold" style={{ color: C.dark }}>Razem</span><span className="font-bold text-xl" style={{ color: C.brick }}>{total + 8} zł</span></div>
        </div>
      </div>
      <motion.button whileHover={{ scale: 1.02 }} onClick={() => onNav("checkout")}
        className="w-full py-3.5 rounded-xl text-white font-semibold text-sm" style={{ background: C.green }}>Przejdź do zamówienia</motion.button>
    </DemoSection>
  );
}

function CheckoutPage({ total, onNav }: { total: number; onNav: (p: string) => void }) {
  const [orderType, setOrderType] = useState<"delivery" | "pickup" | "dine">("delivery");
  const [confirmed, setConfirmed] = useState(false);

  if (confirmed) {
    return (
      <DemoSection>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
          <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: C.green + "20" }}>
            <CheckCircle2 className="w-8 h-8" style={{ color: C.green }} />
          </div>
          <h3 className="font-bold text-lg" style={{ color: C.dark }}>Zamówienie złożone!</h3>
          <p className="text-sm mt-1" style={{ color: C.dark + "70" }}>Szacowany czas: 35-45 min</p>
          <p className="text-xs mt-2 font-medium" style={{ color: C.brick }}>Nr: TRA-{Math.floor(Math.random()*9000+1000)}</p>
          <motion.button whileHover={{ scale: 1.02 }} onClick={() => onNav("tracking")}
            className="mt-4 px-6 py-2.5 rounded-lg text-white text-sm font-semibold" style={{ background: C.green }}>Śledź zamówienie</motion.button>
        </motion.div>
      </DemoSection>
    );
  }

  return (
    <DemoSection>
      <h3 className="font-display font-bold text-lg" style={{ color: C.dark }}>Typ zamówienia</h3>
      <div className="grid grid-cols-3 gap-2">
        {([["delivery", "🚗 Dostawa", "30-45 min"], ["pickup", "🏪 Odbiór", "20-30 min"], ["dine", "🍽️ Na miejscu", "~15 min"]] as const).map(([id, label, time]) => (
          <button key={id} onClick={() => setOrderType(id as typeof orderType)}
            className="p-3 rounded-xl border text-center"
            style={orderType === id ? { borderColor: C.green, background: C.green + "10" } : { borderColor: C.warm, background: C.cream }}>
            <span className="text-lg block">{label.split(" ")[0]}</span>
            <span className="text-xs font-medium block" style={{ color: C.dark }}>{label.split(" ").slice(1).join(" ")}</span>
            <span className="text-[10px]" style={{ color: C.dark + "50" }}>{time}</span>
          </button>
        ))}
      </div>
      {orderType === "delivery" && (
        <input placeholder="Adres dostawy" className="w-full px-4 py-3 rounded-xl border text-sm" style={{ borderColor: C.warm, background: C.cream, color: C.dark }} />
      )}
      {orderType === "pickup" && (
        <div className="p-3 rounded-xl" style={{ background: C.warm }}>
          <p className="text-xs" style={{ color: C.dark }}>Odbiór: <b>ul. Nowy Świat 42</b></p>
          <p className="text-[10px]" style={{ color: C.dark + "60" }}>Wybierz czas odbioru:</p>
          <div className="flex gap-2 mt-2">
            {["15:00", "15:30", "16:00", "16:30"].map(t => (
              <button key={t} className="px-3 py-1.5 rounded-lg text-xs font-medium" style={{ background: C.cream, color: C.dark }}>{t}</button>
            ))}
          </div>
        </div>
      )}
      <input placeholder="Telefon" className="w-full px-4 py-3 rounded-xl border text-sm" style={{ borderColor: C.warm, background: C.cream, color: C.dark }} />
      <div className="p-4 rounded-xl" style={{ background: C.warm }}>
        <div className="flex justify-between text-sm"><span style={{ color: C.dark + "70" }}>Razem</span><span className="font-bold text-lg" style={{ color: C.brick }}>{total + (orderType === "delivery" ? 8 : 0)} zł</span></div>
      </div>
      <motion.button whileHover={{ scale: 1.02 }} onClick={() => setConfirmed(true)}
        className="w-full py-3.5 rounded-xl text-white font-semibold text-sm" style={{ background: C.green }}>Zamów i zapłać</motion.button>
    </DemoSection>
  );
}

function TrackingPage() {
  const steps = [
    { label: "Zamówienie przyjęte", time: "14:32", done: true },
    { label: "Przygotowywanie", time: "14:35", done: true },
    { label: "Gotowe do odbioru", time: "~14:55", done: false },
    { label: "W drodze", time: "~15:05", done: false },
    { label: "Dostarczone", time: "~15:15", done: false },
  ];
  return (
    <DemoSection>
      <h3 className="font-display font-bold text-lg" style={{ color: C.dark }}>Status zamówienia</h3>
      <div className="p-4 rounded-xl border mb-4" style={{ borderColor: C.green + "30", background: C.green + "08" }}>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full animate-pulse" style={{ background: C.green }} />
          <span className="text-sm font-semibold" style={{ color: C.dark }}>Przygotowywane</span>
        </div>
        <p className="text-xs mt-1" style={{ color: C.dark + "60" }}>Szacowany czas dostawy: 15:15</p>
      </div>
      <div className="space-y-0">
        {steps.map((s, i) => (
          <div key={i} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 rounded-full flex items-center justify-center border-2"
                style={s.done ? { background: C.green, borderColor: C.green } : { borderColor: C.dark + "20" }}>
                {s.done && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
              </div>
              {i < steps.length - 1 && <div className="w-0.5 h-8" style={{ background: s.done ? C.green : C.dark + "15" }} />}
            </div>
            <div className="pb-6">
              <span className="text-sm font-medium" style={{ color: s.done ? C.dark : C.dark + "50" }}>{s.label}</span>
              <span className="text-[10px] ml-2" style={{ color: C.dark + "40" }}>{s.time}</span>
            </div>
          </div>
        ))}
      </div>
    </DemoSection>
  );
}

function PanelPage() {
  const orders = [
    { id: "#142", items: "Bruschetta, Stek", total: 126, status: "preparing", time: "14:32" },
    { id: "#141", items: "Carbonara x2", total: 88, status: "ready", time: "14:18" },
    { id: "#140", items: "Tagliatelle, Tiramisu", total: 90, status: "delivered", time: "13:45" },
    { id: "#139", items: "Łosoś, Espresso x2", total: 96, status: "delivered", time: "13:20" },
  ];
  const st: Record<string, { label: string; color: string }> = { preparing: { label: "Przygotowywane", color: "#F59E0B" }, ready: { label: "Gotowe", color: C.green }, delivered: { label: "Dostarczone", color: C.dark + "50" } };
  return (
    <DemoSection>
      <h3 className="font-display font-bold text-lg" style={{ color: C.dark }}>Panel zamówień</h3>
      <div className="grid grid-cols-4 gap-2">
        {[{ l: "Dziś", v: "28" },{ l: "Przychód", v: "3240zł" },{ l: "Oczekujące", v: "4" },{ l: "Średni czas", v: "32min" }].map((s, i) => (
          <div key={i} className="p-3 rounded-xl text-center" style={{ background: C.warm }}>
            <span className="font-bold text-base block" style={{ color: C.brick }}>{s.v}</span>
            <span className="text-[9px]" style={{ color: C.dark + "60" }}>{s.l}</span>
          </div>
        ))}
      </div>
      <div className="space-y-2 mt-3">
        {orders.map((o, i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-xl border" style={{ borderColor: C.warm, background: C.cream }}>
            <span className="font-mono font-bold text-xs" style={{ color: C.dark }}>{o.id}</span>
            <div className="flex-1">
              <span className="text-xs" style={{ color: C.dark }}>{o.items}</span>
              <span className="text-[10px] block" style={{ color: C.dark + "50" }}>{o.time}</span>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: st[o.status].color + "20", color: st[o.status].color }}>{st[o.status].label}</span>
            <span className="font-bold text-xs" style={{ color: C.brick }}>{o.total}zł</span>
          </div>
        ))}
      </div>
    </DemoSection>
  );
}
