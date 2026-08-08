import type { Metadata } from "next";
import { PenTool, Sparkles } from "lucide-react";
import { GeneratorClient } from "@/components/generator/GeneratorClient";

export const metadata: Metadata = {
  title: "note記事ジェネレーター",
  description:
    "テーマを入れるだけで、高品質なnote記事の下書きを量産。アイキャッチ画像もその場で生成。すべてブラウザ内で完結します。",
};

export default function GeneratorPage() {
  return (
    <div className="pb-10">
      {/* イントロ */}
      <section className="pt-10 pb-8 sm:pt-14">
        <span className="glass hairline mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-gold">
          <Sparkles className="h-3.5 w-3.5" />
          記事量産ツール
        </span>
        <h1 className="flex items-center gap-3 text-3xl font-extrabold sm:text-4xl">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-gold/25 bg-gold/10 text-gold">
            <PenTool className="h-5 w-5" />
          </span>
          <span className="text-gradient-gold">note記事ジェネレーター</span>
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[color:var(--muted)]">
          テーマ・読者・トーン・型を選ぶだけで、note向けの高品質な記事構成を
          <b className="text-[color:var(--fg)]">まとめて量産</b>
          。タイトル案・本文・ハッシュタグ・
          <b className="text-[color:var(--fg)]">アイキャッチ画像</b>
          まで一括生成します。API不要・すべてブラウザ内で完結し、費用もかかりません。
        </p>
      </section>

      <GeneratorClient />
    </div>
  );
}
