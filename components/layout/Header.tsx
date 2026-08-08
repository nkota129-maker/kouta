"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Search, Heart, Clock, Moon, Sun, Command, PenTool } from "lucide-react";
import { cn } from "@/lib/utils";
import { useStore } from "@/lib/store";
import { useCommandPalette } from "@/lib/hooks/useCommandPalette";

export function Header() {
  const pathname = usePathname();
  const { theme, toggleTheme, favorites, hydrated } = useStore();
  const { setOpen } = useCommandPalette();

  const navItems = [
    { href: "/favorites", label: "お気に入り", icon: Heart },
    { href: "/history", label: "履歴", icon: Clock },
  ];

  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="glass border-b border-white/8">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
          {/* ロゴ */}
          <Link href="/" className="group flex items-center gap-2.5">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-gold/30 to-neon-cyan/20 text-gold shadow-glow-gold">
              <span className="font-en text-lg font-bold">A</span>
            </span>
            <span className="hidden flex-col leading-none sm:flex">
              <span className="font-en text-sm font-bold tracking-wide text-[color:var(--fg)]">
                AI副業2.0
              </span>
              <span className="text-[10px] font-medium tracking-[0.2em] text-gold/80">
                BONUS BOX
              </span>
            </span>
          </Link>

          {/* 検索バー（⌘K） */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="group flex h-10 flex-1 max-w-md items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 text-sm text-[color:var(--muted)] transition-colors hover:border-gold/30 hover:text-[color:var(--fg)]"
          >
            <Search className="h-4 w-4" />
            <span className="flex-1 text-left">特典・プロンプトを検索…</span>
            <kbd className="hidden items-center gap-0.5 rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] sm:flex">
              <Command className="h-3 w-3" />K
            </kbd>
          </button>

          {/* 右ナビ */}
          <nav className="flex items-center gap-1">
            {/* 記事ジェネレーターへの導線 */}
            <Link
              href="/generator"
              className={cn(
                "mr-1 hidden items-center gap-1.5 rounded-full border px-3 py-2 text-xs font-semibold transition-colors sm:flex",
                pathname === "/generator"
                  ? "border-gold/50 bg-gold/15 text-gold"
                  : "border-gold/25 bg-gold/[0.06] text-gold hover:bg-gold/15",
              )}
            >
              <PenTool className="h-4 w-4" />
              記事生成
            </Link>
            <Link
              href="/generator"
              aria-label="note記事ジェネレーター"
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full transition-colors sm:hidden",
                pathname === "/generator"
                  ? "bg-gold/15 text-gold"
                  : "text-[color:var(--muted)] hover:bg-white/5 hover:text-[color:var(--fg)]",
              )}
            >
              <PenTool className="h-[18px] w-[18px]" />
            </Link>

            {navItems.map((item) => {
              const active = pathname === item.href;
              const showBadge =
                item.href === "/favorites" && hydrated && favorites.length > 0;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-label={item.label}
                  className={cn(
                    "relative flex h-10 w-10 items-center justify-center rounded-full transition-colors",
                    active
                      ? "bg-gold/15 text-gold"
                      : "text-[color:var(--muted)] hover:bg-white/5 hover:text-[color:var(--fg)]",
                  )}
                >
                  <item.icon className="h-[18px] w-[18px]" />
                  {showBadge && (
                    <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-gold shadow-glow-gold" />
                  )}
                </Link>
              );
            })}

            <motion.button
              type="button"
              onClick={toggleTheme}
              whileTap={{ scale: 0.9, rotate: -20 }}
              aria-label="テーマ切替"
              className="flex h-10 w-10 items-center justify-center rounded-full text-[color:var(--muted)] transition-colors hover:bg-white/5 hover:text-[color:var(--fg)]"
            >
              {theme === "dark" ? (
                <Moon className="h-[18px] w-[18px]" />
              ) : (
                <Sun className="h-[18px] w-[18px]" />
              )}
            </motion.button>
          </nav>
        </div>
      </div>
    </header>
  );
}
