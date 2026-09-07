"use client";

import { motion } from "motion/react";

import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-neutral-950 px-6 py-24 text-white sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl">

        {/* =====================================================
            SECTION HEADER
        ====================================================== */}

        <motion.div
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
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto max-w-3xl text-center"
        >
          {/* Eyebrow */}

          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-white/20" />

            <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-white/45 sm:text-xs">
              Experiencias
            </p>

            <span className="h-px w-10 bg-white/20" />
          </div>

          {/* Title */}

          <h2 className="mt-6 text-4xl font-light leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
            Lo que dicen{" "}
            <span className="font-medium italic text-white/45">
              nuestros clientes.
            </span>
          </h2>

          {/* Description */}

          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-white/45 sm:text-base">
            Cada visita es diferente. Estas son algunas de las
            experiencias que nuestros clientes han querido compartir.
          </p>
        </motion.div>

        {/* =====================================================
            TESTIMONIALS
        ====================================================== */}

        <div className="mt-16 grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-3 lg:mt-20">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.id}
              initial={{
                opacity: 0,
                y: 45,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.8,
                delay: index * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative flex min-h-[320px] flex-col bg-neutral-950 p-7 transition-colors duration-700 hover:bg-neutral-900 sm:p-8 lg:p-10"
            >
              {/* Decorative quote */}

              <span className="absolute right-7 top-5 select-none text-6xl font-serif leading-none text-white/[0.04] transition-colors duration-700 group-hover:text-white/[0.08]">
                ”
              </span>

              {/* Stars */}

              <div className="flex items-center gap-1">
                {Array.from({ length: testimonial.rating }).map(
                  (_, starIndex) => (
                    <motion.span
                      key={starIndex}
                      initial={{
                        opacity: 0,
                        scale: 0.5,
                      }}
                      whileInView={{
                        opacity: 1,
                        scale: 1,
                      }}
                      viewport={{
                        once: true,
                      }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.12 + starIndex * 0.05,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="text-xs text-white/70"
                    >
                      ★
                    </motion.span>
                  )
                )}
              </div>

              {/* Comment */}

              <p className="relative mt-8 flex-1 text-[15px] leading-7 text-white/65">
                “{testimonial.comment}”
              </p>

              {/* Customer */}

              <div className="mt-8 border-t border-white/10 pt-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white/90">
                      {testimonial.name}
                    </p>

                    <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-white/30">
                      Cliente verificado
                    </p>
                  </div>

                  {/* Number */}

                  <span className="text-[10px] tracking-[0.2em] text-white/20">
                    0{index + 1}
                  </span>
                </div>
              </div>

              {/* Hover line */}

              <motion.div
                initial={{
                  scaleX: 0,
                  transformOrigin: "left",
                }}
                whileHover={{
                  scaleX: 1,
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute bottom-0 left-0 right-0 h-px bg-white/40"
              />
            </motion.article>
          ))}
        </div>

        {/* =====================================================
            BOTTOM STATEMENT
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
            amount: 0.3,
          }}
          transition={{
            duration: 0.7,
            delay: 0.25,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-10 flex items-center justify-center gap-4"
        >
          <span className="h-px w-8 bg-white/10" />

          <p className="text-[10px] uppercase tracking-[0.3em] text-white/25">
            Gracias por confiar en nosotros
          </p>

          <span className="h-px w-8 bg-white/10" />
        </motion.div>
      </div>
    </section>
  );
}
