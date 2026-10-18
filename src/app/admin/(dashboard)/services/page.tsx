
import Link from "next/link";
import { ArrowLeft, Scissors } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import ServicesManager from "@/components/admin/ServicesManager";

export const dynamic = "force-dynamic";

export default async function AdminServicesPage() {
  const supabase = await createClient();

  const { data: services, error } = await supabase
    .from("services")
    .select(
      "id, name, description, long_description, price, duration_minutes, category, image_url, featured, active"
    )
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
            <Scissors size={19} strokeWidth={1.5} />
            <span className="text-[10px] uppercase tracking-[0.3em]">
              Élite / Back Office
            </span>
          </div>

          <h1 className="text-4xl font-light tracking-[-0.06em] sm:text-6xl">
            Servicios<span className="text-[#d6b79a]">.</span>
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-7 text-white/50">
            Configura el catálogo del salón, sus duraciones,
            precios, imágenes y disponibilidad.
          </p>
        </header>

        {error ? (
          <p role="alert" className="mt-10 text-sm text-red-300">
            No se pudieron cargar los servicios.
          </p>
        ) : (
          <ServicesManager initialServices={services ?? []} />
        )}
      </div>
    </main>
  );
}
