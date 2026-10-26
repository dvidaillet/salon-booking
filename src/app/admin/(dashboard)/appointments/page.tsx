import { createClient } from "@/lib/supabase/server";
import AppointmentsManager from "@/components/admin/AppointmentsManager";

export const dynamic = "force-dynamic";

export default async function AppointmentsPage() {
  const supabase = await createClient();

  // El layout del dashboard verifica la sesión y el rol de administrador.
  // Aquí se vuelve a comprobar el rol antes de consultar datos privados.
  const { data: userData } = await supabase.auth.getUser();
  const { data: isAdmin } = await supabase.rpc("is_admin");

  if (!userData.user || isAdmin !== true) {
    return (
      <main className="p-6 text-sm text-red-300">
        No tienes permisos para consultar las citas.
      </main>
    );
  }

  const { data, error } = await supabase
    .from("appointments")
    .select(
      "id, customer_name, customer_phone, customer_notes, starts_at, ends_at, status, created_at, services(name), staff(name)",
    )
    .order("starts_at", { ascending: false })
    .limit(300);

  if (error) {
    console.error("Error al cargar citas:", error.code);
    return (
      <main className="p-6 text-sm text-red-300">
        No se pudieron cargar las citas. Inténtalo nuevamente.
      </main>
    );
  }

  const appointments = (data ?? []).map((item) => ({
    id: item.id,
    customerName: item.customer_name,
    customerPhone: item.customer_phone,
    customerNotes: item.customer_notes,
    startsAt: item.starts_at,
    endsAt: item.ends_at,
    status: item.status,
    createdAt: item.created_at,
    serviceName: item.services?.name ?? "Servicio no disponible",
    staffName: item.staff?.name ?? "Profesional no disponible",
  }));

  return (
    <main className="min-h-screen bg-[#11100f] px-5 py-10 text-white sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-[#d6b79a]">
            ÉLITE · Back Office
          </p>
          <h1 className="mt-3 text-3xl font-light sm:text-4xl">
            Gestión de citas
          </h1>
          <p className="mt-3 text-sm leading-7 text-white/50">
            Revisa las solicitudes y administra las citas del salón.
          </p>
        </div>
        <AppointmentsManager appointments={appointments} />
      </div>
    </main>
  );
}
