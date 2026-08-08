"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Wand2, Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/common/GlassCard";
import {
  AUDIENCE_LABELS,
  TONE_LABELS,
  PRESET_LABELS,
  PRESET_HINT,
  LENGTH_LABELS,
} from "@/lib/generator/content";
import type {
  Audience,
  GenOptions,
  Length,
  Preset,
  Tone,
} from "@/lib/generator/types";

export interface FormValues {
  theme: string;
  keywords: string;
  audience: Audience;
  tone: Tone;
  preset: Preset;
  length: Length;
  count: number;
}

export const DEFAULT_FORM: FormValues = {
  theme: "",
  keywords: "",
  audience: "sidejob",
  tone: "trust",
  preset: "howto",
  length: "standard",
  count: 3,
};

const THEME_SAMPLES = [
  "AIで副業を始める方法",
  "ChatGPTを仕事で使い倒すコツ",
  "在宅ワークで月5万円を作る",
  "初心者向けのWebライティング入門",
  "続く習慣の作り方",
];

function PillGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; label: string; hint?: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold tracking-wide text-[color:var(--muted)]">
        {label}
      </label>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
              value === o.value
                ? "border-gold/50 bg-gold/15 text-gold shadow-glow-gold"
                : "border-white/10 bg-white/[0.03] text-[color:var(--muted)] hover:border-white/25 hover:text-[color:var(--fg)]",
            )}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

const toOpts = <T extends string>(rec: Record<T, string>) =>
  (Object.keys(rec) as T[]).map((k) => ({ value: k, label: rec[k] }));

export function GeneratorForm({
  initial,
  generating,
  onGenerate,
}: {
  initial?: Partial<FormValues>;
  generating?: boolean;
  onGenerate: (opts: GenOptions, form: FormValues) => void;
}) {
  const [form, setForm] = useState<FormValues>({ ...DEFAULT_FORM, ...initial });

  const set = <K extends keyof FormValues>(key: K, v: FormValues[K]) =>
    setForm((f) => ({ ...f, [key]: v }));

  const canGenerate = form.theme.trim().length > 0 && !generating;

  function handleSubmit() {
    if (!canGenerate) return;
    const keywords = form.keywords
      .split(/[,、\n]+/)
      .map((k) => k.trim())
      .filter(Boolean)
      .slice(0, 6);
    const opts: GenOptions = {
      theme: form.theme.trim(),
      keywords,
      audience: form.audience,
      tone: form.tone,
      preset: form.preset,
      length: form.length,
      count: form.count,
    };
    onGenerate(opts, form);
  }

  return (
    <GlassCard className="p-5 sm:p-7">
      <div className="space-y-6">
        {/* テーマ */}
        <div>
          <label
            htmlFor="theme"
            className="mb-2 block text-sm font-bold text-[color:var(--fg)]"
          >
            テーマ <span className="text-gold">*</span>
          </label>
          <input
            id="theme"
            type="text"
            value={form.theme}
            onChange={(e) => set("theme", e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleSubmit();
            }}
            placeholder="例：AIで副業を始める方法"
            className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-[color:var(--fg)] outline-none transition-colors placeholder:text-[color:var(--muted)]/60 focus:border-gold/40"
          />
          <div className="mt-2 flex flex-wrap gap-1.5">
            {THEME_SAMPLES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => set("theme", s)}
                className="rounded-full border border-white/8 px-2.5 py-1 text-[11px] text-[color:var(--muted)] transition-colors hover:border-gold/30 hover:text-gold"
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* キーワード */}
        <div>
          <label
            htmlFor="keywords"
            className="mb-2 block text-sm font-bold text-[color:var(--fg)]"
          >
            キーワード
            <span className="ml-2 text-xs font-normal text-[color:var(--muted)]">
              （任意・カンマ区切り。本文とハッシュタグに反映）
            </span>
          </label>
          <input
            id="keywords"
            type="text"
            value={form.keywords}
            onChange={(e) => set("keywords", e.target.value)}
            placeholder="例：ChatGPT, 初心者, 時短"
            className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-[color:var(--fg)] outline-none transition-colors placeholder:text-[color:var(--muted)]/60 focus:border-gold/40"
          />
        </div>

        {/* 記事の型 */}
        <div>
          <PillGroup
            label="記事の型"
            options={toOpts(PRESET_LABELS)}
            value={form.preset}
            onChange={(v) => set("preset", v as Preset)}
          />
          <p className="mt-2 text-xs text-[color:var(--muted)]">
            {PRESET_HINT[form.preset]}
          </p>
        </div>

        {/* 読者・トーン・長さ */}
        <div className="grid gap-6 sm:grid-cols-2">
          <PillGroup
            label="読者ターゲット"
            options={toOpts(AUDIENCE_LABELS)}
            value={form.audience}
            onChange={(v) => set("audience", v as Audience)}
          />
          <PillGroup
            label="トーン"
            options={toOpts(TONE_LABELS)}
            value={form.tone}
            onChange={(v) => set("tone", v as Tone)}
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <PillGroup
            label="長さ"
            options={toOpts(LENGTH_LABELS)}
            value={form.length}
            onChange={(v) => set("length", v as Length)}
          />

          {/* 量産数 */}
          <div>
            <label className="mb-2 block text-xs font-semibold tracking-wide text-[color:var(--muted)]">
              量産数（バリエーション）
            </label>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1">
                <button
                  type="button"
                  aria-label="減らす"
                  onClick={() => set("count", Math.max(1, form.count - 1))}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-[color:var(--muted)] transition-colors hover:bg-white/5 hover:text-[color:var(--fg)]"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="font-en w-8 text-center text-lg font-bold text-gold tabular-nums">
                  {form.count}
                </span>
                <button
                  type="button"
                  aria-label="増やす"
                  onClick={() => set("count", Math.min(10, form.count + 1))}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-[color:var(--muted)] transition-colors hover:bg-white/5 hover:text-[color:var(--fg)]"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <span className="text-xs text-[color:var(--muted)]">
                本まとめて生成（最大10本）
              </span>
            </div>
          </div>
        </div>

        {/* 生成ボタン */}
        <motion.button
          type="button"
          onClick={handleSubmit}
          disabled={!canGenerate}
          whileTap={canGenerate ? { scale: 0.98 } : undefined}
          className={cn(
            "group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl px-6 py-4 text-base font-bold transition-all",
            canGenerate
              ? "bg-gradient-to-r from-gold-soft via-gold to-gold-deep text-base-900 shadow-glow-gold hover:brightness-110"
              : "cursor-not-allowed bg-white/5 text-[color:var(--muted)]",
          )}
        >
          {generating ? (
            <>
              <Sparkles className="h-5 w-5 animate-pulse" />
              生成中…
            </>
          ) : (
            <>
              <Wand2 className="h-5 w-5" />
              {form.count}本の記事を生成する
            </>
          )}
        </motion.button>
        {!form.theme.trim() && (
          <p className="-mt-3 text-center text-xs text-[color:var(--muted)]">
            テーマを入力すると生成できます（⌘/Ctrl + Enter でも実行）
          </p>
        )}
      </div>
    </GlassCard>
  );
}
