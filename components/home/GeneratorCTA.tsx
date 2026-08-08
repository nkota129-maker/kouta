"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PenTool, ArrowRight, Sparkles, ImageIcon } from "lucide-react";
import { fadeUp } from "@/lib/motion";
import { GlassCard } from "@/components/common/GlassCard";

export function GeneratorCTA() {
  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className="pb-14"
    >
      <GlassCard className="relative p-6 sm:p-9">
        {/* 装飾グロー */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gold/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 left-1/3 h-56 w-56 rounded-full bg-neon-cyan/10 blur-3xl" />

        <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl">
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-gold/25 bg-gold/10 px-3 py-1 text-xs font-medium text-gold">
              <Sparkles className="h-3.5 w-3.5" />
              NEW TOOL
            </span>
            <h2 className="text-2xl font-bold sm:text-3xl">
              <span className="text-gradient-gold">note記事</span>を、テーマから量産。
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[color:var(--muted)]">
              テーマ・読者・トーンを選ぶだけで、高品質な記事構成を一気に生成。タイトル案・本文・ハッシュタグ・
              <span className="inline-flex items-center gap-1 text-[color:var(--fg)]">
                <ImageIcon className="h-3.5 w-3.5" />
                アイキャッチ画像
              </span>
              まで一括で。API不要・すべて無料で完結します。
            </p>
          </div>

          <Link
            href="/generator"
            className="group inline-flex flex-none items-center gap-2 rounded-xl bg-gradient-to-r from-gold-soft via-gold to-gold-deep px-6 py-3.5 text-sm font-bold text-base-900 shadow-glow-gold transition-all hover:brightness-110"
          >
            <PenTool className="h-4 w-4" />
            記事を生成する
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </GlassCard>
    </motion.section>
  );
}
