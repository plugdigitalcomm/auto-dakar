"use client";

import { updateVehicleStatusAction } from "@/app/admin/(protected)/vehicules/actions";

const STATUS_LABELS: Record<string, string> = {
  DISPONIBLE: "Disponible",
  RESERVE: "Réservé",
  VENDU: "Vendu",
  ARCHIVE: "Archivé",
};

const STATUS_COLORS: Record<string, string> = {
  DISPONIBLE: "bg-green-500/10 text-green-400",
  RESERVE: "bg-yellow-500/10 text-yellow-400",
  VENDU: "bg-blue-500/10 text-blue-400",
  ARCHIVE: "bg-neutral-700 text-neutral-400",
};

const STATUS_OPTIONS = ["DISPONIBLE", "RESERVE", "VENDU", "ARCHIVE"] as const;

export function VehicleStatusSelect({ id, current }: { id: string; current: string }) {
  return (
    <select
      defaultValue={current}
      onChange={(e) => updateVehicleStatusAction(id, e.target.value)}
      className={`text-xs font-medium px-2 py-1 rounded-md border-0 outline-none cursor-pointer bg-transparent ${STATUS_COLORS[current]}`}
    >
      {STATUS_OPTIONS.map((s) => (
        <option key={s} value={s} className="bg-neutral-800 text-white">{STATUS_LABELS[s]}</option>
      ))}
    </select>
  );
}
