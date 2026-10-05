import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { OrderType, PaymentMethod } from '../../types';
import {
  X,
  Bike,
  Store,
  UtensilsCrossed,
  CreditCard,
  Banknote,
  Smartphone,
  CheckCircle2,
  Clock,
  MapPin,
  ShieldCheck,
  ChevronRight,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (orderNumber: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const {
    cart,
    cartSubtotal,
    appliedCoupon,
    discountAmount,
    clearCart,
    createOrder,
    currentBranch,
  } = useApp();

  const [orderType, setOrderType] = useState<OrderType>('delivery');
  const [customerName, setCustomerName] = useState('Daniyal Qureshi');
  const [customerPhone, setCustomerPhone] = useState('+92 300 4882190');
  const [customerEmail, setCustomerEmail] = useState('daniyal.q@yahoo.com');

  // Delivery Fields
  const [streetAddress, setStreetAddress] = useState('Bungalow 12, Main Khayaban-e-Hafiz, Phase 6');
  const [area, setArea] = useState('DHA Phase 6');
  const [deliveryInstructions, setDeliveryInstructions] = useState('Call upon arrival at the security gate');
  const [deliveryTiming, setDeliveryTiming] = useState<'asap' | 'scheduled'>('asap');
  const [scheduledTime, setScheduledTime] = useState('20:30');

  // Dine-in table
  const [tableNumber, setTableNumber] = useState('T-04');

  // Payment
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');

  if (!isOpen) return null;

  const estimatedTax = Math.round(cartSubtotal * 0.16);
  const deliveryFee = orderType === 'delivery' ? (appliedCoupon?.code === 'FREEDEL' ? 0 : 180) : 0;
  const grandTotal = Math.max(0, cartSubtotal - discountAmount + estimatedTax + deliveryFee);

  const handlePlaceOrder = () => {
    const orderItems = cart.map((ci) => ({
      id: `oi_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      menuItemId: ci.menuItem.id,
      name: ci.menuItem.name,
      variantName: ci.variant?.name,
      unitPrice: ci.variant ? ci.variant.price : ci.menuItem.basePrice,
      quantity: ci.quantity,
      modifiers: ci.selectedModifiers.map((m) => ({ name: m.name, price: m.price })),
      spiceLevel: ci.spiceLevel,
      notes: ci.specialInstructions,
      totalPrice: ci.itemTotal,
      kitchenStation: ci.menuItem.kitchenStation,
    }));

    const created = createOrder({
      orderType,
      customerName,
      customerPhone,
      customerEmail: customerEmail || undefined,
      tableNumber: orderType === 'dine_in' ? tableNumber : undefined,
      deliveryAddress:
        orderType === 'delivery'
          ? {
              street: streetAddress,
              area,
              city: 'Karachi',
              instructions: deliveryInstructions,
            }
          : undefined,
      items: orderItems,
      subtotal: cartSubtotal,
      discount: discountAmount,
      tax: estimatedTax,
      deliveryFee,
      total: grandTotal,
      paymentMethod,
      paymentStatus: paymentMethod === 'cash' ? 'unpaid' : 'paid',
      couponCode: appliedCoupon?.code,
    });

    clearCart();
    onSuccess(created.orderNumber);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-[#141210] border border-[#2e2a25] rounded-xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#24201c] flex items-center justify-between bg-[#100e0c]">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-amber-500">
              SAVORÉ Checkout
            </span>
            <h2 className="font-serif-luxury text-xl font-bold text-white">
              Complete Your Order
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          {/* 1. Order Type Selection */}
          <div>
            <label className="block text-xs uppercase font-semibold tracking-wider text-neutral-300 mb-2">
              1. Select Dining Mode
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { type: 'delivery' as const, label: 'Delivery', icon: <Bike className="w-4 h-4" /> },
                { type: 'takeaway' as const, label: 'Pickup / Takeaway', icon: <Store className="w-4 h-4" /> },
                { type: 'dine_in' as const, label: 'Dine-In', icon: <UtensilsCrossed className="w-4 h-4" /> },
              ].map((m) => (
                <button
                  key={m.type}
                  type="button"
                  onClick={() => setOrderType(m.type)}
                  className={`flex items-center justify-center gap-2 p-3 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                    orderType === m.type
                      ? 'border-amber-500 bg-amber-950/30 text-amber-300 ring-1 ring-amber-500/40'
                      : 'border-neutral-800 bg-[#181512] text-neutral-400 hover:text-white'
                  }`}
                >
                  {m.icon}
                  <span>{m.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Customer Credentials */}
          <div>
            <label className="block text-xs uppercase font-semibold tracking-wider text-neutral-300 mb-2">
              2. Guest Contact Information
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <span className="block text-[11px] text-neutral-400 mb-1">Full Name</span>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full p-2.5 bg-[#181512] border border-neutral-800 rounded-lg text-xs text-white focus:border-amber-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <span className="block text-[11px] text-neutral-400 mb-1">Phone Number (Pakistan)</span>
                <input
                  type="text"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full p-2.5 bg-[#181512] border border-neutral-800 rounded-lg text-xs text-white focus:border-amber-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <span className="block text-[11px] text-neutral-400 mb-1">Email Address</span>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full p-2.5 bg-[#181512] border border-neutral-800 rounded-lg text-xs text-white focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* 3. Address / Location / Table Details */}
          {orderType === 'delivery' && (
            <div className="space-y-3 pt-3 border-t border-neutral-900">
              <label className="block text-xs uppercase font-semibold tracking-wider text-neutral-300">
                3. Delivery Destination
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <span className="block text-[11px] text-neutral-400 mb-1">Street / House / Villa</span>
                  <input
                    type="text"
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    className="w-full p-2.5 bg-[#181512] border border-neutral-800 rounded-lg text-xs text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <span className="block text-[11px] text-neutral-400 mb-1">Area / Sector</span>
                  <input
                    type="text"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full p-2.5 bg-[#181512] border border-neutral-800 rounded-lg text-xs text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <span className="block text-[11px] text-neutral-400 mb-1">Rider Instructions</span>
                <input
                  type="text"
                  value={deliveryInstructions}
                  onChange={(e) => setDeliveryInstructions(e.target.value)}
                  placeholder="Gate code, landmark, do not ring bell, etc."
                  className="w-full p-2 bg-[#181512] border border-neutral-800 rounded-lg text-xs text-white focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          {orderType === 'dine_in' && (
            <div className="pt-3 border-t border-neutral-900 space-y-2">
              <label className="block text-xs uppercase font-semibold tracking-wider text-neutral-300">
                Table Identification
              </label>
              <div className="flex items-center gap-3">
                <span className="text-xs text-neutral-400">Selected Table Number:</span>
                <select
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  className="p-2 bg-[#181512] border border-neutral-800 rounded-lg text-xs text-amber-300 font-semibold focus:border-amber-500 focus:outline-none"
                >
                  <option value="T-01">T-01 (Main Dining - 2 Seats)</option>
                  <option value="T-02">T-02 (Main Dining - 2 Seats)</option>
                  <option value="T-03">T-03 (Main Dining - 4 Seats)</option>
                  <option value="T-04">T-04 (Main Dining - 4 Seats)</option>
                  <option value="T-06">T-06 (Family Hall - 8 Seats)</option>
                  <option value="OD-01">OD-01 (Outdoor Terrace - 4 Seats)</option>
                  <option value="VIP-01">VIP-01 (VIP Lounge - 8 Seats)</option>
                </select>
              </div>
            </div>
          )}

          {orderType === 'takeaway' && (
            <div className="pt-3 border-t border-neutral-900 p-3 rounded-lg bg-[#181512] border border-neutral-800 text-xs text-neutral-300">
              <p className="font-semibold text-amber-300">Pickup Counter:</p>
              <p className="text-neutral-400 mt-0.5">
                SAVORÉ Flagship Clifton — Marine Promenade, Karachi. Ready in approx. 20–25 mins.
              </p>
            </div>
          )}

          {/* 4. Payment Methods */}
          <div className="pt-3 border-t border-neutral-900">
            <label className="block text-xs uppercase font-semibold tracking-wider text-neutral-300 mb-2">
              4. Payment Method
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { method: 'card' as const, label: 'Credit / Debit Card', icon: <CreditCard className="w-4 h-4" /> },
                { method: 'cash' as const, label: orderType === 'delivery' ? 'Cash on Delivery' : 'Cash Counter', icon: <Banknote className="w-4 h-4" /> },
                { method: 'easypaisa' as const, label: 'Easypaisa', icon: <Smartphone className="w-4 h-4 text-emerald-400" /> },
                { method: 'jazzcash' as const, label: 'JazzCash', icon: <Smartphone className="w-4 h-4 text-red-400" /> },
              ].map((p) => (
                <button
                  key={p.method}
                  type="button"
                  onClick={() => setPaymentMethod(p.method)}
                  className={`p-2.5 rounded-lg border text-left text-xs transition-all cursor-pointer ${
                    paymentMethod === p.method
                      ? 'border-amber-500 bg-amber-950/30 text-amber-300 ring-1 ring-amber-500/40'
                      : 'border-neutral-800 bg-[#181512] text-neutral-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1 text-white">
                    {p.icon}
                  </div>
                  <div className="font-semibold text-[11px] truncate">{p.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Order Summary Recap */}
          <div className="p-4 rounded-xl bg-[#181512] border border-neutral-800 space-y-2">
            <div className="text-xs uppercase font-bold tracking-wider text-amber-400 mb-2">
              Order Summary ({cart.reduce((a, b) => a + b.quantity, 0)} items)
            </div>
            <div className="space-y-1 text-xs text-neutral-300">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>PKR {cartSubtotal.toLocaleString()}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-amber-400">
                  <span>Privilege Discount ({appliedCoupon?.code})</span>
                  <span>- PKR {discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Sales Tax (16% GST)</span>
                <span>PKR {estimatedTax.toLocaleString()}</span>
              </div>
              {orderType === 'delivery' && (
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>
                    {deliveryFee === 0 ? <span className="text-emerald-400">FREE</span> : `PKR ${deliveryFee}`}
                  </span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t border-neutral-800 text-sm font-bold text-white">
                <span>Total Amount Due</span>
                <span className="text-amber-400 font-serif-luxury text-base">
                  PKR {grandTotal.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-[#24201c] bg-[#100e0c] flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-lg border border-neutral-800 text-neutral-300 hover:text-white text-xs font-semibold cursor-pointer"
          >
            Back to Cart
          </button>
          <button
            type="button"
            onClick={handlePlaceOrder}
            className="flex-1 max-w-sm flex items-center justify-center gap-2 py-3 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-semibold text-sm transition-all shadow-lg shadow-amber-950/60 cursor-pointer"
          >
            <span>Confirm & Place Order</span>
            <CheckCircle2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
