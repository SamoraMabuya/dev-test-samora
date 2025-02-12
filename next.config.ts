/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
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
