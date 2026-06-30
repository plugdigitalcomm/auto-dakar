import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { PrismaVehicleRepository } from "@/modules/vehicles/infrastructure";
import { VehicleForm } from "@/components/admin/VehicleForm";
import { updateVehicleAction } from "../../actions";

const repository = new PrismaVehicleRepository();

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ModifierVehiculePage({ params }: PageProps) {
  const { id } = await params;
  const [vehicle, brands, agents] = await Promise.all([
    repository.findById(id),
    prisma.brand.findMany({ orderBy: { name: "asc" } }),
    prisma.agent.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!vehicle) notFound();

  const boundAction = updateVehicleAction.bind(null, id);

  return (
    <div className="p-8 flex flex-col gap-6">
      <div>
        <Link href="/admin/vehicules" className="flex items-center gap-1 text-sm text-neutral-400 hover:text-white mb-4 transition-colors">
          <ChevronLeft size={14} /> Retour à la liste
        </Link>
        <h1 className="font-display text-2xl font-bold text-white">Modifier un véhicule</h1>
        <p className="text-neutral-400 text-sm mt-1">{vehicle.title}</p>
      </div>
      <VehicleForm action={boundAction} brands={brands} agents={agents} vehicle={vehicle} submitLabel="Sauvegarder les modifications" />
    </div>
  );
}
