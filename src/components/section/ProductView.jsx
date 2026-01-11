"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { API_ENDPOINTS } from "@/api/ApiEndPoint";
import ProductImage from "@/assets/product-image.png";
import ProductCard from "../productsComponent/ProductCard";

/* -------- STATIC FALLBACK PRODUCTS -------- */
const STATIC_PRODUCTS = [
  {
    id: 1,
    product_id: 1,
    name: "RK M65 Tri Mode / RGB / Hot Swap",
    image: ProductImage,
    regular_price: 4200,
    sale_price: 3600,
    rating: 4.5,
    review_count: 325,
  },
];

export default function ProductView({ limit = 8 }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token =
    typeof window !== "undefined" ? localStorage.getItem("userToken") : null;

  /* ---------------- FETCH CART PRODUCTS ---------------- */
  const fetchCartProducts = async () => {
    try {
      setLoading(true);
      setError("");

      if (!token) {
        setProducts(STATIC_PRODUCTS);
        return;
      }

      const res = await fetch(API_ENDPOINTS.CART_PRODUCT_GET, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch cart products");
      }

      const data = await res.json();
      const productData = data?.data || data;

      if (!productData || productData.length === 0) {
        setProducts(STATIC_PRODUCTS);
      } else {
        setProducts(productData);
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Showing demo products.");
      setProducts(STATIC_PRODUCTS);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- ADD TO CART ---------------- */
  const addToCart = async (productId) => {
    if (!token) {
      alert("Please login to add products to cart");
      return;
    }

    try {
      const res = await fetch(API_ENDPOINTS.CART_PRODUCT_GET, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ product_id: productId }),
      });

      if (!res.ok) throw new Error("Add to cart failed");

      fetchCartProducts();
    } catch (err) {
      console.error(err);
      alert("Failed to add product to cart");
    }
  };

  /* ---------------- REMOVE FROM CART ---------------- */
  const removeFromCart = async (cartId) => {
    if (!token) return;

    try {
      const res = await fetch(`${API_ENDPOINTS.CART_PRODUCT_GET}/${cartId}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Remove failed");

      fetchCartProducts();
    } catch (err) {
      console.error(err);
      alert("Failed to remove product");
    }
  };

  useEffect(() => {
    fetchCartProducts();
  }, []);

  /* ---------------- LOADING STATE ---------------- */
  if (loading) {
    return (
      <div className="text-center py-16 text-lg font-medium">
        Loading products...
      </div>
    );
  }

  return (
    <>
      {error && <p className="text-center text-red-500 mb-4">{error}</p>}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-4 md:gap-y-10 mt-5 md:mt-12">
        {products.slice(0, limit).map((item) => (
          <ProductCard
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            oldPrice={item.oldPrice}
            rating={item.rating}
            reviews={item.reviews}
            imageSrc={item.product_image}
            saveAmount={item.saveAmount}
          />
        ))}
      </div>
    </>
  );
}
