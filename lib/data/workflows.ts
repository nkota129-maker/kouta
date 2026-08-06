import type { Category } from "@/types";

const BID = "workflows";

// ⑤ AIワークフロー100選 — カテゴリ別カード。各アイテムに flow(フロー図)/tools(使用AI)/input(入力例)/example(完成例)。
// 初期は各カテゴリ1〜2件。同じ形で追加していけば100件まで拡張可能。

export const WORKFLOWS: Category[] = [
  {
    id: "sns",
    bonusId: BID,
    label: "SNS",
    icon: "Hash",
    items: [
      {
        id: "wf-sns-repurpose",
        title: "1本の動画を全SNSへ展開",
        summary: "1ソースをX・IG・ショートへ自動リサイクル。",
        tags: ["リサイクル", "多媒体"],
        tools: ["Claude", "文字起こしAI", "予約投稿ツール"],
        input: "元動画のテーマ or 文字起こしテキスト",
        example: "1本のセミナー動画から、Xスレッド1本・リール台本2本・画像投稿3枚が完成。",
        flow: [
          { id: "s1", label: "動画を文字起こし", icon: "FileText" },
          { id: "s2", label: "AIで要点抽出", icon: "Sparkles" },
          { id: "s3", label: "媒体別に整形", icon: "LayoutGrid" },
          { id: "s4", label: "予約投稿にセット", icon: "Send" },
        ],
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
        id: "wf-sales-followup",
        title: "商談後フォローの自動下書き",
        summary: "商談メモから、お礼＋次アクションのメールを生成。",
        tags: ["フォローアップ", "CRM"],
        tools: ["Claude", "メール配信ツール"],
        input: "商談メモ（箇条書きでOK）",
        example: "商談メモを貼るだけで、お礼・要点整理・次回提案を含むメール下書きが完成。",
        flow: [
          { id: "s1", label: "商談メモを入力", icon: "PenTool" },
          { id: "s2", label: "AIが要点と温度感を判定", icon: "Sparkles" },
          { id: "s3", label: "フォロー文を生成", icon: "Mail" },
          { id: "s4", label: "送信 / CRM記録", icon: "Send" },
        ],
      },
    ],
  },
  {
    id: "marketing",
    bonusId: BID,
    label: "マーケティング",
    icon: "Megaphone",
    items: [
      {
        id: "wf-mk-funnel",
        title: "無料プレゼント→リスト獲得の設計",
        summary: "リードマグネットから教育メールまで一気通貫。",
        tags: ["ファネル", "リスト構築"],
        tools: ["Claude", "LP", "メール配信ツール"],
        input: "商品テーマとターゲット",
        example: "無料PDFの企画→LP文言→登録後の教育メール5通までが揃う。",
        flow: [
          { id: "s1", label: "無料特典を企画", icon: "Package" },
          { id: "s2", label: "登録LPを作成", icon: "Layout" },
          { id: "s3", label: "教育メールを設計", icon: "Mail" },
          { id: "s4", label: "商品案内へ接続", icon: "ShoppingBag" },
        ],
      },
    ],
  },
  {
    id: "writing",
    bonusId: BID,
    label: "ライティング",
    icon: "PenLine",
    items: [
      {
        id: "wf-write-blog",
        title: "検索意図から記事を組み立てる",
        summary: "キーワードの裏にある悩みから逆算して執筆。",
        tags: ["SEO", "記事"],
        tools: ["Claude", "検索意図分析"],
        input: "狙うキーワード",
        example: "キーワード1つから、検索意図→見出し構成→本文ドラフトまで完成。",
        flow: [
          { id: "s1", label: "検索意図を分析", icon: "Search" },
          { id: "s2", label: "見出し構成を作成", icon: "ListTree" },
          { id: "s3", label: "本文を執筆", icon: "PenTool" },
          { id: "s4", label: "推敲・要約追加", icon: "Sparkles" },
        ],
      },
    ],
  },
  {
    id: "video",
    bonusId: BID,
    label: "動画",
    icon: "Video",
    items: [
      {
        id: "wf-video-script",
        title: "企画から台本・テロップまで",
        summary: "テーマ入力で撮影に必要な素材を一式生成。",
        tags: ["台本", "テロップ"],
        tools: ["Claude", "動画編集ツール"],
        input: "動画のテーマと尺",
        example: "テーマ入力で、構成・セリフ台本・テロップ案・サムネ文言まで一式が揃う。",
        flow: [
          { id: "s1", label: "企画・構成", icon: "Lightbulb" },
          { id: "s2", label: "台本生成", icon: "FileEdit" },
          { id: "s3", label: "テロップ案", icon: "Type" },
          { id: "s4", label: "サムネ文言", icon: "Image" },
        ],
      },
    ],
  },
  {
    id: "image",
    bonusId: BID,
    label: "画像",
    icon: "Image",
    items: [
      {
        id: "wf-image-brand",
        title: "ブランドに沿った画像を量産",
        summary: "トーンを固定して統一感のあるビジュアルを連発。",
        tags: ["ブランディング", "画像生成"],
        tools: ["Claude", "画像生成AI"],
        input: "ブランドの世界観・カラー",
        example: "世界観を1度定義すれば、投稿ごとに統一感のある画像プロンプトが量産できる。",
        flow: [
          { id: "s1", label: "世界観を言語化", icon: "Palette" },
          { id: "s2", label: "基準プロンプト作成", icon: "Sparkles" },
          { id: "s3", label: "用途別に派生", icon: "Copy" },
          { id: "s4", label: "生成・選定", icon: "Image" },
        ],
      },
    ],
  },
  {
    id: "analytics",
    bonusId: BID,
    label: "分析",
    icon: "BarChart3",
    items: [
      {
        id: "wf-analytics-weekly",
        title: "週次の数値を自動で読み解く",
        summary: "数字を貼るだけで示唆と次アクションに変換。",
        tags: ["分析", "改善"],
        tools: ["Claude", "スプレッドシート"],
        input: "週次の主要数値",
        example: "数値を貼ると、事実→示唆→来週の1アクションが自動でまとまる。",
        flow: [
          { id: "s1", label: "数値を集約", icon: "Table" },
          { id: "s2", label: "AIが傾向を分析", icon: "Sparkles" },
          { id: "s3", label: "示唆を抽出", icon: "Lightbulb" },
          { id: "s4", label: "改善案を決定", icon: "TrendingUp" },
        ],
      },
    ],
  },
  {
    id: "docs",
    bonusId: BID,
    label: "資料",
    icon: "Presentation",
    items: [
      {
        id: "wf-docs-proposal",
        title: "ヒアリングから提案書を作る",
        summary: "メモを渡すだけで提案書の骨子が完成。",
        tags: ["提案書", "資料"],
        tools: ["Claude", "スライドツール"],
        input: "ヒアリングメモ",
        example: "ヒアリングメモから、課題整理→解決策→見積もり構成の提案書骨子が完成。",
        flow: [
          { id: "s1", label: "メモを整理", icon: "PenTool" },
          { id: "s2", label: "課題を構造化", icon: "ListTree" },
          { id: "s3", label: "解決策を提示", icon: "Lightbulb" },
          { id: "s4", label: "スライド構成へ", icon: "Presentation" },
        ],
      },
    ],
  },
  {
    id: "dev",
    bonusId: BID,
    label: "開発",
    icon: "Code2",
    items: [
      {
        id: "wf-dev-automation",
        title: "定型作業を自動化するツール化",
        summary: "繰り返す手作業をコードで置き換える。",
        tags: ["自動化", "効率化"],
        tools: ["Claude Code", "Node.js"],
        input: "自動化したい手作業の説明",
        example: "毎回手でやっている集計作業を、実行可能なスクリプトへ置き換える。",
        flow: [
          { id: "s1", label: "手作業を分解", icon: "ListTree" },
          { id: "s2", label: "処理を設計", icon: "Sparkles" },
          { id: "s3", label: "コード生成", icon: "Code2" },
          { id: "s4", label: "実行・改善", icon: "TerminalSquare" },
        ],
      },
    ],
  },
  {
    id: "ai-agent",
    bonusId: BID,
    label: "AIエージェント",
    icon: "Bot",
    items: [
      {
        id: "wf-agent-team",
        title: "複数AIを連携させて業務を回す",
        summary: "役割分担したAI同士でタスクを引き継ぐ。",
        tags: ["エージェント", "連携"],
        tools: ["Claude", "複数プロンプト", "自動化ツール"],
        input: "回したい業務フロー",
        example: "リサーチAI→企画AI→執筆AIと出力を渡し、1つの成果物へ仕上げる。",
        flow: [
          { id: "s1", label: "リサーチAI", icon: "Search" },
          { id: "s2", label: "企画AI", icon: "Lightbulb" },
          { id: "s3", label: "執筆AI", icon: "PenTool" },
          { id: "s4", label: "レビューAI", icon: "CheckCircle2" },
        ],
      },
    ],
  },
];
