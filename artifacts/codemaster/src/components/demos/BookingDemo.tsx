import { useState } from "react";
import { motion } from "framer-motion";
import { PreviewShell, DemoNav, DemoSection, DemoStatCard, DemoTable, DemoBadge, DemoHero } from "./PreviewShell";
import {
  Calendar, Clock, Users, Star, Bell, CheckCircle2, ChevronRight,
  Phone, Mail, MapPin, Scissors, Heart, User, Settings, BarChart3,
  CreditCard, Plus, Search, Filter, LogOut, Home, Sparkles
} from "lucide-react";

export function BookingDemo({ name, features, industry }: { name: string; features: string[]; industry: string }) {
  const [page, setPage] = useState("home");
  const isSalon = industry.toLowerCase().includes("beauty") || industry.toLowerCase().includes("salon") || industry.toLowerCase().includes("barber") || industry.toLowerCase().includes("fryzjer");
  const isHotel = industry.toLowerCase().includes("hotel") || industry.toLowerCase().includes("hospitality");
  const isFitness = industry.toLowerCase().includes("fitness") || industry.toLowerCase().includes("siłownia");
  const isAuto = industry.toLowerCase().includes("auto") || industry.toLowerCase().includes("wypożyczalnia");

  const tabs = [
    { id: "home", label: "Strona główna", icon: <Home className="w-3 h-3" /> },
    { id: "booking", label: "Rezerwacja", icon: <Calendar className="w-3 h-3" /> },
    { id: "client", label: "Panel klienta", icon: <User className="w-3 h-3" /> },
    { id: "admin", label: "Panel admin", icon: <Settings className="w-3 h-3" /> },
  ];

  return (
    <PreviewShell title={name}>
      <DemoNav tabs={tabs} activeTab={page} onTabChange={setPage} logo={name.split("—")[0].trim()} />
      {page === "home" && <BookingHome name={name} isSalon={isSalon} isHotel={isHotel} isFitness={isFitness} isAuto={isAuto} features={features} onNavigate={setPage} />}
      {page === "booking" && <BookingPage isSalon={isSalon} isHotel={isHotel} isFitness={isFitness} isAuto={isAuto} />}
      {page === "client" && <ClientPanel isSalon={isSalon} />}
      {page === "admin" && <AdminPanel />}
    </PreviewShell>
  );
}

function BookingHome({ name, isSalon, isHotel, isFitness, isAuto, features, onNavigate }: any) {
  const services = isSalon
    ? [{ name: "Strzyżenie damskie", price: "120 PLN", time: "45 min", icon: <Scissors className="w-5 h-5" /> },
       { name: "Koloryzacja", price: "250 PLN", time: "90 min", icon: <Heart className="w-5 h-5" /> },
       { name: "Manicure hybrydowy", price: "80 PLN", time: "60 min", icon: <Sparkles className="w-5 h-5" /> },
       { name: "Pielęgnacja brwi", price: "60 PLN", time: "30 min", icon: <Star className="w-5 h-5" /> }]
    : isHotel
    ? [{ name: "Pokój Standard", price: "299 PLN/noc", time: "2 os.", icon: <Home className="w-5 h-5" /> },
       { name: "Pokój Premium", price: "499 PLN/noc", time: "2 os.", icon: <Star className="w-5 h-5" /> },
       { name: "Apartament", price: "799 PLN/noc", time: "4 os.", icon: <Sparkles className="w-5 h-5" /> },
       { name: "Penthouse Suite", price: "1299 PLN/noc", time: "4 os.", icon: <CreditCard className="w-5 h-5" /> }]
    : isFitness
    ? [{ name: "Trening personalny", price: "150 PLN", time: "60 min", icon: <Users className="w-5 h-5" /> },
       { name: "Yoga", price: "40 PLN", time: "75 min", icon: <Heart className="w-5 h-5" /> },
       { name: "CrossFit", price: "50 PLN", time: "60 min", icon: <Star className="w-5 h-5" /> },
       { name: "Karnet miesięczny", price: "199 PLN", time: "∞", icon: <CreditCard className="w-5 h-5" /> }]
    : [{ name: "Sedan Premium", price: "199 PLN/dzień", time: "od 1 dnia", icon: <Home className="w-5 h-5" /> },
       { name: "SUV Komfort", price: "299 PLN/dzień", time: "od 1 dnia", icon: <Star className="w-5 h-5" /> },
       { name: "Van 9 os.", price: "399 PLN/dzień", time: "od 2 dni", icon: <Users className="w-5 h-5" /> },
       { name: "Elektryczny", price: "249 PLN/dzień", time: "od 1 dnia", icon: <Sparkles className="w-5 h-5" /> }];

  const reviews = [
    { author: "Anna K.", rating: 5, text: "Wspaniała obsługa, polecam serdecznie!" },
    { author: "Marek W.", rating: 5, text: "Profesjonalizm na najwyższym poziomie." },
    { author: "Katarzyna M.", rating: 4, text: "Bardzo miła atmosfera, na pewno wrócę." },
  ];

  return (
    <div>
      <div className="bg-gradient-to-br from-primary/20 via-accent/10 to-background p-6 md:p-10 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(var(--primary-rgb,99,102,241),0.15),transparent_60%)]" />
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-4 border border-primary/30">
            {isSalon ? <Scissors className="w-8 h-8 text-primary" /> : isHotel ? <Home className="w-8 h-8 text-primary" /> : isFitness ? <Heart className="w-8 h-8 text-primary" /> : <Star className="w-8 h-8 text-primary" />}
          </div>
          <h1 className="font-display font-bold text-2xl md:text-3xl mb-2">{name.split("—")[0].trim()}</h1>
          <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
            {isSalon ? "Zadbaj o siebie w profesjonalnym salonie. Zarezerwuj wizytę online w 30 sekund." :
             isHotel ? "Twój wymarzony wypoczynek na wyciągnięcie ręki. Zarezerwuj pokój online." :
             isFitness ? "Trenuj z najlepszymi. Zapisz się na zajęcia i zacznij transformację." :
             "Wynajmij samochód szybko i wygodnie. Bogata flota do wyboru."}
          </p>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onNavigate("booking")}
            className="px-6 py-3 rounded-xl bg-primary text-white font-semibold text-sm shadow-lg shadow-primary/25 inline-flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" /> Zarezerwuj teraz
          </motion.button>
        </div>
      </div>

      <DemoSection>
        <h3 className="font-display font-bold text-lg">
          {isSalon ? "Nasze usługi" : isHotel ? "Pokoje i apartamenty" : isFitness ? "Zajęcia i karnety" : "Nasza flota"}
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {services.map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -2, borderColor: "var(--primary)" }}
              className="p-4 rounded-xl border border-border bg-card cursor-pointer transition-all"
              onClick={() => onNavigate("booking")}
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-3">{s.icon}</div>
              <h4 className="font-semibold text-sm mb-1">{s.name}</h4>
              <div className="flex items-center justify-between">
                <span className="text-primary font-bold text-sm">{s.price}</span>
                <span className="text-[10px] text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" /> {s.time}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <h3 className="font-display font-bold text-lg pt-4">Opinie klientów</h3>
        <div className="space-y-3">
          {reviews.map((r, i) => (
            <div key={i} className="p-4 rounded-xl border border-border bg-card">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">{r.author[0]}</div>
                <div>
                  <span className="font-semibold text-xs">{r.author}</span>
                  <div className="flex gap-0.5">{Array.from({ length: r.rating }).map((_, j) => <Star key={j} className="w-3 h-3 text-yellow-500 fill-yellow-500" />)}</div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">{r.text}</p>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-xl bg-secondary/50 border border-border space-y-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> ul. Przykładowa 15, 00-001 Warszawa</div>
          <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary" /> +48 123 456 789</div>
          <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary" /> kontakt@przyklad.pl</div>
          <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> Pon-Pt 8:00–20:00, Sob 9:00–16:00</div>
        </div>
      </DemoSection>
    </div>
  );
}

function BookingPage({ isSalon, isHotel, isFitness, isAuto }: any) {
  const [step, setStep] = useState(1);
  const [selectedDay, setSelectedDay] = useState(15);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", notes: "" });
  const [booked, setBooked] = useState(false);

  const days = Array.from({ length: 28 }, (_, i) => i + 1);
  const dayHeaders = ["Pn", "Wt", "Śr", "Cz", "Pt", "Sb", "Nd"];
  const slots = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "13:00", "14:00", "14:30", "15:00", "16:00", "17:00"];
  const busySlots = ["10:00", "11:00", "14:00"];

  const serviceList = isSalon
    ? ["Strzyżenie damskie — 120 PLN", "Strzyżenie męskie — 60 PLN", "Koloryzacja — 250 PLN", "Manicure hybrydowy — 80 PLN", "Pedicure — 90 PLN", "Pielęgnacja brwi — 60 PLN"]
    : isHotel
    ? ["Pokój Standard — 299 PLN/noc", "Pokój Premium — 499 PLN/noc", "Apartament — 799 PLN/noc", "Suite Penthouse — 1299 PLN/noc"]
    : isFitness
    ? ["Trening personalny — 150 PLN", "Yoga — 40 PLN", "CrossFit — 50 PLN", "Pilates — 45 PLN", "Spinning — 35 PLN"]
    : ["Sedan Premium — 199 PLN/dzień", "SUV Komfort — 299 PLN/dzień", "Van 9 os. — 399 PLN/dzień", "Elektryczny — 249 PLN/dzień"];

  if (booked) {
    return (
      <DemoSection>
        <div className="text-center py-10 space-y-4">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </motion.div>
          <h2 className="font-display font-bold text-2xl">Rezerwacja potwierdzona!</h2>
          <p className="text-sm text-muted-foreground">Potwierdzenie wysłane na {formData.email || "twój email"}</p>
          <div className="p-4 rounded-xl bg-secondary/50 border border-border text-sm space-y-2 max-w-sm mx-auto text-left">
            <div className="flex justify-between"><span className="text-muted-foreground">Usługa:</span><span className="font-medium">{selectedService.split("—")[0]}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Data:</span><span className="font-medium">{selectedDay} marca 2026</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Godzina:</span><span className="font-medium">{selectedSlot}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Nr ref:</span><span className="font-medium text-primary">#BK-{Math.random().toString(36).substr(2, 6).toUpperCase()}</span></div>
          </div>
          <button onClick={() => { setBooked(false); setStep(1); setSelectedSlot(""); setSelectedService(""); }} className="px-6 py-2 rounded-lg bg-primary text-white text-sm font-medium mt-4">
            Nowa rezerwacja
          </button>
        </div>
      </DemoSection>
    );
  }

  return (
    <DemoSection>
      <div className="flex items-center gap-3 mb-2">
        {[1, 2, 3].map(s => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${step >= s ? "bg-primary text-white border-primary" : "border-border text-muted-foreground"}`}>{s}</div>
            {s < 3 && <div className={`w-8 h-0.5 ${step > s ? "bg-primary" : "bg-border"}`} />}
          </div>
        ))}
        <span className="text-xs text-muted-foreground ml-2">{step === 1 ? "Wybierz usługę" : step === 2 ? "Termin" : "Potwierdź"}</span>
      </div>

      {step === 1 && (
        <div className="space-y-2">
          <h3 className="font-semibold text-sm">Wybierz usługę</h3>
          {serviceList.map((s, i) => (
            <button
              key={i}
              onClick={() => { setSelectedService(s); setStep(2); }}
              className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between ${selectedService === s ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}
            >
              <span className="text-sm font-medium">{s.split("—")[0]}</span>
              <span className="text-sm text-primary font-bold">{s.split("—")[1]}</span>
            </button>
          ))}
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-sm">Wybierz termin — {selectedService.split("—")[0]}</h3>
          <div className="rounded-xl border border-border p-3">
            <div className="flex items-center justify-between mb-3">
              <span className="font-semibold text-sm">Marzec 2026</span>
              <div className="flex gap-1">
                <button className="p-1 rounded hover:bg-secondary"><ChevronRight className="w-4 h-4 rotate-180" /></button>
                <button className="p-1 rounded hover:bg-secondary"><ChevronRight className="w-4 h-4" /></button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              {dayHeaders.map(d => <div key={d} className="text-muted-foreground font-medium py-1">{d}</div>)}
              {days.map(d => (
                <button key={d} onClick={() => setSelectedDay(d)}
                  className={`py-1.5 rounded-md text-xs transition-all ${d === selectedDay ? "bg-primary text-white font-bold" : [6,7,13,14,20,21,27,28].includes(d) ? "text-muted-foreground/40" : "hover:bg-secondary"}`}>
                  {d}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Dostępne godziny — {selectedDay} marca</p>
            <div className="grid grid-cols-4 gap-2">
              {slots.map(s => {
                const busy = busySlots.includes(s);
                return (
                  <button key={s} onClick={() => !busy && setSelectedSlot(s)} disabled={busy}
                    className={`py-2 rounded-lg text-xs font-medium transition-all border ${busy ? "border-border text-muted-foreground/30 bg-secondary/30 cursor-not-allowed line-through" : selectedSlot === s ? "bg-primary text-white border-primary" : "border-border hover:border-primary/50"}`}>
                    {s}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setStep(1)} className="px-4 py-2 rounded-lg border border-border text-sm">Wstecz</button>
            <button onClick={() => selectedSlot && setStep(3)} disabled={!selectedSlot}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold text-white ${selectedSlot ? "bg-primary" : "bg-primary/50 cursor-not-allowed"}`}>
              Dalej
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-sm">Potwierdź rezerwację</h3>
          <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 space-y-1 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Usługa:</span><span className="font-medium">{selectedService.split("—")[0]}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Termin:</span><span className="font-medium">{selectedDay} marca 2026, {selectedSlot}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Cena:</span><span className="font-bold text-primary">{selectedService.split("—")[1]}</span></div>
          </div>
          <div className="space-y-3">
            <input placeholder="Imię i nazwisko *" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:border-primary focus:outline-none" />
            <input placeholder="Telefon *" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:border-primary focus:outline-none" />
            <input placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:border-primary focus:outline-none" />
            <textarea placeholder="Uwagi (opcjonalnie)" value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})}
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:border-primary focus:outline-none min-h-[60px]" />
          </div>
          <div className="flex gap-2">
            <button onClick={() => setStep(2)} className="px-4 py-2 rounded-lg border border-border text-sm">Wstecz</button>
            <motion.button whileTap={{ scale: 0.97 }} onClick={() => setBooked(true)}
              className="flex-1 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold shadow-lg shadow-primary/25">
              Rezerwuję
            </motion.button>
          </div>
        </div>
      )}
    </DemoSection>
  );
}

function ClientPanel({ isSalon }: { isSalon: boolean }) {
  const [tab, setTab] = useState("upcoming");
  const bookings = [
    { service: isSalon ? "Strzyżenie damskie" : "Pokój Premium", date: "22.03.2026", time: "10:00", status: "confirmed" },
    { service: isSalon ? "Manicure hybrydowy" : "Apartament", date: "28.03.2026", time: "14:30", status: "confirmed" },
  ];
  const history = [
    { service: isSalon ? "Koloryzacja" : "Pokój Standard", date: "05.02.2026", price: isSalon ? "250 PLN" : "299 PLN", rated: true },
    { service: isSalon ? "Strzyżenie + modelowanie" : "Suite", date: "15.01.2026", price: isSalon ? "150 PLN" : "1299 PLN", rated: false },
    { service: isSalon ? "Pedicure spa" : "Pokój Premium", date: "02.01.2026", price: isSalon ? "120 PLN" : "499 PLN", rated: true },
  ];

  return (
    <DemoSection>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">AK</div>
          <div>
            <h3 className="font-display font-bold">Anna Kowalska</h3>
            <p className="text-xs text-muted-foreground">Klient od: styczeń 2025 • Punkty lojalnościowe: 340</p>
          </div>
        </div>
        <button className="p-2 rounded-lg border border-border hover:bg-secondary"><LogOut className="w-4 h-4" /></button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="p-3 rounded-xl bg-primary/5 border border-primary/20 text-center">
          <p className="text-2xl font-bold text-primary">{bookings.length}</p>
          <p className="text-[10px] text-muted-foreground">Nadchodzące</p>
        </div>
        <div className="p-3 rounded-xl bg-secondary/50 border border-border text-center">
          <p className="text-2xl font-bold">{history.length + bookings.length}</p>
          <p className="text-[10px] text-muted-foreground">Łącznie wizyt</p>
        </div>
        <div className="p-3 rounded-xl bg-yellow-500/5 border border-yellow-500/20 text-center">
          <p className="text-2xl font-bold text-yellow-500">340</p>
          <p className="text-[10px] text-muted-foreground">Punkty</p>
        </div>
      </div>

      <div className="flex gap-2 border-b border-border">
        {[{ id: "upcoming", label: "Nadchodzące" }, { id: "history", label: "Historia" }, { id: "loyalty", label: "Program lojalnościowy" }].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`px-3 py-2 text-xs font-medium border-b-2 transition-all ${tab === t.id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === "upcoming" && (
        <div className="space-y-3">
          {bookings.map((b, i) => (
            <div key={i} className="p-4 rounded-xl border border-border bg-card flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-sm">{b.service}</h4>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
                  <Calendar className="w-3 h-3" /> {b.date} <Clock className="w-3 h-3" /> {b.time}
                </p>
              </div>
              <div className="flex gap-2">
                <DemoBadge variant="success">Potwierdzona</DemoBadge>
                <button className="text-xs text-destructive hover:underline">Anuluj</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {tab === "history" && (
        <div className="space-y-3">
          {history.map((h, i) => (
            <div key={i} className="p-4 rounded-xl border border-border bg-card flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-sm">{h.service}</h4>
                <p className="text-xs text-muted-foreground mt-1">{h.date} • {h.price}</p>
              </div>
              {h.rated ? <div className="flex gap-0.5">{Array.from({length:5}).map((_,j) => <Star key={j} className="w-3 h-3 text-yellow-500 fill-yellow-500" />)}</div>
                : <button className="text-xs text-primary hover:underline">Oceń wizytę</button>}
            </div>
          ))}
        </div>
      )}
      {tab === "loyalty" && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-gradient-to-r from-yellow-500/10 to-primary/10 border border-yellow-500/20">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium">Twój poziom: <span className="text-yellow-500 font-bold">GOLD</span></span>
              <span className="text-xs text-muted-foreground">340 / 500 pkt do Platinum</span>
            </div>
            <div className="h-2 rounded-full bg-secondary overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-yellow-500 to-primary" style={{ width: "68%" }} />
            </div>
          </div>
          <div className="space-y-2">
            {[{ label: "5% rabatu na wszystkie usługi", pts: "100 pkt", active: true }, { label: "Darmowa pielęgnacja dłoni", pts: "200 pkt", active: true }, { label: "15% rabatu na koloryzację", pts: "400 pkt", active: false }].map((r, i) => (
              <div key={i} className={`p-3 rounded-lg border flex items-center justify-between ${r.active ? "border-green-500/30 bg-green-500/5" : "border-border opacity-60"}`}>
                <span className="text-xs font-medium">{r.label}</span>
                <span className="text-[10px] text-muted-foreground">{r.pts}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </DemoSection>
  );
}

function AdminPanel() {
  const [tab, setTab] = useState("today");
  const todayBookings = [
    { time: "09:00", client: "Anna K.", service: "Strzyżenie", status: "done" },
    { time: "10:00", client: "Maria W.", service: "Koloryzacja", status: "in-progress" },
    { time: "11:30", client: "Jan N.", service: "Manicure", status: "upcoming" },
    { time: "13:00", client: "Ewa S.", service: "Pielęgnacja brwi", status: "upcoming" },
    { time: "14:30", client: "Piotr M.", service: "Strzyżenie męskie", status: "upcoming" },
  ];

  return (
    <DemoSection>
      <div className="flex items-center justify-between">
        <h3 className="font-display font-bold text-lg">Panel Administratora</h3>
        <DemoBadge variant="info">Dzisiaj: {todayBookings.length} wizyt</DemoBadge>
      </div>

      <div className="grid grid-cols-4 gap-2">
        <DemoStatCard icon={<Calendar className="w-4 h-4" />} label="Dziś" value="5" change="+2" />
        <DemoStatCard icon={<Users className="w-4 h-4" />} label="Klienci" value="847" change="+12" />
        <DemoStatCard icon={<CreditCard className="w-4 h-4" />} label="Przychód" value="12.4K" change="+8%" />
        <DemoStatCard icon={<Star className="w-4 h-4" />} label="Ocena" value="4.9" />
      </div>

      <div className="flex gap-2 border-b border-border">
        {[{ id: "today", label: "Dzisiaj" }, { id: "week", label: "Tydzień" }, { id: "clients", label: "Klienci" }, { id: "stats", label: "Statystyki" }].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`px-3 py-2 text-xs font-medium border-b-2 transition-all ${tab === t.id ? "border-primary text-primary" : "border-transparent text-muted-foreground"}`}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === "today" && (
        <div className="space-y-2">
          {todayBookings.map((b, i) => (
            <div key={i} className="p-3 rounded-xl border border-border flex items-center gap-3">
              <span className="text-xs font-mono text-muted-foreground w-12">{b.time}</span>
              <div className="flex-1">
                <span className="font-medium text-sm">{b.client}</span>
                <span className="text-xs text-muted-foreground ml-2">— {b.service}</span>
              </div>
              <DemoBadge variant={b.status === "done" ? "success" : b.status === "in-progress" ? "warning" : "info"}>
                {b.status === "done" ? "Zakończona" : b.status === "in-progress" ? "W trakcie" : "Oczekuje"}
              </DemoBadge>
            </div>
          ))}
        </div>
      )}
      {tab === "week" && (
        <div className="space-y-3">
          <div className="rounded-xl border border-border p-4">
            <h4 className="text-sm font-medium mb-3">Obłożenie tygodnia</h4>
            <div className="flex items-end gap-2 h-32">
              {[{ day: "Pon", v: 80 }, { day: "Wt", v: 60 }, { day: "Śr", v: 95 }, { day: "Czw", v: 70 }, { day: "Pt", v: 100 }, { day: "Sb", v: 45 }].map(d => (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full rounded-t bg-primary/30 hover:bg-primary/60 transition-colors" style={{ height: `${d.v}%` }} />
                  <span className="text-[10px] text-muted-foreground">{d.day}</span>
                </div>
              ))}
            </div>
          </div>
          <DemoTable headers={["Dzień", "Wizyty", "Przychód", "Obłożenie"]}
            rows={[["Poniedziałek", "8", "1 840 PLN", <DemoBadge variant="success">80%</DemoBadge>],
                   ["Wtorek", "6", "1 200 PLN", <DemoBadge variant="warning">60%</DemoBadge>],
                   ["Środa", "10", "2 350 PLN", <DemoBadge variant="success">95%</DemoBadge>]]} />
        </div>
      )}
      {tab === "clients" && (
        <div className="space-y-3">
          <div className="flex gap-2">
            <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-background">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input className="bg-transparent text-xs outline-none flex-1" placeholder="Szukaj klienta..." />
            </div>
            <button className="px-3 py-2 rounded-lg bg-primary text-white text-xs font-medium flex items-center gap-1"><Plus className="w-3 h-3" /> Dodaj</button>
          </div>
          <DemoTable headers={["Klient", "Telefon", "Wizyty", "Ostatnia", "Wartość"]}
            rows={[
              [<span className="font-medium">Anna Kowalska</span>, "601 234 567", "12", "15.03.2026", <span className="text-primary font-medium">2 840 PLN</span>],
              [<span className="font-medium">Maria Wiśniewska</span>, "602 345 678", "8", "10.03.2026", <span className="text-primary font-medium">1 920 PLN</span>],
              [<span className="font-medium">Jan Nowak</span>, "603 456 789", "5", "05.03.2026", <span className="text-primary font-medium">750 PLN</span>],
              [<span className="font-medium">Ewa Szymańska</span>, "604 567 890", "3", "01.03.2026", <span className="text-primary font-medium">420 PLN</span>],
            ]} />
        </div>
      )}
      {tab === "stats" && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-xl border border-border">
              <p className="text-xs text-muted-foreground mb-1">Przychód miesięczny</p>
              <p className="text-2xl font-bold">38 450 PLN</p>
              <p className="text-xs text-green-500">+15% vs. poprzedni miesiąc</p>
            </div>
            <div className="p-4 rounded-xl border border-border">
              <p className="text-xs text-muted-foreground mb-1">Średnia wartość wizyty</p>
              <p className="text-2xl font-bold">145 PLN</p>
              <p className="text-xs text-green-500">+5% vs. poprzedni miesiąc</p>
            </div>
          </div>
          <div className="rounded-xl border border-border p-4">
            <h4 className="text-sm font-medium mb-3">Najpopularniejsze usługi</h4>
            {[{ name: "Strzyżenie damskie", pct: 35 }, { name: "Koloryzacja", pct: 25 }, { name: "Manicure hybrydowy", pct: 20 }, { name: "Pedicure", pct: 12 }, { name: "Pielęgnacja brwi", pct: 8 }].map(s => (
              <div key={s.name} className="flex items-center gap-3 mb-2">
                <span className="text-xs w-36 truncate">{s.name}</span>
                <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden"><div className="h-full rounded-full bg-primary" style={{ width: `${s.pct}%` }} /></div>
                <span className="text-xs text-muted-foreground w-8">{s.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </DemoSection>
  );
}
