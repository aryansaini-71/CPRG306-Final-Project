"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '../../../lib/supabase';
import Link from 'next/link';
import { useCart } from '../../context/cart-context';

export default function ProductDetail() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [buttonClicked, setButtonClicked] = useState(false);

  useEffect(() => {
    async function fetchProductData() {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error("Error fetching bottle:", error.message);
        setLoading(false);
      } else {
        setProduct(data);
        setLoading(false);
      }
    }

    if (id) {
      fetchProductData();
    }
  }, [id]);

  if (loading) {
    return (
      <div style={{ backgroundColor: '#0D0D0D', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#FAB12F', fontSize: '1.2rem', letterSpacing: '2px' }}>UNCAORKING DETAILS...</p>
      </div>
    );
  }

  // Error state
  if (!product) {
    return (
      <div style={{ backgroundColor: '#0D0D0D', minHeight: '100vh', textAlign: 'center', padding: '100px' }}>
        <h2 style={{ color: '#FA4032' }}>BOTTLE NOT FOUND</h2>
        <Link href="/products" style={{ color: '#FEF3E2', textDecoration: 'underline' }}>Return to Shop</Link>
      </div>
    );
  }

  return (
    <main style={{ backgroundColor: '#0D0D0D', minHeight: '90vh', padding: '60px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Back Button */}
        <button 
          onClick={() => router.back()}
          style={{ background: 'none', border: 'none', color: '#FEF3E2', cursor: 'pointer', marginBottom: '30px', opacity: 0.6 }}
        >
          ← BACK TO COLLECTION
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '60px', alignItems: 'start' }}>
          
          <div style={{ 
            backgroundColor: '#111', 
            border: '1px solid rgba(250, 177, 47, 0.1)', 
            padding: '40px',
            display: 'flex',
            justifyContent: 'center',
            borderRadius: '4px'
          }}>
            <img 
              src={product.image_url} 
              alt={product.name} 
              style={{ width: '100%', maxHeight: '550px', objectFit: 'contain' }} 
            />
          </div>

          <div style={{ padding: '20px 0' }}>
            <span style={{ color: '#FA812F', letterSpacing: '4px', textTransform: 'uppercase', fontSize: '0.85rem' }}>
              {product.category}
            </span>
            
            <h1 style={{ color: '#FAB12F', fontSize: '3.5rem', fontWeight: '800', margin: '15px 0' }}>
              {product.name}
            </h1>

            <p style={{ color: '#FEF3E2', fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '40px' }}>
              ${product.price}
            </p>

            <div style={{ borderTop: '1px solid #222', paddingTop: '30px' }}>
              <h3 style={{ color: '#FEF3E2', marginBottom: '15px', fontSize: '1rem' }}>DESCRIPTION</h3>
              <p style={{ color: 'rgba(254, 243, 226, 0.7)', lineHeight: '1.8', fontSize: '1.05rem' }}>
                This {product.name} is a cornerstone of our {product.category} collection. 
                Sourced from the finest distilleries and vineyards, it offers a profile 
                that is both sophisticated and approachable. Perfect for collectors 
                and enthusiasts alike.
              </p>
            </div>

            {/* CTA Button */}
            <button 
              onClick={() => {
                addToCart({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  image_url: product.image_url
                });
                setButtonClicked(true);
                setTimeout(() => setButtonClicked(false), 1500); // Revert after 1.5 seconds
              }}
              style={{
                width: '100%',
                marginTop: '50px',
                padding: '20px',
                backgroundColor: buttonClicked ? '#4CAF50' : '#FAB12F',
                color: buttonClicked ? 'white' : '#000',
                fontWeight: 'bold',
                fontSize: '1rem',
                letterSpacing: '2px',
                border: 'none',
                cursor: 'pointer',
                borderRadius: '2px',
                transition: 'all 0.3s ease'
              }}
            >
              {buttonClicked ? 'ADDED TO CART!' : 'ADD TO CART'}
            </button>
            
            <p style={{ textAlign: 'center', color: '#666', fontSize: '0.75rem', marginTop: '15px' }}>
              *Must be 21+ to purchase. Verification required at checkout.
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}