"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function Hero() {
  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="relative flex flex-col items-center pt-20 pb-16 text-center sm:pt-28"
    >
      <motion.span
        variants={fadeUp}
        className="glass hairline mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-gold"
      >
        <Sparkles className="h-3.5 w-3.5" />
        面談突破者だけの限定ライブラリ
      </motion.span>

      <motion.h1
        variants={fadeUp}
        className="font-en text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-7xl md:text-8xl"
      >
        <span className="text-gradient-cool">AI副業2.0</span>
        <br />
        <span className="text-shimmer">Bonus Box</span>
      </motion.h1>

      <motion.p
        variants={fadeUp}
        className="mt-8 max-w-xl text-balance text-base leading-relaxed text-[color:var(--muted)] sm:text-lg"
      >
        PDFを配るのではなく、
        <span className="text-[color:var(--fg)]">学びながら・コピペしながら</span>
        その場で使える。
        <br className="hidden sm:block" />
        あなたのためだけの、実践型AIライブラリへようこそ。
      </motion.p>

      <motion.div
        variants={fadeUp}
        className="mt-10 flex items-center gap-6 text-xs text-[color:var(--muted)]"
      >
        <Stat label="特典" value="5" />
        <Divider />
        <Stat label="即使えるテンプレ" value="30+" />
        <Divider />
        <Stat label="カテゴリ" value="40+" />
      </motion.div>
    </motion.section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className="font-en text-2xl font-bold text-gold">{value}</span>
      <span className="tracking-wide">{label}</span>
    </div>
  );
}

function Divider() {
  return <span className="h-8 w-px bg-white/10" />;
}
