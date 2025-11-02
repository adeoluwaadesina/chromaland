import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full font-medium tracking-tight transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary:
          "bg-brand-gradient text-ink shadow-subtle hover:scale-[1.01] hover:shadow-lg focus-visible:outline-brand-300",
        secondary:
          "border border-brand-300 bg-white/90 text-ink hover:bg-brand-50 focus-visible:outline-brand-300",
        ghost:
          "text-ink/80 hover:bg-brand-50/60 hover:text-ink focus-visible:outline-brand-100",
      },
      size: {
        sm: "h-9 px-5 text-sm",
        md: "h-11 px-6 text-sm md:text-base",
        lg: "h-12 px-8 text-base md:text-lg",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      ref={ref}
      {...props}
    />
  ),
);

Button.displayName = "Button";
