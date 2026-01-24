import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../apiClient";
import { API_ENDPOINTS } from "../ApiEndPoint";
import { toast } from "react-toastify";

export interface Review {
  id: number;
  product_id: number;
  user_id: number;
  star: number;
  message: string;
  created_at: string;
  user_name?: string;
}

// Get all reviews for a product
export const useGetProductReviews = (productId: number) => {
  return useQuery({
    queryKey: ["reviews", productId],
    queryFn: () =>
      apiClient.get<Review[]>(`${API_ENDPOINTS.REVIEW_GET_ALL}?product_id=${productId}`),
    enabled: !!productId,
    staleTime: 5 * 60 * 1000,
  });
};

// Get single review
export const useGetReview = (id: number) => {
  return useQuery({
    queryKey: ["review", id],
    queryFn: () => apiClient.get<Review>(API_ENDPOINTS.REVIEW_GET_SINGLE(id)),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

// Create review
export const useCreateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { product_id: number; star: number; message: string }) =>
      apiClient.post<Review>(API_ENDPOINTS.REVIEW_STORE, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["reviews", variables.product_id] });
      toast.success("Review added successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to add review");
    },
  });
};

// Delete review
export const useDeleteReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) =>
      apiClient.delete(API_ENDPOINTS.REVIEW_DELETE(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      toast.success("Review deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to delete review");
    },
  });
};
