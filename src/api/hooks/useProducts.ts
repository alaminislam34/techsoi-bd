import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../apiClient";
import { API_ENDPOINTS } from "../ApiEndPoint";
import { toast } from "react-toastify";

// Types
interface Product {
  category?: any;
  id: number;
  name: string;
  slug: string;
  sku?: string;
  regular_price?: number;
  sale_price?: number;
  main_image?: string;
  category_id?: number;
  brand_id?: number;
  short_description?: string;

  // Additional optional fields returned by the API
  rating?: number; // average rating
  review_count?: number;
  reviews?: Array<any>;
  sale_count?: number;
  stock?: number;
  emi_status?: boolean;
  details?: ProductDetails | any;
}

interface ProductDetails {
  product_id?: number;
  full_description?: string;
  // can be a JSON string or an array of spec objects
  specifications?: string | Array<{ name: string; value: string }>;
  extra_images?: string[];
}

// Fetch all products
export const useGetAllProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => apiClient.get<Product[]>(API_ENDPOINTS.PRODUCT_GET_ALL),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Fetch products with limit
export const useGetProductsLimit = (limit: number) => {
  return useQuery({
    queryKey: ["products", "limit", limit],
    queryFn: () => apiClient.get<Product[]>(API_ENDPOINTS.PRODUCT_LIMIT(limit)),
    staleTime: 5 * 60 * 1000,
  });
};

// Fetch products paginated
export const useGetProductsPaginated = (page: number) => {
  return useQuery({
    queryKey: ["products", "paginated", page],
    queryFn: () =>
      apiClient.get<Product[]>(API_ENDPOINTS.PRODUCT_PAGINATE(page)),
    staleTime: 5 * 60 * 1000,
  });
};

// Search products
export const useSearchProducts = (query: string) => {
  return useQuery({
    queryKey: ["products", "search", query],
    queryFn: () =>
      apiClient.get<Product[]>(API_ENDPOINTS.PRODUCT_SEARCH(query)),
    enabled: query.length > 0,
    staleTime: 5 * 60 * 1000,
  });
};

// Server-side filtering using PRODUCT_FILTER endpoint
export const useFilterProducts = (opts: {
  query?: string;
  categories?: string[];
  subCategories?: string[];
  brands?: string[];
}) => {
  const {
    query = "",
    categories = [],
    subCategories = [],
    brands = [],
  } = opts || {};

  const normalizedQuery = query?.trim() || "";
  // categories/brands/sub-categories as comma-separated values
  const categoryIds = (categories || [])
    .map((c) => String(c))
    .filter((c) => c.length > 0)
    .join(",");

  const subCategoryIds = (subCategories || [])
    .map((s) => String(s))
    .filter((s) => s.length > 0)
    .join(",");

  const brandIds = (brands || [])
    .map((b) => String(b))
    .filter((b) => b.length > 0)
    .join(",");

  const baseUrl = API_ENDPOINTS.PRODUCT_FILTER(
    categoryIds,
    subCategoryIds,
    brandIds,
  );

  const params = new URLSearchParams();
  if (normalizedQuery.length > 0) {
    params.append("filter[name]", normalizedQuery);
  }

  const extraParams = params.toString();
  const url = `${baseUrl}${extraParams ? `${baseUrl.includes("?") ? "&" : "?"}${extraParams}` : ""}`;
  // Only enable if there are actual filters/parameters to apply

  const enabledFlag =
    normalizedQuery.length > 0 ||
    (categories && categories.length > 0) ||
    (subCategories && subCategories.length > 0) ||
    (brands && brands.length > 0);

  return useQuery({
    queryKey: ["products", "filter", query, categories, subCategories, brands],
    queryFn: () => apiClient.get<Product[]>(url),
    // only run when there's at least one filter or query
    enabled: enabledFlag,
    staleTime: 2 * 60 * 1000,
  });
};

// Get single product
export const useGetProduct = (id: number) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => apiClient.get<Product>(API_ENDPOINTS.PRODUCT_GET_SINGLE(id)),
    staleTime: 5 * 60 * 1000,
  });
};

// Get product by slug
export const useGetProductBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: () =>
      apiClient.get<Product>(API_ENDPOINTS.PRODUCT_DETAILS_BY_SLUG(slug)),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
};

// Get extended product details
export const useGetProductDetails = (id: number) => {
  return useQuery({
    queryKey: ["product", "details", id],
    queryFn: () =>
      apiClient.get<ProductDetails>(API_ENDPOINTS.PRODUCT_EXTENDED_DETAILS(id)),
    staleTime: 5 * 60 * 1000,
  });
};

// Create product
export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Product>) =>
      apiClient.post<Product>(API_ENDPOINTS.PRODUCT_STORE, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product created successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to create product");
    },
  });
};

// Update product
export const useUpdateProduct = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Product>) =>
      apiClient.put<Product>(API_ENDPOINTS.PRODUCT_UPDATE(id), data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", id] });
      toast.success("Product updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update product");
    },
  });
};

// Delete product
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) =>
      apiClient.delete(API_ENDPOINTS.PRODUCT_DELETE(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to delete product");
    },
  });
};

// Update product details
export const useUpdateProductDetails = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ProductDetails) =>
      apiClient.put<ProductDetails>(
        API_ENDPOINTS.PRODUCT_DETAILS_UPDATE(id),
        data,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product", "details", id] });
      toast.success("Product details updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update product details");
    },
  });
};
