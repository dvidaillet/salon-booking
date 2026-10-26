"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Scissors, X, Loader2, Clock3, Star, ImagePlus } from "lucide-react";
import { saveService, setServiceActive } from "@/app/admin/(dashboard)/services/actions";
import { uploadServiceImage } from "@/app/admin/(dashboard)/services/upload-service-image";

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

type Props = { initialServices: ServiceRecord[] };

const fieldClass = "w-full border border-white/20 bg-[#11100f] px-4 py-4 text-white outline-none transition focus:border-[#d6b79a]";
const labelClass = "mb-3 block text-xs uppercase tracking-[0.15em] text-white/60";

export default function ServicesManager({ initialServices }: Props) {
  const router = useRouter();
  const formRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const [pending, startTransition] = useTransition();
  const [editing, setEditing] = useState<ServiceRecord | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("60");
  const [category, setCategory] = useState("");
  // Internal value only: keeps the existing photo when editing without uploading a new one.
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [fileInputKey, setFileInputKey] = useState(0);
  const previewUrlRef = useRef<string | null>(null);
  const [featured, setFeatured] = useState(false);
  const [active, setActive] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    };
  }, []);

  useEffect(() => {
    if (!formOpen) return;
    const frame = requestAnimationFrame(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      nameInputRef.current?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [formOpen, editing?.id]);

  function resetSelectedImage() {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }
    setImageFile(null);
    setImagePreview(null);
    setFileInputKey((value) => value + 1);
  }

  function selectImage(file: File | undefined) {
    setError("");
    if (!file) {
      resetSelectedImage();
      return;
    }
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError("Solo se permiten fotografías JPG, PNG o WebP.");
      resetSelectedImage();
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("La fotografía no puede superar 5 MB.");
      resetSelectedImage();
      return;
    }
    if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    const preview = URL.createObjectURL(file);
    previewUrlRef.current = preview;
    setImageFile(file);
    setImagePreview(preview);
  }

  function openCreate() {
    setEditing(null);
    setName("");
    setDescription("");
    setLongDescription("");
    setPrice("");
    setDuration("60");
    setCategory("");
    setImageUrl("");
    resetSelectedImage();
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
    setPrice(service.price === null ? "" : String(service.price));
    setDuration(String(service.duration_minutes));
    setCategory(service.category ?? "");
    setImageUrl(service.image_url ?? "");
    resetSelectedImage();
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
      let savedId: string | null = null;
      try {
        const result = await saveService({
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
        savedId = result.id;
        if (imageFile) {
          const formData = new FormData();
          formData.set("image", imageFile);
          await uploadServiceImage(savedId, formData);
        }
        setFormOpen(false);
        setMessage(editing ? "Servicio actualizado correctamente." : "Servicio creado correctamente.");
        setEditing(null);
        resetSelectedImage();
        router.refresh();
      } catch (err) {
        if (savedId) {
          // Reuse the saved record if the photo upload failed; never create a duplicate.
          setEditing({
            id: savedId,
            name,
            description,
            long_description: longDescription,
            price: price.trim() ? Number(price) : null,
            duration_minutes: Number(duration),
            category,
            image_url: imageUrl || null,
            featured,
            active,
          });
          setMessage("Los datos del servicio se guardaron, pero la fotografía sigue pendiente. Puedes reintentar.");
          router.refresh();
        }
        setError(err instanceof Error ? err.message : "No se pudo guardar el servicio.");
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
        setMessage(service.active ? "Servicio desactivado." : "Servicio activado.");
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "No se pudo cambiar el estado.");
      }
    });
  }

  const activeCount = initialServices.filter((service) => service.active).length;

  return (
    <section className="py-10">
      <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#d6b79a]">Catálogo del salón</p>
          <p className="mt-3 text-sm text-white/50">{initialServices.length} servicios · {activeCount} activos</p>
        </div>
        <button type="button" onClick={openCreate} disabled={pending} className="inline-flex min-h-12 items-center justify-center gap-3 bg-[#d6b79a] px-6 text-xs font-semibold uppercase tracking-[0.15em] text-[#11100f] transition hover:bg-[#ead0b6] disabled:opacity-50">
          <Plus size={17} /> Agregar servicio
        </button>
      </div>

      {message && <p role="status" className="mb-6 text-sm text-[#d6b79a]">{message}</p>}
      {error && !formOpen && <p role="alert" className="mb-6 text-sm text-red-300">{error}</p>}

      {initialServices.length === 0 ? (
        <div className="flex flex-col items-center border border-white/10 bg-[#171310] px-6 py-20 text-center">
          <Scissors size={34} className="text-[#d6b79a]" />
          <h2 className="mt-6 text-2xl font-light">Todavía no hay servicios.</h2>
          <p className="mt-4 max-w-md text-sm leading-7 text-white/50">Agrega el primer servicio para comenzar a configurar el catálogo del salón.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {initialServices.map((service) => (
            <article key={service.id} className="flex flex-col border border-white/10 bg-[#171310] p-6">
              {service.image_url ? (
                <div role="img" aria-label={`Imagen de ${service.name}`} className="aspect-[4/3] w-full bg-[#24201d] bg-cover bg-center" style={{ backgroundImage: `url("${service.image_url}")` }} />
              ) : (
                <div className="flex aspect-[4/3] items-center justify-center bg-[#24201d]"><Scissors size={32} strokeWidth={1.2} className="text-[#d6b79a]" /></div>
              )}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="text-[10px] uppercase tracking-[0.15em] text-[#d6b79a]">{service.category || "Sin categoría"}</span>
                {service.featured && <Star size={14} className="text-[#d6b79a]" />}
                <span className="ml-auto text-[10px] uppercase tracking-[0.15em] text-white/45">{service.active ? "Activo" : "Inactivo"}</span>
              </div>
              <h3 className="mt-5 text-2xl font-light">{service.name}</h3>
              <p className="mt-3 min-h-14 text-sm leading-7 text-white/50">{service.description || "Sin descripción."}</p>
              <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-white/65">
                <span className="inline-flex items-center gap-2"><Clock3 size={15} />{service.duration_minutes} min</span>
                {service.price !== null && <span>Precio: {service.price.toFixed(2)}</span>}
              </div>
              <div className="mt-7 flex flex-wrap gap-3 border-t border-white/10 pt-5">
                <button type="button" onClick={() => openEdit(service)} disabled={pending} className="inline-flex min-h-11 items-center gap-2 border border-white/20 px-4 text-xs transition hover:border-[#d6b79a] disabled:opacity-50"><Pencil size={14} />Editar</button>
                <button type="button" onClick={() => handleToggle(service)} disabled={pending} className="min-h-11 border border-white/20 px-4 text-xs text-white/70 transition hover:border-[#d6b79a] disabled:opacity-50">{service.active ? "Desactivar" : "Activar"}</button>
              </div>
            </article>
          ))}
        </div>
      )}

      {formOpen && (
        <div ref={formRef} className="relative mt-10 scroll-mt-28 rounded-2xl border border-[#d6b79a]/50 bg-[#1c1714] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.3)] sm:p-9">
          <div className="mb-6 flex items-center gap-3 border-b border-white/10 pb-5">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d6b79a]/10 text-[#d6b79a]">
              {editing ? <Pencil size={18} /> : <Plus size={18} />}
            </span>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#d6b79a]">{editing ? "Modo edición" : "Nuevo registro"}</p>
              <p className="mt-1 text-xs text-white/50">{editing ? `Modificando: ${editing.name}` : "Completa los datos para crear un servicio"}</p>
            </div>
          </div>
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-light">{editing ? "Editar servicio" : "Nuevo servicio"}</h2>
            <button type="button" onClick={() => { if (!pending) { setFormOpen(false); setError(""); resetSelectedImage(); } }} disabled={pending} aria-label="Cerrar formulario" className="p-2 text-white/60 hover:text-white"><X size={20} /></button>
          </div>
          <form onSubmit={handleSave} className="mt-8 space-y-6">
            <div>
              <label htmlFor="service-name" className={labelClass}>Nombre del servicio</label>
              <input ref={nameInputRef} id="service-name" required maxLength={120} value={name} onChange={(event) => setName(event.target.value)} className={fieldClass} />
            </div>
            <div>
              <label htmlFor="service-description" className={labelClass}>Descripción corta</label>
              <textarea id="service-description" rows={2} maxLength={500} value={description} onChange={(event) => setDescription(event.target.value)} className={fieldClass} />
            </div>
            <div>
              <label htmlFor="service-long-description" className={labelClass}>Descripción extensa</label>
              <textarea id="service-long-description" rows={4} maxLength={2000} value={longDescription} onChange={(event) => setLongDescription(event.target.value)} className={fieldClass} />
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="service-duration" className={labelClass}>Duración (minutos)</label>
                <input id="service-duration" type="number" min={5} max={480} step={1} required value={duration} onChange={(event) => setDuration(event.target.value)} className={fieldClass} />
              </div>
              <div>
                <label htmlFor="service-price" className={labelClass}>Precio (opcional)</label>
                <input id="service-price" type="number" min={0} step="0.01" value={price} onChange={(event) => setPrice(event.target.value)} className={fieldClass} placeholder="Sin definir" />
              </div>
            </div>
            <div>
              <label htmlFor="service-category" className={labelClass}>Categoría</label>
              <input id="service-category" maxLength={80} value={category} onChange={(event) => setCategory(event.target.value)} className={fieldClass} placeholder="Cabello, Uñas, Tratamientos..." />
            </div>

            <div className="border border-white/10 bg-[#171310] p-5 sm:p-6">
              <label htmlFor="service-image-file" className={labelClass}>Fotografía del servicio</label>
              <label htmlFor="service-image-file" className="flex min-h-14 cursor-pointer items-center justify-center gap-3 border border-dashed border-[#d6b79a]/40 px-4 py-3 text-center text-sm text-[#d6b79a] transition hover:border-[#d6b79a]">
                <ImagePlus size={20} />{imageFile ? "Cambiar fotografía seleccionada" : "Seleccionar fotografía"}
              </label>
              <input key={fileInputKey} id="service-image-file" type="file" accept="image/jpeg,image/png,image/webp" disabled={pending} onChange={(event) => selectImage(event.target.files?.[0])} className="sr-only" />
              <p className="mt-3 text-xs leading-5 text-white/45">JPG, PNG o WebP. Máximo 5 MB. La fotografía se subirá al guardar el servicio.</p>
              {imageFile && (
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                  <p className="break-all text-xs text-white/70">{imageFile.name}</p>
                  <button type="button" onClick={resetSelectedImage} disabled={pending} className="text-xs text-[#d6b79a] underline underline-offset-4 disabled:opacity-50">Quitar selección</button>
                </div>
              )}
              {(imagePreview || imageUrl) && (
                <div role="img" aria-label="Vista previa de la fotografía del servicio" className="mt-5 aspect-[4/3] max-w-md bg-[#24201d] bg-cover bg-center" style={{ backgroundImage: `url("${imagePreview || imageUrl}")` }} />
              )}
              {!imageFile && imageUrl && <p className="mt-2 text-xs text-white/45">Fotografía actual. Selecciona otra para reemplazarla.</p>}
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
              <label className="flex min-h-11 items-center gap-3 text-sm text-white/75"><input type="checkbox" checked={featured} onChange={(event) => setFeatured(event.target.checked)} className="h-4 w-4 accent-[#d6b79a]" />Servicio destacado</label>
              <label className="flex min-h-11 items-center gap-3 text-sm text-white/75"><input type="checkbox" checked={active} onChange={(event) => setActive(event.target.checked)} className="h-4 w-4 accent-[#d6b79a]" />Servicio activo</label>
            </div>
            {error && <p role="alert" className="text-sm text-red-300">{error}</p>}
            <button type="submit" disabled={pending} className="flex min-h-13 w-full items-center justify-center gap-3 bg-[#d6b79a] px-6 text-xs font-semibold uppercase tracking-[0.16em] text-[#11100f] transition hover:bg-[#ead0b6] disabled:opacity-50 sm:w-auto">
              {pending && <Loader2 size={17} className="animate-spin" />}{pending ? "Guardando servicio..." : editing ? "Guardar cambios" : "Crear servicio"}
            </button>
          </form>
        </div>
      )}
    </section>
  );
}
