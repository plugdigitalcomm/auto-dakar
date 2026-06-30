import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  page: number;
  pageSize: number;
  total: number;
  searchParams: Record<string, string | undefined>;
}

function buildHref(params: Record<string, string | undefined>, page: number): string {
  const usp = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (key !== "page" && value) usp.set(key, value);
  }
  usp.set("page", String(page));
  return `/catalogue?${usp.toString()}`;
}

export function Pagination({ page, pageSize, total, searchParams }: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1
  );

  return (
    <nav className="flex items-center justify-center gap-1.5 mt-10">
      <Link
        href={buildHref(searchParams, Math.max(1, page - 1))}
        aria-disabled={page === 1}
        className={cn(
          "flex items-center justify-center w-9 h-9 rounded-lg border border-neutral-200 text-neutral-500",
          "hover:border-brand-gold hover:text-brand-gold transition-colors",
          page === 1 && "pointer-events-none opacity-40"
        )}
      >
        <ChevronLeft size={16} />
      </Link>

      {pages.map((p, i) => (
        <span key={p} className="flex items-center gap-1.5">
          {i > 0 && pages[i - 1] !== p - 1 && (
            <span className="px-1 text-neutral-300">…</span>
          )}
          <Link
            href={buildHref(searchParams, p)}
            className={cn(
              "flex items-center justify-center w-9 h-9 rounded-lg text-sm font-medium transition-colors",
              p === page
                ? "bg-brand-gold text-brand-black"
                : "border border-neutral-200 text-neutral-600 hover:border-brand-gold hover:text-brand-gold"
            )}
          >
            {p}
          </Link>
        </span>
      ))}

      <Link
        href={buildHref(searchParams, Math.min(totalPages, page + 1))}
        aria-disabled={page === totalPages}
        className={cn(
          "flex items-center justify-center w-9 h-9 rounded-lg border border-neutral-200 text-neutral-500",
          "hover:border-brand-gold hover:text-brand-gold transition-colors",
          page === totalPages && "pointer-events-none opacity-40"
        )}
      >
        <ChevronRight size={16} />
      </Link>
    </nav>
  );
}
