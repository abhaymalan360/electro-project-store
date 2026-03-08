import Link from "next/link";
import { Cpu, Mail, MapPin, Zap, Phone } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-gray-950 border-t border-white/5 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                    {/* About */}
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-2.5 mb-5">
                            <div className="w-9 h-9 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
                                <Cpu size={18} className="text-white" />
                            </div>
                            <span className="font-extrabold text-lg">
                                <span className="text-cyan-400">Electro</span>
                                <span className="text-white"> Project </span>
                                <span className="text-orange-400">Store</span>
                            </span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-md mb-6">
                            Your one-stop destination for Arduino and ESP32 college projects. Designed for engineering students who want to build, learn, and innovate. Every project comes with complete source code, circuit diagrams, and components list.
                        </p>
                        <div className="flex flex-col gap-2.5">
                            <div className="flex items-center gap-2.5 text-gray-500 text-sm">
                                <MapPin size={14} className="text-cyan-500" />
                                <span>India</span>
                            </div>
                            <div className="flex items-center gap-2.5 text-gray-500 text-sm">
                                <Mail size={14} className="text-cyan-500" />
                                <a href="mailto:FRSOCIALWORKS@GMAIL.COM" className="hover:text-cyan-400 transition-colors uppercase">FRSOCIALWORKS@GMAIL.COM</a>
                            </div>
                            <a
                                href="https://wa.me/918979370679"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2.5 text-gray-500 text-sm hover:text-cyan-400 transition-colors"
                            >
                                <Phone size={14} className="text-cyan-500" />
                                <span>WhatsApp Support Available</span>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-bold text-sm mb-5 flex items-center gap-2 uppercase tracking-wider">
                            <span className="w-1 h-4 bg-cyan-500 rounded-full inline-block" />
                            Quick Links
                        </h3>
                        <ul className="space-y-3">
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
                                        className="text-gray-500 hover:text-cyan-400 text-sm transition-colors flex items-center gap-2 group"
                                    >
                                        <span className="w-1 h-1 rounded-full bg-gray-700 group-hover:bg-cyan-400 transition-colors" />
                                        {l.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h3 className="text-white font-bold text-sm mb-5 flex items-center gap-2 uppercase tracking-wider">
                            <span className="w-1 h-4 bg-orange-400 rounded-full inline-block" />
                            Categories
                        </h3>
                        <ul className="space-y-3">
                            {[
                                { name: "Engineering Physics", color: "group-hover:bg-blue-400" },
                                { name: "Digital Electronics", color: "group-hover:bg-purple-400" },
                                { name: "Semiconductor Physics", color: "group-hover:bg-green-400" },
                                { name: "Emerging & Disruptive Tech", color: "group-hover:bg-orange-400" },
                            ].map((cat) => (
                                <li key={cat.name}>
                                    <Link
                                        href={`/projects#${cat.name}`}
                                        className="text-gray-500 hover:text-white text-sm transition-colors flex items-center gap-2 group"
                                    >
                                        <span className={`w-1.5 h-1.5 rounded-full bg-gray-700 ${cat.color} transition-colors`} />
                                        {cat.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-6 p-4 bg-gradient-to-br from-cyan-500/5 to-transparent border border-cyan-500/10 rounded-xl">
                            <p className="text-xs text-gray-500">
                                <span className="text-cyan-400 font-bold">12+ Projects</span> available for Arduino &amp; ESP32 platforms
                            </p>
                        </div>
                    </div>
                </div>



                {/* Bottom bar */}
                <div className="border-t border-white/5 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600">
                    <p>&copy; {new Date().getFullYear()} Electro Project Store. All rights reserved.</p>
                    <p className="flex items-center gap-1.5">
                        Built for engineering students
                        <Zap size={14} className="text-cyan-500" />
                        with passion
                    </p>
                </div>
            </div>
        </footer>
    );
}
