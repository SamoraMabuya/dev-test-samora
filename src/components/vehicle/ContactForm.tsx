// src/components/vehicle/ContactForm.tsx
import { useState } from "react";
import { Dealer } from "@/types";
import Link from "next/link";
import { Mail, Phone, Info } from "lucide-react";

interface Props {
  dealer: Dealer;
  showPhone: boolean;
  onShowPhone: () => void;
}

export default function ContactForm({ dealer, showPhone, onShowPhone }: Props) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    area: "",
    subscribeAlerts: true,
    subscribeNews: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // await submitLead(formData);
      alert("Message sent successfully!");
    } catch (error) {
      alert("Failed to send message");
    }
  };

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
        {showPhone ? dealer.phone : dealer.phone?.replace(/\d{4}$/, "****")}
        {!showPhone && <span className="ml-auto text-sm">Show Number</span>}
      </button>

      {/* WhatsApp button */}
      <a
        href={`https://wa.me/${dealer.whatsapp}`}
        className="block w-full mb-4 p-3 bg-white border border-green-500 text-green-500 rounded-md text-center flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.92 15.73C16.7 16.1 16.03 16.49 15.53 16.57C15.03 16.65 14.39 16.68 13.69 16.41C13.27 16.24 12.74 16.02 12.06 15.68C9.89 14.54 8.5 12.35 8.37 12.17C8.24 11.99 7.24 10.67 7.24 9.3C7.24 7.93 7.94 7.27 8.17 7.03C8.4 6.79 8.66 6.73 8.82 6.73C8.98 6.73 9.14 6.73 9.28 6.74C9.43 6.75 9.63 6.69 9.83 7.15C10.03 7.61 10.49 8.98 10.55 9.11C10.61 9.24 10.66 9.39 10.58 9.56C10.5 9.73 10.46 9.82 10.33 9.97C10.2 10.12 10.05 10.31 9.94 10.42C9.81 10.55 9.68 10.69 9.83 10.95C9.98 11.21 10.49 12.05 11.25 12.73C12.23 13.62 13.05 13.91 13.31 14.04C13.57 14.17 13.72 14.15 13.88 13.97C14.04 13.79 14.48 13.27 14.66 13.01C14.84 12.75 15.02 12.79 15.27 12.88C15.52 12.97 16.88 13.64 17.15 13.77C17.42 13.9 17.59 13.97 17.65 14.09C17.71 14.21 17.71 14.64 17.49 15.15L16.92 15.73Z" />
        </svg>
        WhatsApp the Dealer
      </a>

      {/* Contact form */}
      <form onSubmit={handleSubmit} className="space-y-4">
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
            <option value="area1">Area 1</option>
            <option value="area2">Area 2</option>
          </select>
        </div>

        <div className="block space-y-2 md:space-y-0 md:flex items-center gap-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="subscribeAlerts"
              checked={formData.subscribeAlerts}
              onChange={(e) =>
                setFormData({ ...formData, subscribeAlerts: e.target.checked })
              }
              className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
            />
            <label htmlFor="subscribeAlerts" className="text-sm text-gray-700">
              Subscribe to Car Alerts
            </label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="subscribeNews"
              checked={formData.subscribeNews}
              onChange={(e) =>
                setFormData({ ...formData, subscribeNews: e.target.checked })
              }
              className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
            />
            <label
              htmlFor="subscribeNews"
              className="text-sm text-gray-700 flex items-center gap-1"
            >
              Car news
              <Info className="w-4 h-4 text-white fill-black stroke-width-0" />
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

        <p className="text-xs text-gray-600 mt-4">
          By submitting, you agree to Cars.co.za's{" "}
          <Link href="#" className="text-blue-600 hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="#" className="text-blue-600 hover:underline">
            Privacy Policy
          </Link>
        </p>

        <p className="text-xs text-gray-500">
          This site is protected by reCAPTCHA and the Google{" "}
          <Link href="#" className="text-blue-600 hover:underline">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href="#" className="text-blue-600 hover:underline">
            Terms of Service
          </Link>{" "}
          apply.
        </p>
      </form>
    </div>
  );
}
