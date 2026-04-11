"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useCart } from "../context/cart-context"; //
import { useAuth } from "@/app/context/auth-context"; //
import { supabase } from "@/lib/supabase"; //

export default function SuccessPage() {
  const { cart, clearCart, getTotal } = useCart(); //
  const { user } = useAuth(); //

  useEffect(() => {
    const recordOrderAndClear = async () => {
      // Only proceed if there is an active user and items to record
      if (user && cart.length > 0) {
        try {
          // 1. Insert order details into the 'orders' table
          const { error } = await supabase.from('orders').insert([{
            user_id: user.id,
            customer_email: user.email,
            items: cart, // Stores the array of product objects
            total_amount: getTotal(),
            status: 'paid'
          }]);

          if (error) {
            console.error("Error recording order:", error.message);
          } else {
            // 2. Clear the cart state only after successful database entry
            clearCart();
          }
        } catch (err) {
          console.error("Database operation failed:", err);
        }
      } else if (!user && cart.length > 0) {
        // If a guest payment happened, we still clear the cart
        clearCart();
      }
    };

    recordOrderAndClear();
  }, [user, cart, clearCart, getTotal]); //

  return (
    <main
      style={{
        backgroundColor: "var(--bg-main)", // Matches Heritage Distillery theme
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        color: "var(--text-main)",
      }}
    >
      <div style={{ maxWidth: "500px", textAlign: "center" }}>
        {/* Checkmark icon */}
        <div
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            backgroundColor: "rgba(184, 93, 25, 0.15)", // Cognac accent background
            border: "2px solid var(--accent-primary)", // Cognac border
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
            stroke="var(--accent-primary)" //
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h1
          style={{
            color: "var(--accent-primary)", //
            fontSize: "2.2rem",
            letterSpacing: "0.2em",
            marginBottom: "16px",
            fontWeight: "black",
            textTransform: "uppercase"
          }}
        >
          Order Confirmed
        </h1>

        <p
          style={{
            fontSize: "1rem",
            color: "var(--text-main)",
            opacity: 0.7,
            lineHeight: "1.7",
            marginBottom: "40px",
            letterSpacing: "0.05em",
          }}
        >
          Thank you for your purchase, {user?.email || "Customer"}. Your order has been recorded in our vault 
          and is being processed. You can now view this in your order history.
        </p>

        <Link
          href="/products"
          style={{
            display: "inline-block",
            backgroundColor: "var(--accent-primary)", //
            color: "white",
            padding: "14px 36px",
            borderRadius: "4px",
            textDecoration: "none",
            fontWeight: "bold",
            letterSpacing: "0.15em",
            fontSize: "0.85rem",
            transition: "all 0.3s ease"
          }}
        >
          CONTINUE SHOPPING
        </Link>
      </div>
    </main>
  );
}