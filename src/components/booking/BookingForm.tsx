"use client";

import { FormEvent, useState } from "react";
import { Service } from "@/types/service";

interface BookingFormProps {
  service?: Service;
}

const availableTimes = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "16:00",
  "17:00",
  "18:00",
];

export default function BookingForm({
  service,
}: BookingFormProps) {
  const [selectedTime, setSelectedTime] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-3xl border border-neutral-200 bg-white p-8 text-center shadow-sm sm:p-12">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-neutral-950 text-2xl text-white">
          ✓
        </div>

        <h2 className="mt-6 text-2xl font-semibold text-neutral-950">
          Solicitud recibida
        </h2>

        <p className="mx-auto mt-3 max-w-md leading-7 text-neutral-500">
          Tu solicitud de reserva ha sido registrada. Te enviaremos
          una confirmación cuando la cita quede confirmada.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Servicio seleccionado */}
      {service && (
        <div className="rounded-2xl bg-neutral-950 p-6 text-white">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
            Servicio seleccionado
          </p>

          <div className="mt-3 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">
                {service.name}
              </h2>

              <p className="mt-1 text-sm text-neutral-400">
                {service.duration} minutos
              </p>
            </div>

            <span className="text-xl font-semibold">
              {service.price} €
            </span>
          </div>
        </div>
      )}

      {/* Fecha */}
      <div>
        <label
          htmlFor="date"
          className="mb-3 block text-sm font-medium text-neutral-900"
        >
          Fecha
        </label>

        <input
          id="date"
          name="date"
          type="date"
          required
          className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-neutral-950"
        />
      </div>

      {/* Horarios */}
      <div>
        <div className="mb-3">
          <p className="text-sm font-medium text-neutral-900">
            Horario
          </p>

          <p className="mt-1 text-sm text-neutral-500">
            Selecciona una hora disponible
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {availableTimes.map((time) => {
            const selected = selectedTime === time;

            return (
              <button
                key={time}
                type="button"
                onClick={() => setSelectedTime(time)}
                className={`rounded-xl border px-4 py-3 text-sm font-medium transition ${
                  selected
                    ? "border-neutral-950 bg-neutral-950 text-white"
                    : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-500"
                }`}
              >
                {time}
              </button>
            );
          })}
        </div>

        <input
          type="hidden"
          name="time"
          value={selectedTime}
        />
      </div>

      {/* Datos del cliente */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="mb-3 block text-sm font-medium text-neutral-900"
          >
            Nombre
          </label>

          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Tu nombre"
            className="w-full rounded-xl border border-neutral-200 px-4 py-3.5 text-sm outline-none transition focus:border-neutral-950"
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="mb-3 block text-sm font-medium text-neutral-900"
          >
            Teléfono
          </label>

          <input
            id="phone"
            name="phone"
            type="tel"
            required
            placeholder="+34 600 000 000"
            className="w-full rounded-xl border border-neutral-200 px-4 py-3.5 text-sm outline-none transition focus:border-neutral-950"
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="mb-3 block text-sm font-medium text-neutral-900"
        >
          Email
          <span className="ml-2 text-neutral-400">
            (opcional)
          </span>
        </label>

        <input
          id="email"
          name="email"
          type="email"
          placeholder="tu@email.com"
          className="w-full rounded-xl border border-neutral-200 px-4 py-3.5 text-sm outline-none transition focus:border-neutral-950"
        />
      </div>

      {/* Notas */}
      <div>
        <label
          htmlFor="notes"
          className="mb-3 block text-sm font-medium text-neutral-900"
        >
          Notas
          <span className="ml-2 text-neutral-400">
            (opcional)
          </span>
        </label>

        <textarea
          id="notes"
          name="notes"
          rows={4}
          placeholder="¿Hay algo que debamos saber?"
          className="w-full resize-none rounded-xl border border-neutral-200 px-4 py-3.5 text-sm outline-none transition focus:border-neutral-950"
        />
      </div>

      {/* Botón */}
      <button
        type="submit"
        disabled={!selectedTime}
        className="w-full rounded-full bg-neutral-950 px-6 py-4 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Confirmar solicitud
      </button>

      <p className="text-center text-xs leading-5 text-neutral-400">
        Al confirmar, aceptas que el salón utilice tus datos para
        gestionar tu reserva y enviarte información relacionada con
        la cita.
      </p>
    </form>
  );
}