import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../apiClient";
import { API_ENDPOINTS } from "../ApiEndPoint";

interface SubCategory {
  id: number;
  category_id: number;
  name: string;
  image?: string;
}

export const useGetSubCategories = () => {
  return useQuery({
    queryKey: ["subcategories"],
    queryFn: () => apiClient.get<SubCategory[]>(API_ENDPOINTS.SUB_CATEGORY_GET_ALL),
    staleTime: 10 * 60 * 1000,
  });
};

export const useGetSubCategory = (id: number) => {
  return useQuery({
    queryKey: ["subcategories", id],
    queryFn: () => apiClient.get<SubCategory>(API_ENDPOINTS.SUB_CATEGORY_GET_SINGLE(id)),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  });
};
