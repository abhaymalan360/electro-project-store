"use client";

import { useOrders, OrderStatus } from "@/components/OrderContext";
import Link from "next/link";
import {
    Package,
    Clock,
    CheckCircle2,
    Truck,
    MapPin,
    ArrowLeft,
    ShoppingCart,
    ChevronRight,
    Search,
    XCircle,
    Phone,
    Loader2,
    Star,
    MessageSquare
} from "lucide-react";
import { useState } from "react";

const statusConfig: Record<OrderStatus, { label: string; color: string; bg: string; border: string; icon: typeof Clock; step: number }> = {
    pending: { label: "Pending", color: "text-yellow-400", bg: "bg-yellow-500/15", border: "border-yellow-500/30", icon: Clock, step: 1 },
    confirmed: { label: "Confirmed", color: "text-blue-400", bg: "bg-blue-500/15", border: "border-blue-500/30", icon: CheckCircle2, step: 2 },
    shipped: { label: "Shipped", color: "text-purple-400", bg: "bg-purple-500/15", border: "border-purple-500/30", icon: Truck, step: 3 },
    delivered: { label: "Delivered", color: "text-green-400", bg: "bg-green-500/15", border: "border-green-500/30", icon: MapPin, step: 4 },
    cancelled: { label: "Cancelled", color: "text-red-400", bg: "bg-red-500/15", border: "border-red-500/30", icon: XCircle, step: 0 },
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

function RatingSection({ orderId, currentRating, currentFeedback, onSubmit }: {
    orderId: string,
    currentRating?: number,
    currentFeedback?: string,
    onSubmit: (id: string, r: number, f: string) => Promise<void>
}) {
    const [rating, setRating] = useState(currentRating || 0);
    const [hover, setHover] = useState(0);
    const [feedback, setFeedback] = useState(currentFeedback || "");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(!!currentRating);

    const handleSubmit = async () => {
        if (rating === 0) return;
        setIsSubmitting(true);
        try {
            await onSubmit(orderId, rating, feedback);
            setIsSuccess(true);
        } catch (err) {
            alert("Failed to save review");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="bg-cyan-500/5 border border-cyan-500/10 rounded-2xl p-6 mb-8">
                <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 size={16} className="text-cyan-400" />
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">Your Review</h4>
                </div>
                <div className="flex gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} size={14} className={s <= (currentRating || rating) ? "fill-cyan-400 text-cyan-400" : "text-gray-700"} />
                    ))}
                </div>
                {feedback && <p className="text-gray-400 text-sm italic">"{currentFeedback || feedback}"</p>}
            </div>
        );
    }

    return (
        <div className="bg-gray-900/50 border border-white/5 rounded-3xl p-8 mb-10 glass-morphism animate-fade-in-up relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-700 pointer-events-none">
                <Star size={120} />
            </div>

            <h3 className="text-xs font-black text-gray-500 mb-6 flex items-center gap-2 uppercase tracking-[0.3em] relative z-10">
                <Star size={14} className="text-yellow-400" />
                Customer Experience
            </h3>

            <div className="flex gap-2.5 mb-8 relative z-10">
                {[1, 2, 3, 4, 5].map((s) => (
                    <button
                        key={s}
                        onMouseEnter={() => setHover(s)}
                        onMouseLeave={() => setHover(0)}
                        onClick={() => setRating(s)}
                        className="transition-all duration-300 transform hover:scale-125 hover:-translate-y-1 active:scale-90"
                    >
                        <Star
                            size={36}
                            className={`transition-all duration-500 ${s <= (hover || rating)
                                ? "fill-yellow-400 text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]"
                                : "text-gray-800 hover:text-gray-600"
                                }`}
                        />
                    </button>
                ))}
            </div>

            <div className="mb-6 relative z-10">
                <textarea
                    placeholder="Optional: How was your experience with this project?"
                    className="w-full bg-gray-950/50 border border-white/5 rounded-2xl p-5 text-sm text-white placeholder:text-gray-700 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all min-h-[120px] pro-subtext shadow-inner"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                />
            </div>

            <button
                disabled={rating === 0 || isSubmitting}
                onClick={handleSubmit}
                className="w-full py-3 bg-white text-gray-950 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-cyan-400 transition-all disabled:opacity-50 disabled:bg-gray-800 disabled:text-gray-500 flex items-center justify-center gap-2"
            >
                {isSubmitting ? (
                    <Loader2 size={14} className="animate-spin" />
                ) : (
                    "Submit Review"
                )}
            </button>
        </div>
    );
}

export default function OrdersPage() {
    const { orders, updateOrderStatus, loading, error } = useOrders();
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

    if (loading) {
        return (
            <main className="min-h-screen bg-gray-950 text-white pt-24 pb-20 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 size={40} className="text-cyan-400 animate-spin" />
                    <p className="text-gray-400 animate-pulse">Loading orders...</p>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="min-h-screen bg-gray-950 text-white pt-24 pb-20 flex items-center justify-center">
                <div className="text-center px-4 max-w-md">
                    <div className="w-20 h-20 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <XCircle size={36} className="text-red-500" />
                    </div>
                    <h1 className="text-xl font-black text-white mb-2">Sync Connection Error</h1>
                    <p className="text-gray-400 mb-6 text-sm leading-relaxed">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-2.5 bg-gray-900 border border-gray-800 text-white text-xs font-bold rounded-xl hover:bg-gray-800 transition-all"
                    >
                        Try Reconnecting
                    </button>
                </div>
            </main>
        );
    }

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
                                    className={`w-full text-left p-5 rounded-3xl border transition-all duration-300 glass-morphism ${isActive
                                        ? "border-cyan-500/50 shadow-lg shadow-cyan-500/10 bg-cyan-500/5"
                                        : "border-white/5 hover:border-white/10 hover:bg-white/5 shadow-sm"
                                        }`}
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <p className="text-white font-black text-[10px] font-mono tracking-tighter uppercase opacity-80">#{order.id.substring(0, 8)}</p>
                                            <p className="text-gray-500 text-[10px] font-bold mt-1 uppercase tracking-widest">{formatDate(order.createdAt)}</p>
                                        </div>
                                        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${sc.bg} ${sc.border} ${sc.color} border glass-morphism-cyan`}>
                                            <StatusIcon size={10} />
                                            {sc.label}
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                                            {order.items.length} Project{order.items.length !== 1 ? "s" : ""}
                                        </p>
                                        <div className="flex items-center gap-1">
                                            <span className="text-white font-black text-sm">₹{order.totalPrice}</span>
                                            <ChevronRight size={14} className="text-gray-700" />
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Order Detail */}
                    <div className="lg:col-span-2">
                        {selectedOrder ? (
                            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8 shadow-md">
                                {/* Order header */}
                                <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
                                    <div>
                                        <p className="text-gray-500 text-[10px] font-medium mb-1 tracking-wider uppercase">Order ID</p>
                                        <h2 className="text-xl font-black text-white font-mono break-all">{selectedOrder.id}</h2>
                                        <p className="text-gray-500 text-sm mt-1">
                                            Placed on {formatDate(selectedOrder.createdAt)} at {formatTime(selectedOrder.createdAt)}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-gray-500 text-[10px] font-medium mb-1 tracking-wider uppercase">Total amount</p>
                                        <p className="text-2xl font-black text-cyan-400">₹{selectedOrder.totalPrice}</p>
                                    </div>
                                </div>

                                {/* Status Timeline */}
                                <div className="mb-12 bg-gray-950/50 rounded-3xl p-6 border border-white/5 glass-morphism">
                                    <h3 className="text-xs font-black text-gray-500 uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
                                        <Truck size={14} className="text-cyan-400" />
                                        Tracking Progress
                                    </h3>

                                    <div className="flex items-center justify-between mb-8 px-2 relative">
                                        {selectedOrder.status === "cancelled" ? (
                                            <div className="flex-1 flex flex-col items-center animate-fade-in-up">
                                                <div className="w-16 h-16 rounded-full bg-red-500/10 border-2 border-red-500/30 text-red-500 flex items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.2)]">
                                                    <XCircle size={32} />
                                                </div>
                                                <p className="text-xs font-black mt-4 text-red-500 uppercase tracking-widest">Order Cancelled</p>
                                            </div>
                                        ) : (
                                            allSteps.map((step, i) => {
                                                const currentStep = statusConfig[selectedOrder.status].step;
                                                const stepNum = i + 1;
                                                const isComplete = stepNum < currentStep;
                                                const isCurrent = stepNum === currentStep;
                                                const sc = statusConfig[step.status];
                                                const StepIcon = sc.icon;

                                                return (
                                                    <div key={step.status} className="flex items-center flex-1 last:flex-initial relative">
                                                        <div className="flex flex-col items-center relative z-10 transition-transform duration-500 group">
                                                            <div
                                                                className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center border-2 transition-all duration-700 ${isComplete
                                                                    ? "bg-cyan-500 border-cyan-400 text-gray-950 shadow-[0_0_20px_rgba(34,211,238,0.4)]"
                                                                    : isCurrent
                                                                        ? `${sc.bg} ${sc.border} ${sc.color} animate-pulse-glow`
                                                                        : "bg-gray-900 border-white/5 text-gray-700"
                                                                    } relative`}
                                                            >
                                                                {isCurrent && <div className="absolute inset-0 rounded-full animate-ping bg-cyan-500/20 -z-10"></div>}
                                                                {isComplete ? (
                                                                    <CheckCircle2 size={24} />
                                                                ) : (
                                                                    <StepIcon size={22} className={isCurrent ? "animate-bounce" : ""} />
                                                                )}
                                                            </div>
                                                            <div className="absolute -bottom-10 w-24 text-center">
                                                                <p className={`text-[9px] font-black uppercase tracking-widest transition-colors duration-500 ${isComplete ? "text-cyan-400" : isCurrent ? sc.color : "text-gray-600"}`}>
                                                                    {step.label}
                                                                </p>
                                                                {isCurrent && <p className="text-[7px] text-gray-500 font-mono mt-1 opacity-60 animate-pulse">LIVE UPDATE</p>}
                                                            </div>
                                                        </div>
                                                        {i < allSteps.length - 1 && (
                                                            <div className="flex-1 h-[2px] mx-[-10px] relative">
                                                                <div className="absolute inset-0 bg-white/5"></div>
                                                                <div
                                                                    className={`absolute inset-0 bg-cyan-500 transition-all duration-[1.5s] ease-out shadow-[0_0_10px_rgba(34,211,238,0.5)]`}
                                                                    style={{ width: isComplete ? '100%' : '0%' }}
                                                                ></div>
                                                            </div>
                                                        )}
                                                    </div>
                                                )
                                            })
                                        )}
                                    </div>
                                </div>

                                {/* Rating Section - Show if delivered */}
                                {selectedOrder.status === "delivered" && (
                                    <RatingSection
                                        orderId={selectedOrder.id}
                                        currentRating={selectedOrder.rating}
                                        currentFeedback={selectedOrder.feedback}
                                        onSubmit={useOrders().submitOrderFeedback}
                                    />
                                )}

                                {/* Delivery Info */}
                                <div className="mb-10 pt-4">
                                    <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                                        <MapPin size={15} className="text-cyan-400" />
                                        Delivery Details
                                    </h3>
                                    <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-5">
                                        <p className="text-white font-bold text-base mb-1">{selectedOrder.deliveryInfo.name}</p>
                                        <div className="flex items-center gap-2 text-gray-400 text-sm mb-3 font-medium">
                                            <Phone size={12} className="text-cyan-400" />
                                            {selectedOrder.deliveryInfo.phone}
                                        </div>
                                        <p className="text-gray-400 text-sm leading-relaxed">{selectedOrder.deliveryInfo.address}</p>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div>
                                    <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                                        <Package size={15} className="text-cyan-400" />
                                        Items ({selectedOrder.items.length})
                                    </h3>
                                    <div className="space-y-3">
                                        {selectedOrder.items.map(({ project, quantity }) => (
                                            <div key={project.id} className="flex items-center justify-between p-4 bg-gray-800/30 border border-gray-700/50 rounded-2xl">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                                                        <Package size={18} className="text-cyan-400" />
                                                    </div>
                                                    <div>
                                                        <p className="text-white text-sm font-bold truncate max-w-[180px]">{project.title}</p>
                                                        <p className="text-gray-500 text-xs">{project.technology} · Qty: {quantity}</p>
                                                    </div>
                                                </div>
                                                <span className="text-white font-black text-sm">₹{project.price * quantity}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Status History */}
                                <div className="mt-10 pt-8 border-t border-gray-800">
                                    <h3 className="text-sm font-bold text-white mb-6 flex items-center gap-2">
                                        <Clock size={15} className="text-cyan-400" />
                                        Activity Log
                                    </h3>
                                    <div className="space-y-6">
                                        {selectedOrder.statusHistory.map((entry, i) => {
                                            const sc = statusConfig[entry.status];
                                            const EntryIcon = sc.icon;
                                            return (
                                                <div key={i} className="flex gap-4">
                                                    <div className="flex flex-col items-center">
                                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${sc.bg} border ${sc.border} flex-shrink-0 relative z-10`}>
                                                            <EntryIcon size={12} className={sc.color} />
                                                        </div>
                                                        {i < selectedOrder.statusHistory.length - 1 && (
                                                            <div className="w-px h-full min-h-[40px] bg-gray-800 -mt-1" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className={`text-sm font-bold ${sc.color}`}>{sc.label}</p>
                                                        <p className="text-gray-400 text-xs mt-1 leading-relaxed">{entry.message}</p>
                                                        <p className="text-gray-600 text-[10px] mt-2 font-mono">
                                                            {formatDate(entry.timestamp)} · {formatTime(entry.timestamp)}
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-gray-900 border border-gray-800 border-dashed rounded-3xl p-20 text-center">
                                <Package size={48} className="text-gray-800 mx-auto mb-4" />
                                <h3 className="text-white font-bold text-lg mb-2">Select an order</h3>
                                <p className="text-gray-500 text-sm max-w-xs mx-auto">Click on an order from the list to see its timeline and delivery details.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
