"use client";

import { MessageCircle } from "lucide-react";
import Link from "next/link";

export default function WhatsAppFloat() {
    const phoneNumber = "918979370679";
    const message = "Hey I am [Name] and I want to talk you about a project";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <Link
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-[100] group flex items-center justify-center"
            aria-label="Contact on WhatsApp"
        >
            {/* Pulse effect */}
            <span className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-25 group-hover:opacity-40 transition-opacity"></span>

            {/* Label */}
            <span className="absolute right-full mr-4 px-4 py-2 bg-gray-900/90 text-white text-sm font-bold rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 border border-white/10 backdrop-blur-md pointer-events-none">
                Chat with us
            </span>

            {/* Button */}
            <div className="relative w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(37,211,102,0.4)] transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(37,211,102,0.5)] active:scale-95 border-2 border-white/20">
                <MessageCircle size={30} fill="currentColor" />
            </div>
        </Link>
    );
}
