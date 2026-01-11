"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Trash2,
  Minus,
  Plus,
  ShoppingCart,
  Loader2,
  HeartOff,
} from "lucide-react";
import Cookies from "js-cookie";

import CommonWrapper from "@/components/layout/CommonWrapper";
import WebFutures from "@/components/section/WebFutures";
import BlogTitle from "@/components/layout/BlogTitle";
import BlogCard from "@/components/parts/BlogCard";
import { toast } from "react-toastify";

// Define the type based on your API response
type FavItem = {
  id: number;
  product_id: number;
  product: {
    id: number;
    title: string;
    price: number;
    image: string;
    stock_status?: string;
  };
  qty?: number; // Added locally for UI management
};

const BASE_URL = "your_base_url_here"; // Replace with your actual base URL

// API Routes from your snippet
const API_ROUTES = {
  FAV_LIST_GET: `${BASE_URL}/fav-list`,
  FAV_LIST_DELETE: (id: number | string) => `${BASE_URL}/fav-list/${id}`,
};

export default function FavouritePage() {
  const [favourites, setFavourites] = useState<FavItem[]>([]);
  const [loading, setLoading] = useState(true);
  const token = Cookies.get("token");

  // --- Fetch Data ---
  const fetchFavourites = async () => {
    try {
      const res = await fetch(API_ROUTES.FAV_LIST_GET, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();
      if (res.ok) {
        // Map quantity 1 by default if not provided by API
        const itemsWithQty = (result.data || []).map((item: FavItem) => ({
          ...item,
          qty: 1,
        }));
        setFavourites(itemsWithQty);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Failed to load favourites");
    } finally {
      setLoading(false);
    }
  };

  // --- Delete Item ---
  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(API_ROUTES.FAV_LIST_DELETE(id), {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setFavourites((prev) => prev.filter((item) => item.id !== id));
        toast.success("Item removed from favourites");
      } else {
        toast.error("Could not remove item");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  useEffect(() => {
    if (token) fetchFavourites();
    else setLoading(false);
  }, [token]);

  // --- Local Quantity Logic ---
  const updateQty = (id: number, delta: number) => {
    setFavourites((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, qty: Math.max(1, (item.qty || 1) + delta) }
          : item
      )
    );
  };

  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center text-primary gap-4">
        <Loader2 className="animate-spin" size={40} />
        <p className="font-medium">Loading your list...</p>
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

            {favourites.length === 0 ? (
              <div className="py-20 flex flex-col items-center justify-center text-gray-400">
                <HeartOff size={48} className="mb-4 opacity-20" />
                <p>Your favourite list is empty.</p>
              </div>
            ) : (
              <>
                {/* Table Header */}
                <div className="hidden md:grid grid-cols-12 text-gray-500 font-bold text-xs uppercase tracking-wider border-b pb-4 mb-4">
                  <div className="col-span-1">Action</div>
                  <div className="col-span-5">Product Details</div>
                  <div className="col-span-2">Status</div>
                  <div className="col-span-2">Quantity</div>
                  <div className="col-span-2 text-right">Subtotal</div>
                </div>

                {/* Items List */}
                <div className="divide-y divide-gray-100">
                  {favourites.map((item) => (
                    <div
                      key={item.id}
                      className="grid md:grid-cols-12 grid-cols-1 gap-y-4 md:gap-y-0 items-center py-6"
                    >
                      {/* Delete Action */}
                      <div className="md:col-span-1">
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>

                      {/* Product Details */}
                      <div className="md:col-span-5 flex items-center gap-4">
                        <div className="w-20 h-20 rounded-xl border border-gray-100 p-2 relative overflow-hidden bg-gray-50 shrink-0">
                          <Image
                            src={item.product?.image || "/placeholder.png"}
                            alt={item.product?.title}
                            fill
                            className="object-contain p-1"
                          />
                        </div>
                        <h3 className="font-semibold text-gray-800 text-sm md:text-base leading-tight">
                          {item.product?.title}
                        </h3>
                      </div>

                      {/* Stock Status */}
                      <div className="md:col-span-2">
                        <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">
                          {item.product?.stock_status || "In Stock"}
                        </span>
                      </div>

                      {/* Quantity Controls */}
                      <div className="md:col-span-2">
                        <div className="flex items-center border border-gray-200 rounded-lg w-28 px-1 py-1">
                          <button
                            onClick={() => updateQty(item.id, -1)}
                            className="p-1 text-gray-500 hover:text-primary"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="flex-1 text-center font-bold text-sm">
                            {item.qty?.toString().padStart(2, "0")}
                          </span>
                          <button
                            onClick={() => updateQty(item.id, 1)}
                            className="p-1 text-gray-500 hover:text-primary"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Price & Add to Cart */}
                      <div className="md:col-span-2 flex flex-col items-end gap-2">
                        <p className="text-primary font-bold text-lg">
                          ৳
                          {(
                            item.product?.price * (item.qty || 1)
                          ).toLocaleString()}
                        </p>
                        <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-opacity-90 transition-all w-full md:w-auto">
                          <ShoppingCart size={14} />
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
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
