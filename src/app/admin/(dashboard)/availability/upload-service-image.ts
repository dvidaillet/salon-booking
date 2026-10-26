"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

const BUCKET = "service-images";
const MAX_BYTES = 5 * 1024 * 1024;
const TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export async function uploadServiceImage(serviceId: string, formData: FormData) {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) throw new Error("Debes iniciar sesión.");
  const { data: isAdmin, error: permissionError } = await supabase.rpc("is_admin");
  if (permissionError || isAdmin !== true) throw new Error("No tienes permisos administrativos.");
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(serviceId)) {
    throw new Error("Identificador de servicio inválido.");
  }
  const file = formData.get("image");
  if (!(file instanceof File) || file.size === 0) throw new Error("Selecciona una fotografía.");
  if (file.size > MAX_BYTES) throw new Error("La fotografía no puede superar 5 MB.");
  const extension = TYPES[file.type];
  if (!extension) throw new Error("Solo se admiten JPG, PNG o WebP.");
  const bytes = new Uint8Array(await file.arrayBuffer());
  const jpg = bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  const png = bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47;
  const webp = bytes.length >= 12 && String.fromCharCode(...bytes.slice(0, 4)) === "RIFF" && String.fromCharCode(...bytes.slice(8, 12)) === "WEBP";
  if (!(file.type === "image/jpeg" && jpg || file.type === "image/png" && png || file.type === "image/webp" && webp)) {
    throw new Error("El contenido del archivo no coincide con el formato de imagen.");
  }
  const admin = createAdminClient();
  const { data: service, error: lookupError } = await admin.from("services").select("id").eq("id", serviceId).single();
  if (lookupError || !service) throw new Error("Servicio no encontrado.");
  const path = `${serviceId}/${crypto.randomUUID()}.${extension}`;
  const { error: uploadError } = await admin.storage.from(BUCKET).upload(path, bytes, {
    contentType: file.type,
    cacheControl: "3600",
    upsert: false,
  });
  if (uploadError) throw new Error(`No se pudo subir la fotografía: ${uploadError.message}`);
  const { data: publicUrl } = admin.storage.from(BUCKET).getPublicUrl(path);
  const { error: updateError } = await admin.from("services").update({
    image_url: publicUrl.publicUrl,
    updated_at: new Date().toISOString(),
  }).eq("id", serviceId);
  if (updateError) {
    await admin.storage.from(BUCKET).remove([path]);
    throw new Error("Se subió la fotografía, pero no se pudo asociar al servicio.");
  }
  revalidatePath("/admin/services");
  revalidatePath("/services");
  return { success: true, imageUrl: publicUrl.publicUrl };
}
