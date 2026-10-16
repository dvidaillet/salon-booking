
"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

export default function BookingCTA() {
  return (
    <section className="relative overflow-hidden bg-[#f5f2ed] py-24 sm:py-32">
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full border border-neutral-900/5" />
      <div className="pointer-events-none absolute -bottom-48 -left-32 h-[500px] w-[500px] rounded-full border border-neutral-900/5" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-8 flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-neutral-400" />
            <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-neutral-500">
              Tu espacio de belleza
            </span>
            <span className="h-px w-10 bg-neutral-400" />
          </div>

          <h2 className="text-4xl font-light leading-tight tracking-[-0.045em] text-neutral-950 sm:text-5xl lg:text-6xl">
            La belleza comienza
            <span className="mt-2 block font-medium italic">
              contigo.
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-xl text-sm leading-7 text-neutral-600 sm:text-base">
            Descubre nuestros servicios y conoce un espacio
            dedicado a tu belleza, cuidado personal y bienestar.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/services"
              className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-neutral-950 px-8 py-4 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-1 hover:bg-neutral-800 sm:w-auto"
            >
              Explorar servicios
              <ArrowUpRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>

            <Link
              href="/#contacto"
              className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 px-8 py-4 text-sm font-medium text-neutral-900 transition-all duration-300 hover:-translate-y-1 hover:border-neutral-900 sm:w-auto"
            >
              Contáctanos
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
