export const dynamic = "force-dynamic";

import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ListingModerationActions } from "@/components/admin/ListingModerationActions";

const MOD_LABELS: Record<string, { label: string; color: string }> = {
  PAIEMENT_EN_ATTENTE: { label: "Paiement en attente", color: "bg-yellow-500/20 text-yellow-300" },
  EN_MODERATION:       { label: "À valider",           color: "bg-blue-500/20 text-blue-300" },
  PUBLIE:              { label: "Publiée",             color: "bg-green-500/20 text-green-300" },
  REFUSE:              { label: "Refusée",             color: "bg-red-500/20 text-red-300" },
};

function formatXOF(n: number) {
  return new Intl.NumberFormat("fr-FR").format(n) + " XOF";
}

export default async function AnnoncesPage() {
  const listings = await prisma.vehicle.findMany({
    where: { source: "VENDEUR" },
    orderBy: { createdAt: "desc" },
    include: {
      brand: { select: { name: true } },
      images: { orderBy: { position: "asc" }, take: 1 },
      payments: { orderBy: { createdAt: "desc" }, take: 1 },
    },
  });

  const pending = listings.filter((l) => l.moderationStatus === "EN_MODERATION").length;

  return (
    <div className="p-8 flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">Annonces des vendeurs</h1>
        <p className="text-neutral-400 text-sm mt-1">
          {listings.length} annonce{listings.length !== 1 ? "s" : ""} · {pending} en attente de validation
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {listings.length === 0 && (
          <div className="rounded-xl border border-white/10 px-4 py-10 text-center text-neutral-500">
            Aucune annonce déposée par un vendeur pour l&apos;instant.
          </div>
        )}

        {listings.map((l) => {
          const s = MOD_LABELS[l.moderationStatus] ?? MOD_LABELS.EN_MODERATION;
          const payment = l.payments[0];
          const cover = l.images[0]?.url;
          return (
            <div key={l.id} className="rounded-xl border border-white/10 bg-white/[0.02] p-4 flex flex-col lg:flex-row gap-4">
              <div className="w-full lg:w-40 h-32 rounded-lg bg-neutral-800 overflow-hidden shrink-0">
                {cover ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={cover} alt={l.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-neutral-600 text-xs">Sans photo</div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <p className="text-white font-medium">{l.title}</p>
                    <p className="text-neutral-400 text-sm">{l.brand.name} · {l.year} · {formatXOF(Number(l.price))}</p>
                  </div>
                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${s.color}`}>{s.label}</span>
                </div>

                <div className="mt-2 text-xs text-neutral-500 flex flex-wrap gap-x-4 gap-y-1">
                  <span>Vendeur : <span className="text-neutral-300">{l.sellerName ?? "—"}</span></span>
                  <span>Tél : <span className="text-neutral-300">{l.sellerPhone ?? "—"}</span></span>
                  {l.sellerEmail && <span>Email : <span className="text-neutral-300">{l.sellerEmail}</span></span>}
                  <span>Ville : <span className="text-neutral-300">{l.city}</span></span>
                  <span>
                    Paiement :{" "}
                    <span className={payment?.status === "PAYE" ? "text-green-400" : "text-yellow-400"}>
                      {payment?.status === "PAYE" ? "Payé" : "En attente"}
                    </span>
                  </span>
                </div>

                {l.rejectionReason && (
                  <p className="mt-2 text-xs text-red-400">Motif du refus : {l.rejectionReason}</p>
                )}

                <div className="mt-3 flex items-center gap-3 flex-wrap">
                  <Link
                    href={`/admin/vehicules/${l.id}/modifier`}
                    className="text-xs text-neutral-400 hover:text-brand-gold underline underline-offset-2"
                  >
                    Voir / modifier
                  </Link>
                  {l.moderationStatus !== "PUBLIE" && <ListingModerationActions id={l.id} />}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
