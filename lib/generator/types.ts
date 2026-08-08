// ===========================================================================
// note記事ジェネレーター — 型定義
// すべてローカル（ブラウザ内）で動作。APIキー・バックエンド不要。
// ===========================================================================

/** 記事のトーン */
export type Tone = "trust" | "friendly" | "passion" | "logical" | "story";

/** 記事の型（構成テンプレート） */
export type Preset = "howto" | "list" | "story" | "review" | "opinion";

/** 記事の長さ（セクション数・深さを制御） */
export type Length = "short" | "standard" | "long";

/** 読者ターゲット */
export type Audience =
  | "beginner"
  | "sidejob"
  | "freelance"
  | "owner"
  | "student"
  | "general";

export interface GenOptions {
  /** テーマ（必須） */
  theme: string;
  /** 補助キーワード（本文・ハッシュタグに反映） */
  keywords: string[];
  audience: Audience;
  tone: Tone;
  preset: Preset;
  length: Length;
  /** 量産数（1本の生成で作る記事バリエーション数） */
  count: number;
  /** 乱数シード（未指定なら現在時刻） */
  seed?: number;
}

export type EyecatchPattern = "aurora" | "beams" | "grid";
export type EyecatchAccent = "gold" | "cyan" | "blue";

export interface EyecatchSpec {
  /** メインコピー（改行は \n） */
  title: string;
  /** 左上の小さなラベル */
  badge: string;
  /** 下部の補足コピー */
  subtitle: string;
  accent: EyecatchAccent;
  pattern: EyecatchPattern;
}

export interface ArticleSection {
  heading: string;
  body: string;
}

export interface GeneratedArticle {
  id: string;
  seed: number;
  title: string;
  /** 代替タイトル案 */
  altTitles: string[];
  lead: string;
  sections: ArticleSection[];
  outro: string;
  hashtags: string[];
  /** note貼り付け用の完成Markdown */
  markdown: string;
  charCount: number;
  readMinutes: number;
  eyecatch: EyecatchSpec;
  meta: {
    theme: string;
    preset: Preset;
    tone: Tone;
    audience: Audience;
    length: Length;
    createdAt: number;
  };
}
