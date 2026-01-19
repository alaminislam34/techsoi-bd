// hooks/useSslcommerzPayment.ts
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../apiClient";
import { API_ENDPOINTS } from "../ApiEndPoint";

export interface SslcommerzProduct {
  product_id: number;
  quantity: number;
  amount: number;
}

export interface SslcommerzPayload {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  postcode: string;
  products: SslcommerzProduct[];
}

const createPayment = async (payload: SslcommerzPayload) => {
  const res = await apiClient.post(API_ENDPOINTS.PAY_SSLCOMMERZ, payload);
  return res.data;
};

export const useSslcommerzPayment = () => {
  return useMutation({
    mutationFn: createPayment,
  });
};
