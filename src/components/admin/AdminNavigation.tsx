
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Scissors,
  Clock3,
  ArrowUpRight,
} from "lucide-react";

const navigation = [
  {
    label: "Inicio",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Citas",
    href: "/admin/appointments",
    icon: CalendarDays,
  },
  {
    label: "Profesionales",
    href: "/admin/staff",
    icon: Users,
  },
  {
    label: "Servicios",
    href: "/admin/services",
    icon: Scissors,
  },
  {
    label: "Disponibilidad",
    href: "/admin/availability",
    icon: Clock3,
  },
];

export default function AdminNavigation() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navegación administrativa"
      className="border-b border-white/10 bg-[#171310]"
    >
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-8 lg:px-12">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/admin"
            className="text-xs font-medium uppercase tracking-[0.22em] text-[#d6b79a]"
          >
            ÉLITE <span className="text-white/45">/ Back Office</span>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs text-white/50 transition hover:text-[#d6b79a]"
          >
            Ver sitio
            <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1">
          {navigation.map((item) => {
            const Icon = item.icon;

            const active =
              pathname === item.href ||
              (item.href !== "/admin" &&
                pathname.startsWith(`${item.href}/`));

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-medium transition ${
                  active
                    ? "border-[#d6b79a] bg-[#d6b79a] text-[#11100f]"
                    : "border-white/10 bg-[#211b17] text-white/65 hover:border-[#d6b79a]/50 hover:text-[#d6b79a]"
                }`}
              >
                <Icon size={16} strokeWidth={1.7} />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
