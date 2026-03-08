"use client";

import { useOrders, OrderStatus } from "@/components/OrderContext";
import { useAuth } from "@/components/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
    Package,
    Search,
    Filter,
    CheckCircle2,
    Clock,
    Truck,
    XCircle,
    MapPin,
    Phone,
    Mail,
    ExternalLink,
    Loader2,
    ChevronRight,
    ShoppingBag,
    ArrowUpDown,
    CheckCircle,
    Star,
    MessageSquare,
    Trash2
} from "lucide-react";

const statusConfig: Record<OrderStatus, { label: string; color: string; bg: string; border: string; icon: any }> = {
    pending: { label: "Pending", color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/20", icon: Clock },
    confirmed: { label: "Confirmed", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20", icon: CheckCircle2 },
    shipped: { label: "Shipped", color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20", icon: Truck },
    delivered: { label: "Delivered", color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/20", icon: Package },
    cancelled: { label: "Cancelled", color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20", icon: XCircle }
}

export default function AdminDashboard() {
    const { isAdmin, loading: authLoading } = useAuth();
    const { allOrders, updateOrderStatus, deleteOrder, loading: ordersLoading, allOrdersError } = useOrders();
    const router = useRouter();

    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        if (!authLoading && !isAdmin) {
            router.push("/");
        }
    }, [isAdmin, authLoading, router]);

    if (authLoading || !isAdmin) {
        return (
            <div className="min-h-screen bg-gray-950 flex items-center justify-center">
                <Loader2 size={40} className="text-cyan-500 animate-spin" />
            </div>
        );
    }

    const filteredOrders = allOrders.filter(order => {
        const matchesSearch =
            order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.deliveryInfo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.userEmail.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = statusFilter === "all" || order.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const selectedOrder = allOrders.find(o => o.id === selectedOrderId);

    // Stats calculations
    const stats = {
        totalRevenue: allOrders.reduce((acc, curr) => acc + curr.totalPrice, 0),
        activeOrders: allOrders.filter(o => ["pending", "confirmed", "shipped"].includes(o.status)).length,
        completedOrders: allOrders.filter(o => o.status === "delivered").length,
        avgRating: allOrders.filter(o => o.rating).length > 0
            ? (allOrders.filter(o => o.rating).reduce((acc, curr) => acc + (curr.rating || 0), 0) / allOrders.filter(o => o.rating).length).toFixed(1)
            : "N/A"
    };

    const handleStatusUpdate = async (id: string, newStatus: OrderStatus) => {
        const message = prompt(`Reason for changing status to ${newStatus}?`, `Order status updated to ${newStatus}.`);
        if (message === null) return;

        setIsUpdating(true);
        try {
            await updateOrderStatus(id, newStatus, message);
        } catch (error) {
            alert("Failed to update status");
        } finally {
            setIsUpdating(false);
        }
    };

    const handleDeleteOrder = async (id: string) => {
        if (!confirm("Are you sure you want to PERMANENTLY delete this order? This action cannot be undone.")) return;

        setIsUpdating(true);
        try {
            await deleteOrder(id);
            if (selectedOrderId === id) setSelectedOrderId(null);
        } catch (error) {
            alert("Failed to delete order");
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <main className="min-h-screen bg-gray-950 text-white pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                        <div>
                            <p className="text-cyan-400 text-sm font-mono mb-2 tracking-wider">// superuser dashboard</p>
                            <h1 className="text-4xl font-black text-white pro-heading">Order Management</h1>
                            <p className="text-gray-400 mt-2 pro-subtext">Manage all customer projects and delivery statuses</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => window.location.reload()}
                                className="px-5 py-2.5 bg-gray-900 border border-gray-800 text-gray-400 hover:text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 glass-morphism hover:border-gray-700 shadow-premium"
                            >
                                <Loader2 size={14} className={ordersLoading ? "animate-spin" : ""} />
                                {ordersLoading ? "Syncing..." : "Force Refresh"}
                            </button>
                        </div>
                    </div>

                    {/* Stats Overview */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { label: "Total Revenue", value: `₹${stats.totalRevenue.toLocaleString()}`, color: "text-white", bg: "bg-white/5" },
                            { label: "Active Orders", value: stats.activeOrders, color: "text-cyan-400", bg: "bg-cyan-500/10" },
                            { label: "Completed", value: stats.completedOrders, color: "text-green-400", bg: "bg-green-500/10" },
                            { label: "Avg Rating", value: `★ ${stats.avgRating}`, color: "text-yellow-400", bg: "bg-yellow-500/10" },
                        ].map((stat, i) => (
                            <div key={i} className={`p-4 rounded-2xl border border-white/5 ${stat.bg} glass-morphism`}>
                                <p className="text-[10px] uppercase text-gray-500 font-black tracking-widest mb-1">{stat.label}</p>
                                <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Search & Filter */}
                <div className="bg-gray-900 border border-gray-800 p-6 rounded-3xl mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input
                            type="text"
                            placeholder="Search by ID, name or email..."
                            className="w-full bg-gray-950 border border-gray-800 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                        <button
                            onClick={() => setStatusFilter("all")}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${statusFilter === "all" ? "bg-white text-gray-950" : "bg-gray-800 text-gray-400 hover:bg-gray-700"}`}
                        >
                            All Orders
                        </button>
                        {(Object.keys(statusConfig) as OrderStatus[]).map((status) => (
                            <button
                                key={status}
                                onClick={() => setStatusFilter(status)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${statusFilter === status ? statusConfig[status].bg + " " + statusConfig[status].color : "bg-gray-800 text-gray-400 hover:bg-gray-700"}`}
                            >
                                {statusConfig[status].label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Error Display */}
                {allOrdersError && (
                    <div className="mb-8 p-6 bg-red-500/10 border border-red-500/20 rounded-3xl">
                        <div className="flex items-center gap-3 text-red-400 mb-2">
                            <XCircle size={20} />
                            <h3 className="font-bold">Sync Error</h3>
                        </div>
                        <p className="text-gray-400 text-sm mb-4">
                            Unable to fetch orders from Firestore. This is usually due to missing Collections or incorrect Security Rules.
                        </p>
                        <div className="bg-black/40 p-3 rounded-lg font-mono text-xs text-red-300 break-all">
                            {allOrdersError}
                        </div>
                    </div>
                )}

                {/* Orders List */}
                <div className="grid grid-cols-1 gap-6">
                    {filteredOrders.length > 0 ? (
                        filteredOrders.map((order) => (
                            <div
                                key={order.id}
                                className={`bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden group hover:border-cyan-500/30 transition-all cursor-pointer glass-morphism status-glow-${order.status} hover:scale-[1.01] duration-300`}
                                onClick={() => setSelectedOrderId(order.id)}
                            >
                                <div className="p-6 md:p-8 flex flex-col md:flex-row justify-between gap-6">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${statusConfig[order.status].bg} ${statusConfig[order.status].color} border ${statusConfig[order.status].border}`}>
                                                {statusConfig[order.status].label}
                                            </span>
                                            <span className="text-gray-500 text-xs font-mono">ID: {order.id}</span>
                                        </div>

                                        <h3 className="text-xl font-bold mb-1">{order.deliveryInfo.name}</h3>
                                        <p className="text-gray-400 text-sm mb-4 flex items-center gap-2">
                                            <Mail size={14} /> {order.userEmail}
                                        </p>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="flex items-start gap-3">
                                                <div className="p-2 bg-gray-800 rounded-lg text-gray-400 mt-1">
                                                    <MapPin size={16} />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] uppercase text-gray-500 font-bold tracking-widest">Delivery Address</p>
                                                    <p className="text-sm text-gray-300 line-clamp-1">{order.deliveryInfo.address}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <div className="p-2 bg-gray-800 rounded-lg text-gray-400 mt-1">
                                                    <Phone size={16} />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] uppercase text-gray-500 font-bold tracking-widest">Phone</p>
                                                    <p className="text-sm text-gray-300">{order.deliveryInfo.phone}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {order.rating && (
                                            <div className="mt-4 flex flex-col gap-2 p-3 bg-cyan-500/5 rounded-2xl border border-cyan-500/10">
                                                <div className="flex gap-1">
                                                    {[1, 2, 3, 4, 5].map((s) => (
                                                        <Star key={s} size={12} className={s <= order.rating! ? "fill-cyan-400 text-cyan-400" : "text-gray-700"} />
                                                    ))}
                                                </div>
                                                {order.feedback && (
                                                    <p className="text-gray-400 text-xs italic line-clamp-1">"{order.feedback}"</p>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-col justify-between items-end gap-6 border-t md:border-t-0 md:border-l border-gray-800 pt-6 md:pt-0 md:pl-8">
                                        <div className="text-right w-full">
                                            <p className="text-[10px] uppercase text-gray-500 font-bold tracking-widest mb-1">Total Amount</p>
                                            <p className="text-3xl font-black text-white">₹{order.totalPrice}</p>
                                        </div>

                                        <div className="flex gap-2">
                                            {order.status === "pending" && (
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); handleStatusUpdate(order.id, "confirmed"); }}
                                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-blue-900/20"
                                                    disabled={isUpdating}
                                                >
                                                    Confirm Order
                                                </button>
                                            )}
                                            {order.status === "confirmed" && (
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); handleStatusUpdate(order.id, "shipped"); }}
                                                    className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-purple-900/20"
                                                    disabled={isUpdating}
                                                >
                                                    Mark Shipped
                                                </button>
                                            )}
                                            {order.status === "shipped" && (
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); handleStatusUpdate(order.id, "delivered"); }}
                                                    className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-green-900/20"
                                                    disabled={isUpdating}
                                                >
                                                    Mark Delivered
                                                </button>
                                            )}
                                            <button
                                                className="p-3 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white rounded-xl transition-all"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    window.open(`https://wa.me/91${order.deliveryInfo.phone.replace(/[^0-9]/g, '')}`, '_blank');
                                                }}
                                            >
                                                <ExternalLink size={18} />
                                            </button>
                                            <button
                                                className="p-3 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition-all border border-red-500/20"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeleteOrder(order.id);
                                                }}
                                                disabled={isUpdating}
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-20 text-center flex flex-col items-center justify-center">
                            <div className="p-6 bg-gray-800 rounded-full text-gray-500 mb-6">
                                <ShoppingBag size={48} />
                            </div>
                            <h2 className="text-2xl font-bold mb-2">No Orders Found</h2>
                            <p className="text-gray-400 max-w-sm">
                                {searchQuery || statusFilter !== "all"
                                    ? "No orders match your current filters. Try adjusting your search."
                                    : "Connect your Firestore Database in Firebase Console and place an order to see it here!"}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Order Drawer/Modal - Enhanced Side Panel Feel */}
            {selectedOrderId && selectedOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-end">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setSelectedOrderId(null)}></div>
                    <div className="relative bg-gray-950 border-l border-white/10 w-full max-w-2xl h-full shadow-2xl overflow-hidden animate-in slide-in-from-right duration-500">
                        <div className="flex flex-col h-full">
                            {/* Drawer Header */}
                            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-gray-900/50 backdrop-blur-xl sticky top-0 z-20">
                                <div className="flex items-center gap-3">
                                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${statusConfig[selectedOrder.status].bg} ${statusConfig[selectedOrder.status].color} border ${statusConfig[selectedOrder.status].border} glass-morphism`}>
                                        {statusConfig[selectedOrder.status].label}
                                    </span>
                                    <span className="text-gray-500 text-[10px] font-mono tracking-tighter">#{selectedOrder.id}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        className="p-2.5 hover:bg-red-500/10 rounded-full transition-all border border-transparent hover:border-red-500/20 text-gray-400 hover:text-red-500"
                                        onClick={() => handleDeleteOrder(selectedOrder.id)}
                                        title="Delete Order"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                    <button className="p-2.5 hover:bg-white/5 rounded-full transition-all border border-transparent hover:border-white/5" onClick={() => setSelectedOrderId(null)}>
                                        <XCircle size={20} className="text-gray-400 hover:text-white" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                                <div className="mb-10 animate-fade-in-up">
                                    <p className="text-cyan-400 text-[10px] font-mono mb-2 tracking-widest uppercase">// customer profile</p>
                                    <h3 className="text-4xl font-black mb-2 pro-heading">{selectedOrder.deliveryInfo.name}</h3>
                                    <p className="text-gray-400 pro-subtext font-medium">{selectedOrder.userEmail}</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                                    <section className="animate-fade-in-up-delay-1">
                                        <h4 className="text-[10px] uppercase text-gray-500 font-black tracking-[0.2em] mb-4">Logistics</h4>
                                        <div className="space-y-4">
                                            <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 glass-morphism">
                                                <div className="p-2 bg-gray-800 rounded-xl text-gray-400 h-fit"><MapPin size={18} /></div>
                                                <p className="text-sm text-gray-300 leading-relaxed pro-subtext">{selectedOrder.deliveryInfo.address}</p>
                                            </div>
                                            <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 glass-morphism">
                                                <div className="p-2 bg-gray-800 rounded-xl text-gray-400 h-fit"><Phone size={18} /></div>
                                                <p className="text-sm text-gray-300 leading-relaxed pro-subtext">{selectedOrder.deliveryInfo.phone}</p>
                                            </div>
                                        </div>
                                    </section>
                                    <section className="animate-fade-in-up-delay-2">
                                        <h4 className="text-[10px] uppercase text-gray-500 font-black tracking-[0.2em] mb-4">Financials</h4>
                                        <div className="bg-cyan-500/5 border border-cyan-500/10 rounded-2xl p-6 glass-morphism">
                                            <div className="space-y-3">
                                                {selectedOrder.items.map((item, idx) => (
                                                    <div key={idx} className="flex justify-between text-sm">
                                                        <span className="text-gray-400 pro-subtext">{item.project.title} <span className="text-[10px]">×{item.quantity}</span></span>
                                                        <span className="font-bold">₹{item.project.price * item.quantity}</span>
                                                    </div>
                                                ))}
                                                <div className="h-px bg-white/5 my-3"></div>
                                                <div className="flex justify-between font-black text-xl">
                                                    <span className="text-gray-500 text-sm font-bold self-center">Grand Total</span>
                                                    <span className="text-white">₹{selectedOrder.totalPrice}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>

                                {/* Order History Section */}
                                <section className="mb-12 animate-fade-in-up-delay-3">
                                    <h4 className="text-[10px] uppercase text-gray-500 font-black tracking-[0.2em] mb-6">Activity Audit</h4>
                                    <div className="space-y-8 pl-4 border-l border-white/5">
                                        {(selectedOrder.statusHistory || []).map((entry: any, idx) => (
                                            <div key={idx} className="relative">
                                                <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-cyan-500 border-2 border-gray-950 shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>
                                                <div className="flex items-center gap-3 mb-1">
                                                    <p className="text-[10px] font-black text-white uppercase tracking-widest">{entry.status}</p>
                                                    <span className="text-[10px] text-gray-600 font-mono italic">{new Date(entry.timestamp).toLocaleString()}</span>
                                                </div>
                                                <p className="text-sm text-gray-400 pro-subtext italic">"{entry.message}"</p>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                {/* Customer Review Section */}
                                {selectedOrder.rating && (
                                    <section className="mt-10 pt-10 border-t border-white/5 animate-fade-in-up">
                                        <h4 className="text-[10px] uppercase text-gray-500 font-black tracking-[0.2em] mb-4">Post-Delivery Feedback</h4>
                                        <div className="bg-yellow-500/5 border border-yellow-500/10 rounded-3xl p-8 glass-morphism relative overflow-hidden">
                                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                                <MessageSquare size={80} />
                                            </div>
                                            <div className="flex gap-1.5 mb-4 relative z-10">
                                                {[1, 2, 3, 4, 5].map((s) => (
                                                    <Star key={s} size={20} className={s <= selectedOrder.rating! ? "fill-yellow-400 text-yellow-400" : "text-gray-800"} />
                                                ))}
                                            </div>
                                            {selectedOrder.feedback && (
                                                <p className="text-white text-lg font-medium italic leading-relaxed relative z-10">"{selectedOrder.feedback}"</p>
                                            )}
                                            <p className="text-gray-500 text-[10px] mt-6 font-mono relative z-10 font-bold uppercase tracking-widest">Received: {new Date(selectedOrder.ratedAt!).toLocaleDateString()}</p>
                                        </div>
                                    </section>
                                )}
                            </div>

                            {/* Action Footer */}
                            <div className="p-6 bg-gray-900 border-t border-white/5 backdrop-blur-2xl flex gap-3 sticky bottom-0 z-20">
                                <button
                                    className="flex-1 py-4 bg-white text-gray-950 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-cyan-400 transition-all flex items-center justify-center gap-2 shadow-2xl disabled:opacity-30"
                                    onClick={() => {
                                        const nextMap: Record<string, OrderStatus> = {
                                            "pending": "confirmed",
                                            "confirmed": "shipped",
                                            "shipped": "delivered"
                                        };
                                        const next = nextMap[selectedOrder.status];
                                        if (next) handleStatusUpdate(selectedOrder.id, next);
                                    }}
                                    disabled={selectedOrder.status === "delivered" || selectedOrder.status === "cancelled" || isUpdating}
                                >
                                    {isUpdating ? <Loader2 className="animate-spin" size={16} /> : (selectedOrder.status === "delivered" ? "ORDER COMPLETED" : `MOVE TO ${statusConfig[selectedOrder.status].label.toUpperCase()}`)}
                                </button>
                                <button
                                    className="px-6 py-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all disabled:opacity-30"
                                    onClick={() => handleStatusUpdate(selectedOrder.id, "cancelled")}
                                    disabled={selectedOrder.status === "delivered" || selectedOrder.status === "cancelled" || isUpdating}
                                >
                                    CANCEL
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
