
"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from "react";

import {
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock3,
  ImageIcon,
  Loader2,
  Scissors,
  Sparkles,
  UserRound,
} from "lucide-react";

type Service = {
  id: string;
  name: string;
  description: string | null;
  duration_minutes: number;
  category: string | null;
  price?: number | null;
  image_url?: string | null;
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

const GOLD = "#d6b79a";

const inputClass =
  "min-h-12 w-full rounded-xl border border-white/15 " +
  "bg-[#11100f] px-4 py-3 text-sm text-white " +
  "outline-none transition placeholder:text-white/30 " +
  "focus:border-[#d6b79a] focus:ring-1 " +
  "focus:ring-[#d6b79a]/30";

function cubaToday() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());

  const value = (type: string) =>
    parts.find((part) => part.type === type)?.value ?? "";

  return `${value("year")}-${value("month")}-${value("day")}`;
}

function addDays(date: string, days: number) {
  const value = new Date(`${date}T12:00:00.000Z`);
  value.setUTCDate(value.getUTCDate() + days);

  return value.toISOString().slice(0, 10);
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("es", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  }).format(new Date(`${date}T12:00:00.000Z`));
}

function formatWeekday(date: string) {
  return new Intl.DateTimeFormat("es", {
    weekday: "short",
    timeZone: "UTC",
  }).format(new Date(`${date}T12:00:00.000Z`));
}

function formatMonth(date: string) {
  return new Intl.DateTimeFormat("es", {
    month: "short",
    timeZone: "UTC",
  }).format(new Date(`${date}T12:00:00.000Z`));
}

function formatTime(iso: string) {
  return new Intl.DateTimeFormat("es", {
    timeZone: TIME_ZONE,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(iso));
}

function formatPrice(value: number | null | undefined) {
  if (value == null) {
    return "Precio a consultar";
  }

  return new Intl.NumberFormat("es", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export default function BookingExperience({
  services,
  initialServiceId,
}: Props) {
  const [serviceId, setServiceId] = useState(() => {
    return services.some(
      (service) => service.id === initialServiceId
    )
      ? initialServiceId ?? ""
      : "";
  });

  const [staffId, setStaffId] = useState("");
  const [date, setDate] = useState("");

  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedSlot, setSelectedSlot] =
    useState<Slot | null>(null);

  const [showCustomerForm, setShowCustomerForm] =
    useState(false);

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerNotes, setCustomerNotes] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [appointmentId, setAppointmentId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [today, setToday] = useState(() => cubaToday());

  const customerFormRef = useRef<HTMLFormElement>(null);

  const selectedService = services.find(
    (service) => service.id === serviceId
  );

  const dates = useMemo(() => {
    return Array.from(
      { length: BOOKING_DAYS },
      (_, index) => addDays(today, index)
    );
  }, [today]);

  // Actualizar la fecha al volver a la ventana.
  useEffect(() => {
    const onFocus = () => {
      setToday(cubaToday());
    };

    window.addEventListener("focus", onFocus);

    return () => {
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  // Consultar los horarios disponibles.
  useEffect(() => {
    if (!serviceId || !date || appointmentId) {
      return;
    }

    const controller = new AbortController();

    async function loadAvailability() {
      setLoading(true);
      setError("");
      setSlots([]);
      setSelectedSlot(null);
      setShowCustomerForm(false);

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
          }
        );

        if (!response.ok) {
          throw new Error(
            "No se pudieron cargar los horarios disponibles."
          );
        }

        const result: {
          slots?: Slot[];
        } = await response.json();

        if (!Array.isArray(result.slots)) {
          throw new Error(
            "La respuesta de disponibilidad no es válida."
          );
        }

        if (!controller.signal.aborted) {
          setSlots(result.slots);
        }
      } catch (caught) {
        if (!controller.signal.aborted) {
          setError(
            caught instanceof Error
              ? caught.message
              : "Error al consultar horarios."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void loadAvailability();

    return () => {
      controller.abort();
    };
  }, [serviceId, date, appointmentId]);

  // Profesionales disponibles.
  const availableStaff = useMemo(() => {
    const map = new Map<string, string>();

    slots.forEach((slot) => {
      map.set(slot.staffId, slot.staffName);
    });

    return Array.from(map, ([id, name]) => ({
      id,
      name,
    })).sort((a, b) => a.name.localeCompare(b.name));
  }, [slots]);

  // Horarios filtrados por profesional.
  const visibleSlots = useMemo(() => {
    return slots
      .filter((slot) => {
        return !staffId || slot.staffId === staffId;
      })
      .sort((a, b) => {
        return (
          Date.parse(a.startsAt) -
          Date.parse(b.startsAt)
        );
      });
  }, [slots, staffId]);

  function resetSelection() {
    setSelectedSlot(null);
    setShowCustomerForm(false);
    setSubmitError("");
  }

  function selectService(id: string) {
    if (appointmentId) return;

    setServiceId(id);
    setDate("");
    setStaffId("");
    setSlots([]);
    setError("");
    resetSelection();
  }

  function selectDate(value: string) {
    if (appointmentId) return;

    setDate(value);
    setStaffId("");
    setSlots([]);
    setError("");
    resetSelection();
  }

  function selectStaff(value: string) {
    if (appointmentId) return;

    setStaffId(value);
    resetSelection();
  }

  function selectSlot(slot: Slot) {
    if (appointmentId) return;

    setSelectedSlot(slot);
    setShowCustomerForm(false);
    setSubmitError("");
  }

  function continueToForm() {
    if (
      !selectedService ||
      !selectedSlot ||
      appointmentId
    ) {
      return;
    }

    setShowCustomerForm(true);

    requestAnimationFrame(() => {
      customerFormRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }

  async function handleBookingSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (
      !selectedService ||
      !selectedSlot ||
      submitting ||
      appointmentId
    ) {
      return;
    }

    setSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch(
        "/api/booking/appointments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            serviceId: selectedService.id,
            staffId: selectedSlot.staffId,
            startsAt: selectedSlot.startsAt,
            customerName: customerName.trim(),
            customerPhone: customerPhone.trim(),
            customerNotes: customerNotes.trim(),
          }),
        }
      );

      const result: {
        success?: boolean;
        appointmentId?: string;
        error?: string;
      } = await response.json();

      if (
        !response.ok ||
        !result.success ||
        !result.appointmentId
      ) {
        throw new Error(
          result.error ??
            "No se pudo registrar la solicitud."
        );
      }

      setAppointmentId(result.appointmentId);
      setShowCustomerForm(false);
    } catch (caught) {
      setSubmitError(
        caught instanceof Error
          ? caught.message
          : "No se pudo enviar la solicitud."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10">
      <div className="min-w-0 space-y-12">
        {/* PASO 1: SERVICIOS */}
        <section>
          <div className="mb-6 flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#d6b79a]/20 bg-[#d6b79a]/10">
              <Scissors
                size={20}
                className="text-[#d6b79a]"
              />
            </div>

            <div>
              <p className="mb-1 text-[10px] uppercase tracking-[0.22em] text-[#d6b79a]">
                Paso 01
              </p>

              <h2 className="text-xl font-light tracking-tight sm:text-2xl">
                Selecciona tu servicio
              </h2>

              <p className="mt-2 text-sm text-white/45">
                Elige la experiencia que deseas disfrutar.
              </p>
            </div>
          </div>

          {services.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-[#171310] p-8 text-sm leading-7 text-white/50">
              Todavía no hay servicios disponibles.
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {services.map((service) => {
                const selected =
                  service.id === serviceId;

                return (
                  <button
                    key={service.id}
                    type="button"
                    disabled={Boolean(appointmentId)}
                    aria-pressed={selected}
                    onClick={() =>
                      selectService(service.id)
                    }
                    className={[
                      "group overflow-hidden rounded-2xl",
                      "border text-left transition-all",
                      "duration-300",
                      "disabled:cursor-not-allowed",
                      selected
                        ? "border-[#d6b79a] bg-[#211a15] shadow-[0_0_0_1px_rgba(214,183,154,0.2)]"
                        : "border-white/10 bg-[#171310] hover:-translate-y-1 hover:border-[#d6b79a]/50",
                    ].join(" ")}
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#25201c]">
                      {service.image_url ? (
                        <div
                          role="img"
                          aria-label={`Fotografía de ${service.name}`}
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                          style={{
                            backgroundImage: `url("${service.image_url}")`,
                          }}
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <ImageIcon
                            size={38}
                            strokeWidth={1.2}
                            className="text-[#d6b79a]/50"
                          />
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-[#11100f]/80 via-transparent to-transparent" />

                      {selected && (
                        <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#d6b79a] text-[#11100f] shadow-lg">
                          <Check size={19} />
                        </span>
                      )}

                      {service.category && (
                        <span className="absolute bottom-4 left-4 text-[10px] uppercase tracking-[0.2em] text-white/90">
                          {service.category}
                        </span>
                      )}
                    </div>

                    <div className="p-5 sm:p-6">
                      <h3 className="text-xl font-light tracking-tight">
                        {service.name}
                      </h3>

                      {service.description && (
                        <p className="mt-3 line-clamp-2 text-xs leading-6 text-white/50">
                          {service.description}
                        </p>
                      )}

                      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
                        <span className="inline-flex items-center gap-2 text-xs text-white/60">
                          <Clock3
                            size={15}
                            className="text-[#d6b79a]"
                          />
                          {service.duration_minutes} min
                        </span>

                        <span className="text-sm font-medium text-[#d6b79a]">
                          {formatPrice(service.price)}
                        </span>
                      </div>

                      <div
                        className={[
                          "mt-4 flex items-center gap-2",
                          "text-[10px] uppercase",
                          "tracking-[0.16em]",
                          selected
                            ? "text-[#d6b79a]"
                            : "text-white/35",
                        ].join(" ")}
                      >
                        {selected
                          ? "Servicio seleccionado"
                          : "Seleccionar servicio"}

                        {selected ? (
                          <Check size={14} />
                        ) : (
                          <ArrowRight size={14} />
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </section>

        {/* PASO 2: FECHAS */}
        {selectedService && (
          <section>
            <div className="mb-6 flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#d6b79a]/20 bg-[#d6b79a]/10">
                <CalendarDays
                  size={20}
                  className="text-[#d6b79a]"
                />
              </div>

              <div>
                <p className="mb-1 text-[10px] uppercase tracking-[0.22em] text-[#d6b79a]">
                  Paso 02
                </p>

                <h2 className="text-xl font-light tracking-tight sm:text-2xl">
                  Elige una fecha
                </h2>

                <p className="mt-2 text-sm text-white/45">
                  Disponibilidad para los próximos siete días.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 sm:grid-cols-7 sm:gap-3">
              {dates.map((availableDate) => {
                const selected =
                  date === availableDate;

                return (
                  <button
                    key={availableDate}
                    type="button"
                    disabled={Boolean(appointmentId)}
                    aria-pressed={selected}
                    aria-label={formatDate(availableDate)}
                    onClick={() =>
                      selectDate(availableDate)
                    }
                    className={[
                      "flex min-h-28 flex-col",
                      "items-center justify-center",
                      "gap-2 rounded-xl border",
                      "px-2 py-4 transition",
                      "disabled:cursor-not-allowed",
                      selected
                        ? "border-[#d6b79a] bg-[#d6b79a] text-[#11100f]"
                        : "border-white/10 bg-[#171310] text-white hover:border-[#d6b79a]/60",
                    ].join(" ")}
                  >
                    <span className="text-[10px] uppercase tracking-wider opacity-70">
                      {formatWeekday(availableDate)}
                    </span>

                    <span className="text-2xl font-light">
                      {Number(
                        availableDate.slice(8, 10)
                      )}
                    </span>

                    <span className="text-[10px] uppercase opacity-60">
                      {formatMonth(availableDate)}
                    </span>
                  </button>
                );
              })}
            </div>

            <p className="mt-4 text-xs text-white/35">
              Todas las horas corresponden a Cuba.
            </p>
          </section>
        )}

        {/* PASO 3: PROFESIONAL Y HORARIO */}
        {selectedService && date && (
          <section>
            <div className="mb-6 flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#d6b79a]/20 bg-[#d6b79a]/10">
                <UserRound
                  size={20}
                  className="text-[#d6b79a]"
                />
              </div>

              <div>
                <p className="mb-1 text-[10px] uppercase tracking-[0.22em] text-[#d6b79a]">
                  Paso 03
                </p>

                <h2 className="text-xl font-light tracking-tight sm:text-2xl">
                  Profesional y horario
                </h2>

                <p className="mt-2 text-sm capitalize text-white/45">
                  {formatDate(date)} · Guantánamo, Cuba
                </p>
              </div>
            </div>

            {loading ? (
              <div
                role="status"
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#171310] p-6 text-sm text-white/60"
              >
                <Loader2
                  size={19}
                  className="animate-spin text-[#d6b79a]"
                />

                Buscando horarios disponibles...
              </div>
            ) : error ? (
              <div
                role="alert"
                className="rounded-2xl border border-red-400/20 bg-red-400/5 p-6 text-sm text-red-300"
              >
                {error}
              </div>
            ) : slots.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-[#171310] p-6">
                <Clock3
                  size={24}
                  className="text-[#d6b79a]"
                />

                <h3 className="mt-4 text-lg font-light">
                  Sin horarios disponibles
                </h3>

                <p className="mt-2 text-sm leading-7 text-white/50">
                  No encontramos horarios para esta fecha.
                  Puedes seleccionar otro día.
                </p>
              </div>
            ) : (
              <>
                <label
                  htmlFor="booking-staff"
                  className="mb-3 block text-xs uppercase tracking-[0.14em] text-white/50"
                >
                  Selecciona tu profesional
                </label>

                <select
                  id="booking-staff"
                  value={staffId}
                  disabled={Boolean(appointmentId)}
                  onChange={(event) =>
                    selectStaff(event.target.value)
                  }
                  className={`${inputClass} mb-7`}
                >
                  <option value="">
                    Cualquier profesional disponible
                  </option>

                  {availableStaff.map((person) => (
                    <option
                      key={person.id}
                      value={person.id}
                    >
                      {person.name}
                    </option>
                  ))}
                </select>

                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs uppercase tracking-[0.16em] text-white/45">
                    Horas disponibles
                  </p>

                  <span className="text-xs text-[#d6b79a]">
                    {visibleSlots.length} opciones
                  </span>
                </div>

                {visibleSlots.length === 0 ? (
                  <p className="rounded-xl border border-white/10 bg-[#171310] p-5 text-sm text-white/50">
                    Este profesional no tiene horarios
                    disponibles para la fecha seleccionada.
                  </p>
                ) : (
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
                    {visibleSlots.map((slot) => {
                      const selected =
                        selectedSlot?.startsAt ===
                          slot.startsAt &&
                        selectedSlot?.staffId ===
                          slot.staffId;

                      return (
                        <button
                          key={`${slot.staffId}-${slot.startsAt}`}
                          type="button"
                          disabled={Boolean(appointmentId)}
                          aria-pressed={selected}
                          onClick={() =>
                            selectSlot(slot)
                          }
                          className={[
                            "min-h-20 rounded-xl border",
                            "px-3 py-4 text-center",
                            "transition",
                            "disabled:cursor-not-allowed",
                            selected
                              ? "border-[#d6b79a] bg-[#d6b79a] text-[#11100f]"
                              : "border-white/10 bg-[#171310] text-white hover:border-[#d6b79a]/60",
                          ].join(" ")}
                        >
                          <span className="block text-base font-medium">
                            {formatTime(
                              slot.startsAt
                            )}
                          </span>

                          <span
                            className={[
                              "mt-1 block truncate text-xs",
                              selected
                                ? "text-[#11100f]/70"
                                : "text-white/45",
                            ].join(" ")}
                          >
                            {slot.staffName}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </>
            )}
          </section>
        )}
      </div>

      {/* RESUMEN DE RESERVA */}
      <aside className="min-w-0 lg:sticky lg:top-28">
        <div className="overflow-hidden rounded-2xl border border-[#d6b79a]/25 bg-[#171310]">
          <div className="p-6 sm:p-8">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#d6b79a]">
              Tu experiencia
            </p>

            <h2 className="mt-4 text-2xl font-light">
              Resumen de reserva
            </h2>

            <p className="mt-3 text-xs leading-6 text-white/40">
              Revisa los detalles de tu próxima visita.
            </p>

            {selectedService?.image_url && (
              <div
                role="img"
                aria-label={`Fotografía de ${selectedService.name}`}
                className="mt-6 aspect-[16/9] rounded-xl bg-[#24201d] bg-cover bg-center"
                style={{
                  backgroundImage: `url("${selectedService.image_url}")`,
                }}
              />
            )}

            <div className="mt-7 space-y-5 border-t border-white/10 pt-6">
              <div>
                <p className="text-xs text-white/40">
                  Servicio
                </p>

                <p className="mt-2 text-sm">
                  {selectedService?.name ??
                    "Por seleccionar"}
                </p>
              </div>

              <div>
                <p className="text-xs text-white/40">
                  Duración
                </p>

                <p className="mt-2 text-sm">
                  {selectedService
                    ? `${selectedService.duration_minutes} minutos`
                    : "Por seleccionar"}
                </p>
              </div>

              <div>
                <p className="text-xs text-white/40">
                  Precio
                </p>

                <p
                  className="mt-2 text-lg font-light"
                  style={{ color: GOLD }}
                >
                  {selectedService
                    ? formatPrice(
                        selectedService.price
                      )
                    : "Por seleccionar"}
                </p>
              </div>

              <div>
                <p className="text-xs text-white/40">
                  Fecha
                </p>

                <p className="mt-2 text-sm capitalize">
                  {date
                    ? formatDate(date)
                    : "Por seleccionar"}
                </p>
              </div>

              <div>
                <p className="text-xs text-white/40">
                  Profesional
                </p>

                <p className="mt-2 text-sm">
                  {selectedSlot?.staffName ??
                    "Por seleccionar"}
                </p>
              </div>

              <div>
                <p className="text-xs text-white/40">
                  Hora
                </p>

                <p className="mt-2 text-sm">
                  {selectedSlot
                    ? formatTime(
                        selectedSlot.startsAt
                      )
                    : "Por seleccionar"}
                </p>
              </div>
            </div>

            {!appointmentId && (
              <>
                <button
                  type="button"
                  disabled={
                    !selectedService ||
                    !selectedSlot ||
                    loading ||
                    submitting
                  }
                  onClick={continueToForm}
                  className="mt-8 flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-[#d6b79a] px-5 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#11100f] transition hover:bg-[#e5c9ad] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Continuar
                  <ArrowRight size={16} />
                </button>

                <p className="mt-4 text-center text-xs leading-6 text-white/40">
                  El horario se reserva únicamente cuando
                  se registra la solicitud.
                </p>
              </>
            )}
          </div>
        </div>
      </aside>

      {/* FORMULARIO DEL CLIENTE */}
      {showCustomerForm &&
        selectedSlot &&
        !appointmentId && (
          <form
            ref={customerFormRef}
            id="booking-customer-form"
            onSubmit={handleBookingSubmit}
            className="scroll-mt-28 rounded-2xl border border-[#d6b79a]/25 bg-[#171310] p-6 sm:p-10 lg:col-span-2"
          >
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#d6b79a]">
              Último paso
            </p>

            <h2 className="mt-4 text-3xl font-light tracking-tight">
              Tus datos de contacto.
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-white/50">
              Completa tus datos para solicitar la cita.
              El salón deberá confirmarla.
            </p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="customer-name"
                  className="mb-2 block text-sm"
                >
                  Nombre completo
                </label>

                <input
                  id="customer-name"
                  type="text"
                  autoComplete="name"
                  required
                  minLength={2}
                  maxLength={120}
                  value={customerName}
                  onChange={(event) =>
                    setCustomerName(
                      event.target.value
                    )
                  }
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
                  required
                  minLength={6}
                  maxLength={30}
                  value={customerPhone}
                  onChange={(event) =>
                    setCustomerPhone(
                      event.target.value
                    )
                  }
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
                  maxLength={1000}
                  value={customerNotes}
                  onChange={(event) =>
                    setCustomerNotes(
                      event.target.value
                    )
                  }
                  placeholder="¿Hay algo que debamos saber?"
                  className={`${inputClass} resize-y`}
                />
              </div>
            </div>

            {submitError && (
              <p
                role="alert"
                className="mt-5 rounded-xl border border-red-400/20 bg-red-400/5 p-4 text-sm text-red-300"
              >
                {submitError}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="mt-8 flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-[#d6b79a] px-6 py-4 text-sm font-medium text-[#11100f] transition hover:bg-[#e5c9ad] disabled:cursor-wait disabled:opacity-50 sm:w-auto"
            >
              {submitting && (
                <Loader2
                  size={17}
                  className="animate-spin"
                />
              )}

              {submitting
                ? "Enviando solicitud..."
                : "Enviar solicitud de cita"}
            </button>

            <p className="mt-4 text-xs text-white/40">
              Enviar la solicitud no confirma
              automáticamente la cita.
            </p>
          </form>
        )}

      {/* CONFIRMACIÓN */}
      {appointmentId && (
        <section
          role="status"
          className="rounded-2xl border border-[#d6b79a]/30 bg-[#d6b79a]/10 p-8 text-center sm:p-12 lg:col-span-2"
        >
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#d6b79a]/40 bg-[#d6b79a]/10">
            <CheckCircle2
              size={42}
              className="text-[#d6b79a]"
            />
          </div>

          <p className="mt-6 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#d6b79a]">
            <Sparkles size={14} />
            Élite Beauty Studio
          </p>

          <h2 className="mt-5 text-3xl font-light text-[#d6b79a]">
            Solicitud registrada
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-white/70">
            Tu solicitud se ha guardado y está
            pendiente de confirmación por el salón.
          </p>

          <div className="mx-auto mt-7 max-w-md rounded-xl border border-white/10 bg-[#171310] p-5 text-left">
            <p className="text-sm font-medium">
              {selectedService?.name}
            </p>

            <p className="mt-2 text-xs capitalize text-white/60">
              {date ? formatDate(date) : ""}
              {" · "}
              {selectedSlot
                ? formatTime(
                    selectedSlot.startsAt
                  )
                : ""}
            </p>

            <p className="mt-2 text-xs text-white/60">
              {selectedSlot?.staffName}
            </p>
          </div>

          <p className="mt-5 break-all text-xs text-white/40">
            Referencia: {appointmentId}
          </p>

          <p className="mt-3 text-xs text-white/50">
            Esta solicitud no es una confirmación
            definitiva de la cita.
          </p>
        </section>
      )}
    </div>
  );
}
