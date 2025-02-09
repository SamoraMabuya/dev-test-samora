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
}
export interface Dealer {
  id: string;
  name: string;
  location: string;
  phone: string;
  whatsapp?: string;
  distance?: number;
}

export interface VehicleSpecs {
  code: string;
  year: number;
  specs: Record<string, any>;
}

export interface RelatedVehicle {
  id: string;
  title: string;
  price: number;
  mileage: string;
  transmission: string;
  fuelType: string;
  image: string;
}

export interface VehicleSpecs {
  code: string;
  year: number;
  specs: Record<string, any>;
}

export interface LeadFormData {
  name: string;
  email: string;
  mobile: string;
  area: string;
  subscribe: {
    carAlerts: boolean;
    carNews: boolean;
  };
  vehicleId: string;
  dealerId: string;
}
