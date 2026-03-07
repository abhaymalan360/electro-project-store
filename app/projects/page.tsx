"use client";

import { useState } from "react";
import { projects, categories } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import { Search, X, SlidersHorizontal, ChevronDown, ArrowUpDown } from "lucide-react";

type SortOption = "default" | "price-low" | "price-high";

export default function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [showFilters, setShowFilters] = useState(false);

  const query = search.trim().toLowerCase();

  // Filter by search
  let filtered = query
    ? projects.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.subject.toLowerCase().includes(query) ||
        p.technology.toLowerCase().includes(query) ||
        p.components.some((c) => c.toLowerCase().includes(query))
    )
    : [...projects];

  // Filter by subject
  if (selectedSubject !== "all") {
    filtered = filtered.filter((p) => p.subject === selectedSubject);
  }

  // Sort
  if (sortBy === "price-low") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-high") {
    filtered.sort((a, b) => b.price - a.price);
  }

  const subjectColors: Record<string, string> = {
    "all": "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
    "Emerging and Disruptive Technologies": "text-orange-400 border-orange-500/30 bg-orange-500/10",
    "Engineering Physics": "text-blue-400 border-blue-500/30 bg-blue-500/10",
    "Digital Electronics": "text-purple-400 border-purple-500/30 bg-purple-500/10",
    "Semiconductor Physics": "text-green-400 border-green-500/30 bg-green-500/10",
  };

  const subjectDots: Record<string, string> = {
    "Emerging and Disruptive Technologies": "bg-orange-500",
    "Engineering Physics": "bg-blue-500",
    "Digital Electronics": "bg-purple-500",
    "Semiconductor Physics": "bg-green-500",
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <p className="text-cyan-400 text-sm font-mono mb-2 tracking-wider">// all projects</p>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Browse Projects
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
            {projects.length} projects across {categories.length} subjects. Each includes complete source code, components list, and circuit diagram.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects by name, subject, component..."
              className="w-full pl-12 pr-12 py-4 bg-gray-900/80 border border-gray-800 focus:border-cyan-500/50 text-white rounded-2xl text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-cyan-500/20 transition-all backdrop-blur-sm"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-white transition-colors rounded-lg hover:bg-white/5"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Filters Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-8">
          {/* Subject Filter Chips */}
          <div className="flex flex-wrap gap-2 flex-1">
            <button
              onClick={() => setSelectedSubject("all")}
              className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all duration-200 ${selectedSubject === "all"
                  ? "text-cyan-400 border-cyan-500/40 bg-cyan-500/15 shadow-sm shadow-cyan-500/10"
                  : "text-gray-500 border-gray-800 bg-gray-900/50 hover:border-gray-700 hover:text-gray-300"
                }`}
            >
              All Projects ({projects.length})
            </button>
            {categories.map((cat) => {
              const count = projects.filter((p) => p.subject === cat).length;
              const isActive = selectedSubject === cat;
              const colors = subjectColors[cat] || "";
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedSubject(isActive ? "all" : cat)}
                  className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl border transition-all duration-200 ${isActive
                      ? `${colors} shadow-sm`
                      : "text-gray-500 border-gray-800 bg-gray-900/50 hover:border-gray-700 hover:text-gray-300"
                    }`}
                >
                  <span className={`w-2 h-2 rounded-full ${subjectDots[cat] || "bg-gray-500"}`} />
                  {cat.replace("and Disruptive Technologies", "& DT")}
                  <span className="opacity-60">({count})</span>
                </button>
              );
            })}
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl border transition-all duration-200 ${sortBy !== "default"
                  ? "text-cyan-400 border-cyan-500/30 bg-cyan-500/10"
                  : "text-gray-400 border-gray-800 bg-gray-900/50 hover:border-gray-700 hover:text-gray-300"
                }`}
            >
              <ArrowUpDown size={14} />
              {sortBy === "price-low" ? "Price: Low → High" : sortBy === "price-high" ? "Price: High → Low" : "Sort by Price"}
              <ChevronDown size={12} className={`transition-transform ${showFilters ? "rotate-180" : ""}`} />
            </button>
            {showFilters && (
              <div className="absolute right-0 top-full mt-2 w-52 bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl shadow-black/40 py-1.5 z-50 animate-in">
                {[
                  { value: "default" as SortOption, label: "Default Order" },
                  { value: "price-low" as SortOption, label: "Price: Low → High" },
                  { value: "price-high" as SortOption, label: "Price: High → Low" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => { setSortBy(opt.value); setShowFilters(false); }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${sortBy === opt.value
                        ? "text-cyan-400 bg-cyan-500/5"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Active Filters Summary */}
        {(selectedSubject !== "all" || sortBy !== "default" || query) && (
          <div className="flex items-center gap-3 mb-6 text-sm">
            <span className="text-gray-500">Showing</span>
            <span className="text-cyan-400 font-bold">{filtered.length}</span>
            <span className="text-gray-500">
              project{filtered.length !== 1 ? "s" : ""}
              {selectedSubject !== "all" && (
                <> in <span className={subjectColors[selectedSubject]?.split(" ")[0] || "text-white"}>{selectedSubject}</span></>
              )}
              {sortBy !== "default" && (
                <> · sorted {sortBy === "price-low" ? "low → high" : "high → low"}</>
              )}
              {query && (
                <> · matching &ldquo;<span className="text-white">{search}</span>&rdquo;</>
              )}
            </span>
            <button
              onClick={() => { setSelectedSubject("all"); setSortBy("default"); setSearch(""); }}
              className="text-gray-600 hover:text-white text-xs font-medium px-2 py-1 rounded-lg hover:bg-white/5 transition-all"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Projects Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-900 border border-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Search size={32} className="text-gray-700" />
            </div>
            <h3 className="text-white font-bold text-lg mb-2">No projects found</h3>
            <p className="text-gray-500 text-sm">Try a different search term or change your filters</p>
            <button
              onClick={() => { setSelectedSubject("all"); setSortBy("default"); setSearch(""); }}
              className="mt-4 text-cyan-400 text-sm font-semibold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
