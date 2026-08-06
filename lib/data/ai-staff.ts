import type { OrgUnit } from "@/types";

// ② AI社員スターターキット — 会社組織図
// CEO を頂点に各部署がぶら下がる構造。parentId でツリーを表現。

export const AI_STAFF: OrgUnit[] = [
  {
    id: "ceo",
    title: "CEO（あなた＋AI）",
    role: "意思決定・方向づけ",
    icon: "Crown",
    accent: "gold",
    job: "会社全体の方針を決め、各AI部署に指示を出す司令塔。あなた自身が座る席で、AIは意思決定の壁打ち相手になる。",
    prompt: {
      language: "markdown",
      id: "ai-staff-ceo-prompt",
      code: `あなたは私の会社のCEO補佐（経営参謀）です。

# 私の事業
{事業内容}

# 今の課題
{課題}

# 依頼
1. この課題に対する意思決定の選択肢を3つ、メリット/デメリット付きで
2. あなたの推奨と理由
3. 決めた後に各部署（マーケ/営業/分析/ライター/デザイン）へ出す指示を1行ずつ`,
    },
    chatExample: [
      { role: "user", content: "新商品のローンチ、広告とSNSどちらに集中すべき？" },
      {
        role: "assistant",
        content:
          "現状はリスト資産が薄いため、まずSNSで信頼を貯めつつ広告は小さくテスト。理由は…（続けて各部署への指示を提示）",
      },
    ],
    operation:
      "毎朝この席で『今日の最重要タスクは？』と壁打ちし、決まった方針を各部署プロンプトへ落とす運用が基本。",
  },
  {
    id: "marketing",
    title: "マーケティング部",
    role: "認知・集客",
    parentId: "ceo",
    icon: "Megaphone",
    accent: "cyan",
    job: "発信の企画・投稿設計・キャンペーン立案を担当。認知を広げ見込み客を集める。",
    prompt: {
      language: "markdown",
      id: "ai-staff-marketing-prompt",
      code: `あなたは私の会社のマーケティング部長です。

- 商品: {商品}
- 今月の目標: {目標}

# 依頼
1. 今月の集客テーマを1つ決める
2. SNS/ブログ/メールの週次コンテンツ計画
3. 各施策のKPIと計測方法`,
    },
    chatExample: [
      { role: "user", content: "今月フォロワーを500人増やしたい" },
      {
        role: "assistant",
        content:
          "テーマは『初心者の最初の一歩』に統一。リール週3・保存訴求で…（週次計画とKPIを提示）",
      },
    ],
    operation: "週初にこの部署で計画を立て、ライター部・デザイン部へ制作依頼を回す。",
  },
  {
    id: "sales",
    title: "営業部",
    role: "販売・クロージング",
    parentId: "ceo",
    icon: "Handshake",
    accent: "gold",
    job: "問い合わせ対応・提案・クロージングのトーク設計を担当。売上に直結する会話を作る。",
    prompt: {
      language: "markdown",
      id: "ai-staff-sales-prompt",
      code: `あなたは私の会社のトップ営業です。

- 商品: {商品} / 価格: {価格}
- 見込み客の状況: {状況}

# 依頼
1. この見込み客への提案トークを作成
2. 想定される反論を3つと、その切り返し
3. 押し売りにならないクロージングの一言`,
    },
    chatExample: [
      { role: "user", content: "『高い』と言われたときの返し方は？" },
      {
        role: "assistant",
        content:
          "価格ではなく“得られる結果”に会話を戻します。例：『価格の前に、達成したいゴールを確認させてください』…",
      },
    ],
    operation: "商談前にこの席でロープレし、頻出反論の切り返しをストックしていく。",
  },
  {
    id: "analytics",
    title: "分析部",
    role: "数値分析・改善提案",
    parentId: "ceo",
    icon: "BarChart3",
    accent: "blue",
    job: "各施策の数値を読み、次の一手を提案。感覚ではなくデータで意思決定を支える。",
    prompt: {
      language: "markdown",
      id: "ai-staff-analytics-prompt",
      code: `あなたは私の会社のデータアナリストです。

# 今週の数値
{各種数値を貼り付け}

# 依頼
1. 数値から読み取れる事実を3つ（推測と事実を分ける）
2. 最も改善インパクトが大きい指標を1つ特定
3. 来週試すべき改善アクションを1つだけ提案`,
    },
    chatExample: [
      { role: "user", content: "リーチは伸びたのに保存が減った" },
      {
        role: "assistant",
        content:
          "新規リーチ層に内容が刺さっていない可能性。まず冒頭1枚目の訴求を…（1アクションに絞って提案）",
      },
    ],
    operation: "週末に数値を貼って診断させ、次週の1アクションだけ決めるのがコツ。",
  },
  {
    id: "writer",
    title: "ライター部",
    role: "文章制作",
    parentId: "ceo",
    icon: "PenTool",
    accent: "cyan",
    job: "投稿文・記事・メール・セールスコピーを執筆。マーケ部の企画を言葉にする。",
    prompt: {
      language: "markdown",
      id: "ai-staff-writer-prompt",
      code: `あなたは私の会社の専属ライターです。

- 媒体: {媒体}
- テーマ: {テーマ}
- トーン: {トーン}

# 依頼
指定媒体に最適な文章を作成してください。
最後に、改善のためのセルフレビューを3点添えてください。`,
    },
    chatExample: [
      { role: "user", content: "メルマガの件名を10個ほしい" },
      {
        role: "assistant",
        content: "開封率を意識した件名を10案。うち3案は数字入り、2案は疑問形で…",
      },
    ],
    operation: "マーケ部の週次計画を渡し、まとめて下書きを生成→人が仕上げる分業が効率的。",
  },
  {
    id: "design",
    title: "デザイン部",
    role: "ビジュアル設計",
    parentId: "ceo",
    icon: "Palette",
    accent: "gold",
    job: "投稿画像・バナー・スライドの構成とビジュアル指示を担当。生成AIへの指示文も作る。",
    prompt: {
      language: "markdown",
      id: "ai-staff-design-prompt",
      code: `あなたは私の会社のアートディレクターです。

- 用途: {投稿画像/バナー等}
- 伝えたいこと: {メッセージ}
- ブランドカラー: {色}

# 依頼
1. レイアウト構成（要素の配置）
2. 配色とフォントの方向性
3. 画像生成AIに渡すプロンプト（英語）`,
    },
    chatExample: [
      { role: "user", content: "セール告知バナーの構成を" },
      {
        role: "assistant",
        content:
          "上部にキャッチ、中央に商品、右下にCTA。配色はブランドの…（生成AI用プロンプトも提示）",
      },
    ],
    operation: "構成を先に固め、生成AIプロンプトを受け取ってから画像生成に進むと手戻りが減る。",
  },
];

export function getOrgChildren(parentId?: string): OrgUnit[] {
  return AI_STAFF.filter((u) => u.parentId === parentId);
}

export function getOrgUnit(id: string): OrgUnit | undefined {
  return AI_STAFF.find((u) => u.id === id);
}
