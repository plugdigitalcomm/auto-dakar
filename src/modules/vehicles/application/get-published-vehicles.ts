import type { VehicleRepository } from "./vehicle-repository";

export function getPublishedVehicles(repository: VehicleRepository, limit?: number) {
  return repository.findManyPublished(limit);
}
