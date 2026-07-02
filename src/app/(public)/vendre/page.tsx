import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { SellerForm } from "@/components/vendre/SellerForm";
import { createSellerListingAction } from "./actions";
import { LISTING_FEE_XOF } from "@/lib/listing-config";
import { ShieldCheck, Camera, BadgeCheck } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Vendre ma voiture — AutoDakar",
  description:
    "Vendez votre voiture au Sénégal en quelques minutes. Publiez votre annonce et touchez des milliers d'acheteurs.",
};

const STEPS = [
  { icon: <Camera size={20} />, title: "1. Décrivez votre voiture", desc: "Remplissez les caractéristiques et ajoutez de belles photos." },
  { icon: <ShieldCheck size={20} />, title: "2. Réglez les frais", desc: "Un petit montant unique pour activer votre annonce." },
  { icon: <BadgeCheck size={20} />, title: "3. Mise en ligne", desc: "Après vérification, votre annonce est visible par tous." },
];

export default async function VendrePage() {
  const brands = await prisma.brand.findMany({ orderBy: { name: "asc" } });

  return (
    <div className="min-h-screen bg-brand-white">
      {/* Hero */}
      <section className="bg-brand-black pt-28 pb-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">
            Vendez votre voiture <span className="text-brand-gold">rapidement</span>
          </h1>
          <p className="mt-4 text-neutral-300 text-sm sm:text-base">
            Publiez votre annonce sur AutoDakar et touchez des milliers d&apos;acheteurs au Sénégal.
          </p>
        </div>
      </section>

      {/* Étapes */}
      <section className="max-w-5xl mx-auto px-4 -mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {STEPS.map((s) => (
            <div key={s.title} className="bg-brand-white rounded-2xl border border-neutral-200 p-5 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-brand-gold/10 text-brand-gold flex items-center justify-center mb-3">
                {s.icon}
              </div>
              <p className="font-semibold text-brand-black text-sm">{s.title}</p>
              <p className="text-xs text-neutral-500 mt-1">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Formulaire */}
      <section className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-brand-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-sm">
          <SellerForm action={createSellerListingAction} brands={brands} listingFee={LISTING_FEE_XOF} />
        </div>
      </section>
    </div>
  );
}
