import type { VehicleStatus } from "@prisma/client";

/** Une réservation ne peut être demandée que pour un véhicule encore disponible. */
const RESERVABLE_STATUSES: readonly VehicleStatus[] = ["DISPONIBLE"];

export function isVehicleReservable(status: VehicleStatus): boolean {
  return RESERVABLE_STATUSES.includes(status);
}
