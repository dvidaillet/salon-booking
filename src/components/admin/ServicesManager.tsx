
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  Pencil,
  Scissors,
  X,
  Loader2,
  Clock3,
  Star,
} from "lucide-react";
import {
  saveService,
  setServiceActive,
} from "@/app/admin/(dashboard)/services/actions";

type ServiceRecord = {
  id: string;
  name: string;
  description: string | null;
  long_description: string | null;
  price: number | null;
  duration_minutes: number;
  category: string | null;
  image_url: string | null;
  featured: boolean;
  active: boolean;
};

type Props = {
  initialServices: ServiceRecord[];
};

export default function ServicesManager({
  initialServices,
}: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const [editing, setEditing] = useState<ServiceRecord | null>(null);
  const [formOpen, setFormOpen] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("60");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [featured, setFeatured] = useState(false);
  const [active, setActive] = useState(true);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const activeCount = initialServices.filter(
    (service) => service.active
  ).length;

  function openCreate() {
    setEditing(null);
    setName("");
    setDescription("");
    setLongDescription("");
    setPrice("");
    setDuration("60");
    setCategory("");
    setImageUrl("");
    setFeatured(false);
    setActive(true);
    setError("");
    setMessage("");
    setFormOpen(true);
  }

  function openEdit(service: ServiceRecord) {
    setEditing(service);
    setName(service.name);
    setDescription(service.description ?? "");
    setLongDescription(service.long_description ?? "");
    setPrice(
      service.price === null ? "" : String(service.price)
    );
    setDuration(String(service.duration_minutes));
    setCategory(service.category ?? "");
    setImageUrl(service.image_url ?? "");
    setFeatured(service.featured);
    setActive(service.active);
    setError("");
    setMessage("");
    setFormOpen(true);
  }

  function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;

    setError("");
    setMessage("");

    startTransition(async () => {
      try {
        await saveService({
          id: editing?.id,
          name,
          description,
          longDescription,
          price,
          durationMinutes: Number(duration),
          category,
          imageUrl,
          featured,
          active,
        });

        setFormOpen(false);
        setMessage(
          editing
            ? "Servicio actualizado correctamente."
            : "Servicio creado correctamente."
        );
        setEditing(null);
        router.refresh();
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "No se pudo guardar el servicio."
        );
      }
    });
  }

  function handleToggle(service: ServiceRecord) {
    if (pending) return;

    setError("");
    setMessage("");

    startTransition(async () => {
      try {
        await setServiceActive(service.id, !service.active);

        setMessage(
          service.active
            ? "Servicio desactivado."
            : "Servicio activado."
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

  const fieldClass =
    "w-full border border-white/20 bg-[#11100f] px-4 py-4 text-white outline-none transition focus:border-[#d6b79a]";

  const labelClass =
    "mb-3 block text-xs uppercase tracking-[0.15em] text-white/60";

  return (
    <section className="py-10">
      <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#d6b79a]">
            Catálogo del salón
          </p>
          <p className="mt-3 text-sm text-white/50">
            {initialServices.length} servicios · {activeCount} activos
          </p>
        </div>

        <button
          type="button"
          onClick={openCreate}
          disabled={pending}
          className="inline-flex min-h-12 items-center justify-center gap-3 bg-[#d6b79a] px-6 text-xs font-semibold uppercase tracking-[0.15em] text-[#11100f] transition hover:bg-[#ead0b6] disabled:opacity-50"
        >
          <Plus size={17} />
          Agregar servicio
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

      {initialServices.length === 0 ? (
        <div className="flex flex-col items-center border border-white/10 bg-[#171310] px-6 py-20 text-center">
          <Scissors size={34} className="text-[#d6b79a]" />
          <h2 className="mt-6 text-2xl font-light">
            Todavía no hay servicios.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-7 text-white/50">
            Agrega el primer servicio para comenzar a configurar
            el catálogo del salón.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {initialServices.map((service) => (
            <article
              key={service.id}
              className="flex flex-col border border-white/10 bg-[#171310] p-6"
            >
              {service.image_url ? (
                <div
                  role="img"
                  aria-label={`Imagen de ${service.name}`}
                  className="aspect-[4/3] w-full bg-[#24201d] bg-cover bg-center"
                  style={{
                    backgroundImage: `url("${service.image_url}")`,
                  }}
                />
              ) : (
                <div className="flex aspect-[4/3] items-center justify-center bg-[#24201d]">
                  <Scissors
                    size={32}
                    strokeWidth={1.2}
                    className="text-[#d6b79a]"
                  />
                </div>
              )}

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="text-[10px] uppercase tracking-[0.15em] text-[#d6b79a]">
                  {service.category || "Sin categoría"}
                </span>

                {service.featured && (
                  <Star size={14} className="text-[#d6b79a]" />
                )}

                <span className="ml-auto text-[10px] uppercase tracking-[0.15em] text-white/45">
                  {service.active ? "Activo" : "Inactivo"}
                </span>
              </div>

              <h3 className="mt-5 text-2xl font-light">
                {service.name}
              </h3>

              <p className="mt-3 min-h-14 text-sm leading-7 text-white/50">
                {service.description || "Sin descripción."}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-white/65">
                <span className="inline-flex items-center gap-2">
                  <Clock3 size={15} />
                  {service.duration_minutes} min
                </span>

                {service.price !== null && (
                  <span>
                    Precio: {service.price.toFixed(2)}
                  </span>
                )}
              </div>

              <div className="mt-7 flex flex-wrap gap-3 border-t border-white/10 pt-5">
                <button
                  type="button"
                  onClick={() => openEdit(service)}
                  disabled={pending}
                  className="inline-flex min-h-11 items-center gap-2 border border-white/20 px-4 text-xs transition hover:border-[#d6b79a] disabled:opacity-50"
                >
                  <Pencil size={14} />
                  Editar
                </button>

                <button
                  type="button"
                  onClick={() => handleToggle(service)}
                  disabled={pending}
                  className="min-h-11 border border-white/20 px-4 text-xs text-white/70 transition hover:border-[#d6b79a] disabled:opacity-50"
                >
                  {service.active ? "Desactivar" : "Activar"}
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
              {editing ? "Editar servicio" : "Nuevo servicio"}
            </h2>

            <button
              type="button"
              onClick={() => {
                if (!pending) {
                  setFormOpen(false);
                  setError("");
                }
              }}
              disabled={pending}
              aria-label="Cerrar formulario"
              className="p-2 text-white/60 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSave} className="mt-8 space-y-6">
            <div>
              <label htmlFor="service-name" className={labelClass}>
                Nombre del servicio
              </label>
              <input
                id="service-name"
                required
                maxLength={120}
                value={name}
                onChange={(event) => setName(event.target.value)}
                className={fieldClass}
              />
            </div>

            <div>
              <label htmlFor="service-description" className={labelClass}>
                Descripción corta
              </label>
              <textarea
                id="service-description"
                rows={2}
                maxLength={500}
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                className={fieldClass}
              />
            </div>

            <div>
              <label htmlFor="service-long-description" className={labelClass}>
                Descripción extensa
              </label>
              <textarea
                id="service-long-description"
                rows={4}
                maxLength={2000}
                value={longDescription}
                onChange={(event) => setLongDescription(event.target.value)}
                className={fieldClass}
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="service-duration" className={labelClass}>
                  Duración (minutos)
                </label>
                <input
                  id="service-duration"
                  type="number"
                  min={5}
                  max={480}
                  step={1}
                  required
                  value={duration}
                  onChange={(event) => setDuration(event.target.value)}
                  className={fieldClass}
                />
              </div>

              <div>
                <label htmlFor="service-price" className={labelClass}>
                  Precio (opcional)
                </label>
                <input
                  id="service-price"
                  type="number"
                  min={0}
                  step="0.01"
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                  className={fieldClass}
                  placeholder="Sin definir"
                />
              </div>
            </div>

            <div>
              <label htmlFor="service-category" className={labelClass}>
                Categoría
              </label>
              <input
                id="service-category"
                maxLength={80}
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className={fieldClass}
                placeholder="Cabello, Uñas, Tratamientos..."
              />
            </div>

            <div>
              <label htmlFor="service-image" className={labelClass}>
                URL de la fotografía
              </label>
              <input
                id="service-image"
                type="url"
                value={imageUrl}
                onChange={(event) => setImageUrl(event.target.value)}
                className={fieldClass}
                placeholder="https://..."
              />
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
              <label className="flex min-h-11 items-center gap-3 text-sm text-white/75">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(event) => setFeatured(event.target.checked)}
                  className="h-4 w-4 accent-[#d6b79a]"
                />
                Servicio destacado
              </label>

              <label className="flex min-h-11 items-center gap-3 text-sm text-white/75">
                <input
                  type="checkbox"
                  checked={active}
                  onChange={(event) => setActive(event.target.checked)}
                  className="h-4 w-4 accent-[#d6b79a]"
                />
                Servicio activo
              </label>
            </div>

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
              {editing ? "Guardar cambios" : "Crear servicio"}
            </button>
          </form>
        </div>
      )}
    </section>
  );
}
