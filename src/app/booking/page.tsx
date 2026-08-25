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
        <section className="bg-neutral-950 px-6 py-20 text-white sm:py-24">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
              Reserva online
            </p>

            <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Reserva tu próximo momento
            </h1>

            <p className="mt-6 max-w-xl leading-7 text-white/50">
              Elige un servicio, selecciona un día dentro de los
              próximos 7 días y encuentra el horario que mejor te
              convenga.
            </p>
          </div>
        </section>

        <section className="px-6 py-12 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <BookingForm service={selectedService} />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}