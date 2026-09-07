"use client";

import { motion } from "motion/react";

export default function AboutSection() {
  return (
    <section className="relative overflow-hidden bg-neutral-100 px-6 py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl">
        <div className="grid overflow-hidden lg:grid-cols-[1.05fr_0.95fr]">
          {/* =====================================================
              IMAGE
          ====================================================== */}
          <motion.div
            initial={{
              opacity: 0,
              x: -50,
              scale: 1.04,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
              scale: 1,
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="group relative min-h-[500px] overflow-hidden lg:min-h-[680px]"
          >
            <motion.img
              src="https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=1400&q=90"
              alt="Interior del salón"
              initial={{ scale: 1.08 }}
              whileInView={{ scale: 1 }}
              whileHover={{ scale: 1.035 }}
              viewport={{
                once: true,
                amount: 0.25,
              }}
              transition={{
                duration: 1.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="h-full w-full object-cover"
            />

            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-black/5 transition-opacity duration-700 group-hover:bg-black/0" />

            {/* Image number */}
            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.25,
              }}
              transition={{
                duration: 0.7,
                delay: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute bottom-6 left-6"
            >
              <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/80">
                El espacio
              </span>
            </motion.div>
          </motion.div>

          {/* =====================================================
              CONTENT
          ====================================================== */}
          <div className="flex items-center bg-white px-7 py-16 sm:px-12 sm:py-20 lg:px-16 xl:px-20">
            <div className="w-full max-w-xl">
              {/* Eyebrow */}
              <motion.div
                initial={{
                  opacity: 0,
                  x: 25,
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
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex items-center gap-4"
              >
                <span className="h-px w-10 bg-neutral-300" />

                <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-neutral-500 sm:text-xs">
                  Sobre nosotros
                </p>
              </motion.div>

              {/* Title */}
              <motion.h2
                initial={{
                  opacity: 0,
                  y: 30,
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
                  delay: 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-6 text-4xl font-light leading-[1.05] tracking-[-0.04em] text-neutral-950 sm:text-5xl lg:text-6xl"
              >
                Un espacio para{" "}
                <span className="font-medium italic text-neutral-500">
                  cuidar de ti.
                </span>
              </motion.h2>

              {/* Description */}
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
                  amount: 0.25,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.18,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-8 space-y-5 text-sm leading-7 text-neutral-500 sm:text-base"
              >
                <p>
                  Creemos que acudir al salón debe ser mucho más que
                  recibir un servicio.
                </p>

                <p>
                  Queremos que cada visita sea un momento para relajarte,
                  desconectar y disfrutar de una atención completamente
                  personalizada.
                </p>

                <p>
                  Nuestro equipo trabaja para ofrecerte resultados
                  profesionales en un ambiente cercano y agradable.
                </p>
              </motion.div>

              {/* =================================================
                  STATS
              ================================================== */}
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
                  amount: 0.25,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-12 grid grid-cols-3 border-t border-neutral-200 pt-8"
              >
                {/* Stat 01 */}
                <div className="border-r border-neutral-200 pr-4">
                  <strong className="block text-3xl font-light tracking-tight text-neutral-950 sm:text-4xl">
                    5+
                  </strong>

                  <p className="mt-2 max-w-[90px] text-[10px] uppercase leading-5 tracking-[0.08em] text-neutral-400">
                    Años de experiencia
                  </p>
                </div>

                {/* Stat 02 */}
                <div className="border-r border-neutral-200 px-4">
                  <strong className="block text-3xl font-light tracking-tight text-neutral-950 sm:text-4xl">
                    1K+
                  </strong>

                  <p className="mt-2 max-w-[90px] text-[10px] uppercase leading-5 tracking-[0.08em] text-neutral-400">
                    Clientes
                  </p>
                </div>

                {/* Stat 03 */}
                <div className="pl-4">
                  <strong className="block text-3xl font-light tracking-tight text-neutral-950 sm:text-4xl">
                    5
                    <span className="ml-1 text-2xl">★</span>
                  </strong>

                  <p className="mt-2 max-w-[90px] text-[10px] uppercase leading-5 tracking-[0.08em] text-neutral-400">
                    Valoración
                  </p>
                </div>
              </motion.div>

              {/* Bottom line */}
              <motion.div
                initial={{
                  scaleX: 0,
                  transformOrigin: "left",
                }}
                whileInView={{
                  scaleX: 1,
                }}
                viewport={{
                  once: true,
                  amount: 0.25,
                }}
                transition={{
                  duration: 1,
                  delay: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-10 h-px w-full bg-neutral-200"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}