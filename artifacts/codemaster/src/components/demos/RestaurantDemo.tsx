import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PreviewShell, DemoFooterCTA, DemoBenefits } from "./PreviewShell";
import { UtensilsCrossed, Clock, ShoppingBag, Plus, Minus, CheckCircle2, X, ChefHat, Bell, Flame, BarChart3, Settings, Package, ClipboardList, TrendingUp, Star, Eye } from "lucide-react";

const C = { red: "#E74C3C", dark: "#1A1A2E", card: "#16213E", sidebar: "#0F3460", accent: "#E94560", white: "#FFFFFF", gray: "#94A3B8", light: "#F1F5F9", cream: "#FFF8F0", navy: "#0F172A", olive: "#4A5D23", warm: "#F5E6D3" };

const liveOrders = [
  { id: "R-4521", items: ["Bruschetta x2", "Tagliatelle"], table: "Stolik 5", time: "3 min temu", total: 114, status: "new" as const },
  { id: "R-4520", items: ["Risotto", "Carpaccio"], table: "Stolik 8", time: "8 min temu", total: 94, status: "preparing" as const },
  { id: "R-4519", items: ["Filetto 300g", "Tiramisù"], table: "Dostawa", time: "12 min temu", total: 130, status: "preparing" as const },
  { id: "R-4518", items: ["Spaghetti Arrab.", "Panna Cotta", "Aperol x2"], table: "Stolik 2", time: "22 min temu", total: 122, status: "ready" as const },
  { id: "R-4517", items: ["Salmone", "Bruschetta"], table: "Stolik 12", time: "35 min temu", total: 100, status: "served" as const },
];

const menuItems = [
  { name: "Bruschetta al Pomodoro", cat: "Antipasti", price: 28, active: true, popular: true, desc: "Pieczony chleb, pomidory San Marzano, bazylia", emoji: "🥗", time: "10 min" },
  { name: "Carpaccio di Manzo", cat: "Antipasti", price: 42, active: true, popular: true, desc: "Cienkie plastry polędwicy, rukola, parmezan", emoji: "🥩", time: "10 min" },
  { name: "Tagliatelle al Tartufo", cat: "Pasta", price: 58, active: true, popular: true, desc: "Domowy makaron, masło truflowe, parmezan", emoji: "🍝", time: "20 min" },
  { name: "Spaghetti all'Arrabbiata", cat: "Pasta", price: 38, active: true, popular: false, desc: "Pikantny sos pomidorowy, czosnek, peperoncino", emoji: "🍝", time: "18 min" },
  { name: "Risotto ai Funghi Porcini", cat: "Drugie dania", price: 52, active: true, popular: true, desc: "Ryż arborio, borowiki, parmezan, masło", emoji: "🍚", time: "22 min" },
  { name: "Filetto di Manzo 300g", cat: "Drugie dania", price: 98, active: true, popular: true, desc: "Polędwica wołowa, masło czosnkowe, szparagi", emoji: "🥩", time: "25 min" },
  { name: "Salmone alla Griglia", cat: "Drugie dania", price: 72, active: true, popular: false, desc: "Norweski łosoś, sos cytrynowy, warzywa", emoji: "🐟", time: "20 min" },
  { name: "Tiramisù Classico", cat: "Dolci", price: 32, active: true, popular: true, desc: "Mascarpone, biszkopty, espresso, kakao", emoji: "🍰", time: "—" },
  { name: "Panna Cotta", cat: "Dolci", price: 28, active: true, popular: false, desc: "Z coulis malinowym i miętą", emoji: "🍮", time: "—" },
  { name: "Aperol Spritz", cat: "Napoje", price: 28, active: false, popular: true, desc: "Aperol, prosecco, woda gazowana, pomarańcza", emoji: "🍹", time: "—" },
];

type FreeTable = { id: number; seats: number; status: "free" };
type OccupiedTable = { id: number; seats: number; status: "occupied"; order: string };
type ReservedTable = { id: number; seats: number; status: "reserved"; time: string };
type TableRow = FreeTable | OccupiedTable | ReservedTable;

const tables: TableRow[] = [
  { id: 1, seats: 2, status: "free" }, { id: 2, seats: 4, status: "occupied", order: "R-4518" },
  { id: 3, seats: 2, status: "free" }, { id: 4, seats: 6, status: "reserved", time: "19:00" },
  { id: 5, seats: 4, status: "occupied", order: "R-4521" }, { id: 6, seats: 2, status: "free" },
  { id: 7, seats: 8, status: "reserved", time: "20:00" }, { id: 8, seats: 4, status: "occupied", order: "R-4520" },
  { id: 9, seats: 2, status: "free" }, { id: 10, seats: 4, status: "free" },
  { id: 11, seats: 6, status: "reserved", time: "19:30" }, { id: 12, seats: 4, status: "occupied", order: "R-4517" },
];

const cats = [
  { id: "popular", label: "🔥 Popularne" },
  { id: "Antipasti", label: "Antipasti" },
  { id: "Pasta", label: "Pasta" },
  { id: "Drugie dania", label: "Drugie dania" },
  { id: "Dolci", label: "Dolci" },
  { id: "Napoje", label: "Napoje" },
];

type CartItem = { item: typeof menuItems[0]; qty: number };

const topNav = [
  { id: "storefront", label: "Zamów online", icon: <ShoppingBag className="w-3.5 h-3.5" /> },
  { id: "orders", label: "Zamówienia", icon: <ClipboardList className="w-3.5 h-3.5" />, badge: 3 },
  { id: "menu", label: "Menu mgmt", icon: <UtensilsCrossed className="w-3.5 h-3.5" /> },
  { id: "tables", label: "Stoliki", icon: <Package className="w-3.5 h-3.5" /> },
  { id: "stats", label: "Statystyki", icon: <BarChart3 className="w-3.5 h-3.5" /> },
];

export function RestaurantDemo({ name }: { name: string; features: string[] }) {
  const [page, setPage] = useState("storefront");
  const [cart, setCart] = useState<CartItem[]>([]);
  const cartCount = cart.reduce((a, c) => a + c.qty, 0);
  const cartTotal = cart.reduce((a, c) => a + c.item.price * c.qty, 0);

  const addToCart = (item: typeof menuItems[0]) => {
    setCart(prev => {
      const ex = prev.find(c => c.item.name === item.name);
      if (ex) return prev.map(c => c.item.name === item.name ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { item, qty: 1 }];
    });
  };

  return (
    <PreviewShell title={name}>
      <div style={{ background: C.light, minHeight: 560 }}>
        <div className="px-4 py-2.5 flex items-center justify-between" style={{ background: C.dark }}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: C.red }}>
              <ChefHat className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-sm text-white">TastyAdmin</h1>
              <p className="text-[8px]" style={{ color: C.gray }}>Panel restauracji</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Bell className="w-4 h-4" style={{ color: C.gray }} />
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full flex items-center justify-center text-[7px] font-bold text-white" style={{ background: C.red }}>3</div>
            </div>
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-bold text-white" style={{ background: C.accent }}>MK</div>
          </div>
        </div>

        <div className="flex gap-0.5 px-3 py-1.5 overflow-x-auto" style={{ background: C.card }}>
          {topNav.map(t => (
            <button key={t.id} onClick={() => setPage(t.id)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-[10px] font-semibold whitespace-nowrap relative"
              style={page === t.id ? { background: C.red, color: C.white } : { color: C.gray }}>
              {t.icon} {t.label}
              {t.badge && <span className="ml-1 w-4 h-4 rounded-full text-[8px] font-bold flex items-center justify-center"
                style={page === t.id ? { background: "rgba(255,255,255,0.3)", color: C.white } : { background: C.red, color: C.white }}>{t.badge}</span>}
              {t.id === "storefront" && cartCount > 0 && <span className="ml-1 w-4 h-4 rounded-full text-[8px] font-bold flex items-center justify-center"
                style={{ background: C.olive, color: C.white }}>{cartCount}</span>}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={page} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            {page === "storefront" && <StorefrontPage addToCart={addToCart} cart={cart} setCart={setCart} cartCount={cartCount} cartTotal={cartTotal} onNav={setPage} />}
            {page === "orders" && <OrdersPage />}
            {page === "menu" && <MenuManagementPage />}
            {page === "tables" && <TablesPage />}
            {page === "stats" && <StatsPage />}
          </motion.div>
        </AnimatePresence>
      </div>
      <DemoBenefits accentColor={C.red} bgColor={C.cream} textColor={C.navy} benefits={[
        { icon: "🚀", title: "Własny kanał sprzedaży", desc: "Zamówienia bez prowizji marketplace" },
        { icon: "📋", title: "Zero błędów", desc: "Klient precyzyjnie wybiera online" },
        { icon: "⏰", title: "Szybsza obsługa", desc: "Automatyzacja od zamówienia do kuchni" },
        { icon: "📊", title: "Analityka sprzedaży", desc: "Raporty po daniach i godzinach" },
      ]} />
      <DemoFooterCTA accentColor={C.red} bgColor={C.dark} />
    </PreviewShell>
  );
}

function StorefrontPage({ addToCart, cart, setCart, cartCount, cartTotal, onNav }: {
  addToCart: (i: typeof menuItems[0]) => void;
  cart: CartItem[];
  setCart: (c: CartItem[]) => void;
  cartCount: number;
  cartTotal: number;
  onNav: (p: string) => void;
}) {
  const [selCat, setSelCat] = useState("popular");
  const [showCart, setShowCart] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const filtered = selCat === "popular" ? menuItems.filter(m => m.popular) : menuItems.filter(m => m.cat === selCat);

  if (confirmed) {
    return (
      <div className="text-center py-10 px-4" style={{ background: C.cream }}>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
          <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: "#22C55E20" }}>
            <CheckCircle2 className="w-8 h-8" style={{ color: "#22C55E" }} />
          </div>
        </motion.div>
        <h3 className="font-bold text-lg" style={{ color: C.navy }}>Zamówienie złożone!</h3>
        <p className="text-sm mt-1" style={{ color: C.gray }}>Szacowany czas: 35-45 min</p>
        <p className="text-xs mt-2 font-mono font-bold" style={{ color: C.red }}>TRA-{Math.floor(Math.random() * 9000 + 1000)}</p>
      </div>
    );
  }

  if (showCart) {
    return (
      <div className="px-4 py-3 space-y-3" style={{ background: C.cream }}>
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-base" style={{ color: C.navy }}>Twój koszyk</h2>
          <button onClick={() => setShowCart(false)} className="text-[10px] font-semibold" style={{ color: C.olive }}>← Menu</button>
        </div>
        {cart.length === 0 ? (
          <div className="text-center py-8">
            <ShoppingBag className="w-10 h-10 mx-auto mb-2" style={{ color: C.gray + "40" }} />
            <p className="text-sm" style={{ color: C.gray }}>Koszyk jest pusty</p>
          </div>
        ) : (
          <>
            {cart.map((c, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: C.white }}>
                <div className="flex-1">
                  <h4 className="text-xs font-bold" style={{ color: C.navy }}>{c.item.name}</h4>
                  <span className="text-[10px]" style={{ color: C.gray }}>{c.item.price} zł</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button onClick={() => setCart(cart.map((cc, j) => j === i ? { ...cc, qty: Math.max(1, cc.qty - 1) } : cc))}
                    className="w-6 h-6 rounded-full border flex items-center justify-center" style={{ borderColor: C.gray + "30" }}><Minus className="w-3 h-3" /></button>
                  <span className="font-bold text-sm w-5 text-center">{c.qty}</span>
                  <button onClick={() => setCart(cart.map((cc, j) => j === i ? { ...cc, qty: cc.qty + 1 } : cc))}
                    className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: C.olive, color: C.white }}><Plus className="w-3 h-3" /></button>
                </div>
                <span className="font-bold text-sm w-14 text-right" style={{ color: C.red }}>{c.item.price * c.qty} zł</span>
                <button onClick={() => setCart(cart.filter((_, j) => j !== i))}><X className="w-4 h-4" style={{ color: C.gray }} /></button>
              </div>
            ))}
            <div className="p-3 rounded-xl" style={{ background: C.white }}>
              <div className="flex justify-between text-sm"><span style={{ color: C.gray }}>Pozycje</span><span style={{ color: C.navy }}>{cartTotal} zł</span></div>
              <div className="flex justify-between text-sm mt-1"><span style={{ color: C.gray }}>Dostawa</span><span style={{ color: C.navy }}>8 zł</span></div>
              <div className="border-t mt-2 pt-2 flex justify-between" style={{ borderColor: C.warm }}>
                <span className="font-bold" style={{ color: C.navy }}>Razem</span>
                <span className="font-bold text-xl" style={{ color: C.red }}>{cartTotal + 8} zł</span>
              </div>
            </div>
            <motion.button whileHover={{ scale: 1.02 }} onClick={() => setConfirmed(true)}
              className="w-full py-3 rounded-xl font-bold text-sm text-white" style={{ background: C.olive }}>Zamawiam i płacę</motion.button>
          </>
        )}
      </div>
    );
  }

  return (
    <div style={{ background: C.cream }}>
      <div className="relative" style={{ background: C.navy, padding: "20px 16px" }}>
        <h2 className="font-bold text-lg text-white">Trattoria Bella</h2>
        <p className="text-[10px] mt-0.5" style={{ color: C.gray }}>Ristorante & Wine Bar • ⭐ 4.8</p>
        <div className="flex items-center gap-3 mt-2">
          {cartCount > 0 && (
            <motion.button whileTap={{ scale: 0.95 }} onClick={() => setShowCart(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold" style={{ background: C.olive, color: C.white }}>
              <ShoppingBag className="w-3 h-3" /> Koszyk ({cartCount}) • {cartTotal} zł
            </motion.button>
          )}
        </div>
      </div>
      <div className="px-4 py-2 flex gap-2 overflow-x-auto" style={{ background: C.cream }}>
        {cats.map(c => (
          <button key={c.id} onClick={() => setSelCat(c.id)}
            className="px-3 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap"
            style={selCat === c.id ? { background: C.olive, color: C.white } : { background: C.white, color: C.navy }}>{c.label}</button>
        ))}
      </div>
      <div className="px-4 py-2 space-y-2 pb-4">
        {filtered.filter(m => m.active).map((m, i) => (
          <motion.div key={m.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            className="p-3 rounded-xl flex gap-3" style={{ background: C.white }}>
            <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0" style={{ background: `${C.warm}80` }}>{m.emoji}</div>
            <div className="flex-1">
              <div className="flex items-center gap-1.5">
                <h4 className="text-[12px] font-bold" style={{ color: C.navy }}>{m.name}</h4>
                {m.popular && <Flame className="w-3 h-3" style={{ color: C.red }} />}
              </div>
              <p className="text-[10px] mt-0.5 leading-relaxed" style={{ color: C.gray }}>{m.desc}</p>
              {m.time !== "—" && <span className="text-[9px] flex items-center gap-0.5 mt-0.5" style={{ color: C.gray }}><Clock className="w-2.5 h-2.5" />{m.time}</span>}
            </div>
            <div className="flex flex-col items-end justify-between">
              <span className="font-bold text-base" style={{ color: C.red }}>{m.price} zł</span>
              <motion.button whileTap={{ scale: 0.9 }} onClick={() => addToCart(m)}
                className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: C.olive, color: C.white }}>
                <Plus className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function OrdersPage() {
  const statusColor = (s: string) =>
    s === "new" ? { bg: C.red + "15", color: C.red, label: "🔴 Nowe" }
    : s === "preparing" ? { bg: "#F59E0B20", color: "#F59E0B", label: "🟡 Przygotowywane" }
    : s === "ready" ? { bg: "#22C55E20", color: "#22C55E", label: "🟢 Gotowe" }
    : { bg: C.gray + "20", color: C.gray, label: "✅ Wydane" };

  return (
    <div className="p-3 space-y-2">
      <div className="grid grid-cols-4 gap-1.5">
        {[
          { label: "Nowe", count: 1, color: C.red },
          { label: "W trakcie", count: 2, color: "#F59E0B" },
          { label: "Gotowe", count: 1, color: "#22C55E" },
          { label: "Wydane", count: 1, color: C.gray },
        ].map((s, i) => (
          <div key={i} className="p-2 rounded-lg text-center" style={{ background: C.white, border: `2px solid ${s.color}20` }}>
            <span className="font-bold text-lg block" style={{ color: s.color }}>{s.count}</span>
            <span className="text-[9px]" style={{ color: C.gray }}>{s.label}</span>
          </div>
        ))}
      </div>
      <div className="space-y-1.5">
        {liveOrders.map((o, i) => {
          const sc = statusColor(o.status);
          return (
            <motion.div key={o.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
              className="p-3 rounded-xl" style={{ background: C.white, borderLeft: `3px solid ${sc.color}` }}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-[11px]" style={{ color: C.navy }}>{o.id}</span>
                  <span className="px-2 py-0.5 rounded-full text-[8px] font-bold" style={{ background: sc.bg, color: sc.color }}>{sc.label}</span>
                </div>
                <span className="text-[9px]" style={{ color: C.gray }}>{o.time}</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px]" style={{ color: C.gray }}>{o.items.join(" • ")}</p>
                  <span className="text-[10px] font-semibold mt-0.5 inline-flex items-center gap-1" style={{ color: C.navy }}>
                    {o.table.includes("Dostawa") ? "🚗" : "🍽️"} {o.table}
                  </span>
                </div>
                <span className="font-bold text-sm" style={{ color: C.red }}>{o.total} zł</span>
              </div>
              {o.status === "new" && (
                <div className="flex gap-2 mt-2">
                  <button className="flex-1 py-1.5 rounded-lg text-[10px] font-bold text-white" style={{ background: "#22C55E" }}>Przyjmij</button>
                  <button className="py-1.5 px-3 rounded-lg text-[10px] font-bold" style={{ background: C.light, color: C.red }}>Odrzuć</button>
                </div>
              )}
              {o.status === "preparing" && (
                <button className="w-full mt-2 py-1.5 rounded-lg text-[10px] font-bold text-white" style={{ background: "#22C55E" }}>Oznacz jako gotowe</button>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function MenuManagementPage() {
  const allCats = [...new Set(menuItems.map(m => m.cat))];
  const [selCat, setSelCat] = useState("all");
  const filtered = selCat === "all" ? menuItems : menuItems.filter(m => m.cat === selCat);

  return (
    <div className="p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold" style={{ color: C.navy }}>Zarządzanie menu ({menuItems.length})</span>
        <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-bold text-white" style={{ background: C.red }}>
          <Plus className="w-3 h-3" /> Dodaj danie
        </button>
      </div>
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        <button onClick={() => setSelCat("all")} className="px-2.5 py-1 rounded-full text-[10px] font-semibold whitespace-nowrap"
          style={selCat === "all" ? { background: C.red, color: C.white } : { background: C.white, color: C.gray }}>Wszystkie</button>
        {allCats.map(c => (
          <button key={c} onClick={() => setSelCat(c)} className="px-2.5 py-1 rounded-full text-[10px] font-semibold whitespace-nowrap"
            style={selCat === c ? { background: C.red, color: C.white } : { background: C.white, color: C.gray }}>{c}</button>
        ))}
      </div>
      <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${C.gray}20` }}>
        <table className="w-full text-[10px]">
          <thead>
            <tr style={{ background: C.dark }}>
              <th className="px-2.5 py-2 text-left text-white font-semibold">Danie</th>
              <th className="px-2.5 py-2 text-center text-white font-semibold">Cena</th>
              <th className="px-2.5 py-2 text-center text-white font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((m, i) => (
              <tr key={i} className="border-t" style={{ borderColor: C.gray + "15", background: C.white }}>
                <td className="px-2.5 py-2">
                  <span className="font-semibold" style={{ color: C.navy }}>{m.name}</span>
                  <span className="flex items-center gap-1 mt-0.5">
                    <span className="text-[9px]" style={{ color: C.gray }}>{m.cat}</span>
                    {m.popular && <Flame className="w-2.5 h-2.5" style={{ color: C.red }} />}
                  </span>
                </td>
                <td className="px-2.5 py-2 text-center font-bold" style={{ color: C.navy }}>{m.price} zł</td>
                <td className="px-2.5 py-2 text-center">
                  <span className="px-2 py-0.5 rounded-full text-[8px] font-bold" style={m.active ? { background: "#22C55E20", color: "#22C55E" } : { background: C.gray + "15", color: C.gray }}>
                    {m.active ? "Aktywne" : "Ukryte"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TablesPage() {
  const statusStyle = (s: string) =>
    s === "free" ? { bg: "#22C55E20", border: "#22C55E", label: "Wolny" }
    : s === "occupied" ? { bg: C.red + "15", border: C.red, label: "Zajęty" }
    : { bg: "#F59E0B20", border: "#F59E0B", label: "Rezerwacja" };

  return (
    <div className="p-3 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold" style={{ color: C.navy }}>Mapa stolików</span>
        <div className="flex gap-2">
          {["free", "occupied", "reserved"].map(s => {
            const st = statusStyle(s);
            return <span key={s} className="flex items-center gap-1 text-[9px]"><div className="w-2 h-2 rounded-full" style={{ background: st.border }} />{st.label}</span>;
          })}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {tables.map(t => {
          const st = statusStyle(t.status);
          return (
            <div key={t.id} className="p-2.5 rounded-xl text-center" style={{ background: st.bg, border: `2px solid ${st.border}40` }}>
              <span className="font-bold text-sm block" style={{ color: C.navy }}>#{t.id}</span>
              <span className="text-[9px]" style={{ color: C.gray }}>{t.seats} os.</span>
              {t.status === "occupied" && <span className="text-[8px] font-mono block mt-0.5" style={{ color: C.red }}>{t.order}</span>}
              {t.status === "reserved" && <span className="text-[8px] block mt-0.5" style={{ color: "#F59E0B" }}>{t.time}</span>}
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div className="p-2.5 rounded-lg text-center" style={{ background: C.white }}>
          <span className="font-bold text-lg block" style={{ color: "#22C55E" }}>5</span>
          <span className="text-[9px]" style={{ color: C.gray }}>Wolnych</span>
        </div>
        <div className="p-2.5 rounded-lg text-center" style={{ background: C.white }}>
          <span className="font-bold text-lg block" style={{ color: C.red }}>4</span>
          <span className="text-[9px]" style={{ color: C.gray }}>Zajętych</span>
        </div>
        <div className="p-2.5 rounded-lg text-center" style={{ background: C.white }}>
          <span className="font-bold text-lg block" style={{ color: "#F59E0B" }}>3</span>
          <span className="text-[9px]" style={{ color: C.gray }}>Rezerwacji</span>
        </div>
      </div>
    </div>
  );
}

function StatsPage() {
  const dailyRevenue = [2840, 3120, 2960, 3450, 3890, 4210, 3680];
  const maxR = Math.max(...dailyRevenue);
  return (
    <div className="p-3 space-y-3">
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Przychód dziś", value: "4 210 zł", change: "+12%", icon: <TrendingUp className="w-4 h-4" /> },
          { label: "Zamówienia", value: "47", change: "+8", icon: <ShoppingBag className="w-4 h-4" /> },
          { label: "Śr. rachunek", value: "89 zł", change: "+5 zł", icon: <BarChart3 className="w-4 h-4" /> },
        ].map((s, i) => (
          <div key={i} className="p-2.5 rounded-xl" style={{ background: C.white }}>
            <div className="mb-1" style={{ color: C.red }}>{s.icon}</div>
            <span className="font-bold text-sm block" style={{ color: C.navy }}>{s.value}</span>
            <span className="text-[9px]" style={{ color: C.gray }}>{s.label}</span>
            <span className="text-[9px] font-bold block" style={{ color: "#22C55E" }}>{s.change}</span>
          </div>
        ))}
      </div>
      <div className="p-3 rounded-xl" style={{ background: C.white }}>
        <span className="text-[10px] font-bold" style={{ color: C.navy }}>Przychód — ostatnie 7 dni</span>
        <div className="flex items-end gap-1.5 mt-3 h-20">
          {dailyRevenue.map((v, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-[8px] font-bold" style={{ color: C.navy }}>{(v / 1000).toFixed(1)}k</span>
              <div className="w-full rounded-t-sm" style={{ height: `${(v / maxR) * 100}%`, background: i === dailyRevenue.length - 1 ? C.red : C.red + "40" }} />
              <span className="text-[8px]" style={{ color: C.gray }}>{["Pn", "Wt", "Śr", "Cz", "Pt", "So", "Nd"][i]}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="p-3 rounded-xl" style={{ background: C.white }}>
        <span className="text-[10px] font-bold" style={{ color: C.navy }}>Najpopularniejsze dania</span>
        {[
          { name: "Tagliatelle al Tartufo", count: 24, pct: 100 },
          { name: "Filetto di Manzo", count: 18, pct: 75 },
          { name: "Risotto ai Funghi", count: 15, pct: 63 },
          { name: "Bruschetta", count: 12, pct: 50 },
        ].map((d, i) => (
          <div key={i} className="flex items-center gap-2 mt-2">
            <span className="text-[10px] w-28 truncate" style={{ color: C.navy }}>{d.name}</span>
            <div className="flex-1 h-1.5 rounded-full" style={{ background: C.light }}>
              <div className="h-full rounded-full" style={{ width: `${d.pct}%`, background: C.red }} />
            </div>
            <span className="text-[9px] font-bold w-8" style={{ color: C.navy }}>{d.count}x</span>
          </div>
        ))}
      </div>
    </div>
  );
}
