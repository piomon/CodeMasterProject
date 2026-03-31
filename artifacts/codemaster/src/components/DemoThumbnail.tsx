const base = "w-full h-full flex flex-col overflow-hidden select-none pointer-events-none relative";

function SalonThumb() {
  return (
    <div className={base} style={{ background: "#FFF8F0" }}>
      <div className="flex items-center gap-1.5 px-3 pt-2.5 pb-1" style={{ borderBottom: "1px solid #F5E6D3" }}>
        <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: "#D4A0A0" }}>
          <span className="text-[7px] text-white font-bold">B</span>
        </div>
        <div>
          <div className="text-[9px] font-bold" style={{ color: "#5C4B3A" }}>Belle Beauty</div>
          <div className="text-[4px]" style={{ color: "#D4A0A0" }}>Rezerwacja online</div>
        </div>
      </div>
      <div className="flex-1 px-3 py-2 flex flex-col gap-1">
        <div className="text-[5px] font-bold uppercase tracking-wider" style={{ color: "#8B7D6B" }}>Najbliższe terminy</div>
        {[
          { time: "10:00", service: "Manicure hybrydowy", stylist: "Anna K.", avail: true },
          { time: "11:30", service: "Koloryzacja + strzyżenie", stylist: "Marta W.", avail: true },
          { time: "13:00", service: "Makijaż wieczorowy", stylist: "Julia P.", avail: false },
          { time: "14:30", service: "Pedicure SPA", stylist: "Anna K.", avail: true },
        ].map((s, i) => (
          <div key={i} className="flex items-center gap-1.5 py-0.5" style={{ borderBottom: "1px solid #F5E6D310" }}>
            <div className="text-[7px] font-mono font-bold w-6" style={{ color: s.avail ? "#D4A0A0" : "#CCC" }}>{s.time}</div>
            <div className="flex-1 min-w-0">
              <div className="text-[6px] font-semibold truncate" style={{ color: "#5C4B3A" }}>{s.service}</div>
              <div className="text-[4px]" style={{ color: "#8B7D6B" }}>{s.stylist}</div>
            </div>
            <div className="px-1.5 py-0.5 rounded-full text-[4px] font-bold" style={{ background: s.avail ? "#D4A0A020" : "#EEE", color: s.avail ? "#D4A0A0" : "#AAA" }}>
              {s.avail ? "Wolne" : "Zajęte"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BarberThumb() {
  return (
    <div className={base} style={{ background: "#1A1A1A" }}>
      <div className="text-center pt-2.5 pb-1.5 px-3" style={{ borderBottom: "1px solid #B8733330" }}>
        <div className="text-[4px] tracking-[0.4em] uppercase" style={{ color: "#B87333" }}>EST. 2012</div>
        <div className="text-[13px] font-bold" style={{ color: "#C9A96E", fontFamily: "serif" }}>GENTLEMAN'S</div>
        <div className="flex items-center justify-center gap-2 mt-0.5">
          <div className="h-px flex-1" style={{ background: "#B8733340" }} />
          <span className="text-[5px]" style={{ color: "#B87333" }}>BARBER SHOP</span>
          <div className="h-px flex-1" style={{ background: "#B8733340" }} />
        </div>
      </div>
      <div className="flex-1 px-3 py-1.5">
        <div className="text-[4px] uppercase tracking-wider mb-1" style={{ color: "#B87333" }}>Cennik usług</div>
        {[
          { name: "Strzyżenie klasyczne", price: "80 zł" },
          { name: "Strzyżenie + broda", price: "120 zł" },
          { name: "Golenie brzytwą", price: "60 zł" },
          { name: "Pakiet VIP komplet", price: "180 zł" },
        ].map((s, i) => (
          <div key={i} className="flex justify-between items-center py-0.5" style={{ borderBottom: "1px dotted #B8733320" }}>
            <span className="text-[6px]" style={{ color: "#C9A96E" }}>{s.name}</span>
            <span className="text-[6px] font-bold" style={{ color: "#B87333" }}>{s.price}</span>
          </div>
        ))}
        <div className="mt-1.5 text-center">
          <div className="inline-block px-4 py-1 rounded-sm text-[5px] font-bold" style={{ background: "#B87333", color: "#1A1A1A" }}>Rezerwuj wizytę</div>
        </div>
      </div>
    </div>
  );
}

function RestaurantThumb() {
  return (
    <div className={base} style={{ background: "#FEFCF8" }}>
      <div className="px-3 pt-2.5 pb-1.5 flex items-center justify-between" style={{ borderBottom: "1px solid #E8E0D0" }}>
        <div>
          <div className="text-[10px] font-bold" style={{ color: "#2D5A27", fontFamily: "serif" }}>Trattoria Bella</div>
          <div className="text-[4px]" style={{ color: "#708238" }}>Autentyczna kuchnia włoska</div>
        </div>
        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map(i => <span key={i} className="text-[5px]" style={{ color: "#C9A96E" }}>★</span>)}
        </div>
      </div>
      <div className="flex-1 px-3 py-1.5 grid grid-cols-2 gap-1.5">
        {[
          { dish: "Carbonara", price: "42 zł", emoji: "🍝", tag: "Chef's pick" },
          { dish: "Margherita", price: "35 zł", emoji: "🍕", tag: "Popularne" },
          { dish: "Tiramisu", price: "28 zł", emoji: "🍰", tag: "Deser" },
          { dish: "Bruschetta", price: "24 zł", emoji: "🥖", tag: "Antipasti" },
        ].map((d, i) => (
          <div key={i} className="rounded p-1.5 flex flex-col" style={{ background: "#F5F0E6", border: "1px solid #E8E0D0" }}>
            <div className="flex items-center justify-between">
              <span className="text-[10px]">{d.emoji}</span>
              <span className="text-[4px] px-1 py-0.5 rounded-full" style={{ background: "#2D5A2715", color: "#2D5A27" }}>{d.tag}</span>
            </div>
            <div className="text-[7px] font-bold mt-0.5" style={{ color: "#2C2C2C" }}>{d.dish}</div>
            <div className="text-[6px] font-bold" style={{ color: "#2D5A27" }}>{d.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HotelThumb() {
  return (
    <div className={base} style={{ background: "#0D1B2A" }}>
      <div className="px-3 pt-2.5 pb-1.5">
        <div className="flex items-center justify-between">
          <div className="text-[9px] font-bold text-white">Resort<span style={{ color: "#C9B037" }}>Hub</span></div>
          <div className="px-1.5 py-0.5 rounded text-[4px] font-bold" style={{ background: "#C9B03720", color: "#C9B037" }}>5★ LUXURY</div>
        </div>
      </div>
      <div className="px-3 py-1">
        <div className="rounded-lg overflow-hidden" style={{ background: "#152238" }}>
          <div className="grid grid-cols-7 gap-px p-1">
            <div className="col-span-7 text-center text-[5px] font-bold mb-0.5" style={{ color: "#C9B037" }}>Kwiecień 2026</div>
            {["Pn", "Wt", "Śr", "Cz", "Pt", "So", "Nd"].map(d => (
              <div key={d} className="text-center text-[3px] py-0.5" style={{ color: "#C9B03780" }}>{d}</div>
            ))}
            {Array.from({ length: 30 }, (_, i) => {
              const booked = [3, 4, 5, 10, 11, 18, 19, 20, 25, 26].includes(i + 1);
              const today = i + 1 === 15;
              return (
                <div key={i} className="text-center py-0.5 rounded-sm text-[4px]" style={{
                  background: today ? "#C9B037" : booked ? "#C9B03715" : "transparent",
                  color: today ? "#0D1B2A" : booked ? "#C9B03780" : "white",
                  fontWeight: today ? 700 : 400,
                }}>{i + 1}</div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="px-3 pb-1.5 flex gap-1 mt-auto">
        <div className="flex items-center gap-0.5"><div className="w-1.5 h-1.5 rounded-sm" style={{ background: "#C9B037" }} /><span className="text-[3px] text-white/40">Dziś</span></div>
        <div className="flex items-center gap-0.5"><div className="w-1.5 h-1.5 rounded-sm" style={{ background: "#C9B03715" }} /><span className="text-[3px] text-white/40">Zajęte</span></div>
        <div className="flex items-center gap-0.5"><div className="w-1.5 h-1.5 rounded-sm border border-white/20" /><span className="text-[3px] text-white/40">Wolne</span></div>
      </div>
    </div>
  );
}

function HealthcareThumb() {
  return (
    <div className={base} style={{ background: "#F0F7FF" }}>
      <div className="px-3 pt-2 pb-1.5 flex items-center justify-between" style={{ background: "#2563EB", borderRadius: "0 0 12px 12px" }}>
        <div>
          <div className="text-[9px] font-bold text-white">MedCare<span style={{ color: "#93C5FD" }}>+</span></div>
          <div className="text-[4px] text-white/60">Panel pacjenta</div>
        </div>
        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-[5px] text-white font-bold">JK</div>
      </div>
      <div className="flex-1 px-3 py-1.5 flex flex-col gap-1.5">
        <div className="rounded-lg p-2" style={{ background: "white", boxShadow: "0 1px 3px #0001" }}>
          <div className="text-[4px] font-bold uppercase" style={{ color: "#2563EB" }}>Najbliższa wizyta</div>
          <div className="flex items-center gap-1.5 mt-1">
            <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: "#10B98120" }}>
              <span className="text-[7px]">🩺</span>
            </div>
            <div className="flex-1">
              <div className="text-[6px] font-bold" style={{ color: "#1E293B" }}>Dr Anna Wiśniewska</div>
              <div className="text-[4px]" style={{ color: "#64748B" }}>Internista • 14.04 godz. 10:30</div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-1">
          {[
            { label: "Puls", value: "72", unit: "bpm", color: "#EF4444" },
            { label: "Ciśnienie", value: "120/80", unit: "mmHg", color: "#2563EB" },
            { label: "Saturacja", value: "98", unit: "%", color: "#10B981" },
          ].map((v, i) => (
            <div key={i} className="rounded-lg p-1.5 text-center" style={{ background: "white", boxShadow: "0 1px 2px #0001" }}>
              <div className="text-[3px] uppercase font-bold" style={{ color: "#94A3B8" }}>{v.label}</div>
              <div className="text-[9px] font-bold" style={{ color: v.color }}>{v.value}</div>
              <div className="text-[3px]" style={{ color: "#94A3B8" }}>{v.unit}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FitnessThumb() {
  return (
    <div className={base} style={{ background: "#0A0A0A" }}>
      <div className="px-3 pt-2.5 pb-1.5 flex items-center justify-between">
        <div className="text-[10px] font-black tracking-tight text-white">IRON<span style={{ color: "#ADFF2F" }}>FIT</span></div>
        <div className="text-[4px] px-1.5 py-0.5 rounded-full" style={{ background: "#ADFF2F20", color: "#ADFF2F" }}>PRO PLAN</div>
      </div>
      <div className="flex-1 px-3 pb-2 flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <div className="relative w-12 h-12">
            <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
              <circle cx="18" cy="18" r="15.5" fill="none" stroke="#1A1A1A" strokeWidth="3" />
              <circle cx="18" cy="18" r="15.5" fill="none" stroke="#ADFF2F" strokeWidth="3" strokeDasharray="97.4" strokeDashoffset="24" strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-[8px] font-bold" style={{ color: "#ADFF2F" }}>75%</div>
              <div className="text-[3px] text-white/40">CEL</div>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-1">
            {[
              { name: "Klatka", pct: 85, color: "#ADFF2F" },
              { name: "Plecy", pct: 60, color: "#22D3EE" },
              { name: "Nogi", pct: 45, color: "#F59E0B" },
            ].map((m, i) => (
              <div key={i}>
                <div className="flex justify-between text-[4px]">
                  <span className="text-white/60">{m.name}</span>
                  <span style={{ color: m.color }}>{m.pct}%</span>
                </div>
                <div className="h-1 rounded-full" style={{ background: "#1A1A1A" }}>
                  <div className="h-full rounded-full" style={{ width: `${m.pct}%`, background: m.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-4 gap-1">
          {[
            { v: "12,450", l: "Kroki" },
            { v: "842", l: "kcal" },
            { v: "48", l: "min" },
            { v: "6.2", l: "km" },
          ].map((s, i) => (
            <div key={i} className="text-center py-1 rounded" style={{ background: "#111" }}>
              <div className="text-[6px] font-bold" style={{ color: "#ADFF2F" }}>{s.v}</div>
              <div className="text-[3px] text-white/30">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FurnitureConfigThumb() {
  return (
    <div className={base} style={{ background: "#FAF6F1" }}>
      <div className="px-3 pt-2 pb-1.5 flex items-center justify-between" style={{ borderBottom: "1px solid #E8DDD0" }}>
        <div className="text-[9px] font-bold" style={{ color: "#3C2415" }}>FORM Studio</div>
        <div className="text-[4px]" style={{ color: "#8B6F47" }}>Konfigurator 3D</div>
      </div>
      <div className="flex-1 px-3 py-1.5 flex gap-2">
        <div className="flex-1 rounded-lg p-2 flex items-center justify-center" style={{ background: "#3C241508", border: "1px dashed #8B6F4740" }}>
          <div className="w-full">
            <div className="mx-auto" style={{ width: "80%", height: "50px", border: "2px solid #8B6F47", borderRadius: "2px", position: "relative" }}>
              <div style={{ position: "absolute", left: "15%", top: 0, bottom: 0, width: "1px", background: "#8B6F4740" }} />
              <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: "1px", background: "#8B6F4740" }} />
              <div style={{ position: "absolute", left: "75%", top: 0, bottom: 0, width: "1px", background: "#8B6F4740" }} />
              <div style={{ position: "absolute", left: 0, right: 0, top: "40%", height: "1px", background: "#8B6F4740" }} />
              <div style={{ position: "absolute", left: "2px", top: "2px", width: "12%", height: "35%", background: "#8B6F4720", borderRadius: "1px" }} />
              <div style={{ position: "absolute", right: "2px", bottom: "2px", width: "23%", height: "55%", background: "#D4A07440", borderRadius: "1px" }} />
            </div>
            <div className="text-center text-[4px] mt-1" style={{ color: "#8B6F47" }}>250 × 220 cm</div>
          </div>
        </div>
        <div className="w-12 flex flex-col gap-1">
          <div className="text-[3px] font-bold uppercase" style={{ color: "#8B6F47" }}>Materiały</div>
          {[
            { name: "Dąb", color: "#D4A074" },
            { name: "Orzech", color: "#5C3A1E" },
            { name: "Buk", color: "#E8C99B" },
            { name: "Biały", color: "#F5F0E8" },
          ].map((m, i) => (
            <div key={i} className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-sm" style={{ background: m.color, border: i === 0 ? "1.5px solid #8B6F47" : "1px solid #0001" }} />
              <span className="text-[4px]" style={{ color: "#3C2415" }}>{m.name}</span>
            </div>
          ))}
          <div className="mt-auto text-center py-1 rounded text-[4px] font-bold" style={{ background: "#8B6F47", color: "white" }}>Wyceń</div>
        </div>
      </div>
    </div>
  );
}

function KitchenConfigThumb() {
  return (
    <div className={base} style={{ background: "#FAFAF5" }}>
      <div className="px-3 pt-2 pb-1.5" style={{ borderBottom: "1px solid #E0E0D0" }}>
        <div className="text-[9px] font-bold" style={{ color: "#3A3A2A" }}>KitchenLab</div>
        <div className="text-[4px]" style={{ color: "#6B8E23" }}>Kuchnie na wymiar — konfigurator</div>
      </div>
      <div className="flex-1 px-3 py-1.5 flex flex-col gap-1.5">
        <div className="flex gap-1">
          {[
            { step: "1", label: "Wymiary", done: true },
            { step: "2", label: "Układ", done: true },
            { step: "3", label: "Fronty", done: false },
            { step: "4", label: "Wycena", done: false },
          ].map((s, i) => (
            <div key={i} className="flex-1 text-center">
              <div className="w-4 h-4 rounded-full mx-auto flex items-center justify-center text-[5px] font-bold"
                style={{ background: s.done ? "#6B8E23" : "#E0E0D0", color: s.done ? "white" : "#8C8C6E" }}>{s.step}</div>
              <div className="text-[3px] mt-0.5" style={{ color: s.done ? "#6B8E23" : "#8C8C6E" }}>{s.label}</div>
            </div>
          ))}
        </div>
        <div className="rounded-lg p-2 flex-1" style={{ background: "#F5F5EB", border: "1px solid #E0E0D0" }}>
          <div className="text-[4px] font-bold mb-1" style={{ color: "#3A3A2A" }}>Wybrany układ: L-kształt</div>
          <div style={{ display: "flex", gap: "1px", height: "30px" }}>
            <div style={{ width: "70%", height: "100%", background: "#6B8E2320", border: "1px solid #6B8E2360", borderRadius: "2px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span className="text-[4px]" style={{ color: "#6B8E23" }}>320 cm</span>
            </div>
            <div style={{ width: "30%", height: "60%", background: "#6B8E2320", border: "1px solid #6B8E2360", borderRadius: "2px", display: "flex", alignItems: "center", justifyContent: "center", alignSelf: "flex-end" }}>
              <span className="text-[3px]" style={{ color: "#6B8E23" }}>160</span>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[5px]" style={{ color: "#8C8C6E" }}>Szac. koszt:</span>
          <span className="text-[8px] font-bold" style={{ color: "#6B8E23" }}>18 400 zł</span>
        </div>
      </div>
    </div>
  );
}

function RealEstateThumb() {
  return (
    <div className={base} style={{ background: "#1B2838" }}>
      <div className="relative h-14" style={{ background: "linear-gradient(135deg, #1B283800, #B8733340)" }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-[5px] tracking-[0.2em] uppercase" style={{ color: "#B87333" }}>Inwestycja</div>
            <div className="text-[11px] font-bold text-white">Nova<span style={{ color: "#B87333" }}>Residence</span></div>
          </div>
        </div>
        <div className="absolute top-1.5 right-2 px-1.5 py-0.5 rounded text-[4px] font-bold" style={{ background: "#10B98130", color: "#10B981" }}>92% sprzedanych</div>
      </div>
      <div className="flex-1 px-2.5 py-1.5 grid grid-cols-3 gap-1">
        {[
          { type: "M2 • 45m²", floor: "Piętro 3", price: "385 000 zł", status: "Wolne" },
          { type: "M3 • 62m²", floor: "Piętro 5", price: "520 000 zł", status: "Rezerwacja" },
          { type: "M4 • 78m²", floor: "Piętro 2", price: "648 000 zł", status: "Wolne" },
        ].map((a, i) => (
          <div key={i} className="rounded p-1.5" style={{ background: "#152238", border: `1px solid ${a.status === "Wolne" ? "#B8733340" : "#94A3B820"}` }}>
            <div className="text-[5px] font-bold text-white">{a.type}</div>
            <div className="text-[3px] text-white/40">{a.floor}</div>
            <div className="text-[6px] font-bold mt-1" style={{ color: "#B87333" }}>{a.price}</div>
            <div className="text-[3px] mt-0.5 px-1 py-0.5 rounded-full text-center" style={{
              background: a.status === "Wolne" ? "#10B98120" : "#F59E0B20",
              color: a.status === "Wolne" ? "#10B981" : "#F59E0B",
            }}>{a.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AccountingThumb() {
  return (
    <div className={base} style={{ background: "#F8FAFC" }}>
      <div className="flex items-center px-3 pt-2 pb-1.5 gap-2" style={{ borderBottom: "1px solid #E2E8F0" }}>
        <div className="text-[9px] font-bold" style={{ color: "#1B3A5C" }}>FinPortal</div>
        <div className="ml-auto flex gap-1">
          {["Faktury", "Dokumenty", "Raporty"].map((t, i) => (
            <span key={i} className="text-[4px] px-1.5 py-0.5 rounded" style={{ background: i === 0 ? "#4682B4" : "#F1F5F9", color: i === 0 ? "white" : "#64748B" }}>{t}</span>
          ))}
        </div>
      </div>
      <div className="flex-1 px-3 py-1.5 flex flex-col gap-1">
        <table className="w-full" style={{ fontSize: "5px" }}>
          <thead>
            <tr style={{ color: "#94A3B8" }}>
              <th className="text-left font-semibold pb-0.5">Nr faktury</th>
              <th className="text-left font-semibold pb-0.5">Klient</th>
              <th className="text-right font-semibold pb-0.5">Kwota</th>
              <th className="text-right font-semibold pb-0.5">Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              { nr: "FV/2026/041", client: "ABC Sp. z o.o.", amount: "12 300 zł", status: "Opłacona", color: "#10B981" },
              { nr: "FV/2026/040", client: "XYZ S.A.", amount: "8 750 zł", status: "Oczekuje", color: "#F59E0B" },
              { nr: "FV/2026/039", client: "Jan Nowak", amount: "3 200 zł", status: "Opłacona", color: "#10B981" },
              { nr: "FV/2026/038", client: "DEF Sp.j.", amount: "15 900 zł", status: "Zaległa", color: "#EF4444" },
            ].map((r, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #F1F5F9" }}>
                <td className="py-0.5 font-mono" style={{ color: "#4682B4" }}>{r.nr}</td>
                <td className="py-0.5" style={{ color: "#334155" }}>{r.client}</td>
                <td className="py-0.5 text-right font-bold" style={{ color: "#1B3A5C" }}>{r.amount}</td>
                <td className="py-0.5 text-right"><span className="px-1 py-0.5 rounded-full" style={{ background: r.color + "15", color: r.color, fontSize: "4px" }}>{r.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function LawFirmThumb() {
  return (
    <div className={base} style={{ background: "#FAF8F5" }}>
      <div className="px-3 pt-2 pb-1.5" style={{ borderBottom: "2px solid #B8860B30" }}>
        <div className="flex items-center gap-1.5">
          <div className="text-[12px]">⚖️</div>
          <div>
            <div className="text-[9px] font-bold" style={{ color: "#2C2C2C", fontFamily: "serif" }}>Lex & Partners</div>
            <div className="text-[4px]" style={{ color: "#B8860B" }}>Kancelaria Adwokacka</div>
          </div>
        </div>
      </div>
      <div className="flex-1 px-3 py-1.5 flex flex-col gap-1">
        <div className="rounded p-2" style={{ background: "white", border: "1px solid #E8E0D0" }}>
          <div className="flex items-center gap-1 mb-1">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#B8860B" }} />
            <span className="text-[4px] font-bold uppercase" style={{ color: "#B8860B" }}>Aktywna sprawa</span>
          </div>
          <div className="text-[7px] font-bold" style={{ color: "#2C2C2C" }}>Sp. z o.o. „Novum" vs. ZUS</div>
          <div className="text-[4px] mt-0.5" style={{ color: "#6B7280" }}>Prawo pracy • Adw. M. Kowalczyk</div>
          <div className="flex gap-1 mt-1.5">
            <div className="flex-1 h-1 rounded-full" style={{ background: "#E8E0D0" }}>
              <div className="h-full rounded-full" style={{ width: "65%", background: "#B8860B" }} />
            </div>
            <span className="text-[3px]" style={{ color: "#B8860B" }}>65%</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-1">
          {[
            { label: "Konsultacja prawna", icon: "📝" },
            { label: "Prawo handlowe", icon: "🏛️" },
            { label: "Spory cywilne", icon: "📋" },
            { label: "Prawo rodzinne", icon: "🤝" },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-1 px-1.5 py-1 rounded" style={{ background: "#F5F3EF" }}>
              <span className="text-[6px]">{s.icon}</span>
              <span className="text-[4px]" style={{ color: "#2C2C2C" }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MarketingThumb() {
  return (
    <div className={base} style={{ background: "#0F172A" }}>
      <div className="flex items-center justify-between px-3 pt-2 pb-1">
        <div className="text-[9px] font-bold text-white">Spark <span style={{ color: "#8B5CF6" }}>Agency</span></div>
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#00FF88" }} />
          <span className="text-[4px] text-white/40">Live</span>
        </div>
      </div>
      <div className="flex-1 px-3 pb-2 flex flex-col gap-1.5">
        <div className="flex gap-1">
          {[
            { label: "Kliknięcia", value: "24,591", change: "+18%", color: "#3B82F6" },
            { label: "Konwersje", value: "1,247", change: "+32%", color: "#8B5CF6" },
          ].map((k, i) => (
            <div key={i} className="flex-1 rounded-lg p-1.5" style={{ background: "#1E293B" }}>
              <div className="text-[3px] text-white/40">{k.label}</div>
              <div className="text-[8px] font-bold text-white">{k.value}</div>
              <span className="text-[4px] font-bold" style={{ color: "#00FF88" }}>{k.change}</span>
            </div>
          ))}
        </div>
        <div className="rounded-lg p-1.5 flex-1" style={{ background: "#1E293B" }}>
          <div className="text-[3px] text-white/40 mb-1">Wydatki tygodniowe (tys. zł)</div>
          <div className="flex items-end gap-0.5 h-6">
            {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
              <div key={i} className="flex-1 rounded-t-sm" style={{
                height: `${h}%`,
                background: i === 5 ? "linear-gradient(180deg, #8B5CF6, #3B82F6)" : "#3B82F640",
              }} />
            ))}
          </div>
          <div className="flex justify-between mt-0.5">
            {["Pn", "Wt", "Śr", "Cz", "Pt", "So", "Nd"].map(d => (
              <span key={d} className="text-[2px] text-white/20 flex-1 text-center">{d}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SchoolThumb() {
  return (
    <div className={base} style={{ background: "#FFFFFF" }}>
      <div className="flex items-center gap-2 px-3 pt-2 pb-1.5" style={{ borderBottom: "1px solid #E5E7EB" }}>
        <div className="text-[9px] font-bold" style={{ color: "#1B2838" }}>Edu<span style={{ color: "#F59E0B" }}>Pro</span></div>
        <div className="ml-auto text-[4px]" style={{ color: "#6B7280" }}>Witaj, Marek!</div>
      </div>
      <div className="flex-1 px-3 py-1.5 flex flex-col gap-1.5">
        <div className="rounded-lg p-2" style={{ background: "linear-gradient(135deg, #1B2838, #2563EB)" }}>
          <div className="text-[4px] text-white/60">Kontynuuj kurs</div>
          <div className="text-[7px] font-bold text-white mt-0.5">React & TypeScript</div>
          <div className="flex items-center gap-1 mt-1">
            <div className="flex-1 h-1 rounded-full bg-white/20">
              <div className="h-full rounded-full" style={{ width: "68%", background: "#F59E0B" }} />
            </div>
            <span className="text-[4px] font-bold" style={{ color: "#F59E0B" }}>68%</span>
          </div>
          <div className="text-[3px] text-white/40 mt-0.5">Lekcja 12/18 • 4h 20min pozostało</div>
        </div>
        <div className="text-[4px] font-bold" style={{ color: "#1B2838" }}>Twoje kursy</div>
        <div className="flex gap-1">
          {[
            { name: "Python", pct: 100, color: "#10B981", icon: "🐍" },
            { name: "Node.js", pct: 45, color: "#2563EB", icon: "🟢" },
            { name: "SQL", pct: 20, color: "#8B5CF6", icon: "🗄️" },
          ].map((c, i) => (
            <div key={i} className="flex-1 rounded p-1.5" style={{ background: "#F9FAFB", border: "1px solid #E5E7EB" }}>
              <span className="text-[8px]">{c.icon}</span>
              <div className="text-[5px] font-bold mt-0.5" style={{ color: "#1B2838" }}>{c.name}</div>
              <div className="h-0.5 rounded-full mt-0.5" style={{ background: "#E5E7EB" }}>
                <div className="h-full rounded-full" style={{ width: `${c.pct}%`, background: c.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MentoringThumb() {
  return (
    <div className={base} style={{ background: "#0A0A0A" }}>
      <div className="px-3 pt-2.5 pb-1.5" style={{ borderBottom: "1px solid #1F1F1F" }}>
        <div className="text-[4px] tracking-[0.3em] uppercase" style={{ color: "#C9A96E" }}>Strefa Premium</div>
        <div className="text-[10px] font-bold mt-0.5" style={{ color: "#FFF8F0" }}>Mentor<span style={{ color: "#C9A96E" }}>Pro</span></div>
      </div>
      <div className="flex-1 px-3 py-1.5 flex flex-col gap-1.5">
        <div className="flex gap-1.5">
          {[
            { name: "Karol Wilk", role: "CTO, 15 lat exp.", rating: "5.0", avatar: "KW" },
            { name: "Ewa Maj", role: "Product Lead", rating: "4.9", avatar: "EM" },
          ].map((m, i) => (
            <div key={i} className="flex-1 rounded-lg p-1.5" style={{ background: "#141414", border: "1px solid #2D2D2D" }}>
              <div className="flex items-center gap-1 mb-1">
                <div className="w-5 h-5 rounded-full flex items-center justify-center text-[4px] font-bold" style={{ background: "linear-gradient(135deg, #7C3AED, #C9A96E)", color: "white" }}>{m.avatar}</div>
                <div>
                  <div className="text-[5px] font-bold text-white">{m.name}</div>
                  <div className="text-[3px] text-white/40">{m.role}</div>
                </div>
              </div>
              <div className="flex items-center gap-0.5">
                <span className="text-[4px]" style={{ color: "#C9A96E" }}>★</span>
                <span className="text-[4px] font-bold" style={{ color: "#C9A96E" }}>{m.rating}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-lg p-1.5" style={{ background: "linear-gradient(135deg, #7C3AED20, #C9A96E20)", border: "1px solid #7C3AED40" }}>
          <div className="text-[4px] font-bold" style={{ color: "#C9A96E" }}>Najbliższy slot</div>
          <div className="flex items-center justify-between mt-0.5">
            <div>
              <div className="text-[6px] font-bold text-white">Jutro, 14:00 — 15:00</div>
              <div className="text-[3px] text-white/40">Sesja 1:1 • Google Meet</div>
            </div>
            <div className="px-2 py-0.5 rounded text-[4px] font-bold" style={{ background: "#7C3AED", color: "white" }}>Zarezerwuj</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EventsThumb() {
  return (
    <div className={base} style={{ background: "#0A0A0A" }}>
      <div className="relative h-16 overflow-hidden" style={{ background: "linear-gradient(135deg, #8B5CF6, #EC4899)" }}>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-[4px] tracking-[0.2em] uppercase text-white/60">Konferencja 2026</div>
          <div className="text-[12px] font-black text-white">DevSummit</div>
          <div className="text-[5px] text-white/80 mt-0.5">12–13 Czerwca • Warszawa</div>
        </div>
        <div className="absolute bottom-1 left-2 flex gap-0.5">
          {["VIP", "Early Bird"].map((t, i) => (
            <span key={i} className="text-[3px] px-1 py-0.5 rounded-full bg-white/20 text-white font-bold">{t}</span>
          ))}
        </div>
      </div>
      <div className="flex-1 px-2.5 py-1.5 flex flex-col gap-1">
        <div className="text-[4px] font-bold text-white/40 uppercase">Prelegenci</div>
        <div className="flex gap-1">
          {[
            { name: "A. Kowalski", topic: "AI w praktyce", color: "#8B5CF6" },
            { name: "M. Nowak", topic: "DevOps 2.0", color: "#EC4899" },
            { name: "J. Wiśn.", topic: "Web3 & DeFi", color: "#06B6D4" },
          ].map((s, i) => (
            <div key={i} className="flex-1 text-center py-1 rounded" style={{ background: "#1A1A1A" }}>
              <div className="w-4 h-4 rounded-full mx-auto mb-0.5 flex items-center justify-center text-[4px] font-bold" style={{ background: s.color + "30", color: s.color }}>{s.name[0]}</div>
              <div className="text-[4px] font-bold text-white">{s.name}</div>
              <div className="text-[3px]" style={{ color: s.color }}>{s.topic}</div>
            </div>
          ))}
        </div>
        <div className="flex gap-1 mt-auto">
          <div className="flex-1 py-1 rounded text-center text-[5px] font-bold" style={{ background: "linear-gradient(135deg, #8B5CF6, #EC4899)", color: "white" }}>Kup bilet</div>
          <div className="py-1 px-2 rounded text-center text-[5px] font-bold" style={{ background: "#1A1A1A", color: "white", border: "1px solid #333" }}>Program</div>
        </div>
      </div>
    </div>
  );
}

function CarRentalThumb() {
  return (
    <div className={base} style={{ background: "#0A0A0A" }}>
      <div className="flex items-center justify-between px-3 pt-2 pb-1.5">
        <div className="text-[9px] font-bold text-white">Drive<span style={{ color: "#DC2626" }}>X</span></div>
        <div className="flex gap-1">
          {["Cennik", "Flota"].map((t, i) => (
            <span key={i} className="text-[4px] px-1.5 py-0.5 rounded-full" style={{ background: i === 0 ? "#DC2626" : "#1A1A1A", color: "white", border: i === 1 ? "1px solid #333" : "none" }}>{t}</span>
          ))}
        </div>
      </div>
      <div className="flex-1 px-3 pb-2 flex flex-col gap-1.5">
        <div className="rounded-lg p-2 flex gap-2" style={{ background: "#111", border: "1px solid #222" }}>
          <div className="text-3xl leading-none">🚗</div>
          <div className="flex-1">
            <div className="text-[7px] font-bold text-white">BMW Seria 3</div>
            <div className="text-[4px] text-white/40">2024 • Automat • Benzyna</div>
            <div className="flex gap-1 mt-1">
              {[{ icon: "👤", val: "5" }, { icon: "🧳", val: "3" }, { icon: "⚡", val: "252KM" }].map((s, i) => (
                <span key={i} className="text-[4px] text-white/60">{s.icon} {s.val}</span>
              ))}
            </div>
            <div className="flex items-center justify-between mt-1.5">
              <div>
                <span className="text-[8px] font-bold" style={{ color: "#DC2626" }}>289 zł</span>
                <span className="text-[4px] text-white/40"> /dzień</span>
              </div>
              <div className="px-2 py-0.5 rounded text-[4px] font-bold" style={{ background: "#DC2626", color: "white" }}>Rezerwuj</div>
            </div>
          </div>
        </div>
        <div className="flex gap-1">
          {[
            { label: "SUV", cars: "12", icon: "🚙" },
            { label: "Sedan", cars: "8", icon: "🚗" },
            { label: "Elektryk", cars: "5", icon: "⚡" },
          ].map((c, i) => (
            <div key={i} className="flex-1 rounded py-1 text-center" style={{ background: "#111" }}>
              <div className="text-[8px]">{c.icon}</div>
              <div className="text-[4px] font-bold text-white">{c.label}</div>
              <div className="text-[3px] text-white/30">{c.cars} aut</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ServiceThumb() {
  return (
    <div className={base} style={{ background: "#0F172A" }}>
      <div className="flex items-center justify-between px-3 pt-2 pb-1.5" style={{ borderBottom: "1px solid #1E293B" }}>
        <div className="text-[9px] font-bold text-white">FixIt <span style={{ color: "#60A5FA" }}>Pro</span></div>
        <div className="flex items-center gap-0.5">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#F59E0B" }} />
          <span className="text-[4px] text-white/40">5 aktywnych</span>
        </div>
      </div>
      <div className="flex-1 px-3 py-1.5 flex flex-col gap-1">
        <div className="flex gap-1">
          {["Nowe", "W naprawie", "Gotowe"].map((col, ci) => (
            <div key={ci} className="flex-1 flex flex-col gap-0.5">
              <div className="text-[3px] font-bold uppercase text-center py-0.5 rounded" style={{
                background: ci === 0 ? "#3B82F620" : ci === 1 ? "#F59E0B20" : "#10B98120",
                color: ci === 0 ? "#3B82F6" : ci === 1 ? "#F59E0B" : "#10B981",
              }}>{col}</div>
              {(ci === 0 ? [{ d: "iPhone 15", t: "Ekran" }, { d: "MacBook", t: "Matryca" }] :
                ci === 1 ? [{ d: "Dell XPS", t: "Płyta gł." }] :
                  [{ d: "Galaxy S24", t: "Bateria" }, { d: "iPad Air", t: "Złącze" }]).map((item, ii) => (
                <div key={ii} className="rounded p-1" style={{ background: "#1E293B", border: "1px solid #334155" }}>
                  <div className="text-[4px] font-bold text-white">{item.d}</div>
                  <div className="text-[3px] text-white/40">{item.t}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="rounded p-1.5 flex items-center gap-1.5" style={{ background: "#1E293B" }}>
          <span className="text-[8px]">📱</span>
          <div className="flex-1">
            <div className="text-[4px] font-bold text-white">Sprawdź status naprawy</div>
            <div className="text-[3px] text-white/40">Podaj numer zlecenia TK-XXXX</div>
          </div>
          <div className="px-1.5 py-0.5 rounded text-[3px] font-bold" style={{ background: "#3B82F6", color: "white" }}>Szukaj</div>
        </div>
      </div>
    </div>
  );
}

function CalculatorThumb() {
  return (
    <div className={base} style={{ background: "#2D2D2D" }}>
      <div className="px-3 pt-2 pb-1.5" style={{ borderBottom: "1px solid #3D3D3D" }}>
        <div className="text-[9px] font-bold text-white">Build<span style={{ color: "#E87D2F" }}>Calc</span></div>
        <div className="text-[4px]" style={{ color: "#8C8C8C" }}>Kalkulator budowlany</div>
      </div>
      <div className="flex-1 px-3 py-1.5 flex flex-col gap-1.5">
        {[
          { label: "Powierzchnia", value: "120 m²", pct: 100 },
          { label: "Materiały budowlane", value: "248 000 zł", pct: 55 },
          { label: "Robocizna", value: "96 000 zł", pct: 30 },
          { label: "Instalacje", value: "64 000 zł", pct: 15 },
        ].map((s, i) => (
          <div key={i}>
            <div className="flex justify-between text-[4px]">
              <span style={{ color: "#8C8C8C" }}>{s.label}</span>
              <span className="font-bold" style={{ color: i === 0 ? "white" : "#E87D2F" }}>{s.value}</span>
            </div>
            {i > 0 && (
              <div className="h-1 rounded-full mt-0.5" style={{ background: "#3D3D3D" }}>
                <div className="h-full rounded-full" style={{ width: `${s.pct}%`, background: `hsl(${25 + i * 15}, 80%, ${55 - i * 8}%)` }} />
              </div>
            )}
          </div>
        ))}
        <div className="mt-auto rounded-lg p-2 text-center" style={{ background: "#E87D2F15", border: "1px solid #E87D2F40" }}>
          <div className="text-[4px]" style={{ color: "#8C8C8C" }}>Szacunkowy koszt budowy</div>
          <div className="text-[12px] font-bold" style={{ color: "#E87D2F" }}>408 000 zł</div>
          <div className="text-[3px]" style={{ color: "#8C8C8C" }}>3 400 zł / m²</div>
        </div>
      </div>
    </div>
  );
}

function EcommerceThumb() {
  return (
    <div className={base} style={{ background: "#FAF5EE" }}>
      <div className="px-3 pt-2 pb-1 flex items-center justify-between" style={{ borderBottom: "1px solid #E8DDD0" }}>
        <div className="text-[9px] font-bold tracking-[0.15em]" style={{ color: "#1C1917" }}>MAISON</div>
        <div className="flex items-center gap-1">
          <span className="text-[6px]">🔍</span>
          <span className="text-[6px]">♡</span>
          <div className="relative">
            <span className="text-[6px]">🛍️</span>
            <div className="absolute -top-0.5 -right-1 w-2 h-2 rounded-full flex items-center justify-center text-[3px] font-bold" style={{ background: "#B8860B", color: "white" }}>2</div>
          </div>
        </div>
      </div>
      <div className="flex-1 px-2 py-1.5 grid grid-cols-2 gap-1.5">
        {[
          { name: "Kaszmirowy szal", price: "449 zł", old: "599 zł", tag: "SALE", emoji: "🧣" },
          { name: "Torebka skórzana", price: "1 290 zł", old: "", tag: "NEW", emoji: "👜" },
          { name: "Zegarek Elegance", price: "2 190 zł", old: "", tag: "", emoji: "⌚" },
          { name: "Okulary Prestige", price: "890 zł", old: "", tag: "HOT", emoji: "🕶️" },
        ].map((p, i) => (
          <div key={i} className="rounded" style={{ background: "white", border: "1px solid #E8DDD0" }}>
            <div className="h-8 flex items-center justify-center relative" style={{ background: "#F5EDE3" }}>
              <span className="text-lg">{p.emoji}</span>
              {p.tag && <span className="absolute top-0.5 left-0.5 text-[3px] font-bold px-1 py-0.5 rounded-sm" style={{
                background: p.tag === "SALE" ? "#EF4444" : p.tag === "NEW" ? "#1C1917" : "#B8860B",
                color: "white",
              }}>{p.tag}</span>}
            </div>
            <div className="p-1">
              <div className="text-[4px] truncate" style={{ color: "#1C1917" }}>{p.name}</div>
              <div className="flex items-center gap-0.5">
                <span className="text-[5px] font-bold" style={{ color: "#B8860B" }}>{p.price}</span>
                {p.old && <span className="text-[4px] line-through" style={{ color: "#AAA" }}>{p.old}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AiThumb() {
  return (
    <div className={base} style={{ background: "#0F172A" }}>
      <div className="flex items-center justify-between px-3 pt-2 pb-1.5" style={{ borderBottom: "1px solid #1E293B" }}>
        <div className="text-[9px] font-bold text-white">Nexus<span style={{ color: "#06B6D4" }}>AI</span></div>
        <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full" style={{ background: "#06B6D420" }}>
          <div className="w-1 h-1 rounded-full" style={{ background: "#06B6D4" }} />
          <span className="text-[3px] font-bold" style={{ color: "#06B6D4" }}>Online</span>
        </div>
      </div>
      <div className="flex-1 px-3 py-1.5 flex flex-col gap-1">
        <div className="flex gap-1 items-start">
          <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #8B5CF6, #06B6D4)" }}>
            <span className="text-[5px]">🤖</span>
          </div>
          <div className="flex-1 rounded-lg p-1.5" style={{ background: "#1E293B" }}>
            <div className="text-[5px] text-white">Przeanalizowałem 247 leadów. 18 ma scoring powyżej 85 — rekomendacja: natychmiastowy kontakt.</div>
          </div>
        </div>
        <div className="flex gap-1 items-start justify-end">
          <div className="rounded-lg p-1.5" style={{ background: "#8B5CF630" }}>
            <div className="text-[5px] text-white">Pokaż top 5 z najwyższym scoringiem</div>
          </div>
          <div className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center text-[5px] text-white font-bold">P</div>
        </div>
        <div className="grid grid-cols-3 gap-1 mt-auto">
          {[
            { label: "Leady", value: "247", icon: "📊" },
            { label: "Scoring", value: "92%", icon: "🎯" },
            { label: "Konwersja", value: "34%", icon: "⚡" },
          ].map((s, i) => (
            <div key={i} className="rounded p-1 text-center" style={{ background: "#1E293B" }}>
              <div className="text-[6px]">{s.icon}</div>
              <div className="text-[6px] font-bold" style={{ color: "#06B6D4" }}>{s.value}</div>
              <div className="text-[3px] text-white/30">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DashboardThumb() {
  return (
    <div className={base} style={{ background: "#FFFFFF" }}>
      <div className="flex items-center px-3 pt-2 pb-1.5" style={{ borderBottom: "1px solid #E5E7EB" }}>
        <div className="text-[9px] font-bold" style={{ color: "#0F172A" }}>BizPanel <span style={{ color: "#3B82F6" }}>Pro</span></div>
      </div>
      <div className="flex-1 px-3 py-1.5 flex flex-col gap-1.5">
        <div className="flex gap-1">
          {[
            { label: "Przychód", value: "128K zł", change: "+12%", color: "#10B981" },
            { label: "Klienci", value: "2,480", change: "+8%", color: "#3B82F6" },
            { label: "Zadania", value: "89%", change: "+3%", color: "#8B5CF6" },
          ].map((s, i) => (
            <div key={i} className="flex-1 rounded-lg p-1.5" style={{ background: "#F9FAFB", border: "1px solid #E5E7EB" }}>
              <div className="text-[3px] text-gray-400">{s.label}</div>
              <div className="text-[7px] font-bold" style={{ color: "#0F172A" }}>{s.value}</div>
              <span className="text-[3px] font-bold" style={{ color: s.color }}>{s.change}</span>
            </div>
          ))}
        </div>
        <div className="rounded-lg p-1.5 flex-1" style={{ background: "#F9FAFB", border: "1px solid #E5E7EB" }}>
          <div className="text-[3px] text-gray-400 mb-1">Sprzedaż kwartalnie</div>
          <div className="flex items-end gap-1 h-8">
            {[
              { q: "Q1", h: 55 }, { q: "Q2", h: 70 }, { q: "Q3", h: 45 }, { q: "Q4", h: 85 },
            ].map((q, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                <div className="w-full rounded-t" style={{ height: `${q.h}%`, background: i === 3 ? "#3B82F6" : "#E5E7EB" }} />
                <span className="text-[3px]" style={{ color: i === 3 ? "#3B82F6" : "#9CA3AF" }}>{q.q}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function DemoThumbnail({ category, industry, name }: { category: string; industry: string; name: string }) {
  const cat = (category || "").toLowerCase();
  const ind = (industry || "").toLowerCase();
  const nm = (name || "").toLowerCase();

  if (ind.includes("food") || nm.includes("restauracja") || nm.includes("restaurant"))
    return <RestaurantThumb />;
  if (nm.includes("barber") || nm.includes("fryzjer"))
    return <BarberThumb />;
  if (nm.includes("salon") || nm.includes("kosmetycz"))
    return <SalonThumb />;
  if (nm.includes("hotel") || nm.includes("apartament") || ind.includes("hospitality"))
    return <HotelThumb />;
  if (nm.includes("siłownia") || nm.includes("fitness") || ind.includes("fitness"))
    return <FitnessThumb />;
  if (nm.includes("wypożyczalnia") || (nm.includes("aut") && nm.includes("rezerwacj")) || ind.includes("automotive"))
    return <CarRentalThumb />;

  if (nm.includes("szaf") || ind.includes("furniture"))
    return <FurnitureConfigThumb />;
  if (nm.includes("kuchni") || ind.includes("kitchen"))
    return <KitchenConfigThumb />;

  if (cat.includes("healthcare") || ind.includes("medical") || nm.includes("klinika") || nm.includes("medycz"))
    return <HealthcareThumb />;

  if (nm.includes("deweloper") || nm.includes("nieruchom") || cat.includes("real estate"))
    return <RealEstateThumb />;
  if (nm.includes("biuro") || nm.includes("rachunkow") || ind.includes("finance"))
    return <AccountingThumb />;
  if (nm.includes("kancelaria") || nm.includes("prawn") || ind.includes("legal"))
    return <LawFirmThumb />;
  if (nm.includes("agencja") || nm.includes("marketingow") || ind.includes("marketing"))
    return <MarketingThumb />;

  if (cat.includes("e-commerce") || ind.includes("retail") || nm.includes("sklep") || nm.includes("e-commerce") || nm.includes("shop"))
    return <EcommerceThumb />;

  if (nm.includes("mentor") || nm.includes("premium"))
    return <MentoringThumb />;
  if (cat.includes("e-learning") || ind.includes("education") || nm.includes("szkoła") || nm.includes("kurs"))
    return <SchoolThumb />;

  if (cat.includes("ai") || nm.includes("ai") || nm.includes("chatbot") || nm.includes("assistant"))
    return <AiThumb />;

  if (cat.includes("events") || ind.includes("entertainment") || nm.includes("event") || nm.includes("bilet"))
    return <EventsThumb />;

  if ((cat.includes("service") || nm.includes("serwis") || nm.includes("napraw")) && ind.includes("it"))
    return <ServiceThumb />;

  if (cat.includes("service") || nm.includes("serwis") || nm.includes("napraw"))
    return <ServiceThumb />;

  if (cat.includes("calculator") || nm.includes("kalkulator") || nm.includes("wycen") || nm.includes("budowlan"))
    return <CalculatorThumb />;

  return <DashboardThumb />;
}
