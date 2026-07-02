"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function requireAdmin() {
  const session = await auth();
  if (!session) throw new Error("Non autorisé");
}

export async function approveListingAction(id: string) {
  await requireAdmin();
  await prisma.vehicle.update({
    where: { id },
    data: { moderationStatus: "PUBLIE", rejectionReason: null },
  });
  revalidatePath("/admin/annonces");
  revalidatePath("/catalogue");
}

export async function rejectListingAction(id: string, reason: string) {
  await requireAdmin();
  await prisma.vehicle.update({
    where: { id },
    data: { moderationStatus: "REFUSE", rejectionReason: reason || null },
  });
  revalidatePath("/admin/annonces");
  revalidatePath("/catalogue");
}
