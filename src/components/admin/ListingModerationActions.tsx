"use client";

import { useState, useTransition } from "react";
import { Check, X } from "lucide-react";
import { approveListingAction, rejectListingAction } from "@/app/admin/(protected)/annonces/actions";

export function ListingModerationActions({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();
  const [rejecting, setRejecting] = useState(false);
  const [reason, setReason] = useState("");

  function approve() {
    startTransition(() => approveListingAction(id));
  }

  function confirmReject() {
    startTransition(async () => {
      await rejectListingAction(id, reason);
      setRejecting(false);
      setReason("");
    });
  }

  if (rejecting) {
    return (
      <div className="flex flex-col gap-2 w-full sm:w-64">
        <input
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Motif du refus (optionnel)"
          className="bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-brand-gold"
        />
        <div className="flex gap-2">
          <button
            type="button"
            onClick={confirmReject}
            disabled={isPending}
            className="flex-1 px-3 py-2 bg-red-500/90 text-white text-xs font-medium rounded-lg hover:bg-red-500 disabled:opacity-60"
          >
            Confirmer le refus
          </button>
          <button
            type="button"
            onClick={() => setRejecting(false)}
            className="px-3 py-2 bg-neutral-800 text-neutral-300 text-xs rounded-lg hover:bg-neutral-700"
          >
            Annuler
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={approve}
        disabled={isPending}
        className="flex items-center gap-1 px-3 py-2 bg-green-500/90 text-white text-xs font-medium rounded-lg hover:bg-green-500 disabled:opacity-60"
      >
        <Check size={14} /> Approuver
      </button>
      <button
        type="button"
        onClick={() => setRejecting(true)}
        disabled={isPending}
        className="flex items-center gap-1 px-3 py-2 bg-neutral-800 text-neutral-300 text-xs font-medium rounded-lg hover:bg-neutral-700 disabled:opacity-60"
      >
        <X size={14} /> Refuser
      </button>
    </div>
  );
}
