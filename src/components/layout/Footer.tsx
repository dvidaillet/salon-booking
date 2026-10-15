
"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { siteConfig } from "@/config/site";
import { ArrowUpRight } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Footer() {
  const { contact, social } = siteConfig;

  return (
    <footer
      id="contacto"
      className="relative scroll-mt-24 overflow-hidden bg-neutral-950 text-white"
    >
      <div className="mx-auto max-w-7xl px-6">

        {/* MAIN FOOTER */}
        <div className="grid gap-14 py-20 sm:py-24 lg:grid-cols-[1.4fr_0.8fr_0.8fr] lg:gap-20 lg:py-28">

          {/* BRAND */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease }}
          >
            <div className="flex items-center gap-4">
              <span className="h-px w-8 bg-white/30" />

              <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-white/40">
                {siteConfig.name}
              </p>
            </div>

            <h2 className="mt-6 max-w-md text-4xl font-light leading-[1.05] tracking-[-0.04em] sm:text-5xl">
              Un espacio para{" "}
              <span className="font-medium italic text-white/45">
                cuidar de ti.
              </span>
            </h2>

            <p className="mt-7 max-w-sm text-sm leading-7 text-white/40">
              {siteConfig.description}
            </p>

            <Link
              href="/services"
              className="group mt-8 inline-flex items-center gap-4 text-[10px] font-medium uppercase tracking-[0.2em] text-white/70 transition-colors duration-500 hover:text-white"
            >
              <span>Conoce nuestros servicios</span>

              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 transition-all duration-500 group-hover:border-white/50 group-hover:bg-white group-hover:text-neutral-950">
                <ArrowUpRight
                  size={14}
                  strokeWidth={1.5}
                />
              </span>
            </Link>
          </motion.div>

          {/* HOURS */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.8,
              delay: 0.1,
              ease,
            }}
          >
            <div className="flex items-center gap-3">
              <span className="h-px w-6 bg-white/20" />

              <h3 className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/45">
                Horario
              </h3>
            </div>

            <p className="mt-7 text-sm leading-7 text-white/55">
              Horarios de atención pendientes de confirmar.
            </p>
          </motion.div>

          {/* CONTACT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease,
            }}
          >
            <div className="flex items-center gap-3">
              <span className="h-px w-6 bg-white/20" />

              <h3 className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/45">
                Contacto
              </h3>
            </div>

            <div className="mt-7 space-y-4 text-sm">

              {contact.phone && (
                <a
                  href={`tel:${contact.phone}`}
                  className="block text-white/55 transition-colors hover:text-white"
                >
                  {contact.phone}
                </a>
              )}

              {contact.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="block text-white/55 transition-colors hover:text-white"
                >
                  {contact.email}
                </a>
              )}

              {contact.address && (
                <p className="text-white/55">
                  {contact.address}
                </p>
              )}

              {contact.whatsapp && (
                <a
                  href={`https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-white/55 transition-colors hover:text-white"
                >
                  WhatsApp ↗
                </a>
              )}

              {!contact.phone &&
                !contact.email &&
                !contact.address &&
                !contact.whatsapp && (
                  <p className="text-white/40">
                    Información de contacto próximamente.
                  </p>
                )}

              {/* SOCIAL MEDIA */}
              <div className="flex items-center gap-5 pt-4">

                {social.instagram && (
                  <a
                    href={social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="text-white/50 transition-colors hover:text-white"
                  >
                    <span className="text-xs font-semibold">IG</span>
                  </a>
                )}

                {social.facebook && (
                  <a
                    href={social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="text-white/50 transition-colors hover:text-white"
                  >
                    <span className="text-xs font-semibold">FB</span>
                  </a>
                )}

              </div>
            </div>
          </motion.div>
        </div>

        {/* DIVIDER */}
        <motion.div
          initial={{ scaleX: 0, transformOrigin: "left" }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, delay: 0.2, ease }}
          className="h-px w-full bg-white/10"
        />

        {/* BOTTOM BAR */}
        <div className="flex flex-col gap-4 py-6 text-[10px] uppercase tracking-[0.15em] text-white/35 sm:flex-row sm:items-center sm:justify-between">

          <p>
            © {new Date().getFullYear()} {siteConfig.name}
          </p>

          <p>
            Todos los derechos reservados
          </p>
        </div>
      </div>
    </footer>
  );
}
