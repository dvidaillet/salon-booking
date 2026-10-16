
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";

const navigation = [
  { label: "Inicio", href: "/" },
  { label: "Servicios", href: "/services" },
  { label: "Contacto", href: "/#contacto" },
];

export default function Footer() {
  const { contact, social } = siteConfig;

  const phone = contact.phone.trim();
  const email = contact.email.trim();
  const address = contact.address.trim();
  const whatsapp = contact.whatsapp.replace(/\D/g, "");

  const socialLinks = [
    { label: "Instagram", href: social.instagram },
    { label: "Facebook", href: social.facebook },
    { label: "TikTok", href: social.tiktok },
  ].filter((item) => /^https?:\/\//i.test(item.href));

  const hasContact = Boolean(phone || email || address || whatsapp);

  return (
    <footer
      id="contacto"
      aria-labelledby="footer-title"
      className="scroll-mt-24 overflow-hidden border-t border-white/10 bg-[#090909] px-6 pb-8 pt-20 text-white sm:px-10 sm:pt-28 lg:px-16"
    >
      <div className="mx-auto max-w-[1450px]">
        {/* ENCABEZADO */}
        <div className="grid gap-12 border-b border-white/15 pb-16 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20 lg:pb-24">
          <div>
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-[#d6b79a]" />

              <span className="text-[10px] uppercase tracking-[0.3em] text-[#d6b79a]">
                Stay Beautiful
              </span>
            </div>

            <h2
              id="footer-title"
              className="mt-8 max-w-3xl text-[clamp(2.6rem,6vw,6rem)] font-light leading-[0.95] tracking-[-0.06em]"
            >
              La belleza empieza
              <span className="mt-2 block italic text-[#d6b79a]">
                contigo.
              </span>
            </h2>

            <p className="mt-7 max-w-md text-sm font-light leading-8 text-white/55">
              Un espacio dedicado al estilo, el cuidado
              personal y esos momentos que merecen
              ser solo tuyos.
            </p>
          </div>

          {/* NAVEGACIÓN Y CONTACTO */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:gap-x-10">
            <nav aria-label="Navegación del pie de página">
              <h3 className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#d6b79a]">
                Explorar
              </h3>

              <ul className="mt-7 space-y-5">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="inline-flex min-h-7 items-center text-sm font-light text-white/65 transition-colors hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h3 className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#d6b79a]">
                Contacto
              </h3>

              {hasContact ? (
                <div className="mt-7 space-y-5">
                  {phone && (
                    <a
                      href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                      className="block break-words text-sm font-light text-white/65 transition-colors hover:text-white"
                    >
                      {phone}
                    </a>
                  )}

                  {email && (
                    <a
                      href={`mailto:${email}`}
                      className="block break-all text-sm font-light text-white/65 transition-colors hover:text-white"
                    >
                      {email}
                    </a>
                  )}

                  {whatsapp && (
                    <a
                      href={`https://wa.me/${whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-light text-white/65 transition-colors hover:text-white"
                    >
                      WhatsApp
                      <ArrowUpRight size={14} />
                    </a>
                  )}

                  {address && (
                    <p className="text-sm font-light leading-7 text-white/65">
                      {address}
                    </p>
                  )}
                </div>
              ) : (
                <p className="mt-7 max-w-[180px] text-sm font-light leading-7 text-white/50">
                  Información de contacto próximamente.
                </p>
              )}

              {socialLinks.length > 0 && (
                <div className="mt-8 flex flex-col gap-4">
                  {socialLinks.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs text-white/60 transition-colors hover:text-[#d6b79a]"
                    >
                      {item.label}
                      <ArrowUpRight size={13} />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* LOGOTIPO GIGANTE */}
        <div className="overflow-hidden border-b border-white/15 py-10 sm:py-14">
          <Link
            href="/"
            aria-label={`${siteConfig.name} — Volver al inicio`}
            className="block w-full"
          >
            <span className="block text-center text-[clamp(4.4rem,19vw,19rem)] font-medium leading-[0.85] tracking-[-0.09em] text-white transition-colors duration-500 hover:text-[#d6b79a]">
              {siteConfig.shortName}
            </span>
          </Link>
        </div>

        {/* BARRA INFERIOR */}
        <div className="flex flex-col gap-6 pt-8 text-[10px] uppercase tracking-[0.16em] text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {siteConfig.name}
          </span>

          <span className="text-[#d6b79a]/80">
            {siteConfig.tagline}
          </span>

          <a
            href="#"
            className="inline-flex min-h-8 items-center gap-2 transition-colors hover:text-white"
          >
            Volver arriba
            <ArrowUpRight size={14} strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </footer>
  );
}
