"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Search as SearchIcon } from "lucide-react";
import { searchAll } from "@/lib/search";
import { PageIntro } from "@/components/common/PageIntro";
import { ResultCard } from "@/components/common/ResultCard";
import { EmptyState } from "@/components/common/EmptyState";
import { staggerContainer } from "@/lib/motion";

function SearchContent() {
  const params = useSearchParams();
  const initial = params.get("q") ?? "";
  const [query, setQuery] = useState(initial);

  const results = useMemo(() => searchAll(query, 30), [query]);

  return (
    <div>
      <PageIntro
        icon="Search"
        title="検索"
        description="全特典を横断して、必要なテンプレートを見つけます。"
      />

      <div className="mb-6 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 focus-within:border-gold/30">
        <SearchIcon className="h-4 w-4 text-[color:var(--muted)]" />
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="キーワードを入力…"
          className="h-12 flex-1 bg-transparent text-sm outline-none placeholder:text-[color:var(--muted)]"
        />
      </div>

      {query.trim() === "" ? (
        <EmptyState
          icon="Search"
          title="キーワードで検索"
          description="例：Instagram / プロンプト / 営業 / 画像生成"
        />
      ) : results.length === 0 ? (
        <EmptyState
          icon="SearchX"
          title={`「${query}」に一致する結果はありません`}
          description="別のキーワードでお試しください。"
        />
      ) : (
        <>
          <p className="mb-3 text-sm text-[color:var(--muted)]">
            {results.length}件ヒット
          </p>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="space-y-3"
          >
            {results.map((r) => (
              <ResultCard key={r.key} record={r} />
            ))}
          </motion.div>
        </>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="py-20" />}>
      <SearchContent />
    </Suspense>
  );
}
