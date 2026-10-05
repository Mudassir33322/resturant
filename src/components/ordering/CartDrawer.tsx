import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Plus,
  Minus,
  Trash2,
  Tag,
  ArrowRight,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  onProceedToCheckout,
}) => {
  const {
    cart,
    removeFromCart,
    updateCartQty,
    clearCart,
    cartSubtotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    discountAmount,
    setActiveView,
  } = useApp();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  if (!isOpen) return null;

  const estimatedTax = Math.round(cartSubtotal * 0.16); // 16% GST
  const estimatedDelivery = cartSubtotal > 0 ? (appliedCoupon?.code === 'FREEDEL' ? 0 : 180) : 0;
  const grandTotal = Math.max(0, cartSubtotal - discountAmount + estimatedTax + estimatedDelivery);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');
    if (!couponInput.trim()) return;

    const res = applyCoupon(couponInput.trim());
    if (res.success) {
      setCouponSuccess(res.message);
      setCouponInput('');
    } else {
      setCouponError(res.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#13110f] border-l border-[#2e2a25] flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-5 border-b border-[#24201c] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-500" />
              <h2 className="font-serif-luxury text-lg font-bold text-[#f5efe6]">
                Your Culinary Bag ({cart.reduce((a, b) => a + b.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#1e1b18] border border-amber-900/30 flex items-center justify-center text-amber-500">
                  <ShoppingBag className="w-8 h-8 opacity-60" />
                </div>
                <div>
                  <h3 className="font-serif-luxury text-lg text-white font-semibold">
                    Your bag is empty
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1 max-w-[240px]">
                    Explore our curated artisanal menu and indulge in culinary mastery.
                  </p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    setActiveView('menu');
                  }}
                  className="px-5 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Explore Menu
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.cartItemId}
                  className="p-3.5 rounded-xl bg-[#191613] border border-[#2b2723] flex gap-3.5 relative group"
                >
                  <img
                    src={item.menuItem.image}
                    alt={item.menuItem.name}
                    className="w-16 h-16 rounded-lg object-cover bg-neutral-900 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-bold text-[#f1ece4] truncate">
                        {item.menuItem.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="text-neutral-500 hover:text-red-400 transition-colors cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Variant & Modifiers */}
                    <div className="text-[11px] text-neutral-400 mt-0.5 space-y-0.5">
                      {item.variant && (
                        <span className="text-amber-300 font-medium">
                          {item.variant.name}
                        </span>
                      )}
                      {item.spiceLevel && (
                        <span className="text-neutral-400 ml-1.5">
                          · {item.spiceLevel}
                        </span>
                      )}
                      {item.selectedModifiers.length > 0 && (
                        <div className="text-neutral-500 text-[10px] truncate">
                          + {item.selectedModifiers.map((m) => m.name).join(', ')}
                        </div>
                      )}
                    </div>

                    {/* Quantity & Subtotal */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-neutral-800 rounded bg-[#13110f]">
                        <button
                          onClick={() => updateCartQty(item.cartItemId, item.quantity - 1)}
                          className="p-1 px-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-semibold px-2 text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQty(item.cartItemId, item.quantity + 1)}
                          className="p-1 px-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-bold text-amber-400">
                        PKR {item.itemTotal.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Calculations */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#26221e] bg-[#100e0c] space-y-4">
              {/* Promo Code Form */}
              <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Promo Code (e.g. SAVORE20)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-[#181512] border border-neutral-800 rounded-lg text-xs text-white placeholder-neutral-500 uppercase focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3.5 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-amber-300 font-semibold text-xs transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>

                {appliedCoupon && (
                  <div className="flex items-center justify-between px-2.5 py-1 rounded bg-amber-950/30 border border-amber-800/40 text-[11px] text-amber-300">
                    <span>
                      Code <strong>{appliedCoupon.code}</strong> applied ({appliedCoupon.title})
                    </span>
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="text-neutral-400 hover:text-white ml-2 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
                {couponError && <p className="text-[11px] text-red-400">{couponError}</p>}
                {couponSuccess && <p className="text-[11px] text-emerald-400">{couponSuccess}</p>}
              </form>

              {/* Order Cost Breakdown */}
              <div className="space-y-1.5 text-xs text-neutral-300 pt-2 border-t border-neutral-900">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>PKR {cartSubtotal.toLocaleString()}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-amber-400">
                    <span>Privilege Discount</span>
                    <span>- PKR {discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated GST (16%)</span>
                  <span>PKR {estimatedTax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Surcharge</span>
                  <span>
                    {estimatedDelivery === 0 ? (
                      <span className="text-emerald-400 font-semibold">FREE</span>
                    ) : (
                      `PKR ${estimatedDelivery.toLocaleString()}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-neutral-800 text-sm font-bold text-white">
                  <span>Estimated Total</span>
                  <span className="text-amber-400">PKR {grandTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-semibold text-sm transition-all shadow-lg shadow-amber-950/60 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
