import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2 group", className)}>
      <span className="text-xl font-display font-bold tracking-tight text-brand-black group-hover:text-brand-gold transition-colors duration-200">
        Auto<span className="text-brand-gold">Dakar</span>
      </span>
    </Link>
  );
}
