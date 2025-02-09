// src/pages/index.tsx
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} min-h-screen`}>
      {/* Header/Navigation */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.svg"
              alt="Cars.co.za Logo"
              width={120}
              height={40}
              priority
            />
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link
              href="/used-cars"
              className="text-gray-600 hover:text-red-600"
            >
              Used Cars
            </Link>
            <Link href="/new-cars" className="text-gray-600 hover:text-red-600">
              New Cars
            </Link>
            <Link href="/sell" className="text-gray-600 hover:text-red-600">
              Sell Your Car
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Find Your Perfect Car
          </h1>
          <p className="text-xl mb-8">
            Browse through thousands of quality used cars across South Africa
          </p>

          {/* Search Form */}
          <div className="max-w-2xl mx-auto bg-white rounded-lg p-6 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select className="w-full p-3 border rounded-md text-gray-700">
                <option value="">Select Make</option>
                <option value="volkswagen">Volkswagen</option>
                <option value="toyota">Toyota</option>
                <option value="bmw">BMW</option>
              </select>
              <select className="w-full p-3 border rounded-md text-gray-700">
                <option value="">Select Model</option>
              </select>
              <button className="w-full bg-red-600 text-white p-3 rounded-md hover:bg-red-700 transition-colors">
                Search Cars
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Featured Cars</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Featured Car Card */}
            <Link
              href="/vehicle/7927016"
              className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-video relative">
                <Image
                  src="/images/placeholder-car.jpg"
                  alt="Featured Car"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2">
                  2008 Volkswagen Touran 1.9 TDI
                </h3>
                <p className="text-red-600 font-bold">R 104,900</p>
                <p className="text-gray-600 text-sm mt-2">
                  240,000 km • Manual • Diesel
                </p>
              </div>
            </Link>
            {/* Add more featured car cards as needed */}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="text-gray-600 hover:text-red-600"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-600 hover:text-red-600"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            {/* Add more footer columns as needed */}
          </div>
          <div className="mt-8 pt-8 border-t text-center text-gray-600">
            <p>
              &copy; {new Date().getFullYear()} Cars.co.za. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
