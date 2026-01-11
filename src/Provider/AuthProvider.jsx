"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { API_ENDPOINTS } from "@/api/ApiEndPoint";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Fetch User Profile using Token
  const fetchProfile = async (token) => {
    try {
      const response = await fetch(API_ENDPOINTS.USER_PROFILE, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      const result = await response.json();

      if (response.ok && result.status) {
        setUser(result.data); // Backend theke paoa user data set holo
      } else {
        logout(); // Token invalid hole clean up
      }
    } catch (err) {
      console.error("Profile Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // 2. Initial Load: Check if user is logged in
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      fetchProfile(token);
    } else {
      setLoading(false);
    }
  }, []);

  // 3. Google Login Handler
  const loginWithGoogle = () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL;
    const redirectUri = `${appUrl}/api/auth/callback/google`;
    const scope = encodeURIComponent("email profile openid");

    const googleUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&access_type=offline&prompt=consent`;

    window.location.href = googleUrl;
  };

  // 4. Logout Handler
  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    toast.success("Logged out successfully");
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, loginWithGoogle, logout, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy access
export const useAuth = () => useContext(AuthContext);
