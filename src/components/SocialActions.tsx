import { Flag } from "lucide-react";

export default function ShareSocialIcons() {
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        currentUrl
      )}`,
      "_blank"
    );
  };

  const shareOnWhatsApp = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(currentUrl)}`,
      "_blank"
    );
  };

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}`,
      "_blank"
    );
  };

  return (
    <div className="mt-6 space-y-4 text-center">
      {/* Share section */}
      <div className="flex items-center justify-center gap-4">
        <span className="text-[#666]">Share:</span>
        <div className="flex items-center gap-3">
          {/* Facebook */}
          <button
            onClick={shareOnFacebook}
            className="text-blue-600 hover:opacity-80"
            aria-label="Share on Facebook"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </button>

          {/* WhatsApp */}
          <button
            onClick={shareOnWhatsApp}
            className="text-green-500 hover:opacity-80"
            aria-label="Share on WhatsApp"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.92 15.73C16.7 16.1 16.03 16.49 15.53 16.57C15.03 16.65 14.39 16.68 13.69 16.41C13.27 16.24 12.74 16.02 12.06 15.68C9.89 14.54 8.5 12.35 8.37 12.17C8.24 11.99 7.24 10.67 7.24 9.3C7.24 7.93 7.94 7.27 8.17 7.03C8.4 6.79 8.66 6.73 8.82 6.73C8.98 6.73 9.14 6.73 9.28 6.74C9.43 6.75 9.63 6.69 9.83 7.15C10.03 7.61 10.49 8.98 10.55 9.11C10.61 9.24 10.66 9.39 10.58 9.56C10.5 9.73 10.46 9.82 10.33 9.97C10.2 10.12 10.05 10.31 9.94 10.42C9.81 10.55 9.68 10.69 9.83 10.95C9.98 11.21 10.49 12.05 11.25 12.73C12.23 13.62 13.05 13.91 13.31 14.04C13.57 14.17 13.72 14.15 13.88 13.97C14.04 13.79 14.48 13.27 14.66 13.01C14.84 12.75 15.02 12.79 15.27 12.88C15.52 12.97 16.88 13.64 17.15 13.77C17.42 13.9 17.59 13.97 17.65 14.09C17.71 14.21 17.71 14.64 17.49 15.15L16.92 15.73Z" />
            </svg>
          </button>

          {/* Twitter/X */}
          <button
            onClick={shareOnTwitter}
            className="text-gray-800 hover:opacity-80"
            aria-label="Share on Twitter"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Report car */}
      <div className="flex justify-center">
        <button className="flex items-center gap-2 text-red-600 hover:opacity-80">
          <Flag className="w-5 h-5" />
          Report car
        </button>
      </div>
    </div>
  );
}
