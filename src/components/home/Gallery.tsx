"use client";

import { motion } from "motion/react";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1000&q=85",
    alt: "Trabajo de coloración",
  },
  {
    src: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1000&q=85",
    alt: "Manicura",
  },
  {
    src: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1000&q=85",
    alt: "Corte de cabello",
  },
  {
    src: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=1000&q=85",
    alt: "Pedicura",
  },
];

export default function Gallery() {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl">

        {/* =====================================================
            SECTION HEADER
        ====================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-14 flex flex-col gap-5 sm:mb-16 sm:flex-row sm:items-end sm:justify-between lg:mb-20"
        >
          <div>
            {/* Eyebrow */}

            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-neutral-300" />

              <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-neutral-500 sm:text-xs">
                Nuestro trabajo
              </p>
            </div>

            {/* Title */}

            <h2 className="mt-5 text-4xl font-light leading-[1.05] tracking-[-0.04em] text-neutral-950 sm:text-5xl lg:text-6xl">
              Inspiración
            </h2>
          </div>

          {/* Description */}

          <p className="max-w-sm text-sm leading-7 text-neutral-500 sm:text-right sm:text-base">
            Una selección de nuestros trabajos y algunos de los
            detalles que hacen especial cada resultado.
          </p>
        </motion.div>

        {/* =====================================================
            GALLERY
        ====================================================== */}

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.src}
              initial={{
                opacity: 0,
                y: 45,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.8,
                delay: index * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative aspect-[3/4] overflow-hidden bg-neutral-100"
            >
              {/* Image */}

              <motion.img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                initial={{
                  scale: 1.08,
                }}
                whileInView={{
                  scale: 1,
                }}
                whileHover={{
                  scale: 1.06,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 1.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="h-full w-full object-cover"
              />

              {/* Overlay */}

              <div className="absolute inset-0 bg-black/0 transition-all duration-700 group-hover:bg-black/15" />

              {/* Image label */}

              <div className="absolute inset-x-0 bottom-0 translate-y-2 p-5 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-white">
                  {image.alt}
                </p>
              </div>

              {/* Number */}

              <div className="absolute right-4 top-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <span className="text-[10px] font-medium tracking-[0.2em] text-white">
                  0{index + 1}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* =====================================================
            BOTTOM LINE
        ====================================================== */}

        <motion.div
          initial={{
            scaleX: 0,
            transformOrigin: "left",
          }}
          whileInView={{
            scaleX: 1,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 1,
            delay: 0.3,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-10 h-px w-full bg-neutral-200"
        />
      </div>
    </section>
  );
}

