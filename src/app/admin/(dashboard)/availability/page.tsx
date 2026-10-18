
import Link from "next/link";
import { ArrowLeft, CalendarOff } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import AvailabilityManager from "@/components/admin/AvailabilityManager";

export const dynamic = "force-dynamic";

export default async function AvailabilityPage() {
  const supabase = await createClient();

  const [
    { data: staff, error: staffError },
    { data: timeOff, error: timeOffError },
    { data: closures, error: closuresError },
  ] = await Promise.all([
    supabase
      .from("staff")
      .select("id, name, active")
      .order("name"),

    supabase
      .from("staff_time_off")
      .select("id, staff_id, starts_at, ends_at, reason")
      .order("starts_at"),

    supabase
      .from("salon_closures")
      .select("id, starts_at, ends_at, reason")
      .order("starts_at"),
  ]);

  const hasError = staffError || timeOffError || closuresError;

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
            <CalendarOff size={19} strokeWidth={1.5} />
            <span className="text-[10px] uppercase tracking-[0.3em]">
              Élite / Back Office
            </span>
          </div>

          <h1 className="text-4xl font-light tracking-[-0.06em] sm:text-6xl">
            Disponibilidad<span className="text-[#d6b79a]">.</span>
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-7 text-white/50">
            Registra ausencias individuales y cierres generales
            para controlar cuándo el salón puede recibir citas.
          </p>
        </header>

        {hasError ? (
          <p role="alert" className="mt-10 text-sm text-red-300">
            No se pudieron cargar los períodos de disponibilidad.
          </p>
        ) : (
          <AvailabilityManager
            staff={staff ?? []}
            timeOff={timeOff ?? []}
            closures={closures ?? []}
          />
        )}
      </div>
    </main>
  );
}
