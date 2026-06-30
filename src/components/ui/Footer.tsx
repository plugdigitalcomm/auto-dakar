import Link from "next/link";
import { Logo } from "./Logo";

const FOOTER_LINKS = {
  "Découvrir": [
    { href: "/catalogue", label: "Catalogue" },
    { href: "/recherche", label: "Recherche avancée" },
    { href: "/a-propos", label: "À propos" },
  ],
  "Assistance": [
    { href: "/aide", label: "Centre d'aide" },
    { href: "/contact", label: "Contact" },
  ],
  "Légal": [
    { href: "/cgu", label: "Conditions d'utilisation" },
    { href: "/confidentialite", label: "Politique de confidentialité" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-brand-black text-neutral-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Branding */}
          <div className="lg:col-span-1">
            <Logo className="mb-4 [&_span]:text-brand-white [&_span_span]:text-brand-gold" />
            <p className="text-sm leading-relaxed text-neutral-500">
              La plateforme premium de vente de voitures neuves et d&apos;occasion au Sénégal.
            </p>
          </div>

          {/* Colonnes de liens */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-300 mb-4">
                {title}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-500 hover:text-brand-gold transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-neutral-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-600">
            © {new Date().getFullYear()} AutoDakar. Tous droits réservés.
          </p>
          <p className="text-xs text-neutral-600">
            Dakar, Sénégal
          </p>
        </div>
      </div>
    </footer>
  );
}
