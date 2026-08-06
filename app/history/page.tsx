"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useStore } from "@/lib/store";
import { getRecord } from "@/lib/data";
import { PageIntro } from "@/components/common/PageIntro";
import { ResultCard } from "@/components/common/ResultCard";
import { EmptyState } from "@/components/common/EmptyState";
import { staggerContainer } from "@/lib/motion";

function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const min = Math.floor(diff / 60000);
  if (min < 1) return "たった今";
  if (min < 60) return `${min}分前`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}時間前`;
  const day = Math.floor(hr / 24);
  return `${day}日前`;
}

export default function HistoryPage() {
  const { history, hydrated, clearHistory } = useStore();

  const entries = history
    .map((h) => ({ entry: h, record: getRecord(h.key) }))
    .filter((x) => Boolean(x.record));

  return (
    <div>
      <PageIntro
        icon="Clock"
        title="閲覧履歴"
        description="最近ひらいたテンプレートの記録です。"
        action={
          hydrated && history.length > 0 ? (
            <button
              onClick={clearHistory}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-[color:var(--muted)] transition-colors hover:text-[color:var(--fg)]"
            >
              履歴をクリア
            </button>
          ) : undefined
        }
      />

      {!hydrated ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-20 animate-pulse rounded-2xl bg-white/5" />
          ))}
        </div>
      ) : entries.length === 0 ? (
        <EmptyState
          icon="Clock"
          title="まだ履歴がありません"
          description="テンプレートを開くと、ここに自動で記録されます。"
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
          {entries.map(({ entry, record }) => (
            <ResultCard
              key={entry.key + entry.at}
              record={record!}
              meta={timeAgo(entry.at)}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}
