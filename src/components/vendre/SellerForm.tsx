"use client";

import { useActionState } from "react";
import type { Brand } from "@/types";

const CATEGORIES = ["SUV", "BERLINE", "PICKUP", "UTILITAIRE", "CITADINE", "COUPE", "MONOSPACE", "CABRIOLET"];
const FUEL_TYPES = [["ESSENCE", "Essence"], ["DIESEL", "Diesel"], ["HYBRIDE", "Hybride"], ["ELECTRIQUE", "Électrique"]];
const TRANSMISSIONS = [["MANUELLE", "Manuelle"], ["AUTOMATIQUE", "Automatique"]];
const CONDITIONS = [["OCCASION", "Occasion"], ["NEUF", "Neuf"]];

type ActionState = { error?: string } | undefined;
type ActionFn = (prevState: ActionState, formData: FormData) => Promise<ActionState>;

interface SellerFormProps {
  action: ActionFn;
  brands: Brand[];
  listingFee: number;
}

const inputClass =
  "w-full bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2.5 text-sm text-brand-black placeholder:text-neutral-400 outline-none focus:border-brand-gold transition-colors";
const labelClass = "text-xs font-medium text-neutral-500 mb-1.5 block";
const selectClass = inputClass + " cursor-pointer";

function formatXOF(n: number) {
  return new Intl.NumberFormat("fr-FR").format(n) + " XOF";
}

export function SellerForm({ action, brands, listingFee }: SellerFormProps) {
  const [state, formAction, isPending] = useActionState(action, undefined);

  return (
    <form action={formAction} className="flex flex-col gap-8">
      {state?.error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600">
          {state.error}
        </div>
      )}

      <Section title="Votre véhicule">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Titre de l'annonce *">
            <input name="title" required className={inputClass} placeholder="ex: Toyota RAV4 2022 Essence" />
          </Field>
          <Field label="Marque *">
            <select name="brandId" required className={selectClass} defaultValue="">
              <option value="">Choisir une marque</option>
              {brands.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
          </Field>
          <Field label="Modèle *">
            <input name="model" required className={inputClass} placeholder="ex: RAV4" />
          </Field>
          <Field label="Année *">
            <input name="year" type="number" required defaultValue={new Date().getFullYear()} className={inputClass} />
          </Field>
          <Field label="Couleur *">
            <input name="color" required className={inputClass} placeholder="ex: Blanc nacré" />
          </Field>
          <Field label="Ville *">
            <input name="city" required className={inputClass} placeholder="ex: Dakar" />
          </Field>
        </div>
      </Section>

      <Section title="Caractéristiques">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field label="Catégorie *">
            <select name="category" required className={selectClass} defaultValue="">
              <option value="">Catégorie</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="État *">
            <select name="condition" required className={selectClass}>
              {CONDITIONS.map(([val, lbl]) => <option key={val} value={val}>{lbl}</option>)}
            </select>
          </Field>
          <Field label="Carburant *">
            <select name="fuelType" required className={selectClass}>
              {FUEL_TYPES.map(([val, lbl]) => <option key={val} value={val}>{lbl}</option>)}
            </select>
          </Field>
          <Field label="Transmission *">
            <select name="transmission" required className={selectClass}>
              {TRANSMISSIONS.map(([val, lbl]) => <option key={val} value={val}>{lbl}</option>)}
            </select>
          </Field>
          <Field label="Kilométrage *">
            <input name="mileage" type="number" required defaultValue={0} min={0} className={inputClass} />
          </Field>
          <Field label="Puissance (ch)">
            <input name="power" type="number" className={inputClass} placeholder="ex: 150" />
          </Field>
          <Field label="Places">
            <input name="seats" type="number" className={inputClass} placeholder="ex: 5" />
          </Field>
          <Field label="Cylindrée (L)">
            <input name="engineSize" type="number" step="0.1" className={inputClass} placeholder="ex: 2.0" />
          </Field>
        </div>

        <div className="flex flex-wrap gap-5 mt-3">
          <Checkbox name="hasAC" label="Climatisation" />
          <Checkbox name="hasGPS" label="GPS" />
          <Checkbox name="hasRearCamera" label="Caméra de recul" />
          <Checkbox name="isNegotiable" label="Prix négociable" />
        </div>
      </Section>

      <Section title="Prix & Description">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Prix de vente (XOF) *">
            <input name="price" type="number" required className={inputClass} placeholder="ex: 12000000" />
          </Field>
        </div>
        <Field label="Description complète *">
          <textarea
            name="description"
            required
            rows={5}
            className={inputClass}
            placeholder="Décrivez votre véhicule : état, entretien, options, raison de la vente... (min. 20 caractères)"
          />
        </Field>
      </Section>

      <Section title="Photos">
        <Field label="Ajoutez des photos de votre voiture">
          <input
            type="file"
            name="imageFiles"
            multiple
            accept="image/*"
            className="w-full text-sm text-neutral-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-brand-gold file:text-brand-black file:font-semibold file:cursor-pointer hover:file:bg-brand-gold-soft cursor-pointer"
          />
          <p className="text-xs text-neutral-400 mt-1">Plusieurs photos possibles. Une belle annonce se vend plus vite !</p>
        </Field>
      </Section>

      <Section title="Vos coordonnées">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field label="Nom complet *">
            <input name="sellerName" required className={inputClass} placeholder="ex: Amadou Diallo" />
          </Field>
          <Field label="Téléphone / WhatsApp *">
            <input name="sellerPhone" required className={inputClass} placeholder="ex: +221 77 000 00 00" />
          </Field>
          <Field label="Email (optionnel)">
            <input name="sellerEmail" type="email" className={inputClass} placeholder="ex: vous@email.com" />
          </Field>
        </div>
      </Section>

      <div className="rounded-2xl border border-brand-gold/30 bg-brand-gold/5 p-5">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <p className="text-sm font-semibold text-brand-black">Frais de publication</p>
            <p className="text-xs text-neutral-500 mt-0.5">Payés une seule fois pour mettre votre annonce en ligne.</p>
          </div>
          <p className="text-2xl font-display font-bold text-brand-gold">{formatXOF(listingFee)}</p>
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full sm:w-auto px-8 py-3.5 bg-brand-gold text-brand-black font-semibold text-sm rounded-lg hover:bg-brand-gold-soft transition-colors disabled:opacity-60"
      >
        {isPending ? "Envoi en cours..." : "Publier mon annonce"}
      </button>
      <p className="text-xs text-neutral-400 -mt-4">
        Après paiement, votre annonce est vérifiée par notre équipe avant sa mise en ligne (généralement sous 24h).
      </p>
    </form>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-display font-semibold text-brand-black text-base border-b border-neutral-100 pb-2">{title}</h2>
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

function Checkbox({ name, label }: { name: string; label: string }) {
  return (
    <label className="flex items-center gap-2 text-sm text-neutral-600 cursor-pointer">
      <input type="checkbox" name={name} className="accent-brand-gold" />
      {label}
    </label>
  );
}
