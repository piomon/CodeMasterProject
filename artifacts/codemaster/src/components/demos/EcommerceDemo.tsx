import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PreviewShell, DemoNav, DemoSection } from "./PreviewShell";
import { ShoppingCart, Star, Heart, CreditCard, Truck, Package, ChevronRight, Plus, Minus, X, CheckCircle2, Shield, Gift, User, Search } from "lucide-react";

const C = { black: "#0A0A0A", cream: "#FFF8F0", gold: "#C9A96E", taupe: "#8B7D6B", graphite: "#2D2D2D", dark: "#1A1A1A", beige: "#F5E6D3" };

const products = [
  { name: "Skórzana torba Premium", price: 890, oldPrice: 1190, cat: "Torby", rating: 4.9, reviews: 156, icon: "👜", badge: "Bestseller" },
  { name: "Zegarek Minimal Gold", price: 1450, oldPrice: 0, cat: "Zegarki", rating: 5.0, reviews: 89, icon: "⌚", badge: "Nowość" },
  { name: "Portfel skórzany slim", price: 340, oldPrice: 420, cat: "Akcesoria", rating: 4.8, reviews: 234, icon: "💼", badge: "" },
  { name: "Okulary Classic Edition", price: 560, oldPrice: 0, cat: "Okulary", rating: 4.7, reviews: 67, icon: "🕶️", badge: "" },
  { name: "Pasek premium leather", price: 280, oldPrice: 350, cat: "Akcesoria", rating: 4.9, reviews: 198, icon: "🪢", badge: "Bestseller" },
  { name: "Bransoletka Gold Chain", price: 720, oldPrice: 890, cat: "Biżuteria", rating: 4.8, reviews: 112, icon: "💫", badge: "-19%" },
];

const categories = ["Wszystkie", "Torby", "Zegarki", "Akcesoria", "Okulary", "Biżuteria"];

export function EcommerceDemo({ name }: { name: string; features: string[] }) {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState<{ product: typeof products[0]; qty: number }[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const cartCount = cart.reduce((a, c) => a + c.qty, 0);
  const cartTotal = cart.reduce((a, c) => a + c.product.price * c.qty, 0);

  const addToCart = (p: typeof products[0]) => {
    setCart(prev => {
      const ex = prev.find(c => c.product.name === p.name);
      if (ex) return prev.map(c => c.product.name === p.name ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { product: p, qty: 1 }];
    });
  };

  const toggleWish = (name: string) => setWishlist(prev => prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]);

  const tabs = [
    { id: "home", label: "Sklep", icon: <Package className="w-3 h-3" /> },
    { id: "catalog", label: "Katalog", icon: <Search className="w-3 h-3" /> },
    { id: "cart", label: `Koszyk (${cartCount})`, icon: <ShoppingCart className="w-3 h-3" /> },
    { id: "checkout", label: "Zamów", icon: <CreditCard className="w-3 h-3" /> },
    { id: "account", label: "Konto", icon: <User className="w-3 h-3" /> },
  ];

  return (
    <PreviewShell title={name}>
      <DemoNav tabs={tabs} activeTab={page} onTabChange={setPage} logo="LUXE" />
      <AnimatePresence mode="wait">
        <motion.div key={page} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
          {page === "home" && <HomePage addToCart={addToCart} toggleWish={toggleWish} wishlist={wishlist} onNav={setPage} />}
          {page === "catalog" && <CatalogPage addToCart={addToCart} toggleWish={toggleWish} wishlist={wishlist} />}
          {page === "cart" && <CartPage cart={cart} setCart={setCart} total={cartTotal} onNav={setPage} />}
          {page === "checkout" && <CheckoutPage total={cartTotal} />}
          {page === "account" && <AccountPage />}
        </motion.div>
      </AnimatePresence>
    </PreviewShell>
  );
}

function HomePage({ addToCart, toggleWish, wishlist, onNav }: any) {
  return (
    <div>
      <div className="p-10 text-center" style={{ background: `linear-gradient(160deg, ${C.black}, ${C.graphite})` }}>
        <p className="text-[10px] tracking-[0.4em] uppercase" style={{ color: C.gold }}>Premium Accessories</p>
        <h1 className="font-display font-bold text-4xl mt-2" style={{ color: C.cream }}>LUXE</h1>
        <p className="text-xs mt-2 max-w-[260px] mx-auto leading-relaxed" style={{ color: C.cream + "80" }}>Ekskluzywne akcesoria i biżuteria. Skóra najwyższej jakości, ponadczasowy design, bezpłatna dostawa.</p>
        <div className="flex gap-3 justify-center mt-6">
          <motion.button whileHover={{ scale: 1.03 }} onClick={() => onNav("catalog")}
            className="px-7 py-3.5 rounded-lg font-semibold text-sm shadow-lg" style={{ background: C.gold, color: C.black }}>Odkryj kolekcję</motion.button>
          <button onClick={() => onNav("cart")} className="px-7 py-3.5 rounded-lg font-semibold text-sm border" style={{ borderColor: C.gold + "40", color: C.gold }}>Koszyk</button>
        </div>
      </div>
      <DemoSection>
        <div className="grid grid-cols-4 gap-2">
          {[
            { icon: "👜", label: "Skóra", desc: "Włoska" },
            { icon: "🚚", label: "Dostawa", desc: "Gratis od 500" },
            { icon: "🎁", label: "Pakowanie", desc: "Na prezent" },
            { icon: "↩️", label: "Zwroty", desc: "30 dni" },
          ].map((f, i) => (
            <div key={i} className="p-3 rounded-xl text-center" style={{ background: C.beige }}>
              <span className="text-lg block">{f.icon}</span>
              <span className="text-[8px] font-bold block mt-1" style={{ color: C.dark }}>{f.label}</span>
              <span className="text-[7px]" style={{ color: C.taupe }}>{f.desc}</span>
            </div>
          ))}
        </div>
        <h3 className="font-bold text-sm tracking-wider uppercase mt-4" style={{ color: C.gold }}>Bestsellery</h3>
        <div className="grid grid-cols-2 gap-3">
          {products.slice(0, 4).map((p, i) => (
            <motion.div key={i} whileHover={{ y: -3 }} className="rounded-2xl border overflow-hidden" style={{ borderColor: C.beige, background: C.cream }}>
              <div className="h-20 flex items-center justify-center text-3xl relative" style={{ background: `linear-gradient(135deg, ${C.beige}80, ${C.cream})` }}>
                {p.badge && <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded text-[8px] font-bold text-white" style={{ background: C.gold }}>{p.badge}</span>}
                <button onClick={() => toggleWish(p.name)} className="absolute top-2 right-2">
                  <Heart className="w-3.5 h-3.5" style={{ fill: wishlist.includes(p.name) ? C.gold : "transparent", color: wishlist.includes(p.name) ? C.gold : C.taupe }} />
                </button>
                {p.icon}
              </div>
              <div className="p-2.5">
                <h4 className="text-[10px] font-semibold" style={{ color: C.dark }}>{p.name}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-bold text-sm" style={{ color: C.dark }}>{p.price} zł</span>
                  {p.oldPrice > 0 && <span className="text-[10px] line-through" style={{ color: C.taupe }}>{p.oldPrice} zł</span>}
                </div>
                <motion.button whileHover={{ scale: 1.05 }} onClick={() => addToCart(p)}
                  className="w-full mt-1.5 py-1.5 rounded-lg text-[10px] font-bold" style={{ background: C.dark, color: C.cream }}>Do koszyka</motion.button>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="p-4 rounded-2xl mt-3" style={{ background: C.dark, border: `1px solid ${C.gold}25` }}>
          <p className="text-[10px] tracking-[0.2em] uppercase text-center" style={{ color: C.gold }}>Opinie klientów</p>
          <p className="text-xs mt-2 text-center italic" style={{ color: C.cream + "90" }}>"Torba Premium jest absolutnie piękna. Skóra najwyższej jakości, świetne wykończenie."</p>
          <p className="text-[10px] text-center mt-1" style={{ color: C.gold }}>— Anna K. ★★★★★</p>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-3">
          {[{ v: "10K+", l: "Klientów" },{ v: "4.9", l: "Ocena" },{ v: "98%", l: "Poleca" }].map((s, i) => (
            <div key={i} className="p-3 rounded-xl text-center" style={{ background: `${C.gold}08` }}>
              <span className="font-bold text-sm block" style={{ color: C.gold }}>{s.v}</span>
              <span className="text-[9px]" style={{ color: C.taupe }}>{s.l}</span>
            </div>
          ))}
        </div>
      </DemoSection>
      <DemoBenefits accentColor={C.gold} bgColor={C.black} textColor={C.cream} benefits={[
        { icon: "🛒", title: "Wyższa konwersja", desc: "Premium checkout bez zbędnych kroków" },
        { icon: "📦", title: "Pełny lejek", desc: "Od storytellingu do finalizacji" },
        { icon: "⭐", title: "Social proof", desc: "Opinie klientów budują zaufanie" },
        { icon: "📊", title: "Konta klientów", desc: "Historia zamówień i retencja" },
      ]} />
      <DemoFooterCTA accentColor={C.gold} bgColor={C.black} />
    </div>
  );
}

function CatalogPage({ addToCart, toggleWish, wishlist }: any) {
  const [selCat, setSelCat] = useState("Wszystkie");
  const filtered = selCat === "Wszystkie" ? products : products.filter(p => p.cat === selCat);
  return (
    <DemoSection>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map(c => (
          <button key={c} onClick={() => setSelCat(c)} className="px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap"
            style={selCat === c ? { background: C.dark, color: C.cream } : { background: C.beige, color: C.taupe }}>{c}</button>
        ))}
      </div>
      <div className="space-y-3 mt-2">
        {filtered.map((p, i) => (
          <motion.div key={p.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            className="flex gap-4 p-4 rounded-2xl border" style={{ borderColor: C.beige, background: C.cream }}>
            <div className="w-20 h-20 rounded-xl flex items-center justify-center text-3xl shrink-0" style={{ background: C.beige }}>
              {p.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-sm" style={{ color: C.dark }}>{p.name}</h4>
                {p.badge && <span className="px-1.5 py-0.5 rounded text-[8px] font-bold text-white" style={{ background: C.gold }}>{p.badge}</span>}
              </div>
              <p className="text-[10px]" style={{ color: C.taupe }}>{p.cat}</p>
              <div className="flex items-center gap-1 mt-0.5"><Star className="w-3 h-3" style={{ fill: C.gold, color: C.gold }} /><span className="text-[10px]">{p.rating} ({p.reviews})</span></div>
              <div className="flex items-center gap-3 mt-2">
                <span className="font-bold text-base" style={{ color: C.dark }}>{p.price} zł</span>
                {p.oldPrice > 0 && <span className="text-xs line-through" style={{ color: C.taupe }}>{p.oldPrice} zł</span>}
              </div>
            </div>
            <div className="flex flex-col gap-2 items-center">
              <button onClick={() => toggleWish(p.name)}>
                <Heart className="w-5 h-5" style={{ fill: wishlist.includes(p.name) ? C.gold : "transparent", color: wishlist.includes(p.name) ? C.gold : C.taupe }} />
              </button>
              <motion.button whileHover={{ scale: 1.1 }} onClick={() => addToCart(p)}
                className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: C.dark, color: C.cream }}>
                <Plus className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </DemoSection>
  );
}

function CartPage({ cart, setCart, total, onNav }: any) {
  if (cart.length === 0) {
    return (
      <DemoSection>
        <div className="text-center py-12">
          <ShoppingCart className="w-12 h-12 mx-auto mb-3" style={{ color: C.taupe + "40" }} />
          <p className="font-medium" style={{ color: C.taupe }}>Koszyk jest pusty</p>
        </div>
      </DemoSection>
    );
  }
  return (
    <DemoSection>
      <h3 className="font-bold text-sm tracking-wider uppercase" style={{ color: C.gold }}>Koszyk</h3>
      {cart.map((c: any, i: number) => (
        <div key={i} className="flex items-center gap-3 p-3 rounded-xl border" style={{ borderColor: C.beige, background: C.cream }}>
          <span className="text-2xl">{c.product.icon}</span>
          <div className="flex-1">
            <h4 className="text-xs font-semibold" style={{ color: C.dark }}>{c.product.name}</h4>
            <span className="text-[10px]" style={{ color: C.taupe }}>{c.product.price} zł</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setCart(cart.map((cc: any, j: number) => j === i ? { ...cc, qty: Math.max(1, cc.qty - 1) } : cc))}
              className="w-6 h-6 rounded-full border flex items-center justify-center" style={{ borderColor: C.taupe + "30" }}><Minus className="w-3 h-3" /></button>
            <span className="font-bold text-sm w-5 text-center">{c.qty}</span>
            <button onClick={() => setCart(cart.map((cc: any, j: number) => j === i ? { ...cc, qty: cc.qty + 1 } : cc))}
              className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: C.dark, color: C.cream }}><Plus className="w-3 h-3" /></button>
          </div>
          <span className="font-bold text-sm w-16 text-right" style={{ color: C.dark }}>{c.product.price * c.qty} zł</span>
          <button onClick={() => setCart(cart.filter((_: any, j: number) => j !== i))}><X className="w-4 h-4" style={{ color: C.taupe }} /></button>
        </div>
      ))}
      <div className="p-4 rounded-xl mt-2" style={{ background: C.beige }}>
        <div className="flex justify-between text-sm"><span style={{ color: C.taupe }}>Produkty</span><span style={{ color: C.dark }}>{total} zł</span></div>
        <div className="flex justify-between text-sm"><span style={{ color: C.taupe }}>Dostawa</span><span style={{ color: total >= 500 ? "#10B981" : C.dark }}>{total >= 500 ? "Gratis" : "29 zł"}</span></div>
        <div className="border-t mt-2 pt-2 flex justify-between" style={{ borderColor: C.taupe + "20" }}>
          <span className="font-bold" style={{ color: C.dark }}>Razem</span><span className="font-bold text-xl" style={{ color: C.gold }}>{total + (total >= 500 ? 0 : 29)} zł</span>
        </div>
      </div>
      <h4 className="text-xs font-bold mt-3" style={{ color: C.dark }}>Może Cię zainteresować</h4>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {products.slice(3, 6).map((p, i) => (
          <div key={i} className="min-w-[120px] p-3 rounded-xl border text-center" style={{ borderColor: C.beige, background: C.cream }}>
            <span className="text-2xl block">{p.icon}</span>
            <p className="text-[10px] font-medium mt-1" style={{ color: C.dark }}>{p.name}</p>
            <p className="text-[10px] font-bold" style={{ color: C.gold }}>{p.price} zł</p>
          </div>
        ))}
      </div>
      <motion.button whileHover={{ scale: 1.02 }} onClick={() => onNav("checkout")}
        className="w-full py-3.5 rounded-xl font-bold text-sm" style={{ background: C.dark, color: C.cream }}>Przejdź do kasy</motion.button>
    </DemoSection>
  );
}

function CheckoutPage({ total }: { total: number }) {
  const [confirmed, setConfirmed] = useState(false);
  if (confirmed) {
    return (
      <DemoSection>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
          <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: C.gold + "20" }}>
            <CheckCircle2 className="w-8 h-8" style={{ color: C.gold }} />
          </div>
          <h3 className="font-bold text-lg" style={{ color: C.dark }}>Zamówienie złożone!</h3>
          <p className="text-sm mt-1" style={{ color: C.taupe }}>Otrzymasz potwierdzenie e-mailem</p>
          <p className="text-xs font-bold mt-2" style={{ color: C.gold }}>Nr: LUX-{Math.floor(Math.random()*9000+1000)}</p>
          <div className="mt-4 p-3 rounded-xl border text-left" style={{ borderColor: C.beige }}>
            <div className="flex items-center gap-2"><Truck className="w-4 h-4" style={{ color: C.gold }} /><span className="text-xs" style={{ color: C.dark }}>Szacowana dostawa: 2-3 dni robocze</span></div>
          </div>
        </motion.div>
      </DemoSection>
    );
  }
  return (
    <DemoSection>
      <h3 className="font-bold text-sm tracking-wider uppercase" style={{ color: C.gold }}>Finalizacja zamówienia</h3>
      <input placeholder="Imię i nazwisko" className="w-full px-4 py-3 rounded-xl border text-sm" style={{ borderColor: C.beige, background: C.cream, color: C.dark }} />
      <input placeholder="E-mail" className="w-full px-4 py-3 rounded-xl border text-sm" style={{ borderColor: C.beige, background: C.cream, color: C.dark }} />
      <input placeholder="Adres dostawy" className="w-full px-4 py-3 rounded-xl border text-sm" style={{ borderColor: C.beige, background: C.cream, color: C.dark }} />
      <h4 className="text-xs font-semibold mt-2" style={{ color: C.dark }}>Metoda płatności</h4>
      <div className="grid grid-cols-3 gap-2">
        {["💳 Karta", "🏦 Przelew", "📱 BLIK"].map((m, i) => (
          <button key={m} className="p-3 rounded-xl border text-center text-xs font-medium"
            style={i === 0 ? { borderColor: C.gold, background: C.gold + "10", color: C.dark } : { borderColor: C.beige, background: C.cream, color: C.taupe }}>{m}</button>
        ))}
      </div>
      <div className="p-3 rounded-xl flex items-center gap-2" style={{ background: C.gold + "08" }}>
        <Shield className="w-4 h-4" style={{ color: C.gold }} />
        <span className="text-[10px]" style={{ color: C.taupe }}>Bezpieczna płatność z szyfrowaniem SSL</span>
      </div>
      <motion.button whileHover={{ scale: 1.02 }} onClick={() => setConfirmed(true)}
        className="w-full py-3.5 rounded-xl font-bold text-sm" style={{ background: C.gold, color: C.black }}>Zapłać {total + (total >= 500 ? 0 : 29)} zł</motion.button>
    </DemoSection>
  );
}

function AccountPage() {
  const orders = [
    { id: "LUX-4821", date: "15 mar 2026", total: 1230, status: "Dostarczono" },
    { id: "LUX-4756", date: "2 mar 2026", total: 560, status: "Dostarczono" },
    { id: "LUX-4698", date: "18 lut 2026", total: 890, status: "Dostarczono" },
  ];
  return (
    <DemoSection>
      <div className="flex items-center gap-4 mb-4">
        <div className="w-14 h-14 rounded-full flex items-center justify-center font-bold" style={{ background: C.dark, color: C.gold }}>AK</div>
        <div>
          <h3 className="font-bold text-base" style={{ color: C.dark }}>Anna Kowalska</h3>
          <p className="text-xs" style={{ color: C.taupe }}>Klientka premium od 2024</p>
        </div>
        <span className="ml-auto px-2 py-1 rounded-full text-[10px] font-bold" style={{ background: C.gold + "20", color: C.gold }}>VIP</span>
      </div>
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="p-3 rounded-xl text-center" style={{ background: C.beige }}>
          <span className="font-bold text-base block" style={{ color: C.dark }}>8</span>
          <span className="text-[10px]" style={{ color: C.taupe }}>Zamówień</span>
        </div>
        <div className="p-3 rounded-xl text-center" style={{ background: C.beige }}>
          <span className="font-bold text-base block" style={{ color: C.gold }}>420</span>
          <span className="text-[10px]" style={{ color: C.taupe }}>Punkty</span>
        </div>
        <div className="p-3 rounded-xl text-center" style={{ background: C.beige }}>
          <span className="font-bold text-base block" style={{ color: C.dark }}>3</span>
          <span className="text-[10px]" style={{ color: C.taupe }}>Ulubione</span>
        </div>
      </div>
      <h4 className="text-xs font-semibold" style={{ color: C.dark }}>Historia zamówień</h4>
      {orders.map((o, i) => (
        <div key={i} className="flex items-center gap-3 p-3 rounded-xl border" style={{ borderColor: C.beige, background: C.cream }}>
          <Package className="w-4 h-4" style={{ color: C.gold }} />
          <div className="flex-1">
            <span className="text-xs font-mono font-bold" style={{ color: C.dark }}>{o.id}</span>
            <p className="text-[10px]" style={{ color: C.taupe }}>{o.date}</p>
          </div>
          <span className="font-bold text-xs" style={{ color: C.dark }}>{o.total} zł</span>
          <CheckCircle2 className="w-4 h-4" style={{ color: "#10B981" }} />
        </div>
      ))}
    </DemoSection>
  );
}
