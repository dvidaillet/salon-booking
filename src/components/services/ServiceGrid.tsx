"use client";

import { motion } from "motion/react";
import { Service } from "@/types/service";
import ServiceCard from "./ServiceCard";

interface ServiceGridProps {
  services: Service[];
}

export default function ServiceGrid({ services }: ServiceGridProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.08,
      }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.12,
          },
        },
      }}
      className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16"
    >
      {services.map((service) => (
        <motion.div
          key={service.id}
          variants={{
            hidden: {
              opacity: 0,
              y: 40,
            },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              },
            },
          }}
        >
          <ServiceCard service={service} />
        </motion.div>
      ))}
    </motion.div>
  );
}