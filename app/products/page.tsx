"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '../../lib/supabase';
import { useCart } from '../context/cart-context';

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  // Grab cart logic from our unified context
  const { cart, addToCart, updateQuantity } = useCart();

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase.from('products').select('*');
      if (!error && data) {
        setProducts(data);
        setFiltered(data);
      }
      setLoading(false);
    }
    fetchProducts();
  }, []);

  // Filter logic for Search and Categories
  useEffect(() => {
    let list = products;
    if (category !== "All") {
      list = list.filter(p => p.category === category);
    }
    if (search) {
      list = list.filter(p => 
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFiltered(list);
  }, [search, category, products]);

  if (loading) return (
    <div style={{ padding: '100px', textAlign: 'center', color: 'var(--gold)' }}>
      FETCHING COLLECTION...
    </div>
  );

  return (
    <main style={{ padding: '60px 20px', maxWidth: '1400px', margin: '0 auto' }}>
      
      {/* Search and Filter Header */}
      <div style={{ marginBottom: '60px', textAlign: 'center' }}>
        <input 
          type="text" 
          placeholder="SEARCH THE COLLECTION..." 
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '100%', maxWidth: '600px', padding: '18px 30px', 
            backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', 
            color: 'var(--text-main)', borderRadius: '50px', fontSize: '0.9rem', outline: 'none'
          }}
        />
        <div style={{ marginTop: '25px', display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
          {["All", "Hard Liquor", "Wine", "Cooler"].map(cat => (
            <button 
              key={cat} onClick={() => setCategory(cat)}
              style={{
                padding: '8px 20px', cursor: 'pointer', borderRadius: '20px',
                backgroundColor: category === cat ? 'var(--gold)' : 'transparent',
                color: category === cat ? 'black' : 'var(--gold)',
                border: '1px solid var(--gold)', fontWeight: 'bold', transition: '0.3s'
              }}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Product Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '40px' }}>
        {filtered.map((product) => {
          // Check if this item is already in the cart to show +/- buttons
          const cartItem = cart.find(item => item.id === product.id);

          return (
            <div key={product.id} className="premium-card" style={{ padding: '30px', textAlign: 'center' }}>
              <Link href={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ height: '240px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                  <img src={product.image_url} alt={product.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                </div>
                <h3 style={{ fontSize: '1.1rem', height: '50px', overflow: 'hidden', color: 'var(--text-main)' }}>{product.name}</h3>
              </Link>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '25px' }}>
                <span style={{ color: 'var(--gold)', fontWeight: 'bold', fontSize: '1.3rem' }}>${product.price}</span>

                {/* SMART BUTTON: Expands to +/- if in cart */}
                {!cartItem ? (
                  <button 
                    onClick={() => addToCart(product)}
                    className="btn-gold" 
                    style={{ width: '45px', height: '45px', borderRadius: '50%', padding: 0, fontSize: '1.5rem' }}
                  >
                    +
                  </button>
                ) : (
                  <div style={{ 
                    display: 'flex', alignItems: 'center', backgroundColor: 'var(--gold)', 
                    borderRadius: '25px', padding: '5px' 
                  }}>
                    <button 
                      onClick={() => updateQuantity(product.id, cartItem.quantity - 1)}
                      style={{ background: 'none', border: 'none', color: 'black', fontWeight: 'bold', padding: '0 12px', cursor: 'pointer' }}
                    >
                      -
                    </button>
                    <span style={{ color: 'black', fontWeight: 'bold', minWidth: '20px' }}>{cartItem.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(product.id, cartItem.quantity + 1)}
                      style={{ background: 'none', border: 'none', color: 'black', fontWeight: 'bold', padding: '0 12px', cursor: 'pointer' }}
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}