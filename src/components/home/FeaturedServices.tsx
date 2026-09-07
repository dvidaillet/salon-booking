"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

import { services } from "@/data/services";
import ServiceCard from "@/components/services/ServiceCard";

export default function FeaturedServices() {
  const featuredServices = services.filter(
    (service) => service.featured
  );

  return (
    <section className="relative overflow-hidden bg-white px-6 py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl">

        {/* =====================================================
            SECTION HEADER
        ====================================================== */}

        <div className="mb-16 flex flex-col justify-between gap-8 sm:flex-row sm:items-end lg:mb-20">

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
          >
            {/* Eyebrow */}

            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-neutral-300" />

              <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-neutral-500 sm:text-xs">
                Nuestros servicios
              </p>
            </div>

            {/* Title */}

            <h2 className="mt-5 max-w-2xl text-4xl font-light leading-[1.05] tracking-[-0.04em] text-neutral-950 sm:text-5xl lg:text-6xl">
              Pensados para
              <span className="font-medium italic text-neutral-500">
                {" "}ti.
              </span>
            </h2>

            {/* Description */}

            <p className="mt-6 max-w-xl text-sm leading-7 text-neutral-500 sm:text-base">
              Tratamientos profesionales diseñados para que puedas
              dedicarte un momento, desconectar y salir sintiéndote
              mejor.
            </p>
          </motion.div>

          {/* =================================================
              ALL SERVICES LINK
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: 20,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.7,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Link
              href="/services"
              className="group inline-flex items-center gap-4 text-xs font-medium uppercase tracking-[0.16em] text-neutral-800"
            >
              <span>
                Ver todos los servicios
              </span>

              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 transition-all duration-500 group-hover:border-neutral-900 group-hover:bg-neutral-900 group-hover:text-white">
                <ArrowUpRight
                  size={15}
                  strokeWidth={1.5}
                  className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </Link>
          </motion.div>

        </div>

        {/* =====================================================
            SERVICES GRID
        ====================================================== */}

        <div className="grid gap-5 md:grid-cols-3">
          {featuredServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.15,
              }}
              transition={{
                duration: 0.8,
                delay: index * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group"
            >
              <ServiceCard
                service={service}
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}