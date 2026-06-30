"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface VehicleGalleryProps {
  images: { id: string; url: string }[];
  title: string;
}

export function VehicleGallery({ images, title }: VehicleGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="aspect-[16/10] rounded-2xl bg-neutral-100 flex flex-col items-center justify-center gap-2 text-neutral-300">
        <ImageOff size={32} />
        <span className="text-sm">Pas de photo disponible</span>
      </div>
    );
  }

  function goTo(index: number) {
    setActiveIndex((index + images.length) % images.length);
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-neutral-100">
        <Image
          src={images[activeIndex].url}
          alt={`${title} — photo ${activeIndex + 1}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover"
        />

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => goTo(activeIndex - 1)}
              aria-label="Photo précédente"
              className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-full bg-white/90 text-brand-black hover:bg-white transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => goTo(activeIndex + 1)}
              aria-label="Photo suivante"
              className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-full bg-white/90 text-brand-black hover:bg-white transition-colors"
            >
              <ChevronRight size={18} />
            </button>
            <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/60 text-white text-xs font-medium">
              {activeIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={img.id}
              type="button"
              onClick={() => goTo(i)}
              className={cn(
                "relative shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-colors",
                i === activeIndex ? "border-brand-gold" : "border-transparent opacity-70 hover:opacity-100"
              )}
            >
              <Image src={img.url} alt={`${title} — miniature ${i + 1}`} fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
