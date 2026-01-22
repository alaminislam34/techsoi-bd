// Export all hooks from here for easier imports

// Products
export {
  useGetAllProducts,
  useGetProductsLimit,
  useGetProductsPaginated,
  useSearchProducts,
  useFilterProducts,
  useGetProduct,
  useGetProductBySlug,
  useGetProductDetails,
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
  useUpdateProductDetails,
} from "./useProducts";

// Cart
export {
  useGetCartProducts,
  useAddToCart,
  useDeleteFromCart,
} from "./useCart";

// Favorites
export {
  useGetFavorites,
  useAddToFavorites,
  useDeleteFromFavorites,
} from "./useFavorites";

// Orders
export {
  useGetAllOrders,
  useGetOrder,
  useCreateOrder,
  useUpdateOrder,
  useDeleteOrder,
  useUpdateOrderDetails,
  useDeleteOrderDetails,
} from "./useOrders";

// Reviews
export {
  useGetProductReviews,
  useGetReview,
  useCreateReview,
  useDeleteReview,
} from "./useReviews";

// Categories
export {
  useGetCategories,
  useGetCategoriesLimit,
  useGetCategory,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
} from "./useCategories";

// Sub-categories
export { useGetSubCategories, useGetSubCategory } from "./useSubCategories";

// Brands
export { useGetBrands, useGetBrandsLimit } from "./useBrands";

// Blogs
export {
  useGetAllBlogs,
  useGetBlogsLimit,
  useGetBlog,
  useCreateBlog,
  useUpdateBlog,
  useDeleteBlog,
} from "./useBlogs";
