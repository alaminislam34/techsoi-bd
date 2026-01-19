import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../apiClient";
import { API_ENDPOINTS } from "../ApiEndPoint";
import { toast } from "react-toastify";

interface FavoriteProduct {
  id: number;
  product_id: number;
  product: any;
}

// Get favorites list
export const useGetFavorites = () => {
  return useQuery({
    queryKey: ["favorites"],
    queryFn: () => apiClient.get<FavoriteProduct[]>(API_ENDPOINTS.FAV_LIST_GET),
    staleTime: 2 * 60 * 1000,
  });
};

// Add to favorites
export const useAddToFavorites = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { product_id: number }) =>
      apiClient.post<FavoriteProduct>(API_ENDPOINTS.FAV_LIST_ADD, data),
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
    mutationFn: (id: number) =>
      apiClient.delete(API_ENDPOINTS.FAV_LIST_DELETE(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      toast.success("Removed from favorites");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to remove from favorites");
    },
  });
};
