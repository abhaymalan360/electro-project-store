"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "./CartContext";
import { ShoppingCart, Zap, Menu, X, Cpu } from "lucide-react";

export default function Navbar() {
  const { totalItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/projects#categories", label: "Categories" },
    { href: "/cart", label: "Cart" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/95 backdrop-blur-md border-b border-cyan-500/20 shadow-lg shadow-cyan-500/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center rotate-12 group-hover:rotate-0 transition-transform duration-300">
                <Cpu size={18} className="text-gray-950 -rotate-12 group-hover:rotate-0 transition-transform duration-300" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-400 rounded-full animate-pulse" />
            </div>
            <div className="hidden sm:block">
              <span className="text-cyan-400 font-bold text-lg tracking-tight font-mono">
                Electro
              </span>
              <span className="text-white font-bold text-lg tracking-tight font-mono">
                {" "}Project
              </span>
              <span className="text-orange-400 font-bold text-lg tracking-tight font-mono">
                {" "}Store
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.filter(l => l.label !== "Cart").map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-gray-300 hover:text-cyan-400 text-sm font-medium transition-colors duration-200 rounded-lg hover:bg-cyan-500/10 relative group"
              >
                {link.label}
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 group-hover:w-4/5 h-px bg-cyan-400 transition-all duration-200" />
              </Link>
            ))}
          </div>

          {/* Cart + Mobile menu */}
          <div className="flex items-center gap-3">
            <Link
              href="/cart"
              className="relative flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded-lg hover:bg-cyan-500/20 hover:border-cyan-500/60 transition-all duration-200 group"
            >
              <ShoppingCart size={18} className="group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline text-sm font-medium">Cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-orange-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-bounce">
                  {totalItems}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-cyan-400 transition-colors"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-950 border-t border-cyan-500/20 px-4 py-3 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="px-4 py-3 text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg text-sm font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
