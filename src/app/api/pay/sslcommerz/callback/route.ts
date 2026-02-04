import { NextRequest, NextResponse } from "next/server";
import { API_ENDPOINTS } from "@/api/ApiEndPoint";

// Handles SSLCommerz redirect callbacks (success/fail/cancel)
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const status = searchParams.get("status") || "unknown";

  // Extract transaction details from SSLCommerz callback
  const tranId = searchParams.get("tran_id") || "";
  const amount = searchParams.get("amount") || "";
  const currency = searchParams.get("currency") || "BDT";
  const cardType = searchParams.get("card_type") || "";

  // Handle different statuses
  if (status === "success") {
    // Redirect to success page with transaction details
    const successUrl = new URL("/payment-success", req.nextUrl.origin);
    successUrl.searchParams.set("status", "success");
    successUrl.searchParams.set("tran_id", tranId);
    successUrl.searchParams.set("amount", amount);
    successUrl.searchParams.set("currency", currency);
    successUrl.searchParams.set("card_type", cardType);

    // TODO: Save order to database here
    console.log("Payment Success - Transaction:", tranId);

    return NextResponse.redirect(successUrl);
  }

  if (status === "fail") {
    // Redirect to failure page
    const failUrl = new URL("/payment-failed", req.nextUrl.origin);
    failUrl.searchParams.set("tran_id", tranId);
    console.log("Payment Failed - Transaction:", tranId);
    return NextResponse.redirect(failUrl);
  }

  if (status === "cancel") {
    // Redirect to cancelled page
    const cancelUrl = new URL("/payment-cancelled", req.nextUrl.origin);
    cancelUrl.searchParams.set("tran_id", tranId);
    console.log("Payment Cancelled - Transaction:", tranId);
    return NextResponse.redirect(cancelUrl);
  }

  // Unknown status
  return NextResponse.json({ status: "unknown" });
}

export async function POST(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const status = searchParams.get("status") || "unknown";
  const body = await req.json().catch(() => ({}));

  console.log(`Payment ${status.toUpperCase()} - Callback:`, {
    params: Object.fromEntries(searchParams),
    body,
  });

  // Extract transaction details from POST body or searchParams
  const tranId = body?.tran_id || searchParams.get("tran_id") || "";
  const amount = body?.amount || searchParams.get("amount") || "";
  const currency = body?.currency || searchParams.get("currency") || "BDT";

  // Redirect based on status (same as GET)
  if (status === "success") {
    if (tranId) {
      try {
        await fetch(API_ENDPOINTS.ORDER_SUCCESS, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            transaction_id: tranId || "h2h6lkhlk62hlkh26",
          }),
        });
      } catch (err) {
        console.error("Order success notify failed:", err);
      }
    }
    const successUrl = new URL("/payment-success", req.nextUrl.origin);
    successUrl.searchParams.set("status", "success");
    successUrl.searchParams.set("tran_id", tranId);
    successUrl.searchParams.set("amount", amount);
    successUrl.searchParams.set("currency", currency);
    console.log("Payment Success - Transaction:", tranId);
    return NextResponse.redirect(successUrl);
  }

  if (status === "fail") {
    const failUrl = new URL("/payment-failed", req.nextUrl.origin);
    failUrl.searchParams.set("tran_id", tranId);
    console.log("Payment Failed - Transaction:", tranId);
    return NextResponse.redirect(failUrl);
  }

  if (status === "cancel") {
    const cancelUrl = new URL("/payment-cancelled", req.nextUrl.origin);
    cancelUrl.searchParams.set("tran_id", tranId);
    console.log("Payment Cancelled - Transaction:", tranId);
    return NextResponse.redirect(cancelUrl);
  }

  // Unknown status
  return NextResponse.json({ status: "unknown" });
}
