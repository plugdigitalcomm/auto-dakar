"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function requireAdmin() {
  const session = await auth();
  if (!session) throw new Error("Non autorisé");
}

export async function updateReportStatusAction(id: string, status: "TRAITE" | "REJETE" | "EN_ATTENTE") {
  await requireAdmin();
  await prisma.report.update({ where: { id }, data: { status } });
  revalidatePath("/admin/signalements");
}
