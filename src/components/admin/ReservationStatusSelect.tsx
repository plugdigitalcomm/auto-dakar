"use client";

import { updateReservationStatusAction } from "@/app/admin/(protected)/reservations/actions";

interface Props {
  id: string;
  current: string;
}

const OPTIONS = [
  { value: "NOUVELLE",  label: "Nouvelle" },
  { value: "CONTACTEE", label: "Contactée" },
  { value: "CONFIRMEE", label: "Confirmée" },
  { value: "ANNULEE",   label: "Annulée" },
];

export function ReservationStatusSelect({ id, current }: Props) {
  return (
    <select
      defaultValue={current}
      onChange={(e) => updateReservationStatusAction(id, e.target.value)}
      className="mt-1 text-xs bg-neutral-800 border border-white/10 rounded px-2 py-1 text-neutral-300 focus:outline-none focus:ring-1 focus:ring-primary"
    >
      {OPTIONS.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  );
}
