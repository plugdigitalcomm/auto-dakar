import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-neutral-950 flex">
      <AdminSidebar userName={session.user?.name ?? "Admin"} />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
