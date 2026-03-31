import { useState, Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, RoundedBox } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { PreviewShell, DemoFooterCTA, DemoBenefits } from "./PreviewShell";
import { Plus, Minus, CheckCircle2, Download, ChevronRight, Save, RotateCcw, Maximize2, Eye, EyeOff, Lightbulb, SlidersHorizontal } from "lucide-react";
import * as THREE from "three";

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch { return false; }
}

const C = { oak: "#DEB887", walnut: "#5C4033", anthracite: "#333333", white: "#FFFFFF", dark: "#1A1A1A", warm: "#F5F0EB", stone: "#E8E2D8", cream: "#FAF7F2", greige: "#A8A08C", forest: "#3D5A3C" };

type SectionType = "hanging" | "shelves" | "drawers" | "mixed" | "shoes";
type DoorType = "hinged" | "sliding" | "none";

const closetMaterials = [
  { group: "Korpus", options: [
    { name: "Dąb naturalny", color: "#DEB887", roughness: 0.6 },
    { name: "Orzech włoski", color: "#5C4033", roughness: 0.5 },
    { name: "Biały mat", color: "#F0F0F0", roughness: 0.9 },
    { name: "Antracyt", color: "#3A3A3A", roughness: 0.7 },
    { name: "Beton", color: "#8B8B8B", roughness: 0.8 },
    { name: "Dąb bielony", color: "#E8D5B7", roughness: 0.55 },
  ]},
  { group: "Fronty", options: [
    { name: "Dąb jasny", color: "#E8C99B", roughness: 0.5 },
    { name: "Biały połysk", color: "#FAFAFA", roughness: 0.1 },
    { name: "Szary mat", color: "#808080", roughness: 0.85 },
    { name: "Czarny mat", color: "#1A1A1A", roughness: 0.9 },
    { name: "Orzech ciemny", color: "#4A3020", roughness: 0.5 },
    { name: "Oliwkowy", color: "#5A6B4A", roughness: 0.7 },
  ]},
  { group: "Uchwyty", options: [
    { name: "Złoty mat", color: "#C9A96E", roughness: 0.3 },
    { name: "Czarny mat", color: "#1A1A1A", roughness: 0.4 },
    { name: "Stal szczotk.", color: "#C0C0C0", roughness: 0.2 },
    { name: "Miedź", color: "#B87333", roughness: 0.3 },
    { name: "Bezuchwytowe", color: "transparent", roughness: 0 },
  ]},
];

const closetSections: { id: SectionType; name: string; icon: string; desc: string; price: number }[] = [
  { id: "hanging", name: "Drążek", icon: "👔", desc: "Wieszak na ubrania", price: 280 },
  { id: "shelves", name: "Półki", icon: "📚", desc: "4 regulowane półki", price: 350 },
  { id: "drawers", name: "Szuflady", icon: "🗄️", desc: "4 szuflady cargo", price: 520 },
  { id: "mixed", name: "Mix", icon: "📦", desc: "Drążek + 2 półki", price: 420 },
  { id: "shoes", name: "Buty", icon: "👟", desc: "Wysuwany organizer", price: 480 },
];

const accessories = [
  { id: "led", name: "Oświetlenie LED", price: 380, icon: "💡" },
  { id: "mirror", name: "Lustro wewn.", price: 290, icon: "🪞" },
  { id: "softclose", name: "Ciche domykanie", price: 220, icon: "🤫" },
  { id: "jewelry", name: "Organizer biżuterii", price: 340, icon: "💎" },
  { id: "pants", name: "Wysuwak na spodnie", price: 260, icon: "👖" },
  { id: "basket", name: "Kosze wiklinowe", price: 190, icon: "🧺" },
];

function WardrobeVisualizer({ width, height, depth, sections, corpusColor, frontColor, handleColor, doorType, doorsOpen, ledOn }: {
  width: number; height: number; depth: number; sections: SectionType[];
  corpusColor: string; frontColor: string; handleColor: string;
  doorType: DoorType; doorsOpen: boolean; ledOn: boolean;
}) {
  const scale = 0.42;
  const w = width * scale;
  const h = height * scale;
  const d = depth * scale * 0.35;
  const ox = 150 - w / 2;
  const oy = 8;
  const sectionW = w / sections.length;
  const boardT = 3;
  const doorOpenPct = doorsOpen ? 1 : 0;

  const darken = (hex: string, amt: number) => {
    const num = parseInt(hex.replace("#", ""), 16);
    const r = Math.max(0, (num >> 16) - amt);
    const g = Math.max(0, ((num >> 8) & 0xFF) - amt);
    const b = Math.max(0, (num & 0xFF) - amt);
    return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, "0")}`;
  };

  const lighten = (hex: string, amt: number) => {
    const num = parseInt(hex.replace("#", ""), 16);
    const r = Math.min(255, (num >> 16) + amt);
    const g = Math.min(255, ((num >> 8) & 0xFF) + amt);
    const b = Math.min(255, (num & 0xFF) + amt);
    return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, "0")}`;
  };

  const interiorColor = lighten(corpusColor, 25);
  const backColor = darken(corpusColor, 20);

  return (
    <svg viewBox="0 0 300 180" width="100%" height="100%" style={{ maxHeight: 380 }}>
      <defs>
        <linearGradient id="wardrobeSideGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={darken(corpusColor, 30)} />
          <stop offset="100%" stopColor={corpusColor} />
        </linearGradient>
        <linearGradient id="wardrobeTopGrad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor={corpusColor} />
          <stop offset="100%" stopColor={lighten(corpusColor, 15)} />
        </linearGradient>
        <linearGradient id="floorGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4A4540" />
          <stop offset="100%" stopColor="#3A3530" />
        </linearGradient>
        {ledOn && (
          <filter id="ledGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        )}
      </defs>

      <rect x="0" y={oy + h + d * 0.6 - 2} width="300" height="40" fill="url(#floorGrad)" />

      <polygon
        points={`${ox + w},${oy + d * 0.6} ${ox + w + d},${oy} ${ox + w + d},${oy + h} ${ox + w},${oy + d * 0.6 + h}`}
        fill="url(#wardrobeSideGrad)" stroke={darken(corpusColor, 40)} strokeWidth="0.5"
      />

      <polygon
        points={`${ox},${oy + d * 0.6} ${ox + d},${oy} ${ox + w + d},${oy} ${ox + w},${oy + d * 0.6}`}
        fill="url(#wardrobeTopGrad)" stroke={darken(corpusColor, 40)} strokeWidth="0.5"
      />

      <rect x={ox} y={oy + d * 0.6} width={w} height={h} rx="1" fill={backColor} stroke={darken(corpusColor, 40)} strokeWidth="0.8" />

      {ledOn && (
        <rect x={ox + 2} y={oy + d * 0.6 + 2} width={w - 4} height={4} rx="1" fill="#FFFACD" opacity="0.6" filter="url(#ledGlow)" />
      )}

      {sections.map((sec, i) => {
        const sx = ox + boardT + i * sectionW;
        const sy = oy + d * 0.6 + boardT;
        const sw = sectionW - boardT;
        const sh = h - boardT * 2;

        return (
          <g key={`interior-${i}`}>
            <rect x={sx} y={sy} width={sw} height={sh} rx="0.5" fill={interiorColor} stroke={darken(corpusColor, 10)} strokeWidth="0.3" />

            {sec === "hanging" && (
              <>
                <line x1={sx + 5} y1={sy + sh * 0.15} x2={sx + sw - 5} y2={sy + sh * 0.15} stroke="#888" strokeWidth="1.8" strokeLinecap="round" />
                {[0.2, 0.35, 0.5, 0.65, 0.8].map((f, j) => (
                  <g key={`hanger-${j}`}>
                    <line x1={sx + sw * f} y1={sy + sh * 0.15} x2={sx + sw * f} y2={sy + sh * 0.15 + 6} stroke="#999" strokeWidth="0.5" />
                    <path d={`M${sx + sw * f - 4},${sy + sh * 0.15 + 6} L${sx + sw * f},${sy + sh * 0.15 + 3} L${sx + sw * f + 4},${sy + sh * 0.15 + 6}`} fill="none" stroke="#999" strokeWidth="0.5" />
                    <rect x={sx + sw * f - 3} y={sy + sh * 0.15 + 8} width={6} height={sh * 0.55} rx="0.5"
                      fill={j % 2 === 0 ? "#6B7B8B" : "#8B6B5B"} opacity="0.6" />
                  </g>
                ))}
                <rect x={sx + 2} y={sy + sh - 10} width={sw - 4} height={8} rx="1" fill={interiorColor} stroke={darken(corpusColor, 15)} strokeWidth="0.3" />
              </>
            )}

            {sec === "shelves" && (
              <>
                {[0.15, 0.35, 0.55, 0.75].map((f, j) => (
                  <g key={`shelf-${j}`}>
                    <rect x={sx + 1} y={sy + sh * f} width={sw - 2} height={2} rx="0.5" fill={corpusColor} stroke={darken(corpusColor, 10)} strokeWidth="0.3" />
                    {j === 0 && (
                      <>
                        <rect x={sx + 3} y={sy + sh * f - 6} width={4} height={6} rx="0.5" fill="#4A6B8A" opacity="0.5" />
                        <rect x={sx + 9} y={sy + sh * f - 8} width={5} height={8} rx="0.5" fill="#8A6B4A" opacity="0.5" />
                        <rect x={sx + 16} y={sy + sh * f - 5} width={4} height={5} rx="0.5" fill="#6B8A5A" opacity="0.5" />
                      </>
                    )}
                    {j === 1 && (
                      <rect x={sx + 4} y={sy + sh * f - 7} width={sw - 8} height={7} rx="0.5" fill="#7A7A7A" opacity="0.3" />
                    )}
                    {j === 2 && (
                      <>
                        <rect x={sx + 3} y={sy + sh * f - 4} width={6} height={4} rx="0.5" fill="#B8A888" opacity="0.5" />
                        <rect x={sx + 11} y={sy + sh * f - 5} width={5} height={5} rx="0.5" fill="#A87878" opacity="0.5" />
                      </>
                    )}
                  </g>
                ))}
              </>
            )}

            {sec === "drawers" && (
              <>
                {[0.1, 0.3, 0.5, 0.7, 0.88].map((f, j) => (
                  <g key={`drawer-${j}`}>
                    <rect x={sx + 2} y={sy + sh * f} width={sw - 4} height={sh * 0.15} rx="1" fill={frontColor}
                      stroke={darken(frontColor === "transparent" ? corpusColor : frontColor, 15)} strokeWidth="0.5" />
                    {handleColor !== "transparent" && (
                      <rect x={sx + sw * 0.25} y={sy + sh * f + sh * 0.065} width={sw * 0.5} height={1.5} rx="0.75" fill={handleColor} />
                    )}
                  </g>
                ))}
              </>
            )}

            {sec === "mixed" && (
              <>
                <line x1={sx + 5} y1={sy + sh * 0.15} x2={sx + sw - 5} y2={sy + sh * 0.15} stroke="#888" strokeWidth="1.5" strokeLinecap="round" />
                {[0.25, 0.4, 0.55].map((f, j) => (
                  <rect key={j} x={sx + sw * f - 2} y={sy + sh * 0.15 + 3} width={4} height={sh * 0.3} rx="0.5"
                    fill={j % 2 === 0 ? "#7B8B6B" : "#8B7B6B"} opacity="0.5" />
                ))}
                {[0.55, 0.7, 0.85].map((f, j) => (
                  <rect key={`ms-${j}`} x={sx + 1} y={sy + sh * f} width={sw - 2} height={2} rx="0.5" fill={corpusColor} stroke={darken(corpusColor, 10)} strokeWidth="0.3" />
                ))}
              </>
            )}

            {sec === "shoes" && (
              <>
                {[0.1, 0.25, 0.4, 0.55, 0.7, 0.85].map((f, j) => (
                  <g key={`shoe-${j}`}>
                    <line x1={sx + 2} y1={sy + sh * f + 8} x2={sx + sw - 2} y2={sy + sh * f + 5} stroke="#999" strokeWidth="0.8" />
                    {j < 5 && [0.2, 0.5, 0.8].map((p, k) => (
                      <ellipse key={k} cx={sx + sw * p} cy={sy + sh * f + 4} rx={3} ry={2}
                        fill={["#2A2A2A", "#8B4513", "#696969", "#4A3728", "#1A1A1A"][j % 5]} opacity="0.5" />
                    ))}
                  </g>
                ))}
              </>
            )}

            {i > 0 && (
              <line x1={sx - 0.5} y1={oy + d * 0.6 + boardT} x2={sx - 0.5} y2={oy + d * 0.6 + h - boardT} stroke={darken(corpusColor, 25)} strokeWidth="1" />
            )}
          </g>
        );
      })}

      {doorType !== "none" && sections.map((_, i) => {
        const sx = ox + i * sectionW;
        const sw = sectionW;
        const sy = oy + d * 0.6;
        const doorH = h;

        if (doorType === "sliding") {
          const slideOffset = doorsOpen ? sw * 0.7 : 0;
          const isEven = i % 2 === 0;
          const dir = isEven ? 1 : -1;
          const tx = sx + dir * slideOffset;
          const clampedX = Math.max(ox, Math.min(tx, ox + w - sw));

          return (
            <g key={`door-s-${i}`} style={{ transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)" }}>
              <rect x={clampedX + 1} y={sy + 1} width={sw - 2} height={doorH - 2} rx="1" fill={frontColor}
                stroke={darken(frontColor, 20)} strokeWidth="0.6" opacity={doorsOpen ? 0.3 : 1} />
              {!doorsOpen && handleColor !== "transparent" && (
                <rect x={clampedX + (isEven ? sw - 8 : 4)} y={sy + doorH * 0.35} width={2} height={doorH * 0.3} rx="1" fill={handleColor} />
              )}
            </g>
          );
        }

        if (doorType === "hinged") {
          const isLeft = i % 2 === 0;
          const hingeX = isLeft ? sx : sx + sw;
          const angle = doorsOpen ? (isLeft ? -55 : 55) : 0;

          return (
            <g key={`door-h-${i}`}
              style={{ transformOrigin: `${hingeX}px ${sy + doorH / 2}px`, transform: `perspective(600px) rotateY(${angle}deg)`, transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)" }}>
              <rect x={sx + 1} y={sy + 1} width={sw - 2} height={doorH - 2} rx="1" fill={frontColor}
                stroke={darken(frontColor, 20)} strokeWidth="0.6" />
              {handleColor !== "transparent" && (
                <rect x={isLeft ? sx + sw - 8 : sx + 4} y={sy + doorH / 2 - 4} width={2} height={8} rx="1" fill={handleColor} />
              )}
            </g>
          );
        }

        return null;
      })}

      <rect x={ox - 1} y={oy + d * 0.6 + h} width={w + d + 2} height={3} rx="1" fill={darken(corpusColor, 30)} />

      <text x={ox + w / 2} y={oy + h + d * 0.6 + 14} textAnchor="middle" fontSize="7" fill="#999" fontFamily="system-ui, sans-serif" fontWeight="600">
        {width} × {height} × {depth} cm
      </text>
    </svg>
  );
}

function WardrobeSection3D({ type, position, sectionWidth, height, depth, corpusColor, frontColor, handleColor, doorsOpen, doorType }: {
  type: SectionType; position: [number, number, number]; sectionWidth: number; height: number; depth: number;
  corpusColor: string; frontColor: string; handleColor: string; doorsOpen: boolean; doorType: DoorType;
}) {
  const boardThickness = 0.02;
  const halfH = height / 2;
  const halfD = depth / 2;
  const innerW = sectionWidth - boardThickness * 2;
  const inset = 0.005;
  const doorRef = useRef<THREE.Group>(null);

  useFrame((_, dt) => {
    if (!doorRef.current) return;
    const target = doorsOpen ? (doorType === "hinged" ? -Math.PI / 3 : sectionWidth * 0.7) : 0;
    if (doorType === "hinged") {
      doorRef.current.rotation.y += (target - doorRef.current.rotation.y) * Math.min(1, dt * 4);
    } else if (doorType === "sliding") {
      doorRef.current.position.x += (target - doorRef.current.position.x) * Math.min(1, dt * 4);
    }
  });

  return (
    <group position={position}>
      <mesh position={[0, 0, -halfD + boardThickness / 2]}>
        <boxGeometry args={[sectionWidth, height, boardThickness]} />
        <meshStandardMaterial color={corpusColor} roughness={0.6} />
      </mesh>

      {doorType !== "none" && (
        <group ref={doorRef} position={doorType === "hinged" ? [-sectionWidth / 2, 0, halfD - 0.005] : [0, 0, 0]}>
          <mesh position={doorType === "hinged" ? [sectionWidth / 2, 0, 0] : [0, 0, halfD - 0.005]}>
            <boxGeometry args={[sectionWidth - 0.01, height - 0.01, 0.018]} />
            <meshStandardMaterial color={frontColor} roughness={0.4} transparent opacity={doorsOpen && doorType === "sliding" ? 0.3 : 1} />
          </mesh>
          {handleColor !== "transparent" && (
            <mesh position={doorType === "hinged" ? [sectionWidth - 0.04, 0, 0.015] : [sectionWidth * 0.3, 0, halfD + 0.005]}>
              <boxGeometry args={[0.008, 0.06, 0.015]} />
              <meshStandardMaterial color={handleColor} roughness={0.2} metalness={0.8} />
            </mesh>
          )}
        </group>
      )}

      {type === "hanging" && (
        <>
          <mesh position={[0, halfH * 0.55, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.008, 0.008, innerW - 0.02, 12]} />
            <meshStandardMaterial color="#A0A0A0" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0, -halfH + boardThickness + 0.005 + 0.005, inset]}>
            <boxGeometry args={[innerW, 0.01, depth - boardThickness * 2]} />
            <meshStandardMaterial color={corpusColor} roughness={0.6} />
          </mesh>
        </>
      )}

      {type === "shelves" && [0.7, 0.3, -0.1, -0.5].map((yFrac, i) => (
        <mesh key={i} position={[0, halfH * yFrac, inset]}>
          <boxGeometry args={[innerW, boardThickness, depth - boardThickness * 2]} />
          <meshStandardMaterial color={corpusColor} roughness={0.6} />
        </mesh>
      ))}

      {type === "drawers" && [-0.6, -0.2, 0.2, 0.6].map((yFrac, i) => {
        const drawerH = (height - boardThickness * 2) * 0.18;
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

      {type === "mixed" && (
        <>
          <mesh position={[0, halfH * 0.55, 0]} rotation={[0, 0, Math.PI / 2]}>
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

      {type === "shoes" && [-0.6, -0.3, 0, 0.3, 0.6].map((yFrac, i) => (
        <mesh key={i} position={[0, halfH * yFrac, inset]} rotation={[0.15, 0, 0]}>
          <boxGeometry args={[innerW - 0.01, 0.01, depth - boardThickness * 2.5]} />
          <meshStandardMaterial color="#888" metalness={0.5} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

function Wardrobe3D({ width, height, depth, sections, corpusColor, frontColor, handleColor, doorsOpen, doorType, ledOn }: {
  width: number; height: number; depth: number; sections: SectionType[];
  corpusColor: string; frontColor: string; handleColor: string;
  doorsOpen: boolean; doorType: DoorType; ledOn: boolean;
}) {
  const boardThickness = 0.02;
  const halfW = width / 2;
  const halfH = height / 2;
  const halfD = depth / 2;
  const sectionCount = sections.length;
  const innerWidth = width - boardThickness * (sectionCount + 1);
  const sectionWidth = innerWidth / sectionCount;

  return (
    <group position={[0, halfH, 0]}>
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

      {ledOn && (
        <mesh position={[0, halfH - boardThickness - 0.01, 0]}>
          <boxGeometry args={[width - boardThickness * 4, 0.005, depth * 0.6]} />
          <meshStandardMaterial color="#FFFACD" emissive="#FFFACD" emissiveIntensity={2} transparent opacity={0.8} />
        </mesh>
      )}

      {sections.map((sec, i) => {
        const x = -halfW + boardThickness + sectionWidth / 2 + i * (sectionWidth + boardThickness);
        return (
          <group key={`sec-${i}`}>
            {i > 0 && (
              <mesh position={[-halfW + boardThickness * (i + 1) + sectionWidth * i - boardThickness / 2, 0, 0]}>
                <boxGeometry args={[boardThickness, height - boardThickness * 2, depth - 0.01]} />
                <meshStandardMaterial color={corpusColor} roughness={0.6} />
              </mesh>
            )}
            <WardrobeSection3D type={sec} position={[x, 0, 0]} sectionWidth={sectionWidth} height={height - boardThickness * 2} depth={depth}
              corpusColor={corpusColor} frontColor={frontColor} handleColor={handleColor} doorsOpen={doorsOpen} doorType={doorType} />
          </group>
        );
      })}

      <RoundedBox args={[width + 0.02, 0.03, depth + 0.01]} position={[0, halfH + 0.015, 0]} radius={0.005} smoothness={4}>
        <meshStandardMaterial color={corpusColor} roughness={0.5} />
      </RoundedBox>
    </group>
  );
}

function Floor3D() {
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.001, 0]} receiveShadow>
        <planeGeometry args={[6, 6]} />
        <meshStandardMaterial color="#5A5550" roughness={0.9} />
      </mesh>
      <ContactShadows position={[0, 0, 0]} opacity={0.5} scale={4} blur={2.5} far={2} />
    </>
  );
}

export function ConfiguratorDemo({ name, industry }: { name: string; features: string[]; industry?: string }) {
  const isKitchen = industry?.toLowerCase() === "kitchen" || name.toLowerCase().includes("kuchni");
  if (isKitchen) return <KitchenConfigurator name={name} />;
  return <ClosetConfigurator name={name} />;
}

type ClosetTab = "wymiary" | "sekcje" | "materialy" | "dodatki" | "wycena";

function ClosetConfigurator({ name }: { name: string }) {
  const [tab, setTab] = useState<ClosetTab>("wymiary");
  const [width, setWidth] = useState(240);
  const [height, setHeight] = useState(250);
  const [depth, setDepth] = useState(60);
  const [sections, setSections] = useState<SectionType[]>(["hanging", "shelves", "drawers"]);
  const [matSel, setMatSel] = useState([0, 0, 0]);
  const [sent, setSent] = useState(false);
  const [doorsOpen, setDoorsOpen] = useState(false);
  const [doorType, setDoorType] = useState<DoorType>("hinged");
  const [ledOn, setLedOn] = useState(true);
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>(["led", "softclose"]);
  const [use3D, setUse3D] = useState(hasWebGL());
  const [animating, setAnimating] = useState(false);

  const w3d = width / 100;
  const h3d = height / 100;
  const d3d = depth / 100;

  const corpusColor = closetMaterials[0].options[matSel[0]].color;
  const frontColor = closetMaterials[1].options[matSel[1]].color;
  const handleOpt = closetMaterials[2].options[matSel[2]];
  const handleColor = handleOpt.color;

  const basePrice = Math.round(width * height * depth * 0.00045);
  const sectionCost = sections.reduce((a, s) => a + (closetSections.find(cs => cs.id === s)?.price ?? 0), 0);
  const doorPrice = doorType === "sliding" ? 680 : doorType === "hinged" ? 420 : 0;
  const accPrice = selectedAccessories.reduce((a, id) => a + (accessories.find(ac => ac.id === id)?.price ?? 0), 0);
  const total = basePrice + sectionCost + doorPrice + accPrice;

  const handleToggleDoors = () => {
    setAnimating(true);
    setDoorsOpen(!doorsOpen);
    setTimeout(() => setAnimating(false), 700);
  };

  const tabs: { id: ClosetTab; label: string; icon: string }[] = [
    { id: "wymiary", label: "Wymiary", icon: "📐" },
    { id: "sekcje", label: "Sekcje", icon: "📦" },
    { id: "materialy", label: "Materiały", icon: "🎨" },
    { id: "dodatki", label: "Dodatki", icon: "✨" },
    { id: "wycena", label: "Wycena", icon: "💰" },
  ];

  return (
    <PreviewShell title={name}>
      <div style={{ background: "#2A2520", minHeight: 560 }}>
        <div className="px-4 py-2.5 flex items-center justify-between" style={{ background: "#1A1510", borderBottom: "1px solid #3A352F" }}>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md flex items-center justify-center text-sm font-bold" style={{ background: "linear-gradient(135deg, #C9A96E, #DEB887)" }}>
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

        <div className="flex" style={{ minHeight: 430 }}>
          <div className="flex-[6] relative" style={{ background: "linear-gradient(180deg, #3A3530 0%, #2A2520 50%, #252018 100%)" }}>
            <div className="absolute top-2 left-2 z-10 flex gap-1 flex-wrap" style={{ maxWidth: 200 }}>
              <button onClick={handleToggleDoors}
                className="flex items-center gap-1 px-2 py-1 rounded-md text-[8px] font-semibold shadow-lg transition-all"
                style={{ background: doorsOpen ? "#C9A96E" : "rgba(255,255,255,0.15)", color: doorsOpen ? "#1A1A1A" : "#FFF", backdropFilter: "blur(8px)" }}>
                {doorsOpen ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                {doorsOpen ? "Zamknij" : "Otwórz"}
              </button>
              <button onClick={() => setLedOn(!ledOn)}
                className="flex items-center gap-1 px-2 py-1 rounded-md text-[8px] font-semibold shadow-lg transition-all"
                style={{ background: ledOn ? "#FFFACD" : "rgba(255,255,255,0.15)", color: ledOn ? "#1A1A1A" : "#FFF", backdropFilter: "blur(8px)" }}>
                <Lightbulb className="w-3 h-3" />LED
              </button>
              {hasWebGL() && (
                <button onClick={() => setUse3D(!use3D)}
                  className="flex items-center gap-1 px-2 py-1 rounded-md text-[8px] font-semibold shadow-lg transition-all"
                  style={{ background: use3D ? "#4A8B6A" : "rgba(255,255,255,0.15)", color: "#FFF", backdropFilter: "blur(8px)" }}>
                  <RotateCcw className="w-3 h-3" />{use3D ? "3D" : "2D"}
                </button>
              )}
            </div>

            <div className="absolute top-2 right-2 z-10 flex gap-1">
              {(["hinged", "sliding", "none"] as const).map(dt => (
                <button key={dt} onClick={() => setDoorType(dt)}
                  className="px-2 py-1 rounded-md text-[7px] font-semibold shadow-lg transition-all"
                  style={{ background: doorType === dt ? "#C9A96E" : "rgba(255,255,255,0.1)", color: doorType === dt ? "#1A1A1A" : "#AAA", backdropFilter: "blur(8px)" }}>
                  {dt === "hinged" ? "Otwierane" : dt === "sliding" ? "Przesuwne" : "Bez drzwi"}
                </button>
              ))}
            </div>

            <div className="absolute bottom-2 left-2 z-10 px-2 py-1 rounded-md text-[9px] font-bold shadow-lg" style={{ background: "rgba(0,0,0,0.6)", color: "#DEB887", backdropFilter: "blur(8px)" }}>
              {width} × {height} × {depth} cm
            </div>
            <div className="absolute bottom-2 right-2 z-10 px-2 py-1 rounded-md text-[10px] font-bold shadow-lg" style={{ background: "rgba(0,0,0,0.6)", color: "#C9A96E", backdropFilter: "blur(8px)" }}>
              {total.toLocaleString()} zł
            </div>

            {use3D ? (
              <Canvas camera={{ position: [2.5, 1.8, 3], fov: 40 }} shadows style={{ width: "100%", height: 430 }}>
                <Suspense fallback={null}>
                  <ambientLight intensity={0.4} />
                  <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow shadow-mapSize={1024} />
                  <directionalLight position={[-3, 4, -2]} intensity={0.3} color="#E8D5B7" />
                  <Wardrobe3D width={w3d} height={h3d} depth={d3d} sections={sections} corpusColor={corpusColor} frontColor={frontColor} handleColor={handleColor} doorsOpen={doorsOpen} doorType={doorType} ledOn={ledOn} />
                  <Floor3D />
                  <Environment preset="apartment" />
                  <OrbitControls makeDefault enablePan={false} minDistance={1.5} maxDistance={6} minPolarAngle={0.3} maxPolarAngle={Math.PI / 2 - 0.1} target={[0, h3d / 2, 0]} />
                </Suspense>
              </Canvas>
            ) : (
              <div className="w-full flex items-center justify-center" style={{ height: 430 }}>
                <WardrobeVisualizer width={width} height={height} depth={depth} sections={sections}
                  corpusColor={corpusColor} frontColor={frontColor} handleColor={handleColor}
                  doorType={doorType} doorsOpen={doorsOpen} ledOn={ledOn} />
              </div>
            )}
          </div>

          <div className="flex-[4] border-l flex flex-col" style={{ borderColor: "#3A352F", background: "#1A1510", maxWidth: 280 }}>
            <div className="flex border-b" style={{ borderColor: "#3A352F" }}>
              {tabs.map(t => (
                <button key={t.id} onClick={() => setTab(t.id)} className="flex-1 py-2 text-center transition-colors"
                  style={tab === t.id ? { borderBottom: "2px solid #C9A96E", color: "#C9A96E" } : { borderBottom: "2px solid transparent", color: "#6A655F" }}>
                  <span className="text-[10px] block">{t.icon}</span>
                  <span className="text-[7px] font-semibold">{t.label}</span>
                </button>
              ))}
            </div>

            <div className="flex-1 p-3 overflow-y-auto" style={{ maxHeight: 340 }}>
              <AnimatePresence mode="wait">
                <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                  {tab === "wymiary" && (
                    <div className="space-y-3">
                      <h3 className="text-[11px] font-bold text-white">Wymiary szafy</h3>
                      {[
                        { label: "Szerokość", value: width, min: 100, max: 400, unit: "cm", set: setWidth },
                        { label: "Wysokość", value: height, min: 180, max: 280, unit: "cm", set: setHeight },
                        { label: "Głębokość", value: depth, min: 40, max: 80, unit: "cm", set: setDepth },
                      ].map((dim) => (
                        <div key={dim.label}>
                          <div className="flex justify-between mb-1">
                            <span className="text-[10px]" style={{ color: "#8A857F" }}>{dim.label}</span>
                            <span className="text-[11px] font-bold font-mono text-white">{dim.value} {dim.unit}</span>
                          </div>
                          <input type="range" min={dim.min} max={dim.max} step={5} value={dim.value}
                            onChange={e => dim.set(Number(e.target.value))} className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                            style={{ background: `linear-gradient(to right, #C9A96E 0%, #C9A96E ${((dim.value - dim.min) / (dim.max - dim.min)) * 100}%, #3A352F ${((dim.value - dim.min) / (dim.max - dim.min)) * 100}%, #3A352F 100%)` }} />
                          <div className="flex justify-between text-[8px]" style={{ color: "#5A5550" }}>
                            <span>{dim.min}</span><span>{dim.max}</span>
                          </div>
                        </div>
                      ))}
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <div className="p-2 rounded-lg" style={{ background: "#2A2520", border: "1px solid #3A352F" }}>
                          <div className="text-[8px]" style={{ color: "#8A857F" }}>Powierzchnia</div>
                          <div className="text-[11px] font-bold text-white">{((width * height) / 10000).toFixed(1)} m²</div>
                        </div>
                        <div className="p-2 rounded-lg" style={{ background: "#2A2520", border: "1px solid #3A352F" }}>
                          <div className="text-[8px]" style={{ color: "#8A857F" }}>Pojemność</div>
                          <div className="text-[11px] font-bold text-white">{((width * height * depth) / 1000000).toFixed(2)} m³</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {tab === "sekcje" && (
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <h3 className="text-[11px] font-bold text-white">Wnętrze ({sections.length})</h3>
                        <div className="flex gap-1">
                          <button onClick={() => sections.length > 1 && setSections(sections.slice(0, -1))} className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: "#3A352F" }}>
                            <Minus className="w-3 h-3" style={{ color: "#8A857F" }} />
                          </button>
                          <button onClick={() => sections.length < 6 && setSections([...sections, "shelves"])} className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: "#C9A96E" }}>
                            <Plus className="w-3 h-3" style={{ color: "#1A1A1A" }} />
                          </button>
                        </div>
                      </div>
                      {sections.map((s, i) => (
                        <div key={i} className="rounded-lg overflow-hidden" style={{ border: "1px solid #3A352F" }}>
                          <div className="px-2.5 py-1 flex items-center justify-between" style={{ background: "#2A2520" }}>
                            <span className="text-[9px] font-semibold" style={{ color: "#8A857F" }}>Sekcja {i + 1}</span>
                            <span className="text-[8px] font-bold" style={{ color: "#C9A96E" }}>{closetSections.find(cs => cs.id === s)?.price} zł</span>
                          </div>
                          <div className="grid grid-cols-5 gap-0.5 p-1.5" style={{ background: "#1A1510" }}>
                            {closetSections.map(cs => (
                              <button key={cs.id} onClick={() => { const n = [...sections]; n[i] = cs.id; setSections(n); }}
                                className="py-1.5 rounded-md text-center transition-all"
                                style={s === cs.id ? { background: "#C9A96E", color: "#1A1A1A" } : { background: "#2A2520", color: "#8A857F" }}>
                                <span className="text-[9px] block">{cs.icon}</span>
                                <span className="text-[5px] font-semibold block mt-0.5">{cs.name}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {tab === "materialy" && (
                    <div className="space-y-3">
                      {closetMaterials.map((g, gi) => (
                        <div key={gi}>
                          <h3 className="text-[10px] font-bold mb-1.5 text-white">{g.group}</h3>
                          <div className="grid grid-cols-3 gap-1">
                            {g.options.map((o, oi) => (
                              <button key={oi} onClick={() => { const n = [...matSel]; n[gi] = oi; setMatSel(n); }}
                                className="text-center p-1.5 rounded-lg transition-all"
                                style={matSel[gi] === oi ? { border: "2px solid #C9A96E", background: "#2A2520" } : { border: "1px solid #3A352F", background: "#2A2520" }}>
                                <div className="w-6 h-6 rounded-full mx-auto mb-1 shadow-sm"
                                  style={o.color === "transparent" ? { border: "2px dashed #5A5550" } : { background: o.color, border: "1px solid rgba(255,255,255,0.1)" }} />
                                <span className="text-[6px] font-medium block leading-tight" style={{ color: matSel[gi] === oi ? "#C9A96E" : "#8A857F" }}>{o.name}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {tab === "dodatki" && (
                    <div className="space-y-3">
                      <h3 className="text-[11px] font-bold text-white">Typ drzwi</h3>
                      <div className="grid grid-cols-3 gap-1.5">
                        {([
                          { id: "hinged" as const, name: "Otwierane", price: 420, icon: "🚪" },
                          { id: "sliding" as const, name: "Przesuwne", price: 680, icon: "↔️" },
                          { id: "none" as const, name: "Bez drzwi", price: 0, icon: "📂" },
                        ]).map(dt => (
                          <button key={dt.id} onClick={() => setDoorType(dt.id)}
                            className="p-2 rounded-lg text-center transition-all"
                            style={doorType === dt.id ? { border: "2px solid #C9A96E", background: "#2A2520" } : { border: "1px solid #3A352F", background: "#2A2520" }}>
                            <span className="text-lg block">{dt.icon}</span>
                            <span className="text-[7px] font-bold block" style={{ color: doorType === dt.id ? "#C9A96E" : "#8A857F" }}>{dt.name}</span>
                            <span className="text-[7px] block" style={{ color: "#5A5550" }}>{dt.price > 0 ? `+${dt.price} zł` : "—"}</span>
                          </button>
                        ))}
                      </div>

                      <h3 className="text-[11px] font-bold text-white pt-1">Akcesoria</h3>
                      <div className="space-y-1">
                        {accessories.map(acc => {
                          const active = selectedAccessories.includes(acc.id);
                          return (
                            <button key={acc.id} onClick={() => setSelectedAccessories(active ? selectedAccessories.filter(a => a !== acc.id) : [...selectedAccessories, acc.id])}
                              className="w-full flex items-center gap-2 p-2 rounded-lg text-left transition-all"
                              style={active ? { background: "rgba(201,169,110,0.15)", border: "1px solid #C9A96E" } : { background: "#2A2520", border: "1px solid #3A352F" }}>
                              <span className="text-sm">{acc.icon}</span>
                              <div className="flex-1">
                                <span className="text-[9px] font-bold block" style={{ color: active ? "#C9A96E" : "#8A857F" }}>{acc.name}</span>
                              </div>
                              <span className="text-[8px] font-bold" style={{ color: active ? "#C9A96E" : "#5A5550" }}>+{acc.price} zł</span>
                              <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ background: active ? "#C9A96E" : "#3A352F" }}>
                                {active && <CheckCircle2 className="w-3 h-3" style={{ color: "#1A1A1A" }} />}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {tab === "wycena" && (
                    <div className="space-y-3">
                      {sent ? (
                        <div className="text-center py-6">
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                            <CheckCircle2 className="w-10 h-10 mx-auto mb-2" style={{ color: "#4A8B6A" }} />
                          </motion.div>
                          <h3 className="font-bold text-sm text-white">Projekt wysłany!</h3>
                          <p className="text-[9px]" style={{ color: "#8A857F" }}>Skontaktujemy się w 24h</p>
                          <p className="font-mono text-[10px] font-bold mt-1" style={{ color: "#C9A96E" }}>FORM-{Math.floor(Math.random() * 9000 + 1000)}</p>
                        </div>
                      ) : (
                        <>
                          <h3 className="text-[11px] font-bold text-white">Kalkulacja projektu</h3>
                          <div className="rounded-lg overflow-hidden" style={{ border: "1px solid #3A352F" }}>
                            <div className="space-y-0">
                              {[
                                { label: `Korpus ${width}×${height}×${depth}cm`, price: basePrice },
                                ...sections.map((s, i) => ({ label: `Sekcja ${i + 1}: ${closetSections.find(cs => cs.id === s)?.name}`, price: closetSections.find(cs => cs.id === s)?.price ?? 0 })),
                                ...(doorType !== "none" ? [{ label: `Drzwi ${doorType === "sliding" ? "przesuwne" : "otwierane"}`, price: doorPrice }] : []),
                                ...selectedAccessories.map(id => {
                                  const acc = accessories.find(a => a.id === id);
                                  return { label: acc?.name ?? "", price: acc?.price ?? 0 };
                                }),
                              ].map((item, i) => (
                                <div key={i} className="flex justify-between p-2 text-[10px]" style={{ borderBottom: "1px solid #2A2520" }}>
                                  <span style={{ color: "#8A857F" }}>{item.label}</span>
                                  <span className="font-bold text-white">{item.price.toLocaleString()} zł</span>
                                </div>
                              ))}
                            </div>
                            <div className="flex justify-between p-2.5 font-bold" style={{ background: "#C9A96E" }}>
                              <span className="text-[11px]" style={{ color: "#1A1A1A" }}>Razem</span>
                              <span className="text-sm" style={{ color: "#1A1A1A" }}>{total.toLocaleString()} zł</span>
                            </div>
                          </div>
                          <input placeholder="Imię i nazwisko" className="w-full px-3 py-2 rounded-lg text-[10px]" style={{ background: "#2A2520", border: "1px solid #3A352F", color: "white" }} />
                          <input placeholder="Telefon lub email" className="w-full px-3 py-2 rounded-lg text-[10px]" style={{ background: "#2A2520", border: "1px solid #3A352F", color: "white" }} />
                          <button onClick={() => setSent(true)} className="w-full py-2.5 rounded-lg text-[10px] font-bold transition-all hover:brightness-110" style={{ background: "linear-gradient(135deg, #C9A96E, #DEB887)", color: "#1A1A1A" }}>
                            Wyślij projekt i zamów pomiar
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="px-3 py-2 border-t" style={{ borderColor: "#3A352F", background: "#2A2520" }}>
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-[8px] block" style={{ color: "#5A5550" }}>Szacunkowa cena</span>
                  <span className="text-[7px]" style={{ color: "#8A857F" }}>{sections.length} sekcji · {doorType === "none" ? "bez drzwi" : doorType === "sliding" ? "przesuwne" : "otwierane"} · {selectedAccessories.length} akcesoriów</span>
                </div>
                <span className="text-base font-bold" style={{ color: "#C9A96E" }}>{total.toLocaleString()} zł</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DemoBenefits accentColor={C.oak} bgColor="#1A1510" textColor="white" benefits={[
        { icon: "🎨", title: "Konfigurator 3D", desc: "Klient widzi szafę w pełnym 3D z animacjami" },
        { icon: "💰", title: "Automatyczna wycena", desc: "Natychmiastowa kalkulacja z rozbiciem kosztów" },
        { icon: "📦", title: "Modułowa budowa", desc: "5 typów sekcji, 3 rodzaje drzwi, 6 akcesoriów" },
        { icon: "📊", title: "Eksport PDF", desc: "Profesjonalne podsumowanie projektu" },
      ]} />
      <DemoFooterCTA accentColor={C.oak} bgColor={C.dark} />
    </PreviewShell>
  );
}

type KitchenStep = "layout" | "materials" | "modules" | "agd" | "summary";
type KitchenLayout = "L" | "U" | "I";

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
                  <text x="90" y="78" textAnchor="middle" fontSize="5" fill={C.greige}>Stół</text>
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
