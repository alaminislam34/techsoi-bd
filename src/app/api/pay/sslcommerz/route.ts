import { NextRequest, NextResponse } from "next/server";

const SSLCOMMERZ_API_URL =
  process.env.SSLCOMMERZ_API_URL ||
  "https://sandbox.sslcommerz.com/gwprocess/v4/api.php";

export async function POST(req: NextRequest) {
  try {
    const storeId = process.env.SSLCOMMERZ_STORE_ID;
    const storePassword = process.env.SSLCOMMERZ_STORE_PASSWORD;
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

    if (!storeId || !storePassword) {
      return NextResponse.json(
        { message: "Missing SSLCOMMERZ credentials" },
        { status: 500 },
      );
    }

    const body = await req.json();
    const {
      name,
      phone,
      email,
      address,
      city,
      postcode,
      products = [],
    } = body || {};

    if (!name || !phone || !address || !city || !postcode) {
      return NextResponse.json(
        { message: "Required fields: name, phone, address, city, postcode" },
        { status: 400 },
      );
    }

    // Sum the provided amounts (expects amounts to already include quantity)
    const totalAmount = (products as any[]).reduce((sum, item) => {
      const amt = Number(item?.amount) || 0;
      return sum + amt;
    }, 0);

    const tranId = `techsoi-${Date.now()}`;

    const params = new URLSearchParams({
      store_id: storeId,
      store_passwd: storePassword,
      total_amount: totalAmount.toFixed(2),
      currency: "BDT",
      tran_id: tranId,
      success_url: `${baseUrl}/api/pay/sslcommerz/callback?status=success`,
      fail_url: `${baseUrl}/api/pay/sslcommerz/callback?status=fail`,
      cancel_url: `${baseUrl}/api/pay/sslcommerz/callback?status=cancel`,
      emi_option: "0",
      cus_name: name,
      cus_email: email || "customer@example.com",
      cus_add1: address,
      cus_city: city,
      cus_postcode: postcode,
      cus_country: "Bangladesh",
      cus_phone: phone,
      shipping_method: "NO",
      product_name: "Cart Items",
      product_category: "General",
      product_profile: "general",
    });

    const response = await fetch(SSLCOMMERZ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
      redirect: "manual",
    });

    let redirectUrl: string | null = null;
    let gatewayResponse: any = null;
    let gatewayStatus: number | null = response.status;
    let gatewayBody: string | null = null;

    if (response.status >= 300 && response.status < 400) {
      redirectUrl =
        response.headers.get("location") || response.headers.get("Location");
    }

    try {
      const contentType = response.headers.get("content-type");
      const bodyText = await response.text();
      gatewayBody = bodyText;

      if (contentType && contentType.includes("application/json")) {
        gatewayResponse = JSON.parse(bodyText);
      }

      if (!redirectUrl && gatewayResponse) {
        redirectUrl =
          gatewayResponse?.redirect_url ||
          gatewayResponse?.GatewayPageURL ||
          gatewayResponse?.url ||
          gatewayResponse?.payment_url ||
          gatewayResponse?.location ||
          null;
      }
    } catch (e) {
      // ignore parse errors
    }

    if (!redirectUrl) {
      console.error("SSLCOMMERZ Gateway Error:", {
        gatewayStatus,
        gatewayResponse,
        gatewayBody,
        params: params.toString(),
      });
      return NextResponse.json(
        {
          message: "No redirect URL returned from SSLCOMMERZ",
          gatewayStatus,
          gatewayResponse,
          gatewayBody,
        },
        { status: 502 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        redirectUrl,
        gatewayResponse,
        tranId,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("SSLCOMMERZ API error:", error);
    return NextResponse.json(
      { message: error?.message || "Payment initialization failed" },
      { status: 500 },
    );
  }
}
