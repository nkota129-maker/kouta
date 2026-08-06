import { cn } from "@/lib/utils";
import { Icon } from "./Icon";

interface SectionTitleProps {
  icon?: string;
  children: React.ReactNode;
  className?: string;
}

/** 詳細コンテンツ内の小見出し */
export function SectionTitle({ icon, children, className }: SectionTitleProps) {
  return (
    <h3
      className={cn(
        "flex items-center gap-2 text-sm font-bold tracking-wide text-gold",
        className,
      )}
    >
      {icon && <Icon name={icon} className="h-4 w-4" />}
      {children}
    </h3>
  );
}
