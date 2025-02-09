// src/components/vehicle/VehicleSpecs.tsx
import {
  Calendar,
  Gauge,
  Settings,
  Fuel,
  Navigation2,
  CheckCircle2,
} from "lucide-react";

interface VehicleSpecsProps {
  year: number;
  mileage: string;
  transmission: string;
  fuelType: string;
  axleConfig: string;
  condition: string;
}

export default function VehicleSpecs({
  year,
  mileage,
  transmission,
  fuelType,
  axleConfig,
  condition,
}: VehicleSpecsProps) {
  return (
    <div className="bg-gray-50 p-6 rounded">
      <h2 className="text-[#213740] font-semibold mb-4">
        Specification Summary
      </h2>
      <div className="flex flex-wrap">
        {/* Year */}
        <div className="flex items-center bg-[#F1F3F5] rounded-md px-3 py-2 mr-3 mb-3">
          <Calendar className="w-4 h-4 text-[#303131] mr-2" />
          <span className="text-[#303131]">{year}</span>
        </div>

        {/* Mileage */}
        <div className="flex items-center bg-[#F1F3F5] rounded-md px-3 py-2 mr-3 mb-3">
          <Gauge className="w-4 h-4 text-[#303131] mr-2" />
          <span className="text-[#303131]">{mileage}</span>
        </div>

        {/* Transmission */}
        <div className="flex items-center bg-[#F1F3F5] rounded-md px-3 py-2 mr-3 mb-3">
          <Settings className="w-4 h-4 text-[#303131] mr-2" />
          <span className="text-[#303131]">{transmission}</span>
        </div>

        {/* Fuel Type */}
        <div className="flex items-center bg-[#F1F3F5] rounded-md px-3 py-2 mr-3 mb-3">
          <Fuel className="w-4 h-4 text-[#303131] mr-2" />
          <span className="text-[#303131]">{fuelType}</span>
        </div>

        {/* Axle Config */}
        <div className="flex items-center bg-[#F1F3F5] rounded-md px-3 py-2 mr-3 mb-3">
          <Navigation2 className="w-4 h-4 text-[#303131] mr-2" />
          <span className="text-[#303131]">{axleConfig}</span>
        </div>
      </div>

      {/* Condition Badge */}
      {condition && (
        <div className="mt-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[#E8F5E9] text-[#2E7D32]">
            <CheckCircle2 className="w-4 h-4 mr-1" />
            {condition} condition
          </span>
        </div>
      )}
    </div>
  );
}
