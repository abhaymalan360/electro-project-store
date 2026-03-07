"use client";

import React, { createContext, useContext, useState, useCallback, useRef } from "react";
import { ShoppingCart, CheckCircle, AlertTriangle, Info, X } from "lucide-react";

type ToastType = "success" | "error" | "info" | "cart";

interface Toast {
    id: number;
    message: string;
    type: ToastType;
    exiting?: boolean;
}

interface ToastContextType {
    showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);
    const idRef = useRef(0);

    const showToast = useCallback((message: string, type: ToastType = "success") => {
        const id = ++idRef.current;
        setToasts((prev) => [...prev, { id, message, type }]);

        // Start exit animation after 2.5s
        setTimeout(() => {
            setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, exiting: true } : t)));
        }, 2500);

        // Remove after exit animation
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 3000);
    }, []);

    const removeToast = useCallback((id: number) => {
        setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, exiting: true } : t)));
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 300);
    }, []);

    const getIcon = (type: ToastType) => {
        switch (type) {
            case "cart": return <ShoppingCart size={18} />;
            case "success": return <CheckCircle size={18} />;
            case "error": return <AlertTriangle size={18} />;
            case "info": return <Info size={18} />;
        }
    };

    const getColors = (type: ToastType) => {
        switch (type) {
            case "cart": return "bg-cyan-500/15 border-cyan-500/30 text-cyan-400";
            case "success": return "bg-green-500/15 border-green-500/30 text-green-400";
            case "error": return "bg-red-500/15 border-red-500/30 text-red-400";
            case "info": return "bg-blue-500/15 border-blue-500/30 text-blue-400";
        }
    };

    const getGlow = (type: ToastType) => {
        switch (type) {
            case "cart": return "shadow-cyan-500/20";
            case "success": return "shadow-green-500/20";
            case "error": return "shadow-red-500/20";
            case "info": return "shadow-blue-500/20";
        }
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            {/* Toast Container */}
            <div className="fixed bottom-6 right-6 z-[100] flex flex-col-reverse gap-3 pointer-events-none">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`pointer-events-auto flex items-center gap-3 pl-4 pr-3 py-3.5 rounded-2xl border backdrop-blur-xl shadow-lg ${getColors(toast.type)} ${getGlow(toast.type)} ${toast.exiting
                                ? "animate-toast-out"
                                : "animate-toast-in"
                            }`}
                        style={{ minWidth: "280px", maxWidth: "400px" }}
                    >
                        <div className="flex-shrink-0">{getIcon(toast.type)}</div>
                        <p className="text-sm font-medium text-white flex-1">{toast.message}</p>
                        <button
                            onClick={() => removeToast(toast.id)}
                            className="flex-shrink-0 p-1 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-colors"
                        >
                            <X size={14} />
                        </button>
                    </div>
                ))}
            </div>

            {/* Toast animations */}
            <style jsx global>{`
        @keyframes toast-in {
          0% {
            opacity: 0;
            transform: translateX(100%) scale(0.8);
          }
          100% {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
        @keyframes toast-out {
          0% {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateX(100%) scale(0.8);
          }
        }
        .animate-toast-in {
          animation: toast-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-toast-out {
          animation: toast-out 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error("useToast must be used within ToastProvider");
    return ctx;
}
