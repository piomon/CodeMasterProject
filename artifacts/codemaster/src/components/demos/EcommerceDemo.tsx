import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PreviewShell, DemoFooterCTA, DemoBenefits } from "./PreviewShell";
import { ShoppingBag, Star, Heart, CreditCard, Truck, ChevronRight, Plus, Minus, X, CheckCircle2, Shield, Search, ArrowLeft } from "lucide-react";

const C = { black: "#0A0A0A", cream: "#FAF5EE", gold: "#B8860B", taupe: "#8B7D6B", white: "#FFFFFF", warm: "#F5EDE3", rose: "#9E6B6B", dark: "#1C1917" };

const categories = [
  { id: "all", name: "Wszystko", icon: "✨" },
  { id: "coats", name: "Płaszcze", icon: "🧥" },
  { id: "dresses", name: "Sukienki", icon: "👗" },
  { id: "bags", name: "Torebki", icon: "👜" },
  { id: "shoes", name: "Obuwie", icon: "👠" },
  { id: "accessories", name: "Akcesoria", icon: "💎" },
];

const products = [
  { name: "Płaszcz Kaszmirowy Oversize", cat: "coats", price: 1890, oldPrice: 2490, sizes: ["S", "M", "L"], color: "Karmelowy", badge: "BESTSELLER", rating: 4.9, reviews: 89 },
  { name: "Sukienka Midi Jedwabna", cat: "dresses", price: 890, sizes: ["XS", "S", "M", "L"], color: "Czarny", badge: "NOWOŚĆ", rating: 5.0, reviews: 34 },
  { name: "Torebka Skórzana Baguette", cat: "bags", price: 690, oldPrice: 890, sizes: [], color: "Nude", badge: "-23%", rating: 4.8, reviews: 156 },
  { name: "Botki Chelsea Skóra", cat: "shoes", price: 590, sizes: ["36", "37", "38", "39", "40"], color: "Czarny", badge: "", rating: 4.7, reviews: 67 },
  { name: "Szal Wełniany Premium", cat: "accessories", price: 290, sizes: [], color: "Szary melanż", badge: "NOWOŚĆ", rating: 4.9, reviews: 45 },
  { name: "Marynarka Oversize Lniana", cat: "coats", price: 1190, sizes: ["S", "M", "L", "XL"], color: "Ecru", badge: "", rating: 4.8, reviews: 78 },
  { name: "Spódnica Plisowana Maxi", cat: "dresses", price: 490, sizes: ["XS", "S", "M"], color: "Szampański", badge: "", rating: 4.6, reviews: 52 },
  { name: "Kopertówka Wieczorowa", cat: "bags", price: 390, sizes: [], color: "Złoty", badge: "LUX", rating: 5.0, reviews: 28 },
];

type Product = typeof products[0];
type CartItem = { product: Product; qty: number; size: string };
type EcommPage = "home" | "shop" | "product" | "cart" | "checkout" | "wishlist";

interface ShopPageProps {
  addToCart: (p: Product, s: string) => void;
  setProduct: (i: number) => void;
  onNav: (p: EcommPage) => void;
  toggleWish: (i: number) => void;
  wishlist: Set<number>;
}

interface WishlistPageProps {
  wishlist: Set<number>;
  toggleWish: (i: number) => void;
  setProduct: (i: number) => void;
  onNav: (p: EcommPage) => void;
}

export function EcommerceDemo({ name }: { name: string; features: string[] }) {
  const [page, setPage] = useState<EcommPage>("home");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selProduct, setSelProduct] = useState(-1);
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());
  const cartCount = cart.reduce((a, c) => a + c.qty, 0);
  const cartTotal = cart.reduce((a, c) => a + c.product.price * c.qty, 0);

  const addToCart = (product: Product, size: string) => {
    setCart(prev => {
      const ex = prev.find(c => c.product.name === product.name && c.size === size);
      if (ex) return prev.map(c => c.product.name === product.name && c.size === size ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { product, qty: 1, size }];
    });
  };

  const toggleWish = (i: number) => {
    setWishlist(prev => { const n = new Set(prev); n.has(i) ? n.delete(i) : n.add(i); return n; });
  };

  return (
    <PreviewShell title={name}>
      <div style={{ background: C.cream, minHeight: 500 }}>
        <div className="flex items-center justify-between px-4 py-3 sticky top-0 z-20" style={{ background: C.black }}>
          <div>
            <h1 className="font-display font-bold text-sm tracking-[0.2em]" style={{ color: C.cream }}>MAISON</h1>
            <p className="text-[7px] tracking-[0.3em]" style={{ color: C.gold }}>BOUTIQUE</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setPage("home")} className="text-xs" style={{ color: C.cream + "80" }}>
              <Search className="w-4 h-4" />
            </button>
            <button onClick={() => setPage("wishlist")} className="text-xs relative" style={{ color: C.cream + "80" }}>
              <Heart className="w-4 h-4" />
              {wishlist.size > 0 && <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full text-[8px] font-bold flex items-center justify-center" style={{ background: C.gold, color: C.black }}>{wishlist.size}</span>}
            </button>
            <button onClick={() => setPage("cart")} className="relative">
              <ShoppingBag className="w-4 h-4" style={{ color: C.cream + "80" }} />
              {cartCount > 0 && <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full text-[8px] font-bold flex items-center justify-center" style={{ background: C.gold, color: C.black }}>{cartCount}</span>}
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={page + selProduct} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {page === "home" && <HomePage onNav={setPage} setProduct={setSelProduct} toggleWish={toggleWish} wishlist={wishlist} />}
            {page === "shop" && <ShopPage addToCart={addToCart} setProduct={setSelProduct} onNav={setPage} toggleWish={toggleWish} wishlist={wishlist} />}
            {page === "product" && selProduct >= 0 && <ProductPage product={products[selProduct]} addToCart={addToCart} onNav={setPage} toggleWish={() => toggleWish(selProduct)} isWished={wishlist.has(selProduct)} />}
            {page === "cart" && <CartPage cart={cart} setCart={setCart} total={cartTotal} onNav={setPage} />}
            {page === "checkout" && <CheckoutPage total={cartTotal} onNav={setPage} />}
            {page === "wishlist" && <WishlistPage wishlist={wishlist} toggleWish={toggleWish} setProduct={setSelProduct} onNav={setPage} />}
          </motion.div>
        </AnimatePresence>
      </div>
      <DemoBenefits accentColor={C.gold} bgColor={C.cream} textColor={C.black} benefits={[
        { icon: "🛍️", title: "Profesjonalny e-commerce", desc: "Sklep klasy premium z konwersją" },
        { icon: "📱", title: "Wersja mobilna", desc: "Responsywny design na każde urządzenie" },
        { icon: "💳", title: "Szybka płatność", desc: "Integracja z bramkami płatności" },
        { icon: "📦", title: "Zarządzanie magazynem", desc: "Stany magazynowe w czasie rzeczywistym" },
      ]} />
      <DemoFooterCTA accentColor={C.gold} bgColor={C.black} />
    </PreviewShell>
  );
}

function HomePage({ onNav, setProduct, toggleWish, wishlist }: { onNav: (p: EcommPage) => void; setProduct: (i: number) => void; toggleWish: (i: number) => void; wishlist: Set<number> }) {
  return (
    <div>
      <div className="relative py-10 px-5 text-center" style={{ background: `linear-gradient(180deg, ${C.black}, ${C.dark})` }}>
        <p className="text-[10px] tracking-[0.3em] uppercase" style={{ color: C.gold }}>Kolekcja Jesień / Zima 2026</p>
        <h2 className="font-display font-bold text-2xl mt-2" style={{ color: C.cream }}>Elegancja<br />w każdym detalu</h2>
        <p className="text-xs mt-2" style={{ color: C.cream + "70" }}>Odkryj nową kolekcję premium. Kaszmiry, jedwabie, skóry.</p>
        <motion.button whileHover={{ scale: 1.03 }} onClick={() => onNav("shop")}
          className="mt-4 px-8 py-3 rounded-none font-bold text-xs tracking-[0.2em] uppercase inline-flex items-center gap-2" style={{ background: C.gold, color: C.black }}>
          Odkryj kolekcję <ChevronRight className="w-3 h-3" />
        </motion.button>
      </div>

      <div className="px-4 py-4 space-y-4">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {categories.slice(1).map(c => (
            <motion.button key={c.id} whileHover={{ y: -2 }} onClick={() => onNav("shop")}
              className="shrink-0 px-4 py-2.5 rounded-none text-center" style={{ background: C.white, border: `1px solid ${C.warm}` }}>
              <span className="text-base block">{c.icon}</span>
              <span className="text-[9px] font-semibold block mt-0.5 tracking-wider uppercase" style={{ color: C.dark }}>{c.name}</span>
            </motion.button>
          ))}
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold tracking-[0.1em] uppercase" style={{ color: C.dark }}>Bestsellery</h3>
            <button onClick={() => onNav("shop")} className="text-[10px] font-semibold" style={{ color: C.gold }}>Wszystkie →</button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {products.filter(p => p.badge).slice(0, 4).map((p) => {
              const idx = products.indexOf(p);
              return (
                <motion.div key={idx} whileHover={{ y: -3 }} onClick={() => { setProduct(idx); onNav("product"); }}
                  className="rounded-none overflow-hidden cursor-pointer" style={{ background: C.white }}>
                  <div className="h-28 flex items-center justify-center relative" style={{ background: C.warm }}>
                    <span className="text-4xl">{categories.find(c => c.id === p.cat)?.icon || "🛍️"}</span>
                    {p.badge && <span className="absolute top-2 left-2 px-1.5 py-0.5 text-[8px] font-bold tracking-wider" style={{ background: C.black, color: C.cream }}>{p.badge}</span>}
                    <button onClick={e => { e.stopPropagation(); toggleWish(idx); }} className="absolute top-2 right-2">
                      <Heart className="w-4 h-4" style={{ fill: wishlist.has(idx) ? C.rose : "none", color: wishlist.has(idx) ? C.rose : C.taupe }} />
                    </button>
                  </div>
                  <div className="p-2.5">
                    <h4 className="text-[11px] font-semibold leading-tight" style={{ color: C.dark }}>{p.name}</h4>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="font-bold text-sm" style={{ color: C.dark }}>{p.price} zł</span>
                      {p.oldPrice && <span className="text-[10px] line-through" style={{ color: C.taupe }}>{p.oldPrice} zł</span>}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="p-5 text-center" style={{ background: C.black }}>
          <p className="text-[9px] tracking-[0.3em] uppercase" style={{ color: C.gold }}>Darmowa dostawa</p>
          <p className="text-xs font-bold mt-1" style={{ color: C.cream }}>Przy zamówieniach powyżej 500 zł</p>
          <div className="flex justify-center gap-6 mt-3">
            {[
              { icon: <Truck className="w-4 h-4" />, label: "48h dostawa" },
              { icon: <Shield className="w-4 h-4" />, label: "14 dni zwrot" },
              { icon: <CreditCard className="w-4 h-4" />, label: "Bezp. płatność" },
            ].map((f, i) => (
              <div key={i} className="flex flex-col items-center gap-0.5" style={{ color: C.cream + "70" }}>
                {f.icon}
                <span className="text-[8px]">{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ShopPage({ addToCart, setProduct, onNav, toggleWish, wishlist }: ShopPageProps) {
  const [selCat, setSelCat] = useState("all");
  const filtered = selCat === "all" ? products : products.filter(p => p.cat === selCat);

  return (
    <div className="px-4 py-3 space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-bold tracking-[0.1em] uppercase" style={{ color: C.dark }}>Kolekcja</h2>
        <span className="text-[10px]" style={{ color: C.taupe }}>{filtered.length} produktów</span>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {categories.map(c => (
          <button key={c.id} onClick={() => setSelCat(c.id)}
            className="px-3 py-1.5 text-[10px] font-semibold whitespace-nowrap tracking-wider uppercase"
            style={selCat === c.id ? { background: C.black, color: C.cream } : { background: C.white, color: C.taupe, border: `1px solid ${C.warm}` }}>{c.name}</button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3">
        {filtered.map((p, i) => {
          const idx = products.indexOf(p);
          return (
            <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
              onClick={() => { setProduct(idx); onNav("product"); }}
              className="rounded-none overflow-hidden cursor-pointer" style={{ background: C.white }}>
              <div className="h-28 flex items-center justify-center relative" style={{ background: C.warm }}>
                <span className="text-3xl">{categories.find(c => c.id === p.cat)?.icon || "🛍️"}</span>
                {p.badge && <span className="absolute top-2 left-2 px-1.5 py-0.5 text-[8px] font-bold tracking-wider" style={{ background: C.black, color: C.cream }}>{p.badge}</span>}
                <button onClick={e => { e.stopPropagation(); toggleWish(idx); }} className="absolute top-2 right-2">
                  <Heart className="w-4 h-4" style={{ fill: wishlist.has(idx) ? C.rose : "none", color: wishlist.has(idx) ? C.rose : C.taupe }} />
                </button>
              </div>
              <div className="p-2.5">
                <h4 className="text-[10px] font-semibold leading-tight" style={{ color: C.dark }}>{p.name}</h4>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="font-bold text-xs" style={{ color: C.dark }}>{p.price} zł</span>
                  {p.oldPrice && <span className="text-[9px] line-through" style={{ color: C.taupe }}>{p.oldPrice} zł</span>}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function ProductPage({ product, addToCart, onNav, toggleWish, isWished }: { product: Product; addToCart: (p: Product, s: string) => void; onNav: (p: EcommPage) => void; toggleWish: () => void; isWished: boolean }) {
  const [selSize, setSelSize] = useState("");
  return (
    <div>
      <div className="h-48 flex items-center justify-center relative" style={{ background: C.warm }}>
        <span className="text-6xl">{categories.find(c => c.id === product.cat)?.icon || "🛍️"}</span>
        <button onClick={() => onNav("shop")} className="absolute top-3 left-3 w-8 h-8 rounded-full flex items-center justify-center" style={{ background: C.white + "80" }}>
          <ArrowLeft className="w-4 h-4" style={{ color: C.dark }} />
        </button>
        <button onClick={toggleWish} className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center" style={{ background: C.white + "80" }}>
          <Heart className="w-4 h-4" style={{ fill: isWished ? C.rose : "none", color: isWished ? C.rose : C.dark }} />
        </button>
        {product.badge && <span className="absolute bottom-3 left-3 px-2 py-0.5 text-[9px] font-bold tracking-wider" style={{ background: C.black, color: C.cream }}>{product.badge}</span>}
      </div>
      <div className="px-4 py-4 space-y-3">
        <div>
          <h2 className="font-display font-bold text-lg" style={{ color: C.dark }}>{product.name}</h2>
          <p className="text-xs mt-0.5" style={{ color: C.taupe }}>Kolor: {product.color}</p>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex">{[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3 h-3" style={{ fill: i <= Math.round(product.rating) ? C.gold : C.warm, color: i <= Math.round(product.rating) ? C.gold : C.warm }} />)}</div>
            <span className="text-[10px]" style={{ color: C.taupe }}>{product.rating} ({product.reviews})</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-bold text-2xl" style={{ color: C.dark }}>{product.price} zł</span>
          {product.oldPrice && <span className="text-base line-through" style={{ color: C.taupe }}>{product.oldPrice} zł</span>}
        </div>
        {product.sizes.length > 0 && (
          <div>
            <span className="text-xs font-semibold" style={{ color: C.dark }}>Rozmiar</span>
            <div className="flex gap-2 mt-1.5">
              {product.sizes.map(s => (
                <button key={s} onClick={() => setSelSize(s)}
                  className="w-10 h-10 flex items-center justify-center text-xs font-semibold"
                  style={selSize === s ? { background: C.black, color: C.cream } : { background: C.white, color: C.dark, border: `1px solid ${C.warm}` }}>{s}</button>
              ))}
            </div>
          </div>
        )}
        <motion.button whileHover={{ scale: 1.02 }} onClick={() => { addToCart(product, selSize || "ONE"); onNav("cart"); }}
          className="w-full py-3.5 font-bold text-sm tracking-[0.1em] uppercase flex items-center justify-center gap-2" style={{ background: C.black, color: C.cream }}>
          <ShoppingBag className="w-4 h-4" /> Dodaj do koszyka
        </motion.button>
      </div>
    </div>
  );
}

function CartPage({ cart, setCart, total, onNav }: { cart: CartItem[]; setCart: (c: CartItem[]) => void; total: number; onNav: (p: EcommPage) => void }) {
  if (cart.length === 0) {
    return (
      <div className="text-center py-16 px-4">
        <ShoppingBag className="w-12 h-12 mx-auto mb-3" style={{ color: C.taupe + "40" }} />
        <p className="font-semibold" style={{ color: C.taupe }}>Koszyk jest pusty</p>
        <button onClick={() => onNav("shop")} className="mt-4 px-6 py-2.5 text-sm font-bold tracking-wider uppercase" style={{ background: C.black, color: C.cream }}>Przeglądaj kolekcję</button>
      </div>
    );
  }
  return (
    <div className="px-4 py-3 space-y-3">
      <h2 className="text-xs font-bold tracking-[0.1em] uppercase" style={{ color: C.dark }}>Koszyk ({cart.length})</h2>
      {cart.map((c, i) => (
        <div key={i} className="flex gap-3 p-3" style={{ background: C.white }}>
          <div className="w-16 h-16 flex items-center justify-center text-2xl" style={{ background: C.warm }}>
            {categories.find(ct => ct.id === c.product.cat)?.icon || "🛍️"}
          </div>
          <div className="flex-1">
            <h4 className="text-xs font-semibold" style={{ color: C.dark }}>{c.product.name}</h4>
            <p className="text-[10px]" style={{ color: C.taupe }}>{c.size !== "ONE" ? `Rozmiar: ${c.size}` : ""}</p>
            <div className="flex items-center gap-2 mt-1.5">
              <button onClick={() => setCart(cart.map((cc, j) => j === i ? { ...cc, qty: Math.max(1, cc.qty - 1) } : cc))}
                className="w-5 h-5 flex items-center justify-center" style={{ border: `1px solid ${C.warm}` }}><Minus className="w-2.5 h-2.5" /></button>
              <span className="text-xs font-bold w-4 text-center">{c.qty}</span>
              <button onClick={() => setCart(cart.map((cc, j) => j === i ? { ...cc, qty: cc.qty + 1 } : cc))}
                className="w-5 h-5 flex items-center justify-center" style={{ background: C.black, color: C.cream }}><Plus className="w-2.5 h-2.5" /></button>
            </div>
          </div>
          <div className="flex flex-col items-end justify-between">
            <button onClick={() => setCart(cart.filter((_, j) => j !== i))}><X className="w-4 h-4" style={{ color: C.taupe }} /></button>
            <span className="font-bold text-sm" style={{ color: C.dark }}>{c.product.price * c.qty} zł</span>
          </div>
        </div>
      ))}
      <div className="p-4" style={{ background: C.white }}>
        <div className="flex justify-between text-sm"><span style={{ color: C.taupe }}>Produkty</span><span style={{ color: C.dark }}>{total} zł</span></div>
        <div className="flex justify-between text-sm mt-1"><span style={{ color: C.taupe }}>Dostawa</span><span style={{ color: total >= 500 ? "#22C55E" : C.dark }}>{total >= 500 ? "GRATIS" : "24,99 zł"}</span></div>
        <div className="border-t mt-2 pt-2 flex justify-between" style={{ borderColor: C.warm }}>
          <span className="font-bold" style={{ color: C.dark }}>Razem</span>
          <span className="font-bold text-xl" style={{ color: C.dark }}>{total + (total >= 500 ? 0 : 24.99)} zł</span>
        </div>
      </div>
      <motion.button whileHover={{ scale: 1.02 }} onClick={() => onNav("checkout")}
        className="w-full py-3.5 font-bold text-sm tracking-[0.1em] uppercase" style={{ background: C.black, color: C.cream }}>Przejdź do kasy</motion.button>
    </div>
  );
}

function CheckoutPage({ total, onNav }: { total: number; onNav: (p: EcommPage) => void }) {
  const [confirmed, setConfirmed] = useState(false);
  if (confirmed) {
    return (
      <div className="px-4 py-10 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
          <div className="w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ background: "#22C55E20" }}>
            <CheckCircle2 className="w-7 h-7" style={{ color: "#22C55E" }} />
          </div>
        </motion.div>
        <h3 className="font-bold text-lg" style={{ color: C.dark }}>Zamówienie złożone!</h3>
        <p className="font-mono font-bold text-sm mt-2" style={{ color: C.gold }}>MSN-{Math.floor(Math.random() * 9000 + 1000)}</p>
        <p className="text-[10px] mt-2 max-w-[220px] mx-auto" style={{ color: C.taupe }}>Potwierdzenie wysłane na email. Śledzenie przesyłki będzie dostępne w ciągu 24h.</p>
      </div>
    );
  }
  return (
    <div className="px-4 py-3 space-y-3">
      <h2 className="text-xs font-bold tracking-[0.1em] uppercase" style={{ color: C.dark }}>Dane dostawy</h2>
      <div className="grid grid-cols-2 gap-2">
        <input placeholder="Imię" className="px-3 py-2.5 text-sm" style={{ background: C.white, border: `1px solid ${C.warm}`, color: C.dark }} />
        <input placeholder="Nazwisko" className="px-3 py-2.5 text-sm" style={{ background: C.white, border: `1px solid ${C.warm}`, color: C.dark }} />
      </div>
      <input placeholder="Ulica i nr" className="w-full px-3 py-2.5 text-sm" style={{ background: C.white, border: `1px solid ${C.warm}`, color: C.dark }} />
      <div className="grid grid-cols-3 gap-2">
        <input placeholder="Kod" className="px-3 py-2.5 text-sm" style={{ background: C.white, border: `1px solid ${C.warm}`, color: C.dark }} />
        <input placeholder="Miasto" className="col-span-2 px-3 py-2.5 text-sm" style={{ background: C.white, border: `1px solid ${C.warm}`, color: C.dark }} />
      </div>
      <input placeholder="Email" className="w-full px-3 py-2.5 text-sm" style={{ background: C.white, border: `1px solid ${C.warm}`, color: C.dark }} />
      <input placeholder="Telefon" className="w-full px-3 py-2.5 text-sm" style={{ background: C.white, border: `1px solid ${C.warm}`, color: C.dark }} />
      <div className="p-3" style={{ background: C.white }}>
        <div className="flex justify-between"><span style={{ color: C.taupe }}>Do zapłaty</span><span className="font-bold text-lg" style={{ color: C.dark }}>{total + (total >= 500 ? 0 : 24.99)} zł</span></div>
      </div>
      <motion.button whileHover={{ scale: 1.02 }} onClick={() => setConfirmed(true)}
        className="w-full py-3.5 font-bold text-sm tracking-[0.1em] uppercase" style={{ background: C.black, color: C.cream }}>Zamawiam i płacę</motion.button>
    </div>
  );
}

function WishlistPage({ wishlist, toggleWish, setProduct, onNav }: WishlistPageProps) {
  const wished = products.filter((_, i) => wishlist.has(i));
  if (wished.length === 0) {
    return (
      <div className="text-center py-16 px-4">
        <Heart className="w-12 h-12 mx-auto mb-3" style={{ color: C.taupe + "40" }} />
        <p className="font-semibold" style={{ color: C.taupe }}>Lista życzeń jest pusta</p>
        <button onClick={() => onNav("shop")} className="mt-4 px-6 py-2.5 text-sm font-bold tracking-wider uppercase" style={{ background: C.black, color: C.cream }}>Przeglądaj kolekcję</button>
      </div>
    );
  }
  return (
    <div className="px-4 py-3 space-y-3">
      <h2 className="text-xs font-bold tracking-[0.1em] uppercase" style={{ color: C.dark }}>Lista życzeń ({wished.length})</h2>
      {wished.map((p) => {
        const idx = products.indexOf(p);
        return (
          <div key={idx} className="flex gap-3 p-3" style={{ background: C.white }}>
            <div className="w-14 h-14 flex items-center justify-center text-2xl cursor-pointer" onClick={() => { setProduct(idx); onNav("product"); }}
              style={{ background: C.warm }}>{categories.find(c => c.id === p.cat)?.icon || "🛍️"}</div>
            <div className="flex-1">
              <h4 className="text-xs font-semibold" style={{ color: C.dark }}>{p.name}</h4>
              <span className="font-bold text-sm" style={{ color: C.dark }}>{p.price} zł</span>
            </div>
            <button onClick={() => toggleWish(idx)}><X className="w-4 h-4" style={{ color: C.taupe }} /></button>
          </div>
        );
      })}
    </div>
  );
}
