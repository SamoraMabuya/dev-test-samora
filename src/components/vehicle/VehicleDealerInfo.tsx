// src/components/vehicle/DealerInfo.tsx
import { MapPin } from "lucide-react";

interface DealerInfoProps {
  name: string;
  location: string;
  distance: string;
}

export default function DealerInfo({
  name,
  location,
  distance,
}: DealerInfoProps) {
  return (
    <div className="border-t border-b border-gray-200 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[#213740] font-semibold">{name}</h3>
          <p className="text-[#666]">{location}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[#666] flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            {distance} away
          </span>
          <a href="#" className="text-[#EE1133] hover:underline">
            View Map
          </a>
        </div>
      </div>
    </div>
  );
}
