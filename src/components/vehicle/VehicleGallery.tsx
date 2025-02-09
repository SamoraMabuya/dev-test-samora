// src/components/vehicle/VehicleGallery.tsx
import { useState } from "react";
import Image from "next/image";

interface Props {
  images: string[];
}

export default function VehicleGallery({ images }: Props) {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <div className="space-y-2">
      {/* Main Image */}
      <div className="relative aspect-[4/3] bg-gray-100 rounded overflow-hidden">
        <Image
          src={images[currentImage]}
          alt={`Vehicle image ${currentImage + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw"
          priority={currentImage === 0}
        />

        {/* Navigation arrows */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4">
          <button
            onClick={() =>
              setCurrentImage((prev) =>
                prev > 0 ? prev - 1 : images.length - 1
              )
            }
            className="w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70"
            aria-label="Previous image"
          >
            ←
          </button>
          <button
            onClick={() =>
              setCurrentImage((prev) =>
                prev < images.length - 1 ? prev + 1 : 0
              )
            }
            className="w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70"
            aria-label="Next image"
          >
            →
          </button>
        </div>

        {/* Image counter */}
        <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded text-sm">
          {currentImage + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-6 gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`relative aspect-square rounded overflow-hidden ${
              currentImage === index ? "ring-2 ring-[#EE1133]" : ""
            }`}
          >
            <Image
              src={image}
              alt={`Thumbnail ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 16vw, 8vw"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
