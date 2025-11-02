"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

interface FloorPlanItem {
  title: string;
  summary: string;
  items: string[];
  image?: string;
  imageAlt?: string;
}

interface FloorPlanAccordionProps {
  items: FloorPlanItem[];
}

export function FloorPlanAccordion({ items }: FloorPlanAccordionProps) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const open = index === openIndex;
        return (
          <div
            key={item.title}
            className="overflow-hidden rounded-2xl border border-brand-50 bg-white/80 shadow-subtle"
          >
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-brand-50/60"
              onClick={() => setOpenIndex(open ? -1 : index)}
              aria-expanded={open}
            >
              <div>
                <h3 className="font-heading text-xl text-ink">{item.title}</h3>
                <p className="text-sm text-muted">{item.summary}</p>
              </div>
              <ChevronDown
                className={cn(
                  "h-5 w-5 text-brand-500 transition-transform duration-300",
                  open && "rotate-180",
                )}
              />
            </button>
            <div
              className={cn(
                "grid grid-rows-[0fr] px-6 text-muted transition-all duration-300 ease-out",
                open && "grid-rows-[1fr] pb-6",
              )}
            >
              <div className="min-h-0 space-y-5 overflow-hidden">
                {item.image && (
                  <div className="overflow-hidden rounded-2xl border border-brand-50 bg-white/70 shadow-subtle">
                    <Image
                      src={item.image}
                      alt={item.imageAlt ?? `${item.title} illustration`}
                      width={1200}
                      height={800}
                      className="h-auto w-full object-cover"
                      sizes="(min-width: 1024px) 600px, 90vw"
                    />
                  </div>
                )}
                <ul className="list-disc space-y-2 pl-6 text-sm leading-relaxed md:text-base">
                  {item.items.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="inline-flex w-fit items-center gap-2 rounded-full border border-brand-300 px-5 py-2 text-sm font-medium text-brand-700 transition-colors hover:bg-brand-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-300"
                  onClick={() => {
                    window.dispatchEvent(
                      new CustomEvent("contact:reason", {
                        detail: "floor-plans",
                      }),
                    );
                    const contact = document.querySelector("#contact");
                    contact?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Request full plans
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
