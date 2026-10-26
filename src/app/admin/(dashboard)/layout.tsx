import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminNavigation from "@/components/admin/AdminNavigation";

export const dynamic = "force-dynamic";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/admin/login");
  }

  const { data: isAdmin, error: permissionError } =
    await supabase.rpc("is_admin");

  if (permissionError || isAdmin !== true) {
    redirect("/admin/unauthorized");
  }

  return (
    <div className="min-h-screen bg-[#11100f] text-white">
      <AdminNavigation />
      {children}
    </div>
  );
}
