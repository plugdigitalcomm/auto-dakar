import { z } from "zod";

export const vehicleConditionSchema = z.enum(["NEUF", "OCCASION"]);
export const fuelTypeSchema = z.enum(["ESSENCE", "DIESEL", "HYBRIDE", "ELECTRIQUE"]);
export const transmissionTypeSchema = z.enum(["MANUELLE", "AUTOMATIQUE"]);
export const vehicleCategorySchema = z.enum([
  "SUV",
  "BERLINE",
  "PICKUP",
  "UTILITAIRE",
  "CITADINE",
  "COUPE",
  "MONOSPACE",
  "CABRIOLET",
]);
export const vehicleStatusSchema = z.enum(["DISPONIBLE", "RESERVE", "VENDU", "ARCHIVE"]);

/** Création/édition d'un véhicule depuis le dashboard admin. */
export const vehicleInputSchema = z.object({
  title: z.string().trim().min(3).max(120),
  brandId: z.string().cuid(),
  model: z.string().trim().min(1).max(60),
  year: z.coerce.number().int().min(1980).max(new Date().getFullYear() + 1),
  condition: vehicleConditionSchema,
  category: vehicleCategorySchema,
  price: z.coerce.number().positive().max(1_000_000_000),
  isNegotiable: z.boolean().default(false),
  mileage: z.coerce.number().int().min(0).default(0),
  fuelType: fuelTypeSchema,
  transmission: transmissionTypeSchema,
  color: z.string().trim().min(1).max(40),
  power: z.coerce.number().int().positive().optional(),
  engineSize: z.coerce.number().positive().optional(),
  seats: z.coerce.number().int().min(1).max(50).optional(),
  hasAC: z.boolean().default(false),
  hasGPS: z.boolean().default(false),
  hasRearCamera: z.boolean().default(false),
  description: z.string().trim().min(20).max(5000),
  city: z.string().trim().min(1).max(80),
  latitude: z.coerce.number().min(-90).max(90).optional(),
  longitude: z.coerce.number().min(-180).max(180).optional(),
  status: vehicleStatusSchema.default("DISPONIBLE"),
  agentId: z.string().cuid().optional(),
  videoUrl: z.url().optional(),
});

export type VehicleInput = z.infer<typeof vehicleInputSchema>;

/** Filtres de la page Recherche avancée (et endpoint catalogue). */
export const vehicleSearchFiltersSchema = z.object({
  brandId: z.string().cuid().optional(),
  model: z.string().trim().min(1).max(60).optional(),
  priceMin: z.coerce.number().nonnegative().optional(),
  priceMax: z.coerce.number().positive().optional(),
  yearMin: z.coerce.number().int().min(1980).optional(),
  yearMax: z.coerce.number().int().max(new Date().getFullYear() + 1).optional(),
  mileageMax: z.coerce.number().int().nonnegative().optional(),
  transmission: transmissionTypeSchema.optional(),
  fuelType: fuelTypeSchema.optional(),
  city: z.string().trim().min(1).max(80).optional(),
  condition: vehicleConditionSchema.optional(),
  category: vehicleCategorySchema.optional(),
  verifiedOnly: z.coerce.boolean().optional(),
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().min(1).max(48).default(12),
});

export type VehicleSearchFiltersInput = z.infer<typeof vehicleSearchFiltersSchema>;
