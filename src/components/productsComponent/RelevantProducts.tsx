import React, { useRef, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Swiper as SwiperCore } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import ProductCard from "./ProductCard";
import { useGetAllProducts } from "@/api/hooks/useProducts";
import { StaticImageData } from "next/image";

interface RelevantProductsProps {
  currentProductId: number;
}

const RelevantProducts: React.FC<RelevantProductsProps> = ({
  currentProductId,
}) => {
  const navigationPrevRef = useRef<HTMLButtonElement>(null);
  const navigationNextRef = useRef<HTMLButtonElement>(null);
  const swiperRef = useRef<SwiperCore | null>(null);

  // Fetch all products
  const { data: productsResponse, isLoading } = useGetAllProducts();

  // Helper to get image URL
  const getImageSrc = (img: string | StaticImageData) =>
    typeof img === "string" ? img : img.src;

  // Filter relevant products (exclude current product)
  const relevantProducts = useMemo(() => {
    const products = productsResponse?.data || [];
    return products.filter((p: any) => p.id !== currentProductId).slice(0, 6); // Show up to 6 relevant products
  }, [productsResponse, currentProductId]);

  if (isLoading || relevantProducts.length === 0) return null;

  return (
    <section className="py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-cyan-600">
          Relevant Products
        </h2>

        <div className="flex space-x-2">
          <button
            ref={navigationPrevRef}
            aria-label="Previous slide"
            className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-100 transition shrink-0"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            ref={navigationNextRef}
            aria-label="Next slide"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-cyan-500 text-white hover:bg-cyan-600 transition shrink-0"
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
          if (
            swiper.params.navigation &&
            typeof swiper.params.navigation !== "boolean"
          ) {
            swiper.params.navigation.prevEl = navigationPrevRef.current;
            swiper.params.navigation.nextEl = navigationNextRef.current;
          }
        }}
        spaceBetween={16}
        breakpoints={{
          0: { slidesPerView: 1.2, spaceBetween: 10 },
          480: { slidesPerView: 1.8, spaceBetween: 12 },
          640: { slidesPerView: 2, spaceBetween: 12 },
          768: { slidesPerView: 3, spaceBetween: 14 },
          1024: { slidesPerView: 4, spaceBetween: 16 },
        }}
        className="h-full"
      >
        {relevantProducts.map((product: any) => (
          <SwiperSlide key={product.id} className=" h-full px-2 py-4">
            <ProductCard
              id={product.id}
              name={product.name}
              price={product.sale_price}
              oldPrice={product.regular_price}
              rating={4.5}
              reviews={24}
              imageSrc={product.main_image || "/images/monitor.jpg"}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default RelevantProducts;
