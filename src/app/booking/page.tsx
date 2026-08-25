import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BookingForm from "@/components/booking/BookingForm";
import { services } from "@/data/services";

interface BookingPageProps {
  searchParams: Promise<{
    service?: string;
  }>;
}

export default async function BookingPage({
  searchParams,
}: BookingPageProps) {
  const params = await searchParams;

  const selectedService = services.find(
    (service) => service.id === params.service
  );

  return (
    <>
      <Header />

      <main className="min-h-screen bg-neutral-50">
        {/* Header de la página */}
        <section className="bg-neutral-950 px-6 py-20 text-white sm:py-24">
          <div className="mx-auto max-w-4xl">
            <p className="text-sm uppercase tracking-[0.25em] text-neutral-400">
              Reserva online
            </p>

            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Reserva tu cita
            </h1>

            <p className="mt-5 max-w-xl leading-7 text-neutral-400">
              Selecciona el día y horario que prefieras y déjanos tus
              datos para preparar tu cita.
            </p>
          </div>
        </section>

        {/* Formulario */}
        <section className="px-6 py-12 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <BookingForm service={selectedService} />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}