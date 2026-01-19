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
    queryFn: () => apiClient.get<Order[]>(API_ENDPOINTS.ORDER_GET_ALL),
    staleTime: 2 * 60 * 1000,
  });
};

// Get single order
export const useGetOrder = (id: number) => {
  return useQuery({
    queryKey: ["order", id],
    queryFn: () => apiClient.get<Order>(API_ENDPOINTS.ORDER_GET_SINGLE(id)),
    enabled: !!id,
    staleTime: 2 * 60 * 1000,
  });
};

// Create order (payment)
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

// Update order
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

// Delete order
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
