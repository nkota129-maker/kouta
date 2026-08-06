import type { Category, SearchRecord, ContentItem } from "@/types";
import { BONUSES, getBonus } from "./bonuses";
import { AGENT_ENCYCLOPEDIA } from "./agent-encyclopedia";
import { CLAUDE_CODE } from "./claude-code";
import { WORKFLOWS } from "./workflows";
import { AI_STAFF } from "./ai-staff";
import { REVENUE_FLOW } from "./revenue-system";
import { makeKey } from "@/lib/utils";

export { BONUSES, getBonus, BONUS_MAP } from "./bonuses";
export { AGENT_ENCYCLOPEDIA } from "./agent-encyclopedia";
export { CLAUDE_CODE } from "./claude-code";
export { WORKFLOWS } from "./workflows";
export { AI_STAFF, getOrgChildren, getOrgUnit } from "./ai-staff";
export { REVENUE_FLOW, getFlowStep } from "./revenue-system";

/** category レイアウトの特典 → カテゴリ配列 */
export const CATEGORY_DATA: Record<string, Category[]> = {
  "agent-encyclopedia": AGENT_ENCYCLOPEDIA,
  "claude-code": CLAUDE_CODE,
  workflows: WORKFLOWS,
};

export function getCategories(bonusId: string): Category[] {
  return CATEGORY_DATA[bonusId] ?? [];
}

/** 特典内の全 ContentItem をフラットに取得（category系のみ） */
export function getItems(bonusId: string): ContentItem[] {
  return getCategories(bonusId).flatMap((c) => c.items);
}

export function findItem(
  bonusId: string,
  itemId: string,
): { item: ContentItem; categoryLabel: string } | undefined {
  for (const c of getCategories(bonusId)) {
    const item = c.items.find((i) => i.id === itemId);
    if (item) return { item, categoryLabel: c.label };
  }
  return undefined;
}

/** 検索テキストを1本に結合 */
function itemToBody(item: ContentItem): string {
  return [
    item.title,
    item.summary,
    item.role,
    item.usage,
    item.example,
    item.application,
    item.cautions,
    item.input,
    item.prompt?.code,
    (item.tags ?? []).join(" "),
    (item.tools ?? []).join(" "),
  ]
    .filter(Boolean)
    .join("\n");
}

/** 全特典を横断した検索インデックスを構築 */
export function buildSearchIndex(): SearchRecord[] {
  const records: SearchRecord[] = [];

  // category系（①④⑤）
  for (const [bonusId, categories] of Object.entries(CATEGORY_DATA)) {
    const bonus = getBonus(bonusId);
    if (!bonus) continue;
    for (const cat of categories) {
      for (const item of cat.items) {
        records.push({
          key: makeKey(bonusId, item.id),
          bonusId: bonus.id,
          bonusTitle: bonus.title,
          categoryLabel: cat.label,
          itemId: item.id,
          title: item.title,
          summary: item.summary,
          tags: item.tags,
          body: itemToBody(item),
        });
      }
    }
  }

  // ② AI社員（組織図）
  const staffBonus = getBonus("ai-staff");
  if (staffBonus) {
    for (const unit of AI_STAFF) {
      records.push({
        key: makeKey("ai-staff", unit.id),
        bonusId: "ai-staff",
        bonusTitle: staffBonus.title,
        categoryLabel: unit.title,
        itemId: unit.id,
        title: `${unit.title}｜${unit.role}`,
        summary: unit.job,
        body: [unit.title, unit.role, unit.job, unit.operation, unit.prompt?.code]
          .filter(Boolean)
          .join("\n"),
      });
    }
  }

  // ③ 収益フロー
  const revBonus = getBonus("revenue-system");
  if (revBonus) {
    for (const step of REVENUE_FLOW) {
      const d = step.detail;
      records.push({
        key: makeKey("revenue-system", step.id),
        bonusId: "revenue-system",
        bonusTitle: revBonus.title,
        categoryLabel: step.label,
        itemId: step.id,
        title: d?.title ?? step.label,
        summary: d?.summary,
        body: d ? itemToBody(d) : step.label,
      });
    }
  }

  return records;
}

export const SEARCH_INDEX: SearchRecord[] = buildSearchIndex();

export const RECORD_MAP: Record<string, SearchRecord> = Object.fromEntries(
  SEARCH_INDEX.map((r) => [r.key, r]),
);

export function getRecord(key: string): SearchRecord | undefined {
  return RECORD_MAP[key];
}

/** BonusId 全体の総アイテム数（トップの表示などに使用） */
export function totalItemCount(): number {
  return SEARCH_INDEX.length;
}
