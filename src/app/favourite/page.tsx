"use client";

import { useEffect, useState } from "react";
import SafeImage from "@/components/ui/SafeImage";
import {
  Trash2,
  Minus,
  Plus,
  ShoppingCart,
  Loader2,
  HeartOff,
} from "lucide-react";
import CommonWrapper from "@/components/layout/CommonWrapper";
import WebFutures from "@/components/section/WebFutures";
import BlogTitle from "@/components/layout/BlogTitle";
import BlogCard from "@/components/parts/BlogCard";
import { toast } from "react-toastify";
import { apiClient } from "@/api/apiClient";
import { API_ENDPOINTS } from "@/api/ApiEndPoint";
import Cookies from "js-cookie";

export default function FavouritePage() {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const getClientToken = () => {
    if (typeof window === "undefined") {
      return undefined;
    }

    return (
      window.localStorage.getItem("accessToken") ||
      Cookies.get("accessTokenClient") ||
      Cookies.get("accessToken")
    );
  };

  const fetchFavorites = async () => {
    try {
      setIsLoading(true);
      setIsError(false);

      const token = getClientToken();
      if (!token) {
        setFavorites([]);
        return;
      }

      const response = await apiClient.request<any[]>(
        API_ENDPOINTS.FAV_LIST_GET,
        {
          auth: true,
          method: "GET",
        },
      );
    
      setFavorites(response?.data || []);
    } catch (error: any) {
      console.error("Failed to load favourites:", error);
      if (error?.status !== 401) {
        toast.error(error?.message || "Failed to load favourites");
      }
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = async (productId: number, quantity: number) => {
    try {
      setIsAddingToCart(true);
      await apiClient.request(API_ENDPOINTS.CART_PRODUCT_ADD, {
        auth: true,
        method: "POST",
        body: JSON.stringify({ product_id: productId, quantity }),
      });
      toast.success("Added to cart");
    } catch (error: any) {
      console.error("Failed to add to cart:", error);
      toast.error(error?.message || "Failed to add to cart");
    } finally {
      setIsAddingToCart(false);
    }
  };
  // Local quantity state (kept as per your design)
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  // Initialize quantity to 1 for each favorite item
  useEffect(() => {
    if (favorites.length > 0) {
      const initialQuantities: Record<number, number> = {};
      favorites.forEach((fav: any) => {
        initialQuantities[fav.id] = 1;
      });
      setQuantities(initialQuantities);
    }
  }, [favorites]);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleDelete = async (favId: number) => {
    try {
      setIsDeleting(true);
      await apiClient.request(API_ENDPOINTS.FAV_LIST_DELETE(favId), {
        auth: true,
        method: "DELETE",
      });

      setFavorites((prev) => prev.filter((fav) => fav.id !== favId));
      toast.success("Removed from favorites");
    } catch (error: any) {
      console.error("Failed to remove favourite:", error);
      toast.error(error?.message || "Failed to remove item");
    } finally {
      setIsDeleting(false);
    }
  };

  const updateQty = (id: number, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta),
    }));
  };

  if (isLoading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center text-primary gap-4">
        <Loader2 className="animate-spin" size={40} />
        <p className="font-medium">Loading your favourites...</p>
      </div>
    );
  }

  return (
    <>
      <CommonWrapper>
        <section className="w-full py-10">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              My Favourite
            </h2>

            {favorites.length === 0 ? (
              <div className="py-20 flex flex-col items-center justify-center text-gray-400">
                <HeartOff size={48} className="mb-4 opacity-20" />
                <p>Your favourite list is empty.</p>
              </div>
            ) : (
              <>
                <>
                  {/* Table Wrapper */}
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-175 text-left border-collapse">
                      <thead className="hidden md:table-header-group">
                        <tr className="text-gray-500 font-bold text-xs uppercase tracking-wider border-b border-b-gray-200 border-r-gray-200 pb-4 ">
                          <th className="py-4">Action</th>
                          <th className="py-4">Product Details</th>
                          <th className="py-4 text-center">Status</th>
                          <th className="py-4 text-center">Quantity</th>
                          <th className="py-4 text-center">Price</th>
                          <th className="py-4 text-center">Action</th>
                        </tr>
                      </thead>

                      {/* Table Body */}
                      <tbody className="divide-y divide-gray-100 ">
                        {favorites.map((fav: any) => {
                          const product = fav.product?.[0]; // Product is an array, get first item
                          const currentQty = quantities[fav.id] || 1;

                          // Ensure price is a number
                          const salePrice = Number(product?.sale_price) || 0;
                          const regularPrice =
                            Number(product?.regular_price) || 0;
                          const price = salePrice || regularPrice || 0;

                          return (
                            <tr
                              key={fav.id}
                              className="group hover:bg-gray-50 transition-colors "
                            >
                              {/* Action - Delete */}
                              <td className="py-2">
                                <button
                                  onClick={() => handleDelete(fav.id)}
                                  disabled={isDeleting}
                                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all disabled:opacity-50"
                                >
                                  <Trash2 size={20} />
                                </button>
                              </td>

                              {/* Product Details */}
                              <td className="py-2">
                                <div className="flex items-center gap-4">
                                  <div className="w-8 h-8 rounded-xl border border-gray-100 p-2 relative overflow-hidden bg-gray-50 shrink-0">
                                    {product?.main_image ? (
                                      <SafeImage
                                        src={product?.main_image}
                                        alt={product?.name || "Product"}
                                        fill
                                        className="object-contain p-1"
                                      />
                                    ) : (
                                      <div className="w-full h-full "></div>
                                    )}
                                  </div>
                                  <h3 className="font-semibold text-gray-800 text-sm md:text-base leading-tight">
                                    {product?.name || "Product"}
                                  </h3>
                                </div>
                              </td>

                              {/* Status */}
                              <td className="py-2 text-center">
                                <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">
                                  {product?.stock_status || "In Stock"}
                                </span>
                              </td>

                              {/* Quantity */}
                              <td className="py-2">
                                <div className="flex items-center justify-center">
                                  <div className="flex items-center border border-gray-200 rounded-lg w-28 px-1 py-1">
                                    <button
                                      onClick={() => updateQty(fav.id, -1)}
                                      className="p-1 text-gray-500 hover:text-primary"
                                    >
                                      <Minus size={14} />
                                    </button>
                                    <span className="flex-1 text-center font-bold text-sm">
                                      {String(currentQty).padStart(2, "0")}
                                    </span>
                                    <button
                                      onClick={() => updateQty(fav.id, 1)}
                                      className="p-1 text-gray-500 hover:text-primary"
                                    >
                                      <Plus size={14} />
                                    </button>
                                  </div>
                                </div>
                              </td>

                              {/* Price */}
                              <td className="py-2 text-center">
                                <span className="font-bold text-primary text-base">
                                  ৳
                                  {price > 0
                                    ? (price * currentQty).toLocaleString()
                                    : "0"}
                                </span>
                              </td>

                              {/* Add to Cart */}
                              <td className="py-2">
                                <data className="flex items-center justify-center">
                                  <button
                                    onClick={() =>
                                      handleAddToCart(
                                        fav.product_id,
                                        currentQty,
                                      )
                                    }
                                    disabled={isAddingToCart}
                                    className="flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-opacity-90 transition-all w-full md:w-auto disabled:opacity-60"
                                  >
                                    <ShoppingCart size={14} />
                                    Add to Cart
                                  </button>
                                </data>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </>
              </>
            )}
          </div>
        </section>
      </CommonWrapper>

      <WebFutures />

      <CommonWrapper>
        <div className="py-12">
          <BlogTitle
            title="Our Latest Blog"
            description="Stay updated with our newest arrivals and tech tips."
            btnText="Read All"
            btnLink="/blogs"
          />
          <BlogCard limit={3} />
        </div>
      </CommonWrapper>
    </>
  );
}
