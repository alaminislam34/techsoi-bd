"use client";

import CommonWrapper from "@/components/layout/CommonWrapper";
import Image from "next/image";
import HeroImage from "@/assets/Hero-Banner.png";
import Link from "next/link";
import { useEffect, useState } from "react";
import { apiClient } from "@/api/apiClient";
import { API_ENDPOINTS } from "@/api/ApiEndPoint";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const [heroImages, setHeroImages] = useState([]);
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await apiClient.get(API_ENDPOINTS.HERO_IMAGE);
        console.log(res);
        if (res?.status === true || res.data.status === true) {
          setHeroImages(res.data);
          console.log(res?.data?.data);
        }
      } catch (error) {
        console.log(error.message || "Failed hero image fetching");
      }
    };
    fetchImages();
  }, []);
  return (
    <>
      <div className="my-3 md:my-8">
        <CommonWrapper>
          <div className="bg-gray-50 rounded-2xl w-full h-full relative flex justify-end items-center">
            <Image
              width={1200}
              height={600}
              className="h-90 sm:h-120 md:h-150 lg:h-170 w-auto object-cover rounded-xl"
              src={heroImages[1]?.image || HeroImage}
              alt="hero"
            />
            <div className="absolute left-[6%] bottom-[15%] backdrop-blur-lg p-6">
              <div className="flex items-center justify-start pb-8 md:pb-12">
                <p className="px-4 py-2 rounded-2xl bg-white text-primary shadow-md">
                  New Released
                </p>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-6xl xl:text-7xl tracking-wider font-semibold pb-8">
                Best and Premium <br /> Computer Cases
              </h1>
              <p className="text-primary md:text-xl lg:text-2xl font-medium pb-6">
                Special offer for everyone...
              </p>
              <div className="flex items-center justify-start">
                <Link
                  href={"/products"}
                  className="py-3 px-6 md:px-8 rounded-lg bg-primary text-white font-medium md:text-lg lg:text-xl flex items-center gap-2 border border-white"
                >
                  Discover Devices <ArrowRight className="-rotate-45" />
                </Link>
              </div>
            </div>
          </div>
        </CommonWrapper>
      </div>
    </>
  );
}
