
import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getAvailableSlots } from "@/lib/salon/availability";
import { salonConfig } from "@/lib/salon/config";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const UUID =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const headers = {
  "Cache-Control": "no-store",
};

function respond(body: object, status: number) {
  return NextResponse.json(body, { status, headers });
}

function cubaDate(date: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: salonConfig.timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const part = (type: string) =>
    parts.find((item) => item.type === type)?.value ?? "";

  return `${part("year")}-${part("month")}-${part("day")}`;
}

function dateIndex(value: string) {
  return Math.floor(
    Date.parse(`${value}T00:00:00.000Z`) / 86400000
  );
}

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") ?? "";

    if (!contentType.includes("application/json")) {
      return respond({ error: "Formato no permitido." }, 415);
    }

    const contentLength = Number(
      request.headers.get("content-length") ?? 0
    );

    if (contentLength > 4096) {
      return respond({ error: "Solicitud demasiado grande." }, 413);
    }

    const raw = await request.text();

    if (raw.length > 4096) {
      return respond({ error: "Solicitud demasiado grande." }, 413);
    }

    let body: unknown;

    try {
      body = JSON.parse(raw);
    } catch {
      return respond({ error: "JSON no válido." }, 400);
    }

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return respond({ error: "Datos no válidos." }, 400);
    }

    const data = body as Record<string, unknown>;

    const serviceId = data.serviceId;
    const staffId = data.staffId;
    const startsAt = data.startsAt;
    const customerName = data.customerName;
    const customerPhone = data.customerPhone;
    const customerNotes = data.customerNotes;

    if (
      typeof serviceId !== "string" ||
      !UUID.test(serviceId) ||
      typeof staffId !== "string" ||
      !UUID.test(staffId) ||
      typeof startsAt !== "string" ||
      typeof customerName !== "string" ||
      typeof customerPhone !== "string" ||
      (customerNotes !== undefined &&
        typeof customerNotes !== "string")
    ) {
      return respond({ error: "Datos de reserva no válidos." }, 400);
    }

    const name = customerName.trim();
    const phone = customerPhone.trim();
    const notes =
      typeof customerNotes === "string"
        ? customerNotes.trim()
        : "";

    if (
      name.length < 2 ||
      name.length > 120 ||
      phone.length < 6 ||
      phone.length > 30 ||
      notes.length > 1000
    ) {
      return respond(
        { error: "Revisa el nombre, teléfono y notas." },
        400
      );
    }

    const start = new Date(startsAt);

    if (
      !Number.isFinite(start.getTime()) ||
      start.toISOString() !== startsAt
    ) {
      return respond({ error: "Hora no válida." }, 400);
    }

    const now = new Date();
    const bookingDate = cubaDate(start);
    const today = cubaDate(now);
    const dayDifference =
      dateIndex(bookingDate) - dateIndex(today);

    if (dayDifference < 0 || dayDifference >= 7) {
      return respond(
        { error: "Solo se admiten citas para los próximos 7 días." },
        400
      );
    }

    const noticeMilliseconds =
      salonConfig.booking.minimumNoticeMinutes * 60000;

    if (start.getTime() < now.getTime() + noticeMilliseconds) {
      return respond(
        { error: "La hora seleccionada está demasiado próxima." },
        400
      );
    }

    const available = await getAvailableSlots(
      serviceId,
      bookingDate,
      staffId
    );

    const matchingSlot = available.find(
      (slot) =>
        slot.staffId === staffId &&
        slot.startsAt === startsAt
    );

    if (!matchingSlot) {
      return respond(
        {
          error:
            "Ese horario ya no está disponible. Selecciona otro.",
        },
        409
      );
    }

    const supabase = createAdminClient();

    const { data: appointment, error } = await supabase
      .from("appointments")
      .insert({
        service_id: serviceId,
        staff_id: staffId,
        customer_name: name,
        customer_phone: phone,
        customer_notes: notes || null,
        starts_at: matchingSlot.startsAt,
        ends_at: matchingSlot.endsAt,
        status: "pending",
      })
      .select("id")
      .single();

    if (error) {
      if (error.code === "23P01") {
        return respond(
          {
            error:
              "Otro cliente acaba de solicitar ese horario. Elige otro.",
          },
          409
        );
      }

      console.error("Error al guardar cita:", error.code);

      return respond(
        { error: "No se pudo registrar la solicitud." },
        500
      );
    }

    return respond(
      {
        success: true,
        appointmentId: appointment.id,
        status: "pending",
        message: "Tu solicitud de cita fue registrada.",
      },
      201
    );
  } catch (error) {
    console.error("Error de solicitud de cita:", error);

    return respond(
      { error: "No se pudo procesar la solicitud." },
      500
    );
  }
}
