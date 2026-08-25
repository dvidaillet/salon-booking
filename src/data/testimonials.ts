export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  comment: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "María",
    rating: 5,
    comment:
      "Una experiencia increíble. El trato fue excelente y salí encantada con el resultado.",
  },
  {
    id: "2",
    name: "Laura",
    rating: 5,
    comment:
      "El salón es precioso y el servicio fue exactamente lo que esperaba. Volveré sin duda.",
  },
  {
    id: "3",
    name: "Sofía",
    rating: 5,
    comment:
      "Profesionales, amables y muy atentos. Me encantó el resultado.",
  },
];