"use client";

import { ReactNode } from "react";
import { QueryProvider } from "./query-provider";

/**
 * Root providers component that wraps the entire application
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      {children}
    </QueryProvider>
  );
}
