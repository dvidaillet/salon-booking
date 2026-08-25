import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ServiceGrid from "@/components/services/ServiceGrid";
import { services } from "@/data/services";

export default function HomePage() {
  const featuredServices = services.filter(
    (service) => service.featured
  );

  return (
    <>
      <Header />

      <main>
        <section className="bg-neutral-950 px-6 py-28 text-white sm:py-36">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="mb-6 text-sm uppercase tracking-[0.3em] text-neutral-400">
                Belleza · Cuidado · Bienestar
              </p>

              <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                Tu momento de
                <span className="block text-neutral-400">
                  sentirte bien.
                </span>
              </h1>

              <p className="mt-8 max-w-xl text-base leading-7 text-neutral-400 sm:text-lg">
                Descubre nuestros servicios de belleza y reserva tu cita
                online de manera sencilla.
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/booking"
                  className="rounded-full bg-white px-7 py-3.5 text-center text-sm font-medium text-neutral-950 transition hover:bg-neutral-200"
                >
                  Reservar cita
                </Link>

                <Link
                  href="/services"
                  className="rounded-full border border-neutral-700 px-7 py-3.5 text-center text-sm font-medium text-white transition hover:bg-neutral-900"
                >
                  Ver servicios
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <p className="mb-3 text-sm uppercase tracking-[0.25em] text-neutral-500">
                  Descubre
                </p>

                <h2 className="text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
                  Nuestros servicios
                </h2>
              </div>

              <Link
                href="/services"
                className="text-sm font-medium text-neutral-900 underline underline-offset-4"
              >
                Ver todos
              </Link>
            </div>

            <ServiceGrid services={featuredServices} />
          </div>
        </section>

        <section className="bg-neutral-100 px-6 py-20 sm:py-28">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm uppercase tracking-[0.25em] text-neutral-500">
              Tu próxima cita
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
              Reserva cuando quieras
            </h2>

            <p className="mx-auto mt-5 max-w-xl leading-7 text-neutral-600">
              Consulta nuestros horarios disponibles y encuentra el momento
              perfecto para ti.
            </p>

            <Link
              href="/booking"
              className="mt-8 inline-flex rounded-full bg-neutral-950 px-7 py-3.5 text-sm font-medium text-white transition hover:bg-neutral-800"
            >
              Reservar ahora
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}