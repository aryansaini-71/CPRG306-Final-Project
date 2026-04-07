"use client";
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './Navbar.module.css';
import { useCart } from '../app/context/cart-context';
import { useAuth } from '../app/context/auth-context';

export default function Navbar() {
  const { cart } = useCart();
  const { user, signOut } = useAuth();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>SPIRIT SOURCE</div>

      <div className={styles.links}>
        <Link href="/">Home</Link>
        <Link href="/products">Shop</Link>
        <Link href="/cart" className={styles.cartLink}>
          Cart {cartCount > 0 && <span className={styles.cartCount}>({cartCount})</span>}
        </Link>
        {user ? (
          <>
            <span className={styles.userEmail}>{user.email}</span>
            <button type="button" onClick={handleSignOut} className={styles.signOutBtn}>
              Sign Out
            </button>
          </>
        ) : (
          <Link href="/login">Sign In</Link>
        )}
      </div>

      <Link href="/admin" className={styles.adminBtn}>
        ADMIN PANEL
      </Link>
    </nav>
  );
}