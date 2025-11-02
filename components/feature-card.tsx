import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  className?: string;
}

export function FeatureCard({ title, className }: FeatureCardProps) {
  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-xl border border-brand-50 bg-white/80 p-5 shadow-subtle transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg",
        className,
      )}
    >
      <span className="h-1.5 w-12 rounded-full bg-brand-gradient" />
      <p className="mt-4 text-base font-medium text-ink">{title}</p>
    </div>
  );
}
