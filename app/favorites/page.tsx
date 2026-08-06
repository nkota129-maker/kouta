"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useStore } from "@/lib/store";
import { getRecord } from "@/lib/data";
import { PageIntro } from "@/components/common/PageIntro";
import { ResultCard } from "@/components/common/ResultCard";
import { EmptyState } from "@/components/common/EmptyState";
import { staggerContainer } from "@/lib/motion";

export default function FavoritesPage() {
  const { favorites, hydrated } = useStore();

  const records = favorites
    .map((key) => getRecord(key))
    .filter((r): r is NonNullable<typeof r> => Boolean(r));

  return (
    <div>
      <PageIntro
        icon="Heart"
        title="お気に入り"
        description="保存したテンプレートをいつでもここから。"
      />

      {!hydrated ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-20 animate-pulse rounded-2xl bg-white/5" />
          ))}
        </div>
      ) : records.length === 0 ? (
        <EmptyState
          icon="HeartOff"
          title="まだお気に入りがありません"
          description="各テンプレートの♡ボタンから、よく使うものを保存できます。"
        >
          <Link
            href="/"
            className="mt-2 rounded-full border border-gold/30 bg-gold/10 px-5 py-2 text-sm font-semibold text-gold transition-colors hover:bg-gold/20"
          >
            特典を見る
          </Link>
        </EmptyState>
      ) : (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="space-y-3"
        >
          {records.map((r) => (
            <ResultCard key={r.key} record={r} />
          ))}
        </motion.div>
      )}
    </div>
  );
}
