"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { 
  TrendingUp, Package, ShoppingBag, 
  Settings, ArrowUpRight, Plus, 
  ExternalLink, LogOut 
} from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    revenue: 0,
    orders: 0,
    products: 0
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [isStoreOpen, setIsStoreOpen] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      // Fetch Total Products
      const { count: productCount } = await supabase.from('products').select('*', { count: 'exact', head: true });
      
      // Fetch Orders & Revenue
      const { data: orders } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
      
      if (orders) {
        const totalRev = orders.reduce((acc, curr) => acc + curr.total_amount, 0);
        setStats({
          revenue: totalRev,
          orders: orders.length,
          products: productCount || 0
        });
        setRecentOrders(orders.slice(0, 5)); // Just the last 5
      }
    }
    fetchDashboardData();
  }, []);

  return (
    <main className="min-h-screen bg-[#F4F1EA] pt-24 px-6 md:px-12 pb-20">
      <div className="max-w-7xl mx-auto">
        
        {/* TOP BAR: Header & Global Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-black tracking-tighter text-[#2C3539] uppercase">Vault Control</h1>
            <p className="text-[#2C3539]/50 text-[10px] font-black tracking-widest uppercase mt-2">Master Administrator Dashboard</p>
          </div>
          
          <div className="flex items-center gap-4">
             {/* Admin Feature 1: Store Maintenance Toggle */}
            <div className="flex items-center gap-3 bg-white border border-[#2C3539]/10 px-4 py-2">
              <span className="text-[9px] font-black tracking-widest text-[#2C3539] uppercase">Store Online</span>
              <button 
                onClick={() => setIsStoreOpen(!isStoreOpen)}
                className={`w-10 h-5 rounded-full relative transition-colors ${isStoreOpen ? 'bg-[#2A4B41]' : 'bg-red-900'}`}
              >
                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${isStoreOpen ? 'left-6' : 'left-1'}`} />
              </button>
            </div>
            
            <Link href="/" className="p-3 bg-white border border-[#2C3539]/10 text-[#2C3539] hover:text-[#B85D19] transition-colors">
              <ExternalLink size={18} />
            </Link>
          </div>
        </div>

        {/* INSIGHT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white border border-[#2C3539]/5 p-8 relative overflow-hidden group">
            <TrendingUp className="absolute -right-4 -bottom-4 w-32 h-32 text-[#B85D19]/5 group-hover:text-[#B85D19]/10 transition-colors" />
            <p className="text-[10px] font-black tracking-[0.3em] text-[#B85D19] uppercase mb-4">Gross Revenue</p>
            <h2 className="text-4xl font-black text-[#2C3539]">${stats.revenue.toLocaleString()}</h2>
            <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-[#2A4B41]">
              <ArrowUpRight size={14} /> +12.5% from last month
            </div>
          </div>

          <div className="bg-[#2C3539] border border-white/5 p-8 relative overflow-hidden group">
            <ShoppingBag className="absolute -right-4 -bottom-4 w-32 h-32 text-white/5" />
            <p className="text-[10px] font-black tracking-[0.3em] text-[#B85D19] uppercase mb-4">Total Orders</p>
            <h2 className="text-4xl font-black text-white">{stats.orders}</h2>
            <p className="mt-4 text-[10px] font-bold text-white/40 uppercase tracking-widest">Processed through Stripe</p>
          </div>

          <div className="bg-white border border-[#2C3539]/5 p-8 relative overflow-hidden group">
            <Package className="absolute -right-4 -bottom-4 w-32 h-32 text-[#2C3539]/5" />
            <p className="text-[10px] font-black tracking-[0.3em] text-[#B85D19] uppercase mb-4">Active Inventory</p>
            <h2 className="text-4xl font-black text-[#2C3539]">{stats.products}</h2>
            <Link href="/admin/products" className="mt-4 inline-flex items-center gap-2 text-[10px] font-bold text-[#B85D19] hover:opacity-70 transition-opacity uppercase tracking-widest">
              Manage Products <Plus size={12} />
            </Link>
          </div>
        </div>

        {/* BOTTOM SECTION: Orders & Category Feature */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Integrated Orders View (Feature 2) */}
          <div className="lg:col-span-8 bg-white border border-[#2C3539]/5">
            <div className="p-6 border-b border-[#2C3539]/5 flex justify-between items-center">
              <h3 className="text-sm font-black tracking-widest uppercase text-[#2C3539]">Recent Ledger Entries</h3>
              <span className="text-[9px] font-bold text-[#B85D19] uppercase tracking-widest">Last 5 Transactions</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <tbody className="divide-y divide-[#2C3539]/5">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-[#F4F1EA]/30 transition-colors">
                      <td className="p-6">
                        <p className="text-[10px] font-bold text-[#2C3539] uppercase tracking-tighter truncate w-32">ID: {order.id.slice(0,8)}...</p>
                        <p className="text-[9px] text-[#2C3539]/40 mt-1 uppercase font-black">{new Date(order.created_at).toLocaleDateString()}</p>
                      </td>
                      <td className="p-6">
                        <p className="text-[10px] font-black text-[#2C3539] uppercase">{order.customer_email}</p>
                        <p className="text-[9px] text-[#2C3539]/40 mt-1 uppercase font-bold">{order.items?.length || 0} items</p>
                      </td>
                      <td className="p-6 text-right">
                        <p className="text-xs font-black text-[#B85D19]">${order.total_amount.toFixed(2)}</p>
                        <span className="text-[8px] font-black tracking-[0.2em] bg-[#2A4B41]/10 text-[#2A4B41] px-2 py-0.5 uppercase">PAID</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions & Maintenance */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#2C3539] p-8 text-white">
              <h3 className="text-xs font-black tracking-[0.2em] uppercase mb-6 text-[#B85D19]">Quick Actions</h3>
              <div className="space-y-3">
                <Link href="/admin/products" className="flex items-center justify-between group p-4 border border-white/10 hover:border-[#B85D19] transition-all">
                  <span className="text-[10px] font-black tracking-widest uppercase">Add New Spirit</span>
                  <Plus size={14} className="group-hover:text-[#B85D19]" />
                </Link>
                <button className="w-full flex items-center justify-between group p-4 border border-white/10 hover:border-[#B85D19] transition-all">
                  <span className="text-[10px] font-black tracking-widest uppercase">Generate Revenue Report</span>
                  <Settings size={14} className="group-hover:text-[#B85D19]" />
                </button>
              </div>
            </div>

            <div className="bg-white border border-[#2C3539]/10 p-8">
              <h3 className="text-[10px] font-black tracking-[0.2em] uppercase mb-4 text-[#2C3539]/40">System Status</h3>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#2A4B41] animate-pulse" />
                <span className="text-[10px] font-black tracking-widest text-[#2C3539] uppercase">Database Connected</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}