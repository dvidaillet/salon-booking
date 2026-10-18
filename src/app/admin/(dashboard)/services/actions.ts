
"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type ServiceInput = {
  id?: string;
  name: string;
  description: string;
  longDescription: string;
  price: string;
  durationMinutes: number;
  category: string;
  imageUrl: string;
  featured: boolean;
  active: boolean;
};

async function getAdminClient() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("Debes iniciar sesión.");
  }

  const { data: isAdmin, error: permissionError } =
    await supabase.rpc("is_admin");

  if (permissionError || isAdmin !== true) {
    throw new Error("No tienes permisos administrativos.");
  }

  return supabase;
}

export async function saveService(input: ServiceInput) {
  const supabase = await getAdminClient();

  const name = input.name.trim();
  const description = input.description.trim();
  const longDescription = input.longDescription.trim();
  const category = input.category.trim();
  const imageUrl = input.imageUrl.trim();

  if (name.length < 2 || name.length > 120) {
    throw new Error("El nombre debe tener entre 2 y 120 caracteres.");
  }

  if (description.length > 500) {
    throw new Error("La descripción no puede superar 500 caracteres.");
  }

  if (longDescription.length > 2000) {
    throw new Error("La descripción extensa es demasiado larga.");
  }

  if (category.length > 80) {
    throw new Error("La categoría no puede superar 80 caracteres.");
  }

  if (
    !Number.isInteger(input.durationMinutes) ||
    input.durationMinutes < 5 ||
    input.durationMinutes > 480
  ) {
    throw new Error("La duración debe estar entre 5 y 480 minutos.");
  }

  let price: number | null = null;

  if (input.price.trim() !== "") {
    const rawPrice = input.price.trim();

    if (!/^\d+(\.\d{1,2})?$/.test(rawPrice)) {
      throw new Error("Introduce un precio válido, con hasta 2 decimales.");
    }

    price = Number(rawPrice);

    if (!Number.isFinite(price) || price > 99999999.99) {
      throw new Error("El precio no es válido.");
    }
  }

  if (imageUrl) {
    try {
      const url = new URL(imageUrl);

      if (!["https:", "http:"].includes(url.protocol)) {
        throw new Error();
      }
    } catch {
      throw new Error("La fotografía debe tener una URL HTTP o HTTPS válida.");
    }
  }

  if (
    typeof input.featured !== "boolean" ||
    typeof input.active !== "boolean"
  ) {
    throw new Error("Los estados del servicio no son válidos.");
  }

  const payload = {
    name,
    description: description || null,
    long_description: longDescription || null,
    price,
    duration_minutes: input.durationMinutes,
    category: category || null,
    image_url: imageUrl || null,
    featured: input.featured,
    active: input.active,
    updated_at: new Date().toISOString(),
  };

  if (input.id) {
    const { data, error } = await supabase
      .from("services")
      .update(payload)
      .eq("id", input.id)
      .select("id");

    if (error || !data?.length) {
      throw new Error("No se pudo actualizar el servicio.");
    }
  } else {
    const { error } = await supabase
      .from("services")
      .insert(payload);

    if (error) {
      throw new Error("No se pudo crear el servicio.");
    }
  }

  revalidatePath("/admin/services");

  return { success: true };
}

export async function setServiceActive(
  id: string,
  active: boolean
) {
  const supabase = await getAdminClient();

  if (!id || typeof active !== "boolean") {
    throw new Error("Datos no válidos.");
  }

  const { data, error } = await supabase
    .from("services")
    .update({
      active,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select("id");

  if (error || !data?.length) {
    throw new Error("No se pudo cambiar el estado del servicio.");
  }

  revalidatePath("/admin/services");

  return { success: true };
}
