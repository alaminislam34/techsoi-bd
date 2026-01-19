"use client";

import { createContext, useContext } from "react";
import { createAuthClient } from "better-auth/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/api/apiClient";
import { API_ENDPOINTS } from "@/api/ApiEndPoint";
import { toast } from "react-toastify";

const client = createAuthClient();

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient();

  // Fetch session and login with backend
  const { data: user = null, isLoading: loading } = useQuery({
    queryKey: ["auth:session"],
    queryFn: async () => {
      const session = await client.getSession();
      const googleUser = session?.data.user;

      if (googleUser) {
        try {
          const loginRes = await apiClient.post(API_ENDPOINTS.USER_LOGIN, {
            name: googleUser.name,
            email: googleUser.email,
            image: googleUser.image,
          });

          if (loginRes.token) {
            localStorage.setItem("token", loginRes.token);
          }

          return loginRes.data || googleUser;
        } catch (error) {
          console.error("Backend login failed:", error);
          return googleUser;
        }
      }

      return null;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Google sign-in mutation
  const loginWithGoogle = useMutation({
    mutationFn: async () => {
      await client.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    },
    onError: (err) => {
      console.error("Google login failed:", err);
      toast.error("Google login failed");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth:session"] });
    },
  });

  // Logout mutation
  const logout = useMutation({
    mutationFn: async () => {
      try {
        // Call backend logout API (GET request)
        await apiClient.get(API_ENDPOINTS.USER_LOGOUT);
      } catch (error) {
        // Continue logout even if backend call fails
        console.error("Backend logout failed:", error);
      }

      // Remove token from localStorage
      localStorage.removeItem("token");

      // Sign out from better-auth
      await client.signIn.signOut();
    },
    onSuccess: () => {
      queryClient.setQueryData(["auth:session"], null);
      toast.success("Logged out successfully");
    },
    onError: (err) => {
      console.error("Logout failed:", err);
      toast.error("Logout failed");
    },
  });

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginWithGoogle: loginWithGoogle.mutate,
        logout: logout.mutate,
        isLoggingOut: logout.isPending,
        refreshSession: () =>
          queryClient.invalidateQueries({ queryKey: ["auth:session"] }),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
};
