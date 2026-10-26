"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, Check, Clock3, Loader2, Search, X } from "lucide-react";
import { updateAppointmentStatus } from "@/app/admin/(dashboard)/appointments/actions";

type Status = "pending" | "confirmed" | "rejected" | "cancelled" | "completed";

type Appointment = {
  id: string;
  customerName: string;
  customerPhone: string;
  customerNotes: string | null;
  startsAt: string;
  endsAt: string;
  status: string;
  createdAt: string;
  serviceName: string;
  staffName: string;
};

const TIME_ZONE = "America/Havana";
const labels: Record<Status, string> = {
  pending: "Pendiente",
  confirmed: "Confirmada",
  rejected: "Rechazada",
  cancelled: "Cancelada",
  completed: "Completada",
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("es", {
    timeZone: TIME_ZONE,
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function formatTime(value: string) {
  return new Intl.DateTimeFormat("es", {
    timeZone: TIME_ZONE,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(value));
}

export default function AppointmentsManager({ appointments }: { appointments: Appointment[] }) {
  const router = useRouter();
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const filtered = useMemo(() => {
    const q = query.trim().toLocaleLowerCase("es");
    return appointments.filter((item) => {
      if (filter !== "all" && item.status !== filter) return false;
      return (
        !q ||
        [item.customerName, item.customerPhone, item.serviceName, item.staffName]
          .some((value) => value.toLocaleLowerCase("es").includes(q))
      );
    });
  }, [appointments, filter, query]);

  function changeStatus(item: Appointment, nextStatus: Status) {
    const current = item.status as Status;
    const question = nextStatus === "rejected"
      ? "¿Rechazar esta solicitud?"
      : nextStatus === "cancelled"
        ? "¿Cancelar esta cita?"
        : nextStatus === "completed"
          ? "¿Marcar esta cita como completada?"
          : "¿Confirmar esta cita?";
    if (!window.confirm(question)) return;
    setMessage("");
    setBusyId(item.id);
    startTransition(async () => {
      try {
        const result = await updateAppointmentStatus(item.id, current, nextStatus);
        if (!result.success) {
          setMessage(result.error);
        } else {
          router.refresh();
        }
      } catch {
        setMessage("No se pudo completar la operación. Inténtalo otra vez.");
      } finally {
        setBusyId(null);
      }
    });
  }

  const selectClass = "min-h-12 rounded-xl border border-white/15 bg-[#171310] px-4 text-sm text-white outline-none focus:border-[#d6b79a]";

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {([
          ["Pendientes", "pending"],
          ["Confirmadas", "confirmed"],
          ["Completadas", "completed"],
          ["Total", "all"],
        ] as const).map(([label, status]) => (
          <div key={status} className="rounded-2xl border border-white/10 bg-[#171310] p-4 sm:p-5">
            <p className="text-xs text-white/50">{label}</p>
            <p className="mt-2 text-3xl font-light text-[#d6b79a]">
              {status === "all" ? appointments.length : appointments.filter((a) => a.status === status).length}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="relative flex-1">
          <span className="sr-only">Buscar cita</span>
          <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar cliente, teléfono, servicio o profesional"
            className={`${selectClass} w-full pl-11`}
          />
        </label>
        <select value={filter} onChange={(event) => setFilter(event.target.value)} className={selectClass} aria-label="Filtrar por estado">
          <option value="all">Todos los estados</option>
          {Object.entries(labels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
        </select>
      </div>

      {message && <p role="alert" className="rounded-xl border border-red-400/30 p-4 text-sm text-red-300">{message}</p>}

      {filtered.length === 0 ? (
        <p className="rounded-2xl border border-white/10 p-8 text-center text-sm text-white/50">
          No hay citas que coincidan con la búsqueda.
        </p>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {filtered.map((item) => {
            const status = item.status as Status;
            const isBusy = isPending && busyId === item.id;
            return (
              <article key={item.id} className="min-w-0 rounded-2xl border border-white/10 bg-[#171310] p-5 sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="break-words text-lg font-medium">{item.customerName}</h2>
                    <a href={`tel:${item.customerPhone}`} className="mt-1 block text-sm text-[#d6b79a] hover:underline">{item.customerPhone}</a>
                  </div>
                  <span className="rounded-full border border-[#d6b79a]/30 px-3 py-1 text-xs text-[#d6b79a]">
                    {labels[status] ?? item.status}
                  </span>
                </div>

                <div className="mt-5 space-y-3 border-t border-white/10 pt-5 text-sm">
                  <p><span className="text-white/45">Servicio:</span> {item.serviceName}</p>
                  <p><span className="text-white/45">Profesional:</span> {item.staffName}</p>
                  <p className="flex items-center gap-2"><CalendarDays size={15} className="text-[#d6b79a]" />{formatDate(item.startsAt)}</p>
                  <p className="flex items-center gap-2"><Clock3 size={15} className="text-[#d6b79a]" />{formatTime(item.startsAt)} – {formatTime(item.endsAt)} · Guantánamo</p>
                  {item.customerNotes && <p className="break-words text-white/65"><span className="text-white/45">Notas:</span> {item.customerNotes}</p>}
                </div>

                {(status === "pending" || status === "confirmed") && (
                  <div className="mt-6 flex flex-wrap gap-2 border-t border-white/10 pt-5">
                    {status === "pending" && (
                      <>
                        <button disabled={isPending} onClick={() => changeStatus(item, "confirmed")} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#d6b79a] px-4 text-xs font-semibold text-[#11100f] disabled:opacity-50"><Check size={15} /> Confirmar</button>
                        <button disabled={isPending} onClick={() => changeStatus(item, "rejected")} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 px-4 text-xs disabled:opacity-50"><X size={15} /> Rechazar</button>
                      </>
                    )}
                    {status === "confirmed" && (
                      <button disabled={isPending} onClick={() => changeStatus(item, "completed")} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#d6b79a] px-4 text-xs font-semibold text-[#11100f] disabled:opacity-50"><Check size={15} /> Completada</button>
                    )}
                    <button disabled={isPending} onClick={() => changeStatus(item, "cancelled")} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-red-400/30 px-4 text-xs text-red-300 disabled:opacity-50">Cancelar</button>
                    {isBusy && <Loader2 size={18} className="animate-spin self-center text-[#d6b79a]" />}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
      {appointments.length >= 300 && <p className="text-xs text-white/40">Mostrando las 300 citas más recientes por fecha de cita.</p>}
    </div>
  );
}
