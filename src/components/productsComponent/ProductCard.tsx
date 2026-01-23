// components/ProductCard.tsx

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  id: number;
  slug?: string;
  name: string;
  price: number;
  oldPrice: number;
  rating: number;
  reviews: number;
  imageSrc: string;
  // saveAmount: number | null;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  slug,
  name,
  price,
  oldPrice,
  rating,
  reviews,
  imageSrc,
  // saveAmount,
}) => {
  return (
    <div className="h-full" key={id}>
      <div className="flex flex-col gap-2 justify-between md:gap-5 p-1.5 md:p-4 rounded-xl md:rounded-[20px] bg-white border border-[#bee5f6] hover:-translate-y-1 duration-100 ease-linear hover:shadow-[0_1px_10px_#72C7EC] hover:border-[#72C7EC] h-full">
        <Image
          src={imageSrc}
          alt={name}
          width={400}
          height={400}
          unoptimized
          className="w-full rounded-lg md:rounded-4.5 object-cover"
        />

        <div className="flex flex-col justify-between gap-2 md:gap-4">
          <div className="flex flex-col gap-2 md:gap-6 overflow-hidden">
            <p className="w-full text-[14px] md:text-[16px] lg:text-4.5 font-medium text-[#303030]">
              {name}
            </p>

            <div className="flex flex-col md:flex-wrap md:flex-row justify-between">
              {/* Price */}
              <div className="flex items-center gap-2">
                <p className="text-[14px] md:text-lg xl:text-xl font-semibold text-primary">
                  ৳{price}
                </p>
                <p className="text-sm lg:text-lg line-through text-[#808080]">
                  ৳{oldPrice}
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1">
                <svg
                  width={17}
                  height={16}
                  viewBox="0 0 17 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M7.69447 0.414678C7.87408 -0.138109 8.65613 -0.138109 8.83574 0.414678L10.3755 5.15369C10.4559 5.4009 10.6862 5.56828 10.9462 5.56828H15.9291C16.5103 5.56828 16.752 6.31205 16.2817 6.65369L12.2505 9.58256C12.0402 9.73534 11.9522 10.0062 12.0325 10.2534L13.5723 14.9924C13.7519 15.5452 13.1192 16.0048 12.649 15.6632L8.61778 12.7343C8.40749 12.5816 8.12273 12.5816 7.91243 12.7343L3.88119 15.6632C3.41096 16.0048 2.77828 15.5452 2.95789 14.9924L4.49768 10.2534C4.57801 10.0062 4.49001 9.73534 4.27972 9.58256L0.24848 6.65369C-0.221748 6.31205 0.0199172 5.56828 0.601151 5.56828H5.58404C5.84398 5.56828 6.07435 5.4009 6.15467 5.15369L7.69447 0.414678Z"
                    fill="#FFCE23"
                  />
                </svg>

                <p className="text-[12px] lg:text-sm text-[#505050]">
                  {rating}
                </p>

                <p className="text-[12px] lg:text-sm text-[#505050]">
                  ({reviews})
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            {/* Buy Now */}
            <Link
              href={`/products/${slug ?? id}`}
              className="flex items-center gap-1 xl:gap-2.5 px-1.5 xl:px-3 py-1.5 xl:py-2 rounded-lg xl:rounded-xl bg-[#eaf7fc] hover:bg-primary group"
            >
              <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-4.5 xl:w-6 h-4.5 xl:h-6 relative text-[#303030] group-hover:text-white"
              >
                <path
                  d="M3.87289 17.0194L2.66933 9.83981C2.48735 8.75428 2.39637 8.21152 2.68773 7.85576C2.9791 7.5 3.51461 7.5 4.58564 7.5H19.4144C20.4854 7.5 21.0209 7.5 21.3123 7.85576C21.6036 8.21152 21.5126 8.75428 21.3307 9.83981L20.1271 17.0194C19.7282 19.3991 19.5287 20.5889 18.7143 21.2945C17.9 22 16.726 22 14.3782 22H9.62182C7.27396 22 6.10003 22 5.28565 21.2945C4.47127 20.5889 4.27181 19.3991 3.87289 17.0194Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M17.5 7.5C17.5 4.46243 15.0376 2 12 2C8.96243 2 6.5 4.46243 6.5 7.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>

              <p className="flex gap-1 text-[12px] xl:text-lg text-[#303030] group-hover:text-white">
                Buy now
              </p>
            </Link>

            {/* Cart + Wishlist */}
            <div className="flex items-center gap-1 xl:gap-3">
              {/* Add to cart */}
              <button className="flex justify-center items-center w-8 xl:w-12 h-8 xl:h-12 rounded-lg xl:rounded-xl bg-[#eaf7fc] hover:bg-primary group">
                <svg
                  width={24}
                  height={24}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="w-4.5 xl:w-6 h-4.5 xl:h-6 text-[#303030] group-hover:text-white"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 16H15.2632C19.7508 16 20.4333 13.1808 21.261 9.06908C21.4998 7.88311 21.6192 7.29013 21.3321 6.89507C21.045 6.5 20.4947 6.5 19.3941 6.5H6" />
                  <path d="M8 16L5.37873 3.51493C5.15615 2.62459 4.35618 2 3.43845 2H2.5" />
                  <path d="M8.88 16H8.46857C7.10522 16 6 17.1513 6 18.5714C6 18.8081 6.1842 19 6.41143 19H17.5" />
                  <circle cx="10.5" cy="20.5" r="1.5" />
                  <circle cx="17.5" cy="20.5" r="1.5" />
                </svg>
              </button>

              {/* Wishlist */}
              <button className="flex justify-center items-center w-8 xl:w-12 h-8 xl:h-12 rounded-lg xl:rounded-xl bg-[#eaf7fc] hover:bg-primary group">
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                  className="w-4.5 xl:w-6 h-4.5 xl:h-6 text-[#303030] group-hover:text-white"
                >
                  <path d="M19.4626 3.99415C16.7809 2.34923 14.4404 3.01211 13.0344 4.06801C12.4578 4.50096 12.1696 4.71743 12 4.71743C11.8304 4.71743 11.5422 4.50096 10.9656 4.06801C9.55962 3.01211 7.21909 2.34923 4.53744 3.99415C1.01807 6.15294 0.221721 13.2749 8.33953 19.2834C9.88572 20.4278 10.6588 21 12 21C13.3412 21 14.1143 20.4278 15.6605 19.2834C23.7783 13.2749 22.9819 6.15294 19.4626 3.99415Z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
