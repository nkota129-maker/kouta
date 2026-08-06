"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Bonus } from "@/types";
import { fadeUp } from "@/lib/motion";
import { accentClasses, cn } from "@/lib/utils";
import { Icon } from "@/components/common/Icon";

export function BonusCard({ bonus }: { bonus: Bonus }) {
  const accent = accentClasses[bonus.accent];

  return (
    <motion.div variants={fadeUp}>
      <Link href={`/vault/${bonus.id}`} className="group block h-full">
        <motion.div
          whileHover={{ y: -8 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "glass hairline relative flex h-full flex-col overflow-hidden rounded-3xl p-6 shadow-glass transition-shadow duration-300",
            accent.ring,
          )}
        >
          {/* 発光グラデ */}
          <div
            className={cn(
              "pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br opacity-40 blur-2xl transition-opacity duration-300 group-hover:opacity-80",
              accent.gradient,
            )}
          />

          {/* 番号 */}
          <span className="font-en absolute right-5 top-4 text-5xl font-extrabold text-white/5 transition-colors group-hover:text-white/10">
            0{bonus.no}
          </span>

          {/* アイコン */}
          <span
            className={cn(
              "relative mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border",
              accent.border,
              accent.bgSoft,
              accent.text,
            )}
          >
            <Icon name={bonus.icon} className="h-6 w-6" />
          </span>

          {/* タグライン */}
          <span
            className={cn(
              "font-en mb-2 text-[10px] font-semibold tracking-[0.25em]",
              accent.text,
            )}
          >
            {bonus.tagline}
          </span>

          {/* タイトル */}
          <h3 className="text-lg font-bold leading-snug">{bonus.title}</h3>
          <p className="mt-1 text-sm font-medium text-[color:var(--muted)]">
            {bonus.subtitle}
          </p>

          {/* 説明 */}
          <p className="mt-3 flex-1 text-[13px] leading-relaxed text-[color:var(--muted)]">
            {bonus.description}
          </p>

          {/* CTA */}
          <span
            className={cn(
              "mt-5 inline-flex items-center gap-1.5 text-sm font-semibold transition-gap",
              accent.text,
            )}
          >
            開く
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </motion.div>
      </Link>
    </motion.div>
  );
}
