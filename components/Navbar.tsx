"use client";
import React from 'react';
import Link from 'next/link';
import { useCart } from '../app/context/cart-context';
import { useAuth } from '../app/context/auth-context';

interface NavbarProps {
  toggleTheme: () => void;
  currentTheme: string;
}

export default function Navbar({ toggleTheme, currentTheme }: NavbarProps) {
  const { cart } = useCart();
  const { user, signOut } = useAuth();
  
  // Calculate total items in bag
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      padding: '15px 40px',
      borderBottom: '1px solid var(--border)',
      backgroundColor: 'var(--bg-card)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      {/* Brand Logo */}
      <Link href="/" style={{ 
        color: 'var(--gold)', 
        fontWeight: '900', 
        textDecoration: 'none', 
        fontSize: '1.2rem',
        letterSpacing: '2px'
      }}>
        SPIRIT SOURCE
      </Link>

      {/* Nav Links */}
      <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
        <Link href="/products" style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.9rem' }}>
          COLLECTION
        </Link>
        
        <Link href="/cart" style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 'bold' }}>
          BAG ({cartCount})
        </Link>

        {/* User Auth Section */}
        {user ? (
          <button 
            onClick={() => signOut()} 
            style={{ background: 'none', border: 'none', color: 'var(--text-main)', cursor: 'pointer', fontSize: '0.8rem', opacity: 0.7 }}
          >
            SIGN OUT
          </button>
        ) : (
          <Link href="/login" style={{ color: 'var(--gold)', textDecoration: 'none', fontSize: '0.9rem' }}>
            SIGN IN
          </Link>
        )}

        {/* Theme Toggle Button */}
        <button 
          onClick={toggleTheme}
          style={{ 
            backgroundColor: 'var(--gold)', 
            color: 'white', 
            border: 'none', 
            padding: '8px 16px', 
            borderRadius: '20px', 
            cursor: 'pointer',
            fontSize: '0.7rem',
            fontWeight: 'bold'
          }}
        >
          {currentTheme === 'dark' ? 'LIGHT MODE' : 'DARK MODE'}
        </button>
      </div>
    </nav>
  );
}