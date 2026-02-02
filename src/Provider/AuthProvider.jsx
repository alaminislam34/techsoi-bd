"use client";

import { createContext, useContext, useMemo } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const AuthContext = createContext(null);

const parseUserCookie = () => {
  const rawUser = Cookies.get("user");
  if (!rawUser) return null;
  try {
    return JSON.parse(rawUser);
  } catch (error) {
    console.warn("Invalid user cookie JSON:", error);
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const user = useMemo(() => parseUserCookie(), []);

  const loginWithGoogle = async () => {
    try {
      const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
      const appUrl = process.env.NEXT_PUBLIC_APP_URL;
      if (!clientId || !appUrl) {
        toast.error("Google login is not configured properly.");
        return;
      }

      const redirectUri = `${appUrl}/api/auth/callback/google`;
      const scope = encodeURIComponent("email profile openid");
      const googleUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&access_type=offline&prompt=consent`;
      window.location.href = googleUrl;
    } catch (error) {
      toast.error("Failed to initiate Google login. Please try again.");
    }
  };

  // Logout mutation
  const logout = () => {
    Cookies.remove("user");
    Cookies.remove("accessToken");
    window.location.reload();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loginWithGoogle,
        logout,
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
