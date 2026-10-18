import Link from "next/link";
import { ArrowLeft, Users } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import StaffManager from "@/components/admin/StaffManager";
import StaffServicesManager from "@/components/admin/StaffServicesManager";
import StaffScheduleManager from "@/components/admin/StaffScheduleManager";

export const dynamic = "force-dynamic";

export default async function StaffPage() {
  const supabase = await createClient();

  const [
    { data: staff, error: staffError },
    { data: services, error: servicesError },
    { data: assignments, error: assignmentsError },
    { data: schedules, error: schedulesError },
  ] = await Promise.all([
    supabase
      .from("staff")
      .select("id, name, bio, active")
      .order("created_at", { ascending: true }),

    supabase
      .from("services")
      .select("id, name, duration_minutes, active")
      .order("name", { ascending: true }),

    supabase.from("staff_services").select("staff_id, service_id"),

    supabase
      .from("staff_schedules")
      .select("id, staff_id, day_of_week, start_time, end_time"),
  ]);

  const hasError =
    staffError || servicesError || assignmentsError || schedulesError;

  return (
    <main className="min-h-screen bg-[#11100f] px-5 py-10 text-white sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-white/50 transition hover:text-[#d6b79a]"
        >
          <ArrowLeft size={16} />
          Volver al panel
        </Link>

        <header className="mt-12 border-b border-white/10 pb-10">
          <div className="mb-6 flex items-center gap-3 text-[#d6b79a]">
            <Users size={19} strokeWidth={1.5} />
            <span className="text-[10px] uppercase tracking-[0.3em]">
              Élite / Back Office
            </span>
          </div>

          <h1 className="text-4xl font-light tracking-[-0.06em] sm:text-6xl">
            Profesionales<span className="text-[#d6b79a]">.</span>
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-7 text-white/50">
            Administra el equipo del salón y configura los servicios que puede
            realizar cada profesional.
          </p>
        </header>

        {hasError ? (
          <p role="alert" className="mt-10 text-sm text-red-300">
            No se pudieron cargar los datos del equipo.
          </p>
        ) : (
          <>
            <StaffManager initialStaff={staff ?? []} />

            <div className="mt-10 border-t border-white/10 pt-12">
              <StaffServicesManager
                staff={staff ?? []}
                services={services ?? []}
                assignments={assignments ?? []}
              />
            </div>
            <div className="mt-10 border-t border-white/10 pt-12">
              <StaffScheduleManager
                staff={staff ?? []}
                schedules={schedules ?? []}
              />
            </div>
          </>
        )}
      </div>
    </main>
  );
}
