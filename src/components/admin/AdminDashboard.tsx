import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Users,
  AlertTriangle,
  Clock,
  Bike,
  UtensilsCrossed,
  ArrowUpRight,
  Sparkles,
  CalendarDays,
  BarChart3,
  CheckCircle2,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { orders, customers, reservations, ingredients, setActiveView, setTrackingOrderId } = useApp();
  const [timeframe, setTimeframe] = useState<'today' | 'week' | 'month'>('today');

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const pendingOrders = orders.filter((o) => o.status === 'pending' || o.status === 'preparing');
  const deliveryOrders = orders.filter((o) => o.orderType === 'delivery');
  const lowStockItems = ingredients.filter((i) => i.currentStock <= i.minimumStock);
  const aov = orders.length > 0 ? Math.round(totalRevenue / orders.length) : 0;

  // Channels
  const dineInCount = orders.filter((o) => o.orderType === 'dine_in').length;
  const takeawayCount = orders.filter((o) => o.orderType === 'takeaway').length;
  const deliveryCount = orders.filter((o) => o.orderType === 'delivery').length;
  const onlineCount = orders.filter((o) => o.orderType === 'online').length;
  const qrCount = orders.filter((o) => o.orderType === 'qr').length;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#25221e] pb-6">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-amber-500">
            Real-Time Analytics
          </span>
          <h1 className="font-serif-luxury text-3xl font-bold text-white mt-1">
            Executive Command Center
          </h1>
        </div>

        {/* Timeframe selector */}
        <div className="flex items-center gap-1 bg-[#161311] border border-neutral-800 p-1 rounded-lg">
          {(['today', 'week', 'month'] as const).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                timeframe === tf
                  ? 'bg-amber-600 text-white'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {tf === 'today' ? "Today's Pulse" : tf === 'week' ? 'Past 7 Days' : 'Past 30 Days'}
            </button>
          ))}
        </div>
      </div>

      {/* 8 Primary Operational KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#141210] border border-[#25221e] space-y-2">
          <div className="flex items-center justify-between text-neutral-400 text-xs">
            <span>Today's Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white">
            PKR {totalRevenue.toLocaleString()}
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+18.4% vs yesterday</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#141210] border border-[#25221e] space-y-2">
          <div className="flex items-center justify-between text-neutral-400 text-xs">
            <span>Total Orders Handled</span>
            <ShoppingBag className="w-4 h-4 text-amber-400" />
          </div>
          <div className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white">
            {orders.length}
          </div>
          <div className="text-[11px] text-neutral-500">
            {pendingOrders.length} active in line
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#141210] border border-[#25221e] space-y-2">
          <div className="flex items-center justify-between text-neutral-400 text-xs">
            <span>Average Order Value</span>
            <BarChart3 className="w-4 h-4 text-blue-400" />
          </div>
          <div className="font-serif-luxury text-2xl sm:text-3xl font-bold text-amber-400">
            PKR {aov.toLocaleString()}
          </div>
          <div className="text-[11px] text-neutral-500">
            High-margin luxury basket
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#141210] border border-[#25221e] space-y-2">
          <div className="flex items-center justify-between text-neutral-400 text-xs">
            <span>Low Stock Alerts</span>
            <AlertTriangle className="w-4 h-4 text-red-400" />
          </div>
          <div className="font-serif-luxury text-2xl sm:text-3xl font-bold text-red-400">
            {lowStockItems.length}
          </div>
          <button
            onClick={() => setActiveView('inventory')}
            className="text-[11px] text-amber-400 hover:underline cursor-pointer"
          >
            Review Ingredients →
          </button>
        </div>
      </div>

      {/* Visual Analytics & Breakdown Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Hourly Trends Chart (Visual Mock) */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-[#141210] border border-[#25221e] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs uppercase font-bold text-amber-500 tracking-wider">
                Sales Volume & Peak Hours
              </span>
              <h3 className="font-serif-luxury text-lg font-bold text-white">
                Hourly Revenue Curve (Peak: 7 PM – 10 PM)
              </h3>
            </div>
            <span className="text-xs font-mono text-neutral-400">Asia/Karachi</span>
          </div>

          {/* Bar Visualizer */}
          <div className="h-48 flex items-end justify-between gap-2 pt-6 pb-2 px-2 border-b border-neutral-800">
            {[
              { hour: '12 PM', val: 35, pkr: '35K' },
              { hour: '1 PM', val: 55, pkr: '55K' },
              { hour: '2 PM', val: 68, pkr: '68K' },
              { hour: '3 PM', val: 40, pkr: '40K' },
              { hour: '4 PM', val: 25, pkr: '25K' },
              { hour: '5 PM', val: 32, pkr: '32K' },
              { hour: '6 PM', val: 50, pkr: '50K' },
              { hour: '7 PM', val: 85, pkr: '85K' },
              { hour: '8 PM', val: 98, pkr: '98K' },
              { hour: '9 PM', val: 100, pkr: '100K' },
              { hour: '10 PM', val: 92, pkr: '92K' },
              { hour: '11 PM', val: 60, pkr: '60K' },
              { hour: '12 AM', val: 45, pkr: '45K' },
            ].map((bar) => (
              <div key={bar.hour} className="flex-1 flex flex-col items-center gap-1.5 group">
                <div
                  className="w-full rounded-t-md bg-gradient-to-t from-amber-700/40 to-amber-500 group-hover:to-amber-400 transition-all duration-300 relative"
                  style={{ height: `${bar.val}%` }}
                >
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 px-1 py-0.5 rounded bg-black/80 text-[9px] font-mono text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    PKR {bar.pkr}
                  </span>
                </div>
                <span className="text-[9px] text-neutral-500 font-mono rotate-45 sm:rotate-0 mt-1">
                  {bar.hour}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-neutral-400 pt-2">
            <span>Lunch Service Peak: 1:30 PM (68K)</span>
            <span className="text-amber-400 font-bold">Prime Dinner Peak: 9:00 PM (100K)</span>
          </div>
        </div>

        {/* Order Channel Distribution */}
        <div className="p-6 rounded-2xl bg-[#141210] border border-[#25221e] space-y-4 flex flex-col justify-between">
          <div>
            <span className="text-xs uppercase font-bold text-amber-500 tracking-wider">
              Channel Mix
            </span>
            <h3 className="font-serif-luxury text-lg font-bold text-white">
              Order Source Breakdown
            </h3>
          </div>

          <div className="space-y-3">
            {[
              { label: 'Dine-In Table Service', count: dineInCount || 3, pct: 40, color: 'bg-emerald-500' },
              { label: 'White Glove Delivery', count: deliveryCount || 2, pct: 30, color: 'bg-amber-500' },
              { label: 'Table Contactless QR', count: qrCount || 1, pct: 15, color: 'bg-cyan-500' },
              { label: 'Pickup / Takeaway', count: takeawayCount || 1, pct: 15, color: 'bg-purple-500' },
            ].map((ch) => (
              <div key={ch.label} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-neutral-300">{ch.label}</span>
                  <span className="font-bold text-white">{ch.pct}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-neutral-800 overflow-hidden">
                  <div className={`h-full rounded-full ${ch.color}`} style={{ width: `${ch.pct}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-[#181512] border border-neutral-800 text-[11px] text-neutral-400">
            Dine-In & Delivery account for 70% of total revenue capture.
          </div>
        </div>
      </div>

      {/* Live Active Orders Stream Table */}
      <div className="p-6 rounded-2xl bg-[#141210] border border-[#25221e] space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs uppercase font-bold text-amber-500 tracking-wider">
              Live Queue
            </span>
            <h3 className="font-serif-luxury text-lg font-bold text-white">
              Recent Incoming Orders
            </h3>
          </div>
          <button
            onClick={() => setActiveView('pos')}
            className="text-xs text-amber-400 hover:underline cursor-pointer"
          >
            Launch POS Terminal →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#181512] text-neutral-400 uppercase text-[10px] font-bold tracking-wider border-b border-neutral-800">
              <tr>
                <th className="py-3 px-4">Order #</th>
                <th className="py-3 px-4">Customer & Phone</th>
                <th className="py-3 px-4">Channel</th>
                <th className="py-3 px-4">Items</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-900 text-neutral-300">
              {orders.slice(0, 6).map((ord) => (
                <tr key={ord.id} className="hover:bg-[#181512]/50">
                  <td className="py-3 px-4 font-mono font-bold text-white">
                    #{ord.orderNumber}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-white">{ord.customerName}</div>
                    <div className="text-[10px] text-neutral-500">{ord.customerPhone}</div>
                  </td>
                  <td className="py-3 px-4 uppercase font-semibold text-[11px]">
                    {ord.orderType}
                  </td>
                  <td className="py-3 px-4 text-[11px] text-neutral-400 max-w-xs truncate">
                    {ord.items.map((i) => `${i.quantity}× ${i.name}`).join(', ')}
                  </td>
                  <td className="py-3 px-4 font-bold text-amber-400">
                    PKR {ord.total.toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        ord.status === 'delivered' || ord.status === 'completed'
                          ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40'
                          : 'bg-amber-950/60 text-amber-300 border border-amber-800/40'
                      }`}
                    >
                      {ord.status.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => {
                        setTrackingOrderId(ord.orderNumber);
                        setActiveView('order_tracking');
                      }}
                      className="px-2.5 py-1 rounded bg-[#1e1b18] hover:bg-neutral-800 border border-neutral-700 text-xs font-semibold text-amber-300 cursor-pointer"
                    >
                      Track
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
