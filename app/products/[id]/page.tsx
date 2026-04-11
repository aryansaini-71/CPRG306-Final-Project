"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useCart } from "@/app/context/cart-context";
import { ArrowLeft, Plus, Minus } from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams();
  const { id } = params;
  
  const { addToCart } = useCart();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addedToBag, setAddedToBag] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      // Fetch the single product that matches the ID in the URL
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (!error && data) {
        setProduct(data);
      }
      setLoading(false);
    }
    if (id) fetchProduct();
  }, [id]);

  const handleAddToBag = () => {
    addToCart({ ...product, quantity });
    
    // Show visual feedback that it worked!
    setAddedToBag(true);
    setTimeout(() => setAddedToBag(false), 2000);
  };

  if (loading) return <div className="min-h-screen pt-40 text-center tracking-widest uppercase opacity-50 font-bold bg-[#F9F9F7]">Retrieving from Vault...</div>;
  if (!product) return <div className="min-h-screen pt-40 text-center tracking-widest uppercase bg-[#F9F9F7]">Product Not Found</div>;

  return (
    <main className="min-h-screen bg-[#F9F9F7] pt-24 px-6 md:px-20 pb-20">
      <div className="max-w-6xl mx-auto">
        
        {/* Back Button */}
        <Link href="/products" className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-black/50 hover:text-black transition-colors mb-10">
          <ArrowLeft className="w-4 h-4" />
          Back to Collection
        </Link>

        {/* Product Split Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Big Image */}
          <div className="aspect-[3/4] bg-white border border-black/5 p-10 flex items-center justify-center relative">
            {product.image_url ? (
              <img src={product.image_url} alt={product.name} className="w-full h-full object-contain" />
            ) : (
              <span className="text-black/10 font-bold tracking-widest uppercase">No Image</span>
            )}
          </div>

          {/* Right Side: Details & Actions */}
          <div className="flex flex-col">
            <p className="text-xs tracking-[0.3em] text-[#A3821A] uppercase font-bold mb-4">
              {product.category || "Premium Spirit"}
            </p>
            <h1 className="text-4xl md:text-5xl font-black tracking-widest uppercase mb-4 leading-tight">
              {product.name}
            </h1>
            <p className="text-2xl text-[#121212] font-medium mb-8">
              ${product.price.toFixed(2)}
            </p>
            
            <div className="h-px w-full bg-black/10 mb-8"></div>
            
            <p className="text-black/70 leading-relaxed mb-10">
              {product.description}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              {/* Quantity Selector */}
              <div className="flex items-center border border-black/20 w-full sm:w-auto h-14">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 h-full text-black/60 hover:text-black hover:bg-black/5 transition-colors">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-bold">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-4 h-full text-black/60 hover:text-black hover:bg-black/5 transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Bag Button with visual feedback */}
              <button 
                onClick={handleAddToBag}
                className={`h-14 flex-1 w-full text-xs font-black tracking-[0.2em] uppercase transition-all ${
                  addedToBag 
                    ? "bg-[#A3821A] border-[#A3821A] text-white" 
                    : "bg-[#121212] border-[#121212] text-white hover:bg-[#A3821A] hover:border-[#A3821A]"
                }`}
              >
                {addedToBag ? "ADDED TO BAG ✓" : "ADD TO BAG"}
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </main>
  );
}