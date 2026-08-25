"use client";

import { FormEvent, useState } from "react";
import { Service } from "@/types/service";
import WeekSelector from "./WeekSelector";
import TimeSlots from "./TimeSlots";
import BookingSummary from "./BookingSummary";

interface BookingFormProps {
  service?: Service;
}

export default function BookingForm({
  service,
}: BookingFormProps) {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!service || !selectedDate || !selectedTime) {
      return;
    }

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-3xl border border-neutral-200 bg-white p-8 text-center shadow-sm sm:p-12">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-neutral-950 text-2xl text-white">
          ✓
        </div>

        <h2 className="mt-6 text-2xl font-semibold">
          Solicitud recibida
        </h2>

        <p className="mx-auto mt-3 max-w-md leading-7 text-neutral-500">
          Hemos recibido tu solicitud de reserva. Cuando la cita
          sea confirmada recibirás una notificación por WhatsApp.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="space-y-8">
          {/* Servicio */}
          {service ? (
            <div className="rounded-2xl bg-neutral-950 p-6 text-white">
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                Servicio
              </p>

              <div className="mt-3 flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold">
                    {service.name}
                  </h2>

                  <p className="mt-1 text-sm text-white/50">
                    {service.duration} minutos
                  </p>
                </div>

                <span className="text-xl font-semibold">
                  {service.price} €
                </span>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800">
              Selecciona primero un servicio desde nuestro catálogo.
            </div>
          )}

          {/* Semana */}
          <WeekSelector
            selectedDate={selectedDate}
            onSelectDate={(date) => {
              setSelectedDate(date);
              setSelectedTime("");
            }}
          />

          {/* Horarios */}
          {selectedDate && (
            <TimeSlots
              selectedTime={selectedTime}
              onSelectTime={setSelectedTime}
            />
          )}

          {/* Datos */}
          {selectedTime && (
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium"
                >
                  Nombre
                </label>

                <input
                  id="name"
                  name="name"
                  required
                  placeholder="Tu nombre"
                  className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3.5 text-sm outline-none focus:border-neutral-950"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-medium"
                >
                  Teléfono / WhatsApp
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="+34 600 000 000"
                  className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3.5 text-sm outline-none focus:border-neutral-950"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium"
                >
                  Email
                  <span className="ml-2 text-neutral-400">
                    opcional
                  </span>
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="tu@email.com"
                  className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3.5 text-sm outline-none focus:border-neutral-950"
                />
              </div>

              <div>
                <label
                  htmlFor="notes"
                  className="mb-2 block text-sm font-medium"
                >
                  Notas
                  <span className="ml-2 text-neutral-400">
                    opcional
                  </span>
                </label>

                <textarea
                  id="notes"
                  name="notes"
                  rows={4}
                  placeholder="¿Hay algo que debamos saber?"
                  className="w-full resize-none rounded-xl border border-neutral-200 bg-white px-4 py-3.5 text-sm outline-none focus:border-neutral-950"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-neutral-950 px-6 py-4 text-sm font-medium text-white transition hover:bg-neutral-800"
              >
                Solicitar reserva
              </button>
            </div>
          )}
        </div>

        {/* Resumen */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <BookingSummary
            service={service}
            date={selectedDate}
            time={selectedTime}
          />
        </div>
      </div>
    </form>
  );
}