"use client";

import React, { useState, useEffect } from "react";
import { Plus, Upload, Edit2, Trash2, X, Package, LayoutGrid, List } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function AdminProducts() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Hard Liquor");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const { data } = await supabase.from('products').select('*').order('id', { ascending: false });
    if (data) setProducts(data);
  }

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

  const handleDelete = async (id: number, name: string) => {
    if (confirm(`Remove ${name} from the vault?`)) {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (!error) {
        setProducts(products.filter(p => p.id !== id));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let finalImageUrl = products.find(p => p.id === editingId)?.image_url || "";

      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `product-images/${fileName}`;
        const { error: uploadError } = await supabase.storage.from('liquor-images').upload(filePath, imageFile);
        if (uploadError) throw uploadError;
        const { data } = supabase.storage.from('liquor-images').getPublicUrl(filePath);
        finalImageUrl = data.publicUrl;
      }

      const productData = { name, price: parseFloat(price), description, category, image_url: finalImageUrl };

      if (editingId) {
        const { error } = await supabase.from('products').update(productData).eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('products').insert([productData]);
        if (error) throw error;
      }
      cancelEdit();
      fetchProducts();
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F4F1EA] pt-24 px-4 md:px-10 pb-20">
      <div className="max-w-6xl mx-auto">
        
        {/* STATS HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-black tracking-tighter text-[#2C3539] uppercase">Vault Control</h1>
            <p className="text-[#2C3539]/50 text-xs font-bold tracking-widest uppercase mt-2">Inventory Management</p>
          </div>
          <div className="bg-[#2C3539] text-white px-6 py-3 flex items-center gap-4 rounded-sm">
            <Package size={16} className="text-[#B85D19]" />
            <span className="text-[10px] font-black tracking-widest uppercase">{products.length} Total Spirits</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* FORM COLUMN (Left/Top) */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-[#2C3539]/10 p-6 md:p-8 sticky top-28">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-sm font-black tracking-[0.2em] text-[#2C3539] uppercase">
                  {editingId ? "Modify Entry" : "New Acquisition"}
                </h2>
                {editingId && (
                  <button onClick={cancelEdit} className="text-[#B85D19] hover:text-[#2C3539]">
                    <X size={20} />
                  </button>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <input 
                  placeholder="SPIRIT NAME"
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#F4F1EA]/50 border border-[#2C3539]/10 p-4 text-[10px] font-bold tracking-widest focus:border-[#B85D19] outline-none" 
                  required 
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    type="number" 
                    placeholder="PRICE ($)" 
                    value={price} 
                    onChange={(e) => setPrice(e.target.value)}
                    className="bg-[#F4F1EA]/50 border border-[#2C3539]/10 p-4 text-[10px] font-bold tracking-widest focus:border-[#B85D19] outline-none" 
                    required 
                  />
                  <select 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)}
                    className="bg-white border border-[#2C3539]/10 p-4 text-[10px] font-black tracking-widest uppercase outline-none"
                  >
                    <option value="Hard Liquor">Hard Liquor</option>
                    <option value="Wine">Wine</option>
                    <option value="Cooler">Cooler</option>
                  </select>
                </div>

                <textarea 
                  placeholder="DESCRIPTION..."
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-[#F4F1EA]/50 border border-[#2C3539]/10 p-4 text-[10px] font-bold tracking-widest h-32 resize-none focus:border-[#B85D19] outline-none" 
                  required 
                />

                <div className="relative group border-2 border-dashed border-[#2C3539]/10 hover:border-[#B85D19] p-6 transition-colors text-center">
                  <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)} className="absolute inset-0 opacity-0 cursor-pointer" />
                  <Upload className="mx-auto text-[#2C3539]/20 mb-2" size={20} />
                  <p className="text-[9px] font-black text-[#2C3539]/40 tracking-widest uppercase">
                    {imageFile ? imageFile.name : "Upload Product Image"}
                  </p>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-[#2C3539] text-white py-5 text-[10px] font-black tracking-[0.3em] uppercase hover:bg-[#B85D19] transition-all disabled:opacity-50"
                >
                  {loading ? "Processing..." : editingId ? "Update Ledger" : "Add to Vault"}
                </button>
              </form>
            </div>
          </div>

          {/* LIST COLUMN (Right/Bottom) */}
          <div className="lg:col-span-7">
            <div className="space-y-4">
              {products.map((product) => (
                <div key={product.id} className="bg-white border border-[#2C3539]/5 p-4 flex items-center justify-between group transition-all hover:border-[#B85D19]/30">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-[#F4F1EA] p-2 flex-shrink-0">
                      <img src={product.image_url} alt="" className="w-full h-full object-contain mix-blend-multiply" />
                    </div>
                    <div>
                      <h3 className="text-xs font-black tracking-widest text-[#2C3539] uppercase">{product.name}</h3>
                      <p className="text-[9px] font-bold text-[#B85D19] tracking-widest uppercase mt-1">{product.category}</p>
                      <p className="text-[10px] font-bold text-[#2C3539]/40 mt-1">${product.price.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button onClick={() => startEdit(product)} className="p-3 text-[#2C3539]/20 hover:text-[#2C3539] transition-colors bg-[#F4F1EA]/50 rounded-sm">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDelete(product.id, product.name)} className="p-3 text-[#2C3539]/20 hover:text-red-600 transition-colors bg-[#F4F1EA]/50 rounded-sm">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}