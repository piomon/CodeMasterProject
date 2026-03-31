const base = "w-full h-full flex flex-col overflow-hidden select-none pointer-events-none relative";

function SalonThumb() {
  return (
    <div className={base} style={{ background: "#FFF8F0" }}>
      <div className="p-3 text-center" style={{ background: "linear-gradient(160deg, #5C4B3A, #D4A0A040)" }}>
        <div className="text-[5px] tracking-[0.3em] uppercase" style={{ color: "#D4A0A0" }}>Salon Urody</div>
        <div className="text-[11px] font-bold mt-0.5" style={{ color: "#FFF8F0" }}>Belle Beauty</div>
        <div className="text-[5px] mt-0.5" style={{ color: "#FFF8F090" }}>Zabiegi premium dla Twojej urody</div>
        <div className="flex gap-1 justify-center mt-1.5">
          <div className="px-2 py-0.5 rounded text-[5px] font-bold text-white" style={{ background: "#D4A0A0" }}>Umów wizytę</div>
          <div className="px-2 py-0.5 rounded text-[5px] border" style={{ borderColor: "#FFF8F040", color: "#FFF8F0" }}>Cennik</div>
        </div>
      </div>
      <div className="flex-1 p-2 flex flex-col gap-1.5">
        <div className="grid grid-cols-4 gap-1">
          {["💇‍♀️", "💅", "🧖‍♀️", "✨"].map((icon, i) => (
            <div key={i} className="p-1 rounded text-center" style={{ background: "#F5E6D3" }}>
              <span className="text-[8px]">{icon}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-1">
          {[{ v: "500+", l: "Klientek" }, { v: "4.9", l: "Ocena" }, { v: "8", l: "Lat" }].map((s, i) => (
            <div key={i} className="p-1 rounded text-center" style={{ background: "#D4A0A010" }}>
              <div className="text-[7px] font-bold" style={{ color: "#D4A0A0" }}>{s.v}</div>
              <div className="text-[4px]" style={{ color: "#8B7D6B" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BarberThumb() {
  return (
    <div className={base} style={{ background: "#1A1A1A" }}>
      <div className="p-3 text-center" style={{ background: "linear-gradient(160deg, #1A1A1A, #B8733330)" }}>
        <div className="text-[5px] tracking-[0.3em] uppercase" style={{ color: "#B87333" }}>Barber Shop</div>
        <div className="text-[11px] font-bold mt-0.5" style={{ color: "#C9A96E", fontFamily: "serif" }}>GENTLEMAN'S</div>
        <div className="text-[5px] mt-0.5 text-white/60">Klasyczny styl, mistrzowskie rzemiosło</div>
        <div className="flex gap-1 justify-center mt-1.5">
          <div className="px-2 py-0.5 rounded text-[5px] font-bold" style={{ background: "#B87333", color: "#FFF8F0" }}>Rezerwuj</div>
          <div className="px-2 py-0.5 rounded text-[5px] border border-white/20 text-white/70">Cennik</div>
        </div>
      </div>
      <div className="flex-1 p-2 flex flex-col gap-1.5">
        <div className="grid grid-cols-4 gap-1">
          {["✂️", "🪒", "🧴", "👑"].map((icon, i) => (
            <div key={i} className="p-1 rounded text-center bg-white/5">
              <span className="text-[8px]">{icon}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-1">
          {[{ v: "2,000+", l: "Klientów" }, { v: "4.9", l: "Ocena" }, { v: "12", l: "Lat" }].map((s, i) => (
            <div key={i} className="p-1 rounded text-center bg-white/5">
              <div className="text-[7px] font-bold" style={{ color: "#C9A96E" }}>{s.v}</div>
              <div className="text-[4px] text-white/40">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RestaurantThumb() {
  return (
    <div className={base} style={{ background: "#1A1A1A" }}>
      <div className="p-3 text-center" style={{ background: "linear-gradient(160deg, #1A1A1A, #2D5A2730)" }}>
        <div className="text-[5px] tracking-[0.3em] uppercase" style={{ color: "#708238" }}>Cucina Italiana</div>
        <div className="text-[11px] font-bold mt-0.5" style={{ color: "#C9A96E", fontFamily: "serif" }}>Trattoria</div>
        <div className="text-[5px] mt-0.5 text-white/60">Autentyczna kuchnia włoska</div>
        <div className="flex gap-1 justify-center mt-1.5">
          <div className="px-2 py-0.5 rounded text-[5px] font-bold" style={{ background: "#2D5A27", color: "#FFF8F0" }}>Rezerwacja</div>
          <div className="px-2 py-0.5 rounded text-[5px] border border-white/20 text-white/70">Menu</div>
        </div>
      </div>
      <div className="flex-1 p-2 flex flex-col gap-1.5">
        <div className="grid grid-cols-4 gap-1">
          {["🍕", "🍝", "🥂", "🍰"].map((icon, i) => (
            <div key={i} className="p-1 rounded text-center bg-white/5">
              <span className="text-[8px]">{icon}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-1">
          {[{ v: "4.8", l: "Ocena" }, { v: "200+", l: "Opinii" }, { v: "15", l: "Lat" }].map((s, i) => (
            <div key={i} className="p-1 rounded text-center bg-white/5">
              <div className="text-[7px] font-bold" style={{ color: "#C9A96E" }}>{s.v}</div>
              <div className="text-[4px] text-white/40">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HotelThumb() {
  return (
    <div className={base} style={{ background: "#0D1B2A" }}>
      <div className="p-3 text-center" style={{ background: "linear-gradient(160deg, #0D1B2A, #1B2838)" }}>
        <div className="text-[5px] tracking-[0.3em] uppercase" style={{ color: "#C9B037" }}>Luksusowy Wypoczynek</div>
        <div className="text-[11px] font-bold mt-0.5 text-white">Resort<span style={{ color: "#C9B037" }}>Hub</span></div>
        <div className="text-[5px] mt-0.5 text-white/60">Ekskluzywne pokoje i apartamenty</div>
        <div className="flex gap-1 justify-center mt-1.5">
          <div className="px-2 py-0.5 rounded text-[5px] font-bold" style={{ background: "#C9B037", color: "#0D1B2A" }}>Zarezerwuj</div>
          <div className="px-2 py-0.5 rounded text-[5px] border border-white/20 text-white/70">Oferta</div>
        </div>
      </div>
      <div className="flex-1 p-2 flex flex-col gap-1.5">
        <div className="grid grid-cols-4 gap-1">
          {["🏨", "🏊", "🍽️", "🧖"].map((icon, i) => (
            <div key={i} className="p-1 rounded text-center bg-white/5">
              <span className="text-[8px]">{icon}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-1">
          {[{ v: "120+", l: "Pokoi" }, { v: "4.9", l: "Ocena" }, { v: "5★", l: "Standard" }].map((s, i) => (
            <div key={i} className="p-1 rounded text-center bg-white/5">
              <div className="text-[7px] font-bold" style={{ color: "#C9B037" }}>{s.v}</div>
              <div className="text-[4px] text-white/40">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HealthcareThumb() {
  return (
    <div className={base} style={{ background: "#FFFFFF" }}>
      <div className="p-3 text-center" style={{ background: "linear-gradient(160deg, #2563EB, #1E3A5F)" }}>
        <div className="text-[5px] tracking-[0.3em] uppercase text-white/60">Platforma Medyczna</div>
        <div className="text-[11px] font-bold mt-0.5 text-white">MedCare<span style={{ color: "#60A5FA" }}>+</span></div>
        <div className="text-[5px] mt-0.5 text-white/70">Wizyty, recepty, wyniki — online</div>
        <div className="flex gap-1 justify-center mt-1.5">
          <div className="px-2 py-0.5 rounded text-[5px] font-bold text-white" style={{ background: "#10B981" }}>Umów wizytę</div>
          <div className="px-2 py-0.5 rounded text-[5px] border border-white/30 text-white">Lekarze</div>
        </div>
      </div>
      <div className="flex-1 p-2 flex flex-col gap-1.5">
        <div className="grid grid-cols-4 gap-1">
          {["🩺", "📱", "💊", "📋"].map((icon, i) => (
            <div key={i} className="p-1 rounded text-center" style={{ background: "#EFF6FF" }}>
              <span className="text-[8px]">{icon}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-1">
          {[{ v: "15K+", l: "Pacjentów" }, { v: "20+", l: "Lekarzy" }, { v: "4.9", l: "Ocena" }].map((s, i) => (
            <div key={i} className="p-1 rounded text-center" style={{ background: "#2563EB08" }}>
              <div className="text-[7px] font-bold" style={{ color: "#2563EB" }}>{s.v}</div>
              <div className="text-[4px]" style={{ color: "#6B7280" }}>{s.l}</div>
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
      <div className="p-3 text-center" style={{ background: "linear-gradient(160deg, #0A0A0A, #1A1A1A)" }}>
        <div className="text-[5px] tracking-[0.3em] uppercase" style={{ color: "#ADFF2F" }}>Centrum Fitness</div>
        <div className="text-[11px] font-bold mt-0.5 text-white">IRON<span style={{ color: "#ADFF2F" }}>FIT</span></div>
        <div className="text-[5px] mt-0.5 text-white/60">Siłownia, crossfit, zajęcia grupowe</div>
        <div className="flex gap-1 justify-center mt-1.5">
          <div className="px-2 py-0.5 rounded text-[5px] font-bold" style={{ background: "#ADFF2F", color: "#0A0A0A" }}>Kup karnet</div>
          <div className="px-2 py-0.5 rounded text-[5px] border border-white/20 text-white/60">Grafik</div>
        </div>
      </div>
      <div className="flex-1 p-2 flex flex-col gap-1.5">
        <div className="grid grid-cols-4 gap-1">
          {["💪", "🏋️", "🧘", "🏃"].map((icon, i) => (
            <div key={i} className="p-1 rounded text-center bg-white/5">
              <span className="text-[8px]">{icon}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-1">
          {[{ v: "1,500+", l: "Członków" }, { v: "30+", l: "Zajęć" }, { v: "4.8", l: "Ocena" }].map((s, i) => (
            <div key={i} className="p-1 rounded text-center bg-white/5">
              <div className="text-[7px] font-bold" style={{ color: "#ADFF2F" }}>{s.v}</div>
              <div className="text-[4px] text-white/40">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FurnitureConfigThumb() {
  return (
    <div className={base} style={{ background: "#FFF8F0" }}>
      <div className="p-3 text-center" style={{ background: "linear-gradient(160deg, #3C2415, #8B6F4730)" }}>
        <div className="text-[5px] tracking-[0.3em] uppercase" style={{ color: "#8B6F47" }}>Meble na wymiar</div>
        <div className="text-[11px] font-bold mt-0.5" style={{ color: "#FAF6F1" }}>FORM Studio</div>
        <div className="text-[5px] mt-0.5" style={{ color: "#FAF6F180" }}>Szafy, garderoby, zabudowy</div>
        <div className="flex gap-1 justify-center mt-1.5">
          <div className="px-2 py-0.5 rounded text-[5px] font-bold text-white" style={{ background: "#8B6F47" }}>Rozpocznij projekt</div>
          <div className="px-2 py-0.5 rounded text-[5px] border" style={{ borderColor: "#8B6F4740", color: "#8B6F47" }}>Materiały</div>
        </div>
      </div>
      <div className="flex-1 p-2 flex flex-col gap-1.5">
        <div className="grid grid-cols-4 gap-1">
          {["🪵", "📏", "🎨", "🚚"].map((icon, i) => (
            <div key={i} className="p-1 rounded text-center" style={{ background: "#FAF6F1" }}>
              <span className="text-[8px]">{icon}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-1">
          {[{ v: "500+", l: "Realizacji" }, { v: "4.9", l: "Ocena" }, { v: "10", l: "Lat" }].map((s, i) => (
            <div key={i} className="p-1 rounded text-center" style={{ background: "#8B6F4710" }}>
              <div className="text-[7px] font-bold" style={{ color: "#8B6F47" }}>{s.v}</div>
              <div className="text-[4px]" style={{ color: "#A08968" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function KitchenConfigThumb() {
  return (
    <div className={base} style={{ background: "#FAFAF5" }}>
      <div className="p-3 text-center" style={{ background: "linear-gradient(160deg, #3A3A2A, #6B8E2330)" }}>
        <div className="text-[5px] tracking-[0.3em] uppercase" style={{ color: "#6B8E23" }}>Kuchnie na wymiar</div>
        <div className="text-[11px] font-bold mt-0.5" style={{ color: "#FAFAF5" }}>KitchenLab</div>
        <div className="text-[5px] mt-0.5" style={{ color: "#FAFAF580" }}>Funkcjonalność i elegancja</div>
        <div className="flex gap-1 justify-center mt-1.5">
          <div className="px-2 py-0.5 rounded text-[5px] font-bold text-white" style={{ background: "#6B8E23" }}>Rozpocznij projekt</div>
          <div className="px-2 py-0.5 rounded text-[5px] border" style={{ borderColor: "#6B8E2340", color: "#6B8E23" }}>Materiały</div>
        </div>
      </div>
      <div className="flex-1 p-2 flex flex-col gap-1.5">
        <div className="grid grid-cols-4 gap-1">
          {["🍳", "📐", "🪨", "🔧"].map((icon, i) => (
            <div key={i} className="p-1 rounded text-center" style={{ background: "#F5F5EB" }}>
              <span className="text-[8px]">{icon}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-1">
          {[{ v: "500+", l: "Realizacji" }, { v: "4.9", l: "Ocena" }, { v: "10", l: "Lat" }].map((s, i) => (
            <div key={i} className="p-1 rounded text-center" style={{ background: "#6B8E2310" }}>
              <div className="text-[7px] font-bold" style={{ color: "#6B8E23" }}>{s.v}</div>
              <div className="text-[4px]" style={{ color: "#8C8C6E" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RealEstateThumb() {
  return (
    <div className={base} style={{ background: "#FFF8F0" }}>
      <div className="p-3 text-center" style={{ background: "linear-gradient(160deg, #1B2838, #B8733330)" }}>
        <div className="text-[5px] tracking-[0.3em] uppercase" style={{ color: "#B87333" }}>Inwestycje deweloperskie</div>
        <div className="text-[11px] font-bold mt-0.5 text-white">Nova<span style={{ color: "#B87333" }}>Residence</span></div>
        <div className="text-[5px] mt-0.5 text-white/60">Prestiżowe mieszkania i apartamenty</div>
        <div className="flex gap-1 justify-center mt-1.5">
          <div className="px-2 py-0.5 rounded text-[5px] font-bold text-white" style={{ background: "#B87333" }}>Oferta</div>
          <div className="px-2 py-0.5 rounded text-[5px] border border-white/20 text-white/70">Wirtualny spacer</div>
        </div>
      </div>
      <div className="flex-1 p-2 flex flex-col gap-1.5">
        <div className="grid grid-cols-4 gap-1">
          {["🏗️", "🗺️", "📐", "🏠"].map((icon, i) => (
            <div key={i} className="p-1 rounded text-center" style={{ background: "#F5E6D3" }}>
              <span className="text-[8px]">{icon}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-1">
          {[{ v: "45", l: "Mieszkań" }, { v: "92%", l: "Sprzedanych" }, { v: "Q2 2026", l: "Odbiór" }].map((s, i) => (
            <div key={i} className="p-1 rounded text-center" style={{ background: "#B8733310" }}>
              <div className="text-[7px] font-bold" style={{ color: "#B87333" }}>{s.v}</div>
              <div className="text-[4px]" style={{ color: "#6B7280" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AccountingThumb() {
  return (
    <div className={base} style={{ background: "#F8FAFC" }}>
      <div className="p-3 text-center" style={{ background: "linear-gradient(160deg, #1B3A5C, #4682B4)" }}>
        <div className="text-[5px] tracking-[0.3em] uppercase text-white/60">Biuro Rachunkowe Online</div>
        <div className="text-[11px] font-bold mt-0.5 text-white">FinBooks</div>
        <div className="text-[5px] mt-0.5 text-white/70">Faktury, ZUS, PIT — automatycznie</div>
        <div className="flex gap-1 justify-center mt-1.5">
          <div className="px-2 py-0.5 rounded text-[5px] font-bold text-white" style={{ background: "#4682B4" }}>Dodaj dokument</div>
          <div className="px-2 py-0.5 rounded text-[5px] border border-white/30 text-white">Dokumenty</div>
        </div>
      </div>
      <div className="flex-1 p-2 flex flex-col gap-1.5">
        <div className="grid grid-cols-4 gap-1">
          {["📄", "🏦", "📊", "🔒"].map((icon, i) => (
            <div key={i} className="p-1 rounded text-center" style={{ background: "#F1F5F9" }}>
              <span className="text-[8px]">{icon}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-1">
          {[{ v: "1,200+", l: "Firm" }, { v: "99.9%", l: "Uptime" }, { v: "4.8", l: "Ocena" }].map((s, i) => (
            <div key={i} className="p-1 rounded text-center" style={{ background: "#4682B408" }}>
              <div className="text-[7px] font-bold" style={{ color: "#4682B4" }}>{s.v}</div>
              <div className="text-[4px]" style={{ color: "#94A3B8" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LawFirmThumb() {
  return (
    <div className={base} style={{ background: "#FAF8F5" }}>
      <div className="p-3 text-center" style={{ background: "linear-gradient(160deg, #2C2C2C, #1B2838)" }}>
        <div className="text-[5px] tracking-[0.3em] uppercase" style={{ color: "#B8860B" }}>Kancelaria Adwokacka</div>
        <div className="text-[11px] font-bold mt-0.5" style={{ color: "#FAF8F5" }}>Lex & Partners</div>
        <div className="text-[5px] mt-0.5" style={{ color: "#FAF8F580" }}>Prawo gospodarcze, cywilne, rodzinne</div>
        <div className="flex gap-1 justify-center mt-1.5">
          <div className="px-2 py-0.5 rounded text-[5px] font-bold" style={{ background: "#B8860B", color: "#2C2C2C" }}>Konsultacja</div>
          <div className="px-2 py-0.5 rounded text-[5px] border" style={{ borderColor: "#FAF8F530", color: "#FAF8F5" }}>Specjalizacje</div>
        </div>
      </div>
      <div className="flex-1 p-2 flex flex-col gap-1.5">
        <div className="grid grid-cols-3 gap-1">
          {["⚖️", "📜", "🏛️", "💼", "🔒", "📋"].map((icon, i) => (
            <div key={i} className="p-1 rounded text-center" style={{ background: "#F5F3EF" }}>
              <span className="text-[7px]">{icon}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-1">
          {[{ v: "1000+", l: "Spraw" }, { v: "20", l: "Lat" }, { v: "8", l: "Adwokatów" }].map((s, i) => (
            <div key={i} className="p-1 rounded text-center" style={{ background: "#1B283808" }}>
              <div className="text-[7px] font-bold" style={{ color: "#B8860B" }}>{s.v}</div>
              <div className="text-[4px]" style={{ color: "#6B7280" }}>{s.l}</div>
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
      <div className="p-3 text-center" style={{ background: "linear-gradient(160deg, #0F172A, #1E293B)" }}>
        <div className="text-[5px] tracking-[0.3em] uppercase" style={{ color: "#00FF88" }}>AI-Powered Marketing</div>
        <div className="text-[11px] font-bold mt-0.5 text-white">Spark <span style={{ color: "#8B5CF6" }}>Agency</span></div>
        <div className="text-[5px] mt-0.5 text-white/60">Kampanie AI, pełna kontrola</div>
        <div className="flex gap-1 justify-center mt-1.5">
          <div className="px-2 py-0.5 rounded text-[5px] font-bold text-white" style={{ background: "linear-gradient(135deg, #3B82F6, #8B5CF6)" }}>Kampanie</div>
          <div className="px-2 py-0.5 rounded text-[5px] border border-white/20 text-white/60">AI Insights</div>
        </div>
      </div>
      <div className="flex-1 p-2 flex flex-col gap-1.5">
        <div className="grid grid-cols-4 gap-1">
          {["📈", "🤖", "📊", "🎯"].map((icon, i) => (
            <div key={i} className="p-1 rounded text-center bg-white/5">
              <span className="text-[8px]">{icon}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-1">
          {[{ v: "150+", l: "Klientów" }, { v: "24%", l: "Wzrost CTR" }, { v: "4.2x", l: "ROI" }].map((s, i) => (
            <div key={i} className="p-1 rounded text-center" style={{ background: "#3B82F608" }}>
              <div className="text-[7px] font-bold" style={{ color: "#3B82F6" }}>{s.v}</div>
              <div className="text-[4px] text-white/40">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SchoolThumb() {
  return (
    <div className={base} style={{ background: "#FFFFFF" }}>
      <div className="p-3 text-center" style={{ background: "linear-gradient(160deg, #1B2838, #2563EB)" }}>
        <div className="text-[5px] tracking-[0.3em] uppercase" style={{ color: "#F59E0B" }}>Platforma Edukacyjna</div>
        <div className="text-[11px] font-bold mt-0.5 text-white">Edu<span style={{ color: "#F59E0B" }}>Pro</span></div>
        <div className="text-[5px] mt-0.5 text-white/70">Kursy IT — ucz się w swoim tempie</div>
        <div className="flex gap-1 justify-center mt-1.5">
          <div className="px-2 py-0.5 rounded text-[5px] font-bold" style={{ background: "#F59E0B", color: "#1B2838" }}>Kursy</div>
          <div className="px-2 py-0.5 rounded text-[5px] border border-white/30 text-white">Kontynuuj</div>
        </div>
      </div>
      <div className="flex-1 p-2 flex flex-col gap-1.5">
        <div className="grid grid-cols-4 gap-1">
          {["📚", "🎥", "🏆", "👨‍🏫"].map((icon, i) => (
            <div key={i} className="p-1 rounded text-center" style={{ background: "#F1F5F9" }}>
              <span className="text-[8px]">{icon}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-1">
          {[{ v: "80+", l: "Kursów" }, { v: "5,000+", l: "Uczniów" }, { v: "4.8", l: "Ocena" }].map((s, i) => (
            <div key={i} className="p-1 rounded text-center" style={{ background: "#2563EB08" }}>
              <div className="text-[7px] font-bold" style={{ color: "#2563EB" }}>{s.v}</div>
              <div className="text-[4px]" style={{ color: "#6B7280" }}>{s.l}</div>
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
      <div className="p-3 text-center" style={{ background: "linear-gradient(160deg, #0A0A0A, #7C3AED40)" }}>
        <div className="text-[5px] tracking-[0.3em] uppercase" style={{ color: "#C9A96E" }}>Platforma Mentoringowa</div>
        <div className="text-[11px] font-bold mt-0.5" style={{ color: "#FFF8F0" }}>Mentor<span style={{ color: "#C9A96E" }}>Pro</span></div>
        <div className="text-[5px] mt-0.5" style={{ color: "#FFF8F080" }}>Sesje 1:1 z ekspertami</div>
        <div className="flex gap-1 justify-center mt-1.5">
          <div className="px-2 py-0.5 rounded text-[5px] font-bold" style={{ background: "linear-gradient(135deg, #7C3AED, #C9A96E)", color: "#FFF8F0" }}>Znajdź mentora</div>
          <div className="px-2 py-0.5 rounded text-[5px] border" style={{ borderColor: "#C9A96E40", color: "#C9A96E" }}>Karnety</div>
        </div>
      </div>
      <div className="flex-1 p-2 flex flex-col gap-1.5">
        <div className="grid grid-cols-4 gap-1">
          {["👨‍🏫", "🎥", "📋", "🏆"].map((icon, i) => (
            <div key={i} className="p-1 rounded text-center" style={{ background: "#2D2D2D" }}>
              <span className="text-[8px]">{icon}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-1">
          {[{ v: "50+", l: "Mentorów" }, { v: "2,400+", l: "Sesji" }, { v: "4.9", l: "Ocena" }].map((s, i) => (
            <div key={i} className="p-1 rounded text-center" style={{ background: "#2D2D2D" }}>
              <div className="text-[7px] font-bold" style={{ color: "#C9A96E" }}>{s.v}</div>
              <div className="text-[4px] text-white/40">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function EventsThumb() {
  return (
    <div className={base} style={{ background: "#0A0A0A" }}>
      <div className="p-3 text-center" style={{ background: "linear-gradient(160deg, #0A0A0A, #8B5CF660)" }}>
        <div className="text-[5px] tracking-[0.3em] uppercase" style={{ color: "#06B6D4" }}>Platforma Eventowa</div>
        <div className="text-[11px] font-bold mt-0.5 text-white">Event<span style={{ color: "#EC4899" }}>Hub</span></div>
        <div className="text-[5px] mt-0.5 text-white/60">Konferencje, meetupy, warsztaty</div>
        <div className="flex gap-1 justify-center mt-1.5">
          <div className="px-2 py-0.5 rounded text-[5px] font-bold text-white" style={{ background: "linear-gradient(135deg, #8B5CF6, #EC4899)" }}>Wydarzenia</div>
          <div className="px-2 py-0.5 rounded text-[5px] border border-white/20 text-white/60">Mój bilet</div>
        </div>
      </div>
      <div className="flex-1 p-2 flex flex-col gap-1.5">
        <div className="grid grid-cols-4 gap-1">
          {["🎤", "🚀", "🎨", "📱"].map((icon, i) => (
            <div key={i} className="p-1 rounded text-center" style={{ background: "#1E1E1E" }}>
              <span className="text-[8px]">{icon}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-1">
          {[{ v: "50+", l: "Eventów" }, { v: "10K+", l: "Uczestników" }, { v: "4.9", l: "Ocena" }].map((s, i) => (
            <div key={i} className="p-1 rounded text-center" style={{ background: "#1E1E1E" }}>
              <div className="text-[7px] font-bold" style={{ color: "#EC4899" }}>{s.v}</div>
              <div className="text-[4px] text-white/40">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CarRentalThumb() {
  return (
    <div className={base} style={{ background: "#0A0A0A" }}>
      <div className="p-3 text-center" style={{ background: "linear-gradient(160deg, #0A0A0A, #DC262620)" }}>
        <div className="text-[5px] tracking-[0.3em] uppercase" style={{ color: "#DC2626" }}>Premium Rental</div>
        <div className="text-[11px] font-bold mt-0.5 text-white">Drive<span style={{ color: "#DC2626" }}>X</span></div>
        <div className="text-[5px] mt-0.5 text-white/60">Wynajem aut premium</div>
        <div className="flex gap-1 justify-center mt-1.5">
          <div className="px-2 py-0.5 rounded text-[5px] font-bold text-white" style={{ background: "#DC2626" }}>Rezerwuj</div>
          <div className="px-2 py-0.5 rounded text-[5px] border border-white/20 text-white/60">Flota</div>
        </div>
      </div>
      <div className="flex-1 p-2 flex flex-col gap-1.5">
        <div className="grid grid-cols-4 gap-1">
          {["🚗", "🚙", "⚡", "🏎️"].map((icon, i) => (
            <div key={i} className="p-1 rounded text-center bg-white/5">
              <span className="text-[8px]">{icon}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-1">
          {[{ v: "50+", l: "Aut" }, { v: "3K+", l: "Wynajmów" }, { v: "4.9", l: "Ocena" }].map((s, i) => (
            <div key={i} className="p-1 rounded text-center bg-white/5">
              <div className="text-[7px] font-bold" style={{ color: "#DC2626" }}>{s.v}</div>
              <div className="text-[4px] text-white/40">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ServiceThumb() {
  return (
    <div className={base} style={{ background: "#F8FAFC" }}>
      <div className="p-3 text-center" style={{ background: "linear-gradient(160deg, #1B3A5C, #2563EB)" }}>
        <div className="text-[5px] tracking-[0.3em] uppercase text-white/60">Profesjonalny Serwis</div>
        <div className="text-[11px] font-bold mt-0.5 text-white">FixIt <span style={{ color: "#60A5FA" }}>Pro</span></div>
        <div className="text-[5px] mt-0.5 text-white/70">Naprawa elektroniki</div>
        <div className="flex gap-1 justify-center mt-1.5">
          <div className="px-2 py-0.5 rounded text-[5px] font-bold text-white" style={{ background: "#2563EB" }}>Zgłoś naprawę</div>
          <div className="px-2 py-0.5 rounded text-[5px] border border-white/30 text-white">Status</div>
        </div>
      </div>
      <div className="flex-1 p-2 flex flex-col gap-1.5">
        <div className="grid grid-cols-4 gap-1">
          {["📱", "💻", "⏱️", "🛡️"].map((icon, i) => (
            <div key={i} className="p-1 rounded text-center" style={{ background: "#F1F5F9" }}>
              <span className="text-[8px]">{icon}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-1">
          {[{ v: "5,000+", l: "Napraw" }, { v: "98%", l: "Zadowolonych" }, { v: "1h", l: "Avg. czas" }].map((s, i) => (
            <div key={i} className="p-1 rounded text-center" style={{ background: "#2563EB08" }}>
              <div className="text-[7px] font-bold" style={{ color: "#2563EB" }}>{s.v}</div>
              <div className="text-[4px]" style={{ color: "#6B7280" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CalculatorThumb() {
  return (
    <div className={base} style={{ background: "#2D2D2D" }}>
      <div className="p-3 text-center" style={{ background: "linear-gradient(160deg, #2D2D2D, #1A1A1A)" }}>
        <div className="text-[5px] tracking-[0.3em] uppercase" style={{ color: "#E87D2F" }}>Kalkulator Budowlany</div>
        <div className="text-[11px] font-bold mt-0.5 text-white">Build<span style={{ color: "#E87D2F" }}>Calc</span></div>
        <div className="text-[5px] mt-0.5" style={{ color: "#8C8C8C" }}>Kosztorysy budowy i remontu</div>
        <div className="flex gap-1 justify-center mt-1.5">
          <div className="px-2 py-0.5 rounded text-[5px] font-bold text-white" style={{ background: "#E87D2F" }}>Kalkulacja</div>
          <div className="px-2 py-0.5 rounded text-[5px] border" style={{ borderColor: "#E87D2F40", color: "#E87D2F" }}>Cennik</div>
        </div>
      </div>
      <div className="flex-1 p-2 flex flex-col gap-1.5">
        <div className="grid grid-cols-4 gap-1">
          {["🏠", "🔧", "🏢", "📐"].map((icon, i) => (
            <div key={i} className="p-1 rounded text-center" style={{ background: "#F5F3EF" }}>
              <span className="text-[8px]">{icon}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-1">
          {[{ v: "5,200+", l: "Kalkulacji" }, { v: "340", l: "Pozycji" }, { v: "4 500 zł", l: "Avg/m²" }].map((s, i) => (
            <div key={i} className="p-1 rounded text-center" style={{ background: "#D4C5A920" }}>
              <div className="text-[7px] font-bold" style={{ color: "#E87D2F" }}>{s.v}</div>
              <div className="text-[4px]" style={{ color: "#8C8C8C" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function EcommerceThumb() {
  return (
    <div className={base} style={{ background: "#0A0A0A" }}>
      <div className="p-3 text-center" style={{ background: "linear-gradient(160deg, #0A0A0A, #2D2D2D)" }}>
        <div className="text-[5px] tracking-[0.3em] uppercase" style={{ color: "#C9A96E" }}>Premium Accessories</div>
        <div className="text-[11px] font-bold mt-0.5" style={{ color: "#C9A96E", letterSpacing: "0.15em" }}>LUXE</div>
        <div className="text-[5px] mt-0.5 text-white/60">Luksusowe akcesoria i galanteria</div>
        <div className="flex gap-1 justify-center mt-1.5">
          <div className="px-2 py-0.5 rounded text-[5px] font-bold" style={{ background: "#C9A96E", color: "#0A0A0A" }}>Kup teraz</div>
          <div className="px-2 py-0.5 rounded text-[5px] border border-white/20 text-white/60">Nowości</div>
        </div>
      </div>
      <div className="flex-1 p-2 flex flex-col gap-1.5">
        <div className="grid grid-cols-4 gap-1">
          {["👜", "🧳", "⌚", "🕶️"].map((icon, i) => (
            <div key={i} className="p-1 rounded text-center bg-white/5">
              <span className="text-[8px]">{icon}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-1">
          {[{ v: "500+", l: "Produktów" }, { v: "10K+", l: "Klientów" }, { v: "4.8", l: "Ocena" }].map((s, i) => (
            <div key={i} className="p-1 rounded text-center bg-white/5">
              <div className="text-[7px] font-bold" style={{ color: "#C9A96E" }}>{s.v}</div>
              <div className="text-[4px] text-white/40">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AiThumb() {
  return (
    <div className={base} style={{ background: "#0F172A" }}>
      <div className="p-3 text-center" style={{ background: "linear-gradient(160deg, #0F172A, #8B5CF640)" }}>
        <div className="text-[5px] tracking-[0.3em] uppercase" style={{ color: "#06B6D4" }}>AI-Powered Sales</div>
        <div className="text-[11px] font-bold mt-0.5 text-white">Nexus<span style={{ color: "#06B6D4" }}>AI</span></div>
        <div className="text-[5px] mt-0.5 text-white/60">Platforma sprzedaży B2B</div>
        <div className="flex gap-1 justify-center mt-1.5">
          <div className="px-2 py-0.5 rounded text-[5px] font-bold text-white" style={{ background: "linear-gradient(135deg, #8B5CF6, #06B6D4)" }}>Leady AI</div>
          <div className="px-2 py-0.5 rounded text-[5px] border border-white/20 text-white/60">AI Chat</div>
        </div>
      </div>
      <div className="flex-1 p-2 flex flex-col gap-1.5">
        <div className="grid grid-cols-4 gap-1">
          {["🤖", "💬", "📊", "⚡"].map((icon, i) => (
            <div key={i} className="p-1 rounded text-center bg-white/5">
              <span className="text-[8px]">{icon}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-1">
          {[{ v: "200+", l: "Firm B2B" }, { v: "35%", l: "Wzrost" }, { v: "4.2x", l: "ROI" }].map((s, i) => (
            <div key={i} className="p-1 rounded text-center bg-white/5">
              <div className="text-[7px] font-bold" style={{ color: "#06B6D4" }}>{s.v}</div>
              <div className="text-[4px] text-white/40">{s.l}</div>
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
      <div className="p-3 text-center" style={{ background: "linear-gradient(160deg, #0F172A, #3B82F6)" }}>
        <div className="text-[5px] tracking-[0.3em] uppercase text-white/60">Business Intelligence</div>
        <div className="text-[11px] font-bold mt-0.5 text-white">Dashboard</div>
        <div className="text-[5px] mt-0.5 text-white/70">Panel analityczny Twojego biznesu</div>
        <div className="flex gap-1 justify-center mt-1.5">
          <div className="px-2 py-0.5 rounded text-[5px] font-bold text-white" style={{ background: "#3B82F6" }}>Rozpocznij analizę</div>
          <div className="px-2 py-0.5 rounded text-[5px] border border-white/30 text-white">Zobacz raporty</div>
        </div>
      </div>
      <div className="flex-1 p-2 flex flex-col gap-1.5">
        <div className="grid grid-cols-4 gap-1">
          {["📊", "📈", "🎯", "💡"].map((icon, i) => (
            <div key={i} className="p-1 rounded text-center" style={{ background: "#F1F5F9" }}>
              <span className="text-[8px]">{icon}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-1">
          {[{ v: "128K zł", l: "Przychód" }, { v: "2,480", l: "Users" }, { v: "89%", l: "Aktywność" }].map((s, i) => (
            <div key={i} className="p-1 rounded text-center" style={{ background: "#3B82F608" }}>
              <div className="text-[7px] font-bold" style={{ color: "#3B82F6" }}>{s.v}</div>
              <div className="text-[4px]" style={{ color: "#64748B" }}>{s.l}</div>
            </div>
          ))}
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

  if (nm.includes("mentor") || nm.includes("premium"))
    return <MentoringThumb />;
  if (cat.includes("e-learning") || ind.includes("education") || nm.includes("szkoła") || nm.includes("kurs"))
    return <SchoolThumb />;

  if (cat.includes("ai") || nm.includes("ai") || nm.includes("chatbot") || nm.includes("assistant"))
    return <AiThumb />;

  if (cat.includes("events") || ind.includes("entertainment") || nm.includes("event") || nm.includes("bilet"))
    return <EventsThumb />;

  if (cat.includes("service") || nm.includes("serwis") || nm.includes("napraw"))
    return <ServiceThumb />;

  if (cat.includes("calculator") || nm.includes("kalkulator") || nm.includes("wycen") || nm.includes("budowlan"))
    return <CalculatorThumb />;

  if (cat.includes("e-commerce") || ind.includes("retail") || nm.includes("sklep") || nm.includes("e-commerce") || nm.includes("shop"))
    return <EcommerceThumb />;

  return <DashboardThumb />;
}
