import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const code = url.searchParams.get("code");

    if (!code) {
      return NextResponse.redirect(new URL("/?error=no_code", req.url));
    }

    // Exchange code for Google token
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

    // Fetch Google profile
    const profileResponse = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
      }
    );

    const profile = await profileResponse.json();

    if (!profile.email) {
      return NextResponse.redirect(
        new URL("/?error=google_profile_failed", req.url)
      );
    }

    // Set cookies
    const response = NextResponse.redirect(new URL("/", req.url));

    response.cookies.set("google_token", tokenData.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: tokenData.expires_in || 3600,
      path: "/",
      sameSite: "lax",
    });

    response.cookies.set(
      "user",
      JSON.stringify({
        name: profile.name,
        email: profile.email,
        image: profile.picture,
      }),
      {
        httpOnly: false,
        maxAge: tokenData.expires_in || 3600,
        path: "/",
      }
    );

    return response;
  } catch (err) {
    console.error("Google Auth Error:", err);
    return NextResponse.redirect(new URL("/?error=server_crash", req.url));
  }
}
