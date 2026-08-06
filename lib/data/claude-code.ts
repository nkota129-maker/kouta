import type { Category } from "@/types";

const BID = "claude-code";

// ④ Claude Code完全実践テンプレ — カテゴリ別・コピペで動く完成済みプロンプト

export const CLAUDE_CODE: Category[] = [
  {
    id: "lp",
    bonusId: BID,
    label: "LP",
    icon: "Layout",
    items: [
      {
        id: "cc-lp-build",
        title: "1画面完結のLPを生成",
        summary: "商品情報を渡すだけでレスポンシブLPのコードを出力。",
        tags: ["HTML", "Tailwind", "レスポンシブ"],
        usage:
          "{ }を自分の商品に置き換えてClaude Codeに貼るだけ。生成後『CTAをもっと目立たせて』などで微調整できる。",
        prompt: {
          language: "text",
          id: "cc-lp-build-prompt",
          code: `次の商品のランディングページを1枚もので作ってください。

- 商品: {商品名}
- ターゲット: {ターゲット}
- 価格: {価格}
- 訴求: {一番の強み}

要件:
- HTML + Tailwind CSS（CDN）で単一ファイル
- 構成: FV / 悩み / 解決策 / ベネフィット / お客様の声 / 料金 / FAQ / CTA
- スマホ最適化・アクセシビリティ配慮
- 上品で信頼感のある配色（派手すぎない）
まずは完成コードを提示し、最後に改善余地を3点添えてください。`,
        },
        example:
          "「オンライン講座 / 29,800円」で実行 → そのままブラウザで開けるLPのHTMLが1ファイルで出力される。",
      },
    ],
  },
  {
    id: "instagram",
    bonusId: BID,
    label: "Instagram",
    icon: "Instagram",
    items: [
      {
        id: "cc-ig-carousel",
        title: "カルーセル画像のHTMLテンプレを生成",
        summary: "スライド構成をコード化して量産の土台に。",
        tags: ["カルーセル", "テンプレ化"],
        usage: "スライド枚数とテーマを指定すると、差し替え前提のHTMLテンプレが出力される。",
        prompt: {
          language: "text",
          id: "cc-ig-carousel-prompt",
          code: `Instagramのカルーセル投稿用に、1080x1080のスライドHTMLテンプレを作ってください。

- テーマ: {テーマ}
- スライド枚数: {枚数}
- トーン: 高級感・余白多め

要件:
- 各スライドは独立したdiv（後からテキスト差し替え可能）
- 表紙 / 本編 / まとめ の役割を明示
- Tailwind CSS、フォントは太めのゴシック
コードの後に、各スライドに入れるべき文言の指示も添えてください。`,
        },
        example: "「時短術7選 / 8枚」で実行 → 表紙〜まとめまでの差し替え式テンプレHTML。",
      },
    ],
  },
  {
    id: "x",
    bonusId: BID,
    label: "X (Twitter)",
    icon: "Twitter",
    items: [
      {
        id: "cc-x-scheduler",
        title: "1週間分の投稿をJSONで設計",
        summary: "予約投稿ツールに流し込めるデータ形式で出力。",
        tags: ["運用自動化", "JSON"],
        usage: "テーマを渡すと、日付・本文・タグ付きのJSONが返る。ツールへの取り込みが楽になる。",
        prompt: {
          language: "text",
          id: "cc-x-scheduler-prompt",
          code: `Xの1週間分の投稿計画を、次のJSON形式で出力してください。

テーマ: {今週のテーマ}

出力形式:
[
  { "day": "Mon", "time": "08:00", "text": "...", "type": "気づき" },
  ...
]
ルール:
- 1日1〜2投稿、各140字以内
- typeは「気づき/ノウハウ/実績/問いかけ」から選ぶ
- JSONのみを出力（説明文は不要）`,
        },
        example: "「副業初心者向け」で実行 → 月〜日の投稿がJSON配列で出力される。",
      },
    ],
  },
  {
    id: "image",
    bonusId: BID,
    label: "画像生成",
    icon: "Image",
    items: [
      {
        id: "cc-image-prompt",
        title: "画像生成AI用プロンプトを設計",
        summary: "日本語の要望を、精度の高い英語プロンプトへ変換。",
        tags: ["画像生成", "プロンプト設計"],
        usage: "作りたい画像を日本語で書くと、構図・光・スタイル指定込みの英語プロンプトが返る。",
        prompt: {
          language: "text",
          id: "cc-image-prompt-prompt",
          code: `画像生成AI用のプロンプトを作ってください。

作りたい画像（日本語）: {イメージの説明}
用途: {SNS投稿 / バナー など}

要件:
- 英語のプロンプトを出力
- 被写体 / 構図 / ライティング / 色調 / スタイル / 画質指定を含める
- ネガティブプロンプトも添える
最後に、微調整用の差し替え候補ワードを5つ提示してください。`,
        },
        example: "「夜の都会を歩く後ろ姿、シネマティック」で実行 → 詳細な英語プロンプト＋ネガ指定。",
      },
    ],
  },
  {
    id: "docs",
    bonusId: BID,
    label: "資料作成",
    icon: "Presentation",
    items: [
      {
        id: "cc-slide-outline",
        title: "提案スライドの構成＋各ページ文言",
        summary: "テーマから、そのまま作れるスライド設計を生成。",
        tags: ["スライド", "提案書"],
        usage: "テーマと枚数を渡すと、ページ順・見出し・話す内容まで返る。",
        prompt: {
          language: "text",
          id: "cc-slide-outline-prompt",
          code: `提案スライドの構成を作ってください。

- テーマ: {テーマ}
- 相手: {提案相手}
- 枚数: {枚数}

出力:
各ページごとに「ページ番号 / 見出し / 本文の要点 / 話すときの一言」を表で。
最初と最後のページは特に印象に残る構成にしてください。`,
        },
        example: "「AI導入提案 / 経営層 / 10枚」で実行 → 表紙〜クロージングまでの構成表。",
      },
    ],
  },
  {
    id: "sales",
    bonusId: BID,
    label: "営業",
    icon: "Handshake",
    items: [
      {
        id: "cc-sales-email",
        title: "反応が取れる営業メールを生成",
        summary: "売り込み臭くない、返信したくなる文面を設計。",
        tags: ["営業", "メール"],
        usage: "相手と提案内容を渡すと、件名＋本文＋フォローアップ案が返る。",
        prompt: {
          language: "text",
          id: "cc-sales-email-prompt",
          code: `営業メールを作ってください。

- 相手: {相手の状況}
- 提案: {提案内容}
- ゴール: {返信 / 面談設定 など}

要件:
- 件名を3案
- 本文は200字前後、売り込み臭さを消す
- 相手のメリットを先に、依頼は最後に軽く
- 返信が来なかった場合のフォローアップ文も1通`,
        },
        example: "「既存客への追加提案」で実行 → 件名3案＋本文＋フォロー文。",
      },
    ],
  },
  {
    id: "research",
    bonusId: BID,
    label: "リサーチ",
    icon: "Search",
    items: [
      {
        id: "cc-research-summarize",
        title: "長文・資料を要点に圧縮",
        summary: "貼り付けた情報を、判断に使える形へ要約。",
        tags: ["要約", "情報整理"],
        usage: "調べた情報を貼ると、要点・示唆・次アクションに整理される。",
        prompt: {
          language: "text",
          id: "cc-research-summarize-prompt",
          code: `以下の情報を、意思決定に使える形へ整理してください。

---
{ここに情報を貼り付け}
---

出力:
1. 要点（3〜5個の箇条書き）
2. ここから言える示唆
3. 私が次に取るべきアクション（1つだけ）
※事実と推測を分けて書くこと。`,
        },
        example: "記事や議事録を貼る → 要点・示唆・次の1アクションに整理される。",
      },
    ],
  },
  {
    id: "dev",
    bonusId: BID,
    label: "システム開発",
    icon: "Code2",
    items: [
      {
        id: "cc-tool-build",
        title: "業務を自動化する小さなツールを作る",
        summary: "やりたい処理を伝えるだけで動くコードを生成。",
        tags: ["自動化", "開発"],
        usage: "やりたいことと入出力を書くと、実行できるコードと使い方が返る。",
        prompt: {
          language: "text",
          id: "cc-tool-build-prompt",
          code: `次の作業を自動化する小さなツールを作ってください。

- やりたいこと: {処理内容}
- 入力: {入力データの形式}
- 出力: {欲しい結果}
- 実行環境: {ブラウザ / Node.js など}

要件:
- 動く完成コードを提示
- コピペで動かす手順を1,2,3で説明
- エラー時の対処も一言添える`,
        },
        example: "「CSVを読んで集計しグラフHTMLを出す」で実行 → 実行可能なコード＋手順。",
      },
    ],
  },
];
