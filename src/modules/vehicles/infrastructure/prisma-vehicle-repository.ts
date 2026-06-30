import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import type { VehicleSearchFilters, VehicleSearchResult, VehicleWithRelations } from "@/types";
import { PUBLICLY_VISIBLE_STATUSES } from "../domain/vehicle-rules";
import type { VehicleAdminFilters, VehicleAdminResult, VehicleCreateInput, VehicleRepository } from "../application/vehicle-repository";

const VEHICLE_INCLUDE = {
  brand: true,
  agent: true,
  images: true,
} satisfies Prisma.VehicleInclude;

const DEFAULT_PAGE_SIZE = 12;

function buildSearchWhere(filters: VehicleSearchFilters): Prisma.VehicleWhereInput {
  return {
    status: { in: [...PUBLICLY_VISIBLE_STATUSES] },
    brandId: filters.brandId,
    model: filters.model ? { contains: filters.model, mode: "insensitive" } : undefined,
    city: filters.city ? { equals: filters.city, mode: "insensitive" } : undefined,
    condition: filters.condition,
    category: filters.category,
    transmission: filters.transmission,
    fuelType: filters.fuelType,
    year:
      filters.yearMin !== undefined || filters.yearMax !== undefined
        ? { gte: filters.yearMin, lte: filters.yearMax }
        : undefined,
    mileage: filters.mileageMax !== undefined ? { lte: filters.mileageMax } : undefined,
    price:
      filters.priceMin !== undefined || filters.priceMax !== undefined
        ? { gte: filters.priceMin, lte: filters.priceMax }
        : undefined,
    agent: filters.verifiedOnly ? { isVerified: true } : undefined,
  };
}

export class PrismaVehicleRepository implements VehicleRepository {
  async findManyPublished(limit = DEFAULT_PAGE_SIZE): Promise<VehicleWithRelations[]> {
    return prisma.vehicle.findMany({
      where: { status: { in: [...PUBLICLY_VISIBLE_STATUSES] } },
      include: VEHICLE_INCLUDE,
      orderBy: { createdAt: "desc" },
      take: limit,
    });
  }

  async findBySlug(slug: string): Promise<VehicleWithRelations | null> {
    return prisma.vehicle.findFirst({
      where: { slug, status: { in: [...PUBLICLY_VISIBLE_STATUSES] } },
      include: VEHICLE_INCLUDE,
    });
  }

  async search(filters: VehicleSearchFilters): Promise<VehicleSearchResult> {
    const page = filters.page ?? 1;
    const pageSize = filters.pageSize ?? DEFAULT_PAGE_SIZE;
    const where = buildSearchWhere(filters);

    const [items, total] = await Promise.all([
      prisma.vehicle.findMany({
        where,
        include: VEHICLE_INCLUDE,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.vehicle.count({ where }),
    ]);

    return { items, total, page, pageSize };
  }

  async incrementViewCount(id: string): Promise<void> {
    await prisma.vehicle.update({
      where: { id },
      data: { viewCount: { increment: 1 } },
    });
  }

  async findAllForAdmin(filters: VehicleAdminFilters): Promise<VehicleAdminResult> {
    const page = filters.page ?? 1;
    const pageSize = filters.pageSize ?? 20;
    const where: Prisma.VehicleWhereInput = filters.search
      ? { title: { contains: filters.search, mode: "insensitive" } }
      : {};

    const [items, total] = await Promise.all([
      prisma.vehicle.findMany({
        where,
        include: VEHICLE_INCLUDE,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.vehicle.count({ where }),
    ]);

    return { items, total, page, pageSize };
  }

  async findById(id: string): Promise<VehicleWithRelations | null> {
    return prisma.vehicle.findUnique({ where: { id }, include: VEHICLE_INCLUDE });
  }

  async create(data: VehicleCreateInput): Promise<VehicleWithRelations> {
    const { brandId, agentId, ...rest } = data;
    return prisma.vehicle.create({
      data: {
        ...rest,
        brand: { connect: { id: brandId } },
        ...(agentId && { agent: { connect: { id: agentId } } }),
      },
      include: VEHICLE_INCLUDE,
    });
  }

  async update(id: string, data: Partial<VehicleCreateInput>): Promise<VehicleWithRelations> {
    const { brandId, agentId, ...rest } = data;
    return prisma.vehicle.update({
      where: { id },
      data: {
        ...rest,
        ...(brandId && { brand: { connect: { id: brandId } } }),
        ...(agentId !== undefined && {
          agent: agentId ? { connect: { id: agentId } } : { disconnect: true },
        }),
      },
      include: VEHICLE_INCLUDE,
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.vehicle.delete({ where: { id } });
  }
}
