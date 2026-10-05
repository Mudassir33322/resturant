import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Rider, Order } from '../../types';
import {
  Bike,
  MapPin,
  Clock,
  Phone,
  CheckCircle2,
  AlertCircle,
  UserCheck,
  ChevronRight,
  ShieldCheck,
  Smartphone,
  Navigation,
} from 'lucide-react';

export const DeliveryDashboard: React.FC = () => {
  const {
    orders,
    riders,
    assignRiderToOrder,
    updateOrderStatus,
    setActiveView,
    setTrackingOrderId,
  } = useApp();

  const [selectedOrderId, setSelectedOrderId] = useState<string>('');
  const [selectedRiderId, setSelectedRiderId] = useState<string>('');
  const [riderModeRiderId, setRiderModeRiderId] = useState<string>('rdr_1');

  const deliveryOrders = orders.filter((o) => o.orderType === 'delivery');
  const unassignedOrders = deliveryOrders.filter(
    (o) => !o.assignedRiderId && o.status !== 'delivered' && o.status !== 'cancelled'
  );
  const activeDeliveries = deliveryOrders.filter(
    (o) => o.assignedRiderId && o.status !== 'delivered' && o.status !== 'completed'
  );

  const zones = [
    { name: 'Zone A (Clifton & Sea View)', radius: '0–3 KM', fee: 100, eta: '20–25 Mins' },
    { name: 'Zone B (DHA Phase 1–6)', radius: '3–7 KM', fee: 180, eta: '30–35 Mins' },
    { name: 'Zone C (DHA Phase 7–8 & Saddar)', radius: '7–12 KM', fee: 260, eta: '40–50 Mins' },
  ];

  const handleDispatch = () => {
    if (!selectedOrderId || !selectedRiderId) return;
    assignRiderToOrder(selectedOrderId, selectedRiderId);
    setSelectedOrderId('');
    setSelectedRiderId('');
  };

  const activeRider = riders.find((r) => r.id === riderModeRiderId) || riders[0];
  const riderAssignedOrder = orders.find((o) => o.id === activeRider.currentActiveOrderId || o.assignedRiderId === activeRider.id);

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#25221e] pb-6">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-amber-500">
            Logistics & Fleet Dispatch
          </span>
          <h1 className="font-serif-luxury text-3xl font-bold text-white mt-1">
            Delivery Operations & Fleet Command
          </h1>
        </div>

        {/* Fleet Summary Badges */}
        <div className="flex items-center gap-3 text-xs">
          <div className="px-3 py-1.5 rounded-lg bg-[#161311] border border-neutral-800">
            <span className="text-neutral-400">Total Fleet:</span>{' '}
            <strong className="text-white">{riders.length} Riders</strong>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-800/40 text-emerald-300">
            <span className="text-neutral-400">Available:</span>{' '}
            <strong className="text-emerald-400">
              {riders.filter((r) => r.status === 'available').length} Available
            </strong>
          </div>
        </div>
      </div>

      {/* Delivery Zones Card */}
      <div className="bg-[#141210] border border-[#2b2723] rounded-2xl p-6 space-y-4">
        <h2 className="text-xs uppercase font-bold text-amber-400 tracking-wider">
          Configured Delivery Zones & Tariffs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {zones.map((zone) => (
            <div
              key={zone.name}
              className="p-4 rounded-xl bg-[#1a1714] border border-neutral-800 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-xs">{zone.name}</span>
                <span className="text-xs font-bold text-amber-400">
                  PKR {zone.fee}
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-1 border-t border-neutral-800/60">
                <span>Radius: {zone.radius}</span>
                <span>Avg ETA: {zone.eta}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Grid: Orders & Rider Dispatch */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Pending Dispatch & Active Orders (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Dispatch Box */}
          <div className="bg-[#141210] border border-[#2b2723] rounded-2xl p-6 space-y-4 shadow-xl">
            <h2 className="text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
              <Navigation className="w-4 h-4" />
              <span>Dispatch Rider to Pending Order</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-neutral-400 mb-1">
                  1. Select Order Pending Delivery
                </label>
                <select
                  value={selectedOrderId}
                  onChange={(e) => setSelectedOrderId(e.target.value)}
                  className="w-full p-2.5 bg-[#181512] border border-neutral-800 rounded-lg text-xs text-white outline-none focus:border-amber-500"
                >
                  <option value="">Select order...</option>
                  {unassignedOrders.map((o) => (
                    <option key={o.id} value={o.id}>
                      #{o.orderNumber} — {o.customerName} ({o.deliveryAddress?.area || 'Karachi'}) (PKR {o.total})
                    </option>
                  ))}
                  {unassignedOrders.length === 0 && (
                    <option value="" disabled>All active deliveries currently assigned</option>
                  )}
                </select>
              </div>

              <div>
                <label className="block text-[11px] text-neutral-400 mb-1">
                  2. Assign Fleet Rider
                </label>
                <select
                  value={selectedRiderId}
                  onChange={(e) => setSelectedRiderId(e.target.value)}
                  className="w-full p-2.5 bg-[#181512] border border-neutral-800 rounded-lg text-xs text-white outline-none focus:border-amber-500"
                >
                  <option value="">Select available rider...</option>
                  {riders.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name} — {r.vehicle} ({r.status.toUpperCase()})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleDispatch}
                disabled={!selectedOrderId || !selectedRiderId}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold ${
                  selectedOrderId && selectedRiderId
                    ? 'bg-amber-600 hover:bg-amber-500 text-white cursor-pointer shadow-md shadow-amber-950/40'
                    : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                }`}
              >
                <span>Dispatch & Alert Courier</span>
                <Bike className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Active Deliveries En Route */}
          <div className="bg-[#141210] border border-[#2b2723] rounded-2xl p-6 space-y-4">
            <h2 className="text-xs uppercase font-bold text-amber-400 tracking-wider">
              Deliveries Currently En Route ({activeDeliveries.length})
            </h2>

            <div className="space-y-3">
              {activeDeliveries.length === 0 ? (
                <div className="text-center py-8 text-neutral-500 text-xs">
                  No orders currently on the road.
                </div>
              ) : (
                activeDeliveries.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-4 rounded-xl bg-[#181512] border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">#{ord.orderNumber}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-500/20 text-amber-300">
                          {ord.status.replace(/_/g, ' ')}
                        </span>
                      </div>
                      <div className="text-xs text-neutral-300">
                        {ord.customerName} · {ord.deliveryAddress?.street}, {ord.deliveryAddress?.area}
                      </div>
                      <div className="text-[11px] text-neutral-400 flex items-center gap-2">
                        <Bike className="w-3.5 h-3.5 text-amber-400" />
                        <span>Rider: {ord.riderName} ({ord.riderPhone})</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setTrackingOrderId(ord.orderNumber);
                          setActiveView('order_tracking');
                        }}
                        className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-200 cursor-pointer"
                      >
                        Track Status
                      </button>
                      <button
                        onClick={() => updateOrderStatus(ord.id, 'delivered')}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs text-white font-semibold cursor-pointer"
                      >
                        Mark Delivered
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right: Simulated Rider Mobile Smartphone View */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-bold text-amber-500">
              Rider Mobile Handset Interface
            </span>
            <select
              value={riderModeRiderId}
              onChange={(e) => setRiderModeRiderId(e.target.value)}
              className="p-1 bg-[#161311] border border-neutral-800 rounded text-xs text-neutral-300 outline-none"
            >
              {riders.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>

          {/* Smartphone Frame */}
          <div className="w-full max-w-sm mx-auto bg-black rounded-3xl border-4 border-neutral-800 shadow-2xl p-4 space-y-4 text-white">
            <div className="flex justify-between items-center text-[10px] text-neutral-400 pb-2 border-b border-neutral-800">
              <span>SAVORÉ Rider App v2.4</span>
              <span className="text-emerald-400 font-bold uppercase">{activeRider.status}</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-amber-600 flex items-center justify-center font-bold text-lg">
                {activeRider.name[0]}
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">{activeRider.name}</h4>
                <p className="text-[11px] text-neutral-400">{activeRider.vehicle} · {activeRider.plateNumber}</p>
                <p className="text-[10px] text-amber-400">★ {activeRider.rating} · {activeRider.completedDeliveriesToday} Completed Today</p>
              </div>
            </div>

            {/* Current Active Trip */}
            {riderAssignedOrder ? (
              <div className="p-3.5 rounded-xl bg-[#1a1714] border border-neutral-800 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-amber-400">
                    Active Trip #{riderAssignedOrder.orderNumber}
                  </span>
                  <span className="text-[10px] uppercase font-bold bg-neutral-800 px-2 py-0.5 rounded">
                    {riderAssignedOrder.status.replace(/_/g, ' ')}
                  </span>
                </div>

                <div className="text-xs space-y-1 text-neutral-300">
                  <div>Customer: {riderAssignedOrder.customerName}</div>
                  <div>Phone: {riderAssignedOrder.customerPhone}</div>
                  <div className="text-amber-200">
                    Destination: {riderAssignedOrder.deliveryAddress?.street}, {riderAssignedOrder.deliveryAddress?.area}
                  </div>
                </div>

                {/* Rider Action Buttons */}
                <div className="space-y-1.5 pt-2 border-t border-neutral-800">
                  {riderAssignedOrder.status === 'ready' && (
                    <button
                      onClick={() => updateOrderStatus(riderAssignedOrder.id, 'out_for_delivery')}
                      className="w-full py-2 bg-amber-600 hover:bg-amber-500 rounded-lg font-bold text-xs"
                    >
                      Picked Up from Counter
                    </button>
                  )}
                  {riderAssignedOrder.status === 'out_for_delivery' && (
                    <button
                      onClick={() => updateOrderStatus(riderAssignedOrder.id, 'delivered')}
                      className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-bold text-xs"
                    >
                      Delivered to Customer Gate
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-xl bg-[#141210] border border-neutral-800 text-center text-xs text-neutral-400 space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <p>No active delivery trip assigned.</p>
                <p className="text-[10px] text-neutral-500">Ready for incoming dispatch call.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
