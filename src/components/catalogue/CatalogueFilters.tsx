"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { RotateCcw, SlidersHorizontal, ChevronDown } from "lucide-react";
import type { Brand } from "@/types";

const SENEGAL_CITIES = [
  "Dakar", "Thiès", "Saint-Louis", "Mbour", "Ziguinchor",
  "Kaolack", "Diourbel", "Louga", "Tambacounda", "Touba",
];

const CATEGORIES = [
  { value: "SUV", label: "SUV" },
  { value: "BERLINE", label: "Berline" },
  { value: "PICKUP", label: "Pick-up" },
  { value: "UTILITAIRE", label: "Utilitaire" },
  { value: "CITADINE", label: "Citadine" },
  { value: "COUPE", label: "Coupé" },
  { value: "MONOSPACE", label: "Monospace" },
  { value: "CABRIOLET", label: "Cabriolet" },
];

interface CatalogueFiltersProps {
  brands: Brand[];
}

const FILTER_KEYS = [
  "brandId", "city", "condition", "category", "transmission",
  "fuelType", "priceMin", "priceMax", "yearMin", "yearMax",
] as const;

export function CatalogueFilters({ brands }: CatalogueFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState(() => {
    const initial: Record<string, string> = {};
    for (const key of FILTER_KEYS) {
      initial[key] = searchParams.get(key) ?? "";
    }
    return initial;
  });

  function update(key: string, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function applyFilters() {
    const params = new URLSearchParams();
    for (const key of FILTER_KEYS) {
      if (form[key]) params.set(key, form[key]);
    }
    router.push(`/catalogue?${params.toString()}`);
    setOpen(false);
  }

  function resetFilters() {
    setForm(Object.fromEntries(FILTER_KEYS.map((k) => [k, ""])));
    router.push("/catalogue");
    setOpen(false);
  }

  const activeCount = FILTER_KEYS.filter((k) => form[k]).length;

  const inputClass =
    "w-full bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-sm text-brand-black outline-none focus:border-brand-gold transition-colors";
  const labelClass = "text-xs font-medium text-neutral-500 mb-1.5 block";

  const filterContent = (
    <div className="flex flex-col gap-5">
      <div>
        <label className={labelClass}>Marque</label>
        <select className={inputClass} value={form.brandId} onChange={(e) => update("brandId", e.target.value)}>
          <option value="">Toutes les marques</option>
          {brands.map((b) => (
            <option key={b.id} value={b.id}>{b.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>Ville</label>
        <select className={inputClass} value={form.city} onChange={(e) => update("city", e.target.value)}>
          <option value="">Toutes les villes</option>
          {SENEGAL_CITIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>État</label>
        <select className={inputClass} value={form.condition} onChange={(e) => update("condition", e.target.value)}>
          <option value="">Neuf ou Occasion</option>
          <option value="NEUF">Neuf</option>
          <option value="OCCASION">Occasion</option>
        </select>
      </div>

      <div>
        <label className={labelClass}>Catégorie</label>
        <select className={inputClass} value={form.category} onChange={(e) => update("category", e.target.value)}>
          <option value="">Toutes les catégories</option>
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>Transmission</label>
        <select className={inputClass} value={form.transmission} onChange={(e) => update("transmission", e.target.value)}>
          <option value="">Toutes</option>
          <option value="MANUELLE">Manuelle</option>
          <option value="AUTOMATIQUE">Automatique</option>
        </select>
      </div>

      <div>
        <label className={labelClass}>Carburant</label>
        <select className={inputClass} value={form.fuelType} onChange={(e) => update("fuelType", e.target.value)}>
          <option value="">Tous</option>
          <option value="ESSENCE">Essence</option>
          <option value="DIESEL">Diesel</option>
          <option value="HYBRIDE">Hybride</option>
          <option value="ELECTRIQUE">Électrique</option>
        </select>
      </div>

      <div>
        <label className={labelClass}>Prix (XOF)</label>
        <div className="flex items-center gap-2">
          <input type="number" placeholder="Min" className={inputClass} value={form.priceMin} onChange={(e) => update("priceMin", e.target.value)} />
          <input type="number" placeholder="Max" className={inputClass} value={form.priceMax} onChange={(e) => update("priceMax", e.target.value)} />
        </div>
      </div>

      <div>
        <label className={labelClass}>Année</label>
        <div className="flex items-center gap-2">
          <input type="number" placeholder="Min" className={inputClass} value={form.yearMin} onChange={(e) => update("yearMin", e.target.value)} />
          <input type="number" placeholder="Max" className={inputClass} value={form.yearMax} onChange={(e) => update("yearMax", e.target.value)} />
        </div>
      </div>

      <button
        type="button"
        onClick={applyFilters}
        className="w-full bg-brand-gold text-brand-black font-semibold text-sm py-2.5 rounded-lg hover:bg-brand-gold-soft transition-colors"
      >
        Appliquer les filtres
      </button>
    </div>
  );

  return (
    <>
      {/* Bouton toggle filtres — mobile uniquement */}
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-neutral-200 bg-brand-white text-sm font-medium text-brand-black"
        >
          <span className="flex items-center gap-2">
            <SlidersHorizontal size={16} className="text-brand-gold" />
            Filtres
            {activeCount > 0 && (
              <span className="px-1.5 py-0.5 text-xs bg-brand-gold text-brand-black rounded-full font-bold">{activeCount}</span>
            )}
          </span>
          <div className="flex items-center gap-2">
            {activeCount > 0 && (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); resetFilters(); }}
                className="text-xs text-neutral-400 hover:text-brand-gold flex items-center gap-1"
              >
                <RotateCcw size={11} /> Réinitialiser
              </button>
            )}
            <ChevronDown size={16} className={`transition-transform ${open ? "rotate-180" : ""}`} />
          </div>
        </button>

        {open && (
          <div className="mt-3 p-4 rounded-xl border border-neutral-200 bg-brand-white">
            {filterContent}
          </div>
        )}
      </div>

      {/* Sidebar desktop */}
      <aside className="hidden lg:flex flex-col gap-5 p-5 rounded-2xl border border-neutral-200 bg-brand-white h-fit sticky top-24">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-semibold text-brand-black">Filtres</h2>
          <button
            type="button"
            onClick={resetFilters}
            className="flex items-center gap-1 text-xs text-neutral-400 hover:text-brand-gold transition-colors"
          >
            <RotateCcw size={12} />
            Réinitialiser
          </button>
        </div>
        {filterContent}
      </aside>
    </>
  );
}
