"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '../../../lib/supabase';
import { useCart } from '../../../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    async function getData() {
      const { data } = await supabase.from('products').select('*').eq('id', id).single();
      if (data) setProduct(data);
    }
    getData();
  }, [id]);

  if (!product) return <div style={{ padding: '100px', textAlign: 'center', color: 'var(--gold)' }}>LOADING ASSET...</div>;

  return (
    <main style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '80px' }}>
        
        {/* Bottle Image */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img 
            src={product.image_url} 
            alt={product.name} 
            style={{ width: '100%', maxHeight: '600px', objectFit: 'contain', filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.3))' }} 
          />
        </div>

        {/* Info */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <p style={{ color: 'var(--gold)', letterSpacing: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>{product.category.toUpperCase()}</p>
          <h1 style={{ fontSize: '3.5rem', margin: '10px 0', fontWeight: '900', color: 'var(--text-main)' }}>{product.name}</h1>
          <p style={{ fontSize: '2.5rem', fontWeight: '300', marginBottom: '40px' }}>${product.price}</p>
          
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '30px', marginBottom: '50px' }}>
            <p style={{ opacity: 0.7, lineHeight: '1.8' }}>
              A masterwork of distillation, this {product.name} represents the absolute pinnacle of our {product.category} collection. 
              Each bottle is hand-inspected for quality and provenance.
            </p>
          </div>

          <button onClick={() => addToCart(product)} className="btn-gold" style={{ width: '100%', padding: '20px' }}>
            SECURE BOTTLE
          </button>
        </div>
      </div>
    </main>
  );
}