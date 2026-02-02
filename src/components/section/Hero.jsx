"use client";

import CommonWrapper from "@/components/layout/CommonWrapper";
import SafeImage from "@/components/ui/SafeImage";
import HeroImage from "@/assets/Hero-Banner.png";
import { useEffect, useMemo, useState } from "react";
import { apiClient } from "@/api/apiClient";
import { API_ENDPOINTS } from "@/api/ApiEndPoint";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

export default function Hero() {
  const [heroImages, setHeroImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await apiClient.get(API_ENDPOINTS.HERO_IMAGE);

        if (res?.status === true || res?.data?.status === true) {
          setHeroImages(res?.data?.data || res?.data || []);
        }
      } catch (error) {
        console.log(error.message || "Failed hero image fetching");
      }
    };
    fetchImages();
  }, []);

  const slides = useMemo(() => {
    if (Array.isArray(heroImages) && heroImages.length > 0) {
      return heroImages;
    }
    return [{ image: HeroImage }];
  }, [heroImages]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <>
      <div className="my-3 md:my-8">
        <CommonWrapper>
          <div className="bg-black rounded-2xl w-full h-full relative flex justify-end items-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${slides[currentIndex]?.id || "hero"}-${currentIndex}`}
                className="w-full"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <SafeImage
                  width={1200}
                  height={600}
                  className="w-full h-fit object-contain rounded-xl"
                  src={slides[currentIndex]?.image}
                  fallbackSrc={HeroImage}
                  alt="hero"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {slides.length > 1 && (
              <div className="absolute inset-0 flex items-center justify-between px-4">
                <button
                  type="button"
                  onClick={goPrev}
                  className="h-10 w-10 rounded-full bg-white/80 text-primary shadow-md flex items-center justify-center hover:bg-white"
                  aria-label="Previous slide"
                >
                  <ArrowLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="h-10 w-10 rounded-full bg-white/80 text-primary shadow-md flex items-center justify-center hover:bg-white"
                  aria-label="Next slide"
                >
                  <ArrowRight size={18} />
                </button>
              </div>
            )}
          </div>
        </CommonWrapper>
      </div>
    </>
  );
}
