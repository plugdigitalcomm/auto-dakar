"use server";

import { reservationInputSchema } from "@/lib/validations/reservation.schema";
import { PrismaReservationRepository } from "@/modules/reservations/infrastructure";
import { createReservation } from "@/modules/reservations/application";

export type ReservationActionState = {
  status: "idle" | "success" | "error";
  message?: string;
};

const repository = new PrismaReservationRepository();

export async function createReservationAction(
  _prevState: ReservationActionState,
  formData: FormData
): Promise<ReservationActionState> {
  const parsed = reservationInputSchema.safeParse({
    vehicleId: formData.get("vehicleId"),
    fullName: formData.get("fullName"),
    phone: formData.get("phone"),
    city: formData.get("city"),
    preferredDate: formData.get("preferredDate") || undefined,
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return { status: "error", message: "Merci de vérifier les informations saisies." };
  }

  try {
    await createReservation(repository, {
      vehicleId: parsed.data.vehicleId,
      fullName: parsed.data.fullName,
      phone: parsed.data.phone,
      city: parsed.data.city || undefined,
      preferredDate: parsed.data.preferredDate,
      message: parsed.data.message || undefined,
    });
    return { status: "success", message: "Votre demande a bien été envoyée. Nous vous contactons rapidement." };
  } catch {
    return { status: "error", message: "Une erreur est survenue. Merci de réessayer." };
  }
}
