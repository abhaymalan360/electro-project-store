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
                                <a href="mailto:hello@electroprojectstore.in" className="hover:text-cyan-400 transition-colors">hello@electroprojectstore.in</a>
                            </div>
                            <div className="flex items-center gap-2.5 text-gray-500 text-sm">
                                <Phone size={14} className="text-cyan-500" />
                                <span>WhatsApp Support Available</span>
                            </div>
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

                {/* Payment Methods */}
                <div className="border-t border-white/5 mt-12 pt-8">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                            <span>Secure Payments</span>
                        </div>
                        <div className="flex items-center gap-3 flex-wrap justify-center">
                            {/* UPI */}
                            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 border border-gray-800 rounded-lg">
                                <svg width="20" height="14" viewBox="0 0 50 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="50" height="30" rx="4" fill="#56A55A" />
                                    <text x="25" y="20" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" fontFamily="Arial">UPI</text>
                                </svg>
                                <span className="text-gray-400 text-xs font-semibold">UPI</span>
                            </div>
                            {/* GPay */}
                            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 border border-gray-800 rounded-lg">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" fill="#4285F4" />
                                </svg>
                                <span className="text-gray-400 text-xs font-semibold">GPay</span>
                            </div>
                            {/* PhonePe */}
                            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 border border-gray-800 rounded-lg">
                                <div className="w-[18px] h-[18px] rounded-sm bg-[#5F259F] flex items-center justify-center">
                                    <span className="text-white text-[10px] font-black">P</span>
                                </div>
                                <span className="text-gray-400 text-xs font-semibold">PhonePe</span>
                            </div>
                            {/* Paytm */}
                            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 border border-gray-800 rounded-lg">
                                <div className="w-[18px] h-[18px] rounded-sm bg-[#00BAF2] flex items-center justify-center">
                                    <span className="text-white text-[10px] font-black">₹</span>
                                </div>
                                <span className="text-gray-400 text-xs font-semibold">Paytm</span>
                            </div>
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
