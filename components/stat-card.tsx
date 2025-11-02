import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  description: string;
  className?: string;
}

export function StatCard({
  icon: Icon,
  label,
  description,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-brand-50 bg-white/80 p-6 shadow-subtle transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-lg",
        className,
      )}
    >
      <div className="flex items-center gap-4">
        <span className="inline-flex size-12 items-center justify-center rounded-2xl border border-brand-100 bg-brand-50/60 text-brand-700">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <div>
          <p className="font-heading text-xl text-ink">{label}</p>
          <p className="text-sm text-muted">{description}</p>
        </div>
      </div>
    </div>
  );
}

