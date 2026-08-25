export default function AboutSection() {
  return (
    <section className="overflow-hidden bg-neutral-100">
      <div className="grid lg:grid-cols-2">
        <div className="min-h-[500px]">
          <img
            src="https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=1200&q=85"
            alt="Interior del salón"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex items-center px-6 py-20 sm:px-12 lg:px-20">
          <div className="max-w-xl">
            <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
              Sobre nosotros
            </p>

            <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-tight text-neutral-950 sm:text-5xl">
              Un espacio para cuidar de ti.
            </h2>

            <div className="mt-7 space-y-5 text-base leading-7 text-neutral-600">
              <p>
                Creemos que acudir al salón debe ser mucho más que
                recibir un servicio.
              </p>

              <p>
                Queremos que cada visita sea un momento para relajarte,
                desconectar y disfrutar de una atención completamente
                personalizada.
              </p>

              <p>
                Nuestro equipo trabaja para ofrecerte resultados
                profesionales en un ambiente cercano y agradable.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-neutral-200 pt-8">
              <div>
                <strong className="text-3xl font-semibold text-neutral-950">
                  5+
                </strong>

                <p className="mt-1 text-xs text-neutral-500">
                  Años de experiencia
                </p>
              </div>

              <div>
                <strong className="text-3xl font-semibold text-neutral-950">
                  1K+
                </strong>

                <p className="mt-1 text-xs text-neutral-500">
                  Clientes
                </p>
              </div>

              <div>
                <strong className="text-3xl font-semibold text-neutral-950">
                  5★
                </strong>

                <p className="mt-1 text-xs text-neutral-500">
                  Valoración
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}