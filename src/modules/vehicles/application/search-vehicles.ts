import type { VehicleSearchFilters } from "@/types";
import type { VehicleRepository } from "./vehicle-repository";

export function searchVehicles(repository: VehicleRepository, filters: VehicleSearchFilters) {
  return repository.search(filters);
}
