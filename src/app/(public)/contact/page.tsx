import { Phone, MessageCircle, Mail, MapPin, Clock } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — AutoDakar",
  description: "Contactez l'équipe AutoDakar par téléphone, WhatsApp ou email. Nous répondons rapidement.",
};

const CONTACTS = [
  {
    icon: <Phone size={20} />,
    label: "Téléphone",
    value: "+221 77 000 00 00",
    href: "tel:+221770000000",
    desc: "Lun–Sam, 8h–20h",
  },
  {
    icon: <MessageCircle size={20} />,
    label: "WhatsApp",
    value: "+221 77 000 00 00",
    href: "https://wa.me/221770000000",
    desc: "Réponse rapide garantie",
  },
  {
    icon: <Mail size={20} />,
    label: "Email",
    value: "contact@autodakar.sn",
    href: "mailto:contact@autodakar.sn",
    desc: "Réponse sous 24h",
  },
  {
    icon: <MapPin size={20} />,
    label: "Adresse",
    value: "Dakar, Sénégal",
    href: null,
    desc: "Plateau, Dakar",
  },
];

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <SectionTitle
        label="Contact"
        title="Parlons-nous"
        subtitle="Notre équipe est disponible pour répondre à toutes vos questions sur les véhicules, les agents ou la plateforme."
        align="center"
        className="mb-14"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-14">
        {CONTACTS.map((c) => (
          <div key={c.label} className="flex flex-col gap-3 p-6 rounded-2xl border border-neutral-200 bg-brand-white hover:border-brand-gold/40 hover:shadow-md transition-all">
            <span className="text-brand-gold">{c.icon}</span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-1">{c.label}</p>
              {c.href ? (
                <a href={c.href} className="font-display font-semibold text-brand-black hover:text-brand-gold transition-colors">
                  {c.value}
                </a>
              ) : (
                <p className="font-display font-semibold text-brand-black">{c.value}</p>
              )}
              <p className="text-sm text-neutral-500 mt-1 flex items-center gap-1.5">
                <Clock size={12} /> {c.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-8 rounded-2xl bg-brand-black text-center flex flex-col gap-3 items-center">
        <p className="font-display text-xl font-bold text-white">Vous souhaitez vendre votre véhicule ?</p>
        <p className="text-neutral-400 text-sm leading-relaxed max-w-md">
          Contactez-nous par WhatsApp ou email avec les informations de votre véhicule. Notre équipe vous accompagne de A à Z.
        </p>
        <a
          href="https://wa.me/221770000000"
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand-gold text-brand-black font-semibold text-sm rounded-xl hover:bg-brand-gold-soft transition-colors mt-2"
        >
          <MessageCircle size={16} />
          Contacter via WhatsApp
        </a>
      </div>
    </div>
  );
}
