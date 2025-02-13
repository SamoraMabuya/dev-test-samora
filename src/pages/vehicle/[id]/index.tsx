import { GetServerSideProps } from "next";
import { useState } from "react";
import { fetchVehicle, fetchDealer } from "@/lib/api";
import { Dealer } from "@/types";
import Layout from "@/components/layout/Layout";
import VehicleGallery from "@/components/VehicleGallery";
import ContactForm from "@/components/ContactForm";
import RelatedVehicles from "../../../components/RelatedVehicles";
import DealerInfo from "@/components/DealerInfo";
import ShareSocialIcons from "@/components/SocialActions";
import { southAfricanProvinces } from "@/constants/location";
import { Heart } from "lucide-react";
import VehicleSpecs from "@/components/VehicleSpecs";
import { Vehicle } from "@/lib/types";

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

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const id = params?.id as string;
    const vehicle = await fetchVehicle(id);
    const dealer = await fetchDealer(vehicle.dealerId);

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
        error: "Failed to load vehicle data",
      },
    };
  }
};
