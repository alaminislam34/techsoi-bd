import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../apiClient";
import { API_ENDPOINTS } from "../ApiEndPoint";
import { toast } from "react-toastify";

interface CartProduct {
  id: number;
  product_id: number;
  quantity: number;
  amount: number;
}

// Get cart products
export const useGetCartProducts = () => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  return useQuery({
    queryKey: ["cart"],
    queryFn: () =>
      apiClient.request<CartProduct[]>(API_ENDPOINTS.CART_PRODUCT_GET, {
        method: "GET",
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      }),
    enabled: !!token,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Add to cart
export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { product_id: number; quantity?: number }) => {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!token) {
        throw new Error("Please login to add items to cart");
      }
      return apiClient.request<CartProduct>(API_ENDPOINTS.CART_PRODUCT_ADD, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Added to cart");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to add to cart");
    },
  });
};

// Remove from cart
export const useDeleteFromCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!token) {
        throw new Error("Please login to remove items from cart");
      }
      return apiClient.request(API_ENDPOINTS.CART_PRODUCT_DELETE(id), {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Removed from cart");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to remove from cart");
    },
  });
};
