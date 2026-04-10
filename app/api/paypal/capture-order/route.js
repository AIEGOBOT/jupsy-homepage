import { NextResponse } from "next/server";

import { capturePayPalOrder, isPayPalConfigured } from "../../../../lib/paypal";

export async function POST(request) {
  try {
    if (!isPayPalConfigured()) {
      return NextResponse.json({ error: "PayPal credentials are not configured" }, { status: 500 });
    }

    const body = await request.json();
    if (!body.orderID) {
      return NextResponse.json({ error: "Missing orderID" }, { status: 400 });
    }

    const capture = await capturePayPalOrder(body.orderID);
    return NextResponse.json(capture);
  } catch (error) {
    return NextResponse.json({ error: error.message || "Unable to capture PayPal order" }, { status: 500 });
  }
}
