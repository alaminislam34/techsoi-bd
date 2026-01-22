"use client";

import Image from "next/image";
import ImgA from "@/assets/reviewImg/0bd7b336ee0f46c2c76b65c477da259f0e5150e8.png";
import ImgB from "@/assets/reviewImg/3dfd7536813e08be8c37daddad937a682336646a.png";
import ImgC from "@/assets/reviewImg/59dd59bf65ddedbc29d142fbac28b6b94972e288.png";
import { FaStar } from "react-icons/fa";
import { Star } from "lucide-react";
import { useState } from "react";
const summary = [
  { stars: 5, count: 22 },
  { stars: 4, count: 75 },
  { stars: 3, count: 12 },
  { stars: 2, count: 8 },
  { stars: 1, count: 7 },
];

export default function ReviewsSection() {
  const [rating, setRating] = useState(3);
  const reviews = [
    {
      id: 1,
      name: "Zayed Khan",
      rating: 5,
      daysAgo: "3 Days ago",
      comment:
        "TechSoi থেকে আমি প্রথমবারের মতো নিজেকে সিপি বিল কিনলাম। ওরা আমাকে পার্টস বাছাইয়ে দারুণভাবে সাহায্য করেছে। সত্যি কথা বলতে, এখন থেকে আমার ফেভারিট শপ।",
      img: ImgC,
    },
    {
      id: 2,
      name: "Puja Cherry",
      rating: 5,
      daysAgo: "3 Days ago",
      comment:
        "আমি TechSoi থেকে একটা গেইমিং ল্যাপটপ নিয়েছি। দারুণ একটা জাস্টিফায়েড, প্রোডাক্ট একদম অরিজিনাল আর প্যাকেজিংও সেফ ছিল। সার্ভিসটা সত্যিই ভালো লেগেছে!",
      img: ImgA,
    },
    {
      id: 3,
      name: "Nusrat Faria",
      rating: 5,
      daysAgo: "3 Days ago",
      comment:
        "কম্পিউটার এক্সেসরিজ কেনার জন্য TechSoi অসাধারণ জায়গা। আমি এখান থেকে মেকানিক্যাল কিবোর্ড নিয়েছি, সাউন্ড ও বিল্ড কোয়ালিটি দুটোই দারুণ!",
      img: ImgB,
    },
  ];

  return (
    <div className="p-6 rounded-xl bg-white">
      {/* -------- TABS CONTENT -------- */}
      <h2 className="text-xl font-semibold mb-6">Customer Review</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
        {/* ---------- LEFT: REVIEW LIST ----------- */}
        <div className="lg:col-span-2 space-y-8">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="flex gap-4 border-b border-[#BEE5F6] pb-6"
            >
              <div className="w-14 h-14 rounded-full overflow-hidden">
                <Image
                  src={rev.img}
                  alt={rev.name}
                  width={55}
                  height={55}
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="flex-1">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{rev.name}</h3>
                    <p className="text-yellow-400">⭐ {rev.rating}.0</p>
                  </div>

                  <p className="text-gray-400 text-sm">{rev.daysAgo}</p>
                </div>

                <p className="mt-2 text-gray-700 leading-relaxed">
                  {rev.comment}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div>
          {/* ----------- SUMMARY / LEFT ----------- */}
          <div className="flex-1 flex flex-col justify-between">
            <div className="space-y-4 md:space-y-6 h-full">
              <h2 className="text-xl font-semibold text-center md:text-left">
                Based on those reviews
              </h2>

              <div className="rounded-xl border border-[#BEE5F6] p-4 md:p-6 flex flex-col justify-center">
                <p className="text-4xl md:text-5xl font-bold text-blue-500 text-center">
                  4.3
                </p>
                <p className="text-center text-gray-600 mt-1">
                  Average reviews
                </p>

                <div className="mt-4 md:mt-6 space-y-2">
                  {summary.map((s) => (
                    <div key={s.stars} className="flex items-center gap-3">
                      <span className="text-sm text-gray-700 w-12">
                        {s.stars} ⭐
                      </span>

                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-400"
                          style={{ width: `${s.count}%` }}
                        />
                      </div>

                      <span className="w-8 text-right text-sm">{s.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* ----------- ADD REVIEW / RIGHT ----------- */}
          <div className="flex-1 flex flex-col justify-between mt-6">
            <div className="space-y-4 md:space-y-6 h-full border-t md:border-t-0  border-[#BEE5F6] pt-4 md:pt-0">
              <div className="flex flex-col gap-2">
                <h2 className="text-xl md:text-2xl font-semibold mb-2 text-left">
                  Add a review
                </h2>

                {/* Rating stars */}
                <div className="flex justify-start gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className=" text-orange-400 flex items-center "
                    >
                      {star <= rating ? (
                        <FaStar className="text-2xl" />
                      ) : (
                        <span>
                          <Star />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                rows={5}
                placeholder="Write your comment"
                className="w-full mt-1 px-4 py-2 border border-[#9ED9F2] rounded-lg outline-none focus:ring-2 focus:ring-[#9ED9F2]"
              />

              <button className="mt-3 w-full py-3 bg-[#2CACE2] cursor-pointer text-white rounded-xl font-medium">
                Add Review
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
