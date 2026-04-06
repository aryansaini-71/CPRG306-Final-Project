"use client";
import React from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';
import { useCart } from '../app/context/cart-context';

export default function Navbar() {
  const { cart } = useCart();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>SPIRIT SOURCE</div>
      
      <div className={styles.links}>
        <Link href="/">Home</Link>
        <Link href="/products">Shop</Link>
        <Link href="/cart" className={styles.cartLink}>
          Cart {cartCount > 0 && <span className={styles.cartCount}>({cartCount})</span>}
        </Link>
        <Link href="/login">Sign In</Link>
      </div>

      <Link href="/admin" className={styles.adminBtn}>
        ADMIN PANEL
      </Link>
    </nav>
  );
}