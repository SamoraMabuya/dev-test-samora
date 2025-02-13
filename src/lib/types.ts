import { RelatedVehicle } from "@/types";

export interface VehicleResponse {
  data: {
    data: Array<{
      type: string;
      id: string;
      attributes: {
        agent_name: string;
        agent_locality: string;
        body_type: string;
        condition: string;
        description: string;
        fuel_type: string;
        image: {
          version: number;
          count: number;
          path: string;
          name: string;
          extension: string;
        };
        make: string;
        mileage: string;
        model: string;
        price: number;
        province: string;
        reference: string;
        title: string;
        transmission: string;
        variant: string;
        year: number;
        code: string;
        vehicle_axle_config: string;
        options: string;
      };
      relationships: {
        seller: {
          data: {
            type: string;
            id: string;
          };
        };
      };
    }>;
    included: Array<{
      type: string;
      id: string;
      attributes: {
        name: string;
        seller_type: string;
        locality: string;
        province: string;
      };
    }>;
  };
}

export interface Vehicle {
  id: string;
  title: string;
  price: number;
  year: number;
  mileage: string;
  transmission: string;
  fuelType: string;
  condition: string;
  description: string;
  reference: string;
  agentName: string;
  agentLocality: string;
  images: string[];
  axleConfig: string;
  options: string;
  dealerId: string;
  dealerDistance?: string;
  relatedVehicles?: RelatedVehicle[];
  code: string;
}

export interface DealerVehiclesResponse {
  data: {
    data: Array<{
      type: string;
      id: string;
      attributes: {
        title: string;
        price: number;
        mileage: string;
        transmission: string;
        fuel_type: string;
        image: {
          name: string;
          version: number;
        };
      };
    }>;
  };
}

interface SpecAttribute {
  label: string;
  value: string;
}

interface SpecSection {
  title: string | null;
  attrs: SpecAttribute[];
}

export interface VehicleSpecsResponse {
  data: {
    data: SpecSection[][];
  };
}
