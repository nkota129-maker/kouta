import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ベース背景
        base: {
          DEFAULT: "#050816",
          900: "#050816",
          800: "#0a1024",
          700: "#111a33",
          600: "#1a2545",
        },
        // ネイビー / ブルー
        navy: {
          DEFAULT: "#0e1b3a",
          light: "#1c2d54",
        },
        // アクセント
        gold: {
          DEFAULT: "#e7c873",
          soft: "#f3dfa2",
          deep: "#c9a24b",
        },
        neon: {
          blue: "#4f7cff",
          cyan: "#38e1d6",
        },
      },
      fontFamily: {
        sans: ["var(--font-noto)", "system-ui", "sans-serif"],
        en: ["var(--font-outfit)", "var(--font-noto)", "sans-serif"],
      },
      boxShadow: {
        glass: "0 10px 40px -12px rgba(0,0,0,0.55)",
        "glow-gold": "0 0 0 1px rgba(231,200,115,0.35), 0 8px 40px -8px rgba(231,200,115,0.35)",
        "glow-cyan": "0 0 0 1px rgba(56,225,214,0.35), 0 8px 40px -8px rgba(56,225,214,0.35)",
        "glow-blue": "0 0 0 1px rgba(79,124,255,0.35), 0 8px 40px -8px rgba(79,124,255,0.35)",
      },
      backdropBlur: {
        xs: "2px",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% center" },
          "100%": { backgroundPosition: "-200% center" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.9" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 9s ease-in-out infinite",
        shimmer: "shimmer 6s linear infinite",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
