
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  CalendarDays,
  CalendarCheck2,
  Users,
  Scissors,
  Clock3,
  ArrowUpRight,
  ArrowLeft,
  LogOut,
  LayoutDashboard,
  ChevronRight,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const TIME_ZONE = "America/Havana";

const sections = [
  {
    title: "Citas",
    description:
      "Consulta las solicitudes, confirma reservas y administra las citas de tus clientes.",
    href: "/admin/appointments",
    icon: CalendarDays,
    label: "Gestionar citas",
  },
  {
    title: "Profesionales",
    description:
      "Administra tu equipo, asigna servicios y configura los horarios semanales.",
    href: "/admin/staff",
    icon: Users,
    label: "Gestionar profesionales",
  },
  {
    title: "Servicios",
    description:
      "Crea y edita los servicios del salón, sus duraciones, categorías y precios.",
    href: "/admin/services",
    icon: Scissors,
    label: "Gestionar servicios",
  },
  {
    title: "Disponibilidad",
    description:
      "Organiza las ausencias de las profesionales y los cierres generales del salón.",
    href: "/admin/availability",
    icon: Clock3,
    label: "Gestionar disponibilidad",
  },
];

type RelatedName =
  | { name: string | null }
  | { name: string | null }[]
  | null;

function relationName(
  relation: RelatedName,
  fallback: string
): string {
  if (!relation) return fallback;

  const item = Array.isArray(relation)
    ? relation[0]
    : relation;

  return item?.name ?? fallback;
}

function cubaDateKey(value: string | Date): string {
  const date =
    typeof value === "string" ? new Date(value) : value;

  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const get = (type: string) =>
    parts.find((part) => part.type === type)?.value ?? "";

  return `${get("year")}-${get("month")}-${get("day")}`;
}

function formatAppointmentDate(value: string): string {
  return new Intl.DateTimeFormat("es", {
    timeZone: TIME_ZONE,
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function formatAppointmentTime(value: string): string {
  return new Intl.DateTimeFormat("es", {
    timeZone: TIME_ZONE,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(value));
}

export default async function AdminPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/admin/login");
  }

  const { data: isAdmin, error: permissionError } =
    await supabase.rpc("is_admin");

  if (permissionError || !isAdmin) {
    redirect("/admin/unauthorized");
  }

  const now = new Date();
  const nowISO = now.toISOString();
  const todayInCuba = cubaDateKey(now);

  // Ventana amplia para cubrir el día local de Cuba,
  // independientemente de los cambios de horario.
  const utcDayStart = new Date(
    `${nowISO.slice(0, 10)}T00:00:00.000Z`
  );

  const todaySearchStart = new Date(
    utcDayStart.getTime() - 24 * 60 * 60 * 1000
  ).toISOString();

  const todaySearchEnd = new Date(
    utcDayStart.getTime() + 48 * 60 * 60 * 1000
  ).toISOString();

  const [
    pendingResult,
    confirmedResult,
    staffResult,
    todayResult,
    upcomingResult,
  ] = await Promise.all([
    supabase
      .from("appointments")
      .select("id", { count: "exact", head: true })
      .eq("status", "pending"),

    supabase
      .from("appointments")
      .select("id", { count: "exact", head: true })
      .eq("status", "confirmed"),

    supabase
      .from("staff")
      .select("id", { count: "exact", head: true })
      .eq("active", true),

    supabase
      .from("appointments")
      .select("id, starts_at")
      .in("status", ["pending", "confirmed"])
      .gte("starts_at", todaySearchStart)
      .lt("starts_at", todaySearchEnd),

    supabase
      .from("appointments")
      .select(
        "id, customer_name, starts_at, status, services(name), staff(name)"
      )
      .in("status", ["pending", "confirmed"])
      .gte("starts_at", nowISO)
      .order("starts_at", { ascending: true })
      .limit(5),
  ]);

  const statsError =
    pendingResult.error ||
    confirmedResult.error ||
    staffResult.error ||
    todayResult.error;

  if (statsError) {
    console.error(
      "Error al consultar estadísticas del dashboard:",
      statsError.message
    );
  }

  if (upcomingResult.error) {
    console.error(
      "Error al consultar próximas citas:",
      upcomingResult.error.message
    );
  }

  const todayAppointments = todayResult.error
    ? null
    : (todayResult.data ?? []).filter(
        (item) => cubaDateKey(item.starts_at) === todayInCuba
      ).length;

  const statistics = [
    {
      label: "Citas pendientes",
      value: pendingResult.error ? null : pendingResult.count,
      description: "Solicitudes por revisar",
      icon: Clock3,
      href: "/admin/appointments",
    },
    {
      label: "Citas confirmadas",
      value: confirmedResult.error ? null : confirmedResult.count,
      description: "Reservas aprobadas",
      icon: CalendarCheck2,
      href: "/admin/appointments",
    },
    {
      label: "Citas de hoy",
      value: todayAppointments,
      description: "Hora de Guantánamo",
      icon: CalendarDays,
      href: "/admin/appointments",
    },
    {
      label: "Profesionales activos",
      value: staffResult.error ? null : staffResult.count,
      description: "Equipo del salón",
      icon: Users,
      href: "/admin/staff",
    },
  ];

  const upcomingAppointments = upcomingResult.error
    ? []
    : (upcomingResult.data ?? []);

  return (
    <main className="min-h-screen bg-[#11100f] px-5 py-8 text-white sm:px-10 sm:py-12 lg:px-16">
      <div className="mx-auto max-w-7xl">
        {/* Encabezado */}
        <header className="flex flex-wrap items-center justify-between gap-6 border-b border-white/10 pb-8">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#d6b79a]/30 bg-[#d6b79a]/10">
              <LayoutDashboard
                size={22}
                strokeWidth={1.5}
                className="text-[#d6b79a]"
              />
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#d6b79a]">
                Élite Beauty Studio
              </p>

              <h1 className="mt-2 text-2xl font-light tracking-tight sm:text-3xl">
                Back Office
              </h1>
            </div>
          </div>

          <form action="/admin/logout" method="post">
            <button
              type="submit"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-xs uppercase tracking-[0.12em] text-white/80 transition hover:border-[#d6b79a] hover:text-[#d6b79a]"
            >
              <LogOut size={15} />
              Cerrar sesión
            </button>
          </form>
        </header>

        {/* Presentación */}
        <section className="pb-10 pt-12 sm:pb-12 sm:pt-16">
          <p className="text-xs uppercase tracking-[0.25em] text-[#d6b79a]">
            Panel de administración
          </p>

          <h2 className="mt-5 max-w-3xl text-4xl font-light tracking-[-0.05em] sm:text-5xl lg:text-6xl">
            Todo tu salón.
            <span className="block text-[#d6b79a]">
              En un solo lugar.
            </span>
          </h2>

          <p className="mt-6 max-w-2xl text-sm leading-7 text-white/55 sm:text-base">
            Consulta la actividad del salón, revisa las próximas
            reservas y administra tus servicios, profesionales y
            horarios.
          </p>
        </section>

        {/* Estadísticas reales */}
        <section
          aria-labelledby="dashboard-stats-title"
          className="mb-14"
        >
          <div className="mb-6 flex items-center justify-between gap-3">
            <h3
              id="dashboard-stats-title"
              className="text-lg font-light text-white/90"
            >
              Resumen del salón
            </h3>

            <span className="text-xs text-white/40">
              Datos de Supabase
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
            {statistics.map((stat) => {
              const Icon = stat.icon;

              return (
                <Link
                  key={stat.label}
                  href={stat.href}
                  className="group rounded-2xl border border-white/10 bg-[#171310] p-5 transition hover:border-[#d6b79a]/40 sm:p-6"
                >
                  <div className="flex items-center justify-between gap-2">
                    <Icon
                      size={21}
                      strokeWidth={1.5}
                      className="text-[#d6b79a]"
                    />

                    <ArrowUpRight
                      size={16}
                      className="text-white/30 transition group-hover:text-[#d6b79a]"
                    />
                  </div>

                  <p className="mt-7 text-3xl font-light tabular-nums text-[#d6b79a] sm:text-4xl">
                    {stat.value ?? "—"}
                  </p>

                  <h4 className="mt-3 text-sm font-medium text-white">
                    {stat.label}
                  </h4>

                  <p className="mt-2 text-xs leading-5 text-white/40">
                    {stat.description}
                  </p>
                </Link>
              );
            })}
          </div>

          {statsError && (
            <p
              role="alert"
              className="mt-4 text-xs text-amber-200/80"
            >
              Algunas estadísticas no se pudieron cargar.
              Intenta actualizar la página.
            </p>
          )}
        </section>

        {/* Próximas citas */}
        <section
          aria-labelledby="upcoming-title"
          className="mb-14"
        >
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3
                id="upcoming-title"
                className="text-xl font-light"
              >
                Próximas citas
              </h3>

              <p className="mt-2 text-xs text-white/45">
                Las siguientes cinco reservas pendientes o confirmadas.
              </p>
            </div>

            <Link
              href="/admin/appointments"
              className="inline-flex items-center gap-2 text-xs text-[#d6b79a] transition hover:text-white"
            >
              Ver todas
              <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#171310]">
            {upcomingResult.error ? (
              <p
                role="alert"
                className="p-8 text-sm text-white/55"
              >
                No se pudieron cargar las próximas citas.
              </p>
            ) : upcomingAppointments.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <CalendarDays
                  size={30}
                  strokeWidth={1.3}
                  className="mx-auto text-[#d6b79a]"
                />

                <h4 className="mt-4 text-lg font-light">
                  No hay próximas citas
                </h4>

                <p className="mt-3 text-sm text-white/45">
                  Las nuevas solicitudes aparecerán aquí.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-white/10">
                {upcomingAppointments.map((appointment) => {
                  const serviceName = relationName(
                    appointment.services,
                    "Servicio no disponible"
                  );

                  const staffName = relationName(
                    appointment.staff,
                    "Profesional no disponible"
                  );

                  const isPending =
                    appointment.status === "pending";

                  return (
                    <Link
                      key={appointment.id}
                      href="/admin/appointments"
                      className="group flex flex-col gap-4 p-5 transition hover:bg-white/5 sm:flex-row sm:items-center sm:justify-between sm:p-6"
                    >
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-3">
                          <h4 className="font-medium text-white">
                            {appointment.customer_name}
                          </h4>

                          <span
                            className={`rounded-full border px-3 py-1 text-[10px] ${
                              isPending
                                ? "border-amber-300/25 text-amber-200"
                                : "border-[#d6b79a]/30 text-[#d6b79a]"
                            }`}
                          >
                            {isPending
                              ? "Pendiente"
                              : "Confirmada"}
                          </span>
                        </div>

                        <p className="mt-2 text-sm text-white/60">
                          {serviceName} · {staffName}
                        </p>

                        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-white/45">
                          <span className="inline-flex items-center gap-2">
                            <CalendarDays size={14} />
                            {formatAppointmentDate(
                              appointment.starts_at
                            )}
                          </span>

                          <span className="inline-flex items-center gap-2">
                            <Clock3 size={14} />
                            {formatAppointmentTime(
                              appointment.starts_at
                            )}
                          </span>
                        </div>
                      </div>

                      <ChevronRight
                        size={19}
                        className="hidden shrink-0 text-[#d6b79a] transition group-hover:translate-x-1 sm:block"
                      />
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Módulos de gestión */}
        <section aria-labelledby="admin-modules-title">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <h3
              id="admin-modules-title"
              className="text-lg font-light text-white/90"
            >
              Módulos de gestión
            </h3>

            <span className="text-xs text-white/40">
              {sections.length} módulos disponibles
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {sections.map((section) => {
              const Icon = section.icon;

              return (
                <Link
                  key={section.href}
                  href={section.href}
                  aria-label={section.label}
                  className="group flex min-h-64 flex-col rounded-2xl border border-white/10 bg-[#171310] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#d6b79a]/50 hover:bg-[#1d1713] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d6b79a] sm:p-9"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-[#d6b79a]/20 bg-[#d6b79a]/10">
                      <Icon
                        size={27}
                        strokeWidth={1.4}
                        className="text-[#d6b79a]"
                      />
                    </div>

                    <ArrowUpRight
                      size={22}
                      className="text-white/35 transition group-hover:text-[#d6b79a]"
                    />
                  </div>

                  <div className="mt-10">
                    <h4 className="text-2xl font-light tracking-tight">
                      {section.title}
                    </h4>

                    <p className="mt-3 max-w-md text-sm leading-7 text-white/50">
                      {section.description}
                    </p>
                  </div>

                  <div className="mt-auto flex items-center gap-2 pt-8 text-[11px] font-medium uppercase tracking-[0.16em] text-[#d6b79a]">
                    {section.label}
                    <ArrowUpRight size={15} />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Accesos adicionales */}
        <section className="mt-12 flex flex-wrap items-center justify-between gap-5 border-t border-white/10 pt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-white/50 transition hover:text-[#d6b79a]"
          >
            <ArrowLeft size={16} />
            Volver al sitio público
          </Link>

          <Link
            href="/booking"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-[#d6b79a] transition hover:text-white"
          >
            Ver reservas públicas
            <ArrowUpRight size={16} />
          </Link>
        </section>

        <footer className="mt-14 border-t border-white/5 pt-6 text-center text-[10px] uppercase tracking-[0.2em] text-white/25">
          Élite Beauty Studio · Administración
        </footer>
      </div>
    </main>
  );
}
