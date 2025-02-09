// src/components/vehicle/VehicleDetails.tsx
import { Vehicle } from "@/types";
import {
  Calendar,
  Gauge,
  Settings,
  Fuel,
  Navigation2,
  CheckCircle2,
} from "lucide-react";

interface Props {
  vehicle: Vehicle;
}

export default function VehicleDetails({ vehicle }: Props) {
  return (
    <div className="space-y-6">
      {/* Specification Summary */}
      <div className="bg-white p-6 rounded">
        <h2 className="text-[#213740] text-lg font-semibold mb-4">
          Specification Summary
        </h2>
        <div className="flex flex-wrap gap-3 mb-3">
          <div className="inline-flex items-center bg-[#F1F3F5] px-3 py-2 rounded-md text-[#303131]">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{vehicle.year}</span>
          </div>
          <div className="inline-flex items-center bg-[#F1F3F5] px-3 py-2 rounded-md text-[#303131]">
            <Gauge className="w-4 h-4 mr-2" />
            <span>{vehicle.mileage}</span>
          </div>
          <div className="inline-flex items-center bg-[#F1F3F5] px-3 py-2 rounded-md text-[#303131]">
            <Settings className="w-4 h-4 mr-2" />
            <span>{vehicle.transmission}</span>
          </div>
          <div className="inline-flex items-center bg-[#F1F3F5] px-3 py-2 rounded-md text-[#303131]">
            <Fuel className="w-4 h-4 mr-2" />
            <span>{vehicle.fuelType}</span>
          </div>
          <div className="inline-flex items-center bg-[#F1F3F5] px-3 py-2 rounded-md text-[#303131]">
            <Navigation2 className="w-4 h-4 mr-2" />
            <span>{vehicle.axleConfig}</span>
          </div>
        </div>
        {vehicle.condition && (
          <div className="mt-3">
            <div className="inline-flex items-center text-[#303131] gap-1">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span>{vehicle.condition} condition</span>
            </div>
          </div>
        )}
      </div>

      {/* Dealer Information */}
      <div className="border-t border-b border-gray-200 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[#213740] font-semibold text-lg">
              {vehicle.agentName}
            </h3>
            <p className="text-[#666]">{vehicle.agentLocality}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#666]">{vehicle.dealerDistance} away</span>
            <a href="#" className="text-red-600 hover:text-red-700">
              View Map
            </a>
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <h2 className="text-[#213740] text-lg font-semibold mb-3">
          Description:
        </h2>
        <p className="text-[#666] mb-2">
          This vehicle will be certified as roadworthy by the dealer.
        </p>
        <p className="text-[#666] text-sm">Reference: {vehicle.reference}</p>
      </div>

      {/* Options */}
      <div className="border-t border-gray-200 pt-4">
        <h2 className="text-[#213740] text-lg font-semibold mb-3">Options:</h2>
        <p className="text-[#666]">{vehicle.options}</p>
      </div>

      {/* Finance Availability */}
      <div className="border-t border-gray-200 pt-4">
        <h2 className="text-[#213740] text-lg font-semibold mb-3">
          Finance Availability:
        </h2>
        <p className="text-[#666]">
          This vehicle does not qualify for vehicle asset finance. Please
          contact the dealership directly to find out more.
        </p>
      </div>
    </div>
  );
}
