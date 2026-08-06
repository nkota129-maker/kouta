"use client";

import type { Category } from "@/types";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/common/Icon";

interface Props {
  categories: Category[];
  activeId: string;
  onSelect: (id: string) => void;
}

export function CategoryNav({ categories, activeId, onSelect }: Props) {
  return (
    <aside className="min-w-0 lg:sticky lg:top-24 lg:self-start">
      <p className="mb-3 px-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[color:var(--muted)]">
        カテゴリー
      </p>
      {/* モバイル：横スクロール / PC：縦リスト */}
      <nav className="no-scrollbar flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:gap-1 lg:overflow-visible">
        {categories.map((cat) => {
          const active = cat.id === activeId;
          return (
            <button
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              className={cn(
                "group flex shrink-0 items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors lg:w-full",
                active
                  ? "glass hairline text-gold shadow-glass"
                  : "text-[color:var(--muted)] hover:bg-white/5 hover:text-[color:var(--fg)]",
              )}
            >
              <Icon
                name={cat.icon}
                className={cn("h-4 w-4 shrink-0", active && "text-gold")}
              />
              <span className="whitespace-nowrap">{cat.label}</span>
              <span
                className={cn(
                  "ml-auto hidden rounded-full px-1.5 text-[10px] tabular-nums lg:inline",
                  active
                    ? "bg-gold/15 text-gold"
                    : "bg-white/5 text-[color:var(--muted)]",
                )}
              >
                {cat.items.length}
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
