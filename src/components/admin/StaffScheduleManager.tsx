
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Clock3,
  Plus,
  Trash2,
  Loader2,
} from "lucide-react";
import {
  addStaffSchedule,
  removeStaffSchedule,
} from "@/app/admin/(dashboard)/staff/schedule-actions";

type StaffMember = {
  id: string;
  name: string;
  active: boolean;
};

type Schedule = {
  id: string;
  staff_id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
};

type Props = {
  staff: StaffMember[];
  schedules: Schedule[];
};

const DAYS = [
  { value: 1, label: "Lunes" },
  { value: 2, label: "Martes" },
  { value: 3, label: "Miércoles" },
  { value: 4, label: "Jueves" },
  { value: 5, label: "Viernes" },
  { value: 6, label: "Sábado" },
  { value: 7, label: "Domingo" },
];

export default function StaffScheduleManager({
  staff,
  schedules,
}: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const [staffId, setStaffId] = useState(staff[0]?.id ?? "");
  const [dayOfWeek, setDayOfWeek] = useState(1);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const selectedSchedules = schedules
    .filter((item) => item.staff_id === staffId)
    .sort(
      (a, b) =>
        a.day_of_week - b.day_of_week ||
        a.start_time.localeCompare(b.start_time)
    );

  function addSchedule(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!staffId || pending) return;

    setError("");
    setMessage("");

    startTransition(async () => {
      try {
        await addStaffSchedule({
          staffId,
          dayOfWeek,
          startTime,
          endTime,
        });

        setMessage("Horario agregado correctamente.");
        router.refresh();
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "No se pudo agregar el horario."
        );
      }
    });
  }

  function removeSchedule(scheduleId: string) {
    if (pending) return;

    setError("");
    setMessage("");

    startTransition(async () => {
      try {
        await removeStaffSchedule(scheduleId);
        setMessage("Horario eliminado correctamente.");
        router.refresh();
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "No se pudo eliminar el horario."
        );
      }
    });
  }

  if (staff.length === 0) {
    return (
      <div className="border border-white/10 bg-[#171310] p-7 text-sm text-white/50">
        Agrega una profesional antes de configurar horarios.
      </div>
    );
  }

  return (
    <section className="border border-white/10 bg-[#171310] p-6 sm:p-9">
      <div className="flex items-center gap-3 text-[#d6b79a]">
        <Clock3 size={19} />
        <span className="text-[10px] uppercase tracking-[0.2em]">
          Disponibilidad semanal
        </span>
      </div>

      <h3 className="mt-5 text-2xl font-light">
        Horarios de trabajo
      </h3>

      <p className="mt-3 max-w-xl text-sm leading-7 text-white/50">
        Configura los días y turnos de cada profesional.
        Puedes agregar varios turnos en un mismo día.
      </p>

      <div className="mt-8">
        <label
          htmlFor="schedule-staff"
          className="mb-3 block text-xs uppercase tracking-[0.15em] text-white/60"
        >
          Profesional
        </label>

        <select
          id="schedule-staff"
          value={staffId}
          disabled={pending}
          onChange={(event) => {
            setStaffId(event.target.value);
            setError("");
            setMessage("");
          }}
          className="w-full border border-white/20 bg-[#11100f] px-4 py-4 text-white outline-none focus:border-[#d6b79a]"
        >
          {staff.map((person) => (
            <option key={person.id} value={person.id}>
              {person.name}
              {!person.active ? " (inactiva)" : ""}
            </option>
          ))}
        </select>
      </div>

      <form
        onSubmit={addSchedule}
        className="mt-8 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-4 sm:items-end"
      >
        <div>
          <label
            htmlFor="schedule-day"
            className="mb-3 block text-xs text-white/60"
          >
            Día
          </label>

          <select
            id="schedule-day"
            value={dayOfWeek}
            onChange={(event) =>
              setDayOfWeek(Number(event.target.value))
            }
            className="min-h-12 w-full border border-white/20 bg-[#11100f] px-3 text-white"
          >
            {DAYS.map((day) => (
              <option key={day.value} value={day.value}>
                {day.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="schedule-start"
            className="mb-3 block text-xs text-white/60"
          >
            Desde
          </label>

          <input
            id="schedule-start"
            type="time"
            required
            value={startTime}
            onChange={(event) => setStartTime(event.target.value)}
            className="min-h-12 w-full border border-white/20 bg-[#11100f] px-3 text-white"
          />
        </div>

        <div>
          <label
            htmlFor="schedule-end"
            className="mb-3 block text-xs text-white/60"
          >
            Hasta
          </label>

          <input
            id="schedule-end"
            type="time"
            required
            value={endTime}
            onChange={(event) => setEndTime(event.target.value)}
            className="min-h-12 w-full border border-white/20 bg-[#11100f] px-3 text-white"
          />
        </div>

        <button
          type="submit"
          disabled={pending}
          className="flex min-h-12 items-center justify-center gap-2 bg-[#d6b79a] px-4 text-xs font-semibold uppercase tracking-[0.1em] text-[#11100f] disabled:opacity-50"
        >
          {pending ? (
            <Loader2 size={17} className="animate-spin" />
          ) : (
            <Plus size={17} />
          )}
          Agregar
        </button>
      </form>

      <div className="mt-10 space-y-3">
        <h4 className="mb-5 text-xs uppercase tracking-[0.2em] text-[#d6b79a]">
          Turnos configurados
        </h4>

        {selectedSchedules.length === 0 ? (
          <p className="text-sm text-white/50">
            Esta profesional todavía no tiene horarios.
          </p>
        ) : (
          selectedSchedules.map((schedule) => (
            <div
              key={schedule.id}
              className="flex flex-wrap items-center justify-between gap-4 border border-white/10 bg-[#11100f] p-4"
            >
              <div>
                <p className="text-sm text-white">
                  {DAYS.find(
                    (day) => day.value === schedule.day_of_week
                  )?.label}
                </p>

                <p className="mt-2 text-sm text-white/50">
                  {schedule.start_time.slice(0, 5)} –{" "}
                  {schedule.end_time.slice(0, 5)}
                </p>
              </div>

              <button
                type="button"
                onClick={() => removeSchedule(schedule.id)}
                disabled={pending}
                aria-label="Eliminar turno"
                className="flex min-h-11 items-center gap-2 border border-white/20 px-4 text-xs text-white/70 transition hover:border-red-300/60 disabled:opacity-50"
              >
                <Trash2 size={15} />
                Eliminar
              </button>
            </div>
          ))
        )}
      </div>

      {error && (
        <p role="alert" className="mt-6 text-sm text-red-300">
          {error}
        </p>
      )}

      {message && (
        <p role="status" className="mt-6 text-sm text-[#d6b79a]">
          {message}
        </p>
      )}
    </section>
  );
}
