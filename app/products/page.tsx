"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image_url: string;
}

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from('products')
        .select('*');

      if (error) {
        console.error('Error fetching products:', error);
      } else {
        setProducts(data || []);
      }
      setLoading(false);
    }

    fetchProducts();
  }, []);

  return (
    <div style={{ backgroundColor: 'var(--brand-dark)', minHeight: '100vh', padding: '60px 20px' }}>
      <h1 style={{ color: 'var(--brand-gold)', textAlign: 'center', fontSize: '3rem', marginBottom: '40px' }}>
        OUR COLLECTION
      </h1>

      {loading ? (
        <p style={{ color: 'var(--brand-cream)', textAlign: 'center' }}>Loading fine spirits...</p>
      ) : (
        <div style={{ 
          maxWidth: '1200px', margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' 
        }}>
          {products.map((product) => (
            <div key={product.id} style={{
              border: '1px solid rgba(250, 177, 47, 0.2)',
              padding: '20px',
              backgroundColor: '#111',
              textAlign: 'center'
            }}>
              {/* Image Placeholder if you don't have URLs yet */}
              <div style={{ 
                height: '200px', backgroundColor: '#000', marginBottom: '15px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--brand-orange)', fontSize: '0.8rem'
              }}>
                {product.image_url ? <img src={product.image_url} alt={product.name} style={{maxHeight: '100%'}} /> : "[ IMAGE ]"}
              </div>

              <h2 style={{ color: 'var(--brand-cream)', fontSize: '1.2rem', marginBottom: '5px' }}>{product.name}</h2>
              <p style={{ color: 'var(--brand-gold)', fontWeight: 'bold', marginBottom: '15px' }}>${product.price}</p>
              <p style={{ color: 'rgba(254, 243, 226, 0.5)', fontSize: '0.8rem', textTransform: 'uppercase' }}>{product.category}</p>
              
              <button style={{
                marginTop: '20px', width: '100%', padding: '12px',
                backgroundColor: 'var(--brand-orange)', color: 'black',
                fontWeight: 'bold', border: 'none', cursor: 'pointer'
              }}>
                ADD TO CART
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}