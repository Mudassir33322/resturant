import React from 'react';
import { useApp } from '../../context/AppContext';
import { OrderStatus } from '../../types';
import {
  CheckCircle2,
  Clock,
  Flame,
  Bike,
  Home,
  CheckCheck,
  ChevronRight,
  Phone,
  User,
  ShoppingBag,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const OrderTrackingView: React.FC = () => {
  const { orders, trackingOrderId, updateOrderStatus, setActiveView } = useApp();

  const currentOrder = orders.find(
    (o) => o.orderNumber === trackingOrderId || o.id === trackingOrderId
  ) || orders[0];

  if (!currentOrder) {
    return (
      <div className="max-w-3xl mx-auto py-16 px-4 text-center">
        <h2 className="text-xl font-bold font-serif-luxury text-white">No Order Found</h2>
        <p className="text-neutral-400 text-xs mt-2">
          Please place an order or select an active order to track.
        </p>
      </div>
    );
  }

  const deliverySteps: { status: OrderStatus; label: string; icon: React.ReactNode; desc: string }[] = [
    { status: 'pending', label: 'Order Placed', icon: <ShoppingBag className="w-4 h-4" />, desc: 'Received by SAVORÉ terminal' },
    { status: 'accepted', label: 'Accepted', icon: <CheckCircle2 className="w-4 h-4" />, desc: 'Confirmed by kitchen dispatch' },
    { status: 'preparing', label: 'Preparing', icon: <Flame className="w-4 h-4" />, desc: 'Chefs are crafting your dishes' },
    { status: 'ready', label: 'Ready', icon: <Clock className="w-4 h-4" />, desc: 'Quality checked & packed' },
    {
      status: currentOrder.orderType === 'delivery' ? 'out_for_delivery' : 'ready',
      label: currentOrder.orderType === 'delivery' ? 'Out for Delivery' : 'Ready at Counter',
      icon: <Bike className="w-4 h-4" />,
      desc: currentOrder.orderType === 'delivery' ? 'Rider en route with thermal bag' : 'Please present ticket at counter',
    },
    {
      status: 'delivered',
      label: currentOrder.orderType === 'dine_in' ? 'Completed & Served' : 'Delivered',
      icon: <CheckCheck className="w-4 h-4" />,
      desc: 'Bon appétit! Enjoy your meal',
    },
  ];

  const getStepIndex = (status: OrderStatus) => {
    switch (status) {
      case 'pending': return 0;
      case 'accepted': return 1;
      case 'preparing': return 2;
      case 'ready': return 3;
      case 'out_for_delivery': return 4;
      case 'delivered':
      case 'completed': return 5;
      default: return 0;
    }
  };

  const currentStepIdx = getStepIndex(currentOrder.status);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-[#141210] border border-[#2c2824] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-amber-400 text-[11px] font-bold uppercase tracking-wider">
              {currentOrder.orderType.toUpperCase()} ORDER
            </span>
            <span className="text-xs text-neutral-400">
              Placed {new Date(currentOrder.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif-luxury text-white">
            Order #{currentOrder.orderNumber}
          </h1>
          <p className="text-xs text-neutral-300 max-w-md">
            Guest: <strong className="text-white">{currentOrder.customerName}</strong> ({currentOrder.customerPhone})
          </p>
        </div>

        <div className="relative z-10 flex flex-col items-start md:items-end gap-2 bg-[#1b1815] p-4 rounded-xl border border-neutral-800">
          <span className="text-[11px] text-neutral-400 uppercase font-semibold">
            Estimated Delivery / Prep
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="font-brand text-3xl font-bold text-amber-400">
              {currentStepIdx >= 5 ? 'ARRIVED' : '22–28'}
            </span>
            {currentStepIdx < 5 && <span className="text-xs text-neutral-400">MINS</span>}
          </div>
          <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            Live Restaurant Connection
          </span>
        </div>
      </div>

      {/* Interactive Flow Simulator for Demo */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/30 to-[#191613] border border-amber-800/40 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-amber-300 font-semibold">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Interactive Client Simulator:</span>
          <span className="text-neutral-400 font-normal">
            Advance live status or view linked operations
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {(['pending', 'accepted', 'preparing', 'ready', 'out_for_delivery', 'delivered'] as OrderStatus[]).map((st) => (
            <button
              key={st}
              onClick={() => updateOrderStatus(currentOrder.id, st)}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                currentOrder.status === st
                  ? 'bg-amber-500 text-black font-bold'
                  : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300'
              }`}
            >
              {st.replace(/_/g, ' ').toUpperCase()}
            </button>
          ))}
          <button
            onClick={() => setActiveView('kitchen')}
            className="px-2.5 py-1 rounded bg-orange-600/30 text-orange-300 hover:bg-orange-600/50 border border-orange-500/40 cursor-pointer"
          >
            View in Kitchen KDS →
          </button>
        </div>
      </div>

      {/* Visual Timeline Steps */}
      <div className="bg-[#141210] border border-[#2c2824] rounded-2xl p-6 sm:p-8 space-y-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-amber-400">
          Live Culinary Progression
        </h2>

        <div className="relative">
          {/* Progress bar line */}
          <div className="hidden sm:block absolute top-5 left-6 right-6 h-0.5 bg-neutral-800 -z-0">
            <div
              className="h-full bg-amber-500 transition-all duration-500"
              style={{ width: `${(currentStepIdx / (deliverySteps.length - 1)) * 100}%` }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-6 gap-6 relative z-10">
            {deliverySteps.map((step, idx) => {
              const isPast = idx < currentStepIdx;
              const isCurrent = idx === currentStepIdx;

              return (
                <div
                  key={step.label}
                  className={`flex sm:flex-col items-center sm:items-center text-left sm:text-center gap-3.5 transition-all ${
                    isCurrent ? 'scale-105' : ''
                  }`}
                >
                  <div
                    className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 border-2 transition-all ${
                      isPast
                        ? 'bg-amber-600 border-amber-600 text-white'
                        : isCurrent
                        ? 'bg-amber-950 border-amber-400 text-amber-300 ring-4 ring-amber-500/20 animate-pulse'
                        : 'bg-[#181512] border-neutral-800 text-neutral-600'
                    }`}
                  >
                    {step.icon}
                  </div>

                  <div>
                    <h3
                      className={`text-xs font-bold ${
                        isCurrent
                          ? 'text-amber-400'
                          : isPast
                          ? 'text-white'
                          : 'text-neutral-500'
                      }`}
                    >
                      {step.label}
                    </h3>
                    <p className="text-[10px] text-neutral-400 mt-0.5 max-w-[120px] hidden sm:block">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Details Grid: Rider & Delivery Address & Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Dispatch & Logistics */}
        <div className="bg-[#141210] border border-[#2c2824] rounded-2xl p-6 space-y-4">
          <h2 className="text-xs uppercase font-bold tracking-wider text-amber-500">
            Logistics & Contact
          </h2>

          {currentOrder.orderType === 'delivery' ? (
            <div className="space-y-4 text-xs">
              <div className="p-3.5 rounded-xl bg-[#1a1714] border border-neutral-800 space-y-2">
                <span className="text-[11px] text-neutral-400 uppercase font-semibold">
                  Assigned SAVORÉ Courier
                </span>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                      {currentOrder.riderName ? currentOrder.riderName[0] : 'R'}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-sm">
                        {currentOrder.riderName || 'Farhan Abbasi'}
                      </h3>
                      <p className="text-neutral-400 text-[11px]">
                        Honda 125 · Thermal Sealed Box
                      </p>
                    </div>
                  </div>
                  <a
                    href={`tel:${currentOrder.riderPhone || '+923339102834'}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-800/40 text-emerald-300 hover:bg-emerald-900/50 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Rider</span>
                  </a>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-neutral-400">Delivery Address:</span>
                <p className="text-white font-medium">
                  {currentOrder.deliveryAddress?.street || 'Khayaban-e-Shamsheer, DHA Phase 5, Karachi'}
                </p>
                {currentOrder.deliveryAddress?.instructions && (
                  <p className="text-neutral-400 text-[11px] italic">
                    Note: "{currentOrder.deliveryAddress.instructions}"
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-[#1a1714] border border-neutral-800 text-xs text-neutral-300 space-y-2">
              <span className="text-[11px] text-amber-400 font-bold uppercase">
                {currentOrder.orderType === 'dine_in' ? 'Table Service' : 'Pickup Counter'}
              </span>
              <p>
                {currentOrder.orderType === 'dine_in'
                  ? `Seated at Table ${currentOrder.tableNumber || 'T-04'}. Our servers will bring your course promptly.`
                  : 'Please present your order ticket at the SAVORÉ reception upon arrival.'}
              </p>
            </div>
          )}
        </div>

        {/* Right: Order Items & Receipt Summary */}
        <div className="bg-[#141210] border border-[#2c2824] rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs uppercase font-bold tracking-wider text-amber-500">
              Receipt Items ({currentOrder.items.length})
            </h2>
            <span className="text-xs text-neutral-400 uppercase">
              Paid via {currentOrder.paymentMethod}
            </span>
          </div>

          <div className="space-y-3 max-h-52 overflow-y-auto pr-1">
            {currentOrder.items.map((item) => (
              <div
                key={item.id}
                className="flex items-start justify-between text-xs py-1.5 border-b border-neutral-800/60"
              >
                <div>
                  <div className="font-semibold text-white">
                    {item.quantity} × {item.name}
                  </div>
                  {item.modifiers.length > 0 && (
                    <div className="text-[10px] text-neutral-400">
                      + {item.modifiers.map((m) => m.name).join(', ')}
                    </div>
                  )}
                </div>
                <span className="font-semibold text-amber-300">
                  PKR {item.totalPrice.toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-neutral-800 space-y-1 text-xs">
            <div className="flex justify-between text-neutral-400">
              <span>Subtotal</span>
              <span>PKR {currentOrder.subtotal.toLocaleString()}</span>
            </div>
            {currentOrder.discount > 0 && (
              <div className="flex justify-between text-amber-400">
                <span>Discount</span>
                <span>- PKR {currentOrder.discount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between text-neutral-400">
              <span>Sales Tax (GST)</span>
              <span>PKR {currentOrder.tax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-white pt-1.5 border-t border-neutral-800">
              <span>Total Paid</span>
              <span className="text-amber-400">PKR {currentOrder.total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
