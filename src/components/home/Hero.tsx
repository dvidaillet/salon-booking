import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-neutral-950 text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=2000&q=85')",
        }}
      />

      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 flex min-h-[calc(100vh-80px)] items-center">
        <div className="mx-auto w-full max-w-7xl px-6 py-24">
          <div className="max-w-3xl">
            <p className="mb-6 text-sm uppercase tracking-[0.35em] text-white/70">
              Belleza · Cuidado · Bienestar
            </p>

            <h1 className="text-5xl font-light leading-[1.05] tracking-tight sm:text-6xl lg:text-8xl">
              Tu belleza.
              <br />
              <span className="font-semibold">
                Tu momento.
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-base leading-7 text-white/80 sm:text-lg">
              Descubre un espacio pensado para cuidar de ti,
              relajarte y disfrutar de una experiencia de belleza
              personalizada.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/booking"
                className="rounded-full bg-white px-8 py-4 text-center text-sm font-medium text-neutral-950 transition hover:bg-neutral-200"
              >
                Reservar cita
              </Link>

              <Link
                href="/services"
                className="rounded-full border border-white/40 bg-white/10 px-8 py-4 text-center text-sm font-medium text-white backdrop-blur transition hover:bg-white/20"
              >
                Descubrir servicios
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center">
        <span className="text-xs uppercase tracking-[0.3em] text-white/60">
          Descubre
        </span>

        <div className="mx-auto mt-3 h-10 w-px bg-white/40" />
      </div>
    </section>
  );
}