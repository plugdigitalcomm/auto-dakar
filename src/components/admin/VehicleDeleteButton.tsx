"use client";

import { deleteVehicleAction } from "@/app/admin/(protected)/vehicules/actions";

export function VehicleDeleteButton({ id }: { id: string }) {
  return (
    <button
      type="button"
      onClick={async () => {
        if (confirm("Supprimer ce véhicule ?")) {
          await deleteVehicleAction(id);
        }
      }}
      className="px-3 py-1.5 rounded-lg bg-neutral-800 text-red-400 hover:bg-red-500/10 text-xs transition-colors"
    >
      Supprimer
    </button>
  );
}
