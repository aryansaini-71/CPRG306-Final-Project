"use client";

import React from "react";
import Link from "next/link";
import { ShoppingBag, User, LogOut } from "lucide-react";
import { useCart } from "@/app/context/cart-context";
import { useAuth } from "@/app/context/auth-context";

export default function Navbar() {
  const { cart } = useCart();
  const { user, signOut } = useAuth();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="fixed top-0 left-0 right-0 h-20 bg-white/90 backdrop-blur-md border-b border-black/5 flex items-center justify-between px-6 md:px-10 z-[10000]">
      <Link href="/" className="text-[#A3821A] font-black tracking-widest text-xl">
        SPIRIT SOURCE
      </Link>

      <div className="flex items-center gap-8 relative z-[10001]">
        <Link href="/products" className="text-xs font-bold tracking-widest hover:text-[#A3821A] transition-colors">
          COLLECTION
        </Link>
        
        <Link href="/cart" className="relative">
          <ShoppingBag className="w-5 h-5 text-black/80 hover:text-[#A3821A] transition-colors" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#A3821A] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Link>

        {user ? (
          <button onClick={() => signOut()} className="text-black/40 hover:text-red-500">
            <LogOut className="w-4 h-4" />
          </button>
        ) : (
          <Link href="/login" className="text-[#A3821A]">
            <User className="w-5 h-5 hover:opacity-70 transition-opacity" />
          </Link>
        )}
      </div>
    </nav>
  );
}