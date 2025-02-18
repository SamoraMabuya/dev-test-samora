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
    if (!isOpen) return;

    const originalStyle = {
      overflow: document.body.style.overflow,
      margin: document.body.style.margin,
    };

    document.body.style.overflow = "hidden";
    document.body.style.margin = "0";

    return () => {
      document.body.style.overflow = originalStyle.overflow;
      document.body.style.margin = originalStyle.margin;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const navigateImage = (direction: "prev" | "next") => {
    const newIndex =
      direction === "prev"
        ? currentIndex > 0
          ? currentIndex - 1
          : images.length - 1
        : currentIndex < images.length - 1
        ? currentIndex + 1
        : 0;
    onIndexChange(newIndex);
  };
  return (
    <div className="fixed inset-0 z-[9999] bg-black">
      <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10">
        <span className="text-white text-sm">
          {currentIndex + 1} / {images.length}
        </span>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsZoomed(true)}
            disabled={isZoomed}
            className="text-white hover:text-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Zoom in"
          >
            <ZoomIn className="w-6 h-6" />
          </button>
          <button
            onClick={() => setIsZoomed(false)}
            disabled={!isZoomed}
            className="text-white hover:text-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Zoom out"
          >
            <ZoomOut className="w-6 h-6" />
          </button>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      <button
        onClick={() => navigateImage("prev")}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-10 h-10" />
      </button>
      <button
        onClick={() => navigateImage("next")}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors"
        aria-label="Next image"
      >
        <ChevronRight className="w-10 h-10" />
      </button>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-[85vw] h-[85vh]">
          <Image
            src={images[currentIndex]}
            alt={`Image ${currentIndex + 1}`}
            fill
            className={`object-contain transition-transform duration-300 ${
              isZoomed ? "scale-150" : "scale-100"
            }`}
            sizes="85vw"
            loading="eager"
            quality={75}
          />
        </div>
      </div>
    </div>
  );
}
