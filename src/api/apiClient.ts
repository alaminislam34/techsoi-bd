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
  _isRetry?: boolean; // Internal flag to prevent infinite loops
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
    const hasBody =
      requestOptions.body !== undefined && requestOptions.body !== null;
    const isFormData =
      typeof FormData !== "undefined" &&
      requestOptions.body instanceof FormData;
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
      }

      if (!response.ok) {
        const errorMessage =
          data?.message ||
          data?.error ||
          `Request failed with status ${response.status}`;
        const error = new Error(errorMessage);
        (error as any).status = response.status;
        (error as any).data = data;
        // Log only in development
        if (process.env.NODE_ENV === "development") {
          console.error(
            `[API Error] ${fullUrl} ${response.status} ${response.statusText}`,
            data,
          );
        }
        throw error;
      }

      return data;
    } catch (error: any) {
      // Handle 401 Unauthorized - Token expired
      if (error.status === 401 && !options._isRetry) {
        try {
          const refreshResponse = await fetch(`${this.baseURL}/refresh`, {
            method: "POST",
            credentials: "include",
          });

          if (refreshResponse.ok) {
            const refreshData = await refreshResponse.json();

            const newAccessToken =
              refreshData.new_token ||
              refreshData.token ||
              refreshData.data?.token;

            if (newAccessToken) {
              localStorage.setItem("accessToken", newAccessToken);

              try {
                const { default: Cookies } = await import("js-cookie");
                Cookies.set("accessToken", newAccessToken);
              } catch {}

              return this.request<T>(url, {
                ...options,
                authToken: newAccessToken,
                _isRetry: true,
              });
            }
          }
        } catch (refreshError) {
          // Refresh failed, throw original error
          if (process.env.NODE_ENV === "development") {
            console.error("Token refresh failed:", refreshError);
          }
        }
      }

      // If it's a network error
      if (error instanceof TypeError && error.message === "Failed to fetch") {
        if (process.env.NODE_ENV === "development") {
          console.error(
            "[Network Error] Check if API server is running and CORS is enabled",
            { url: fullUrl },
          );
        }
        throw new Error("Something went wrong");
      }

      // If it's already a formatted error from above, just re-throw
      if (error instanceof Error) {
        throw error;
      }

      if (process.env.NODE_ENV === "development") {
        console.error("API Request Failed:", error);
      }
      throw new Error("Something went wrong");
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
