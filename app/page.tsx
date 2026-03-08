import Link from "next/link";
import { ArrowRight, Zap, Shield, BookOpen, Star, ChevronRight, Cpu, CircuitBoard, Wifi, Battery, MessageCircle } from "lucide-react";
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
        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-cyan-500/8 rounded-full blur-[100px] animate-pulse-glow" />
        <div className="absolute top-2/3 left-1/4 w-[400px] h-[300px] bg-orange-500/5 rounded-full blur-[80px]" />
        <div className="absolute top-1/2 right-1/5 w-[300px] h-[200px] bg-purple-500/5 rounded-full blur-[80px]" />

        {/* Floating tech icons */}
        <div className="absolute top-32 left-[15%] animate-float opacity-20">
          <Cpu size={28} className="text-cyan-400" />
        </div>
        <div className="absolute top-48 right-[18%] animate-float-delayed opacity-15">
          <CircuitBoard size={32} className="text-orange-400" />
        </div>
        <div className="absolute bottom-40 left-[22%] animate-float-delayed opacity-15">
          <Wifi size={24} className="text-cyan-300" />
        </div>
        <div className="absolute bottom-52 right-[25%] animate-float opacity-10">
          <Battery size={28} className="text-green-400" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          {/* Badge */}
          <div className="animate-fade-in-up inline-flex items-center gap-2 px-5 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-medium mb-8 backdrop-blur-sm">
            <Zap size={14} className="animate-pulse" />
            Arduino &amp; ESP32 Projects for Students
          </div>

          <h1 className="animate-fade-in-up-delay-1 text-5xl sm:text-6xl lg:text-8xl font-black tracking-tight mb-6 leading-[0.9]">
            <span className="block text-white">Electro</span>
            <span className="block gradient-text-cyan mt-2">
              Project Store
            </span>
          </h1>

          <p className="animate-fade-in-up-delay-2 text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Ready-to-build Arduino and ESP32 projects for engineering students.
            Complete with source code, circuit diagrams, and components list.
          </p>

          <div className="animate-fade-in-up-delay-3 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-cyan-400 text-gray-950 font-bold rounded-2xl hover:from-cyan-400 hover:to-cyan-300 transition-all duration-300 hover:scale-105 shadow-xl shadow-cyan-500/25 text-base"
            >
              Browse Projects
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href={`https://wa.me/918979370679?text=${encodeURIComponent("Hey I am [Name] and I want to talk you about a project")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-green-500/10 border border-green-500/20 text-green-400 font-semibold rounded-2xl hover:bg-green-500/20 hover:border-green-500/40 transition-all duration-300 text-base backdrop-blur-sm shadow-lg shadow-green-500/5"
            >
              <MessageCircle size={18} className="group-hover:scale-110 transition-transform" />
              Chat on WhatsApp
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-16 mt-20 pt-10 border-t border-white/5">
            {[
              { value: "59+", label: "Projects", color: "text-cyan-400" },
              { value: "4", label: "Subjects", color: "text-orange-400" },
              { value: "2", label: "Platforms", color: "text-purple-400" },
              { value: "100%", label: "Code Included", color: "text-green-400" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className={`text-3xl sm:text-4xl font-black ${s.color}`}>{s.value}</div>
                <div className="text-gray-500 text-sm mt-1 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600">
          <span className="text-xs font-mono tracking-widest uppercase">scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-gray-600 to-transparent animate-pulse" />
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-6 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-gray-500 text-sm">
            {["✓ Tested & Working Code", "✓ Instant Delivery", "✓ UPI Payment", "✓ WhatsApp Support", "✓ College-Ready Projects"].map((item) => (
              <span key={item} className="flex items-center gap-1.5 font-medium">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              {
                icon: <BookOpen className="text-cyan-400" size={24} />,
                title: "Full Source Code",
                desc: "Every project includes complete, commented Arduino/ESP32 code ready to upload.",
                gradient: "from-cyan-500/10 to-transparent",
                border: "border-cyan-500/20 hover:border-cyan-500/40",
              },
              {
                icon: <Shield className="text-orange-400" size={24} />,
                title: "Components List",
                desc: "Detailed bill of materials so you know exactly what to buy before starting.",
                gradient: "from-orange-500/10 to-transparent",
                border: "border-orange-500/20 hover:border-orange-500/40",
              },
              {
                icon: <Star className="text-yellow-400" size={24} />,
                title: "Circuit Diagrams",
                desc: "Clear circuit schematics and wiring guides included with every project.",
                gradient: "from-yellow-500/10 to-transparent",
                border: "border-yellow-500/20 hover:border-yellow-500/40",
              },
            ].map((f) => (
              <div key={f.title} className={`card-shine flex items-start gap-4 p-6 bg-gradient-to-br ${f.gradient} border ${f.border} rounded-2xl transition-all duration-300 hover:-translate-y-1`}>
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center flex-shrink-0">
                  {f.icon}
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm mb-1.5">{f.title}</h3>
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
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-cyan-400 text-sm font-mono mb-2 tracking-wider">// popular picks</p>
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                Featured Projects
              </h2>
            </div>
            <Link
              href="/projects"
              className="hidden sm:flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-semibold transition-colors group"
            >
              View all <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
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
              className="inline-flex items-center gap-2 text-cyan-400 text-sm font-semibold"
            >
              View all projects <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-20 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-cyan-400 text-sm font-mono mb-2 tracking-wider">// browse by subject</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white">Project Categories</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "Emerging & Disruptive Tech", anchor: "Emerging and Disruptive Technologies", icon: <Zap size={24} />, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20", shadow: "shadow-amber-500/20", count: 18 },
              { name: "Engineering Physics", anchor: "Engineering Physics", icon: <Cpu size={24} />, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20", shadow: "shadow-blue-500/20", count: 15 },
              { name: "Digital Electronics", anchor: "Digital Electronics", icon: <CircuitBoard size={24} />, color: "text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/20", shadow: "shadow-indigo-500/20", count: 18 },
              { name: "Semiconductor Physics", anchor: "Semiconductor Physics", icon: <Cpu size={24} />, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", shadow: "shadow-emerald-500/20", count: 8 },
            ].map((cat) => (
              <Link
                key={cat.name}
                href={`/projects#${cat.anchor}`}
                className={`group relative p-8 bg-gray-900/40 border border-white/5 rounded-[2.5rem] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:${cat.shadow} glass-morphism overflow-hidden`}
              >
                <div className={`absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-700 pointer-events-none ${cat.color}`}>
                  {cat.icon}
                </div>

                <div className="flex items-center justify-between mb-8">
                  <div className={`w-14 h-14 ${cat.bg} rounded-2xl flex items-center justify-center ${cat.color} group-hover:scale-110 transition-all duration-500 border ${cat.border}`}>
                    {cat.icon}
                  </div>
                  <div className="text-right">
                    <p className={`text-3xl font-black text-white group-hover:${cat.color} transition-colors`}>{cat.count}</p>
                    <p className="text-[10px] text-gray-600 font-black uppercase tracking-widest">Projects</p>
                  </div>
                </div>

                <h3 className="text-white font-black text-lg mb-2 leading-tight group-hover:brightness-125 transition-all">{cat.name}</h3>
                <p className="text-gray-500 text-xs font-medium mb-6">Explore the latest in {cat.name.split(' ')[0]} engineering.</p>

                <div className={`flex items-center gap-2 ${cat.color} text-[10px] font-black uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-all`}>
                  Browse Projects <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-orange-400 text-sm font-mono mb-2 tracking-wider">// how it works</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white">Get Started in Minutes</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Choose a Project",
                desc: "Browse our collection and pick the project that matches your subject and interest.",
                color: "text-cyan-400",
                border: "border-cyan-500/20",
              },
              {
                step: "02",
                title: "Make Payment",
                desc: "Pay via UPI by scanning the QR code. Quick, secure, and instant confirmation.",
                color: "text-orange-400",
                border: "border-orange-500/20",
              },
              {
                step: "03",
                title: "Build & Submit",
                desc: "Receive complete code, circuit diagrams, and components list. Build and ace your project!",
                color: "text-green-400",
                border: "border-green-500/20",
              },
            ].map((item) => (
              <div key={item.step} className={`text-center p-6 border ${item.border} rounded-2xl bg-white/[0.01]`}>
                <div className={`text-5xl font-black ${item.color} opacity-30 mb-4`}>{item.step}</div>
                <h3 className="text-white font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="relative p-12 bg-gradient-to-br from-cyan-950/30 via-gray-900 to-orange-950/20 border border-white/10 rounded-3xl overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-cyan-500/10 rounded-full blur-[80px]" />

            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 border border-cyan-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="text-cyan-400" size={32} />
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
                Ready to Start Building?
              </h2>
              <p className="text-gray-400 mb-8 max-w-lg mx-auto">
                Explore all 59+ projects across 4 engineering subjects. Each comes with code, schematics, and components list.
              </p>
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-cyan-400 text-gray-950 font-bold rounded-2xl hover:from-cyan-400 hover:to-cyan-300 transition-all duration-300 hover:scale-105 shadow-xl shadow-cyan-500/25"
              >
                Explore All Projects
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
