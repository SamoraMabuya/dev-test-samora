import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-red-600 text-white">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            {/* Logo */}
            <Image
              src="/images/logo.svg"
              alt="Cars.co.za"
              width={120}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* You can add more navigation items here if needed */}
        </nav>
      </div>
    </header>
  );
}
