"use client";

import SafeImage from "@/components/ui/SafeImage";
import { FaStar } from "react-icons/fa";
import { Star } from "lucide-react";
import { useState } from "react";
import { useCreateReview } from "@/api/hooks/useReviews";
import { useAuth } from "@/Provider/AuthProvider";
import { toast } from "react-toastify";
export default function ReviewsSection({
  reviews = [],
  productId,
}: {
  reviews?: Array<any>;
  productId?: number;
}) {
  const [rating, setRating] = useState(3);
  const [comment, setComment] = useState("");
  const { mutate: createReview, isPending } = useCreateReview();
  const { user } = useAuth();

  const average = reviews.length
    ? reviews.reduce((sum, r) => sum + (Number(r.star) || 0), 0) /
      reviews.length
    : 0;

  const distribution = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((r) => Number(r.star) === star).length;
    const pct = reviews.length ? Math.round((count / reviews.length) * 100) : 0;
    return { star, count, pct };
  });

  console.log("My reviews", reviews);

  return (
    <div className="p-4 sm:p-6 rounded-xl bg-white">
      {/* -------- TABS CONTENT -------- */}
      <h2 className="text-xl font-semibold mb-6">Customer Review</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
        {/* ---------- LEFT: REVIEW LIST ----------- */}
        <div className="lg:col-span-2 space-y-6 sm:space-y-8">
          {reviews.length === 0 && (
            <p className="text-gray-600">
              No reviews yet. Be the first to review.
            </p>
          )}

          {reviews.map((rev) => {
            const reviewer = rev.user?.[0];
            const userName = reviewer?.name;
            const userImage = reviewer?.image;

            return (
              <div
                key={rev.id}
                className="flex flex-col sm:flex-row gap-4 border-b border-[#BEE5F6] pb-6"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden">
                  <SafeImage
                    src={userImage}
                    alt={userName}
                    width={55}
                    height={55}
                    className="object-cover w-full h-full"
                  />
                </div>

                <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-6">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <h3 className="font-semibold text-base sm:text-lg">
                      {userName}
                    </h3>

                    <p className="text-gray-700 leading-relaxed wrap-break-word">
                      {rev.message}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-sm sm:text-base">
                    <p className="text-yellow-400">⭐ {rev.star}.0</p>
                    <p className="text-gray-400 text-sm">
                      {new Date(rev.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="space-y-6">
          {/* ----------- SUMMARY / LEFT ----------- */}
          <div className="flex-1 flex flex-col justify-between">
            <div className="space-y-4 md:space-y-6 h-full">
              <h2 className="text-xl font-semibold text-center md:text-left">
                Based on reviews
              </h2>

              <div className="rounded-xl border border-[#BEE5F6] p-4 md:p-6 flex flex-col justify-center">
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
                        <span className="text-sm text-gray-700 w-10 sm:w-12">
                          {s.star} ⭐
                        </span>

                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-400"
                            style={{ width: `${s.pct}%` }}
                          />
                        </div>

                        <span className="w-8 text-right text-sm">
                          {s.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              </div>
            </div>
          </div>
          {/* ----------- ADD REVIEW / RIGHT ----------- */}
          <div className="flex-1 flex flex-col justify-between">
            <div className="space-y-4 md:space-y-6 h-full border-t md:border-t-0 border-[#BEE5F6] pt-4 md:pt-0">
              <div className="flex flex-col gap-2">
                <h2 className="text-xl md:text-2xl font-semibold mb-2 text-left">
                  Add a review
                </h2>

                {/* Rating stars */}
                <div className="flex justify-start gap-1 mb-2 flex-wrap">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className="text-orange-400 flex items-center"
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
                    {
                      product_id: Number(productId),
                      star: rating,
                      message: comment.trim(),
                    },
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
