"use server";

import { randomUUID } from "crypto";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { sellerListingSchema } from "@/lib/validations/seller.schema";
import { uploadSellerImages } from "@/lib/upload";
import { LISTING_FEE_XOF, isPaytechEnabled } from "@/lib/listing-config";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function createSellerListingAction(
  _prev: { error?: string } | undefined,
  formData: FormData
) {
  const raw = Object.fromEntries(formData.entries());

  const parsed = sellerListingSchema.safeParse({
    ...raw,
    isNegotiable: raw.isNegotiable === "on",
    hasAC: raw.hasAC === "on",
    hasGPS: raw.hasGPS === "on",
    hasRearCamera: raw.hasRearCamera === "on",
    power: raw.power || undefined,
    engineSize: raw.engineSize || undefined,
    seats: raw.seats || undefined,
  });

  if (!parsed.success) {
    const details = parsed.error.issues
      .map((i) => `${i.path.join(".") || "champ"} (${i.message})`)
      .join(", ");
    return { error: "Données invalides : " + details };
  }

  const d = parsed.data;

  // Vérifie que la marque existe
  const brand = await prisma.brand.findUnique({ where: { id: d.brandId } });
  if (!brand) return { error: "Marque invalide." };

  let uploadedUrls: string[] = [];
  try {
    uploadedUrls = await uploadSellerImages(formData);
  } catch {
    return { error: "L'envoi des photos a échoué. Réessayez ou contactez le support." };
  }

  const paymentPending = isPaytechEnabled();
  const slug = `${slugify(d.title)}-${d.city.toLowerCase().replace(/\s+/g, "-")}-${randomUUID().slice(0, 6)}`;

  const vehicle = await prisma.vehicle.create({
    data: {
      slug,
      title: d.title,
      brandId: d.brandId,
      model: d.model,
      year: d.year,
      condition: d.condition,
      category: d.category,
      price: d.price,
      isNegotiable: d.isNegotiable,
      mileage: d.mileage,
      fuelType: d.fuelType,
      transmission: d.transmission,
      color: d.color,
      power: d.power,
      engineSize: d.engineSize,
      seats: d.seats,
      hasAC: d.hasAC,
      hasGPS: d.hasGPS,
      hasRearCamera: d.hasRearCamera,
      description: d.description,
      city: d.city,
      status: "DISPONIBLE",
      source: "VENDEUR",
      // Sans PayTech : passe directement en modération. Avec PayTech : attend le paiement.
      moderationStatus: paymentPending ? "PAIEMENT_EN_ATTENTE" : "EN_MODERATION",
      sellerName: d.sellerName,
      sellerPhone: d.sellerPhone,
      sellerEmail: d.sellerEmail || null,
      images: {
        create: uploadedUrls.map((url, i) => ({ url, position: i })),
      },
    },
  });

  // Crée l'enregistrement de paiement (utile pour PayTech en Phase 2)
  const reference = `AD-${Date.now()}-${randomUUID().slice(0, 8)}`;
  await prisma.payment.create({
    data: {
      vehicleId: vehicle.id,
      amount: LISTING_FEE_XOF,
      currency: "XOF",
      status: paymentPending ? "EN_ATTENTE" : "PAYE",
      provider: "PAYTECH",
      reference,
      paidAt: paymentPending ? null : new Date(),
    },
  });

  revalidatePath("/admin/annonces");

  // Phase 2 : si PayTech actif, on redirigera vers l'URL de paiement PayTech ici.
  // Pour l'instant (Phase 1) on va directement à la page de confirmation.
  redirect(`/vendre/merci?ref=${reference}`);
}
