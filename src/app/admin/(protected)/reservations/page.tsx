export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { ReservationStatusSelect } from "@/components/admin/ReservationStatusSelect";

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  NOUVELLE:  { label: "Nouvelle",  color: "bg-blue-500/20 text-blue-300" },
  CONTACTEE: { label: "Contactée", color: "bg-yellow-500/20 text-yellow-300" },
  CONFIRMEE: { label: "Confirmée", color: "bg-green-500/20 text-green-300" },
  ANNULEE:   { label: "Annulée",   color: "bg-red-500/20 text-red-300" },
};

export default async function ReservationsPage() {
  const reservations = await prisma.reservation.findMany({
    orderBy: { createdAt: "desc" },
    include: { vehicle: { select: { title: true, slug: true } } },
  });

  return (
    <div className="p-8 flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">Réservations</h1>
        <p className="text-neutral-400 text-sm mt-1">{reservations.length} demande{reservations.length !== 1 ? "s" : ""} au total</p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-neutral-400 text-xs uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3 text-left">Contact</th>
              <th className="px-4 py-3 text-left">Véhicule</th>
              <th className="px-4 py-3 text-left">Date souhaitée</th>
              <th className="px-4 py-3 text-left">Ville</th>
              <th className="px-4 py-3 text-left">Statut</th>
              <th className="px-4 py-3 text-left">Reçue le</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {reservations.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-neutral-500">Aucune réservation</td>
              </tr>
            )}
            {reservations.map((r) => {
              const s = STATUS_LABELS[r.status] ?? STATUS_LABELS.NOUVELLE;
              return (
                <tr key={r.id} className="hover:bg-white/3 transition-colors">
                  <td className="px-4 py-3">
                    <p className="text-white font-medium">{r.fullName}</p>
                    <p className="text-neutral-400">{r.phone}</p>
                    {r.message && <p className="text-neutral-500 text-xs mt-1 max-w-xs truncate">{r.message}</p>}
                  </td>
                  <td className="px-4 py-3 text-neutral-300">{r.vehicle.title}</td>
                  <td className="px-4 py-3 text-neutral-400">
                    {r.preferredDate ? new Date(r.preferredDate).toLocaleDateString("fr-FR") : "—"}
                  </td>
                  <td className="px-4 py-3 text-neutral-400">{r.city ?? "—"}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${s.color} mb-1`}>{s.label}</span>
                    <ReservationStatusSelect id={r.id} current={r.status} />
                  </td>
                  <td className="px-4 py-3 text-neutral-500 text-xs">
                    {new Date(r.createdAt).toLocaleDateString("fr-FR")}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
