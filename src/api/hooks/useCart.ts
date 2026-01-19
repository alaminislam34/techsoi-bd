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
  return useQuery({
    queryKey: ["cart"],
    queryFn: () => apiClient.get<CartProduct[]>(API_ENDPOINTS.CART_PRODUCT_GET),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Add to cart
export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { product_id: number; quantity?: number }) =>
      apiClient.post<CartProduct>(API_ENDPOINTS.CART_PRODUCT_ADD, data),
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
    mutationFn: (id: number) =>
      apiClient.delete(API_ENDPOINTS.CART_PRODUCT_DELETE(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Removed from cart");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to remove from cart");
    },
  });
};
