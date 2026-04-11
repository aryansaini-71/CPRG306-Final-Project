"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useCart } from "@/app/context/cart-context";
import { Search, Plus, Minus, ChevronDown, Filter } from "lucide-react";

export default function ProductsPage() {
  const { addToCart } = useCart();
  
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const categories = ["All", "Hard Liquor", "Wine", "Cooler"];

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase.from('products').select('*');
      if (!error && data) {
        setProducts(data);
      }
      setLoading(false);
    }
    fetchProducts();
  }, []);

  const updateQuantity = (id: string, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta)
    }));
  };

  // --- SORTING AND FILTERING LOGIC ---
  const filteredAndSortedProducts = products
    .filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "newest") return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      return 0;
    });

  if (loading) return (
    <div className="pt-40 text-center bg-[#F4F1EA] min-h-screen">
      <div className="inline-block animate-pulse text-[#B85D19] font-black tracking-[0.5em] uppercase text-sm">
        Opening the Vault...
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#F4F1EA] pt-32 px-6 md:px-20 pb-32">
      <div className="max-w-7xl mx-auto">
        
        {/* HERO TITLE */}
        <div className="mb-16 text-center md:text-left">
          <p className="text-[10px] font-black tracking-[0.5em] text-[#B85D19] uppercase mb-4">Established Collection</p>
          <h1 className="text-6xl md:text-7xl font-black tracking-tighter text-[#2C3539] uppercase leading-none">
            The <span className="text-transparent border-text stroke-current" style={{ WebkitTextStroke: '1px #2C3539' }}>OG</span>
          </h1>
        </div>

        {/* CONTROLS INTERFACE */}
        <div className="flex flex-col gap-10 mb-20">
          
          {/* Top Row: Categories */}
          <div className="flex items-center justify-between border-b border-[#2C3539]/10 pb-6 overflow-x-auto no-scrollbar">
            <div className="flex gap-10">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`text-[11px] font-black tracking-[0.2em] uppercase transition-all whitespace-nowrap relative pb-2 ${
                    selectedCategory === category 
                      ? "text-[#B85D19]" 
                      : "text-[#2C3539]/40 hover:text-[#2C3539]"
                  }`}
                >
                  {category}
                  {selectedCategory === category && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#B85D19]" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Row: Search & Sort */}
          <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
            <div className="relative w-full md:w-96 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2C3539]/30 group-focus-within:text-[#B85D19] transition-colors" />
              <input
                type="text"
                placeholder="SEARCH BY NAME OR SPIRIT..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/50 backdrop-blur-sm border border-[#2C3539]/10 py-4 pl-12 pr-4 text-[10px] font-bold tracking-widest focus:outline-none focus:border-[#B85D19] transition-all rounded-none placeholder:text-[#2C3539]/20"
              />
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="flex items-center gap-2 text-[10px] font-black text-[#2C3539]/40 uppercase tracking-widest mr-2">
                <Filter size={12} /> Sort By
              </div>
              <div className="relative flex-1 md:flex-none">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full md:w-56 bg-white border border-[#2C3539]/10 py-4 px-6 text-[10px] font-black tracking-widest uppercase appearance-none focus:outline-none focus:border-[#B85D19] cursor-pointer rounded-none"
                >
                  <option value="newest">Recent Additions</option>
                  <option value="price-low">Value: Low to High</option>
                  <option value="price-high">Value: High to Low</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-3 h-3 text-[#2C3539]/40 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* PRODUCTS GRID */}
        {filteredAndSortedProducts.length === 0 ? (
          <div className="text-center py-40 border-2 border-dashed border-[#2C3539]/10 bg-white/30">
            <p className="text-[#2C3539]/30 tracking-[0.4em] text-[10px] uppercase font-black">
              Zero matches found in the ledger
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
            {filteredAndSortedProducts.map((product) => {
              const currentQty = quantities[product.id] || 1;

              return (
                <div key={product.id} className="group flex flex-col">
                  {/* Image Card */}
                  <Link href={`/products/${product.id}`} className="relative mb-8 block aspect-[4/5] overflow-hidden bg-white border border-[#2C3539]/5 p-12 transition-all group-hover:border-[#B85D19]/30 group-hover:shadow-2xl group-hover:shadow-[#B85D19]/5">
                    <img 
                      src={product.image_url} 
                      alt={product.name} 
                      className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-105" 
                    />
                    <div className="absolute top-6 right-6 text-[9px] font-black tracking-widest text-[#2C3539]/20 uppercase">
                      ID-{product.id.toString().padStart(4, '0')}
                    </div>
                  </Link>
                  
                  {/* Product Info */}
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <p className="text-[9px] tracking-[0.4em] text-[#B85D19] uppercase font-black mb-2">
                        {product.category}
                      </p>
                      <h2 className="text-2xl font-black tracking-tighter uppercase text-[#2C3539] group-hover:text-[#B85D19] transition-colors">
                        {product.name}
                      </h2>
                    </div>
                    <p className="text-lg font-bold text-[#2C3539]">${product.price.toFixed(2)}</p>
                  </div>

                  {/* Add to Cart Actions */}
                  <div className="flex items-center gap-2 mt-auto">
                    <div className="flex items-center border border-[#2C3539]/10 bg-white h-12">
                      <button onClick={() => updateQuantity(product.id, -1)} className="px-3 h-full hover:bg-[#F4F1EA] transition-colors"><Minus size={12}/></button>
                      <span className="w-8 text-center text-xs font-black">{currentQty}</span>
                      <button onClick={() => updateQuantity(product.id, 1)} className="px-3 h-full hover:bg-[#F4F1EA] transition-colors"><Plus size={12}/></button>
                    </div>

                    <button 
                      onClick={() => addToCart({ ...product, quantity: currentQty })}
                      className="flex-1 h-12 bg-[#2C3539] text-white text-[10px] font-black tracking-[0.2em] uppercase hover:bg-[#B85D19] transition-all border-radius-10"
                    >
                      ADD TO BAG
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}