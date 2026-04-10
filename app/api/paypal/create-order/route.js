import { NextResponse } from "next/server";

import { createPayPalOrder, isPayPalConfigured } from "../../../../lib/paypal";

const currency = process.env.NEXT_PUBLIC_PAYPAL_CURRENCY || "USD";
const defaultAmount = process.env.PAYPAL_DEFAULT_AMOUNT || "50.00";

function normalizeAmount(value) {
  const amount = String(value || defaultAmount).trim();
  if (!/^\d+(\.\d{1,2})?$/.test(amount)) {
    throw new Error("Invalid amount format");
  }

  if (Number(amount) <= 0) {
    throw new Error("Amount must be greater than zero");
  }

  return Number(amount).toFixed(2);
}

export async function POST(request) {
  try {
    if (!isPayPalConfigured()) {
      return NextResponse.json({ error: "PayPal credentials are not configured" }, { status: 500 });
    }

    const body = await request.json();
    const amount = normalizeAmount(body.amount);
    const order = await createPayPalOrder({ amount, currency });

    return NextResponse.json({ id: order.id, status: order.status });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Unable to create PayPal order" }, { status: 500 });
  }
}
