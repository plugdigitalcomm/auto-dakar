import type { VehicleWithRelations } from "@/types";

/**
 * Statuts visibles dans le catalogue public.
 * RESERVE reste visible (l'utilisateur voit qu'une visite est en cours) ;
 * VENDU et ARCHIVE sont retirés de la consultation publique.
 */
export const PUBLICLY_VISIBLE_STATUSES = ["DISPONIBLE", "RESERVE"] as const;

export function isPubliclyVisible(vehicle: Pick<VehicleWithRelations, "status">): boolean {
  return (PUBLICLY_VISIBLE_STATUSES as readonly string[]).includes(vehicle.status);
}

export function isFromVerifiedAgent(vehicle: Pick<VehicleWithRelations, "agent">): boolean {
  return vehicle.agent?.isVerified === true;
}

export function hasNegotiableBadge(vehicle: Pick<VehicleWithRelations, "isNegotiable">): boolean {
  return vehicle.isNegotiable;
}

/** Image de couverture : la première par position, sinon aucune. */
export function getPrimaryImage(
  vehicle: Pick<VehicleWithRelations, "images">,
): VehicleWithRelations["images"][number] | null {
  if (vehicle.images.length === 0) return null;
  return [...vehicle.images].sort((a, b) => a.position - b.position)[0];
}
