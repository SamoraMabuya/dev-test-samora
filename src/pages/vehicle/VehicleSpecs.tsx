import {
  Calendar,
  Gauge,
  Settings,
  Fuel,
  Navigation2,
  CheckCircle2,
} from "lucide-react";

interface VehicleSpecsTypes {
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
}: VehicleSpecsTypes) {
  return (
    <div className="bg-gray-50 p-6 rounded">
      <h2 className="text-[#213740] font-semibold mb-4">
        Specification Summary
      </h2>
      <div className="flex flex-wrap">
        {/* Year */}
        <div className="spec-item">
          <Calendar className="spec-icon" />
          <span className="spec-text">{year}</span>
        </div>
        {/* Mileage */}
        <div className="spec-item">
          <Gauge className="spec-icon" />
          <span className="spec-text">{mileage}</span>
        </div>

        {/* Transmission */}
        <div className="spec-item">
          <Settings className="spec-icon" />
          <span className="spec-text">{transmission}</span>
        </div>

        {/* Fuel Type */}
        <div className="spec-item">
          <Fuel className="spec-icon" />
          <span className="spec-text">{fuelType}</span>
        </div>

        {/* Axle Config */}
        <div className="spec-item">
          <Navigation2 className="spec-icon" />
          <span className="spec-text">{axleConfig}</span>
        </div>
      </div>
      {/* Condition Badge */}
      <div className="spec-item">
        <CheckCircle2 className="spec-icon" />
        <span className="spec-text">{condition}condition</span>
      </div>
    </div>
  );
}
