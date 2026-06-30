import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { PrismaVehicleRepository } from "@/modules/vehicles/infrastructure";
import { deleteVehicleAction, updateVehicleStatusAction } from "./actions";

const repository = new PrismaVehicleRepository();

const STATUS_LABELS: Record<string, string> = {
  DISPONIBLE: "Disponible",
  RESERVE: "Réservé",
  VENDU: "Vendu",
  ARCHIVE: "Archivé",
};

const STATUS_COLORS: Record<string, string> = {
  DISPONIBLE: "bg-green-500/10 text-green-400",
  RESERVE: "bg-yellow-500/10 text-yellow-400",
  VENDU: "bg-blue-500/10 text-blue-400",
  ARCHIVE: "bg-neutral-700 text-neutral-400",
};

const STATUS_OPTIONS = ["DISPONIBLE", "RESERVE", "VENDU", "ARCHIVE"] as const;

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
                  <form action={async (fd) => { "use server"; await updateVehicleStatusAction(vehicle.id, fd.get("status") as string); }}>
                    <select
                      name="status"
                      defaultValue={vehicle.status}
                      onChange={(e) => (e.target.form as HTMLFormElement).requestSubmit()}
                      className={`text-xs font-medium px-2 py-1 rounded-md border-0 outline-none cursor-pointer bg-transparent ${STATUS_COLORS[vehicle.status]}`}
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s} className="bg-neutral-800 text-white">{STATUS_LABELS[s]}</option>
                      ))}
                    </select>
                  </form>
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
                    <form action={async () => { "use server"; await deleteVehicleAction(vehicle.id); }}>
                      <button
                        type="submit"
                        className="px-3 py-1.5 rounded-lg bg-neutral-800 text-red-400 hover:bg-red-500/10 text-xs transition-colors"
                        onClick={(e) => { if (!confirm("Supprimer ce véhicule ?")) e.preventDefault(); }}
                      >
                        Supprimer
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
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
