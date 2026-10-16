
"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { siteConfig } from "@/config/site";

const ease = [0.22, 1, 0.36, 1] as const;

export default function BookingCTA() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="contact-cta-title"
      className="relative isolate overflow-hidden bg-[#0c0b0a] px-6 py-28 text-white sm:px-10 sm:py-36 lg:px-16 lg:py-44"
    >
      {/* ILUMINACIÓN ATMOSFÉRICA */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#a68c74]/10 blur-[150px]" />

      <div className="mx-auto max-w-[1450px]">
        <motion.div
          initial={
            reduceMotion ? false : { opacity: 0, y: 40 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: reduceMotion ? 0 : 0.9,
            ease,
          }}
        >
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-[#d6b79a]" />

            <span className="text-[10px] uppercase tracking-[0.3em] text-[#d6b79a]">
              Your Moment Starts Here
            </span>
          </div>

          <div className="mt-12 grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <h2
              id="contact-cta-title"
              className="min-w-0 text-[clamp(3.4rem,9vw,10rem)] font-light uppercase leading-[0.86] tracking-[-0.075em]"
            >
              Tu próximo
              <span className="mt-3 block font-medium italic text-[#d6b79a]">
                momento.
              </span>
            </h2>

            <div className="max-w-md lg:pb-3">
              <p className="text-base font-light leading-8 text-white/65">
                Hay momentos que merecen ser solo tuyos.
                Descubre nuestros servicios y encuentra
                la inspiración para tu próxima experiencia
                de belleza.
              </p>

              <div className="mt-9 flex flex-wrap gap-4">
                <Link
                  href="/services"
                  className="group inline-flex min-h-12 items-center gap-4 rounded-full bg-[#d6b79a] px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.13em] text-[#171310] transition-colors duration-300 hover:bg-white"
                >
                  Ver servicios

                  <ArrowUpRight
                    size={17}
                    strokeWidth={1.6}
                    className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </Link>

                <a
                  href="#contacto"
                  className="group inline-flex min-h-12 items-center gap-3 border-b border-white/35 px-2 py-3 text-[11px] font-medium uppercase tracking-[0.13em] text-white transition-colors hover:border-[#d6b79a] hover:text-[#d6b79a]"
                >
                  Información de contacto

                  <ArrowDownRight
                    size={17}
                    strokeWidth={1.6}
                  />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-24 flex flex-col justify-between gap-5 border-t border-white/15 pt-7 sm:mt-32 sm:flex-row sm:items-center">
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">
            {siteConfig.name}
          </span>

          <span className="text-[10px] uppercase tracking-[0.2em] text-[#d6b79a]">
            {siteConfig.tagline}
          </span>
        </div>
      </div>
    </section>
  );
}
