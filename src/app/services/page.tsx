import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ServiceGrid from "@/components/services/ServiceGrid";
import { services as fallbackServices } from "@/data/services";
import { siteConfig } from "@/config/site";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Service } from "@/types/service";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Nuestros servicios",
  description: `Descubre los servicios de belleza y cuidado personal de ${siteConfig.name}.`,
};

type DatabaseService = {
  id: string;
  name: string;
  description: string | null;
  long_description: string | null;
  duration_minutes: number;
  price: number | null;
  category: string | null;
  image_url: string | null;
  featured: boolean;
};

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=900&q=80";

function mapService(item: DatabaseService): Service {
  const matchingStaticService = fallbackServices.find(
    (service) => service.name.trim().toLocaleLowerCase("es") === item.name.trim().toLocaleLowerCase("es")
  );

  return {
    id: item.id,
    name: item.name,
    description: item.description ?? "Descubre este servicio de belleza y cuidado personal.",
    longDescription: item.long_description ?? item.description ?? "Una experiencia de belleza y cuidado personal diseñada para ti.",
    price: item.price === null ? 0 : Number(item.price),
    duration: item.duration_minutes,
    category: item.category ?? "Belleza",
    image: item.image_url?.trim() || matchingStaticService?.image || DEFAULT_IMAGE,
    featured: item.featured,
  };
}

export default async function ServicesPage() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("services")
    .select("id, name, description, long_description, duration_minutes, price, category, image_url, featured")
    .eq("active", true)
    .order("featured", { ascending: false })
    .order("name", { ascending: true });

  if (error) {
    console.error("Error al cargar los servicios públicos:", error.message);
  }

  const services: Service[] = error ? [] : (data ?? []).map(mapService);

  return (
    <>
      <Header />

      <main className="bg-[#11100f] text-white">
        {/* HERO */}
        <section
          aria-labelledby="services-title"
          className="relative isolate overflow-hidden bg-[#11100f] px-5 pb-24 pt-36 text-white sm:px-10 sm:pb-32 sm:pt-44 lg:px-16 lg:pb-40 lg:pt-52"
        >
          <div className="pointer-events-none absolute -right-32 top-0 -z-10 h-[450px] w-[450px] rounded-full border border-white/[0.06] sm:h-[650px] sm:w-[650px]" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#a68c74]/10 blur-[140px]" />

          <div className="relative mx-auto max-w-[1450px]">
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-[#d6b79a]" />
              <span className="text-[10px] uppercase tracking-[0.28em] text-[#d6b79a]">
                The Élite Experience
              </span>
            </div>

            <h1
              id="services-title"
              className="mt-9 max-w-6xl text-[clamp(3.3rem,10vw,10rem)] font-light uppercase leading-[0.88] tracking-[-0.075em] text-white"
            >
              El arte de
              <span className="mt-2 block font-medium italic text-[#d6b79a]">
                cuidarte.
              </span>
            </h1>

            <div className="mt-12 flex flex-col justify-between gap-9 border-t border-white/15 pt-8 md:flex-row md:items-end">
              <p className="max-w-lg text-sm font-light leading-8 text-white/70 sm:text-base">
                Cada detalle cuenta. Explora nuestra selección
                de servicios de belleza y descubre nuevas formas
                de expresar tu estilo.
              </p>

              <a
                href="#catalogo"
                className="group inline-flex min-h-12 items-center gap-4 self-start text-[11px] font-medium uppercase tracking-[0.16em] text-[#d6b79a] transition-colors hover:text-white"
              >
                Explorar catálogo
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d6b79a]/50 transition-colors group-hover:border-white">
                  <ArrowDownRight size={18} strokeWidth={1.5} />
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* CATÁLOGO OSCURO */}
        <section
          id="catalogo"
          aria-labelledby="catalogo-title"
          style={{ backgroundColor: "#171310", color: "#ffffff" }}
          className="scroll-mt-24 border-t border-white/10 px-5 py-20 sm:px-10 sm:py-28 lg:px-16 lg:py-36"
        >
          <div className="mx-auto max-w-[1450px]">
            <div className="mb-12 flex flex-col justify-between gap-7 border-b border-white/15 pb-10 sm:mb-16 lg:mb-20 lg:flex-row lg:items-end">
              <div>
                <div className="flex items-center gap-4">
                  <span className="h-px w-10 bg-[#d6b79a]" />
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#d6b79a]">
                    Descubre nuestra selección
                  </span>
                </div>
                <h2
                  id="catalogo-title"
                  className="mt-6 text-[clamp(2.6rem,6vw,6rem)] font-light leading-[0.95] tracking-[-0.06em] text-white"
                >
                  Nuestros
                  <span className="mt-2 block font-medium italic text-[#d6b79a]">
                    servicios.
                  </span>
                </h2>
              </div>
              <p className="max-w-sm text-sm font-light leading-7 text-white/70">
                Belleza, estilo y bienestar en una experiencia
                diseñada para ti.
              </p>
            </div>

            {error ? (
              <p role="alert" className="py-16 text-center text-sm text-white/65">
                No pudimos cargar los servicios en este momento. Inténtalo de nuevo más tarde.
              </p>
            ) : services.length > 0 ? (
              <ServiceGrid services={services} />
            ) : (
              <p className="py-16 text-center text-sm text-white/65">
                Próximamente encontrarás aquí nuestros servicios.
              </p>
            )}
          </div>
        </section>

        {/* CIERRE */}
        <section className="border-t border-white/10 bg-[#11100f] px-5 py-24 text-white sm:px-10 sm:py-32 lg:px-16">
          <div className="mx-auto flex max-w-[1450px] flex-col justify-between gap-10 lg:flex-row lg:items-end">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#d6b79a]">
                Your Beauty, Your Moment
              </p>
              <h2 className="mt-6 max-w-3xl text-[clamp(2.8rem,6vw,6rem)] font-light leading-[0.95] tracking-[-0.06em] text-white">
                La belleza tiene
                <span className="mt-2 block italic text-[#d6b79a]">
                  tu nombre.
                </span>
              </h2>
            </div>
            <Link
              href="/#contacto"
              className="group inline-flex min-h-12 items-center gap-4 self-start rounded-full border border-[#d6b79a]/60 px-6 py-3 text-[11px] uppercase tracking-[0.14em] text-[#d6b79a] transition-colors hover:bg-[#d6b79a] hover:text-[#11100f]"
            >
              Información de contacto
              <ArrowUpRight size={17} strokeWidth={1.5} />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
