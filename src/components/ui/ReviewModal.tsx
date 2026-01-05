"use client";

import React, { useState } from "react";

type ReviewModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose }) => {
  const [rating, setRating] = useState(3);

  const summary = [
    { stars: 5, count: 22 },
    { stars: 4, count: 75 },
    { stars: 3, count: 12 },
    { stars: 2, count: 8 },
    { stars: 1, count: 7 },
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 z-40"
      />

      {/* Modal Wrapper */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        {/* Modal Box */}
        <div className="w-full max-w-5xl bg-white rounded-2xl p-6 shadow-xl relative flex flex-col md:flex-row gap-6 md:gap-10 h-auto md:h-[500px]">

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-700"
          >
            ✕
          </button>

          {/* ----------- SUMMARY / LEFT ----------- */}
          <div className="flex-1 flex flex-col justify-between">
            <div className="space-y-4 md:space-y-6">
              <h2 className="text-xl font-semibold text-center md:text-left">
                Based on those reviews
              </h2>

              <div className="rounded-xl border border-[#BEE5F6] bg-gray-50 p-4 md:p-6 flex flex-col justify-center h-full">
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
          <div className="flex-1 flex flex-col justify-between">
            <div className="space-y-4 md:space-y-6 h-full border-t md:border-t-0 md:border-l border-[#BEE5F6] pt-4 md:pt-0 md:pl-6">
              <h2 className="text-xl font-semibold mb-2 text-center md:text-left">
                Add a review
              </h2>

              {/* Rating stars */}
              <div className="flex justify-center md:justify-start gap-1 mb-2">
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
                className="w-full mt-1 px-4 py-2 border border-[#9ED9F2] rounded-lg outline-none focus:ring-2 focus:ring-[#9ED9F2]"
              />

              <button className="mt-3 w-full py-3 bg-[#2CACE2] cursor-pointer text-white rounded-xl font-medium">
                Add Review
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewModal;
