"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { buttonVariants } from "@/components/button";
import { Container } from "@/components/container";
import { MobileMenu } from "@/components/mobile-menu";
import { NAV_ITEMS } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 16);
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-transparent bg-white/70 backdrop-blur-xl transition-all duration-300",
        scrolled && "border-brand-50/60 shadow-[0_12px_30px_-24px_rgba(11,11,11,0.4)]",
      )}
    >
      <Container className="flex h-[var(--nav-height)] items-center justify-between gap-4">
        <Link href="#home" className="group flex items-center gap-3">
          <span className="relative inline-flex size-10 items-center justify-center overflow-hidden rounded-full">
            <Image
              src="/brand/logo.png"
              alt="Chromaland logo"
              fill
              sizes="40px"
              className="object-contain"
              priority
            />
          </span>
          <div className="flex flex-col leading-none">
            <span className="font-heading text-lg font-semibold tracking-tight text-ink">
              Chromaland
            </span>
            <span className="text-[11px] font-medium uppercase tracking-[0.4em] text-muted">
              Developers
            </span>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative text-sm font-medium text-muted transition-colors hover:text-ink"
            >
              <span className="inline-flex items-center gap-2">
                {item.label}
              </span>
              <span className="pointer-events-none absolute inset-x-0 -bottom-2 h-[2px] origin-left scale-x-0 bg-brand-gradient transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex">
          <Link
            href="#contact"
            className={buttonVariants({ variant: "primary", size: "sm" })}
          >
            Enquire
          </Link>
        </div>
        <MobileMenu />
      </Container>
    </header>
  );
}
