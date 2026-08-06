import Fuse from "fuse.js";
import type { SearchRecord } from "@/types";
import { SEARCH_INDEX } from "@/lib/data";

let fuse: Fuse<SearchRecord> | null = null;

function getFuse(): Fuse<SearchRecord> {
  if (!fuse) {
    fuse = new Fuse(SEARCH_INDEX, {
      keys: [
        { name: "title", weight: 0.4 },
        { name: "summary", weight: 0.2 },
        { name: "tags", weight: 0.2 },
        { name: "categoryLabel", weight: 0.1 },
        { name: "body", weight: 0.1 },
      ],
      threshold: 0.38,
      ignoreLocation: true,
      minMatchCharLength: 2,
    });
  }
  return fuse;
}

export function searchAll(query: string, limit = 12): SearchRecord[] {
  const q = query.trim();
  if (!q) return [];
  return getFuse()
    .search(q, { limit })
    .map((r) => r.item);
}

export function filterByCategory(categoryLabel: string): SearchRecord[] {
  return SEARCH_INDEX.filter((r) => r.categoryLabel === categoryLabel);
}
