
"use client";

import {
  useMemo,
  useState,
  useTransition,
} from "react";

import { useRouter } from "next/navigation";

import {
  CalendarDays,
  Check,
  CheckCircle2,
  Clock3,
  FilterX,
  Loader2,
  Phone,
  Search,
  Scissors,
  UserRound,
  X,
} from "lucide-react";

import { updateAppointmentStatus } from "@/app/admin/(dashboard)/appointments/actions";

type Status =
  | "pending"
  | "confirmed"
  | "rejected"
  | "cancelled"
  | "completed";

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

const statusStyles: Record<Status, string> = {
  pending:
    "border-amber-300/25 bg-amber-300/10 text-amber-200",
  confirmed:
    "border-emerald-300/25 bg-emerald-300/10 text-emerald-200",
  rejected:
    "border-red-300/25 bg-red-300/10 text-red-200",
  cancelled:
    "border-white/15 bg-white/5 text-white/50",
  completed:
    "border-[#d6b79a]/30 bg-[#d6b79a]/10 text-[#d6b79a]",
};

const selectClass =
  "min-h-12 w-full rounded-xl border border-white/15 " +
  "bg-[#171310] px-4 text-sm text-white outline-none " +
  "transition focus:border-[#d6b79a]";

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

function getCubaDateKey(value: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date(value));

  const part = (type: string) =>
    parts.find((item) => item.type === type)?.value ?? "";

  return `${part("year")}-${part("month")}-${part("day")}`;
}

export default function AppointmentsManager({
  appointments,
}: {
  appointments: Appointment[];
}) {
  const router = useRouter();

  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [staffFilter, setStaffFilter] = useState("all");

  const [busyId, setBusyId] = useState<string | null>(
    null
  );

  const [message, setMessage] = useState("");

  const [isPending, startTransition] = useTransition();

  const counts = useMemo(() => {
    return {
      all: appointments.length,
      pending: appointments.filter(
        (item) => item.status === "pending"
      ).length,
      confirmed: appointments.filter(
        (item) => item.status === "confirmed"
      ).length,
      completed: appointments.filter(
        (item) => item.status === "completed"
      ).length,
    };
  }, [appointments]);

  const professionals = useMemo(() => {
    return Array.from(
      new Set(appointments.map((item) => item.staffName))
    ).sort((a, b) => a.localeCompare(b, "es"));
  }, [appointments]);

  const filtered = useMemo(() => {
    const q = query.trim().toLocaleLowerCase("es");

    return appointments.filter((item) => {
      if (
        filter !== "all" &&
        item.status !== filter
      ) {
        return false;
      }

      if (
        staffFilter !== "all" &&
        item.staffName !== staffFilter
      ) {
        return false;
      }

      if (
        dateFilter &&
        getCubaDateKey(item.startsAt) !== dateFilter
      ) {
        return false;
      }

      if (!q) return true;

      return [
        item.customerName,
        item.customerPhone,
        item.serviceName,
        item.staffName,
        item.customerNotes ?? "",
      ].some((value) =>
        value.toLocaleLowerCase("es").includes(q)
      );
    });
  }, [
    appointments,
    filter,
    query,
    dateFilter,
    staffFilter,
  ]);

  const hasFilters =
    filter !== "all" ||
    query.trim() !== "" ||
    dateFilter !== "" ||
    staffFilter !== "all";

  function clearFilters() {
    setFilter("all");
    setQuery("");
    setDateFilter("");
    setStaffFilter("all");
  }

  function changeStatus(
    item: Appointment,
    nextStatus: Status
  ) {
    if (isPending) return;

    const current = item.status as Status;

    const question =
      nextStatus === "rejected"
        ? `¿Rechazar la solicitud de ${item.customerName}?`
        : nextStatus === "cancelled"
          ? `¿Cancelar la cita de ${item.customerName}?`
          : nextStatus === "completed"
            ? `¿Marcar como completada la cita de ${item.customerName}?`
            : `¿Confirmar la cita de ${item.customerName}?`;

    if (!window.confirm(question)) {
      return;
    }

    setMessage("");
    setBusyId(item.id);

    startTransition(async () => {
      try {
        const result = await updateAppointmentStatus(
          item.id,
          current,
          nextStatus
        );

        if (!result.success) {
          setMessage(result.error);
        } else {
          router.refresh();
        }
      } catch {
        setMessage(
          "No se pudo completar la operación. Inténtalo otra vez."
        );
      } finally {
        setBusyId(null);
      }
    });
  }

  const stats = [
    {
      label: "Total de citas",
      status: "all",
      value: counts.all,
      icon: CalendarDays,
    },
    {
      label: "Pendientes",
      status: "pending",
      value: counts.pending,
      icon: Clock3,
    },
    {
      label: "Confirmadas",
      status: "confirmed",
      value: counts.confirmed,
      icon: Check,
    },
    {
      label: "Completadas",
      status: "completed",
      value: counts.completed,
      icon: CheckCircle2,
    },
  ] as const;

  return (
    <div className="mt-8 space-y-7">
      {/* INDICADORES */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const active = filter === stat.status;

          return (
            <button
              key={stat.status}
              type="button"
              onClick={() => setFilter(stat.status)}
              aria-pressed={active}
              className={[
                "rounded-2xl border p-4 text-left",
                "transition sm:p-6",
                active
                  ? "border-[#d6b79a]/60 bg-[#211a15]"
                  : "border-white/10 bg-[#171310] hover:border-[#d6b79a]/30",
              ].join(" ")}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs text-white/50">
                  {stat.label}
                </span>

                <Icon
                  size={18}
                  className="shrink-0 text-[#d6b79a]"
                />
              </div>

              <p className="mt-5 text-3xl font-light tracking-tight text-[#d6b79a] sm:text-4xl">
                {stat.value}
              </p>
            </button>
          );
        })}
      </div>

      {/* FILTROS */}
      <section className="rounded-2xl border border-white/10 bg-[#171310] p-4 sm:p-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-light">
              Buscar y filtrar
            </h2>

            <p className="mt-1 text-xs text-white/40">
              Encuentra rápidamente cualquier reserva.
            </p>
          </div>

          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/15 px-4 text-xs text-white/70 transition hover:border-[#d6b79a]/50 hover:text-white"
            >
              <FilterX size={15} />
              Limpiar filtros
            </button>
          )}
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <label className="relative">
            <span className="mb-2 block text-xs text-white/50">
              Buscar
            </span>

            <Search
              size={17}
              className="pointer-events-none absolute bottom-4 left-4 text-white/40"
            />

            <input
              type="search"
              value={query}
              onChange={(event) =>
                setQuery(event.target.value)
              }
              placeholder="Cliente, teléfono, servicio..."
              className={`${selectClass} pl-11`}
            />
          </label>

          <label>
            <span className="mb-2 block text-xs text-white/50">
              Estado
            </span>

            <select
              value={filter}
              onChange={(event) =>
                setFilter(event.target.value)
              }
              className={selectClass}
            >
              <option value="all">
                Todos los estados
              </option>

              {Object.entries(labels).map(
                ([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                )
              )}
            </select>
          </label>

          <label>
            <span className="mb-2 block text-xs text-white/50">
              Fecha de cita (Cuba)
            </span>

            <input
              type="date"
              value={dateFilter}
              onChange={(event) =>
                setDateFilter(event.target.value)
              }
              className={`${selectClass} [color-scheme:dark]`}
            />
          </label>

          <label>
            <span className="mb-2 block text-xs text-white/50">
              Profesional
            </span>

            <select
              value={staffFilter}
              onChange={(event) =>
                setStaffFilter(event.target.value)
              }
              className={selectClass}
            >
              <option value="all">
                Todos los profesionales
              </option>

              {professionals.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      {/* RESULTADOS */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-light">
            Listado de citas
          </h2>

          <p className="mt-1 text-xs text-white/40">
            {filtered.length} de {appointments.length} citas
          </p>
        </div>
      </div>

      {message && (
        <p
          role="alert"
          className="rounded-xl border border-red-400/30 bg-red-400/5 p-4 text-sm text-red-300"
        >
          {message}
        </p>
      )}

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-[#171310] p-10 text-center">
          <CalendarDays
            size={34}
            className="mx-auto text-[#d6b79a]/50"
          />

          <h3 className="mt-5 text-lg font-light">
            No encontramos citas
          </h3>

          <p className="mt-3 text-sm leading-7 text-white/45">
            No hay reservas que coincidan con los filtros
            seleccionados.
          </p>

          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 rounded-full border border-[#d6b79a]/40 px-5 py-3 text-xs text-[#d6b79a]"
            >
              Mostrar todas las citas
            </button>
          )}
        </div>
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">
          {filtered.map((item) => {
            const status = item.status as Status;

            const isBusy =
              isPending && busyId === item.id;

            return (
              <article
                key={item.id}
                className="min-w-0 rounded-2xl border border-white/10 bg-[#171310] p-5 transition hover:border-white/20 sm:p-6"
              >
                {/* CLIENTE Y ESTADO */}
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-white/35">
                      Cliente
                    </p>

                    <h3 className="break-words text-lg font-medium">
                      {item.customerName}
                    </h3>

                    <a
                      href={`tel:${item.customerPhone}`}
                      className="mt-3 inline-flex items-center gap-2 text-sm text-[#d6b79a] hover:underline"
                    >
                      <Phone size={15} />
                      {item.customerPhone}
                    </a>
                  </div>

                  <span
                    className={[
                      "rounded-full border px-3 py-1.5",
                      "text-xs font-medium",
                      statusStyles[status] ??
                        "border-white/15 text-white/60",
                    ].join(" ")}
                  >
                    {labels[status] ?? item.status}
                  </span>
                </div>

                {/* DETALLES */}
                <div className="mt-6 grid gap-5 border-t border-white/10 pt-6 sm:grid-cols-2">
                  <div className="flex items-start gap-3">
                    <Scissors
                      size={17}
                      className="mt-0.5 shrink-0 text-[#d6b79a]"
                    />

                    <div>
                      <p className="text-xs text-white/40">
                        Servicio
                      </p>

                      <p className="mt-1 text-sm">
                        {item.serviceName}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <UserRound
                      size={17}
                      className="mt-0.5 shrink-0 text-[#d6b79a]"
                    />

                    <div>
                      <p className="text-xs text-white/40">
                        Profesional
                      </p>

                      <p className="mt-1 text-sm">
                        {item.staffName}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CalendarDays
                      size={17}
                      className="mt-0.5 shrink-0 text-[#d6b79a]"
                    />

                    <div>
                      <p className="text-xs text-white/40">
                        Fecha
                      </p>

                      <p className="mt-1 text-sm capitalize">
                        {formatDate(item.startsAt)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock3
                      size={17}
                      className="mt-0.5 shrink-0 text-[#d6b79a]"
                    />

                    <div>
                      <p className="text-xs text-white/40">
                        Horario
                      </p>

                      <p className="mt-1 text-sm">
                        {formatTime(item.startsAt)}
                        {" – "}
                        {formatTime(item.endsAt)}
                      </p>

                      <p className="mt-1 text-xs text-white/35">
                        Hora de Cuba
                      </p>
                    </div>
                  </div>
                </div>

                {/* NOTAS */}
                {item.customerNotes && (
                  <div className="mt-6 rounded-xl border border-white/10 bg-[#11100f] p-4">
                    <p className="text-xs text-white/40">
                      Notas del cliente
                    </p>

                    <p className="mt-2 break-words text-sm leading-7 text-white/70">
                      {item.customerNotes}
                    </p>
                  </div>
                )}

                {/* ACCIONES */}
                {(status === "pending" ||
                  status === "confirmed") && (
                  <div className="mt-6 flex flex-wrap gap-2 border-t border-white/10 pt-5">
                    {status === "pending" && (
                      <>
                        <button
                          type="button"
                          disabled={isPending}
                          onClick={() =>
                            changeStatus(
                              item,
                              "confirmed"
                            )
                          }
                          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#d6b79a] px-5 text-xs font-semibold text-[#11100f] transition hover:bg-[#e5c9ad] disabled:opacity-50"
                        >
                          <Check size={15} />
                          Confirmar
                        </button>

                        <button
                          type="button"
                          disabled={isPending}
                          onClick={() =>
                            changeStatus(
                              item,
                              "rejected"
                            )
                          }
                          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/20 px-5 text-xs transition hover:border-white/50 disabled:opacity-50"
                        >
                          <X size={15} />
                          Rechazar
                        </button>
                      </>
                    )}

                    {status === "confirmed" && (
                      <button
                        type="button"
                        disabled={isPending}
                        onClick={() =>
                          changeStatus(
                            item,
                            "completed"
                          )
                        }
                        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#d6b79a] px-5 text-xs font-semibold text-[#11100f] transition hover:bg-[#e5c9ad] disabled:opacity-50"
                      >
                        <CheckCircle2 size={15} />
                        Completada
                      </button>
                    )}

                    <button
                      type="button"
                      disabled={isPending}
                      onClick={() =>
                        changeStatus(
                          item,
                          "cancelled"
                        )
                      }
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-red-400/30 px-5 text-xs text-red-300 transition hover:bg-red-400/10 disabled:opacity-50"
                    >
                      Cancelar
                    </button>

                    {isBusy && (
                      <Loader2
                        size={18}
                        className="animate-spin self-center text-[#d6b79a]"
                      />
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}

      {appointments.length >= 300 && (
        <p className="text-xs leading-6 text-white/40">
          Mostrando un máximo de 300 citas, ordenadas
          por fecha de cita. Los indicadores y filtros
          corresponden únicamente a las citas cargadas.
        </p>
      )}
    </div>
  );
}
