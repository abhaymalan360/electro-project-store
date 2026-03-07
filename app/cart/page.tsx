"use client";

import { useCart } from "@/components/CartContext";
import { useOrders } from "@/components/OrderContext";
import { useToast } from "@/components/ToastContext";
import { useAuth } from "@/components/AuthContext";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  ArrowRight,
  Package,
  MapPin,
  Clock,
  User,
  Phone,
  Building,
  Building2,
  Home,
  ChevronLeft,
  ChevronRight,
  X,
  CreditCard,
  QrCode,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Loader2,
  Copy,
  ChevronDown,
  Info,
  Smartphone,
  Cpu
} from "lucide-react";
import { useState, useEffect } from "react";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice, clearCart } = useCart();
  const { placeOrder } = useOrders();
  const { showToast } = useToast();
  const { isLoggedIn, loginWithGoogle } = useAuth();
  const router = useRouter();
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<1 | 2 | 3>(1);
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "cod">("upi");
  const [qrCode, setQrCode] = useState<string>("");
  const [upiDeepLink, setUpiDeepLink] = useState<string>("");
  const [loadingQr, setLoadingQr] = useState(false);
  const [finalAmount, setFinalAmount] = useState(0);

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

  // Load delivery details from localStorage on mount
  useEffect(() => {
    const savedDetails = localStorage.getItem("deliveryDetails");
    if (savedDetails) {
      try {
        const parsed = JSON.parse(savedDetails);
        setDeliveryForm(prev => ({
          ...prev,
          ...parsed
        }));
      } catch (e) {
        console.error("Failed to parse saved delivery details");
      }
    }
  }, []);

  // Save delivery details to localStorage on change
  useEffect(() => {
    localStorage.setItem("deliveryDetails", JSON.stringify({
      name: deliveryForm.name,
      phone: deliveryForm.phone,
      deliveryType: deliveryForm.deliveryType,
      hostelBlock: deliveryForm.hostelBlock,
      roomNumber: deliveryForm.roomNumber,
      address: deliveryForm.address,
      city: deliveryForm.city,
      pincode: deliveryForm.pincode,
    }));
  }, [deliveryForm]);

  // Generate dynamic QR code when moving to step 2 and UPI is selected
  useEffect(() => {
    if (checkoutStep === 2 && totalPrice > 0 && paymentMethod === "upi") {
      setLoadingQr(true);
      fetch(`/api/generate-qr?amount=${totalPrice}&name=${encodeURIComponent(deliveryForm.name)}`)
        .then((res) => res.json())
        .then((data) => {
          setQrCode(data.qrCode);
          setUpiDeepLink(data.upiUrl);
        })
        .catch(() => {
          showToast("Failed to generate QR code", "error");
        })
        .finally(() => setLoadingQr(false));
    }
  }, [checkoutStep, totalPrice, deliveryForm.name, showToast, paymentMethod]);

  const [placedOrderId, setPlacedOrderId] = useState<string>("");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);


  const handleFormChange = (field: string, value: string) => {
    setDeliveryForm((prev) => ({ ...prev, [field]: value }));
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
      // hostel/block is optional
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

  const handleConfirmPayment = async () => {
    if (isPlacingOrder) return;
    setIsPlacingOrder(true);
    try {
      const deliveryAddress = deliveryForm.deliveryType === "chandigarh-university"
        ? `Chandigarh University${deliveryForm.hostelBlock ? ` · ${deliveryForm.hostelBlock}` : ""}${deliveryForm.roomNumber ? ` · Room ${deliveryForm.roomNumber}` : ""}`
        : `${deliveryForm.address}, ${deliveryForm.city} - ${deliveryForm.pincode}`;

      const orderId = await placeOrder(items, totalPrice, {
        name: deliveryForm.name,
        phone: deliveryForm.phone,
        address: deliveryAddress,
      });

      setPlacedOrderId(orderId);
      setFinalAmount(totalPrice);
      showToast("Order recorded successfully!", "success");
      clearCart();
      setCheckoutStep(3);

      // WhatsApp redirection for UPI payments
      if (paymentMethod === "upi") {
        const phoneNumber = "8979370679";
        const message = `*Payment Confirmation*\n\n*Order ID:* ${orderId}\n*Name:* ${deliveryForm.name}\n*Amount:* ₹${totalPrice}\n*Address:* ${deliveryAddress}\n\nI have completed the payment. Please find the screenshot attached.`;

        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

        // Open WhatsApp in a new tab/window
        window.open(whatsappUrl, '_blank');
      }
    } catch (error: any) {
      showToast(error.message || "Failed to place order", "error");
    } finally {
      setIsPlacingOrder(false);
    }
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
                  className="group bg-gray-900 border border-gray-800 rounded-2xl p-4 sm:p-5 hover:border-cyan-500/30 transition-all shadow-sm"
                >
                  <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
                    {/* Thumbnail */}
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 ${project.technology === "ESP32" ? "bg-red-500/10" : "bg-cyan-500/10"}`}>
                      {hasRealImage ? (
                        <Image
                          src={project.image}
                          alt={project.title}
                          width={56}
                          height={56}
                          className="object-cover w-full h-full rounded-xl"
                        />
                      ) : (
                        <Cpu size={24} className={project.technology === "ESP32" ? "text-red-400" : "text-cyan-400"} />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-bold text-lg mb-0.5 truncate">{project.title}</h3>
                      <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">{project.technology} Project</p>
                    </div>

                    {/* Quantity + Price + Remove */}
                    <div className="flex items-center gap-4 sm:ml-auto">
                      <div className="flex items-center gap-2 bg-gray-800 rounded-lg p-1">
                        <button
                          onClick={() => updateQuantity(project.id, quantity - 1)}
                          disabled={quantity <= 1}
                          className="w-7 h-7 rounded-md bg-gray-700 hover:bg-gray-600 disabled:opacity-30 flex items-center justify-center transition-colors text-white"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-white font-mono font-bold text-sm w-6 text-center">{quantity}</span>
                        <button
                          onClick={() => updateQuantity(project.id, quantity + 1)}
                          className="w-7 h-7 rounded-md bg-gray-700 hover:bg-gray-600 flex items-center justify-center transition-colors text-white"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <span className="text-xl font-black text-cyan-400">
                        ₹{project.price * quantity}
                      </span>
                      <button
                        onClick={() => removeFromCart(project.id)}
                        className="p-2 text-gray-600 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                        title="Remove item"
                      >
                        <Trash2 size={18} />
                      </button>
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
            <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl font-black text-white mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-cyan-500 rounded-full"></span>
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
          <div className="relative bg-gray-900 border border-gray-800 rounded-3xl max-w-md w-full p-6 shadow-2xl shadow-cyan-500/10 animate-in my-4 max-h-[90vh] overflow-y-auto">
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
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold ${checkoutStep === 2 ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30" : checkoutStep === 3 ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-gray-800 text-gray-500 border border-gray-700"}`}>
                {checkoutStep === 3 ? <CheckCircle2 size={14} /> : <QrCode size={14} />}
                Payment
              </div>
            </div>

            {/* ===== STEP 1: Delivery Details ===== */}
            {checkoutStep === 1 && (
              <div>
                <div className="text-center mb-4">
                  <h2 className="text-lg font-black text-white mb-0.5">Delivery Details</h2>
                  <p className="text-gray-400 text-xs text-balance">Tell us where to deliver your project</p>
                </div>

                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-medium text-gray-400 mb-1">
                      <User size={12} className="text-cyan-400" />
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={deliveryForm.name}
                      onChange={(e) => handleFormChange("name", e.target.value)}
                      placeholder="Enter your name"
                      className={`w-full px-3 py-2.5 bg-gray-800/60 border ${formErrors.name ? "border-red-500/50" : "border-gray-700"} text-white rounded-xl text-sm placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/50 transition-all`}
                    />
                    {formErrors.name && <p className="text-red-400 text-[10px] mt-1">{formErrors.name}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-1.5">
                      <Phone size={14} className="text-cyan-400" />
                      Phone Number <span className="text-red-500">*</span>
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

            {/* ===== STEP 2: Payment via UPI ===== */}
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
                  <p className="text-gray-600 text-[10px] mb-1.5 font-bold uppercase tracking-wider">Delivering to</p>
                  <p className="text-white font-bold text-base mb-1">{deliveryForm.name}</p>
                  <p className="text-gray-500 text-xs font-semibold">{deliveryForm.phone}</p>
                  <p className="text-gray-700 text-xs mt-1 leading-relaxed">
                    {deliveryForm.deliveryType === "chandigarh-university"
                      ? `Chandigarh University${deliveryForm.hostelBlock ? ` · ${deliveryForm.hostelBlock}` : ""}${deliveryForm.roomNumber ? ` · Room ${deliveryForm.roomNumber}` : ""}`
                      : `${deliveryForm.address}, ${deliveryForm.city} - ${deliveryForm.pincode}`
                    }
                  </p>
                </div>

                {/* Professional Payment Method Selection (Grid Layout Reverted) */}
                <div className="flex flex-col gap-4 mb-8">
                  <div className="flex items-center justify-between px-1">
                    <h2 className="text-xl font-black text-white flex items-center gap-2">
                      <span className="w-1.5 h-6 bg-cyan-500 rounded-full"></span>
                      Payment Options
                    </h2>
                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                      <div className="w-1 h-1 rounded-full bg-cyan-500 animate-pulse"></div>
                      <span className="text-[9px] uppercase tracking-widest text-cyan-400 font-black">Secure</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {/* UPI Option */}
                    <button
                      onClick={() => setPaymentMethod("upi")}
                      className={`relative group flex flex-col items-center gap-1.5 p-4 rounded-2xl border transition-all duration-300 text-center ${paymentMethod === "upi"
                        ? "bg-cyan-500/10 border-cyan-500/50 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-500/50"
                        : "bg-gray-800/20 border-gray-700/50 hover:border-gray-600"
                        }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${paymentMethod === "upi" ? "bg-cyan-500 text-gray-950 shadow-lg shadow-cyan-500/20" : "bg-gray-800 text-gray-400"}`}>
                        <QrCode size={20} strokeWidth={2.5} />
                      </div>
                      <h3 className={`font-bold text-xs transition-colors ${paymentMethod === "upi" ? "text-white" : "text-gray-400"}`}>UPI Payment</h3>
                      {paymentMethod === "upi" && (
                        <div className="absolute top-1.5 right-1.5 w-3.5 h-3.5 rounded-full bg-cyan-500 flex items-center justify-center">
                          <CheckCircle2 size={9} className="text-gray-950" />
                        </div>
                      )}
                    </button>

                    {/* COD Option */}
                    <button
                      onClick={() => setPaymentMethod("cod")}
                      className={`relative group flex flex-col items-center gap-1.5 p-4 rounded-2xl border transition-all duration-300 text-center ${paymentMethod === "cod"
                        ? "bg-orange-500/10 border-orange-500/50 shadow-lg shadow-orange-500/10 ring-1 ring-orange-500/50"
                        : "bg-gray-800/20 border-gray-700/50 hover:border-gray-600"
                        }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${paymentMethod === "cod" ? "bg-orange-500 text-gray-950 shadow-lg shadow-orange-500/20" : "bg-gray-800 text-gray-400"}`}>
                        <Package size={20} strokeWidth={2.5} />
                      </div>
                      <h3 className={`font-bold text-xs transition-colors ${paymentMethod === "cod" ? "text-white" : "text-gray-400"}`}>Pay on COD</h3>
                      {paymentMethod === "cod" && (
                        <div className="absolute top-1.5 right-1.5 w-3.5 h-3.5 rounded-full bg-orange-500 flex items-center justify-center">
                          <CheckCircle2 size={9} className="text-gray-950" />
                        </div>
                      )}
                    </button>
                  </div>
                </div>

                {paymentMethod === "upi" ? (
                  <>
                    <div className="text-center mb-5">
                      <p className="text-gray-400 text-sm">Scan QR or tap the button to pay via UPI</p>
                    </div>

                    {/* Total */}
                    <div className="bg-gray-800/60 border border-gray-700 rounded-xl p-3 mb-4 text-center">
                      <p className="text-gray-500 text-[10px] mb-0.5">Amount to Pay</p>
                      <p className="text-3xl font-black text-cyan-400">₹{totalPrice}</p>
                    </div>

                    {/* Dynamic QR Code with Premium Scan Corners */}
                    <div className="relative p-6 bg-white rounded-3xl mx-auto w-fit shadow-2xl shadow-cyan-500/10 group animate-fade-in-up-delay-1">
                      {/* Scan Corners */}
                      <div className="absolute top-2 left-2 w-6 h-6 border-t-4 border-l-4 border-cyan-500 rounded-tl-lg transition-all group-hover:scale-110"></div>
                      <div className="absolute top-2 right-2 w-6 h-6 border-t-4 border-r-4 border-cyan-500 rounded-tr-lg transition-all group-hover:scale-110"></div>
                      <div className="absolute bottom-2 left-2 w-6 h-6 border-b-4 border-l-4 border-cyan-500 rounded-bl-lg transition-all group-hover:scale-110"></div>
                      <div className="absolute bottom-2 right-2 w-6 h-6 border-b-4 border-r-4 border-cyan-500 rounded-br-lg transition-all group-hover:scale-110"></div>

                      {loadingQr ? (
                        <div className="w-[160px] h-[160px] flex items-center justify-center">
                          <Loader2 size={24} className="text-gray-300 animate-spin" />
                        </div>
                      ) : qrCode ? (
                        <div className="relative">
                          <img
                            src={qrCode}
                            alt="Scan to pay via UPI"
                            width={160}
                            height={160}
                            className="rounded-lg select-none"
                          />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/40 backdrop-blur-[1px] rounded-lg pointer-events-none">
                            <p className="text-[10px] font-black tracking-widest text-cyan-700 bg-white/90 px-3 py-1.5 rounded-full shadow-lg">SCAN TO PAY</p>
                          </div>
                        </div>
                      ) : (
                        <div className="w-[160px] h-[160px] flex items-center justify-center text-gray-400 text-xs">
                          QR Code Error
                        </div>
                      )}
                    </div>

                    <p className="mt-4 text-center text-[11px] font-black text-gray-500 uppercase tracking-widest flex items-center justify-center gap-2 mb-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></span>
                      Scanning active · ₹{totalPrice}
                    </p>

                    {/* Professional Payment Partner Logos */}
                    <div className="flex flex-col items-center gap-2 mb-3 px-3 py-2 bg-gray-800/20 border border-gray-700/30 rounded-xl mx-auto w-full max-w-[280px]">
                      <p className="text-[9px] uppercase tracking-[0.2em] text-gray-500 font-bold">Trusted Partners</p>
                      <div className="flex items-center justify-center gap-5">
                        {/* GPay */}
                        <div className="flex items-center gap-1.5 group cursor-default">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" fill="#4285F4" />
                          </svg>
                          <span className="text-xs font-bold text-gray-500 group-hover:text-white transition-colors tracking-tight">GPay</span>
                        </div>

                        {/* PhonePe */}
                        <div className="flex items-center gap-1.5 group cursor-default">
                          <div className="w-[14px] h-[14px] bg-[#5f259f] rounded flex items-center justify-center">
                            <span className="text-white text-[8px] font-black">P</span>
                          </div>
                          <span className="text-xs font-bold text-gray-500 group-hover:text-white transition-colors tracking-tight">PhonePe</span>
                        </div>

                        {/* BHIM UPI */}
                        <div className="flex items-center gap-1.5 group cursor-default">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z" fill="#FF9933" />
                            <path d="M12 18L18.79 21L19.5 20.29L12 2L12 18Z" fill="#138808" />
                          </svg>
                          <span className="text-xs font-bold text-gray-500 group-hover:text-white transition-colors tracking-tight">BHIM</span>
                        </div>
                      </div>
                    </div>

                    {/* Professional OR Divider */}
                    <div className="flex items-center gap-4 mb-3 opacity-40">
                      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>
                      <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">OR</span>
                      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>
                    </div>

                    {/* Pay via UPI App button (deep link) */}
                    <div className="space-y-4">
                      {upiDeepLink && (
                        <div className="relative group">
                          {/* Premium Glowing Background */}
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

                          <a
                            href={upiDeepLink}
                            className="relative w-full py-4 bg-gray-950 border border-green-500/30 text-white font-extrabold rounded-2xl hover:bg-gray-800 transition-all shadow-xl flex flex-col items-center justify-center gap-0.5 overflow-hidden"
                          >
                            <div className="flex items-center gap-2.5">
                              <Smartphone size={16} className="text-green-400" />
                              <div className="text-left">
                                <span className="block text-[8px] uppercase tracking-widest text-green-400/70 font-black">Mobile Checkout</span>
                                <span className="text-sm">Pay ₹{totalPrice} via UPI App</span>
                              </div>
                            </div>

                            {/* Scanning line animation */}
                            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-green-500/50 to-transparent translate-x-[-100%] animate-[shimmer_2s_infinite]"></div>
                          </a>
                        </div>
                      )}

                      {/* Trust Indicators */}
                      <div className="flex items-center justify-center gap-5 py-2 border-y border-gray-800/40">
                        <div className="flex items-center gap-1.5 opacity-50">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                          <span className="text-[9px] font-bold uppercase tracking-wider text-gray-500">Encrypted</span>
                        </div>
                        <div className="flex items-center gap-1.5 opacity-50">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                          <span className="text-[9px] font-bold uppercase tracking-wider text-gray-500">Verified</span>
                        </div>
                      </div>
                    </div>


                    {/* Optimized Steps for Trust */}
                    <div className="bg-gray-800/30 rounded-2xl p-5 border border-gray-700/30">
                      <h4 className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-4 flex items-center gap-2">
                        <div className="w-1 h-3 bg-cyan-500 rounded-full"></div>
                        Payment Process
                      </h4>
                      <div className="space-y-4">
                        {[
                          { title: "Initiate", desc: "Scan the QR or click the green button above on mobile" },
                          { title: "Authenticate", desc: "Enter your secure UPI PIN in your preferred app" },
                          { title: "Complete", desc: "Come back here to confirm and track your project" },
                        ].map((step, i) => (
                          <div key={i} className="flex items-start gap-4">
                            <div className="w-6 h-6 rounded-lg bg-gray-900 border border-gray-800 text-cyan-400 flex items-center justify-center text-[10px] font-black flex-shrink-0">
                              0{i + 1}
                            </div>
                            <div>
                              <p className="text-xs font-bold text-white leading-none mb-1">{step.title}</p>
                              <p className="text-[11px] text-gray-500 leading-relaxed font-medium">{step.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Professional Informational Note */}
                    <div className="flex items-center justify-center gap-2 py-1 px-4 text-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></div>
                      <p className="text-[11px] font-medium text-gray-400 italic">
                        After payment, click the button below to confirm your order
                      </p>
                    </div>

                    {/* Place Order button */}
                    {!isLoggedIn ? (
                      <button
                        onClick={loginWithGoogle}
                        className="w-full mt-4 py-4 bg-cyan-500 text-gray-950 font-bold rounded-xl hover:bg-cyan-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 text-sm"
                      >
                        <User size={18} />
                        Login to Place Order
                      </button>
                    ) : (
                      <div className="mt-6 relative group animate-fade-in-up-delay-2">
                        <div className="absolute inset-x-0 -top-px -bottom-px rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 blur-md opacity-20 group-hover:opacity-40 transition-opacity animate-pulse"></div>
                        <button
                          onClick={handleConfirmPayment}
                          disabled={isPlacingOrder}
                          className={`relative w-full py-4 bg-green-500 text-gray-950 font-black rounded-2xl transition-all flex flex-col items-center justify-center gap-0.5 shadow-2xl active:scale-95 ${isPlacingOrder ? 'opacity-70 cursor-not-allowed' : 'hover:bg-green-400 hover:scale-[1.02]'}`}
                        >
                          {isPlacingOrder ? (
                            <div className="flex items-center gap-2 text-sm uppercase tracking-widest">
                              <Loader2 size={18} className="animate-spin" />
                              Placing Order...
                            </div>
                          ) : (
                            <>
                              <div className="flex items-center gap-2 text-sm uppercase tracking-widest">
                                <CheckCircle2 size={18} />
                                I&apos;ve Completed Payment
                              </div>
                              <p className="text-[10px] opacity-70 font-bold uppercase tracking-tighter">Click to finalize & notify admin</p>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-orange-500/5 border border-orange-500/20 rounded-2xl p-5 text-center">
                      <div className="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Package size={24} className="text-white" />
                      </div>
                      <h3 className="text-white font-bold text-base mb-1">Cash on Delivery</h3>
                      <p className="text-gray-400 text-xs leading-relaxed">
                        Pay our delivery partner when they arrive with your project.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        <CheckCircle2 size={14} className="text-green-400" />
                        <span>Available for CU Campus & Outside</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        <CheckCircle2 size={14} className="text-green-400" />
                        <span>Safe & Reliable delivery</span>
                      </div>
                    </div>

                    {!isLoggedIn ? (
                      <button
                        onClick={loginWithGoogle}
                        className="w-full py-4 bg-cyan-500 text-gray-950 font-bold rounded-xl hover:bg-cyan-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 text-sm"
                      >
                        <User size={18} />
                        Login to Place Order
                      </button>
                    ) : (
                      <button
                        onClick={handleConfirmPayment}
                        disabled={isPlacingOrder}
                        className={`w-full py-4 bg-orange-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 text-sm ${isPlacingOrder ? 'opacity-70 cursor-not-allowed' : 'hover:bg-orange-400 hover:scale-[1.02]'}`}
                      >
                        {isPlacingOrder ? (
                          <>
                            <Loader2 size={18} className="animate-spin" />
                            Placing Order...
                          </>
                        ) : (
                          <>
                            <Package size={18} />
                            Confirm COD Order
                          </>
                        )}
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* ===== STEP 3: Order Confirmation ===== */}
            {checkoutStep === 3 && (
              <div className="text-center py-2">
                {paymentMethod === "upi" ? (
                  <>
                    <div className="w-16 h-16 bg-yellow-500/10 border-2 border-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Clock size={32} className="text-yellow-400" />
                    </div>
                    <h2 className="text-xl font-black text-white mb-1">Verification Pending</h2>
                    <p className="text-gray-400 text-xs mb-4">
                      Your order is recorded but <span className="text-yellow-400 font-bold underline">not processed</span> yet!
                    </p>
                  </>
                ) : (
                  <>
                    <div className="w-16 h-16 bg-green-500/10 border-2 border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 size={32} className="text-green-400" />
                    </div>
                    <h2 className="text-xl font-black text-gray-900 dark:text-white mb-1">Order Placed!</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-xs mb-4">We&apos;ve received your COD order!</p>
                  </>
                )}

                <div className="bg-gray-100 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-xl p-3 mb-4">
                  <p className="text-gray-400 dark:text-gray-500 text-[10px] mb-0.5">Order ID</p>
                  <p className="text-cyan-600 dark:text-cyan-400 font-mono font-bold text-base">{placedOrderId}</p>
                  <p className="text-gray-500 dark:text-gray-500 text-[10px] mt-1.5 leading-tight">
                    {paymentMethod === "upi"
                      ? 'Please send the payment screenshot on WhatsApp to confirm your order.'
                      : 'Our team will contact you soon for order confirmation!'}
                  </p>
                </div>

                {paymentMethod === "upi" && (
                  <button
                    onClick={() => {
                      const phoneNumber = "8979370679";
                      const fullAddress = deliveryForm.deliveryType === "chandigarh-university"
                        ? `Chandigarh University${deliveryForm.hostelBlock ? ` · ${deliveryForm.hostelBlock}` : ""}${deliveryForm.roomNumber ? ` · Room ${deliveryForm.roomNumber}` : ""}`
                        : `${deliveryForm.address}, ${deliveryForm.city} - ${deliveryForm.pincode}`;

                      const message = `*Payment Confirmation*\n\n*Order ID:* ${placedOrderId}\n*Name:* ${deliveryForm.name}\n*Amount:* ₹${finalAmount}\n*Address:* ${fullAddress}\n\nI have completed the payment. Please find the screenshot attached.`;

                      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                      window.open(whatsappUrl, '_blank');
                    }}
                    className="w-full mb-3 py-3.5 bg-green-500 text-white font-bold rounded-xl hover:bg-green-400 transition-all text-sm flex items-center justify-center gap-2 shadow-lg shadow-green-500/20"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.747-2.874-2.512-2.96-2.626-.087-.113-.708-.941-.708-1.793 0-.852.449-1.27.608-1.441.159-.171.348-.215.464-.215.117 0 .231.001.332.006.106.005.249-.04.39.299.144.35.493 1.202.536 1.29.043.087.072.19.014.305-.058.114-.087.19-.174.29l-.261.305c-.087.1-.18.21-.077.387.106.177.471.778.992 1.242.673.6 1.241.786 1.417.873.177.087.28.072.384-.045.101-.116.438-.509.554-.683.117-.174.232-.145.39-.087.159.058 1.015.479 1.189.565.173.088.289.132.332.203.043.074.043.429-.101.834z" />
                    </svg>
                    Send Screenshot on WhatsApp
                  </button>
                )}

                <button
                  onClick={() => {
                    setShowCheckout(false);
                    router.push("/orders");
                  }}
                  className="w-full py-3.5 bg-cyan-500 text-gray-950 font-bold rounded-xl hover:bg-cyan-400 transition-all text-sm flex items-center justify-center gap-2"
                >
                  <Package size={16} />
                  Track Order Status
                </button>

                <Link
                  href="/projects"
                  onClick={() => setShowCheckout(false)}
                  className="w-full flex items-center justify-center gap-2 mt-3 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-xl text-sm font-medium transition-all hover:bg-gray-200 dark:hover:bg-gray-700"
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
