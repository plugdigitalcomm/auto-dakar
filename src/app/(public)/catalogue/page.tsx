export const dynamic = "force-dynamic";

import { SearchX } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { PrismaVehicleRepository } from "@/modules/vehicles/infrastructure";
import { searchVehicles } from "@/modules/vehicles/application";
import { vehicleSearchFiltersSchema } from "@/lib/validations/vehicle.schema";
import { VehicleCard } from "@/components/vehicle-card/VehicleCard";
import { CatalogueFilters } from "@/components/catalogue/CatalogueFilters";
import { Pagination } from "@/components/catalogue/Pagination";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catalogue — AutoDakar",
  description: "Parcourez toutes les voitures neuves et d'occasion disponibles au Sénégal.",
};

const repository = new PrismaVehicleRepository();

interface CataloguePageProps {
  searchParams: Promise<Record<string, string | undefined>>;
}

export default async function CataloguePage({ searchParams }: CataloguePageProps) {
  const rawParams = await searchParams;
  const parsed = vehicleSearchFiltersSchema.safeParse(rawParams);
  const filters = parsed.success ? parsed.data : { page: 1, pageSize: 12 };

  const [{ items, total, page, pageSize }, brands] = await Promise.all([
    searchVehicles(repository, filters),
    prisma.brand.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <SectionTitle
        label="Catalogue"
        title="Toutes les voitures disponibles"
        subtitle={`${total} véhicule${total > 1 ? "s" : ""} correspondant à votre recherche.`}
        className="mb-8"
      />

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
        <CatalogueFilters brands={brands} />

        <div>
          {items.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {items.map((vehicle) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} />
                ))}
              </div>
              <Pagination page={page} pageSize={pageSize} total={total} searchParams={rawParams} />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center gap-3 py-24 text-center">
              <SearchX size={40} className="text-neutral-300" />
              <p className="text-neutral-500 font-medium">Aucun véhicule ne correspond à ces critères.</p>
              <p className="text-sm text-neutral-400">Essayez d&apos;élargir vos filtres de recherche.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
