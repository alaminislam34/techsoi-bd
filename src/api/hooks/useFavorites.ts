import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../apiClient";
import { API_ENDPOINTS } from "../ApiEndPoint";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

interface FavoriteProduct {
  id: number;
  product_id: number;
  product: any;
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

// Get favorites list
export const useGetFavorites = () => {
  const token = getClientToken();
  return useQuery({
    queryKey: ["favorites"],
    queryFn: () =>
      apiClient.request<FavoriteProduct[]>(API_ENDPOINTS.FAV_LIST_GET, {
        method: "GET",
        auth: true,
      }),
    enabled: !!token,
    staleTime: 2 * 60 * 1000,
  });
};

// Add to favorites
export const useAddToFavorites = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { product_id: number }) => {
      const token = getClientToken();
      if (!token) {
        throw new Error("Please login to add to favorites");
      }
      return apiClient.request<FavoriteProduct>(API_ENDPOINTS.FAV_LIST_ADD, {
        method: "POST",
        auth: true,
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      toast.success("Added to favorites");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to add to favorites");
    },
  });
};

// Remove from favorites
export const useDeleteFromFavorites = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => {
      const token = getClientToken();
      if (!token) {
        throw new Error("Please login to remove favorites");
      }
      return apiClient.request(API_ENDPOINTS.FAV_LIST_DELETE(id), {
        method: "DELETE",
        auth: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      toast.success("Removed from favorites");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to remove from favorites");
    },
  });
};
