
"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/types/service";
import AnimatedImage from "@/components/ui/AnimatedImage";

interface ServiceCardProps {
  service: Service;
  index?: number;
}

export default function ServiceCard({
  service,
  index = 0,
}: ServiceCardProps) {
  return (
    <article className="group flex h-full min-w-0 flex-col">
      {/* FOTOGRAFÍA */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#332b26] sm:aspect-[3/4] lg:aspect-[4/5]">
        <AnimatedImage
          src={service.image}
          alt={`Imagen ilustrativa de ${service.name}`}
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        <div className="absolute left-4 top-4 right-4 flex items-start justify-between gap-3 sm:left-5 sm:right-5 sm:top-5">
          <span className="max-w-[75%] border border-white/25 bg-[#11100f]/35 px-3 py-2 text-[9px] uppercase tracking-[0.16em] text-white backdrop-blur-md sm:px-4">
            {service.category}
          </span>

          <span className="text-[10px] tracking-[0.2em] text-white/85">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3">
          <span className="text-[9px] uppercase tracking-[0.22em] text-white/80">
            Élite Beauty Studio
          </span>

          <span className="h-px w-8 bg-[#d6b79a]" />
        </div>
      </div>

      {/* INFORMACIÓN */}
      <div className="flex flex-1 flex-col border-b border-white/15 pb-7 pt-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="min-w-0 text-[clamp(1.5rem,2.2vw,2rem)] font-light leading-tight tracking-[-0.045em] text-white">
            {service.name}
          </h3>

          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#d6b79a]/40 text-[#d6b79a] transition-all duration-300 group-hover:border-[#d6b79a] group-hover:bg-[#d6b79a] group-hover:text-[#11100f]">
            <ArrowUpRight size={17} strokeWidth={1.5} />
          </span>
        </div>

        <p className="mt-4 flex-1 text-sm font-light leading-7 text-white/55">
          {service.description}
        </p>

        <Link
          href="/#contacto"
          className="mt-7 inline-flex min-h-11 items-center gap-3 self-start text-[10px] font-medium uppercase tracking-[0.16em] text-[#d6b79a] transition-colors hover:text-white"
        >
          Consultar información
          <ArrowUpRight size={15} strokeWidth={1.5} />
        </Link>
      </div>
    </article>
  );
}
