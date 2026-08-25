import { Service } from "@/types/service";

interface BookingSummaryProps {
  service?: Service;
  date: string;
  time: string;
}

export default function BookingSummary({
  service,
  date,
  time,
}: BookingSummaryProps) {
  if (!service) {
    return null;
  }

  const formattedDate = date
    ? new Date(`${date}T00:00:00`).toLocaleDateString(
        "es-ES",
        {
          weekday: "long",
          day: "numeric",
          month: "long",
        }
      )
    : "Selecciona un día";

  return (
    <aside className="rounded-2xl bg-neutral-950 p-6 text-white">
      <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
        Resumen
      </p>

      <h3 className="mt-4 text-xl font-semibold">
        {service.name}
      </h3>

      <div className="mt-5 space-y-3 border-t border-white/10 pt-5 text-sm">
        <div className="flex justify-between gap-4">
          <span className="text-white/50">Fecha</span>

          <span className="text-right capitalize">
            {formattedDate}
          </span>
        </div>

        <div className="flex justify-between gap-4">
          <span className="text-white/50">Hora</span>

          <span>
            {time || "Selecciona una hora"}
          </span>
        </div>

        <div className="flex justify-between gap-4">
          <span className="text-white/50">Duración</span>

          <span>{service.duration} min</span>
        </div>

        <div className="flex justify-between gap-4 border-t border-white/10 pt-4">
          <span className="font-medium">Total</span>

          <span className="text-lg font-semibold">
            {service.price} €
          </span>
        </div>
      </div>
    </aside>
  );
}