"use client";
import React, { useState } from 'react';

export default function Home() {
  const [isVerified, setIsVerified] = useState(false);
  const [birthYear, setBirthYear] = useState("");
  const [error, setError] = useState("");

  // Logic to check age
  const handleVerify = () => {
    const currentYear = new Date().getFullYear();
    const age = currentYear - parseInt(birthYear);

    if (!birthYear || birthYear.length !== 4) {
      setError("Please enter a valid 4-digit year.");
    } else if (age >= 21) {
      setIsVerified(true);
    } else {
      setError("Access Denied: You must be 21 or older.");
      // Option: Redirect to Google if underage
      setTimeout(() => window.location.href = "https://www.google.com", 2000);
    }
  };

  // YOUR 3 CATEGORIES
  const categories = [
    { title: "Hard Liquor", desc: "Whiskey, Vodka, & Gin", color: "var(--brand-gold)" },
    { title: "Wine", desc: "Red, White, & Sparkling", color: "var(--brand-red)" },
    { title: "Coolers", desc: "Seltzers & Ready-to-Drink", color: "var(--brand-orange)" }
  ];

  return (
    <main style={{ backgroundColor: 'var(--brand-dark)', minHeight: '100vh' }}>
      
      {/* --- FEATURE: SECURITY AGE GATE --- */}
      {!isVerified && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: '#000', zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            maxWidth: '400px', width: '100%', padding: '40px',
            border: '1px solid var(--brand-gold)', textAlign: 'center',
            backgroundColor: '#0a0a0a', boxShadow: '0 0 50px rgba(250, 177, 47, 0.1)'
          }}>
            <h2 style={{ color: 'var(--brand-gold)', letterSpacing: '4px', marginBottom: '10px' }}>VERIFY AGE</h2>
            <p style={{ color: 'var(--brand-cream)', opacity: 0.6, fontSize: '0.8rem', marginBottom: '30px' }}>
              ESTABLISHING LEGAL DRINKING AGE COMPLIANCE
            </p>

            <input 
              type="number" 
              placeholder="Birth Year (YYYY)" 
              value={birthYear}
              onChange={(e) => setBirthYear(e.target.value)}
              style={{
                width: '100%', padding: '15px', marginBottom: '15px',
                backgroundColor: '#111', border: '1px solid #333', color: 'white',
                textAlign: 'center', fontSize: '1.2rem'
              }}
            />

            {error && <p style={{ color: 'var(--brand-red)', fontSize: '0.8rem', marginBottom: '15px' }}>{error}</p>}

            <button 
              onClick={handleVerify}
              style={{
                width: '100%', padding: '15px', backgroundColor: 'var(--brand-gold)',
                color: 'black', fontWeight: 'bold', border: 'none', cursor: 'pointer',
                letterSpacing: '2px'
              }}
            >
              ENTER SITE
            </button>
          </div>
        </div>
      )}

      {/* --- MAIN PAGE CONTENT (Only shows fully once verified) --- */}
      <section style={{ textAlign: 'center', padding: '120px 20px 60px' }}>
        <h1 style={{ color: 'var(--brand-gold)', fontSize: '4.5rem', fontWeight: '900' }}>SPIRIT SOURCE</h1>
        <p style={{ color: 'var(--brand-cream)', letterSpacing: '4px', opacity: 0.7 }}>PREMIUM SELECTIONS</p>
      </section>

      <section style={{ 
        maxWidth: '1100px', margin: '0 auto', padding: '20px',
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px' 
      }}>
        {categories.map((cat, i) => (
          <div key={i} style={{
            border: `1px solid rgba(254, 243, 226, 0.1)`, padding: '60px 20px',
            textAlign: 'center', backgroundColor: 'rgba(255,255,255,0.02)',
            cursor: 'pointer', transition: '0.3s'
          }}>
            <h3 style={{ color: cat.color, fontSize: '1.8rem' }}>{cat.title}</h3>
            <p style={{ color: 'var(--brand-cream)', opacity: 0.5, marginTop: '10px' }}>{cat.desc}</p>
          </div>
        ))}
      </section>
    </main>
  );
}