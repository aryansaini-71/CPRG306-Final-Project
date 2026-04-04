"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '../../lib/supabase';

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

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase.from('products').select('*');
      if (!error) {
        setProducts(data || []);
        setFilteredProducts(data || []);
      }
      setLoading(false);
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    let result = products;

    if (activeCategory !== "All") {
      result = result.filter(p => p.category === activeCategory);
    }

    if (searchTerm) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(result);
  }, [searchTerm, activeCategory, products]);

  if (loading) return <div style={{color: '#FAB12F', textAlign: 'center', padding: '100px'}}>Loading Inventory...</div>;

  return (
    <main style={{ backgroundColor: '#0D0D0D', minHeight: '100vh', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        <h1 style={{ color: '#FAB12F', textAlign: 'center', fontSize: '3rem', marginBottom: '40px' }}>OUR COLLECTION</h1>


        <div style={{ marginBottom: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          <input 
            type="text" 
            placeholder="Search for a bottle..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%', maxWidth: '600px', padding: '15px 25px',
              backgroundColor: '#111', border: '1px solid #333',
              color: 'white', borderRadius: '30px', fontSize: '1rem'
            }}
          />

          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {["All", "Hard Liquor", "Wine", "Cooler"].map((cat) => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '10px 25px', borderRadius: '20px', cursor: 'pointer',
                  backgroundColor: activeCategory === cat ? '#FAB12F' : 'transparent',
                  color: activeCategory === cat ? 'black' : '#FAB12F',
                  border: '1px solid #FAB12F', fontWeight: 'bold', transition: '0.3s'
                }}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '30px' }}>
          {filteredProducts.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
              <div style={{ backgroundColor: '#111', border: '1px solid rgba(250, 177, 47, 0.1)', padding: '20px', textAlign: 'center' }}>
                <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '15px' }}>
                  <img src={product.image_url} alt={product.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                </div>
                <h3 style={{ color: '#FEF3E2', fontSize: '1rem', height: '40px' }}>{product.name}</h3>
                <p style={{ color: '#FAB12F', fontWeight: 'bold', marginTop: '10px' }}>${product.price}</p>
              </div>
            </Link>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <p style={{ color: 'white', textAlign: 'center', marginTop: '50px' }}>No bottles match your search.</p>
        )}
      </div>
    </main>
  );
}