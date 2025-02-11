import Image from "next/image";
import Link from "next/link";
import { Gauge, Settings, Fuel } from "lucide-react";
import { RelatedVehicle } from "@/types";

interface RelatedVehiclesProps {
  vehicles: RelatedVehicle[];
  dealerName: string;
  dealerLocation: string;
}

export default function RelatedVehicles({
  vehicles,
  dealerName,
  dealerLocation,
}: RelatedVehiclesProps) {
  return (
    <div className="mt-6 space-y-4">
      <h3 className="text-lg font-semibold text-[#213740]">
        View more cars from {dealerName} {dealerLocation}
      </h3>

      <div className="space-y-4">
        {vehicles.map((vehicle) => (
          <Link
            href={`/vehicle/${vehicle.id}`}
            key={vehicle.id}
            className="flex gap-4 p-2 hover:bg-gray-50 rounded-lg transition-colors"
          >
            {/* Vehicle Image */}
            <div className="relative w-32 h-24 flex-shrink-0">
              <Image
                src={vehicle.image}
                alt={vehicle.title}
                fill
                className="object-cover rounded"
                sizes="128px"
              />
            </div>

            {/* Vehicle Details */}
            <div className="flex-grow">
              <h4 className="font-medium text-sm mb-1 line-clamp-2 text-[#213740]">
                {vehicle.title}
              </h4>
              <p className="text-red-600 font-bold mb-1">
                R {vehicle.price.toLocaleString()}
              </p>
              {/* Specs */}
              <div className="flex gap-4 text-xs text-[#666]">
                <span className="flex items-center gap-1">
                  <Gauge className="w-3 h-3" />
                  {vehicle.mileage}
                </span>
                <span className="flex items-center gap-1">
                  <Settings className="w-3 h-3" />
                  {vehicle.transmission}
                </span>
                <span className="flex items-center gap-1">
                  <Fuel className="w-3 h-3" />
                  {vehicle.fuelType}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <Link
        href="#"
        className="block text-center text-red-600 py-3 border border-red-600 rounded-lg hover:bg-red-50 transition-colors"
      >
        View all cars
      </Link>
    </div>
  );
}
