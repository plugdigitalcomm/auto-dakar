export type { Reservation, ReservationStatus } from "@prisma/client";

export type ReservationInput = {
  vehicleId: string;
  fullName: string;
  phone: string;
  city?: string;
  preferredDate?: Date;
  message?: string;
};
