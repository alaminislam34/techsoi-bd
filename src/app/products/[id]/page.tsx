/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { use, useState } from "react";
import { productList, ProductType } from "@/components/lib/dummyProd";
import Image from "next/image";
import ProductTabs from "@/components/productsComponent/ProductTabs";
import RelevantProducts from "@/components/productsComponent/RelevantProducts";
import CommonWrapper from "@/components/layout/CommonWrapper";
import WebFutures from "@/components/section/WebFutures";
import BlogTitle from "@/components/layout/BlogTitle";
import BlogCard from "@/components/parts/BlogCard";
import BuyNowModal from "@/components/ui/BuyNowModal"; 

export default function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const product: ProductType | undefined = productList.find((p) => p.id === id);

  if (!product) return <div className="p-10 text-xl">Product Not Found</div>;

  const [activeImg, setActiveImg] = useState(product.gallery[0]);
  const [qty, setQty] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false); // <-- modal state

  const totalSalePrice = product.salePrice * qty;
  const totalRegularPrice = product.regularPrice * qty;

  return (
    <>
      <CommonWrapper>
        <div className="py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* LEFT IMAGES */}
            <div>
              <div className="w-full h-[380px] md:h-[420px] relative border border-[#BEE5F6] rounded-2xl p-4">
                <Image
                  src={activeImg}
                  alt={product.name}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Variant Images */}
              <div className="flex gap-4 mt-4">
                {product.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImg(img)}
                    className={`w-20 h-20 p-1 rounded-xl border transition-all duration-200 ${
                      activeImg === img
                        ? "border-[#2cace2] ring-1 ring-[#2cace2]"
                        : "border-gray-300"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`thumb-${idx}`}
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT DETAILS */}
            <div>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <p className="text-gray-600 mt-3">{product.description}</p>
              <p className="flex items-center gap-2 mt-4">
                ⭐ {product.rating}
                <span className="text-gray-500">({product.reviewCount})</span>
              </p>
              <p className="mt-2">
                <span className="font-semibold">Availability:</span>{" "}
                <span className="bg-yellow-400 text-black px-3 py-1 rounded-lg text-sm font-medium">
                  {product.stockStatus}
                </span>
              </p>

              {/* Prices dynamically based on quantity */}
                <div className="mt-4 flex items-center">
                  {/* Price section */}
                  <div className="pr-8">
                    <p className="line-through text-gray-400 text-lg">
                      ৳{totalRegularPrice}
                    </p>
                    <p className="text-3xl font-bold text-[#2cace2]">
                      ৳{totalSalePrice}
                    </p>
                  </div>

                  {/* Vertical divider */}
                  <div className="h-12 w-px bg-gray-300 mx-6"></div>

                  {/* EMI system */}
                  <div className="flex flex-col items-center justify-center text-center pl-2">
                    {/* Heading */}
                    <h1 className="text-sm font-semibold text-gray-600 mb-2">
                      EMI System:
                    </h1>

                    {/* Price row */}
                    <div className="flex items-center gap-2">
                      {/* Selected double circle icon */}
                      <div className="relative -translate-y-0.5">
                        <div className="w-5 h-5 rounded-full border-2 border-[#2CACE2] flex items-center justify-center">
                          <div className="w-3 h-3 rounded-full bg-[#2CACE2]"></div>
                        </div>
                      </div>

                      {/* Amount */}
                      <span className="text-[#2CACE2] text-2xl font-bold leading-none">
                        ৳1200
                      </span>

                      {/* mth text */}
                      <span className="text-gray-500 text-xl font-medium">
                        mth
                      </span>
                    </div>
                  </div>
                </div>

              {/* Quantity Selector */}
              <div className="mt-6 flex gap-4 items-center">
                <div className="flex items-center border rounded-lg">
                  <button
                    className="px-3 py-2"
                    onClick={() => qty > 1 && setQty(qty - 1)}
                  >
                    -
                  </button>
                  <span className="px-4">{qty}</span>
                  <button className="px-3 py-2" onClick={() => setQty(qty + 1)}>
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex gap-4 flex-wrap md:flex-nowrap">
                <button
                  className="px-8 cursor-pointer py-3 rounded-xl bg-[#2cace2] text-white font-semibold text-lg"
                  onClick={() => setIsModalOpen(true)} // <-- open modal
                >
                  Buy Now
                </button>
                <button className="px-8 py-3 rounded-xl border border-[#2cace2] text-[#2cace2] font-semibold text-lg">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          <ProductTabs />
          <RelevantProducts
            currentProductId={product.id}
            currentCategory={product.category}
          />
        </div>
      </CommonWrapper>

      <WebFutures />

      <CommonWrapper>
        <BlogTitle
          title={"Our Latest Blog"}
          description={"Get Your Desired Product from Featured Category!"}
          btnText={"Read All"}
          btnLink={"#"}
        />
        <BlogCard limit={3} />
      </CommonWrapper>

      {/* BUY NOW MODAL */}
      <BuyNowModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
