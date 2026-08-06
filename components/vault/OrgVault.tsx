"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import type { Bonus, OrgUnit, ContentItem } from "@/types";
import { AI_STAFF, getOrgChildren } from "@/lib/data";
import { accentClasses, cn, makeKey } from "@/lib/utils";
import { useStore } from "@/lib/store";
import { Icon } from "@/components/common/Icon";
import { DetailModal } from "./DetailModal";
import { ContentSections } from "./ContentSections";
import { staggerContainer, fadeUp } from "@/lib/motion";

function unitToItem(unit: OrgUnit): ContentItem {
  return {
    id: unit.id,
    title: unit.title,
    summary: unit.role,
    role: unit.job,
    usage: unit.operation,
    prompt: unit.prompt,
    chatExample: unit.chatExample,
  };
}

export function OrgVault({ bonus }: { bonus: Bonus }) {
  const searchParams = useSearchParams();
  const { pushHistory } = useStore();
  const [open, setOpen] = useState<OrgUnit | null>(null);

  const ceo = AI_STAFF.find((u) => !u.parentId);
  const departments = getOrgChildren(ceo?.id);

  useEffect(() => {
    const id = searchParams.get("item");
    if (!id) return;
    const unit = AI_STAFF.find((u) => u.id === id);
    if (unit) openDetail(unit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function openDetail(unit: OrgUnit) {
    setOpen(unit);
    pushHistory({
      key: makeKey(bonus.id, unit.id),
      bonusId: bonus.id,
      itemId: unit.id,
      title: unit.title,
    });
    window.history.replaceState(null, "", `/vault/${bonus.id}?item=${unit.id}`);
  }
  function close() {
    setOpen(null);
    window.history.replaceState(null, "", `/vault/${bonus.id}`);
  }

  return (
    <div className="pb-8">
      <p className="mb-8 max-w-2xl text-sm leading-relaxed text-[color:var(--muted)]">
        AIを“社員”として雇い、部署ごとに役割を持たせて事業を回します。各部署をタップすると、仕事内容・プロンプト・運用方法が開きます。
      </p>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="flex flex-col items-center"
      >
        {/* CEO */}
        {ceo && (
          <motion.div variants={fadeUp} className="w-full max-w-xs">
            <OrgNode unit={ceo} onClick={() => openDetail(ceo)} big />
          </motion.div>
        )}

        {/* コネクタ */}
        <div className="my-2 h-8 w-px bg-gradient-to-b from-gold/50 to-white/10" />

        {/* 部署グリッド */}
        <motion.div
          variants={staggerContainer}
          className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5"
        >
          {departments.map((dept) => (
            <motion.div key={dept.id} variants={fadeUp}>
              <OrgNode unit={dept} onClick={() => openDetail(dept)} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <DetailModal
        open={!!open}
        onClose={close}
        icon={open?.icon ?? bonus.icon}
        title={open?.title ?? ""}
        subtitle={open?.role}
        favKey={open ? makeKey(bonus.id, open.id) : undefined}
      >
        {open && <ContentSections item={unitToItem(open)} />}
      </DetailModal>
    </div>
  );
}

function OrgNode({
  unit,
  onClick,
  big = false,
}: {
  unit: OrgUnit;
  onClick: () => void;
  big?: boolean;
}) {
  const accent = accentClasses[unit.accent];
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -4 }}
      className={cn(
        "glass hairline group flex w-full flex-col items-center gap-2 rounded-2xl p-4 text-center shadow-glass transition-shadow",
        accent.ring,
        big && "py-6",
      )}
    >
      <span
        className={cn(
          "flex items-center justify-center rounded-2xl border",
          accent.border,
          accent.bgSoft,
          accent.text,
          big ? "h-14 w-14" : "h-11 w-11",
        )}
      >
        <Icon name={unit.icon} className={big ? "h-6 w-6" : "h-5 w-5"} />
      </span>
      <span className={cn("font-bold leading-tight", big ? "text-base" : "text-sm")}>
        {unit.title}
      </span>
      <span className="text-[11px] text-[color:var(--muted)]">{unit.role}</span>
    </motion.button>
  );
}
