"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  Check,
  Clock3,
  Loader2,
  Scissors,
  UserRound,
} from "lucide-react";

type Service = {
  id: string;
  name: string;
  description: string | null;
  duration_minutes: number;
  category: string | null;
};

type Slot = {
  startsAt: string;
  endsAt: string;
  staffId: string;
  staffName: string;
};

type Props = {
  services: Service[];
  initialServiceId?: string;
};

const TIME_ZONE = "America/Havana";
const BOOKING_DAYS = 7;

function getCubaDate() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());

  const get = (type: string) =>
    parts.find((part) => part.type === type)?.value ?? "";

  return `${get("year")}-${get("month")}-${get("day")}`;
}

function addDays(date: string, days: number) {
  const parsed = new Date(`${date}T12:00:00.000Z`);
  parsed.setUTCDate(parsed.getUTCDate() + days);
  return parsed.toISOString().slice(0, 10);
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("es", {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  }).format(new Date(`${date}T12:00:00.000Z`));
}

function formatTime(dateTime: string) {
  return new Intl.DateTimeFormat("es", {
    timeZone: TIME_ZONE,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(dateTime));
}

export default function BookingExperience({
  services,
  initialServiceId,
}: Props) {
  const initialService = services.some(
    (service) => service.id === initialServiceId,
  )
    ? (initialServiceId ?? "")
    : "";

  const [serviceId, setServiceId] = useState(initialService);
  const [staffId, setStaffId] = useState("");
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const selectedService = services.find((service) => service.id === serviceId);

  const dates = useMemo(() => {
    const today = getCubaDate();

    return Array.from({ length: BOOKING_DAYS }, (_, index) =>
      addDays(today, index),
    );
  }, []);

  useEffect(() => {
    if (!serviceId || !date) {
      return;
    }

    const controller = new AbortController();

    async function loadAvailability() {
      setLoading(true);
      setError("");
      setSlots([]);
      setSelectedSlot(null);

      try {
        const params = new URLSearchParams({
          serviceId,
          date,
        });

        const response = await fetch(
          `/api/booking/availability?${params.toString()}`,
          {
            signal: controller.signal,
            cache: "no-store",
          },
        );

        if (!response.ok) {
          throw new Error("No se pudieron cargar los horarios.");
        }

        const data: { slots: Slot[] } = await response.json();

        if (!controller.signal.aborted) {
          setSlots(data.slots);
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(
            err instanceof Error
              ? err.message
              : "No se pudo consultar la disponibilidad.",
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void loadAvailability();

    return () => controller.abort();
  }, [serviceId, date]);

  const availableStaff = useMemo(() => {
    const staffMap = new Map<string, string>();

    for (const slot of slots) {
      staffMap.set(slot.staffId, slot.staffName);
    }

    return Array.from(staffMap, ([id, name]) => ({
      id,
      name,
    })).sort((a, b) => a.name.localeCompare(b.name));
  }, [slots]);

  const visibleSlots = useMemo(() => {
    return slots
      .filter((slot) => !staffId || slot.staffId === staffId)
      .sort(
        (a, b) =>
          new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime(),
      );
  }, [slots, staffId]);

  const inputClass =
    "min-h-14 w-full rounded-xl border border-white/15 bg-[#171310] px-4 text-sm text-white outline-none transition focus:border-[#d6b79a]";

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="space-y-10">
        <section>
          <div className="mb-5 flex items-center gap-3">
            <Scissors size={19} className="text-[#d6b79a]" />
            <h2 className="text-xl font-light">01. Selecciona tu servicio</h2>
          </div>

          {services.length === 0 ? (
            <p className="rounded-xl border border-white/10 p-6 text-sm text-white/50">
              Todavía no hay servicios disponibles para reservar.
            </p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {services.map((service) => {
                const selected = service.id === serviceId;

                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => {
                      setServiceId(service.id);
                      setStaffId("");
                      setDate("");
                      setSlots([]);
                      setSelectedSlot(null);
                      setError("");
                    }}
                    aria-pressed={selected}
                    className={`min-h-32 rounded-xl border p-5 text-left transition ${
                      selected
                        ? "border-[#d6b79a] bg-[#d6b79a]/10"
                        : "border-white/10 bg-[#171310] hover:border-white/30"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="text-base font-medium">
                        {service.name}
                      </span>

                      {selected && (
                        <Check size={18} className="shrink-0 text-[#d6b79a]" />
                      )}
                    </div>

                    <p className="mt-3 flex items-center gap-2 text-xs text-white/50">
                      <Clock3 size={14} />
                      {service.duration_minutes} minutos
                    </p>

                    {service.description && (
                      <p className="mt-3 line-clamp-2 text-xs leading-6 text-white/45">
                        {service.description}
                      </p>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </section>

        {selectedService && (
          <section>
            <div className="mb-5 flex items-center gap-3">
              <CalendarDays size={19} className="text-[#d6b79a]" />
              <h2 className="text-xl font-light">02. Elige una fecha</h2>
            </div>

            <p className="mb-5 text-sm text-white/50">
              Selecciona un día dentro de los próximos 7 días.
            </p>

            <div className="grid grid-cols-4 gap-3 sm:grid-cols-7">
              {dates.map((availableDate) => {
                const selected = date === availableDate;

                const weekday = new Intl.DateTimeFormat("es", {
                  weekday: "short",
                  timeZone: "UTC",
                }).format(new Date(`${availableDate}T12:00:00.000Z`));

                const dayNumber = Number(availableDate.slice(8, 10));

                return (
                  <button
                    key={availableDate}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => {
                      setDate(availableDate);
                      setStaffId("");
                      setSlots([]);
                      setSelectedSlot(null);
                      setError("");
                    }}
                    className={`flex min-h-24 flex-col items-center justify-center gap-2 rounded-xl border transition ${
                      selected
                        ? "border-[#d6b79a] bg-[#d6b79a] text-[#11100f]"
                        : "border-white/15 bg-[#171310] text-white hover:border-[#d6b79a]/60"
                    }`}
                  >
                    <span className="text-xs uppercase tracking-wider opacity-70">
                      {weekday}
                    </span>

                    <span className="text-2xl font-light">{dayNumber}</span>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {selectedService && date && (
          <section>
            <div className="mb-5 flex items-center gap-3">
              <UserRound size={19} className="text-[#d6b79a]" />
              <h2 className="text-xl font-light">03. Profesional y horario</h2>
            </div>

            <p className="mb-5 text-sm text-white/50">
              {formatDate(date)} · Horario de Guantánamo, Cuba
            </p>

            {loading ? (
              <div
                role="status"
                className="flex items-center gap-3 border border-white/10 p-6 text-sm text-white/60"
              >
                <Loader2 size={18} className="animate-spin text-[#d6b79a]" />
                Buscando horarios disponibles...
              </div>
            ) : error ? (
              <p
                role="alert"
                className="border border-red-400/20 p-5 text-sm text-red-300"
              >
                {error}
              </p>
            ) : slots.length === 0 ? (
              <p className="border border-white/10 p-6 text-sm leading-7 text-white/50">
                No hay horarios disponibles para esta fecha. Prueba con otro
                día.
              </p>
            ) : (
              <>
                <label
                  htmlFor="booking-staff"
                  className="mb-3 block text-xs text-white/50"
                >
                  Profesional
                </label>

                <select
                  id="booking-staff"
                  value={staffId}
                  onChange={(event) => {
                    setStaffId(event.target.value);
                    setSelectedSlot(null);
                  }}
                  className={`${inputClass} mb-6`}
                >
                  <option value="">Cualquier profesional disponible</option>

                  {availableStaff.map((person) => (
                    <option key={person.id} value={person.id}>
                      {person.name}
                    </option>
                  ))}
                </select>

                <p className="mb-4 text-xs uppercase tracking-[0.16em] text-white/45">
                  Horas disponibles
                </p>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
                  {visibleSlots.map((slot) => {
                    const selected =
                      selectedSlot?.startsAt === slot.startsAt &&
                      selectedSlot?.staffId === slot.staffId;

                    return (
                      <button
                        key={`${slot.staffId}-${slot.startsAt}`}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => setSelectedSlot(slot)}
                        className={`min-h-20 rounded-xl border px-3 py-4 text-center transition ${
                          selected
                            ? "border-[#d6b79a] bg-[#d6b79a] text-[#11100f]"
                            : "border-white/15 bg-[#171310] text-white hover:border-[#d6b79a]/60"
                        }`}
                      >
                        <span className="block text-base font-medium">
                          {formatTime(slot.startsAt)}
                        </span>

                        <span
                          className={`mt-1 block truncate text-xs ${
                            selected ? "text-[#11100f]/70" : "text-white/45"
                          }`}
                        >
                          {slot.staffName}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </section>
        )}
      </div>

      <aside className="lg:sticky lg:top-28">
        <div className="rounded-2xl border border-[#d6b79a]/25 bg-[#171310] p-6 sm:p-8">
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#d6b79a]">
            Tu experiencia
          </p>

          <h2 className="mt-4 text-2xl font-light">Resumen de reserva</h2>

          <div className="mt-8 space-y-6 border-t border-white/10 pt-6">
            <div>
              <p className="text-xs text-white/40">Servicio</p>
              <p className="mt-2 text-sm">
                {selectedService?.name ?? "Por seleccionar"}
              </p>
            </div>

            <div>
              <p className="text-xs text-white/40">Duración</p>
              <p className="mt-2 text-sm">
                {selectedService
                  ? `${selectedService.duration_minutes} minutos`
                  : "—"}
              </p>
            </div>

            <div>
              <p className="text-xs text-white/40">Fecha</p>
              <p className="mt-2 text-sm">
                {date ? formatDate(date) : "Por seleccionar"}
              </p>
            </div>

            <div>
              <p className="text-xs text-white/40">Profesional</p>
              <p className="mt-2 text-sm">
                {selectedSlot?.staffName ?? "Por seleccionar"}
              </p>
            </div>

            <div>
              <p className="text-xs text-white/40">Hora</p>
              <p className="mt-2 text-sm">
                {selectedSlot
                  ? formatTime(selectedSlot.startsAt)
                  : "Por seleccionar"}
              </p>
            </div>
          </div>

          <button
            type="button"
            disabled={!selectedService || !selectedSlot}
            onClick={() => {
              setShowCustomerForm(true);
              document
                .getElementById("booking-customer-form")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="mt-8 min-h-13 w-full rounded-full bg-[#d6b79a] px-5 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#11100f] transition hover:bg-[#e5c9ad] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Continuar con la solicitud
          </button>

          <p className="mt-4 text-center text-xs leading-6 text-white/40">
            Próximamente activaremos el envío de solicitudes. Seleccionar una
            hora todavía no reserva la cita.
          </p>
          {showCustomerForm && selectedSlot && (
            <section
              id="booking-customer-form"
              className="rounded-2xl border border-[#d6b79a]/25 bg-[#171310] p-6 sm:p-10 lg:col-span-2"
            >
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#d6b79a]">
                Último paso
              </p>

              <h2 className="mt-4 text-3xl font-light">
                Tus datos de contacto.
              </h2>

              <p className="mt-4 text-sm leading-7 text-white/50">
                Completa tus datos para preparar tu solicitud de cita.
              </p>

              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="customer-name" className="mb-2 block text-sm">
                    Nombre completo
                  </label>
                  <input
                    id="customer-name"
                    type="text"
                    autoComplete="name"
                    placeholder="Tu nombre"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="customer-phone"
                    className="mb-2 block text-sm"
                  >
                    Teléfono / WhatsApp
                  </label>
                  <input
                    id="customer-phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="Tu número de contacto"
                    className={inputClass}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="customer-notes"
                    className="mb-2 block text-sm"
                  >
                    Notas adicionales (opcional)
                  </label>
                  <textarea
                    id="customer-notes"
                    rows={4}
                    placeholder="¿Hay algo que debamos saber?"
                    className={`${inputClass} py-4`}
                  />
                </div>
              </div>

              <button
                type="button"
                disabled
                className="mt-8 min-h-13 w-full rounded-full bg-[#d6b79a] px-6 py-4 text-sm font-medium text-[#11100f] opacity-50 sm:w-auto"
              >
                Enviar solicitud de cita
              </button>

              <p className="mt-4 text-xs text-white/40">
                El envío estará disponible cuando conectemos el registro seguro
                de citas.
              </p>
            </section>
          )}
        </div>
      </aside>
    </div>
  );
}
