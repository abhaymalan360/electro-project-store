import Link from "next/link";
import { ArrowRight, Zap, Shield, BookOpen, Star, ChevronRight } from "lucide-react";
import { getFeaturedProjects, categories } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";

export default function HomePage() {
  const featured = getFeaturedProjects();

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        {/* Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/4 w-[300px] h-[200px] bg-orange-500/5 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-medium mb-8">
            <Zap size={14} className="animate-pulse" />
            Arduino &amp; ESP32 Projects for Students
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-none">
            <span className="block text-white">Electro</span>
            <span className="block bg-gradient-to-r from-cyan-400 via-cyan-300 to-teal-300 bg-clip-text text-transparent">
              Project Store
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Ready-to-build Arduino and ESP32 projects for engineering students.
            Complete with source code, circuit diagrams, and components list.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-8 py-4 bg-cyan-500 text-gray-950 font-bold rounded-xl hover:bg-cyan-400 transition-all duration-200 hover:scale-105 shadow-lg shadow-cyan-500/25 text-base"
            >
              Browse Projects
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/projects#categories"
              className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border border-gray-700 text-gray-300 font-semibold rounded-xl hover:border-gray-500 hover:text-white transition-all duration-200 text-base"
            >
              View Categories
              <ChevronRight size={18} />
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-16 pt-10 border-t border-gray-800/60">
            {[
              { value: "12+", label: "Projects" },
              { value: "4", label: "Subjects" },
              { value: "2", label: "Platforms" },
              { value: "100%", label: "Code Included" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-black text-cyan-400">{s.value}</div>
                <div className="text-gray-500 text-sm mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600">
          <span className="text-xs font-mono">scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-gray-600 to-transparent animate-pulse" />
        </div>
      </section>

      {/* Features */}
      <section className="py-16 border-y border-gray-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                icon: <BookOpen className="text-cyan-400" size={22} />,
                title: "Full Source Code",
                desc: "Every project includes complete, commented Arduino/ESP32 code ready to upload.",
              },
              {
                icon: <Shield className="text-orange-400" size={22} />,
                title: "Components List",
                desc: "Detailed bill of materials so you know exactly what to buy before starting.",
              },
              {
                icon: <Star className="text-yellow-400" size={22} />,
                title: "Circuit Diagrams",
                desc: "Clear circuit schematics and wiring guides included with every project.",
              },
            ].map((f) => (
              <div key={f.title} className="flex items-start gap-4 p-5 bg-gray-900/60 border border-gray-800 rounded-xl">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                  {f.icon}
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm mb-1">{f.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-cyan-400 text-sm font-mono mb-2">// popular picks</p>
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                Featured Projects
              </h2>
            </div>
            <Link
              href="/projects"
              className="hidden sm:flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
            >
              View all <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featured.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-cyan-400 text-sm font-medium"
            >
              View all projects <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-16 bg-gray-900/40 border-y border-gray-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-cyan-400 text-sm font-mono mb-2">// browse by subject</p>
            <h2 className="text-3xl font-black text-white">Project Categories</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "Engineering Physics", color: "from-blue-900/40 to-gray-900", border: "border-blue-500/30 hover:border-blue-500/70", text: "text-blue-400", count: 3 },
              { name: "Digital Electronics", color: "from-purple-900/40 to-gray-900", border: "border-purple-500/30 hover:border-purple-500/70", text: "text-purple-400", count: 3 },
              { name: "Semiconductor Physics", color: "from-green-900/40 to-gray-900", border: "border-green-500/30 hover:border-green-500/70", text: "text-green-400", count: 3 },
              { name: "Emerging & Disruptive Tech", color: "from-orange-900/40 to-gray-900", border: "border-orange-500/30 hover:border-orange-500/70", text: "text-orange-400", count: 3 },
            ].map((cat) => (
              <Link
                key={cat.name}
                href={`/projects#${cat.name}`}
                className={`group p-6 bg-gradient-to-br ${cat.color} border ${cat.border} rounded-xl transition-all duration-200 hover:-translate-y-1 hover:shadow-lg`}
              >
                <div className={`text-3xl font-black ${cat.text} mb-2`}>{cat.count}</div>
                <div className="text-white font-semibold text-sm mb-1">{cat.name}</div>
                <div className="text-gray-500 text-xs">projects available</div>
                <ArrowRight size={16} className={`${cat.text} mt-3 group-hover:translate-x-1 transition-transform`} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="p-10 bg-gradient-to-br from-cyan-950/40 to-gray-900 border border-cyan-500/20 rounded-2xl">
            <Zap className="text-cyan-400 mx-auto mb-4" size={36} />
            <h2 className="text-3xl font-black text-white mb-3">
              Ready to Start Building?
            </h2>
            <p className="text-gray-400 mb-8">
              Explore all 12+ projects across 4 engineering subjects. Each comes with code, schematics, and components list.
            </p>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-8 py-4 bg-cyan-500 text-gray-950 font-bold rounded-xl hover:bg-cyan-400 transition-all duration-200 hover:scale-105 shadow-lg shadow-cyan-500/25"
            >
              Explore All Projects
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
