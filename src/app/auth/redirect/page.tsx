"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function AuthRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("accessTokenClient");
    if (token) {
      localStorage.setItem("accessToken", token);
    }

    const userCookie = Cookies.get("user");
    if (userCookie) {
      try {
        localStorage.setItem("user", userCookie);
      } catch {
        // ignore
      }
    }

    router.replace("/");
  }, [router]);

  return null;
}
