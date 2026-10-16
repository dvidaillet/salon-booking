
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";

const navigation = [
  { label: "Inicio", href: "/" },
  { label: "Servicios", href: "/services" },
  { label: "Contacto", href: "/#contacto" },
];

export default function Header() {
  const pathname = usePathname();
  const menuId = useId();
  const reduceMotion = useReducedMotion();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateScroll = () => {
      setScrolled(window.scrollY > 30);
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

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
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
        initial={
          reduceMotion ? false : { opacity: 0, y: -20 }
        }
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: reduceMotion ? 0 : 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "px-4 pt-3 lg:px-6"
            : "px-0 pt-0"
        }`}
      >
        <div
          className={`mx-auto transition-all duration-500 ${
            scrolled
              ? "max-w-7xl rounded-2xl border border-black/[0.06] bg-white/90 shadow-[0_10px_40px_rgba(0,0,0,0.07)] backdrop-blur-xl"
              : "max-w-full border-b border-black/[0.06] bg-white/90 backdrop-blur-md"
          }`}
        >
          <div
            className={`mx-auto flex items-center justify-between px-6 transition-all duration-500 lg:px-10 ${
              scrolled ? "h-16" : "h-20"
            }`}
          >
            {/* LOGOTIPO */}
            <Link
              href="/"
              onClick={closeMenu}
              aria-label={`${siteConfig.name} — Inicio`}
              className="group relative inline-flex items-center"
            >
              <span className="text-[18px] font-medium tracking-[0.28em] text-neutral-950">
                {siteConfig.shortName}
              </span>

              <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#a68c74] transition-all duration-500 group-hover:w-full" />
            </Link>

            {/* NAVEGACIÓN DESKTOP */}
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
                      className="group ml-2 inline-flex items-center gap-4 rounded-full bg-neutral-950 px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.13em] text-white transition-colors duration-300 hover:bg-[#a68c74]"
                    >
                      {item.label}

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
                    className={`group relative py-2 text-[11px] font-medium uppercase tracking-[0.15em] transition-colors duration-300 ${
                      active
                        ? "text-neutral-950"
                        : "text-neutral-500 hover:text-neutral-950"
                    }`}
                  >
                    {item.label}

                    <span
                      className={`absolute bottom-0 left-0 h-px bg-[#a68c74] transition-all duration-300 ${
                        active
                          ? "w-full"
                          : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* BOTÓN MÓVIL */}
            <button
              type="button"
              aria-label={
                menuOpen ? "Cerrar menú" : "Abrir menú"
              }
              aria-expanded={menuOpen}
              aria-controls={menuId}
              onClick={() => setMenuOpen((value) => !value)}
              className="relative flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white/60 transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a68c74] md:hidden"
            >
              <span className="relative block h-5 w-5">
                <motion.span
                  animate={
                    menuOpen
                      ? { rotate: 45, y: 9 }
                      : { rotate: 0, y: 3 }
                  }
                  transition={{
                    duration: reduceMotion ? 0 : 0.25,
                  }}
                  className="absolute left-0 top-0 h-px w-full bg-neutral-900"
                />

                <motion.span
                  animate={{
                    opacity: menuOpen ? 0 : 1,
                  }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.2,
                  }}
                  className="absolute left-0 top-[9px] h-px w-full bg-neutral-900"
                />

                <motion.span
                  animate={
                    menuOpen
                      ? { rotate: -45, y: -9 }
                      : { rotate: 0, y: -3 }
                  }
                  transition={{
                    duration: reduceMotion ? 0 : 0.25,
                  }}
                  className="absolute bottom-0 left-0 h-px w-full bg-neutral-900"
                />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      {/* MENÚ MÓVIL */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: reduceMotion ? 0 : 0.25,
              }}
              onClick={closeMenu}
              aria-hidden="true"
              className="fixed inset-0 z-40 bg-black/25 backdrop-blur-sm md:hidden"
            />

            <motion.div
              id={menuId}
              role="dialog"
              aria-modal="true"
              aria-label="Menú de navegación"
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, y: -16, scale: 0.98 }
              }
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -12,
                scale: 0.98,
              }}
              transition={{
                duration: reduceMotion ? 0 : 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`fixed inset-x-4 z-50 max-h-[calc(100dvh-110px)] overflow-y-auto rounded-3xl border border-black/[0.06] bg-[#faf8f5] p-6 shadow-[0_25px_80px_rgba(0,0,0,0.14)] md:hidden ${
                scrolled ? "top-[84px]" : "top-[96px]"
              }`}
            >
              <nav
                aria-label="Navegación móvil"
                className="flex flex-col"
              >
                {navigation.map((item, index) => {
                  const active = isActive(item.href);

                  return (
                    <motion.div
                      key={item.href}
                      initial={
                        reduceMotion
                          ? false
                          : { opacity: 0, x: -12 }
                      }
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: reduceMotion
                          ? 0
                          : 0.05 + index * 0.06,
                        duration: reduceMotion ? 0 : 0.3,
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={closeMenu}
                        aria-current={
                          active ? "page" : undefined
                        }
                        className={`group flex items-center justify-between border-b border-black/[0.07] py-5 transition-colors ${
                          active
                            ? "text-[#a68c74]"
                            : "text-neutral-800 hover:text-[#a68c74]"
                        }`}
                      >
                        <span className="text-xl font-light tracking-tight">
                          {item.label}
                        </span>

                        <ArrowUpRight
                          size={19}
                          strokeWidth={1.5}
                          className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                        />
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <div className="mt-8 flex items-center justify-between gap-4">
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-500">
                  {siteConfig.shortName}
                </span>

                <span className="text-[10px] uppercase tracking-[0.12em] text-neutral-400">
                  {siteConfig.tagline}
                </span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
