"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  hairline?: boolean;
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, hairline = true, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "glass relative overflow-hidden rounded-2xl shadow-glass",
          hairline && "hairline",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

GlassCard.displayName = "GlassCard";
