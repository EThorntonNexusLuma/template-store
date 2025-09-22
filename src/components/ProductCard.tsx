import React, { useState, useEffect } from "react";
import { Heart, Star, ArrowRight } from "lucide-react";
import type { Product } from "../stripe-config";
import { getProductMediaPath } from "../utils/paths";
import { handleCheckout } from "../utils/checkout";

type Props = {
  product: Product;
  onLike: (id: string) => void;
  isLiked: boolean;
};

export const ProductCard: React.FC<Props> = ({ product, onLike, isLiked }) => {
  const [reviewData, setReviewData] = useState({ rating: 4.9, count: 124 });

  // Generate initial rating and review count based on product
  useEffect(() => {
    const generateRatingData = (productId: string) => {
      const seed = productId.charCodeAt(productId.length - 1);
      const ratings = [4.6, 4.7, 4.8, 4.9, 5.0];
      const baseCounts = [89, 156, 203, 287, 342, 411, 578, 634, 721, 856];
      
      const ratingIndex = seed % ratings.length;
      const countIndex = seed % baseCounts.length;
      
      return {
        rating: ratings[ratingIndex],
        count: baseCounts[countIndex] + Math.floor(Math.random() * 50)
      };
    };

    setReviewData(generateRatingData(product.id));
  }, [product.id]);

  // Real-time review updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.2) {
        setReviewData(prev => ({
          ...prev,
          count: prev.count + 1
        }));
      }
    }, Math.random() * 7000 + 8000);

    return () => clearInterval(interval);
  }, []);

  // Render stars with precise rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative w-3.5 h-3.5">
          <Star className="absolute w-3.5 h-3.5 text-yellow-400" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
          </div>
        </div>
      );
    }

    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-3.5 h-3.5 text-gray-600" />
      );
    }

    return stars;
  };

  const handleGetStarted = async () => {
    await handleCheckout(product);
  };

  return (
    <div className="group relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:border-white/20 hover:bg-white/10 transition-all duration-500 hover:shadow-2xl hover:shadow-yellow-500/10 hover:-translate-y-1">
      <div className="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden cursor-pointer group/media">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
        
        {product.media ? (
          <img 
            src={getProductMediaPath(product.media.folder, product.media.image)}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover group-hover/media:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : null}
        
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/media:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="text-white/80 text-sm font-medium">View Template</div>
        </div>

        <button
          aria-label={isLiked ? "Unlike" : "Like"}
          onClick={(e) => {
            e.stopPropagation();
            onLike(product.id);
          }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center hover:bg-black/60 transition-all duration-300 hover:scale-110"
        >
          <Heart 
            className={`w-4 h-4 transition-colors ${
              isLiked ? "text-red-400 fill-red-400" : "text-white/70 hover:text-red-400"
            }`} 
          />
        </button>

        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm bg-green-500/20 text-green-300 border border-green-400/30">
            One-time
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 leading-tight group-hover:text-yellow-300 transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-gray-300 line-clamp-3 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1">
            {renderStars(reviewData.rating)}
          </div>
          <span className="text-xs text-gray-400">({reviewData.rating}) • {reviewData.count} reviews</span>
        </div>

        <div className="flex justify-center mb-4">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-white">${product.price.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button 
            onClick={handleGetStarted}
            className="group/btn relative px-8 py-3 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-teal-500 hover:to-teal-600 text-gray-800 hover:text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/25 hover:scale-105 min-h-[44px] flex items-center justify-center gap-2 border border-gray-300/30 backdrop-blur-sm w-full max-w-[200px]"
          >
            <span className="text-sm">Get Started</span>
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-500/5 via-transparent to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
};
