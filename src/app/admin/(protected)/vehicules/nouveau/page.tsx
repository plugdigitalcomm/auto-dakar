import { prisma } from "@/lib/prisma";
import { VehicleForm } from "@/components/admin/VehicleForm";
import { createVehicleAction } from "../actions";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default async function NouveauVehiculePage() {
  const [brands, agents] = await Promise.all([
    prisma.brand.findMany({ orderBy: { name: "asc" } }),
    prisma.agent.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <div className="p-8 flex flex-col gap-6">
      <div>
        <Link href="/admin/vehicules" className="flex items-center gap-1 text-sm text-neutral-400 hover:text-white mb-4 transition-colors">
          <ChevronLeft size={14} /> Retour à la liste
        </Link>
        <h1 className="font-display text-2xl font-bold text-white">Ajouter un véhicule</h1>
      </div>
      <VehicleForm action={createVehicleAction} brands={brands} agents={agents} submitLabel="Publier le véhicule" />
    </div>
  );
}
