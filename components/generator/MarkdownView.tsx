"use client";

import { Fragment, type ReactNode } from "react";

/**
 * 生成記事プレビュー用の軽量Markdownレンダラ。
 * 見出し / リスト / 引用 / 太字 / 区切り線 / ハッシュタグ に対応。
 * 外部依存なし・dangerouslySetInnerHTML 不使用。
 */

/** インラインの **太字** を解決 */
function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.filter(Boolean).map((p, i) => {
    if (p.startsWith("**") && p.endsWith("**")) {
      return (
        <strong key={`${keyPrefix}-b${i}`} className="font-bold text-[color:var(--fg)]">
          {p.slice(2, -2)}
        </strong>
      );
    }
    return <Fragment key={`${keyPrefix}-t${i}`}>{p}</Fragment>;
  });
}

export function MarkdownView({ markdown }: { markdown: string }) {
  const lines = markdown.split("\n");
  const blocks: ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // 空行
    if (trimmed === "") {
      i++;
      continue;
    }

    // 区切り線
    if (/^-{3,}$/.test(trimmed)) {
      blocks.push(<hr key={key++} className="my-5 border-white/10" />);
      i++;
      continue;
    }

    // 見出し
    if (trimmed.startsWith("# ")) {
      blocks.push(
        <h1 key={key++} className="mt-2 text-2xl font-extrabold leading-snug">
          {renderInline(trimmed.slice(2), `h1${key}`)}
        </h1>,
      );
      i++;
      continue;
    }
    if (trimmed.startsWith("## ")) {
      blocks.push(
        <h2
          key={key++}
          className="mt-6 border-l-2 border-gold/60 pl-3 text-lg font-bold text-[color:var(--fg)]"
        >
          {renderInline(trimmed.slice(3), `h2${key}`)}
        </h2>,
      );
      i++;
      continue;
    }
    if (trimmed.startsWith("### ")) {
      blocks.push(
        <h3 key={key++} className="mt-4 text-base font-bold text-gold">
          {renderInline(trimmed.slice(4), `h3${key}`)}
        </h3>,
      );
      i++;
      continue;
    }

    // ハッシュタグ行（"#tag #tag" 形式・見出しではない）
    if (/^#[^\s#]/.test(trimmed) && trimmed.includes(" #")) {
      const tags = trimmed.split(/\s+/).filter((t) => t.startsWith("#"));
      blocks.push(
        <div key={key++} className="mt-4 flex flex-wrap gap-2">
          {tags.map((t, ti) => (
            <span
              key={ti}
              className="rounded-full border border-neon-cyan/25 bg-neon-cyan/10 px-2.5 py-1 text-xs text-neon-cyan"
            >
              {t}
            </span>
          ))}
        </div>,
      );
      i++;
      continue;
    }

    // 引用（callout）
    if (trimmed.startsWith(">")) {
      const quote: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        quote.push(lines[i].trim().replace(/^>\s?/, ""));
        i++;
      }
      blocks.push(
        <blockquote
          key={key++}
          className="my-3 rounded-r-lg border-l-2 border-gold/50 bg-gold/[0.06] px-4 py-2.5 text-sm text-[color:var(--muted)]"
        >
          {quote.map((q, qi) => (
            <p key={qi}>{renderInline(q, `q${key}-${qi}`)}</p>
          ))}
        </blockquote>,
      );
      continue;
    }

    // 番号付きリスト
    if (/^\d+\.\s/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s/, ""));
        i++;
      }
      blocks.push(
        <ol key={key++} className="my-2 ml-1 space-y-1.5">
          {items.map((it, ii) => (
            <li key={ii} className="flex gap-2.5 text-sm leading-relaxed">
              <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-gold/15 text-[11px] font-bold text-gold">
                {ii + 1}
              </span>
              <span>{renderInline(it, `ol${key}-${ii}`)}</span>
            </li>
          ))}
        </ol>,
      );
      continue;
    }

    // 箇条書き
    if (trimmed.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("- ")) {
        items.push(lines[i].trim().slice(2));
        i++;
      }
      blocks.push(
        <ul key={key++} className="my-2 space-y-1.5">
          {items.map((it, ii) => (
            <li key={ii} className="flex gap-2.5 text-sm leading-relaxed">
              <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-gold/70" />
              <span>{renderInline(it, `ul${key}-${ii}`)}</span>
            </li>
          ))}
        </ul>,
      );
      continue;
    }

    // 段落
    blocks.push(
      <p key={key++} className="text-sm leading-[1.9] text-[color:var(--fg)]/90">
        {renderInline(trimmed, `p${key}`)}
      </p>,
    );
    i++;
  }

  return <div className="space-y-1">{blocks}</div>;
}
