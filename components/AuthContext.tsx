"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { auth, googleProvider } from "@/lib/firebase";
import {
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    setPersistence,
    browserLocalPersistence,
    User as FirebaseUser,
    signInWithPhoneNumber,
    sendSignInLinkToEmail,
    isSignInWithEmailLink,
    signInWithEmailLink,
} from "firebase/auth";

export interface User {
    uid: string;
    name: string;
    email: string;
    phoneNumber?: string;
    avatar?: string;
}

interface AuthContextType {
    user: User | null;
    isLoggedIn: boolean;
    loading: boolean;
    isAdmin: boolean;
    loginWithGoogle: () => Promise<void>;
    loginWithPhone: (phoneNumber: string, recaptchaVerifier: any) => Promise<any>;
    verifyPhoneOTP: (verificationInstance: any, code: string) => Promise<void>;
    sendEmailLink: (email: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function firebaseUserToUser(fbUser: FirebaseUser): User {
    return {
        uid: fbUser.uid,
        name: fbUser.displayName || "User",
        email: fbUser.email || "",
        avatar: fbUser.photoURL || undefined,
    };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    const ADMIN_EMAIL = "abhaymalan360@gmail.com";

    // Listen for auth state changes (session persists across refreshes)
    useEffect(() => {
        // Handle Email Link redirection
        if (typeof window !== "undefined" && isSignInWithEmailLink(auth, window.location.href)) {
            let email = window.localStorage.getItem('emailForSignIn');
            if (!email) {
                email = window.prompt('Please provide your email for confirmation');
            }
            if (email) {
                signInWithEmailLink(auth, email, window.location.href)
                    .then(() => {
                        window.localStorage.removeItem('emailForSignIn');
                        // Remove search params from URL
                        window.history.replaceState({}, document.title, window.location.pathname);
                    })
                    .catch((error) => {
                        console.error("Email link sign in error:", error);
                    });
            }
        }

        const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
            if (fbUser) {
                setUser(firebaseUserToUser(fbUser));
                setIsAdmin(fbUser.email === ADMIN_EMAIL);
            } else {
                setUser(null);
                setIsAdmin(false);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const loginWithGoogle = useCallback(async () => {
        // Check if API key is configured
        if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY || process.env.NEXT_PUBLIC_FIREBASE_API_KEY === "YOUR_FIREBASE_API_KEY_HERE") {
            alert("Firebase API Key is missing! Please add it to your .env.local file.");
            return;
        }

        try {
            // Set a timeout to detect if popup is blocked
            const popupTimeoutId = setTimeout(() => {
                console.warn("Login popup may be blocked by browser. Allow popups for this site.");
            }, 3000);

            // Set a longer timeout for the "taking too much time" issue
            const hangTimeoutId = setTimeout(() => {
                alert("The login is taking longer than expected. This usually happens if the Google Cloud API restrictions aren't fully set yet. Please double-check your API Key settings as instructed earlier.");
            }, 15000);

            // Ensure persistence is set to local (stays logged in after refresh/closing browser)
            await setPersistence(auth, browserLocalPersistence);

            const result = await signInWithPopup(auth, googleProvider);
            clearTimeout(popupTimeoutId);
            clearTimeout(hangTimeoutId);
            const loggedInUser = firebaseUserToUser(result.user);
            setUser(loggedInUser);
            setIsAdmin(result.user.email === ADMIN_EMAIL);
        } catch (error: any) {
            if (error.code === "auth/popup-blocked") {
                alert("Popup was blocked! Please allow popups for this site in your browser settings.");
            } else if (error.code === "auth/popup-closed-by-user") {
                // User closed the popup - do nothing
            } else if (error.code === "auth/api-key-not-valid") {
                alert("The Firebase API Key provided is invalid. Please check your .env.local configuration.");
            } else if (error.code !== "auth/cancelled-popup-request") {
                console.error("Firebase Auth Error Details:", {
                    code: error.code,
                    message: error.message,
                    customData: error.customData,
                    email: error.customData?.email
                });
                alert(`Login failed: ${error.message} (Error Code: ${error.code})`);
            }
        }
    }, []);

    const loginWithPhone = useCallback(async (phoneNumber: string, recaptchaVerifier: any) => {
        try {
            await setPersistence(auth, browserLocalPersistence);
            const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
            return confirmationResult;
        } catch (error: any) {
            console.error("Phone login initiation failed:", error);
            throw error;
        }
    }, []);

    const verifyPhoneOTP = useCallback(async (confirmationResult: any, code: string) => {
        try {
            const result = await confirmationResult.confirm(code);
            setUser(firebaseUserToUser(result.user));
            setIsAdmin(result.user.email === ADMIN_EMAIL);
        } catch (error: any) {
            console.error("OTP verification failed:", error);
            throw error;
        }
    }, []);

    const sendEmailLink = useCallback(async (email: string) => {
        const actionCodeSettings = {
            url: window.location.origin + "/login-callback", // Using a specific callback route
            handleCodeInApp: true,
        };
        try {
            await sendSignInLinkToEmail(auth, email, actionCodeSettings);
            window.localStorage.setItem('emailForSignIn', email);
        } catch (error: any) {
            console.error("Send email link failed:", error);
            throw error;
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
        <AuthContext.Provider value={{
            user,
            isLoggedIn: !!user,
            isAdmin,
            loading,
            loginWithGoogle,
            loginWithPhone,
            verifyPhoneOTP,
            sendEmailLink,
            logout
        }}>
            {children}
            <div id="recaptcha-container"></div>
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
