"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { NAV_ITEMS } from "@/lib/data";
import { Button, buttonVariants } from "@/components/button";
import { cn } from "@/lib/utils";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("hashchange", close);
    return () => window.removeEventListener("hashchange", close);
  }, []);

  return (
    <>
      <Button
        variant="secondary"
        size="sm"
        className="md:hidden"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="mobile-navigation"
      >
        Menu
      </Button>
      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/30 backdrop-blur-sm transition-opacity duration-300 md:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setOpen(false)}
      />
      <dialog
        id="mobile-navigation"
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-72 max-w-full translate-x-full overflow-y-auto bg-white px-7 pb-12 pt-28 shadow-2xl transition-transform duration-300 md:hidden",
          open && "translate-x-0",
        )}
        aria-modal="true"
        open={open}
      >
        <div className="flex flex-col gap-6">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-lg font-medium text-ink/80 transition-colors hover:text-ink"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="#contact"
            onClick={() => setOpen(false)}
            className={cn(
              buttonVariants({ variant: "primary", size: "md" }),
              "mt-4 text-center",
            )}
          >
            Contact Us
          </Link>
        </div>
      </dialog>
    </>
  );
}
