import { ChangeEvent, useState } from "react";
import { Dealer } from "@/types";
import { Mail, Phone, Info } from "lucide-react";
import Link from "next/link";
import { WhatsAppIcon } from "./icons";

interface FormTypes {
  dealer: Dealer;
  showPhone: boolean;
  onShowPhone: () => void;
  provinces: string[];
}

export default function ContactForm({
  dealer,
  showPhone,
  onShowPhone,
  provinces,
}: FormTypes) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    area: "",
    subscribe: {
      carAlerts: true,
      carNews: false,
    },
  });

  function handleAreaChange() {
    return (e: ChangeEvent<HTMLInputElement>) =>
      setFormData({
        ...formData,
        subscribe: {
          ...formData.subscribe,
          carAlerts: e.target.checked,
        },
      });
  }

  return (
    <div className="bg-[#dee7eb] p-6 rounded-lg">
      <h2 className="text-lg font-semibold mb-1">Contact {dealer.name}</h2>
      <p className="text-gray-600 text-sm mb-4">{dealer.location}</p>

      {/* Phone number button */}
      <button
        onClick={onShowPhone}
        className="w-full mb-4 p-3 bg-white border border-red-600 rounded-md text-left flex items-center gap-2 text-red-600"
      >
        <Phone className="w-5 h-5" />
        {/* // Show last 4 digits as asterisks if phone number is hidden*/}
        {showPhone ? dealer.phone : dealer.phone?.replace(/\d{4}$/, "****")}
        {!showPhone && <span className="ml-auto text-sm">Show Number</span>}
      </button>

      {/* WhatsApp button */}
      {dealer.whatsapp && (
        <a
          href={`https://wa.me/${dealer.whatsapp}`}
          className="w-full mb-4 p-3 bg-white border border-green-500 text-green-500 rounded-md text-center flex items-center justify-center gap-2"
        >
          <WhatsAppIcon className="text-green-500" />
          WhatsApp the Dealer
        </a>
      )}

      {/* Contact form */}
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            required
            className="w-full p-2 border rounded-md"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Name"
          />
        </div>

        <div>
          {/* Email field */}
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email <span className="text-red-600">*</span>
          </label>
          <input
            type="email"
            required
            className="w-full p-2 border rounded-md"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="example@mail.com"
          />
        </div>

        <div>
          {/* Mobile */}
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mobile <span className="text-red-600">*</span>
          </label>
          <input
            type="tel"
            required
            className="w-full p-2 border rounded-md"
            value={formData.mobile}
            onChange={(e) =>
              setFormData({ ...formData, mobile: e.target.value })
            }
            placeholder="Mobile number"
          />
        </div>

        <div>
          {/* List of provinces*/}
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Area <span className="text-red-600">*</span>
          </label>
          <select
            required
            className="w-full p-2 border rounded-md bg-white"
            value={formData.area}
            onChange={(e) => setFormData({ ...formData, area: e.target.value })}
          >
            <option value="">Select an area</option>
            {provinces.map((province) => (
              <option key={province} value={province}>
                {province}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            {/* Check box for Car Alerts Subscription */}
            <input
              type="checkbox"
              id="carAlerts"
              checked={formData.subscribe.carAlerts}
              onChange={handleAreaChange()}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="carAlerts" className="text-sm text-gray-700">
              Subscribe to Car Alerts
            </label>
          </div>

          <div className="flex items-center gap-2">
            {/* Check box for car news */}
            <input
              type="checkbox"
              id="carNews"
              checked={formData.subscribe.carNews}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  subscribe: {
                    ...formData.subscribe,
                    carNews: e.target.checked,
                  },
                })
              }
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

        {/* Message the dealer button */}
        <button
          type="submit"
          className="w-full p-3 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center justify-center gap-2"
        >
          <Mail className="w-5 h-5" />
          Message the Dealer
        </button>

        {/* Terms and condition */}
        <p className="text-xs text-gray-600">
          By submitting, you agree to Cars.co.za's{" "}
          <Link href="#" className="text-blue-600 hover:underline">
            Terms of Service
          </Link>
          and
          <Link href="#" className="text-blue-600 hover:underline">
            Privacy Policy
          </Link>
        </p>
      </form>
    </div>
  );
}
