"use client";

import type { ReactNode } from "react";
import { StoreProvider } from "@/lib/store";
import { ToastProvider } from "@/components/common/Toast";
import { CommandPaletteProvider } from "@/lib/hooks/useCommandPalette";
import { CommandPalette } from "@/components/search/CommandPalette";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <StoreProvider>
      <CommandPaletteProvider>
        <ToastProvider>
          {children}
          <CommandPalette />
        </ToastProvider>
      </CommandPaletteProvider>
    </StoreProvider>
  );
}
