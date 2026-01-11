import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const code = url.searchParams.get("code");

    if (!code)
      return NextResponse.redirect(new URL("/?error=no_code", req.url));

    // 1. Google theke code exchange kore token neya
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback/google`,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenResponse.json();
    if (!tokenData.access_token) {
      return NextResponse.redirect(
        new URL("/?error=google_token_failed", req.url)
      );
    }

    // 2. Google profile info fetch (Backend-e pathanor jonno)
    const profileResponse = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
      }
    );
    const profile = await profileResponse.json();

    // 3. 🔹 APNAR REAL BACKEND-E LOGIN (https://api.techsoibd.com/api/login)
    const backendResponse = await fetch(`${process.env.BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: profile.name,
        email: profile.email,
        image: profile.picture,
      }),
    });

    const userData = await backendResponse.json();

    // Jodi backend token dey (apnar deoa response format anujayi)
    if (backendResponse.ok && userData.token) {
      const response = NextResponse.redirect(new URL("/", req.url));

      // 4. Backend theke paoa REAL TOKEN-ta cookie-te set kora
      response.cookies.set("token", userData.token, {
        httpOnly: false, // Frontend theke read korar jonno false thakte hobe
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60,
        path: "/",
        sameSite: "lax",
      });

      return response;
    } else {
      console.error("Backend Login Error:", userData);
      return NextResponse.redirect(
        new URL("/?error=backend_rejection", req.url)
      );
    }
  } catch (err) {
    console.error("❌ Auth Flow Crash:", err);
    return NextResponse.redirect(new URL("/?error=server_crash", req.url));
  }
}
