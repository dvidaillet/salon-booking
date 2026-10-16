
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Sparkles } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const mainImage =
  "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=1400&q=85";

const detailImage =
  "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=85";

export default function AboutSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="nosotros"
      aria-labelledby="nosotros-title"
      className="relative isolate overflow-hidden bg-[#171310] px-6 py-24 text-white sm:px-10 sm:py-32 lg:px-16 lg:py-40"
    >
      {/* ATMÓSFERA */}
      <div className="pointer-events-none absolute -left-48 top-1/3 -z-10 h-[500px] w-[500px] rounded-full bg-[#a68c74]/10 blur-[140px]" />

      <div className="mx-auto grid max-w-[1450px] items-center gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        {/* COMPOSICIÓN FOTOGRÁFICA */}
        <motion.div
          initial={
            reduceMotion ? false : { opacity: 0, y: 50 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: reduceMotion ? 0 : 0.9,
            ease,
          }}
          className="relative min-w-0 pb-10 pr-8 sm:pb-16 sm:pr-16 lg:pb-20 lg:pr-20"
        >
          <div className="relative aspect-[4/5] overflow-hidden bg-[#332b26]">
            <Image
              src={mainImage}
              alt="Imagen editorial ilustrativa de un espacio dedicado a la belleza"
              fill
              sizes="(max-width: 1023px) 100vw, 50vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

            <div className="absolute bottom-6 left-6 sm:bottom-9 sm:left-9">
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/85">
                Beauty / Care / Identity
              </span>
            </div>
          </div>

          {/* IMAGEN SUPERPUESTA */}
          <motion.div
            initial={
              reduceMotion
                ? false
                : { opacity: 0, x: 25, y: 25 }
            }
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: reduceMotion ? 0 : 0.9,
              delay: reduceMotion ? 0 : 0.2,
              ease,
            }}
            className="absolute bottom-0 right-0 w-[43%] border-[5px] border-[#171310] bg-[#332b26] shadow-2xl sm:border-[9px]"
          >
            <div className="relative aspect-[3/4]">
              <Image
                src={detailImage}
                alt="Fotografía de inspiración de un ambiente de peluquería"
                fill
                sizes="(max-width: 1023px) 45vw, 22vw"
                className="object-cover"
              />
            </div>
          </motion.div>

          <span className="absolute left-0 top-0 -translate-x-1/3 -translate-y-1/2 text-[clamp(4rem,10vw,10rem)] font-light leading-none tracking-[-0.1em] text-white/10">
            01
          </span>
        </motion.div>

        {/* TEXTO EDITORIAL */}
        <motion.div
          initial={
            reduceMotion ? false : { opacity: 0, y: 35 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: reduceMotion ? 0 : 0.9,
            ease,
          }}
          className="relative max-w-xl"
        >
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-[#d6b79a]" />

            <span className="text-[10px] uppercase tracking-[0.3em] text-[#d6b79a]">
              Nuestra esencia
            </span>
          </div>

          <h2
            id="nosotros-title"
            className="mt-8 text-[clamp(3.2rem,6vw,6.8rem)] font-light uppercase leading-[0.9] tracking-[-0.07em]"
          >
            Más que
            <span className="mt-2 block font-medium italic text-[#d6b79a]">
              belleza.
            </span>
          </h2>

          <div className="mt-10 flex items-start gap-4 border-l border-[#d6b79a]/60 pl-5 sm:mt-12 sm:pl-7">
            <Sparkles
              size={18}
              strokeWidth={1.4}
              className="mt-1 shrink-0 text-[#d6b79a]"
            />

            <p className="text-lg font-light italic leading-relaxed text-white/90 sm:text-xl">
              La verdadera belleza comienza cuando te
              sientes bien contigo.
            </p>
          </div>

          <p className="mt-9 max-w-lg text-sm font-light leading-8 text-white/65 sm:text-base">
            En ÉLITE creemos que el cuidado personal
            merece su propio espacio. Un momento para
            dedicarte tiempo, expresar tu estilo y
            disfrutar de los pequeños detalles.
          </p>

          <p className="mt-5 max-w-lg text-sm font-light leading-8 text-white/65 sm:text-base">
            Nuestra visión une belleza, creatividad y
            bienestar en una experiencia pensada para
            celebrar lo que te hace único.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            {["Estilo", "Cuidado", "Bienestar"].map((word) => (
              <span
                key={word}
                className="rounded-full border border-white/15 px-5 py-2.5 text-[10px] uppercase tracking-[0.2em] text-white/65"
              >
                {word}
              </span>
            ))}
          </div>

          <Link
            href="/services"
            className="group mt-12 inline-flex min-h-12 items-center gap-5 text-[11px] font-medium uppercase tracking-[0.15em] text-white transition-colors hover:text-[#d6b79a]"
          >
            Descubre nuestros servicios

            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d6b79a]/50 text-[#d6b79a] transition-all duration-300 group-hover:bg-[#d6b79a] group-hover:text-[#171310]">
              <ArrowUpRight size={18} strokeWidth={1.5} />
            </span>
          </Link>
        </motion.div>
      </div>

      {/* PIE EDITORIAL */}
      <div className="mx-auto mt-20 flex max-w-[1450px] items-center justify-between gap-6 border-t border-white/15 pt-7 sm:mt-28">
        <span className="text-[10px] uppercase tracking-[0.25em] text-white/40">
          Élite Beauty Studio
        </span>

        <span className="text-[10px] uppercase tracking-[0.2em] text-[#d6b79a]/80">
          Tu belleza. Tu momento.
        </span>
      </div>
    </section>
  );
}
