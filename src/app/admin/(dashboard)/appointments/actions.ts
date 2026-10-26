"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

type AppointmentStatus =
  | "pending"
  | "confirmed"
  | "rejected"
  | "cancelled"
  | "completed";

type Result = { success: true } | { success: false; error: string };

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const transitions: Record<AppointmentStatus, AppointmentStatus[]> = {
  pending: ["confirmed", "rejected", "cancelled"],
  confirmed: ["cancelled", "completed"],
  rejected: [],
  cancelled: [],
  completed: [],
};

export async function updateAppointmentStatus(
  appointmentId: string,
  fromStatus: AppointmentStatus,
  toStatus: AppointmentStatus,
): Promise<Result> {
  if (!UUID.test(appointmentId) || !transitions[fromStatus]?.includes(toStatus)) {
    return { success: false, error: "Cambio de estado no permitido." };
  }

  const supabase = await createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) {
    return { success: false, error: "Debes iniciar sesión como administrador." };
  }

  const { data: isAdmin, error: roleError } = await supabase.rpc("is_admin");
  if (roleError || isAdmin !== true) {
    return { success: false, error: "No tienes permisos para modificar citas." };
  }

  // La condición sobre status impide sobrescribir cambios realizados
  // desde otra sesión mientras el administrador revisaba la pantalla.
  const { data, error } = await supabase
    .from("appointments")
    .update({ status: toStatus, updated_at: new Date().toISOString() })
    .eq("id", appointmentId)
    .eq("status", fromStatus)
    .select("id")
    .maybeSingle();

  if (error) {
    console.error("Error al actualizar cita:", error.code);
    return { success: false, error: "No se pudo actualizar la cita." };
  }
  if (!data) {
    return {
      success: false,
      error: "La cita cambió de estado o ya no está disponible. Actualiza la página.",
    };
  }

  revalidatePath("/admin/appointments");
  revalidatePath("/admin");
  return { success: true };
}
