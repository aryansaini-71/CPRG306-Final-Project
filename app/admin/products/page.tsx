"use client";

import React, { useState, useEffect } from "react";
import { Plus, Upload, Edit2, Trash2, X } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function AdminProducts() {
  // Form State
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Hard Liquor");
  const [imageFile, setImageFile] = useState<File | null>(null);
  
  // Logic State
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Load products on start
  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const { data } = await supabase.from('products').select('*').order('id', { ascending: false });
    if (data) setProducts(data);
  }

  // PREPARE EDIT: Fills the form with existing data
  const startEdit = (product: any) => {
    setEditingId(product.id);
    setName(product.name);
    setPrice(product.price.toString());
    setDescription(product.description);
    setCategory(product.category);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setName("");
    setPrice("");
    setDescription("");
    setImageFile(null);
  };

  // DELETE LOGIC
  const handleDelete = async (id: number, name: string) => {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (!error) {
        setProducts(products.filter(p => p.id !== id));
        alert("Product removed from collection.");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let finalImageUrl = products.find(p => p.id === editingId)?.image_url || "";

      // 1. Handle New Image Upload (if selected)
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `product-images/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('liquor-images')
          .upload(filePath, imageFile);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from('liquor-images').getPublicUrl(filePath);
        finalImageUrl = data.publicUrl;
      }

      const productData = { 
        name, 
        price: parseFloat(price), 
        description, 
        category, 
        image_url: finalImageUrl 
      };

      if (editingId) {
        // UPDATE EXISTING
        const { error } = await supabase.from('products').update(productData).eq('id', editingId);
        if (error) throw error;
        alert("Product updated successfully!");
      } else {
        // INSERT NEW
        const { error } = await supabase.from('products').insert([productData]);
        if (error) throw error;
        alert("Product added to collection!");
      }

      cancelEdit();
      fetchProducts();
    } catch (error: any) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-20">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#2C3539]">Inventory Management</h1>
        {editingId && (
          <button onClick={cancelEdit} className="flex items-center gap-2 text-sm font-bold text-red-600 bg-red-50 px-4 py-2 rounded">
            <X size={16} /> CANCEL EDIT
          </button>
        )}
      </div>

      {/* --- FORM SECTION --- */}
      <div className="bg-white p-8 rounded-lg border border-[#2C3539]/10 shadow-sm mb-12">
        <h2 className="text-lg font-bold mb-6 text-[#2C3539] flex items-center gap-2">
          {editingId ? <Edit2 className="text-[#B85D19]" size={20} /> : <Plus className="text-[#B85D19]" size={20} />}
          {editingId ? `Editing: ${name}` : "Add New Item"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-xs font-bold text-[#2C3539]/50 uppercase mb-2">Spirit Name</label>
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)}
                className="border border-[#2C3539]/10 p-3 rounded focus:border-[#B85D19] outline-none bg-[#F4F1EA]/30" />
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-bold text-[#2C3539]/50 uppercase mb-2">Price ($)</label>
              <input type="number" step="0.01" required value={price} onChange={(e) => setPrice(e.target.value)}
                className="border border-[#2C3539]/10 p-3 rounded focus:border-[#B85D19] outline-none bg-[#F4F1EA]/30" />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-bold text-[#2C3539]/50 uppercase mb-2">Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}
              className="border border-[#2C3539]/10 p-3 rounded focus:border-[#B85D19] outline-none bg-white">
              <option value="Hard Liquor">Hard Liquor</option>
              <option value="Wine">Wine</option>
              <option value="Cooler">Cooler</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-bold text-[#2C3539]/50 uppercase mb-2">Description</label>
            <textarea required value={description} onChange={(e) => setDescription(e.target.value)}
              className="border border-[#2C3539]/10 p-3 rounded focus:border-[#B85D19] outline-none h-24 resize-none bg-[#F4F1EA]/30" />
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-bold text-[#2C3539]/50 uppercase mb-2">Product Image {editingId && "(Leave blank to keep current)"}</label>
            <div className="border-2 border-dashed border-[#2C3539]/10 p-6 rounded-lg text-center hover:border-[#B85D19] transition-colors relative">
              <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
                className="absolute inset-0 opacity-0 cursor-pointer" />
              <Upload className="mx-auto text-[#2C3539]/20 mb-2" />
              <p className="text-sm text-[#2C3539]/60">{imageFile ? imageFile.name : "Select new image file"}</p>
            </div>
          </div>

          <button type="submit" disabled={loading}
            className="w-full bg-[#2C3539] text-white py-4 rounded font-bold tracking-widest hover:bg-[#B85D19] transition-all disabled:opacity-50">
            {loading ? "SAVING..." : editingId ? "UPDATE PRODUCT" : "CONFIRM NEW ITEM"}
          </button>
        </form>
      </div>

      {/* --- INVENTORY LIST SECTION --- */}
      <div className="bg-white rounded-lg border border-[#2C3539]/10 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#F4F1EA] border-b border-[#2C3539]/10">
            <tr>
              <th className="p-4 text-xs font-bold uppercase tracking-wider text-[#2C3539]/50">Product</th>
              <th className="p-4 text-xs font-bold uppercase tracking-wider text-[#2C3539]/50">Category</th>
              <th className="p-4 text-xs font-bold uppercase tracking-wider text-[#2C3539]/50">Price</th>
              <th className="p-4 text-xs font-bold uppercase tracking-wider text-[#2C3539]/50 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2C3539]/5">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-[#F4F1EA]/20 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img src={product.image_url} alt="" className="w-10 h-10 rounded object-cover bg-gray-100" />
                    <span className="font-bold text-[#2C3539]">{product.name}</span>
                  </div>
                </td>
                <td className="p-4 text-sm text-[#2C3539]/70">{product.category}</td>
                <td className="p-4 font-medium text-[#B85D19]">${product.price.toFixed(2)}</td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => startEdit(product)} className="p-2 text-[#2C3539]/40 hover:text-[#B85D19] transition-colors">
                      <Edit2 size={18} />
                    </button>
                    <button onClick={() => handleDelete(product.id, product.name)} className="p-2 text-[#2C3539]/40 hover:text-red-600 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}