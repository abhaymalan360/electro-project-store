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
                                <div className="w-5 h-5 flex items-center justify-center">
                                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#EA4335" />
                                    </svg>
                                </div>
                                <span>India</span>
                            </div>
                            <div className="flex items-center gap-2.5 text-gray-500 text-sm">
                                <div className="w-5 h-5 flex items-center justify-center">
                                    <svg viewBox="0 0 24 24" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M24 4.5v15c0 .85-.65 1.5-1.5 1.5H21V7.38l-9 6.75-9-6.75V21H1.5c-.85 0-1.5-.65-1.5-1.5v-15c0-.4.15-.75.45-1.05.3-.3.65-.45 1.05-.45H3.3l8.7 6.52 8.7-6.52h1.85c.4 0 .75.15 1.05.45.3.3.45.65.45 1.05z" fill="#EA4335" />
                                    </svg>
                                </div>
                                <a href="mailto:frsocialworks@gmail.com" className="hover:text-cyan-400 transition-colors">frsocialworks@gmail.com</a>
                            </div>
                            <a
                                href="https://wa.me/918979370679"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2.5 text-gray-500 text-sm hover:text-cyan-400 transition-colors"
                            >
                                <div className="w-5 h-5 flex items-center justify-center">
                                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill="#25D366" />
                                    </svg>
                                </div>
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
