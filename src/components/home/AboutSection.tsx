
"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import AnimatedImage from "@/components/ui/AnimatedImage";

const ease = [0.22, 1, 0.36, 1] as const;

export default function AboutSection() {
  return (
    <section
      id="nosotros"
      className="relative overflow-hidden bg-[#eee9e2] px-6 py-24 sm:py-32 lg:px-10 lg:py-40"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid overflow-hidden lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease }}
            className="group relative min-h-[420px] overflow-hidden bg-neutral-300 sm:min-h-[540px] lg:min-h-[680px]"
          >
            <AnimatedImage
              src="https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=1400&q=85"
              alt="Imagen ilustrativa de un espacio de belleza"
              sizes="(max-width: 1023px) 100vw, 50vw"
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

            <div className="absolute bottom-8 left-8 right-8">
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/85">
                Belleza · Cuidado · Bienestar
              </span>
            </div>
          </motion.div>

          <div className="flex items-center bg-[#faf8f5] px-7 py-16 sm:px-12 sm:py-20 lg:px-14 xl:px-20">
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, ease }}
              className="max-w-xl"
            >
              <div className="flex items-center gap-4">
                <span className="h-px w-10 bg-neutral-400" />

                <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-neutral-500">
                  Nuestra esencia
                </span>
              </div>

              <h2 className="mt-8 text-4xl font-light leading-[1.08] tracking-[-0.045em] text-neutral-950 sm:text-5xl lg:text-6xl">
                La belleza es
                <span className="block font-medium italic text-[#a68c74]">
                  sentirte bien.
                </span>
              </h2>

              <p className="mt-8 text-sm leading-8 text-neutral-600 sm:text-base">
                Creemos que el cuidado personal también puede ser
                un momento para detenerse, relajarse y reconectar
                con uno mismo.
              </p>

              <p className="mt-5 text-sm leading-8 text-neutral-600 sm:text-base">
                Nuestra propuesta reúne belleza, estilo y
                bienestar, con especial atención a los detalles
                y a la experiencia de cada persona.
              </p>

              <div className="mt-10 border-t border-neutral-200 pt-8">
                <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-500">
                  Nuestra filosofía
                </p>

                <p className="mt-4 text-xl font-light italic leading-relaxed text-neutral-800 sm:text-2xl">
                  “Cada persona tiene su propia manera de brillar.”
                </p>
              </div>

              <Link
                href="/services"
                className="group mt-10 inline-flex items-center gap-4 text-xs font-medium uppercase tracking-[0.15em] text-neutral-900"
              >
                Descubre nuestros servicios

                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 transition-all duration-300 group-hover:border-neutral-950 group-hover:bg-neutral-950 group-hover:text-white">
                  <ArrowUpRight size={17} strokeWidth={1.5} />
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
