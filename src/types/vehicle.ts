import type { Vehicle, VehicleImage, Brand, Agent, Prisma } from "@prisma/client";

export type { VehicleCondition, FuelType, TransmissionType, VehicleCategory, VehicleStatus } from "@prisma/client";

/** Véhicule avec ses relations chargées, tel que retourné par le repository. */
export type VehicleWithRelations = Vehicle & {
  brand: Brand;
  agent: Agent | null;
  images: VehicleImage[];
};

/** Filtres de la recherche avancée, alignés sur les champs filtrables du modèle. */
export type VehicleSearchFilters = {
  brandId?: string;
  model?: string;
  priceMin?: number;
  priceMax?: number;
  yearMin?: number;
  yearMax?: number;
  mileageMax?: number;
  transmission?: Prisma.VehicleWhereInput["transmission"];
  fuelType?: Prisma.VehicleWhereInput["fuelType"];
  city?: string;
  condition?: Prisma.VehicleWhereInput["condition"];
  category?: Prisma.VehicleWhereInput["category"];
  verifiedOnly?: boolean;
  page?: number;
  pageSize?: number;
};

export type VehicleSearchResult = {
  items: VehicleWithRelations[];
  total: number;
  page: number;
  pageSize: number;
};
