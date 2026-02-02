import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../apiClient";
import { API_ENDPOINTS } from "../ApiEndPoint";
import { toast } from "react-toastify";

interface Blog {
  id: number;
  title: string;
  slug: string;
  image: string;
  short_description: string;
  full_description: string;
  created_at: string;
}

// Get all blogs
export const useGetAllBlogs = () => {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: () => apiClient.get<Blog[]>(API_ENDPOINTS.BLOG_GET_ALL),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Get blogs with limit
export const useGetBlogsLimit = (limit: number) => {
  return useQuery({
    queryKey: ["blogs", "limit", limit],
    queryFn: () => apiClient.get<Blog[]>(API_ENDPOINTS.BLOG_LIMIT(limit)),
    staleTime: 10 * 60 * 1000,
  });
};

// Get single blog
export const useGetBlog = (id: string) => {
  return useQuery({
    queryKey: ["blog", id],
    queryFn: () => apiClient.get<Blog>(API_ENDPOINTS.BLOG_GET_SINGLE(id)),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  });
};

// Create blog (admin)
export const useCreateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      title: string;
      image: string;
      short_description: string;
      full_description: string;
    }) => apiClient.post<Blog>(API_ENDPOINTS.BLOG_STORE, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      toast.success("Blog created successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to create blog");
    },
  });
};

// Update blog (admin)
export const useUpdateBlog = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      title: string;
      image: string;
      short_description: string;
      full_description: string;
    }) => apiClient.put<Blog>(API_ENDPOINTS.BLOG_UPDATE(id), data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      queryClient.invalidateQueries({ queryKey: ["blog", id] });
      toast.success("Blog updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update blog");
    },
  });
};

// Delete blog (admin)
export const useDeleteBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => apiClient.delete(API_ENDPOINTS.BLOG_DELETE(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      toast.success("Blog deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to delete blog");
    },
  });
};
