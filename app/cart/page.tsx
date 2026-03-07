"use client";

import { useCart } from "@/components/CartContext";
import { useOrders } from "@/components/OrderContext";
import { useToast } from "@/components/ToastContext";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, ArrowRight, Cpu, Package, X, QrCode, CheckCircle2, Copy, User, Phone, MapPin, Building2, ChevronLeft, PartyPopper } from "lucide-react";
import { useState } from "react";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice, clearCart } = useCart();
  const { placeOrder } = useOrders();
  const { showToast } = useToast();
  const router = useRouter();
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<1 | 2 | 3>(1);
  const [copied, setCopied] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState<string>("");

  // Delivery form state
  const [deliveryForm, setDeliveryForm] = useState({
    name: "",
    phone: "",
    deliveryType: "chandigarh-university" as "chandigarh-university" | "other",
    hostelBlock: "",
    roomNumber: "",
    address: "",
    city: "",
    pincode: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const upiId = "abhaymalan@fam"; // UPI ID

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFormChange = (field: string, value: string) => {
    setDeliveryForm((prev) => ({ ...prev, [field]: value }));
    // Clear error for that field
    if (formErrors[field]) {
      setFormErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    if (!deliveryForm.name.trim()) errors.name = "Name is required";
    if (!deliveryForm.phone.trim()) errors.phone = "Phone number is required";
    else if (!/^[6-9]\d{9}$/.test(deliveryForm.phone.trim())) errors.phone = "Enter a valid 10-digit phone number";

    if (deliveryForm.deliveryType === "chandigarh-university") {
      // hostel/block is optional but good to have
    } else {
      if (!deliveryForm.address.trim()) errors.address = "Address is required";
      if (!deliveryForm.city.trim()) errors.city = "City is required";
      if (!deliveryForm.pincode.trim()) errors.pincode = "PIN code is required";
      else if (!/^\d{6}$/.test(deliveryForm.pincode.trim())) errors.pincode = "Enter a valid 6-digit PIN code";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleProceedToPayment = () => {
    if (validateForm()) {
      setCheckoutStep(2);
    }
  };

  const openCheckout = () => {
    setCheckoutStep(1);
    setShowCheckout(true);
  };

  if (items.length === 0 && !showCheckout) {
    return (
      <main className="min-h-screen bg-gray-950 text-white pt-24 pb-20 flex items-center justify-center">
        <div className="text-center px-4">
          <div className="w-24 h-24 bg-gray-900 border border-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <ShoppingCart size={36} className="text-gray-600" />
          </div>
          <h1 className="text-2xl font-black text-white mb-2">Your cart is empty</h1>
          <p className="text-gray-400 mb-8">Add some projects to get started!</p>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 text-gray-950 font-bold rounded-xl hover:bg-cyan-400 transition-all"
          >
            Browse Projects
            <ArrowRight size={16} />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 text-sm mb-4 transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Continue Shopping
          </Link>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            Shopping Cart
            <span className="ml-3 text-xl text-cyan-400 font-mono">({totalItems})</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(({ project, quantity }) => {
              const hasRealImage = project.image && project.image.endsWith(".png");
              return (
                <div
                  key={project.id}
                  className="bg-gray-900 border border-gray-800 hover:border-gray-700 rounded-2xl p-5 transition-all"
                >
                  <div className="flex gap-4">
                    {/* Thumbnail */}
                    <div className={`w-20 h-20 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden ${project.technology === "ESP32" ? "bg-red-950/40 border border-red-500/20" : "bg-cyan-950/40 border border-cyan-500/20"}`}>
                      {hasRealImage ? (
                        <Image
                          src={project.image}
                          alt={project.title}
                          width={80}
                          height={80}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <Cpu size={28} className={project.technology === "ESP32" ? "text-red-400" : "text-cyan-400"} />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-white font-semibold text-sm leading-snug mb-1">{project.title}</h3>
                          <p className="text-gray-500 text-xs">{project.subject}</p>
                          <span className={`inline-block mt-1.5 px-2 py-0.5 text-xs font-bold rounded-full ${project.technology === "ESP32" ? "bg-red-500/10 text-red-400" : "bg-cyan-500/10 text-cyan-400"}`}>
                            {project.technology}
                          </span>
                        </div>
                        <button
                          onClick={() => removeFromCart(project.id)}
                          className="text-gray-600 hover:text-red-400 transition-colors p-1 flex-shrink-0"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      {/* Quantity + Price row */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2 bg-gray-800 rounded-lg p-1">
                          <button
                            onClick={() => updateQuantity(project.id, quantity - 1)}
                            disabled={quantity <= 1}
                            className="w-7 h-7 rounded-md bg-gray-700 hover:bg-gray-600 disabled:opacity-30 flex items-center justify-center transition-colors"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-white font-mono font-bold text-sm w-6 text-center">{quantity}</span>
                          <button
                            onClick={() => updateQuantity(project.id, quantity + 1)}
                            className="w-7 h-7 rounded-md bg-gray-700 hover:bg-gray-600 flex items-center justify-center transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <div className="text-right">
                          <span className="text-white font-bold">₹{project.price * quantity}</span>
                          {quantity > 1 && (
                            <p className="text-gray-500 text-xs">₹{project.price} × {quantity}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Clear cart */}
            <button
              onClick={clearCart}
              className="flex items-center gap-2 text-gray-500 hover:text-red-400 text-sm transition-colors"
            >
              <Trash2 size={14} />
              Clear all items
            </button>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                <Package size={18} className="text-cyan-400" />
                Order Summary
              </h2>

              <div className="space-y-3 mb-5">
                {items.map(({ project, quantity }) => (
                  <div key={project.id} className="flex items-center justify-between text-sm">
                    <span className="text-gray-400 truncate max-w-[180px]">{project.title} ×{quantity}</span>
                    <span className="text-gray-300 font-medium ml-2">₹{project.price * quantity}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-800 pt-4 space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Subtotal ({totalItems} items)</span>
                  <span className="text-white">₹{totalPrice}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Delivery</span>
                  <span className="text-green-400 font-medium">Free</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6 py-3 border-t border-b border-gray-800">
                <span className="text-white font-bold text-lg">Total</span>
                <span className="text-2xl font-black text-cyan-400">₹{totalPrice}</span>
              </div>

              <button
                onClick={openCheckout}
                className="w-full py-4 bg-cyan-500 text-gray-950 font-bold rounded-xl hover:bg-cyan-400 transition-all hover:scale-[1.02] shadow-lg shadow-cyan-500/20 text-sm flex items-center justify-center gap-2"
              >
                <QrCode size={18} />
                Proceed to Checkout →
              </button>

              <Link
                href="/projects"
                className="w-full flex items-center justify-center gap-2 mt-3 py-3 bg-gray-800 border border-gray-700 text-gray-300 hover:text-white rounded-xl text-sm font-medium transition-all hover:bg-gray-700"
              >
                <ArrowLeft size={15} />
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowCheckout(false)}
          />

          {/* Modal */}
          <div className="relative bg-gray-900 border border-gray-700 rounded-3xl max-w-md w-full p-8 shadow-2xl shadow-cyan-500/10 animate-in my-8">
            {/* Close button */}
            <button
              onClick={() => setShowCheckout(false)}
              className="absolute top-4 right-4 p-2 text-gray-500 hover:text-white transition-colors rounded-lg hover:bg-gray-800"
            >
              <X size={20} />
            </button>

            {/* Step indicator */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold ${checkoutStep === 1 ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30" : "bg-green-500/20 text-green-400 border border-green-500/30"}`}>
                {checkoutStep > 1 ? <CheckCircle2 size={14} /> : <User size={14} />}
                Delivery Info
              </div>
              <div className="w-6 h-px bg-gray-700" />
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold ${checkoutStep === 2 ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30" : "bg-gray-800 text-gray-500 border border-gray-700"}`}>
                <QrCode size={14} />
                Payment
              </div>
            </div>

            {/* ===== STEP 1: Delivery Details ===== */}
            {checkoutStep === 1 && (
              <div>
                <div className="text-center mb-6">
                  <h2 className="text-xl font-black text-white mb-1">Delivery Details</h2>
                  <p className="text-gray-400 text-sm">Tell us where to deliver your project</p>
                </div>

                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-1.5">
                      <User size={14} className="text-cyan-400" />
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={deliveryForm.name}
                      onChange={(e) => handleFormChange("name", e.target.value)}
                      placeholder="Enter your full name"
                      className={`w-full px-4 py-3 bg-gray-800/60 border ${formErrors.name ? "border-red-500/50" : "border-gray-700"} text-white rounded-xl text-sm placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all`}
                    />
                    {formErrors.name && <p className="text-red-400 text-xs mt-1">{formErrors.name}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-1.5">
                      <Phone size={14} className="text-cyan-400" />
                      Phone Number <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="tel"
                      value={deliveryForm.phone}
                      onChange={(e) => handleFormChange("phone", e.target.value)}
                      placeholder="10-digit phone number"
                      maxLength={10}
                      className={`w-full px-4 py-3 bg-gray-800/60 border ${formErrors.phone ? "border-red-500/50" : "border-gray-700"} text-white rounded-xl text-sm placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all`}
                    />
                    {formErrors.phone && <p className="text-red-400 text-xs mt-1">{formErrors.phone}</p>}
                  </div>

                  {/* Delivery type */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                      <MapPin size={14} className="text-cyan-400" />
                      Delivery Location
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => handleFormChange("deliveryType", "chandigarh-university")}
                        className={`flex items-center gap-2 p-3 rounded-xl border text-sm font-medium transition-all ${deliveryForm.deliveryType === "chandigarh-university"
                          ? "bg-cyan-500/10 border-cyan-500/40 text-cyan-400"
                          : "bg-gray-800/40 border-gray-700 text-gray-400 hover:border-gray-600"
                          }`}
                      >
                        <Building2 size={16} />
                        <span className="text-left text-xs leading-tight">Chandigarh University</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleFormChange("deliveryType", "other")}
                        className={`flex items-center gap-2 p-3 rounded-xl border text-sm font-medium transition-all ${deliveryForm.deliveryType === "other"
                          ? "bg-cyan-500/10 border-cyan-500/40 text-cyan-400"
                          : "bg-gray-800/40 border-gray-700 text-gray-400 hover:border-gray-600"
                          }`}
                      >
                        <MapPin size={16} />
                        <span className="text-left text-xs leading-tight">Other Address</span>
                      </button>
                    </div>
                  </div>

                  {/* CU-specific fields */}
                  {deliveryForm.deliveryType === "chandigarh-university" && (
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-medium text-gray-400 mb-1 block">Hostel / Block</label>
                        <input
                          type="text"
                          value={deliveryForm.hostelBlock}
                          onChange={(e) => handleFormChange("hostelBlock", e.target.value)}
                          placeholder="e.g. BH-1, GH-3"
                          className="w-full px-3 py-2.5 bg-gray-800/60 border border-gray-700 text-white rounded-xl text-sm placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/50 transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-400 mb-1 block">Room Number</label>
                        <input
                          type="text"
                          value={deliveryForm.roomNumber}
                          onChange={(e) => handleFormChange("roomNumber", e.target.value)}
                          placeholder="e.g. 312"
                          className="w-full px-3 py-2.5 bg-gray-800/60 border border-gray-700 text-white rounded-xl text-sm placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/50 transition-all"
                        />
                      </div>
                    </div>
                  )}

                  {/* Other address fields */}
                  {deliveryForm.deliveryType === "other" && (
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-medium text-gray-400 mb-1 block">Full Address <span className="text-red-400">*</span></label>
                        <textarea
                          value={deliveryForm.address}
                          onChange={(e) => handleFormChange("address", e.target.value)}
                          placeholder="House no, Street, Landmark"
                          rows={2}
                          className={`w-full px-3 py-2.5 bg-gray-800/60 border ${formErrors.address ? "border-red-500/50" : "border-gray-700"} text-white rounded-xl text-sm placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/50 transition-all resize-none`}
                        />
                        {formErrors.address && <p className="text-red-400 text-xs mt-1">{formErrors.address}</p>}
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-medium text-gray-400 mb-1 block">City <span className="text-red-400">*</span></label>
                          <input
                            type="text"
                            value={deliveryForm.city}
                            onChange={(e) => handleFormChange("city", e.target.value)}
                            placeholder="City"
                            className={`w-full px-3 py-2.5 bg-gray-800/60 border ${formErrors.city ? "border-red-500/50" : "border-gray-700"} text-white rounded-xl text-sm placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/50 transition-all`}
                          />
                          {formErrors.city && <p className="text-red-400 text-xs mt-1">{formErrors.city}</p>}
                        </div>
                        <div>
                          <label className="text-xs font-medium text-gray-400 mb-1 block">PIN Code <span className="text-red-400">*</span></label>
                          <input
                            type="text"
                            value={deliveryForm.pincode}
                            onChange={(e) => handleFormChange("pincode", e.target.value)}
                            placeholder="6-digit PIN"
                            maxLength={6}
                            className={`w-full px-3 py-2.5 bg-gray-800/60 border ${formErrors.pincode ? "border-red-500/50" : "border-gray-700"} text-white rounded-xl text-sm placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/50 transition-all`}
                          />
                          {formErrors.pincode && <p className="text-red-400 text-xs mt-1">{formErrors.pincode}</p>}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Amount summary */}
                <div className="bg-gray-800/40 border border-gray-700/50 rounded-xl p-3 mt-5 flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Total Amount</span>
                  <span className="text-xl font-black text-cyan-400">₹{totalPrice}</span>
                </div>

                {/* Continue to payment button */}
                <button
                  onClick={handleProceedToPayment}
                  className="w-full mt-5 py-4 bg-cyan-500 text-gray-950 font-bold rounded-xl hover:bg-cyan-400 transition-all hover:scale-[1.02] shadow-lg shadow-cyan-500/20 text-sm flex items-center justify-center gap-2"
                >
                  Continue to Payment
                  <ArrowRight size={16} />
                </button>
              </div>
            )}

            {/* ===== STEP 2: Payment QR ===== */}
            {checkoutStep === 2 && (
              <div>
                {/* Back to step 1 */}
                <button
                  onClick={() => setCheckoutStep(1)}
                  className="flex items-center gap-1.5 text-gray-400 hover:text-cyan-400 text-xs font-medium mb-4 transition-colors group"
                >
                  <ChevronLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
                  Edit delivery details
                </button>

                {/* Delivery summary */}
                <div className="bg-gray-800/40 border border-gray-700/50 rounded-xl p-3 mb-5 text-sm">
                  <p className="text-gray-500 text-xs mb-1.5 font-medium">Delivering to</p>
                  <p className="text-white font-semibold">{deliveryForm.name}</p>
                  <p className="text-gray-400 text-xs">{deliveryForm.phone}</p>
                  <p className="text-gray-400 text-xs mt-0.5">
                    {deliveryForm.deliveryType === "chandigarh-university"
                      ? `Chandigarh University${deliveryForm.hostelBlock ? ` · ${deliveryForm.hostelBlock}` : ""}${deliveryForm.roomNumber ? ` · Room ${deliveryForm.roomNumber}` : ""}`
                      : `${deliveryForm.address}, ${deliveryForm.city} - ${deliveryForm.pincode}`
                    }
                  </p>
                </div>

                {/* Header */}
                <div className="text-center mb-5">
                  <h2 className="text-xl font-black text-white mb-1">Complete Payment</h2>
                  <p className="text-gray-400 text-sm">Scan the QR code below to pay via UPI</p>
                </div>

                {/* Total */}
                <div className="bg-gray-800/60 border border-gray-700 rounded-xl p-4 mb-5 text-center">
                  <p className="text-gray-400 text-xs mb-1">Amount to Pay</p>
                  <p className="text-4xl font-black text-cyan-400">₹{totalPrice}</p>
                  <p className="text-gray-500 text-xs mt-1">{totalItems} project{totalItems > 1 ? "s" : ""}</p>
                </div>

                {/* QR Code */}
                <div className="bg-white rounded-2xl p-4 mb-5 mx-auto w-fit">
                  <img
                    src="/images/payment-qr.png"
                    alt="Payment QR Code - Scan to pay"
                    width={200}
                    height={200}
                    className="rounded-lg"
                  />
                </div>

                {/* UPI ID */}
                <div className="bg-gray-800/60 border border-gray-700 rounded-xl p-3 mb-5">
                  <p className="text-gray-500 text-xs mb-2 text-center">Or pay directly to UPI ID</p>
                  <div className="flex items-center justify-between bg-gray-900 rounded-lg px-4 py-2.5">
                    <span className="text-cyan-400 font-mono font-bold text-sm">{upiId}</span>
                    <button
                      onClick={handleCopyUPI}
                      className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors"
                    >
                      {copied ? (
                        <>
                          <CheckCircle2 size={14} className="text-green-400" />
                          <span className="text-green-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={14} />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Steps */}
                <div className="space-y-2 mb-5">
                  {[
                    "Open any UPI app (GPay, PhonePe, Paytm)",
                    "Scan the QR code or use the UPI ID",
                    "Complete the payment & share screenshot",
                  ].map((step, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm">
                      <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-gray-300">{step}</span>
                    </div>
                  ))}
                </div>

                {/* Contact */}
                <div className="bg-gradient-to-r from-cyan-500/10 to-orange-500/10 border border-cyan-500/20 rounded-xl p-4 text-center">
                  <p className="text-sm text-gray-300">
                    After payment, click the button below to confirm
                  </p>
                </div>

                {/* Place Order button */}
                <button
                  onClick={() => {
                    const deliveryAddress = deliveryForm.deliveryType === "chandigarh-university"
                      ? `Chandigarh University${deliveryForm.hostelBlock ? ` · ${deliveryForm.hostelBlock}` : ""}${deliveryForm.roomNumber ? ` · Room ${deliveryForm.roomNumber}` : ""}`
                      : `${deliveryForm.address}, ${deliveryForm.city} - ${deliveryForm.pincode}`;
                    const orderId = placeOrder(items, totalPrice, {
                      name: deliveryForm.name,
                      phone: deliveryForm.phone,
                      address: deliveryAddress,
                    });
                    setPlacedOrderId(orderId);
                    showToast("Order placed successfully!", "success");
                    clearCart();
                    setCheckoutStep(3);
                  }}
                  className="w-full mt-4 py-4 bg-green-500 text-white font-bold rounded-xl hover:bg-green-400 transition-all hover:scale-[1.02] shadow-lg shadow-green-500/20 text-sm flex items-center justify-center gap-2"
                >
                  <CheckCircle2 size={18} />
                  I&apos;ve Completed Payment
                </button>
              </div>
            )}

            {/* ===== STEP 3: Order Confirmation ===== */}
            {checkoutStep === 3 && (
              <div className="text-center py-4">
                <div className="w-20 h-20 bg-green-500/15 border-2 border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 size={40} className="text-green-400" />
                </div>
                <h2 className="text-2xl font-black text-white mb-2">Order Placed!</h2>
                <p className="text-gray-400 text-sm mb-6">Your order has been placed successfully</p>

                <div className="bg-gray-800/60 border border-gray-700 rounded-xl p-4 mb-6">
                  <p className="text-gray-500 text-xs mb-1">Order ID</p>
                  <p className="text-cyan-400 font-mono font-black text-lg">{placedOrderId}</p>
                  <p className="text-gray-500 text-xs mt-2">We&apos;ll confirm your payment and update your order status shortly</p>
                </div>

                <button
                  onClick={() => {
                    setShowCheckout(false);
                    router.push("/orders");
                  }}
                  className="w-full py-3.5 bg-cyan-500 text-gray-950 font-bold rounded-xl hover:bg-cyan-400 transition-all text-sm flex items-center justify-center gap-2"
                >
                  <Package size={16} />
                  Track My Order
                </button>

                <Link
                  href="/projects"
                  onClick={() => setShowCheckout(false)}
                  className="w-full flex items-center justify-center gap-2 mt-3 py-3 bg-gray-800 border border-gray-700 text-gray-300 hover:text-white rounded-xl text-sm font-medium transition-all hover:bg-gray-700"
                >
                  Continue Shopping
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
