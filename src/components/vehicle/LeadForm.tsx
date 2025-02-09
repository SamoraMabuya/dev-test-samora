// src/components/vehicle/LeadForm.tsx
import { useState } from "react";
import { LeadFormData } from "@/types";
import { Mail, Phone, Info } from "lucide-react";
import Link from "next/link";

interface LeadFormProps {
  vehicleId: string;
  dealerId: string;
  onSubmit: (data: LeadFormData) => Promise<void>;
}

type FormState = Omit<LeadFormData, "vehicleId" | "dealerId">;

export default function LeadForm({
  vehicleId,
  dealerId,
  onSubmit,
}: LeadFormProps) {
  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    mobile: "",
    area: "",
    subscribe: {
      carAlerts: true,
      carNews: false,
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit({
        ...formData,
        vehicleId,
        dealerId,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
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
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
          onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
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

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="carAlerts"
            checked={formData.subscribe.carAlerts}
            onChange={(e) =>
              setFormData({
                ...formData,
                subscribe: {
                  ...formData.subscribe,
                  carAlerts: e.target.checked,
                },
              })
            }
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
            checked={formData.subscribe.carNews}
            onChange={(e) =>
              setFormData({
                ...formData,
                subscribe: { ...formData.subscribe, carNews: e.target.checked },
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

      <button
        type="submit"
        className="w-full p-3 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center justify-center gap-2"
      >
        <Mail className="w-5 h-5" />
        Message the Dealer
      </button>

      <p className="text-xs text-gray-600">
        By submitting, you agree to Cars.co.za's{" "}
        <Link href="#" className="text-blue-600 hover:underline">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="#" className="text-blue-600 hover:underline">
          Privacy Policy
        </Link>
      </p>
    </form>
  );
}
