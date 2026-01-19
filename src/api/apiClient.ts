import { API_ENDPOINTS } from "./ApiEndPoint";

export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
  token?: string;
}

export interface ApiErrorResponse {
  status: boolean;
  message: string;
}

class ApiClient {
  private baseURL = "https://api.techsoibd.com/api";

  async request<T>(
    url: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const defaultHeaders: HeadersInit = {
      "Content-Type": "application/json",
    };

    // Add token from localStorage if available
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      defaultHeaders["Authorization"] = `Bearer ${token}`;
    }

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...(options.headers || {}),
      },
    };

    try {
      const response = await fetch(url, config);
      const contentType = response.headers.get("content-type");
      
      let data: any;
      
      // Check if response is JSON before parsing
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        // If not JSON, get the text and create error message
        const text = await response.text();
        
        // Determine error message based on status
        let errorMessage = "API Error";
        if (response.status === 401) {
          errorMessage = "Unauthorized - Please login to continue";
        } else if (response.status === 403) {
          errorMessage = "Forbidden - You don't have permission";
        } else if (response.status === 404) {
          errorMessage = "Not Found - Resource doesn't exist";
        } else if (response.status >= 500) {
          errorMessage = "Server Error - Please try again later";
        } else {
          errorMessage = `HTTP ${response.status} - ${response.statusText}`;
        }
        
        console.error(`[API Error] ${response.status} ${response.statusText}`, { url, text });
        throw new Error(errorMessage);
      }

      if (!response.ok) {
        const errorMsg = data.message || `HTTP ${response.status} Error`;
        console.error(`[API Error] ${response.status}`, { url, message: errorMsg, data });
        throw new Error(errorMsg);
      }

      return data;
    } catch (error: any) {
      // If it's a network error
      if (error instanceof TypeError && error.message === "Failed to fetch") {
        console.error("[Network Error] Check if API server is running and CORS is enabled", { url });
        throw new Error("Network Error - Unable to connect to server");
      }
      console.error("API Request Failed:", error);
      throw error;
    }
  }

  // GET Request
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "GET",
    });
  }

  // POST Request
  async post<T>(endpoint: string, body?: Record<string, any>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  // PUT Request
  async put<T>(endpoint: string, body?: Record<string, any>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  // PATCH Request
  async patch<T>(endpoint: string, body?: Record<string, any>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  // DELETE Request
  async delete<T>(endpoint: string, body?: Record<string, any>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "DELETE",
      body: body ? JSON.stringify(body) : undefined,
    });
  }
}

export const apiClient = new ApiClient();
