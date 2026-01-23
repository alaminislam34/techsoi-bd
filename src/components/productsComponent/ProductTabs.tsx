"use client";
import { useState } from "react";
import ReviewsSection from "./ReviewsSection";

interface ProductTabsProps {
  fullDescription?: string;
  specifications?: Array<{ name: string; value: string }>;
  reviews?: Array<any>;
  averageRating?: number;
  reviewCount?: number;
}

export default function ProductTabs({
  fullDescription,
  specifications = [],
  reviews,
  averageRating,
  reviewCount,
}: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div className="mt-16 border border-[#BEE5F6] rounded-xl">
      {/* Tab Buttons */}
      <div className="flex border-b border-[#BEE5F6] lg:p-4 md:p-2 sm:p-2 p-1">
        {["description", "specs", "reviews"].map((tab) => (
          <button
            key={tab}
            className={`px-3 py-2 text-xs sm:px-6 sm:py-3 sm:text-base rounded-xl font-semibold transition-colors duration-200 ${
              activeTab === tab
                ? "text-white bg-primary"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "description"
              ? "Description"
              : tab === "specs"
                ? "Technical Specs"
                : "Reviews"}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6 text-gray-700 leading-relaxed">
        {activeTab === "description" && (
          <div>
            <h2 className="text-2xl font-semibold text-cyan-600 mb-4">
              Product Details
            </h2>
            {fullDescription ? (
              <div className="prose max-w-none text-gray-700">
                {fullDescription.split(/\r?\n\r?\n/).map((para, idx) => (
                  <div key={idx}>
                    <p>{para}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No description available.</p>
            )}
          </div>
        )}

        {activeTab === "specs" && (
          <div className="divide-y divide-[#BEE5F6] rounded-xl bg-white overflow-hidden">
            {specifications.length > 0 ? (
              specifications.map((item, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-2 px-4 py-3 hover:bg-gray-50 transition"
                >
                  <div className="text-gray-600 font-medium">{item.name}:</div>
                  <div className="text-gray-900">{item.value}</div>
                </div>
              ))
            ) : (
              <div className="p-4 text-gray-500">
                No technical specifications available.
              </div>
            )}
          </div>
        )}

        {activeTab === "reviews" && <ReviewsSection />}
      </div>
    </div>
  );
}
