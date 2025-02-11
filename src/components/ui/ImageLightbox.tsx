// src/components/vehicle/ImageLightbox.tsx
import { useState, useEffect } from "react";
import Image from "next/image";
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
}

export default function ImageLightbox({
  isOpen,
  onClose,
  images,
  currentIndex,
  onIndexChange,
}: LightboxProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.margin = "0";
    } else {
      document.body.style.overflow = "";
      document.body.style.margin = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.margin = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const navigateImage = (direction: "prev" | "next") => {
    if (direction === "prev") {
      onIndexChange(currentIndex > 0 ? currentIndex - 1 : images.length - 1);
    } else {
      onIndexChange(currentIndex < images.length - 1 ? currentIndex + 1 : 0);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-[9999] bg-black m-0 p-0">
      {/* Top controls */}
      <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-[9999]">
        {/* Image counter */}
        <div className="text-white text-sm">
          {currentIndex + 1} / {images.length}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          {/* Zoom icons */}
          <button
            onClick={() => setIsZoomed(true)}
            disabled={isZoomed}
            className="text-white hover:text-gray-300 transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ZoomIn className="w-6 h-6" />
          </button>
          <button
            onClick={() => setIsZoomed(false)}
            disabled={!isZoomed}
            className="text-white hover:text-gray-300 transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ZoomOut className="w-6 h-6" />
          </button>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 transition-colors focus:outline-none"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Navigation buttons */}
      <button
        onClick={() => navigateImage("prev")}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-[9999] text-white hover:text-gray-300 transition-colors focus:outline-none"
      >
        <ChevronLeft className="w-10 h-10" />
      </button>
      <button
        onClick={() => navigateImage("next")}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-[9999] text-white hover:text-gray-300 transition-colors focus:outline-none"
      >
        <ChevronRight className="w-10 h-10" />
      </button>

      {/* Image container */}
      <div className="absolute inset-0 flex items-center justify-center m-0 p-0">
        <div className="relative w-[85vw] h-[85vh] flex items-center justify-center">
          <Image
            src={images[currentIndex]}
            alt={`Image ${currentIndex + 1}`}
            fill
            className={`object-contain transition-transform duration-300 ${
              isZoomed ? "scale-150" : "scale-100"
            }`}
            sizes="85vw"
            priority
            quality={100}
          />
        </div>
      </div>
    </div>
  );
}
