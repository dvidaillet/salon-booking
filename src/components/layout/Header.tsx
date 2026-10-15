"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { siteConfig } from "@/config/site";

const navigation = [
  {
    label: "Inicio",
    href: "/",
  },
  {
    label: "Servicios",
    href: "/services",
  },
  {
    label: "Contacto",
    href: "/#contacto",
  },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /*
   * Detectar scroll
   */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /*
   * Bloquear scroll cuando el menú móvil está abierto
   */

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{
          y: -20,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
          scrolled ? "px-4 pt-3 lg:px-6" : "px-0 pt-0"
        }`}
      >
        <div
          className={`mx-auto transition-all duration-700 ${
            scrolled
              ? "max-w-7xl rounded-2xl border border-black/[0.06] bg-white/85 shadow-[0_10px_40px_rgba(0,0,0,0.06)] backdrop-blur-xl"
              : "max-w-full border-b border-black/[0.06] bg-white/90 backdrop-blur-md"
          }`}
        >
          <div
            className={`mx-auto flex items-center justify-between px-6 transition-all duration-700 lg:px-10 ${
              scrolled ? "h-16" : "h-20"
            }`}
          >
            {/* ==================================================
                LOGO
            ================================================== */}

            <Link
              href="/"
              onClick={closeMenu}
              className="group relative flex items-center"
            >
              <span className="text-[18px] font-medium tracking-[0.28em] text-neutral-950">
                {siteConfig.shortName}
              </span>

              <span className="absolute -bottom-1 left-0 h-px w-0 bg-neutral-950 transition-all duration-500 group-hover:w-full" />
            </Link>

            {/* ==================================================
                DESKTOP NAVIGATION
            ================================================== */}

            <nav className="hidden items-center gap-10 md:flex">
              {navigation.map((item) => {
                const isBooking = item.href === "/#contacto";

                if (isBooking) {
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="group relative ml-2 flex items-center gap-4 overflow-hidden rounded-full bg-neutral-950 px-5 py-2.5 text-[12px] font-medium uppercase tracking-[0.12em] text-white transition-all duration-500 hover:bg-neutral-800"
                    >
                      <span className="relative z-10">{item.label}</span>

                      <span className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full bg-white/10">
                        <span className="block h-1.5 w-1.5 rounded-full bg-white transition-transform duration-500 group-hover:scale-125" />
                      </span>
                    </Link>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group relative py-2 text-[12px] font-medium uppercase tracking-[0.14em] text-neutral-500 transition-colors duration-300 hover:text-neutral-950"
                  >
                    {item.label}

                    <span className="absolute bottom-0 left-0 h-px w-0 bg-neutral-950 transition-all duration-500 group-hover:w-full" />
                  </Link>
                );
              })}
            </nav>

            {/* ==================================================
                MOBILE BUTTON
            ================================================== */}

            <button
              type="button"
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((value) => !value)}
              className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white/50 md:hidden"
            >
              <span className="relative flex h-4 w-5 flex-col justify-between">
                <motion.span
                  animate={
                    menuOpen
                      ? {
                          y: 7,
                          rotate: 45,
                        }
                      : {
                          y: 0,
                          rotate: 0,
                        }
                  }
                  transition={{
                    duration: 0.35,
                  }}
                  className="absolute left-0 top-0 h-px w-full bg-neutral-900"
                />

                <motion.span
                  animate={
                    menuOpen
                      ? {
                          opacity: 0,
                          x: 8,
                        }
                      : {
                          opacity: 1,
                          x: 0,
                        }
                  }
                  transition={{
                    duration: 0.25,
                  }}
                  className="absolute left-0 top-[7px] h-px w-full bg-neutral-900"
                />

                <motion.span
                  animate={
                    menuOpen
                      ? {
                          y: 7,
                          rotate: -45,
                        }
                      : {
                          y: 14,
                          rotate: 0,
                        }
                  }
                  transition={{
                    duration: 0.35,
                  }}
                  className="absolute left-0 top-0 h-px w-full bg-neutral-900"
                />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      {/* ======================================================
          MOBILE MENU
      ======================================================= */}

      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 0.4,
              }}
              onClick={closeMenu}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
            />

            {/* Menu */}

            <motion.div
              initial={{
                opacity: 0,
                y: -20,
                scale: 0.98,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -20,
                scale: 0.98,
              }}
              transition={{
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="fixed inset-x-4 top-[88px] z-50 overflow-hidden rounded-3xl border border-black/[0.06] bg-[#fafaf9]/95 p-6 shadow-[0_25px_80px_rgba(0,0,0,0.12)] backdrop-blur-xl md:hidden"
            >
              <nav className="flex flex-col">
                {navigation.map((item, index) => {
                  const isBooking = item.href === "/booking";

                  return (
                    <motion.div
                      key={item.href}
                      initial={{
                        opacity: 0,
                        x: -15,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay: 0.08 + index * 0.06,
                        duration: 0.4,
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={closeMenu}
                        className={`group flex items-center justify-between border-b border-black/[0.07] py-5 ${
                          isBooking ? "text-neutral-950" : "text-neutral-600"
                        }`}
                      >
                        <span className="text-lg font-light tracking-tight">
                          {item.label}
                        </span>

                        <span className="text-sm text-neutral-400 transition-transform duration-300 group-hover:translate-x-1">
                          ↗
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Bottom information */}

              <div className="mt-8 flex items-center justify-between">
                <span className="text-[9px] uppercase tracking-[0.25em] text-neutral-400">
                  Beauty & Care
                </span>

                <span className="text-[9px] uppercase tracking-[0.25em] text-neutral-400">
                  Est. 2026
                </span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
