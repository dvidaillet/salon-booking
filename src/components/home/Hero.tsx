
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { siteConfig } from "@/config/site";

const transitionEase = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative isolate min-h-[calc(100svh-80px)] overflow-hidden bg-neutral-950 text-white">
      {/* IMAGEN PRINCIPAL */}
      <motion.div
        initial={
          reduceMotion
            ? false
            : { scale: 1.06, opacity: 0.6 }
        }
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: reduceMotion ? 0 : 1.5,
          ease: transitionEase,
        }}
        className="absolute inset-0"
      >
        <Image
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=2400&q=85"
          alt="Imagen editorial de un salón de belleza"
          fill
          priority
          quality={85}
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* CAPAS DE CONTRASTE */}
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/10" />
      <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-black/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20" />

      {/* LÍNEAS DECORATIVAS */}
      <div className="pointer-events-none absolute inset-y-0 left-[7%] hidden w-px bg-white/10 lg:block" />
      <div className="pointer-events-none absolute inset-y-0 right-[7%] hidden w-px bg-white/10 lg:block" />

      {/* CONTENIDO */}
      <div className="relative z-10 flex min-h-[calc(100svh-80px)] items-center">
        <div className="mx-auto w-full max-w-7xl px-6 pb-32 pt-20 sm:py-28 lg:px-10">
          <div className="max-w-5xl">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduceMotion ? 0 : 0.8,
                delay: reduceMotion ? 0 : 0.2,
                ease: transitionEase,
              }}
              className="mb-8 flex items-center gap-4"
            >
              <span className="h-px w-10 bg-white/70 sm:w-12" />

              <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/80 sm:text-xs">
                Belleza · Cuidado · Bienestar
              </span>
            </motion.div>

            <motion.h1
              initial={reduceMotion ? false : { opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduceMotion ? 0 : 1,
                delay: reduceMotion ? 0 : 0.3,
                ease: transitionEase,
              }}
              className="max-w-4xl text-[clamp(3.4rem,8vw,8rem)] font-light leading-[0.95] tracking-[-0.055em]"
            >
              <span className="block">Tu belleza.</span>

              <span className="mt-2 block font-medium">
                Tu momento.
              </span>
            </motion.h1>

            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduceMotion ? 0 : 0.8,
                delay: reduceMotion ? 0 : 0.5,
                ease: transitionEase,
              }}
              className="mt-8 max-w-xl text-sm leading-7 text-white/80 sm:text-base"
            >
              Descubre un espacio pensado para cuidar de ti,
              relajarte y disfrutar de una experiencia de
              belleza personalizada.
            </motion.p>

            {/* BOTONES */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduceMotion ? 0 : 0.8,
                delay: reduceMotion ? 0 : 0.65,
                ease: transitionEase,
              }}
              className="mt-10 flex flex-col gap-3 sm:flex-row"
            >
              <Link
                href="/#contacto"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-medium text-neutral-950 transition-all duration-300 hover:-translate-y-1 hover:bg-neutral-100"
              >
                Contáctanos
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>

              <Link
                href="/services"
                className="group inline-flex items-center justify-center gap-3 rounded-full border border-white/40 bg-white/10 px-8 py-4 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/70 hover:bg-white/20"
              >
                Descubrir servicios
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-y-1"
                >
                  ↓
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* INFORMACIÓN INFERIOR */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: reduceMotion ? 0 : 0.8,
          delay: reduceMotion ? 0 : 0.8,
        }}
        className="absolute inset-x-0 bottom-0 z-20 border-t border-white/15"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-5 lg:px-10">
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#d8c2a7]" />

            <span className="text-[9px] uppercase tracking-[0.2em] text-white/75 sm:text-[10px]">
              Belleza · Estilo · Bienestar
            </span>
          </div>

          <span className="hidden text-[9px] uppercase tracking-[0.2em] text-white/50 sm:block">
            {siteConfig.name}
          </span>
        </div>
      </motion.div>

      {/* INDICADOR DE DESPLAZAMIENTO */}
      {!reduceMotion && (
        <div className="absolute bottom-32 right-6 z-20 hidden flex-col items-center gap-4 lg:flex">
          <span className="[writing-mode:vertical-rl] text-[9px] uppercase tracking-[0.3em] text-white/50">
            Descubre
          </span>

          <span className="h-10 w-px bg-white/30" />

          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-white/70"
          >
            ↓
          </motion.span>
        </div>
      )}
    </section>
  );
}
