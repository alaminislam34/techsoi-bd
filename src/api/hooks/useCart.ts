import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../apiClient";
import { API_ENDPOINTS } from "../ApiEndPoint";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

interface CartProduct {
  id: number;
  product_id: number;
  quantity: number;
  amount: number;
}

const getClientToken = () => {
  if (typeof window === "undefined") {
    return undefined;
  }

  return (
    window.localStorage.getItem("accessToken") ||
    Cookies.get("accessTokenClient") ||
    Cookies.get("accessToken")
  );
};

// Get cart products
export const useGetCartProducts = () => {
  const token = getClientToken();

  return useQuery({
    queryKey: ["cart"],
    queryFn: () =>
      apiClient.request<CartProduct[]>(API_ENDPOINTS.CART_PRODUCT_GET, {
        method: "GET",
        auth: true,
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
      const token = getClientToken();
      if (!token) {
        throw new Error("Please login to add items to cart");
      }

      const cachedCart = queryClient.getQueryData<CartProduct[]>(["cart"]);
      if (
        cachedCart?.some((item) => item.product_id === data.product_id)
      ) {
        throw new Error("This product is already added to your cart");
      }

      return apiClient.request<CartProduct>(API_ENDPOINTS.CART_PRODUCT_ADD, {
        method: "POST",
        auth: true,
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
      const token = getClientToken();
      if (!token) {
        throw new Error("Please login to remove items from cart");
      }
      return apiClient.request(API_ENDPOINTS.CART_PRODUCT_DELETE(id), {
        method: "DELETE",
        auth: true,
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
