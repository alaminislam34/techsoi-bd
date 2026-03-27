"use client";
import SafeImage from "@/components/ui/SafeImage";
import Link from "next/link";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useGetBlogsLimit } from "@/api/hooks/useBlogs";

export default function BlogCard({ limit = 6 }) {
  const { data: blogsResponse, isLoading, isError } = useGetBlogsLimit(limit);
  const blogs = blogsResponse?.data || [];

  // Format date helper
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="mt-6 md:mt-10 flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isError || blogs.length === 0) {
    return (
      <div className="mt-6 md:mt-10 flex justify-center items-center h-96">
        <p className="text-lg text-gray-500">No blogs available</p>
      </div>
    );
  }

  return (
    <>
      <div className="mt-6 md:mt-10">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={24}
          slidesPerView={3}
          autoplay={{
            delay: 2500,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
          }}
        >
          {blogs.map((blog) => (
            <SwiperSlide key={blog.id}>
              <Link
                href={`/blog/${blog.slug}`}
                className="flex flex-col gap-2 md:gap-3 p-3 md:p-4 rounded-2xl border border-[#bee5f6] hover:border-[#2CACE2] transition-all"
              >
                <div className="w-full h-48 md:h-56 rounded-xl overflow-hidden bg-gray-200">
                  <SafeImage
                    src={blog.image}
                    fallbackSrc="/icons/logo.png"
                    alt={blog.title}
                    width={400}
                    height={224}
                    className="w-full h-full object-cover aspect-4/3 hover:scale-105 transition-transform"
                  />
                </div>
                <div className="flex items-center gap-1 md:gap-1.5 rounded-lg">
                  <svg
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3 md:w-6 h-3 md:h-6 relative"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M18 2V4M6 2V4"
                      stroke="#2CACE2"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M11.9955 13H12.0045M11.9955 17H12.0045M15.991 13H16M8 13H8.00897M8 17H8.00897"
                      stroke="#2CACE2"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3.5 8H20.5"
                      stroke="#2CACE2"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2.5 12.2432C2.5 7.88594 2.5 5.70728 3.75212 4.35364C5.00424 3 7.01949 3 11.05 3H12.95C16.9805 3 18.9958 3 20.2479 4.35364C21.5 5.70728 21.5 7.88594 21.5 12.2432V12.7568C21.5 17.1141 21.5 19.2927 20.2479 20.6464C18.9958 22 16.9805 22 12.95 22H11.05C7.01949 22 5.00424 22 3.75212 20.6464C2.5 19.2927 2.5 17.1141 2.5 12.7568V12.2432Z"
                      stroke="#2CACE2"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3 8H21"
                      stroke="#2CACE2"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="text-[12px] md:text-lg text-left text-[#505050]">
                    {formatDate(blog.created_at)}
                  </p>
                </div>
                <div className="flex flex-col gap-2 md:gap-3">
                  <p className="text-[14px] md:text-xl font-medium text-left text-[#303030] line-clamp-2">
                    {blog.title_bn}
                  </p>
                  <p className="text-[10px] md:text-base text-left text-[#505050] line-clamp-2">
                    {blog.short_description}
                  </p>
                  <div className="flex items-center gap-2 text-[#2CACE2] group cursor-pointer">
                    <span className="text-[12px] md:text-lg inline-block text-left text-[#303030] group-hover:text-[#2CACE2] transition-colors">
                      Read more
                    </span>
                    <svg
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-3 md:w-6 h-3 md:h-6 relative group-hover:translate-x-1 transition-transform"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M17 7L6 18"
                        stroke="#303030"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        className="group-hover:stroke-[#2CACE2] transition-colors"
                      />
                      <path
                        d="M11 6H17C17.4714 6 17.7071 6 17.8536 6.14645C18 6.29289 18 6.5286 18 7V13"
                        stroke="#303030"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="group-hover:stroke-[#2CACE2] transition-colors"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
