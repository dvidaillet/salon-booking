
"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

type StaffInput = {
  id?: string;
  name: string;
  bio: string;
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

export async function saveStaff(input: StaffInput) {
  const supabase = await getAdminClient();

  const name = input.name.trim();
  const bio = input.bio.trim();

  if (name.length < 2 || name.length > 120) {
    throw new Error("El nombre debe tener entre 2 y 120 caracteres.");
  }

  if (bio.length > 1000) {
    throw new Error("La descripción no puede superar 1000 caracteres.");
  }

  if (typeof input.active !== "boolean") {
    throw new Error("Estado no válido.");
  }

  const payload = {
    name,
    bio: bio || null,
    active: input.active,
    updated_at: new Date().toISOString(),
  };

  if (input.id) {
    const { data, error } = await supabase
      .from("staff")
      .update(payload)
      .eq("id", input.id)
      .select("id");

    if (error) {
      throw new Error("No se pudo actualizar la profesional.");
    }

    if (!data?.length) {
      throw new Error("La profesional no existe.");
    }
  } else {
    const { error } = await supabase
      .from("staff")
      .insert(payload);

    if (error) {
      throw new Error("No se pudo crear la profesional.");
    }
  }

  revalidatePath("/admin/staff");

  return { success: true };
}

export async function setStaffActive(
  id: string,
  active: boolean
) {
  const supabase = await getAdminClient();

  if (!id || typeof active !== "boolean") {
    throw new Error("Datos no válidos.");
  }

  const { data, error } = await supabase
    .from("staff")
    .update({
      active,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select("id");

  if (error || !data?.length) {
    throw new Error("No se pudo cambiar el estado.");
  }

  revalidatePath("/admin/staff");

  return { success: true };
}
