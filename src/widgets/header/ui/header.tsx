"use client";

import { Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui";

export function Header() {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#F5F5F7]/80 backdrop-blur-xl supports-[backdrop-filter]:bg-[#F5F5F7]/60">
      <div className="flex items-center">
        {/* Logo text - San Francisco style bold */}
        <span className="text-xl font-semibold tracking-tight text-[#1D1D1F]">
          Dangdang
        </span>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm cursor-pointer hover:bg-gray-50 transition-colors">
          <Search className="w-5 h-5 text-gray-500" />
        </div>
        <Avatar className="w-9 h-9 cursor-pointer shadow-sm">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
