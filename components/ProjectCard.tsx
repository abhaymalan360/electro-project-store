"use client";

import Link from "next/link";
import { ShoppingCart, Eye, Cpu, Zap, Tag } from "lucide-react";
import { Project } from "@/data/projects";
import { useCart } from "./CartContext";
import { useState } from "react";

interface ProjectCardProps {
  project: Project;
}

const subjectColors: Record<string, string> = {
  "Engineering Physics": "bg-blue-500/10 text-blue-400 border-blue-500/30",
  "Digital Electronics": "bg-purple-500/10 text-purple-400 border-purple-500/30",
  "Semiconductor Physics": "bg-green-500/10 text-green-400 border-green-500/30",
  "Emerging and Disruptive Technologies": "bg-orange-500/10 text-orange-400 border-orange-500/30",
};

const techColors: Record<string, string> = {
  Arduino: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
  ESP32: "bg-red-500/10 text-red-400 border-red-500/30",
};

// SVG placeholder since no actual images
function ProjectImagePlaceholder({ title, technology }: { title: string; technology: string }) {
  const isESP32 = technology === "ESP32";
  return (
    <div className={`w-full h-full flex flex-col items-center justify-center gap-3 ${isESP32 ? "bg-gradient-to-br from-red-950/40 to-gray-900" : "bg-gradient-to-br from-cyan-950/40 to-gray-900"}`}>
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${isESP32 ? "bg-red-500/20 border border-red-500/30" : "bg-cyan-500/20 border border-cyan-500/30"}`}>
        <Cpu size={32} className={isESP32 ? "text-red-400" : "text-cyan-400"} />
      </div>
      <div className="flex items-center gap-1">
        <Zap size={10} className={isESP32 ? "text-red-400" : "text-cyan-400"} />
        <span className={`text-xs font-mono font-bold ${isESP32 ? "text-red-400" : "text-cyan-400"}`}>{technology}</span>
      </div>
    </div>
  );
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(project);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="group relative bg-gray-900 border border-gray-800 hover:border-cyan-500/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1 flex flex-col">
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <ProjectImagePlaceholder title={project.title} technology={project.technology} />
        {/* Tech badge overlay */}
        <div className={`absolute top-3 right-3 px-2.5 py-1 text-xs font-bold font-mono border rounded-full ${techColors[project.technology]}`}>
          {project.technology}
        </div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Subject tag */}
        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs border rounded-full w-fit mb-3 ${subjectColors[project.subject] || "bg-gray-700 text-gray-300 border-gray-600"}`}>
          <Tag size={10} />
          {project.subject}
        </div>

        <h3 className="text-white font-semibold text-base mb-2 group-hover:text-cyan-400 transition-colors leading-snug">
          {project.title}
        </h3>

        <p className="text-gray-400 text-sm leading-relaxed flex-1 line-clamp-2">
          {project.description}
        </p>

        {/* Price + Actions */}
        <div className="mt-4 pt-4 border-t border-gray-800">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-2xl font-bold text-white">₹{project.price}</span>
              <span className="text-gray-500 text-xs ml-1">/ project</span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleAddToCart}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                added
                  ? "bg-green-500/20 border border-green-500/50 text-green-400"
                  : "bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500 hover:text-gray-950 hover:border-cyan-500"
              }`}
            >
              <ShoppingCart size={15} />
              {added ? "Added!" : "Add to Cart"}
            </button>
            <Link
              href={`/projects/${project.slug}`}
              className="flex items-center justify-center gap-2 py-2.5 px-3 bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white rounded-xl text-sm font-semibold transition-all duration-200"
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
