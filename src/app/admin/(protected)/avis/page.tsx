export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { ReviewToggle } from "@/components/admin/ReviewToggle";
import { ReviewDeleteButton } from "@/components/admin/ReviewDeleteButton";

export default async function AvisPage() {
  const reviews = await prisma.review.findMany({
    orderBy: { createdAt: "desc" },
    include: { vehicle: { select: { title: true } } },
  });

  return (
    <div className="p-8 flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">Avis clients</h1>
        <p className="text-neutral-400 text-sm mt-1">{reviews.length} avis au total</p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-neutral-400 text-xs uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3 text-left">Auteur</th>
              <th className="px-4 py-3 text-left">Véhicule</th>
              <th className="px-4 py-3 text-left">Note</th>
              <th className="px-4 py-3 text-left">Commentaire</th>
              <th className="px-4 py-3 text-left">Statut</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {reviews.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-neutral-500">Aucun avis</td>
              </tr>
            )}
            {reviews.map((r) => (
              <tr key={r.id} className="hover:bg-white/3 transition-colors">
                <td className="px-4 py-3 text-white font-medium">{r.authorName}</td>
                <td className="px-4 py-3 text-neutral-400">{r.vehicle?.title ?? "—"}</td>
                <td className="px-4 py-3">
                  <span className="text-yellow-400">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</span>
                </td>
                <td className="px-4 py-3 text-neutral-300 max-w-xs">
                  <p className="truncate">{r.comment}</p>
                </td>
                <td className="px-4 py-3">
                  <ReviewToggle id={r.id} published={r.isPublished} />
                </td>
                <td className="px-4 py-3 text-neutral-500 text-xs">
                  {new Date(r.createdAt).toLocaleDateString("fr-FR")}
                </td>
                <td className="px-4 py-3">
                  <ReviewDeleteButton id={r.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
