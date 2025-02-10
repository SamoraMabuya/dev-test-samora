// src/components/vehicle/VehicleGallery.tsx
import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import ImageLightbox from "./ImageLightbox";

interface Props {
  images: string[];
}

export default function VehicleGallery({ images }: Props) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  if (!images.length) {
    return (
      <div className="relative aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  return (
    <div>
      {/* Main Image Container */}
      <div className="mb-4 relative aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden">
        <Image
          src={images[currentImage]}
          alt={`Vehicle image ${currentImage + 1}`}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw"
          priority={currentImage === 0}
        />

        {/* Preview button */}
        <button
          onClick={() => setIsLightboxOpen(true)}
          className="absolute bottom-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
          aria-label="Open preview"
        >
          <Maximize2 className="w-5 h-5" />
        </button>

        {/* Navigation arrows */}
        {images.length > 1 && (
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4">
            <button
              onClick={() =>
                setCurrentImage((prev) =>
                  prev > 0 ? prev - 1 : images.length - 1
                )
              }
              className="p-2 bg-black/50 text-white rounded-full hover:bg-black/70"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() =>
                setCurrentImage((prev) =>
                  prev < images.length - 1 ? prev + 1 : 0
                )
              }
              className="p-2 bg-black/50 text-white rounded-full hover:bg-black/70"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}

        {/* Image counter */}
        <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded-md text-sm">
          {currentImage + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="grid grid-cols-6 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`relative aspect-square rounded-md overflow-hidden ${
                currentImage === index ? "ring-2 ring-red-600" : ""
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
      )}

      {/* Lightbox */}
      <ImageLightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        images={images}
        currentIndex={currentImage}
        onIndexChange={setCurrentImage}
      />
    </div>
  );
}
