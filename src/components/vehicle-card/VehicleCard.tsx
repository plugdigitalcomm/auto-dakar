import Image from "next/image";
import Link from "next/link";
import { MapPin, Fuel, Gauge, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { getPrimaryImage, hasNegotiableBadge } from "@/modules/vehicles/domain";
import type { VehicleWithRelations } from "@/types";

interface VehicleCardProps {
  vehicle: VehicleWithRelations;
  className?: string;
}

const FUEL_LABELS: Record<string, string> = {
  ESSENCE: "Essence",
  DIESEL: "Diesel",
  HYBRIDE: "Hybride",
  ELECTRIQUE: "Électrique",
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

export function VehicleCard({ vehicle, className }: VehicleCardProps) {
  const primaryImage = getPrimaryImage(vehicle);
  const negotiable = hasNegotiableBadge(vehicle);

  return (
    <Link
      href={`/vehicule/${vehicle.slug}`}
      className={cn(
        "group flex flex-col bg-brand-white rounded-2xl overflow-hidden border border-neutral-200",
        "hover:border-brand-gold/40 hover:shadow-xl hover:shadow-neutral-200/60",
        "transition-all duration-300",
        className
      )}
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
        {primaryImage ? (
          <Image
            src={primaryImage.url}
            alt={vehicle.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-neutral-300">
            <span className="text-sm">Pas de photo</span>
          </div>
        )}

        {/* Badges sur l'image */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <Badge variant={vehicle.condition === "NEUF" ? "blue" : "neutral"}>
            {CONDITION_LABELS[vehicle.condition]}
          </Badge>
          {vehicle.status === "RESERVE" && (
            <Badge variant="gold">Réservé</Badge>
          )}
          {vehicle.agent?.isVerified && (
            <Badge variant="green">✓ Vérifié</Badge>
          )}
        </div>
      </div>

      {/* Contenu */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Titre + Prix */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-xs text-neutral-400 font-medium">{vehicle.brand.name}</p>
            <h3 className="font-display font-semibold text-brand-black text-base leading-snug truncate">
              {vehicle.title}
            </h3>
          </div>
          <div className="text-right shrink-0">
            <p className="font-bold text-brand-black text-base leading-tight">
              {formatPrice(vehicle.price)}
            </p>
            {negotiable && (
              <p className="text-xs text-brand-gold font-medium">Négociable</p>
            )}
          </div>
        </div>

        {/* Specs */}
        <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-neutral-500">
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {vehicle.year}
          </span>
          <span className="flex items-center gap-1">
            <Gauge size={12} />
            {vehicle.mileage.toLocaleString("fr-FR")} km
          </span>
          <span className="flex items-center gap-1">
            <Fuel size={12} />
            {FUEL_LABELS[vehicle.fuelType]}
          </span>
        </div>

        {/* Localisation */}
        <div className="flex items-center gap-1 text-xs text-neutral-400 mt-auto pt-1 border-t border-neutral-100">
          <MapPin size={11} />
          <span>{vehicle.city}</span>
        </div>
      </div>
    </Link>
  );
}
