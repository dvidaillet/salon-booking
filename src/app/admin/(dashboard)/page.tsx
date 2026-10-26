
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  CalendarDays,
  Users,
  Scissors,
  Clock3,
  ArrowUpRight,
  ArrowLeft,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

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
        <section className="pb-10 pt-12 sm:pb-14 sm:pt-16">
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
            Gestiona las citas de tus clientes, los servicios, tu equipo
            de profesionales y la disponibilidad del salón desde un
            mismo espacio.
          </p>
        </section>

        {/* Navegación */}
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
                  className="group relative flex min-h-64 flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#171310] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#d6b79a]/50 hover:bg-[#1d1713] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d6b79a] sm:p-9"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-[#d6b79a]/20 bg-[#d6b79a]/10 transition-colors group-hover:bg-[#d6b79a]/15">
                      <Icon
                        size={27}
                        strokeWidth={1.4}
                        className="text-[#d6b79a]"
                      />
                    </div>

                    <ArrowUpRight
                      size={22}
                      className="text-white/35 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#d6b79a]"
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
                    <span>{section.label}</span>
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
