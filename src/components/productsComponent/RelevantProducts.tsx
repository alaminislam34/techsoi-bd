import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Swiper as SwiperCore } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import ProductCard from "./ProductCard";
import { productList, ProductType } from "@/components/lib/dummyProd";
import { StaticImageData } from "next/image";

interface RelevantProductsProps {
  currentProductId: string;
  currentCategory: string;
}

const RelevantProducts: React.FC<RelevantProductsProps> = ({
  currentProductId,
  currentCategory,
}) => {
  const navigationPrevRef = useRef<HTMLButtonElement>(null);
  const navigationNextRef = useRef<HTMLButtonElement>(null);
  const swiperRef = useRef<SwiperCore | null>(null);

  // Helper to get image URL
  const getImageSrc = (img: string | StaticImageData) =>
    typeof img === "string" ? img : img.src;

  // Filter products by category excluding current product
  const relevantProducts = productList.filter(
    (p) => p.category === currentCategory && p.id !== currentProductId
  );

  if (relevantProducts.length === 0) return null;

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-cyan-600">Relevant Products</h2>

        <div className="flex space-x-2">
          <button
            ref={navigationPrevRef}
            aria-label="Previous slide"
            className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-100 transition"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            ref={navigationNextRef}
            aria-label="Next slide"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-cyan-500 text-white hover:bg-cyan-600 transition"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Swiper */}
      <Swiper
        modules={[Navigation]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onBeforeInit={(swiper) => {
          if (swiper.params.navigation && typeof swiper.params.navigation !== "boolean") {
            swiper.params.navigation.prevEl = navigationPrevRef.current;
            swiper.params.navigation.nextEl = navigationNextRef.current;
          }
        }}
        spaceBetween={24}
        breakpoints={{
          0: { slidesPerView: 1, spaceBetween: 16 },
          640: { slidesPerView: 2, spaceBetween: 24 },
          1024: { slidesPerView: 4, spaceBetween: 24 },
        }}
      >
        {relevantProducts.map((product: ProductType) => (
          <SwiperSlide key={product.id}>
            <ProductCard
              id={Number(product.id)}
              name={product.name}
              price={product.salePrice}
              oldPrice={product.regularPrice}
              rating={product.rating}
              reviews={product.reviewCount}
              imageSrc={getImageSrc(product.image)}
              saveAmount={product.regularPrice - product.salePrice}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default RelevantProducts;
