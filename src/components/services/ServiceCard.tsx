"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Service } from "@/types/service";

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="group">
      {/* Imagen */}
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
        <motion.img
          src={service.image}
          alt={service.name}
          initial={{ scale: 1.06 }}
          whileInView={{ scale: 1 }}
          whileHover={{ scale: 1.04 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 1.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="h-full w-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/5 transition-all duration-700 group-hover:bg-black/0" />

        {/* Categoría */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute left-4 top-4"
        >
          <span className="inline-flex bg-white/90 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-neutral-700 backdrop-blur-sm">
            {service.category}
          </span>
        </motion.div>

        {/* Número */}
        <div className="absolute bottom-4 right-4 flex h-8 w-8 items-center justify-center border border-white/40 bg-black/10 text-[10px] font-medium text-white backdrop-blur-sm">
          {String(service.id).padStart(2, "0")}
        </div>
      </div>

      {/* Contenido */}
      <div className="border-b border-neutral-200 py-6">
        <div className="flex items-start justify-between gap-6">
          <div className="min-w-0">
            <h3 className="text-xl font-light tracking-[-0.02em] text-neutral-950 transition-colors duration-300 group-hover:text-neutral-600">
              {service.name}
            </h3>

            <p className="mt-3 max-w-md text-sm leading-6 text-neutral-500">
              {service.description}
            </p>
          </div>

          <span className="shrink-0 text-lg font-light tracking-tight text-neutral-950">
            {service.price} €
          </span>
        </div>

        {/* Footer de card */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-neutral-400">
            <span className="h-px w-5 bg-neutral-300" />
            <span>{service.duration} min</span>
          </div>

          <Link
            href={`/booking?service=${service.id}`}
            className="group/button inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.14em] text-neutral-800"
          >
            <span className="relative">
              Reservar
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-neutral-900 transition-all duration-500 group-hover/button:w-full" />
            </span>

            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 transition-all duration-500 group-hover/button:border-neutral-900 group-hover/button:bg-neutral-900 group-hover/button:text-white">
              <ArrowUpRight
                size={14}
                strokeWidth={1.5}
                className="transition-transform duration-500 group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5"
              />
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}