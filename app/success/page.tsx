"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useCart } from "../context/cart-context";

export default function SuccessPage() {
  const { clearCart } = useCart();

  // Clear the cart once the user lands on this page
  useEffect(() => {
    clearCart();
  }, []);

  return (
    <main
      style={{
        backgroundColor: "var(--brand-dark)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        color: "var(--brand-cream)",
      }}
    >
      <div style={{ maxWidth: "500px", textAlign: "center" }}>
        {/* Checkmark icon */}
        <div
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            backgroundColor: "rgba(163, 130, 26, 0.15)",
            border: "2px solid var(--brand-gold)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 30px",
          }}
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#A3821A"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h1
          style={{
            color: "var(--brand-gold)",
            fontSize: "2.2rem",
            letterSpacing: "0.2em",
            marginBottom: "16px",
            fontWeight: "bold",
          }}
        >
          ORDER CONFIRMED
        </h1>

        <p
          style={{
            fontSize: "1rem",
            color: "rgba(255,255,255,0.6)",
            lineHeight: "1.7",
            marginBottom: "40px",
            letterSpacing: "0.05em",
          }}
        >
          Thank you for your purchase. Your order has been received and is being
          processed. You will receive a confirmation email shortly.
        </p>

        <Link
          href="/products"
          style={{
            display: "inline-block",
            backgroundColor: "var(--brand-gold)",
            color: "var(--brand-dark)",
            padding: "14px 36px",
            borderRadius: "5px",
            textDecoration: "none",
            fontWeight: "bold",
            letterSpacing: "0.15em",
            fontSize: "0.85rem",
          }}
        >
          CONTINUE SHOPPING
        </Link>
      </div>
    </main>
  );
}