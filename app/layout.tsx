"use client";
import React from 'react';
import "./globals.css";
import Navbar from "../components/Navbar";
import { CartProvider } from "./context/cart-context";
import { AuthProvider } from "./context/auth-context";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        <AuthProvider>
          <CartProvider>
            <Navbar />
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}