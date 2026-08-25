import { Service } from "@/types/service";

export const services: Service[] = [
  {
    id: "corte",
    name: "Corte de cabello",
    description: "Corte personalizado según tu estilo.",
    longDescription:
      "Disfruta de una experiencia personalizada con asesoramiento profesional para encontrar el corte que mejor se adapte a tu estilo y personalidad.",
    price: 35,
    duration: 60,
    category: "Cabello",
    image:
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=900&q=80",
    featured: true,
  },

  {
    id: "coloracion",
    name: "Coloración",
    description: "Color profesional y personalizado.",
    longDescription:
      "Trabajamos el color para conseguir un resultado natural y duradero, utilizando técnicas adaptadas a las características de tu cabello.",
    price: 65,
    duration: 120,
    category: "Cabello",
    image:
      "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=900&q=80",
    featured: true,
  },

  {
    id: "manicura",
    name: "Manicura",
    description: "Cuida tus manos con un acabado perfecto.",
    longDescription:
      "Tratamiento completo para tus manos que incluye cuidado de uñas, cutículas y un acabado profesional.",
    price: 25,
    duration: 45,
    category: "Uñas",
    image:
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=900&q=80",
    featured: true,
  },

  {
    id: "pedicura",
    name: "Pedicura",
    description: "Bienestar y cuidado para tus pies.",
    longDescription:
      "Un tratamiento pensado para cuidar tus pies, mantener tus uñas saludables y disfrutar de un momento de relajación.",
    price: 30,
    duration: 60,
    category: "Uñas",
    image:
      "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=900&q=80",
  },

  {
    id: "peinado",
    name: "Peinado",
    description: "Un look perfecto para cualquier ocasión.",
    longDescription:
      "Creamos un peinado adaptado a tu estilo, ocasión y tipo de cabello para conseguir un acabado elegante y duradero.",
    price: 30,
    duration: 45,
    category: "Cabello",
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80",
  },

  {
    id: "tratamiento",
    name: "Tratamiento capilar",
    description: "Recupera la salud y vitalidad de tu cabello.",
    longDescription:
      "Tratamiento profesional diseñado para mejorar la hidratación, textura y apariencia general del cabello.",
    price: 45,
    duration: 60,
    category: "Tratamientos",
    image:
      "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=900&q=80",
  },
];