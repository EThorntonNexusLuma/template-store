import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import type { Product } from '../stripe-config';

interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  title?: string;
}

interface ProductMediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  media?: MediaItem[];
}

export const ProductMediaModal: React.FC<ProductMediaModalProps> = ({
  isOpen,
  onClose,
  product,
  media = []
}) => {
  const [currentIndex, setCurrentIndex] = useState(1); // Start with GIF (index 1)
  const [isLoaded, setIsLoaded] = useState(false);

  // Use provided media or show message
  const displayMedia = media.length > 0 ? media : [];

  useEffect(() => {
    if (isOpen) {
      setIsLoaded(true);
      setCurrentIndex(1); // Start with the GIF
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      setIsLoaded(false);
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to restore scroll on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const nextMedia = () => {
    setCurrentIndex((prev) => (prev + 1) % displayMedia.length);
  };

  const prevMedia = () => {
    setCurrentIndex((prev) => (prev - 1 + displayMedia.length) % displayMedia.length);
  };

  const goToMedia = (index: number) => {
    setCurrentIndex(index);
  };

  if (!isOpen) return null;

  const currentMedia = displayMedia[currentIndex];
  const isGif = currentMedia?.url.endsWith('.gif');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
      <div 
        className="absolute inset-0 bg-black/50" 
        onClick={onClose}
        aria-label="Close modal"
      />
      
      <div className={`relative w-full h-full max-w-6xl max-h-[90vh] mx-4 transform transition-all duration-300 ${
        isLoaded ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
      }`}>
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close gallery"
          className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center hover:bg-black/60 transition-all duration-300 hover:scale-110"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        {/* Product Title */}
        <div className="absolute top-4 left-4 z-10">
          <h2 className="text-xl font-bold text-white mb-1">{product.name}</h2>
          <p className="text-sm text-gray-300">
            {isGif ? 'Demo Animation' : 'Product Image'} ({currentIndex + 1} of {displayMedia.length})
          </p>
        </div>

        {/* Navigation Arrows */}
        {displayMedia.length > 1 && (
          <>
            <button
              onClick={prevMedia}
              aria-label="Previous media"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center hover:bg-black/60 transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={nextMedia}
              aria-label="Next media"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center hover:bg-black/60 transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </>
        )}

        {/* Main Media Display */}
        <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-black">
          {currentMedia ? (
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={currentMedia.url}
                alt={currentMedia.title || product.name}
                className="max-w-full max-h-full object-contain rounded-lg transform transition-transform duration-300 hover:scale-105"
                onError={(e) => {
                  // Hide broken images
                  e.currentTarget.style.display = 'none';
                }}
              />
              
              {/* Media Type Indicator */}
              <div className="absolute bottom-4 left-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                  isGif 
                    ? "bg-green-500/20 text-green-300 border border-green-400/30" 
                    : "bg-blue-500/20 text-blue-300 border border-blue-400/30"
                }`}>
                  {isGif ? 'GIF Demo' : 'Image'}
                </span>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">No media available</p>
              </div>
            </div>
          )}
        </div>

        {/* Thumbnail Navigation */}
        {displayMedia.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
            <div className="flex gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-sm">
              {displayMedia.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => goToMedia(index)}
                  className={`w-12 h-8 rounded-md overflow-hidden border-2 transition-all duration-300 ${
                    index === currentIndex
                      ? 'border-white shadow-lg scale-110'
                      : 'border-gray-500 hover:border-gray-300 hover:scale-105'
                  }`}
                >
                  <img
                    src={item.url}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback for broken thumbnails
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  {/* Fallback icon for broken thumbnails */}
                  <div className="w-full h-full flex items-center justify-center bg-gray-700">
                    <ImageIcon className="w-4 h-4 text-gray-400" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quick View Buttons */}
        <div className="absolute bottom-20 right-4 z-10 flex flex-col gap-2">
          <button
            onClick={() => goToMedia(0)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              currentIndex === 0
                ? 'bg-blue-500 text-white'
                : 'bg-black/40 text-gray-300 hover:bg-black/60 hover:text-white'
            }`}
          >
            Image
          </button>
          <button
            onClick={() => goToMedia(1)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              currentIndex === 1
                ? 'bg-green-500 text-white'
                : 'bg-black/40 text-gray-300 hover:bg-black/60 hover:text-white'
            }`}
          >
            GIF Demo
          </button>
        </div>
      </div>
    </div>
  );
};