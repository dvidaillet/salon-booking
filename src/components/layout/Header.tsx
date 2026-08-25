"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          onClick={closeMenu}
          className="text-xl font-semibold tracking-[0.2em] text-neutral-900"
        >
          SALON
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="text-sm text-neutral-600 transition hover:text-neutral-950"
          >
            Inicio
          </Link>

          <Link
            href="/services"
            className="text-sm text-neutral-600 transition hover:text-neutral-950"
          >
            Servicios
          </Link>

          <Link
            href="/booking"
            className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-neutral-700"
          >
            Reservar cita
          </Link>
        </nav>

        <button
          type="button"
          aria-label="Abrir menú"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 md:hidden"
        >
          <span className="text-xl">
            {menuOpen ? "×" : "☰"}
          </span>
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-neutral-200 bg-white px-6 py-6 md:hidden">
          <nav className="flex flex-col gap-5">
            <Link
              href="/"
              onClick={closeMenu}
              className="text-neutral-700"
            >
              Inicio
            </Link>

            <Link
              href="/services"
              onClick={closeMenu}
              className="text-neutral-700"
            >
              Servicios
            </Link>

            <Link
              href="/booking"
              onClick={closeMenu}
              className="rounded-full bg-neutral-900 px-6 py-3 text-center text-sm font-medium text-white"
            >
              Reservar cita
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}