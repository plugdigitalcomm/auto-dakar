import { prisma } from "@/lib/prisma";
import type { Reservation, ReservationInput } from "@/types";
import type { ReservationRepository } from "../application/reservation-repository";

export class PrismaReservationRepository implements ReservationRepository {
  async create(input: ReservationInput): Promise<Reservation> {
    return prisma.reservation.create({
      data: {
        vehicleId: input.vehicleId,
        fullName: input.fullName,
        phone: input.phone,
        city: input.city,
        preferredDate: input.preferredDate,
        message: input.message,
      },
    });
  }
}
