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
  async headers() {
    return [
      {
        source: "/vehicle/:id",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=10, stale-while-revalidate=59",
          },
        ],
      },
      {
        source: "/api/vehicle/:id",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=300",
          },
        ],
      },
      {
        source: "/api/dealer/:id",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=300",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
