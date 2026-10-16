
"use client";

import { motion, useReducedMotion } from "motion/react";
import type { Service } from "@/types/service";
import ServiceCard from "./ServiceCard";

interface ServiceGridProps {
  services: Service[];
}

const ease = [0.22, 1, 0.36, 1] as const;

export default function ServiceGrid({
  services,
}: ServiceGridProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="grid grid-cols-1 gap-x-5 gap-y-14 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-16 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-20">
      {services.map((service, index) => (
        <motion.div
          key={service.id}
          initial={
            reduceMotion ? false : { opacity: 0, y: 35 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{
            duration: reduceMotion ? 0 : 0.8,
            delay: reduceMotion ? 0 : (index % 3) * 0.08,
            ease,
          }}
          className="min-w-0"
        >
          <ServiceCard
            service={service}
            index={index}
          />
        </motion.div>
      ))}
    </div>
  );
}
