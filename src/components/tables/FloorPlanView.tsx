import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RestaurantTable, TableStatus } from '../../types';
import {
  LayoutGrid,
  Users,
  CheckCircle2,
  Clock,
  Sparkles,
  Layers,
  UtensilsCrossed,
  Plus,
  RefreshCw,
  Receipt,
  X,
} from 'lucide-react';

export const FloorPlanView: React.FC = () => {
  const { tables, updateTableStatus, mergeTables, setActiveView, setTrackingOrderId } = useApp();
  const [selectedSection, setSelectedSection] = useState<string>('All');
  const [activeTableModal, setActiveTableModal] = useState<RestaurantTable | null>(null);
  const [mergeTargetId, setMergeTargetId] = useState<string>('');

  const sections = ['All', 'Main Dining', 'Family Hall', 'Outdoor Terrace', 'VIP Lounge', 'Rooftop'];

  const filteredTables = selectedSection === 'All'
    ? tables
    : tables.filter((t) => t.section === selectedSection);

  const getStatusColor = (status: TableStatus) => {
    switch (status) {
      case 'available':
        return 'border-emerald-500/60 bg-emerald-950/20 text-emerald-400 hover:border-emerald-400';
      case 'occupied':
        return 'border-amber-500/60 bg-amber-950/20 text-amber-400 hover:border-amber-400';
      case 'reserved':
        return 'border-purple-500/60 bg-purple-950/20 text-purple-400 hover:border-purple-400';
      case 'billing':
        return 'border-blue-500/60 bg-blue-950/20 text-blue-400 hover:border-blue-400';
      case 'cleaning':
        return 'border-neutral-600 bg-neutral-900/60 text-neutral-400 hover:border-neutral-500';
      case 'waiting':
        return 'border-yellow-500/60 bg-yellow-950/20 text-yellow-300 hover:border-yellow-400';
      default:
        return 'border-neutral-800 bg-neutral-900 text-neutral-400';
    }
  };

  const getStatusBadge = (status: TableStatus) => {
    switch (status) {
      case 'available':
        return 'FREE';
      case 'occupied':
        return 'OCCUPIED';
      case 'reserved':
        return 'RESERVED';
      case 'billing':
        return 'BILLING';
      case 'cleaning':
        return 'CLEANING';
      case 'waiting':
        return 'WAITING';
      default:
        return String(status).toUpperCase();
    }
  };

  const handleMerge = () => {
    if (!activeTableModal || !mergeTargetId) return;
    mergeTables(activeTableModal.id, mergeTargetId);
    setActiveTableModal(null);
    setMergeTargetId('');
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#25221e] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-bold tracking-widest text-amber-500">
              Operations Control
            </span>
            <span className="text-xs text-neutral-500">·</span>
            <span className="text-xs text-neutral-400">Karachi Flagship Clifton Floor Map</span>
          </div>
          <h1 className="font-serif-luxury text-3xl font-bold text-white mt-1">
            Visual Restaurant Floor Management
          </h1>
        </div>

        {/* Status Legend */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-neutral-300">Available ({tables.filter((t) => t.status === 'available').length})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span className="text-neutral-300">Occupied ({tables.filter((t) => t.status === 'occupied').length})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
            <span className="text-neutral-300">Reserved ({tables.filter((t) => t.status === 'reserved').length})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            <span className="text-neutral-300">Billing ({tables.filter((t) => t.status === 'billing').length})</span>
          </div>
        </div>
      </div>

      {/* Floor / Section Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
        {sections.map((sec) => (
          <button
            key={sec}
            onClick={() => setSelectedSection(sec)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedSection === sec
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-[#151210] text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            {sec}
          </button>
        ))}
      </div>

      {/* Visual Floor Grid (Mimicking Restaurant Layout) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {filteredTables.map((tbl) => (
          <div
            key={tbl.id}
            onClick={() => setActiveTableModal(tbl)}
            className={`relative p-5 rounded-2xl border-2 transition-all duration-300 flex flex-col justify-between h-44 shadow-lg cursor-pointer ${getStatusColor(
              tbl.status
            )}`}
          >
            {/* Top row */}
            <div className="flex items-start justify-between">
              <div>
                <span className="font-mono text-xl font-bold tracking-tight text-white">
                  {tbl.number}
                </span>
                <p className="text-[11px] text-neutral-400 mt-0.5">{tbl.section}</p>
              </div>

              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider bg-black/60 border border-neutral-800">
                {getStatusBadge(tbl.status)}
              </span>
            </div>

            {/* Middle: Merged or order status */}
            <div className="text-xs space-y-1">
              <div className="flex items-center gap-1.5 text-neutral-300">
                <Users className="w-3.5 h-3.5" />
                <span>
                  {tbl.capacity} Seats {tbl.guestCount ? `(${tbl.guestCount} Seated)` : ''}
                </span>
              </div>
              {tbl.serverName && (
                <div className="text-[10px] text-neutral-400 truncate">
                  Server: {tbl.serverName}
                </div>
              )}
              {tbl.mergedWith && tbl.mergedWith.length > 0 && (
                <div className="text-[10px] text-amber-300 font-semibold">
                  Merged: {tbl.mergedWith.join(', ')}
                </div>
              )}
            </div>

            {/* Bottom active order */}
            <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between text-[11px]">
              {tbl.currentOrderId ? (
                <span className="font-bold text-amber-400">Order #{tbl.currentOrderId}</span>
              ) : (
                <span className="text-neutral-500">No active ticket</span>
              )}
              <span className="text-[10px] uppercase font-semibold text-neutral-400">
                Floor {tbl.floor}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Table Detail & Action Modal */}
      {activeTableModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="w-full max-w-md bg-[#141210] border border-[#2c2824] rounded-2xl shadow-2xl overflow-hidden p-6 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-400">
                  Table Configuration
                </span>
                <h2 className="font-serif-luxury text-2xl font-bold text-white">
                  Table {activeTableModal.number} · {activeTableModal.section}
                </h2>
              </div>
              <button
                onClick={() => setActiveTableModal(null)}
                className="p-1 rounded-full text-neutral-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Status Switcher Buttons */}
            <div className="space-y-2">
              <label className="block text-xs uppercase font-semibold text-neutral-400">
                Set Table Status
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {(['available', 'occupied', 'reserved', 'billing', 'cleaning', 'waiting'] as TableStatus[]).map((st) => (
                  <button
                    key={st}
                    onClick={() => {
                      updateTableStatus(activeTableModal.id, st);
                      setActiveTableModal({ ...activeTableModal, status: st });
                    }}
                    className={`p-2 rounded-lg border text-center font-semibold capitalize transition-all cursor-pointer ${
                      activeTableModal.status === st
                        ? 'border-amber-500 bg-amber-950/40 text-amber-300'
                        : 'border-neutral-800 bg-[#181512] text-neutral-400 hover:text-white'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Merge Tables */}
            <div className="space-y-2 pt-2 border-t border-neutral-900">
              <label className="block text-xs uppercase font-semibold text-neutral-400">
                Merge With Adjacent Table
              </label>
              <div className="flex gap-2">
                <select
                  value={mergeTargetId}
                  onChange={(e) => setMergeTargetId(e.target.value)}
                  className="flex-1 p-2 bg-[#181512] border border-neutral-800 rounded-lg text-xs text-white outline-none"
                >
                  <option value="">Select table to merge...</option>
                  {tables
                    .filter((t) => t.id !== activeTableModal.id)
                    .map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.number} ({t.section} - {t.capacity} seats)
                      </option>
                    ))}
                </select>
                <button
                  onClick={handleMerge}
                  disabled={!mergeTargetId}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold ${
                    mergeTargetId
                      ? 'bg-amber-600 hover:bg-amber-500 text-white cursor-pointer'
                      : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                  }`}
                >
                  Merge
                </button>
              </div>
            </div>

            {/* If has active order, allow jumping to POS / Tracking */}
            {activeTableModal.currentOrderId && (
              <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-800/40 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">
                    Active Order #{activeTableModal.currentOrderId}
                  </div>
                  <div className="text-[10px] text-amber-300">In Preparation / Serving</div>
                </div>
                <button
                  onClick={() => {
                    setTrackingOrderId(activeTableModal.currentOrderId!);
                    setActiveTableModal(null);
                    setActiveView('order_tracking');
                  }}
                  className="px-3 py-1.5 rounded bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold cursor-pointer"
                >
                  View Ticket
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
