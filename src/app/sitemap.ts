import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { PUBLICLY_VISIBLE_STATUSES } from "@/modules/vehicles/domain";

const BASE_URL = "https://autodakar.sn";

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  { url: BASE_URL, priority: 1.0, changeFrequency: "daily" },
  { url: `${BASE_URL}/catalogue`, priority: 0.9, changeFrequency: "daily" },
  { url: `${BASE_URL}/a-propos`, priority: 0.5, changeFrequency: "monthly" },
  { url: `${BASE_URL}/contact`, priority: 0.6, changeFrequency: "monthly" },
  { url: `${BASE_URL}/aide`, priority: 0.4, changeFrequency: "monthly" },
  { url: `${BASE_URL}/cgu`, priority: 0.2, changeFrequency: "yearly" },
  { url: `${BASE_URL}/confidentialite`, priority: 0.2, changeFrequency: "yearly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const vehicles = await prisma.vehicle.findMany({
    where: { status: { in: [...PUBLICLY_VISIBLE_STATUSES] } },
    select: { slug: true, updatedAt: true },
  });

  const vehicleRoutes: MetadataRoute.Sitemap = vehicles.map((v) => ({
    url: `${BASE_URL}/vehicule/${v.slug}`,
    lastModified: v.updatedAt,
    priority: 0.8,
    changeFrequency: "weekly",
  }));

  return [...STATIC_ROUTES, ...vehicleRoutes];
}
