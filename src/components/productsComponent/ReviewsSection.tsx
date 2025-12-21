"use client";

import Image from "next/image";
import { useState } from "react";
import ImgA from "@/assets/reviewImg/0bd7b336ee0f46c2c76b65c477da259f0e5150e8.png";
import ImgB from "@/assets/reviewImg/3dfd7536813e08be8c37daddad937a682336646a.png";
import ImgC from "@/assets/reviewImg/59dd59bf65ddedbc29d142fbac28b6b94972e288.png";

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

  const summary = [
    { stars: 5, count: 22 },
    { stars: 4, count: 75 },
    { stars: 3, count: 12 },
    { stars: 2, count: 8 },
    { stars: 1, count: 7 },
  ];

  return (
    <div className="p-8  rounded-xl bg-white mt-10">
      {/* -------- TABS CONTENT -------- */}
      <h2 className="text-xl font-semibold mb-6">Customer Review</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* ---------- LEFT: REVIEW LIST ----------- */}
        <div className="lg:col-span-2 space-y-8">
          {reviews.map((rev) => (
            <div key={rev.id} className="flex gap-4 border-b border-[#BEE5F6] pb-6">
              <div className="w-[55px] h-[55px] rounded-full overflow-hidden">
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

        {/* ----------- RIGHT: SUMMARY ----------- */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Based on those reviews</h2>

          <div className="rounded-xl border border-[#BEE5F6] bg-gray-50 p-6">
            <p className="text-5xl font-bold text-blue-500 text-center">4.3</p>
            <p className="text-center text-gray-600 mt-1">Average reviews</p>

            <div className="mt-6 space-y-3">
              {summary.map((s) => (
                <div key={s.stars} className="flex items-center gap-3">
                  <span className="text-sm text-gray-700 w-12">{s.stars} ⭐</span>

                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-400"
                      style={{ width: `${s.count}%` }}
                    ></div>
                  </div>

                  <span className="w-8 text-right text-sm">{s.count}</span>
                </div>
              ))}
            </div>
            {/* -------------- ADD REVIEW -------------- */}
      <div className="mt-10 border-t border-[#BEE5F6] pt-8">
        <h2 className="text-xl font-semibold mb-4">Add a review</h2>

        {/* Rating stars */}
        <div className="flex gap-1 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className="text-2xl"
            >
              {star <= rating ? "⭐" : "★"}
            </button>
          ))}
        </div>

        <textarea
          rows={5}
          placeholder="Write your comment"
          className="w-full border border-[#BEE5F6] rounded-xl p-4 focus:ring-2 focus:ring-blue-300"
        ></textarea>

        <button className="mt-4 w-full py-3 bg-blue-500 text-white rounded-xl font-medium">
          Add Review
        </button>
      </div>
          </div>
        </div>
        
      </div>
    </div>

  );
}
