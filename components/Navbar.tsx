"use client";
import Link from 'next/link';
import { useCart } from '../context/CartContext';

export default function Navbar({ toggleTheme, currentTheme }: any) {
  const { cart } = useCart();
  const count = cart.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <nav style={{ 
      display: 'flex', justifyContent: 'space-between', padding: '15px 50px',
      alignItems: 'center', borderBottom: '1px solid var(--border)', position: 'sticky', top: '0'
    }}>
      <Link href="/">
        <img src="/images/logo.png" className="logo-img" alt="Spirit Source" style={{ height: '40px' }} />
      </Link>

      <div style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
        <Link href="/products" style={{ color: 'var(--text-main)', textDecoration: 'none' }}>SHOP</Link>
        <Link href="/cart" style={{ color: 'var(--text-main)', textDecoration: 'none', fontWeight: 'bold' }}>
          BAG ({count})
        </Link>
        <button onClick={toggleTheme} style={{ 
          background: 'var(--gold)', color: 'white', border: 'none', 
          padding: '8px 15px', borderRadius: '20px', cursor: 'pointer', fontSize: '0.7rem' 
        }}>
          {currentTheme === 'dark' ? 'LIGHT MODE' : 'DARK MODE'}
        </button>
      </div>
    </nav>
  );
}