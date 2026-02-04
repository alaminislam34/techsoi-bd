/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useGetProductBySlug } from "@/api/hooks/useProducts";
import ProductTabs from "@/components/productsComponent/ProductTabs";
import RelevantProducts from "@/components/productsComponent/RelevantProducts";
import CommonWrapper from "@/components/layout/CommonWrapper";
import WebFutures from "@/components/section/WebFutures";
import BlogTitle from "@/components/layout/BlogTitle";
import BlogCard from "@/components/parts/BlogCard";
import BuyNowModal from "@/components/ui/BuyNowModal";
import { useAddToCart } from "@/api/hooks/useCart";
import { useAuth } from "@/Provider/AuthProvider";
import { toast } from "react-toastify";
import { apiClient, ApiResponse } from "@/api/apiClient";
import { API_ENDPOINTS } from "@/api/ApiEndPoint";

export default function ProductDetails() {
  const routeParams = useParams() as { slug?: string };
  const [reviews, setReviews] = useState<any[]>([]);
  const slug = routeParams?.slug ?? "";

  // Call hook to fetch product by slug
  const {
    data: productResponse,
    isLoading,
    isError,
    error,
  } = useGetProductBySlug(slug);

  useEffect(() => {
    const fetchReviews = async (productSlug?: string) => {
      if (!productSlug) return;
      try {
        const res: ApiResponse<any> = await apiClient.get(
          API_ENDPOINTS.REVIEW_GET_SINGLE(productSlug),
        );
        console.log("Product review", res);
        if (res.status === true) {
          const data = res.data ?? [];
          setReviews(Array.isArray(data) ? data : [data]);
        } else {
          setReviews([]);
        }
      } catch (err: any) {
        console.error("Failed to fetch reviews:", err?.message);
        setReviews([]);
      }
    };
    fetchReviews(slug);
  }, [slug]);

  const { mutate: addToCart } = useAddToCart();

  const apiError = error as any;
  const { user } = useAuth();

  const [activeImg, setActiveImg] = useState("");
  const [qty, setQty] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const product = productResponse?.data;

  useEffect(() => {
    if (product && !activeImg) {
      setActiveImg(product?.main_image as string);
    }
  }, [product, activeImg]);

  // Parse product details (specifications may be a JSON string)
  const details = product?.details;
  let specifications: Array<{ name: string; value: string }> = [];
  try {
    if (details?.specifications) {
      specifications =
        typeof details.specifications === "string"
          ? JSON.parse(details.specifications)
          : details.specifications;
    }
  } catch (err) {
    specifications = [];
  }

  const extraImages: string[] = details?.extra_images || [];
  const stockValue = Number(product?.stock);
  const isInStock = Number.isFinite(stockValue) ? stockValue > 0 : true;
  const maxQty = Number.isFinite(stockValue) && stockValue > 0 ? stockValue : 1;

  if (isLoading || !slug) {
    return (
      <CommonWrapper>
        <div className="py-20 flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </CommonWrapper>
    );
  }

  if (isError || !product) {
    const message = isError
      ? `Error: ${apiError?.message ?? "Failed to load product"}`
      : "Product not found";
    return (
      <CommonWrapper>
        <div className="p-10 text-xl text-red-500">{message}</div>
      </CommonWrapper>
    );
  }

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please login first");
      return;
    }
    if (!isInStock) {
      toast.error("Product is out of stock");
      return;
    }
    addToCart({ product_id: Number(product.id), quantity: qty });
  };

  return (
    <>
      <CommonWrapper>
        <div className="py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* LEFT IMAGES */}
            <div>
              <div className="w-full h-95 md:h-105 relative border border-[#BEE5F6] rounded-2xl p-4">
                <img
                  src={activeImg || "/images/monitor.jpg"}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-2xl"
                  onError={(e) => {
                    e.currentTarget.src = "/images/monitor.jpg";
                  }}
                />
              </div>

              <div className="flex gap-4 mt-4">
                {(
                  ([product.main_image, ...extraImages].filter(
                    Boolean,
                  ) as string[]) || []
                ).map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImg(img)}
                    className={`w-20 h-20 p-1 rounded-xl border transition-all duration-200 ${
                      activeImg === img
                        ? "border-primary ring-1 ring-primary"
                        : "border-gray-300"
                    }`}
                  >
                    <img
                      src={img || "/images/monitor.jpg"}
                      alt={`variant-${idx}`}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.src = "/images/monitor.jpg";
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT DETAILS */}
            <div>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <p className="text-gray-600 mt-3">{product.short_description}</p>

              <p className="flex items-center gap-2 mt-4">
                ⭐ {product.rating ?? "0"}
                <span className="text-gray-500">
                  ({product.review_count || 0} reviews)
                </span>
              </p>

              <p className="mt-2">
                <span className="font-semibold">Availability:</span>{" "}
                {isInStock ? (
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm font-medium">
                    In Stock
                  </span>
                ) : (
                  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-lg text-sm font-medium">
                    Out of Stock
                  </span>
                )}
              </p>

              <div className="mt-4 flex items-center">
                <div className="pr-8">
                  <p className="line-through text-gray-400 text-lg">
                    ৳{(product.regular_price ?? 0).toLocaleString()}
                  </p>
                  <p className="text-3xl font-bold text-primary">
                    ৳{(product.sale_price ?? 0).toLocaleString()}
                  </p>
                </div>

                <div className="h-12 w-px bg-gray-300 mx-6"></div>

                <div className="flex flex-col pl-2">
                  {/* Heading */}
                  <h1 className="text-sm font-semibold text-left text-gray-600 mb-2">
                    EMI System:
                  </h1>

                  <div className="flex gap-2">
                    {product.emi_status ? (
                      <span className="text-primary text-lg font-bold leading-none">
                        EMI Available
                      </span>
                    ) : (
                      <span className="text-gray-500 text-lg">
                        Not Available
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mt-6 flex gap-4 items-center">
                <div className="flex items-center border rounded-lg">
                  <button
                    className="px-3 py-2"
                    onClick={() => qty > 1 && setQty(qty - 1)}
                    disabled={!isInStock}
                  >
                    -
                  </button>
                  <span className="px-4">{qty}</span>
                  <button
                    className="px-3 py-2"
                    onClick={() => isInStock && qty < maxQty && setQty(qty + 1)}
                    disabled={!isInStock}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex gap-4 flex-wrap md:flex-nowrap">
                <button
                  className={`px-8 cursor-pointer py-3 rounded-xl bg-primary text-white font-semibold text-lg transition ${!isInStock ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={() => setIsModalOpen(true)}
                  disabled={!isInStock}
                >
                  Buy Now
                </button>
                <button
                  onClick={handleAddToCart}
                  disabled={!isInStock}
                  className={`px-8 py-3 rounded-xl border border-primary text-primary font-semibold text-lg hover:bg-blue-50 transition ${!isInStock ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          <ProductTabs
            fullDescription={details?.full_description}
            specifications={specifications}
            reviews={reviews}
            averageRating={product.rating}
            reviewCount={product.review_count}
            productId={Number(product.details?.id)}
          />

          <RelevantProducts currentProductId={Number(product.details?.id)} />
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

      <BuyNowModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        products={[
          {
            product_id: product.id,
            quantity: qty,
            amount: (product.sale_price || 0) * qty,
          },
        ]}
      />
    </>
  );
}
