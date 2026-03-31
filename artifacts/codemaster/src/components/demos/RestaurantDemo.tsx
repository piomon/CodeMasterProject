import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PreviewShell, DemoFooterCTA, DemoBenefits } from "./PreviewShell";
import { UtensilsCrossed, Star, Clock, ShoppingBag, Plus, Minus, CheckCircle2, MapPin, X, ChefHat, Phone, Timer, Flame } from "lucide-react";

const C = { cream: "#FFF8F0", olive: "#4A5D23", brick: "#C23616", gold: "#D4A017", dark: "#1C1917", warm: "#F5E6D3", stone: "#78716C", bg: "#FFFBF5" };

const cats = [
  { id: "popular", label: "🔥 Popularne", emoji: "🔥" },
  { id: "antipasti", label: "Antipasti", emoji: "🥗" },
  { id: "pasta", label: "Pasta", emoji: "🍝" },
  { id: "main", label: "Drugie dania", emoji: "🥩" },
  { id: "dolci", label: "Dolci", emoji: "🍰" },
  { id: "drinks", label: "Napoje", emoji: "🍷" },
];

const menu = [
  { name: "Bruschetta al Pomodoro", cat: "antipasti", price: 28, time: "10 min", desc: "Pieczony chleb, pomidory San Marzano, bazylia, oliwa extra vergine", allergens: "gluten", popular: true, spicy: false },
  { name: "Carpaccio di Manzo", cat: "antipasti", price: 42, time: "10 min", desc: "Cienkie plastry polędwicy, rukola, parmezan, oliwa truflowa", allergens: "laktoza", popular: true, spicy: false },
  { name: "Tagliatelle al Tartufo", cat: "pasta", price: 58, time: "20 min", desc: "Domowy makaron, masło truflowe, parmezan 24-miesięczny", allergens: "gluten, laktoza", popular: true, spicy: false },
  { name: "Spaghetti all'Arrabbiata", cat: "pasta", price: 38, time: "18 min", desc: "Pikantny sos pomidorowy, czosnek, peperoncino, natka", allergens: "gluten", popular: false, spicy: true },
  { name: "Risotto ai Funghi Porcini", cat: "main", price: 52, time: "22 min", desc: "Ryż arborio, borowiki, parmezan, masło, biały trufel", allergens: "laktoza", popular: true, spicy: false },
  { name: "Filetto di Manzo 300g", cat: "main", price: 98, time: "25 min", desc: "Polędwica wołowa, masło czosnkowe, szparagi grillowane", allergens: "", popular: true, spicy: false },
  { name: "Salmone alla Griglia", cat: "main", price: 72, time: "20 min", desc: "Norweski łosoś, sos cytrynowy, warzywa sezonowe", allergens: "ryby", popular: false, spicy: false },
  { name: "Tiramisù Classico", cat: "dolci", price: 32, time: "—", desc: "Mascarpone, biszkopty, espresso, kakao", allergens: "gluten, jaja", popular: true, spicy: false },
  { name: "Panna Cotta", cat: "dolci", price: 28, time: "—", desc: "Z coulis malinowym i miętą", allergens: "laktoza", popular: false, spicy: false },
  { name: "Aperol Spritz", cat: "drinks", price: 28, time: "—", desc: "Aperol, prosecco, woda gazowana, pomarańcza", allergens: "", popular: true, spicy: false },
];

type CartItem = { item: typeof menu[0]; qty: number };

export function RestaurantDemo({ name }: { name: string; features: string[] }) {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState<CartItem[]>([]);
  const cartCount = cart.reduce((a, c) => a + c.qty, 0);
  const cartTotal = cart.reduce((a, c) => a + c.item.price * c.qty, 0);

  const addToCart = (item: typeof menu[0]) => {
    setCart(prev => {
      const ex = prev.find(c => c.item.name === item.name);
      if (ex) return prev.map(c => c.item.name === item.name ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { item, qty: 1 }];
    });
  };

  return (
    <PreviewShell title={name}>
      <div style={{ background: C.bg, minHeight: 500 }}>
        <AnimatePresence mode="wait">
          <motion.div key={page} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {page === "home" && <HomePage onNav={setPage} addToCart={addToCart} />}
            {page === "menu" && <MenuPage addToCart={addToCart} onNav={setPage} cartCount={cartCount} />}
            {page === "cart" && <CartPage cart={cart} setCart={setCart} total={cartTotal} onNav={setPage} />}
            {page === "checkout" && <CheckoutPage total={cartTotal} onNav={setPage} />}
            {page === "tracking" && <TrackingPage />}
          </motion.div>
        </AnimatePresence>

        {page !== "home" && page !== "tracking" && (
          <div className="sticky bottom-0 flex items-center justify-around py-2 border-t" style={{ background: C.cream, borderColor: C.warm }}>
            {[
              { id: "home", label: "Start", icon: <UtensilsCrossed className="w-4 h-4" /> },
              { id: "menu", label: "Menu", icon: <ChefHat className="w-4 h-4" /> },
              { id: "cart", label: `Koszyk${cartCount ? ` (${cartCount})` : ""}`, icon: <ShoppingBag className="w-4 h-4" /> },
            ].map(n => (
              <button key={n.id} onClick={() => setPage(n.id)} className="flex flex-col items-center gap-0.5"
                style={{ color: page === n.id ? C.olive : C.stone }}>
                {n.icon}
                <span className="text-[9px] font-medium">{n.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
      <DemoBenefits accentColor={C.brick} bgColor={C.cream} textColor={C.dark} benefits={[
        { icon: "🚀", title: "Własny kanał sprzedaży", desc: "Zamówienia bez prowizji marketplace" },
        { icon: "📋", title: "Zero błędów w zamówieniach", desc: "Klient precyzyjnie wybiera online" },
        { icon: "⏰", title: "Szybsza obsługa", desc: "Automatyzacja od zamówienia do kuchni" },
        { icon: "📊", title: "Analityka sprzedaży", desc: "Raporty po daniach i godzinach" },
      ]} />
      <DemoFooterCTA accentColor={C.brick} bgColor={C.dark} />
    </PreviewShell>
  );
}

function HomePage({ onNav, addToCart }: { onNav: (p: string) => void; addToCart: (i: typeof menu[0]) => void }) {
  return (
    <div>
      <div className="relative" style={{ background: C.dark }}>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 30% 60%, #4A5D23 0%, transparent 50%), radial-gradient(circle at 70% 30%, #D4A017 0%, transparent 50%)" }} />
        <div className="relative px-5 pt-5 pb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="font-display text-3xl font-bold" style={{ color: C.cream }}>Trattoria</h1>
              <p className="text-[10px] tracking-[0.3em] uppercase mt-0.5" style={{ color: C.gold }}>Ristorante & Wine Bar</p>
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }}>
              {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-2.5 h-2.5" style={{ fill: C.gold, color: C.gold }} />)}
              <span className="text-[10px] ml-1" style={{ color: C.cream + "80" }}>4.8</span>
            </div>
          </div>
          <p className="text-sm leading-relaxed max-w-[300px]" style={{ color: C.cream + "90" }}>Autentyczna kuchnia włoska. Świeży makaron, najlepsze wina, <span style={{ color: C.gold }}>tradycja od 2009 roku.</span></p>
          <div className="flex gap-3 mt-5">
            <motion.button whileHover={{ scale: 1.03 }} onClick={() => onNav("menu")}
              className="px-6 py-3 rounded-xl font-bold text-sm inline-flex items-center gap-2" style={{ background: C.brick, color: C.cream }}>
              <ChefHat className="w-4 h-4" /> Zobacz menu
            </motion.button>
            <button className="px-6 py-3 rounded-xl font-semibold text-sm" style={{ background: "rgba(255,255,255,0.08)", color: C.cream, border: `1px solid ${C.cream}20` }}>📞 Rezerwuj</button>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-3">
        <div className="flex gap-2 overflow-x-auto pb-3">
          {[
            { icon: "🍝", label: "Domowy makaron" },
            { icon: "🍷", label: "100+ win" },
            { icon: "🚗", label: "Dostawa 30 min" },
            { icon: "👨‍🍳", label: "Chef z Neapolu" },
          ].map((f, i) => (
            <div key={i} className="shrink-0 px-3 py-2 rounded-xl flex items-center gap-2" style={{ background: C.cream, border: `1px solid ${C.warm}` }}>
              <span className="text-base">{f.icon}</span>
              <span className="text-[10px] font-semibold whitespace-nowrap" style={{ color: C.dark }}>{f.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 space-y-4 pb-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-sm flex items-center gap-1.5" style={{ color: C.dark }}><Flame className="w-4 h-4" style={{ color: C.brick }} />Najchętniej zamawiane</h3>
            <button onClick={() => onNav("menu")} className="text-[10px] font-semibold" style={{ color: C.olive }}>Pełne menu →</button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {menu.filter(m => m.popular).slice(0, 4).map((m, i) => (
              <motion.div key={i} whileHover={{ y: -3 }} className="shrink-0 w-[140px] rounded-2xl overflow-hidden" style={{ background: C.cream, border: `1px solid ${C.warm}` }}>
                <div className="h-16 flex items-center justify-center text-3xl" style={{ background: `linear-gradient(135deg, ${C.warm}60, ${C.cream})` }}>
                  {cats.find(c => c.id === m.cat)?.emoji || "🍽️"}
                </div>
                <div className="p-2.5">
                  <h4 className="text-[11px] font-bold leading-tight" style={{ color: C.dark }}>{m.name}</h4>
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="font-bold text-sm" style={{ color: C.brick }}>{m.price} zł</span>
                    <motion.button whileTap={{ scale: 0.9 }} onClick={() => addToCart(m)}
                      className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: C.olive, color: C.cream }}>
                      <Plus className="w-3.5 h-3.5" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="p-4 rounded-2xl" style={{ background: C.dark }}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] tracking-[0.2em] uppercase" style={{ color: C.gold }}>Opinia gościa</span>
          </div>
          <p className="text-xs italic leading-relaxed" style={{ color: C.cream + "90" }}>"Najlepsza carbonara w Warszawie. Czujesz się jak w małej trattori pod Neapolem."</p>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ background: C.olive, color: C.cream }}>MK</div>
            <div>
              <span className="text-[10px] font-semibold" style={{ color: C.cream }}>Maria K.</span>
              <div className="flex gap-0.5">{[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-2 h-2" style={{ fill: C.gold, color: C.gold }} />)}</div>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl" style={{ background: C.cream, border: `1px solid ${C.warm}` }}>
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4" style={{ color: C.olive }} />
            <span className="text-xs font-bold" style={{ color: C.dark }}>ul. Nowy Świat 42, Warszawa</span>
          </div>
          <div className="grid grid-cols-2 gap-1 text-[10px]" style={{ color: C.stone }}>
            <span>Pon-Czw: 12:00 – 22:00</span><span>Pt-Sob: 12:00 – 23:00</span>
            <span>Niedziela: 13:00 – 21:00</span><span>📞 +48 22 123 45 67</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function MenuPage({ addToCart, onNav, cartCount }: { addToCart: (i: typeof menu[0]) => void; onNav: (p: string) => void; cartCount: number }) {
  const [selCat, setSelCat] = useState("popular");
  const filtered = selCat === "popular" ? menu.filter(m => m.popular) : menu.filter(m => m.cat === selCat);

  return (
    <div>
      <div className="px-4 pt-3 pb-2 flex items-center justify-between" style={{ background: C.cream }}>
        <h2 className="font-display font-bold text-lg" style={{ color: C.dark }}>Menu</h2>
        {cartCount > 0 && (
          <motion.button whileHover={{ scale: 1.05 }} onClick={() => onNav("cart")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: C.olive, color: C.cream }}>
            <ShoppingBag className="w-3.5 h-3.5" /> {cartCount}
          </motion.button>
        )}
      </div>
      <div className="px-4 pb-2 flex gap-2 overflow-x-auto" style={{ background: C.cream }}>
        {cats.map(c => (
          <button key={c.id} onClick={() => setSelCat(c.id)}
            className="px-3 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all"
            style={selCat === c.id ? { background: C.olive, color: C.cream } : { background: C.warm, color: C.dark }}>{c.label}</button>
        ))}
      </div>
      <div className="px-4 py-3 space-y-2">
        {filtered.map((m, i) => (
          <motion.div key={m.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            className="p-3.5 rounded-xl flex gap-3" style={{ background: C.cream, border: `1px solid ${C.warm}` }}>
            <div className="flex-1">
              <div className="flex items-center gap-1.5">
                <h4 className="text-[12px] font-bold" style={{ color: C.dark }}>{m.name}</h4>
                {m.spicy && <Flame className="w-3 h-3" style={{ color: C.brick }} />}
              </div>
              <p className="text-[10px] mt-0.5 leading-relaxed" style={{ color: C.stone }}>{m.desc}</p>
              <div className="flex items-center gap-2 mt-1.5">
                {m.time !== "—" && <span className="text-[9px] flex items-center gap-0.5" style={{ color: C.stone }}><Clock className="w-2.5 h-2.5" /> {m.time}</span>}
                {m.allergens && <span className="text-[9px] px-1.5 py-0.5 rounded" style={{ background: C.warm, color: C.stone }}>⚠ {m.allergens}</span>}
              </div>
            </div>
            <div className="flex flex-col items-end justify-between">
              <span className="font-bold text-base" style={{ color: C.brick }}>{m.price} zł</span>
              <motion.button whileTap={{ scale: 0.9 }} onClick={() => addToCart(m)}
                className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: C.olive, color: C.cream }}>
                <Plus className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function CartPage({ cart, setCart, total, onNav }: { cart: CartItem[]; setCart: (c: CartItem[]) => void; total: number; onNav: (p: string) => void }) {
  if (cart.length === 0) {
    return (
      <div className="text-center py-16 px-4">
        <ShoppingBag className="w-12 h-12 mx-auto mb-3" style={{ color: C.stone + "40" }} />
        <p className="font-semibold" style={{ color: C.stone }}>Twój koszyk jest pusty</p>
        <button onClick={() => onNav("menu")} className="mt-4 px-5 py-2.5 rounded-xl text-sm font-bold text-white" style={{ background: C.olive }}>Przejdź do menu</button>
      </div>
    );
  }
  return (
    <div className="px-4 py-3 space-y-3">
      <h2 className="font-display font-bold text-lg" style={{ color: C.dark }}>Twój koszyk</h2>
      {cart.map((c, i) => (
        <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: C.cream, border: `1px solid ${C.warm}` }}>
          <div className="flex-1">
            <h4 className="text-xs font-bold" style={{ color: C.dark }}>{c.item.name}</h4>
            <span className="text-[10px]" style={{ color: C.stone }}>{c.item.price} zł</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button onClick={() => setCart(cart.map((cc, j) => j === i ? { ...cc, qty: Math.max(1, cc.qty - 1) } : cc))}
              className="w-6 h-6 rounded-full border flex items-center justify-center" style={{ borderColor: C.stone + "30" }}><Minus className="w-3 h-3" /></button>
            <span className="font-bold text-sm w-5 text-center">{c.qty}</span>
            <button onClick={() => setCart(cart.map((cc, j) => j === i ? { ...cc, qty: cc.qty + 1 } : cc))}
              className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: C.olive, color: C.cream }}><Plus className="w-3 h-3" /></button>
          </div>
          <span className="font-bold text-sm w-16 text-right" style={{ color: C.brick }}>{c.item.price * c.qty} zł</span>
          <button onClick={() => setCart(cart.filter((_, j) => j !== i))}><X className="w-4 h-4" style={{ color: C.stone }} /></button>
        </div>
      ))}
      <div className="p-4 rounded-xl" style={{ background: C.cream, border: `1px solid ${C.warm}` }}>
        <div className="flex justify-between text-sm"><span style={{ color: C.stone }}>Pozycje</span><span style={{ color: C.dark }}>{total} zł</span></div>
        <div className="flex justify-between text-sm mt-1"><span style={{ color: C.stone }}>Dostawa</span><span style={{ color: C.dark }}>8 zł</span></div>
        <div className="border-t mt-2 pt-2 flex justify-between" style={{ borderColor: C.warm }}>
          <span className="font-bold" style={{ color: C.dark }}>Razem</span>
          <span className="font-bold text-xl" style={{ color: C.brick }}>{total + 8} zł</span>
        </div>
      </div>
      <motion.button whileHover={{ scale: 1.02 }} onClick={() => onNav("checkout")}
        className="w-full py-3.5 rounded-xl font-bold text-sm text-white" style={{ background: C.olive }}>Zamów</motion.button>
    </div>
  );
}

function CheckoutPage({ total, onNav }: { total: number; onNav: (p: string) => void }) {
  const [orderType, setOrderType] = useState("delivery");
  const [confirmed, setConfirmed] = useState(false);

  if (confirmed) {
    return (
      <div className="text-center py-10 px-4">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
          <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: "#22C55E20" }}>
            <CheckCircle2 className="w-8 h-8" style={{ color: "#22C55E" }} />
          </div>
        </motion.div>
        <h3 className="font-bold text-lg" style={{ color: C.dark }}>Zamówienie złożone!</h3>
        <p className="text-sm mt-1" style={{ color: C.stone }}>Szacowany czas: 35-45 min</p>
        <p className="text-xs mt-2 font-mono font-bold" style={{ color: C.brick }}>TRA-{Math.floor(Math.random() * 9000 + 1000)}</p>
        <button onClick={() => onNav("tracking")} className="mt-4 px-6 py-2.5 rounded-xl text-sm font-bold text-white" style={{ background: C.olive }}>Śledź zamówienie</button>
      </div>
    );
  }

  return (
    <div className="px-4 py-3 space-y-3">
      <h2 className="font-display font-bold text-lg" style={{ color: C.dark }}>Zamówienie</h2>
      <div className="grid grid-cols-3 gap-2">
        {[["delivery", "🚗", "Dostawa"], ["pickup", "🏪", "Odbiór"], ["dine", "🍽️", "Na miejscu"]].map(([id, emoji, label]) => (
          <button key={id} onClick={() => setOrderType(id)}
            className="p-3 rounded-xl text-center" style={orderType === id ? { background: C.olive + "15", border: `2px solid ${C.olive}` } : { background: C.cream, border: `1px solid ${C.warm}` }}>
            <span className="text-lg block">{emoji}</span>
            <span className="text-[11px] font-semibold block mt-0.5" style={{ color: C.dark }}>{label}</span>
          </button>
        ))}
      </div>
      {orderType === "delivery" && <input placeholder="Adres dostawy" className="w-full px-4 py-3 rounded-xl border text-sm" style={{ borderColor: C.warm, background: C.cream, color: C.dark }} />}
      <input placeholder="Telefon kontaktowy" className="w-full px-4 py-3 rounded-xl border text-sm" style={{ borderColor: C.warm, background: C.cream, color: C.dark }} />
      <div className="p-3 rounded-xl" style={{ background: C.cream, border: `1px solid ${C.warm}` }}>
        <div className="flex justify-between"><span style={{ color: C.stone }}>Do zapłaty</span><span className="font-bold text-lg" style={{ color: C.brick }}>{total + (orderType === "delivery" ? 8 : 0)} zł</span></div>
      </div>
      <motion.button whileHover={{ scale: 1.02 }} onClick={() => setConfirmed(true)}
        className="w-full py-3.5 rounded-xl font-bold text-sm text-white" style={{ background: C.olive }}>Zamawiam i płacę</motion.button>
    </div>
  );
}

function TrackingPage() {
  const steps = [
    { label: "Zamówienie przyjęte", time: "14:32", done: true },
    { label: "Przygotowywane w kuchni", time: "14:38", done: true },
    { label: "Gotowe do wydania", time: "~15:00", done: false },
    { label: "Kurier w drodze", time: "~15:05", done: false },
    { label: "Dostarczone", time: "~15:20", done: false },
  ];
  return (
    <div className="px-4 py-3 space-y-3">
      <h2 className="font-display font-bold text-lg" style={{ color: C.dark }}>Status zamówienia</h2>
      <div className="p-4 rounded-xl" style={{ background: C.olive + "10", border: `1px solid ${C.olive}30` }}>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full animate-pulse" style={{ background: C.olive }} />
          <span className="text-sm font-bold" style={{ color: C.dark }}>Przygotowywane</span>
        </div>
        <p className="text-xs mt-1" style={{ color: C.stone }}>Szacowana dostawa: ~15:20</p>
      </div>
      <div className="pl-2 space-y-0">
        {steps.map((s, i) => (
          <div key={i} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 rounded-full flex items-center justify-center border-2"
                style={s.done ? { background: C.olive, borderColor: C.olive } : { borderColor: C.stone + "30", background: C.bg }}>
                {s.done && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
              </div>
              {i < steps.length - 1 && <div className="w-0.5 h-6" style={{ background: s.done ? C.olive + "50" : C.stone + "20" }} />}
            </div>
            <div className="pb-4">
              <span className="text-xs font-semibold" style={{ color: s.done ? C.dark : C.stone }}>{s.label}</span>
              <span className="text-[10px] ml-2" style={{ color: C.stone }}>{s.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
