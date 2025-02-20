import { GetServerSideProps } from "next";
import { useState } from "react";
import { fetchDealerVehicles, API_BASE } from "@/lib/api";
import { Dealer, RelatedVehicle } from "@/types";
import Layout from "@/components/layout/Layout";
import VehicleGallery from "@/components/VehicleGallery";
import ContactForm from "@/components/ContactForm";
import RelatedVehicles from "../../../components/RelatedVehicles";
import DealerInfo from "@/components/DealerInfo";
import ShareSocialIcons from "@/components/SocialActions";
import { southAfricanProvinces } from "@/constants/location";
import { Heart } from "lucide-react";
import VehicleSpecs from "@/components/VehicleSpecs";
import { Vehicle, VehicleResponse } from "@/lib/types";

interface Props {
  vehicle: Vehicle | null;
  dealer: Dealer | null;
  error?: string;
}

export default function VehiclePage({ vehicle, dealer, error }: Props) {
  const [showPhone, setShowPhone] = useState(false);

  if (error) {
    return (
      <div className="status">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!vehicle || !dealer) {
    return (
      <div className="status">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Title and Price Section */}
        <h1 className="text-xl font-semibold mb-3">{vehicle.title}</h1>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2">
            {/* Add to Wishlist button */}
            <div className="flex justify-between mb-2">
              <span className="text-[28px] font-bold text-primary-dark">
                R {vehicle.price?.toLocaleString()}
              </span>
              <button className="flex items-center gap-2 text-[#EE1133] hover:text-red-700">
                Add to Wishlist
                <Heart className="hidden md:block w-4 h-4" />
              </button>
            </div>

            {/* Gallery */}
            <VehicleGallery images={vehicle.images || []} />

            {/* Specification Summary */}
            <div className="mt-8">
              <VehicleSpecs
                year={vehicle.year}
                mileage={vehicle.mileage}
                transmission={vehicle.transmission}
                fuelType={vehicle.fuelType}
                axleConfig={vehicle.axleConfig}
                condition={vehicle.condition}
              />
            </div>

            {/* Dealer Information */}
            <DealerInfo
              name={vehicle.agentName}
              location={vehicle.agentLocality}
              distance={vehicle.dealerDistance || ""}
            />

            {/* Description */}
            <div className="mt-6">
              <h2 className="text-[#213740] font-semibold mb-3">
                Description:
              </h2>
              <div className="text-[#666]">{vehicle.description}</div>
              <p className="text-[#666] text-sm mt-2">
                Reference: {vehicle.reference}
              </p>
            </div>

            {/* Options */}
            {vehicle.options && (
              <div className="mt-6 border-t border-gray-200 pt-4">
                <h2 className="text-[#213740] font-semibold mb-3">Options:</h2>
                <p className="text-[#666]">{vehicle.options}</p>
              </div>
            )}

            {/* Finance Availability */}
            <div className="mt-6 border-t border-gray-200 pt-4">
              <h2 className="text-[#213740] font-semibold mb-3">
                Finance Availability:
              </h2>
              <p className="text-[#666]">
                This vehicle does not qualify for vehicle asset finance. Please
                contact the dealership directly to find out more.
              </p>
            </div>
          </div>
          {/* Contact Form */}
          <div className="lg:col-span-1 space-y-6">
            <ContactForm
              dealer={dealer}
              showPhone={showPhone}
              onShowPhone={() => setShowPhone(true)}
              provinces={southAfricanProvinces}
              vehicleId={vehicle.id}
            />

            {/* Social Link Via Social Icons */}
            <ShareSocialIcons />

            {/* Related Vehicles */}
            {vehicle.relatedVehicles && vehicle.relatedVehicles.length > 0 && (
              <RelatedVehicles
                vehicles={vehicle.relatedVehicles}
                dealerName={dealer.name}
                dealerLocation={dealer.location}
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
  res,
}) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=300"
  );

  try {
    const id = params?.id as string;

    // First fetch vehicle data without Promise.all
    const vehicleResponse = await fetch(`${API_BASE}/vehicle/${id}`, {
      headers: {
        "Cache-Control": "public, max-age=300",
      },
    });

    if (!vehicleResponse.ok) {
      throw new Error(
        `Failed to fetch data with status: ${vehicleResponse.status}`
      );
    }

    const responseData: VehicleResponse = await vehicleResponse.json();
    const vehicleData = responseData.data.data[0];
    const dealerData = responseData.data.included?.find(
      (item) => item.type === "seller"
    );

    if (!dealerData) {
      throw new Error("Dealer information not found");
    }

    // Try to fetch related vehicles, but don't fail if it errors
    let relatedVehicles: RelatedVehicle[] = [];
    try {
      if (vehicleData.relationships?.seller?.data?.id) {
        relatedVehicles = await fetchDealerVehicles(
          vehicleData.relationships.seller.data.id,
          id,
          4
        );
      }
    } catch (error) {
      console.error("Error fetching related vehicles:", error);
      // Don't throw, just continue with empty related vehicles
    }

    // Construct vehicle object
    const vehicle = {
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
      dealerId: vehicleData.relationships.seller.data.id,
      relatedVehicles,
      images: (() => {
        const imageCount = vehicleData.attributes.image.count;
        const imageVersion = vehicleData.attributes.image.version;
        const imageId = vehicleData.attributes.image.name;
        // / Encode vehicle title for URL safety (handles spaces & special chars)
        const title = encodeURIComponent(vehicleData.attributes.title);

        // Generate array of image URLs based on count, each URL incremented by index
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

    // Construct dealer object
    const dealer = {
      id: dealerData.id,
      name: dealerData.attributes.name,
      location: `${dealerData.attributes.locality}, ${dealerData.attributes.province}`,
      phone: dealerData.attributes || "060 123 4567",
      whatsapp: dealerData.attributes || null,
    };

    return {
      props: {
        vehicle,
        dealer,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        vehicle: null,
        dealer: null,
        error:
          error instanceof Error
            ? error.message
            : "Failed to load vehicle data",
      },
    };
  }
};
