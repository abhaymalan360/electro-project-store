"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Eye, Cpu, Zap, Tag, Plus, Minus, Trash2 } from "lucide-react";
import { Project } from "@/data/projects";
import { useCart } from "./CartContext";
import { useToast } from "./ToastContext";
import { useState } from "react";

interface ProjectCardProps {
    project: Project;
}

const subjectColors: Record<string, string> = {
    "Engineering Physics": "bg-blue-500/10 text-blue-400 border-blue-500/20",
    "Digital Electronics": "bg-purple-500/10 text-purple-400 border-purple-500/20",
    "Semiconductor Physics": "bg-green-500/10 text-green-400 border-green-500/20",
    "Emerging and Disruptive Technologies": "bg-orange-500/10 text-orange-400 border-orange-500/20",
};

const techColors: Record<string, string> = {
    Arduino: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    ESP32: "bg-red-500/10 text-red-400 border-red-500/20",
};

// Beautiful gradient fallback for projects without real images
function ProjectImagePlaceholder({ title, technology }: { title: string; technology: string }) {
    const isESP32 = technology === "ESP32";
    return (
        <div className={`w-full h-full flex flex-col items-center justify-center gap-3 ${isESP32 ? "bg-gradient-to-br from-red-950/50 via-gray-900 to-gray-950" : "bg-gradient-to-br from-cyan-950/50 via-gray-900 to-gray-950"}`}>
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center backdrop-blur-sm ${isESP32 ? "bg-red-500/15 border border-red-500/20" : "bg-cyan-500/15 border border-cyan-500/20"}`}>
                <Cpu size={28} className={isESP32 ? "text-red-400" : "text-cyan-400"} />
            </div>
            <div className="flex items-center gap-1">
                <Zap size={10} className={isESP32 ? "text-red-400" : "text-cyan-400"} />
                <span className={`text-xs font-mono font-bold ${isESP32 ? "text-red-400/80" : "text-cyan-400/80"}`}>{technology}</span>
            </div>
        </div>
    );
}

export default function ProjectCard({ project }: ProjectCardProps) {
    const { items, addToCart, updateQuantity, removeFromCart } = useCart();
    const { showToast } = useToast();
    const [imgError, setImgError] = useState(false);

    const cartItem = items.find((i) => i.project.id === project.id);
    const quantity = cartItem ? cartItem.quantity : 0;

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(project);
        showToast(`${project.title} added to cart!`, "cart");
    };

    const handleIncrease = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        updateQuantity(project.id, quantity + 1);
    };

    const handleDecrease = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (quantity <= 1) {
            removeFromCart(project.id);
            showToast(`${project.title} removed from cart`, "info");
        } else {
            updateQuantity(project.id, quantity - 1);
        }
    };

    const hasRealImage = project.image && project.image.endsWith(".png");

    return (
        <div className="card-shine group relative bg-gray-900/80 border border-white/[0.06] hover:border-cyan-500/30 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/5 hover:-translate-y-1.5 flex flex-col">
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
                {hasRealImage && !imgError ? (
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        onError={() => setImgError(true)}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                ) : (
                    <ProjectImagePlaceholder title={project.title} technology={project.technology} />
                )}
                {/* Tech badge overlay */}
                <div className={`absolute top-3 right-3 px-2.5 py-1 text-xs font-bold font-mono border rounded-full backdrop-blur-md ${techColors[project.technology]}`}>
                    {project.technology}
                </div>
                {/* Cart quantity badge */}
                {quantity > 0 && (
                    <div className="absolute top-3 left-3 w-7 h-7 bg-cyan-500 text-gray-950 rounded-full flex items-center justify-center text-xs font-black shadow-lg shadow-cyan-500/30">
                        {quantity}
                    </div>
                )}
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent" />
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
                {/* Subject tag */}
                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] border rounded-full w-fit mb-3 font-medium ${subjectColors[project.subject] || "bg-gray-700 text-gray-300 border-gray-600"}`}>
                    <Tag size={9} />
                    {project.subject}
                </div>

                <h3 className="text-white font-bold text-base mb-2 group-hover:text-cyan-400 transition-colors duration-300 leading-snug">
                    {project.title}
                </h3>

                <p className="text-gray-500 text-sm leading-relaxed flex-1 line-clamp-2">
                    {project.description}
                </p>

                {/* Price + Actions */}
                <div className="mt-4 pt-4 border-t border-white/5">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-black text-white">₹{project.price}</span>
                            <span className="text-gray-600 text-xs">/ project</span>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        {quantity > 0 ? (
                            <div className="flex-1 flex items-center gap-1">
                                <button
                                    onClick={handleDecrease}
                                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${quantity <= 1
                                            ? "bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20"
                                            : "bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white"
                                        }`}
                                >
                                    {quantity <= 1 ? <Trash2 size={14} /> : <Minus size={14} />}
                                </button>
                                <div className="flex-1 flex items-center justify-center h-10 bg-cyan-500/10 border border-cyan-500/20 rounded-xl">
                                    <span className="text-cyan-400 font-black text-sm">{quantity}</span>
                                </div>
                                <button
                                    onClick={handleIncrease}
                                    className="w-10 h-10 rounded-xl flex items-center justify-center bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20 transition-all duration-200"
                                >
                                    <Plus size={14} />
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-sm font-semibold transition-all duration-300 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500 hover:text-gray-950 hover:border-cyan-500 hover:shadow-lg hover:shadow-cyan-500/20"
                            >
                                <ShoppingCart size={15} />
                                Add to Cart
                            </button>
                        )}
                        <Link
                            href={`/projects/${project.slug}`}
                            className="flex items-center justify-center gap-2 py-2.5 px-3 bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white rounded-xl text-sm font-semibold transition-all duration-300"
                        >
                            <Eye size={15} />
                            <span className="hidden sm:inline">Details</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
