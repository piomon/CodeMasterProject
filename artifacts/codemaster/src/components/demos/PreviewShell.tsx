import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, Minimize2, Smartphone, Monitor, X } from "lucide-react";
import { createPortal } from "react-dom";

interface PreviewShellProps {
  children: ReactNode;
  title: string;
  url?: string;
}

export function PreviewShell({ children, title, url }: PreviewShellProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const content = (
    <div className={`w-full rounded-xl overflow-hidden border border-border bg-card shadow-xl flex flex-col ${isFullscreen ? "fixed inset-0 z-[100] rounded-none border-none" : ""}`}>
      <div className="flex items-center gap-2 px-3 py-2 bg-secondary/80 border-b border-border shrink-0">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/70 cursor-pointer hover:bg-red-500" onClick={() => isFullscreen && setIsFullscreen(false)} />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <div className="flex-1 mx-2">
          <div className="bg-background/50 rounded-md px-3 py-1 text-[10px] text-muted-foreground font-mono text-center truncate border border-border/50">
            {url || `https://${title.toLowerCase().replace(/\s+/g, "-")}.codemaster.pl`}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsMobile(!isMobile)}
            className={`p-1.5 rounded-md transition-colors ${isMobile ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}
            title={isMobile ? "Desktop" : "Mobile"}
          >
            {isMobile ? <Smartphone className="w-3.5 h-3.5" /> : <Monitor className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
          {isFullscreen && (
            <button
              onClick={() => setIsFullscreen(false)}
              className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
      <div className={`flex-1 overflow-hidden ${isFullscreen ? "" : ""}`}>
        {isMobile ? (
          <div className={`flex justify-center items-start bg-secondary/30 py-4 ${isFullscreen ? "h-full overflow-auto" : ""}`}>
            <div className="w-[375px] border-[8px] border-foreground/20 rounded-[2rem] overflow-hidden shadow-2xl bg-card" style={{ minHeight: isFullscreen ? "calc(100vh - 120px)" : "600px", maxHeight: isFullscreen ? "calc(100vh - 80px)" : "700px" }}>
              <div className="w-20 h-1.5 rounded-full bg-foreground/20 mx-auto mt-2 mb-1" />
              <div className="overflow-y-auto" style={{ maxHeight: isFullscreen ? "calc(100vh - 130px)" : "680px" }}>
                {children}
              </div>
            </div>
          </div>
        ) : (
          <div className={`overflow-y-auto ${isFullscreen ? "h-[calc(100vh-44px)]" : "max-h-[600px]"}`}>
            {children}
          </div>
        )}
      </div>
    </div>
  );

  if (isFullscreen) {
    return createPortal(content, document.body);
  }

  return content;
}

export function DemoNav({ tabs, activeTab, onTabChange, logo }: {
  tabs: { id: string; label: string; icon?: ReactNode }[];
  activeTab: string;
  onTabChange: (id: string) => void;
  logo?: string;
}) {
  return (
    <div className="bg-secondary/80 border-b border-border px-4 py-2 flex items-center gap-4 overflow-x-auto">
      {logo && <span className="font-display font-bold text-sm text-primary shrink-0">{logo}</span>}
      <div className="flex gap-1">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-primary text-white shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function DemoSection({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`p-4 md:p-6 space-y-4 ${className}`}>{children}</div>;
}

export function DemoStatCard({ icon, label, value, change, color = "primary" }: {
  icon: ReactNode; label: string; value: string; change?: string; color?: string;
}) {
  return (
    <div className="p-4 rounded-xl border border-border bg-card hover:border-primary/30 transition-all">
      <div className="flex items-center gap-2 text-muted-foreground mb-2">
        {icon}
        <span className="text-xs">{label}</span>
      </div>
      <div className="flex items-end gap-2">
        <span className="font-bold text-2xl">{value}</span>
        {change && <span className={`text-xs font-medium ${change.startsWith("+") ? "text-green-500" : "text-red-500"}`}>{change}</span>}
      </div>
    </div>
  );
}

export function DemoTable({ headers, rows }: { headers: string[]; rows: (string | ReactNode)[][] }) {
  return (
    <div className="rounded-xl border border-border overflow-hidden">
      <table className="w-full text-xs">
        <thead className="bg-secondary/50">
          <tr>
            {headers.map((h, i) => (
              <th key={i} className="px-4 py-2.5 text-left font-medium text-muted-foreground">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-border hover:bg-secondary/30 transition-colors">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-2.5">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function DemoHero({ title, subtitle, cta, gradient = "from-primary/20 to-accent/10" }: {
  title: string; subtitle: string; cta?: string; gradient?: string;
}) {
  return (
    <div className={`bg-gradient-to-br ${gradient} rounded-xl p-6 md:p-8 border border-border/50`}>
      <h2 className="font-display font-bold text-xl md:text-2xl mb-2">{title}</h2>
      <p className="text-sm text-muted-foreground mb-4 max-w-md">{subtitle}</p>
      {cta && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold shadow-lg"
        >
          {cta}
        </motion.button>
      )}
    </div>
  );
}

export function DemoFooterCTA({ accentColor = "#6366F1", bgColor = "#0F172A" }: { accentColor?: string; bgColor?: string }) {
  return (
    <div className="p-6 text-center" style={{ background: `linear-gradient(160deg, ${bgColor}, ${bgColor}ee)` }}>
      <p className="text-[10px] tracking-[0.3em] uppercase mb-2" style={{ color: accentColor }}>CodeMaster — Software House</p>
      <h3 className="font-bold text-lg text-white mb-1">Podoba Ci się ten system?</h3>
      <p className="text-xs text-white/60 max-w-[280px] mx-auto mb-4">Zbudujemy podobne rozwiązanie dopasowane do Twojego biznesu. Od briefu do wdrożenia — kompleksowo.</p>
      <div className="flex gap-2 justify-center flex-wrap">
        <motion.button whileHover={{ scale: 1.03 }} className="px-5 py-2 rounded-lg text-xs font-bold text-white shadow-lg" style={{ background: accentColor }}>
          Zamów podobny system
        </motion.button>
        <motion.button whileHover={{ scale: 1.03 }} className="px-5 py-2 rounded-lg text-xs font-bold border text-white/80" style={{ borderColor: accentColor + "60" }}>
          Poproś o wycenę
        </motion.button>
      </div>
      <p className="text-[9px] text-white/40 mt-3">kontakt@codemaster.pl · +48 793 020 820</p>
    </div>
  );
}

export function DemoBenefits({ benefits, accentColor = "#6366F1", bgColor = "#F8FAFC", textColor = "#1E293B" }: { benefits: { icon: string; title: string; desc: string }[]; accentColor?: string; bgColor?: string; textColor?: string }) {
  return (
    <div className="p-5" style={{ background: bgColor }}>
      <p className="text-[10px] tracking-[0.3em] uppercase text-center mb-3" style={{ color: accentColor }}>Korzyści biznesowe</p>
      <div className="grid grid-cols-2 gap-2">
        {benefits.map((b, i) => (
          <div key={i} className="p-3 rounded-xl text-center" style={{ background: textColor === "#1E293B" ? "white" : textColor + "10", border: `1px solid ${accentColor}15` }}>
            <span className="text-lg block">{b.icon}</span>
            <span className="text-[9px] font-bold block mt-1" style={{ color: textColor }}>{b.title}</span>
            <span className="text-[7px] block mt-0.5" style={{ color: textColor + "80" }}>{b.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DemoBadge({ children, variant = "default" }: { children: ReactNode; variant?: "default" | "success" | "warning" | "danger" | "info" }) {
  const colors = {
    default: "bg-secondary text-foreground",
    success: "bg-green-500/15 text-green-500 border-green-500/30",
    warning: "bg-yellow-500/15 text-yellow-500 border-yellow-500/30",
    danger: "bg-red-500/15 text-red-500 border-red-500/30",
    info: "bg-blue-500/15 text-blue-500 border-blue-500/30",
  };
  return <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${colors[variant]}`}>{children}</span>;
}
