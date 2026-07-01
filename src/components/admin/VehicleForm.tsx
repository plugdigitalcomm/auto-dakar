"use client";

import { useActionState } from "react";
import type { Brand, Agent, VehicleWithRelations } from "@/types";

const CATEGORIES = ["SUV","BERLINE","PICKUP","UTILITAIRE","CITADINE","COUPE","MONOSPACE","CABRIOLET"];
const FUEL_TYPES = [["ESSENCE","Essence"],["DIESEL","Diesel"],["HYBRIDE","Hybride"],["ELECTRIQUE","Électrique"]];
const TRANSMISSIONS = [["MANUELLE","Manuelle"],["AUTOMATIQUE","Automatique"]];
const CONDITIONS = [["NEUF","Neuf"],["OCCASION","Occasion"]];
const STATUSES = [["DISPONIBLE","Disponible"],["RESERVE","Réservé"],["VENDU","Vendu"],["ARCHIVE","Archivé"]];

type ActionFn = (prevState: ActionState, formData: FormData) => Promise<ActionState>;
type ActionState = { error?: string } | undefined;

interface VehicleFormProps {
  action: ActionFn;
  brands: Brand[];
  agents: Agent[];
  vehicle?: VehicleWithRelations;
  submitLabel?: string;
}

const inputClass = "w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-neutral-500 outline-none focus:border-brand-gold transition-colors";
const labelClass = "text-xs font-medium text-neutral-400 mb-1.5 block";
const selectClass = inputClass + " cursor-pointer";

export function VehicleForm({ action, brands, agents, vehicle, submitLabel = "Enregistrer" }: VehicleFormProps) {
  const [state, formAction, isPending] = useActionState(action, undefined);
  const v = vehicle;

  return (
    <form action={formAction} className="flex flex-col gap-8 max-w-4xl">
      {state?.error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400">
          {state.error}
        </div>
      )}

      {/* Infos principales */}
      <Section title="Informations principales">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Titre de l'annonce *">
            <input name="title" required defaultValue={v?.title} className={inputClass} placeholder="ex: Toyota RAV4 2022 Essence" />
          </Field>
          <Field label="Modèle *">
            <input name="model" required defaultValue={v?.model} className={inputClass} placeholder="ex: RAV4" />
          </Field>
          <Field label="Marque *">
            <select name="brandId" required defaultValue={v?.brandId} className={selectClass}>
              <option value="">Choisir une marque</option>
              {brands.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
          </Field>
          <Field label="Agent (optionnel)">
            <select name="agentId" defaultValue={v?.agentId ?? ""} className={selectClass}>
              <option value="">Aucun agent</option>
              {agents.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
            </select>
          </Field>
          <Field label="Année *">
            <input name="year" type="number" required defaultValue={v?.year ?? new Date().getFullYear()} className={inputClass} />
          </Field>
          <Field label="Couleur *">
            <input name="color" required defaultValue={v?.color} className={inputClass} placeholder="ex: Blanc nacré" />
          </Field>
        </div>
      </Section>

      {/* Caractéristiques */}
      <Section title="Caractéristiques">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field label="Catégorie *">
            <select name="category" required defaultValue={v?.category} className={selectClass}>
              <option value="">Catégorie</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="État *">
            <select name="condition" required defaultValue={v?.condition} className={selectClass}>
              {CONDITIONS.map(([val, lbl]) => <option key={val} value={val}>{lbl}</option>)}
            </select>
          </Field>
          <Field label="Carburant *">
            <select name="fuelType" required defaultValue={v?.fuelType} className={selectClass}>
              {FUEL_TYPES.map(([val, lbl]) => <option key={val} value={val}>{lbl}</option>)}
            </select>
          </Field>
          <Field label="Transmission *">
            <select name="transmission" required defaultValue={v?.transmission} className={selectClass}>
              {TRANSMISSIONS.map(([val, lbl]) => <option key={val} value={val}>{lbl}</option>)}
            </select>
          </Field>
          <Field label="Kilométrage *">
            <input name="mileage" type="number" required defaultValue={v?.mileage ?? 0} min={0} className={inputClass} />
          </Field>
          <Field label="Puissance (ch)">
            <input name="power" type="number" defaultValue={v?.power ?? ""} className={inputClass} placeholder="ex: 150" />
          </Field>
          <Field label="Places">
            <input name="seats" type="number" defaultValue={v?.seats ?? ""} className={inputClass} placeholder="ex: 5" />
          </Field>
          <Field label="Cylindrée (L)">
            <input name="engineSize" type="number" step="0.1" defaultValue={v?.engineSize ?? ""} className={inputClass} placeholder="ex: 2.0" />
          </Field>
        </div>

        <div className="flex flex-wrap gap-5 mt-3">
          <Checkbox name="hasAC" label="Climatisation" defaultChecked={v?.hasAC} />
          <Checkbox name="hasGPS" label="GPS" defaultChecked={v?.hasGPS} />
          <Checkbox name="hasRearCamera" label="Caméra de recul" defaultChecked={v?.hasRearCamera} />
          <Checkbox name="isNegotiable" label="Prix négociable" defaultChecked={v?.isNegotiable} />
        </div>
      </Section>

      {/* Prix & Statut */}
      <Section title="Prix & Statut">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field label="Prix (XOF) *">
            <input
              name="price"
              type="number"
              required
              defaultValue={v?.price ? Number(v.price) : ""}
              className={inputClass}
              placeholder="ex: 12000000"
            />
          </Field>
          <Field label="Statut *">
            <select name="status" required defaultValue={v?.status ?? "DISPONIBLE"} className={selectClass}>
              {STATUSES.map(([val, lbl]) => <option key={val} value={val}>{lbl}</option>)}
            </select>
          </Field>
          <Field label="Ville *">
            <input name="city" required defaultValue={v?.city} className={inputClass} placeholder="ex: Dakar" />
          </Field>
        </div>
      </Section>

      {/* Description */}
      <Section title="Description">
        <Field label="Description complète *">
          <textarea
            name="description"
            required
            rows={6}
            defaultValue={v?.description}
            className={inputClass}
            placeholder="Description détaillée du véhicule (min. 20 caractères)..."
          />
        </Field>
        <Field label="URL vidéo (optionnel)">
          <input name="videoUrl" type="url" defaultValue={v?.videoUrl ?? ""} className={inputClass} placeholder="https://youtube.com/..." />
        </Field>
      </Section>

      {/* Images */}
      <Section title="Images">
        <Field label="Uploader des photos depuis votre ordinateur">
          <input
            type="file"
            name="imageFiles"
            multiple
            accept="image/*"
            className="w-full text-sm text-neutral-400 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-brand-gold file:text-brand-black file:font-semibold file:cursor-pointer hover:file:bg-brand-gold-soft cursor-pointer"
          />
          <p className="text-xs text-neutral-500 mt-1">Les fichiers sont uploadés sur Cloudinary automatiquement.</p>
        </Field>
        <Field label="Ou coller des URLs directement (une par ligne)">
          <textarea
            name="imageUrls"
            rows={3}
            defaultValue={v?.images.sort((a, b) => a.position - b.position).map((i) => i.url).join("\n")}
            className={inputClass}
            placeholder="https://res.cloudinary.com/..."
          />
          <p className="text-xs text-neutral-500 mt-1">Si des fichiers sont uploadés ET des URLs collées, les deux sont combinés. Pour remplacer toutes les images, fournissez au moins une source.</p>
        </Field>
      </Section>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="px-6 py-3 bg-brand-gold text-brand-black font-semibold text-sm rounded-lg hover:bg-brand-gold-soft transition-colors disabled:opacity-60"
        >
          {isPending ? "Enregistrement..." : submitLabel}
        </button>
        <a href="/admin/vehicules" className="px-6 py-3 bg-neutral-800 text-neutral-300 font-medium text-sm rounded-lg hover:bg-neutral-700 transition-colors">
          Annuler
        </a>
      </div>
    </form>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-display font-semibold text-white text-base border-b border-neutral-800 pb-2">{title}</h2>
      {children}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      {children}
    </div>
  );
}

function Checkbox({ name, label, defaultChecked }: { name: string; label: string; defaultChecked?: boolean }) {
  return (
    <label className="flex items-center gap-2 text-sm text-neutral-300 cursor-pointer">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} className="accent-brand-gold" />
      {label}
    </label>
  );
}
