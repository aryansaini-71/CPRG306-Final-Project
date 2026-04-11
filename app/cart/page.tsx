"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../context/cart-context';
import { Trash2, Plus, Minus, ArrowLeft, CreditCard } from 'lucide-react';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cart }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Checkout failed");
      window.location.href = data.url;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <main className="min-h-screen pt-32 px-6 flex flex-col items-center justify-center bg-[#F4F1EA]">
        <h1 className="text-5xl font-black tracking-widest text-[#B85D19] mb-6 uppercase">YOUR CART</h1>
        <p className="text-[#2C3539] tracking-widest mb-10 opacity-60">Your collection is currently empty.</p>
        <Link 
          href="/products" 
          className="px-10 py-4 border border-[#2C3539] text-[#2C3539] font-bold tracking-[0.2em] hover:bg-[#2C3539] hover:text-white transition-all uppercase text-xs"
        >
          Explore Collection
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-32 px-6 md:px-20 pb-20 bg-[#F4F1EA]">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="flex justify-between items-end mb-12 border-b border-[#2C3539]/10 pb-8">
          <div>
            <Link href="/products" className="flex items-center gap-2 text-[10px] font-black tracking-[0.3em] text-[#B85D19] uppercase mb-2 hover:opacity-70">
              <ArrowLeft className="w-3 h-3" /> Continue Shopping
            </Link>
            <h1 className="text-4xl font-black tracking-tighter text-[#2C3539] uppercase">Your Bag</h1>
          </div>
          <p className="text-xs font-bold tracking-widest text-[#2C3539]/40 uppercase">
            {cart.reduce((acc, item) => acc + item.quantity, 0)} Items
          </p>
        </div>

        {/* Error Messaging */}
        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-600 text-xs font-bold tracking-widest rounded">
            {error}
          </div>
        )}

        {/* Cart Items List */}
        <div className="space-y-4 mb-12">
          {cart.map((item) => (
            <div key={item.id} className="bg-white border border-[#2C3539]/5 p-6 flex flex-col md:flex-row items-center gap-6 group hover:shadow-xl transition-shadow">
              <div className="w-24 h-24 bg-[#F4F1EA]/50 flex items-center justify-center p-2">
                <img src={item.image_url} alt={item.name} className="max-h-full object-contain mix-blend-multiply" />
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-sm font-black tracking-widest text-[#2C3539] uppercase mb-1">{item.name}</h3>
                <p className="text-xs font-bold text-[#B85D19]">${item.price.toFixed(2)}</p>
              </div>

              <div className="flex items-center border border-[#2C3539]/10 rounded bg-[#F4F1EA]/30">
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="p-3 text-[#2C3539]/40 hover:text-[#B85D19] transition-colors"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-8 text-center text-xs font-black text-[#2C3539]">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-3 text-[#2C3539]/40 hover:text-[#B85D19] transition-colors"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>

              <div className="text-right flex md:flex-col items-center md:items-end gap-6 md:gap-1">
                <p className="font-black text-[#2C3539] text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="text-[#2C3539]/30 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Checkout */}
        <div className="bg-[#2C3539] text-white p-10 rounded shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-10">
              <span className="text-xs font-bold tracking-[0.4em] opacity-50 uppercase">Order Total</span>
              <span className="text-3xl font-black tracking-tighter">${getTotal().toFixed(2)}</span>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4">
              <button
                onClick={clearCart}
                className="flex-1 py-4 border border-white/20 text-white/60 text-[10px] font-black tracking-[0.2em] uppercase hover:bg-white/10 transition-colors"
              >
                Clear Inventory
              </button>
              <button
                onClick={handleCheckout}
                disabled={loading}
                className="flex-[2] py-4 bg-[#B85D19] text-white text-[10px] font-black tracking-[0.2em] uppercase flex items-center justify-center gap-3 hover:brightness-110 transition-all disabled:opacity-50"
              >
                <CreditCard className="w-4 h-4" />
                {loading ? 'Processing...' : 'Secure Checkout'}
              </button>
            </div>
          </div>
          {/* Decorative background text */}
          <div className="absolute -bottom-10 -right-10 text-[150px] font-black opacity-[0.03] select-none pointer-events-none">
            TOTAL
          </div>
        </div>
      </div>
    </main>
  );
}