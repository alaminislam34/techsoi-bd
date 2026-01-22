"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import CommonWrapper from "@/components/layout/CommonWrapper";
import WebFutures from "@/components/section/WebFutures";
import BlogTitle from "@/components/layout/BlogTitle";
import BlogCard from "@/components/parts/BlogCard";

const faqs = [
  {
    question: "What types of products can I buy from Techsoi?",
    answer:
      "At Techsoi, you can purchase a wide range of tech products including laptops, desktop computers, monitors, printers, keyboards, mice, networking devices, storage drives, graphics cards, licensed software, and various computer accessories and gadgets.",
  },
  {
    question: "Are all Techsoi products genuine?",
    answer:
      "Yes. All products sold at Techsoi are 100% genuine, brand-original, and come with official warranty support.",
  },
  {
    question: "How does the product warranty work?",
    answer:
      "Warranty coverage depends on the brand and product type. Warranty claims are handled according to the manufacturer’s policy with full assistance from our support team.",
  },
  {
    question: "How can I place an order?",
    answer:
      "You can place an order through our website, by phone, or by visiting our physical showroom directly.",
  },
  {
    question: "Do you deliver across Bangladesh?",
    answer:
      "Yes. We deliver products all over Bangladesh through reliable courier services.",
  },
  {
    question:
      "What should I do if I face any issue after receiving my product?",
    answer:
      "If you face any issue, please contact our customer support immediately. We will assist with warranty, replacement, or technical support.",
  },
  {
    question: "What payment methods does Techsoi accept?",
    answer:
      "We accept cash on delivery, mobile banking, bank transfer, and online payment methods.",
  },
];

export default function FaqPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <>
    <CommonWrapper>
      <div className="mt-6">
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-semibold text-center text-sky-500 mb-10">
        Frequently Asked Questions
      </h1>

      {/* FAQ Items */}
      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isActive = activeIndex === index;

          return (
            <div
              key={index}
              className={`border rounded-xl transition-all ${
                isActive
                  ? "bg-sky-50 border-sky-200"
                  : "bg-white border-gray-200"
              }`}
            >
              {/* Question */}
              <button
                onClick={() =>
                  setActiveIndex(isActive ? null : index)
                }
                className="w-full flex items-center justify-between px-6 py-5 text-left"
              >
                <span className="font-medium text-gray-800">
                  {index + 1}. {faq.question}
                </span>

                <ChevronDown
                  className={`transition-transform duration-300 ${
                    isActive ? "rotate-180 text-sky-500" : "text-gray-500"
                  }`}
                />
              </button>

              {/* Answer */}
              {isActive && (
                <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
    </CommonWrapper>
    <WebFutures/>

     <CommonWrapper>
        <BlogTitle title={'Our Latest Blog'} description={'Get Your Desired Product from Featured Category!'} btnText={'Read All'} btnLink={'#'} />
      <BlogCard limit={3} />
      </CommonWrapper>
    </>
  );
}
