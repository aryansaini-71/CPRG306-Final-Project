"use client";
import React from 'react';
import "./globals.css";
import Navbar from "../components/Navbar";
import { CartProvider } from "./context/cart-context";
import { AuthProvider } from "./context/auth-context";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body style={{ margin: 0, padding: 0 }}>
        <AuthProvider>
          <CartProvider>
            {/* Navbar no longer needs theme props */}
            <Navbar />
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}