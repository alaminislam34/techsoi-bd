import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../apiClient";
import { API_ENDPOINTS } from "../ApiEndPoint";
import { toast } from "react-toastify";

interface Category {
  id: number;
  name: string;
  image: string;
}

// Get all categories
export const useGetCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => apiClient.get<Category[]>(API_ENDPOINTS.CATEGORY_GET_ALL),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Get categories with limit
export const useGetCategoriesLimit = (limit: number) => {
  return useQuery({
    queryKey: ["categories", "limit", limit],
    queryFn: () =>
      apiClient.get<Category[]>(API_ENDPOINTS.CATEGORY_LIMIT(limit)),
    staleTime: 10 * 60 * 1000,
  });
};

// Get single category
export const useGetCategory = (id: number) => {
  return useQuery({
    queryKey: ["category", id],
    queryFn: () =>
      apiClient.get<Category>(API_ENDPOINTS.CATEGORY_GET_SINGLE(id)),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  });
};

// Create category
export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { name: string; image: string }) =>
      apiClient.post<Category>(API_ENDPOINTS.CATEGORY_STORE, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category created successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to create category");
    },
  });
};

// Update category
export const useUpdateCategory = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { name: string; image: string }) =>
      apiClient.put<Category>(API_ENDPOINTS.CATEGORY_UPDATE(id), data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["category", id] });
      toast.success("Category updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update category");
    },
  });
};

// Delete category
export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) =>
      apiClient.delete(API_ENDPOINTS.CATEGORY_DELETE(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to delete category");
    },
  });
};
