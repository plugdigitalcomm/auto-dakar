export const dynamic = "force-dynamic";

import Link from "next/link";
import { Phone, CheckCircle, ArrowRight, ChevronRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { VehicleCard } from "@/components/vehicle-card/VehicleCard";
import { SearchBar } from "@/components/search-bar/SearchBar";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PUBLICLY_VISIBLE_STATUSES } from "@/modules/vehicles/domain";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AutoDakar — Voitures neuves et d'occasion au Sénégal",
  description:
    "Trouvez votre voiture idéale au Sénégal. SUV, berlines, pick-up neufs et d'occasion à Dakar, Thiès, Mbour et partout au Sénégal.",
};

async function getHomeData() {
  const [brands, recentVehicles, suvsVehicles, berlinesVehicles, agents] =
    await Promise.all([
      prisma.brand.findMany({ orderBy: { name: "asc" } }),
      prisma.vehicle.findMany({
        where: { status: { in: [...PUBLICLY_VISIBLE_STATUSES] } },
        include: { brand: true, agent: true, images: true },
        orderBy: { createdAt: "desc" },
        take: 8,
      }),
      prisma.vehicle.findMany({
        where: { status: { in: [...PUBLICLY_VISIBLE_STATUSES] }, category: "SUV" },
        include: { brand: true, agent: true, images: true },
        orderBy: { createdAt: "desc" },
        take: 4,
      }),
      prisma.vehicle.findMany({
        where: { status: { in: [...PUBLICLY_VISIBLE_STATUSES] }, category: "BERLINE" },
        include: { brand: true, agent: true, images: true },
        orderBy: { createdAt: "desc" },
        take: 4,
      }),
      prisma.agent.findMany({
        where: { isVerified: true },
        orderBy: { createdAt: "desc" },
        take: 4,
      }),
    ]);

  return { brands, recentVehicles, suvsVehicles, berlinesVehicles, agents };
}

export default async function HomePage() {
  const { brands, recentVehicles, suvsVehicles, berlinesVehicles, agents } =
    await getHomeData();

  return (
    <div className="flex flex-col">
      {/* ─── HERO ─── */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center bg-brand-black overflow-hidden">
        {/* Fond gradient premium */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-brand-black to-neutral-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(201,162,39,0.12),_transparent_60%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />

        <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 gap-8 max-w-5xl mx-auto">
          <Badge variant="gold" className="px-4 py-1.5 text-xs">
            🇸🇳 Plateforme #1 de vente de voitures au Sénégal
          </Badge>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
            Trouvez la voiture{" "}
            <span className="text-brand-gold">de vos rêves</span>
            <br className="hidden sm:block" /> au Sénégal
          </h1>

          <p className="text-lg text-neutral-400 max-w-xl leading-relaxed">
            Neuves ou d&apos;occasion, toutes vérifiées. Des centaines de véhicules
            à Dakar, Thiès, Mbour et partout au Sénégal.
          </p>

          <SearchBar brands={brands} />

          <div className="flex items-center gap-6 text-sm text-neutral-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle size={14} className="text-brand-gold" />
              Véhicules vérifiés
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle size={14} className="text-brand-gold" />
              Agents certifiés
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle size={14} className="text-brand-gold" />
              Zéro inscription
            </span>
          </div>
        </div>
      </section>

      {/* ─── MARQUES ─── */}
      {brands.length > 0 && (
        <section className="py-16 bg-brand-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle
              label="Nos marques"
              title="Toutes les grandes marques"
              align="center"
              className="mb-10"
            />
            <div className="flex flex-wrap justify-center gap-3">
              {brands.map((brand) => (
                <Link
                  key={brand.id}
                  href={`/catalogue?brandId=${brand.id}`}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl border border-neutral-200 bg-white hover:border-brand-gold hover:shadow-md transition-all duration-200 text-sm font-medium text-neutral-700 hover:text-brand-black"
                >
                  {brand.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── VÉHICULES RÉCENTS ─── */}
      {recentVehicles.length > 0 && (
        <section className="py-16 bg-neutral-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-10">
              <SectionTitle
                label="Dernières annonces"
                title="Véhicules récemment ajoutés"
                subtitle="Découvrez nos dernières arrivées, neuves et d'occasion."
              />
              <Button href="/catalogue" variant="ghost" className="hidden sm:flex gap-1">
                Voir tout <ChevronRight size={16} />
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {recentVehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
            <div className="mt-8 flex justify-center sm:hidden">
              <Button href="/catalogue" variant="outline">
                Voir toutes les annonces
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* ─── SUV ─── */}
      {suvsVehicles.length > 0 && (
        <section className="py-16 bg-brand-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-10">
              <SectionTitle label="Catégorie" title="SUV & 4x4" />
              <Button href="/catalogue?category=SUV" variant="ghost" className="hidden sm:flex gap-1">
                Voir tous les SUV <ChevronRight size={16} />
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {suvsVehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── BERLINES ─── */}
      {berlinesVehicles.length > 0 && (
        <section className="py-16 bg-neutral-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-10">
              <SectionTitle label="Catégorie" title="Berlines & Citadines" />
              <Button href="/catalogue?category=BERLINE" variant="ghost" className="hidden sm:flex gap-1">
                Voir toutes les berlines <ChevronRight size={16} />
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {berlinesVehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── AGENTS VÉRIFIÉS ─── */}
      {agents.length > 0 && (
        <section className="py-16 bg-brand-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle
              label="Partenaires"
              title="Garages & Agents vérifiés"
              subtitle="Des professionnels de confiance, sélectionnés et certifiés par AutoDakar."
              className="mb-10"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {agents.map((agent) => (
                <div
                  key={agent.id}
                  className="flex flex-col gap-3 p-5 rounded-2xl border border-neutral-200 hover:border-brand-gold/40 hover:shadow-lg transition-all duration-300 bg-white"
                >
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center text-xl font-bold text-neutral-400">
                      {agent.name.charAt(0)}
                    </div>
                    <Badge variant="green">✓ Vérifié</Badge>
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-brand-black">{agent.name}</h3>
                    <p className="text-sm text-neutral-500 mt-0.5">{agent.city}</p>
                  </div>
                  {agent.phone && (
                    <a
                      href={`tel:${agent.phone}`}
                      className="flex items-center gap-2 text-sm text-brand-gold font-medium hover:underline"
                    >
                      <Phone size={14} />
                      {agent.phone}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── CTA CONTACT ─── */}
      <section className="py-20 bg-brand-black">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center gap-6">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight">
            Vous avez une question ?<br />
            <span className="text-brand-gold">Contactez-nous directement.</span>
          </h2>
          <p className="text-neutral-400 text-base leading-relaxed max-w-lg">
            Notre équipe est disponible pour vous aider à trouver le véhicule qui correspond
            à vos besoins et à votre budget.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Button href="/contact" size="lg">
              Nous contacter
            </Button>
            <Button href="/catalogue" variant="outline" size="lg" className="border-neutral-700 text-neutral-300 hover:border-brand-gold hover:text-brand-gold">
              Voir le catalogue <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
