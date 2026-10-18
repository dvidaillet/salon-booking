
import Link from "next/link";
import { ArrowLeft, Users } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import StaffManager from "@/components/admin/StaffManager";

export const dynamic = "force-dynamic";

export default async function StaffPage() {
  const supabase = await createClient();

  const { data: staff, error } = await supabase
    .from("staff")
    .select("id, name, bio, active")
    .order("created_at", { ascending: true });

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
            Administra el equipo del salón. Agrega profesionales,
            actualiza sus datos y controla quién está activa.
          </p>
        </header>

        {error ? (
          <p role="alert" className="mt-10 text-red-300">
            No se pudieron cargar las profesionales.
          </p>
        ) : (
          <StaffManager initialStaff={staff ?? []} />
        )}
      </div>
    </main>
  );
}
