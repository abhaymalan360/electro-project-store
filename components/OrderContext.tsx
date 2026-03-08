"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { db } from "@/lib/firebase";
import {
    collection,
    addDoc,
    query,
    where,
    onSnapshot,
    orderBy,
    updateDoc,
    doc,
    getDoc,
    deleteDoc,
    Timestamp,
    setDoc
} from "firebase/firestore";
import { useAuth } from "./AuthContext";
import { Project } from "@/data/projects";

export interface CartItem {
    project: Project;
    quantity: number;
}

export type OrderStatus = "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";

export interface Order {
    id: string;
    userId: string;
    userEmail: string;
    items: CartItem[];
    totalPrice: number;
    status: OrderStatus;
    createdAt: string;
    deliveryInfo: {
        name: string;
        phone: string;
        address: string;
    };
    statusHistory: {
        status: OrderStatus;
        timestamp: string;
        message: string;
    }[];
    rating?: number;
    feedback?: string;
    ratedAt?: string;
}

interface OrderContextType {
    orders: Order[];
    allOrders: Order[]; // For Admin
    placeOrder: (items: CartItem[], totalPrice: number, deliveryInfo: Order["deliveryInfo"]) => Promise<string>;
    updateOrderStatus: (orderId: string, newStatus: OrderStatus, message: string) => Promise<void>;
    submitOrderFeedback: (orderId: string, rating: number, feedback: string) => Promise<void>;
    deleteOrder: (orderId: string) => Promise<void>;
    loading: boolean;
    error: string | null;
    allOrdersError: string | null;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
    const { user, isAdmin } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [allOrders, setAllOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [allOrdersError, setAllOrdersError] = useState<string | null>(null);

    // Fetch user-specific orders
    useEffect(() => {
        if (!user) {
            setOrders([]);
            setLoading(false);
            return;
        }

        const q = query(
            collection(db, "orders"),
            where("userEmail", "==", user.email)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedOrders = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as Order));

            // Sort locally to bypass Firestore Index requirement
            const sortedOrders = fetchedOrders.sort((a, b) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );

            setOrders(sortedOrders);
            setLoading(false);
            setError(null);
        }, (error) => {
            console.error("Error fetching orders:", error);
            setError("Failed to sync your orders. Please check your internet connection.");
            setLoading(false);
        });

        return () => unsubscribe();
    }, [user]);

    // Fetch ALL orders (only if Admin)
    useEffect(() => {
        if (!isAdmin) {
            setAllOrders([]);
            return;
        }

        const q = query(
            collection(db, "orders"),
            orderBy("createdAt", "desc")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedOrders = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as Order));
            setAllOrders(fetchedOrders);
            setAllOrdersError(null);
        }, (error) => {
            console.error("Error fetching all orders:", error);
            setAllOrdersError("Failed to fetch all orders. Check Firestore rules or missing indexes.");
        });

        return () => unsubscribe();
    }, [isAdmin]);

    const placeOrder = useCallback(
        async (items: CartItem[], totalPrice: number, deliveryInfo: Order["deliveryInfo"]): Promise<string> => {
            if (!user) throw new Error("Must be logged in to place an order");

            try {
                const now = new Date().toISOString();

                // Clean up items for Firestore (Firestore doesn't like some custom objects)
                const cleanItems = items.map(item => ({
                    quantity: item.quantity,
                    project: {
                        id: item.project.id,
                        title: item.project.title,
                        price: item.project.price,
                        technology: item.project.technology
                    }
                }));

                // FIX: Generate ID locally so we don't have to wait for the server
                const orderRef = doc(collection(db, "orders"));
                const orderId = orderRef.id;

                const orderData = {
                    userId: user.uid, // Cleanly use uid now
                    userEmail: user.email,
                    items: cleanItems,
                    totalPrice,
                    status: "pending" as OrderStatus,
                    createdAt: now,
                    deliveryInfo,
                    statusHistory: [
                        {
                            status: "pending" as OrderStatus,
                            timestamp: now,
                            message: "Order placed successfully. Awaiting WhatsApp confirmation for payment and delivery details.",
                        },
                    ],
                };

                console.log("Placing order with local ID:", orderId, orderData);

                // We await for a max of 3 seconds to ensure the write starts
                await Promise.race([
                    setDoc(orderRef, orderData),
                    new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 3000))
                ]).catch(err => {
                    console.warn("Background save initial attempt timed out or failed, but continuing UI flow.", err);
                });

                // Return ID immediately to move to next screen
                return orderId;
            } catch (error: any) {
                console.error("Error in placeOrder:", error);
                throw error;
            }
        },
        [user]
    );

    const updateOrderStatus = useCallback(async (orderId: string, newStatus: OrderStatus, message: string) => {
        if (!isAdmin) throw new Error("Only admins can update order status");

        const orderRef = doc(db, "orders", orderId);
        const orderSnap = await getDoc(orderRef);

        if (orderSnap.exists()) {
            const currentHistory = orderSnap.data().statusHistory || [];
            await updateDoc(orderRef, {
                status: newStatus,
                statusHistory: [
                    ...currentHistory,
                    {
                        status: newStatus,
                        timestamp: new Date().toISOString(),
                        message: message
                    }
                ]
            });
        }
    }, [isAdmin]);

    const deleteOrder = useCallback(async (orderId: string) => {
        if (!isAdmin) throw new Error("Only admins can delete orders");
        const orderRef = doc(db, "orders", orderId);
        await deleteDoc(orderRef);
    }, [isAdmin]);

    const submitOrderFeedback = useCallback(async (orderId: string, rating: number, feedback: string) => {
        const orderRef = doc(db, "orders", orderId);
        await updateDoc(orderRef, {
            rating,
            feedback,
            ratedAt: new Date().toISOString()
        });
    }, []);

    return (
        <OrderContext.Provider value={{
            orders,
            allOrders,
            placeOrder,
            updateOrderStatus,
            deleteOrder,
            submitOrderFeedback,
            loading,
            error,
            allOrdersError
        }}>
            {children}
        </OrderContext.Provider>
    );
}

export function useOrders() {
    const ctx = useContext(OrderContext);
    if (!ctx) throw new Error("useOrders must be used within OrderProvider");
    return ctx;
}
