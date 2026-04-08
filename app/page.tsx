"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '../lib/supabase';

export default function HomePage() {
  const [featuredWines, setFeaturedWines] = useState<any[]>([]);

  useEffect(() => {
    async function getWines() {
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('category', 'Wine')
        .limit(3);
      if (data) setFeaturedWines(data);
    }
    getWines();
  }, []);

  return (
    <main>
      {/* --- HERO SECTION --- */}
      <section style={{ 
        height: '80vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        textAlign: 'center',
        padding: '0 20px',
        background: 'radial-gradient(circle at center, #fffefe 0%, #121212 100%)'
      }}>
        <h1 style={{ color: 'var(--metallic-gold)', fontSize: '5rem', fontWeight: '900', margin: 0, letterSpacing: '4px' }}>
          SPIRIT SOURCE
        </h1>
        <p style={{ color: 'var(--warm-cream)', fontSize: '1.2rem', marginTop: '15px', opacity: 0.8, maxWidth: '600px', lineHeight: '1.6' }}>
          An architectural collection of the world's most refined spirits, curated for the modern connoisseur.
        </p>
        <Link href="/products" style={{ marginTop: '40px' }}>
          <button className="btn-gold" style={{ padding: '15px 45px' }}>Enter The Cellar</button>
        </Link>
      </section>

      {/* --- FEATURED SECTION --- */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '100px 20px' }}>
        <h2 style={{ color: 'var(--metallic-gold)', fontSize: '1.5rem', letterSpacing: '3px', textAlign: 'center', marginBottom: '60px' }}>
          FEATURED VINTAGES
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
          {featuredWines.map((wine) => (
            <Link key={wine.id} href={`/products/${wine.id}`} style={{ textDecoration: 'none' }}>
              <div className="premium-card" style={{ padding: '40px', textAlign: 'center' }}>
                <img src={wine.image_url} alt={wine.name} style={{ height: '300px', objectFit: 'contain', marginBottom: '25px' }} />
                <h3 style={{ color: 'var(--warm-cream)', fontSize: '1.2rem', marginBottom: '10px' }}>{wine.name}</h3>
                <p style={{ color: 'var(--metallic-gold)', fontWeight: 'bold', fontSize: '1.3rem' }}>${wine.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}