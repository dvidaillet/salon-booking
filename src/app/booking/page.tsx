
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { createAdminClient } from "@/lib/supabase/admin";
import BookingExperience from "@/components/booking/BookingExperience";

export const dynamic = "force-dynamic";

interface BookingPageProps {
  searchParams: Promise<{
    service?: string;
  }>;
}

export default async function BookingPage({
  searchParams,
}: BookingPageProps) {
  const params = await searchParams;
  const supabase = createAdminClient();

  const { data: services, error } = await supabase
    .from("services")
    .select("id, name, description, duration_minutes, category")
    .eq("active", true)
    .order("name", { ascending: true });

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#11100f] text-white">
        <section className="relative overflow-hidden border-b border-white/10 px-5 pb-14 pt-24 sm:px-10 sm:pb-20 sm:pt-32 lg:px-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-[#d6b79a]/10 blur-[110px]"
          />

          <div className="relative mx-auto max-w-6xl">
            <p className="text-[10px] uppercase tracking-[0.32em] text-[#d6b79a]">
              Élite / Reservas
            </p>

            <h1 className="mt-7 max-w-4xl text-5xl font-light tracking-[-0.065em] sm:text-6xl lg:text-7xl">
              Tu belleza.
              <br />
              <span className="italic text-[#d6b79a]">
                Tu momento.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-sm leading-8 text-white/55 sm:text-base">
              Elige tu servicio, encuentra a tu profesional
              y descubre los horarios disponibles en nuestro salón
              de Guantánamo.
            </p>

            <p className="mt-5 text-xs text-white/35">
              Todas las horas se muestran en el horario de Cuba.
            </p>
          </div>
        </section>

        <section className="px-5 py-12 sm:px-10 sm:py-20 lg:px-16">
          <div className="mx-auto max-w-6xl">
            {error ? (
              <p role="alert" className="text-sm text-red-300">
                No pudimos cargar los servicios.
                Inténtalo de nuevo más tarde.
              </p>
            ) : (
              <BookingExperience
                services={services ?? []}
                initialServiceId={params.service}
              />
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
