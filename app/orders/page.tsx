"use client";

import { useOrders, OrderStatus } from "@/components/OrderContext";
import Link from "next/link";
import { Package, Clock, CheckCircle2, Truck, MapPin, ArrowLeft, ShoppingCart, ChevronRight, Search } from "lucide-react";
import { useState } from "react";

const statusConfig: Record<OrderStatus, { label: string; color: string; bg: string; border: string; icon: typeof Clock; step: number }> = {
    pending: { label: "Pending", color: "text-yellow-400", bg: "bg-yellow-500/15", border: "border-yellow-500/30", icon: Clock, step: 1 },
    confirmed: { label: "Confirmed", color: "text-blue-400", bg: "bg-blue-500/15", border: "border-blue-500/30", icon: CheckCircle2, step: 2 },
    shipped: { label: "Shipped", color: "text-purple-400", bg: "bg-purple-500/15", border: "border-purple-500/30", icon: Truck, step: 3 },
    delivered: { label: "Delivered", color: "text-green-400", bg: "bg-green-500/15", border: "border-green-500/30", icon: MapPin, step: 4 },
};

const allSteps: { status: OrderStatus; label: string }[] = [
    { status: "pending", label: "Order Placed" },
    { status: "confirmed", label: "Confirmed" },
    { status: "shipped", label: "Shipped" },
    { status: "delivered", label: "Delivered" },
];

function formatDate(iso: string) {
    const d = new Date(iso);
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function formatTime(iso: string) {
    const d = new Date(iso);
    return d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
}

export default function OrdersPage() {
    const { orders } = useOrders();
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const selectedOrder = selectedOrderId ? orders.find((o) => o.id === selectedOrderId) : null;

    const filteredOrders = searchQuery.trim()
        ? orders.filter(
            (o) =>
                o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                o.items.some((i) => i.project.title.toLowerCase().includes(searchQuery.toLowerCase()))
        )
        : orders;

    if (orders.length === 0) {
        return (
            <main className="min-h-screen bg-gray-950 text-white pt-24 pb-20 flex items-center justify-center">
                <div className="text-center px-4">
                    <div className="w-24 h-24 bg-gray-900 border border-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Package size={36} className="text-gray-600" />
                    </div>
                    <h1 className="text-2xl font-black text-white mb-2">No orders yet</h1>
                    <p className="text-gray-400 mb-8">Place your first order to see it here!</p>
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 text-gray-950 font-bold rounded-xl hover:bg-cyan-400 transition-all"
                    >
                        <ShoppingCart size={16} />
                        Browse Projects
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gray-950 text-white pt-24 pb-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 text-sm mb-4 transition-colors group"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Continue Shopping
                    </Link>
                    <p className="text-cyan-400 text-sm font-mono mb-2 tracking-wider">// your orders</p>
                    <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">
                        Order Tracking
                    </h1>
                    <p className="text-gray-400">Track the status of your {orders.length} order{orders.length !== 1 ? "s" : ""}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Orders List */}
                    <div className="lg:col-span-1 space-y-3">
                        {/* Search */}
                        <div className="relative mb-2">
                            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by order ID..."
                                className="w-full pl-9 pr-4 py-3 bg-gray-900/80 border border-gray-800 text-white rounded-xl text-sm placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/50 transition-all"
                            />
                        </div>

                        {filteredOrders.map((order) => {
                            const sc = statusConfig[order.status];
                            const StatusIcon = sc.icon;
                            const isActive = selectedOrderId === order.id;
                            return (
                                <button
                                    key={order.id}
                                    onClick={() => setSelectedOrderId(order.id)}
                                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 ${isActive
                                            ? "bg-gray-900 border-cyan-500/30 shadow-lg shadow-cyan-500/5"
                                            : "bg-gray-900/50 border-gray-800 hover:border-gray-700 hover:bg-gray-900"
                                        }`}
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <p className="text-white font-bold text-sm font-mono">{order.id}</p>
                                            <p className="text-gray-500 text-xs mt-0.5">{formatDate(order.createdAt)} · {formatTime(order.createdAt)}</p>
                                        </div>
                                        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${sc.bg} ${sc.border} ${sc.color} border`}>
                                            <StatusIcon size={12} />
                                            {sc.label}
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p className="text-gray-400 text-xs truncate max-w-[180px]">
                                            {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                                            {order.items.length <= 2 && ": " + order.items.map((i) => i.project.title).join(", ")}
                                        </p>
                                        <div className="flex items-center gap-1">
                                            <span className="text-cyan-400 font-bold text-sm">₹{order.totalPrice}</span>
                                            <ChevronRight size={14} className="text-gray-600" />
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Order Detail */}
                    <div className="lg:col-span-2">
                        {selectedOrder ? (
                            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8">
                                {/* Order header */}
                                <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
                                    <div>
                                        <p className="text-gray-500 text-xs font-medium mb-1">ORDER ID</p>
                                        <h2 className="text-xl font-black text-white font-mono">{selectedOrder.id}</h2>
                                        <p className="text-gray-500 text-sm mt-1">
                                            Placed on {formatDate(selectedOrder.createdAt)} at {formatTime(selectedOrder.createdAt)}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-gray-500 text-xs font-medium mb-1">TOTAL</p>
                                        <p className="text-2xl font-black text-cyan-400">₹{selectedOrder.totalPrice}</p>
                                    </div>
                                </div>

                                {/* Status Timeline */}
                                <div className="mb-8">
                                    <h3 className="text-sm font-bold text-white mb-5 flex items-center gap-2">
                                        <Truck size={15} className="text-cyan-400" />
                                        Order Status
                                    </h3>

                                    <div className="flex items-center justify-between mb-6">
                                        {allSteps.map((step, i) => {
                                            const currentStep = statusConfig[selectedOrder.status].step;
                                            const stepNum = i + 1;
                                            const isComplete = stepNum < currentStep;
                                            const isCurrent = stepNum === currentStep;
                                            const isPending = stepNum > currentStep;
                                            const sc = statusConfig[step.status];
                                            const StepIcon = sc.icon;

                                            return (
                                                <div key={step.status} className="flex items-center flex-1 last:flex-initial">
                                                    <div className="flex flex-col items-center">
                                                        <div
                                                            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border-2 transition-all ${isComplete
                                                                    ? "bg-green-500/20 border-green-500 text-green-400"
                                                                    : isCurrent
                                                                        ? `${sc.bg} ${sc.border} ${sc.color} ring-4 ring-${step.status === "pending" ? "yellow" : step.status === "confirmed" ? "blue" : step.status === "shipped" ? "purple" : "green"}-500/10`
                                                                        : "bg-gray-800/50 border-gray-700 text-gray-600"
                                                                }`}
                                                        >
                                                            {isComplete ? (
                                                                <CheckCircle2 size={20} />
                                                            ) : (
                                                                <StepIcon size={18} />
                                                            )}
                                                        </div>
                                                        <p className={`text-xs font-semibold mt-2 text-center ${isComplete ? "text-green-400" : isCurrent ? sc.color : "text-gray-600"
                                                            }`}>
                                                            {step.label}
                                                        </p>
                                                    </div>
                                                    {i < allSteps.length - 1 && (
                                                        <div className={`flex-1 h-0.5 mx-2 mt-[-20px] rounded-full ${stepNum < currentStep ? "bg-green-500/50" : "bg-gray-800"
                                                            }`} />
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Status History */}
                                <div className="mb-8">
                                    <h3 className="text-sm font-bold text-white mb-4">Activity Log</h3>
                                    <div className="space-y-0">
                                        {selectedOrder.statusHistory.map((entry, i) => {
                                            const sc = statusConfig[entry.status];
                                            const EntryIcon = sc.icon;
                                            return (
                                                <div key={i} className="flex gap-4">
                                                    <div className="flex flex-col items-center">
                                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${sc.bg} border ${sc.border} flex-shrink-0`}>
                                                            <EntryIcon size={14} className={sc.color} />
                                                        </div>
                                                        {i < selectedOrder.statusHistory.length - 1 && (
                                                            <div className="w-px h-full min-h-[40px] bg-gray-800 my-1" />
                                                        )}
                                                    </div>
                                                    <div className="pb-5">
                                                        <p className={`text-sm font-semibold ${sc.color}`}>{sc.label}</p>
                                                        <p className="text-gray-400 text-sm mt-0.5">{entry.message}</p>
                                                        <p className="text-gray-600 text-xs mt-1">
                                                            {formatDate(entry.timestamp)} · {formatTime(entry.timestamp)}
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Delivery Info */}
                                <div className="mb-8">
                                    <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                                        <MapPin size={15} className="text-cyan-400" />
                                        Delivery Details
                                    </h3>
                                    <div className="bg-gray-800/40 border border-gray-700/50 rounded-xl p-4">
                                        <p className="text-white font-semibold text-sm">{selectedOrder.deliveryInfo.name}</p>
                                        <p className="text-gray-400 text-sm">{selectedOrder.deliveryInfo.phone}</p>
                                        <p className="text-gray-500 text-sm mt-1">{selectedOrder.deliveryInfo.address}</p>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div>
                                    <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                                        <Package size={15} className="text-cyan-400" />
                                        Items ({selectedOrder.items.length})
                                    </h3>
                                    <div className="space-y-2">
                                        {selectedOrder.items.map(({ project, quantity }) => (
                                            <div key={project.id} className="flex items-center justify-between py-3 px-4 bg-gray-800/30 rounded-xl">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${project.technology === "ESP32" ? "bg-red-500/10 border border-red-500/20" : "bg-cyan-500/10 border border-cyan-500/20"
                                                        }`}>
                                                        <Package size={16} className={project.technology === "ESP32" ? "text-red-400" : "text-cyan-400"} />
                                                    </div>
                                                    <div>
                                                        <p className="text-white text-sm font-medium">{project.title}</p>
                                                        <p className="text-gray-500 text-xs">{project.technology} · Qty: {quantity}</p>
                                                    </div>
                                                </div>
                                                <span className="text-white font-bold text-sm">₹{project.price * quantity}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-12 text-center">
                                <div className="w-16 h-16 bg-gray-800 border border-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <Package size={28} className="text-gray-600" />
                                </div>
                                <h3 className="text-white font-bold text-lg mb-1">Select an order</h3>
                                <p className="text-gray-500 text-sm">Click on an order from the left to see its details and tracking status</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
