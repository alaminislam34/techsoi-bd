import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../apiClient";
import { API_ENDPOINTS } from "../ApiEndPoint";
import { toast } from "react-toastify";

interface Order {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postcode: string;
  pay_status: number;
  status: number;
}

interface OrderDetails {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  amount: number;
}

// Get all orders
export const useGetAllOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      try {
        const response = await apiClient.get<Order[]>(
          API_ENDPOINTS.ORDER_GET_ALL,
        );
        return response;
      } catch (error: any) {
        console.error("Failed to fetch orders:", error.message);

        if (
          error.message.includes("Unauthorized") ||
          error.message.includes("login")
        ) {
          console.warn("User not authenticated - showing empty orders list");
          return { status: true, message: "No orders", data: [] };
        }

        throw error;
      }
    },
    staleTime: 2 * 60 * 1000,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};
export const useGetUserOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      try {
        const response = await apiClient.get<Order[]>(API_ENDPOINTS.USER_ORDER);
        return response;
      } catch (error: any) {
        console.error("Failed to fetch orders:", error.message);

        if (
          error.message.includes("Unauthorized") ||
          error.message.includes("login")
        ) {
          console.warn("User not authenticated - showing empty orders list");
          return { status: true, message: "No orders", data: [] };
        }

        throw error;
      }
    },
    staleTime: 2 * 60 * 1000,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

export const useGetOrder = (id: number) => {
  return useQuery({
    queryKey: ["order", id],
    queryFn: () => apiClient.get<Order>(API_ENDPOINTS.ORDER_GET_SINGLE(id)),
    enabled: !!id,
    staleTime: 2 * 60 * 1000,
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      name: string;
      phone: string;
      email: string;
      address: string;
      city: string;
      postcode: string;
      products: Array<{ product_id: number; quantity: number; amount: number }>;
    }) => apiClient.post(API_ENDPOINTS.PAY_SSLCOMMERZ, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Order created successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to create order");
    },
  });
};

export const useUpdateOrder = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { pay_status?: number; status?: number }) =>
      apiClient.put(API_ENDPOINTS.ORDER_UPDATE(id), data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["order", id] });
      toast.success("Order updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update order");
    },
  });
};

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { id: number; cancel_message: string }) =>
      apiClient.delete(API_ENDPOINTS.ORDER_DELETE(data.id), {
        cancel_message: data.cancel_message,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Order deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to delete order");
    },
  });
};

// Update order details
export const useUpdateOrderDetails = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { pay_status?: number; status?: number }) =>
      apiClient.put(API_ENDPOINTS.ORDER_DETAILS_UPDATE(id), data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Order details updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update order details");
    },
  });
};

// Delete order details
export const useDeleteOrderDetails = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { id: number; cancel_message: string }) =>
      apiClient.delete(API_ENDPOINTS.ORDER_DETAILS_DELETE(data.id), {
        cancel_message: data.cancel_message,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Order details deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to delete order details");
    },
  });
};
