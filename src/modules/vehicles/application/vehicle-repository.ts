import type { VehicleSearchFilters, VehicleSearchResult, VehicleWithRelations } from "@/types";

/**
 * Port (au sens Clean Architecture) implémenté par la couche infrastructure.
 * L'application ne dépend que de cette interface, jamais de Prisma directement.
 */
export interface VehicleRepository {
  findManyPublished(limit?: number): Promise<VehicleWithRelations[]>;
  findBySlug(slug: string): Promise<VehicleWithRelations | null>;
  search(filters: VehicleSearchFilters): Promise<VehicleSearchResult>;
  incrementViewCount(id: string): Promise<void>;
}
