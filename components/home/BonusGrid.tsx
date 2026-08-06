"use client";

import { motion } from "framer-motion";
import { BONUSES } from "@/lib/data";
import { staggerContainer } from "@/lib/motion";
import { BonusCard } from "./BonusCard";

export function BonusGrid() {
  return (
    <section className="pb-10">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="text-xl font-bold sm:text-2xl">特典コレクション</h2>
          <p className="mt-1 text-sm text-[color:var(--muted)]">
            気になる特典から、今すぐ実践できます。
          </p>
        </div>
        <span className="font-en hidden text-xs tracking-[0.2em] text-[color:var(--muted)] sm:block">
          THE VAULT
        </span>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {BONUSES.map((bonus) => (
          <BonusCard key={bonus.id} bonus={bonus} />
        ))}
      </motion.div>
    </section>
  );
}
