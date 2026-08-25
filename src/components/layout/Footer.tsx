export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-3">
        <div>
          <h2 className="text-lg font-semibold tracking-[0.2em]">
            SALON
          </h2>

          <p className="mt-4 max-w-sm text-sm leading-6 text-neutral-400">
            Un espacio dedicado al cuidado, la belleza y el bienestar.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider">
            Horario
          </h3>

          <div className="mt-4 space-y-2 text-sm text-neutral-400">
            <p>Lunes - Viernes: 09:00 - 19:00</p>
            <p>Sábado: 09:00 - 14:00</p>
            <p>Domingo: Cerrado</p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider">
            Contacto
          </h3>

          <div className="mt-4 space-y-2 text-sm text-neutral-400">
            <p>+34 600 000 000</p>
            <p>info@salon.com</p>
            <p>Madrid, España</p>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-800 px-6 py-5 text-center text-xs text-neutral-500">
        © {new Date().getFullYear()} Salon. Todos los derechos reservados.
      </div>
    </footer>
  );
}
