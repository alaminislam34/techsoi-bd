import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../apiClient";
import { API_ENDPOINTS } from "../ApiEndPoint";

interface Brand {
  id: number;
  name: string;
  image?: string;
}

export const useGetBrands = () => {
  return useQuery({
    queryKey: ["brands"],
    queryFn: () => apiClient.get<Brand[]>(API_ENDPOINTS.BRAND_GET_ALL),
    staleTime: 10 * 60 * 1000,
  });
};

export const useGetBrandsLimit = (limit: number) => {
  return useQuery({
    queryKey: ["brands", "limit", limit],
    queryFn: () => apiClient.get<Brand[]>(API_ENDPOINTS.BRAND_LIMIT(limit)),
    staleTime: 10 * 60 * 1000,
  });
};
