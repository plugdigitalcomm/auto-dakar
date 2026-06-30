import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité — AutoDakar",
  description: "Politique de confidentialité et traitement des données personnelles sur AutoDakar.",
};

export default function ConfidentialitePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="font-display text-3xl font-bold text-brand-black mb-2">Politique de confidentialité</h1>
      <p className="text-neutral-400 text-sm mb-10">Dernière mise à jour : juin 2026</p>

      <Section title="1. Responsable du traitement">
        AutoDakar, plateforme de vente de véhicules au Sénégal. Contact : <a href="mailto:privacy@autodakar.sn" className="text-brand-gold hover:underline">privacy@autodakar.sn</a>
      </Section>

      <Section title="2. Données collectées">
        Nous collectons uniquement les données que vous nous fournissez volontairement via le formulaire de demande de réservation : nom, numéro de téléphone, ville, date souhaitée et message éventuel. Aucune donnée de navigation n&apos;est collectée à des fins publicitaires.
      </Section>

      <Section title="3. Finalité du traitement">
        Les données collectées sont utilisées exclusivement pour traiter votre demande de réservation et vous recontacter. Elles ne sont jamais revendues à des tiers.
      </Section>

      <Section title="4. Durée de conservation">
        Vos données sont conservées pendant 12 mois à compter de votre demande, puis supprimées automatiquement.
      </Section>

      <Section title="5. Vos droits">
        Conformément à la loi sénégalaise sur la protection des données personnelles, vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression de vos données. Pour exercer ces droits, contactez-nous à <a href="mailto:privacy@autodakar.sn" className="text-brand-gold hover:underline">privacy@autodakar.sn</a>.
      </Section>

      <Section title="6. Sécurité">
        Vos données sont stockées sur des serveurs sécurisés (Supabase, hébergés en Europe). Des mesures techniques et organisationnelles appropriées sont mises en place pour les protéger.
      </Section>

      <Section title="7. Cookies">
        AutoDakar n&apos;utilise pas de cookies publicitaires ou de traceurs tiers. Des cookies techniques strictement nécessaires au fonctionnement du site peuvent être utilisés.
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
