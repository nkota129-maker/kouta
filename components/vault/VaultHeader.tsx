"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import type { Bonus } from "@/types";
import { accentClasses, cn } from "@/lib/utils";
import { Icon } from "@/components/common/Icon";
import { fadeUp } from "@/lib/motion";

export function VaultHeader({ bonus }: { bonus: Bonus }) {
  const accent = accentClasses[bonus.accent];
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="show"
      className="pt-8 pb-6"
    >
      <Link
        href="/"
        className="mb-5 inline-flex items-center gap-1.5 text-sm text-[color:var(--muted)] transition-colors hover:text-[color:var(--fg)]"
      >
        <ArrowLeft className="h-4 w-4" />
        特典一覧へ戻る
      </Link>
      <div className="flex items-start gap-4">
        <span
          className={cn(
            "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border",
            accent.border,
            accent.bgSoft,
            accent.text,
          )}
        >
          <Icon name={bonus.icon} className="h-6 w-6" />
        </span>
        <div>
          <span
            className={cn(
              "font-en text-[10px] font-semibold tracking-[0.25em]",
              accent.text,
            )}
          >
            {bonus.tagline}
          </span>
          <h1 className="mt-1 text-2xl font-bold leading-tight sm:text-3xl">
            {bonus.title}
          </h1>
          <p className="mt-1 text-sm text-[color:var(--muted)]">
            {bonus.subtitle}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
