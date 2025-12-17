"use client";
import { useState } from "react";
import ReviewsSection from "./ReviewsSection";

export default function ProductTabs() {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div className="mt-16 border rounded-xl">
      {/* Tab Buttons */}
      <div className="flex border-b p-4">
        {["description", "specs", "reviews"].map((tab) => (
          <button
            key={tab}
            className={`px-6 py-3 rounded-xl font-semibold transition-colors duration-200 ${
              activeTab === tab
                ? "text-white bg-[#2cace2]"
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
          <p>
            Lorem Ipsum is simply dummy text of the printing and
            typesetting industry…
          </p>
        )}

        {activeTab === "specs" && (
          <div className="divide-y rounded-xl  bg-white overflow-hidden">
            {[
                { label: "Height", value: "1" },
                { label: "Material", value: "2" },
                { label: "Case", value: "3" },
                { label: "Color", value: "4" },
                { label: "Depth", value: "5" },
                { label: "Width", value: "6" },
                { label: "Size", value: "7" },
            ].map((item) => (
                <div
                key={item.label}
                className="grid grid-cols-2 px-4 py-3 hover:bg-gray-50 transition"
                >
                <div className="text-gray-600 font-medium">{item.label}:</div>
                <div className="text-gray-900">{item.value}</div>
                </div>
            ))}
</div>


        )}

        {activeTab === "reviews" && <ReviewsSection/>}
      </div>
    </div>
  );
}
