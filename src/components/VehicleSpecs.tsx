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
      <h2 className="text-[#213740] font-semibold text-xl mb-6">
        Specification Summary
      </h2>

      {/* Basic Specs */}
      <div className="flex flex-wrap">
        <div className="spec-item">
          <Calendar className="spec-icon" />
          <span className="spec-text">{year}</span>
        </div>
        <div className="spec-item">
          <Gauge className="spec-icon" />
          <span className="spec-text">{mileage}</span>
        </div>
        <div className="spec-item">
          <Settings className="spec-icon" />
          <span className="spec-text">{transmission}</span>
        </div>
        <div className="spec-item">
          <Fuel className="spec-icon" />
          <span className="spec-text">{fuelType}</span>
        </div>
        <div className="spec-item">
          <Navigation2 className="spec-icon" />
          <span className="spec-text">{axleConfig}</span>
        </div>
        <div className="spec-item">
          <CheckCircle2 className="spec-icon" />
          <span className="spec-text">{condition} condition</span>
        </div>
      </div>
    </div>
  );
}
