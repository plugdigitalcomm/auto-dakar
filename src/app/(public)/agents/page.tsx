export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, CheckCircle } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Nos agents partenaires | Auto Dakar",
  description: "Découvrez les garages et agents partenaires de confiance sur Auto Dakar au Sénégal.",
};

export default async function AgentsPage() {
  const agents = await prisma.agent.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { vehicles: true } } },
  });

  return (
    <main className="min-h-screen bg-neutral-950 pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-10">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white">Nos agents partenaires</h1>
          <p className="text-neutral-400 mt-2">{agents.length} partenaire{agents.length !== 1 ? "s" : ""} vérifiés au Sénégal</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <Link
              key={agent.id}
              href={`/agents/${agent.slug}`}
              className="group bg-neutral-900 border border-white/10 rounded-2xl overflow-hidden hover:border-primary/50 transition-all hover:-translate-y-0.5"
            >
              {agent.bannerUrl ? (
                <div className="relative h-28 w-full">
                  <Image src={agent.bannerUrl} alt={agent.name} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-neutral-900/80" />
                </div>
              ) : (
                <div className="h-28 w-full bg-gradient-to-br from-primary/20 to-neutral-800" />
              )}

              <div className="p-5 -mt-6 relative">
                {agent.logoUrl ? (
                  <div className="w-14 h-14 rounded-xl border-2 border-neutral-900 overflow-hidden bg-neutral-800 mb-3">
                    <Image src={agent.logoUrl} alt={agent.name} width={56} height={56} className="object-cover" />
                  </div>
                ) : (
                  <div className="w-14 h-14 rounded-xl border-2 border-neutral-900 bg-neutral-700 flex items-center justify-center mb-3">
                    <span className="text-white font-bold text-xl">{agent.name[0]}</span>
                  </div>
                )}

                <div className="flex items-start justify-between gap-2">
                  <h2 className="font-display font-semibold text-white group-hover:text-primary transition-colors">{agent.name}</h2>
                  {agent.isVerified && (
                    <CheckCircle size={16} className="text-primary shrink-0 mt-0.5" />
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-neutral-400 text-sm mt-1">
                  <MapPin size={13} />
                  <span>{agent.city}</span>
                </div>

                {agent.description && (
                  <p className="text-neutral-500 text-sm mt-2 line-clamp-2">{agent.description}</p>
                )}

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                  <div className="flex items-center gap-1.5 text-neutral-400 text-sm">
                    <Phone size={13} />
                    <span>{agent.phone}</span>
                  </div>
                  <span className="text-xs text-neutral-500">{agent._count.vehicles} véhicule{agent._count.vehicles !== 1 ? "s" : ""}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
