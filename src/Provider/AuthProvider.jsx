"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { API_ENDPOINTS } from "@/api/ApiEndPoint";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // -------------------------------
  // 1️⃣ Call backend login after Google login
  // -------------------------------
  const loginBackend = async (userData) => {
    try {
      // Call backend /login
      const loginRes = await fetch(API_ENDPOINTS.USER_LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userData.name,
          email: userData.email,
          image: userData.image,
        }),
      });

      const loginData = await loginRes.json();

      if (loginRes.ok && loginData.token) {
        // Store token in localStorage
        localStorage.setItem("token", loginData.token);

        // Fetch profile using the token
        const profileRes = await fetch(API_ENDPOINTS.USER_PROFILE, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${loginData.token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        const profileData = await profileRes.json();

        if (profileRes.ok && profileData.data) {
          setUser(profileData.data);
          localStorage.setItem("user", JSON.stringify(profileData.data));
          toast.success("Logged in successfully");
        } else {
          toast.error("Profile fetch failed");
        }
      } else {
        toast.error("Backend login failed");
      }
    } catch (err) {
      console.error("Login Error:", err);
      toast.error("Backend login failed");
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------
  // 2️⃣ Google login button
  // -------------------------------
  const loginWithGoogle = () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL;
    const redirectUri = `${appUrl}/api/auth/callback/google`;
    const scope = encodeURIComponent("email profile openid");

    const googleUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&access_type=offline&prompt=consent`;

    window.location.href = googleUrl;
  };

  // -------------------------------
  // 3️⃣ Logout
  // -------------------------------
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Logged out successfully");
    window.location.href = "/";
  };

  // -------------------------------
  // 4️⃣ Initial Load: Check if user already logged in
  // -------------------------------
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, loginWithGoogle, logout, loginBackend }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
