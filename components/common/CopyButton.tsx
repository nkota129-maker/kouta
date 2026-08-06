"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useStore } from "@/lib/store";
import { useToast } from "@/components/common/Toast";

interface CopyButtonProps {
  value: string;
  /** コピー数計測キー（通常は snippet.id） */
  copyId?: string;
  label?: string;
  className?: string;
}

export function CopyButton({
  value,
  copyId,
  label = "コピー",
  className,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const { incrementCopy, copyCounts } = useStore();
  const { toast } = useToast();

  const count = copyId ? copyCounts[copyId] ?? 0 : 0;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      if (copyId) incrementCopy(copyId);
      toast("コピーしました");
      setTimeout(() => setCopied(false), 1600);
    } catch {
      toast("コピーできませんでした");
    }
  }

  return (
    <motion.button
      type="button"
      onClick={handleCopy}
      whileTap={{ scale: 0.96 }}
      className={cn(
        "group inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1.5 text-xs font-semibold text-gold transition-colors hover:bg-gold/20",
        className,
      )}
    >
      {copied ? (
        <Check className="h-3.5 w-3.5" />
      ) : (
        <Copy className="h-3.5 w-3.5" />
      )}
      <span>{copied ? "コピー済み" : label}</span>
      {copyId && count > 0 && (
        <span className="ml-0.5 rounded-full bg-white/10 px-1.5 py-0.5 text-[10px] tabular-nums text-[color:var(--muted)]">
          {count}
        </span>
      )}
    </motion.button>
  );
}
