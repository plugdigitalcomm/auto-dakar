import { z } from "zod";

/** Formulaire public de demande de réservation, depuis la fiche véhicule. */
export const reservationInputSchema = z.object({
  vehicleId: z.string().cuid(),
  fullName: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(8).max(20),
  city: z.string().trim().max(80).optional().or(z.literal("")),
  preferredDate: z.coerce.date().optional(),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
});

export type ReservationFormInput = z.infer<typeof reservationInputSchema>;
