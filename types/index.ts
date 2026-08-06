// ===========================================================================
// AI副業2.0 Bonus Box — 型定義
// ===========================================================================

export type BonusId =
  | "agent-encyclopedia"
  | "ai-staff"
  | "revenue-system"
  | "claude-code"
  | "workflows";

export type Accent = "gold" | "blue" | "cyan";

export type BonusLayout = "category" | "org" | "flow";

/** トップの5特典カードのメタ */
export interface Bonus {
  id: BonusId;
  no: number;
  title: string;
  subtitle: string;
  description: string;
  /** Lucide アイコン名 */
  icon: string;
  accent: Accent;
  layout: BonusLayout;
  /** カード裏に薄く出る英語タグ */
  tagline: string;
}

export type SnippetLanguage =
  | "text"
  | "markdown"
  | "bash"
  | "tsx"
  | "json";

export interface CodeSnippet {
  language: SnippetLanguage;
  code: string;
  /** コピー計測・お気に入り用の一意キー */
  id?: string;
}

export interface ChatTurn {
  role: "user" | "assistant";
  content: string;
}

/** フロー図の1ステップ（③⑤で使用） */
export interface FlowStep {
  id: string;
  label: string;
  icon?: string;
  detail?: ContentItem;
}

/**
 * ①④⑤共通の詳細アイテム。
 * 存在するフィールドだけを描画する柔軟スキーマ。
 */
export interface ContentItem {
  id: string;
  title: string;
  summary?: string;
  tags?: string[];
  role?: string; // 役割
  usage?: string; // 使い方 / 運用方法
  prompt?: CodeSnippet; // プロンプト（コピー対象）
  chatExample?: ChatTurn[]; // チャット例（②）
  example?: string; // 実例 / 完成例
  application?: string; // 応用
  tools?: string[]; // 使用ツール / 使用AI
  cautions?: string; // 注意点（③）
  input?: string; // 入力例（⑤）
  flow?: FlowStep[]; // フロー図（⑤ / ③）
}

/** ①④⑤の左サイドカテゴリ */
export interface Category {
  id: string;
  bonusId: BonusId;
  label: string;
  icon: string;
  items: ContentItem[];
}

/** ② 組織図ユニット */
export interface OrgUnit {
  id: string;
  title: string;
  role: string;
  parentId?: string; // CEO は undefined
  icon: string;
  accent: Accent;
  job: string;
  prompt?: CodeSnippet;
  chatExample?: ChatTurn[];
  operation?: string;
}

/** ローカル永続化するユーザー状態 */
export interface UserState {
  favorites: string[]; // "bonusId:itemId"
  history: HistoryEntry[];
  copyCounts: Record<string, number>;
  theme: Theme;
}

export interface HistoryEntry {
  key: string; // "bonusId:itemId"
  bonusId: BonusId;
  itemId: string;
  title: string;
  at: number;
}

export type Theme = "dark" | "light";

/** 検索インデックスの1レコード */
export interface SearchRecord {
  key: string; // "bonusId:itemId"
  bonusId: BonusId;
  bonusTitle: string;
  categoryLabel: string;
  itemId: string;
  title: string;
  summary?: string;
  tags?: string[];
  body: string; // 検索対象の結合テキスト
}
