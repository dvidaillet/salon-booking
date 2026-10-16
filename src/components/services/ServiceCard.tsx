
"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/types/service";

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({
  service,
}: ServiceCardProps) {
  return (
    <article className="group">
      <div className="relative aspect-[4/5] overflow-hidden bg-neutral-200">
        <motion.img
          src={service.image}
          alt={service.name}
          loading="lazy"
          initial={{ scale: 1.08 }}
          whileInView={{ scale: 1 }}
          whileHover={{ scale: 1.06 }}
          viewport={{ once: true }}
          transition={{
            duration: 1.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="h-full w-full object-cover"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />

        <div className="absolute left-5 top-5">
          <span className="inline-flex bg-[#faf8f5]/95 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-800 backdrop-blur-sm">
            {service.category}
          </span>
        </div>

        <div className="absolute bottom-5 left-5">
          <span className="text-[10px] uppercase tracking-[0.25em] text-white/85">
            Élite Beauty Studio
          </span>
        </div>
      </div>

      <div className="border-b border-neutral-300/70 pb-7 pt-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-2xl font-light tracking-[-0.035em] text-neutral-950">
            {service.name}
          </h3>

          <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-neutral-300 text-neutral-700 transition-all duration-300 group-hover:border-neutral-950 group-hover:bg-neutral-950 group-hover:text-white">
            <ArrowUpRight size={16} strokeWidth={1.5} />
          </span>
        </div>

        <p className="mt-4 min-h-14 text-sm leading-7 text-neutral-500">
          {service.description}
        </p>

        <Link
          href="/#contacto"
          className="mt-6 inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-800 transition-colors hover:text-neutral-500"
        >
          Consultar información
          <ArrowUpRight size={15} strokeWidth={1.5} />
        </Link>
      </div>
    </article>
  );
}
