"use client";

import Image from "next/image";
import ImgA from "@/assets/reviewImg/0bd7b336ee0f46c2c76b65c477da259f0e5150e8.png";
import ImgB from "@/assets/reviewImg/3dfd7536813e08be8c37daddad937a682336646a.png";
import ImgC from "@/assets/reviewImg/59dd59bf65ddedbc29d142fbac28b6b94972e288.png";

export default function ReviewsSection() {

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
        
      </div>
    </div>

  );
}
