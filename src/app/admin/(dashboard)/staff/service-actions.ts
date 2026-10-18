
"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

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

export async function updateStaffServices(
  staffId: string,
  serviceIds: string[]
) {
  const supabase = await getAdminClient();

  if (
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      staffId
    )
  ) {
    throw new Error("Profesional no válida.");
  }

  if (
    !Array.isArray(serviceIds) ||
    serviceIds.length > 100 ||
    serviceIds.some(
      (id) =>
        typeof id !== "string" ||
        !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
          id
        )
    )
  ) {
    throw new Error("Selección de servicios no válida.");
  }

  const uniqueIds = [...new Set(serviceIds)];

  const { data: staff, error: staffError } = await supabase
    .from("staff")
    .select("id")
    .eq("id", staffId)
    .single();

  if (staffError || !staff) {
    throw new Error("La profesional no existe.");
  }

  if (uniqueIds.length > 0) {
    const { data: services, error: servicesError } = await supabase
      .from("services")
      .select("id")
      .in("id", uniqueIds);

    if (servicesError || services?.length !== uniqueIds.length) {
      throw new Error("Uno o varios servicios no existen.");
    }
  }

  const { data: current, error: currentError } = await supabase
    .from("staff_services")
    .select("service_id")
    .eq("staff_id", staffId);

  if (currentError) {
    throw new Error("No se pudieron consultar las asignaciones.");
  }

  const currentIds = new Set(
    (current ?? []).map((row) => row.service_id)
  );
  const selectedIds = new Set(uniqueIds);

  const toAdd = uniqueIds.filter((id) => !currentIds.has(id));
  const toRemove = [...currentIds].filter(
    (id) => !selectedIds.has(id)
  );

  if (toAdd.length > 0) {
    const { error } = await supabase
      .from("staff_services")
      .insert(
        toAdd.map((serviceId) => ({
          staff_id: staffId,
          service_id: serviceId,
        }))
      );

    if (error) {
      throw new Error("No se pudieron agregar los servicios.");
    }
  }

  if (toRemove.length > 0) {
    const { error } = await supabase
      .from("staff_services")
      .delete()
      .eq("staff_id", staffId)
      .in("service_id", toRemove);

    if (error) {
      throw new Error("No se pudieron quitar los servicios.");
    }
  }

  revalidatePath("/admin/staff");

  return { success: true };
}
