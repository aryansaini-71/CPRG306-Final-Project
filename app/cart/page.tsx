"use client";
import React from 'react';
import { useCart } from '../../context/CartContext';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <main style={{ padding: '80px 20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: 'var(--gold)', marginBottom: '40px' }}>YOUR SELECTION</h1>
      {cart.map((item) => (
        <div key={item.id} className="premium-card" style={{ display: 'flex', padding: '20px', marginBottom: '20px', alignItems: 'center' }}>
          <img src={item.image_url} alt={item.name} style={{ width: '60px', marginRight: '20px' }} />
          <div style={{ flex: 1 }}>
            <h4 style={{ margin: 0 }}>{item.name}</h4>
            <p style={{ color: 'var(--gold)', margin: '5px 0' }}>${item.price}</p>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginRight: '30px' }}>
            <button onClick={() => updateQuantity(item.id, -1)} className="btn-gold" style={{ padding: '5px 12px', borderRadius: '4px' }}>-</button>
            <span style={{ fontWeight: 'bold' }}>{item.quantity}</span>
            <button onClick={() => updateQuantity(item.id, 1)} className="btn-gold" style={{ padding: '5px 12px', borderRadius: '4px' }}>+</button>
          </div>
          
          <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer' }}>Remove</button>
        </div>
      ))}
      <div style={{ textAlign: 'right', marginTop: '40px' }}>
        <h2>Total: ${total.toFixed(2)}</h2>
        <button className="btn-gold" style={{ padding: '15px 40px', marginTop: '20px', borderRadius: '8px' }}>CHECKOUT</button>
      </div>
    </main>
  );
}