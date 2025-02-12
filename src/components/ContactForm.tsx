import { ChangeEvent, useState } from "react";
import { Dealer, LeadFormData } from "@/types";
import { Mail, Phone, Info } from "lucide-react";
import Link from "next/link";
import { WhatsAppIcon } from "./ui/icons";
import { submitLead } from "@/lib/api";

interface FormTypes {
  dealer: Dealer;
  showPhone: boolean;
  onShowPhone: () => void;
  provinces: string[];
  vehicleId: string;
}

interface FormState {
  name: string;
  email: string;
  mobile: string;
  area: string;
  subscribe: {
    carAlerts: boolean;
    carNews: boolean;
  };
}

const initialFormState: FormState = {
  name: "",
  email: "",
  mobile: "",
  area: "",
  subscribe: {
    carAlerts: true,
    carNews: false,
  },
};

export default function ContactForm({
  dealer,
  showPhone,
  onShowPhone,
  vehicleId,
  provinces,
}: FormTypes) {
  const [formData, setFormData] = useState<FormState>(initialFormState);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const leadData: LeadFormData = {
        ...formData,
        vehicleId,
        dealerId: dealer.id,
      };

      await submitLead(leadData);
      alert("Message sent successfully!");
      setFormData(initialFormState);
    } catch (error) {
      console.error("Failed to submit lead:", error);
      alert("Failed to send message. Please try again.");
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      subscribe: {
        ...prev.subscribe,
        [name]: checked,
      },
    }));
  };

  return (
    <div className="bg-[#dee7eb] p-6 rounded-lg">
      <h2 className="text-lg font-semibold mb-1">Contact {dealer.name}</h2>
      <p className="text-gray-600 text-sm mb-4">{dealer.location}</p>

      <button
        onClick={onShowPhone}
        className="w-full mb-4 p-3 bg-white border border-red-600 rounded-md text-left flex items-center gap-2 text-red-600"
      >
        <Phone className="w-5 h-5" />
        {showPhone ? dealer.phone : dealer.phone?.replace(/\d{4}$/, "****")}
        {!showPhone && <span className="ml-auto text-sm">Show Number</span>}
      </button>

      {dealer.whatsapp && (
        <a
          href={`https://wa.me/${dealer.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full mb-4 p-3 bg-white border border-green-500 text-green-500 rounded-md text-center flex items-center justify-center gap-2"
        >
          <WhatsAppIcon className="text-green-500" />
          WhatsApp the Dealer
        </a>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Name <span className="text-red-600">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full p-2 border rounded-md"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Name"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email <span className="text-red-600">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full p-2 border rounded-md"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="example@mail.com"
          />
        </div>

        <div>
          <label
            htmlFor="mobile"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Mobile <span className="text-red-600">*</span>
          </label>
          <input
            id="mobile"
            name="mobile"
            type="tel"
            required
            className="w-full p-2 border rounded-md"
            value={formData.mobile}
            onChange={handleInputChange}
            placeholder="Mobile number"
          />
        </div>

        <div>
          <label
            htmlFor="area"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Area <span className="text-red-600">*</span>
          </label>
          <select
            id="area"
            name="area"
            required
            className="w-full p-2 border rounded-md bg-white"
            value={formData.area}
            onChange={handleInputChange}
          >
            <option value="">Select an area</option>
            {provinces.map((province) => (
              <option key={province} value={province}>
                {province}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="carAlerts"
              name="carAlerts"
              checked={formData.subscribe.carAlerts}
              onChange={handleCheckboxChange}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="carAlerts" className="text-sm text-gray-700">
              Subscribe to Car Alerts
            </label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="carNews"
              name="carNews"
              checked={formData.subscribe.carNews}
              onChange={handleCheckboxChange}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label
              htmlFor="carNews"
              className="text-sm text-gray-700 flex items-center gap-1"
            >
              Car news
              <Info className="w-4 h-4 text-gray-400" />
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center justify-center gap-2"
        >
          <Mail className="w-5 h-5" />
          Message the Dealer
        </button>

        <p className="text-xs text-gray-600">
          By submitting, you agree to Cars.co.za&apos;s{" "}
          <Link href="#" className="text-blue-600 hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="#" className="text-blue-600 hover:underline">
            Privacy Policy
          </Link>
        </p>
      </form>
    </div>
  );
}
