"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

export function Accordion({ items }: AccordionProps) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="flex flex-col divide-y divide-neutral-200 border border-neutral-200 rounded-2xl overflow-hidden">
      {items.map((item, i) => (
        <div key={i}>
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left bg-brand-white hover:bg-neutral-50 transition-colors"
          >
            <span className="font-medium text-brand-black text-sm">{item.question}</span>
            <ChevronDown
              size={18}
              className={cn("text-neutral-400 shrink-0 transition-transform duration-200", open === i && "rotate-180")}
            />
          </button>
          {open === i && (
            <div className="px-6 py-4 bg-neutral-50 text-sm text-neutral-600 leading-relaxed border-t border-neutral-100">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
