"use client";
import React from 'react';
import Link from 'next/link';
import { useCart } from '../app/context/cart-context';
import { useAuth } from '../app/context/auth-context';

export default function Navbar() {
  const { cart } = useCart();
  const { user, signOut } = useAuth();
  
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      padding: '15px 40px',
      borderBottom: '1px solid rgba(0,0,0,0.1)',
      backgroundColor: '#FFFFFF',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      {/* Brand Logo */}
      <Link href="/" style={{ 
        color: '#A3821A', // Luxury Gold
        fontWeight: '900', 
        textDecoration: 'none', 
        fontSize: '1.2rem',
        letterSpacing: '2px'
      }}>
        SPIRIT SOURCE
      </Link>

      {/* Navigation Links */}
      <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
        <Link href="/products" style={{ color: '#121212', textDecoration: 'none', fontSize: '0.9rem' }}>
          COLLECTION
        </Link>
        
        <Link href="/cart" style={{ color: '#121212', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 'bold' }}>
          BAG ({cartCount})
        </Link>

        {/* User Auth Section - Shows Sign In or Sign Out depending on state */}
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ fontSize: '0.8rem', color: '#121212', opacity: 0.6 }}>
              {user.email?.split('@')[0]}
            </span>
            <button 
              onClick={() => signOut()} 
              style={{ 
                background: 'none', 
                border: '1px solid #121212', 
                color: '#121212', 
                padding: '5px 12px',
                borderRadius: '4px',
                cursor: 'pointer', 
                fontSize: '0.8rem' 
              }}
            >
              SIGN OUT
            </button>
          </div>
        ) : (
          <Link href="/login" style={{ color: '#A3821A', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 'bold' }}>
            SIGN IN
          </Link>
        )}
      </div>
    </nav>
  );
}