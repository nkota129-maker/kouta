"use client";

import { icons, type LucideProps } from "lucide-react";

interface IconProps extends LucideProps {
  name: string;
}

/** 文字列名から Lucide アイコンを描画。未知の名前は Sparkles にフォールバック。 */
export function Icon({ name, ...props }: IconProps) {
  const Cmp = (icons as Record<string, React.ComponentType<LucideProps>>)[name] ??
    icons.Sparkles;
  return <Cmp {...props} />;
}
