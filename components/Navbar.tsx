"use client";

import React from "react";
import Link from "next/link";
// We added the Shield icon here for the admin button
import { ShoppingBag, User, LogOut, Shield } from "lucide-react";
import { useCart } from "@/app/context/cart-context";
import { useAuth } from "@/app/context/auth-context";

export default function Navbar() {
  const { cart } = useCart();
  const { user, signOut } = useAuth();
  
  // Calculate total items in the bag
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Check if the logged-in user is the admin
  const ADMIN_EMAIL = "aryan9817692114@gmail.com";
  const isAdmin = user?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();

  return (
    <nav className="fixed top-0 left-0 right-0 h-20 bg-white/90 backdrop-blur-md border-b border-black/5 flex items-center justify-between px-6 md:px-10 z-[10000]">
      
      {/* Brand Logo */}
      <Link href="/" className="text-[#A3821A] font-black tracking-widest text-xl hover:opacity-80 transition-opacity">
        SPIRIT SOURCE
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center gap-8 relative z-[10001]">
        
        {/* The Secret Admin Button - Only shows if you are logged in! */}
        {isAdmin && (
          <Link 
            href="/admin" 
            className="flex items-center gap-2 text-xs font-bold tracking-widest text-red-700 hover:text-red-500 transition-colors"
          >
            <Shield className="w-4 h-4" />
            <span className="hidden md:inline">ADMIN</span>
          </Link>
        )}

        <Link href="/products" className="text-xs font-bold tracking-widest hover:text-[#A3821A] transition-colors">
          COLLECTION
        </Link>
        
        {/* Cart Icon */}
        <Link href="/cart" className="relative group">
          <ShoppingBag className="w-5 h-5 text-black/80 group-hover:text-[#A3821A] transition-colors" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#A3821A] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Link>

        {/* User Login / Logout */}
        {user ? (
          <button 
            onClick={() => signOut()} 
            className="text-black/40 hover:text-red-500 transition-colors"
            title="Sign Out"
          >
            <LogOut className="w-5 h-5" />
          </button>
        ) : (
          <Link href="/login" className="text-[#A3821A] hover:opacity-70 transition-opacity" title="Sign In">
            <User className="w-5 h-5" />
          </Link>
        )}
      </div>
    </nav>
  );
}