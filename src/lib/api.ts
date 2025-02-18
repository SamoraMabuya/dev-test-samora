import { LeadFormData, RelatedVehicle } from "@/types";
import {
  DealerVehiclesResponse,
  VehicleSpecsResponse,
  VehicleResponse,
} from "./types";

const API_BASE = "https://nextjs-rho-red-22.vercel.app/api";

const fetchWithCache = async (url: string, options: RequestInit = {}) => {
  const res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      "Cache-Control": "public, max-age=300", // Cache for 5 minutes
    },
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res;
};

export interface LeadResponse {
  success: boolean;
  message?: string;
}

// Fetch a list of vehicles by the given dealer
export const fetchDealerVehicles = async (
  dealerId: string,
  excludeVehicleId: string,
  limit?: number
): Promise<RelatedVehicle[]> => {
  try {
    const res = await fetch(`${API_BASE}/vehicle?dealer_id=${dealerId}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch dealer vehicles: ${res.status}`);
    }

    const data: DealerVehiclesResponse = await res.json();
    const filteredVehicles = data.data.data
      .filter((vehicle) => vehicle.id !== excludeVehicleId)
      .map((vehicle) => ({
        id: vehicle.id,
        title: vehicle.attributes.title,
        price: vehicle.attributes.price,
        mileage: vehicle.attributes.mileage,
        transmission: vehicle.attributes.transmission,
        fuelType: vehicle.attributes.fuel_type,
        image: `https://img-ik.cars.co.za/ik-seo/carsimages/tr:n-stock_thumb/${
          vehicle.id
        }/${encodeURIComponent(vehicle.attributes.title)}.jpg?v=${
          vehicle.attributes.image.version
        }`,
      }));

    return limit ? filteredVehicles.slice(0, limit) : filteredVehicles;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to fetch dealer vehicles"
    );
  }
};

// Fetch specs for a given vehicle code and year

export const fetchVehicleSpecs = async (
  code: string,
  year: number
): Promise<VehicleSpecsResponse> => {
  try {
    const res = await fetch(`${API_BASE}/specs/${code}/${year}`);
    if (!res.ok) throw new Error("Failed to fetch vehicle specs");
    return await res.json();
  } catch (error) {
    console.error("Error fetching vehicle specs:", error);
    throw error;
  }
};

// Fetch given vehicle by it's id
export const fetchVehicle = async (id: string) => {
  try {
    const res = await fetch(`${API_BASE}/vehicle/${id}`);
    if (!res.ok) throw new Error("Failed to fetch vehicle");

    const responseData: VehicleResponse = await res.json();

    const vehicleData = responseData.data.data[0];
    const dealerId = vehicleData.relationships.seller.data.id;

    // Pass the current vehicle ID to exclude it from related vehicles
    const relatedVehicles = await fetchDealerVehicles(dealerId, id, 4);

    return {
      id: vehicleData.id,
      title: vehicleData.attributes.title,
      price: vehicleData.attributes.price,
      year: vehicleData.attributes.year,
      mileage: vehicleData.attributes.mileage,
      transmission: vehicleData.attributes.transmission,
      fuelType: vehicleData.attributes.fuel_type,
      condition: vehicleData.attributes.condition,
      description: vehicleData.attributes.description,
      reference: vehicleData.attributes.reference,
      agentName: vehicleData.attributes.agent_name,
      agentLocality: vehicleData.attributes.agent_locality,
      axleConfig: vehicleData.attributes.vehicle_axle_config,
      options: vehicleData.attributes.options,
      code: vehicleData.attributes.code,
      dealerId,
      relatedVehicles,
      images: (() => {
        const imageCount = vehicleData.attributes.image.count;
        const imageVersion = vehicleData.attributes.image.version;
        const imageId = vehicleData.attributes.image.name;
        const title = encodeURIComponent(vehicleData.attributes.title);

        return Array(imageCount)
          .fill(null)
          .map(
            (_, index) =>
              `https://img-ik.cars.co.za/ik-seo/carsimages/tr:n-stock_large/${imageId}_${
                index + 1
              }/${title}.jpg?v=${imageVersion}`
          );
      })(),
    };
  } catch (error) {
    console.error("Error fetching vehicle:", error);
    throw error;
  }
};

// Fetch dealer contact info
export const fetchDealer = async (id: string) => {
  try {
    // Since dealer info is included in vehicle response, we'll use that
    const res = await fetch(`${API_BASE}/vehicle/${id}`, {
      headers: {
        "Cache-Control": "public, max-age=300",
      },
    });

    if (!res.ok) {
      throw new Error(
        `Failed to fetch vehicle data with status: ${res.status}`
      );
    }

    const responseData: VehicleResponse = await res.json();

    // Find dealer in the included data
    const dealerData = responseData.data.included?.find(
      (item) => item.type === "seller" // or whatever type identifies the dealer
    );

    if (!dealerData) {
      throw new Error(`Dealer information not found in vehicle data`);
    }

    return {
      id: dealerData.id,
      name: dealerData.attributes.name,
      location: `${dealerData.attributes.locality}, ${dealerData.attributes.province}`,
      phone: "060 123 4567",
      whatsapp: null,
    };
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error fetching dealer:", error);
    }

    throw new Error(
      error instanceof Error
        ? `Failed to fetch dealer: ${error.message}`
        : "Failed to fetch dealer"
    );
  }
};

// Submit a vehicle
export const submitLead = async (
  formData: LeadFormData
): Promise<LeadResponse> => {
  try {
    const res = await fetch("https://nextjs-rho-red-22.vercel.app/api/lead", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) throw new Error("Failed to submit lead");
    return await res.json();
  } catch (error) {
    console.error("Error submitting lead:", error);
    throw error;
  }
};
