"use client";
import CommonWrapper from "@/components/layout/CommonWrapper";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";

export default function AllBrands() {
  const brands = [1, 2, 3, 4];
  const duplicatedBrands = [...brands, ...brands, ...brands];

  return (
    <>
      <style jsx global>{`
        /* Force linear motion for the marquee effect */
        .swiper-wrapper {
          transition-timing-function: linear !important;
        }
      `}</style>

      <div className="py-10">
        <CommonWrapper>
          <div className="flex flex-col md:flex-row items-center relative gap-3 md:gap-12 mx-5 xl:mx-[100px]">
            <div className="flex flex-col justify-center grow-0 shrink-0 relative gap-1 md:pr-10 md:border-r border-[#bee5f6] z-20 bg-white">
              <p className="text-[18px] md:text-2xl lg:text-3xl xl:text-[40px] text-center md:text-left font-semibold text-primary">
                All Brands
              </p>
              <p className="text-[12px] lg:text-lg text-[#808080]">
                in our online store.
              </p>
            </div>

            <div className="relative overflow-hidden w-full">
              <div className="absolute top-0 left-0 w-10 lg:w-[100px] h-full bg-linear-to-r from-white to-transparent z-10 pointer-events-none"></div>
              <div className="absolute top-0 right-0 w-10 lg:w-[100px] h-full bg-linear-to-l from-white to-transparent z-10 pointer-events-none"></div>

              <Swiper
                modules={[Autoplay]}
                spaceBetween={25}
                slidesPerView={3}
                loop={true}
                speed={4000}
                allowTouchMove={false}
                autoplay={{
                  delay: 0,
                  disableOnInteraction: false,
                }}
                className="w-full"
                breakpoints={{
                  0: { slidesPerView: 3, spaceBetween: 20 },
                  768: { slidesPerView: 3, spaceBetween: 25 },
                  1024: { slidesPerView: 4, spaceBetween: 25 },
                }}
              >
                {duplicatedBrands.map((item, index) => (
                  <SwiperSlide
                    key={index}
                    className="flex justify-center items-center"
                  >
                    <div className="grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer py-4">
                      <Image
                        src={`/brandslogo/brand${item}.png`}
                        height={80}
                        width={200}
                        alt={`Brand ${item}`}
                        className="object-contain h-8 sm:h-12 md:h-16 w-full md:py-1"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </CommonWrapper>
      </div>
    </>
  );
}
