import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PreviewShell, DemoFooterCTA, DemoBenefits } from "./PreviewShell";
import { Calendar, Clock, Star, Users, Scissors, Search, Bell, ChevronLeft, ChevronRight, Plus, BarChart3, Settings, User } from "lucide-react";

const C = { pink: "#F8E8EE", white: "#FFFFFF", rose: "#C77D8A", gold: "#B8860B", dark: "#2D1F2B", sidebar: "#3D2B35", taupe: "#8B7D6B", light: "#FBF3F7", mauve: "#E8D5D0" };

const sideNav = [
  { id: "dashboard", icon: <BarChart3 className="w-4 h-4" />, label: "Dashboard" },
  { id: "calendar", icon: <Calendar className="w-4 h-4" />, label: "Wizyty" },
  { id: "clients", icon: <Users className="w-4 h-4" />, label: "Klientki" },
  { id: "services", icon: <Scissors className="w-4 h-4" />, label: "Usługi" },
  { id: "staff", icon: <User className="w-4 h-4" />, label: "Zespół" },
  { id: "settings", icon: <Settings className="w-4 h-4" />, label: "Ustawienia" },
];

const services = [
  { name: "Strzyżenie & Modelowanie", dur: "45 min", price: 120, cat: "Fryzjerstwo" },
  { name: "Koloryzacja Premium", dur: "120 min", price: 350, cat: "Fryzjerstwo" },
  { name: "Manicure Hybrydowy", dur: "60 min", price: 90, cat: "Paznokcie" },
  { name: "Pedicure SPA", dur: "75 min", price: 130, cat: "Paznokcie" },
  { name: "Lifting rzęs", dur: "60 min", price: 150, cat: "Brwi & Rzęsy" },
  { name: "Mezoterapia bezigłowa", dur: "45 min", price: 250, cat: "Twarz" },
  { name: "Masaż relaksacyjny", dur: "60 min", price: 180, cat: "Ciało" },
  { name: "Ombre / Sombre", dur: "180 min", price: 450, cat: "Fryzjerstwo" },
];

const staff = [
  { name: "Anna Kowalska", role: "Hair Stylist Senior", avatar: "AK", today: 6, revenue: 1240 },
  { name: "Marta Nowak", role: "Kosmetolog", avatar: "MN", today: 5, revenue: 980 },
  { name: "Ewa Wiśniewska", role: "Stylistka paznokci", avatar: "EW", today: 7, revenue: 860 },
  { name: "Katarzyna Maj", role: "Lashmaker", avatar: "KM", today: 4, revenue: 720 },
];

const clients = [
  { name: "Magdalena Zielińska", phone: "+48 600 123 456", visits: 14, lastVisit: "18 mar 2026", loyalty: "Gold" },
  { name: "Joanna Wójcik", phone: "+48 601 234 567", visits: 8, lastVisit: "15 mar 2026", loyalty: "Silver" },
  { name: "Patrycja Lis", phone: "+48 602 345 678", visits: 22, lastVisit: "20 mar 2026", loyalty: "Platinum" },
  { name: "Agnieszka Baran", phone: "+48 603 456 789", visits: 3, lastVisit: "12 mar 2026", loyalty: "Bronze" },
  { name: "Katarzyna Duda", phone: "+48 604 567 890", visits: 11, lastVisit: "19 mar 2026", loyalty: "Gold" },
];

const hours = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "13:00", "13:30", "14:00", "14:30", "15:00"];
const weekDays = ["Pon 22", "Wt 23", "Śr 24", "Czw 25", "Pt 26", "Sob 27"];

const calSlots: Record<string, Record<string, { client: string; service: string; staff: string } | null>> = {};
weekDays.forEach(d => { calSlots[d] = {}; hours.forEach(h => { calSlots[d][h] = null; }); });
calSlots["Pon 22"]["09:00"] = { client: "M. Zielińska", service: "Strzyżenie", staff: "AK" };
calSlots["Pon 22"]["10:00"] = { client: "J. Wójcik", service: "Manicure", staff: "EW" };
calSlots["Pon 22"]["11:00"] = { client: "P. Lis", service: "Koloryzacja", staff: "AK" };
calSlots["Pon 22"]["13:00"] = { client: "A. Baran", service: "Lifting rzęs", staff: "KM" };
calSlots["Wt 23"]["09:30"] = { client: "K. Duda", service: "Masaż", staff: "MN" };
calSlots["Wt 23"]["10:30"] = { client: "M. Zielińska", service: "Pedicure", staff: "EW" };
calSlots["Wt 23"]["14:00"] = { client: "J. Wójcik", service: "Mezoterapia", staff: "MN" };
calSlots["Śr 24"]["09:00"] = { client: "P. Lis", service: "Ombre", staff: "AK" };
calSlots["Śr 24"]["13:30"] = { client: "A. Baran", service: "Manicure", staff: "EW" };
calSlots["Czw 25"]["10:00"] = { client: "K. Duda", service: "Strzyżenie", staff: "AK" };
calSlots["Czw 25"]["14:30"] = { client: "M. Zielińska", service: "Lifting", staff: "KM" };
calSlots["Pt 26"]["09:00"] = { client: "J. Wójcik", service: "Koloryzacja", staff: "AK" };
calSlots["Pt 26"]["11:00"] = { client: "P. Lis", service: "Masaż", staff: "MN" };

export function SalonDemo({ name }: { name: string; features: string[] }) {
  const [page, setPage] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <PreviewShell title={name}>
      <div className="flex" style={{ minHeight: 560, background: C.light }}>
        <div className="w-[52px] shrink-0 flex flex-col items-center py-3 gap-1" style={{ background: C.sidebar }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold mb-3" style={{ background: C.rose, color: C.white }}>BB</div>
          {sideNav.map(n => (
            <button key={n.id} onClick={() => setPage(n.id)} title={n.label}
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-all"
              style={page === n.id ? { background: C.rose + "30", color: C.rose } : { color: C.mauve + "90" }}>
              {n.icon}
            </button>
          ))}
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 border-b" style={{ background: C.white, borderColor: C.pink }}>
            <div>
              <h1 className="font-bold text-sm" style={{ color: C.dark }}>Belle Beauty Studio</h1>
              <p className="text-[9px]" style={{ color: C.taupe }}>{sideNav.find(n => n.id === page)?.label}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Bell className="w-4 h-4" style={{ color: C.taupe }} />
                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full" style={{ background: C.rose }} />
              </div>
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-bold" style={{ background: C.rose, color: C.white }}>AK</div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <AnimatePresence mode="wait">
              <motion.div key={page} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
                {page === "dashboard" && <DashboardView onNav={setPage} />}
                {page === "calendar" && <CalendarView />}
                {page === "clients" && <ClientsView search={searchTerm} setSearch={setSearchTerm} />}
                {page === "services" && <ServicesView />}
                {page === "staff" && <StaffView />}
                {page === "settings" && <SettingsView />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      <DemoBenefits accentColor={C.rose} bgColor={C.pink} textColor={C.dark} benefits={[
        { icon: "📱", title: "Mniej telefonów", desc: "Klientki rezerwują online 24/7" },
        { icon: "📊", title: "Lepsze obłożenie", desc: "Automatyczna optymalizacja grafiku" },
        { icon: "💰", title: "Wyższy ticket", desc: "Upsell pakietów zabiegowych" },
        { icon: "⭐", title: "Lojalność", desc: "Konta klientek, punkty i historia" },
      ]} />
      <DemoFooterCTA accentColor={C.rose} bgColor={C.dark} />
    </PreviewShell>
  );
}

function DashboardView({ onNav }: { onNav: (p: string) => void }) {
  return (
    <div className="p-3 space-y-3">
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: "Dziś wizyt", value: "12", change: "+3", icon: "📅" },
          { label: "Przychód", value: "3 240 zł", change: "+18%", icon: "💰" },
          { label: "Nowe klientki", value: "4", change: "+2", icon: "👩" },
          { label: "Ocena", value: "4.9", change: "", icon: "⭐" },
        ].map((s, i) => (
          <div key={i} className="p-2.5 rounded-xl" style={{ background: C.white, border: `1px solid ${C.pink}` }}>
            <span className="text-base">{s.icon}</span>
            <p className="font-bold text-sm mt-1" style={{ color: C.dark }}>{s.value}</p>
            <p className="text-[9px]" style={{ color: C.taupe }}>{s.label}</p>
            {s.change && <span className="text-[9px] font-bold" style={{ color: "#22C55E" }}>{s.change}</span>}
          </div>
        ))}
      </div>

      <div className="rounded-xl overflow-hidden" style={{ background: C.white, border: `1px solid ${C.pink}` }}>
        <div className="flex items-center justify-between px-3 py-2 border-b" style={{ borderColor: C.pink }}>
          <span className="text-xs font-bold" style={{ color: C.dark }}>Dzisiejszy grafik</span>
          <button onClick={() => onNav("calendar")} className="text-[10px] font-semibold" style={{ color: C.rose }}>Pełny kalendarz →</button>
        </div>
        <div className="divide-y" style={{ borderColor: C.pink + "60" }}>
          {[
            { time: "09:00", client: "M. Zielińska", service: "Strzyżenie", staff: "Anna K.", status: "done" },
            { time: "10:00", client: "J. Wójcik", service: "Manicure Hybr.", staff: "Ewa W.", status: "done" },
            { time: "11:00", client: "P. Lis", service: "Koloryzacja", staff: "Anna K.", status: "current" },
            { time: "13:00", client: "A. Baran", service: "Lifting rzęs", staff: "Kasia M.", status: "upcoming" },
            { time: "14:00", client: "K. Duda", service: "Mezoterapia", staff: "Marta N.", status: "upcoming" },
            { time: "15:00", client: "—", service: "Wolny slot", staff: "—", status: "free" },
          ].map((a, i) => (
            <div key={i} className="flex items-center gap-2 px-3 py-2" style={{ background: a.status === "current" ? C.pink + "40" : "transparent" }}>
              <span className="text-[10px] font-mono w-10 shrink-0" style={{ color: a.status === "current" ? C.rose : C.taupe }}>{a.time}</span>
              <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: a.status === "done" ? "#22C55E" : a.status === "current" ? C.rose : a.status === "free" ? C.taupe + "30" : C.gold }} />
              <div className="flex-1 min-w-0">
                <span className="text-[11px] font-semibold truncate block" style={{ color: a.status === "free" ? C.taupe + "50" : C.dark }}>{a.client}</span>
                <span className="text-[9px] truncate block" style={{ color: C.taupe }}>{a.service}</span>
              </div>
              <span className="text-[9px] shrink-0" style={{ color: C.taupe }}>{a.staff}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="p-3 rounded-xl" style={{ background: C.white, border: `1px solid ${C.pink}` }}>
          <span className="text-[10px] font-bold" style={{ color: C.dark }}>Popularne usługi</span>
          {["Strzyżenie", "Manicure Hybr.", "Koloryzacja"].map((s, i) => (
            <div key={i} className="flex items-center gap-2 mt-1.5">
              <div className="flex-1 h-1.5 rounded-full" style={{ background: C.pink }}>
                <div className="h-full rounded-full" style={{ width: `${90 - i * 20}%`, background: C.rose }} />
              </div>
              <span className="text-[9px] w-16 shrink-0" style={{ color: C.taupe }}>{s}</span>
            </div>
          ))}
        </div>
        <div className="p-3 rounded-xl" style={{ background: C.white, border: `1px solid ${C.pink}` }}>
          <span className="text-[10px] font-bold" style={{ color: C.dark }}>Obłożenie zespołu</span>
          {staff.slice(0, 3).map((s, i) => (
            <div key={i} className="flex items-center gap-2 mt-1.5">
              <div className="w-5 h-5 rounded-full flex items-center justify-center text-[7px] font-bold" style={{ background: C.rose, color: C.white }}>{s.avatar}</div>
              <div className="flex-1 h-1.5 rounded-full" style={{ background: C.pink }}>
                <div className="h-full rounded-full" style={{ width: `${75 + i * 8}%`, background: C.gold }} />
              </div>
              <span className="text-[8px]" style={{ color: C.taupe }}>{75 + i * 8}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CalendarView() {
  const [viewDay, setViewDay] = useState(0);
  return (
    <div className="p-3 space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button className="w-6 h-6 rounded flex items-center justify-center" style={{ background: C.pink }}><ChevronLeft className="w-3 h-3" style={{ color: C.dark }} /></button>
          <span className="text-xs font-bold" style={{ color: C.dark }}>Marzec 2026</span>
          <button className="w-6 h-6 rounded flex items-center justify-center" style={{ background: C.pink }}><ChevronRight className="w-3 h-3" style={{ color: C.dark }} /></button>
        </div>
        <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-bold" style={{ background: C.rose, color: C.white }}>
          <Plus className="w-3 h-3" /> Nowa wizyta
        </button>
      </div>

      <div className="flex gap-1 overflow-x-auto pb-1">
        {weekDays.map((d, i) => (
          <button key={d} onClick={() => setViewDay(i)} className="flex-1 py-1.5 rounded-lg text-[10px] font-semibold min-w-[50px]"
            style={viewDay === i ? { background: C.rose, color: C.white } : { background: C.white, color: C.dark, border: `1px solid ${C.pink}` }}>{d}</button>
        ))}
      </div>

      <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${C.pink}` }}>
        <div className="grid" style={{ gridTemplateColumns: "44px 1fr 1fr 1fr 1fr", background: C.white }}>
          <div className="p-1.5 text-[8px] font-bold border-b border-r" style={{ color: C.taupe, borderColor: C.pink }}>Godz.</div>
          {staff.map(s => (
            <div key={s.avatar} className="p-1.5 text-[8px] font-bold text-center border-b border-r last:border-r-0" style={{ color: C.dark, borderColor: C.pink }}>{s.avatar}</div>
          ))}
          {hours.map(h => {
            const day = weekDays[viewDay];
            return (
              <div key={h} className="contents">
                <div className="p-1.5 text-[9px] font-mono border-b border-r" style={{ color: C.taupe, borderColor: C.pink + "60", background: C.light }}>{h}</div>
                {staff.map(s => {
                  const slot = calSlots[day]?.[h];
                  const isThisStaff = slot && slot.staff === s.avatar;
                  return (
                    <div key={s.avatar} className="p-1 text-[8px] border-b border-r last:border-r-0 min-h-[28px]" style={{ borderColor: C.pink + "40", background: isThisStaff ? C.rose + "15" : C.white }}>
                      {isThisStaff && (
                        <div className="px-1 py-0.5 rounded text-[7px]" style={{ background: C.rose + "20", color: C.rose }}>
                          <span className="font-bold block">{slot.client}</span>
                          <span>{slot.service}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ClientsView({ search, setSearch }: { search: string; setSearch: (s: string) => void }) {
  const filtered = clients.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
  const loyaltyColor = (l: string) => l === "Platinum" ? "#8B5CF6" : l === "Gold" ? C.gold : l === "Silver" ? "#94A3B8" : "#CD7F32";
  return (
    <div className="p-3 space-y-2">
      <div className="flex items-center gap-2">
        <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: C.white, border: `1px solid ${C.pink}` }}>
          <Search className="w-3.5 h-3.5" style={{ color: C.taupe }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Szukaj klientki..." className="text-xs bg-transparent outline-none flex-1" style={{ color: C.dark }} />
        </div>
        <button className="px-3 py-2 rounded-lg text-[10px] font-bold" style={{ background: C.rose, color: C.white }}><Plus className="w-3.5 h-3.5" /></button>
      </div>
      <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${C.pink}` }}>
        <table className="w-full text-[10px]">
          <thead>
            <tr style={{ background: C.pink + "60" }}>
              <th className="px-2.5 py-2 text-left font-semibold" style={{ color: C.dark }}>Klientka</th>
              <th className="px-2.5 py-2 text-left font-semibold" style={{ color: C.dark }}>Telefon</th>
              <th className="px-2.5 py-2 text-center font-semibold" style={{ color: C.dark }}>Wizyty</th>
              <th className="px-2.5 py-2 text-center font-semibold" style={{ color: C.dark }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c, i) => (
              <tr key={i} className="border-t" style={{ borderColor: C.pink + "60", background: C.white }}>
                <td className="px-2.5 py-2">
                  <span className="font-semibold" style={{ color: C.dark }}>{c.name}</span>
                  <span className="block text-[9px]" style={{ color: C.taupe }}>Ostatnio: {c.lastVisit}</span>
                </td>
                <td className="px-2.5 py-2" style={{ color: C.taupe }}>{c.phone}</td>
                <td className="px-2.5 py-2 text-center font-bold" style={{ color: C.dark }}>{c.visits}</td>
                <td className="px-2.5 py-2 text-center">
                  <span className="px-2 py-0.5 rounded-full text-[8px] font-bold" style={{ background: loyaltyColor(c.loyalty) + "15", color: loyaltyColor(c.loyalty) }}>{c.loyalty}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ServicesView() {
  const cats = [...new Set(services.map(s => s.cat))];
  const [selCat, setSelCat] = useState("all");
  const filtered = selCat === "all" ? services : services.filter(s => s.cat === selCat);
  return (
    <div className="p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold" style={{ color: C.dark }}>Katalog usług ({services.length})</span>
        <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-bold" style={{ background: C.rose, color: C.white }}><Plus className="w-3 h-3" /> Dodaj</button>
      </div>
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        <button onClick={() => setSelCat("all")} className="px-2.5 py-1 rounded-full text-[10px] font-semibold whitespace-nowrap"
          style={selCat === "all" ? { background: C.rose, color: C.white } : { background: C.white, color: C.taupe, border: `1px solid ${C.pink}` }}>Wszystkie</button>
        {cats.map(c => (
          <button key={c} onClick={() => setSelCat(c)} className="px-2.5 py-1 rounded-full text-[10px] font-semibold whitespace-nowrap"
            style={selCat === c ? { background: C.rose, color: C.white } : { background: C.white, color: C.taupe, border: `1px solid ${C.pink}` }}>{c}</button>
        ))}
      </div>
      <div className="space-y-1.5">
        {filtered.map((s, i) => (
          <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl" style={{ background: C.white, border: `1px solid ${C.pink}` }}>
            <div className="flex-1">
              <span className="text-[11px] font-bold" style={{ color: C.dark }}>{s.name}</span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[9px] flex items-center gap-0.5" style={{ color: C.taupe }}><Clock className="w-2.5 h-2.5" />{s.dur}</span>
                <span className="px-1.5 py-0.5 rounded text-[8px]" style={{ background: C.pink, color: C.dark }}>{s.cat}</span>
              </div>
            </div>
            <span className="font-bold text-sm" style={{ color: C.rose }}>{s.price} zł</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StaffView() {
  return (
    <div className="p-3 space-y-2">
      <span className="text-xs font-bold" style={{ color: C.dark }}>Zespół ({staff.length})</span>
      <div className="grid grid-cols-2 gap-2">
        {staff.map((s, i) => (
          <div key={i} className="p-3 rounded-xl" style={{ background: C.white, border: `1px solid ${C.pink}` }}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: `linear-gradient(135deg, ${C.rose}, ${C.mauve})`, color: C.white }}>{s.avatar}</div>
              <div>
                <span className="text-[11px] font-bold block" style={{ color: C.dark }}>{s.name}</span>
                <span className="text-[9px]" style={{ color: C.taupe }}>{s.role}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <div className="p-1.5 rounded-lg text-center" style={{ background: C.pink }}>
                <span className="font-bold text-sm block" style={{ color: C.dark }}>{s.today}</span>
                <span className="text-[8px]" style={{ color: C.taupe }}>wizyt</span>
              </div>
              <div className="p-1.5 rounded-lg text-center" style={{ background: C.pink }}>
                <span className="font-bold text-sm block" style={{ color: C.rose }}>{s.revenue}</span>
                <span className="text-[8px]" style={{ color: C.taupe }}>zł</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsView() {
  return (
    <div className="p-3 space-y-2">
      <span className="text-xs font-bold" style={{ color: C.dark }}>Ustawienia salonu</span>
      {[
        { label: "Nazwa salonu", value: "Belle Beauty Studio" },
        { label: "Adres", value: "ul. Piękna 15, Warszawa" },
        { label: "Telefon", value: "+48 22 100 20 30" },
        { label: "Godziny otwarcia", value: "Pon-Pt: 9:00-18:00, Sob: 9:00-15:00" },
        { label: "E-mail", value: "kontakt@bellebeauty.pl" },
      ].map((s, i) => (
        <div key={i} className="flex items-center justify-between p-2.5 rounded-xl" style={{ background: C.white, border: `1px solid ${C.pink}` }}>
          <span className="text-[10px]" style={{ color: C.taupe }}>{s.label}</span>
          <span className="text-[11px] font-semibold" style={{ color: C.dark }}>{s.value}</span>
        </div>
      ))}
    </div>
  );
}
