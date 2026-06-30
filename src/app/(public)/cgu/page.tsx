import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions Générales d'Utilisation — AutoDakar",
  description: "Conditions générales d'utilisation de la plateforme AutoDakar.",
};

export default function CGUPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 prose prose-neutral prose-sm sm:prose-base">
      <h1 className="font-display text-3xl font-bold text-brand-black mb-2">Conditions Générales d&apos;Utilisation</h1>
      <p className="text-neutral-400 text-sm mb-10">Dernière mise à jour : juin 2026</p>

      <Section title="1. Objet">
        Les présentes Conditions Générales d&apos;Utilisation (CGU) régissent l&apos;accès et l&apos;utilisation de la plateforme AutoDakar (ci-après «&nbsp;le Service&nbsp;»), accessible à l&apos;adresse autodakar.sn. En accédant au Service, vous acceptez sans réserve les présentes CGU.
      </Section>

      <Section title="2. Description du Service">
        AutoDakar est une plateforme de mise en relation entre acheteurs et vendeurs de véhicules au Sénégal. AutoDakar n&apos;intervient pas dans les transactions financières et n&apos;est pas partie aux contrats conclus entre utilisateurs.
      </Section>

      <Section title="3. Accès et inscription">
        Le Service est librement accessible sans inscription pour la consultation des annonces. L&apos;envoi d&apos;une demande de réservation ne requiert pas de création de compte. AutoDakar se réserve le droit de restreindre l&apos;accès à certaines fonctionnalités.
      </Section>

      <Section title="4. Responsabilité des annonces">
        Les annonces publiées sont vérifiées par l&apos;équipe AutoDakar, cependant AutoDakar ne peut garantir l&apos;exactitude exhaustive de chaque information. L&apos;acheteur est invité à vérifier l&apos;état du véhicule lors d&apos;une visite physique.
      </Section>

      <Section title="5. Propriété intellectuelle">
        L&apos;ensemble des éléments constituant le Service (logos, textes, visuels, code) sont la propriété exclusive d&apos;AutoDakar ou de ses partenaires. Toute reproduction sans autorisation est interdite.
      </Section>

      <Section title="6. Limitation de responsabilité">
        AutoDakar ne saurait être tenu responsable de tout dommage direct ou indirect résultant de l&apos;utilisation du Service, d&apos;une transaction entre utilisateurs, ou d&apos;une indisponibilité temporaire du Service.
      </Section>

      <Section title="7. Modification des CGU">
        AutoDakar se réserve le droit de modifier les présentes CGU à tout moment. Les utilisateurs sont invités à les consulter régulièrement. La poursuite de l&apos;utilisation du Service vaut acceptation des nouvelles CGU.
      </Section>

      <Section title="8. Droit applicable">
        Les présentes CGU sont soumises au droit sénégalais. Tout litige sera soumis aux tribunaux compétents de Dakar.
      </Section>

      <Section title="9. Contact">
        Pour toute question relative aux CGU, contactez-nous à l&apos;adresse : <a href="mailto:legal@autodakar.sn" className="text-brand-gold hover:underline">legal@autodakar.sn</a>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h2 className="font-display font-semibold text-lg text-brand-black mb-3">{title}</h2>
      <p className="text-neutral-600 leading-relaxed text-sm">{children}</p>
    </div>
  );
}
