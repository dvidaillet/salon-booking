
"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

interface AnimatedImageProps {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}

export default function AnimatedImage({
  src,
  alt,
  sizes = "(max-width: 640px) 100vw, 50vw",
  priority = false,
  className = "",
}: AnimatedImageProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { scale: 1.06 }}
      whileInView={{ scale: 1 }}
      whileHover={reduceMotion ? undefined : { scale: 1.04 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: reduceMotion ? 0 : 1.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="absolute inset-0"
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={`object-cover ${className}`}
      />
    </motion.div>
  );
}
