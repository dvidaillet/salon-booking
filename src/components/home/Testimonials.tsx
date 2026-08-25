import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  return (
    <section className="bg-neutral-950 px-6 py-24 text-white sm:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
            Experiencias
          </p>

          <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Lo que dicen nuestros clientes
          </h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.id}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-7"
            >
              <div className="text-lg tracking-[0.15em]">
                {"★".repeat(testimonial.rating)}
              </div>

              <p className="mt-6 min-h-24 text-base leading-7 text-white/70">
                “{testimonial.comment}”
              </p>

              <div className="mt-7 border-t border-white/10 pt-5">
                <p className="text-sm font-medium">
                  {testimonial.name}
                </p>

                <p className="mt-1 text-xs text-white/40">
                  Cliente verificado
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}