import Link from "next/link";
import { Service } from "@/types/service";

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({
  service,
}: ServiceCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={service.image}
          alt={service.name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />

        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-neutral-800 backdrop-blur">
          {service.category}
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-neutral-900">
              {service.name}
            </h3>

            <p className="mt-2 text-sm leading-6 text-neutral-500">
              {service.description}
            </p>
          </div>

          <span className="shrink-0 text-lg font-semibold text-neutral-900">
            {service.price} €
          </span>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-neutral-100 pt-5">
          <span className="text-sm text-neutral-500">
            {service.duration} min
          </span>

          <Link
            href={`/booking?service=${service.id}`}
            className="rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-700"
          >
            Reservar
          </Link>
        </div>
      </div>
    </article>
  );
}