import { cn } from "@/lib/utils";

interface SectionTitleProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionTitle({ label, title, subtitle, align = "left", className }: SectionTitleProps) {
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      {label && (
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-gold mb-2">
          {label}
        </p>
      )}
      <h2 className="font-display text-2xl sm:text-3xl font-bold text-brand-black leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-neutral-500 text-base leading-relaxed max-w-xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
