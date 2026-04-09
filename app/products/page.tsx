"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useCart } from "@/app/context/cart-context";
import { Search, Plus, Minus } from "lucide-react";

export default function ProductsPage() {
  // FIX: We changed 'dispatch' to 'addToCart'. 
  // (If your context uses 'addItem' instead, just change the word here and below!)
  const { addToCart } = useCart();
  
  // -- STATE VARIABLES --
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  // Your custom categories
  const categories = ["All", "Hard Liquor", "Wine", "Cooler"];

  // -- FETCH DATA FROM SUPABASE --
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

  // -- HELPER FUNCTIONS --
  
  // Safely updates the quantity for a specific product ID on the screen
  const updateQuantity = (id: string, delta: number) => {
    setQuantities((prev) => {
      const currentQty = prev[id] || 1;
      const newQty = Math.max(1, currentQty + delta); // Prevents going below 1
      return { ...prev, [id]: newQty };
    });
  };

  // Filters the products based on your search bar and category tabs
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // -- LOADING SCREEN --
  if (loading) {
    return <div className="pt-40 text-center tracking-widest uppercase opacity-50 font-bold">Opening Vault...</div>;
  }

  // -- MAIN UI --
  return (
    <main className="min-h-screen bg-[#F9F9F7] pt-32 px-6 md:px-20 pb-20">
      <div className="max-w-7xl mx-auto">
        
        <h1 className="text-4xl font-black tracking-widest text-[#121212] mb-12 uppercase">
          The Collection
        </h1>

        {/* SEARCH AND FILTER BAR */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          
          {/* Category Tabs */}
          <div className="flex gap-6 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`text-xs font-bold tracking-widest uppercase transition-colors whitespace-nowrap ${
                  selectedCategory === category 
                    ? "text-[#A3821A] border-b-2 border-[#A3821A] pb-1" 
                    : "text-black/40 hover:text-black/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="SEARCH SPIRITS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-b border-black/20 py-2 pl-8 pr-4 text-sm focus:outline-none focus:border-[#A3821A] transition-colors placeholder:tracking-widest placeholder:text-xs"
            />
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40" />
          </div>

        </div>

        {/* PRODUCTS GRID */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 text-black/50 tracking-widest text-sm uppercase">
            No items found matching your criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {filteredProducts.map((product) => {
              const currentQty = quantities[product.id] || 1;

              return (
                <div key={product.id} className="group flex flex-col">
                  
                  {/* Clickable Area for Product Details */}
                  <Link href={`/products/${product.id}`} className="block cursor-pointer">
                    <div className="aspect-[3/4] bg-white border border-black/5 overflow-hidden mb-6 relative">
                      {product.image_url ? (
                        <img 
                          src={product.image_url} 
                          alt={product.name} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-black/10 uppercase font-bold text-xs tracking-widest">
                          No Image
                        </div>
                      )}
                    </div>
                    
                    <p className="text-[10px] tracking-[0.3em] text-[#A3821A] uppercase font-bold mb-1">
                      {product.category || "Uncategorized"}
                    </p>
                    <h2 className="text-lg font-bold tracking-wide uppercase mb-1 group-hover:text-[#A3821A] transition-colors">
                      {product.name}
                    </h2>
                    <p className="text-[#121212] font-medium mb-4">
                      ${product.price.toFixed(2)}
                    </p>
                  </Link>
                  
                  {/* Add to Cart Controls */}
                  <div className="flex items-center gap-4 mt-auto">
                    
                    {/* Quantity - and + buttons */}
                    <div className="flex items-center border border-black/20 rounded">
                      <button 
                        onClick={() => updateQuantity(product.id, -1)}
                        className="p-2 text-black/60 hover:text-black transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-xs font-bold">
                        {currentQty}
                      </span>
                      <button 
                        onClick={() => updateQuantity(product.id, 1)}
                        className="p-2 text-black/60 hover:text-black transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* The Add To Bag Button */}
                    <button 
                      onClick={(e) => {
                        e.preventDefault(); 
                        e.stopPropagation();
                        
                        // FIX: Using addToCart here instead of dispatch
                        addToCart({ ...product, quantity: currentQty });
                        
                        // Visual feedback (turns black and says ADDED ✓)
                        const btn = e.currentTarget;
                        btn.innerText = "ADDED ✓";
                        btn.classList.add("bg-black", "text-white");
                        
                        setTimeout(() => {
                          btn.innerText = "ADD TO BAG";
                          btn.classList.remove("bg-black", "text-white");
                          setQuantities(prev => ({ ...prev, [product.id]: 1 }));
                        }, 1500);
                      }}
                      className="flex-1 text-[10px] font-black tracking-widest border border-[#121212] bg-transparent text-[#121212] py-3 hover:bg-[#121212] hover:text-white transition-all text-center rounded uppercase"
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