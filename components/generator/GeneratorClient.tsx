"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FileStack, Info } from "lucide-react";
import { staggerContainer } from "@/lib/motion";
import { GeneratorForm, DEFAULT_FORM, type FormValues } from "./GeneratorForm";
import { ArticleCard } from "./ArticleCard";
import { generateArticles } from "@/lib/generator/engine";
import type { GeneratedArticle, GenOptions } from "@/lib/generator/types";

const STORAGE_KEY = "ai-bonus-box:generator:v1";

interface Persisted {
  form: FormValues;
  articles: GeneratedArticle[];
}

export function GeneratorClient() {
  const [initialForm, setInitialForm] = useState<Partial<FormValues>>();
  const [articles, setArticles] = useState<GeneratedArticle[]>([]);
  const [generating, setGenerating] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  // 復元
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<Persisted>;
        if (parsed.form) setInitialForm(parsed.form);
        if (Array.isArray(parsed.articles)) setArticles(parsed.articles);
      }
    } catch {
      /* 破損データは無視 */
    }
    setHydrated(true);
  }, []);

  function persist(form: FormValues, arts: GeneratedArticle[]) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ form, articles: arts }));
    } catch {
      /* 容量超過等は無視 */
    }
  }

  function handleGenerate(opts: GenOptions, form: FormValues) {
    setGenerating(true);
    // スピナー描画のため次フレームで実行
    requestAnimationFrame(() => {
      const arts = generateArticles(opts);
      setArticles(arts);
      setGenerating(false);
      persist(form, arts);
      requestAnimationFrame(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  if (!hydrated) {
    return <div className="h-64" aria-hidden />;
  }

  return (
    <div className="space-y-8">
      <GeneratorForm
        initial={initialForm}
        generating={generating}
        onGenerate={handleGenerate}
      />

      <div ref={resultsRef} className="scroll-mt-24">
        {articles.length > 0 ? (
          <>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-lg font-bold">
                <FileStack className="h-5 w-5 text-gold" />
                生成結果
                <span className="font-en text-sm font-normal text-[color:var(--muted)]">
                  {articles.length}本
                </span>
              </h2>
            </div>

            <p className="mb-5 flex items-start gap-1.5 rounded-xl border border-white/8 bg-white/[0.02] px-4 py-2.5 text-xs leading-relaxed text-[color:var(--muted)]">
              <Info className="mt-0.5 h-3.5 w-3.5 flex-none text-gold" />
              <span>
                各記事は構成の土台です。<b className="text-[color:var(--fg)]">【 】</b>
                の箇所をあなたの体験・数字に置き換えると、一気にオリジナルの記事になります。「アイキャッチ」タブから表紙画像も保存できます。
              </span>
            </p>

            <motion.div
              key={articles.map((a) => a.id).join("|")}
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 gap-6 lg:grid-cols-2"
            >
              {articles.map((a, i) => (
                <ArticleCard key={a.id} article={a} index={i} />
              ))}
            </motion.div>
          </>
        ) : (
          <div className="rounded-2xl border border-dashed border-white/12 px-6 py-16 text-center">
            <p className="text-sm text-[color:var(--muted)]">
              テーマと型を選んで「生成する」を押すと、ここに記事が並びます。
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
