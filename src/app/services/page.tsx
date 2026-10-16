
import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ServiceGrid from "@/components/services/ServiceGrid";
import { services } from "@/data/services";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Nuestros servicios",
  description:
    "Descubre los servicios de belleza, cabello y cuidado personal de " +
    siteConfig.name,
};

export default function ServicesPage() {
  return (
    <>
      <Header />

      <main>
        <section className="relative overflow-hidden bg-neutral-950 text-white">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=2000&q=85')",
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/85 to-neutral-950/40" />

          <div className="relative mx-auto max-w-7xl px-6 py-28 sm:py-36 lg:px-10 lg:py-44">
            <div className="mb-8 flex items-center gap-4">
              <span className="h-px w-10 bg-white/50" />
              <span className="text-[10px] uppercase tracking-[0.35em] text-white/65">
                Élite Beauty Studio
              </span>
            </div>

            <h1 className="max-w-4xl text-5xl font-light leading-[1.05] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
              El arte de
              <span className="block font-medium italic text-[#d8c2a7]">
                cuidar de ti.
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-sm leading-8 text-white/65 sm:text-base">
              Explora nuestros servicios de belleza y cuidado
              personal. Cada detalle está pensado para ayudarte
              a expresar tu estilo.
            </p>

            <a
              href="#catalogo"
              className="mt-10 inline-flex items-center gap-3 border-b border-white/40 pb-2 text-xs uppercase tracking-[0.2em] text-white transition-colors hover:border-white"
            >
              Explorar servicios
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </section>

        <section
          id="catalogo"
          className="scroll-mt-24 bg-[#faf8f5] px-6 py-24 sm:py-32 lg:px-10"
        >
          <div className="mx-auto max-w-7xl">
            <div className="mb-14 flex flex-col justify-between gap-6 border-b border-neutral-200 pb-10 lg:mb-20 lg:flex-row lg:items-end">
              <div>
                <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.35em] text-neutral-500">
                  Descubre nuestra selección
                </p>

                <h2 className="text-4xl font-light tracking-[-0.045em] text-neutral-950 sm:text-5xl">
                  Nuestros servicios
                </h2>
              </div>

              <p className="max-w-sm text-sm leading-7 text-neutral-500">
                Belleza, estilo y bienestar en una experiencia
                diseñada para ti.
              </p>
            </div>

            <ServiceGrid services={services} />
          </div>
        </section>

        <section className="bg-[#eae4dc] px-6 py-24 text-center sm:py-32">
          <div className="mx-auto max-w-3xl">
            <p className="mb-6 text-[10px] uppercase tracking-[0.35em] text-neutral-500">
              Estamos para ayudarte
            </p>

            <h2 className="text-4xl font-light tracking-[-0.045em] text-neutral-950 sm:text-5xl">
              ¿Quieres saber más?
            </h2>

            <p className="mx-auto mt-6 max-w-lg text-sm leading-7 text-neutral-600">
              Conoce nuestros servicios y ponte en contacto
              con nosotros para obtener más información.
            </p>

            <Link
              href="/#contacto"
              className="mt-9 inline-flex items-center gap-3 rounded-full bg-neutral-950 px-8 py-4 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-1 hover:bg-neutral-800"
            >
              Contáctanos
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
