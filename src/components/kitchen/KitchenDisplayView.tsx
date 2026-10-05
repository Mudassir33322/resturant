import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Order, OrderStatus, KitchenStation } from '../../types';
import {
  Flame,
  Clock,
  CheckCircle2,
  AlertCircle,
  Play,
  RotateCcw,
  Volume2,
  Filter,
  Check,
  Utensils,
  Layers,
} from 'lucide-react';

export const KitchenDisplayView: React.FC = () => {
  const { orders, updateOrderStatus, setActiveView } = useApp();
  const [selectedStation, setSelectedStation] = useState<KitchenStation>('all');
  const [audioFeedback, setAudioFeedback] = useState(true);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 10000);
    return () => clearInterval(timer);
  }, []);

  const playChime = () => {
    if (!audioFeedback) return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch (e) {
      // AudioContext fallback
    }
  };

  const stations: { id: KitchenStation; label: string }[] = [
    { id: 'all', label: 'All Stations' },
    { id: 'grill', label: 'Grill & Charcoal' },
    { id: 'fryer', label: 'Fryer Station' },
    { id: 'pizza', label: 'Woodfire Pizza' },
    { id: 'pasta', label: 'Pasta & Saute' },
    { id: 'main', label: 'Shinwari / Wok' },
    { id: 'dessert', label: 'Dessert & Pastry' },
    { id: 'beverage', label: 'Bar & Mocktails' },
  ];

  // Filter orders by station if items match
  const filteredOrders = orders.filter((order) => {
    if (selectedStation === 'all') return true;
    return order.items.some((i) => i.kitchenStation === selectedStation);
  });

  const newOrders = filteredOrders.filter((o) => o.status === 'pending' || o.status === 'accepted');
  const preparingOrders = filteredOrders.filter((o) => o.status === 'preparing');
  const readyOrders = filteredOrders.filter((o) => o.status === 'ready' || o.status === 'out_for_delivery');
  const completedOrders = filteredOrders.filter((o) => o.status === 'delivered' || o.status === 'completed').slice(0, 6);

  const getElapsedMinutes = (dateString: string) => {
    const diff = Math.floor((now - new Date(dateString).getTime()) / 60000);
    return Math.max(0, diff);
  };

  const handleAdvanceStatus = (order: Order, nextStatus: OrderStatus) => {
    playChime();
    updateOrderStatus(order.id, nextStatus);
  };

  const renderTicket = (order: Order, currentColumn: 'new' | 'prep' | 'ready' | 'comp') => {
    const elapsed = getElapsedMinutes(order.createdAt);
    const isDelayed = elapsed > 15;

    return (
      <div
        key={order.id}
        className={`bg-[#141210] rounded-xl border p-3.5 space-y-3 shadow-lg transition-all ${
          isDelayed && currentColumn !== 'comp'
            ? 'border-red-600/80 bg-red-950/10'
            : currentColumn === 'prep'
            ? 'border-amber-600/60 bg-[#161311]'
            : 'border-[#292521]'
        }`}
      >
        {/* Ticket Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-bold text-white">
              #{order.orderNumber}
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-neutral-800 text-neutral-300">
              {order.orderType.replace('_', ' ')}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-mono">
            <Clock className={`w-3.5 h-3.5 ${isDelayed ? 'text-red-400' : 'text-amber-400'}`} />
            <span className={isDelayed ? 'text-red-400 font-bold' : 'text-neutral-300'}>
              {elapsed}m
            </span>
          </div>
        </div>

        {/* Table & Guest */}
        <div className="flex justify-between text-xs text-neutral-400">
          <div>
            {order.tableNumber ? (
              <span className="font-bold text-amber-400">Table: {order.tableNumber}</span>
            ) : (
              <span>Guest: {order.customerName}</span>
            )}
          </div>
          <span className="text-[10px] uppercase font-mono text-neutral-500">
            {order.items.length} items
          </span>
        </div>

        {/* Ticket Items */}
        <div className="space-y-1.5 py-1">
          {order.items.map((item, idx) => (
            <div key={idx} className="text-xs">
              <div className="flex items-baseline justify-between">
                <span className="font-bold text-white">
                  <span className="text-amber-400 mr-1">{item.quantity}×</span>
                  {item.name}
                </span>
                <span className="text-[10px] text-neutral-500 uppercase font-mono">
                  {item.kitchenStation}
                </span>
              </div>
              {item.modifiers.length > 0 && (
                <div className="text-[11px] text-amber-300/80 pl-4">
                  + {item.modifiers.map((m) => m.name).join(', ')}
                </div>
              )}
              {item.notes && (
                <div className="text-[10px] text-yellow-300/90 pl-4 italic">
                  Note: "{item.notes}"
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Action Controls */}
        <div className="pt-2 border-t border-neutral-800 flex items-center justify-between gap-2">
          {currentColumn === 'new' && (
            <button
              onClick={() => handleAdvanceStatus(order, 'preparing')}
              className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Start Prep (Cooking)</span>
            </button>
          )}

          {currentColumn === 'prep' && (
            <button
              onClick={() => handleAdvanceStatus(order, 'ready')}
              className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Mark Food Ready</span>
            </button>
          )}

          {currentColumn === 'ready' && (
            <button
              onClick={() => handleAdvanceStatus(order, 'completed')}
              className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Complete / Served</span>
            </button>
          )}

          {currentColumn === 'comp' && (
            <button
              onClick={() => handleAdvanceStatus(order, 'preparing')}
              className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-neutral-900 text-neutral-400 hover:text-white text-[11px] cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Recall Ticket</span>
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="h-[calc(100vh-7rem)] flex flex-col bg-[#0b0a09] text-neutral-200 overflow-hidden">
      {/* KDS Header Controls */}
      <div className="bg-[#12100e] border-b border-[#25221e] px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-500 animate-pulse" />
            <span className="font-brand font-bold text-lg text-white">
              SAVORÉ KDS
            </span>
          </div>
          <span className="text-xs text-neutral-500">|</span>
          <span className="text-xs text-amber-400 font-semibold uppercase">
            Live Kitchen Display System
          </span>
        </div>

        {/* Stations Filter */}
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
          {stations.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedStation(s.id)}
              className={`px-3 py-1 rounded-md text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedStation === s.id
                  ? 'bg-amber-600 text-white'
                  : 'bg-[#1a1714] text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Audio Toggle & Switch to POS */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setAudioFeedback(!audioFeedback)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-medium border transition-colors cursor-pointer ${
              audioFeedback
                ? 'border-emerald-700 bg-emerald-950/40 text-emerald-300'
                : 'border-neutral-800 text-neutral-500'
            }`}
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>{audioFeedback ? 'Chimes Active' : 'Muted'}</span>
          </button>
          <button
            onClick={() => setActiveView('pos')}
            className="px-3 py-1 rounded bg-[#1e1b18] hover:bg-neutral-800 text-neutral-300 text-xs font-medium border border-neutral-700 cursor-pointer"
          >
            Open POS Terminal →
          </button>
        </div>
      </div>

      {/* 4 Kanban Columns */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4 p-4 overflow-hidden bg-[#0d0c0a]">
        {/* 1. NEW ORDERS */}
        <div className="flex flex-col rounded-xl bg-[#12100e] border border-blue-900/30 overflow-hidden">
          <div className="p-3 border-b border-neutral-800 bg-[#161311] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-300">
                1. New ({newOrders.length})
              </h3>
            </div>
            <span className="text-[10px] text-neutral-500">Incoming tickets</span>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {newOrders.length === 0 ? (
              <div className="text-center py-12 text-xs text-neutral-600">
                No pending incoming orders
              </div>
            ) : (
              newOrders.map((o) => renderTicket(o, 'new'))
            )}
          </div>
        </div>

        {/* 2. PREPARING */}
        <div className="flex flex-col rounded-xl bg-[#12100e] border border-amber-900/30 overflow-hidden">
          <div className="p-3 border-b border-neutral-800 bg-[#161311] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300">
                2. Preparing ({preparingOrders.length})
              </h3>
            </div>
            <span className="text-[10px] text-amber-500 font-semibold">Cooking in line</span>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {preparingOrders.length === 0 ? (
              <div className="text-center py-12 text-xs text-neutral-600">
                Line is clear. Awaiting tickets.
              </div>
            ) : (
              preparingOrders.map((o) => renderTicket(o, 'prep'))
            )}
          </div>
        </div>

        {/* 3. READY FOR PASS / EXPEDITE */}
        <div className="flex flex-col rounded-xl bg-[#12100e] border border-emerald-900/30 overflow-hidden">
          <div className="p-3 border-b border-neutral-800 bg-[#161311] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                3. Ready ({readyOrders.length})
              </h3>
            </div>
            <span className="text-[10px] text-emerald-400">At pickup / pass</span>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {readyOrders.length === 0 ? (
              <div className="text-center py-12 text-xs text-neutral-600">
                No orders waiting on pass
              </div>
            ) : (
              readyOrders.map((o) => renderTicket(o, 'ready'))
            )}
          </div>
        </div>

        {/* 4. COMPLETED & SERVED */}
        <div className="flex flex-col rounded-xl bg-[#12100e] border border-neutral-800/60 overflow-hidden">
          <div className="p-3 border-b border-neutral-800 bg-[#161311] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-600" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                4. Completed ({completedOrders.length})
              </h3>
            </div>
            <span className="text-[10px] text-neutral-600">Served & dispatched</span>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-3 opacity-80">
            {completedOrders.length === 0 ? (
              <div className="text-center py-12 text-xs text-neutral-600">
                No completed history
              </div>
            ) : (
              completedOrders.map((o) => renderTicket(o, 'comp'))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
