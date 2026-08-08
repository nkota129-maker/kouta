"use client";

import { useEffect, useRef, useState } from "react";
import { Download, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/common/Toast";
import type {
  EyecatchAccent,
  EyecatchPattern,
  EyecatchSpec,
} from "@/lib/generator/types";
import { drawEyecatch, downloadEyecatch } from "@/lib/generator/eyecatch";

const ACCENT_OPTS: { value: EyecatchAccent; label: string; dot: string }[] = [
  { value: "gold", label: "ゴールド", dot: "bg-gold" },
  { value: "cyan", label: "シアン", dot: "bg-neon-cyan" },
  { value: "blue", label: "ブルー", dot: "bg-neon-blue" },
];

const PATTERN_OPTS: { value: EyecatchPattern; label: string }[] = [
  { value: "aurora", label: "オーロラ" },
  { value: "beams", label: "ビーム" },
  { value: "grid", label: "グリッド" },
];

export function EyecatchPreview({
  spec,
  filename,
}: {
  spec: EyecatchSpec;
  filename: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [accent, setAccent] = useState<EyecatchAccent>(spec.accent);
  const [pattern, setPattern] = useState<EyecatchPattern>(spec.pattern);
  const { toast } = useToast();

  useEffect(() => {
    let cancelled = false;
    const render = () => {
      if (cancelled || !canvasRef.current) return;
      drawEyecatch(canvasRef.current, { ...spec, accent, pattern });
    };
    // Webフォント読み込み後に描画（フォント適用のため）
    if (typeof document !== "undefined" && "fonts" in document) {
      (document as Document).fonts.ready.then(render);
    }
    render();
    return () => {
      cancelled = true;
    };
  }, [spec, accent, pattern]);

  function handleDownload() {
    if (!canvasRef.current) return;
    downloadEyecatch(canvasRef.current, filename);
    toast("アイキャッチを保存しました");
  }

  return (
    <div className="space-y-3">
      <div className="hairline overflow-hidden rounded-xl border border-white/10">
        <canvas
          ref={canvasRef}
          className="block h-auto w-full"
          style={{ aspectRatio: "1280 / 670" }}
          aria-label="生成されたアイキャッチ画像のプレビュー"
        />
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] text-[color:var(--muted)]">配色</span>
          {ACCENT_OPTS.map((o) => (
            <button
              key={o.value}
              type="button"
              onClick={() => setAccent(o.value)}
              aria-label={o.label}
              className={cn(
                "flex h-6 items-center gap-1 rounded-full border px-2 text-[11px] transition-colors",
                accent === o.value
                  ? "border-gold/50 bg-white/5 text-[color:var(--fg)]"
                  : "border-white/10 text-[color:var(--muted)] hover:border-white/25",
              )}
            >
              <span className={cn("h-2 w-2 rounded-full", o.dot)} />
              {o.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-[11px] text-[color:var(--muted)]">背景</span>
          {PATTERN_OPTS.map((o) => (
            <button
              key={o.value}
              type="button"
              onClick={() => setPattern(o.value)}
              className={cn(
                "h-6 rounded-full border px-2.5 text-[11px] transition-colors",
                pattern === o.value
                  ? "border-gold/50 bg-white/5 text-[color:var(--fg)]"
                  : "border-white/10 text-[color:var(--muted)] hover:border-white/25",
              )}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={handleDownload}
        className="inline-flex items-center gap-2 rounded-full border border-neon-cyan/30 bg-neon-cyan/10 px-4 py-2 text-xs font-semibold text-neon-cyan transition-colors hover:bg-neon-cyan/20"
      >
        <Download className="h-3.5 w-3.5" />
        アイキャッチをPNG保存（1280×670）
      </button>

      <p className="flex items-center gap-1.5 text-[11px] text-[color:var(--muted)]">
        <ImageIcon className="h-3 w-3" />
        note推奨の見出し画像サイズ。そのままアップロードできます。
      </p>
    </div>
  );
}
