"use client";
import React, { useState, useEffect } from 'react';
import './globals.css';
import { CartProvider } from '../context/CartContext';
import Navbar from '../components/Navbar';

interface NavbarProps {
  toggleTheme: () => void;
  currentTheme: string;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState('dark');

  // Toggle function
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <html lang="en" data-theme={theme}>
      <body>
        <CartProvider>
          {/* We pass the toggle function to the Navbar so the button can use it */}
          <Navbar toggleTheme={toggleTheme} currentTheme={theme} />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}