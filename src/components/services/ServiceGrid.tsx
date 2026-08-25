import { Service } from "@/types/service";
import ServiceCard from "./ServiceCard";

interface ServiceGridProps {
  services: Service[];
}

export default function ServiceGrid({
  services,
}: ServiceGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          service={service}
        />
      ))}
    </div>
  );
}