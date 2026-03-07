"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useCart } from "./CartContext";
import { useAuth } from "./AuthContext";
import { useTheme } from "./ThemeContext";
import { projects, categories } from "@/data/projects";
import { ShoppingCart, Menu, X, Cpu, User, LogOut, ChevronDown, Search, Sun, Moon, Monitor, Package } from "lucide-react";

// Google SVG icon
function GoogleIcon({ size = 18 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
    );
}

export default function Navbar() {
    const { totalItems } = useCart();
    const { user, isLoggedIn, loginWithGoogle, logout } = useAuth();
    const { theme, setTheme } = useTheme();
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [loginLoading, setLoginLoading] = useState(false);
    const [showCategories, setShowCategories] = useState(false);
    const [mobileCategories, setMobileCategories] = useState(false);
    const categoriesRef = useRef<HTMLDivElement>(null);

    // Search state
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const searchRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const userMenuRef = useRef<HTMLDivElement>(null);

    const searchResults = searchQuery.trim().length > 0
        ? projects.filter((p) => {
            const q = searchQuery.toLowerCase();
            return (
                p.title.toLowerCase().includes(q) ||
                p.description.toLowerCase().includes(q) ||
                p.subject.toLowerCase().includes(q) ||
                p.technology.toLowerCase().includes(q) ||
                p.components.some((c) => c.toLowerCase().includes(q))
            );
        }).slice(0, 6)
        : [];

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close dropdowns on outside click
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
                setShowUserMenu(false);
            }
            if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
                setSearchOpen(false);
                setSearchQuery("");
            }
            if (categoriesRef.current && !categoriesRef.current.contains(e.target as Node)) {
                setShowCategories(false);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    // Keyboard shortcut: Ctrl+K to open search
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === "k") {
                e.preventDefault();
                setSearchOpen(true);
                setTimeout(() => searchInputRef.current?.focus(), 50);
            }
            if (e.key === "Escape") {
                setSearchOpen(false);
                setSearchQuery("");
            }
        };
        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, []);

    const handleGoogleLogin = async () => {
        setLoginLoading(true);
        await loginWithGoogle();
        setLoginLoading(false);
        setShowLoginModal(false);
    };

    const handleLogout = async () => {
        await logout();
        setShowUserMenu(false);
    };

    const handleSearchSelect = (slug: string) => {
        setSearchOpen(false);
        setSearchQuery("");
        router.push(`/projects/${slug}`);
    };

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/projects", label: "Projects" },
    ];

    const categoryColors: Record<string, { dot: string; text: string }> = {
        "Emerging and Disruptive Technologies": { dot: "bg-orange-500", text: "text-orange-400" },
        "Engineering Physics": { dot: "bg-blue-500", text: "text-blue-400" },
        "Digital Electronics": { dot: "bg-purple-500", text: "text-purple-400" },
        "Semiconductor Physics": { dot: "bg-green-500", text: "text-green-400" },
    };

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? "bg-gray-950/90 backdrop-blur-xl border-b border-cyan-500/15 shadow-lg shadow-black/30"
                    : "bg-transparent border-b border-transparent"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2.5 group">
                            <div className="relative">
                                <div className="w-9 h-9 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-xl flex items-center justify-center rotate-12 group-hover:rotate-0 transition-all duration-500 shadow-lg shadow-cyan-500/25">
                                    <Cpu size={18} className="text-white -rotate-12 group-hover:rotate-0 transition-transform duration-500" />
                                </div>
                                <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-orange-400 rounded-full animate-pulse ring-2 ring-gray-950" />
                            </div>
                            <div className="hidden sm:flex items-baseline gap-1">
                                <span className="text-cyan-400 font-extrabold text-lg tracking-tight">Electro</span>
                                <span className="text-white font-bold text-lg tracking-tight">Project</span>
                                <span className="text-orange-400 font-bold text-sm tracking-tight">Store</span>
                            </div>
                        </Link>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center gap-0.5">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="relative px-4 py-2 text-gray-400 hover:text-white text-sm font-medium transition-all duration-200 rounded-lg hover:bg-white/5 group"
                                >
                                    {link.label}
                                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 group-hover:w-1/2 h-0.5 bg-cyan-400 transition-all duration-300 rounded-full" />
                                </Link>
                            ))}
                            {/* Categories Dropdown */}
                            <div ref={categoriesRef} className="relative">
                                <button
                                    onClick={() => setShowCategories(!showCategories)}
                                    className="relative flex items-center gap-1 px-4 py-2 text-gray-400 hover:text-white text-sm font-medium transition-all duration-200 rounded-lg hover:bg-white/5 group"
                                >
                                    Categories
                                    <ChevronDown size={14} className={`transition-transform duration-200 ${showCategories ? 'rotate-180' : ''}`} />
                                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 group-hover:w-1/2 h-0.5 bg-cyan-400 transition-all duration-300 rounded-full" />
                                </button>
                                {showCategories && (
                                    <div className="absolute top-full mt-2 left-0 w-72 bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl shadow-black/40 py-2 animate-in z-50">
                                        <p className="px-4 py-2 text-gray-500 text-xs font-medium uppercase tracking-wider">Browse by Subject</p>
                                        {categories.map((cat) => {
                                            const c = categoryColors[cat] || { dot: "bg-gray-500", text: "text-gray-400" };
                                            const projectCount = projects.filter(p => p.subject === cat).length;
                                            return (
                                                <Link
                                                    key={cat}
                                                    href={`/projects#${cat}`}
                                                    onClick={() => setShowCategories(false)}
                                                    className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors group"
                                                >
                                                    <span className={`w-2.5 h-2.5 rounded-full ${c.dot} flex-shrink-0`} />
                                                    <div className="flex-1 min-w-0">
                                                        <p className={`text-sm font-medium ${c.text} group-hover:brightness-125 transition-all`}>{cat}</p>
                                                        <p className="text-gray-600 text-xs">{projectCount} projects</p>
                                                    </div>
                                                    <span className="text-gray-700 text-xs">→</span>
                                                </Link>
                                            );
                                        })}
                                        <div className="border-t border-gray-800 mt-1 pt-1">
                                            <Link
                                                href="/projects"
                                                onClick={() => setShowCategories(false)}
                                                className="block px-4 py-2.5 text-cyan-400 text-xs font-semibold hover:bg-white/5 transition-colors text-center"
                                            >
                                                View All Projects →
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right side: Search + Login + Cart + Mobile menu */}
                        <div className="flex items-center gap-2">

                            {/* Search */}
                            <div ref={searchRef} className="relative">
                                {searchOpen ? (
                                    <div className="relative">
                                        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                                        <input
                                            ref={searchInputRef}
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder="Search projects..."
                                            autoFocus
                                            className="w-48 sm:w-64 pl-9 pr-8 py-2 bg-gray-900/90 border border-gray-700 focus:border-cyan-500/50 text-white rounded-xl text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-cyan-500/20 transition-all"
                                        />
                                        <button
                                            onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                                        >
                                            <X size={14} />
                                        </button>

                                        {/* Search Results Dropdown */}
                                        {searchQuery.trim().length > 0 && (
                                            <div className="absolute top-full mt-2 right-0 w-72 sm:w-80 bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl shadow-black/40 overflow-hidden animate-in">
                                                {searchResults.length > 0 ? (
                                                    <>
                                                        <p className="text-gray-500 text-xs px-4 pt-3 pb-1">
                                                            {searchResults.length} result{searchResults.length !== 1 ? "s" : ""}
                                                        </p>
                                                        {searchResults.map((project) => (
                                                            <button
                                                                key={project.id}
                                                                onClick={() => handleSearchSelect(project.slug)}
                                                                className="w-full text-left px-4 py-3 hover:bg-white/5 transition-colors flex items-center gap-3 group"
                                                            >
                                                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${project.technology === "ESP32" ? "bg-red-500/10" : "bg-cyan-500/10"}`}>
                                                                    <Cpu size={14} className={project.technology === "ESP32" ? "text-red-400" : "text-cyan-400"} />
                                                                </div>
                                                                <div className="min-w-0">
                                                                    <p className="text-white text-sm font-medium truncate group-hover:text-cyan-400 transition-colors">{project.title}</p>
                                                                    <p className="text-gray-500 text-xs truncate">{project.subject} · ₹{project.price}</p>
                                                                </div>
                                                            </button>
                                                        ))}
                                                        <Link
                                                            href="/projects"
                                                            onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                                                            className="block w-full text-center text-cyan-400 text-xs font-semibold py-3 border-t border-gray-800 hover:bg-white/5 transition-colors"
                                                        >
                                                            View all projects →
                                                        </Link>
                                                    </>
                                                ) : (
                                                    <div className="px-4 py-6 text-center">
                                                        <p className="text-gray-400 text-sm">No projects found</p>
                                                        <p className="text-gray-600 text-xs mt-1">Try a different search term</p>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => { setSearchOpen(true); setTimeout(() => searchInputRef.current?.focus(), 50); }}
                                        className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 text-gray-400 rounded-xl hover:bg-white/10 hover:border-white/20 hover:text-white transition-all duration-300 text-sm"
                                    >
                                        <Search size={15} />
                                        <span className="hidden sm:inline text-xs text-gray-600">Search</span>
                                        <kbd className="hidden sm:inline text-[10px] text-gray-600 bg-gray-800 px-1.5 py-0.5 rounded font-mono ml-1">⌘K</kbd>
                                    </button>
                                )}
                            </div>

                            {/* Login / User */}
                            {isLoggedIn && user ? (
                                <div className="relative" ref={userMenuRef}>
                                    <button
                                        onClick={() => setShowUserMenu(!showUserMenu)}
                                        className="flex items-center gap-2 pl-1.5 pr-3 py-1.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                                    >
                                        {user.avatar ? (
                                            <img src={user.avatar} alt={user.name} className="w-7 h-7 rounded-lg object-cover" referrerPolicy="no-referrer" />
                                        ) : (
                                            <div className="w-7 h-7 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                                                {user.name.charAt(0).toUpperCase()}
                                            </div>
                                        )}
                                        <span className="hidden sm:inline text-sm text-gray-300 font-medium max-w-[100px] truncate">{user.name}</span>
                                        <ChevronDown size={14} className={`text-gray-500 transition-transform duration-200 ${showUserMenu ? "rotate-180" : ""}`} />
                                    </button>

                                    {/* User dropdown */}
                                    {showUserMenu && (
                                        <div className="absolute right-0 top-full mt-2 w-56 bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl shadow-black/30 py-2 animate-in">
                                            <div className="px-4 py-3 border-b border-gray-800 flex items-center gap-3">
                                                {user.avatar ? (
                                                    <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-xl object-cover" referrerPolicy="no-referrer" />
                                                ) : (
                                                    <div className="w-9 h-9 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-xl flex items-center justify-center text-white text-sm font-bold">
                                                        {user.name.charAt(0).toUpperCase()}
                                                    </div>
                                                )}
                                                <div className="min-w-0">
                                                    <p className="text-white text-sm font-semibold truncate">{user.name}</p>
                                                    <p className="text-gray-500 text-xs truncate">{user.email}</p>
                                                </div>
                                            </div>
                                            <Link
                                                href="/cart"
                                                onClick={() => setShowUserMenu(false)}
                                                className="flex items-center gap-3 px-4 py-2.5 text-gray-400 hover:text-white hover:bg-white/5 text-sm transition-colors"
                                            >
                                                <ShoppingCart size={15} />
                                                My Cart
                                                {totalItems > 0 && (
                                                    <span className="ml-auto text-xs bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded-full font-bold">{totalItems}</span>
                                                )}
                                            </Link>
                                            <Link
                                                href="/orders"
                                                onClick={() => setShowUserMenu(false)}
                                                className="flex items-center gap-3 px-4 py-2.5 text-gray-400 hover:text-white hover:bg-white/5 text-sm transition-colors"
                                            >
                                                <Package size={15} />
                                                My Orders
                                            </Link>
                                            {/* Theme Toggle */}
                                            <div className="px-4 py-2 border-t border-gray-800">
                                                <p className="text-gray-500 text-xs mb-2 font-medium">Theme</p>
                                                <div className="flex items-center gap-1 bg-gray-800/60 rounded-lg p-1">
                                                    {([
                                                        { value: "light" as const, icon: Sun, label: "Light" },
                                                        { value: "dark" as const, icon: Moon, label: "Dark" },
                                                        { value: "system" as const, icon: Monitor, label: "System" },
                                                    ]).map(({ value, icon: Icon, label }) => (
                                                        <button
                                                            key={value}
                                                            onClick={() => setTheme(value)}
                                                            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs font-medium transition-all ${theme === value
                                                                ? "bg-cyan-500/20 text-cyan-400"
                                                                : "text-gray-500 hover:text-gray-300"
                                                                }`}
                                                        >
                                                            <Icon size={13} />
                                                            {label}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-400 hover:text-red-400 hover:bg-red-500/5 text-sm transition-colors"
                                            >
                                                <LogOut size={15} />
                                                Sign Out
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <>
                                    {/* Theme cycle button (when not logged in) */}
                                    <button
                                        onClick={() => setTheme(theme === "dark" ? "light" : theme === "light" ? "system" : "dark")}
                                        className="p-2 bg-white/5 border border-white/10 text-gray-400 rounded-xl hover:bg-white/10 hover:border-white/20 hover:text-white transition-all duration-300"
                                        title={`Theme: ${theme}`}
                                    >
                                        {theme === "light" ? <Sun size={16} /> : theme === "dark" ? <Moon size={16} /> : <Monitor size={16} />}
                                    </button>
                                    <button
                                        onClick={() => setShowLoginModal(true)}
                                        className="flex items-center gap-2 px-3.5 py-2 bg-white/5 border border-white/10 text-gray-300 rounded-xl hover:bg-white/10 hover:border-white/20 hover:text-white transition-all duration-300 text-sm font-medium"
                                    >
                                        <User size={16} />
                                        <span className="hidden sm:inline">Login</span>
                                    </button>
                                </>
                            )}

                            {/* Cart */}
                            <Link
                                href="/cart"
                                className="relative flex items-center gap-2 px-3.5 py-2 bg-white/5 border border-white/10 text-gray-300 rounded-xl hover:bg-cyan-500/10 hover:border-cyan-500/30 hover:text-cyan-400 transition-all duration-300 group"
                            >
                                <ShoppingCart size={17} className="group-hover:scale-110 transition-transform duration-300" />
                                <span className="hidden sm:inline text-sm font-medium">Cart</span>
                                {totalItems > 0 && (
                                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-br from-orange-400 to-orange-600 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg shadow-orange-500/30 ring-2 ring-gray-950">
                                        {totalItems}
                                    </span>
                                )}
                            </Link>

                            {/* Mobile menu toggle */}
                            <button
                                onClick={() => setMenuOpen(!menuOpen)}
                                className="md:hidden p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                            >
                                {menuOpen ? <X size={20} /> : <Menu size={20} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                {menuOpen && (
                    <div className="md:hidden bg-gray-950/95 backdrop-blur-xl border-t border-white/10 px-4 py-3 flex flex-col gap-1">
                        {/* Mobile search */}
                        <div className="relative mb-2">
                            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search projects..."
                                className="w-full pl-9 pr-4 py-3 bg-gray-900/80 border border-gray-800 text-white rounded-xl text-sm placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/50"
                            />
                        </div>
                        {searchQuery.trim() && searchResults.length > 0 && (
                            <div className="mb-2 bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                                {searchResults.map((p) => (
                                    <Link
                                        key={p.id}
                                        href={`/projects/${p.slug}`}
                                        onClick={() => { setMenuOpen(false); setSearchQuery(""); }}
                                        className="block px-4 py-2.5 text-sm text-gray-300 hover:text-cyan-400 hover:bg-white/5 transition-colors"
                                    >
                                        {p.title} <span className="text-gray-600">· ₹{p.price}</span>
                                    </Link>
                                ))}
                            </div>
                        )}
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMenuOpen(false)}
                                className="px-4 py-3 text-gray-300 hover:text-cyan-400 hover:bg-white/5 rounded-xl text-sm font-medium transition-all"
                            >
                                {link.label}
                            </Link>
                        ))}
                        {/* Mobile Categories */}
                        <button
                            onClick={() => setMobileCategories(!mobileCategories)}
                            className="flex items-center justify-between px-4 py-3 text-gray-300 hover:text-cyan-400 hover:bg-white/5 rounded-xl text-sm font-medium transition-all w-full text-left"
                        >
                            Categories
                            <ChevronDown size={14} className={`transition-transform duration-200 ${mobileCategories ? 'rotate-180' : ''}`} />
                        </button>
                        {mobileCategories && (
                            <div className="ml-4 flex flex-col gap-0.5 border-l-2 border-gray-800 pl-2">
                                {categories.map((cat) => {
                                    const c = categoryColors[cat] || { dot: "bg-gray-500", text: "text-gray-400" };
                                    return (
                                        <Link
                                            key={cat}
                                            href={`/projects#${cat}`}
                                            onClick={() => { setMenuOpen(false); setMobileCategories(false); }}
                                            className="flex items-center gap-2.5 px-3 py-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg text-sm transition-all"
                                        >
                                            <span className={`w-2 h-2 rounded-full ${c.dot}`} />
                                            <span className={c.text}>{cat}</span>
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                        <Link
                            href="/cart"
                            onClick={() => setMenuOpen(false)}
                            className="px-4 py-3 text-gray-300 hover:text-cyan-400 hover:bg-white/5 rounded-xl text-sm font-medium transition-all"
                        >
                            Cart {totalItems > 0 && `(${totalItems})`}
                        </Link>
                        {!isLoggedIn && (
                            <button
                                onClick={() => { setMenuOpen(false); setShowLoginModal(true); }}
                                className="px-4 py-3 text-gray-300 hover:text-cyan-400 hover:bg-white/5 rounded-xl text-sm font-medium transition-all text-left"
                            >
                                Login / Sign Up
                            </button>
                        )}
                        {isLoggedIn && (
                            <button
                                onClick={() => { handleLogout(); setMenuOpen(false); }}
                                className="px-4 py-3 text-gray-300 hover:text-red-400 hover:bg-red-500/5 rounded-xl text-sm font-medium transition-all text-left"
                            >
                                Sign Out
                            </button>
                        )}
                    </div>
                )}
            </nav>

            {/* Login Modal */}
            {showLoginModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowLoginModal(false)} />
                    <div className="relative bg-gray-900 border border-gray-700 rounded-3xl max-w-sm w-full p-8 shadow-2xl shadow-cyan-500/10 animate-in">
                        {/* Close */}
                        <button
                            onClick={() => setShowLoginModal(false)}
                            className="absolute top-4 right-4 p-2 text-gray-500 hover:text-white transition-colors rounded-lg hover:bg-gray-800"
                        >
                            <X size={20} />
                        </button>

                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="w-14 h-14 bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 border border-cyan-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <User size={28} className="text-cyan-400" />
                            </div>
                            <h2 className="text-2xl font-black text-white mb-1">Welcome</h2>
                            <p className="text-gray-400 text-sm">Sign in to track your orders and save favorites</p>
                        </div>

                        {/* Google Login */}
                        <button
                            onClick={handleGoogleLogin}
                            disabled={loginLoading}
                            className="w-full flex items-center justify-center gap-3 py-3.5 bg-white text-gray-800 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-200 hover:scale-[1.02] shadow-lg text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loginLoading ? (
                                <div className="w-5 h-5 border-2 border-gray-400 border-t-gray-800 rounded-full animate-spin" />
                            ) : (
                                <GoogleIcon size={20} />
                            )}
                            {loginLoading ? "Signing in..." : "Continue with Google"}
                        </button>

                        {/* Terms */}
                        <p className="text-gray-600 text-xs text-center mt-6 leading-relaxed">
                            By continuing, you agree to our Terms of Service and Privacy Policy
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}
