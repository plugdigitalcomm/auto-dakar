"use client";

import { useActionState } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { createReservationAction, type ReservationActionState } from "@/app/(public)/vehicule/[slug]/actions";

interface ReservationFormProps {
  vehicleId: string;
}

const initialState: ReservationActionState = { status: "idle" };

export function ReservationForm({ vehicleId }: ReservationFormProps) {
  const [state, formAction, isPending] = useActionState(createReservationAction, initialState);

  const inputClass =
    "w-full bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2.5 text-sm text-brand-black placeholder:text-neutral-400 outline-none focus:border-brand-gold transition-colors";

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-center text-center gap-2 p-6 rounded-xl bg-green-50 border border-green-200">
        <CheckCircle2 size={28} className="text-green-600" />
        <p className="text-sm font-medium text-green-800">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-3">
      <input type="hidden" name="vehicleId" value={vehicleId} />

      {state.status === "error" && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
          <AlertCircle size={16} className="shrink-0" />
          {state.message}
        </div>
      )}

      <input name="fullName" type="text" required placeholder="Nom complet" className={inputClass} />
      <input name="phone" type="tel" required placeholder="Téléphone" className={inputClass} />
      <input name="city" type="text" placeholder="Ville (optionnel)" className={inputClass} />
      <input name="preferredDate" type="date" className={inputClass} />
      <textarea
        name="message"
        rows={3}
        placeholder="Message (optionnel)"
        className={inputClass}
      />

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-brand-gold text-brand-black font-semibold text-sm py-3 rounded-lg hover:bg-brand-gold-soft transition-colors disabled:opacity-60"
      >
        {isPending ? "Envoi en cours..." : "Envoyer la demande"}
      </button>
    </form>
  );
}
