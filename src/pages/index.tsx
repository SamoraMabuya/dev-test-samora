import { useRouter } from "next/router";
import Layout from "@/components/layout/Layout";

export default function Home() {
  const router = useRouter();

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[50vh]">
          <button
            onClick={() => router.push("/vehicle/7927016")}
            className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-colors"
          >
            View Vehicle
          </button>
        </div>
      </div>
    </Layout>
  );
}
