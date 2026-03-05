import Link from "next/link";
import { Cpu, Github, Mail, MapPin, Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-cyan-500/20 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center">
                <Cpu size={18} className="text-gray-950" />
              </div>
              <span className="font-bold text-white font-mono">
                <span className="text-cyan-400">Electro</span> Project{" "}
                <span className="text-orange-400">Store</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your one-stop destination for Arduino and ESP32 college projects. Designed for engineering students who want to build, learn, and innovate.
            </p>
            <div className="flex items-center gap-2 mt-4 text-gray-500 text-sm">
              <MapPin size={14} className="text-cyan-500" />
              <span>India</span>
            </div>
            <div className="flex items-center gap-2 mt-2 text-gray-500 text-sm">
              <Mail size={14} className="text-cyan-500" />
              <span>hello@electroprojectstore.in</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <span className="w-1 h-4 bg-cyan-500 rounded-full inline-block" />
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/projects", label: "All Projects" },
                { href: "/projects#Engineering Physics", label: "Physics Projects" },
                { href: "/projects#Digital Electronics", label: "Electronics Projects" },
                { href: "/cart", label: "My Cart" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-gray-400 hover:text-cyan-400 text-sm transition-colors flex items-center gap-2 group"
                  >
                    <Zap size={12} className="text-cyan-500/50 group-hover:text-cyan-400 transition-colors" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <span className="w-1 h-4 bg-orange-400 rounded-full inline-block" />
              Project Categories
            </h3>
            <ul className="space-y-2">
              {[
                "Engineering Physics",
                "Digital Electronics",
                "Semiconductor Physics",
                "Emerging & Disruptive Tech",
              ].map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/projects#${cat}`}
                    className="text-gray-400 hover:text-orange-400 text-sm transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400/40 group-hover:bg-orange-400 transition-colors" />
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 p-3 bg-cyan-500/5 border border-cyan-500/20 rounded-lg">
              <p className="text-xs text-gray-500">
                <span className="text-cyan-400 font-semibold">12+ Projects</span> available for Arduino &amp; ESP32 platforms
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-600">
          <p>© {new Date().getFullYear()} Electro Project Store. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built for engineering students
            <span className="text-cyan-500 mx-1">⚡</span>
            with passion
          </p>
        </div>
      </div>
    </footer>
  );
}
