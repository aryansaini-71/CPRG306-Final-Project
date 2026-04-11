"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { useCart } from "../context/cart-context";
import { useAuth } from "@/app/context/auth-context";
import { supabase } from "@/lib/supabase";

export default function SuccessPage() {
  const { cart, clearCart, getTotal } = useCart();
  const { user } = useAuth();
  
  // This ref acts as a "lock" to ensure the order only saves ONCE per session
  const hasSaved = useRef(false);

  useEffect(() => {
    const recordOrderAndClear = async () => {
      // Logic Check: Only proceed if we have a user, a cart, and haven't already saved
      if (hasSaved.current || cart.length === 0 || !user) return;

      try {
        // Set the lock immediately before the async call
        hasSaved.current = true; 

        // Ensure total is a number and matches the expected decimal format
        const totalAmount = Number(getTotal());

        const { error } = await supabase.from('orders').insert([{
          user_id: user.id,
          customer_email: user.email,
          items: cart,
          total_amount: totalAmount,
          status: 'paid'
        }]);

        if (error) {
          console.error("Order recording failed:", error.message);
          // Optional: Reset lock if you want to retry on failure
          // hasSaved.current = false; 
        } else {
          // Clear the cart only after a successful database entry
          clearCart();
        }
      } catch (err) {
        console.error("Database operation failed:", err);
      }
    };

    recordOrderAndClear();
  }, [user, cart, clearCart, getTotal]);

  return (
    <main className="min-h-screen bg-[#F4F1EA] flex items-center justify-center pt-20">
      <div className="max-w-md w-full text-center p-12 bg-white border border-[#2C3539]/10 shadow-2xl rounded-lg">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-[#2A4B41]/10 rounded-full flex items-center justify-center mx-auto mb-8 border-2 border-[#2A4B41]">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#2A4B41"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h1 className="text-3xl font-black text-[#B85D19] mb-4 uppercase tracking-tighter">
          Payment Successful
        </h1>
        
        <p className="text-[#2C3539]/70 mb-10 text-sm leading-relaxed tracking-wide">
          Your purchase has been securely recorded in the Member Vault. 
          A confirmation of your collection update is now available in your history.
        </p>

        <div className="flex flex-col gap-4">
          <Link
            href="/profile"
            className="block w-full bg-[#2C3539] text-white py-4 font-bold tracking-[0.2em] text-[10px] uppercase hover:bg-[#B85D19] transition-all"
          >
            View Order History
          </Link>
          
          <Link
            href="/products"
            className="block w-full border border-[#2C3539]/20 text-[#2C3539]/60 py-4 font-bold tracking-[0.2em] text-[10px] uppercase hover:bg-[#F4F1EA] transition-all"
          >
            Return to Collection
          </Link>
        </div>
      </div>
      
      {/* Decorative background text */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.02] z-0 overflow-hidden">
        <h1 className="text-[20vw] font-black leading-none select-none uppercase">
          SECURED
        </h1>
      </div>
    </main>
  );
}