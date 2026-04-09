"use client";
import React, { useState } from 'react';
import { supabase } from '../../lib/supabase'; // Import the bridge
import { useRouter } from 'next/navigation';

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [year, setYear] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // 1. Check Age
    const age = new Date().getFullYear() - parseInt(year);
    if (age < 21) {
      setMessage("Error: You must be 21 or older to join.");
      setLoading(false);
      return;
    }

    // 2. Call Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { birth_year: parseInt(year) }
      }
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Success! Check your email for a verification link.");
      setTimeout(() => router.push('/login'), 3000);
    }
    setLoading(false);
  };

  return (
    <div style={{ backgroundColor: 'var(--brand-dark)', minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <form onSubmit={handleSignUp} style={{ backgroundColor: '#f6f1f1', padding: '40px', border: '1px solid var(--brand-gold)', width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <h2 style={{ color: 'var(--brand-gold)', textAlign: 'center' }}>CREATE ACCOUNT</h2>
        
        <input type="email" placeholder="Email" required value={email} onChange={(e)=>setEmail(e.target.value)}
          style={{ padding: '12px', background: '#000', border: '1px solid #333', color: 'white' }} />
          
        <input type="password" placeholder="Password" required value={password} onChange={(e)=>setPassword(e.target.value)}
          style={{ padding: '12px', background: '#000', border: '1px solid #333', color: 'white' }} />

        <input type="number" placeholder="Birth Year (YYYY)" required value={year} onChange={(e)=>setYear(e.target.value)}
          style={{ padding: '12px', background: '#000', border: '1px solid #333', color: 'white' }} />

        {message && <p style={{ color: message.includes("Success") ? 'var(--brand-gold)' : 'var(--brand-red)', fontSize: '0.85rem' }}>{message}</p>}

        <button type="submit" disabled={loading} style={{ padding: '15px', background: 'var(--brand-orange)', color: 'black', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer' }}>
          {loading ? "PROCESSING..." : "SIGN UP"}
        </button>
      </form>
    </div>
  );
}