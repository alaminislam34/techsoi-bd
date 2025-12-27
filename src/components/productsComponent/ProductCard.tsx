// components/ProductCard.tsx

import React from 'react';
import { ShoppingCart, Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  oldPrice: number;
  rating: number;
  reviews: number;
  imageSrc: string;
  saveAmount: number | null;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  id,
  name, 
  price, 
  oldPrice, 
  rating, 
  reviews, 
  imageSrc, 
  saveAmount 
}) => {
  return (
    <div className="rounded-xl shadow-lg bg-white border my-2 border-[#bee5f6] hover:-translate-y-3 duration-100 ease-linear hover:shadow-[0_3px_15px_#72C7EC] hover:border-[#72C7EC] p-4 relative">

      {/* Save Badge */}
      {saveAmount && (
        <div className="absolute top-0 left-0 bg-yellow-400 text-black text-xs font-bold py-1 px-3 rounded-tl-xl rounded-br-lg">
          Save: ৳{saveAmount}
        </div>
      )}

      {/* Product Image */}
      <div className="w-full h-48 relative mb-3">
        <Image
          src={imageSrc}
          alt={name}
          fill
          className="object-contain p-4"
        />
      </div>

      {/* Product Name */}
      <p className="text-gray-700 text-sm mb-2 h-10 overflow-hidden" title={name}>
        {name}
      </p>

      {/* Price + Rating */}
      <div className="flex items-center justify-between mt-2">
        <div>
          <p className="text-lg font-bold text-cyan-600">৳{price}</p>
          <p className="text-xs text-gray-400 line-through">৳{oldPrice}</p>
        </div>

        <div className="flex items-center text-yellow-500 text-sm">
          <svg className="w-4 h-4 mr-1 fill-current"><path d="M12 17.27l6.18 3.73-1.64-7.03 5.46-4.73-7.19-.61L12 2 9.28 8.53 2.09 9.14l5.46 4.73-1.64 7.03z"/></svg>
          <span className="text-gray-700 font-semibold">{rating}</span>
          <span className="text-gray-400 text-xs ml-1">({reviews})</span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between space-x-2 mt-4">

        {/* BUY NOW — Navigates to Dynamic Product Page */}
        <Link href={`/products/${id}`} className="flex-1">
          <button className="w-full flex items-center justify-center text-[#2CACE2] border border-cyan-600 hover:bg-cyan-50 text-sm py-2 rounded-lg transition-colors duration-200">
            Buy Now
          </button>
        </Link>

        {/* Cart Button */}
        <button className="p-3 border border-gray-300 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200">
          <ShoppingCart size={16} />
        </button>

        {/* Wishlist Button */}
        <button className="p-3 border border-gray-300 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200">
          <Heart size={16} />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
