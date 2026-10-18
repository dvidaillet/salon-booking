
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Check, Loader2, Scissors } from "lucide-react";
import { updateStaffServices } from "@/app/admin/(dashboard)/staff/service-actions";

type StaffMember = {
  id: string;
  name: string;
  active: boolean;
};

type ServiceItem = {
  id: string;
  name: string;
  duration_minutes: number;
  active: boolean;
};

type Assignment = {
  staff_id: string;
  service_id: string;
};

type Props = {
  staff: StaffMember[];
  services: ServiceItem[];
  assignments: Assignment[];
};

export default function StaffServicesManager({
  staff,
  services,
  assignments,
}: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const [selectedStaffId, setSelectedStaffId] = useState(
    staff[0]?.id ?? ""
  );

  const [selection, setSelection] = useState<Record<string, string[]>>(
    () => {
      const initial: Record<string, string[]> = {};

      for (const person of staff) {
        initial[person.id] = assignments
          .filter((item) => item.staff_id === person.id)
          .map((item) => item.service_id);
      }

      return initial;
    }
  );

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const selectedIds = selection[selectedStaffId] ?? [];

  function toggleService(serviceId: string) {
    setSelection((previous) => {
      const current = previous[selectedStaffId] ?? [];

      return {
        ...previous,
        [selectedStaffId]: current.includes(serviceId)
          ? current.filter((id) => id !== serviceId)
          : [...current, serviceId],
      };
    });

    setMessage("");
    setError("");
  }

  function save() {
    if (!selectedStaffId || pending) return;

    setError("");
    setMessage("");

    startTransition(async () => {
      try {
        await updateStaffServices(selectedStaffId, selectedIds);
        setMessage("Servicios asignados correctamente.");
        router.refresh();
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "No se pudieron guardar las asignaciones."
        );
      }
    });
  }

  if (staff.length === 0 || services.length === 0) {
    return (
      <div className="border border-white/10 bg-[#171310] p-7 text-sm leading-7 text-white/50">
        Para asignar servicios necesitas tener al menos una profesional
        y un servicio registrados.
      </div>
    );
  }

  return (
    <div className="border border-white/10 bg-[#171310] p-6 sm:p-9">
      <div className="flex items-center gap-3 text-[#d6b79a]">
        <Scissors size={19} />
        <span className="text-[10px] uppercase tracking-[0.2em]">
          Especialidades
        </span>
      </div>

      <h3 className="mt-5 text-2xl font-light">
        Asignación de servicios
      </h3>

      <p className="mt-3 max-w-xl text-sm leading-7 text-white/50">
        Selecciona una profesional y marca los servicios que puede realizar.
      </p>

      <div className="mt-8">
        <label
          htmlFor="staff-selector"
          className="mb-3 block text-xs uppercase tracking-[0.15em] text-white/60"
        >
          Profesional
        </label>

        <select
          id="staff-selector"
          value={selectedStaffId}
          disabled={pending}
          onChange={(event) => {
            setSelectedStaffId(event.target.value);
            setMessage("");
            setError("");
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

      <div className="mt-7 grid gap-3 sm:grid-cols-2">
        {services.map((service) => {
          const checked = selectedIds.includes(service.id);

          return (
            <label
              key={service.id}
              className={`flex cursor-pointer items-center justify-between gap-4 border p-4 transition ${
                checked
                  ? "border-[#d6b79a]/60 bg-[#d6b79a]/5"
                  : "border-white/10 bg-[#11100f]"
              }`}
            >
              <span className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={checked}
                  disabled={pending}
                  onChange={() => toggleService(service.id)}
                  className="h-4 w-4 accent-[#d6b79a]"
                />

                <span>
                  <span className="block text-sm text-white">
                    {service.name}
                  </span>
                  <span className="mt-1 block text-xs text-white/45">
                    {service.duration_minutes} min
                    {!service.active ? " · Inactivo" : ""}
                  </span>
                </span>
              </span>

              {checked && (
                <Check size={17} className="shrink-0 text-[#d6b79a]" />
              )}
            </label>
          );
        })}
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

      <button
        type="button"
        onClick={save}
        disabled={pending}
        className="mt-8 flex min-h-13 w-full items-center justify-center gap-3 bg-[#d6b79a] px-6 text-xs font-semibold uppercase tracking-[0.16em] text-[#11100f] transition hover:bg-[#ead0b6] disabled:opacity-50 sm:w-auto"
      >
        {pending && <Loader2 size={17} className="animate-spin" />}
        Guardar asignaciones
      </button>
    </div>
  );
}
