"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/app/context/auth-context";
import { Package, Calendar, DollarSign, ChevronRight } from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      if (user) {
        const { data, error } = await supabase
          .from("orders")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (!error && data) {
          setOrders(data);
        }
        setLoading(false);
      }
    }
    fetchOrders();
  }, [user]);

  if (!user) {
    return (
      <main className="min-h-screen pt-40 text-center bg-[#F4F1EA]">
        <p className="tracking-widest uppercase opacity-50">Please log in to view your vault.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F4F1EA] pt-32 px-6 md:px-20 pb-20">
      <div className="max-w-4xl mx-auto">
        
        {/* User Header Section */}
        <div className="bg-white border border-[#2C3539]/10 p-10 mb-12 flex flex-col md:flex-row items-center gap-8">
          <div className="w-24 h-24 bg-[#B85D19] rounded-full flex items-center justify-center text-white text-3xl font-black">
            {user.email?.[0].toUpperCase()}
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-black tracking-tighter text-[#2C3539] uppercase mb-1">
              Member Vault
            </h1>
            <p className="text-[#2C3539]/60 font-medium">{user.email}</p>
            <div className="mt-4 flex gap-4 justify-center md:justify-start">
              <span className="text-[10px] font-black tracking-widest uppercase bg-[#2A4B41]/10 text-[#2A4B41] px-3 py-1 rounded">
                Verified Collector
              </span>
            </div>
          </div>
        </div>

        <h2 className="text-xl font-black tracking-widest text-[#2C3539] uppercase mb-8 flex items-center gap-3">
          <Package className="text-[#B85D19]" size={20} />
          Order History
        </h2>

        {loading ? (
          <div className="text-center py-20 tracking-widest opacity-50">SCANNING LEDGER...</div>
        ) : orders.length === 0 ? (
          <div className="bg-white border border-dashed border-[#2C3539]/20 p-20 text-center rounded">
            <p className="text-[#2C3539]/40 tracking-widest uppercase text-sm mb-6">No history found in the vault.</p>
            <a href="/products" className="text-xs font-black tracking-widest text-[#B85D19] border-b-2 border-[#B85D19] pb-1">
              START YOUR COLLECTION
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white border border-[#2C3539]/5 overflow-hidden group hover:shadow-lg transition-all">
                {/* Order Header */}
                <div className="bg-[#2C3539]/5 p-4 flex flex-wrap justify-between items-center gap-4 border-b border-[#2C3539]/5">
                  <div className="flex items-center gap-6">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-[#2C3539]/40 uppercase tracking-widest">Date</span>
                      <span className="text-xs font-bold text-[#2C3539]">
                        {new Date(order.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-[#2C3539]/40 uppercase tracking-widest">Total</span>
                      <span className="text-xs font-bold text-[#B85D19]">
                        ${order.total_amount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <span className="text-[9px] font-black tracking-[0.2em] bg-[#2A4B41] text-white px-3 py-1 uppercase">
                    {order.status}
                  </span>
                </div>

                {/* Items in this order */}
                <div className="p-6">
                  <div className="divide-y divide-[#2C3539]/5">
                    {order.items.map((item: any, idx: number) => (
                      <div key={idx} className="py-3 flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-[#F4F1EA] flex items-center justify-center p-1">
                            <img src={item.image_url} alt="" className="max-h-full mix-blend-multiply" />
                          </div>
                          <div>
                            <p className="text-xs font-black text-[#2C3539] uppercase">{item.name}</p>
                            <p className="text-[10px] text-[#2C3539]/50 font-bold">QTY: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="text-xs font-bold text-[#2C3539]/80">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}