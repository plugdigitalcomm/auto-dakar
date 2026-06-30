"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Car, CalendarCheck, Users, Star, Flag, LayoutDashboard, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/admin", label: "Tableau de bord", icon: LayoutDashboard, exact: true },
  { href: "/admin/vehicules", label: "Véhicules", icon: Car },
  { href: "/admin/reservations", label: "Réservations", icon: CalendarCheck },
  { href: "/admin/agents", label: "Agents", icon: Users },
  { href: "/admin/avis", label: "Avis", icon: Star },
  { href: "/admin/signalements", label: "Signalements", icon: Flag },
];

interface AdminSidebarProps {
  userName: string;
}

export function AdminSidebar({ userName }: AdminSidebarProps) {
  const pathname = usePathname();

  function isActive(href: string, exact = false) {
    return exact ? pathname === href : pathname.startsWith(href);
  }

  return (
    <aside className="w-60 shrink-0 bg-neutral-900 border-r border-neutral-800 flex flex-col min-h-screen">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-neutral-800">
        <Link href="/" className="font-display font-bold text-brand-gold text-lg">
          AutoDakar
        </Link>
        <p className="text-xs text-neutral-500 mt-0.5">Administration</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {NAV_ITEMS.map(({ href, label, icon: Icon, exact }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              isActive(href, exact)
                ? "bg-brand-gold/10 text-brand-gold"
                : "text-neutral-400 hover:text-white hover:bg-neutral-800"
            )}
          >
            <Icon size={16} />
            {label}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-neutral-800 flex flex-col gap-2">
        <div className="px-3 py-2">
          <p className="text-xs text-neutral-500">Connecté en tant que</p>
          <p className="text-sm text-white font-medium truncate">{userName}</p>
        </div>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-neutral-400 hover:text-red-400 hover:bg-neutral-800 transition-colors w-full text-left"
        >
          <LogOut size={16} />
          Déconnexion
        </button>
      </div>
    </aside>
  );
}
