"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Clock,
  Download,
  FileText,
  Image as ImageLucide,
  Eye,
  Type,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { fadeUp } from "@/lib/motion";
import { GlassCard } from "@/components/common/GlassCard";
import { CopyButton } from "@/components/common/CopyButton";
import { useToast } from "@/components/common/Toast";
import { MarkdownView } from "./MarkdownView";
import { EyecatchPreview } from "./EyecatchPreview";
import {
  PRESET_LABELS,
  TONE_LABELS,
  LENGTH_LABELS,
} from "@/lib/generator/content";
import type { GeneratedArticle } from "@/lib/generator/types";

type Tab = "preview" | "markdown" | "eyecatch";

function downloadText(text: string, filename: string) {
  const blob = new Blob([text], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function safeName(s: string) {
  return s.replace(/[\\/:*?"<>|\n]/g, "_").slice(0, 40) || "note-article";
}

export function ArticleCard({
  article,
  index,
}: {
  article: GeneratedArticle;
  index: number;
}) {
  const [tab, setTab] = useState<Tab>("preview");
  const [showAlts, setShowAlts] = useState(false);
  const { toast } = useToast();

  const base = safeName(article.title);

  const tabs: { id: Tab; label: string; icon: typeof Eye }[] = [
    { id: "preview", label: "プレビュー", icon: Eye },
    { id: "markdown", label: "Markdown", icon: FileText },
    { id: "eyecatch", label: "アイキャッチ", icon: ImageLucide },
  ];

  return (
    <motion.div variants={fadeUp}>
      <GlassCard className="p-5 sm:p-6">
        {/* ヘッダ */}
        <div className="mb-4">
          <div className="mb-2 flex items-center gap-2">
            <span className="font-en flex h-6 items-center rounded-full bg-gold/15 px-2 text-xs font-bold text-gold">
              #{index + 1}
            </span>
            <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-[color:var(--muted)]">
              <Chip>{PRESET_LABELS[article.meta.preset].split(" ")[0]}</Chip>
              <Chip>{TONE_LABELS[article.meta.tone]}</Chip>
              <Chip icon={Type}>{article.charCount.toLocaleString()}字</Chip>
              <Chip icon={Clock}>約{article.readMinutes}分</Chip>
            </div>
          </div>

          <h3 className="text-lg font-bold leading-snug text-[color:var(--fg)]">
            {article.title}
          </h3>

          {/* 代替タイトル案 */}
          {article.altTitles.length > 0 && (
            <div className="mt-2">
              <button
                type="button"
                onClick={() => setShowAlts((v) => !v)}
                className="inline-flex items-center gap-1 text-xs text-[color:var(--muted)] transition-colors hover:text-gold"
              >
                <ChevronDown
                  className={cn(
                    "h-3.5 w-3.5 transition-transform",
                    showAlts && "rotate-180",
                  )}
                />
                タイトル案をもう{article.altTitles.length}つ見る
              </button>
              {showAlts && (
                <ul className="mt-2 space-y-1.5">
                  {article.altTitles.map((t, i) => (
                    <li
                      key={i}
                      className="flex items-center justify-between gap-2 rounded-lg border border-white/8 bg-white/[0.03] px-3 py-1.5 text-xs text-[color:var(--fg)]/85"
                    >
                      <span>{t}</span>
                      <CopyButton value={t} label="使う" className="px-2 py-1" />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        {/* タブ */}
        <div className="mb-4 flex gap-1 rounded-full border border-white/8 bg-white/[0.02] p-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={cn(
                "flex flex-1 items-center justify-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                tab === t.id
                  ? "bg-gold/15 text-gold"
                  : "text-[color:var(--muted)] hover:text-[color:var(--fg)]",
              )}
            >
              <t.icon className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{t.label}</span>
            </button>
          ))}
        </div>

        {/* 本体 */}
        {tab === "preview" && (
          <div className="max-h-[520px] overflow-y-auto rounded-xl border border-white/8 bg-base-900/40 p-4 sm:p-5">
            <MarkdownView markdown={article.markdown} />
          </div>
        )}

        {tab === "markdown" && (
          <pre className="no-scrollbar max-h-[520px] overflow-auto rounded-xl border border-white/8 bg-base-900/60 p-4 text-[12.5px] leading-relaxed">
            <code className="whitespace-pre-wrap break-words font-mono text-[color:var(--fg)]/90">
              {article.markdown}
            </code>
          </pre>
        )}

        {tab === "eyecatch" && (
          <EyecatchPreview spec={article.eyecatch} filename={base} />
        )}

        {/* アクション */}
        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-white/8 pt-4">
          <CopyButton
            value={article.markdown}
            label="記事全文をコピー"
            copyId={`gen:${article.id}`}
          />
          <button
            type="button"
            onClick={() => {
              downloadText(article.markdown, `${base}.md`);
              toast("Markdownを保存しました");
            }}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-[color:var(--fg)] transition-colors hover:border-white/25"
          >
            <Download className="h-3.5 w-3.5" />
            .md保存
          </button>
          <CopyButton
            value={article.hashtags.join(" ")}
            label="タグをコピー"
            className="border-neon-cyan/30 bg-neon-cyan/10 text-neon-cyan hover:bg-neon-cyan/20"
          />
        </div>
      </GlassCard>
    </motion.div>
  );
}

function Chip({
  children,
  icon: Icon,
}: {
  children: React.ReactNode;
  icon?: typeof Clock;
}) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5">
      {Icon && <Icon className="h-3 w-3" />}
      {children}
    </span>
  );
}
