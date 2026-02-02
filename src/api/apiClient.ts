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

export interface ApiRequestOptions extends RequestInit {
  auth?: boolean;
  authToken?: string;
}

class ApiClient {
  private baseURL = "https://api.techsoibd.com/api";

  private async resolveAuthToken(
    auth: boolean | undefined,
    authToken?: string,
  ): Promise<string | undefined> {
    if (authToken) {
      return authToken;
    }

    if (!auth || typeof window === "undefined") {
      return undefined;
    }

    try {
      const localToken = window.localStorage.getItem("accessToken");
      if (localToken) {
        return localToken;
      }
      const { default: Cookies } = await import("js-cookie");
      return Cookies.get("accessToken") || Cookies.get("accessTokenClient");
    } catch {
      return undefined;
    }
  }

  async request<T>(
    url: string,
    options: ApiRequestOptions = {},
  ): Promise<ApiResponse<T>> {
    const { auth, authToken, ...requestOptions } = options;
    const headers = new Headers(requestOptions.headers || {});
    const hasBody = requestOptions.body !== undefined && requestOptions.body !== null;
    const isFormData =
      typeof FormData !== "undefined" && requestOptions.body instanceof FormData;
    const isUrlEncoded =
      typeof URLSearchParams !== "undefined" &&
      requestOptions.body instanceof URLSearchParams;

    if (
      hasBody &&
      !isFormData &&
      !isUrlEncoded &&
      !headers.has("Content-Type")
    ) {
      headers.set("Content-Type", "application/json");
    }

    const token = await this.resolveAuthToken(auth, authToken);
    if (auth && token && !headers.has("Authorization")) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    const fullUrl = /^https?:\/\//i.test(url)
      ? url
      : `${this.baseURL}${url.startsWith("/") ? "" : "/"}${url}`;

    const config: RequestInit = {
      ...requestOptions,
      headers,
    };

    try {
      const response = await fetch(fullUrl, config);
      const contentType = response.headers.get("content-type");

      let data: any;

      // Check if response is JSON before parsing
      if (contentType && contentType.includes("application/json")) {
        try {
          data = await response.json();
        } catch {
          data = null;
        }
      } else {
        const text = await response.text();
        try {
          data = text ? JSON.parse(text) : null;
        } catch {
          data = null;
        }

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

        throw new Error(errorMessage);
      }

      if (!response.ok) {
        const errorMsg = data.message || `HTTP ${response.status} Error`;

        throw new Error(errorMsg);
      }

      return data;
    } catch (error: any) {
      // If it's a network error
      if (error instanceof TypeError && error.message === "Failed to fetch") {
        console.error(
          "[Network Error] Check if API server is running and CORS is enabled",
          { url: fullUrl },
        );
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
  async post<T>(
    endpoint: string,
    body?: Record<string, any>,
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  // PUT Request
  async put<T>(
    endpoint: string,
    body?: Record<string, any>,
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  // PATCH Request
  async patch<T>(
    endpoint: string,
    body?: Record<string, any>,
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  // DELETE Request
  async delete<T>(
    endpoint: string,
    body?: Record<string, any>,
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "DELETE",
      body: body ? JSON.stringify(body) : undefined,
    });
  }
}

export const apiClient = new ApiClient();
