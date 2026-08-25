import Link from "next/link";

export default function BookingCTA() {
  return (
    <section className="relative overflow-hidden bg-neutral-100 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
          Tu próximo momento
        </p>

        <h2 className="mt-5 text-4xl font-semibold tracking-tight text-neutral-950 sm:text-6xl">
          ¿Nos vemos pronto?
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-neutral-600">
          Elige tu servicio, selecciona el día y encuentra el horario
          que mejor se adapte a ti.
        </p>

        <Link
          href="/booking"
          className="mt-10 inline-flex rounded-full bg-neutral-950 px-9 py-4 text-sm font-medium text-white transition hover:bg-neutral-800"
        >
          Reservar mi cita
        </Link>
      </div>
    </section>
  );
}