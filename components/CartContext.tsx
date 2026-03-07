"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { Project } from "@/data/projects";

export interface CartItem {
  project: Project;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (project: Project) => void;
  removeFromCart: (projectId: number) => void;
  updateQuantity: (projectId: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  React.useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (err) {
        console.error("Failed to parse cart from localStorage", err);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  React.useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addToCart = useCallback((project: Project) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.project.id === project.id);
      if (existing) {
        return prev.map((i) =>
          i.project.id === project.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { project, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((projectId: number) => {
    setItems((prev) => prev.filter((i) => i.project.id !== projectId));
  }, []);

  const updateQuantity = useCallback((projectId: number, quantity: number) => {
    if (quantity < 1) return;
    setItems((prev) =>
      prev.map((i) => (i.project.id === projectId ? { ...i, quantity } : i))
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce(
    (sum, i) => sum + i.project.price * i.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
