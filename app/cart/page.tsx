"use client";

import { useCart } from "@/components/CartContext";
import Link from "next/link";
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, ArrowRight, Cpu, Package } from "lucide-react";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-gray-950 text-white pt-24 pb-20 flex items-center justify-center">
        <div className="text-center px-4">
          <div className="w-24 h-24 bg-gray-900 border border-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <ShoppingCart size={36} className="text-gray-600" />
          </div>
          <h1 className="text-2xl font-black text-white mb-2">Your cart is empty</h1>
          <p className="text-gray-400 mb-8">Add some projects to get started!</p>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 text-gray-950 font-bold rounded-xl hover:bg-cyan-400 transition-all"
          >
            Browse Projects
            <ArrowRight size={16} />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 text-sm mb-4 transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Continue Shopping
          </Link>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            Shopping Cart
            <span className="ml-3 text-xl text-cyan-400 font-mono">({totalItems})</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(({ project, quantity }) => (
              <div
                key={project.id}
                className="bg-gray-900 border border-gray-800 hover:border-gray-700 rounded-2xl p-5 transition-all"
              >
                <div className="flex gap-4">
                  {/* Thumbnail */}
                  <div className={`w-20 h-20 rounded-xl flex items-center justify-center flex-shrink-0 ${project.technology === "ESP32" ? "bg-red-950/40 border border-red-500/20" : "bg-cyan-950/40 border border-cyan-500/20"}`}>
                    <Cpu size={28} className={project.technology === "ESP32" ? "text-red-400" : "text-cyan-400"} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-white font-semibold text-sm leading-snug mb-1">{project.title}</h3>
                        <p className="text-gray-500 text-xs">{project.subject}</p>
                        <span className={`inline-block mt-1.5 px-2 py-0.5 text-xs font-bold rounded-full ${project.technology === "ESP32" ? "bg-red-500/10 text-red-400" : "bg-cyan-500/10 text-cyan-400"}`}>
                          {project.technology}
                        </span>
                      </div>
                      <button
                        onClick={() => removeFromCart(project.id)}
                        className="text-gray-600 hover:text-red-400 transition-colors p-1 flex-shrink-0"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    {/* Quantity + Price row */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2 bg-gray-800 rounded-lg p-1">
                        <button
                          onClick={() => updateQuantity(project.id, quantity - 1)}
                          disabled={quantity <= 1}
                          className="w-7 h-7 rounded-md bg-gray-700 hover:bg-gray-600 disabled:opacity-30 flex items-center justify-center transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-white font-mono font-bold text-sm w-6 text-center">{quantity}</span>
                        <button
                          onClick={() => updateQuantity(project.id, quantity + 1)}
                          className="w-7 h-7 rounded-md bg-gray-700 hover:bg-gray-600 flex items-center justify-center transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <div className="text-right">
                        <span className="text-white font-bold">₹{project.price * quantity}</span>
                        {quantity > 1 && (
                          <p className="text-gray-500 text-xs">₹{project.price} × {quantity}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Clear cart */}
            <button
              onClick={clearCart}
              className="flex items-center gap-2 text-gray-500 hover:text-red-400 text-sm transition-colors"
            >
              <Trash2 size={14} />
              Clear all items
            </button>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                <Package size={18} className="text-cyan-400" />
                Order Summary
              </h2>

              <div className="space-y-3 mb-5">
                {items.map(({ project, quantity }) => (
                  <div key={project.id} className="flex items-center justify-between text-sm">
                    <span className="text-gray-400 truncate max-w-[180px]">{project.title} ×{quantity}</span>
                    <span className="text-gray-300 font-medium ml-2">₹{project.price * quantity}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-800 pt-4 space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Subtotal ({totalItems} items)</span>
                  <span className="text-white">₹{totalPrice}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Delivery</span>
                  <span className="text-green-400 font-medium">Free</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6 py-3 border-t border-b border-gray-800">
                <span className="text-white font-bold text-lg">Total</span>
                <span className="text-2xl font-black text-cyan-400">₹{totalPrice}</span>
              </div>

              <button className="w-full py-4 bg-cyan-500 text-gray-950 font-bold rounded-xl hover:bg-cyan-400 transition-all hover:scale-[1.02] shadow-lg shadow-cyan-500/20 text-sm">
                Proceed to Checkout →
              </button>

              <Link
                href="/projects"
                className="w-full flex items-center justify-center gap-2 mt-3 py-3 bg-gray-800 border border-gray-700 text-gray-300 hover:text-white rounded-xl text-sm font-medium transition-all hover:bg-gray-700"
              >
                <ArrowLeft size={15} />
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
