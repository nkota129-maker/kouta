"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronDown, Plus } from "lucide-react";
import type { Bonus, FlowStep } from "@/types";
import { REVENUE_FLOW } from "@/lib/data";
import { cn, makeKey } from "@/lib/utils";
import { useStore } from "@/lib/store";
import { Icon } from "@/components/common/Icon";
import { DetailModal } from "./DetailModal";
import { ContentSections } from "./ContentSections";
import { staggerContainer, fadeUp } from "@/lib/motion";

export function FlowVault({ bonus }: { bonus: Bonus }) {
  const searchParams = useSearchParams();
  const { pushHistory } = useStore();
  const [open, setOpen] = useState<FlowStep | null>(null);

  useEffect(() => {
    const id = searchParams.get("item");
    if (!id) return;
    const step = REVENUE_FLOW.find((s) => s.id === id);
    if (step) openDetail(step);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function openDetail(step: FlowStep) {
    setOpen(step);
    pushHistory({
      key: makeKey(bonus.id, step.id),
      bonusId: bonus.id,
      itemId: step.id,
      title: step.detail?.title ?? step.label,
    });
    window.history.replaceState(null, "", `/vault/${bonus.id}?item=${step.id}`);
  }
  function close() {
    setOpen(null);
    window.history.replaceState(null, "", `/vault/${bonus.id}`);
  }

  const last = REVENUE_FLOW.length - 1;

  return (
    <div className="pb-8">
      <p className="mb-8 max-w-2xl text-sm leading-relaxed text-[color:var(--muted)]">
        AIが起点となり、収益が生まれるまでの流れです。各ステップをタップすると、ツール・考え方・注意点・実践例が展開します。
      </p>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="mx-auto flex max-w-lg flex-col items-center"
      >
        {REVENUE_FLOW.map((step, i) => {
          const isGoal = i === last;
          return (
            <motion.div
              key={step.id}
              variants={fadeUp}
              className="flex w-full flex-col items-center"
            >
              <button
                onClick={() => openDetail(step)}
                className={cn(
                  "glass hairline group relative flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-left shadow-glass transition-shadow",
                  isGoal ? "hover:shadow-glow-gold" : "hover:shadow-glow-cyan",
                )}
              >
                {isGoal && (
                  <span className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-gold/10 to-transparent" />
                )}
                <span
                  className={cn(
                    "relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border",
                    isGoal
                      ? "border-gold/30 bg-gold/15 text-gold"
                      : "border-neon-cyan/25 bg-neon-cyan/10 text-neon-cyan",
                  )}
                >
                  <Icon name={step.icon ?? "Circle"} className="h-5 w-5" />
                </span>
                <div className="relative min-w-0 flex-1">
                  <span className="font-en text-[10px] font-semibold tracking-wider text-[color:var(--muted)]">
                    STEP {String(i + 1).padStart(2, "0")}
                  </span>
                  <p
                    className={cn(
                      "text-base font-bold leading-tight",
                      isGoal && "text-gold",
                    )}
                  >
                    {step.label}
                  </p>
                  {step.detail?.summary && (
                    <p className="mt-0.5 truncate text-xs text-[color:var(--muted)]">
                      {step.detail.summary}
                    </p>
                  )}
                </div>
                <span className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/5 text-[color:var(--muted)] transition-colors group-hover:bg-white/10 group-hover:text-[color:var(--fg)]">
                  <Plus className="h-4 w-4" />
                </span>
              </button>

              {i < last && (
                <div className="flex h-9 items-center">
                  <ChevronDown className="h-5 w-5 text-neon-cyan/60" />
                </div>
              )}
            </motion.div>
          );
        })}
      </motion.div>

      <DetailModal
        open={!!open}
        onClose={close}
        icon={open?.icon ?? bonus.icon}
        title={open?.detail?.title ?? open?.label ?? ""}
        subtitle={open?.detail?.summary}
        favKey={open ? makeKey(bonus.id, open.id) : undefined}
      >
        {open?.detail && <ContentSections item={open.detail} />}
      </DetailModal>
    </div>
  );
}
