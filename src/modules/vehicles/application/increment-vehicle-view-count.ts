import type { VehicleRepository } from "./vehicle-repository";

export function incrementVehicleViewCount(repository: VehicleRepository, vehicleId: string) {
  return repository.incrementViewCount(vehicleId);
}
