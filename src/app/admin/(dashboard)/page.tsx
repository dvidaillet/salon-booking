import Link from "next/link";
import { redirect } from "next/navigation";
import {
  CalendarDays,
  Users,
  Scissors,
  Clock3,
  ArrowUpRight,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";

const sections = [
  {
    title: "Citas",
    description: "Consulta y administra las solicitudes.",
    icon: CalendarDays,
  },
  {
    title: "Profesionales",
    description: "Gestiona estilistas y disponibilidad.",
    icon: Users,
  },
  {
    title: "Servicios",
    description: "Configura servicios y duraciones.",
    icon: Scissors,
  },
  {
    title: "Horarios",
    description: "Organiza turnos, ausencias y cierres.",
    icon: Clock3,
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
    redirect("/admin/login?error=unauthorized");
  }

  return (
    <main className="min-h-screen bg-[#11100f] px-5 py-12 text-white sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-wrap items-center justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#d6b79a]">
              Élite Beauty Studio
            </p>
            <h1 className="mt-3 text-3xl font-light tracking-tight">
              Back Office
            </h1>
          </div>

          <form action="/admin/logout" method="post">
            <button
              type="submit"
              className="border border-white/20 px-5 py-3 text-xs uppercase tracking-[0.15em] transition hover:border-[#d6b79a]"
            >
              Cerrar sesión
            </button>
          </form>
        </header>

        <section className="py-14">
          <p className="text-xs uppercase tracking-[0.25em] text-[#d6b79a]">
            Panel de administración
          </p>

          <h2 className="mt-5 text-4xl font-light tracking-[-0.05em] sm:text-6xl">
            Gestiona tu salón.
          </h2>

          <p className="mt-5 max-w-xl text-sm leading-7 text-white/55">
            Desde aquí podrás gestionar profesionales, servicios,
            horarios y solicitudes de citas.
          </p>
        </section>

        <section className="grid gap-4 sm:grid-cols-2">
          {sections.map((section) => {
            const Icon = section.icon;

            return (
              <article
                key={section.title}
                className="group border border-white/10 bg-[#171310] p-7 sm:p-9"
              >
                <div className="flex items-start justify-between">
                  <Icon
                    size={27}
                    strokeWidth={1.3}
                    className="text-[#d6b79a]"
                  />

                  <ArrowUpRight
                    size={20}
                    className="text-white/40"
                  />
                </div>

                <h3 className="mt-10 text-2xl font-light">
                  {section.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-white/50">
                  {section.description}
                </p>

                <p className="mt-8 text-[10px] uppercase tracking-[0.2em] text-[#d6b79a]">
                  Próximamente
                </p>
              </article>
            );
          })}
        </section>

        <div className="mt-12">
          <Link
            href="/"
            className="text-xs uppercase tracking-[0.2em] text-white/50 transition hover:text-[#d6b79a]"
          >
            ← Volver al sitio público
          </Link>
        </div>
      </div>
    </main>
  );
}