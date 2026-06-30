export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail, CheckCircle, MessageCircle } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { VehicleCard } from "@/components/vehicle-card/VehicleCard";
import type { VehicleWithRelations } from "@/types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const agent = await prisma.agent.findUnique({ where: { slug } });
  if (!agent) return {};
  return {
    title: `${agent.name} — Agent partenaire | Auto Dakar`,
    description: agent.description ?? `Découvrez les véhicules proposés par ${agent.name} sur Auto Dakar.`,
  };
}

export default async function AgentPage({ params }: PageProps) {
  const { slug } = await params;

  const agent = await prisma.agent.findUnique({
    where: { slug },
    include: {
      vehicles: {
        where: { status: "DISPONIBLE" },
        orderBy: { createdAt: "desc" },
        include: {
          images: { orderBy: { position: "asc" }, take: 1 },
          brand: true,
          agent: true,
        },
      },
    },
  });

  if (!agent) notFound();

  const whatsappUrl = agent.whatsapp
    ? `https://wa.me/${agent.whatsapp.replace(/\D/g, "")}`
    : null;

  return (
    <main className="min-h-screen bg-neutral-950 pt-20 pb-16">
      {/* Banner */}
      <div className="relative h-48 md:h-64 w-full bg-gradient-to-br from-primary/30 to-neutral-800">
        {agent.bannerUrl && (
          <Image src={agent.bannerUrl} alt={agent.name} fill className="object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-neutral-950" />
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-12 relative">
        {/* Header card */}
        <div className="bg-neutral-900 border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row md:items-start gap-5 mb-10">
          {/* Logo */}
          <div className="w-20 h-20 rounded-xl border-2 border-neutral-800 overflow-hidden bg-neutral-700 shrink-0 flex items-center justify-center">
            {agent.logoUrl ? (
              <Image src={agent.logoUrl} alt={agent.name} width={80} height={80} className="object-cover" />
            ) : (
              <span className="text-white font-bold text-3xl">{agent.name[0]}</span>
            )}
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className="font-display text-2xl font-bold text-white">{agent.name}</h1>
              {agent.isVerified && (
                <span className="flex items-center gap-1 text-xs text-primary bg-primary/10 border border-primary/20 rounded-full px-2 py-0.5">
                  <CheckCircle size={11} /> Partenaire vérifié
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5 text-neutral-400 text-sm mb-3">
              <MapPin size={13} />
              <span>{agent.city}{agent.address ? ` — ${agent.address}` : ""}</span>
            </div>

            {agent.description && (
              <p className="text-neutral-300 text-sm leading-relaxed mb-4">{agent.description}</p>
            )}

            {/* Contacts */}
            <div className="flex flex-wrap gap-3">
              <a
                href={`tel:${agent.phone}`}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-neutral-950 font-medium text-sm hover:bg-primary/90 transition-colors"
              >
                <Phone size={14} /> {agent.phone}
              </a>
              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-600 text-white font-medium text-sm hover:bg-green-500 transition-colors"
                >
                  <MessageCircle size={14} /> WhatsApp
                </a>
              )}
              {agent.email && (
                <a
                  href={`mailto:${agent.email}`}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-neutral-300 text-sm hover:border-white/30 hover:text-white transition-colors"
                >
                  <Mail size={14} /> {agent.email}
                </a>
              )}
            </div>
          </div>

          <div className="md:text-right">
            <p className="text-neutral-500 text-sm">Véhicules disponibles</p>
            <p className="font-display text-3xl font-bold text-white">{agent.vehicles.length}</p>
          </div>
        </div>

        {/* Vehicles grid */}
        <h2 className="font-display text-xl font-bold text-white mb-5">
          Véhicules de {agent.name}
        </h2>

        {agent.vehicles.length === 0 ? (
          <div className="text-center py-16 text-neutral-500">
            <p>Aucun véhicule disponible pour le moment.</p>
            <Link href="/catalogue" className="mt-4 inline-block text-primary hover:underline text-sm">
              Voir tout le catalogue →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(agent.vehicles as unknown as VehicleWithRelations[]).map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
