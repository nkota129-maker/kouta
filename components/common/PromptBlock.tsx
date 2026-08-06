"use client";

import type { CodeSnippet } from "@/types";
import { CopyButton } from "./CopyButton";

interface PromptBlockProps {
  snippet: CodeSnippet;
  title?: string;
}

/** プロンプト / コードブロック表示。コピーボタン＋コピー数カウント付き。 */
export function PromptBlock({ snippet, title = "プロンプト" }: PromptBlockProps) {
  return (
    <div className="hairline overflow-hidden rounded-xl border border-white/10 bg-base-900/60">
      <div className="flex items-center justify-between border-b border-white/8 bg-white/[0.03] px-4 py-2">
        <div className="flex items-center gap-2">
          <span className="flex gap-1">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400/60" />
          </span>
          <span className="text-xs font-medium text-[color:var(--muted)]">
            {title}
            <span className="ml-2 uppercase tracking-wider opacity-60">
              {snippet.language}
            </span>
          </span>
        </div>
        <CopyButton value={snippet.code} copyId={snippet.id} />
      </div>
      <pre className="no-scrollbar overflow-x-auto px-4 py-4 text-[13px] leading-relaxed">
        <code className="font-mono text-[color:var(--fg)]/90 whitespace-pre-wrap break-words">
          {snippet.code}
        </code>
      </pre>
    </div>
  );
}
