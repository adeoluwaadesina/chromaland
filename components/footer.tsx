import Link from "next/link";
import { Instagram, Linkedin } from "lucide-react";

import { Container } from "@/components/container";

const socials = [
  {
    href: "https://instagram.com",
    label: "Instagram",
    icon: Instagram,
  },
  {
    href: "https://linkedin.com",
    label: "LinkedIn",
    icon: Linkedin,
  },
];

export function Footer() {
  return (
    <footer className="border-t border-brand-50 bg-white">
      <Container className="flex flex-col gap-8 py-12 text-sm text-muted lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <div className="inline-flex size-12 items-center justify-center rounded-full border border-brand-100 bg-brand-50/80">
            <span className="font-heading text-lg text-ink">C</span>
          </div>
          <div>
            <p className="font-heading text-lg font-semibold text-ink">
              Chromaland Developers
            </p>
            <p className="text-sm text-muted">
              Smart luxury living shaped for Abuja&apos;s next generation.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 text-sm font-medium md:flex-row md:items-center md:gap-6">
          <Link href="/privacy" className="hover:text-ink">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-ink">
            Terms
          </Link>
          <div className="flex items-center gap-3">
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <Link
                  key={social.href}
                  href={social.href}
                  aria-label={social.label}
                  className="inline-flex size-10 items-center justify-center rounded-full border border-brand-100 text-muted transition hover:-translate-y-0.5 hover:border-brand-300 hover:text-ink"
                >
                  <Icon className="size-5" aria-hidden="true" />
                </Link>
              );
            })}
          </div>
        </div>

        <p className="text-xs text-muted">
          {"\u00A9"} {new Date().getFullYear()} Chromaland Developers. All
          rights reserved.
        </p>
      </Container>
    </footer>
  );
}
