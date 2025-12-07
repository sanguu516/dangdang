"use client";

import { Header } from "@/widgets/header/ui/header";
import { MainLayout } from "@/widgets/main-layout";
import {
  Search,
  Lightbulb,
  Heart,
  MapPin,
  Tent,
  Waves,
  Coffee,
  Trees,
  Star,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/shared/lib/utils";
import {
  Button,
  Card,
  CardContent,
  Badge,
  ScrollArea,
  ScrollBar,
} from "@/shared/ui";

export function HomePage() {
  return (
    <MainLayout>
      {/* Apple-like Background: F5F5F7 */}
      <div className="flex flex-col min-h-screen bg-[#F5F5F7] pb-24 text-[#1D1D1F]">
        <main className="flex flex-col gap-8 px-6 pt-2 pb-6">
          {/* Hero Section: Editorial Recommendation */}
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold tracking-tight text-[#1D1D1F]">
              Discover
            </h1>

            {/* Hero Card - Replaces Weather */}
            <Card className="h-[280px] border-none shadow-xl bg-gray-900 text-white rounded-[28px] overflow-hidden relative cursor-pointer active:scale-[0.98] transition-transform duration-300 group">
              {/* Background Image Placeholder with Gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80 z-10" />
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center group-hover:scale-105 transition-transform duration-700" />

              <CardContent className="p-6 relative z-20 h-full flex flex-col justify-end gap-2">
                <Badge className="w-fit bg-orange-500/90 hover:bg-orange-500 border-none text-white px-3 py-1 text-xs backdrop-blur-md">
                  Editor's Pick
                </Badge>
                <h2 className="text-3xl font-bold leading-tight">
                  Weekend Glamping
                  <br />
                  with your Pup 🏕️
                </h2>
                <p className="text-gray-200 font-medium text-sm line-clamp-1">
                  Enjoy the starry night at these pet-friendly spots.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Categories - 2x2 Grid */}
          <section className="flex flex-col gap-4">
            <h2 className="text-xl font-bold tracking-tight text-[#1D1D1F]">
              Categories
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  label: "Pool Villa",
                  icon: Waves,
                  color: "text-blue-500",
                  bg: "bg-blue-50",
                },
                {
                  label: "Camping",
                  icon: Tent,
                  color: "text-orange-500",
                  bg: "bg-orange-50",
                },
                {
                  label: "Cafe",
                  icon: Coffee,
                  color: "text-amber-700",
                  bg: "bg-amber-50",
                },
                {
                  label: "Playground",
                  icon: Trees,
                  color: "text-green-600",
                  bg: "bg-green-50",
                },
              ].map((item, i) => (
                <Card
                  key={i}
                  className="border-none shadow-sm bg-white rounded-[20px] cursor-pointer hover:bg-gray-50 active:scale-[0.98] transition-all"
                >
                  <CardContent className="p-4 flex items-center gap-3">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                        item.bg
                      )}
                    >
                      <item.icon className={cn("w-5 h-5", item.color)} />
                    </div>
                    <span className="font-semibold text-[#1D1D1F]">
                      {item.label}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Curated Collections - Horizontal Scroll */}
          <section className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold tracking-tight text-[#1D1D1F]">
                Curated for You
              </h2>
              <Button
                variant="link"
                className="text-[#007AFF] font-medium text-sm h-auto p-0 hover:no-underline flex items-center gap-0.5"
              >
                See All <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </div>

            <ScrollArea className="w-full whitespace-nowrap -mx-6 px-6">
              <div className="flex gap-4 pb-4 snap-x snap-mandatory">
                {[
                  {
                    title: "Ocean View",
                    subtitle: "Gangneung",
                    color: "from-cyan-400 to-blue-500",
                    emoji: "�",
                  },
                  {
                    title: "Forest Stay",
                    subtitle: "Gapyeong",
                    color: "from-green-400 to-emerald-600",
                    emoji: "🌲",
                  },
                  {
                    title: "City Break",
                    subtitle: "Seoul",
                    color: "from-slate-400 to-slate-600",
                    emoji: "�️",
                  },
                ].map((item, i) => (
                  <div key={i} className="snap-start shrink-0">
                    <Card className="w-36 h-44 border-none shadow-md bg-white rounded-[20px] overflow-hidden relative group cursor-pointer active:scale-[0.95] transition-all">
                      <div
                        className={cn(
                          "absolute inset-0 bg-gradient-to-br opacity-80",
                          item.color
                        )}
                      />
                      <CardContent className="p-4 h-full flex flex-col items-center justify-center gap-2 relative z-10 text-white text-center">
                        <span className="text-4xl drop-shadow-md">
                          {item.emoji}
                        </span>
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold uppercase tracking-wider opacity-90">
                            {item.subtitle}
                          </span>
                          <span className="text-lg font-bold leading-tight">
                            {item.title}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="hidden" />
            </ScrollArea>
          </section>

          {/* Tip Banner - Minimalist */}
          <Card className="border-none shadow-sm bg-white rounded-[24px] overflow-hidden cursor-pointer active:scale-[0.99] transition-transform">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-yellow-400/10 flex items-center justify-center shrink-0">
                <Lightbulb
                  className="w-6 h-6 text-yellow-500"
                  fill="currentColor"
                />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold text-yellow-600 uppercase tracking-wide">
                  Pro Tip
                </span>
                <p className="text-sm font-medium text-[#1D1D1F] leading-snug">
                  Running with your dog? Check the pavement temp first!
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Rising Stars - New Section */}
          <section className="flex flex-col gap-4">
            <h2 className="text-xl font-bold tracking-tight text-[#1D1D1F]">
              Rising Stars 🌟
            </h2>
            <div className="flex flex-col gap-5">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex flex-col gap-3 group cursor-pointer active:scale-[0.99] transition-transform"
                >
                  {/* Large Image Card */}
                  <div className="w-full aspect-[16/9] bg-gray-200 rounded-[24px] overflow-hidden shadow-sm relative">
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold shadow-sm flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />{" "}
                      4.9
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center text-gray-300 font-bold text-2xl group-hover:scale-105 transition-transform duration-500">
                      Place Image {i}
                    </div>
                  </div>
                  <div className="px-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold text-[#1D1D1F]">
                          Sunset Beach Resort
                        </h3>
                        <p className="text-sm text-gray-500 mt-0.5">
                          Jeju Island · 3.2km away
                        </p>
                      </div>
                      <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-black/5 active:scale-90 transition-all text-gray-400 hover:text-red-500">
                        <Heart className="w-5 h-5 transition-colors" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </MainLayout>
  );
}
