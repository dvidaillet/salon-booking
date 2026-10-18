
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  Pencil,
  Users,
  UserRound,
  X,
  Loader2,
} from "lucide-react";
import {
  saveStaff,
  setStaffActive,
} from "@/app/admin/(dashboard)/staff/actions";

type Staff = {
  id: string;
  name: string;
  bio: string | null;
  active: boolean;
};

type StaffManagerProps = {
  initialStaff: Staff[];
};

export default function StaffManager({
  initialStaff,
}: StaffManagerProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const [editing, setEditing] = useState<Staff | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [active, setActive] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const activeCount = initialStaff.filter(
    (person) => person.active
  ).length;

  function openCreate() {
    setEditing(null);
    setName("");
    setBio("");
    setActive(true);
    setError("");
    setMessage("");
    setFormOpen(true);
  }

  function openEdit(person: Staff) {
    setEditing(person);
    setName(person.name);
    setBio(person.bio ?? "");
    setActive(person.active);
    setError("");
    setMessage("");
    setFormOpen(true);
  }

  function closeForm() {
    if (pending) return;
    setFormOpen(false);
    setEditing(null);
    setError("");
  }

  function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;

    setError("");
    setMessage("");

    startTransition(async () => {
      try {
        await saveStaff({
          id: editing?.id,
          name,
          bio,
          active,
        });

        setFormOpen(false);
        setEditing(null);
        setMessage(
          editing
            ? "Profesional actualizada correctamente."
            : "Profesional agregada correctamente."
        );
        router.refresh();
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Ha ocurrido un error."
        );
      }
    });
  }

  function handleToggle(person: Staff) {
    if (pending) return;

    setError("");
    setMessage("");

    startTransition(async () => {
      try {
        await setStaffActive(person.id, !person.active);
        setMessage(
          person.active
            ? "Profesional desactivada."
            : "Profesional activada."
        );
        router.refresh();
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "No se pudo cambiar el estado."
        );
      }
    });
  }

  return (
    <section className="py-10">
      <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#d6b79a]">
            Equipo del salón
          </p>
          <p className="mt-3 text-sm text-white/50">
            {initialStaff.length} registradas · {activeCount} activas
          </p>
        </div>

        <button
          type="button"
          onClick={openCreate}
          disabled={pending}
          className="inline-flex min-h-12 items-center justify-center gap-3 bg-[#d6b79a] px-6 text-xs font-semibold uppercase tracking-[0.15em] text-[#11100f] transition hover:bg-[#ead0b6] disabled:opacity-50"
        >
          <Plus size={17} />
          Agregar profesional
        </button>
      </div>

      {message && (
        <p role="status" className="mb-6 text-sm text-[#d6b79a]">
          {message}
        </p>
      )}

      {error && !formOpen && (
        <p role="alert" className="mb-6 text-sm text-red-300">
          {error}
        </p>
      )}

      {initialStaff.length === 0 ? (
        <div className="flex flex-col items-center border border-white/10 bg-[#171310] px-6 py-20 text-center">
          <Users size={34} className="text-[#d6b79a]" />
          <h2 className="mt-6 text-2xl font-light">
            Todavía no hay profesionales.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-7 text-white/50">
            Agrega la primera profesional para comenzar a
            configurar el equipo del salón.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {initialStaff.map((person) => (
            <article
              key={person.id}
              className="flex min-h-64 flex-col border border-white/10 bg-[#171310] p-6 sm:p-7"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d6b79a]/30 text-[#d6b79a]">
                  <UserRound size={22} strokeWidth={1.4} />
                </div>

                <span
                  className={
                    person.active
                      ? "text-[10px] uppercase tracking-[0.15em] text-[#d6b79a]"
                      : "text-[10px] uppercase tracking-[0.15em] text-white/40"
                  }
                >
                  {person.active ? "Activa" : "Inactiva"}
                </span>
              </div>

              <h3 className="mt-8 text-2xl font-light tracking-tight">
                {person.name}
              </h3>

              <p className="mt-3 flex-1 text-sm leading-7 text-white/50">
                {person.bio || "Sin descripción."}
              </p>

              <div className="mt-8 flex flex-wrap gap-3 border-t border-white/10 pt-5">
                <button
                  type="button"
                  onClick={() => openEdit(person)}
                  disabled={pending}
                  className="inline-flex min-h-11 items-center gap-2 border border-white/20 px-4 text-xs text-white transition hover:border-[#d6b79a] disabled:opacity-50"
                >
                  <Pencil size={14} />
                  Editar
                </button>

                <button
                  type="button"
                  onClick={() => handleToggle(person)}
                  disabled={pending}
                  className="min-h-11 border border-white/20 px-4 text-xs text-white/70 transition hover:border-[#d6b79a] disabled:opacity-50"
                >
                  {person.active ? "Desactivar" : "Activar"}
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {formOpen && (
        <div className="mt-10 border border-[#d6b79a]/30 bg-[#1c1714] p-6 sm:p-9">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-light">
              {editing ? "Editar profesional" : "Nueva profesional"}
            </h2>

            <button
              type="button"
              onClick={closeForm}
              disabled={pending}
              aria-label="Cerrar formulario"
              className="p-2 text-white/60 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSave} className="mt-8 space-y-6">
            <div>
              <label
                htmlFor="staff-name"
                className="mb-3 block text-xs uppercase tracking-[0.15em] text-white/60"
              >
                Nombre de la profesional
              </label>

              <input
                id="staff-name"
                required
                minLength={2}
                maxLength={120}
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="w-full border border-white/20 bg-[#11100f] px-4 py-4 text-white outline-none focus:border-[#d6b79a]"
                placeholder="Nombre completo"
              />
            </div>

            <div>
              <label
                htmlFor="staff-bio"
                className="mb-3 block text-xs uppercase tracking-[0.15em] text-white/60"
              >
                Descripción (opcional)
              </label>

              <textarea
                id="staff-bio"
                rows={4}
                maxLength={1000}
                value={bio}
                onChange={(event) => setBio(event.target.value)}
                className="w-full resize-y border border-white/20 bg-[#11100f] px-4 py-4 text-white outline-none focus:border-[#d6b79a]"
                placeholder="Especialidad o presentación..."
              />
            </div>

            <label className="flex min-h-11 items-center gap-3 text-sm text-white/75">
              <input
                type="checkbox"
                checked={active}
                onChange={(event) => setActive(event.target.checked)}
                className="h-4 w-4 accent-[#d6b79a]"
              />
              Profesional activa
            </label>

            {error && (
              <p role="alert" className="text-sm text-red-300">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={pending}
              className="flex min-h-13 w-full items-center justify-center gap-3 bg-[#d6b79a] px-6 text-xs font-semibold uppercase tracking-[0.16em] text-[#11100f] transition hover:bg-[#ead0b6] disabled:opacity-50 sm:w-auto"
            >
              {pending && <Loader2 size={17} className="animate-spin" />}
              {editing ? "Guardar cambios" : "Crear profesional"}
            </button>
          </form>
        </div>
      )}
    </section>
  );
}
