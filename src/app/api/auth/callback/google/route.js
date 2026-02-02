import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");

    if (!code) {
      return NextResponse.json(
        { error: "No authorization code provided." },
        { status: 400 },
      );
    }

    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/callback/google`,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenResponse.json();
    if (tokenData.error) {
      return NextResponse.json(
        { error: tokenData.error_description },
        { status: 500 },
      );
    }

    const profileResponse = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
      },
    );
    const profile = await profileResponse.json();

    const apiResponse = await fetch("https://api.techsoibd.com/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: profile.name,
        email: profile.email,
        image: profile.picture,
      }),
    });

    const apiResult = await apiResponse.json();

    if (!apiResult.status || !apiResult.token) {
      return NextResponse.json(
        { error: apiResult.message || "Login failed at backend API" },
        { status: 401 },
      );
    }

    const user = await axios.get("https://api.techsoibd.com/api/profile", {
      headers: {
        Authorization: `Bearer ${apiResult.token}`,
      },
    });

    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const response = NextResponse.redirect(`${baseUrl}/auth/redirect`);

    // Secure httpOnly cookie for server-side API requests
    response.cookies.set("accessToken", apiResult.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
      sameSite: "lax",
    });

    // Accessible cookie for client-side JavaScript
    response.cookies.set("accessTokenClient", apiResult.token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
      sameSite: "lax",
    });

    if (user?.data) {
      response.cookies.set("user", JSON.stringify(user.data.data), {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60,
        path: "/",
        sameSite: "lax",
      });
    }

    return response;
  } catch (err) {
    console.error("❌ OAuth Error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
