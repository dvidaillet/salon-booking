import ServiceGrid from "@/components/services/ServiceGrid";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { services } from "@/data/services";

export default function ServicesPage() {
  return (
    <>
      <Header />

      <main>
        <section className="bg-neutral-950 px-6 py-24 text-white">
          <div className="mx-auto max-w-7xl">
            <p className="mb-4 text-sm uppercase tracking-[0.25em] text-neutral-400">
              Nuestro catálogo
            </p>

            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Servicios pensados para ti
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-neutral-400">
              Descubre nuestros servicios de belleza y reserva tu cita
              de forma rápida y sencilla.
            </p>
          </div>
        </section>

        <section className="bg-neutral-50 px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <ServiceGrid services={services} />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}