"use client";

import { useState } from "react";
import { TourSpotDetail } from "@/entities/place/model/types";
import {
  ArrowLeft,
  MapPin,
  Phone,
  Clock,
  Calendar,
  Info,
  Share2,
  Heart,
} from "lucide-react";
import { Button, Badge, Separator } from "@/shared/ui";
import Link from "next/link";
import { cn } from "@/shared/lib/utils";
import Map, { Marker, NavigationControl } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

type Tab = "info" | "pet" | "map";

// MOCK DATA
const MOCK_DETAIL: TourSpotDetail = {
  basicInfo: {
    contentid: "123",
    title: "멍멍 펜션 & 카페",
    overview:
      "푸른 잔디가 넓게 펼쳐진 반려견 전용 펜션입니다. <strong>대형견</strong>도 입실 가능하며, 개별 수영장이 마련되어 있습니다. 쾌적한 환경에서 반려견과 함께 힐링하세요.",
    addr1: "강원도 강릉시 해안로 123",
    mapx: "128.9",
    mapy: "37.8",
    homepage: "https://example.com",
  },
  introInfo: {
    opentime: "09:00 ~ 22:00",
    restdate: "연중무휴",
    parking: "전용 주차장 보유 (30대 가능)",
    chkcreditcard: "가능",
    infocenter: "033-1234-5678",
    checkintime: "15:00",
    checkouttime: "11:00",
    roomcount: "15실",
  },
  petInfo: {
    acmpyTypeCd: "전구역 동반가능",
    acmpyPsblCpam: "모든 견종 가능 (맹견 제외)",
    acmpyNeedMtr: "실내 매너벨트 착용 권장",
    etcAcmpyInfo: "개별 운동장 있음",
    relaPosesFclty: "강아지 수영장, 애견 목욕 시설, 드라이룸",
    relaFrnshPrdlst: "배변패드, 식기, 타월",
  },
  images: [
    {
      originimgurl:
        "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=2688&auto=format&fit=crop",
      smallimageurl: "",
    },
    {
      originimgurl:
        "https://images.unsplash.com/photo-1544568100-847a948130fc?q=80&w=2574&auto=format&fit=crop",
      smallimageurl: "",
    },
    {
      originimgurl:
        "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?q=80&w=2670&auto=format&fit=crop",
      smallimageurl: "",
    },
  ],
};

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export function PlaceDetailPage({ id }: { id: string }) {
  const data = MOCK_DETAIL; // In real app, fetch using ID
  const [activeTab, setActiveTab] = useState<Tab>("info");

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header Img */}
      <div className="relative h-72 w-full bg-slate-200">
        <img
          src={data.images[0].originimgurl}
          alt={data.basicInfo.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 right-0 p-4 pt-12 flex justify-between items-start bg-gradient-to-b from-black/50 to-transparent">
          <Link href="/map">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 rounded-full"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
          </Link>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 rounded-full"
            >
              <Share2 className="w-6 h-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 rounded-full"
            >
              <Heart className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Title Section */}
      <div className="px-5 py-6 -mt-6 bg-background rounded-t-[30px] relative z-10">
        <div className="flex flex-col gap-2 mb-6">
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="text-primary border-primary/20 bg-primary/5"
            >
              {data.petInfo.acmpyTypeCd || "반려동물 동반"}
            </Badge>
            {data.introInfo.chkcreditcard === "가능" && (
              <Badge
                variant="secondary"
                className="text-slate-500 bg-slate-100"
              >
                카드결제
              </Badge>
            )}
          </div>
          <h1 className="text-2xl font-bold text-foreground leading-tight">
            {data.basicInfo.title}
          </h1>
          <div className="flex items-center gap-1 text-sm text-slate-500">
            <MapPin className="w-4 h-4" />
            <span>{data.basicInfo.addr1}</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-100 mb-6">
          {[
            { id: "info", label: "정보" },
            { id: "pet", label: "반려생활" },
            { id: "map", label: "지도" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={cn(
                "flex-1 py-3 text-sm font-bold text-center border-b-2 transition-colors",
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-slate-400 hover:text-slate-600"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
          {/* 1. INFO TAB / All */}
          {(activeTab === "info" || activeTab === "pet") && (
            <section className="space-y-4">
              <h2 className="text-lg font-bold">소개</h2>
              <div
                className="text-sm text-slate-600 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: data.basicInfo.overview }}
              />

              <Separator className="my-2" />

              <h2 className="text-lg font-bold">기본 정보</h2>
              <ul className="space-y-3">
                {data.introInfo.opentime && (
                  <li className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-sm text-slate-900">
                        영업시간
                      </div>
                      <div className="text-sm text-slate-500">
                        {data.introInfo.opentime}
                      </div>
                    </div>
                  </li>
                )}
                {data.introInfo.restdate && (
                  <li className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-sm text-slate-900">
                        휴무일
                      </div>
                      <div className="text-sm text-slate-500">
                        {data.introInfo.restdate}
                      </div>
                    </div>
                  </li>
                )}
                {data.introInfo.infocenter && (
                  <li className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-sm text-slate-900">
                        문의
                      </div>
                      <div className="text-sm text-slate-500">
                        {data.introInfo.infocenter}
                      </div>
                    </div>
                  </li>
                )}
              </ul>
            </section>
          )}

          {/* 2. PET TAB */}
          {(activeTab === "pet" || activeTab === "info") && (
            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-primary">
                  반려동물 특화 정보
                </h2>
                <Info className="w-4 h-4 text-primary/50" />
              </div>

              <div className="bg-primary/5 rounded-2xl p-5 space-y-4 border border-primary/10">
                {data.petInfo.acmpyPsblCpam && (
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-primary/70">
                      동반 가능 동물
                    </div>
                    <div className="text-sm font-medium text-slate-800">
                      {data.petInfo.acmpyPsblCpam}
                    </div>
                  </div>
                )}
                {data.petInfo.relaPosesFclty && (
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-primary/70">
                      주요 시설
                    </div>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {data.petInfo.relaPosesFclty.split(",").map((item) => (
                        <div
                          key={item}
                          className="bg-white px-2.5 py-1 rounded-md text-xs font-medium text-primary shadow-sm"
                        >
                          {item.trim()}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {data.petInfo.acmpyNeedMtr && (
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-primary/70">
                      필수 주의사항
                    </div>
                    <div className="text-sm text-slate-700 bg-white/50 p-2 rounded-lg">
                      {data.petInfo.acmpyNeedMtr}
                    </div>
                  </div>
                )}
                {data.petInfo.relaFrnshPrdlst && (
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-primary/70">
                      비치 물품
                    </div>
                    <div className="text-sm text-slate-600">
                      {data.petInfo.relaFrnshPrdlst}
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* 3. MAP TAB */}
          {activeTab === "map" && (
            <section className="h-80 w-full rounded-2xl overflow-hidden shadow-inner border border-slate-100 relative bg-slate-100">
              <Map
                initialViewState={{
                  longitude: 127.0593, // placeholder
                  latitude: 37.5115, // placeholder
                  zoom: 14,
                }}
                style={{ width: "100%", height: "100%" }}
                mapStyle="mapbox://styles/mapbox/streets-v12"
                mapboxAccessToken={MAPBOX_TOKEN}
              >
                <Marker
                  longitude={127.0593}
                  latitude={37.5115}
                  color="#FF592C"
                />
                <NavigationControl position="bottom-right" />
              </Map>
              <div className="absolute bottom-4 left-4 right-14 bg-white/90 backdrop-blur px-4 py-3 rounded-xl shadow-lg border border-black/5">
                <div className="text-xs font-bold text-slate-800 mb-0.5">
                  도로명 주소
                </div>
                <div className="text-sm text-slate-600">
                  {data.basicInfo.addr1}
                </div>
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Bottom Floating Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-md border-t border-slate-100 flex items-center gap-3 pb-[env(safe-area-inset-bottom)] z-50">
        {data.introInfo.infocenter && (
          <Button
            size="icon"
            variant="outline"
            className="w-12 h-12 rounded-full border-slate-200 shrink-0"
            asChild
          >
            <a href={`tel:${data.introInfo.infocenter}`}>
              <Phone className="w-5 h-5 text-slate-600" />
            </a>
          </Button>
        )}
        {data.basicInfo.homepage && (
          <Button
            className="flex-1 h-12 rounded-[20px] bg-primary text-white hover:bg-primary/90 text-base font-bold shadow-lg shadow-primary/20"
            asChild
          >
            <a href={data.basicInfo.homepage} target="_blank" rel="noreferrer">
              홈페이지
            </a>
          </Button>
        )}
      </div>
    </div>
  );
}
