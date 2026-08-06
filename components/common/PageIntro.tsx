import { Icon } from "./Icon";

export function PageIntro({
  icon,
  title,
  description,
  action,
}: {
  icon: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-end justify-between gap-4 pt-8 pb-6">
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-gold/25 bg-gold/10 text-gold">
          <Icon name={icon} className="h-5 w-5" />
        </span>
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          {description && (
            <p className="mt-0.5 text-sm text-[color:var(--muted)]">
              {description}
            </p>
          )}
        </div>
      </div>
      {action}
    </div>
  );
}
