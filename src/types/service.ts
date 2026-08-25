export interface Service {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  duration: number;
  category: string;
  image: string;
  featured?: boolean;
}