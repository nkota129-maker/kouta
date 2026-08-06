import type { Bonus } from "@/types";

export const BONUSES: Bonus[] = [
  {
    id: "agent-encyclopedia",
    no: 1,
    title: "AIエージェントテンプレート大全",
    subtitle: "職種別・完成済みプロンプト集",
    description:
      "Instagram運用からコピーライティングまで。役割・使い方・実例・応用まで揃った、そのまま使えるAIエージェントの設計書。",
    icon: "Bot",
    accent: "gold",
    layout: "category",
    tagline: "AGENT ENCYCLOPEDIA",
  },
  {
    id: "ai-staff",
    no: 2,
    title: "AI社員スターターキット",
    subtitle: "AIだけで動く仮想組織を構築",
    description:
      "CEOから各部署まで。AIを“社員”として雇い、マーケ・営業・分析・制作を回す組織運用のテンプレート。",
    icon: "Building2",
    accent: "cyan",
    layout: "org",
    tagline: "AI STAFF STARTER KIT",
  },
  {
    id: "revenue-system",
    no: 3,
    title: "AI自動収益システム設計図",
    subtitle: "収益が生まれる流れを可視化",
    description:
      "AI制作 → 自動投稿 → 流入 → 販売 → 収益。各工程のツール・考え方・注意点・実践例をフローで学ぶ。",
    icon: "Workflow",
    accent: "blue",
    layout: "flow",
    tagline: "AUTO REVENUE BLUEPRINT",
  },
  {
    id: "claude-code",
    no: 4,
    title: "Claude Code完全実践テンプレ",
    subtitle: "コピペで動く開発プロンプト",
    description:
      "LP・画像生成・資料作成・システム開発まで。Claude Codeで即実行できる完成済みプロンプトとコードブロック集。",
    icon: "TerminalSquare",
    accent: "gold",
    layout: "category",
    tagline: "CLAUDE CODE PLAYBOOK",
  },
  {
    id: "workflows",
    no: 5,
    title: "AIワークフロー100選",
    subtitle: "分野別の実践フロー集",
    description:
      "SNS・営業・マーケ・動画・分析・開発まで。使用AI・入力例・完成例まで揃った実践ワークフローのライブラリ。",
    icon: "LayoutGrid",
    accent: "cyan",
    layout: "category",
    tagline: "100 AI WORKFLOWS",
  },
];

export const BONUS_MAP: Record<string, Bonus> = Object.fromEntries(
  BONUSES.map((b) => [b.id, b]),
);

export function getBonus(id: string): Bonus | undefined {
  return BONUS_MAP[id];
}
