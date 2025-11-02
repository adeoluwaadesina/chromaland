import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "text-center items-center",
        className,
      )}
    >
      {eyebrow && (
        <span className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-ink/70">
          {eyebrow}
        </span>
      )}
      <h2 className="font-heading text-3xl leading-tight text-ink md:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="max-w-2xl text-base text-muted md:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
