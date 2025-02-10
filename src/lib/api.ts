// src/lib/api.ts
import { LeadFormData, RelatedVehicle, VehicleResponse } from "@/types";

const API_BASE = "https://nextjs-rho-red-22.vercel.app/api";

// First, add a type for the dealer vehicles response
interface DealerVehiclesResponse {
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

export const fetchDealerVehicles = async (
  dealerId: string,
  excludeVehicleId: string
): Promise<RelatedVehicle[]> => {
  try {
    const res = await fetch(`${API_BASE}/vehicle?dealer_id=${dealerId}`);
    if (!res.ok) throw new Error("Failed to fetch dealer vehicles");

    const data: DealerVehiclesResponse = await res.json();

    // Transform the API response to match our RelatedVehicle type
    return data.data.data
      .filter((vehicle) => vehicle.id !== excludeVehicleId) // Exclude current vehicle
      .slice(0, 4) // Take only 4 vehicles
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
  } catch (error) {
    console.error("Error fetching dealer vehicles:", error);
    return [];
  }
};

export const fetchVehicle = async (id: string) => {
  try {
    const res = await fetch(`${API_BASE}/vehicle/${id}`);
    if (!res.ok) throw new Error("Failed to fetch vehicle");

    const responseData: VehicleResponse = await res.json();
    const vehicleData = responseData.data.data[0];
    const dealerId = vehicleData.relationships.seller.data.id;

    // Pass the current vehicle ID to exclude it from related vehicles
    const relatedVehicles = await fetchDealerVehicles(dealerId, id);

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

export const fetchDealer = async (id: string) => {
  try {
    const res = await fetch(`${API_BASE}/vehicle/7927016`);
    if (!res.ok) throw new Error("Failed to fetch dealer");

    const responseData: VehicleResponse = await res.json();
    const dealerData = responseData.data.included.find(
      (item) => item.id === id
    );

    if (!dealerData) throw new Error("Dealer not found");

    return {
      id: dealerData.id,
      name: dealerData.attributes.name,
      location: `${dealerData.attributes.locality}, ${dealerData.attributes.province}`,
      phone: "060 123 4567", // Placeholder
      whatsapp: null,
    };
  } catch (error) {
    console.error("Error fetching dealer:", error);
    throw error;
  }
};
export const submitLead = async (formData: LeadFormData): Promise<any> => {
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
