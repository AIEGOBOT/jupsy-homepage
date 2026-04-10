"use client";

import { useEffect, useRef, useState } from "react";

const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
const paypalCurrency = process.env.NEXT_PUBLIC_PAYPAL_CURRENCY || "USD";

function loadPayPalSdk() {
  if (!paypalClientId) {
    return Promise.reject(new Error("Missing PayPal client id"));
  }

  if (window.paypal) {
    return Promise.resolve(window.paypal);
  }

  const existingScript = document.querySelector('script[data-paypal-sdk="true"]');
  if (existingScript) {
    return new Promise((resolve, reject) => {
      existingScript.addEventListener("load", () => resolve(window.paypal), { once: true });
      existingScript.addEventListener("error", () => reject(new Error("PayPal SDK load failed")), { once: true });
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${paypalClientId}&currency=${paypalCurrency}&intent=capture`;
    script.async = true;
    script.dataset.paypalSdk = "true";
    script.onload = () => resolve(window.paypal);
    script.onerror = () => reject(new Error("PayPal SDK load failed"));
    document.body.appendChild(script);
  });
}

export default function PayPalCheckout({ amount }) {
  const buttonRef = useRef(null);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!paypalClientId || !buttonRef.current) {
      return undefined;
    }

    let cancelled = false;

    loadPayPalSdk()
      .then((paypal) => {
        if (cancelled || !paypal || !buttonRef.current) {
          return;
        }

        buttonRef.current.innerHTML = "";

        paypal
          .Buttons({
            style: {
              layout: "vertical",
              shape: "pill",
              label: "paypal",
            },
            createOrder: async () => {
              setStatus("loading");
              setMessage("");

              const response = await fetch("/api/paypal/create-order", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ amount }),
              });

              const data = await response.json();
              if (!response.ok) {
                throw new Error(data.error || "PayPal 주문 생성에 실패했습니다.");
              }

              return data.id;
            },
            onApprove: async (data) => {
              const response = await fetch("/api/paypal/capture-order", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ orderID: data.orderID }),
              });

              const capture = await response.json();
              if (!response.ok) {
                throw new Error(capture.error || "PayPal 결제 승인 처리에 실패했습니다.");
              }

              setStatus("success");
              setMessage("PayPal 결제가 승인되었습니다. 실제 후속 처리 연결은 다음 단계에서 붙이면 됩니다.");
            },
            onCancel: () => {
              setStatus("idle");
              setMessage("결제가 취소되었습니다.");
            },
            onError: (error) => {
              setStatus("error");
              setMessage(error.message || "PayPal 버튼 처리 중 오류가 발생했습니다.");
            },
          })
          .render(buttonRef.current);
      })
      .catch((error) => {
        if (cancelled) {
          return;
        }

        setStatus("error");
        setMessage(error.message || "PayPal SDK를 불러오지 못했습니다.");
      });

    return () => {
      cancelled = true;
    };
  }, [amount]);

  if (!paypalClientId) {
    return (
      <div className="paypal-status paypal-status-config">
        `NEXT_PUBLIC_PAYPAL_CLIENT_ID`가 없어서 PayPal 버튼은 아직 비활성 상태입니다.
      </div>
    );
  }

  return (
    <div className="paypal-shell">
      <div className="paypal-meta">
        <strong>
          PayPal 결제 준비
          {` ${amount} ${paypalCurrency}`}
        </strong>
        <span>Sandbox 또는 Live 키를 넣으면 같은 구조로 바로 테스트할 수 있습니다.</span>
      </div>

      <div ref={buttonRef} className="paypal-button-slot"></div>

      {message ? (
        <div className={`paypal-status paypal-status-${status === "success" ? "success" : "default"}`}>{message}</div>
      ) : null}
    </div>
  );
}
