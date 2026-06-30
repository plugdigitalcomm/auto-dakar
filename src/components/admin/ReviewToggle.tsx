"use client";

import { toggleReviewPublishedAction } from "@/app/admin/(protected)/avis/actions";

interface Props {
  id: string;
  published: boolean;
}

export function ReviewToggle({ id, published }: Props) {
  return (
    <button
      onClick={() => toggleReviewPublishedAction(id, !published)}
      className={`px-2 py-0.5 rounded-full text-xs font-medium transition-colors ${
        published
          ? "bg-green-500/20 text-green-300 hover:bg-green-500/30"
          : "bg-neutral-700 text-neutral-400 hover:bg-neutral-600"
      }`}
    >
      {published ? "Publié" : "Masqué"}
    </button>
  );
}
