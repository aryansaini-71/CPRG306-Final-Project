"use client";
import React from 'react';
import Link from 'next/link';
import { useCart } from '../context/cart-context';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getTotal, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <main style={{ backgroundColor: 'var(--brand-dark)', minHeight: '100vh', padding: '40px 20px', color: 'var(--brand-cream)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ color: 'var(--brand-gold)', fontSize: '3rem', marginBottom: '40px' }}>YOUR CART</h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>Your cart is empty.</p>
          <Link href="/products" style={{ color: 'var(--brand-gold)', textDecoration: 'none', fontSize: '1.2rem', fontWeight: 'bold' }}>
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main style={{ backgroundColor: 'var(--brand-dark)', minHeight: '100vh', padding: '40px 20px', color: 'var(--brand-cream)' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ color: 'var(--brand-gold)', fontSize: '3rem', marginBottom: '40px', textAlign: 'center' }}>YOUR CART</h1>

        <div style={{ marginBottom: '30px' }}>
          {cart.map((item) => (
            <div key={item.id} style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#ffffff',
              border: '1px solid rgba(250, 177, 47, 0.1)',
              padding: '20px',
              marginBottom: '15px',
              borderRadius: '8px'
            }}>
              <img src={item.image_url} alt={item.name} style={{
                width: '80px',
                height: '80px',
                objectFit: 'contain',
                marginRight: '20px'
              }} />
              <div style={{ flex: 1 }}>
                <h3 style={{ color: 'var(--brand-cream)', marginBottom: '5px' }}>{item.name}</h3>
                <p style={{ color: 'var(--brand-gold)', fontWeight: 'bold' }}>${item.price}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  style={{
                    backgroundColor: 'var(--brand-red)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    width: '30px',
                    height: '30px',
                    cursor: 'pointer',
                    fontSize: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  -
                </button>
                <span style={{ minWidth: '30px', textAlign: 'center' }}>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  style={{
                    backgroundColor: 'var(--brand-gold)',
                    color: 'var(--brand-dark)',
                    border: 'none',
                    borderRadius: '4px',
                    width: '30px',
                    height: '30px',
                    cursor: 'pointer',
                    fontSize: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  +
                </button>
              </div>
              <div style={{ marginLeft: '20px', textAlign: 'right' }}>
                <p style={{ color: 'var(--brand-gold)', fontWeight: 'bold', marginBottom: '5px' }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{
                    backgroundColor: 'transparent',
                    color: 'var(--brand-red)',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    textDecoration: 'underline'
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div style={{
          backgroundColor: '#ffffff',
          border: '1px solid rgba(250, 177, 47, 0.1)',
          padding: '20px',
          borderRadius: '8px',
          textAlign: 'right'
        }}>
          <h2 style={{ color: 'var(--brand-cream)', marginBottom: '10px' }}>
            Total: <span style={{ color: 'var(--brand-gold)' }}>${getTotal().toFixed(2)}</span>
          </h2>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button
              onClick={clearCart}
              style={{
                backgroundColor: 'var(--brand-red)',
                color: 'black',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Clear Cart
            </button>
            <button
              style={{
                backgroundColor: 'var(--brand-gold)',
                color: 'var(--brand-dark)',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Checkout
            </button>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <Link href="/products" style={{ color: 'var(--brand-gold)', textDecoration: 'none', fontSize: '1.2rem', fontWeight: 'bold' }}>
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
}