"use client";

import { PropsWithChildren } from "react";
import { Header } from "@/widgets/header";
import { BottomNav } from "@/widgets/bottom-nav";
import { cn } from "@/shared/lib/utils";

interface MainLayoutProps extends PropsWithChildren {
  showHeader?: boolean;
  showBottomNav?: boolean;
  className?: string;
}

export function MainLayout({
  children,
  showHeader = true,
  showBottomNav = true,
  className,
}: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {showHeader && <Header />}

      <main className={cn("flex-1", className)}>{children}</main>

      {showBottomNav && <BottomNav />}
    </div>
  );
}
