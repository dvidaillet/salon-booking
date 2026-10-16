
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import { ArrowUpRight, MoveRight } from "lucide-react";

const services = [
  {
    number: "01",
    title: "Corte de cabello",
    subtitle: "La expresión de tu estilo",
    image:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1600&q=85",
    position: "center",
  },
  {
    number: "02",
    title: "Coloración",
    subtitle: "Una nueva dimensión de color",
    image:
      "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1600&q=85",
    position: "center",
  },
  {
    number: "03",
    title: "Manicura",
    subtitle: "El arte está en los detalles",
    image:
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1600&q=85",
    position: "center",
  },
  {
    number: "04",
    title: "Pedicura",
    subtitle: "Un momento para cuidarte",
    image:
      "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=1600&q=85",
    position: "center",
  },
  {
    number: "05",
    title: "Peinados",
    subtitle: "Cada ocasión merece su estilo",
    image:
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1600&q=85",
    position: "center",
  },
  {
    number: "06",
    title: "Tratamientos capilares",
    subtitle: "Belleza que comienza con el cuidado",
    image:
      "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=1600&q=85",
    position: "center",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function InteractiveServices() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const activeService = services[activeIndex];

  return (
    <section
      id="experiencias"
      aria-labelledby="experiencias-title"
      className="relative overflow-hidden bg-[#11100f] px-6 py-24 text-white sm:py-32 lg:px-10 lg:py-40"
    >
      <div className="pointer-events-none absolute -right-24 top-0 h-[500px] w-[500px] rounded-full bg-[#a68c74]/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* ENCABEZADO */}
        <motion.div
          initial={
            reduceMotion ? false : { opacity: 0, y: 35 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: reduceMotion ? 0 : 0.8,
            ease,
          }}
          className="mb-14 flex flex-col justify-between gap-8 lg:mb-20 lg:flex-row lg:items-end"
        >
          <div>
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-[#c9aa88]" />

              <span className="text-[10px] uppercase tracking-[0.3em] text-[#c9aa88]">
                The Élite Experience
              </span>
            </div>

            <h2
              id="experiencias-title"
              className="mt-7 text-[clamp(3.5rem,8vw,7.5rem)] font-light uppercase leading-[0.9] tracking-[-0.07em]"
            >
              El arte
              <span className="block font-medium italic text-[#d6b79a]">
                de cuidarte.
              </span>
            </h2>
          </div>

          <p className="max-w-xs text-sm font-light leading-8 text-white/55">
            Cada detalle importa. Explora nuestra
            selección de servicios de belleza y
            cuidado personal.
          </p>
        </motion.div>

        {/* EXPERIENCIA INTERACTIVA */}
        <div className="grid items-stretch gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* LISTA DE SERVICIOS */}
          <div className="flex flex-col justify-center">
            <div className="border-t border-white/15">
              {services.map((service, index) => {
                const active = index === activeIndex;

                return (
                  <button
                    key={service.number}
                    type="button"
                    onMouseEnter={() => setActiveIndex(index)}
                    onFocus={() => setActiveIndex(index)}
                    onClick={() => setActiveIndex(index)}
                    aria-pressed={active}
                    className={`group flex w-full items-center gap-4 border-b border-white/15 py-5 text-left transition-colors duration-300 sm:gap-6 sm:py-6 ${
                      active
                        ? "text-[#d6b79a]"
                        : "text-white/55 hover:text-white"
                    }`}
                  >
                    <span className="w-7 shrink-0 self-start pt-2 text-[10px] tracking-[0.1em] text-white/35">
                      {service.number}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block text-[clamp(1.35rem,2.5vw,2.3rem)] font-light leading-tight tracking-[-0.045em]">
                        {service.title}
                      </span>

                      <span
                        className={`mt-2 block text-xs font-light transition-colors ${
                          active
                            ? "text-[#d6b79a]/75"
                            : "text-white/35"
                        }`}
                      >
                        {service.subtitle}
                      </span>
                    </span>

                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                        active
                          ? "rotate-[-45deg] border-[#d6b79a] bg-[#d6b79a] text-[#11100f]"
                          : "border-white/20 text-white/40 group-hover:border-white/50 group-hover:text-white"
                      }`}
                    >
                      <MoveRight size={17} strokeWidth={1.5} />
                    </span>
                  </button>
                );
              })}
            </div>

            <Link
              href="/services"
              className="group mt-10 inline-flex w-fit items-center gap-4 text-[11px] font-medium uppercase tracking-[0.17em] text-white transition-colors hover:text-[#d6b79a]"
            >
              Ver todos los servicios

              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 transition-all duration-300 group-hover:border-[#d6b79a] group-hover:bg-[#d6b79a] group-hover:text-[#11100f]">
                <ArrowUpRight size={18} strokeWidth={1.5} />
              </span>
            </Link>
          </div>

          {/* FOTOGRAFÍA PROTAGONISTA */}
          <div className="relative">
            <div className="group relative aspect-[4/5] overflow-hidden bg-[#25211e] lg:h-full lg:min-h-[650px] lg:aspect-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.image}
                  initial={
                    reduceMotion
                      ? false
                      : { opacity: 0, scale: 1.07 }
                  }
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.55,
                    ease,
                  }}
                  className="absolute inset-0"
                >
                  <Image
                    src={activeService.image}
                    alt={`Imagen ilustrativa de ${activeService.title.toLowerCase()}`}
                    fill
                    sizes="(max-width: 1023px) 100vw, 45vw"
                    className="object-cover"
                    style={{
                      objectPosition: activeService.position,
                    }}
                  />
                </motion.div>
              </AnimatePresence>

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

              <div className="pointer-events-none absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 p-6 sm:p-9">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#d6b79a]">
                    Élite Collection
                  </span>

                  <AnimatePresence mode="wait">
                    <motion.p
                      key={activeService.title}
                      initial={
                        reduceMotion
                          ? false
                          : { opacity: 0, y: 10 }
                      }
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{
                        duration: reduceMotion ? 0 : 0.3,
                      }}
                      className="mt-2 text-2xl font-light tracking-tight text-white sm:text-3xl"
                    >
                      {activeService.title}
                    </motion.p>
                  </AnimatePresence>
                </div>

                <span className="text-5xl font-light tracking-[-0.08em] text-white/35 sm:text-6xl">
                  {activeService.number}
                </span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-4">
              <span className="text-[10px] uppercase tracking-[0.15em] text-white/35">
                Imágenes de inspiración
              </span>

              <span className="text-[10px] tracking-[0.2em] text-[#d6b79a]">
                {activeService.number} / 06
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
