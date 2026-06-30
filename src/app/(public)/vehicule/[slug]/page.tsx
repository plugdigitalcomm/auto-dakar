export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Calendar, Gauge, Fuel, Settings2, Palette, Users, Zap,
  Snowflake, MapPin, Phone, CheckCircle,
} from "lucide-react";
import { PrismaVehicleRepository } from "@/modules/vehicles/infrastructure";
import { getVehicleBySlug, incrementVehicleViewCount } from "@/modules/vehicles/application";
import { hasNegotiableBadge } from "@/modules/vehicles/domain";
import { VehicleGallery } from "@/components/vehicle-detail/VehicleGallery";
import { ReservationForm } from "@/components/vehicle-detail/ReservationForm";
import { Badge } from "@/components/ui/Badge";
import type { Metadata } from "next";

const repository = new PrismaVehicleRepository();

const FUEL_LABELS: Record<string, string> = {
  ESSENCE: "Essence",
  DIESEL: "Diesel",
  HYBRIDE: "Hybride",
  ELECTRIQUE: "Électrique",
};

const TRANSMISSION_LABELS: Record<string, string> = {
  MANUELLE: "Manuelle",
  AUTOMATIQUE: "Automatique",
};

const CONDITION_LABELS: Record<string, string> = {
  NEUF: "Neuf",
  OCCASION: "Occasion",
};

function formatPrice(price: number | { toNumber: () => number }): string {
  const value = typeof price === "number" ? price : price.toNumber();
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "XOF",
    maximumFractionDigits: 0,
  }).format(value);
}

interface VehiclePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: VehiclePageProps): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = await getVehicleBySlug(repository, slug);
  if (!vehicle) return { title: "Véhicule introuvable — AutoDakar" };

  return {
    title: `${vehicle.title} — ${formatPrice(vehicle.price)} | AutoDakar`,
    description: vehicle.description.slice(0, 160),
  };
}

export default async function VehiclePage({ params }: VehiclePageProps) {
  const { slug } = await params;
  const vehicle = await getVehicleBySlug(repository, slug);

  if (!vehicle) {
    notFound();
  }

  void incrementVehicleViewCount(repository, vehicle.id);

  const negotiable = hasNegotiableBadge(vehicle);
  const sortedImages = [...vehicle.images].sort((a, b) => a.position - b.position);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Fil d'ariane */}
      <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-6">
        <Link href="/" className="hover:text-brand-gold transition-colors">Accueil</Link>
        <span>/</span>
        <Link href="/catalogue" className="hover:text-brand-gold transition-colors">Catalogue</Link>
        <span>/</span>
        <span className="text-neutral-600 truncate">{vehicle.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10">
        {/* Colonne principale */}
        <div className="flex flex-col gap-8">
          <VehicleGallery images={sortedImages} title={vehicle.title} />

          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Badge variant={vehicle.condition === "NEUF" ? "blue" : "neutral"}>
                {CONDITION_LABELS[vehicle.condition]}
              </Badge>
              {vehicle.status === "RESERVE" && <Badge variant="gold">Réservé</Badge>}
              {vehicle.agent?.isVerified && <Badge variant="green">✓ Agent vérifié</Badge>}
            </div>
            <p className="text-sm text-neutral-400 font-medium">{vehicle.brand.name}</p>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-brand-black leading-tight mt-1">
              {vehicle.title}
            </h1>
            <div className="flex items-center gap-1.5 text-sm text-neutral-500 mt-2">
              <MapPin size={14} />
              {vehicle.city}
            </div>
          </div>

          {/* Specs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-5 rounded-2xl border border-neutral-200 bg-brand-white">
            <Spec icon={<Calendar size={16} />} label="Année" value={String(vehicle.year)} />
            <Spec icon={<Gauge size={16} />} label="Kilométrage" value={`${vehicle.mileage.toLocaleString("fr-FR")} km`} />
            <Spec icon={<Fuel size={16} />} label="Carburant" value={FUEL_LABELS[vehicle.fuelType]} />
            <Spec icon={<Settings2 size={16} />} label="Transmission" value={TRANSMISSION_LABELS[vehicle.transmission]} />
            <Spec icon={<Palette size={16} />} label="Couleur" value={vehicle.color} />
            {vehicle.seats && <Spec icon={<Users size={16} />} label="Places" value={String(vehicle.seats)} />}
            {vehicle.power && <Spec icon={<Zap size={16} />} label="Puissance" value={`${vehicle.power} ch`} />}
            {vehicle.hasAC && <Spec icon={<Snowflake size={16} />} label="Climatisation" value="Oui" />}
          </div>

          {/* Description */}
          <div>
            <h2 className="font-display font-semibold text-lg text-brand-black mb-3">Description</h2>
            <p className="text-neutral-600 leading-relaxed whitespace-pre-line">{vehicle.description}</p>
          </div>

          {/* Équipements */}
          {(vehicle.hasGPS || vehicle.hasRearCamera) && (
            <div>
              <h2 className="font-display font-semibold text-lg text-brand-black mb-3">Équipements</h2>
              <div className="flex flex-wrap gap-3">
                {vehicle.hasGPS && (
                  <span className="flex items-center gap-1.5 text-sm text-neutral-600">
                    <CheckCircle size={14} className="text-brand-gold" /> GPS
                  </span>
                )}
                {vehicle.hasRearCamera && (
                  <span className="flex items-center gap-1.5 text-sm text-neutral-600">
                    <CheckCircle size={14} className="text-brand-gold" /> Caméra de recul
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Colonne latérale : prix + agent + réservation */}
        <aside className="flex flex-col gap-5 h-fit lg:sticky lg:top-24">
          <div className="p-5 rounded-2xl border border-neutral-200 bg-brand-white">
            <p className="font-bold text-2xl text-brand-black">{formatPrice(vehicle.price)}</p>
            {negotiable && <p className="text-sm text-brand-gold font-medium mt-0.5">Prix négociable</p>}
          </div>

          {vehicle.agent && (
            <div className="p-5 rounded-2xl border border-neutral-200 bg-brand-white flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-semibold text-brand-black">{vehicle.agent.name}</h3>
                {vehicle.agent.isVerified && <Badge variant="green">✓ Vérifié</Badge>}
              </div>
              <p className="text-sm text-neutral-500 flex items-center gap-1.5">
                <MapPin size={13} /> {vehicle.agent.city}
              </p>
              {vehicle.agent.phone && (
                <a
                  href={`tel:${vehicle.agent.phone}`}
                  className="flex items-center justify-center gap-2 text-sm font-medium text-brand-black border border-neutral-300 rounded-lg py-2.5 hover:border-brand-gold hover:text-brand-gold transition-colors"
                >
                  <Phone size={14} /> {vehicle.agent.phone}
                </a>
              )}
            </div>
          )}

          <div className="p-5 rounded-2xl border border-neutral-200 bg-brand-white">
            <h3 className="font-display font-semibold text-brand-black mb-4">Demander une réservation</h3>
            <ReservationForm vehicleId={vehicle.id} />
          </div>
        </aside>
      </div>
    </div>
  );
}

function Spec({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2">
      <span className="text-brand-gold mt-0.5">{icon}</span>
      <div>
        <p className="text-xs text-neutral-400">{label}</p>
        <p className="text-sm font-medium text-brand-black">{value}</p>
      </div>
    </div>
  );
}
