"use client";

import ProductCard from "../productsComponent/ProductCard";

/**
 * @param {Array} products - Home component থেকে আসা প্রোডাক্ট লিস্ট
 * @param {boolean} isLoading - ডাটা লোড হচ্ছে কি না
 * @param {number} limit - কয়টি প্রোডাক্ট দেখাবে (ডিফল্ট ৮টি)
 */

export default function ProductView({ products = [], isLoading, limit = 8 }) {
  // লোডিং অবস্থা সামলানো
  if (isLoading) {
    return (
      <div className="text-center py-16 text-lg font-medium animate-pulse text-gray-500">
        Loading products...
      </div>
    );
  }

  // ডাটা না থাকলে বা খালি থাকলে মেসেজ দেখানো
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        No products available at the moment.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-4 md:gap-y-10 mt-5 md:mt-12">
      {/* Home component থেকে আমরা অলরেডি স্লাইস করে পাঠাতে পারি, 
          অথবা এখানেও .slice(0, limit) ব্যবহার করা নিরাপদ। 
      */}
      {products.slice(0, limit).map((item) => (
        <ProductCard
          key={item.id}
          id={item.id}
          name={item.name}
          price={item.sale_price} // API অনুযায়ী sale_price
          oldPrice={item.regular_price} // API অনুযায়ী regular_price
          rating={item.rating || 0}
          reviews={item.review_count || 0}
          imageSrc={item.main_image} // API অনুযায়ী main_image
          slug={item.slug}
          // যদি ডিসকাউন্ট হিসাব করতে চান:
          saveAmount={item.regular_price - item.sale_price}
        />
      ))}
    </div>
  );
}
