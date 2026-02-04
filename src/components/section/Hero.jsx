"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import CommonWrapper from "@/components/layout/CommonWrapper";
import SafeImage from "@/components/ui/SafeImage";
import { apiClient } from "@/api/apiClient";
import { API_ENDPOINTS } from "@/api/ApiEndPoint";

export default function Hero() {
  const [heroImages, setHeroImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await apiClient.get(API_ENDPOINTS.HERO_IMAGE);
        const data = res?.data?.data || res?.data || [];
        if (Array.isArray(data) && data.length > 0) {
          setHeroImages(data);
        }
      } catch (error) {
        console.error("Hero image fetch error:", error);
      }
    };
    fetchImages();
  }, []);

  useEffect(() => {
    if (heroImages.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages]);

  if (heroImages.length === 0) return null;

  return (
    <div className="my-3 md:my-8">
      <CommonWrapper>
        {/* Main Container: overflow-hidden must be here */}
        <div className="bg-gray-200 rounded-2xl w-full h-75 sm:h-100 md:h-125 lg:h-150 relative overflow-hidden">
          <AnimatePresence initial={false}>
            <motion.div
              key={currentIndex}
              /* Slide animation logic */
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <SafeImage
                width={1400}
                height={700}
                className="w-full h-full object-cover rounded-2xl"
                src={heroImages[currentIndex]?.image}
                alt={`Hero Slide ${currentIndex}`}
                priority
              />
            </motion.div>
          </AnimatePresence>

          {/* Indicators */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {heroImages.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 transition-all duration-300 rounded-full ${
                  index === currentIndex ? "w-6 bg-white" : "w-2 bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </CommonWrapper>
    </div>
  );
}
