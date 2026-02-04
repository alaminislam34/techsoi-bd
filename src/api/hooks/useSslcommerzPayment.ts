// hooks/useSslcommerzPayment.ts
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

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
  try {
    const res = await fetch("/api/pay/sslcommerz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    let data: any = null;
    try {
      data = await res.json();
    } catch (e) {
      // If the gateway returns non-JSON, surface a readable error
      throw new Error(`Gateway responded with status ${res.status}`);
    }

    if (!res.ok) {
      const message = data?.message || "Payment initialization failed";
      throw new Error(message);
    }

    const redirectUrl =
      data?.redirectUrl ||
      data?.redirect_url ||
      data?.GatewayPageURL ||
      data?.url ||
      data?.payment_url ||
      data?.location;

    if (!redirectUrl) {
      throw new Error("No redirect URL found in payment response");
    }

    return {
      success: true,
      redirectUrl,
      tranId: data?.tranId,
      gatewayResponse: data?.gatewayResponse,
    };
  } catch (error: any) {
    console.error("SSLCOMMERZ Error Details:", {
      message: error?.message,
      response: error?.response,
      stack: error?.stack,
    });
    throw error;
  }
};

export const useSslcommerzPayment = () => {
  return useMutation({
    mutationFn: createPayment,
    onError: (error: any) => {
      console.error("Payment mutation error:", error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Payment initialization failed";
      toast.error(errorMessage);
    },
  });
};
