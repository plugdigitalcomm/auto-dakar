"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function requireAdmin() {
  const session = await auth();
  if (!session) throw new Error("Non autorisé");
}

const VALID_STATUSES = ["NOUVELLE", "CONTACTEE", "CONFIRMEE", "ANNULEE"] as const;

export async function updateReservationStatusAction(id: string, status: string) {
  await requireAdmin();
  if (!VALID_STATUSES.includes(status as (typeof VALID_STATUSES)[number])) return;
  await prisma.reservation.update({
    where: { id },
    data: { status: status as (typeof VALID_STATUSES)[number] },
  });
  revalidatePath("/admin/reservations");
}

export async function updateReservationNoteAction(id: string, _prev: { error?: string } | undefined, formData: FormData) {
  await requireAdmin();
  const note = (formData.get("adminNote") as string | null) ?? "";
  await prisma.reservation.update({ where: { id }, data: { adminNote: note } });
  revalidatePath("/admin/reservations");
  return {};
}
