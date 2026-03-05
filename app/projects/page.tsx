import { projects, categories, getProjectsBySubject } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import { Cpu, Filter } from "lucide-react";

const categoryColors: Record<string, { dot: string; heading: string; border: string; bg: string }> = {
  "Engineering Physics": {
    dot: "bg-blue-500",
    heading: "text-blue-400",
    border: "border-blue-500/30",
    bg: "bg-blue-500/5",
  },
  "Digital Electronics": {
    dot: "bg-purple-500",
    heading: "text-purple-400",
    border: "border-purple-500/30",
    bg: "bg-purple-500/5",
  },
  "Semiconductor Physics": {
    dot: "bg-green-500",
    heading: "text-green-400",
    border: "border-green-500/30",
    bg: "bg-green-500/5",
  },
  "Emerging and Disruptive Technologies": {
    dot: "bg-orange-500",
    heading: "text-orange-400",
    border: "border-orange-500/30",
    bg: "bg-orange-500/5",
  },
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14">
          <p className="text-cyan-400 text-sm font-mono mb-2">// all projects</p>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Browse Projects
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            {projects.length} projects across {categories.length} subjects. Each includes complete source code, components list, and circuit diagram.
          </p>

          {/* Filter chips */}
          <div id="categories" className="flex flex-wrap gap-2 mt-6">
            {categories.map((cat) => {
              const c = categoryColors[cat];
              return (
                <a
                  key={cat}
                  href={`#${cat}`}
                  className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium border ${c.border} ${c.bg} rounded-full ${c.heading} hover:opacity-80 transition-opacity`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
                  {cat}
                </a>
              );
            })}
          </div>
        </div>

        {/* Categories */}
        {categories.map((category) => {
          const catProjects = getProjectsBySubject(category);
          const c = categoryColors[category];
          if (!catProjects.length) return null;
          return (
            <section key={category} id={category} className="mb-16 scroll-mt-24">
              {/* Category header */}
              <div className={`flex items-center gap-3 mb-6 pb-4 border-b ${c.border}`}>
                <div className={`w-2 h-8 ${c.dot} rounded-full`} />
                <div>
                  <h2 className={`text-2xl font-black ${c.heading}`}>{category}</h2>
                  <p className="text-gray-500 text-sm mt-0.5">
                    {catProjects.length} project{catProjects.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              {/* Project grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {catProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
