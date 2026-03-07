import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAQ7w85qaa2ug7KjPED_ytXRSSZs7EFSYs",
    authDomain: "electro-project-store.firebaseapp.com",
    projectId: "electro-project-store",
    storageBucket: "electro-project-store.firebasestorage.app",
    messagingSenderId: "540913033631",
    appId: "1:540913033631:web:e5c3197131dc0b988cddaa",
    measurementId: "G-CX1NLB71C9",
};

// Initialize once
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

// Pre-configure Google provider for faster login
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account", // Always show account picker (faster UX)
});
