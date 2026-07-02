import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Annonce reçue — AutoDakar",
};

export default async function MerciPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const { ref } = await searchParams;

  return (
    <div className="min-h-screen bg-brand-white flex items-center justify-center px-4 pt-20">
      <div className="max-w-md w-full text-center bg-brand-white rounded-2xl border border-neutral-200 p-8 shadow-sm">
        <div className="w-16 h-16 rounded-full bg-green-50 text-green-500 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 size={32} />
        </div>
        <h1 className="font-display text-2xl font-bold text-brand-black">Annonce bien reçue !</h1>
        <p className="mt-3 text-sm text-neutral-500">
          Merci. Votre annonce est en cours de vérification par notre équipe. Elle sera mise en ligne
          après validation (généralement sous 24h). Nous vous contacterons si besoin.
        </p>
        {ref && (
          <p className="mt-4 text-xs text-neutral-400">
            Référence : <span className="font-mono text-neutral-600">{ref}</span>
          </p>
        )}
        <Link
          href="/"
          className="inline-block mt-6 px-6 py-3 bg-brand-gold text-brand-black font-semibold text-sm rounded-lg hover:bg-brand-gold-soft transition-colors"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}
