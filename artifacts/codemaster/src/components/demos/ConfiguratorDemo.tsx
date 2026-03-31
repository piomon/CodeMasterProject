import { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, RoundedBox } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { PreviewShell, DemoFooterCTA, DemoBenefits } from "./PreviewShell";
import { Plus, Minus, CheckCircle2, Download, ChevronRight, Save, RotateCcw, Maximize2 } from "lucide-react";
import * as THREE from "three";

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch { return false; }
}

function WardrobeFallbackSVG({ width, height, depth, sections, corpusColor, frontColor, handleColor }: {
  width: number; height: number; depth: number; sections: SectionType[];
  corpusColor: string; frontColor: string; handleColor: string;
}) {
  const scale = 0.55;
  const w = width * scale;
  const h = height * scale;
  const d = depth * scale * 0.3;
  const startX = 100;
  const startY = 20;
  const sectionW = (w - 4) / sections.length;

  return (
    <svg viewBox="0 0 300 200" width="100%" height="100%" style={{ maxHeight: 400 }}>
      <defs>
        <linearGradient id="side" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={corpusColor} stopOpacity="0.6" />
          <stop offset="100%" stopColor={corpusColor} />
        </linearGradient>
      </defs>
      <polygon points={`${startX + w},${startY} ${startX + w + d},${startY - d * 0.6} ${startX + w + d},${startY - d * 0.6 + h} ${startX + w},${startY + h}`} fill="url(#side)" stroke="#00000020" strokeWidth="0.5" />
      <polygon points={`${startX},${startY} ${startX + d},${startY - d * 0.6} ${startX + w + d},${startY - d * 0.6} ${startX + w},${startY}`} fill={corpusColor} stroke="#00000020" strokeWidth="0.5" opacity="0.8" />
      <rect x={startX} y={startY} width={w} height={h} rx="1" fill={corpusColor} stroke="#00000015" strokeWidth="1" />
      {sections.map((sec, i) => {
        const sx = startX + 2 + i * sectionW;
        const sy = startY + 2;
        const sh = h - 4;
        return (
          <g key={i}>
            <rect x={sx} y={sy} width={sectionW - 2} height={sh} rx="1" fill={frontColor} stroke="#00000010" strokeWidth="0.5" />
            {handleColor !== "transparent" && (
              <rect x={sx + sectionW * 0.35} y={sy + sh / 2 - 1} width={sectionW * 0.25} height={2} rx="1" fill={handleColor} />
            )}
            {sec === "hanging" && (
              <line x1={sx + 4} y1={sy + sh * 0.25} x2={sx + sectionW - 6} y2={sy + sh * 0.25} stroke="#A0A0A0" strokeWidth="1.5" strokeLinecap="round" />
            )}
            {sec === "shelves" && [0.25, 0.45, 0.65, 0.85].map((f, j) => (
              <line key={j} x1={sx + 2} y1={sy + sh * f} x2={sx + sectionW - 4} y2={sy + sh * f} stroke={corpusColor} strokeWidth="1" />
            ))}
            {sec === "drawers" && [0.2, 0.4, 0.6, 0.8].map((f, j) => (
              <g key={j}>
                <rect x={sx + 3} y={sy + sh * f - 5} width={sectionW - 8} height={10} rx="1" fill={frontColor} stroke="#00000010" />
                {handleColor !== "transparent" && <rect x={sx + sectionW * 0.3} y={sy + sh * f - 1} width={sectionW * 0.35} height={1.5} rx="0.5" fill={handleColor} />}
              </g>
            ))}
            {sec === "mixed" && (
              <>
                <line x1={sx + 4} y1={sy + sh * 0.25} x2={sx + sectionW - 6} y2={sy + sh * 0.25} stroke="#A0A0A0" strokeWidth="1.5" strokeLinecap="round" />
                {[0.6, 0.8].map((f, j) => (
                  <line key={j} x1={sx + 2} y1={sy + sh * f} x2={sx + sectionW - 4} y2={sy + sh * f} stroke={corpusColor} strokeWidth="1" />
                ))}
              </>
            )}
          </g>
        );
      })}
      <text x={startX + w / 2} y={startY + h + 16} textAnchor="middle" fontSize="8" fill="#A8A08C" fontFamily="sans-serif">{width} × {height} × {depth} cm</text>
      <text x={startX + w / 2} y={startY + h + 26} textAnchor="middle" fontSize="6" fill="#C0B8A8" fontFamily="sans-serif">Podgląd 3D dostępny w przeglądarce z WebGL</text>
    </svg>
  );
}

const C = { oak: "#DEB887", walnut: "#5C4033", anthracite: "#333333", white: "#FFFFFF", dark: "#1A1A1A", warm: "#F5F0EB", stone: "#E8E2D8", cream: "#FAF7F2", greige: "#A8A08C", forest: "#3D5A3C" };

type SectionType = "hanging" | "shelves" | "drawers" | "mixed";

const closetMaterials = [
  { group: "Korpus", options: [
    { name: "Dąb naturalny", color: "#DEB887", roughness: 0.6 },
    { name: "Orzech włoski", color: "#5C4033", roughness: 0.5 },
    { name: "Biały mat", color: "#F0F0F0", roughness: 0.9 },
    { name: "Antracyt", color: "#3A3A3A", roughness: 0.7 },
  ]},
  { group: "Fronty", options: [
    { name: "Dąb jasny", color: "#E8C99B", roughness: 0.5 },
    { name: "Biały połysk", color: "#FAFAFA", roughness: 0.1 },
    { name: "Szary mat", color: "#808080", roughness: 0.85 },
    { name: "Czarny mat", color: "#1A1A1A", roughness: 0.9 },
  ]},
  { group: "Uchwyty", options: [
    { name: "Złoty mat", color: "#C9A96E", roughness: 0.3 },
    { name: "Czarny mat", color: "#1A1A1A", roughness: 0.4 },
    { name: "Stal szczotk.", color: "#C0C0C0", roughness: 0.2 },
    { name: "Bezuchwytowe", color: "transparent", roughness: 0 },
  ]},
];

const closetSections: { id: SectionType; name: string; icon: string; desc: string; price: number }[] = [
  { id: "hanging", name: "Drążek", icon: "👔", desc: "Wieszak na ubrania", price: 280 },
  { id: "shelves", name: "Półki", icon: "📚", desc: "4 regulowane półki", price: 350 },
  { id: "drawers", name: "Szuflady", icon: "🗄️", desc: "4 szuflady cargo", price: 520 },
  { id: "mixed", name: "Mix", icon: "📦", desc: "Drążek + 2 półki", price: 420 },
];

function WardrobeSection({ type, position, sectionWidth, height, depth, corpusColor, frontColor, handleColor }: {
  type: SectionType; position: [number, number, number]; sectionWidth: number; height: number; depth: number;
  corpusColor: string; frontColor: string; handleColor: string;
}) {
  const boardThickness = 0.02;
  const halfW = sectionWidth / 2;
  const halfH = height / 2;
  const halfD = depth / 2;
  const innerW = sectionWidth - boardThickness * 2;
  const innerH = height - boardThickness * 2;
  const inset = 0.005;

  return (
    <group position={position}>
      <mesh position={[0, 0, -halfD + boardThickness / 2]}>
        <boxGeometry args={[sectionWidth, height, boardThickness]} />
        <meshStandardMaterial color={corpusColor} roughness={0.6} />
      </mesh>

      <mesh position={[0, 0, halfD - 0.005]}>
        <boxGeometry args={[sectionWidth - 0.01, height - 0.01, 0.018]} />
        <meshStandardMaterial color={frontColor} roughness={0.4} />
      </mesh>

      {handleColor !== "transparent" && (
        <mesh position={[halfW * 0.3, 0, halfD + 0.005]}>
          <boxGeometry args={[0.06, 0.008, 0.015]} />
          <meshStandardMaterial color={handleColor} roughness={0.2} metalness={0.8} />
        </mesh>
      )}

      {type === "hanging" && (
        <>
          <mesh position={[0, halfH * 0.55, 0]}>
            <cylinderGeometry args={[0.008, 0.008, innerW - 0.02, 12]} />
            <meshStandardMaterial color="#A0A0A0" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[-(innerW / 2 - 0.01), halfH * 0.55, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.005, 0.005, 0.03, 8]} />
            <meshStandardMaterial color="#A0A0A0" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[(innerW / 2 - 0.01), halfH * 0.55, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.005, 0.005, 0.03, 8]} />
            <meshStandardMaterial color="#A0A0A0" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0, -halfH + boardThickness + 0.005 + 0.005, inset]}>
            <boxGeometry args={[innerW, 0.01, depth - boardThickness * 2]} />
            <meshStandardMaterial color={corpusColor} roughness={0.6} />
          </mesh>
        </>
      )}

      {type === "shelves" && (
        <>
          {[0.7, 0.3, -0.1, -0.5].map((yFrac, i) => (
            <mesh key={i} position={[0, halfH * yFrac, inset]}>
              <boxGeometry args={[innerW, boardThickness, depth - boardThickness * 2]} />
              <meshStandardMaterial color={corpusColor} roughness={0.6} />
            </mesh>
          ))}
        </>
      )}

      {type === "drawers" && (
        <>
          {[-0.6, -0.2, 0.2, 0.6].map((yFrac, i) => {
            const drawerH = innerH * 0.18;
            return (
              <group key={i} position={[0, halfH * yFrac, 0.02]}>
                <mesh>
                  <boxGeometry args={[innerW - 0.01, drawerH, depth - boardThickness * 3]} />
                  <meshStandardMaterial color={frontColor} roughness={0.5} />
                </mesh>
                {handleColor !== "transparent" && (
                  <mesh position={[0, 0, (depth - boardThickness * 3) / 2 + 0.005]}>
                    <boxGeometry args={[innerW * 0.35, 0.006, 0.01]} />
                    <meshStandardMaterial color={handleColor} roughness={0.2} metalness={0.8} />
                  </mesh>
                )}
              </group>
            );
          })}
        </>
      )}

      {type === "mixed" && (
        <>
          <mesh position={[0, halfH * 0.55, 0]}>
            <cylinderGeometry args={[0.008, 0.008, innerW - 0.02, 12]} />
            <meshStandardMaterial color="#A0A0A0" metalness={0.8} roughness={0.2} />
          </mesh>
          {[-0.1, -0.5].map((yFrac, i) => (
            <mesh key={i} position={[0, halfH * yFrac, inset]}>
              <boxGeometry args={[innerW, boardThickness, depth - boardThickness * 2]} />
              <meshStandardMaterial color={corpusColor} roughness={0.6} />
            </mesh>
          ))}
        </>
      )}
    </group>
  );
}

function Wardrobe3D({ width, height, depth, sections, corpusColor, frontColor, handleColor }: {
  width: number; height: number; depth: number; sections: SectionType[];
  corpusColor: string; frontColor: string; handleColor: string;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const boardThickness = 0.02;
  const halfW = width / 2;
  const halfH = height / 2;
  const halfD = depth / 2;
  const sectionCount = sections.length;
  const innerWidth = width - boardThickness * (sectionCount + 1);
  const sectionWidth = innerWidth / sectionCount;

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[0, halfH, 0]}>
      <mesh position={[-halfW + boardThickness / 2, 0, 0]}>
        <boxGeometry args={[boardThickness, height, depth]} />
        <meshStandardMaterial color={corpusColor} roughness={0.6} />
      </mesh>
      <mesh position={[halfW - boardThickness / 2, 0, 0]}>
        <boxGeometry args={[boardThickness, height, depth]} />
        <meshStandardMaterial color={corpusColor} roughness={0.6} />
      </mesh>

      <mesh position={[0, halfH - boardThickness / 2, 0]}>
        <boxGeometry args={[width, boardThickness, depth]} />
        <meshStandardMaterial color={corpusColor} roughness={0.6} />
      </mesh>
      <mesh position={[0, -halfH + boardThickness / 2, 0]}>
        <boxGeometry args={[width, boardThickness, depth]} />
        <meshStandardMaterial color={corpusColor} roughness={0.6} />
      </mesh>

      <mesh position={[0, 0, -halfD + 0.003]}>
        <boxGeometry args={[width - boardThickness * 2, height - boardThickness * 2, 0.005]} />
        <meshStandardMaterial color={corpusColor} roughness={0.8} />
      </mesh>

      {sections.map((sec, i) => {
        const x = -halfW + boardThickness + sectionWidth / 2 + i * (sectionWidth + boardThickness);
        if (i > 0) {
          return (
            <group key={`sep-${i}`}>
              <mesh position={[-halfW + boardThickness * (i + 1) + sectionWidth * i - boardThickness / 2, 0, 0]}>
                <boxGeometry args={[boardThickness, height - boardThickness * 2, depth - 0.01]} />
                <meshStandardMaterial color={corpusColor} roughness={0.6} />
              </mesh>
              <WardrobeSection type={sec} position={[x, 0, 0]} sectionWidth={sectionWidth} height={height - boardThickness * 2} depth={depth} corpusColor={corpusColor} frontColor={frontColor} handleColor={handleColor} />
            </group>
          );
        }
        return <WardrobeSection key={`sec-${i}`} type={sec} position={[x, 0, 0]} sectionWidth={sectionWidth} height={height - boardThickness * 2} depth={depth} corpusColor={corpusColor} frontColor={frontColor} handleColor={handleColor} />;
      })}

      <RoundedBox args={[width + 0.02, 0.03, depth + 0.01]} position={[0, halfH + 0.015, 0]} radius={0.005} smoothness={4}>
        <meshStandardMaterial color={corpusColor} roughness={0.5} />
      </RoundedBox>
    </group>
  );
}

function Floor() {
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.001, 0]} receiveShadow>
        <planeGeometry args={[6, 6]} />
        <meshStandardMaterial color="#E8E2D8" roughness={0.9} />
      </mesh>
      <ContactShadows position={[0, 0, 0]} opacity={0.4} scale={4} blur={2.5} far={2} />
    </>
  );
}

const kitchenModules = [
  { name: "Szafka dolna 60cm", code: "SD-60", basePrice: 890, icon: "📦" },
  { name: "Szuflady cargo 80cm", code: "SZ-80", basePrice: 1290, icon: "🗄️" },
  { name: "Szafka narożna 90cm", code: "SN-90", basePrice: 1490, icon: "📐" },
  { name: "Szafka górna 60cm", code: "SG-60", basePrice: 690, icon: "🔲" },
  { name: "Słupek wysoki", code: "SW-60", basePrice: 2190, icon: "📏" },
  { name: "Cargo 30cm", code: "CA-30", basePrice: 1890, icon: "🧺" },
];

const kitchenMaterials = [
  { group: "Fronty", options: [
    { name: "Dąb naturalny", color: "#DEB887", price: 0 },
    { name: "Biały mat", color: "#F0F0F0", price: 200 },
    { name: "Szary mat", color: "#808080", price: 300 },
    { name: "Orzech", color: "#5C4033", price: 400 },
  ]},
  { group: "Blat", options: [
    { name: "Kamień naturalny", color: "#B8B0A4", price: 0 },
    { name: "Konglomerat biały", color: "#EEEEE8", price: 800 },
    { name: "Drewno dębowe", color: "#D4B68C", price: 600 },
    { name: "HPL czarny mat", color: "#2A2A2A", price: 500 },
  ]},
  { group: "Uchwyty", options: [
    { name: "Złoty mat", color: "#C9A96E", price: 0 },
    { name: "Czarny mat", color: "#1A1A1A", price: 150 },
    { name: "Stal szczotkowana", color: "#A0A0A0", price: 200 },
    { name: "Bezuchwytowe", color: "transparent", price: 350 },
  ]},
];

const agd = [
  { name: "Płyta indukcyjna 60cm", brand: "Bosch", price: 2490, icon: "🔥" },
  { name: "Piekarnik parowy", brand: "Siemens", price: 4890, icon: "🍞" },
  { name: "Zmywarka zintegr.", brand: "Bosch", price: 3290, icon: "🫧" },
  { name: "Lodówka side-by-side", brand: "Samsung", price: 5490, icon: "❄️" },
  { name: "Okap teleskopowy", brand: "Faber", price: 1890, icon: "💨" },
];

export function ConfiguratorDemo({ name, industry }: { name: string; features: string[]; industry?: string }) {
  const isKitchen = industry?.toLowerCase() === "kitchen" || name.toLowerCase().includes("kuchni");
  if (isKitchen) return <KitchenConfigurator name={name} />;
  return <ClosetConfigurator name={name} />;
}

type ClosetTab = "wymiary" | "sekcje" | "materialy" | "wycena";

function ClosetConfigurator({ name }: { name: string }) {
  const [tab, setTab] = useState<ClosetTab>("wymiary");
  const [width, setWidth] = useState(240);
  const [height, setHeight] = useState(250);
  const [depth, setDepth] = useState(60);
  const [sections, setSections] = useState<SectionType[]>(["hanging", "shelves", "drawers"]);
  const [matSel, setMatSel] = useState([0, 0, 0]);
  const [sent, setSent] = useState(false);
  const [showDoors, setShowDoors] = useState(true);

  const w3d = width / 100;
  const h3d = height / 100;
  const d3d = depth / 100;

  const corpusColor = closetMaterials[0].options[matSel[0]].color;
  const frontColor = showDoors ? closetMaterials[1].options[matSel[1]].color : "transparent";
  const handleOpt = closetMaterials[2].options[matSel[2]];
  const handleColor = showDoors ? handleOpt.color : "transparent";

  const basePrice = Math.round(width * height * depth * 0.00045);
  const sectionCost = sections.reduce((a, s) => a + (closetSections.find(cs => cs.id === s)?.price ?? 0), 0);
  const total = basePrice + sectionCost;

  const tabs: { id: ClosetTab; label: string; icon: string }[] = [
    { id: "wymiary", label: "Wymiary", icon: "📐" },
    { id: "sekcje", label: "Sekcje", icon: "📦" },
    { id: "materialy", label: "Materiały", icon: "🎨" },
    { id: "wycena", label: "Wycena", icon: "💰" },
  ];

  return (
    <PreviewShell title={name}>
      <div style={{ background: "#F8F6F3", minHeight: 560 }}>
        <div className="px-4 py-2.5 flex items-center justify-between" style={{ background: "#1A1A1A" }}>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md flex items-center justify-center text-sm font-bold" style={{ background: "linear-gradient(135deg, #DEB887, #C9A96E)" }}>
              <span style={{ color: "#1A1A1A" }}>F</span>
            </div>
            <div>
              <span className="font-bold text-xs text-white">FORM </span>
              <span className="text-xs" style={{ color: "#A8A08C" }}>Studio</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[9px]" style={{ color: "#A8A08C" }}>
            <span>Konfigurator</span> <ChevronRight className="w-3 h-3" /> <span className="text-white">Szafa</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button className="flex items-center gap-1 px-2 py-1 rounded text-[9px] font-semibold bg-white/10 text-white hover:bg-white/20 transition-colors"><Save className="w-3 h-3" />Zapisz</button>
            <button className="flex items-center gap-1 px-2 py-1 rounded text-[9px] font-semibold text-[#1A1A1A]" style={{ background: "linear-gradient(135deg, #DEB887, #C9A96E)" }}><Download className="w-3 h-3" />PDF</button>
          </div>
        </div>

        <div className="flex" style={{ minHeight: 420 }}>
          <div className="flex-[6] relative" style={{ background: "linear-gradient(180deg, #E8E2D8 0%, #D4CFC8 100%)" }}>
            <div className="absolute top-2 left-2 z-10 flex gap-1">
              <button onClick={() => setShowDoors(!showDoors)} className="flex items-center gap-1 px-2 py-1 rounded-md text-[8px] font-semibold shadow-sm" style={{ background: "white", color: "#1A1A1A" }}>
                <Maximize2 className="w-3 h-3" />{showDoors ? "Otwórz" : "Zamknij"}
              </button>
              <button className="flex items-center gap-1 px-2 py-1 rounded-md text-[8px] font-semibold shadow-sm" style={{ background: "white", color: "#1A1A1A" }}>
                <RotateCcw className="w-3 h-3" />Obróć
              </button>
            </div>
            <div className="absolute bottom-2 left-2 z-10 px-2 py-1 rounded-md text-[9px] font-bold shadow-sm" style={{ background: "#1A1A1A", color: "#DEB887" }}>
              {width} × {height} × {depth} cm
            </div>
            {hasWebGL() ? (
              <Canvas camera={{ position: [2.5, 1.8, 3], fov: 40 }} shadows style={{ width: "100%", height: 420 }}>
                <Suspense fallback={null}>
                  <ambientLight intensity={0.5} />
                  <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow shadow-mapSize={1024} />
                  <directionalLight position={[-3, 4, -2]} intensity={0.3} color="#E8D5B7" />
                  <Wardrobe3D width={w3d} height={h3d} depth={d3d} sections={sections} corpusColor={corpusColor} frontColor={frontColor} handleColor={handleColor} />
                  <Floor />
                  <Environment preset="apartment" />
                  <OrbitControls makeDefault enablePan={false} minDistance={1.5} maxDistance={6} minPolarAngle={0.3} maxPolarAngle={Math.PI / 2 - 0.1} target={[0, h3d / 2, 0]} />
                </Suspense>
              </Canvas>
            ) : (
              <div className="w-full flex items-center justify-center" style={{ height: 420 }}>
                <WardrobeFallbackSVG width={width} height={height} depth={depth} sections={sections} corpusColor={corpusColor} frontColor={showDoors ? closetMaterials[1].options[matSel[1]].color : corpusColor} handleColor={showDoors ? closetMaterials[2].options[matSel[2]].color : "transparent"} />
              </div>
            )}
          </div>

          <div className="flex-[4] border-l flex flex-col" style={{ borderColor: "#E8E2D8", background: "white", maxWidth: 280 }}>
            <div className="flex border-b" style={{ borderColor: "#E8E2D8" }}>
              {tabs.map(t => (
                <button key={t.id} onClick={() => setTab(t.id)} className="flex-1 py-2 text-center transition-colors"
                  style={tab === t.id ? { borderBottom: "2px solid #1A1A1A", color: "#1A1A1A" } : { borderBottom: "2px solid transparent", color: "#A8A08C" }}>
                  <span className="text-[10px] block">{t.icon}</span>
                  <span className="text-[8px] font-semibold">{t.label}</span>
                </button>
              ))}
            </div>

            <div className="flex-1 p-3 overflow-y-auto" style={{ maxHeight: 350 }}>
              <AnimatePresence mode="wait">
                <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                  {tab === "wymiary" && (
                    <div className="space-y-4">
                      <h3 className="text-[11px] font-bold" style={{ color: "#1A1A1A" }}>Wymiary szafy</h3>
                      {[
                        { label: "Szerokość", value: width, min: 100, max: 400, unit: "cm", set: setWidth },
                        { label: "Wysokość", value: height, min: 180, max: 280, unit: "cm", set: setHeight },
                        { label: "Głębokość", value: depth, min: 40, max: 80, unit: "cm", set: setDepth },
                      ].map((dim) => (
                        <div key={dim.label}>
                          <div className="flex justify-between mb-1">
                            <span className="text-[10px]" style={{ color: "#A8A08C" }}>{dim.label}</span>
                            <span className="text-[11px] font-bold font-mono" style={{ color: "#1A1A1A" }}>{dim.value} {dim.unit}</span>
                          </div>
                          <input type="range" min={dim.min} max={dim.max} step={5} value={dim.value}
                            onChange={e => dim.set(Number(e.target.value))} className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                            style={{ background: `linear-gradient(to right, #DEB887 0%, #DEB887 ${((dim.value - dim.min) / (dim.max - dim.min)) * 100}%, #E8E2D8 ${((dim.value - dim.min) / (dim.max - dim.min)) * 100}%, #E8E2D8 100%)` }} />
                          <div className="flex justify-between text-[8px]" style={{ color: "#C0B8A8" }}>
                            <span>{dim.min}</span><span>{dim.max}</span>
                          </div>
                        </div>
                      ))}
                      <div className="p-2.5 rounded-lg" style={{ background: "#FAF7F2", border: "1px solid #E8E2D8" }}>
                        <div className="flex justify-between text-[10px]">
                          <span style={{ color: "#A8A08C" }}>Powierzchnia frontu</span>
                          <span className="font-bold" style={{ color: "#1A1A1A" }}>{((width * height) / 10000).toFixed(1)} m²</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {tab === "sekcje" && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-[11px] font-bold" style={{ color: "#1A1A1A" }}>Wnętrze szafy ({sections.length})</h3>
                        <div className="flex gap-1">
                          <button onClick={() => sections.length > 1 && setSections(sections.slice(0, -1))} className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: "#E8E2D8" }}>
                            <Minus className="w-3 h-3" style={{ color: "#1A1A1A" }} />
                          </button>
                          <button onClick={() => sections.length < 6 && setSections([...sections, "shelves"])} className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: "#DEB887" }}>
                            <Plus className="w-3 h-3" style={{ color: "#1A1A1A" }} />
                          </button>
                        </div>
                      </div>
                      {sections.map((s, i) => (
                        <div key={i} className="rounded-lg overflow-hidden" style={{ border: "1px solid #E8E2D8" }}>
                          <div className="px-2.5 py-1.5 flex items-center justify-between" style={{ background: "#FAF7F2" }}>
                            <span className="text-[9px] font-semibold" style={{ color: "#A8A08C" }}>Sekcja {i + 1}</span>
                            <span className="text-[8px]" style={{ color: "#DEB887" }}>{closetSections.find(cs => cs.id === s)?.price} zł</span>
                          </div>
                          <div className="grid grid-cols-4 gap-0.5 p-1.5">
                            {closetSections.map(cs => (
                              <button key={cs.id} onClick={() => { const n = [...sections]; n[i] = cs.id; setSections(n); }}
                                className="py-1.5 rounded-md text-center transition-all"
                                style={s === cs.id ? { background: "#1A1A1A", color: "white" } : { background: "#FAF7F2", color: "#A8A08C" }}>
                                <span className="text-[10px] block">{cs.icon}</span>
                                <span className="text-[6px] font-semibold block">{cs.name}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {tab === "materialy" && (
                    <div className="space-y-4">
                      {closetMaterials.map((g, gi) => (
                        <div key={gi}>
                          <h3 className="text-[10px] font-bold mb-1.5" style={{ color: "#1A1A1A" }}>{g.group}</h3>
                          <div className="grid grid-cols-4 gap-1.5">
                            {g.options.map((o, oi) => (
                              <button key={oi} onClick={() => { const n = [...matSel]; n[gi] = oi; setMatSel(n); }}
                                className="text-center p-1.5 rounded-lg transition-all"
                                style={matSel[gi] === oi ? { border: "2px solid #1A1A1A", background: "#FAF7F2" } : { border: "1px solid #E8E2D8", background: "#FAF7F2" }}>
                                <div className="w-6 h-6 rounded-full mx-auto mb-1 shadow-sm"
                                  style={o.color === "transparent" ? { border: "2px dashed #A8A08C" } : { background: o.color, border: "1px solid #0001" }} />
                                <span className="text-[7px] font-medium block leading-tight" style={{ color: "#1A1A1A" }}>{o.name}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {tab === "wycena" && (
                    <div className="space-y-3">
                      {sent ? (
                        <div className="text-center py-6">
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                            <CheckCircle2 className="w-10 h-10 mx-auto mb-2" style={{ color: C.forest }} />
                          </motion.div>
                          <h3 className="font-bold text-sm" style={{ color: "#1A1A1A" }}>Projekt wysłany!</h3>
                          <p className="text-[9px]" style={{ color: "#A8A08C" }}>Skontaktujemy się w 24h</p>
                          <p className="font-mono text-[10px] font-bold mt-1" style={{ color: "#DEB887" }}>FORM-{Math.floor(Math.random() * 9000 + 1000)}</p>
                        </div>
                      ) : (
                        <>
                          <h3 className="text-[11px] font-bold" style={{ color: "#1A1A1A" }}>Kalkulacja projektu</h3>
                          <div className="rounded-lg overflow-hidden" style={{ border: "1px solid #E8E2D8" }}>
                            <div className="space-y-0">
                              <div className="flex justify-between p-2 text-[10px]" style={{ borderBottom: "1px solid #F0EDE8" }}>
                                <span style={{ color: "#A8A08C" }}>Korpus {width}×{height}×{depth}cm</span>
                                <span className="font-bold" style={{ color: "#1A1A1A" }}>{basePrice.toLocaleString()} zł</span>
                              </div>
                              {sections.map((s, i) => {
                                const sec = closetSections.find(cs => cs.id === s);
                                return (
                                  <div key={i} className="flex justify-between p-2 text-[10px]" style={{ borderBottom: "1px solid #F0EDE8" }}>
                                    <span style={{ color: "#A8A08C" }}>Sekcja {i + 1}: {sec?.name}</span>
                                    <span style={{ color: "#1A1A1A" }}>{sec?.price} zł</span>
                                  </div>
                                );
                              })}
                            </div>
                            <div className="flex justify-between p-2.5 font-bold" style={{ background: "#1A1A1A" }}>
                              <span className="text-white text-[11px]">Razem</span>
                              <span style={{ color: "#DEB887" }} className="text-sm">{total.toLocaleString()} zł</span>
                            </div>
                          </div>
                          <input placeholder="Imię i nazwisko" className="w-full px-3 py-2 rounded-lg text-[10px]" style={{ background: "#FAF7F2", border: "1px solid #E8E2D8", color: "#1A1A1A" }} />
                          <input placeholder="Telefon lub email" className="w-full px-3 py-2 rounded-lg text-[10px]" style={{ background: "#FAF7F2", border: "1px solid #E8E2D8", color: "#1A1A1A" }} />
                          <button onClick={() => setSent(true)} className="w-full py-2.5 rounded-lg text-[10px] font-bold" style={{ background: "linear-gradient(135deg, #DEB887, #C9A96E)", color: "#1A1A1A" }}>
                            Wyślij projekt i zamów pomiar
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="px-3 py-2 border-t" style={{ borderColor: "#E8E2D8", background: "#FAF7F2" }}>
              <div className="flex justify-between items-center">
                <span className="text-[9px]" style={{ color: "#A8A08C" }}>Szacunkowa cena</span>
                <span className="text-sm font-bold" style={{ color: "#1A1A1A" }}>{total.toLocaleString()} zł</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DemoBenefits accentColor={C.oak} bgColor={C.warm} textColor={C.dark} benefits={[
        { icon: "🎨", title: "Konfigurator 3D", desc: "Klient widzi szafę w pełnym 3D" },
        { icon: "💰", title: "Automatyczna wycena", desc: "Natychmiastowa kalkulacja ceny" },
        { icon: "📦", title: "Modułowa budowa", desc: "Dopasowanie do każdego wnętrza" },
        { icon: "📊", title: "Eksport PDF", desc: "Profesjonalne podsumowanie projektu" },
      ]} />
      <DemoFooterCTA accentColor={C.oak} bgColor={C.dark} />
    </PreviewShell>
  );
}

type KitchenStep = "layout" | "materials" | "modules" | "agd" | "summary";
type KitchenLayout = "L" | "U" | "I";

function KitchenConfigurator({ name }: { name: string }) {
  const [step, setStep] = useState<KitchenStep>("layout");
  const [matSel, setMatSel] = useState([0, 0, 0]);
  const [mods, setMods] = useState([0, 0, 0, 0, 0, 0]);
  const [agdSel, setAgdSel] = useState<boolean[]>(new Array(agd.length).fill(false));
  const [sent, setSent] = useState(false);
  const [layout, setLayout] = useState<KitchenLayout>("L");

  const matCost = kitchenMaterials.reduce((a, g, i) => a + g.options[matSel[i]].price, 0);
  const modCost = kitchenModules.reduce((a, m, i) => a + m.basePrice * mods[i], 0);
  const agdCost = agd.reduce((a, item, i) => a + (agdSel[i] ? item.price : 0), 0);
  const total = matCost + modCost + agdCost;
  const frontColor = kitchenMaterials[0].options[matSel[0]].color;
  const topColor = kitchenMaterials[1].options[matSel[1]].color;

  const navSteps: { id: KitchenStep; label: string }[] = [
    { id: "layout", label: "1. Układ" },
    { id: "materials", label: "2. Materiały" },
    { id: "modules", label: "3. Moduły" },
    { id: "agd", label: "4. AGD" },
    { id: "summary", label: "5. Wycena" },
  ];

  return (
    <PreviewShell title={name}>
      <div style={{ background: C.cream, minHeight: 520 }}>
        <div className="px-4 py-2 flex items-center justify-between" style={{ background: C.white, borderBottom: `1px solid ${C.stone}` }}>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded flex items-center justify-center text-sm font-bold" style={{ background: C.dark, color: C.oak }}>F</div>
            <span className="font-bold text-xs" style={{ color: C.dark }}>FORM</span>
            <span className="text-xs" style={{ color: C.greige }}>Studio</span>
          </div>
          <div className="flex items-center gap-1 text-[9px]" style={{ color: C.greige }}>
            <span>Projekt</span> <ChevronRight className="w-3 h-3" /> <span>Kuchnia</span> <ChevronRight className="w-3 h-3" /> <span style={{ color: C.dark }}>Konfiguracja</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button className="flex items-center gap-1 px-2 py-1 rounded text-[9px] font-semibold" style={{ background: C.stone, color: C.dark }}><Save className="w-3 h-3" />Zapisz</button>
          </div>
        </div>

        <div className="flex gap-0 border-b overflow-x-auto" style={{ borderColor: C.stone, background: C.white }}>
          {navSteps.map(s => (
            <button key={s.id} onClick={() => setStep(s.id)} className="flex-1 py-2 text-[10px] font-semibold border-b-2 whitespace-nowrap"
              style={step === s.id ? { borderColor: C.dark, color: C.dark } : { borderColor: "transparent", color: C.greige }}>{s.label}</button>
          ))}
        </div>

        <div className="flex">
          <div className="flex-[7] p-4 flex items-center justify-center" style={{ background: C.stone + "60", minHeight: 240 }}>
            <svg viewBox="0 0 200 160" width="220" height="180">
              <rect x="10" y="10" width="180" height="140" fill="none" stroke={C.greige + "40"} strokeDasharray="4" rx="2" />
              <text x="100" y="155" textAnchor="middle" fontSize="6" fill={C.greige}>Plan kuchni — widok z góry</text>
              {layout === "L" && (
                <>
                  <rect x="15" y="15" width="170" height="20" rx="2" fill={frontColor} stroke={C.greige} strokeWidth="0.5" />
                  <rect x="15" y="15" width="170" height="3" rx="1" fill={topColor} />
                  <rect x="15" y="40" width="30" height="80" rx="2" fill={frontColor} stroke={C.greige} strokeWidth="0.5" />
                  <rect x="15" y="40" width="3" height="80" rx="1" fill={topColor} />
                  <rect x="70" y="60" width="40" height="30" rx="4" fill={C.greige + "30"} stroke={C.greige} strokeWidth="0.5" />
                  <text x="90" y="78" textAnchor="middle" fontSize="5" fill={C.greige}>🍽️ Stół</text>
                </>
              )}
              {layout === "U" && (
                <>
                  <rect x="15" y="15" width="170" height="20" rx="2" fill={frontColor} stroke={C.greige} strokeWidth="0.5" />
                  <rect x="15" y="15" width="170" height="3" rx="1" fill={topColor} />
                  <rect x="15" y="40" width="30" height="80" rx="2" fill={frontColor} stroke={C.greige} strokeWidth="0.5" />
                  <rect x="15" y="40" width="3" height="80" rx="1" fill={topColor} />
                  <rect x="155" y="40" width="30" height="80" rx="2" fill={frontColor} stroke={C.greige} strokeWidth="0.5" />
                  <rect x="182" y="40" width="3" height="80" rx="1" fill={topColor} />
                </>
              )}
              {layout === "I" && (
                <>
                  <rect x="15" y="15" width="170" height="25" rx="2" fill={frontColor} stroke={C.greige} strokeWidth="0.5" />
                  <rect x="15" y="15" width="170" height="3" rx="1" fill={topColor} />
                  <rect x="60" y="80" width="80" height="30" rx="4" fill={C.greige + "30"} stroke={C.greige} strokeWidth="0.5" />
                  <text x="100" y="98" textAnchor="middle" fontSize="5" fill={C.greige}>Wyspa</text>
                </>
              )}
            </svg>
          </div>

          <div className="flex-[3] p-3 space-y-3 border-l overflow-y-auto" style={{ borderColor: C.stone, background: C.white, maxHeight: 300 }}>
            <AnimatePresence mode="wait">
              <motion.div key={step} initial={{ opacity: 0, x: 5 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
                {step === "layout" && (
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold" style={{ color: C.dark }}>Układ kuchni</span>
                    {(["L", "U", "I"] as const).map(l => (
                      <button key={l} onClick={() => setLayout(l)} className="w-full p-2 rounded-lg text-left flex items-center gap-2"
                        style={layout === l ? { background: C.oak + "15", border: `2px solid ${C.oak}` } : { background: C.cream, border: `1px solid ${C.stone}` }}>
                        <span className="font-bold text-sm" style={{ color: C.dark }}>{l === "L" ? "L-shape" : l === "U" ? "U-shape" : "Z wyspą"}</span>
                        <span className="text-[8px]" style={{ color: C.greige }}>{l === "L" ? "Klasyczny kształt L" : l === "U" ? "Zabudowa 3-stronna" : "Linia + wyspa"}</span>
                      </button>
                    ))}
                  </div>
                )}
                {step === "materials" && (
                  <div className="space-y-3">
                    {kitchenMaterials.map((g, gi) => (
                      <div key={gi}>
                        <span className="text-[10px] font-bold" style={{ color: C.dark }}>{g.group}</span>
                        <div className="grid grid-cols-2 gap-1.5 mt-1">
                          {g.options.map((o, oi) => (
                            <button key={oi} onClick={() => { const n = [...matSel]; n[gi] = oi; setMatSel(n); }}
                              className="p-1.5 rounded-lg text-center" style={matSel[gi] === oi ? { border: `2px solid ${C.dark}`, background: C.cream } : { border: `1px solid ${C.stone}`, background: C.cream }}>
                              <div className="w-5 h-5 rounded-full mx-auto mb-0.5" style={o.color === "transparent" ? { border: `2px dashed ${C.greige}` } : { background: o.color }} />
                              <span className="text-[8px] font-medium block" style={{ color: C.dark }}>{o.name}</span>
                              {o.price > 0 && <span className="text-[7px]" style={{ color: C.oak }}>+{o.price}</span>}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {step === "modules" && (
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold" style={{ color: C.dark }}>Moduły</span>
                    {kitchenModules.map((m, i) => (
                      <div key={i} className="flex items-center gap-2 p-1.5 rounded" style={{ background: C.cream }}>
                        <span className="text-sm">{m.icon}</span>
                        <div className="flex-1 min-w-0">
                          <span className="text-[9px] font-bold block truncate" style={{ color: C.dark }}>{m.name}</span>
                          <span className="text-[8px]" style={{ color: C.greige }}>{m.basePrice} zł</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <button onClick={() => { const n = [...mods]; n[i] = Math.max(0, n[i] - 1); setMods(n); }}
                            className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: C.stone }}><Minus className="w-2.5 h-2.5" /></button>
                          <span className="font-bold text-[10px] w-4 text-center">{mods[i]}</span>
                          <button onClick={() => { const n = [...mods]; n[i]++; setMods(n); }}
                            className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: C.oak, color: C.white }}><Plus className="w-2.5 h-2.5" /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {step === "agd" && (
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold" style={{ color: C.dark }}>Sprzęt AGD</span>
                    {agd.map((a, i) => (
                      <label key={i} className="flex items-center gap-2 p-1.5 rounded cursor-pointer" style={{ background: agdSel[i] ? C.oak + "10" : C.cream }}>
                        <input type="checkbox" checked={agdSel[i]} onChange={() => { const n = [...agdSel]; n[i] = !n[i]; setAgdSel(n); }} className="w-3.5 h-3.5 accent-amber-700" />
                        <span className="text-sm">{a.icon}</span>
                        <div className="flex-1">
                          <span className="text-[9px] font-bold" style={{ color: C.dark }}>{a.name}</span>
                          <span className="text-[8px] block" style={{ color: C.greige }}>{a.brand}</span>
                        </div>
                        <span className="text-[9px] font-bold" style={{ color: C.oak }}>{a.price.toLocaleString()}</span>
                      </label>
                    ))}
                  </div>
                )}
                {step === "summary" && (
                  <div className="space-y-2">
                    {sent ? (
                      <div className="text-center py-4">
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                          <CheckCircle2 className="w-10 h-10 mx-auto mb-2" style={{ color: C.forest }} />
                        </motion.div>
                        <h3 className="font-bold text-sm" style={{ color: C.dark }}>Konfiguracja wysłana!</h3>
                        <p className="font-mono text-[10px] font-bold" style={{ color: C.oak }}>FORM-{Math.floor(Math.random() * 9000 + 1000)}</p>
                      </div>
                    ) : (
                      <>
                        <span className="text-[10px] font-bold" style={{ color: C.dark }}>Podsumowanie</span>
                        <div className="space-y-1 text-[10px]">
                          <div className="flex justify-between"><span style={{ color: C.greige }}>Materiały</span><span style={{ color: C.dark }}>{matCost.toLocaleString()} zł</span></div>
                          <div className="flex justify-between"><span style={{ color: C.greige }}>Moduły</span><span style={{ color: C.dark }}>{modCost.toLocaleString()} zł</span></div>
                          <div className="flex justify-between"><span style={{ color: C.greige }}>AGD</span><span style={{ color: C.dark }}>{agdCost.toLocaleString()} zł</span></div>
                          <div className="border-t pt-1 flex justify-between font-bold" style={{ borderColor: C.stone }}>
                            <span style={{ color: C.dark }}>Razem</span>
                            <span className="text-sm" style={{ color: C.oak }}>{total.toLocaleString()} zł</span>
                          </div>
                        </div>
                        <input placeholder="Imię i nazwisko" className="w-full px-2.5 py-1.5 rounded text-[10px]" style={{ background: C.cream, border: `1px solid ${C.stone}`, color: C.dark }} />
                        <input placeholder="Telefon / email" className="w-full px-2.5 py-1.5 rounded text-[10px]" style={{ background: C.cream, border: `1px solid ${C.stone}`, color: C.dark }} />
                        <button onClick={() => setSent(true)} className="w-full py-2 rounded text-[10px] font-bold text-white" style={{ background: C.oak }}>Wyślij konfigurację</button>
                      </>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      <DemoBenefits accentColor={C.oak} bgColor={C.warm} textColor={C.dark} benefits={[
        { icon: "🎨", title: "Wizualny konfigurator", desc: "Klient widzi efekt zanim zamówi" },
        { icon: "💰", title: "Automatyczna wycena", desc: "Natychmiastowa kalkulacja ceny" },
        { icon: "📦", title: "Modułowa budowa", desc: "Dopasowanie do każdego metrażu" },
        { icon: "📊", title: "Analiza konwersji", desc: "Statystyki popularnych konfiguracji" },
      ]} />
      <DemoFooterCTA accentColor={C.oak} bgColor={C.dark} />
    </PreviewShell>
  );
}
