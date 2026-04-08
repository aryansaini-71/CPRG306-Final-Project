"use client";
import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Success! Welcome back.");
      setTimeout(() => router.push('/products'), 1500);
    }
    setLoading(false);
  };

  return (
    <div style={{ backgroundColor: 'var(--brand-dark)', minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <form onSubmit={handleSignIn} style={{ backgroundColor: '#ffffff', padding: '40px', border: '1px solid var(--brand-gold)', width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <h2 style={{ color: 'var(--brand-gold)', textAlign: 'center' }}>SIGN IN</h2>

        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: '12px', background: '#000', border: '1px solid #333', color: 'white' }}
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '12px', background: '#000', border: '1px solid #333', color: 'white' }}
        />

        {message && <p style={{ color: message.includes("Success") ? 'var(--brand-gold)' : 'var(--brand-red)', fontSize: '0.85rem' }}>{message}</p>}

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '15px',
            background: 'var(--brand-orange)',
            color: 'black',
            fontWeight: 'bold',
            cursor: loading ? 'not-allowed' : 'pointer',
            border: '1px solid black ',
            borderRadius: '8px',
          }}
        >
          {loading ? "SIGNING IN..." : "SIGN IN"}
        </button>

        <p style={{ textAlign: 'center', color: 'var(--brand-cream)', fontSize: '0.9rem' }}>
          Don't have an account?{' '}
          <Link href="/register" style={{ color: 'var(--brand-gold)', textDecoration: 'none' }}>
            Sign up here
          </Link>
        </p>
      </form>
    </div>
  );
}