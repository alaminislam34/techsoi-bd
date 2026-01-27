"use client";

import ProductCard from "../productsComponent/ProductCard";

/**
 * @param {Array} products
 * @param {boolean} isLoading
 * @param {number} limit
 */

export default function ProductView({ products = [], isLoading, limit = 8 }) {
  if (isLoading) {
    return (
      <div className="text-center py-16 text-lg font-medium animate-pulse text-gray-500">
        Loading products...
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        No products available at the moment.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-4 md:gap-y-10 mt-5 md:mt-12">
      {products.slice(0, limit).map((item) => (
        <ProductCard
          key={item.id}
          id={item.id}
          name={item.name}
          price={item.sale_price}
          oldPrice={item.regular_price}
          rating={item.rating || 0}
          reviews={item.review_count || 0}
          imageSrc={item.main_image}
          slug={item.slug}
          saveAmount={item.regular_price - item.sale_price}
        />
      ))}
    </div>
  );
}
