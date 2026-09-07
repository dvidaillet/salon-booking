"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

export default function BookingCTA() {
  return (
    <section
      id="booking"
      className="relative overflow-hidden bg-neutral-100 px-6 py-28 sm:py-36 lg:py-44"
    >
      {/* =====================================================
          DECORATIVE BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-neutral-200/70" />

        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-neutral-200/40" />
      </div>

      <div className="relative mx-auto max-w-4xl text-center">

        {/* =====================================================
            EYEBROW
        ====================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.4,
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex items-center justify-center gap-4"
        >
          <span className="h-px w-10 bg-neutral-300" />

          <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-neutral-500 sm:text-xs">
            Tu próximo momento
          </p>

          <span className="h-px w-10 bg-neutral-300" />
        </motion.div>

        {/* =====================================================
            TITLE
        ====================================================== */}

        <motion.h2
          initial={{
            opacity: 0,
            y: 35,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.4,
          }}
          transition={{
            duration: 0.9,
            delay: 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-7 text-5xl font-light leading-[0.95] tracking-[-0.05em] text-neutral-950 sm:text-6xl lg:text-7xl"
        >
          ¿Nos vemos{" "}
          <span className="font-medium italic text-neutral-500">
            pronto?
          </span>
        </motion.h2>

        {/* =====================================================
            DESCRIPTION
        ====================================================== */}

        <motion.p
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
            amount: 0.4,
          }}
          transition={{
            duration: 0.8,
            delay: 0.18,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto mt-7 max-w-xl text-sm leading-7 text-neutral-500 sm:text-base"
        >
          Elige tu servicio, selecciona el día y encuentra el horario
          que mejor se adapte a ti.
        </motion.p>

        {/* =====================================================
            CTA
        ====================================================== */}

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
            amount: 0.4,
          }}
          transition={{
            duration: 0.8,
            delay: 0.28,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-10 flex justify-center"
        >
          <Link
            href="/booking"
            className="group inline-flex items-center gap-4 rounded-full bg-neutral-950 px-7 py-3.5 text-xs font-medium uppercase tracking-[0.15em] text-white transition-all duration-500 hover:bg-neutral-800 sm:px-8 sm:py-4"
          >
            <span>Reservar mi cita</span>

            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-all duration-500 group-hover:bg-white group-hover:text-neutral-950">
              <ArrowUpRight
                size={14}
                strokeWidth={1.5}
                className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </span>
          </Link>
        </motion.div>

        {/* =====================================================
            BOTTOM DETAIL
        ====================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            scaleX: 0,
          }}
          whileInView={{
            opacity: 1,
            scaleX: 1,
          }}
          viewport={{
            once: true,
            amount: 0.4,
          }}
          transition={{
            duration: 1,
            delay: 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto mt-14 h-px max-w-xs bg-neutral-200"
        />

        <motion.p
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
            delay: 0.55,
          }}
          className="mt-5 text-[9px] uppercase tracking-[0.3em] text-neutral-400"
        >
          Reserva tu momento
        </motion.p>
      </div>
    </section>
  );
}
