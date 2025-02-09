// src/lib/api.ts
import { VehicleResponse, Vehicle, Dealer } from "@/types";

const API_BASE = "https://nextjs-rho-red-22.vercel.app/api";

// Fetch single vehicle
export const fetchVehicle = async (id: string) => {
  try {
    const res = await fetch(`${API_BASE}/vehicle/${id}`);
    if (!res.ok) throw new Error("Failed to fetch vehicle");

    const responseData: VehicleResponse = await res.json();
    const vehicleData = responseData.data.data[0];
    const dealerId = vehicleData.relationships.seller.data.id;

    // Fetch additional data
    const [specs, relatedVehicles] = await Promise.all([
      fetchVehicleSpecs(
        vehicleData.attributes.code,
        vehicleData.attributes.year.toString()
      ),
      fetchDealerVehicles(dealerId),
    ]);

    // Transform the data
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
      specs,
      dealerId,
      relatedVehicles,
      // Construct image URLs
      images: Array(vehicleData.attributes.image.count)
        .fill(null)
        .map(
          (_, i) =>
            `https://img-ik.cars.co.za/ik-seo/carsimages/tr:n-stock_large/${
              vehicleData.attributes.image.name
            }/${encodeURIComponent(vehicleData.attributes.title)}.jpg?v=${
              vehicleData.attributes.image.version
            }`
        ),
    };
  } catch (error) {
    console.error("Error fetching vehicle:", error);
    throw error;
  }
};

// Fetch dealer information
export const fetchDealer = async (id: string) => {
  try {
    const res = await fetch(`${API_BASE}/dealer/${id}`);
    if (!res.ok) throw new Error("Failed to fetch dealer");

    const data = await res.json();
    return {
      id: data.id,
      name: data.name,
      location: data.location,
      phone: data.phone,
      whatsapp: data.whatsapp,
    };
  } catch (error) {
    console.error("Error fetching dealer:", error);
    throw error;
  }
};

// Fetch dealer's other vehicles
export const fetchDealerVehicles = async (dealerId: string) => {
  try {
    const res = await fetch(`${API_BASE}/vehicle?dealer_id=${dealerId}`);
    if (!res.ok) throw new Error("Failed to fetch dealer vehicles");

    const data = await res.json();
    return data.vehicles.slice(0, 4).map((vehicle: any) => ({
      id: vehicle.id,
      title: vehicle.title,
      price: vehicle.price,
      mileage: vehicle.mileage,
      transmission: vehicle.transmission,
      fuelType: vehicle.fuelType,
      image: `https://img-ik.cars.co.za/ik-seo/carsimages/tr:n-stock_thumb/${
        vehicle.id
      }/${encodeURIComponent(vehicle.title)}.jpg`,
    }));
  } catch (error) {
    console.error("Error fetching dealer vehicles:", error);
    return []; // Return empty array on error
  }
};

// Fetch vehicle specifications
export const fetchVehicleSpecs = async (code: string, year: string) => {
  try {
    const res = await fetch(`${API_BASE}/specs/${code}/${year}`);
    if (!res.ok) throw new Error("Failed to fetch vehicle specs");

    return await res.json();
  } catch (error) {
    console.error("Error fetching vehicle specs:", error);
    return null; // Return null on error
  }
};
