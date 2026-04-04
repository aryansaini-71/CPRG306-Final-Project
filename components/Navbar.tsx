// components/Navbar.tsx
import React from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>SPIRIT SOURCE</div>
      
      <div className={styles.links}>
        <Link href="/">Home</Link>
        <Link href="/products">Shop</Link>
        <Link href="/cart">Cart</Link>
      </div>

      <Link href="/admin" className={styles.adminBtn}>
        ADMIN PANEL
        // Inside your Navbar links div
            <div className={styles.links}>
            <Link href="/">Home</Link>
            <Link href="/products">Shop</Link>
            <Link href="/login">Sign In</Link> 
            </div>
      </Link>
    </nav>
  );
}