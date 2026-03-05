"use client";

import { getProjectBySlug, projects } from "@/data/projects";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ShoppingCart, ArrowLeft, Cpu, Zap, Package, Code2, CircuitBoard, Tag, CheckCircle } from "lucide-react";
import { useCart } from "@/components/CartContext";
import { useState } from "react";

// Generate static params
export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

const subjectColors: Record<string, string> = {
  "Engineering Physics": "text-blue-400 border-blue-500/30 bg-blue-500/10",
  "Digital Electronics": "text-purple-400 border-purple-500/30 bg-purple-500/10",
  "Semiconductor Physics": "text-green-400 border-green-500/30 bg-green-500/10",
  "Emerging and Disruptive Technologies": "text-orange-400 border-orange-500/30 bg-orange-500/10",
};

function ProjectDetailClient({ slug }: { slug: string }) {
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(project);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const isESP32 = project.technology === "ESP32";

  return (
    <main className="min-h-screen bg-gray-950 text-white pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Back */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 text-sm mb-8 transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title block */}
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium border rounded-full ${subjectColors[project.subject] || "text-gray-400 border-gray-700 bg-gray-800"}`}>
                  <Tag size={11} />
                  {project.subject}
                </span>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold border rounded-full ${isESP32 ? "text-red-400 border-red-500/30 bg-red-500/10" : "text-cyan-400 border-cyan-500/30 bg-cyan-500/10"}`}>
                  <Cpu size={11} />
                  {project.technology}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-white mb-4 leading-tight">
                {project.title}
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed">{project.fullDescription}</p>
            </div>

            {/* Circuit Diagram Placeholder */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-3 border-b border-gray-800 bg-gray-900/80">
                <CircuitBoard size={16} className="text-cyan-400" />
                <span className="text-sm font-medium text-gray-300">Circuit Diagram</span>
                <span className="ml-auto text-xs text-gray-600 font-mono">schematic</span>
              </div>
              <div className="h-56 flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-950">
                <div className="text-center">
                  <div className="w-20 h-20 border-2 border-dashed border-gray-700 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <CircuitBoard size={32} className="text-gray-600" />
                  </div>
                  <p className="text-gray-600 text-sm">Circuit diagram included with purchase</p>
                  <p className="text-gray-700 text-xs mt-1 font-mono">{project.technology} · {project.components.length} components</p>
                </div>
              </div>
            </div>

            {/* Code Section */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-3 border-b border-gray-800 bg-gray-900/80">
                <Code2 size={16} className="text-orange-400" />
                <span className="text-sm font-medium text-gray-300">{project.technology} Source Code</span>
                <div className="ml-auto flex gap-1.5">
                  <span className="w-3 h-3 bg-red-500/60 rounded-full" />
                  <span className="w-3 h-3 bg-yellow-500/60 rounded-full" />
                  <span className="w-3 h-3 bg-green-500/60 rounded-full" />
                </div>
              </div>
              <pre className="p-5 overflow-x-auto text-sm font-mono leading-relaxed">
                <code className="text-gray-300">{project.code}</code>
              </pre>
            </div>

            {/* Components */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-800">
                <Package size={16} className="text-green-400" />
                <span className="text-sm font-medium text-gray-300">Components Required</span>
                <span className="ml-auto text-xs text-gray-600 font-mono">{project.components.length} items</span>
              </div>
              <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {project.components.map((comp, i) => (
                  <div key={i} className="flex items-center gap-2.5 py-2 px-3 bg-gray-800/50 rounded-lg">
                    <CheckCircle size={14} className="text-green-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{comp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              {/* Price card */}
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                <div className="mb-6">
                  <p className="text-gray-500 text-sm mb-1">Project price</p>
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-black text-white">₹{project.price}</span>
                    <span className="text-gray-500 text-sm mb-1">/ complete kit</span>
                  </div>
                </div>

                <button
                  onClick={handleAdd}
                  className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 ${
                    added
                      ? "bg-green-500/20 border border-green-500/50 text-green-400"
                      : "bg-cyan-500 text-gray-950 hover:bg-cyan-400 hover:scale-[1.02] shadow-lg shadow-cyan-500/20"
                  }`}
                >
                  <ShoppingCart size={18} />
                  {added ? "✓ Added to Cart!" : "Add to Cart"}
                </button>

                <Link
                  href="/cart"
                  className="w-full flex items-center justify-center gap-2 py-3 mt-3 bg-gray-800 border border-gray-700 text-gray-300 hover:text-white hover:bg-gray-700 rounded-xl font-semibold text-sm transition-all"
                >
                  View Cart
                </Link>
              </div>

              {/* What's included */}
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
                <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                  <Zap size={14} className="text-cyan-400" />
                  What&apos;s Included
                </h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  {["Complete source code", "Circuit diagram/schematic", "Components list", "Project explanation", "Wiring guide"].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle size={13} className="text-green-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  return <ProjectDetailClient slug={params.slug} />;
}
