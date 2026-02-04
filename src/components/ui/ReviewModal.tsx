"use client";

import { Star } from "lucide-react";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useCreateReview } from "@/api/hooks/useReviews";
import { toast } from "react-toastify";

type ReviewModalProps = {
  isOpen: boolean;
  onClose: () => void;
  productId?: number;
};

const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  productId,
}) => {
  const [rating, setRating] = useState(3);
  const [message, setMessage] = useState("");
  const { mutateAsync: createReview, isPending } = useCreateReview();

  const handleSubmit = async () => {
    if (!productId) {
      toast.error("No product selected for review");
      return;
    }
    if (!message.trim()) {
      toast.error("Please লিখে দিন review message");
      return;
    }

    try {
      await createReview({
        product_id: productId,
        star: rating,
        message: message.trim(),
      });
      setMessage("");
      setRating(3);
      onClose();
    } catch (err: any) {
      toast.error(err?.message || "Failed to add review");
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div onClick={onClose} className="fixed inset-0 bg-black/40 z-40" />

      {/* Modal Wrapper */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        {/* Modal Box */}
        <div className="w-full max-w-xl bg-white rounded-2xl p-6 shadow-xl relative flex flex-col md:flex-row gap-6 md:gap-10 h-auto">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 hover:bg-gray-100 px-1.5 rounded-full bg-gray-50 right-4 text-gray-600 hover:text-gray-700"
          >
            ✕
          </button>

          {/* ----------- ADD REVIEW / RIGHT ----------- */}
          <div className="flex-1 flex flex-col justify-between">
            <div className="space-y-4 md:space-y-6 h-full border-t md:border-t-0  border-[#BEE5F6] pt-4 md:pt-0">
              <div className="flex flex-col justify-center items-center gap-2">
                <h2 className="text-xl md:text-2xl font-semibold mb-2 text-center md:text-left">
                  Add a review
                </h2>

                {/* Rating stars */}
                <div className="flex justify-center md:justify-start gap-1 mb-2">
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
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />

              <button
                onClick={handleSubmit}
                disabled={isPending}
                className={`mt-3 w-full py-3 bg-[#2CACE2] cursor-pointer text-white rounded-xl font-medium ${
                  isPending ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                {isPending ? "Submitting..." : "Add Review"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewModal;
