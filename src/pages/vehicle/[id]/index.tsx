// src/pages/vehicle/[id].tsx
import { GetServerSideProps } from "next";
import Image from "next/image";
import { useState } from "react";
import { fetchVehicle, fetchDealer } from "@/lib/api";
import { Vehicle, Dealer } from "@/types";
import Layout from "@/components/layout/Layout";
import VehicleGallery from "@/components/vehicle/VehicleGallery";
import ContactForm from "@/components/vehicle/ContactForm";
import RelatedVehicles from "../../../components/vehicle/RelatedVehicles";
import VehicleSpecs from "../VehicleSpecs";
import DealerInfo from "@/components/vehicle/VehicleDealerInfo";
import SocialActions from "@/components/vehicle/SocialActions";

interface Props {
  vehicle: Vehicle | null;
  dealer: Dealer | null;
  error?: string;
}

export default function VehiclePage({ vehicle, dealer, error }: Props) {
  const [showPhone, setShowPhone] = useState(false);

  if (error) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <p className="text-red-600">{error}</p>
        </div>
      </Layout>
    );
  }

  if (!vehicle || !dealer) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <p>Loading...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Title and Price Section */}
        <h1 className="text-xl font-semibold mb-3">{vehicle.title}</h1>
        <div className="flex items-center justify-between mb-4">
          <span className="text-[28px] font-bold text-[#EE1133]">
            R {vehicle.price?.toLocaleString()}
          </span>
          <button className="flex items-center text-[#EE1133] hover:text-red-700">
            <span className="mr-2">♡</span>
            Add to Wishlist
          </button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2">
            <VehicleGallery images={vehicle.images || []} />

            {/* Specification Summary */}
            <div className="mt-6">
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

          {/* Right Column */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Form */}
            <ContactForm
              dealer={dealer}
              showPhone={showPhone}
              onShowPhone={() => setShowPhone(true)}
            />

            {/* Social Actions */}
            <SocialActions vehicleTitle={vehicle.title} />

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
