// ===========================================================================
// note記事ジェネレーター — 記事組み立てエンジン（完全ローカル）
// ===========================================================================

import type {
  EyecatchAccent,
  EyecatchPattern,
  GenOptions,
  GeneratedArticle,
  Preset,
} from "./types";
import {
  AUDIENCE_META,
  BENEFIT_BANK,
  HASHTAG_BASE,
  HASHTAG_BY_PRESET,
  LENGTH_LIST_ITEMS,
  PRESET_LABELS,
  TONE_META,
} from "./content";
import { buildSections, type BuildCtx } from "./sections";
import { hashSeed, mulberry32, pick, pickN, shuffle, type Rng } from "./rng";

// --- タイトル案 ------------------------------------------------------------

function titleTemplates(preset: Preset, listN: number): string[] {
  switch (preset) {
    case "howto":
      return [
        "「{T}」完全ガイド｜まず最初に読む記事",
        "ゼロから始める{T}｜つまずかないための手順",
        "{T}のやり方を、5ステップでわかりやすく解説",
        "【保存版】{T}の始め方と、成果を出すコツ",
      ];
    case "list":
      return [
        `{T}｜本当に使える${listN}選【保存版】`,
        `厳選${listN}選｜{T}でまず試したいこと`,
        `知らないと損する、{T}の${listN}選`,
        `【${listN}選】{T}をこれから始める人へ`,
      ];
    case "story":
      return [
        "【体験談】{T}で、私の日常はこう変わった",
        "{T}に挑んで学んだこと｜遠回りした私の記録",
        "未経験から{T}へ｜正直に振り返ってみる",
        "あの日、{T}を始めた私へ",
      ];
    case "review":
      return [
        "【正直レビュー】{T}は実際どうなの？試してみた",
        "{T}を試した結論｜メリットとデメリット",
        "{T}は「あり」か？本音で比較レビュー",
        "使ってわかった、{T}のリアルな評価",
      ];
    case "opinion":
      return [
        "{T}について、私が本気で思うこと",
        "【考察】{T}の本質は、どこにあるのか",
        "あえて言いたい、{T}の話",
        "{T}を、そろそろ真面目に考えたい",
      ];
    default:
      return ["{T}について"];
  }
}

const fill = (tpl: string, T: string) => tpl.replaceAll("{T}", T);

// --- リード / アウトロ -----------------------------------------------------

function buildLead(ctx: BuildCtx): string {
  const { rng, T, tone, audience } = ctx;
  const hook = fill(pick(rng, tone.hooks), T);
  const empathy = pick(rng, tone.empathy);
  const benefits = pickN(rng, BENEFIT_BANK, 3).map((b) => fill(b, T));

  return [
    hook,
    "",
    `こんにちは。この記事は、${audience.reader}に向けて書いています。`,
    empathy,
    "",
    "**この記事で分かること**",
    benefits.map((b) => `- ${b}`).join("\n"),
    "",
    "> ※ 【 】の部分は、あなた自身の体験・数字に置き換えると、一気にオリジナルの記事になります。",
  ].join("\n");
}

function buildOutro(ctx: BuildCtx): string {
  const { rng, T, tone, audience } = ctx;
  const cta = pick(rng, tone.cta);
  const sign = pick(rng, tone.sign);

  return [
    "## まとめ",
    `最後に、${T}のポイントを振り返ります。`,
    "",
    [
      "- 完璧な準備より、小さな一歩を優先する",
      `- 目標（${pick(rng, audience.goals)}）を、はっきり決める`,
      "- 試す → 振り返る → 1つ直す、をくり返す",
    ].join("\n"),
    "",
    "**次の一歩**",
    "今日この記事を閉じたら、5分だけでいいので、最初のアクションを1つやってみてください。読むだけで終わらせないことが、いちばんの差になります。",
    "",
    "---",
    "",
    cta,
    "",
    "> 📌 【ここに、あなたの有料note・商品・SNS・メルマガなどの導線を記入】",
    "",
    sign,
  ].join("\n");
}

// --- ハッシュタグ ----------------------------------------------------------

function buildHashtags(ctx: BuildCtx, preset: Preset): string[] {
  const { rng, T, keywords } = ctx;
  const themeTag = T.replace(/\s+/g, "").slice(0, 20);
  const raw = [
    themeTag,
    ...keywords.map((k) => k.replace(/\s+/g, "")),
    ...HASHTAG_BY_PRESET[preset],
    ...pickN(rng, HASHTAG_BASE, 3),
  ]
    .map((t) => t.trim())
    .filter(Boolean);

  // 重複除去（順序維持）
  const seen = new Set<string>();
  const out: string[] = [];
  for (const t of raw) {
    if (!seen.has(t)) {
      seen.add(t);
      out.push(`#${t}`);
    }
  }
  return out.slice(0, 8);
}

// --- 文字数カウント（markdown記号を除いた概算） ----------------------------

function countChars(text: string): number {
  const plain = text
    .replace(/[#>*_`~\-]/g, "")
    .replace(/\d+\.\s/g, "")
    .replace(/\s+/g, "");
  return Array.from(plain).length;
}

// --- アイキャッチ仕様 ------------------------------------------------------

const ACCENTS: EyecatchAccent[] = ["gold", "cyan", "blue"];
const PATTERNS: EyecatchPattern[] = ["aurora", "beams", "grid"];

/** テーマを2行程度に折り返す（アイキャッチ用） */
function wrapForEyecatch(T: string): string {
  const max = 11;
  if (T.length <= max) return T;
  // 句読点・空白で自然に折る
  const sep = T.search(/[、。 　:：/／|｜]/);
  if (sep > 2 && sep < T.length - 2) {
    return T.slice(0, sep) + "\n" + T.slice(sep + 1);
  }
  const mid = Math.ceil(T.length / 2);
  return T.slice(0, mid) + "\n" + T.slice(mid);
}

// --- 1記事生成 ------------------------------------------------------------

function generateOne(
  opts: GenOptions,
  index: number,
  baseSeed: number,
): GeneratedArticle {
  const seed = (baseSeed + index * 0x9e3779b1) >>> 0;
  const rng: Rng = mulberry32(seed);
  const T = opts.theme.trim();
  const audience = AUDIENCE_META[opts.audience];
  const tone = TONE_META[opts.tone];

  const ctx: BuildCtx = {
    rng,
    T,
    keywords: opts.keywords,
    audience,
    tone,
    length: opts.length,
  };

  const listN = LENGTH_LIST_ITEMS[opts.length];
  const titleBank = shuffle(rng, titleTemplates(opts.preset, listN)).map((t) =>
    fill(t, T),
  );
  const title = titleBank[0];
  const altTitles = titleBank.slice(1, 4);

  const lead = buildLead(ctx);
  const sections = buildSections(opts.preset, ctx);
  const outro = buildOutro(ctx);
  const hashtags = buildHashtags(ctx, opts.preset);

  // markdown 組み立て
  const md: string[] = [];
  md.push(`# ${title}`);
  md.push("");
  md.push(lead);
  md.push("");
  for (const s of sections) {
    md.push(`## ${s.heading}`);
    md.push("");
    md.push(s.body);
    md.push("");
  }
  md.push(outro);
  md.push("");
  md.push(hashtags.join(" "));
  const markdown = md.join("\n").replace(/\n{3,}/g, "\n\n");

  const bodyOnly = [lead, ...sections.map((s) => s.body), outro].join("\n");
  const charCount = countChars(bodyOnly);
  const readMinutes = Math.max(1, Math.round(charCount / 500));

  const eyecatch = {
    title: wrapForEyecatch(T),
    badge: PRESET_LABELS[opts.preset].split(" ")[0],
    subtitle: audience.reader,
    accent: ACCENTS[index % ACCENTS.length],
    pattern: PATTERNS[index % PATTERNS.length],
  };

  return {
    id: `${seed.toString(36)}-${index}`,
    seed,
    title,
    altTitles,
    lead,
    sections,
    outro,
    hashtags,
    markdown,
    charCount,
    readMinutes,
    eyecatch,
    meta: {
      theme: T,
      preset: opts.preset,
      tone: opts.tone,
      audience: opts.audience,
      length: opts.length,
      createdAt: Date.now(),
    },
  };
}

/** メイン：N本の記事バリエーションを生成 */
export function generateArticles(opts: GenOptions): GeneratedArticle[] {
  const baseSeed =
    opts.seed ??
    (hashSeed(opts.theme + opts.preset + opts.tone) ^ Date.now()) >>> 0;
  const count = Math.max(1, Math.min(10, Math.floor(opts.count) || 1));
  const out: GeneratedArticle[] = [];
  for (let i = 0; i < count; i++) {
    out.push(generateOne(opts, i, baseSeed));
  }
  return out;
}
