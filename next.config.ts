// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["img-ik.cars.co.za"], // Allow images from cars.co.za
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img-ik.cars.co.za",
        port: "",
        pathname: "/ik-seo/carsimages/**",
      },
    ],
  },
};

module.exports = nextConfig;
