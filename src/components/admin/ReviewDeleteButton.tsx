"use client";

import { deleteReviewAction } from "@/app/admin/(protected)/avis/actions";

export function ReviewDeleteButton({ id }: { id: string }) {
  return (
    <button
      onClick={async () => {
        if (confirm("Supprimer cet avis ?")) {
          await deleteReviewAction(id);
        }
      }}
      className="text-red-400 hover:text-red-300 text-xs transition-colors"
    >
      Supprimer
    </button>
  );
}
