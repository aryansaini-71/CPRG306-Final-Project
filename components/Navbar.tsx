"use client";

import React from "react";
import Link from "next/link";
import { ShoppingBag, User, LogOut, Shield } from "lucide-react";
import { useCart } from "@/app/context/cart-context";
import { useAuth } from "@/app/context/auth-context";

export default function Navbar() {
  const { cart } = useCart();
  const { user, signOut } = useAuth();
  
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const ADMIN_EMAIL = "aryan9817692114@gmail.com";
  const isAdmin = user?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();

  return (
    <nav className="fixed top-0 left-0 right-0 h-20 bg-[#F4F1EA]/90 backdrop-blur-md border-b border-[#2C3539]/10 flex items-center justify-between px-6 md:px-10 z-[10000]">
      
      <Link href="/" className="text-[#B85D19] font-black tracking-widest text-xl hover:opacity-80 transition-opacity">
        SPIRIT SOURCE
      </Link>

      <div className="flex items-center gap-8 relative z-[10001]">
        
        {isAdmin && (
          <Link 
            href="/admin" 
            className="flex items-center gap-2 text-xs font-bold tracking-widest text-[#2A4B41] hover:opacity-70 transition-colors"
          >
            <Shield className="w-4 h-4" />
            <span className="hidden md:inline">ADMIN</span>
          </Link>
        )}

        <Link href="/products" className="text-xs font-bold tracking-widest text-[#2C3539] hover:text-[#B85D19] transition-colors">
          COLLECTION
        </Link>
        
        <Link href="/cart" className="relative group">
          <ShoppingBag className="w-5 h-5 text-[#2C3539] group-hover:text-[#B85D19] transition-colors" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#B85D19] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Link>

        {user ? (
          <button 
            onClick={() => signOut()} 
            className="text-[#2C3539]/60 hover:text-[#B85D19] transition-colors"
            title="Sign Out"
          >
            <LogOut className="w-5 h-5" />
          </button>
        ) : (
          <Link href="/login" className="text-[#B85D19] hover:opacity-70 transition-opacity" title="Sign In">
            <User className="w-5 h-5" />
          </Link>
        )}
      </div>
    </nav>
  );
}