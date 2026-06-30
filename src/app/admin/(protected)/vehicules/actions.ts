"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { vehicleInputSchema, vehicleStatusSchema } from "@/lib/validations/vehicle.schema";
import { PrismaVehicleRepository } from "@/modules/vehicles/infrastructure";

const repository = new PrismaVehicleRepository();

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

async function requireAdmin() {
  const session = await auth();
  if (!session) throw new Error("Non autorisé");
}

export async function createVehicleAction(_prev: { error?: string } | undefined, formData: FormData) {
  await requireAdmin();

  const raw = Object.fromEntries(formData.entries());

  const parsed = vehicleInputSchema.safeParse({
    ...raw,
    isNegotiable: raw.isNegotiable === "on",
    hasAC: raw.hasAC === "on",
    hasGPS: raw.hasGPS === "on",
    hasRearCamera: raw.hasRearCamera === "on",
    agentId: raw.agentId || undefined,
    power: raw.power || undefined,
    engineSize: raw.engineSize || undefined,
    seats: raw.seats || undefined,
    videoUrl: raw.videoUrl || undefined,
  });

  if (!parsed.success) {
    return { error: "Données invalides : " + parsed.error.issues.map((i) => i.message).join(", ") };
  }

  const d = parsed.data;
  const slug = `${slugify(d.title)}-${d.city.toLowerCase().replace(/\s+/g, "-")}`;

  const imagesRaw = (raw.imageUrls as string ?? "").split("\n").map((u) => u.trim()).filter(Boolean);

  const vehicle = await repository.create({
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
    latitude: d.latitude,
    longitude: d.longitude,
    status: d.status,
    agentId: d.agentId,
    videoUrl: d.videoUrl,
    images: {
      create: imagesRaw.map((url, i) => ({ url, position: i })),
    },
  } as Parameters<typeof repository.create>[0]);

  revalidatePath("/admin/vehicules");
  revalidatePath("/catalogue");
  redirect(`/admin/vehicules/${vehicle.id}/modifier`);
}

export async function updateVehicleAction(id: string, _prev: { error?: string } | undefined, formData: FormData) {
  await requireAdmin();

  const raw = Object.fromEntries(formData.entries());

  const parsed = vehicleInputSchema.safeParse({
    ...raw,
    isNegotiable: raw.isNegotiable === "on",
    hasAC: raw.hasAC === "on",
    hasGPS: raw.hasGPS === "on",
    hasRearCamera: raw.hasRearCamera === "on",
    agentId: raw.agentId || undefined,
    power: raw.power || undefined,
    engineSize: raw.engineSize || undefined,
    seats: raw.seats || undefined,
    videoUrl: raw.videoUrl || undefined,
  });

  if (!parsed.success) {
    return { error: "Données invalides : " + parsed.error.issues.map((i) => i.message).join(", ") };
  }

  const d = parsed.data;

  await repository.update(id, {
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
    latitude: d.latitude,
    longitude: d.longitude,
    status: d.status,
    agentId: d.agentId,
    videoUrl: d.videoUrl,
  });

  revalidatePath("/admin/vehicules");
  revalidatePath("/catalogue");
  revalidatePath(`/vehicule`);
  redirect("/admin/vehicules");
}

export async function deleteVehicleAction(id: string) {
  await requireAdmin();
  await repository.delete(id);
  revalidatePath("/admin/vehicules");
  revalidatePath("/catalogue");
}

export async function updateVehicleStatusAction(id: string, status: string) {
  await requireAdmin();
  const parsed = vehicleStatusSchema.safeParse(status);
  if (!parsed.success) return;
  await repository.update(id, { status: parsed.data });
  revalidatePath("/admin/vehicules");
  revalidatePath("/catalogue");
}
