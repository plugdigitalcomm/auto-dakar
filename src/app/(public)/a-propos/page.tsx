import { CheckCircle, Users, Car, ShieldCheck, Star } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "À propos — AutoDakar",
  description: "Découvrez AutoDakar, la plateforme de référence pour l'achat et la vente de voitures au Sénégal.",
};

const STATS = [
  { value: "500+", label: "Véhicules référencés" },
  { value: "50+", label: "Agents partenaires" },
  { value: "3", label: "Années d'expérience" },
  { value: "98%", label: "Clients satisfaits" },
];

const VALUES = [
  {
    icon: <ShieldCheck size={22} />,
    title: "Transparence",
    desc: "Chaque annonce est vérifiée. Nous n'affichons que des véhicules réels, avec des informations exactes.",
  },
  {
    icon: <Star size={22} />,
    title: "Excellence",
    desc: "Nous sélectionnons rigoureusement nos agents partenaires pour vous garantir un service de qualité.",
  },
  {
    icon: <Users size={22} />,
    title: "Proximité",
    desc: "Équipe sénégalaise, profondément ancrée dans les réalités du marché automobile local.",
  },
  {
    icon: <Car size={22} />,
    title: "Accessibilité",
    desc: "Zero inscription, zero frais. Parcourez des centaines d'annonces librement depuis n'importe quel appareil.",
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-brand-black py-20 px-4">
        <div className="max-w-3xl mx-auto text-center flex flex-col gap-5">
          <p className="text-brand-gold text-xs font-semibold uppercase tracking-widest">Notre histoire</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white leading-tight">
            La référence automobile<br />au Sénégal
          </h1>
          <p className="text-neutral-400 text-lg leading-relaxed max-w-xl mx-auto">
            AutoDakar est né d&apos;un constat simple : trouver une voiture fiable au Sénégal ne devrait pas être compliqué.
            Nous avons créé la plateforme que nous aurions voulu avoir.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-brand-gold py-12 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="font-display text-3xl font-bold text-brand-black">{s.value}</p>
              <p className="text-sm text-brand-black/70 font-medium mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-4 bg-brand-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-5">
            <SectionTitle
              label="Notre mission"
              title="Connecter acheteurs et vendeurs de confiance"
              subtitle="AutoDakar met en relation des particuliers et des professionnels de l'automobile avec des acheteurs sérieux partout au Sénégal."
            />
            <ul className="flex flex-col gap-3">
              {[
                "Véhicules vérifiés avant publication",
                "Agents certifiés par notre équipe",
                "Aucun intermédiaire inutile",
                "Service entièrement gratuit pour les acheteurs",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-neutral-600">
                  <CheckCircle size={16} className="text-brand-gold shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {VALUES.map((v) => (
              <div key={v.title} className="flex flex-col gap-2 p-5 rounded-2xl border border-neutral-200 bg-white">
                <span className="text-brand-gold">{v.icon}</span>
                <p className="font-display font-semibold text-brand-black text-sm">{v.title}</p>
                <p className="text-xs text-neutral-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-neutral-50 text-center px-4">
        <div className="max-w-xl mx-auto flex flex-col gap-5 items-center">
          <h2 className="font-display text-2xl font-bold text-brand-black">Vous êtes professionnel ?</h2>
          <p className="text-neutral-500 text-sm leading-relaxed">
            Rejoignez notre réseau d&apos;agents partenaires et bénéficiez d&apos;une visibilité premium auprès de milliers d&apos;acheteurs qualifiés.
          </p>
          <Button href="/contact">Nous contacter</Button>
        </div>
      </section>
    </div>
  );
}
