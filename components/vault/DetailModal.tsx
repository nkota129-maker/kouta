"use client";

import { useEffect, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { overlayVariants, modalVariants } from "@/lib/motion";
import { Icon } from "@/components/common/Icon";
import { FavoriteButton } from "@/components/common/FavoriteButton";

interface DetailModalProps {
  open: boolean;
  onClose: () => void;
  icon: string;
  title: string;
  subtitle?: string;
  favKey?: string;
  children: ReactNode;
}

export function DetailModal({
  open,
  onClose,
  icon,
  title,
  subtitle,
  favKey,
  children,
}: DetailModalProps) {
  // Escで閉じる & スクロールロック
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6"
          variants={overlayVariants}
          initial="hidden"
          animate="show"
          exit="exit"
        >
          <div
            className="absolute inset-0 bg-black/65 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className="glass hairline relative flex max-h-[88vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl shadow-glass sm:rounded-3xl"
          >
            {/* ヘッダー */}
            <div className="flex items-start gap-4 border-b border-white/8 px-5 py-4 sm:px-6">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-gold/25 bg-gold/10 text-gold">
                <Icon name={icon} className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="text-lg font-bold leading-snug">{title}</h2>
                {subtitle && (
                  <p className="mt-0.5 text-sm text-[color:var(--muted)]">
                    {subtitle}
                  </p>
                )}
              </div>
              <div className="flex shrink-0 items-center gap-2">
                {favKey && <FavoriteButton favKey={favKey} />}
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="閉じる"
                  className="flex h-9 w-9 items-center justify-center rounded-full text-[color:var(--muted)] transition-colors hover:bg-white/5 hover:text-[color:var(--fg)]"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* 本文 */}
            <div className="no-scrollbar overflow-y-auto px-5 py-6 sm:px-6">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
