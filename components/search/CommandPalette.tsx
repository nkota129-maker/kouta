"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Search, CornerDownLeft, X } from "lucide-react";
import { useCommandPalette } from "@/lib/hooks/useCommandPalette";
import { searchAll } from "@/lib/search";
import { SEARCH_INDEX } from "@/lib/data";
import { overlayVariants, modalVariants } from "@/lib/motion";
import { Icon } from "@/components/common/Icon";
import { getBonus } from "@/lib/data";

export function CommandPalette() {
  const { open, setOpen } = useCommandPalette();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const results = useMemo(() => {
    if (!query.trim()) return SEARCH_INDEX.slice(0, 8);
    return searchAll(query, 12);
  }, [query]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 40);
    }
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  function go(index: number) {
    const r = results[index];
    if (!r) return;
    setOpen(false);
    router.push(`/vault/${r.bonusId}?item=${r.itemId}`);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      go(active);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-start justify-center px-4 pt-[12vh]"
          variants={overlayVariants}
          initial="hidden"
          animate="show"
          exit="exit"
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="glass hairline relative w-full max-w-xl overflow-hidden rounded-2xl shadow-glass"
            onKeyDown={onKeyDown}
          >
            {/* 入力 */}
            <div className="flex items-center gap-3 border-b border-white/8 px-4">
              <Search className="h-4 w-4 shrink-0 text-[color:var(--muted)]" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="特典・カテゴリ・プロンプトを検索…"
                className="h-14 flex-1 bg-transparent text-sm outline-none placeholder:text-[color:var(--muted)]"
              />
              <button
                onClick={() => setOpen(false)}
                className="rounded-md p-1 text-[color:var(--muted)] hover:text-[color:var(--fg)]"
                aria-label="閉じる"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* 結果 */}
            <div className="no-scrollbar max-h-[52vh] overflow-y-auto p-2">
              {results.length === 0 ? (
                <p className="px-4 py-10 text-center text-sm text-[color:var(--muted)]">
                  「{query}」に一致する結果はありませんでした
                </p>
              ) : (
                results.map((r, i) => {
                  const bonus = getBonus(r.bonusId);
                  return (
                    <button
                      key={r.key}
                      onMouseEnter={() => setActive(i)}
                      onClick={() => go(i)}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                        active === i ? "bg-white/8" : "hover:bg-white/5"
                      }`}
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-gold">
                        <Icon name={bonus?.icon ?? "Sparkles"} className="h-4 w-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium">
                          {r.title}
                        </span>
                        <span className="block truncate text-xs text-[color:var(--muted)]">
                          {r.bonusTitle}・{r.categoryLabel}
                        </span>
                      </span>
                      {active === i && (
                        <CornerDownLeft className="h-4 w-4 shrink-0 text-[color:var(--muted)]" />
                      )}
                    </button>
                  );
                })
              )}
            </div>

            {/* フッター */}
            <div className="flex items-center gap-4 border-t border-white/8 px-4 py-2.5 text-[11px] text-[color:var(--muted)]">
              <span className="flex items-center gap-1">
                <kbd className="rounded border border-white/10 px-1">↑</kbd>
                <kbd className="rounded border border-white/10 px-1">↓</kbd>
                移動
              </span>
              <span className="flex items-center gap-1">
                <kbd className="rounded border border-white/10 px-1">Enter</kbd>
                開く
              </span>
              <span className="flex items-center gap-1">
                <kbd className="rounded border border-white/10 px-1">Esc</kbd>
                閉じる
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
