"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { CartItem } from "./CartContext";

export type OrderStatus = "pending" | "confirmed" | "shipped" | "delivered";

export interface Order {
    id: string;
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
}

interface OrderContextType {
    orders: Order[];
    placeOrder: (items: CartItem[], totalPrice: number, deliveryInfo: Order["deliveryInfo"]) => string;
    getOrder: (id: string) => Order | undefined;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

function generateOrderId(): string {
    const prefix = "EPS";
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `${prefix}-${timestamp}-${random}`;
}

export function OrderProvider({ children }: { children: React.ReactNode }) {
    const [orders, setOrders] = useState<Order[]>([]);

    const placeOrder = useCallback(
        (items: CartItem[], totalPrice: number, deliveryInfo: Order["deliveryInfo"]): string => {
            const id = generateOrderId();
            const now = new Date().toISOString();

            const newOrder: Order = {
                id,
                items: [...items],
                totalPrice,
                status: "pending",
                createdAt: now,
                deliveryInfo,
                statusHistory: [
                    {
                        status: "pending",
                        timestamp: now,
                        message: "Order placed successfully. Awaiting payment confirmation.",
                    },
                ],
            };

            setOrders((prev) => [newOrder, ...prev]);

            // Simulate status updates for demo purposes
            setTimeout(() => {
                setOrders((prev) =>
                    prev.map((o) =>
                        o.id === id
                            ? {
                                ...o,
                                status: "confirmed" as OrderStatus,
                                statusHistory: [
                                    ...o.statusHistory,
                                    {
                                        status: "confirmed" as OrderStatus,
                                        timestamp: new Date().toISOString(),
                                        message: "Payment confirmed! Preparing your project kit.",
                                    },
                                ],
                            }
                            : o
                    )
                );
            }, 15000); // 15 seconds

            setTimeout(() => {
                setOrders((prev) =>
                    prev.map((o) =>
                        o.id === id
                            ? {
                                ...o,
                                status: "shipped" as OrderStatus,
                                statusHistory: [
                                    ...o.statusHistory,
                                    {
                                        status: "confirmed" as OrderStatus,
                                        timestamp: new Date(Date.now() - 10000).toISOString(),
                                        message: "Payment confirmed! Preparing your project kit.",
                                    },
                                    {
                                        status: "shipped" as OrderStatus,
                                        timestamp: new Date().toISOString(),
                                        message: "Project kit has been shipped! Estimated delivery: 2-3 days.",
                                    },
                                ],
                            }
                            : o
                    )
                );
            }, 30000); // 30 seconds

            return id;
        },
        []
    );

    const getOrder = useCallback(
        (id: string) => orders.find((o) => o.id === id),
        [orders]
    );

    return (
        <OrderContext.Provider value={{ orders, placeOrder, getOrder }}>
            {children}
        </OrderContext.Provider>
    );
}

export function useOrders() {
    const ctx = useContext(OrderContext);
    if (!ctx) throw new Error("useOrders must be used within OrderProvider");
    return ctx;
}
