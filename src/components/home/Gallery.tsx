
"use client";

import { motion } from "motion/react";
import AnimatedImage from "@/components/ui/AnimatedImage";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1000&q=85",
    alt: "Inspiración de peluquería y coloración",
    label: "Cabello",
  },
  {
    src: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1000&q=85",
    alt: "Inspiración de manicura",
    label: "Manicura",
  },
  {
    src: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1000&q=85",
    alt: "Inspiración de corte y estilismo",
    label: "Estilo",
  },
  {
    src: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=1000&q=85",
    alt: "Inspiración de cuidado de uñas",
    label: "Bienestar",
  },
];

export default function Gallery() {
  return (
    <section className="overflow-hidden bg-[#faf8f5] px-6 py-24 sm:py-32 lg:px-10 lg:py-40">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-14 flex flex-col justify-between gap-7 lg:mb-20 lg:flex-row lg:items-end"
        >
          <div>
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-neutral-300" />
              <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-neutral-500">
                Universo Élite
              </span>
            </div>

            <h2 className="mt-6 text-4xl font-light leading-tight tracking-[-0.045em] text-neutral-950 sm:text-5xl lg:text-6xl">
              Belleza que
              <span className="block font-medium italic text-[#a68c74]">
                inspira.
              </span>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-7 text-neutral-500">
            Una selección de imágenes de inspiración que refleja
            nuestra visión de la belleza, el estilo y el cuidado
            personal.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.src}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
              }}
              className="group relative aspect-[3/4] overflow-hidden bg-neutral-200"
            >
              <AnimatedImage
                src={image.src}
                alt={image.alt}
                sizes="(max-width: 767px) 50vw, 25vw"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

              <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                <span className="text-[9px] uppercase tracking-[0.25em] text-white/75">
                  Inspiración
                </span>

                <p className="mt-2 text-lg font-light text-white sm:text-xl">
                  {image.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mt-6 text-xs leading-6 text-neutral-400">
          Imágenes ilustrativas de referencia. No representan
          necesariamente instalaciones ni trabajos realizados
          por el salón.
        </p>
      </div>
    </section>
  );
}
