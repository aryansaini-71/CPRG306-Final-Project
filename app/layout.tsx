"use client";
import React from 'react';
import "./globals.css";
import Navbar from "../components/Navbar";
import { CartProvider } from "./context/cart-context";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        <CartProvider>
          <Navbar />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}