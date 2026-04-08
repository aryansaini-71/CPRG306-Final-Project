"use client";
import React, { useState } from 'react';
import "./globals.css";
import Navbar from "../components/Navbar";
import { CartProvider } from "./context/cart-context";
import { AuthProvider } from "./context/auth-context";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // We keep the theme state here so the whole app can see it
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  return (
    <html lang="en" data-theme={theme}>
      <body style={{ margin: 0, padding: 0 }}>
        <AuthProvider>
          <CartProvider>
            {/* We pass the toggle function to the Navbar */}
            <Navbar toggleTheme={toggleTheme} currentTheme={theme} />
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}