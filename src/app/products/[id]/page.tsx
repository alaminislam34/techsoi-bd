/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { use, useState } from "react";
import Image from "next/image";
import { useGetProduct } from "@/api/hooks/useProducts";
import ProductTabs from "@/components/productsComponent/ProductTabs";
import RelevantProducts from "@/components/productsComponent/RelevantProducts";
import CommonWrapper from "@/components/layout/CommonWrapper";
import WebFutures from "@/components/section/WebFutures";
import BlogTitle from "@/components/layout/BlogTitle";
import BlogCard from "@/components/parts/BlogCard";
import BuyNowModal from "@/components/ui/BuyNowModal";
import { useAddToCart } from "@/api/hooks/useCart";
import { useAddToFavorites } from "@/api/hooks/useFavorites";
import { useAuth } from "@/Provider/AuthProvider";
import { toast } from "react-toastify";

export default function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  // Call all hooks at the top level
  const {
    data: productResponse,
    isLoading,
    isError,
  } = useGetProduct(Number(id));
  const { mutate: addToCart } = useAddToCart();
  const { mutate: addToFavorites } = useAddToFavorites();
  const { user } = useAuth();

  // Initialize state hooks before any conditional returns
  const [activeImg, setActiveImg] = useState("");
  const [qty, setQty] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const product = productResponse?.data;
  console.log(product);
  // Update activeImg when product loads
  if (product && !activeImg) {
    setActiveImg(product.main_image || "/images/monitor.jpg");
  }

  if (isLoading) {
    return (
      <CommonWrapper>
        <div className="py-20 flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </CommonWrapper>
    );
  }

  if (isError || !product) {
    return (
      <CommonWrapper>
        <div className="p-10 text-xl text-red-500">
          Product not found or error loading product
        </div>
      </CommonWrapper>
    );
  }

  const totalSalePrice = (product.sale_price || 0) * qty;
  const totalRegularPrice = (product.regular_price || 0) * qty;

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please login first");
      return;
    }
    addToCart({ product_id: Number(id), quantity: qty });
  };

  return (
    <>
      <CommonWrapper>
        <div className="py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* LEFT IMAGES */}
            <div>
              <div className="w-full h-95 md:h-105 relative border border-[#BEE5F6] rounded-2xl p-4 bg-gray-50">
                <img
                  src={activeImg || "/images/monitor.jpg"}
                  alt={product.name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.src = "/images/monitor.jpg";
                  }}
                />
              </div>

              {/* Variant Images - Show main image and extra images */}
              <div className="flex gap-4 mt-4">
                <button
                  onClick={() =>
                    setActiveImg(product.main_image || "/images/monitor.jpg")
                  }
                  className={`w-20 h-20 p-1 rounded-xl border transition-all duration-200 ${
                    activeImg === product.main_image
                      ? "border-primary ring-1 ring-primary"
                      : "border-gray-300"
                  }`}
                >
                  <img
                    src={product.main_image || "/images/monitor.jpg"}
                    alt="main"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.src = "/images/monitor.jpg";
                    }}
                  />
                </button>
              </div>
            </div>

            {/* RIGHT DETAILS */}
            <div>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <p className="text-gray-600 mt-3">{product.short_description}</p>
              <p className="flex items-center gap-2 mt-4">
                ⭐ 4.5
                <span className="text-gray-500">(24 reviews)</span>
              </p>
              <p className="mt-2">
                <span className="font-semibold">Availability:</span>{" "}
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm font-medium">
                  In Stock
                </span>
              </p>

              {/* Prices dynamically based on quantity */}
              <div className="mt-4 flex items-center">
                {/* Price section */}
                <div className="pr-8">
                  <p className="line-through text-gray-400 text-lg">
                    ৳{totalRegularPrice.toLocaleString()}
                  </p>
                  <p className="text-3xl font-bold text-primary">
                    ৳{totalSalePrice.toLocaleString()}
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
                      <div className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-primary"></div>
                      </div>
                    </div>

                    {/* Amount */}
                    <span className="text-primary text-2xl font-bold leading-none">
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
                  className="px-8 cursor-pointer py-3 rounded-xl bg-primary text-white font-semibold text-lg hover:bg-blue-600 transition"
                  onClick={() => setIsModalOpen(true)}
                >
                  Buy Now
                </button>
                <button
                  onClick={handleAddToCart}
                  className="px-8 py-3 rounded-xl border border-primary text-primary font-semibold text-lg hover:bg-blue-50 transition"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => {
                    if (!user) {
                      toast.error("Please login first");
                      return;
                    }
                    addToFavorites({ product_id: Number(id) });
                  }}
                  className="px-8 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold text-lg hover:bg-gray-50 transition"
                >
                  ♥ Wishlist
                </button>
              </div>

              {/* Product Metadata - show all product data as JSON for debugging/visibility */}
              <div className="mt-8 bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h2 className="text-lg font-semibold mb-2">Product Metadata</h2>
                <pre className="text-sm overflow-auto max-h-64 bg-white p-3 rounded-md border">
                  {JSON.stringify(product, null, 2)}
                </pre>
              </div>
            </div>
          </div>

          <ProductTabs />
          <RelevantProducts currentProductId={Number(id)} />
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
      <BuyNowModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
