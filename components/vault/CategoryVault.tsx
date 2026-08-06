"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import type { Bonus, Category, ContentItem } from "@/types";
import { makeKey } from "@/lib/utils";
import { useStore } from "@/lib/store";
import { Icon } from "@/components/common/Icon";
import { Tag } from "@/components/common/Tag";
import { FavoriteButton } from "@/components/common/FavoriteButton";
import { DetailModal } from "./DetailModal";
import { ContentSections } from "./ContentSections";
import { CategoryNav } from "./CategoryNav";
import { staggerContainer, fadeUp } from "@/lib/motion";
import { ArrowUpRight } from "lucide-react";

interface Props {
  bonus: Bonus;
  categories: Category[];
}

export function CategoryVault({ bonus, categories }: Props) {
  const searchParams = useSearchParams();
  const { pushHistory } = useStore();

  const [activeCat, setActiveCat] = useState(categories[0]?.id ?? "");
  const [openItem, setOpenItem] = useState<ContentItem | null>(null);

  const current = useMemo(
    () => categories.find((c) => c.id === activeCat) ?? categories[0],
    [categories, activeCat],
  );

  // ディープリンク（?item=xxx）で初期オープン
  useEffect(() => {
    const itemId = searchParams.get("item");
    if (!itemId) return;
    for (const c of categories) {
      const found = c.items.find((i) => i.id === itemId);
      if (found) {
        setActiveCat(c.id);
        openDetail(found);
        break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function openDetail(item: ContentItem) {
    setOpenItem(item);
    pushHistory({
      key: makeKey(bonus.id, item.id),
      bonusId: bonus.id,
      itemId: item.id,
      title: item.title,
    });
    window.history.replaceState(null, "", `/vault/${bonus.id}?item=${item.id}`);
  }

  function closeDetail() {
    setOpenItem(null);
    window.history.replaceState(null, "", `/vault/${bonus.id}`);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
      {/* 左：カテゴリ */}
      <CategoryNav
        categories={categories}
        activeId={activeCat}
        onSelect={setActiveCat}
      />

      {/* 右：アイテム一覧 */}
      <div className="min-w-0">
        <div className="mb-4 flex items-center gap-2">
          <Icon name={current?.icon ?? "Folder"} className="h-5 w-5 text-gold" />
          <h2 className="text-lg font-bold">{current?.label}</h2>
          <span className="text-sm text-[color:var(--muted)]">
            {current?.items.length}件
          </span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current?.id}
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0 }}
            className="grid gap-4 sm:grid-cols-2"
          >
            {current?.items.map((item) => (
              <motion.button
                key={item.id}
                variants={fadeUp}
                onClick={() => openDetail(item)}
                whileHover={{ y: -4 }}
                className="glass hairline group relative flex flex-col rounded-2xl p-5 text-left shadow-glass transition-shadow hover:shadow-glow-gold"
              >
                <div className="mb-3 flex items-start justify-between gap-2">
                  <h3 className="font-bold leading-snug">{item.title}</h3>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-[color:var(--muted)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                {item.summary && (
                  <p className="mb-3 flex-1 text-sm leading-relaxed text-[color:var(--muted)]">
                    {item.summary}
                  </p>
                )}
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags?.slice(0, 2).map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                  <FavoriteButton favKey={makeKey(bonus.id, item.id)} />
                </div>
              </motion.button>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 詳細モーダル */}
      <DetailModal
        open={!!openItem}
        onClose={closeDetail}
        icon={current?.icon ?? bonus.icon}
        title={openItem?.title ?? ""}
        subtitle={openItem?.summary}
        favKey={openItem ? makeKey(bonus.id, openItem.id) : undefined}
      >
        {openItem && <ContentSections item={openItem} />}
      </DetailModal>
    </div>
  );
}
