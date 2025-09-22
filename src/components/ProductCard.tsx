import React, { useState, useEffect } from "react";
import { Heart, Image as ImageIcon, Star, ArrowRight } from "lucide-react";
import type { Product } from "../stripe-config";
import { ProductMediaModal } from "./ProductMediaModal";

type Props = {
  product: Product;
  onLike: (id: string) => void;
  isLiked: boolean;
};

export const ProductCard: React.FC<Props> = ({ product, onLike, isLiked }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewData, setReviewData] = useState({ rating: 4.9, count: 124 });

  // Generate initial rating and review count based on product
  useEffect(() => {
    const generateRatingData = (productId: string) => {
      // Use product ID to generate consistent but varied ratings
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
      // 20% chance of a review update every 8-15 seconds
      if (Math.random() < 0.2) {
        setReviewData(prev => ({
          ...prev,
          count: prev.count + 1
        }));
      }
    }, Math.random() * 7000 + 8000); // Random interval between 8-15 seconds

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
  
  // Map product IDs to payment links
  const getPaymentLink = (productId: string) => {
    const paymentLinks: Record<string, string> = {
      'prod_1': 'https://buy.stripe.com/28E4gy2109XbbrW8TPbQY0v',           // DreamVision Artist Pro (Business Coach)
      'prod_2': 'https://buy.stripe.com/eVq14maxwglzcw0fidbQY0u',           // DreamVision Pro Member (Lux Auto)
      'prod_3': 'https://buy.stripe.com/fZueVcfRQd9n9jO5HDbQY0w',          // Nexus Luma Web Design (Pro) (Lux Home)
      'prod_4': 'https://buy.stripe.com/dRm8wO6hgc5jbrW4DzbQY0o',          // Nexus Luma Web Design Starter (Credit Wise)
      'prod_5': 'https://buy.stripe.com/aFa28q0WW4CR67C5HDbQY0t',           // E-commerce Pro Template (Lux Hair)
      'prod_6': 'https://buy.stripe.com/bJeaEW8po8T78fKb1XbQY0s',           // Portfolio Showcase Premium (Beauty Store)
      'prod_7': 'https://buy.stripe.com/aFa6oG498c5j0Ni8TPbQY0p',           // Business Landing Pro (Lux Clean)
      'prod_8': 'https://buy.stripe.com/8x2aEWgVU3yN53yb1XbQY0r',           // Restaurant Template Suite (Simple)
      'prod_9': 'https://buy.stripe.com/7sYdR85dc9Xb67C3zvbQY0y',           // SaaS Dashboard Kit (Clean)
      'prod_10': 'https://buy.stripe.com/8x2aEW8po0mBanS2vrbQY0q',          // Real Estate Pro (Better Baking)
      'prod_11': 'https://buy.stripe.com/14AcN48pod9nanS2vrbQY0z',          // Healthcare Template (Construction)
      'prod_12': 'https://buy.stripe.com/eVqeVcgVUc5jcw02vrbQY0x'           // Education Platform (Fitness)
    };
    return paymentLinks[productId] || '#'; // fallback to # if no link found
  };
  
  // Map product IDs to the folder names and actual filenames
  const getProductMedia = (productId: string) => {
    const mediaMap: Record<string, { folder: string; image: string; gif: string }> = {
      'prod_1': { 
        folder: 'business', 
        image: 'Business coach.jpg', 
        gif: 'credit repair.gif' 
      },
      'prod_2': { 
        folder: 'lux-auto', 
        image: 'Sales Girl.jpg', 
        gif: 'Luxury Auto.gif' 
      },
      'prod_3': { 
        folder: 'lux-home', 
        image: 'create a simple real estate home sold giving keys.jpg', 
        gif: 'Luxury Home.gif' 
      },
      'prod_4': { 
        folder: 'credit-wise', 
        image: 'beautiful black business woman.jpg', 
        gif: 'smart credit.gif' 
      },
      'prod_5': { 
        folder: 'lux-hair', 
        image: 'luxury hair salon latina.jpg', 
        gif: 'luxury hair temp.gif' 
      },
      'prod_6': { 
        folder: 'beauty-store', 
        image: 'Beauty model.jpg', 
        gif: 'Lux Beauty Store.gif' 
      },
      'prod_7': { 
        folder: 'lux-clean', 
        image: 'lux cleaning.jpg', 
        gif: 'Cleaning Website.gif' 
      },
      'prod_8': { 
        folder: 'simple', 
        image: 'Simple Clean.jpg', 
        gif: 'Cleaning website 2.gif' 
      },
      'prod_9': { 
        folder: 'clean', 
        image: 'Simple Clean.jpg', 
        gif: 'Cleaning Website.gif' 
      },
      'prod_10': { 
        folder: 'better-baking', 
        image: 'Baked Bread.jpg', 
        gif: 'Bakery.gif' 
      },
      'prod_11': { 
        folder: 'construction', 
        image: 'create a construction worker business man.jpg', 
        gif: 'Contruction website template.gif' 
      },
      'prod_12': { 
        folder: 'fitness', 
        image: 'fitness woman.jpg', 
        gif: 'Gym website.gif' 
      }
    };
    return mediaMap[productId] || { folder: 'business', image: 'Business coach.jpg', gif: 'credit repair.gif' };
  };

  const productMedia = getProductMedia(product.id);
  const mediaItems = [
    {
      id: '1',
      type: 'image' as const,
      url: `/products/${productMedia.folder}/${productMedia.image}`,
      title: `${product.name} - Preview`
    },
    {
      id: '2',
      type: 'image' as const,
      url: `/products/${productMedia.folder}/${productMedia.gif}`,
      title: `${product.name} - Demo`
    }
  ];

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const handlePaymentClick = () => {
    const paymentUrl = getPaymentLink(product.id);
    if (paymentUrl !== '#') {
      window.open(paymentUrl, '_blank');
    }
  };

  return (
    <>
      <div className="group relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:border-white/20 hover:bg-white/10 transition-all duration-500 hover:shadow-2xl hover:shadow-yellow-500/10 hover:-translate-y-1">
        <div 
          className="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden cursor-pointer group/media"
          onClick={handleCardClick}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
          
          {/* Display the first image as main preview */}
          <img 
            src={`/products/${productMedia.folder}/${productMedia.image}`}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover group-hover/media:scale-105 transition-transform duration-300"
            onError={(e) => {
              // Fallback to placeholder if image doesn't exist
              e.currentTarget.style.display = 'none';
            }}
          />
          
          {/* Fallback placeholder when image doesn't load */}
          <div className="absolute inset-0 flex items-center justify-center group-hover/media:scale-105 transition-transform duration-300">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mb-3">
                <ImageIcon className="w-8 h-8 text-white/60" />
              </div>
              <div className="text-center">
                <p className="text-xs text-white/40 font-medium">Click to view media</p>
              </div>
            </div>
          </div>

          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/media:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="text-white/80 text-sm font-medium">View Gallery</div>
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
              <span className="text-sm text-gray-400">
                {product.mode === "subscription" ? "/month" : ""}
              </span>
            </div>
            {product.mode === "subscription" && (
              <span className="text-xs text-gray-500">Cancel anytime</span>
            )}
          </div>
        </div>

        <div className="flex justify-center">
          <button 
            onClick={handlePaymentClick}
            className="group/btn relative px-8 py-3 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-teal-500 hover:to-teal-600 text-gray-800 hover:text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/25 hover:scale-105 min-h-[44px] flex items-center justify-center gap-2 border border-gray-300/30 backdrop-blur-sm w-full max-w-[200px]"
          >
            <span className="text-sm">Get Template</span>
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-500/5 via-transparent to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>

    {/* Modal */}
    <ProductMediaModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      product={product}
      media={mediaItems}
    />
  </>
  );
};
