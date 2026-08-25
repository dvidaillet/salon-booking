import Link from "next/link";
import { services } from "@/data/services";
import ServiceCard from "@/components/services/ServiceCard";

export default function FeaturedServices() {
  const featuredServices = services.filter(
    (service) => service.featured
  );

  return (
    <section className="bg-white px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
              Nuestros servicios
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-neutral-950 sm:text-5xl">
              Pensados para ti
            </h2>

            <p className="mt-5 max-w-xl leading-7 text-neutral-500">
              Tratamientos profesionales diseñados para que puedas
              dedicarte un momento y salir sintiéndote mejor.
            </p>
          </div>

          <Link
            href="/services"
            className="shrink-0 text-sm font-medium text-neutral-900 underline underline-offset-8"
          >
            Ver todos los servicios
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {featuredServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
            />
          ))}
        </div>
      </div>
    </section>
  );
}