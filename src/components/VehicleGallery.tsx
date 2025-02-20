import { useState, useCallback, memo, useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Maximize2 = dynamic(() =>
  import("lucide-react").then((mod) => mod.Maximize2)
);
const ImageLightbox = dynamic(() => import("./ui/ImageLightbox"), {
  loading: () => <div className="hidden" />,
  ssr: false,
});

interface Props {
  images: string[];
}

const Thumbnail = memo(
  ({
    image,
    index,
    isActive,
    onClick,
  }: {
    image: string;
    index: number;
    isActive: boolean;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className={`relative aspect-square rounded-md overflow-hidden ${
        isActive ? "ring-2 ring-red-600" : ""
      }`}
    >
      <Image
        src={image}
        alt={`Thumbnail ${index + 1}`}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 16vw, 8vw"
        loading={index < 4 ? "eager" : "lazy"}
        quality={40}
      />
    </button>
  )
);

Thumbnail.displayName = "Thumbnail";

function VehicleGallery({ images }: Props) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const navigateImage = useCallback(
    (direction: "prev" | "next") => {
      setCurrentImage((prev) =>
        direction === "prev"
          ? prev > 0
            ? prev - 1
            : images.length - 1
          : prev < images.length - 1
          ? prev + 1
          : 0
      );
    },
    [images.length]
  );

  if (!images.length) {
    return (
      <div className="relative aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  const displayedImages = isMobile ? images.slice(0, 6) : images;

  return (
    <div>
      <link rel="preload" as="image" href={images[0]} crossOrigin="anonymous" />

      {/* Main Image Container */}
      <div
        className="mb-4 relative aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <Image
          src={images[currentImage]}
          alt={`Vehicle image ${currentImage + 1}`}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
          priority={currentImage === 0}
          quality={85}
        />

        {/* Navigation and UI elements */}
        {showControls && (
          <div className="absolute inset-0 bg-black/0">
            <button
              onClick={() => setIsLightboxOpen(true)}
              className="absolute bottom-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
              aria-label="Open preview"
            >
              <Maximize2 className="w-5 h-5" />
            </button>

            {images.length > 1 && (
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4">
                <button
                  onClick={() => navigateImage("prev")}
                  className="p-2 bg-black/50 text-white rounded-full hover:bg-black/70"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => navigateImage("next")}
                  className="p-2 bg-black/50 text-white rounded-full hover:bg-black/70"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            )}

            <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded-md text-sm">
              {currentImage + 1} / {images.length}
            </div>
          </div>
        )}
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="grid grid-cols-6 gap-2">
          {displayedImages.map((image, index) => (
            <Thumbnail
              key={index}
              image={image}
              index={index}
              isActive={currentImage === index}
              onClick={() => setCurrentImage(index)}
            />
          ))}
        </div>
      )}

      {/* Lightbox */}
      {isLightboxOpen && (
        <ImageLightbox
          isOpen={isLightboxOpen}
          onClose={() => setIsLightboxOpen(false)}
          images={images}
          currentIndex={currentImage}
          onIndexChange={setCurrentImage}
        />
      )}
    </div>
  );
}

export default memo(VehicleGallery);
