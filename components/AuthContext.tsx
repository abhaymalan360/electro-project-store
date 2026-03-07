"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { auth, googleProvider } from "@/lib/firebase";
import {
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    User as FirebaseUser,
} from "firebase/auth";

export interface User {
    name: string;
    email: string;
    avatar?: string;
}

interface AuthContextType {
    user: User | null;
    isLoggedIn: boolean;
    loading: boolean;
    loginWithGoogle: () => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function firebaseUserToUser(fbUser: FirebaseUser): User {
    return {
        name: fbUser.displayName || "User",
        email: fbUser.email || "",
        avatar: fbUser.photoURL || undefined,
    };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Listen for auth state changes (session persists across refreshes)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
            setUser(fbUser ? firebaseUserToUser(fbUser) : null);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const loginWithGoogle = useCallback(async () => {
        try {
            // Set a timeout to detect if popup is blocked
            const timeoutId = setTimeout(() => {
                console.warn("Login popup may be blocked by browser. Allow popups for this site.");
            }, 3000);

            const result = await signInWithPopup(auth, googleProvider);
            clearTimeout(timeoutId);
            setUser(firebaseUserToUser(result.user));
        } catch (error: any) {
            if (error.code === "auth/popup-blocked") {
                alert("Popup was blocked! Please allow popups for this site in your browser settings.");
            } else if (error.code === "auth/popup-closed-by-user") {
                // User closed the popup - do nothing
            } else if (error.code !== "auth/cancelled-popup-request") {
                console.error("Google login error:", error.code, error.message);
            }
        }
    }, []);

    const logout = useCallback(async () => {
        try {
            await signOut(auth);
            setUser(null);
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, isLoggedIn: !!user, loading, loginWithGoogle, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
