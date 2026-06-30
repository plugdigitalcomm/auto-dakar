"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function requireAdmin() {
  const session = await auth();
  if (!session) throw new Error("Non autorisé");
}

export async function toggleReviewPublishedAction(id: string, published: boolean) {
  await requireAdmin();
  await prisma.review.update({ where: { id }, data: { isPublished: published } });
  revalidatePath("/admin/avis");
}

export async function deleteReviewAction(id: string) {
  await requireAdmin();
  await prisma.review.delete({ where: { id } });
  revalidatePath("/admin/avis");
}
