import { z } from "zod";
import {
  vehicleConditionSchema,
  fuelTypeSchema,
  transmissionTypeSchema,
  vehicleCategorySchema,
} from "./vehicle.schema";

/**
 * Formulaire public « Vendre ma voiture » rempli par un particulier.
 * Reprend les caractéristiques du véhicule + les coordonnées du vendeur.
 * Le statut de modération et le paiement sont gérés côté serveur.
 */
export const sellerListingSchema = z.object({
  // Véhicule
  title: z.string().trim().min(3).max(120),
  brandId: z.string().min(1),
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

  // Vendeur
  sellerName: z.string().trim().min(2).max(80),
  sellerPhone: z.string().trim().min(7).max(20),
  sellerEmail: z.string().email().optional().or(z.literal("")),
});

export type SellerListingInput = z.infer<typeof sellerListingSchema>;
