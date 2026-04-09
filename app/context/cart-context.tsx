"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image_url: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  // We updated this so it can accept the custom quantity you send from the page
  addToCart: (product: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  notification: string | null; 
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    const savedCart = localStorage.getItem('spirit-source-cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('spirit-source-cart', JSON.stringify(cart));
  }, [cart]);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // The updated function that handles custom quantities
  const addToCart = (product: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    // If the page sends a specific quantity, use it. Otherwise, default to 1.
    const amountToAdd = product.quantity || 1;

    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      
      if (existing) {
        // If it's already in the cart, add the new amount to the current amount
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + amountToAdd }
            : item
        );
      }
      
      // If it's a new item, add it with the correct amount
      return [...prev, { ...product, quantity: amountToAdd } as CartItem];
    });
    
    showToast(`${product.name} added to bag!`);
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
    showToast("Item removed.");
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prev => prev.map(item =>
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotal,
      notification
    }}>
      {children}
      {notification && <div className="toast-notif">{notification}</div>}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}