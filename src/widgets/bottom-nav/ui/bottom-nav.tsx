"use client";

import Link from "next/link";
import { Home, MapPin, MessageCircle, User, FileText } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { usePathname } from "next/navigation";

export function BottomNav() {
  const pathname = usePathname();

  const items = [
    { href: "/", label: "홈", icon: Home },
    { href: "/map", label: "지도", icon: MapPin },
    { href: "/community", label: "커뮤니티", icon: FileText },
    { href: "/chat", label: "채팅", icon: MessageCircle },
    { href: "/my", label: "마이", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/40 bg-background/80 backdrop-blur-xl pb-[env(safe-area-inset-bottom)] shadow-[0_-5px_15px_rgba(0,0,0,0.02)]">
      <div className="flex h-16 items-center justify-around">
        {items.map((item) => {
          const isActive = pathname?.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 w-full h-full text-muted-foreground transition-colors hover:text-foreground",
                isActive && "text-foreground font-medium"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
