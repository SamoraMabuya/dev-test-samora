import { useState, useEffect, useCallback } from "react";
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
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // Memoize navigation function
  // Memoized function to handle image navigation with circular behavior
  const navigateImage = useCallback(
    (direction: "prev" | "next") => {
      const newIndex =
        direction === "prev"
          ? currentIndex > 0 // If going previous
            ? currentIndex - 1 // Normal case: go back one
            : images.length - 1 // Wrap to end if at start
          : currentIndex < images.length - 1 // If going next
          ? currentIndex + 1 // Normal case: go forward one
          : 0; // Wrap to start if at end
      onIndexChange(newIndex);
      setIsImageLoaded(false);
    },
    [currentIndex, images.length, onIndexChange]
  );
  useEffect(() => {
    if (!isOpen) return; // Only run when modal is open

    // Handle keyboard navigation
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose(); // Close on ESC
      if (e.key === "ArrowLeft") navigateImage("prev"); // Previous image
      if (e.key === "ArrowRight") navigateImage("next"); // Next image
    };

    // Save original body styles
    const originalStyle = {
      overflow: document.body.style.overflow,
      margin: document.body.style.margin,
    };

    // Prevent page scrolling when modal is open
    document.body.style.overflow = "hidden";
    document.body.style.margin = "0";
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      document.body.style.overflow = originalStyle.overflow;
      document.body.style.margin = originalStyle.margin;
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [isOpen, navigateImage, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black">
      {/* Controls */}
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

      {/* Navigation buttons */}
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

      {/* Image container */}
      <div className="absolute inset-0 flex items-center justify-center">
        {!isImageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-gray-200 border-t-white rounded-full animate-spin"></div>
          </div>
        )}
        <div className="relative w-[85vw] h-[85vh]">
          <Image
            src={images[currentIndex]}
            alt={`Image ${currentIndex + 1}`}
            fill
            className={`object-contain transition-transform duration-300 ${
              isZoomed ? "scale-150" : "scale-100"
            } ${isImageLoaded ? "opacity-100" : "opacity-0"}`}
            sizes="85vw"
            priority={true}
            quality={85}
            onLoad={() => setIsImageLoaded(true)}
          />
        </div>
      </div>
    </div>
  );
}
