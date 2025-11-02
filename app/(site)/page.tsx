import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  BedDouble,
  CarFront,
  Layers3,
  Sofa,
} from "lucide-react";

import { buttonVariants } from "@/components/button";
import { Container } from "@/components/container";
import { ContactForm } from "@/components/contact-form";
import { FeatureCard } from "@/components/feature-card";
import { FloorPlanAccordion } from "@/components/floor-plan-accordion";
import { Gallery } from "@/components/gallery";
import { SectionHeader } from "@/components/section-header";
import { StatCard } from "@/components/stat-card";
import {
  FEATURE_GRID,
  FLOOR_PLANS,
  GALLERY_IMAGES,
  POINTS_OF_INTEREST,
  PROPERTY_FEATURES,
  QUICK_STATS,
} from "@/lib/data";
import { cn } from "@/lib/utils";

const STAT_ICONS = [Layers3, BedDouble, Sofa, CarFront];

export default function SitePage() {
  return (
    <div className="space-y-32 pb-24">
      <section
        id="home"
        className="relative isolate min-h-[85vh] overflow-hidden rounded-b-[3rem] bg-ink text-white"
      >
        <Image
          src="/images/property/my-hero.jpg"
          alt="Exterior view of Plot 610 Terraces"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/60 to-transparent" />
        <Container className="relative z-10 flex min-h-[85vh] flex-col justify-center py-24 md:py-32">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-brand-50">
            Plot 610 Terraces
          </span>
          <h1 className="mt-6 max-w-3xl font-heading text-4xl leading-tight md:text-6xl">
            Welcome to a new era of smart living.
          </h1>
          <p className="mt-6 max-w-2xl text-base text-white/80 md:text-lg">
            Elegantly crafted terraces in Daki Biyu, Abuja - blending timeless
            architecture with smart technology, abundant daylight, and generous
            outdoor spaces.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="#property"
              aria-label="Explore the property details"
              className={cn(
                buttonVariants({ variant: "primary", size: "lg" }),
                "group inline-flex items-center",
              )}
            >
              Explore the property
              <ArrowUpRight className="ml-2 size-4 transition group-hover:-translate-y-1 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/Chromaland-Brochure.pdf"
              download
              className={buttonVariants({ variant: "secondary", size: "lg" })}
            >
              Download brochure
            </Link>
          </div>
        </Container>
      </section>

      <section aria-label="Quick stats">
        <Container className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {QUICK_STATS.map((stat, index) => {
            const Icon = STAT_ICONS[index] ?? Layers3;
            return (
              <StatCard
                key={stat.label}
                icon={Icon}
                label={stat.label}
                description={stat.description}
              />
            );
          })}
        </Container>
      </section>

      <section
        id="about"
        className="scroll-mt-[var(--nav-height)]"
        aria-labelledby="about-heading"
      >
        <Container className="grid gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="order-2 lg:order-1">
            <SectionHeader
              eyebrow="About Chromaland"
              title="Elevated living, perfected for everyday ease."
              description="Chromaland Developers crafts homes that balance elegance with everyday ease. Our designs celebrate light, space, and technology because modern living should feel effortless."
            />
            <div className="mt-10 grid gap-4 text-sm text-muted">
              <p>
                From our design studio in Abuja, we orchestrate architecture,
                engineering, and smart home technology into timeless residences.
              </p>
              <p>
                Plot 610 Terraces embodies this ethos: a refined collection of
                four-bedroom homes across three levels, optimized for family
                life, remote work, and entertaining.
              </p>
            </div>
            <div className="mt-10 flex flex-col gap-6 sm:flex-row">
              <div>
                <p className="font-heading text-3xl text-ink">100%</p>
                <p className="text-sm text-muted">
                  Smart-ready infrastructure for locks, CCTV, and fiber.
                </p>
              </div>
              <div>
                <p className="font-heading text-3xl text-ink">16+</p>
                <p className="text-sm text-muted">
                  Years of combined architecture and construction expertise.
                </p>
              </div>
            </div>
          </div>

          <div className="relative order-1 aspect-[4/3] overflow-hidden rounded-[2rem] border border-brand-50 shadow-2xl shadow-brand-700/20 lg:order-2">
            <Image
              src="/images/property/about.jpg"
              alt="Modern terrace elevation with lush landscaping"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
              priority={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 rounded-full bg-white/90 px-4 py-2 text-xs font-medium uppercase tracking-[0.35em] text-muted">
              Abuja, Nigeria
            </div>
          </div>
        </Container>
      </section>

      <section
        id="property"
        className="scroll-mt-[var(--nav-height)]"
        aria-labelledby="property-heading"
      >
        <Container className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div className="order-2 lg:order-1">
            <SectionHeader
              eyebrow="The Property"
              title="Plot 610 Terraces - Daki Biyu, Abuja"
              description="A boutique enclave of smart-ready terraces in a secure, landscaped community, minutes from Abuja's business and leisure hubs."
            />
            <ul className="mt-8 grid gap-3 text-sm text-ink md:text-base">
              {PROPERTY_FEATURES.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 rounded-xl border border-brand-50 bg-brand-50/40 px-4 py-3 text-ink"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 inline-flex size-2 flex-shrink-0 rounded-full bg-brand-500"
                  />
                  {feature}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="#floor-plans"
                className={buttonVariants({ variant: "primary", size: "md" })}
              >
                View floor plans
              </Link>
              <Link
                href="#contact"
                className={buttonVariants({ variant: "ghost", size: "md" })}
              >
                Book a private tour
              </Link>
            </div>
          </div>

          <div className="relative order-1 aspect-[4/3] overflow-hidden rounded-[2rem] border border-brand-50 bg-brand-50/60 shadow-subtle lg:order-2">
            <Image
              src="/images/property/property.jpg"
              alt="Chromaland terrace featuring layered balconies and warm lighting"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
            <div className="absolute left-6 top-6 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-muted">
              Gated community
            </div>
            <div className="absolute bottom-6 right-6 rounded-lg bg-ink/80 px-4 py-2 text-xs text-white">
              Smart access, Solar ready, Dual lounges
            </div>
          </div>
        </Container>
      </section>

      <section
        id="gallery"
        className="scroll-mt-[var(--nav-height)]"
        aria-labelledby="gallery-heading"
      >
        <Container>
          <SectionHeader
            eyebrow="Gallery"
            title="Architectural renders"
            description="Peek inside the terraces - from sun-drenched lounges to evening facades - with swipeable renders optimised for every device."
            align="center"
          />
          <div className="mt-12">
            <Gallery images={GALLERY_IMAGES} />
          </div>
        </Container>
      </section>

      <section
        id="features"
        className="scroll-mt-[var(--nav-height)]"
        aria-labelledby="features-heading"
      >
        <Container>
          <SectionHeader
            eyebrow="Features"
            title="Thoughtful details at every level."
            description="Smart integrations, efficient shells, and generous amenities deliver a refined, future-ready home."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURE_GRID.map((feature) => (
              <FeatureCard key={feature} title={feature} />
            ))}
          </div>
        </Container>
      </section>

      <section
        id="floor-plans"
        className="scroll-mt-[var(--nav-height)]"
        aria-labelledby="floorplan-heading"
      >
        <Container>
          <SectionHeader
            eyebrow="Floor Plans"
            title="Designed for privacy, flow, and flexibility."
            description="Layered across three levels, Plot 610 Terraces balances welcoming social zones with tranquil retreats."
          />
          <div className="mt-10">
            <FloorPlanAccordion items={FLOOR_PLANS} />
          </div>
        </Container>
      </section>

      <section
        id="location"
        className="scroll-mt-[var(--nav-height)]"
        aria-labelledby="location-heading"
      >
        <Container className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <SectionHeader
              eyebrow="Location"
              title="Connected to everything, nestled in calm."
              description="Daki Biyu sits at the heart of Abuja's growth corridor - within minutes of prime business, lifestyle, and learning hubs."
            />
            <ul className="mt-8 space-y-3 text-sm text-muted md:text-base">
              {POINTS_OF_INTEREST.map((poi) => (
                <li
                  key={poi}
                  className="flex items-center gap-3 rounded-xl border border-brand-50 px-4 py-3"
                >
                  <span
                    aria-hidden="true"
                    className="inline-flex size-3 flex-shrink-0 rounded-full bg-brand-500"
                  />
                  {poi}
                </li>
              ))}
            </ul>
          </div>
          <div className="overflow-hidden rounded-[2rem] border border-brand-50 shadow-subtle">
            <iframe
              title="Map showing Plot 610 Terraces in Daki Biyu, Abuja"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31528.27882970654!2d7.4635!3d9.062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0a849c400001%3A0x1a9dbae7f2b0530c!2sDaki%20Biyu%2C%20Abuja!5e0!3m2!1sen!2sng!4v1730514020000!5m2!1sen!2sng"
              className="h-[320px] w-full border-0 md:h-[360px]"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Container>
      </section>

      <section
        id="contact"
        className="scroll-mt-[var(--nav-height)]"
        aria-labelledby="contact-heading"
      >
        <Container>
          <SectionHeader
            eyebrow="Enquiries"
            title="Ready to experience Plot 610 Terraces?"
            description="Share your contact details and our sales concierge will schedule a walkthrough, share pricing, and tailor options to your needs."
          />
          <div className="mt-10">
            <ContactForm />
          </div>
        </Container>
      </section>
    </div>
  );
}
