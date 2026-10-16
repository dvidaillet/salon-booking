"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";

const navigation = [
  { label: "Inicio", href: "/" },
  { label: "Servicios", href: "/services" },
  { label: "Contacto", href: "/#contacto" },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function Header() {
  const pathname = usePathname();
  const menuId = useId();
  const reduceMotion = useReducedMotion();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const isHome = pathname === "/";
  const transparent = isHome && !scrolled && !menuOpen;

  useEffect(() => {
    const updateScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    updateScroll();

    window.addEventListener("scroll", updateScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", updateScroll);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const menu = menuRef.current;
    const focusable = menu?.querySelectorAll<HTMLElement>(
      "a[href], button:not([disabled])",
    );

    const first = focusable?.[0];
    const last = focusable?.[focusable.length - 1];

    first?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        triggerRef.current?.focus();
      }

      if (event.key === "Tab" && first && last) {
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "/#contacto") return false;

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <motion.header
        initial={reduceMotion ? false : { opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: reduceMotion ? 0 : 0.7,
          ease,
        }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "px-3 pt-3 sm:px-5 lg:px-7" : "px-0 pt-0"
        }`}
      >
        <div
          className={`mx-auto transition-all duration-500 ${
            transparent
              ? "max-w-full border-b border-white/15 bg-transparent"
              : scrolled
                ? "max-w-7xl rounded-2xl border border-white/10 bg-[#11100f]/90 shadow-[0_15px_50px_rgba(0,0,0,0.25)] backdrop-blur-xl"
                : "max-w-full border-b border-white/10 bg-[#11100f]/95 backdrop-blur-xl"
          }`}
        >
          <div
            className={`mx-auto flex items-center justify-between px-6 transition-all duration-500 sm:px-10 lg:px-20 ${
              scrolled ? "h-[66px]" : "h-20"
            }`}
          >
            {/* LOGOTIPO */}
            <Link
              href="/"
              onClick={closeMenu}
              aria-label={`${siteConfig.name} — Inicio`}
              className="group relative z-10 inline-flex items-center"
            >
              <span className="text-[19px] font-medium tracking-[0.3em] text-white sm:text-[21px]">
                {siteConfig.shortName}
              </span>

              <span className="absolute -bottom-2 left-0 h-px w-0 bg-[#d6b79a] transition-all duration-500 group-hover:w-full" />
            </Link>

            {/* NAVEGACIÓN ESCRITORIO */}
            <nav
              aria-label="Navegación principal"
              className="hidden items-center gap-10 md:flex"
            >
              {navigation.map((item) => {
                const contact = item.href === "/#contacto";
                const active = isActive(item.href);

                if (contact) {
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="group inline-flex min-h-11 items-center gap-3 rounded-full border border-[#d6b79a]/60 px-5 py-2 text-[11px] font-medium uppercase tracking-[0.15em] text-[#e3c6a8] transition-all duration-300 hover:border-[#d6b79a] hover:bg-[#d6b79a] hover:text-[#11100f]"
                    >
                      Contacto
                      <ArrowUpRight
                        size={15}
                        strokeWidth={1.6}
                        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </Link>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`group relative py-3 text-[11px] font-medium uppercase tracking-[0.16em] transition-colors duration-300 ${
                      active
                        ? "text-[#d6b79a]"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    {item.label}

                    <span
                      className={`absolute bottom-1 left-0 h-px bg-[#d6b79a] transition-all duration-300 ${
                        active ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* BOTÓN MÓVIL */}
            <button
              ref={triggerRef}
              type="button"
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={menuOpen}
              aria-controls={menuId}
              onClick={() => setMenuOpen((value) => !value)}
              className="relative z-[60] flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:border-[#d6b79a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d6b79a] md:hidden"
            >
              <span className="sr-only">
                {menuOpen ? "Cerrar navegación" : "Abrir navegación"}
              </span>

              <span className="relative h-5 w-5">
                <motion.span
                  animate={
                    menuOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 4 }
                  }
                  transition={{
                    duration: reduceMotion ? 0 : 0.25,
                  }}
                  className="absolute left-0 top-0 h-px w-full bg-current"
                />

                <motion.span
                  animate={{ opacity: menuOpen ? 0 : 1 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.2,
                  }}
                  className="absolute left-0 top-[9px] h-px w-full bg-current"
                />

                <motion.span
                  animate={
                    menuOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: -4 }
                  }
                  transition={{
                    duration: reduceMotion ? 0 : 0.25,
                  }}
                  className="absolute bottom-0 left-0 h-px w-full bg-current"
                />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      {/* MENÚ MÓVIL A PANTALLA COMPLETA */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={menuRef}
            id={menuId}
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
            initial={reduceMotion ? false : { opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              duration: reduceMotion ? 0 : 0.45,
              ease,
            }}
            className="fixed inset-0 z-40 flex h-dvh flex-col overflow-y-auto bg-[#11100f] px-7 pb-8 pt-28 text-white sm:px-12 md:hidden"
          >
            <div className="mb-12 flex items-center gap-4">
              <span className="h-px w-10 bg-[#d6b79a]" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#d6b79a]">
                Explore Élite
              </span>
            </div>

            <nav
              aria-label="Navegación móvil"
              className="flex flex-1 flex-col justify-center"
            >
              {navigation.map((item, index) => {
                const active = isActive(item.href);

                return (
                  <motion.div
                    key={item.href}
                    initial={reduceMotion ? false : { opacity: 0, x: -25 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.5,
                      delay: reduceMotion ? 0 : index * 0.09,
                      ease,
                    }}
                    className="border-b border-white/15"
                  >
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      aria-current={active ? "page" : undefined}
                      className={`group flex min-h-20 items-center justify-between gap-4 py-5 text-[clamp(2.6rem,10vw,4.5rem)] font-light leading-none tracking-[-0.06em] transition-colors ${
                        active
                          ? "text-[#d6b79a]"
                          : "text-white hover:text-[#d6b79a]"
                      }`}
                    >
                      <span>{item.label}</span>

                      <ArrowUpRight
                        size={23}
                        strokeWidth={1.3}
                        className="shrink-0 text-[#d6b79a] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                      />
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <div className="mt-12 flex items-end justify-between gap-4 border-t border-white/15 pt-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#d6b79a]">
                  {siteConfig.shortName}
                </p>
                <p className="mt-2 text-sm font-light text-white/55">
                  {siteConfig.tagline}
                </p>
              </div>

              <span className="text-[9px] uppercase tracking-[0.2em] text-white/35">
                Beauty / Art
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
