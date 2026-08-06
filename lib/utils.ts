import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** "bonusId:itemId" キーを生成 */
export function makeKey(bonusId: string, itemId: string) {
  return `${bonusId}:${itemId}`;
}

export function parseKey(key: string): { bonusId: string; itemId: string } {
  const [bonusId, itemId] = key.split(":");
  return { bonusId, itemId };
}

/** アクセント色 → Tailwind クラス群のマップ */
export const accentClasses = {
  gold: {
    text: "text-gold",
    glow: "shadow-glow-gold",
    ring: "hover:shadow-glow-gold",
    border: "border-gold/30",
    bgSoft: "bg-gold/10",
    dot: "bg-gold",
    gradient: "from-gold/25 via-gold/5 to-transparent",
  },
  cyan: {
    text: "text-neon-cyan",
    glow: "shadow-glow-cyan",
    ring: "hover:shadow-glow-cyan",
    border: "border-neon-cyan/30",
    bgSoft: "bg-neon-cyan/10",
    dot: "bg-neon-cyan",
    gradient: "from-neon-cyan/25 via-neon-cyan/5 to-transparent",
  },
  blue: {
    text: "text-neon-blue",
    glow: "shadow-glow-blue",
    ring: "hover:shadow-glow-blue",
    border: "border-neon-blue/30",
    bgSoft: "bg-neon-blue/10",
    dot: "bg-neon-blue",
    gradient: "from-neon-blue/25 via-neon-blue/5 to-transparent",
  },
} as const;

export type AccentKey = keyof typeof accentClasses;
