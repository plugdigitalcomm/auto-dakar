"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import type { Brand } from "@/types";

const SENEGAL_CITIES = [
  "Dakar", "Thiès", "Saint-Louis", "Mbour", "Ziguinchor",
  "Kaolack", "Diourbel", "Louga", "Tambacounda", "Touba",
];

interface SearchBarProps {
  brands: Brand[];
}

export function SearchBar({ brands }: SearchBarProps) {
  const router = useRouter();
  const [form, setForm] = useState({ brandId: "", city: "", condition: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (form.brandId) params.set("brandId", form.brandId);
    if (form.city) params.set("city", form.city);
    if (form.condition) params.set("condition", form.condition);
    router.push(`/catalogue?${params.toString()}`);
  }

  const selectClass =
    "flex-1 min-w-0 bg-transparent text-brand-black text-sm placeholder:text-neutral-400 outline-none cursor-pointer";

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-3xl bg-brand-white rounded-2xl shadow-2xl p-2 flex flex-col sm:flex-row gap-2"
    >
      {/* Marque */}
      <div className="flex items-center gap-2 flex-1 px-4 py-2.5 rounded-xl hover:bg-neutral-50 transition-colors">
        <select
          value={form.brandId}
          onChange={(e) => setForm((f) => ({ ...f, brandId: e.target.value }))}
          className={selectClass}
          aria-label="Marque"
        >
          <option value="">Toutes les marques</option>
          {brands.map((b) => (
            <option key={b.id} value={b.id}>{b.name}</option>
          ))}
        </select>
      </div>

      <div className="hidden sm:block w-px bg-neutral-200 self-stretch" />

      {/* Ville */}
      <div className="flex items-center gap-2 flex-1 px-4 py-2.5 rounded-xl hover:bg-neutral-50 transition-colors">
        <select
          value={form.city}
          onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
          className={selectClass}
          aria-label="Ville"
        >
          <option value="">Toutes les villes</option>
          {SENEGAL_CITIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="hidden sm:block w-px bg-neutral-200 self-stretch" />

      {/* État */}
      <div className="flex items-center gap-2 flex-1 px-4 py-2.5 rounded-xl hover:bg-neutral-50 transition-colors">
        <select
          value={form.condition}
          onChange={(e) => setForm((f) => ({ ...f, condition: e.target.value }))}
          className={selectClass}
          aria-label="État du véhicule"
        >
          <option value="">Neuf ou Occasion</option>
          <option value="NEUF">Neuf</option>
          <option value="OCCASION">Occasion</option>
        </select>
      </div>

      {/* Bouton */}
      <button
        type="submit"
        className="flex items-center gap-2 px-6 py-3 bg-brand-gold text-brand-black font-semibold text-sm rounded-xl hover:bg-brand-gold-soft transition-colors duration-200 shrink-0"
      >
        <Search size={16} />
        Rechercher
      </button>
    </form>
  );
}
