"use client";

import Image from "next/image";
import { useCallback, useEffect, useState, type TouchEvent } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import { cn } from "@/lib/utils";

const BLUR_DATA_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQYV2P4//8/AwAI/AL+R5kO3wAAAABJRU5ErkJggg==";

interface GalleryProps {
  images: string[];
}

export function Gallery({ images }: GalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);

  const showNext = useCallback(
    () =>
      setActiveIndex((current) =>
        current === null ? 0 : (current + 1) % images.length,
      ),
    [images.length],
  );

  const showPrevious = useCallback(
    () =>
      setActiveIndex((current) =>
        current === null
          ? images.length - 1
          : (current - 1 + images.length) % images.length,
      ),
    [images.length],
  );

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      } else if (event.key === "ArrowRight") {
        showNext();
      } else if (event.key === "ArrowLeft") {
        showPrevious();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [activeIndex, close, showNext, showPrevious]);

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    setTouchStartX(event.touches[0].clientX);
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartX === null) return;
    const diff = event.changedTouches[0].clientX - touchStartX;
    if (Math.abs(diff) > 60) {
      if (diff < 0) {
        showNext();
      } else {
        showPrevious();
      }
    }
    setTouchStartX(null);
  };

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {images.map((src, index) => (
          <button
            key={src}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="group relative mb-4 w-full overflow-hidden rounded-2xl border border-brand-50 bg-white transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-300"
          >
            <Image
              src={src}
              alt={`Property render ${index + 1}`}
              width={960}
              height={640}
              loading="lazy"
              className="h-auto w-full scale-100 object-cover transition duration-500 ease-out group-hover:scale-[1.02]"
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
            />
          </button>
        ))}
      </div>

      <div
        className={cn(
          "fixed inset-0 z-[100] bg-black/80 backdrop-blur-xl transition-opacity duration-300",
          activeIndex === null
            ? "pointer-events-none opacity-0"
            : "pointer-events-auto opacity-100",
        )}
        aria-hidden={activeIndex === null}
        onClick={close}
      />

      <div
        className={cn(
          "fixed inset-0 z-[101] flex items-center justify-center px-6 transition-opacity duration-300",
          activeIndex === null
            ? "pointer-events-none opacity-0"
            : "pointer-events-auto opacity-100",
        )}
        role="dialog"
        aria-modal="true"
      >
        {activeIndex !== null && (
          <div
            className="relative flex w-full max-w-5xl flex-col gap-4"
            onClick={(event) => event.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <Image
              src={images[activeIndex]}
              alt={`Property render ${activeIndex + 1}`}
              width={1920}
              height={1280}
              className="h-auto w-full rounded-2xl object-contain"
              priority
            />
            <button
              type="button"
              onClick={close}
              className="absolute right-4 top-4 inline-flex size-10 items-center justify-center rounded-full bg-white/90 text-ink shadow-subtle transition hover:bg-white"
              aria-label="Close gallery"
            >
              <X className="size-5" />
            </button>
            <div className="absolute left-4 top-1/2 hidden -translate-y-1/2 md:flex">
              <button
                type="button"
                onClick={showPrevious}
                className="inline-flex size-12 items-center justify-center rounded-full bg-white/90 text-ink shadow-subtle transition hover:bg-white"
                aria-label="Previous render"
              >
                <ChevronLeft className="size-5" />
              </button>
            </div>
            <div className="absolute right-4 top-1/2 hidden -translate-y-1/2 md:flex">
              <button
                type="button"
                onClick={showNext}
                className="inline-flex size-12 items-center justify-center rounded-full bg-white/90 text-ink shadow-subtle transition hover:bg-white"
                aria-label="Next render"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
            <div className="flex items-center justify-between text-sm text-white/80">
              <span>
                Render {activeIndex + 1} of {images.length}
              </span>
              <div className="flex gap-2 md:hidden">
                <button
                  type="button"
                  onClick={showPrevious}
                  className="rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-widest text-white/80"
                >
                  Prev
                </button>
                <button
                  type="button"
                  onClick={showNext}
                  className="rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-widest text-white/80"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
