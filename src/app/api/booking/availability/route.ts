
import { NextRequest, NextResponse } from "next/server";
import { getAvailableSlots } from "@/lib/salon/availability";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function isValidDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const parsed = new Date(`${value}T00:00:00.000Z`);

  return (
    !Number.isNaN(parsed.getTime()) &&
    parsed.toISOString().slice(0, 10) === value
  );
}

export async function GET(request: NextRequest) {
  const headers = {
    "Cache-Control": "no-store, private",
  };

  const params = request.nextUrl.searchParams;

  const serviceId = params.get("serviceId") ?? "";
  const date = params.get("date") ?? "";
  const staffId = params.get("staffId") ?? undefined;

  if (
    !UUID_REGEX.test(serviceId) ||
    !isValidDate(date) ||
    (staffId !== undefined && !UUID_REGEX.test(staffId))
  ) {
    return NextResponse.json(
      { error: "Los parámetros de búsqueda no son válidos." },
      { status: 400, headers }
    );
  }

  try {
    const slots = await getAvailableSlots(
      serviceId,
      date,
      staffId
    );

    return NextResponse.json(
      {
        date,
        slots: slots.map((slot) => ({
          startsAt: slot.startsAt,
          endsAt: slot.endsAt,
          staffId: slot.staffId,
          staffName: slot.staffName,
        })),
      },
      { status: 200, headers }
    );
  } catch (error) {
    console.error("Error al consultar disponibilidad:", error);

    return NextResponse.json(
      { error: "No se pudo consultar la disponibilidad." },
      { status: 500, headers }
    );
  }
}
