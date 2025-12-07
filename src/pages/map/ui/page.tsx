"use client";

import Link from "next/link";
import { useState, useCallback } from "react";
import Map, {
  Marker,
  NavigationControl,
  GeolocateControl,
} from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { MainLayout } from "@/widgets/main-layout";
import { Button, ScrollArea, ScrollBar } from "@/shared/ui";
import { Star, X, Tent, Coffee, Home, Dog, Navigation } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import type { MapboxEvent, Map as MapboxMap } from "mapbox-gl";

// Mock Data for Places
const PLACES = [
  {
    id: 1,
    name: "Ocean View Pension",
    lat: 37.5105,
    lng: 127.06,
    price: "₩150,000",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop",
    category: "Pension",
    desc: "Best ocean view in Gangnam (wait, ocean in Gangnam?)",
  },
  {
    id: 2,
    name: "Forest Camping",
    lat: 37.5155,
    lng: 127.055,
    price: "₩80,000",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?q=80&w=2070&auto=format&fit=crop",
    category: "Camping",
    desc: "Cozy camping site near the city.",
  },
  {
    id: 3,
    name: "Dog Cafe Playground",
    lat: 37.5085,
    lng: 127.065,
    price: "₩15,000",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=2069&auto=format&fit=crop",
    category: "Cafe",
    desc: "Large playground for dogs to run freely.",
  },
];

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export function MapPage() {
  const [selectedPlaceId, setSelectedPlaceId] = useState<number | null>(null);
  const [viewState, setViewState] = useState({
    latitude: 37.5115,
    longitude: 127.0593,
    zoom: 14,
  });

  const selectedPlace = PLACES.find((p) => p.id === selectedPlaceId);

  // Helper to get icon by category
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Camping":
        return <Tent className="w-4 h-4" />;
      case "Cafe":
        return <Coffee className="w-4 h-4" />;
      case "Pension":
        return <Home className="w-4 h-4" />;
      default:
        return <Dog className="w-4 h-4" />;
    }
  };

  // Function to set map language to Korean
  const onMapLoad = useCallback((evt: MapboxEvent) => {
    const map = evt.target as MapboxMap;
    const style = map.getStyle();
    if (style && style.layers) {
      style.layers.forEach((layer) => {
        if (
          layer.type === "symbol" &&
          layer.layout &&
          layer.layout["text-field"]
        ) {
          // Attempt to switch to Korean field if it exists, fallback to default
          // Typically "name_ko" for Korean
          map.setLayoutProperty(layer.id, "text-field", [
            "coalesce",
            ["get", "name_ko"],
            ["get", "name"],
          ]);
        }
      });
    }
  }, []);

  return (
    <MainLayout className="pb-0">
      <div className="relative w-full h-[calc(100vh-64px)] bg-[#F5F5F7]">
        {/* Category Filter - Floating Top */}
        <div className="absolute top-4 left-0 right-0 z-10 px-4">
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex gap-2">
              {["All", "Pension", "Camping", "Cafe", "Playground"].map(
                (cat, i) => (
                  <Button
                    key={cat}
                    variant="ghost"
                    className={cn(
                      "rounded-full px-4 h-9 text-xs font-bold transition-all shadow-sm border",
                      i === 0
                        ? "bg-[#FF592C] text-white border-[#FF592C] hover:bg-[#FF592C]/90"
                        : "bg-white text-slate-600 border-slate-100 hover:bg-slate-50"
                    )}
                  >
                    {cat}
                  </Button>
                )
              )}
            </div>
            <ScrollBar orientation="horizontal" className="hidden" />
          </ScrollArea>
        </div>

        {/* Map */}
        <Map
          {...viewState}
          onMove={(evt) => setViewState(evt.viewState)}
          onLoad={onMapLoad}
          padding={{ top: 0, bottom: 80, left: 0, right: 0 }} // Compensate for Bottom Nav
          style={{ width: "100%", height: "100%" }}
          mapStyle="mapbox://styles/mapbox/streets-v12"
          mapboxAccessToken={MAPBOX_TOKEN}
        >
          <GeolocateControl position="top-right" />
          <NavigationControl position="top-right" />

          {/* Markers */}
          {PLACES.map((place) => {
            const isSelected = selectedPlaceId === place.id;
            return (
              <Marker
                key={place.id}
                latitude={place.lat}
                longitude={place.lng}
                anchor="bottom"
                onClick={(e) => {
                  e.originalEvent.stopPropagation();
                  setSelectedPlaceId(place.id);
                }}
              >
                <div className="relative flex flex-col items-center">
                  {/* Price Bubble (Only when selected) */}
                  {isSelected && (
                    <div className="absolute -top-10 bg-white px-3 py-1.5 rounded-xl shadow-lg border border-[#FF592C]/10 animate-in fade-in slide-in-from-bottom-2 duration-200 z-50 whitespace-nowrap">
                      <span className="text-xs font-bold text-[#FF592C]">
                        {place.price}
                      </span>
                      {/* Little triangle arrow */}
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45 border-r border-b border-[#FF592C]/10" />
                    </div>
                  )}

                  {/* Icon Marker */}
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full shadow-md flex items-center justify-center transition-all duration-300 border-2",
                      isSelected
                        ? "bg-[#FF592C] border-white text-white scale-110 z-20 shadow-[#FF592C]/30"
                        : "bg-white border-white text-slate-600 hover:scale-105 hover:text-[#FF592C]"
                    )}
                  >
                    {getCategoryIcon(place.category)}
                  </div>
                </div>
              </Marker>
            );
          })}
        </Map>

        {/* Bottom Card - Selected Place Info */}
        {selectedPlace && (
          <div className="absolute bottom-24 left-4 right-4 z-20 animate-in slide-in-from-bottom-10 fade-in duration-300">
            <div className="bg-white/90 backdrop-blur-xl border border-white/40 p-1 pr-1.5 rounded-[28px] shadow-2xl flex items-center gap-4">
              {/* Image Circle */}
              <div className="relative w-20 h-20 shrink-0 rounded-[24px] overflow-hidden bg-slate-100 ring-2 ring-white shadow-sm">
                <img
                  src={selectedPlace.image}
                  alt={selectedPlace.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0 py-1.5">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-[10px] font-bold text-[#FF592C] bg-[#FF592C]/10 px-2 py-0.5 rounded-full">
                    {selectedPlace.category}
                  </span>
                  <div className="flex items-center text-[11px] font-medium text-slate-500">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400 mr-0.5" />
                    {selectedPlace.rating}
                  </div>
                </div>
                <h3 className="text-base font-bold text-[#1D1D1F] truncate leading-tight mb-0.5">
                  {selectedPlace.name}
                </h3>
                <p className="text-sm font-semibold text-slate-600">
                  {selectedPlace.price}
                </p>
              </div>

              {/* Action */}
              <Link href={`/place/${selectedPlace.id}`}>
                <Button
                  size="icon"
                  className="rounded-full w-10 h-10 bg-[#FF592C] hover:bg-[#FF592C]/90 text-white shadow-md shrink-0"
                >
                  <Navigation className="w-4 h-4 ml-0.5" />
                </Button>
              </Link>
            </div>

            {/* Close Button Overlay (Optional, but good for UX to deselect) */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute -top-12 right-0 bg-white/80 backdrop-blur shadow-sm hover:bg-white rounded-full h-8 w-8"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPlaceId(null);
              }}
            >
              <X className="w-4 h-4 text-slate-600" />
            </Button>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
