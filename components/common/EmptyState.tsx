import { Icon } from "./Icon";

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export function EmptyState({
  icon = "Inbox",
  title,
  description,
  children,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-white/10 px-6 py-16 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/5 text-[color:var(--muted)]">
        <Icon name={icon} className="h-6 w-6" />
      </span>
      <p className="text-base font-semibold">{title}</p>
      {description && (
        <p className="max-w-sm text-sm text-[color:var(--muted)]">
          {description}
        </p>
      )}
      {children}
    </div>
  );
}
