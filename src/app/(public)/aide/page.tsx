import { Accordion } from "@/components/ui/Accordion";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aide & FAQ — AutoDakar",
  description: "Trouvez des réponses à vos questions sur AutoDakar : recherche de véhicules, réservations, agents partenaires.",
};

const FAQS = [
  {
    question: "AutoDakar est-il gratuit pour les acheteurs ?",
    answer: "Oui, totalement. Parcourir le catalogue, contacter les agents et envoyer une demande de réservation est entièrement gratuit. Aucune inscription n'est nécessaire.",
  },
  {
    question: "Comment fonctionne la demande de réservation ?",
    answer: "Sur la fiche de chaque véhicule, un formulaire vous permet de laisser vos coordonnées et votre disponibilité. L'agent ou l'équipe AutoDakar vous recontacte rapidement pour confirmer la visite.",
  },
  {
    question: "Les véhicules sont-ils vérifiés ?",
    answer: "Oui. Chaque annonce est contrôlée avant d'être publiée. Les agents partenaires sont également certifiés par notre équipe après vérification de leurs activités.",
  },
  {
    question: "Comment devenir agent partenaire ?",
    answer: "Contactez-nous via la page Contact ou directement par WhatsApp. Notre équipe examine votre profil et vous guide dans le processus de certification.",
  },
  {
    question: "Puis-je acheter un véhicule directement sur AutoDakar ?",
    answer: "AutoDakar est une plateforme de mise en relation. Nous n'effectuons pas de transactions financières. La vente se conclut directement entre vous et le vendeur, après une visite physique.",
  },
  {
    question: "Comment signaler une annonce frauduleuse ?",
    answer: "Sur chaque fiche véhicule, un bouton de signalement est disponible. Nos équipes traitent les signalements dans les 24 heures.",
  },
  {
    question: "Le site est-il disponible sur mobile ?",
    answer: "Oui, AutoDakar est entièrement responsive et installable comme application sur votre téléphone (PWA). Appuyez sur 'Ajouter à l'écran d'accueil' dans votre navigateur.",
  },
];

export default function AidePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <SectionTitle
        label="Aide"
        title="Questions fréquentes"
        subtitle="Tout ce que vous devez savoir pour utiliser AutoDakar."
        align="center"
        className="mb-12"
      />

      <Accordion items={FAQS} />

      <div className="mt-12 text-center flex flex-col gap-3 items-center">
        <p className="text-neutral-500 text-sm">Vous ne trouvez pas la réponse ?</p>
        <Button href="/contact" variant="outline">Contacter notre équipe</Button>
      </div>
    </div>
  );
}
