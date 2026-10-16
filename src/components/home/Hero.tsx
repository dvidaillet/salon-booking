
"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
} from "motion/react";
import {
  ArrowDown,
  ArrowUpRight,
  MoveUpRight,
} from "lucide-react";
import { siteConfig } from "@/config/site";

const heroImage =
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=2400&q=85";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const reduceMotion = useReducedMotion();

  const reveal = (delay: number) => ({
    initial: reduceMotion
      ? false
      : { opacity: 0, y: 45 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: reduceMotion ? 0 : 1,
      delay: reduceMotion ? 0 : delay,
      ease,
    },
  });

  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate min-h-[760px] overflow-hidden bg-[#11100f] text-white md:min-h-[850px]"
    >
      {/* FOTOGRAFÍA CINEMATOGRÁFICA */}
      <motion.div
        initial={
          reduceMotion
            ? false
            : { scale: 1.15, opacity: 0.5 }
        }
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: reduceMotion ? 0 : 2,
          ease,
        }}
        className="absolute inset-0 -z-20"
      >
        <Image
          src={heroImage}
          alt="Retrato editorial de belleza utilizado como imagen de inspiración"
          fill
          priority
          quality={85}
          sizes="100vw"
          className="object-cover object-[55%_center] md:object-center"
        />
      </motion.div>

      {/* CAPAS DE ILUMINACIÓN */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-black/35" />

      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/45 to-transparent" />

      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-transparent to-black/25" />

      {/* LÍNEAS EDITORIALES */}
      <div className="pointer-events-none absolute inset-y-0 left-6 hidden w-px bg-white/10 lg:block" />
      <div className="pointer-events-none absolute inset-y-0 right-6 hidden w-px bg-white/10 lg:block" />

      {/* CONTENIDO */}
      <div className="relative mx-auto flex min-h-[760px] max-w-[1600px] flex-col px-6 pb-10 pt-36 sm:px-10 md:min-h-[850px] md:pb-14 md:pt-44 lg:px-20">
        {/* CABECERA EDITORIAL */}
        <motion.div
          {...reveal(0.2)}
          className="flex items-center gap-4"
        >
          <span className="h-px w-10 bg-[#c9aa88]" />

          <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-white/75">
            Beauty / Art / Identity
          </span>
        </motion.div>

        {/* TITULAR PRINCIPAL */}
        <div className="my-auto max-w-[1050px] py-20">
          <motion.p
            {...reveal(0.35)}
            className="mb-7 text-[11px] uppercase tracking-[0.45em] text-[#d5b99b]"
          >
            {siteConfig.name}
          </motion.p>

          <h1
            id="hero-title"
            className="max-w-[1050px] text-[clamp(4.2rem,11vw,11rem)] font-light uppercase leading-[0.82] tracking-[-0.085em]"
          >
            <motion.span
              {...reveal(0.45)}
              className="block"
            >
              Belleza
            </motion.span>

            <motion.span
              {...reveal(0.65)}
              className="mt-4 block font-medium italic text-[#d6b79a] sm:mt-6"
            >
              Sin límites.
            </motion.span>
          </h1>

          <motion.div
            {...reveal(0.85)}
            className="mt-10 flex max-w-xl flex-col gap-8 border-l border-[#c9aa88] pl-5 sm:mt-14 sm:pl-7"
          >
            <p className="max-w-md text-sm font-light leading-7 text-white/80 sm:text-base sm:leading-8">
              Tu estilo es una forma de expresión.
              Descubre un espacio donde la belleza,
              la creatividad y el cuidado personal
              se encuentran.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/services"
                className="group inline-flex min-h-12 items-center justify-center gap-5 rounded-full bg-[#d6b79a] px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#171310] transition-all duration-300 hover:bg-white"
              >
                Explorar servicios

                <ArrowUpRight
                  size={17}
                  strokeWidth={1.7}
                  className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/#contacto"
                className="group inline-flex min-h-12 items-center justify-center gap-3 border-b border-white/45 px-2 py-3 text-[11px] font-medium uppercase tracking-[0.15em] text-white transition-colors duration-300 hover:border-[#d6b79a] hover:text-[#d6b79a]"
              >
                Contactar

                <MoveUpRight
                  size={16}
                  strokeWidth={1.6}
                  className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* FRANJA INFERIOR */}
        <motion.div
          {...reveal(1.05)}
          className="flex items-end justify-between gap-6 border-t border-white/20 pt-6"
        >
          <div className="flex flex-col gap-2">
            <span className="text-[9px] uppercase tracking-[0.3em] text-[#d6b79a]">
              Élite Beauty Studio
            </span>

            <span className="text-xs font-light text-white/65">
              {siteConfig.tagline}
            </span>
          </div>

          <a
            href="#nosotros"
            aria-label="Desplazarse a la siguiente sección"
            className="group flex items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-white"
          >
            <span className="hidden sm:inline">
              Descubrir
            </span>

            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 transition-all duration-300 group-hover:border-[#d6b79a] group-hover:bg-[#d6b79a] group-hover:text-black">
              <ArrowDown size={17} strokeWidth={1.5} />
            </span>
          </a>
        </motion.div>
      </div>

      {/* MARCA LATERAL */}
      <div className="pointer-events-none absolute bottom-1/2 right-8 hidden translate-y-1/2 [writing-mode:vertical-rl] lg:block">
        <span className="text-[9px] uppercase tracking-[0.45em] text-white/45">
          The Art of Beauty
        </span>
      </div>
    </section>
  );
}
