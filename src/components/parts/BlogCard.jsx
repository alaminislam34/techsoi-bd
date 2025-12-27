'use client';
import Image from "next/image";
import BlogImage from '@/assets/blog.png';
import Link from "next/link";
import {
    Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function BlogCard({ limit }) {

    const blogList = [
  {
    name: 'গেমিং ও কাজের জন্য সেরা ১০টি পিসি অ্যাকসেসরিজ',
    slug: 'best-10-pc-accessories-gaming-work',
    image: BlogImage,
    shortDescription:
      'সঠিক পিসি অ্যাকসেসরিজ আপনার গেমিং ও প্রফেশনাল কাজের অভিজ্ঞতা বহুগুণ বাড়িয়ে দিতে পারে। কীবোর্ড, মাউস থেকে শুরু করে হেডসেট—সবকিছুর সঠিক নির্বাচন জরুরি।',
    date: '20-Jun-2025',
  },
  {
    name: '২০২৫ সালে কোন ল্যাপটপটি আপনার জন্য সেরা?',
    slug: 'best-laptop-2025-buying-guide',
    image: BlogImage,
    shortDescription:
      'স্টুডেন্ট, অফিস কিংবা গেমিং—আপনার প্রয়োজন অনুযায়ী সঠিক ল্যাপটপ বেছে নিতে এই গাইড আপনাকে সাহায্য করবে। প্রসেসর, র‍্যাম ও ব্যাটারির দিকে নজর দিন।',
    date: '18-Jun-2025',
  },
  {
    name: 'SSD না HDD? কোনটি আপনার জন্য উপযুক্ত',
    slug: 'ssd-vs-hdd-which-is-better',
    image: BlogImage,
    shortDescription:
      'কম্পিউটার স্লো হচ্ছে? SSD আপগ্রেড করলে কী কী সুবিধা পাবেন এবং HDD কখন ব্যবহার করা উচিত—সব জানতে পড়ুন এই ব্লগে।',
    date: '15-Jun-2025',
  },
  {
    name: 'গেমিং পিসি বানানোর আগে যা জানা দরকার',
    slug: 'gaming-pc-build-buying-tips',
    image: BlogImage,
    shortDescription:
      'সঠিক গ্রাফিক্স কার্ড, পাওয়ার সাপ্লাই এবং কুলিং সিস্টেম বাছাই না করলে গেমিং পারফরম্যান্স কমে যেতে পারে।',
    date: '12-Jun-2025',
  },
  {
    name: 'অফিস কাজের জন্য বেস্ট মনিটর সেটআপ',
    slug: 'best-monitor-for-office-work',
    image: BlogImage,
    shortDescription:
      'লং টাইম কাজ করলে চোখের যত্ন নেওয়া জরুরি। রেজোলিউশন, রিফ্রেশ রেট ও স্ক্রিন সাইজ নিয়ে বিস্তারিত আলোচনা।',
    date: '10-Jun-2025',
  },
  {
    name: 'মেকানিক্যাল কীবোর্ড কেন এত জনপ্রিয়?',
    slug: 'why-mechanical-keyboards-are-popular',
    image: BlogImage,
    shortDescription:
      'টাইপিং স্পিড, ডিউরেবিলিটি ও গেমিং পারফরম্যান্স—সবকিছুর জন্যই মেকানিক্যাল কীবোর্ড আলাদা গুরুত্ব রাখে।',
    date: '08-Jun-2025',
  },
  {
    name: 'ফ্রি সফটওয়্যারে পিসি সিকিউর রাখার উপায়',
    slug: 'free-software-to-secure-pc',
    image: BlogImage,
    shortDescription:
      'অ্যান্টিভাইরাস ছাড়া পিসি ঝুঁকির মধ্যে থাকতে পারে। কিছু ফ্রি টুল ব্যবহার করে কীভাবে সিকিউরিটি বাড়াবেন জেনে নিন।',
    date: '05-Jun-2025',
  },
  {
    name: 'ল্যাপটপ গরম হওয়ার কারণ ও সমাধান',
    slug: 'laptop-overheating-causes-solution',
    image: BlogImage,
    shortDescription:
      'ল্যাপটপ অতিরিক্ত গরম হওয়া পারফরম্যান্স ও ব্যাটারি লাইফের জন্য ক্ষতিকর। কুলিং উন্নত করার কিছু সহজ উপায় জানুন।',
    date: '02-Jun-2025',
  },
  {
    name: 'রিমোট কাজের জন্য প্রয়োজনীয় টেক গ্যাজেট',
    slug: 'essential-tech-for-remote-work',
    image: BlogImage,
    shortDescription:
      'ওয়ার্ক ফ্রম হোম আরও প্রোডাকটিভ করতে প্রয়োজন হেডসেট, ওয়েবক্যাম ও স্টেবল ইন্টারনেট সেটআপ।',
    date: '30-May-2025',
  },
  {
    name: 'স্টুডেন্টদের জন্য সেরা বাজেট ল্যাপটপ',
    slug: 'best-budget-laptop-for-students',
    image: BlogImage,
    shortDescription:
      'কম বাজেটেও ভালো পারফরম্যান্স পাওয়া সম্ভব। অনলাইন ক্লাস ও প্রোজেক্টের জন্য উপযুক্ত ল্যাপটপ বেছে নিন।',
    date: '28-May-2025',
  },
  {
    name: 'প্রিন্টার কেনার আগে যেসব বিষয় ভাবা জরুরি',
    slug: 'printer-buying-guide-bd',
    image: BlogImage,
    shortDescription:
      'ইঙ্কজেট নাকি লেজার প্রিন্টার? হোম ও অফিস ব্যবহারের জন্য কোনটি সেরা তা বিস্তারিত জানুন।',
    date: '25-May-2025',
  },
  {
    name: 'গেমিং চেয়ারের গুরুত্ব ও সঠিক নির্বাচন',
    slug: 'best-gaming-chair-guide',
    image: BlogImage,
    shortDescription:
      'দীর্ঘ সময় বসে কাজ বা গেমিং করলে সঠিক চেয়ারের অভাবে ব্যাক পেইন হতে পারে। আরামদায়ক চেয়ারের গাইড।',
    date: '22-May-2025',
  },
  {
    name: 'নতুন পিসির জন্য কোন অপারেটিং সিস্টেম ভালো?',
    slug: 'best-operating-system-for-new-pc',
    image: BlogImage,
    shortDescription:
      'Windows, Linux নাকি অন্য কিছু? আপনার কাজের ধরন অনুযায়ী সেরা অপারেটিং সিস্টেম বেছে নিন।',
    date: '20-May-2025',
  },
  {
    name: 'ডুয়াল মনিটর সেটআপ কি সত্যিই দরকারি?',
    slug: 'dual-monitor-setup-benefits',
    image: BlogImage,
    shortDescription:
      'মাল্টিটাস্কিং ও প্রোডাকটিভিটির জন্য ডুয়াল মনিটর কতটা কার্যকর তা নিয়ে বিস্তারিত আলোচনা।',
    date: '18-May-2025',
  },
  {
    name: '২০২৫ সালের ট্রেন্ডিং টেক গ্যাজেট',
    slug: 'trending-tech-gadgets-2025',
    image: BlogImage,
    shortDescription:
      'এই বছরে কোন কোন টেক গ্যাজেট সবচেয়ে বেশি জনপ্রিয় হচ্ছে এবং ভবিষ্যতে কোনগুলোর চাহিদা বাড়বে—জেনে নিন।',
    date: '15-May-2025',
  },
];


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
                    {blogList.slice(0, limit).map((item, index) => (
                        <SwiperSlide key={index}>
                            <Link
                                href={'#'}
                                key={index}
                                className="flex flex-col gap-2 md:gap-3 p-3 md:p-4 rounded-2xl border border-[#bee5f6] bg-white  hover:-translate-y-3 duration-100 ease-linear hover:shadow-[0_3px_15px_#72C7EC] hover:border-[#72C7EC]"
                            >
                                <Image
                                    src={item.image}
                                    alt="Blog"
                                    className="w-full rounded-xl object-cover"
                                />
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
                                        {item.date}
                                    </p>
                                </div>
                                <div className="flex flex-col gap-2 md:gap-3">
                                    <p className="text-[14px] md:text-xl font-medium text-left text-[#303030]">
                                        {item.name}
                                    </p>
                                    <p className="text-[10px] md:text-base text-left text-[#505050]">
                                        {item.shortDescription}
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <p className="text-[12px] md:text-lg text-left text-[#303030]">Read more</p>
                                        <svg
                                            width={24}
                                            height={24}
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-3 md:w-6 h-3 md:h-6 relative"
                                            preserveAspectRatio="none"
                                        >
                                            <path d="M17 7L6 18" stroke="#303030" strokeWidth="1.5" strokeLinecap="round" />
                                            <path
                                                d="M11 6H17C17.4714 6 17.7071 6 17.8536 6.14645C18 6.29289 18 6.5286 18 7V13"
                                                stroke="#303030"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
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