import type { VehicleSearchFilters, VehicleSearchResult, VehicleWithRelations } from "@/types";

/**
 * Port (au sens Clean Architecture) implémenté par la couche infrastructure.
 * L'application ne dépend que de cette interface, jamais de Prisma directement.
 */
export type VehicleAdminFilters = {
  page?: number;
  pageSize?: number;
  search?: string;
};

export type VehicleAdminResult = {
  items: VehicleWithRelations[];
  total: number;
  page: number;
  pageSize: number;
};

export type VehicleCreateInput = Omit<import("@prisma/client").Prisma.VehicleCreateInput, "brand" | "agent"> & {
  brandId: string;
  agentId?: string;
};

export interface VehicleRepository {
  findManyPublished(limit?: number): Promise<VehicleWithRelations[]>;
  findBySlug(slug: string): Promise<VehicleWithRelations | null>;
  search(filters: VehicleSearchFilters): Promise<VehicleSearchResult>;
  incrementViewCount(id: string): Promise<void>;
  findAllForAdmin(filters: VehicleAdminFilters): Promise<VehicleAdminResult>;
  findById(id: string): Promise<VehicleWithRelations | null>;
  create(data: VehicleCreateInput): Promise<VehicleWithRelations>;
  update(id: string, data: Partial<VehicleCreateInput>): Promise<VehicleWithRelations>;
  delete(id: string): Promise<void>;
}
