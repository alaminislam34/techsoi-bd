"use client";
import SafeImage from "@/components/ui/SafeImage";
import CustomerImage from "@/assets/customer.png";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "motion/react";
import { apiClient } from "@/api/apiClient";

const ReviewCard = ({ review }) => {
  const user = review.user && review.user.length > 0 ? review.user[0] : null;
  const userName = user?.name;
  const userImage = user?.image;
  const star = review.star || 5;
  const message = review.message || "";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.3 }}
      className="flex flex-col overflow-hidden px-2 md:px-6.75 py-2 md:py-8 rounded-2xl bg-white border border-[#bee5f6]"
      style={{ boxShadow: "0px 5px 15px 0 rgba(44,172,226,0.2)" }}
    >
      <div className="flex flex-col relative gap-8">
        <div className="flex justify-between">
          <div className="flex items-center relative gap-2.5">
            <SafeImage
              src={userImage}
              alt="customer"
              width={48}
              height={48}
              className="w-12 h-12 rounded-full"
            />
            <div className="flex flex-col">
              <p className="text-[22px] md:text-[32px] font-medium text-[#303030]">
                {userName}
              </p>
              <p className="text-[12px] md:text-xl font-medium text-[#808080]">
                Customer
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div className="flex justify-center items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#eaf7fc]">
              <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 relative"
                preserveAspectRatio="none"
              >
                <path
                  d="M5.825 22L7.45 14.975L2 10.25L9.2 9.625L12 3L14.8 9.625L22 10.25L16.55 14.975L18.175 22L12 18.275L5.825 22Z"
                  fill="#185F7C"
                />
              </svg>
              <span className="text-[#185f7c]">{star}.0</span>
            </div>
          </div>
        </div>
        <p className="text-sm md:text-xl text-[#4b5565] wrap-break-word">
          {message}
        </p>
      </div>
    </motion.div>
  );
};

export default function CustomerSays() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await apiClient.get(
          "https://api.techsoibd.com/api/reviews",
        );
        if (res.data.status === true && res.data.data) {
          setReviews(res.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };
    fetchReviews();
  }, []);

  if (reviews.length === 0) {
    return (
      <div className="flex items-center justify-center py-6">
        <p>No reviews available at the moment.</p>
      </div>
    );
  }

  return (
    <>
      <div className="relative overflow-hidden">
        <div className="hidden md:block absolute top-0 left-0 w-50 h-full bg-linear-to-l from-white/0 to-white z-10 -ml-16.75"></div>
        <div className="hidden md:block absolute top-0 right-0 w-50 h-full bg-linear-to-r from-white/0 to-white z-10 -mr-16.75"></div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
        >
          <Swiper
            className="mt-12"
            modules={[Autoplay]}
            spaceBetween={40}
            slidesPerView={3}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            freeMode={true}
            loop={true}
            speed={6000}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 5,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
            }}
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id} className="py-4">
                <ReviewCard review={review} />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: false }}
        >
          <Swiper
            className="mt-5 md:mt-6"
            modules={[Autoplay]}
            spaceBetween={40}
            slidesPerView={3}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
              reverseDirection: true,
            }}
            freeMode={true}
            loop={true}
            speed={6000}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 5,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
            }}
          >
            {reviews.map((review) => (
              <SwiperSlide key={`reverse-${review.id}`} className="py-4">
                <ReviewCard review={review} />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </>
  );
}
