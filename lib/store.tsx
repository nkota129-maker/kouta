"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { HistoryEntry, Theme } from "@/types";

const STORAGE_KEY = "ai-bonus-box:v1";
const HISTORY_LIMIT = 60;

interface PersistState {
  favorites: string[];
  history: HistoryEntry[];
  copyCounts: Record<string, number>;
  theme: Theme;
}

const DEFAULT_STATE: PersistState = {
  favorites: [],
  history: [],
  copyCounts: {},
  theme: "dark",
};

interface StoreContextValue extends PersistState {
  hydrated: boolean;
  toggleFavorite: (key: string) => void;
  isFavorite: (key: string) => boolean;
  pushHistory: (entry: Omit<HistoryEntry, "at">) => void;
  clearHistory: () => void;
  incrementCopy: (id: string) => void;
  totalCopies: number;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const StoreContext = createContext<StoreContextValue | null>(null);

function loadState(): PersistState {
  if (typeof window === "undefined") return DEFAULT_STATE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw) as Partial<PersistState>;
    return { ...DEFAULT_STATE, ...parsed };
  } catch {
    return DEFAULT_STATE;
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PersistState>(DEFAULT_STATE);
  const [hydrated, setHydrated] = useState(false);

  // 初回にlocalStorageから復元
  useEffect(() => {
    const loaded = loadState();
    setState(loaded);
    setHydrated(true);
  }, []);

  // 変更を永続化
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* 容量超過等は無視 */
    }
  }, [state, hydrated]);

  // テーマをhtmlクラスへ反映
  useEffect(() => {
    if (!hydrated) return;
    const root = document.documentElement;
    root.classList.toggle("light", state.theme === "light");
    root.classList.toggle("dark", state.theme === "dark");
  }, [state.theme, hydrated]);

  const toggleFavorite = useCallback((key: string) => {
    setState((s) => {
      const exists = s.favorites.includes(key);
      return {
        ...s,
        favorites: exists
          ? s.favorites.filter((k) => k !== key)
          : [key, ...s.favorites],
      };
    });
  }, []);

  const isFavorite = useCallback(
    (key: string) => state.favorites.includes(key),
    [state.favorites],
  );

  const pushHistory = useCallback((entry: Omit<HistoryEntry, "at">) => {
    setState((s) => {
      const filtered = s.history.filter((h) => h.key !== entry.key);
      const next: HistoryEntry = { ...entry, at: Date.now() };
      return { ...s, history: [next, ...filtered].slice(0, HISTORY_LIMIT) };
    });
  }, []);

  const clearHistory = useCallback(() => {
    setState((s) => ({ ...s, history: [] }));
  }, []);

  const incrementCopy = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      copyCounts: { ...s.copyCounts, [id]: (s.copyCounts[id] ?? 0) + 1 },
    }));
  }, []);

  const setTheme = useCallback((theme: Theme) => {
    setState((s) => ({ ...s, theme }));
  }, []);

  const toggleTheme = useCallback(() => {
    setState((s) => ({ ...s, theme: s.theme === "dark" ? "light" : "dark" }));
  }, []);

  const totalCopies = Object.values(state.copyCounts).reduce(
    (a, b) => a + b,
    0,
  );

  const value: StoreContextValue = {
    ...state,
    hydrated,
    toggleFavorite,
    isFavorite,
    pushHistory,
    clearHistory,
    incrementCopy,
    totalCopies,
    setTheme,
    toggleTheme,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useStore(): StoreContextValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
