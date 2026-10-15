
"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { siteConfig } from "@/config/site";

const transitionEase = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-neutral-950 text-white">

      {/* BACKGROUND IMAGE */}
      <motion.div
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 1.8,
          ease: transitionEase,
        }}
        className="absolute inset-0"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=2400&q=90')",
          }}
        />
      </motion.div>

      {/* IMAGE OVERLAYS */}
      <div className="absolute inset-0 bg-black/30" />

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/10" />

      <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-black/80 to-transparent" />

      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/20" />

      {/* DECORATIVE ELEMENTS */}
      <div className="pointer-events-none absolute inset-y-0 left-[7%] hidden w-px bg-white/[0.08] lg:block" />

      <div className="pointer-events-none absolute inset-y-0 right-[7%] hidden w-px bg-white/[0.06] lg:block" />

      {/* MAIN CONTENT */}
      <div className="relative z-10 flex min-h-[calc(100vh-80px)] items-center">
        <div className="mx-auto w-full max-w-7xl px-6 py-28 lg:px-10">
          <div className="max-w-5xl">

            {/* EYEBROW */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.25,
                ease: transitionEase,
              }}
              className="mb-8 flex items-center gap-4"
            >
              <span className="h-px w-12 bg-white/70" />

              <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-white/75 sm:text-xs">
                Belleza · Cuidado · Bienestar
              </span>
            </motion.div>

            {/* MAIN TITLE */}
            <motion.h1
              initial={{ opacity: 0, y: 45 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 0.35,
                ease: transitionEase,
              }}
              className="max-w-4xl text-[clamp(3.5rem,8vw,8rem)] font-light leading-[0.9] tracking-[-0.055em]"
            >
              <span className="block">
                Tu belleza.
              </span>

              <span className="mt-2 block font-medium">
                Tu momento.
              </span>
            </motion.h1>

            {/* DESCRIPTION */}
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.55,
                ease: transitionEase,
              }}
              className="mt-8 max-w-xl text-sm leading-7 text-white/70 sm:text-base"
            >
              Descubre un espacio pensado para cuidar de ti,
              relajarte y disfrutar de una experiencia de
              belleza personalizada.
            </motion.p>

            {/* ACTION BUTTONS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.7,
                ease: transitionEase,
              }}
              className="mt-10 flex flex-col gap-3 sm:flex-row"
            >
              {/* CONTACT BUTTON */}
              <Link
                href="/#contacto"
                className="group rounded-full bg-white px-8 py-4 text-center text-sm font-medium text-neutral-950 transition-all duration-500 ease-out hover:-translate-y-1 hover:bg-neutral-100 hover:shadow-[0_12px_30px_rgba(0,0,0,0.18)] active:translate-y-0"
              >
                <span className="inline-flex items-center gap-2">
                  Contáctanos

                  <span className="transition-transform duration-500 ease-out group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>

              {/* SERVICES BUTTON */}
              <Link
                href="/services"
                className="group rounded-full border border-white/40 bg-white/10 px-8 py-4 text-center text-sm font-medium text-white backdrop-blur transition-all duration-500 ease-out hover:-translate-y-1 hover:border-white/70 hover:bg-white/20 hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)] active:translate-y-0"
              >
                <span className="inline-flex items-center gap-2">
                  Descubrir servicios

                  <span className="transition-transform duration-500 ease-out group-hover:translate-y-1">
                    ↓
                  </span>
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* BOTTOM INFORMATION */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.9,
        }}
        className="absolute inset-x-0 bottom-0 z-20 border-t border-white/10"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">

          {/* LEFT */}
          <div className="flex items-center gap-4">
            <span className="h-1.5 w-1.5 rounded-full bg-white/60" />

            <span className="text-[10px] uppercase tracking-[0.25em] text-white/70">
              Belleza · Estilo · Bienestar
            </span>
          </div>

          {/* RIGHT */}
          <div className="hidden items-center gap-4 sm:flex">
            <span className="text-[9px] uppercase tracking-[0.25em] text-white/40">
              {siteConfig.name}
            </span>

            <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
          </div>
        </div>
      </motion.div>

      {/* SCROLL INDICATOR */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 1.2,
          duration: 0.8,
        }}
        className="absolute bottom-32 right-6 z-20 hidden flex-col items-center gap-4 lg:flex"
      >
        <span className="[writing-mode:vertical-rl] text-[9px] uppercase tracking-[0.35em] text-white/40">
          Descubre
        </span>

        <span className="h-10 w-px bg-white/20" />

        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-white/60"
        >
          ↓
        </motion.span>
      </motion.div>
    </section>
  );
}
