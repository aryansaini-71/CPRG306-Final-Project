import React from "react";
import Link from "next/link";
import { LayoutDashboard, Package, ShoppingCart, LogOut } from "lucide-react";
import { AdminGuard } from "./AdminGuard"; // Import the bouncer

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    // We wrap the ENTIRE layout inside the AdminGuard
    <AdminGuard>
      <div className="flex min-h-screen bg-gray-50 text-gray-900">
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col fixed h-screen">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-black tracking-widest text-[#A3821A]">
              ADMIN PORTAL
            </h2>
          </div>
          
          <nav className="flex-1 p-4 space-y-2">
            <Link href="/admin" className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-100 transition-colors font-medium">
              <LayoutDashboard size={20} className="text-gray-500" />
              Dashboard
            </Link>
            <Link href="/admin/products" className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-100 transition-colors font-medium">
              <Package size={20} className="text-gray-500" />
              Manage Products
            </Link>
            <Link href="/admin/orders" className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-100 transition-colors font-medium">
              <ShoppingCart size={20} className="text-gray-500" />
              View Orders
            </Link>
          </nav>

          <div className="p-4 border-t border-gray-200">
            <Link href="/" className="flex items-center gap-3 p-3 text-red-600 hover:bg-red-50 rounded-md transition-colors font-medium">
              <LogOut size={20} />
              Exit to Store
            </Link>
          </div>
        </aside>

        <main className="flex-1 p-8 ml-64">
          {children}
        </main>
      </div>
    </AdminGuard>
  );
}