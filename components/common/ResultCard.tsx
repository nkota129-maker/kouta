"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { SearchRecord } from "@/types";
import { getBonus } from "@/lib/data";
import { Icon } from "./Icon";
import { FavoriteButton } from "./FavoriteButton";
import { fadeUp } from "@/lib/motion";

export function ResultCard({
  record,
  meta,
}: {
  record: SearchRecord;
  meta?: string;
}) {
  const bonus = getBonus(record.bonusId);
  return (
    <motion.div variants={fadeUp}>
      <div className="glass hairline group relative flex items-center gap-4 rounded-2xl p-4 shadow-glass transition-shadow hover:shadow-glow-gold">
        <Link
          href={`/vault/${record.bonusId}?item=${record.itemId}`}
          className="flex min-w-0 flex-1 items-center gap-4"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gold/20 bg-gold/10 text-gold">
            <Icon name={bonus?.icon ?? "Sparkles"} className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate font-semibold">{record.title}</p>
            <p className="truncate text-xs text-[color:var(--muted)]">
              {record.bonusTitle}・{record.categoryLabel}
              {meta && <span className="ml-2 opacity-70">{meta}</span>}
            </p>
          </div>
          <ArrowUpRight className="h-4 w-4 shrink-0 text-[color:var(--muted)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
        <FavoriteButton favKey={record.key} />
      </div>
    </motion.div>
  );
}
