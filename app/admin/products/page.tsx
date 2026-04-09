"use client";

import React, { useState } from "react";
import { Plus, Upload } from "lucide-react";
import { supabase } from "@/lib/supabase"; // Ensure this path is correct for your setup

export default function AdminProducts() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Wine"); // Default category
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let publicImageUrl = "";

      // 1. Handle Image Upload first (if a file was selected)
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `product-images/${fileName}`;

        // Upload to the "liquor-images" bucket
        const { error: uploadError } = await supabase.storage
          .from('liquor-images')
          .upload(filePath, imageFile);

        if (uploadError) throw uploadError;

        // Get the public URL for the file we just uploaded
        const { data } = supabase.storage.from('liquor-images').getPublicUrl(filePath);
        publicImageUrl = data.publicUrl;
      }

      // 2. Save everything to the Database
      const { error: dbError } = await supabase
        .from('products')
        .insert([
          { 
            name, 
            price: parseFloat(price), 
            description, 
            category, 
            image_url: publicImageUrl 
          }
        ]);

      if (dbError) throw dbError;

      alert("Product added successfully!");
      
      // Clear form
      setName("");
      setPrice("");
      setDescription("");
      setImageFile(null);

    } catch (error: any) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Inventory Management</h1>

      <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
        <form onSubmit={handleAddProduct} className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="flex flex-col">
              <label className="text-xs font-bold text-gray-400 uppercase mb-2">Spirit Name</label>
              <input 
                type="text" required value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-200 p-3 rounded focus:border-[#A3821A] outline-none"
                placeholder="e.g. Midnight Oak Whiskey"
              />
            </div>

            {/* Price */}
            <div className="flex flex-col">
              <label className="text-xs font-bold text-gray-400 uppercase mb-2">Price ($)</label>
              <input 
                type="number" step="0.01" required value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="border border-gray-200 p-3 rounded focus:border-[#A3821A] outline-none"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Category Selector */}
            <div className="flex flex-col">
            <label className="text-xs font-bold text-gray-400 uppercase mb-2">Category</label>
            <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border border-gray-200 p-3 rounded focus:border-[#A3821A] outline-none bg-white"
            >
                <option value="Hard Liquor">Hard Liquor</option>
                <option value="Wine">Wine</option>
                <option value="Cooler">Cooler</option>
            </select>
            </div>

          {/* Description */}
          <div className="flex flex-col">
            <label className="text-xs font-bold text-gray-400 uppercase mb-2">Description</label>
            <textarea 
              required value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-200 p-3 rounded focus:border-[#A3821A] outline-none h-24 resize-none"
            />
          </div>

          {/* Image Upload Input */}
          <div className="flex flex-col">
            <label className="text-xs font-bold text-gray-400 uppercase mb-2">Product Image</label>
            <div className="border-2 border-dashed border-gray-200 p-6 rounded-lg text-center hover:border-[#A3821A] transition-colors cursor-pointer relative">
              <input 
                type="file" 
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <Upload className="mx-auto text-gray-300 mb-2" />
              <p className="text-sm text-gray-500">
                {imageFile ? imageFile.name : "Click to upload or drag image here"}
              </p>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#121212] text-white py-4 rounded font-bold tracking-[0.2em] hover:bg-[#A3821A] transition-all disabled:opacity-50"
          >
            {loading ? "SAVING TO VAULT..." : "ADD TO COLLECTION"}
          </button>
        </form>
      </div>
    </div>
  );
}