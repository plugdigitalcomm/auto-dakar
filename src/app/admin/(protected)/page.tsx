import { auth, signOut } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { LogOut } from "lucide-react";

export default async function AdminDashboardPage() {
  const session = await auth();

  const [vehicleCount, reservationCount] = await Promise.all([
    prisma.vehicle.count(),
    prisma.reservation.count(),
  ]);

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-8">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold">Tableau de bord</h1>
            <p className="text-neutral-400 text-sm mt-1">Bonjour, {session?.user?.name}</p>
          </div>
          <form action={async () => { "use server"; await signOut({ redirectTo: "/admin/login" }); }}>
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-700 text-sm text-neutral-400 hover:text-white hover:border-neutral-500 transition-colors"
            >
              <LogOut size={14} />
              Déconnexion
            </button>
          </form>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard label="Véhicules" value={vehicleCount} />
          <StatCard label="Réservations" value={reservationCount} />
          <StatCard label="Agents" value="—" />
          <StatCard label="Signalements" value="—" />
        </div>

        <p className="text-neutral-600 text-sm text-center">
          Dashboard complet (CRUD véhicules, réservations, agents) — en cours de construction.
        </p>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex flex-col gap-1 p-5 rounded-2xl bg-neutral-900 border border-neutral-800">
      <p className="text-xs text-neutral-500 font-medium">{label}</p>
      <p className="font-display text-2xl font-bold text-white">{value}</p>
    </div>
  );
}
