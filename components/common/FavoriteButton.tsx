"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useStore } from "@/lib/store";
import { useToast } from "@/components/common/Toast";

interface FavoriteButtonProps {
  favKey: string;
  className?: string;
  withLabel?: boolean;
}

export function FavoriteButton({
  favKey,
  className,
  withLabel = false,
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite, hydrated } = useStore();
  const { toast } = useToast();
  const active = hydrated && isFavorite(favKey);

  function handle() {
    toggleFavorite(favKey);
    toast(active ? "お気に入りから削除" : "お気に入りに追加");
  }

  return (
    <motion.button
      type="button"
      onClick={handle}
      whileTap={{ scale: 0.9 }}
      aria-pressed={active}
      aria-label="お気に入り"
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
        active
          ? "border-gold/40 bg-gold/15 text-gold"
          : "border-white/10 bg-white/5 text-[color:var(--muted)] hover:text-[color:var(--fg)]",
        className,
      )}
    >
      <Heart className={cn("h-3.5 w-3.5", active && "fill-gold")} />
      {withLabel && <span>{active ? "保存済み" : "お気に入り"}</span>}
    </motion.button>
  );
}
