import type { VehicleRepository } from "./vehicle-repository";

export function getVehicleBySlug(repository: VehicleRepository, slug: string) {
  return repository.findBySlug(slug);
}
