"use client";

import { motion } from "motion/react";

import ServiceGrid from "@/components/services/ServiceGrid";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { services } from "@/data/services";

export default function ServicesPage() {
  return (
    <>
      <Header />

      <main>
        {/* =====================================================
            PAGE HERO
        ====================================================== */}

        <section className="relative overflow-hidden bg-neutral-950 px-6 pb-24 pt-32 text-white sm:pb-32 sm:pt-40 lg:pb-40 lg:pt-44">
          {/* Decorative elements */}

          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-32 -top-32 h-[450px] w-[450px] rounded-full border border-white/[0.04]" />

            <div className="absolute -right-16 -top-16 h-[300px] w-[300px] rounded-full border border-white/[0.04]" />
          </div>

          <div className="relative mx-auto max-w-7xl">
            <div className="max-w-4xl">

              {/* Eyebrow */}

              <motion.div
                initial={{
                  opacity: 0,
                  x: -25,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex items-center gap-4"
              >
                <span className="h-px w-10 bg-white/25" />

                <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-white/45 sm:text-xs">
                  Nuestro catálogo
                </p>
              </motion.div>

              {/* Title */}

              <motion.h1
                initial={{
                  opacity: 0,
                  y: 35,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.9,
                  delay: 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-7 max-w-3xl text-5xl font-light leading-[0.98] tracking-[-0.05em] sm:text-6xl lg:text-7xl"
              >
                Servicios pensados{" "}
                <span className="font-medium italic text-white/45">
                  para ti.
                </span>
              </motion.h1>

              {/* Description */}

              <motion.p
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.18,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-7 max-w-xl text-sm leading-7 text-white/45 sm:text-base"
              >
                Descubre nuestros servicios de belleza y encuentra
                el tratamiento que mejor se adapta a ti.
              </motion.p>

              {/* Bottom information */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.7,
                  delay: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-12 flex items-center gap-4"
              >
                <span className="text-[10px] uppercase tracking-[0.25em] text-white/25">
                  {services.length} servicios
                </span>

                <span className="h-px w-12 bg-white/10" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* =====================================================
            SERVICES
        ====================================================== */}

        <section className="relative overflow-hidden bg-neutral-50 px-6 py-24 sm:py-32 lg:py-40">
          <div className="mx-auto max-w-7xl">

            {/* Section intro */}

            <motion.div
              initial={{
                opacity: 0,
                y: 25,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.3,
              }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mb-14 sm:mb-16 lg:mb-20"
            >
              <div className="flex items-center gap-4">
                <span className="h-px w-10 bg-neutral-300" />

                <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-neutral-500 sm:text-xs">
                  Explora nuestros tratamientos
                </p>
              </div>

              <h2 className="mt-5 max-w-2xl text-4xl font-light leading-[1.05] tracking-[-0.04em] text-neutral-950 sm:text-5xl">
                Todo lo que necesitas{" "}
                <span className="font-medium italic text-neutral-500">
                  en un solo lugar.
                </span>
              </h2>
            </motion.div>

            <ServiceGrid services={services} />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
