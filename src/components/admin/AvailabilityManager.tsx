
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  CalendarOff,
  Plus,
  Trash2,
  Loader2,
  Building2,
} from "lucide-react";
import {
  addStaffTimeOff,
  removeStaffTimeOff,
  addSalonClosure,
  removeSalonClosure,
} from "@/app/admin/(dashboard)/availability/actions";

type StaffMember = {
  id: string;
  name: string;
  active: boolean;
};

type TimeOff = {
  id: string;
  staff_id: string;
  starts_at: string;
  ends_at: string;
  reason: string | null;
};

type Closure = {
  id: string;
  starts_at: string;
  ends_at: string;
  reason: string | null;
};

type Props = {
  staff: StaffMember[];
  timeOff: TimeOff[];
  closures: Closure[];
};

function formatPeriod(value: string) {
  return new Date(value).toLocaleString("es", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function AvailabilityManager({
  staff,
  timeOff,
  closures,
}: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const [staffId, setStaffId] = useState(staff[0]?.id ?? "");
  const [absenceStart, setAbsenceStart] = useState("");
  const [absenceEnd, setAbsenceEnd] = useState("");
  const [absenceReason, setAbsenceReason] = useState("");

  const [closureStart, setClosureStart] = useState("");
  const [closureEnd, setClosureEnd] = useState("");
  const [closureReason, setClosureReason] = useState("");

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  function handleAbsence(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending || !staffId) return;

    setError("");
    setMessage("");

    startTransition(async () => {
      try {
        await addStaffTimeOff({
          staffId,
          startsAt: new Date(absenceStart).toISOString(),
          endsAt: new Date(absenceEnd).toISOString(),
          reason: absenceReason,
        });

        setAbsenceStart("");
        setAbsenceEnd("");
        setAbsenceReason("");
        setMessage("Ausencia registrada correctamente.");
        router.refresh();
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "No se pudo registrar la ausencia."
        );
      }
    });
  }

  function handleClosure(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;

    setError("");
    setMessage("");

    startTransition(async () => {
      try {
        await addSalonClosure({
          startsAt: new Date(closureStart).toISOString(),
          endsAt: new Date(closureEnd).toISOString(),
          reason: closureReason,
        });

        setClosureStart("");
        setClosureEnd("");
        setClosureReason("");
        setMessage("Cierre registrado correctamente.");
        router.refresh();
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "No se pudo registrar el cierre."
        );
      }
    });
  }

  function handleRemoveAbsence(id: string) {
    if (pending) return;

    setError("");
    setMessage("");

    startTransition(async () => {
      try {
        await removeStaffTimeOff(id);
        setMessage("Ausencia eliminada.");
        router.refresh();
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "No se pudo eliminar la ausencia."
        );
      }
    });
  }

  function handleRemoveClosure(id: string) {
    if (pending) return;

    setError("");
    setMessage("");

    startTransition(async () => {
      try {
        await removeSalonClosure(id);
        setMessage("Cierre eliminado.");
        router.refresh();
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "No se pudo eliminar el cierre."
        );
      }
    });
  }

  const inputClass =
    "min-h-12 w-full border border-white/20 bg-[#11100f] px-3 text-white outline-none focus:border-[#d6b79a]";

  return (
    <div className="space-y-10 py-10">
      {error && (
        <p role="alert" className="text-sm text-red-300">
          {error}
        </p>
      )}

      {message && (
        <p role="status" className="text-sm text-[#d6b79a]">
          {message}
        </p>
      )}

      <section className="border border-white/10 bg-[#171310] p-6 sm:p-9">
        <div className="flex items-center gap-3 text-[#d6b79a]">
          <CalendarOff size={19} />
          <span className="text-[10px] uppercase tracking-[0.2em]">
            Equipo
          </span>
        </div>

        <h2 className="mt-5 text-2xl font-light">
          Ausencias individuales
        </h2>

        <p className="mt-3 text-sm leading-7 text-white/50">
          Registra vacaciones, permisos y días libres de cada profesional.
        </p>

        {staff.length === 0 ? (
          <p className="mt-8 text-sm text-white/50">
            Primero debes registrar una profesional.
          </p>
        ) : (
          <form
            onSubmit={handleAbsence}
            className="mt-8 grid gap-4 sm:grid-cols-2"
          >
            <div className="sm:col-span-2">
              <label
                htmlFor="absence-staff"
                className="mb-2 block text-xs text-white/60"
              >
                Profesional
              </label>

              <select
                id="absence-staff"
                value={staffId}
                onChange={(event) => setStaffId(event.target.value)}
                className={inputClass}
              >
                {staff.map((person) => (
                  <option key={person.id} value={person.id}>
                    {person.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="absence-start"
                className="mb-2 block text-xs text-white/60"
              >
                Desde
              </label>
              <input
                id="absence-start"
                type="datetime-local"
                required
                value={absenceStart}
                onChange={(event) =>
                  setAbsenceStart(event.target.value)
                }
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="absence-end"
                className="mb-2 block text-xs text-white/60"
              >
                Hasta
              </label>
              <input
                id="absence-end"
                type="datetime-local"
                required
                value={absenceEnd}
                onChange={(event) =>
                  setAbsenceEnd(event.target.value)
                }
                className={inputClass}
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="absence-reason"
                className="mb-2 block text-xs text-white/60"
              >
                Motivo (opcional)
              </label>
              <input
                id="absence-reason"
                maxLength={500}
                value={absenceReason}
                onChange={(event) =>
                  setAbsenceReason(event.target.value)
                }
                className={inputClass}
                placeholder="Vacaciones, permiso..."
              />
            </div>

            <button
              type="submit"
              disabled={pending}
              className="flex min-h-12 items-center justify-center gap-2 bg-[#d6b79a] px-5 text-xs font-semibold uppercase tracking-[0.12em] text-[#11100f] disabled:opacity-50 sm:col-span-2 sm:justify-self-start"
            >
              {pending ? (
                <Loader2 size={17} className="animate-spin" />
              ) : (
                <Plus size={17} />
              )}
              Registrar ausencia
            </button>
          </form>
        )}

        <div className="mt-10 space-y-3 border-t border-white/10 pt-8">
          <h3 className="mb-5 text-xs uppercase tracking-[0.2em] text-[#d6b79a]">
            Ausencias registradas
          </h3>

          {timeOff.length === 0 ? (
            <p className="text-sm text-white/50">
              No hay ausencias registradas.
            </p>
          ) : (
            timeOff.map((item) => (
              <div
                key={item.id}
                className="flex flex-wrap items-center justify-between gap-4 border border-white/10 bg-[#11100f] p-4"
              >
                <div>
                  <p className="text-sm text-white">
                    {staff.find((person) => person.id === item.staff_id)
                      ?.name ?? "Profesional"}
                  </p>
                  <p className="mt-2 text-xs leading-6 text-white/50">
                    {formatPeriod(item.starts_at)} —{" "}
                    {formatPeriod(item.ends_at)}
                  </p>
                  {item.reason && (
                    <p className="mt-2 text-xs text-white/40">
                      {item.reason}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveAbsence(item.id)}
                  disabled={pending}
                  aria-label="Eliminar ausencia"
                  className="flex min-h-11 items-center gap-2 border border-white/20 px-4 text-xs text-white/70 disabled:opacity-50"
                >
                  <Trash2 size={15} />
                  Eliminar
                </button>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="border border-white/10 bg-[#171310] p-6 sm:p-9">
        <div className="flex items-center gap-3 text-[#d6b79a]">
          <Building2 size={19} />
          <span className="text-[10px] uppercase tracking-[0.2em]">
            Establecimiento
          </span>
        </div>

        <h2 className="mt-5 text-2xl font-light">
          Cierres del salón
        </h2>

        <p className="mt-3 text-sm leading-7 text-white/50">
          Bloquea períodos completos para todas las profesionales.
        </p>

        <form
          onSubmit={handleClosure}
          className="mt-8 grid gap-4 sm:grid-cols-2"
        >
          <div>
            <label
              htmlFor="closure-start"
              className="mb-2 block text-xs text-white/60"
            >
              Desde
            </label>
            <input
              id="closure-start"
              type="datetime-local"
              required
              value={closureStart}
              onChange={(event) =>
                setClosureStart(event.target.value)
              }
              className={inputClass}
            />
          </div>

          <div>
            <label
              htmlFor="closure-end"
              className="mb-2 block text-xs text-white/60"
            >
              Hasta
            </label>
            <input
              id="closure-end"
              type="datetime-local"
              required
              value={closureEnd}
              onChange={(event) =>
                setClosureEnd(event.target.value)
              }
              className={inputClass}
            />
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="closure-reason"
              className="mb-2 block text-xs text-white/60"
            >
              Motivo (opcional)
            </label>
            <input
              id="closure-reason"
              maxLength={500}
              value={closureReason}
              onChange={(event) =>
                setClosureReason(event.target.value)
              }
              className={inputClass}
              placeholder="Festivo, mantenimiento..."
            />
          </div>

          <button
            type="submit"
            disabled={pending}
            className="flex min-h-12 items-center justify-center gap-2 bg-[#d6b79a] px-5 text-xs font-semibold uppercase tracking-[0.12em] text-[#11100f] disabled:opacity-50 sm:col-span-2 sm:justify-self-start"
          >
            {pending ? (
              <Loader2 size={17} className="animate-spin" />
            ) : (
              <Plus size={17} />
            )}
            Registrar cierre
          </button>
        </form>

        <div className="mt-10 space-y-3 border-t border-white/10 pt-8">
          <h3 className="mb-5 text-xs uppercase tracking-[0.2em] text-[#d6b79a]">
            Cierres registrados
          </h3>

          {closures.length === 0 ? (
            <p className="text-sm text-white/50">
              No hay cierres registrados.
            </p>
          ) : (
            closures.map((item) => (
              <div
                key={item.id}
                className="flex flex-wrap items-center justify-between gap-4 border border-white/10 bg-[#11100f] p-4"
              >
                <div>
                  <p className="text-sm text-white">
                    {item.reason || "Cierre del salón"}
                  </p>
                  <p className="mt-2 text-xs leading-6 text-white/50">
                    {formatPeriod(item.starts_at)} —{" "}
                    {formatPeriod(item.ends_at)}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveClosure(item.id)}
                  disabled={pending}
                  aria-label="Eliminar cierre"
                  className="flex min-h-11 items-center gap-2 border border-white/20 px-4 text-xs text-white/70 disabled:opacity-50"
                >
                  <Trash2 size={15} />
                  Eliminar
                </button>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
