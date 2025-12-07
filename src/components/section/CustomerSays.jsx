'use client';
import Image from "next/image";
import CustomerImage from '@/assets/customer.png';
import {
    Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function CustomerSays() {

    const reviewList = [
        {
            name: 'Nusrat Ahmed',
            designation: 'Web Design Expert',
            image: CustomerImage,
            ratting: '5.0',
            message: 'আমি TechSoi থেকে একটা গেমিং ল্যাপটপ কিনেছি দামটা একদম জাস্টিফায়েড, প্রোডাক্ট একেবারে অরিজিনাল আর প্যাকেজিংও সেফ ছিল। কাস্টমার সাপোর্টও খুব দ্রুত রিপ্লাই দিয়েছে। আমি ভীষণ খুশি'
        },
        {
            name: 'Nusrat Ahmed',
            designation: 'Web Design Expert',
            image: CustomerImage,
            ratting: '5.0',
            message: 'আমি TechSoi থেকে একটা গেমিং ল্যাপটপ কিনেছি দামটা একদম জাস্টিফায়েড, প্রোডাক্ট একেবারে অরিজিনাল আর প্যাকেজিংও সেফ ছিল। কাস্টমার সাপোর্টও খুব দ্রুত রিপ্লাই দিয়েছে। আমি ভীষণ খুশি'
        },
        {
            name: 'Nusrat Ahmed',
            designation: 'Web Design Expert',
            image: CustomerImage,
            ratting: '5.0',
            message: 'আমি TechSoi থেকে একটা গেমিং ল্যাপটপ কিনেছি দামটা একদম জাস্টিফায়েড, প্রোডাক্ট একেবারে অরিজিনাল আর প্যাকেজিংও সেফ ছিল। কাস্টমার সাপোর্টও খুব দ্রুত রিপ্লাই দিয়েছে। আমি ভীষণ খুশি'
        },
        {
            name: 'Nusrat Ahmed',
            designation: 'Web Design Expert',
            image: CustomerImage,
            ratting: '5.0',
            message: 'আমি TechSoi থেকে একটা গেমিং ল্যাপটপ কিনেছি দামটা একদম জাস্টিফায়েড, প্রোডাক্ট একেবারে অরিজিনাল আর প্যাকেজিংও সেফ ছিল। কাস্টমার সাপোর্টও খুব দ্রুত রিপ্লাই দিয়েছে। আমি ভীষণ খুশি'
        },
        {
            name: 'Nusrat Ahmed',
            designation: 'Web Design Expert',
            image: CustomerImage,
            ratting: '5.0',
            message: 'আমি TechSoi থেকে একটা গেমিং ল্যাপটপ কিনেছি দামটা একদম জাস্টিফায়েড, প্রোডাক্ট একেবারে অরিজিনাল আর প্যাকেজিংও সেফ ছিল। কাস্টমার সাপোর্টও খুব দ্রুত রিপ্লাই দিয়েছে। আমি ভীষণ খুশি'
        },
        {
            name: 'Nusrat Ahmed',
            designation: 'Web Design Expert',
            image: CustomerImage,
            ratting: '5.0',
            message: 'আমি TechSoi থেকে একটা গেমিং ল্যাপটপ কিনেছি দামটা একদম জাস্টিফায়েড, প্রোডাক্ট একেবারে অরিজিনাল আর প্যাকেজিংও সেফ ছিল। কাস্টমার সাপোর্টও খুব দ্রুত রিপ্লাই দিয়েছে। আমি ভীষণ খুশি'
        },
        {
            name: 'Nusrat Ahmed',
            designation: 'Web Design Expert',
            image: CustomerImage,
            ratting: '5.0',
            message: 'আমি TechSoi থেকে একটা গেমিং ল্যাপটপ কিনেছি দামটা একদম জাস্টিফায়েড, প্রোডাক্ট একেবারে অরিজিনাল আর প্যাকেজিংও সেফ ছিল। কাস্টমার সাপোর্টও খুব দ্রুত রিপ্লাই দিয়েছে। আমি ভীষণ খুশি'
        },
        {
            name: 'Nusrat Ahmed',
            designation: 'Web Design Expert',
            image: CustomerImage,
            ratting: '5.0',
            message: 'আমি TechSoi থেকে একটা গেমিং ল্যাপটপ কিনেছি দামটা একদম জাস্টিফায়েড, প্রোডাক্ট একেবারে অরিজিনাল আর প্যাকেজিংও সেফ ছিল। কাস্টমার সাপোর্টও খুব দ্রুত রিপ্লাই দিয়েছে। আমি ভীষণ খুশি'
        },
    ];

    return (
        <>
            <div className="relative">
                <div className="hidden md:block absolute top-0 left-0 w-[200px] h-full bg-gradient-to-l from-white/0 to-white z-10 -ml-[67px]"></div>
                <div className="hidden md:block absolute top-0 right-0 w-[200px] h-full bg-gradient-to-r from-white/0 to-white z-10 -mr-[67px]"></div>
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
                    <SwiperSlide>
                        <div
                            className="flex flex-col overflow-hidden px-[16px] md:px-[27px] py-[16px] md:py-8 rounded-[16px] md:rounded-2xl bg-white border border-[#bee5f6]"
                            style={{ boxShadow: "0px 5px 15px 0 rgba(44,172,226,0.2)" }}
                        >
                            <div className="flex flex-col relative gap-8">
                                <div className="flex justify-between">
                                    <div className="flex items-center relative gap-2.5">
                                        <Image
                                            src={CustomerImage}
                                            alt="customer"
                                            className=""
                                        />
                                        <div className="flex flex-col">
                                            <p className="text-[22px] md:text-[32px] font-medium text-[#303030]">
                                                Nusrat Ahmed
                                            </p>
                                            <p className="text-[12px] md:text-xl font-medium text-[#808080]">
                                                Web Design Expert
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
                                            <span className="text-[#185f7c]">
                                                5.0
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-[14px] md:text-xl text-[#4b5565]">
                                    আমি TechSoi থেকে একটা গেমিং ল্যাপটপ কিনেছি দামটা একদম জাস্টিফায়েড, প্রোডাক্ট একেবারে অরিজিনাল আর প্যাকেজিংও সেফ ছিল। কাস্টমার সাপোর্টও খুব দ্রুত রিপ্লাই দিয়েছে। আমি ভীষণ খুশি
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div
                            className="flex flex-col overflow-hidden px-[16px] md:px-[27px] py-[16px] md:py-8 rounded-[16px] md:rounded-2xl bg-white border border-[#bee5f6]"
                            style={{ boxShadow: "0px 5px 15px 0 rgba(44,172,226,0.2)" }}
                        >
                            <div className="flex flex-col relative gap-8">
                                <div className="flex justify-between">
                                    <div className="flex items-center relative gap-2.5">
                                        <Image
                                            src={CustomerImage}
                                            alt="customer"
                                            className=""
                                        />
                                        <div className="flex flex-col">
                                            <p className="text-[22px] md:text-[32px] font-medium text-[#303030]">
                                                Nusrat Ahmed
                                            </p>
                                            <p className="text-[12px] md:text-xl font-medium text-[#808080]">
                                                Web Design Expert
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
                                            <span className="text-[#185f7c]">
                                                5.0
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-[14px] md:text-xl text-[#4b5565]">
                                    আমি TechSoi থেকে একটা গেমিং ল্যাপটপ কিনেছি দামটা একদম জাস্টিফায়েড, প্রোডাক্ট একেবারে অরিজিনাল আর প্যাকেজিংও সেফ ছিল। কাস্টমার সাপোর্টও খুব দ্রুত রিপ্লাই দিয়েছে। আমি ভীষণ খুশি
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div
                            className="flex flex-col overflow-hidden px-[16px] md:px-[27px] py-[16px] md:py-8 rounded-[16px] md:rounded-2xl bg-white border border-[#bee5f6]"
                            style={{ boxShadow: "0px 5px 15px 0 rgba(44,172,226,0.2)" }}
                        >
                            <div className="flex flex-col relative gap-8">
                                <div className="flex justify-between">
                                    <div className="flex items-center relative gap-2.5">
                                        <Image
                                            src={CustomerImage}
                                            alt="customer"
                                            className=""
                                        />
                                        <div className="flex flex-col">
                                            <p className="text-[22px] md:text-[32px] font-medium text-[#303030]">
                                                Nusrat Ahmed
                                            </p>
                                            <p className="text-[12px] md:text-xl font-medium text-[#808080]">
                                                Web Design Expert
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
                                            <span className="text-[#185f7c]">
                                                5.0
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-[14px] md:text-xl text-[#4b5565]">
                                    আমি TechSoi থেকে একটা গেমিং ল্যাপটপ কিনেছি দামটা একদম জাস্টিফায়েড, প্রোডাক্ট একেবারে অরিজিনাল আর প্যাকেজিংও সেফ ছিল। কাস্টমার সাপোর্টও খুব দ্রুত রিপ্লাই দিয়েছে। আমি ভীষণ খুশি
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div
                            className="flex flex-col overflow-hidden px-[16px] md:px-[27px] py-[16px] md:py-8 rounded-[16px] md:rounded-2xl bg-white border border-[#bee5f6]"
                            style={{ boxShadow: "0px 5px 15px 0 rgba(44,172,226,0.2)" }}
                        >
                            <div className="flex flex-col relative gap-8">
                                <div className="flex justify-between">
                                    <div className="flex items-center relative gap-2.5">
                                        <Image
                                            src={CustomerImage}
                                            alt="customer"
                                            className=""
                                        />
                                        <div className="flex flex-col">
                                            <p className="text-[22px] md:text-[32px] font-medium text-[#303030]">
                                                Nusrat Ahmed
                                            </p>
                                            <p className="text-[12px] md:text-xl font-medium text-[#808080]">
                                                Web Design Expert
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
                                            <span className="text-[#185f7c]">
                                                5.0
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-[14px] md:text-xl text-[#4b5565]">
                                    আমি TechSoi থেকে একটা গেমিং ল্যাপটপ কিনেছি দামটা একদম জাস্টিফায়েড, প্রোডাক্ট একেবারে অরিজিনাল আর প্যাকেজিংও সেফ ছিল। কাস্টমার সাপোর্টও খুব দ্রুত রিপ্লাই দিয়েছে। আমি ভীষণ খুশি
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div
                            className="flex flex-col overflow-hidden px-[16px] md:px-[27px] py-[16px] md:py-8 rounded-[16px] md:rounded-2xl bg-white border border-[#bee5f6]"
                            style={{ boxShadow: "0px 5px 15px 0 rgba(44,172,226,0.2)" }}
                        >
                            <div className="flex flex-col relative gap-8">
                                <div className="flex justify-between">
                                    <div className="flex items-center relative gap-2.5">
                                        <Image
                                            src={CustomerImage}
                                            alt="customer"
                                            className=""
                                        />
                                        <div className="flex flex-col">
                                            <p className="text-[22px] md:text-[32px] font-medium text-[#303030]">
                                                Nusrat Ahmed
                                            </p>
                                            <p className="text-[12px] md:text-xl font-medium text-[#808080]">
                                                Web Design Expert
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
                                            <span className="text-[#185f7c]">
                                                5.0
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-[14px] md:text-xl text-[#4b5565]">
                                    আমি TechSoi থেকে একটা গেমিং ল্যাপটপ কিনেছি দামটা একদম জাস্টিফায়েড, প্রোডাক্ট একেবারে অরিজিনাল আর প্যাকেজিংও সেফ ছিল। কাস্টমার সাপোর্টও খুব দ্রুত রিপ্লাই দিয়েছে। আমি ভীষণ খুশি
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div
                            className="flex flex-col overflow-hidden px-[16px] md:px-[27px] py-[16px] md:py-8 rounded-[16px] md:rounded-2xl bg-white border border-[#bee5f6]"
                            style={{ boxShadow: "0px 5px 15px 0 rgba(44,172,226,0.2)" }}
                        >
                            <div className="flex flex-col relative gap-8">
                                <div className="flex justify-between">
                                    <div className="flex items-center relative gap-2.5">
                                        <Image
                                            src={CustomerImage}
                                            alt="customer"
                                            className=""
                                        />
                                        <div className="flex flex-col">
                                            <p className="text-[22px] md:text-[32px] font-medium text-[#303030]">
                                                Nusrat Ahmed
                                            </p>
                                            <p className="text-[12px] md:text-xl font-medium text-[#808080]">
                                                Web Design Expert
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
                                            <span className="text-[#185f7c]">
                                                5.0
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-[14px] md:text-xl text-[#4b5565]">
                                    আমি TechSoi থেকে একটা গেমিং ল্যাপটপ কিনেছি দামটা একদম জাস্টিফায়েড, প্রোডাক্ট একেবারে অরিজিনাল আর প্যাকেজিংও সেফ ছিল। কাস্টমার সাপোর্টও খুব দ্রুত রিপ্লাই দিয়েছে। আমি ভীষণ খুশি
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div
                            className="flex flex-col overflow-hidden px-[16px] md:px-[27px] py-[16px] md:py-8 rounded-[16px] md:rounded-2xl bg-white border border-[#bee5f6]"
                            style={{ boxShadow: "0px 5px 15px 0 rgba(44,172,226,0.2)" }}
                        >
                            <div className="flex flex-col relative gap-8">
                                <div className="flex justify-between">
                                    <div className="flex items-center relative gap-2.5">
                                        <Image
                                            src={CustomerImage}
                                            alt="customer"
                                            className=""
                                        />
                                        <div className="flex flex-col">
                                            <p className="text-[22px] md:text-[32px] font-medium text-[#303030]">
                                                Nusrat Ahmed
                                            </p>
                                            <p className="text-[12px] md:text-xl font-medium text-[#808080]">
                                                Web Design Expert
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
                                            <span className="text-[#185f7c]">
                                                5.0
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-[14px] md:text-xl text-[#4b5565]">
                                    আমি TechSoi থেকে একটা গেমিং ল্যাপটপ কিনেছি দামটা একদম জাস্টিফায়েড, প্রোডাক্ট একেবারে অরিজিনাল আর প্যাকেজিংও সেফ ছিল। কাস্টমার সাপোর্টও খুব দ্রুত রিপ্লাই দিয়েছে। আমি ভীষণ খুশি
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div
                            className="flex flex-col overflow-hidden px-[16px] md:px-[27px] py-[16px] md:py-8 rounded-[16px] md:rounded-2xl bg-white border border-[#bee5f6]"
                            style={{ boxShadow: "0px 5px 15px 0 rgba(44,172,226,0.2)" }}
                        >
                            <div className="flex flex-col relative gap-8">
                                <div className="flex justify-between">
                                    <div className="flex items-center relative gap-2.5">
                                        <Image
                                            src={CustomerImage}
                                            alt="customer"
                                            className=""
                                        />
                                        <div className="flex flex-col">
                                            <p className="text-[22px] md:text-[32px] font-medium text-[#303030]">
                                                Nusrat Ahmed
                                            </p>
                                            <p className="text-[12px] md:text-xl font-medium text-[#808080]">
                                                Web Design Expert
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
                                            <span className="text-[#185f7c]">
                                                5.0
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-[14px] md:text-xl text-[#4b5565]">
                                    আমি TechSoi থেকে একটা গেমিং ল্যাপটপ কিনেছি দামটা একদম জাস্টিফায়েড, প্রোডাক্ট একেবারে অরিজিনাল আর প্যাকেজিংও সেফ ছিল। কাস্টমার সাপোর্টও খুব দ্রুত রিপ্লাই দিয়েছে। আমি ভীষণ খুশি
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
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
                    <SwiperSlide>
                        <div
                            className="flex flex-col overflow-hidden px-[16px] md:px-[27px] py-[16px] md:py-8 rounded-[16px] md:rounded-2xl bg-white border border-[#bee5f6]"
                            style={{ boxShadow: "0px 5px 15px 0 rgba(44,172,226,0.2)" }}
                        >
                            <div className="flex flex-col relative gap-8">
                                <div className="flex justify-between">
                                    <div className="flex items-center relative gap-2.5">
                                        <Image
                                            src={CustomerImage}
                                            alt="customer"
                                            className=""
                                        />
                                        <div className="flex flex-col">
                                            <p className="text-[22px] md:text-[32px] font-medium text-[#303030]">
                                                Nusrat Ahmed
                                            </p>
                                            <p className="text-[12px] md:text-xl font-medium text-[#808080]">
                                                Web Design Expert
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
                                            <span className="text-[#185f7c]">
                                                5.0
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-[14px] md:text-xl text-[#4b5565]">
                                    আমি TechSoi থেকে একটা গেমিং ল্যাপটপ কিনেছি দামটা একদম জাস্টিফায়েড, প্রোডাক্ট একেবারে অরিজিনাল আর প্যাকেজিংও সেফ ছিল। কাস্টমার সাপোর্টও খুব দ্রুত রিপ্লাই দিয়েছে। আমি ভীষণ খুশি
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div
                            className="flex flex-col overflow-hidden px-[16px] md:px-[27px] py-[16px] md:py-8 rounded-[16px] md:rounded-2xl bg-white border border-[#bee5f6]"
                            style={{ boxShadow: "0px 5px 15px 0 rgba(44,172,226,0.2)" }}
                        >
                            <div className="flex flex-col relative gap-8">
                                <div className="flex justify-between">
                                    <div className="flex items-center relative gap-2.5">
                                        <Image
                                            src={CustomerImage}
                                            alt="customer"
                                            className=""
                                        />
                                        <div className="flex flex-col">
                                            <p className="text-[22px] md:text-[32px] font-medium text-[#303030]">
                                                Nusrat Ahmed
                                            </p>
                                            <p className="text-[12px] md:text-xl font-medium text-[#808080]">
                                                Web Design Expert
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
                                            <span className="text-[#185f7c]">
                                                5.0
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-[14px] md:text-xl text-[#4b5565]">
                                    আমি TechSoi থেকে একটা গেমিং ল্যাপটপ কিনেছি দামটা একদম জাস্টিফায়েড, প্রোডাক্ট একেবারে অরিজিনাল আর প্যাকেজিংও সেফ ছিল। কাস্টমার সাপোর্টও খুব দ্রুত রিপ্লাই দিয়েছে। আমি ভীষণ খুশি
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div
                            className="flex flex-col overflow-hidden px-[16px] md:px-[27px] py-[16px] md:py-8 rounded-[16px] md:rounded-2xl bg-white border border-[#bee5f6]"
                            style={{ boxShadow: "0px 5px 15px 0 rgba(44,172,226,0.2)" }}
                        >
                            <div className="flex flex-col relative gap-8">
                                <div className="flex justify-between">
                                    <div className="flex items-center relative gap-2.5">
                                        <Image
                                            src={CustomerImage}
                                            alt="customer"
                                            className=""
                                        />
                                        <div className="flex flex-col">
                                            <p className="text-[22px] md:text-[32px] font-medium text-[#303030]">
                                                Nusrat Ahmed
                                            </p>
                                            <p className="text-[12px] md:text-xl font-medium text-[#808080]">
                                                Web Design Expert
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
                                            <span className="text-[#185f7c]">
                                                5.0
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-[14px] md:text-xl text-[#4b5565]">
                                    আমি TechSoi থেকে একটা গেমিং ল্যাপটপ কিনেছি দামটা একদম জাস্টিফায়েড, প্রোডাক্ট একেবারে অরিজিনাল আর প্যাকেজিংও সেফ ছিল। কাস্টমার সাপোর্টও খুব দ্রুত রিপ্লাই দিয়েছে। আমি ভীষণ খুশি
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div
                            className="flex flex-col overflow-hidden px-[16px] md:px-[27px] py-[16px] md:py-8 rounded-[16px] md:rounded-2xl bg-white border border-[#bee5f6]"
                            style={{ boxShadow: "0px 5px 15px 0 rgba(44,172,226,0.2)" }}
                        >
                            <div className="flex flex-col relative gap-8">
                                <div className="flex justify-between">
                                    <div className="flex items-center relative gap-2.5">
                                        <Image
                                            src={CustomerImage}
                                            alt="customer"
                                            className=""
                                        />
                                        <div className="flex flex-col">
                                            <p className="text-[22px] md:text-[32px] font-medium text-[#303030]">
                                                Nusrat Ahmed
                                            </p>
                                            <p className="text-[12px] md:text-xl font-medium text-[#808080]">
                                                Web Design Expert
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
                                            <span className="text-[#185f7c]">
                                                5.0
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-[14px] md:text-xl text-[#4b5565]">
                                    আমি TechSoi থেকে একটা গেমিং ল্যাপটপ কিনেছি দামটা একদম জাস্টিফায়েড, প্রোডাক্ট একেবারে অরিজিনাল আর প্যাকেজিংও সেফ ছিল। কাস্টমার সাপোর্টও খুব দ্রুত রিপ্লাই দিয়েছে। আমি ভীষণ খুশি
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div
                            className="flex flex-col overflow-hidden px-[16px] md:px-[27px] py-[16px] md:py-8 rounded-[16px] md:rounded-2xl bg-white border border-[#bee5f6]"
                            style={{ boxShadow: "0px 5px 15px 0 rgba(44,172,226,0.2)" }}
                        >
                            <div className="flex flex-col relative gap-8">
                                <div className="flex justify-between">
                                    <div className="flex items-center relative gap-2.5">
                                        <Image
                                            src={CustomerImage}
                                            alt="customer"
                                            className=""
                                        />
                                        <div className="flex flex-col">
                                            <p className="text-[22px] md:text-[32px] font-medium text-[#303030]">
                                                Nusrat Ahmed
                                            </p>
                                            <p className="text-[12px] md:text-xl font-medium text-[#808080]">
                                                Web Design Expert
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
                                            <span className="text-[#185f7c]">
                                                5.0
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-[14px] md:text-xl text-[#4b5565]">
                                    আমি TechSoi থেকে একটা গেমিং ল্যাপটপ কিনেছি দামটা একদম জাস্টিফায়েড, প্রোডাক্ট একেবারে অরিজিনাল আর প্যাকেজিংও সেফ ছিল। কাস্টমার সাপোর্টও খুব দ্রুত রিপ্লাই দিয়েছে। আমি ভীষণ খুশি
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div
                            className="flex flex-col overflow-hidden px-[16px] md:px-[27px] py-[16px] md:py-8 rounded-[16px] md:rounded-2xl bg-white border border-[#bee5f6]"
                            style={{ boxShadow: "0px 5px 15px 0 rgba(44,172,226,0.2)" }}
                        >
                            <div className="flex flex-col relative gap-8">
                                <div className="flex justify-between">
                                    <div className="flex items-center relative gap-2.5">
                                        <Image
                                            src={CustomerImage}
                                            alt="customer"
                                            className=""
                                        />
                                        <div className="flex flex-col">
                                            <p className="text-[22px] md:text-[32px] font-medium text-[#303030]">
                                                Nusrat Ahmed
                                            </p>
                                            <p className="text-[12px] md:text-xl font-medium text-[#808080]">
                                                Web Design Expert
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
                                            <span className="text-[#185f7c]">
                                                5.0
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-[14px] md:text-xl text-[#4b5565]">
                                    আমি TechSoi থেকে একটা গেমিং ল্যাপটপ কিনেছি দামটা একদম জাস্টিফায়েড, প্রোডাক্ট একেবারে অরিজিনাল আর প্যাকেজিংও সেফ ছিল। কাস্টমার সাপোর্টও খুব দ্রুত রিপ্লাই দিয়েছে। আমি ভীষণ খুশি
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div
                            className="flex flex-col overflow-hidden px-[16px] md:px-[27px] py-[16px] md:py-8 rounded-[16px] md:rounded-2xl bg-white border border-[#bee5f6]"
                            style={{ boxShadow: "0px 5px 15px 0 rgba(44,172,226,0.2)" }}
                        >
                            <div className="flex flex-col relative gap-8">
                                <div className="flex justify-between">
                                    <div className="flex items-center relative gap-2.5">
                                        <Image
                                            src={CustomerImage}
                                            alt="customer"
                                            className=""
                                        />
                                        <div className="flex flex-col">
                                            <p className="text-[22px] md:text-[32px] font-medium text-[#303030]">
                                                Nusrat Ahmed
                                            </p>
                                            <p className="text-[12px] md:text-xl font-medium text-[#808080]">
                                                Web Design Expert
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
                                            <span className="text-[#185f7c]">
                                                5.0
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-[14px] md:text-xl text-[#4b5565]">
                                    আমি TechSoi থেকে একটা গেমিং ল্যাপটপ কিনেছি দামটা একদম জাস্টিফায়েড, প্রোডাক্ট একেবারে অরিজিনাল আর প্যাকেজিংও সেফ ছিল। কাস্টমার সাপোর্টও খুব দ্রুত রিপ্লাই দিয়েছে। আমি ভীষণ খুশি
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div
                            className="flex flex-col overflow-hidden px-[16px] md:px-[27px] py-[16px] md:py-8 rounded-[16px] md:rounded-2xl bg-white border border-[#bee5f6]"
                            style={{ boxShadow: "0px 5px 15px 0 rgba(44,172,226,0.2)" }}
                        >
                            <div className="flex flex-col relative gap-8">
                                <div className="flex justify-between">
                                    <div className="flex items-center relative gap-2.5">
                                        <Image
                                            src={CustomerImage}
                                            alt="customer"
                                            className=""
                                        />
                                        <div className="flex flex-col">
                                            <p className="text-[22px] md:text-[32px] font-medium text-[#303030]">
                                                Nusrat Ahmed
                                            </p>
                                            <p className="text-[12px] md:text-xl font-medium text-[#808080]">
                                                Web Design Expert
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
                                            <span className="text-[#185f7c]">
                                                5.0
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-[14px] md:text-xl text-[#4b5565]">
                                    আমি TechSoi থেকে একটা গেমিং ল্যাপটপ কিনেছি দামটা একদম জাস্টিফায়েড, প্রোডাক্ট একেবারে অরিজিনাল আর প্যাকেজিংও সেফ ছিল। কাস্টমার সাপোর্টও খুব দ্রুত রিপ্লাই দিয়েছে। আমি ভীষণ খুশি
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
                {/* <div className="grid grid-cols-3 gap-x-10 gap-y-6 mt-12">
                    <div
                        className="flex flex-col overflow-hidden gap-2.5 px-[27px] py-8 rounded-2xl bg-white border border-[#bee5f6]"
                        style={{ boxShadow: "0px 5px 15px 0 rgba(44,172,226,0.2)" }}
                    >
                        <div className="flex flex-col relative gap-8">
                            <div className="flex justify-between">
                                <div className="flex items-center relative gap-2.5">
                                    <Image
                                        src={CustomerImage}
                                        alt="customer"
                                        className=""
                                    />
                                    <div className="flex flex-col">
                                        <p className="text-[32px] font-medium text-[#303030]">
                                            Nusrat Ahmed
                                        </p>
                                        <p className="text-xl font-medium text-[#808080]">
                                            Web Design Expert
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
                                        <span className="text-[#185f7c]">
                                            5.0
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-xl text-[#4b5565]">
                                আমি TechSoi থেকে একটা গেমিং ল্যাপটপ কিনেছি দামটা একদম জাস্টিফায়েড, প্রোডাক্ট একেবারে অরিজিনাল আর প্যাকেজিংও সেফ ছিল। কাস্টমার সাপোর্টও খুব দ্রুত রিপ্লাই দিয়েছে। আমি ভীষণ খুশি
                            </p>
                        </div>
                    </div>
                </div> */}
            </div>
        </>
    );
}