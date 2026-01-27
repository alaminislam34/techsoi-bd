"use client";

import SafeImage from "@/components/ui/SafeImage";
import ImgA from "@/assets/reviewImg/0bd7b336ee0f46c2c76b65c477da259f0e5150e8.png";
import ImgB from "@/assets/reviewImg/3dfd7536813e08be8c37daddad937a682336646a.png";
import ImgC from "@/assets/reviewImg/59dd59bf65ddedbc29d142fbac28b6b94972e288.png";
import { FaStar } from "react-icons/fa";
import { Star } from "lucide-react";
import { useState } from "react";
import { useCreateReview } from "@/api/hooks/useReviews";
import { useAuth } from "@/Provider/AuthProvider";
import { toast } from "react-toastify";
import { useGetProductReviews } from "@/api/hooks/useReviews";
const summary = [
  { stars: 5, count: 22 },
  { stars: 4, count: 75 },
  { stars: 3, count: 12 },
  { stars: 2, count: 8 },
  { stars: 1, count: 7 },
];

type ReviewsSectionProps = {
  productId?: number;
};

export default function ReviewsSection({ productId }: ReviewsSectionProps) {
  const [rating, setRating] = useState(3);
  const [comment, setComment] = useState("");
  const { mutate: createReview, isPending } = useCreateReview();
  const { user } = useAuth();
  const {
    data: reviewResponse,
    isLoading,
    isError,
  } = useGetProductReviews(productId || 0);

  const reviews = reviewResponse?.data ?? [];

  const average = reviews.length
    ? reviews.reduce((sum, r) => sum + (Number(r.star) || 0), 0) / reviews.length
    : 0;

  const distribution = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((r) => Number(r.star) === star).length;
    const pct = reviews.length ? Math.round((count / reviews.length) * 100) : 0;
    return { star, count, pct };
  });

  const SkeletonRow = () => (
    <div className="flex gap-4 border-b border-[#BEE5F6] pb-6 animate-pulse">
      <div className="w-14 h-14 rounded-full bg-gray-200" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-1/3" />
        <div className="h-3 bg-gray-200 rounded w-1/4" />
        <div className="h-3 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-2/4" />
      </div>
    </div>
  );

  if (!productId) {
    return (
      <div className="p-6 rounded-xl bg-white">
        <h2 className="text-xl font-semibold mb-6">Customer Review</h2>
        <p className="text-gray-600">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-xl bg-white">
      {/* -------- TABS CONTENT -------- */}
      <h2 className="text-xl font-semibold mb-6">Customer Review</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
        {/* ---------- LEFT: REVIEW LIST ----------- */}
        <div className="lg:col-span-2 space-y-8">
          {isLoading && (
            <div className="space-y-6">
              <SkeletonRow />
              <SkeletonRow />
              <SkeletonRow />
            </div>
          )}

          {isError && <p className="text-gray-500">No Reviews.</p>}

          {!isLoading && !isError && reviews.length === 0 && (
            <p className="text-gray-600">No reviews yet. Be the first to review.</p>
          )}

          {!isLoading && !isError &&
            reviews.map((rev) => (
              <div
                key={rev.id}
                className="flex gap-4 border-b border-[#BEE5F6] pb-6"
              >
                <div className="w-14 h-14 rounded-full overflow-hidden">
                  <SafeImage
                    src={rev.user_name ? undefined : ImgB}
                    fallbackSrc={ImgA}
                    alt={rev.user_name || "User"}
                    width={55}
                    height={55}
                    className="object-cover w-full h-full"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{rev.user_name || "User"}</h3>
                      <p className="text-yellow-400">⭐ {rev.star}.0</p>
                    </div>

                    <p className="text-gray-400 text-sm">
                      {new Date(rev.created_at).toLocaleDateString()}
                    </p>
                  </div>

                  <p className="mt-2 text-gray-700 leading-relaxed">
                    {rev.message}
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
                Based on reviews
              </h2>

              <div className="rounded-xl border border-[#BEE5F6] p-4 md:p-6 flex flex-col justify-center">
                {isLoading ? (
                  <div className="space-y-4 animate-pulse">
                    <div className="h-10 bg-gray-200 rounded w-24 mx-auto" />
                    <div className="space-y-2">
                      {[...Array(5)].map((_, idx) => (
                        <div key={idx} className="h-3 bg-gray-200 rounded" />
                      ))}
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-4xl md:text-5xl font-bold text-blue-500 text-center">
                      {average.toFixed(1)}
                    </p>
                    <p className="text-center text-gray-600 mt-1">
                      Average rating
                    </p>

                    <div className="mt-4 md:mt-6 space-y-2">
                      {distribution.map((s) => (
                        <div key={s.star} className="flex items-center gap-3">
                          <span className="text-sm text-gray-700 w-12">
                            {s.star} ⭐
                          </span>

                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-400"
                              style={{ width: `${s.pct}%` }}
                            />
                          </div>

                          <span className="w-8 text-right text-sm">{s.count}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
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
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full mt-1 px-4 py-2 border border-[#9ED9F2] rounded-lg outline-none focus:ring-2 focus:ring-[#9ED9F2]"
              />

              <button
                disabled={isPending}
                onClick={() => {
                  if (!productId) {
                    toast.error("Product not found.");
                    return;
                  }
                  if (!user) {
                    toast.error("Please login to add a review.");
                    return;
                  }
                  if (!comment.trim()) {
                    toast.error("Please write a comment.");
                    return;
                  }
                  createReview(
                    { product_id: Number(productId), star: rating, message: comment.trim() },
                    {
                      onSuccess: () => {
                        setComment("");
                        setRating(3);
                      },
                    },
                  );
                }}
                className={`mt-3 w-full py-3 bg-[#2CACE2] cursor-pointer text-white rounded-xl font-medium ${isPending ? "opacity-60 cursor-not-allowed" : ""}`}
              >
                {isPending ? "Posting..." : "Add Review"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
