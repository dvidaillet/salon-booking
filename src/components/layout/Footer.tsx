"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-neutral-950 text-white">
      <div className="mx-auto max-w-7xl px-6">

        {/* =====================================================
            MAIN FOOTER
        ====================================================== */}

        <div className="grid gap-14 py-20 sm:py-24 lg:grid-cols-[1.4fr_0.8fr_0.8fr] lg:gap-20 lg:py-28">

          {/* =================================================
              BRAND
          ================================================= */}

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
          >
            {/* Brand */}

            <div className="flex items-center gap-4">
              <span className="h-px w-8 bg-white/30" />

              <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-white/40">
                Salon
              </p>
            </div>

            <h2 className="mt-6 max-w-md text-4xl font-light leading-[1.05] tracking-[-0.04em] sm:text-5xl">
              Un espacio para{" "}
              <span className="font-medium italic text-white/45">
                cuidar de ti.
              </span>
            </h2>

            <p className="mt-7 max-w-sm text-sm leading-7 text-white/40">
              Un espacio dedicado al cuidado, la belleza y el bienestar.
              Queremos que cada visita sea un momento para ti.
            </p>

            {/* Social / CTA */}

            <a
              href="#booking"
              className="group mt-8 inline-flex items-center gap-4 text-[10px] font-medium uppercase tracking-[0.2em] text-white/70 transition-colors duration-500 hover:text-white"
            >
              <span>Reservar cita</span>

              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 transition-all duration-500 group-hover:border-white/50 group-hover:bg-white group-hover:text-neutral-950">
                <ArrowUpRight
                  size={14}
                  strokeWidth={1.5}
                  className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </a>
          </motion.div>

          {/* =================================================
              HOURS
          ================================================= */}

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
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="flex items-center gap-3">
              <span className="h-px w-6 bg-white/20" />

              <h3 className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/45">
                Horario
              </h3>
            </div>

            <div className="mt-7 space-y-4 text-sm">
              <div className="flex justify-between gap-6 border-b border-white/10 pb-3">
                <span className="text-white/45">
                  Lunes - Viernes
                </span>

                <span className="text-white/75">
                  09:00 - 19:00
                </span>
              </div>

              <div className="flex justify-between gap-6 border-b border-white/10 pb-3">
                <span className="text-white/45">
                  Sábado
                </span>

                <span className="text-white/75">
                  09:00 - 14:00
                </span>
              </div>

              <div className="flex justify-between gap-6">
                <span className="text-white/45">
                  Domingo
                </span>

                <span className="text-white/30">
                  Cerrado
                </span>
              </div>
            </div>
          </motion.div>

          {/* =================================================
              CONTACT
          ================================================= */}

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
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="flex items-center gap-3">
              <span className="h-px w-6 bg-white/20" />

              <h3 className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/45">
                Contacto
              </h3>
            </div>

            <div className="mt-7 space-y-4 text-sm">
              <a
                href="tel:+34600000000"
                className="block text-white/55 transition-colors duration-500 hover:text-white"
              >
                +34 600 000 000
              </a>

              <a
                href="mailto:info@salon.com"
                className="group flex items-center gap-2 text-white/55 transition-colors duration-500 hover:text-white"
              >
                <span>info@salon.com</span>

                <ArrowUpRight
                  size={12}
                  strokeWidth={1.5}
                  className="opacity-0 transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                />
              </a>

              <p className="text-white/35">
                Madrid, España
              </p>
            </div>
          </motion.div>
        </div>

        {/* =====================================================
            DIVIDER
        ====================================================== */}

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
            amount: 0.3,
          }}
          transition={{
            duration: 1,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="h-px w-full bg-white/10"
        />

        {/* =====================================================
            BOTTOM BAR
        ====================================================== */}

        <div className="flex flex-col gap-4 py-6 text-[10px] uppercase tracking-[0.15em] text-white/25 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Salon
          </p>

          <div className="flex gap-6">
            <a
              href="#"
              className="transition-colors duration-500 hover:text-white/60"
            >
              Privacidad
            </a>

            <a
              href="#"
              className="transition-colors duration-500 hover:text-white/60"
            >
              Cookies
            </a>

            <a
              href="#"
              className="transition-colors duration-500 hover:text-white/60"
            >
              Aviso legal
            </a>
          </div>

          <p>
            Todos los derechos reservados
          </p>
        </div>
      </div>
    </footer>
  );
}
