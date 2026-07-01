export const dynamic = "force-dynamic";

import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { PrismaVehicleRepository } from "@/modules/vehicles/infrastructure";
import { VehicleStatusSelect } from "@/components/admin/VehicleStatusSelect";
import { VehicleDeleteButton } from "@/components/admin/VehicleDeleteButton";

const repository = new PrismaVehicleRepository();

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function AdminVehiculesPage({ searchParams }: PageProps) {
  const { page: pageStr } = await searchParams;
  const page = Math.max(1, parseInt(pageStr ?? "1", 10));

  const { items, total, pageSize } = await repository.findAllForAdmin({ page, pageSize: 20 });
  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="p-8 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Véhicules</h1>
          <p className="text-neutral-400 text-sm mt-1">{total} véhicule{total > 1 ? "s" : ""} au total</p>
        </div>
        <Link
          href="/admin/vehicules/nouveau"
          className="flex items-center gap-2 px-4 py-2.5 bg-brand-gold text-brand-black font-semibold text-sm rounded-lg hover:bg-brand-gold-soft transition-colors"
        >
          <Plus size={16} />
          Ajouter un véhicule
        </Link>
      </div>

      <div className="rounded-xl border border-neutral-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-800 bg-neutral-900/60">
              <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wide text-neutral-500">Véhicule</th>
              <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wide text-neutral-500 hidden sm:table-cell">Marque</th>
              <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wide text-neutral-500 hidden md:table-cell">Prix</th>
              <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wide text-neutral-500">Statut</th>
              <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wide text-neutral-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800">
            {items.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-neutral-500">Aucun véhicule</td>
              </tr>
            )}
            {items.map((vehicle) => (
              <tr key={vehicle.id} className="bg-neutral-900 hover:bg-neutral-800/50 transition-colors">
                <td className="px-4 py-3">
                  <p className="font-medium text-white truncate max-w-[200px]">{vehicle.title}</p>
                  <p className="text-xs text-neutral-500 mt-0.5">{vehicle.year} · {vehicle.city}</p>
                </td>
                <td className="px-4 py-3 text-neutral-400 hidden sm:table-cell">{vehicle.brand.name}</td>
                <td className="px-4 py-3 text-neutral-300 hidden md:table-cell">
                  {new Intl.NumberFormat("fr-FR", { style: "currency", currency: "XOF", maximumFractionDigits: 0 }).format(
                    typeof vehicle.price === "number" ? vehicle.price : vehicle.price.toNumber()
                  )}
                </td>
                <td className="px-4 py-3">
                  <VehicleStatusSelect id={vehicle.id} current={vehicle.status} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/vehicules/${vehicle.id}/modifier`}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-700 text-xs transition-colors"
                    >
                      <Pencil size={12} />
                      Modifier
                    </Link>
                    <VehicleDeleteButton id={vehicle.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={`/admin/vehicules?page=${p}`}
              className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm ${
                p === page ? "bg-brand-gold text-brand-black font-bold" : "bg-neutral-800 text-neutral-400 hover:text-white"
              }`}
            >
              {p}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
