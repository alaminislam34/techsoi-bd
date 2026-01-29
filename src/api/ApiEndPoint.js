// ApiEndPoint.js

export const BASE_URL = "https://api.techsoibd.com/api";

export const API_ENDPOINTS = {
  // --- User Requests ---
  USER_LOGIN: `${BASE_URL}/login`, // Body: { "name": "", "email": "", "image": "" }
  USER_REFRESH: `${BASE_URL}/refresh`,
  USER_PROFILE: `${BASE_URL}/profile`,
  USER_LOGOUT: `${BASE_URL}/logout`,

  // --- Favorite Product Requests ---
  FAV_LIST_GET: `${BASE_URL}/fav-list`,
  FAV_LIST_ADD: `${BASE_URL}/fav-list`, // Body: { "product_id": "" }
  FAV_LIST_DELETE: (id) => `${BASE_URL}/fav-list/${id}`,
  HERO_IMAGE: `${BASE_URL}/hero-image`,
  // --- Cart Product Requests ---
  CART_PRODUCT_GET: `${BASE_URL}/cart-product`,
  CART_PRODUCT_ADD: `${BASE_URL}/cart-product`, // Body: { "product_id": "" }
  CART_PRODUCT_DELETE: (id) => `${BASE_URL}/cart-product/${id}`,

  // --- Pay and Order Requests ---
  PAY_SSLCOMMERZ: `${BASE_URL}/pay/sslcommerz`,
  /* Body: { 
        "name": "", "phone": "", "email": "", "address": "", 
        "city": "", "postcode": "", "products": [{"product_id":1,"quantity":3,"amount":5000}] 
    } */

  // --- User Review Requests ---
  USER_REVIEW: `${BASE_URL}/user-review`,

  // --- Admin Info Requests ---
  ADMIN_LOGIN: `${BASE_URL}/admin/login`, // Body: { "email": "", "password": "" }
  ADMIN_PROFILE: `${BASE_URL}/admin/profile`,
  ADMIN_LOGOUT: `${BASE_URL}/admin/logout`,

  // --- Order Management (Admin) ---
  ORDER_CREATE: `${BASE_URL}/order`,
  ORDER_SUCCESS: `${BASE_URL}/order-success`,
  ORDER_GET_ALL: `${BASE_URL}/order`,
  ORDER_GET_SINGLE: (id) => `${BASE_URL}/order/${id}`,
  ORDER_UPDATE: (id) => `${BASE_URL}/order/${id}`, // Body: { "pay_status": "1", "status": "1" }
  ORDER_DELETE: (id) => `${BASE_URL}/order/${id}`, // Body: { "cancel_message": "" }

  USER_ORDER: `${BASE_URL}/user-order`,
  // --- Order Details Management ---
  ORDER_DETAILS_UPDATE: (id) => `${BASE_URL}/order-details/${id}`, // Body: { "pay_status": "1", "status": "1" }
  ORDER_DETAILS_DELETE: (id) => `${BASE_URL}/order-details/${id}`, // Body: { "cancel_message": "" }

  // --- Website Info ---
  WEBSITE_INFO_GET: `${BASE_URL}/website-info`,
  WEBSITE_INFO_UPDATE: `${BASE_URL}/website-info`, // Body: { "email": "", "phone": "", "address": "", "facebook_link": "", "instagram_link": "" }

  // --- Product Requests ---
  PRODUCT_GET_ALL: `${BASE_URL}/product`,
  PRODUCT_LIMIT: (limit) => `${BASE_URL}/product-limit/${limit}`,
  PRODUCT_PAGINATE: (page) => `${BASE_URL}/product-paginate/${page}`,
  PRODUCT_SEARCH: (query) => `${BASE_URL}/product-search/${query}`,
  PRODUCT_FILTER: (categoryId, subCategoryId, brandId) =>
    `${BASE_URL}/product-filter?filter[category_id]=${categoryId || ""}&[sub_category_id]=${subCategoryId || ""}&[brand_id]=${brandId || ""}`,
  PRODUCT_DETAILS_BY_SLUG: (slug) => `${BASE_URL}/product-details/${slug}`,
  PRODUCT_GET_SINGLE: (id) => `${BASE_URL}/product/${id}`,
  PRODUCT_STORE: `${BASE_URL}/product`,
  /* Body: { "name": "", "sku": "", "regular_price": "", "sale_price": "", "main_image": "", "category_id": "", "sub_category_id": "", "brand_id": "", "short_description": "" } */
  PRODUCT_UPDATE: (id) => `${BASE_URL}/product/${id}`,
  PRODUCT_DELETE: (id) => `${BASE_URL}/product/${id}`,

  // --- Product Details Requests ---
  PRODUCT_EXTENDED_DETAILS: (id) => `${BASE_URL}/product-details/${id}`,
  PRODUCT_DETAILS_UPDATE: (id) => `${BASE_URL}/product-details/${id}`,
  /* Body: { "product_id": "", "full_description": "", "specifications": [], "extra_images": [] } */

  // --- Product Review Requests ---
  REVIEW_GET_ALL: `${BASE_URL}/review-product`,
  REVIEW_GET_SINGLE: (slug) => `${BASE_URL}/product-review/${slug}`,
  REVIEW_STORE: `${BASE_URL}/review-product`, // Body: { "product_id": "", "star": "", "message": "" }
  REVIEW_DELETE: (id) => `${BASE_URL}/review-product/${id}`,

  // --- FAQ Requests ---
  FAQ_GET_ALL: `${BASE_URL}/faq`,
  FAQ_LIMIT: (limit) => `${BASE_URL}/faq-limit/${limit}`,
  FAQ_GET_SINGLE: (id) => `${BASE_URL}/faq/${id}`,
  FAQ_STORE: `${BASE_URL}/faq`, // Body: { "question": "", "answer": "" }
  FAQ_UPDATE: (id) => `${BASE_URL}/faq/${id}`, // Body: { "question": "", "answer": "" }
  FAQ_DELETE: (id) => `${BASE_URL}/faq/${id}`,

  // --- Category Requests ---
  CATEGORY_GET_ALL: `${BASE_URL}/category`,
  CATEGORY_GET_SINGLE: (id) => `${BASE_URL}/category/${id}`,
  CATEGORY_LIMIT: (limit) => `${BASE_URL}/category-limit/${limit}`,
  CATEGORY_STORE: `${BASE_URL}/category`, // Body: { "name": "", "image": "" }
  CATEGORY_UPDATE: (id) => `${BASE_URL}/category/${id}`, // Body: { "name": "", "image": "" }
  CATEGORY_DELETE: (id) => `${BASE_URL}/category/${id}`,

  // --- Sub-Category Requests ---
  SUB_CATEGORY_GET_ALL: `${BASE_URL}/sub-category`,
  SUB_CATEGORY_GET_SINGLE: (id) => `${BASE_URL}/sub-category/${id}`,
  SUB_CATEGORY_STORE: `${BASE_URL}/sub-category`, // Body: { "category_id": "", "name": "", "image": "" }
  SUB_CATEGORY_UPDATE: (id) => `${BASE_URL}/sub-category/${id}`, // Body: { "category_id": "", "name": "", "image": "" }
  SUB_CATEGORY_DELETE: (id) => `${BASE_URL}/sub-category/${id}`,

  // --- Brand Requests ---
  BRAND_GET_ALL: `${BASE_URL}/brand`,
  BRAND_LIMIT: (limit) => `${BASE_URL}/brand-limit/${limit}`,
  BRAND_GET_SINGLE: (id) => `${BASE_URL}/brand/${id}`,
  BRAND_SPECIAL: `${BASE_URL}/brand-special`,
  SPECIAL_BRAND: `${BASE_URL}/special-brand`,
  BRAND_STORE: `${BASE_URL}/brand`, // Body: { "name": "", "image": "", "special": 1 }
  BRAND_UPDATE: (id) => `${BASE_URL}/brand/${id}`, // Body: { "name": "", "image": "", "special": 0 }
  BRAND_DELETE: (id) => `${BASE_URL}/brand/${id}`,

  // --- Blog Requests ---
  BLOG_GET_ALL: `${BASE_URL}/blog`,
  BLOG_LIMIT: (limit) => `${BASE_URL}/blog-limit/${limit}`,
  BLOG_GET_SINGLE: (id) => `${BASE_URL}/blog/${id}`,
  BLOG_STORE: `${BASE_URL}/blog`, // Body: { "title": "", "image": "", "short_description": "", "full_description": "" }
  BLOG_UPDATE: (id) => `${BASE_URL}/blog/${id}`, // Body: { "title": "", "image": "", "short_description": "", "full_description": "" }
  BLOG_DELETE: (id) => `${BASE_URL}/blog/${id}`,
};
