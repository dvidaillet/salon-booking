
"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
} from "motion/react";
import { ArrowUpRight } from "lucide-react";

const images = [
  {
    number: "01",
    category: "Hair / Identity",
    title: "Tu estilo",
    subtitle: "Una forma de expresión",
    src: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1400&q=85",
    alt: "Fotografía editorial de inspiración para el cuidado del cabello",
    position: "center",
  },
  {
    number: "02",
    category: "Nails / Details",
    title: "Cada detalle",
    subtitle: "El arte de cuidarte",
    src: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1100&q=85",
    alt: "Fotografía editorial de inspiración para manicura",
    position: "center",
  },
  {
    number: "03",
    category: "Beauty / Expression",
    title: "Sé tú",
    subtitle: "Belleza sin reglas",
    src: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1100&q=85",
    alt: "Fotografía de inspiración para estilismo y belleza",
    position: "center",
  },
  {
    number: "04",
    category: "Care / Ritual",
    title: "Tu momento",
    subtitle: "El cuidado también es arte",
    src: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=1400&q=85",
    alt: "Fotografía editorial de inspiración para el cuidado de las uñas",
    position: "center",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function Gallery() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="galeria"
      aria-labelledby="galeria-title"
      className="relative overflow-hidden bg-[#e9e2d9] px-4 py-24 text-[#171310] sm:px-8 sm:py-32 lg:px-12 lg:py-40"
    >
      <div className="mx-auto max-w-[1500px]">
        {/* ENCABEZADO EDITORIAL */}
        <motion.div
          initial={
            reduceMotion ? false : { opacity: 0, y: 35 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: reduceMotion ? 0 : 0.9,
            ease,
          }}
          className="mb-14 flex flex-col justify-between gap-8 lg:mb-20 lg:flex-row lg:items-end"
        >
          <div>
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-[#9c8066]" />
              <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#8b725b]">
                The Élite Edit
              </span>
            </div>

            <h2
              id="galeria-title"
              className="mt-7 text-[clamp(3.5rem,8vw,8rem)] font-light uppercase leading-[0.85] tracking-[-0.075em]"
            >
              Belleza
              <span className="mt-2 block font-medium italic text-[#9c8066]">
                en imágenes.
              </span>
            </h2>
          </div>

          <p className="max-w-sm text-sm font-light leading-8 text-[#665c53]">
            Una mirada editorial a nuestro universo:
            estilo, creatividad y pequeños rituales
            que celebran la belleza personal.
          </p>
        </motion.div>

        {/* MOSAICO RESPONSIVE */}
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-12 lg:gap-6">
          {images.map((image, index) => {
            const layout =
              index === 0
                ? "col-span-2 lg:col-span-7 lg:row-span-2"
                : index === 1
                  ? "col-span-1 lg:col-span-5"
                  : index === 2
                    ? "col-span-1 lg:col-span-5"
                    : "col-span-2 lg:col-span-12";

            const aspect =
              index === 0
                ? "aspect-[4/5] sm:aspect-[5/4] lg:aspect-auto lg:min-h-[750px]"
                : index === 3
                  ? "aspect-[16/10] sm:aspect-[16/7] lg:aspect-[21/8]"
                  : "aspect-[3/4] lg:aspect-[16/9]";

            return (
              <motion.article
                key={image.number}
                initial={
                  reduceMotion
                    ? false
                    : { opacity: 0, y: 50 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.85,
                  delay: reduceMotion ? 0 : index * 0.08,
                  ease,
                }}
                className={`group relative min-w-0 overflow-hidden bg-[#c8beb3] ${layout} ${aspect}`}
              >
                <motion.div
                  whileHover={
                    reduceMotion ? undefined : { scale: 1.055 }
                  }
                  transition={{
                    duration: reduceMotion ? 0 : 0.9,
                    ease,
                  }}
                  className="absolute inset-0"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes={
                      index === 3
                        ? "100vw"
                        : index === 0
                          ? "(max-width: 1023px) 100vw, 58vw"
                          : "(max-width: 1023px) 50vw, 42vw"
                    }
                    className="object-cover"
                    style={{
                      objectPosition: image.position,
                    }}
                  />
                </motion.div>

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />

                <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 text-white sm:p-7 lg:p-9">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="h-px w-5 bg-[#d6b79a] sm:w-8" />

                    <span className="text-[8px] uppercase tracking-[0.15em] text-[#e3c6a8] sm:text-[10px] sm:tracking-[0.25em]">
                      {image.category}
                    </span>
                  </div>

                  <h3 className="text-[clamp(1.15rem,3vw,3.5rem)] font-light leading-tight tracking-[-0.04em]">
                    {image.title}
                  </h3>

                  <p className="mt-2 hidden text-xs font-light text-white/75 sm:block">
                    {image.subtitle}
                  </p>
                </div>

                <span className="pointer-events-none absolute right-4 top-4 text-[10px] tracking-[0.2em] text-white/80 sm:right-7 sm:top-7">
                  {image.number} / 04
                </span>
              </motion.article>
            );
          })}
        </div>

        {/* PIE DE GALERÍA */}
        <div className="mt-10 flex flex-col items-start justify-between gap-7 border-t border-[#171310]/15 pt-8 sm:flex-row sm:items-center">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#8b725b]">
              Inspired by Beauty
            </p>

            <p className="mt-3 max-w-lg text-xs leading-6 text-[#776b60]">
              Fotografías ilustrativas de inspiración.
              No representan necesariamente instalaciones
              ni trabajos realizados por el salón.
            </p>
          </div>

          <Link
            href="/services"
            className="group inline-flex min-h-12 items-center gap-4 text-[11px] font-medium uppercase tracking-[0.15em] text-[#171310]"
          >
            Explorar servicios

            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#171310]/30 transition-all duration-300 group-hover:border-[#171310] group-hover:bg-[#171310] group-hover:text-white">
              <ArrowUpRight size={18} strokeWidth={1.5} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
