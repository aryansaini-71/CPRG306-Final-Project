"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { ArrowRight, Trophy, ShieldCheck, Globe } from "lucide-react";
import { GooeyText } from "@/components/ui/gooey-text-morphing";

export default function HomePage() {
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    async function getStats() {
      const { count } = await supabase.from('products').select('*', { count: 'exact', head: true });
      if (count) setProductCount(count);
    }
    getStats();
  }, []);

  return (
    <main className="min-h-screen bg-[#F4F1EA] flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none flex items-center justify-center">
        <h1 className="text-[30vw] font-black leading-none">EST. 2026</h1>
      </div>

      <div className="relative z-10 text-center px-6">
        <p className="text-[10px] font-black tracking-[0.5em] text-[#B85D19] uppercase mb-6">
          Premium Spirits & Rare Finds
        </p>
        
        <h1 className="text-7xl md:text-9xl font-black text-[#2C3539] tracking-tighter uppercase leading-[0.85] mb-6">
          The <br /> 
          
          {/* ---  CUSTOM GOOEY COMPONENT --- */}
          <div className="h-[1.2em] flex items-center justify-center -my-2 relative z-20">
            <GooeyText 
              texts={["Spirit", "Vodka", "Wine", "Liquor"]} 
              morphTime={1.2} 
              cooldownTime={1.5} 
              textClassName="text-[#B85D19]" 
            />
          </div>
          
          Source
        </h1>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-8">
          <Link 
            href="/products" 
            className="group px-12 py-5 bg-[#2C3539] text-white text-[10px] font-black tracking-[0.3em] uppercase transition-all hover:bg-[#B85D19]"
          >
            Enter the Vault
          </Link>
          <Link href="/profile" className="text-[10px] font-black tracking-[0.3em] uppercase text-[#2C3539]/40 hover:text-[#2C3539] transition-colors">
            My Order History
          </Link>
        </div>
      </div>

      {/* Bottom Insights */}
      <div className="absolute bottom-12 left-0 w-full px-10">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-8 border-t border-[#2C3539]/10 pt-10">
          <div className="flex items-center gap-4">
            <Trophy size={16} className="text-[#B85D19]" />
            <span className="text-[10px] font-black text-[#2C3539] uppercase tracking-widest">{productCount}+ Spirits</span>
          </div>
          <div className="flex items-center gap-4">
            <ShieldCheck size={16} className="text-[#2A4B41]" />
            <span className="text-[10px] font-black text-[#2C3539] uppercase tracking-widest">Secure Ledger</span>
          </div>
        </div>
      </div>
    </main>
  );
}