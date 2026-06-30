export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { ReportActions } from "@/components/admin/ReportActions";

const REASON_LABELS: Record<string, string> = {
  PRIX_INCORRECT:  "Prix incorrect",
  VEHICULE_VENDU:  "Véhicule déjà vendu",
  INFOS_FAUSSES:   "Informations fausses",
  SUSPICION_FRAUDE: "Suspicion de fraude",
  AUTRE:           "Autre",
};

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  EN_ATTENTE: { label: "En attente", color: "bg-yellow-500/20 text-yellow-300" },
  TRAITE:     { label: "Traité",     color: "bg-green-500/20 text-green-300" },
  REJETE:     { label: "Rejeté",     color: "bg-red-500/20 text-red-300" },
};

export default async function SignalementsPage() {
  const reports = await prisma.report.findMany({
    orderBy: { createdAt: "desc" },
    include: { vehicle: { select: { title: true, slug: true } } },
  });

  return (
    <div className="p-8 flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">Signalements</h1>
        <p className="text-neutral-400 text-sm mt-1">{reports.length} signalement{reports.length !== 1 ? "s" : ""} au total</p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-neutral-400 text-xs uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3 text-left">Véhicule</th>
              <th className="px-4 py-3 text-left">Motif</th>
              <th className="px-4 py-3 text-left">Détails</th>
              <th className="px-4 py-3 text-left">Statut</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {reports.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-neutral-500">Aucun signalement</td>
              </tr>
            )}
            {reports.map((rep) => {
              const s = STATUS_LABELS[rep.status] ?? STATUS_LABELS.EN_ATTENTE;
              return (
                <tr key={rep.id} className="hover:bg-white/3 transition-colors">
                  <td className="px-4 py-3 text-white">{rep.vehicle.title}</td>
                  <td className="px-4 py-3 text-neutral-300">{REASON_LABELS[rep.reason] ?? rep.reason}</td>
                  <td className="px-4 py-3 text-neutral-400 max-w-xs">
                    <p className="truncate">{rep.details ?? "—"}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${s.color}`}>{s.label}</span>
                  </td>
                  <td className="px-4 py-3 text-neutral-500 text-xs">
                    {new Date(rep.createdAt).toLocaleDateString("fr-FR")}
                  </td>
                  <td className="px-4 py-3">
                    <ReportActions id={rep.id} current={rep.status} />
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
