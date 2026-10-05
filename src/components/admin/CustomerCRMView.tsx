import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CustomerProfile } from '../../types';
import {
  Users,
  Search,
  Award,
  DollarSign,
  Plus,
  Star,
  ShoppingBag,
  Phone,
  Mail,
  Filter,
  CheckCircle2,
  X,
} from 'lucide-react';

export const CustomerCRMView: React.FC = () => {
  const { customers } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSegment, setSelectedSegment] = useState<string>('All');
  const [activeCustomerModal, setActiveCustomerModal] = useState<CustomerProfile | null>(null);

  const segments = ['All', 'VIP', 'High Value', 'Regular', 'New'];

  const filteredCustomers = customers.filter((cust) => {
    const matchSeg = selectedSegment === 'All' || cust.segment === selectedSegment;
    const matchSearch =
      cust.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cust.phone.includes(searchQuery) ||
      cust.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchSeg && matchSearch;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#25221e] pb-6">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-amber-500">
            Guest Relationship Management
          </span>
          <h1 className="font-serif-luxury text-3xl font-bold text-white mt-1">
            Customer CRM & VIP Segments
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-lg bg-[#141210] border border-neutral-800 text-xs">
            <span className="text-neutral-400">Total Patrons:</span>{' '}
            <strong className="text-white">{customers.length} Guests</strong>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by customer name, phone (+92...), or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#141210] border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {segments.map((seg) => (
            <button
              key={seg}
              onClick={() => setSelectedSegment(seg)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedSegment === seg
                  ? 'bg-amber-600 text-white'
                  : 'bg-[#141210] text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              {seg}
            </button>
          ))}
        </div>
      </div>

      {/* Customer CRM Table */}
      <div className="bg-[#141210] border border-[#25221e] rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#181512] text-neutral-400 uppercase text-[10px] font-bold tracking-wider border-b border-neutral-800">
            <tr>
              <th className="py-3 px-4">Patron Name</th>
              <th className="py-3 px-4">Contact</th>
              <th className="py-3 px-4">Segment & Tier</th>
              <th className="py-3 px-4">Lifetime Orders</th>
              <th className="py-3 px-4">Total Spent</th>
              <th className="py-3 px-4">SAVORÉ Points</th>
              <th className="py-3 px-4 text-right">Profile</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-900 text-neutral-300">
            {filteredCustomers.map((cust) => (
              <tr key={cust.id} className="hover:bg-[#181512]/50 transition-colors">
                <td className="py-3.5 px-4">
                  <div className="font-bold text-white text-xs">{cust.name}</div>
                  <div className="text-[10px] text-neutral-500">Last visit: {cust.lastOrderDate}</div>
                </td>
                <td className="py-3.5 px-4">
                  <div className="text-white font-mono text-[11px]">{cust.phone}</div>
                  <div className="text-[10px] text-neutral-500">{cust.email}</div>
                </td>
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        cust.segment === 'VIP' || cust.segment === 'High Value'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-neutral-800 text-neutral-300'
                      }`}
                    >
                      {cust.segment}
                    </span>
                    <span className="text-[11px] text-amber-400 font-semibold">{cust.tier}</span>
                  </div>
                </td>
                <td className="py-3.5 px-4 font-bold text-white">
                  {cust.totalOrders} Orders
                </td>
                <td className="py-3.5 px-4 font-mono font-bold text-amber-400">
                  PKR {cust.totalSpentPKR.toLocaleString()}
                </td>
                <td className="py-3.5 px-4 font-mono font-bold text-emerald-400">
                  {cust.loyaltyPoints} pts
                </td>
                <td className="py-3.5 px-4 text-right">
                  <button
                    onClick={() => setActiveCustomerModal(cust)}
                    className="px-3 py-1 rounded bg-[#1e1b18] hover:bg-neutral-800 border border-neutral-700 text-xs font-semibold text-neutral-300 hover:text-white cursor-pointer"
                  >
                    View CRM
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Customer CRM Profile Modal */}
      {activeCustomerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="w-full max-w-lg bg-[#141210] border border-[#2c2824] rounded-2xl p-6 space-y-6 shadow-2xl text-neutral-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-500">
                  Patron Dossier
                </span>
                <h2 className="font-serif-luxury text-2xl font-bold text-white">
                  {activeCustomerModal.name}
                </h2>
              </div>
              <button
                onClick={() => setActiveCustomerModal(null)}
                className="p-1 rounded-full text-neutral-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-[#181512] border border-neutral-800 text-center">
              <div>
                <span className="text-[10px] uppercase text-neutral-500 font-semibold">Spend</span>
                <div className="text-xs font-bold text-amber-400 mt-0.5">
                  PKR {activeCustomerModal.totalSpentPKR.toLocaleString()}
                </div>
              </div>
              <div>
                <span className="text-[10px] uppercase text-neutral-500 font-semibold">Orders</span>
                <div className="text-xs font-bold text-white mt-0.5">
                  {activeCustomerModal.totalOrders}
                </div>
              </div>
              <div>
                <span className="text-[10px] uppercase text-neutral-500 font-semibold">Points</span>
                <div className="text-xs font-bold text-emerald-400 mt-0.5">
                  {activeCustomerModal.loyaltyPoints}
                </div>
              </div>
            </div>

            {/* Favorite dishes */}
            <div className="space-y-1.5">
              <span className="text-xs uppercase font-bold text-neutral-400">
                Favorite Dishes & Preferences
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeCustomerModal.favoriteDishes.map((dish) => (
                  <span
                    key={dish}
                    className="px-2.5 py-1 rounded bg-[#1e1b18] border border-neutral-800 text-xs text-amber-300 font-medium"
                  >
                    ★ {dish}
                  </span>
                ))}
              </div>
            </div>

            {/* Saved Delivery Addresses */}
            <div className="space-y-2">
              <span className="text-xs uppercase font-bold text-neutral-400">
                Primary Delivery Addresses
              </span>
              {activeCustomerModal.addresses.map((addr) => (
                <div
                  key={addr.id}
                  className="p-2.5 rounded-lg bg-[#181512] border border-neutral-800 text-xs text-neutral-300"
                >
                  <div className="font-semibold text-white">{addr.label}: {addr.address}</div>
                  <div className="text-[10px] text-neutral-500">{addr.area}</div>
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setActiveCustomerModal(null)}
                className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-xs font-semibold text-white"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
