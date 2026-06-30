import { cn } from "@/lib/utils";

type BadgeVariant = "gold" | "green" | "neutral" | "red" | "blue";

const variants: Record<BadgeVariant, string> = {
  gold: "bg-brand-gold/10 text-brand-gold border border-brand-gold/20",
  green: "bg-success/10 text-success border border-success/20",
  neutral: "bg-neutral-100 text-neutral-600 border border-neutral-200",
  red: "bg-danger/10 text-danger border border-danger/20",
  blue: "bg-blue-50 text-blue-700 border border-blue-200",
};

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export function Badge({ children, variant = "neutral", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
