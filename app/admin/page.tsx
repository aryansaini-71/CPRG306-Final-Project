import React from "react";

export default function AdminDashboard() {
  // We will eventually replace these hard-coded numbers by fetching real data from Supabase
  const stats = [
    { title: "Total Revenue", value: "$4,250", label: "This Month" },
    { title: "Active Orders", value: "12", label: "Needs Shipping" },
    { title: "Total Products", value: "24", label: "In Catalog" },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Store Overview</h1>
      
      {/* Quick Stats Grid - Shows 3 boxes side-by-side on big screens */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <p className="text-sm text-gray-500 font-medium mb-1">{stat.title}</p>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
            <p className="text-xs text-[#A3821A] font-bold tracking-wider uppercase">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity Table Area */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Recent Orders</h2>
        
        {/* Placeholder for when the store has no orders yet */}
        <div className="text-center py-10 border-2 border-dashed border-gray-200 rounded-lg">
          <p className="text-gray-500">No recent orders found. The store is quiet today!</p>
        </div>
      </div>
    </div>
  );
}