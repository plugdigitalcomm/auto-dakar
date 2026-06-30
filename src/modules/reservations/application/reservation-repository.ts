import type { Reservation, ReservationInput } from "@/types";

/**
 * Port (au sens Clean Architecture) implémenté par la couche infrastructure.
 * L'application ne dépend que de cette interface, jamais de Prisma directement.
 */
export interface ReservationRepository {
  create(input: ReservationInput): Promise<Reservation>;
}
