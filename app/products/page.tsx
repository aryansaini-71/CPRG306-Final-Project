"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '../../lib/supabase';
import { useCart } from '../context/cart-context';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image_url: string;
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const { addToCart } = useCart();

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('products').select('*');
      if (data) setProducts(data);
    }
    load();
  }, []);

  return (
    <main style={{ padding: '50px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
        {products.map((p) => {
          const inCart = cart.find(item => item.id === p.id);
          
          return (
            <div key={p.id} className="premium-card" style={{ padding: '25px', textAlign: 'center' }}>
              <Link href={`/products/${p.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <img src={p.image_url} alt={p.name} style={{ height: '200px', objectFit: 'contain', marginBottom: '15px' }} />
                <h3 style={{ fontSize: '1.1rem', margin: '10px 0', color: 'var(--text-main)' }}>{p.name}</h3>
              </Link>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                <span style={{ fontWeight: 'bold', color: 'var(--gold)' }}>${p.price}</span>

                {/* EXPANDING BUTTON LOGIC */}
                {!inCart ? (
                  <button 
                    onClick={() => addToCart(p)}
                    className="btn-gold" 
                    style={{ width: '40px', height: '40px', borderRadius: '50%', padding: 0 }}
                  >
                    +
                  </button>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', background: 'var(--gold)', borderRadius: '25px', padding: '5px' }}>
                    <button onClick={() => updateQuantity(p.id, -1)} style={{ background: 'none', border: 'none', color: 'white', fontWeight: 'bold', padding: '0 10px', cursor: 'pointer' }}>-</button>
                    <span style={{ color: 'white', fontWeight: 'bold', minWidth: '20px' }}>{inCart.quantity}</span>
                    <button onClick={() => updateQuantity(p.id, 1)} style={{ background: 'none', border: 'none', color: 'white', fontWeight: 'bold', padding: '0 10px', cursor: 'pointer' }}>+</button>
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