import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
import { salonConfig } from "@/lib/salon/config";

type Interval = { start: number; end: number };
type Schedule = { staff_id: string; day_of_week: number; start_time: string; end_time: string };
type Block = { staff_id?: string; starts_at: string; ends_at: string };
export type AvailableSlot = { startsAt: string; endsAt: string; staffId: string; staffName: string };

const DAY_MS = 86_400_000;
const MINUTE_MS = 60_000;

function partsAt(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone, year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23",
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map((p) => [p.type, Number(p.value)]));
  return { year: values.year, month: values.month, day: values.day,
    hour: values.hour, minute: values.minute, second: values.second };
}

function zonedDateToUtc(date: string, time: string, timeZone: string): number {
  const [year, month, day] = date.split("-").map(Number);
  const [hour, minute] = time.split(":").map(Number);
  const target = Date.UTC(year, month - 1, day, hour, minute);
  let candidate = target;
  for (let i = 0; i < 4; i++) {
    const p = partsAt(new Date(candidate), timeZone);
    const actual = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second);
    const correction = target - actual;
    candidate += correction;
    if (correction === 0) break;
  }
  const p = partsAt(new Date(candidate), timeZone);
  if (p.year !== year || p.month !== month || p.day !== day || p.hour !== hour || p.minute !== minute) {
    throw new Error("Hora local inexistente en la zona horaria del salón.");
  }
  return candidate;
}

function overlaps(a: Interval, b: Interval) {
  return a.start < b.end && b.start < a.end;
}

function timeToMinutes(value: string) {
  const [hour, minute] = value.split(":").map(Number);
  return hour * 60 + minute;
}

export async function getAvailableSlots(serviceId: string, date: string, staffId?: string): Promise<AvailableSlot[]> {
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(serviceId)) {
    throw new Error("Servicio no válido.");
  }
  if (staffId && !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(staffId)) {
    throw new Error("Profesional no válido.");
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || new Date(`${date}T00:00:00Z`).toISOString().slice(0, 10) !== date) {
    throw new Error("Fecha no válida.");
  }
  const tz = salonConfig.timeZone;
  const now = Date.now();
  const today = partsAt(new Date(now), tz);
  const todayString = `${today.year}-${String(today.month).padStart(2, "0")}-${String(today.day).padStart(2, "0")}`;
  const todayDay = Date.parse(`${todayString}T00:00:00Z`);
  const requestedDay = Date.parse(`${date}T00:00:00Z`);
  if (requestedDay < todayDay || requestedDay > todayDay + salonConfig.booking.maximumAdvanceDays * DAY_MS) return [];
  const dayOfWeek = ((new Date(`${date}T12:00:00Z`).getUTCDay() + 6) % 7) + 1;
  const dayStart = zonedDateToUtc(date, "00:00", tz);
  const nextDate = new Date(requestedDay + DAY_MS).toISOString().slice(0, 10);
  const dayEnd = zonedDateToUtc(nextDate, "00:00", tz);
  const supabase = createAdminClient();
  const { data: service, error: serviceError } = await supabase.from("services")
    .select("id, duration_minutes").eq("id", serviceId).eq("active", true).maybeSingle();
  if (serviceError) throw new Error("No se pudo consultar el servicio.");
  if (!service) return [];
  const duration = service.duration_minutes * MINUTE_MS;
  if (!Number.isInteger(service.duration_minutes) || duration <= 0) return [];
  const { data: assignments, error: assignmentsError } = await supabase.from("staff_services")
    .select("staff_id").eq("service_id", serviceId);
  if (assignmentsError) throw new Error("No se pudieron consultar las asignaciones.");
  const eligibleIds = [...new Set((assignments ?? []).map((a) => a.staff_id))]
    .filter((id) => !staffId || id === staffId);
  if (!eligibleIds.length) return [];
  const [staffResult, scheduleResult, timeOffResult, closureResult, appointmentResult] = await Promise.all([
    supabase.from("staff").select("id, name").in("id", eligibleIds).eq("active", true),
    supabase.from("staff_schedules").select("staff_id, day_of_week, start_time, end_time")
      .in("staff_id", eligibleIds).eq("day_of_week", dayOfWeek),
    supabase.from("staff_time_off").select("staff_id, starts_at, ends_at")
      .in("staff_id", eligibleIds).lt("starts_at", new Date(dayEnd).toISOString())
      .gt("ends_at", new Date(dayStart).toISOString()),
    supabase.from("salon_closures").select("starts_at, ends_at")
      .lt("starts_at", new Date(dayEnd).toISOString()).gt("ends_at", new Date(dayStart).toISOString()),
    supabase.from("appointments").select("staff_id, starts_at, ends_at")
      .in("staff_id", eligibleIds).in("status", ["pending", "confirmed"])
      .lt("starts_at", new Date(dayEnd).toISOString()).gt("ends_at", new Date(dayStart).toISOString()),
  ]);
  if (staffResult.error || scheduleResult.error || timeOffResult.error || closureResult.error || appointmentResult.error) {
    throw new Error("No se pudo consultar la disponibilidad.");
  }
  const staff = staffResult.data ?? [];
  const schedules = (scheduleResult.data ?? []) as Schedule[];
  const blocks = [
    ...(timeOffResult.data ?? []), ...(appointmentResult.data ?? []),
  ] as Block[];
  const closures = (closureResult.data ?? []) as Block[];
  const slots: AvailableSlot[] = [];
  for (const person of staff) {
    const personBlocks = blocks.filter((b) => b.staff_id === person.id);
    for (const shift of schedules.filter((s) => s.staff_id === person.id)) {
      const first = timeToMinutes(shift.start_time);
      const last = timeToMinutes(shift.end_time);
      const step = salonConfig.booking.slotIntervalMinutes;
      for (let minute = Math.ceil(first / step) * step; minute + service.duration_minutes <= last; minute += step) {
        const start = zonedDateToUtc(date, `${String(Math.floor(minute / 60)).padStart(2, "0")}:${String(minute % 60).padStart(2, "0")}`, tz);
        const end = start + duration;
        if (start < now + salonConfig.booking.minimumNoticeMinutes * MINUTE_MS) continue;
        const interval = { start, end };
        if ([...personBlocks, ...closures].some((b) => overlaps(interval, {
          start: Date.parse(b.starts_at), end: Date.parse(b.ends_at),
        }))) continue;
        slots.push({ startsAt: new Date(start).toISOString(), endsAt: new Date(end).toISOString(), staffId: person.id, staffName: person.name });
      }
    }
  }
  return slots.sort((a, b) => a.startsAt.localeCompare(b.startsAt) || a.staffName.localeCompare(b.staffName));
}
