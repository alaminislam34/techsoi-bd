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

// Your favorite hooks
import {
  useGetFavorites,
  useDeleteFromFavorites,
  useAddToCart,
} from "@/api/hooks"; // adjust path if needed

export default function FavouritePage() {
  const { data: favoritesResponse, isLoading, isError } = useGetFavorites();
  const { mutate: deleteFromFavorites, isPending: isDeleting } =
    useDeleteFromFavorites();
  const { mutate: addToCart } = useAddToCart();
  const handleAddToCart = (productId: number, quantity: number) => {
    addToCart({ product_id: productId, quantity: 1 });
  };
  // Local quantity state (kept as per your design)
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  const favorites = favoritesResponse?.data || [];

  // Initialize quantity to 1 for each favorite item
  useEffect(() => {
    if (favorites.length > 0) {
      const initialQuantities: Record<number, number> = {};
      favorites.forEach((fav: any) => {
        initialQuantities[fav.id] = 1; // default qty
      });
      setQuantities(initialQuantities);
    }
  }, [favorites]);

  const handleDelete = (favId: number) => {
    deleteFromFavorites(favId, {
      onSuccess: () => {
        toast.success("Removed from favorites");
      },
      onError: () => {
        toast.error("Failed to remove item");
      },
    });
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

  if (isError) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center text-red-500 gap-4">
        <HeartOff size={48} />
        <p>Failed to load favourites. Please try again later.</p>
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
                          const product = fav.product;
                          const currentQty = quantities[fav.id] || 1;
                          const price =
                            product?.sale_price || product?.regular_price || 0;
                          const subtotal = price * currentQty;

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
                                        fallbackSrc="/images/monitor.png"
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
                              <td className="py-2 text-center font-bold text-primary">
                                ৳{price.toLocaleString()}
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
                                    className="flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-opacity-90 transition-all w-full md:w-auto"
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
