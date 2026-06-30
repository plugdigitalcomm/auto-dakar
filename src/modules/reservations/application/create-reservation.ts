import type { ReservationInput } from "@/types";
import type { ReservationRepository } from "./reservation-repository";

export function createReservation(repository: ReservationRepository, input: ReservationInput) {
  return repository.create(input);
}
