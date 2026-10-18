
"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

type PeriodInput = {
  startsAt: string;
  endsAt: string;
  reason: string;
};

type StaffTimeOffInput = PeriodInput & {
  staffId: string;
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

function validatePeriod(input: PeriodInput) {
  const startsAt = new Date(input.startsAt);
  const endsAt = new Date(input.endsAt);

  if (
    !Number.isFinite(startsAt.getTime()) ||
    !Number.isFinite(endsAt.getTime()) ||
    startsAt >= endsAt
  ) {
    throw new Error("El período seleccionado no es válido.");
  }

  if (input.reason.trim().length > 500) {
    throw new Error("El motivo no puede superar 500 caracteres.");
  }

  return {
    starts_at: startsAt.toISOString(),
    ends_at: endsAt.toISOString(),
    reason: input.reason.trim() || null,
  };
}

export async function addStaffTimeOff(input: StaffTimeOffInput) {
  const supabase = await getAdminClient();

  if (!UUID_REGEX.test(input.staffId)) {
    throw new Error("Profesional no válida.");
  }

  const period = validatePeriod(input);

  const { data: staff, error: staffError } = await supabase
    .from("staff")
    .select("id")
    .eq("id", input.staffId)
    .single();

  if (staffError || !staff) {
    throw new Error("La profesional no existe.");
  }

  const { error } = await supabase
    .from("staff_time_off")
    .insert({
      staff_id: input.staffId,
      ...period,
    });

  if (error) {
    throw new Error("No se pudo registrar la ausencia.");
  }

  revalidatePath("/admin/availability");

  return { success: true };
}

export async function removeStaffTimeOff(id: string) {
  const supabase = await getAdminClient();

  if (!UUID_REGEX.test(id)) {
    throw new Error("Ausencia no válida.");
  }

  const { data, error } = await supabase
    .from("staff_time_off")
    .delete()
    .eq("id", id)
    .select("id");

  if (error || !data?.length) {
    throw new Error("No se pudo eliminar la ausencia.");
  }

  revalidatePath("/admin/availability");

  return { success: true };
}

export async function addSalonClosure(input: PeriodInput) {
  const supabase = await getAdminClient();
  const period = validatePeriod(input);

  const { error } = await supabase
    .from("salon_closures")
    .insert(period);

  if (error) {
    throw new Error("No se pudo registrar el cierre.");
  }

  revalidatePath("/admin/availability");

  return { success: true };
}

export async function removeSalonClosure(id: string) {
  const supabase = await getAdminClient();

  if (!UUID_REGEX.test(id)) {
    throw new Error("Cierre no válido.");
  }

  const { data, error } = await supabase
    .from("salon_closures")
    .delete()
    .eq("id", id)
    .select("id");

  if (error || !data?.length) {
    throw new Error("No se pudo eliminar el cierre.");
  }

  revalidatePath("/admin/availability");

  return { success: true };
}
