
"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

type ScheduleInput = {
  staffId: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
};

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const TIME_REGEX = /^([01]\d|2[0-3]):[0-5]\d$/;

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

export async function addStaffSchedule(input: ScheduleInput) {
  const supabase = await getAdminClient();

  if (!UUID_REGEX.test(input.staffId)) {
    throw new Error("Profesional no válida.");
  }

  if (
    !Number.isInteger(input.dayOfWeek) ||
    input.dayOfWeek < 1 ||
    input.dayOfWeek > 7
  ) {
    throw new Error("Día de la semana no válido.");
  }

  if (
    !TIME_REGEX.test(input.startTime) ||
    !TIME_REGEX.test(input.endTime) ||
    input.startTime >= input.endTime
  ) {
    throw new Error("El horario introducido no es válido.");
  }

  const { data: staff, error: staffError } = await supabase
    .from("staff")
    .select("id")
    .eq("id", input.staffId)
    .single();

  if (staffError || !staff) {
    throw new Error("La profesional no existe.");
  }

  const { error } = await supabase
    .from("staff_schedules")
    .insert({
      staff_id: input.staffId,
      day_of_week: input.dayOfWeek,
      start_time: input.startTime,
      end_time: input.endTime,
    });

  if (error) {
    if (error.code === "23P01") {
      throw new Error(
        "Ese horario se superpone con otro turno de la profesional."
      );
    }

    throw new Error("No se pudo agregar el horario.");
  }

  revalidatePath("/admin/staff");

  return { success: true };
}

export async function removeStaffSchedule(scheduleId: string) {
  const supabase = await getAdminClient();

  if (!UUID_REGEX.test(scheduleId)) {
    throw new Error("Horario no válido.");
  }

  const { data, error } = await supabase
    .from("staff_schedules")
    .delete()
    .eq("id", scheduleId)
    .select("id");

  if (error || !data?.length) {
    throw new Error("No se pudo eliminar el horario.");
  }

  revalidatePath("/admin/staff");

  return { success: true };
}
